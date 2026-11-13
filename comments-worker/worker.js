const json = (body, status, headers) => new Response(JSON.stringify(body), {status, headers:{...headers,'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export default { async fetch(request, env) {
  const origin = request.headers.get('Origin');
  const cors = origin === env.ALLOWED_ORIGIN ? {'Access-Control-Allow-Origin':origin,'Vary':'Origin','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'} : {};
  if (request.method === 'OPTIONS') return new Response(null,{status:origin === env.ALLOWED_ORIGIN?204:403,headers:cors});
  if (origin && origin !== env.ALLOWED_ORIGIN) return json({error:'Origin not allowed'},403,cors);
  const url=new URL(request.url);
  if(!['/comments','/vote'].includes(url.pathname)) return json({error:'Not found'},404,cors);
  if(request.method==='GET' && url.pathname==='/comments'){
    const page=url.searchParams.get('page')||'';
    if(!/^[a-z0-9-]{1,160}$/.test(page)) return json({error:'Invalid article'},400,cors);
    const result=await env.DB.prepare('SELECT c.id,c.name,c.body,c.created_at,c.parent_id, COALESCE(SUM(v.value=1),0) AS upvotes, COALESCE(SUM(v.value=-1),0) AS downvotes FROM comments c LEFT JOIN votes v ON v.comment_id=c.id WHERE c.page = ? GROUP BY c.id ORDER BY c.created_at ASC LIMIT 200').bind(page).all();
    return json({comments:result.results},200,cors);
  }
  if(request.method!=='POST' || origin!==env.ALLOWED_ORIGIN) return json({error:'Not allowed'},403,cors);
  if(Number(request.headers.get('content-length')||0)>4096) return json({error:'Comment too large'},413,cors);
  let raw; try {raw=await request.text();if(raw.length>4096)return json({error:'Comment too large'},413,cors);}catch{return json({error:'Invalid request'},400,cors)}
  let data;try{data=JSON.parse(raw)}catch{return json({error:'Invalid request'},400,cors)}
  if (!data || typeof data !== 'object') return json({error:'Invalid request'},400,cors);
  const page=typeof data.page==='string'?data.page:'';const name=typeof data.name==='string'?data.name.trim():'';const body=typeof data.body==='string'?data.body.trim():'';
  if(!/^[a-z0-9-]{1,160}$/.test(page)) return json({error:'Invalid article'},400,cors);
  if(url.pathname==='/comments' && (name.length<1||name.length>60||body.length<1||body.length>2000)) return json({error:'Check your name and comment length'},400,cors);
  if(!env.RATE_LIMIT_SECRET) return json({error:'Service not configured'},503,cors);
  const ip=request.headers.get('CF-Connecting-IP');if(!ip)return json({error:'Unable to validate request'},403,cors);
  const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
  if(url.pathname==='/vote'){
    if(!/^[0-9a-f-]{36}$/i.test(data.commentId||'') || ![-1,0,1].includes(data.value)) return json({error:'Invalid vote'},400,cors);
    const target=await env.DB.prepare('SELECT id FROM comments WHERE id=? AND page=?').bind(data.commentId,page).first();if(!target)return json({error:'Comment not found'},404,cors);
    const voter=await digest(env.RATE_LIMIT_SECRET+':vote:'+ip);
    if(data.value===0)await env.DB.prepare('DELETE FROM votes WHERE comment_id=? AND voter=?').bind(data.commentId,voter).run();
    else await env.DB.prepare('INSERT INTO votes (comment_id,voter,value) VALUES (?,?,?) ON CONFLICT(comment_id,voter) DO UPDATE SET value=excluded.value').bind(data.commentId,voter,data.value).run();
    const result=await env.DB.prepare('SELECT COALESCE(SUM(value=1),0) AS upvotes, COALESCE(SUM(value=-1),0) AS downvotes FROM votes WHERE comment_id=?').bind(data.commentId).first();return json(result,200,cors);
  }
  const parent=data.parentId||null;if(parent){if(!/^[0-9a-f-]{36}$/i.test(parent)||!await env.DB.prepare('SELECT id FROM comments WHERE id=? AND page=?').bind(parent,page).first())return json({error:'Reply target not found'},400,cors);}
  const hour=Math.floor(Date.now()/3600000);const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(env.RATE_LIMIT_SECRET+':'+hour+':'+ip));const key=Array.from(new Uint8Array(hash),x=>x.toString(16).padStart(2,'0')).join('');
  const rate=await env.DB.prepare('INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,hour+1).first();
  if(rate.count>30)return json({error:'Too many comments. Please try again later.'},429,cors);
  await env.DB.prepare('DELETE FROM rate_limits WHERE expires < ?').bind(hour).run();
  const comment={id:crypto.randomUUID(),name,body,parent_id:parent,upvotes:0,downvotes:0,created_at:new Date().toISOString()};
  await env.DB.prepare('INSERT INTO comments (id,page,name,body,created_at,parent_id) VALUES (?,?,?,?,?,?)').bind(comment.id,page,name,body,comment.created_at,parent).run();
  return json({comment},201,cors);
}};
