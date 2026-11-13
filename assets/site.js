const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeButton) {
    const isLight = theme === 'light';
    themeButton.setAttribute('aria-pressed', String(isLight));
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeButton.querySelector('.theme-label').textContent = isLight ? 'Dark mode' : 'Light mode';
  }
}
function savedTheme() {
  try { return localStorage.getItem('portfolio-theme'); } catch { return null; }
}
applyTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'light' : 'dark'));
themeButton?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('portfolio-theme', next); } catch { /* Current session still works. */ }
});
systemTheme.addEventListener?.('change', event => {
  if (!savedTheme()) applyTheme(event.matches ? 'light' : 'dark');
});

const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('#navigation').classList.toggle('is-open', !expanded);
});
const filters = document.querySelectorAll('[data-filter]');
const search = document.querySelector('#post-search');
const tagSearch = document.querySelector('#tag-search');
const tagButtons = document.querySelectorAll('[data-tag-filter]');
const selectedTags = new Set();
let active = 'All';
function filterPosts() {
  let count = 0;
  document.querySelectorAll('[data-post]').forEach(post => {
    const postTags = JSON.parse(post.dataset.tags || '[]');
    const show = (active === 'All' || post.dataset.category === active) && post.textContent.toLowerCase().includes((search?.value || '').toLowerCase()) && [...selectedTags].every(tag => postTags.includes(tag));
    post.hidden = !show;
    if (show) count++;
  });
  const empty = document.querySelector('#no-posts');
  if (empty) empty.hidden = count > 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  active = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  filterPosts();
}));
search?.addEventListener('input', filterPosts);
tagButtons.forEach(button => button.addEventListener('click', () => {
  const tag = button.dataset.tagFilter;
  if (selectedTags.has(tag)) selectedTags.delete(tag); else selectedTags.add(tag);
  button.setAttribute('aria-pressed', String(selectedTags.has(tag)));
  document.querySelector('#clear-tags').hidden = selectedTags.size === 0;
  filterPosts();
}));
tagSearch?.addEventListener('input', () => {
  const query = tagSearch.value.trim().toLowerCase();
  let visible = 0;
  tagButtons.forEach(button => {
    button.hidden = !button.dataset.tagFilter.toLowerCase().includes(query);
    if (!button.hidden) visible++;
  });
  const noTags = document.querySelector('#no-tags');
  if (noTags) {
    noTags.hidden = visible > 0;
    noTags.textContent = tagButtons.length ? 'No tags found.' : 'No tags yet.';
  }
});
document.querySelector('#clear-tags')?.addEventListener('click', event => {
  selectedTags.clear();
  tagButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  event.currentTarget.hidden = true;
  filterPosts();
});

const projectFilters = document.querySelectorAll('[data-project-filter]');
projectFilters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.projectFilter;
  let count = 0;
  projectFilters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-project]').forEach(project => {
    const visible = selected === 'All' || project.dataset.workType === selected;
    project.hidden = !visible;
    if (visible) count++;
  });
  const empty = document.querySelector('#no-projects');
  if (empty) empty.hidden = count > 0;
  const timeline = document.querySelector('.project-timeline');
  if (timeline) timeline.hidden = count === 0;
}));

// Reveal only elements below the fold, so the page stays usable if scripting fails.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.section-head, .project-card, .about-band > *, .post-row, .experience-row, .identity, .contact > *').forEach((element, index) => {
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 80}ms`);
    observer.observe(element);
  });

  motionPreference.addEventListener?.('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
    }
  });
}

// Give the contact card a small, pointer-driven tilt.
const contactCard = document.querySelector('.identity');
const cardMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const resetContactCard = () => {
  if (!contactCard) return;
  contactCard.classList.remove('is-tilting');
  contactCard.style.removeProperty('--tilt-x');
  contactCard.style.removeProperty('--tilt-y');
};
contactCard?.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || cardMotion.matches) return;
  const rect = contactCard.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
  contactCard.style.setProperty('--tilt-x', (-y * 5).toFixed(2) + 'deg');
  contactCard.style.setProperty('--tilt-y', (x * 5).toFixed(2) + 'deg');
  contactCard.classList.add('is-tilting');
});
contactCard?.addEventListener('pointerleave', resetContactCard);
contactCard?.addEventListener('pointercancel', resetContactCard);
cardMotion.addEventListener?.('change', resetContactCard);

// Switch between the still frame and animated GIF as the pointer enters or leaves.
document.querySelectorAll('.collage-panel img[data-gif]').forEach(img => {
  const panel = img.closest('.collage-panel');
  let playing = false;
  const play = event => {
    if (event.pointerType === 'touch' || playing) return;
    playing = true;
    img.src = img.dataset.gif + '?play=' + Date.now();
  };
  const stop = () => {
    if (!playing) return;
    playing = false;
    img.src = img.dataset.still;
  };
  panel.addEventListener('pointerenter', play);
  panel.addEventListener('pointermove', play);
  panel.addEventListener('pointerleave', stop);
  panel.addEventListener('pointercancel', stop);
});

// Show a clickable thumbnail when a local file cannot embed YouTube.
if (location.protocol === 'file:') {
  document.querySelectorAll('.project-gallery-video iframe').forEach(frame => {
    const id = new URL(frame.src).pathname.split('/').pop();
    const link = document.createElement('a');
    link.className = 'video-local-thumbnail';
    link.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
    link.target = '_blank'; link.rel = 'noopener';
    link.setAttribute('aria-label', 'Watch ' + frame.title + ' on YouTube');
    const image = document.createElement('img');
    image.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg';
    image.alt = '';
    const label = document.createElement('span');
    label.textContent = '▶  Watch on YouTube';
    link.append(image, label); frame.replaceWith(link);
  });
}

// Render guest comments with DOM nodes; comment text is never treated as HTML.
const commentSection = document.querySelector('.article-comments[data-comments-api]');
if (commentSection) {
  const endpoint=commentSection.dataset.commentsApi, page=commentSection.dataset.commentsPage;
  const status=commentSection.querySelector('.comments-status'), list=commentSection.querySelector('.comments-list'), form=commentSection.querySelector('form');
  const cards=new Map(); let replyTo=null;
  const editor=form.elements.body;
  form.querySelectorAll('[data-format]').forEach(button=>button.addEventListener('click',()=>{
    const start=editor.selectionStart,end=editor.selectionEnd,selected=editor.value.slice(start,end);let insert='',selectStart=0,selectEnd=0;
    switch(button.dataset.format){
      case 'bold': insert='**'+(selected||'bold text')+'**';selectStart=2;selectEnd=insert.length-2;break;
      case 'italic': insert='*'+(selected||'italic text')+'*';selectStart=1;selectEnd=insert.length-1;break;
      case 'link': insert='['+(selected||'link text')+'](https://)';selectStart=insert.indexOf('https://');selectEnd=insert.length-1;break;
      case 'image': insert='!['+(selected||'image description')+'](https://)';selectStart=insert.indexOf('https://');selectEnd=insert.length-1;break;
      case 'emoji': insert='😊';selectStart=selectEnd=insert.length;break;
    }
    editor.setRangeText(insert,start,end,'end');editor.focus();editor.setSelectionRange(start+selectStart,start+selectEnd);
  }));

  const safeURL = value => { try {const u=new URL(value); return u.protocol==='https:' ? u.href : null;}catch{return null} };
  function renderInline(text, target){
    const pattern=/(!?\[([^\]\n]{1,200})\]\((https:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|\x60([^\x60\n]+)\x60)/g;let last=0,match;
    while((match=pattern.exec(text))){target.append(document.createTextNode(text.slice(last,match.index)));let node;if(match[2]!==undefined){const url=safeURL(match[3]);if(!url){target.append(document.createTextNode(match[0]));last=pattern.lastIndex;continue}if(match[1].startsWith('!')){node=document.createElement('a');node.href=url;node.target='_blank';node.rel='nofollow ugc noopener noreferrer';const image=document.createElement('img');image.src=url;image.alt=match[2];image.loading='lazy';image.referrerPolicy='no-referrer';node.append(image)}else{node=document.createElement('a');node.href=url;node.target='_blank';node.rel='nofollow ugc noopener noreferrer';node.textContent=match[2]}}else{node=document.createElement(match[4]?'strong':match[5]?'em':'code');node.textContent=match[4]||match[5]||match[6]}target.append(node);last=pattern.lastIndex}target.append(document.createTextNode(text.slice(last)));
  }
  const emojiPicker=form.querySelector('.emoji-picker'), emojiToggle=form.querySelector('.emoji-toggle');
  const emojiMap=new Map([...form.querySelectorAll('.emoji-choice')].map(button=>[button.dataset.emoji,button.querySelector('img').getAttribute('src')]));
  for (const [name, url] of [...emojiMap]) if (name.startsWith('fish_')) emojiMap.set('emo_'+name.slice(5),url);
  emojiToggle.addEventListener('click',()=>{emojiPicker.hidden=!emojiPicker.hidden;emojiToggle.setAttribute('aria-expanded',String(!emojiPicker.hidden))});
  emojiPicker.addEventListener('click',event=>{const choice=event.target.closest('.emoji-choice');if(!choice)return;const token=':'+choice.dataset.emoji+':';editor.setRangeText(token,editor.selectionStart,editor.selectionEnd,'end');emojiPicker.hidden=true;emojiToggle.setAttribute('aria-expanded','false');editor.focus()});
  function renderText(text,target){let last=0;for(const match of text.matchAll(/:([a-zA-Z0-9_-]+):/g)){if(!emojiMap.has(match[1]))continue;renderInline(text.slice(last,match.index),target);const image=document.createElement('img');image.className='custom-emoji';image.src=emojiMap.get(match[1]);image.alt=match[1].replace(/^(emo|fish)_/,'');image.title=image.alt;target.append(image);last=match.index+match[0].length}renderInline(text.slice(last),target)}
  function addComment(comment){
    const article=document.createElement('article'),header=document.createElement('div'),name=document.createElement('strong'),time=document.createElement('time'),body=document.createElement('p'),actions=document.createElement('div'),children=document.createElement('div');
    article.className='reader-comment';header.className='comment-header';actions.className='comment-actions';children.className='comment-replies';name.textContent=comment.name;time.dateTime=comment.created_at;time.textContent=new Date(comment.created_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});renderText(comment.body,body);header.append(name,time);
    for(const [value,label,count] of [[1,'▲',comment.upvotes],[-1,'▼',comment.downvotes]]){const button=document.createElement('button');button.type='button';button.textContent=label+' '+(count||0);button.setAttribute('aria-label',value===1?'Upvote':'Downvote');button.addEventListener('click',async()=>{button.disabled=true;try{const response=await fetch(endpoint.replace(/\/comments$/,'/vote'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({page,commentId:comment.id,value})});if(!response.ok)throw Error('Vote could not be saved.');const result=await response.json();actions.querySelector('[data-vote="1"]').textContent='▲ '+result.upvotes;actions.querySelector('[data-vote="-1"]').textContent='▼ '+result.downvotes;}catch(error){status.textContent=error.message}finally{button.disabled=false}});button.dataset.vote=value;actions.append(button)}
    const reply=document.createElement('button');reply.type='button';reply.textContent='Reply';reply.addEventListener('click',()=>{replyTo=comment.id;form.querySelector('.reply-context').textContent='Replying to '+comment.name;form.querySelector('.cancel-reply').hidden=false;form.elements.body.focus()});actions.append(reply);article.append(header,body,actions,children);cards.set(comment.id,{article,children});return article;
  }
  const context=document.createElement('div');context.className='reply-context';const cancel=document.createElement('button');cancel.type='button';cancel.className='cancel-reply';cancel.textContent='Cancel reply';cancel.hidden=true;cancel.addEventListener('click',()=>{replyTo=null;context.textContent='';cancel.hidden=true});form.prepend(cancel);form.prepend(context);
  fetch(endpoint+'?page='+encodeURIComponent(page)).then(response=>{if(!response.ok)throw Error();return response.json()}).then(data=>{data.comments.forEach(addComment);data.comments.forEach(comment=>{const card=cards.get(comment.id);const parent=cards.get(comment.parent_id);(parent?parent.children:list).append(card.article)});status.textContent=data.comments.length?'':'Be the first to comment.'}).catch(()=>{status.textContent='Comments could not be loaded. Please try again later.'});
  form.addEventListener('submit',async event=>{event.preventDefault();const button=form.querySelector('[type=submit]');button.disabled=true;status.textContent='Posting…';try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({page,name:form.elements.name.value,body:form.elements.body.value,parentId:replyTo})});const data=await response.json();if(!response.ok)throw Error(data.error||'Could not post your comment.');const card=addComment(data.comment);(cards.get(replyTo)?.children||list).append(card);form.elements.body.value='';replyTo=null;context.textContent='';cancel.hidden=true;status.textContent='Comment posted.'}catch(error){status.textContent=error.message||'Could not post your comment.'}finally{button.disabled=false}});
}
