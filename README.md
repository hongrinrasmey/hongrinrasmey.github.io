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
js/main.js            theme toggle, mobile menu, animations, copy buttons, video pop-up, T shortcut
assets/images/        project screenshots, your photo (later), og-image.png (link preview picture)
assets/icons/         tech logos from simpleicons.org (the page uses copies inside index.html)
assets/fonts/         Geist + Geist Mono font files (self-hosted) and their licence
assets/videos/        short project demo clips (create this folder when you have one)
assets/resume.pdf     your résumé (optional)
favicon.svg           the small icon in the browser tab (+ favicon-32.png, apple-touch-icon.png)
site.webmanifest      name and colour when someone saves the site to a phone home screen
404.html              the "page not found" page
robots.txt            tells search engines they may read the site
vercel.json, _headers security settings for Vercel / Netlify (GitHub Pages ignores them)
tools/                helpers to re-make og-image.png and the PNG icons (not part of the page)
```

## 2. How to edit

### Your text and links → `index.html`
Each part of the page starts with a comment, for example `<!-- ===== 01 · SELECTED WORK ===== -->`.
Search the file for `TODO` and replace every `[TODO: ...]` with your own words.

| What | Look for this comment |
|---|---|
| Browser tab title, Google text, link preview | `PAGE INFO` and `SHARING PREVIEW` at the top |
| Name, role, intro, "Available for work", "Currently", stats | `00 · HERO` |
| KH Halal Marketplace, idevo, RielTrack | `01 · SELECTED WORK` |
| Bio, photo, skills | `02 · ABOUT` |
| Jobs and education (hidden for now) | `03 · EXPERIENCE` |
| Email, GitHub, LinkedIn, Telegram, résumé | `04 · CONTACT` |
| Name and "Last updated" in the footer | `FOOTER` |

Section numbers on the page (01, 02, 03…) count themselves, so they stay right if you show or hide a section.

### Buttons that hide themselves
- A link left as `href="#"` is **hidden**. Put a real address in and the button appears.
  This works for: Try live demo, Download APK, Download résumé, LinkedIn, Telegram.
- When you add a live demo or download link, delete the small "Demo coming soon" / "Download coming soon" note next to it.
- "Watch video" shows once you fill in `data-video="..."` with a file (`assets/videos/rieltrack.mp4`)
  or a YouTube link. `data-poster="..."` is an optional still picture shown before it plays.
- Demo login: write it in the visible text **and** in `data-copy="..."`, then delete the word `hidden`.
- All three repos are private, so each card says "Private repo". If you make one public, the comment above the
  projects shows the "View code" button to put there instead.

### Add a new project
1. In `index.html`, find `<!-- OTHER PROJECTS -->`.
2. Copy a whole `<article class="project-card ..."> ... </article>` block (idevo or RielTrack).
3. Paste it below and change the name, one-line text, tags, links and screenshots.
   (Only the featured card shows the longer problem text and 3 key features; the smaller cards keep
   theirs in a comment, in case you swap which project is featured.)

### Change images
- **Web app screenshot** (16:10, about 1600 × 1000): see the KH Halal Marketplace card.
- **Phone screenshots** (about 390 × 844 each, 1–3 per app): see the idevo card. Each one sits in a `<div class="phone">`.
- **RielTrack** has no screenshot yet. The comment above its "Screenshot coming soon" box shows what to paste.
- Your photo: save it as `assets/images/me.webp`, then remove the comment marks at `HERO AVATAR` (small round photo in the hero) and `MY PHOTO` (About section).
- Always write a short `alt="..."` that says what the picture shows.

### Change colours → top of `css/style.css`
Change `--accent` (orange fills: buttons, dot, progress bar) and `--accent-text` (orange text and links).
The light theme has its own `--accent-text` a few lines below, darker so it stays readable on white.
Other colours (`--bg`, `--surface`, `--text`, `--muted`, …) sit next to them. Change the dark and light values together.

### Change fonts
1. Put the new `.woff2` files in `assets/fonts/` and change the `@font-face` blocks at the top of `css/style.css` (and the `preload` link near the top of `index.html`).
2. In `css/style.css`, change `--font-sans` and `--font-mono`.

### Turn an effect off
At the bottom of `js/main.js` there is a list like `initTilt();`, `initReveal();`, `initSplitText();`.
Delete a line to switch that effect off. Everything also switches off by itself for visitors who
turned on "reduce motion" in their system settings.

### Keyboard shortcuts on the site
Press `T` to switch light / dark theme.

### Link preview picture and tab icon
- `assets/images/og-image.png` is the picture shown when someone shares your link. To put your name on it, edit
  `tools/og-image.html` and follow the steps written at the top of that file.
- `favicon.svg` is the tab icon. The comment inside it shows how to put your initials in. Then re-make
  the PNG icons with the two commands at the top of `tools/icon.html`.

## 3. Image tips
- Use **WebP**. Web screenshots about **1600 px wide**, under **300 KB**; phone screenshots about 390–780 px wide.
- Free tool: https://squoosh.app (drop the image in, choose WebP, quality ~75).
- Use real screens with realistic data, and hide personal information.
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
leave all build settings empty → Deploy. Their security settings come from `_headers` (Netlify) and `vercel.json` (Vercel).

**Custom domain** (for example `yourname.dev`): buy it from any domain seller, then add it in
GitHub Pages (Settings → Pages → Custom domain), Netlify (Domain management) or Vercel (Settings → Domains)
and copy the DNS records they show into your domain seller's DNS settings. HTTPS is switched on by the host.
Once you have the domain, also fill in the `canonical` / `og:url` lines and the full image address in `<head>`,
and add a sitemap line to `robots.txt`.

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
The live site updates by itself within a minute or two. Change "Last updated" in the footer when you do.

## 6. Still TODO
- [ ] Your name, role and one-line intro (hero, header, footer, `<title>`, description, sharing text, JSON-LD, `404.html`, `site.webmanifest`).
- [ ] Bio, city, whether you're open to remote work, contact sentence, email.
- [ ] LinkedIn link (Telegram optional).
- [ ] KH Halal Marketplace: live demo link (and demo login if it has one).
- [ ] idevo: a public download link (the APKs are only in the private repo's releases).
- [ ] RielTrack: phone screenshots (`assets/images/rieltrack.webp`).
- [ ] Optional: demo videos, `assets/images/me.webp`, `assets/resume.pdf`, "Currently" line, quick stats, Experience, reply time.
- [ ] Your initials in `favicon.svg`, then re-make the PNG icons and `og-image.png`.
