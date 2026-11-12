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
js/main.js            theme toggle, mobile menu, animations, copy buttons, video pop-up, terminal, T shortcut
assets/images/        project screenshots, your photo (later), og-image.png (link preview picture)
assets/fonts/         Geist + Geist Mono font files (self-hosted) and their licence
assets/videos/        project demo videos + poster pictures (made by scripts/, see "Demo videos" below)
assets/resume.pdf     your résumé (optional)
favicon.svg           the small icon in the browser tab (+ favicon-32.png, apple-touch-icon.png)
site.webmanifest      name and colour when someone saves the site to a phone home screen
404.html              the "page not found" page
robots.txt            tells search engines they may read the site
vercel.json, _headers security settings for Vercel / Netlify (GitHub Pages ignores them)
tools/                helpers: og-image.png, PNG icons, photo cut-out, check.mjs (not part of the page)
tools/source/         your original photo (git-ignored, never put online)
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
| How you build, education, spoken languages | `02 · ABOUT` |
| Email, GitHub, LinkedIn, Telegram, résumé | `03 · CONTACT` |
| Name and "Last updated" in the footer | `FOOTER` |

Section numbers on the page (01, 02, 03…) count themselves, so they stay right if you show or hide a section.

### Buttons that hide themselves
- A link left as `href="#"` is **hidden**. Put a real address in and the button appears.
  This works for: Try live demo, Download APK, Download résumé, LinkedIn, Telegram.
- When you add a live demo or download link, delete the small "Demo coming soon" / "Download coming soon" note next to it.
- "Watch video" shows once you fill in `data-video="..."` with a file (`assets/videos/rieltrack.mp4`)
  or a YouTube link. `data-poster="..."` is an optional still picture shown before it plays.
- Demo login: write it in the visible text **and** in `data-copy="..."`, then delete the word `hidden`.
- All three repos are private, so no card has a code link. If you make one public, the comment above the
  projects shows the "View code" button to add.

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
- Your photo: `assets/images/me.webp` (800 × 1000, in the hero: above your name on phones, right of it on wide screens). To change it, replace that file (same name, 4:5 shape).
- Always write a short `alt="..."` that says what the picture shows.

### Change colours → top of `css/style.css`
Change `--accent` (orange fills: buttons, dot) and `--accent-text` (orange text and links).
The light theme has its own `--accent-text` a few lines below, darker so it stays readable on white.
Other colours (`--bg`, `--surface`, `--text`, `--muted`, …) sit next to them. Change the dark and light values together.

### Change fonts
1. Put the new `.woff2` files in `assets/fonts/` and change the `@font-face` blocks at the top of `css/style.css` (and the `preload` link near the top of `index.html`).
2. In `css/style.css`, change `--font-sans` and `--font-mono`.

### Turn an effect off
At the bottom of `js/main.js` there is a list like `initSpotlight();`, `initReveal();`, `initSplitText();`.
Delete a line to switch that effect off. Everything also switches off by itself for visitors who
turned on "reduce motion" in their system settings.

### Keyboard shortcuts on the site
Press `T` to switch light / dark theme. Press `` ` `` (or click the orange `>_` in the header) to open the terminal.

### The terminal
A small pop-up where visitors type commands (`help`, `whoami`, `projects`, `open idevo`, `email`, `theme`…).
Its answers are read from your page, so when you change your text or add a project card, the terminal
updates by itself. To add or change a command, edit `initTerminal()` in `js/main.js` (the list is
called `cmds`, and the `help` lines are just above it). To remove the terminal, delete `initTerminal();`
at the bottom of `js/main.js`.

### Scroll and mouse effects
- The KH Halal screenshot zooms in from 1.15× as its card comes in: the `settle` animation.

### Link preview picture and tab icon
- `assets/images/og-image.png` is the picture shown when someone shares your link. To put your name on it, edit
  `tools/og-image.html` and follow the steps written at the top of that file.
- `favicon.svg` is the tab icon. It draws an orange `>_` prompt (same as the mark before your name in the header). Then re-make
  the PNG icons with the two commands at the top of `tools/icon.html`.

## 3. Image tips
- Use **WebP**. Web screenshots about **1600 px wide**, under **300 KB**; phone screenshots about 390–780 px wide.
- Free tool: https://squoosh.app (drop the image in, choose WebP, quality ~75).
- Use real screens with realistic data, and hide personal information.
- Demo videos: MP4, 20–40 seconds, muted, under 5 MB.

### Demo videos (re-make after an app update)
The three videos are real recordings with motion graphics added (frame, zoom, tap ripples, captions).
You need: the Android emulator `Pixel_API37`, ffmpeg, Node.js, and Playwright in any folder
(`npm i playwright@1.49.1`, then set `NODE_PATH` to that folder's `node_modules`).
1. Record (Git Bash, from this folder):
   - RielTrack: `bash scripts/record-rieltrack.sh` (needs the sample data in the app first, see the top of the script;
     `bash scripts/seed-rieltrack.sh` adds the older, past-dated sample entries, run it once)
   - idevo: `bash scripts/record-idevo.sh` (emulator only: it runs `scripts/seed-idevo.sh` first, which wipes the app,
     loads the sample path and studies it on earlier days by moving the emulator clock, then sets the clock back)
   - KH Halal: `node scripts/record-kh-halal-marketplace.js` (live site: guest, then customer wishlist, then seller
     pages; never checkout or payment). It signs in off camera with logins from environment variables only:
     `KH_CUSTOMER_EMAIL`, `KH_CUSTOMER_PASSWORD`, `KH_SELLER_EMAIL`, `KH_SELLER_PASSWORD` (never write them in a file).
   Raw files land in `assets/videos/<slug>-raw/` (not uploaded to GitHub).
2. In `scripts/motion/<slug>.json`, point `raw` and `tapLog` at the new files and adjust the clip times
   (`segments`, optional speed as a third number), captions (`tag` = GUEST / CUSTOMER / SELLER) and
   `camera` zooms (`[time, zoom, x, y]` in recorded pixels).
3. Render: `node scripts/motion/render.js scripts/motion/<slug>.json` → `assets/videos/<slug>.mp4` + poster.
   Add `--from 0 --to 8 --out test.mp4` for a quick preview.

## 4. Put it online (free)
**GitHub Pages** (this site: `https://hongrinrasmey.github.io/portfolio/`, repo `hongrinrasmey/portfolio`)
1. Push changes: `git push`. The site updates about a minute later.
2. Pages setting (already on): **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. `.nojekyll` tells GitHub to serve the files as they are (no Jekyll build).
4. The address `/portfolio/` is written in `404.html` and in `<head>` of `index.html` (canonical, og:url,
   og:image, twitter:image, JSON-LD url). Renaming the repo or moving host: change those.

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
After editing, check the page (needs Node 22+ and Edge or Chrome; it prints PASS/FAIL):
```
node tools/check.mjs
```
Then:
```
git add .
git commit -m "Describe what you changed"
git push
```
The live site updates by itself within a minute or two. A replaced photo or screenshot (same file name) can take up to a day to show for people who visited before (browser cache, set in `vercel.json` / `_headers`). Change "Last updated" in the footer when you do.

## 6. Still TODO
- [x] Your name (Hong Rinrasmey), favicon `>_` prompt, sharing picture.
- [x] Role and one-line intro (hero, `<title>`, description, sharing text, JSON-LD, `tools/og-image.html` role line).
- [x] City (Phnom Penh), open to remote work, contact sentence. A short bio for About is still optional.
- [x] Email.
- [ ] LinkedIn link (Telegram optional).
- [x] KH Halal Marketplace: live demo link (add a demo login if it has one).
- [x] idevo: public download in `hongrinrasmey/Idevo-Downloads`. For a new version, add a release there and change `v0.6.4` on the card.
- [x] RielTrack: phone screenshots (`assets/images/rieltrack.webp`, `-2`, `-3`).
- [x] Your photo (`assets/images/me.webp`, made by `tools/photo-cutout.py`).
- [x] Education (Bachelor's in Business Information Technology, National University of Management, 2023–2026).
- [x] Demo videos for all 3 projects (`assets/videos/`, "Watch video" on each card).
- [ ] Optional: `assets/resume.pdf`, "Currently" line, quick stats, reply time.
