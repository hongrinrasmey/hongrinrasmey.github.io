# CLAUDE.md — My Portfolio Website

Read this whole file before doing anything. These rules override any default habits.
**Agents: read section 13 (Progress log) first to see where the work stands, then continue from there. Update section 13 after every change.**
**The owner's newest spec (pasted in chat on 2026-11-12, "Warm orange" version: projects KH Halal Marketplace, idevo, RielTrack; orange `#FF6B35`; Geist + Geist Mono) is what the site follows. Since 2026-11-12 `DESIGN.md` on disk IS that version (the owner approved replacing the old lime one; the old one is in git history, commit d7be336). Where anything below differs, follow DESIGN.md.**

## 1. What this project is
A simple, clean, personal developer portfolio. Its only job: show who I am, what I've built, and how to contact me.
I want a website that is easy for ME to edit and update. Simple beats impressive.

## 2. Golden rules (most important — never break these)
1. **Never invent content.** No fake names, fake bios, fake projects, fake metrics, fake testimonials, fake companies.
2. **Only use the details in section 3 ("My details").** If something is missing, use an obvious text placeholder like `[TODO: add project link]` — never a realistic-looking fake.
3. **No stock, city, or decorative photos.** The only images allowed are: my own photo and screenshots of my own projects, which I will put in `assets/images/`. If an image is missing, use a clean text/typography layout or a simple neutral box labeled "Screenshot coming soon".
4. **Do not theme the site around a city, country, or culture.** My location is one line of text, nothing more.
5. **Do not add features I didn't ask for.** No blog, no CMS, no widgets (weather, time zone, live data), no extra pages. If you think something would help, ASK first — don't build it.
6. **Keep it simple.** No framework, no build step, no npm packages unless I approve. It must open by double-clicking `index.html`.
7. **Explain in plain language.** I'm still learning. After each change, tell me in 2–4 short sentences what you changed and which file to edit if I want to change it myself.

## 3. My details (the ONLY content source)
Filled in by the owner (2026-11-12/13). Anything still missing stays a hidden `[TODO]` slot in `index.html`.
- Name: Hong Rinrasmey
- Role: Full-Stack & Android Developer
- One-line intro: "I design and ship web and mobile apps."
- Bio (2–3 sentences): [TODO: owner] (slot commented out in About). "Currently learning": [TODO: owner]
- Location: Phnom Penh, Cambodia — open to remote work: yes. Wants full-time developer roles.
- Honesty rule: the apps were built with AI coding tools; the owner says so on the page. No skill levels or percentages.
- Projects (facts in `DESIGN.md` §5 and `video-studio/FACTS.md`):
  1. KH Halal Marketplace — halal marketplace for Cambodia, Khmer + English (web, featured) — Live: https://kh-halal-marketplace.onrender.com/ — Code: private
  2. idevo — notes library and learning companion; study offline, built-in AI needs the internet and runs only on the owner's server (Android) — Download: https://github.com/hongrinrasmey/Idevo-Downloads/releases/latest — Code: private
  3. RielTrack — money tracker in riel and dollars (Android) — Download: https://github.com/hongrinrasmey/RielTrack-Downloads/releases/latest — Code: private
  "What I did / learned" lines per project: [TODO: owner] (slots commented out in each card).
- Experience: none yet. Education: Bachelor's in Business Information Technology (BIT), National University of Management, 2023–2026; final-year project KH Halal Marketplace.
- Languages: Khmer (native) · English (basic)
- Email: hongrinrasmey012@gmail.com (shown on the site). The account email of this PC is private: never put it anywhere.
- GitHub: https://github.com/hongrinrasmey · Telegram: https://t.me/Rasmey_12 · LinkedIn: [TODO: owner, optional]
- Résumé PDF: assets/resume.pdf — no (rows hidden until it exists)
- My photo: assets/images/me.webp — yes (cut-out, made by `tools/photo-cutout.py`)

## 4. Tech stack (keep it exactly this)
- Plain **HTML + CSS + vanilla JavaScript**. No frameworks, no build tools.
- Files:
  ```
  index.html        ← all page content (text I edit lives here)
  css/style.css     ← all styles; colors & fonts as CSS variables at the top
  js/main.js        ← small scripts: theme toggle, mobile menu, scroll animations
  assets/images/    ← my photo + project screenshots
  assets/resume.pdf ← optional
  favicon.svg
  README.md
  ```
- Fonts: Geist + Geist Mono, self-hosted in `assets/fonts/` (DESIGN.md). Noto Sans Khmer loads only when the page has Khmer text.
- Icons: inline SVG (no icon library).
- Contact: `mailto:` link + copy-email button. A form only if I ask (then use Formspree).

## 5. Page structure (one page)
1. **Header**: my name (left), links Work / About / Contact (right), dark/light toggle. On mobile: a hamburger menu that opens/closes accessibly.
2. **Hero**: name, role, one-line intro, buttons "View my work" and "Contact me". Optional "Open to work" badge.
3. **Projects**: 2–4 cards. Each card: screenshot (if provided), name, one-line description, tech tags, "Live" and "Code" buttons (hide a button if there's no link).
4. **About**: short bio, my photo (if provided), skills as simple tags. NO skill percentage bars.
5. **Experience** (only if I provided it): simple list or timeline.
6. **Contact**: short friendly line, email button, copy-email button, GitHub/LinkedIn icons, résumé download (if provided).
7. **Footer**: © year + name.

## 6. Design
- Style: modern, minimal, professional. Lots of whitespace, strong typography, clean grid.
- Colors: follow `DESIGN.md` (warm orange): background `#0C0A09`, ONE accent `#FF6B35` (light-mode text accent `#C2410C`) used only for buttons, links and highlights. The old lime `#C6F432` is no longer used.
- Dark mode is default; follows system preference; choice saved in localStorage; no flash of wrong theme on load.
- Avoid: purple/blue gradient blobs, glassmorphism, emojis as decoration, busy backgrounds, stock illustrations.
- Max content width ~1100px, consistent spacing (multiples of 8px), consistent border radius.

## 7. Responsive (required)
- Mobile-first. Must look right at **360px, 390px, 768px, 1024px, 1440px**.
- No horizontal scrolling, text readable without zoom, buttons at least 44px tall for tapping.
- Project cards: 1 column on phone, 2 on tablet/desktop.
- Use `clamp()` for font sizes so text scales smoothly.

## 8. Animations (subtle, light)
- Sections fade + slide up slightly when scrolled into view (IntersectionObserver + CSS, no library).
- Hero text staggers in on page load.
- Project cards: small lift + accent border on hover. Buttons: smooth hover color change.
- Animate only `transform` and `opacity`. Keep it smooth (60fps).
- **Everything off when the user has `prefers-reduced-motion` enabled.**
- Content must be visible even if JavaScript fails.

## 9. Quality checklist
- **Accessibility**: semantic HTML (header, nav, main, section, footer), one `<h1>`, alt text on images, visible focus outlines, keyboard-usable menu and toggle, `aria-label` on icon-only buttons, good color contrast (WCAG AA).
- **Performance**: compressed images (WebP preferred, under ~300 KB each), `loading="lazy"` and width/height on images, no unused CSS/JS. Aim for Lighthouse 90+.
- **SEO & sharing**: `<title>`, meta description, Open Graph tags (title, description, image), favicon, `lang="en"`.
- No console errors. No broken links.

## 10. How to work (process for the agent)
1. Before building, briefly show me the plan (sections + colors + fonts) in a few lines, then build.
2. If section 3 still has `[...]` placeholders, ask me for the missing details FIRST. Don't fill them with made-up content.
3. After building, check the page at mobile and desktop widths and fix any layout problems.
4. Run through the checklist in section 9 and fix issues.
5. Write `README.md` with simple steps: how to open the site, how to edit text/projects/images/colors, how to deploy.
6. Use git: commit after each working step with a clear message.
7. Finish with a short summary: what was built, which files to edit, and anything still marked TODO.

## 11. How I edit the site later (keep this true)
- Text, projects, links → edit `index.html` (each section clearly commented, e.g. `<!-- ===== PROJECTS ===== -->`).
- To add a project → copy one project card block in `index.html` and change the text/image/links.
- Colors/fonts → change the CSS variables at the top of `css/style.css`.
- Images → put files in `assets/images/` and update the file name in `index.html`.

## 12. Deployment
- Free hosting: GitHub Pages, Netlify, or Vercel (any works — no build step needed).
- README must explain: push to GitHub → enable GitHub Pages (or import to Vercel/Netlify) → site is live; and how to connect a custom domain.

## 13. Progress log (agents: read first, update after every change)

Full history: `PROGRESS-LOG.md` (every earlier entry, word for word). Read it when you need the reason behind a choice.

### Current state (2026-11-13)
- **Live:** https://hongrinrasmey.github.io/ (repo `hongrinrasmey/hongrinrasmey.github.io`, GitHub Pages from `main`). Push = live about a minute later. Repo and global git email: `248713826+hongrinrasmey@users.noreply.github.com`.
- **Page:** header (`>_` terminal button, theme toggle) → hero (cut-out photo, name, role, intro) → 01 Work (KH Halal featured with 3 desktop screens, idevo + RielTrack with phone frames) → 02 About (AI note, education, languages) → 03 Contact (list rows) → footer. No `[TODO]` text shows on the page.
- **Videos:** "Watch video" = promo per app (`<slug>-promo.mp4`, phones `<slug>-promo-mobile.mp4`); "Full demo" = KH Halal only (`kh-halal-marketplace.mp4`, hidden on phones). Made in `video-studio/` (README there); rules + QA in `VIDEOS.md`; recorders in `scripts/`. Raw takes in `assets/videos/*-raw/` (git-ignored): only the 6 takes the configs use are kept.
- **Budgets (DESIGN.md §12, owner approved):** CSS ≤ 36,000 bytes (about 35,500 used), JS ≤ 27,000 (about 25,500 used). Trim comments before adding code.
- **Checks after every change:** `node tools/check.mjs`; taste-skill lint 0/0; for videos the `VIDEOS.md` checklist. Exact commands (lint, inspector, Lighthouse): "How to re-run the checks" in `PROGRESS-LOG.md`.

### Hard rules learned (do not undo)
- Never invent content. Never film or show: Account/profile pages, messages, payouts, buyer names; blur email/phone/address. Never press "Place order". Logins and the idevo AI token only from env vars, never in a file or printed. Emulator only, never the owner's phone.
- No public KH Halal demo login (real-money checkout). No skill percentages. No found/stock photos. No "Private repo" labels. No hero terminal hint, no tilt, no glow behind the name, no contact panel glow.
- Do not push, publish or create public repos without the owner's yes.
- Never commit or push while a render is writing into `assets/videos/` (a half-written mp4 has no moov atom and will not play; check with `ffprobe`). Other sessions may be rendering.

### Waiting on the owner
- idevo AI token rotated 2026-11-14 (worker `idevo-ai` in `E:\Idevo Project\backend`; `IDEVO_AI_URL` / `IDEVO_AI_TOKEN` user env vars). Still to rotate: both KH Halal passwords, and the Bakong token (its value showed in a screenshot in chat on 2026-11-14); remove the `KH_*` user env vars when no more recording is planned.
- Content: bio + "currently learning", "what I did / learned" per project, résumé PDF, LinkedIn, optionally a relaxed photo (`tools/photo-cutout.py`).
- Pin the 3 repos on github.com (manual).

### Latest
- 2026-11-14 (owner: "list everything" -> "do all of these"): live Lighthouse mobile 99/100/100/100, desktop 100 x4. Full QA (check.mjs, lint 0/0, inspector 0 FAIL, theme, reduced motion, no-JS, 44 px targets) found one bug, fixed: phone menu Tab order (js/main.js, Tab loops button <-> links). Videos: duo `inAt`/`outAt` (no dark gap, both KH), KHQR hold trimmed (KH promo 45.7 s), KH phone flip 0.6 s (47.5 s, no jump > 25), idevo lesson scroll 5x (50.6 s). sitemap.xml + robots.txt line. Old Latest entries moved to PROGRESS-LOG.md. Edge 22/22. Pushed with owner yes 2026-11-14; live files checked (same sizes, sitemap 200).
- 2026-11-14 (owner: "rate and review all the videos" -> "do all of these, one by one"): video descriptions in index.html match the videos again (KH full 65 s / 11 chapters, KH promo 46 s, idevo 49 s). RielTrack + idevo 16:9 show the whole phone (`sh` 1024). New opt-in engine keys: `hook.xfade` (hook fades over the device entry, all 4 promos) and `dim` (KH desktop 0.3). KH desktop promo 46.3 s (wishlist + product table cut), idevo 49.4 s (waits sped up), KH phone chapter-1 label removed, RielTrack eased outro exit (`leadIn`). KH full demo also `dim` 0.3 + `xfade` (re-rendered, 64.5 s). KH phone promo 47.3 s (wishlist + product list cut). QA: decode, brightness scan, stills, Edge 22/22, check.mjs PASS. Details in PROGRESS-LOG.md.
- Older entries: `PROGRESS-LOG.md`, "Moved from CLAUDE.md Latest (2026-11-14)".
