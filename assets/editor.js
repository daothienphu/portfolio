const form = document.querySelector('#post-editor');
const preview = document.querySelector('#editor-preview');
const status = document.querySelector('#editor-status');
const fields = ['title', 'date', 'category', 'tags', 'excerpt', 'body'];
const tagInput = form.elements.namedItem('tags');
const existingTagButtons = [...document.querySelectorAll('[data-existing-tag]')];
const existingTags = existingTagButtons.map(button => button.dataset.existingTag);

function updateTagSuggestions() {
  const parts = tagInput.value.split(',');
  const query = parts.pop().trim().toLowerCase();
  const selected = new Set(parts.map(tag => tag.trim().toLowerCase()).filter(Boolean));
  let count = 0;
  existingTagButtons.forEach(button => {
    const tag = button.dataset.existingTag.toLowerCase();
    button.hidden = selected.has(tag) || !tag.includes(query);
    if (!button.hidden) count++;
  });
  const hint = document.querySelector('#tag-suggestion-status');
  if (hint) hint.textContent = !existingTags.length ? 'No existing tags yet; type your own.' : count ? 'Choose a tag or type to narrow the list.' : 'No matching existing tags; you can create a new one.';
}
existingTagButtons.forEach(button => button.addEventListener('click', () => {
  const parts = tagInput.value.split(',');
  parts.pop();
  parts.push(button.dataset.existingTag);
  tagInput.value = parts.map(tag => tag.trim()).filter(Boolean).join(', ') + ', ';
  tagInput.focus();
  updateTagSuggestions();
  renderPreview();
}));
tagInput.addEventListener('input', updateTagSuggestions);

function values() {
  return Object.fromEntries(fields.map(name => [name, form.elements.namedItem(name).value.trim()]));
}

function renderPreview() {
  const post = values();
  preview.querySelector('[data-preview-title]').textContent = post.title || 'Post title';
  preview.querySelector('[data-preview-meta]').textContent = [post.date, post.category].filter(Boolean).join(' · ') || 'Date · Category';
  preview.querySelector('[data-preview-tags]').textContent = post.tags ? `Tags: ${post.tags}` : '';
  preview.querySelector('[data-preview-excerpt]').textContent = post.excerpt;
  preview.querySelector('[data-preview-body]').textContent = post.body || 'Your post will appear here as you write.';
}

form.addEventListener('input', renderPreview);
const bodyField = form.elements.namedItem('body');
const mediaStatus = document.querySelector('#media-status');
function insertBlock(block) {
  const start = bodyField.selectionStart;
  const end = bodyField.selectionEnd;
  const before = bodyField.value.slice(0, start);
  const after = bodyField.value.slice(end);
  const insertion = `${before && !before.endsWith('\n') ? '\n' : ''}\n${block}\n\n`;
  bodyField.value = before + insertion + after;
  bodyField.focus();
  bodyField.setSelectionRange(start + insertion.length, start + insertion.length);
  renderPreview();
}
document.querySelector('#insert-image').addEventListener('click', () => {
  const url = document.querySelector('#image-url').value.trim();
  const alt = document.querySelector('#image-alt').value.trim();
  const local = /^assets\/[a-zA-Z0-9_./-]+$/.test(url) && !url.includes('..');
  let remote = false;
  try { const parsed = new URL(url); remote = ['http:', 'https:'].includes(parsed.protocol) && !/[\s)]/.test(url); } catch { /* local path or invalid URL */ }
  if ((!local && !remote) || !alt || /[\]\r\n]/.test(alt)) {
    mediaStatus.textContent = 'Enter an assets/ path or image URL, plus a short image description without brackets.';
    return;
  }
  insertBlock(`![${alt}](${url})`);
  mediaStatus.textContent = 'Image inserted. Upload the image file to GitHub if you used an assets/ path.';
});
document.querySelector('#insert-video').addEventListener('click', () => {
  const value = document.querySelector('#video-url').value.trim();
  let id = '';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid protocol');
    const host = url.hostname.toLowerCase();
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
  } catch { /* Invalid URL */ }
  if (!/^[\w-]{11}$/.test(id || '')) {
    mediaStatus.textContent = 'Enter a valid YouTube video link.';
    return;
  }
  insertBlock(`@[youtube](https://www.youtube.com/watch?v=${id})`);
  mediaStatus.textContent = 'YouTube video inserted.';
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const post = values();
  const singleLine = value => value.replace(/[\r\n]+/g, ' ');
  const slug = post.title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'untitled-post';
  const canonicalTags = post.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => existingTags.find(existing => existing.toLowerCase() === tag.toLowerCase()) || tag);
  const uniqueTags = canonicalTags.filter((tag, index) => canonicalTags.findIndex(other => other.toLowerCase() === tag.toLowerCase()) === index);
  const markdown = `---\ntitle: ${singleLine(post.title)}\ndate: ${post.date}\ncategory: ${singleLine(post.category)}\ntags: ${singleLine(uniqueTags.join(', '))}\nexcerpt: ${singleLine(post.excerpt)}\n---\n\n${post.body}\n`;
  const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${post.date}-${slug}.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Post downloaded. Add the file to content/posts in your GitHub repository and commit it to publish.';
});

renderPreview();
updateTagSuggestions();
