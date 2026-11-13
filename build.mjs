import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const out = path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
const data = JSON.parse(read('content/profile.json'));
const esc = s => String(s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const safeUrl = s => /^(https?:\/\/|mailto:)/i.test(s || '') ? esc(s) : '#';
const assetPath = (p, prefix='') => typeof p === 'string' && /^assets\/[a-zA-Z0-9_./-]+$/.test(p) && !p.includes('..') ? prefix + esc(p) : '';
const icon = (file, fallback, prefix='') => assetPath(file, prefix)
  ? `<img class="small-icon" src="${assetPath(file, prefix)}" alt="" loading="lazy">`
  : `<span class="icon-fallback" aria-hidden="true">${esc(fallback)}</span>`;
const socialPaths = {
  github: 'M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.16a10.7 10.7 0 0 1 5.63 0c2.14-1.45 3.08-1.16 3.08-1.16.62 1.55.23 2.69.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z',
  linkedin: 'M20.45 2H3.55C2.7 2 2 2.67 2 3.5v17c0 .83.7 1.5 1.55 1.5h16.9c.85 0 1.55-.67 1.55-1.5v-17c0-.83-.7-1.5-1.55-1.5ZM8 18.75H5V9h3v9.75ZM6.5 7.67a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48Zm12.25 11.08h-3v-4.74c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.82 1.24-1.82 2.51v4.82h-3V9h2.88v1.33h.04c.4-.76 1.38-1.57 2.84-1.57 3.04 0 3.64 2 3.64 4.6v5.39Z',
  x: 'M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.89-7.46L5.53 22H2.4l7.25-8.29L1.8 2h6.4l4.42 6.81L18.9 2Zm-1.1 18h1.73L7.25 3.9H5.4L17.8 20Z',
  youtube: 'M23 6.1a2.9 2.9 0 0 0-2.04-2.05C19.16 3.57 12 3.57 12 3.57s-7.16 0-8.96.48A2.9 2.9 0 0 0 1 6.1 30.2 30.2 0 0 0 .52 12c0 1.97.16 3.94.48 5.9a2.9 2.9 0 0 0 2.04 2.05c1.8.48 8.96.48 8.96.48s7.16 0 8.96-.48A2.9 2.9 0 0 0 23 17.9c.32-1.96.48-3.93.48-5.9S23.32 8.06 23 6.1ZM9.6 15.6V8.4L15.87 12 9.6 15.6Z'
};
const socialIcon = (key, prefix) => assetPath(data.socialIcons?.[key], prefix)
  ? icon(data.socialIcons[key], '', prefix)
  : `<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${socialPaths[key]}"></path></svg>`;
const socialLinks = (prefix='') => [['GitHub', 'github'], ['LinkedIn', 'linkedin'], ['X (formerly Twitter)', 'x']]
  .map(([label, key]) => /^https?:\/\//i.test(data[key] || '')
    ? `<a href="${safeUrl(data[key])}">${socialIcon(key, prefix)}<span>${label}</span></a>`
    : `<span class="social-pending">${socialIcon(key, prefix)}<span>${label} <small>(URL needed)</small></span></span>`).join('');
function validProjectDate(value) {
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(value || '')) return false;
  const [year, month = '01', day = '01'] = value.split('-');
  const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0,10) === `${year}-${month}-${day}`;
}
function formatProjectDate(value) {
  if (!validProjectDate(value)) return '';
  if (value.length === 4) return value;
  return new Date(value.padEnd(10, '-01') + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', ...(value.length === 10 ? { day: 'numeric' } : {}), timeZone: 'UTC'
  });
}
function projectRange(p) {
  const start = formatProjectDate(p.startDate);
  const end = (p.endDate || '').toLowerCase() === 'present' ? 'Present' : formatProjectDate(p.endDate);
  return start ? `${start}${end && end !== start ? ` – ${end}` : ''}` : (p.year && p.year !== 'Sample project' ? p.year : 'Date to be added');
}
const projectDate = p => validProjectDate(p.startDate) ? p.startDate : '';
const orderedProjects = [...data.projects].sort((a,b) => projectDate(b).localeCompare(projectDate(a)));
const projectTypes = [...new Set(['Professional work', 'Personal work', 'Game jams', 'Tools', ...data.projects.map(p => p.workType).filter(Boolean)])];
const posts = fs.readdirSync(path.join(root,'content/posts')).filter(f=>f.endsWith('.md')).map(file=>{
  const raw=read('content/posts/'+file).replaceAll('\r\n','\n');
  const match=raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if(!match) throw Error(`Missing front matter: ${file}`);
  const meta=Object.fromEntries(match[1].split('\n').map(line=>{const i=line.indexOf(':'); return [line.slice(0,i).trim(),line.slice(i+1).trim()]}));
  if(!meta.title || !/^\d{4}-\d\d-\d\d$/.test(meta.date) || !meta.category || !meta.excerpt) throw Error(`Invalid front matter: ${file}`);
  const tags = [...new Set((meta.tags || '').split(',').map(tag => tag.trim()).filter(Boolean))];
  return {...meta,tags,body:match[2],slug:file.replace(/\.md$/,'')};
}).sort((a,b)=>b.date.localeCompare(a.date));
const date = s => new Date(s+'T00:00:00Z').toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});
function inline(s){const math=[]; s=String(s).replace(/(`[^`]+`)|\$([^$\n]+)\$/g,(match,code)=>{if(code)return code; math.push(match);return `MATHPLACEHOLDER${math.length-1}END`;}); return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2">$1</a>').replace(/MATHPLACEHOLDER(\d+)END/g,(_,i)=>esc(math[Number(i)]))}
function postImageUrl(value) {
  if (assetPath(value, '../')) return assetPath(value, '../');
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? esc(url.href) : ''; } catch { return ''; }
}
function youtubeId(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    const host = url.hostname.toLowerCase();
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    if (['youtube.com','www.youtube.com','m.youtube.com'].includes(host)) id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
    return /^[\w-]{11}$/.test(id || '') ? id : '';
  } catch { return ''; }
}
function markdown(src){
  const lines=src.split('\n'); let html='', paragraph=[], list=false, code=false, codeLines=[], mathBlock=false, mathLines=[];
  const flush=()=>{if(paragraph.length){html+=`<p>${inline(paragraph.join(' '))}</p>`;paragraph=[]} if(list){html+='</ul>';list=false}};
  for(const line of lines){
    if (!code && line.trim() === '$$') { if (mathBlock) { html += '<div class="math-display">$$' + esc(mathLines.join('\n')) + '$$</div>'; mathLines=[]; mathBlock=false; } else { flush(); mathBlock=true; } continue; }
    if (mathBlock) { mathLines.push(line); continue; }
    if(/^```/.test(line)){if(code){html+=`<pre><code>${esc(codeLines.join('\n'))}</code></pre>`;codeLines=[];code=false}else{flush();code=true}continue}
    if(code){codeLines.push(line);continue}
    const picture=line.trim().match(/^!\[([^\]]*)\]\(([^\s)]+)\)$/);
    if(picture && postImageUrl(picture[2])){flush();html+=`<figure class="post-media"><img src="${postImageUrl(picture[2])}" alt="${esc(picture[1])}" loading="lazy">${picture[1]?`<figcaption>${esc(picture[1])}</figcaption>`:''}</figure>`;continue}
    const video=line.trim().match(/^@\[youtube\]\(([^\s)]+)\)$/i);
    if(video && youtubeId(video[1])){flush();html+=`<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${youtubeId(video[1])}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;continue}
    const heading=line.match(/^(#{1,3})\s+(.+)$/); if(heading){flush();const level=Math.min(heading[1].length+1,4);html+=`<h${level}>${inline(heading[2])}</h${level}>`;continue}
    const item=line.match(/^-\s+(.+)$/); if(item){if(paragraph.length)flush();if(!list){html+='<ul>';list=true}html+=`<li>${inline(item[1])}</li>`;continue}
    if(!line.trim()){flush();continue} if(list)flush();paragraph.push(line.trim());
  } flush(); if(code) html+=`<pre><code>${esc(codeLines.join('\n'))}</code></pre>`; return html;
}
function layout(title,section,prefix,body){
 const links=[['Home','index.html'],['Background & Experience','about.html'],['Blog','blog.html']];
 const nav=links.map(([label,url])=>`<a href="${prefix+url}"${section===label?' aria-current="page"':''}>${label}</a>`).join('');
 return `<!doctype html><html lang="en"><head><script>try{var savedTheme=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=savedTheme==='light'||savedTheme==='dark'?savedTheme:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){}</script><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(data.role)} portfolio and blog"><title>${esc(title)} | ${esc(data.name)}</title><link rel="stylesheet" href="${prefix}assets/style.css"><script defer src="${prefix}assets/site.js"></script><script defer src="${prefix}assets/duel.js"></script></head><body><a class="skip" href="#main">Skip to content</a><header><div class="wrap header-inner"><a class="brand" href="${prefix}index.html">${esc(data.name)} <span> / ${esc(data.role)}</span></a><div class="header-actions"><button class="theme-toggle" type="button" aria-label="Switch color theme" aria-pressed="false"><span aria-hidden="true" class="theme-symbol"><svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42"/></svg><svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5a8.5 8.5 0 1 0 10.9 10.9Z"/></svg></span> <span class="theme-label">Theme</span></button><button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navigation">Menu</button></div><nav id="navigation" aria-label="Main navigation">${nav}</nav></div></header><main id="main">${body}</main><footer><div class="wrap footer-inner"><div class="footer-meta"><span>© ${new Date().getUTCFullYear()} ${esc(data.name)}</span><div class="duel-record" aria-label="Local duel record"><span>Viewers encountered: <strong data-duel-encountered>0</strong></span><span>Viewers defeated: <strong data-duel-defeated>0</strong></span></div></div><nav class="social-links" aria-label="Social profiles">${socialLinks(prefix)}</nav></div></footer></body></html>`;
}
function write(file,html){const full=path.join(out,file);fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,html)}
const tags=items=>`<div class="tags">${(items||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`;
function projectPhotos(p) {
  const photos = Array.isArray(p.photos) ? p.photos : [];
  const items = photos.map(photo => typeof photo === 'string' ? {image: photo} : photo).filter(photo => photo && assetPath(photo.image));
  return items.length ? items : (assetPath(p.image) ? [{image:p.image, alt:p.imageAlt}] : []);
}
function gifStill(src) {
  const input=fs.readFileSync(path.join(root,src));
  if(!/^GIF8[79]a$/.test(input.toString('ascii',0,6)) || input.length<13) throw new Error(`Invalid GIF: ${src}`);
  let i=13+(input[10]&0x80 ? 3*(1<<((input[10]&7)+1)) : 0);
  const skipBlocks=()=>{let size; do {if(i>=input.length) throw new Error(`Truncated GIF: ${src}`);size=input[i++];i+=size;if(i>input.length) throw new Error(`Truncated GIF: ${src}`);} while(size);};
  while(i<input.length){const type=input[i++];if(type===0x21){i++;skipBlocks();}else if(type===0x2c){if(i+9>input.length) break;const packed=input[i+8];i+=9;if(packed&0x80)i+=3*(1<<((packed&7)+1));i++;skipBlocks();const name=`assets/gif-stills/${createHash('sha256').update(src).digest('hex').slice(0,16)}.gif`;const dest=path.join(out,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,Buffer.concat([input.subarray(0,i),Buffer.from([0x3b])]));return name;}else break;}
  throw new Error(`Could not read first GIF frame: ${src}`);
}
function media(p,prefix='',detail=false){
  const photos=projectPhotos(p);
  const videos=(Array.isArray(p.videos)?p.videos:[]).map(v=>typeof v==='string'?{url:v}:v).filter(v=>v && youtubeId(v.url));
  if(detail && (photos.length || videos.length)) return `<div class="project-gallery" aria-label="Project photos and videos">${photos.map(photo=>`<a href="${assetPath(photo.image,prefix)}" target="_blank" rel="noopener"><img src="${assetPath(photo.image,prefix)}" alt="${esc(photo.alt||p.title)}" loading="lazy"></a>`).join('')}${videos.map(video=>`<div class="project-gallery-video"><iframe src="https://www.youtube-nocookie.com/embed/${youtubeId(video.url)}" title="${esc(video.title||p.title+' video')}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`).join('')}</div>`;
  if(!photos.length) return `<div class="project-media media-placeholder" role="img" aria-label="Project image placeholder"><span>No image</span></div>`;
  const selected=photos.slice(0,3);
  return `<div class="project-media project-collage collage-${selected.length}">${selected.map(photo=>{const gif=/\.gif$/i.test(photo.image);const still=gif?gifStill(photo.image):photo.image;return `<div class="collage-panel"><img src="${assetPath(still,prefix)}"${gif?` data-gif="${assetPath(photo.image,prefix)}" data-still="${assetPath(still,prefix)}"`:''} alt="${esc(photo.alt||p.title)}" loading="lazy"></div>`;}).join('')}</div>`;
}
function facts(p,prefix=''){const fields=[p.role?`<div><dt>Role</dt><dd>${esc(p.role)}</dd></div>`:'',p.studio?`<div><dt>Team / studio</dt><dd class="company-name">${p.studioIcon?icon(p.studioIcon,'',prefix):''}${esc(p.studio)}</dd></div>`:'',p.startDate || (p.year && p.year!=='Sample project')?`<div><dt>Timeline</dt><dd>${esc(projectRange(p))}</dd></div>`:'',p.tools?.length?`<div><dt>Tools</dt><dd>${esc(p.tools.join(', '))}</dd></div>`:''].join('');return fields?`<dl class="project-facts">${fields}</dl>`:''}
function projectCard(p){return `<li><article class="project-row">${media(p)}<div class="project-info"><div class="project-meta">${esc(p.workType||'Uncategorized')} · ${esc(p.category)}${data.sampleContent?' · EXAMPLE':''}</div><h3><a href="projects/${esc(p.slug)}.html">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p>${facts(p)}<a class="button button-secondary project-link" href="projects/${esc(p.slug)}.html">Project details <span>→</span></a></div></article></li>`}
function postRow(p,prefix='',showOutline=false){
  const headings=[...p.body.matchAll(/^##\s+(.+?)\s*$/gm)].map(match=>match[1].replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[*\x60_]/g,''));
  const minutes=Math.max(1,Math.ceil(p.body.trim().split(/\s+/).length/200));
  const outline=showOutline && headings.length ? `<div class="post-outline"><span>In this post</span><ul>${headings.slice(0,3).map(heading=>`<li>${esc(heading)}</li>`).join('')}</ul>${headings.length>3?`<small>+ ${headings.length-3} more sections</small>`:''}</div>` : '';
  return `<a class="post-row${showOutline?' post-row-preview':''}" data-post data-category="${esc(p.category)}" data-tags="${esc(JSON.stringify(p.tags))}" href="${prefix}posts/${esc(p.slug)}.html"><time datetime="${esc(p.date)}">${date(p.date)}${showOutline?`<span class="post-read-time">${minutes} min read</span>`:''}</time><div><span class="label">${esc(p.category)}${p.sample==='true'?' · Sample':''}</span><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>${outline}${p.tags.length?`<div class="post-tags">${tags(p.tags)}</div>`:''}${showOutline?'<span class="post-read-link">Read post →</span>':''}</div></a>`;
}
const home=`<div class="wrap"><section class="intro"><h1>Hi, I'm ${esc(data.name)}.</h1><p class="intro-role">${esc(data.role)}</p><p class="intro-copy">${inline(data.bio)}</p>${data.about?`<p class="intro-copy intro-about">${inline(data.about)}</p>`:''}<div class="actions"><a class="button" href="about.html">Background &amp; Experience →</a></div></section><section class="section" id="work"><div class="section-head"><h2>Personal Projects</h2></div><ul class="project-list" aria-label="Personal projects">${data.projects.map(projectCard).join('')}</ul></section><section class="section"><div class="section-head"><div><h2>Recent Blogs</h2></div><a class="button" href="blog.html">All Blogs →</a></div>${posts.slice(0,2).map(p=>postRow(p)).join('')}</section></div>`;
write('index.html',layout('Home','Home','',home));
function experienceDescription(value) {
  const paragraphs = Array.isArray(value) ? value : String(value || '').split(/\n\s*\n/);
  return paragraphs.filter(Boolean).map(text => `<p>${inline(text).replace(/\n/g, '<br>')}</p>`).join('');
}
function experiencePhotos(photos) {
  if (!Array.isArray(photos)) return '';
  const items = photos.filter(photo => photo && assetPath(photo.image)).map(photo => `<figure><a href="${assetPath(photo.image)}" target="_blank" rel="noopener"><img src="${assetPath(photo.image)}" alt="${esc(photo.alt || '')}" loading="lazy"></a>${photo.caption ? `<figcaption>${esc(photo.caption)}</figcaption>` : ''}</figure>`).join('');
  return items ? `<div class="experience-gallery">${items}</div>` : '';
}
function experienceVideos(videos) {
  if (!Array.isArray(videos)) return '';
  const items = videos.map(video => {
    if (!video || typeof video.url !== 'string') return '';
    const id = youtubeId(video.url);
    const local = assetPath(video.url);
    let player = '';
    if (id) player = `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(video.title || 'Project video')}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    else if (local && /\.(mp4|webm)$/i.test(video.url)) player = `<video controls preload="metadata" aria-label="${esc(video.title || 'Project video')}"><source src="${local}"></video>`;
    if (!player) return '';
    return `<figure><div class="experience-video">${player}</div>${video.caption ? `<figcaption>${esc(video.caption)}</figcaption>` : ''}</figure>`;
  }).join('');
  return items ? `<div class="experience-videos">${items}</div>` : '';
}
const about=`<div class="wrap"><div class="about-layout"><div><div class="page-title"><h1>Hi, I'm ${esc(data.name)}.</h1><p>${esc(data.role)}</p></div><section class="technical-skills"><h2>Technical Skills</h2>${(data.technicalSkills||[]).map(group=>`<div class="skill-group"><h3>${esc(group.category)}</h3>${tags(group.items)}</div>`).join('')}</section><section class="interest-section"><h2>Areas of Interest</h2>${tags(data.skills)}</section></div><aside class="identity"><div class="card-name"><h3>${esc(data.name)}</h3>${data.publicHandle?`<span class="card-aka">a.k.a. ${esc(data.publicHandle)}</span>`:''}</div>${assetPath(data.photo) ? `<div class="card-art"><img class="profile-photo" src="${assetPath(data.photo)}" alt="${esc(data.photoAlt || `Photo of ${data.name}`)}"></div>` : ''}<div class="card-type">${esc(data.role)}</div><div class="identity-links"><a href="${safeUrl(data.github)}">${socialIcon('github', '')}<span>GitHub</span></a>${data.linkedin?`<a href="${safeUrl(data.linkedin)}">${socialIcon('linkedin', '')}<span>LinkedIn</span></a>`:''}</div><a class="button cv-download" href="assets/Thien-Phu-Dao-CV.pdf" download>Download CV ↓</a><button class="duel-trigger" type="button" aria-label="Challenge the stick fighter">Challenge ⚔</button></aside></div><section class="section"><div class="section-head"><div><h2>Experience</h2></div></div>${data.experience.map(e=>`<div class="experience-row"><div class="label">${esc(e.period)}</div><div><h3>${esc(e.role)}</h3><div class="company company-name">${e.companyIcon?icon(e.companyIcon,''): ''}${esc(e.company)}</div>${experienceDescription(e.description)}${experiencePhotos(e.photos)}${experienceVideos(e.videos)}</div></div>`).join('')}</section>${Array.isArray(data.education) && data.education.length ? `<section class="section education-section"><div class="section-head"><div><h2>Education</h2></div></div>${data.education.map(e=>`<div class="experience-row"><div class="label">${esc(e.period)}</div><div><h3>${esc(e.qualification)}</h3><div class="company">${esc(e.institution)}</div>${experienceDescription(e.description)}</div></div>`).join('')}</section>` : ''}</div>`;
write('about.html',layout('Background & Experience','Background & Experience','',about));
const categories=[...new Set(posts.map(p=>p.category))];
const allTags=[...new Set(posts.flatMap(p=>p.tags))].sort((a,b)=>a.localeCompare(b));
const blog=`<div class="wrap bottom-space"><div class="page-title"><h1>Blog</h1><p>Just about anything in the world that came to my mind.</p></div><div class="blog-layout"><div class="blog-list"><div class="filters"><div class="filter-buttons">${['All',...categories].map((c,i)=>`<button data-filter="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('')}</div><label><span class="sr-only">Search blog posts</span><input id="post-search" type="search" placeholder="Search posts..."></label></div>${posts.map(p=>postRow(p)).join('')}<p id="no-posts" hidden>No posts found. Try another search, category, or tag.</p></div><aside class="tag-picker" aria-labelledby="tag-picker-title"><div class="tag-picker-heading"><h2 id="tag-picker-title">Browse tags</h2><button id="clear-tags" type="button" hidden>Clear</button></div><p>Select tags to find posts matching all of them.</p><label><span class="sr-only">Search tags</span><input id="tag-search" type="search" placeholder="Search tags..."></label><div class="tag-options" role="group" aria-label="Filter posts by tag">${allTags.map(t=>`<button type="button" data-tag-filter="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('')}</div><p id="no-tags" ${allTags.length?'hidden':''}>${allTags.length?'No tags found.':'No tags yet.'}</p></aside></div></div>`;
write('blog.html',layout('Blog','Blog','',blog));
const editor=`<div class="wrap bottom-space"><div class="page-title"><div class="eyebrow">BLOG / WRITING TOOL</div><h1>Write a post</h1><p>Draft a post in your browser, then download it to add to your GitHub repository.</p></div><div class="notice">This editor does not save or publish your work. Download your draft before leaving this page. Add the file to <code>content/posts</code> in GitHub and commit it to publish.</div><div class="editor-layout"><form id="post-editor" class="editor-form"><label>Title <input name="title" required maxlength="160" placeholder="Your post title"></label><div class="editor-pair"><label>Date <input name="date" type="date" required></label><label>Category <input name="category" required placeholder="Game development"></label></div><label>Tags <input name="tags" placeholder="Gameplay, Design, Process" aria-describedby="tag-help"><small id="tag-help">Separate tags with commas, or choose an existing tag below.</small></label><div class="editor-tag-suggestions" aria-label="Existing tag suggestions"><span>Existing tags</span><div class="tag-options">${allTags.map(t=>`<button type="button" data-existing-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div><small id="tag-suggestion-status" aria-live="polite">${allTags.length?'Choose a tag or type to narrow the list.':'No existing tags yet; type your own.'}</small></div><label>Short description <textarea name="excerpt" required rows="3" placeholder="What is this post about?"></textarea></label><fieldset class="media-tools"><legend>Add media</legend><p>Upload screenshots to the repository's <code>assets/</code> folder, then enter a path such as <code>assets/screenshot.png</code>, or use an image URL.</p><label>Image path or URL <input id="image-url" placeholder="assets/screenshot.png"></label><label>Image description <input id="image-alt" placeholder="Describe the screenshot"></label><button type="button" id="insert-image">Insert image</button><label>YouTube video URL <input id="video-url" placeholder="https://www.youtube.com/watch?v=..."></label><button type="button" id="insert-video">Insert video</button><p id="media-status" role="status"></p></fieldset><label>Post <textarea name="body" required rows="16" placeholder="Write your post here. Markdown formatting is supported."></textarea><small>Supports Markdown: headings, lists, links, bold, italics, and code.</small></label><button class="button" type="submit">Download post ↓</button><p id="editor-status" role="status"></p></form><aside class="editor-preview" id="editor-preview" aria-label="Post preview"><div class="eyebrow">DRAFT PREVIEW</div><h2 data-preview-title>Post title</h2><p class="article-meta" data-preview-meta>Date · Category</p><p class="editor-preview-tags" data-preview-tags></p><p data-preview-excerpt></p><hr><p class="preview-body" data-preview-body></p><small>Markdown and media are shown as plain text here; images and videos appear after the site is rebuilt.</small></aside></div></div><script defer src="assets/editor.js"></script>`;
write('editor.html',layout('Write a post','Blog','',editor));
function articleWithOutline(source){
  const entries=[];
  const html=markdown(source).replace(/<h3>([\s\S]*?)<\/h3>/g,(_,heading)=>{const id=`section-${entries.length+1}`;entries.push({id,heading});return `<h3 id="${id}">${heading}</h3>`;});
  const outline=entries.length?`<nav class="article-outline" aria-label="Article outline"><ol>${entries.map(entry=>`<li><a href="#${entry.id}">${entry.heading.replace(/<[^>]+>/g,'')}</a></li>`).join('')}</ol></nav>`:'';
  return outline+html;
}
function postComments(post){
  const endpoint=data.commentsApi;
  if(typeof endpoint!=='string' || !/^https:\/\/[a-z0-9.-]+(?:\/comments)?\/?$/i.test(endpoint)) return '';
  const url=endpoint.replace(/\/$/,'').replace(/\/comments$/,'')+'/comments';
  return `<section class="article-comments" data-comments-api="${esc(url)}" data-comments-page="${esc(post.slug)}"><h2>Comments</h2><p class="comments-status" role="status">Loading comments…</p><div class="comments-list"></div><form class="comments-form"><label>Name <input name="name" required maxlength="60" autocomplete="nickname"></label><label>Comment <textarea name="body" required maxlength="2000" rows="4"></textarea><small>Emoji and Markdown supported. Use ![description](https://…) for an image or GIF, and [text](https://…) for a link.</small></label><button class="button" type="submit">Post comment</button></form></section>`;
}
for(const p of posts){const body=`<article class="article wrap"><a class="back" href="../blog.html">← Back to blog</a><div class="eyebrow" style="margin-top:35px">${esc(p.category)}${p.sample==='true'?' · SAMPLE POST':''}</div><h1>${esc(p.title)}</h1><p class="article-meta"><time datetime="${esc(p.date)}">${date(p.date)}</time> &nbsp; / &nbsp; ${esc(data.name)}</p>${tags(p.tags)}${articleWithOutline(p.body)}${postComments(p)}</article>`;const page=layout(p.title,'Blog','../',body).replace('</head>', () => `<script>window.MathJax={tex:{inlineMath:[['$','$']],displayMath:[['$$','$$']]},options:{skipHtmlTags:['script','noscript','style','textarea','pre','code']}};</script><script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script></head>`);write(`posts/${p.slug}.html`,page)}

for(const p of data.projects){
 if(!/^[a-z0-9-]+$/.test(p.slug))throw Error('Invalid project slug: '+p.slug);
 const contributions=(p.contributions||[]).map(item=>`<li>${esc(item)}</li>`).join('');
 const body=`<article class="wrap project-detail"><a class="back" href="../index.html#work">← Back to projects</a><div class="page-title"><div class="eyebrow">${esc(p.workType||'Uncategorized')} · ${esc(p.category)}${data.sampleContent?' · EXAMPLE PROJECT':''}</div><h1>${esc(p.title)}</h1><p>${esc(p.summary)}</p></div>${media(p,'../',true)}<div class="detail-layout"><div class="detail-content"><h2>About the project</h2><p>${esc(p.description)}</p>${contributions?`<h2>Features</h2><ul>${contributions}</ul>`:''}${p.challenge?`<h2>Technical challenges</h2><p>${esc(p.challenge)}</p>`:''}${p.learning?`<h2>What I learned</h2><p>${esc(p.learning)}</p>`:''}<div class="project-actions">${p.url?`<a class="button" href="${safeUrl(p.url)}">${esc(p.urlLabel || 'Visit project')} ↗</a>`:''}${(p.links||[]).filter(link=>/^https?:\/\//i.test(link.url||'')).map(link=>`<a class="button" href="${safeUrl(link.url)}">${esc(link.label)} ↗</a>`).join('')}</div></div><aside><h3>Project details</h3>${facts(p,'../')}</aside></div></article>`;
 write(`projects/${p.slug}.html`,layout(p.title,'Projects','../',body));
}
console.log(`Built ${data.projects.length} projects and ${posts.length} posts in dist/`);
