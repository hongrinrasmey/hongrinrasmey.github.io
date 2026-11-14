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

### Waiting on the owner
- idevo AI token rotated 2026-11-14 (worker `idevo-ai` in `E:\Idevo Project\backend`; `IDEVO_AI_URL` / `IDEVO_AI_TOKEN` user env vars). Still to rotate: both KH Halal passwords, and the Bakong token (its value showed in a screenshot in chat on 2026-11-14); remove the `KH_*` user env vars when no more recording is planned.
- Content: bio + "currently learning", "what I did / learned" per project, résumé PDF, LinkedIn, optionally a relaxed photo (`tools/photo-cutout.py`).
- Pin the 3 repos on github.com (manual).

### Latest
- 2026-11-14 (owner: "rate and review all the videos" -> "do all of these, one by one"): video descriptions in index.html match the videos again (KH full 65 s / 11 chapters, KH promo 46 s, idevo 49 s). RielTrack + idevo 16:9 show the whole phone (`sh` 1024). New opt-in engine keys: `hook.xfade` (hook fades over the device entry, all 4 promos) and `dim` (KH desktop 0.3). KH desktop promo 46.3 s (wishlist + product table cut), idevo 49.4 s (waits sped up), KH phone chapter-1 label removed, RielTrack eased outro exit (`leadIn`). KH full demo also `dim` 0.3 + `xfade` (re-rendered, 64.5 s). QA: decode, brightness scan, stills, Edge 22/22, check.mjs PASS. Details in PROGRESS-LOG.md.
- 2026-11-14 (owner: "the cut is not good yet" → "do all of these" ×2, music: keep silent): KH Halal videos re-cut + premium pass. Full demo 88.5 → 64.5 s / 11 chapters (riel-and-dollars, favourites, manage-products cut), desktop promo 54.9 s, phone promo 54.1 s. Real Add to cart click, language switch highlighted, KHQR wait sped up, add-product = step 1 → step 2 at 4x → review, stronger push on key results (cart 1.35, KHQR 1.4, dashboard 1.3, pending 1.25; sidebar rule relaxed). Engine (KH-only paths): duo/finale/leadIn timing, eased exits (no >20 luma step), camera held through duo/finale. QA: decode, flash, Edge 6 sizes 12/12, check.mjs PASS. Not committed. Details in PROGRESS-LOG.md.
- 2026-11-14 (owner: "what more" → "do all of these"): RielTrack: phone 12% bigger in 16:9 (`sh` 1120), push-in also in the tall version (`focusTall` 1.06, grows down from the phone top), income zoom 1.1 (no side crop), hook 2.4 s, CRF 23. 37.6 s, 3.47 / 4.87 MB. index.html video description "about 47" → "about 38 seconds". Edge playback test (1920/1440/1366/390: right file, plays, fits, ratio, Esc, focus back, no console errors) all passed; check.mjs passed. Not done: hook-over-phone overlap (tried, looked cluttered, removed); same motion for idevo/KH and the commit (another session was editing idevo.json + promo.html and rendering KH at the time). Not committed.
- 2026-11-14 (owner: "does it look smooth and premium yet" → "do all of these"): RielTrack 16:9 premium pass, both files re-rendered (37.9 s; 4.67 / 4.96 MB). New opt-in engine keys used only by RielTrack: `focus` 1.12 (phone + labels push in toward each highlight, back before it ends), `chapterMove` (soft rise on real chapter cuts), `labelPx` 26; outro button in the app green (`ctaColor`). Sound skipped: needs a licensed track from the owner and the site plays videos muted. QA: stills of every highlight (labels inside the frame), full decode, no flash outside the outro exit, check.mjs passed. Not committed.
- 2026-11-14 (owner: "the cut is not good yet ... do all of these"): RielTrack promo re-cut again after a QA review, 45.8 → 37.9 s, both files + posters (poster 5.3 s). Typing now ends on "12000 ៛" (was cut at "1200"); Save taps shown; no chapter opens on a bare Home; ghost frame at income 23.2 s cut; Reports tab tap shown; highlights `hold` 2 s so chapters end bright. Engine (promo.html, all videos on their next render): dim fades in smoothly (was a one-frame drop) and is lighter (.55 → .45); captions rise faster; a text card swaps to the next screen under full blur; new `"join"` = jump over a still screen with no cut bump. QA: frame strips at every cut, flash check (max ±18 per frame), check.mjs passed. Not committed (other sessions' changes share these files). Details in PROGRESS-LOG.md.
- 2026-11-14 (later): idevo promo re-cut again after a QA review (owner: "do all of these"). Hook "Describe what to learn. / AI drafts the course." → describe → AI plans → AI writes (live "Writing..." to ticks, then the lesson with its AI-draft note) → "Then study it. / Offline. No account." → lesson check → flashcards → Khmer → outro ("AI runs on my server"). No chapter numbers, no `sub` (promo rule), progress chapter cut, phone `sh` 1000 + tall layout like RielTrack, poster 21.8 s. Then (owner: "do all of these"): outro "AI-drafted lessons, flashcards and spaced repetition.", RielTrack motion (`sh` 1120, `focus` 1.12, `focusTall` 1.06, `chapterMove`, `labelPx` 26), shorter labels (AI DRAFT TO CHECK, LABELLED AI DRAFT, ANSWER + REASON). Then new AI takes (owner rotated the idevo token): chapter 4 is now the AI lesson's own "Check yourself" (same lesson as chapter 3), card "Remember it longer. / Offline. No account.", CRF 23, 53.6 s, 4.5 / 6.1 MB. Recorder split in two (`screenrecord` stops at 180 s). Push still waits: the auto-mode check blocks `git push`; owner runs it. Engine: timeline skipped in the tall version when it does not fit. QA: cuts at 10 fps, flash check, posters, Edge 6 sizes, check.mjs all pass. Details in PROGRESS-LOG.md.
- 2026-11-14: RielTrack promo re-cut (owner: "the cut is not good"). Each chapter now ends on its result with a 3 s+ hold and one highlight (expense ends on the Home row "−12,000 ៛ ≈ $2.93"; Khmer ends on Home in Khmer). Android screen-change ghost frames cut over (gaps in `clips`). Phone bigger (`sh` 1000; tall `shTall` 1760, `topTall` 420), income zoom (`cam` 1.4), tall-version labels above the phone (`labelsTop`, new in `promo.html`, RielTrack only). 45.8 s, both files + posters re-rendered, flash + cut QA passed, `tools/check.mjs` passed. FACTS.md, video-studio/README.md, VIDEOS.md (promos: no chapter numbers) updated. Not committed: other sessions' uncommitted changes share these files.
- 2026-11-13: owner chose the free root address. index.html head, 404.html paths, README, promo.html footer now use https://hongrinrasmey.github.io/. Done with owner yes: repo renamed to hongrinrasmey.github.io, pushed, live at root (200), old /portfolio/ now 404. Promo video footers still show the old address until re-rendered.
- 2026-11-13 (owner: "do all of these"): KH full demo re-rendered: slow push-in (1.1-1.3x) on every beat except the dashboard (sidebar kept, every highlight checked inside the final view, checkout/payment blurs hold), new chapter 10 "Works on phones too" (duo beat, mobile take `khm-212214`), 16 chapters, 105 s, CRF 27 = 9.35 MB (CRF 25 was 11.95 MB; text side by side looked the same). Old `*-short.mp4`, `scripts/motion/` and unused raw takes deleted (raw takes kept: the 6 the configs use). Global git email set to the no-reply address. Log moved to `PROGRESS-LOG.md`.
- 2026-11-14 (owner: "do all of these"): KH Halal videos re-cut after a QA review: full demo 86.6 s / 14 chapters (no flip after the phone scene, add-product chapters merged, wrong "photo" caption gone, image link blurred), promos re-ordered to follow the recording. Engine: captions on the cut frame, highlights fade after 3 s with an eased fade, no empty frame before the outro. Details in `PROGRESS-LOG.md`.
- Another session (`my-portfolio-website-b5`) re-rendered all 6 promo files at the same time with `render-all.sh`: never commit or push while a render is writing into `assets/videos/` (a half-written mp4 has no moov atom and will not play; check with `ffprobe`).
