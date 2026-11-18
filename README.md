# Game developer portfolio

A lightweight portfolio and blog built for GitHub Pages. No packages or framework installation are required; the build uses Node.js 22 or newer.

## Make it yours

Edit `content/profile.json` to change your name, introduction, GitHub, LinkedIn, X and YouTube URLs, contact email, skills, projects, and experience. Empty social URLs are labeled as needing a URL. The current projects and roles are examples, not claims about your work. Replace them and set `sampleContent` to `false`. Each project needs a unique lowercase `slug` made of letters, numbers, and hyphens. Add a `role`, `studio`, `year`, `tools`, and a list of `contributions` to describe your work. A project `description` can be one string or an array of paragraphs, and both `description` and `contributions` support inline Markdown such as `**bold**`, inline code, and links. A link can point to another project page by its slug, for example `[SpookyCore](spooky-core.html)`. To add project photos, put them in `assets/` and set the project's `photos` to an ordered array such as `[{"image":"assets/my-game.jpg","alt":"Gameplay screenshot"}]`. All photos appear in a horizontal gallery on the project page; the first three form the preview on the home page. The older `image` and `imageAlt` fields still work for a single photo. GIF files work in the same `photos` array; their home page previews animate on hover. Add YouTube embeds with a project `videos` array, for example `[{"url":"https://www.youtube.com/watch?v=VIDEO_ID","title":"Gameplay video"}]`. Videos appear in the project gallery after the photos. Local MP4 or WebM files in `assets/` also work, for example `{"url":"assets/Proj/MyGame/trailer.mp4","title":"Trailer"}`. Projects without photos show a placeholder on the home page.

Set `publicHandle` to the public handles you want to display under your name, or leave it empty to hide them.

Projects appear in a timeline ordered newest first by `startDate` (`YYYY`, `YYYY-MM`, or `YYYY-MM-DD`). Set `endDate` to another date in the same format, `Present`, or an empty string for a single date. The timeline formats the dates automatically. Projects without a start date appear last in their existing order; the older `year` text is used as a fallback. Set each project's `workType` to `Professional work`, `Personal work`, `Game jams`, `Tools`, or your own category. These categories become timeline filters and appear on project detail pages; `category` can separately describe the kind of project, such as gameplay or world building. Add a local icon path, such as `assets/studio-logo.png`, to `studioIcon` on a project or `companyIcon` on an experience entry. Social icons use built-in brand marks and can be customized in the `socialIcons` object using the same kind of asset path. Icon images are decorative alongside their text labels.

To add your photo to the About page contact box, put the image in `assets/` and set `photo` in `content/profile.json` to a path such as `assets/my-photo.jpg`. Optionally set `photoAlt` to describe it. Leave `photo` empty to hide the image.

The `bio` and `about` fields also support inline Markdown such as `**bold**`, `*italic*`, inline code, and HTTP(S) links.

Edit `technicalSkills` in `content/profile.json` to manage the grouped skills shown on the About page. Each group has a `category` and an `items` list; `skills` controls the separate Areas of Interest list.

## Education

Add entries to the `education` array in `content/profile.json`. The section appears on the About page when the array has entries. Description is optional and can be a string or an array of paragraphs.

```json
"education": [
  {
    "qualification": "Your degree or qualification",
    "institution": "Your school or university",
    "period": "2020 - 2024",
    "description": ["Optional details about your studies or projects."]
  }
]
```

## Experience descriptions and photos

In each entry in `content/profile.json`, set `description` to an array of paragraphs. You can also use `\n` inside a paragraph for a line break. Descriptions support inline Markdown: `**bold**`, `*italic*`, inline code in backticks, and `[link text](https://example.com)`. Existing single-string descriptions still work. Add photos to the entry with a `photos` array; put the image files in `assets/`. Each photo opens at full size when clicked.

```json
"description": [
  "First paragraph about the role.",
  "Second paragraph, with a line break here.\nMore detail on the next line."
],
"photos": [
  { "image": "assets/project-1.jpg", "alt": "Gameplay screenshot", "caption": "The project I worked on" },
  { "image": "assets/project-2.jpg", "alt": "Another view of the project", "caption": "Another view" }
]
```

The caption is optional. Leave `photos` out or use `[]` if you have no photos.

To showcase videos in the same experience entry, add a `videos` array. You can use YouTube watch, share, or Shorts links, or local MP4/WebM files in `assets/`. `title` describes the player for accessibility; `caption` is optional.

```json
"videos": [
  { "url": "https://www.youtube.com/watch?v=VIDEO_ID", "title": "Gameplay demo", "caption": "A gameplay demonstration" },
  { "url": "assets/demo.mp4", "title": "Project clip" }
]
```

Rebuild the site after editing.

## Write a blog post

Open `editor.html` on the site to write a post using a form and download its Markdown file. This tool runs locally in your browser; it does not save drafts, authenticate, or publish. In GitHub, open `content/posts`, choose **Add file → Upload files**, upload the downloaded file, and commit it to `main`. The Pages workflow publishes it. Check the filename before uploading if an existing post has the same name.

To add a screenshot or photo, upload the image into the repository's `assets` folder, then enter its path (for example `assets/screenshot.png`) and a description in the editor's image controls. Use filenames with letters, numbers, hyphens, underscores, or periods and no spaces. You may instead use an externally hosted HTTP(S) image URL. To embed video, paste a YouTube watch, short, or share URL into the video control. The editor inserts Markdown into the post; its preview shows the markup as text, while the rebuilt post displays the image or video. Upload the image files along with the post before publishing. For other video hosts, link to the video using a normal Markdown link.

To shelve a post, move its `.md` file from `content/posts` to `content/drafts`. The build ignores drafts. To publish it again, move the file back to `content/posts` and rebuild.

Add a `.md` file to `content/posts`. Its filename becomes its URL. Use this structure:

```markdown
---
title: My new post
date: 2026-11-13
category: Game development
tags: Gameplay, Design, Process
excerpt: A short description of the article.
---

## A heading

Your article goes here.
```

Blog posts support LaTeX equations: use `$E = mc^2# Game developer portfolio

A lightweight portfolio and blog built for GitHub Pages. No packages or framework installation are required; the build uses Node.js 22 or newer.

## Make it yours

Edit `content/profile.json` to change your name, introduction, GitHub, LinkedIn, X and YouTube URLs, contact email, skills, projects, and experience. Empty social URLs are labeled as needing a URL. The current projects and roles are examples, not claims about your work. Replace them and set `sampleContent` to `false`. Each project needs a unique lowercase `slug` made of letters, numbers, and hyphens. Add a `role`, `studio`, `year`, `tools`, and a list of `contributions` to describe your work. A project `description` can be one string or an array of paragraphs, and both `description` and `contributions` support inline Markdown such as `**bold**`, inline code, and links. A link can point to another project page by its slug, for example `[SpookyCore](spooky-core.html)`. To show a screenshot, put it in `assets/` and set the project's `image` to a path such as `assets/my-game.jpg`; add a description in `imageAlt`. Leave `image` empty to show a placeholder.

Set `publicHandle` to the public handles you want to display under your name, or leave it empty to hide them.

Projects appear in a timeline ordered newest first by `startDate` (`YYYY`, `YYYY-MM`, or `YYYY-MM-DD`). Set `endDate` to another date in the same format, `Present`, or an empty string for a single date. The timeline formats the dates automatically. Projects without a start date appear last in their existing order; the older `year` text is used as a fallback. Set each project's `workType` to `Professional work`, `Personal work`, `Game jams`, `Tools`, or your own category. These categories become timeline filters and appear on project detail pages; `category` can separately describe the kind of project, such as gameplay or world building. Add a local icon path, such as `assets/studio-logo.png`, to `studioIcon` on a project or `companyIcon` on an experience entry. Social icons use built-in brand marks and can be customized in the `socialIcons` object using the same kind of asset path. Icon images are decorative alongside their text labels.

To add your photo to the About page contact box, put the image in `assets/` and set `photo` in `content/profile.json` to a path such as `assets/my-photo.jpg`. Optionally set `photoAlt` to describe it. Leave `photo` empty to hide the image.

## Education

Add entries to the `education` array in `content/profile.json`. The section appears on the About page when the array has entries. Description is optional and can be a string or an array of paragraphs.

```json
"education": [
  {
    "qualification": "Your degree or qualification",
    "institution": "Your school or university",
    "period": "2020 - 2024",
    "description": ["Optional details about your studies or projects."]
  }
]
```

## Experience descriptions and photos

In each entry in `content/profile.json`, set `description` to an array of paragraphs. You can also use `\n` inside a paragraph for a line break. Descriptions support inline Markdown: `**bold**`, `*italic*`, inline code in backticks, and `[link text](https://example.com)`. Existing single-string descriptions still work. Add photos to the entry with a `photos` array; put the image files in `assets/`. Each photo opens at full size when clicked.

```json
"description": [
  "First paragraph about the role.",
  "Second paragraph, with a line break here.\nMore detail on the next line."
],
"photos": [
  { "image": "assets/project-1.jpg", "alt": "Gameplay screenshot", "caption": "The project I worked on" },
  { "image": "assets/project-2.jpg", "alt": "Another view of the project", "caption": "Another view" }
]
```

The caption is optional. Leave `photos` out or use `[]` if you have no photos.

To showcase videos in the same experience entry, add a `videos` array. You can use YouTube watch, share, or Shorts links, or local MP4/WebM files in `assets/`. `title` describes the player for accessibility; `caption` is optional.

```json
"videos": [
  { "url": "https://www.youtube.com/watch?v=VIDEO_ID", "title": "Gameplay demo", "caption": "A gameplay demonstration" },
  { "url": "assets/demo.mp4", "title": "Project clip" }
]
```

Rebuild the site after editing.

## Write a blog post

Open `editor.html` on the site to write a post using a form and download its Markdown file. This tool runs locally in your browser; it does not save drafts, authenticate, or publish. In GitHub, open `content/posts`, choose **Add file → Upload files**, upload the downloaded file, and commit it to `main`. The Pages workflow publishes it. Check the filename before uploading if an existing post has the same name.

To add a screenshot or photo, upload the image into the repository's `assets` folder, then enter its path (for example `assets/screenshot.png`) and a description in the editor's image controls. Use filenames with letters, numbers, hyphens, underscores, or periods and no spaces. You may instead use an externally hosted HTTP(S) image URL. To embed video, paste a YouTube watch, short, or share URL into the video control. The editor inserts Markdown into the post; its preview shows the markup as text, while the rebuilt post displays the image or video. Upload the image files along with the post before publishing. For other video hosts, link to the video using a normal Markdown link.

Add a `.md` file to `content/posts`. Its filename becomes its URL. Use this structure:

```markdown
---
title: My new post
date: 2026-11-13
category: Game development
tags: Gameplay, Design, Process
excerpt: A short description of the article.
---

## A heading

Your article goes here.
```

 for inline math, or put `$` on separate lines before and after a display equation. Equations use MathJax from a CDN and require an internet connection to render. Code blocks remain plain code.

The built-in renderer supports paragraphs, headings, bullet lists, inline code, fenced code blocks, bold, italics, absolute HTTP(S) links, standalone images (`![description](assets/screenshot.png)`), and standalone YouTube embeds (`@[youtube](https://www.youtube.com/watch?v=VIDEO_ID)`). Put each image or embed on its own line. Categories appear automatically in the blog filters. Add comma-separated `tags` to the front matter to list them on the post and in the searchable tag picker; tags are optional. Selecting multiple tags shows posts that have all selected tags. Remove the sample posts when they are no longer needed.

## Preview

Run `node build.mjs` from the project root. For a Windows preview, run `powershell -ExecutionPolicy Bypass -File .\preview.ps1` and open `http://localhost:8765/`. YouTube embeds need a web server and cannot play when the page is opened directly as a file. Rebuild after content changes.

## Publish with GitHub Pages

1. Create a GitHub repository and push these files to its `main` branch.
2. In the repository, open **Settings → Pages**, and select **GitHub Actions** as the source.
3. Run the **Deploy to GitHub Pages** workflow from the Actions tab if the initial push ran before Pages was configured. Each later push to `main` rebuilds and publishes the site.

The workflow works for both `username.github.io` repositories and project repositories. It uses relative links so it also works under a repository subpath. GitHub's deployment job displays the published URL.

## Article comments (Cloudflare free tier)

The optional comment system uses Cloudflare Workers and D1. The code is in `comments-worker/`. Create a D1 database named `portfolio-comments` in the Cloudflare dashboard and run `schema.sql` in its console. Create a Worker using `worker.js`, bind the database as `DB`, set `ALLOWED_ORIGIN` to the exact origin of the published site (for example `https://username.github.io`), and set a long random secret named `RATE_LIMIT_SECRET`. Deploy the Worker. In `content/profile.json`, set `commentsApi` to the Worker's HTTPS URL, then rebuild. Readers can comment without accounts.

Comments are immediately public. The Worker limits each IP to 30 comments per hour; this is basic spam deterrence, not a guarantee. Review or delete comments using the D1 console; for example, select rows from the comments table and delete by id. Do not put the secret in the site or repository. The comment widget is hidden until `commentsApi` is configured. Cloudflare free-plan usage limits still apply.
