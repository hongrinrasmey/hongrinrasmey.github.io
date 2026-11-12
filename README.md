# My Portfolio Website

A one-page developer portfolio. Plain HTML, CSS and JavaScript: no framework, no build step, nothing to install.
The full design spec is in `DESIGN.md`.

## 1. Open the site
Double-click `index.html`. It opens in your browser.
(Or, in VS Code, right-click `index.html` → **Open with Live Server** if you have that extension.)

## Files
```
index.html            all the text, projects and links
css/style.css         all the styles (colours, fonts and sizes are at the top)
js/main.js            theme toggle, mobile menu, scroll animations, copy buttons, video pop-up
assets/images/        your photo, project screenshots, og-image.png (link preview picture)
assets/videos/        short project demo clips (create this folder when you have one)
assets/resume.pdf     your résumé (optional)
favicon.svg / .png    the small icon in the browser tab
404.html              the "page not found" page
robots.txt            tells search engines they may read the site
tools/                helpers to re-make og-image.png and favicon.png (not part of the page)
```

## 2. How to edit

### Your text and links → `index.html`
Each part of the page starts with a comment, for example `<!-- ===== 01 · PROJECTS ===== -->`.
Search the file for `TODO` and replace every `[TODO: ...]` with your own words.

| What | Look for this comment |
|---|---|
| Browser tab title, Google text, link preview | `PAGE INFO` and `SHARING PREVIEW` at the top |
| Name, role, intro, "Available for work" label | `00 · HERO` |
| RielTrack, FileShift, more projects | `01 · PROJECTS` |
| Bio, photo, skills | `02 · ABOUT` |
| Jobs and education (hidden for now) | `03 · EXPERIENCE` |
| Email, GitHub, LinkedIn, Telegram, résumé | `04 · CONTACT` |
| Name in the footer | `FOOTER` |

Section numbers on the page (01, 02, 03…) count themselves, so they stay right if you show or hide a section.

### Buttons that hide themselves
- A link left as `href="#"` is **hidden**. Put a real address in and the button appears.
  This works for: Try live demo, View code, Download résumé, GitHub, LinkedIn, Telegram.
- No live demo yet? A small "Demo coming soon" note shows by itself.
- "Watch video" shows once you fill in `data-video="..."` with a file (`assets/videos/rieltrack.mp4`)
  or a YouTube link. `data-poster="..."` is an optional still picture shown before it plays.
- Demo login: write it in the visible text **and** in `data-copy="..."`, then delete the word `hidden`.
- Private code: delete the "View code" link and remove the comment marks around `Private repo`.

### Add a new project
1. In `index.html`, find `<!-- OTHER PROJECTS -->`.
2. Copy the whole `<article class="project-card ..."> ... </article>` block of FileShift.
3. Paste it below FileShift and change the name, text, tags, links and screenshot.
One extra project fills the full width; two or more sit side by side.

### Change images
Put the file in `assets/images/`, then in `index.html` replace the
`<div class="placeholder">Screenshot coming soon</div>` with the `<img ...>` line shown in the comment
above the projects. Always write a short `alt="..."` that says what the picture shows.
Your photo: see the comment `MY PHOTO` in the About section.

### Change colours → top of `css/style.css`
Change `--accent` (the lime). The light theme has its own, darker `--accent` a few lines below so it stays readable on white.
Other colours (`--bg`, `--text`, `--muted`, …) sit next to it. Change the dark and light values together.

### Change fonts
1. In `index.html`, change the Google Fonts `<link>` (near the top).
2. In `css/style.css`, change `--font-heading`, `--font-body` and `--font-mono`.

### Link preview picture and tab icon
- `assets/images/og-image.png` is the picture shown when someone shares your link. To change the name on it, edit
  `tools/og-image.html` and follow the steps written at the top of that file.
- `favicon.svg` is the tab icon. The comment inside it shows how to put your initials in. Then re-make
  `favicon.png` with `tools/icon.html`.

## 3. Image tips
- Use **WebP** screenshots about **1600 px wide**, under **300 KB** each.
- Free tool: https://squoosh.app (drop the image in, choose WebP, quality ~75).
- Keep the 16:10 shape (for example 1600 × 1000) so screenshots fill their box.
- Demo videos: MP4, 20–40 seconds, muted, under 5 MB.

## 4. Put it online (free)
**GitHub Pages**
1. Create a repository on GitHub and push this folder:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save.
3. After a minute the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
   Tip: name the repository `YOUR-USERNAME.github.io` and the address becomes just `https://YOUR-USERNAME.github.io/`.

**Netlify or Vercel** (also free): sign in with GitHub → **Add new site / New project** → pick the repository →
leave all build settings empty → Deploy.

**Custom domain** (for example `yourname.dev`): buy it from any domain seller, then add it in
GitHub Pages (Settings → Pages → Custom domain), Netlify (Domain management) or Vercel (Settings → Domains)
and copy the DNS records they show into your domain seller's DNS settings.
Once you have the domain, also fill in the `canonical` / `og:url` lines and the full image address in `<head>`.

**404 page note:** `404.html` uses addresses that start with `/`. That is right for Netlify, Vercel, a custom
domain and `username.github.io`. If your site lives at `username.github.io/REPO-NAME/`, put `/REPO-NAME`
in front of each `/` address in `404.html` (the comment at its top explains).

## 5. Update the live site
After editing:
```
git add .
git commit -m "Describe what you changed"
git push
```
The live site updates by itself within a minute or two.

## 6. Still TODO
- [ ] Every `[TODO: ...]` in `index.html` (search for `TODO`): name, role, intro, bio, city, what work you're open to, skills, both project descriptions, features and tech, contact sentence, email.
- [ ] `<title>`, description and sharing text at the top of `index.html`; your name in the JSON-LD block and `404.html`.
- [ ] Links: live demos, code, GitHub, LinkedIn (Telegram optional).
- [ ] Show the "Available for work" label in the hero if you are available.
- [ ] Screenshots: `assets/images/rieltrack.webp`, `assets/images/fileshift.webp`. Optional: `me.webp`, demo videos, demo logins.
- [ ] Optional: `assets/resume.pdf`, Experience section, your initials in `favicon.svg`.
- [ ] Re-make `og-image.png` with your real name (see `tools/og-image.html`).
