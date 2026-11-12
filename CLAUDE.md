# CLAUDE.md — My Portfolio Website

Read this whole file before doing anything. These rules override any default habits.
**Agents: read section 13 (Progress log) first to see where the work stands, then continue from there. Update section 13 after every change.**
**The owner's newest spec (pasted in chat on 2026-11-12, "Warm orange" version: projects KH Halal Marketplace, idevo, RielTrack; orange `#FF6B35`; Geist + Geist Mono) is what the site follows. The `DESIGN.md` file on disk is still the OLDER version (RielTrack/FileShift, lime). Ask the owner to save the new version over it. Where anything below differs, follow the new spec.**

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
- Name: [YOUR NAME]
- Role: [e.g. Full-Stack Developer]
- One-line intro: [e.g. "I build fast, clean websites and apps."]
- Bio (2–3 sentences): [...]
- Location: [City], Cambodia — open to remote work: [yes/no]
- Skills: [e.g. HTML, CSS, JavaScript, React, Node.js]
- Projects (2–4):
  1. [Name] — [one line: what it does] — [tech used] — Live: [link or none] — Code: [link or none] — Screenshot: assets/images/[file or none]
  2. ...
- Experience (optional): [Company — Role — Dates — 1 achievement]
- Email: [...]
- GitHub: [...]
- LinkedIn: [...]
- Résumé PDF: assets/resume.pdf [yes/no]
- My photo: assets/images/me.jpg [yes/no]

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
- Fonts: at most 2 (e.g. "Space Grotesk" for headings, "Inter" for body) via Google Fonts with `display=swap`, or system fonts.
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
- Colors: dark background `#0A0A0A`, light text `#FAFAFA`, ONE accent color `#C6F432` (lime) used only for buttons, links and highlights. Light mode = inverted neutrals with same accent (darken it if needed for contrast).
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

### Current state (2026-11-12, after commit "Rebuild portfolio per DESIGN.md")
- Rebuilt to the owner's new spec: dark "warm orange" palette (`--accent #FF6B35`, light-mode text accent `#C2410C`), Geist + Geist Mono (self-hosted), one page: header → hero → Selected work → About → Contact → footer. 404 page restyled.
- **Projects are real**, taken read-only from GitHub (`gh`): KH Halal Marketplace (`-KH-Hala_Marketplace`, web, featured), idevo (`Idevo`, Android), RielTrack (`RielTrack` + public `RielTrack-Downloads`, Android). All repos private → "Private repo" on every card. Only RielTrack has a public download (releases/latest).
- Screenshots copied from the repos: `kh-halal-marketplace.webp` (PWA wide screenshot, cropped 16:10), `idevo-home/lesson/review.webp` (golden test images, in CSS phone frames). RielTrack has none → "Screenshot coming soon" box.
- Owner answers (2026-11-12): name → leave TODO; role on all 3 → designed and built alone; available → not now (badge hidden); email → leave TODO; skills → the tech from the repos (16 skills, simpleicons logos inlined as an SVG sprite at the top of `<body>`, SVG files kept in `assets/icons/`).
- Still placeholders: name, role, intro, bio, city, remote, contact sentence, email, LinkedIn, KH Halal live demo, idevo public download.
- Signature effects (all in `js/main.js`, one function each): split-text h1, card tilt + cursor spotlight, circle theme reveal (View Transitions), scroll progress bar (CSS scroll timeline + JS fallback), underline-grow links, `T` shortcut. (Scramble, magnetic buttons and marquee were removed: the spec lists them as future ideas.) Skipped on purpose: sticky stacking cards and custom cursor (spec says drop these first if busy).
- Polish: `favicon.svg` (orange square + dot until initials are known), `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest` (added by JS only on http/https, because file:// logs a CORS error), print styles, `vercel.json` + `_headers` security headers, `og-image.png` re-made from `tools/og-image.html`.
- `_old-astro-version/` still exists (git-ignored). Ask the owner before deleting.

### Update 2026-11-12 (later): aligned with the pasted "warm orange" DESIGN.md
The owner pasted the full new DESIGN.md in chat. Its §11.2 says text scramble, magnetic buttons and the tech marquee are "not built now", and §15 names only the `T` shortcut. Changes:
- **Removed:** skills marquee (HTML + CSS), `initScramble`, `initMagnetic`, the `?` shortcuts tip and its footer button. `T` still toggles the theme.
- **Motion tokens** now match §11.1 exactly (`--ease-out-expo`, `--ease-out`, `--ease-in-out`, `--dur-fast/base/slow/hero`). Hero items rise 16px; menu links stagger 40ms with `--ease-in-out`; card tilt max 4° with `perspective(1000px)`; theme circle reveal 500ms.
- **h1** is `clamp(3rem, 8vw, 6.5rem)` (§9.3 table). Contact heading is "Let's work together." (§8.6). Modal backdrop blur 8px. Phone frame radius up to 28px.
- **Fonts self-hosted** (§9.3): `assets/fonts/geist-latin.woff2` (variable 400–700), `geist-mono-latin.woff2` (400–500), `OFL.txt`. `@font-face` at the top of `css/style.css`. The preload is added by the `<head>` script only on http/https (file:// blocks it with a CORS error); 404.html has a static preload. Noto Sans Khmer is in both stacks; `initKhmerFont()` in `js/main.js` loads its Google Fonts CSS only when the page has Khmer letters (a static link blocked rendering ~1s for nothing). Tested with a Khmer word: it loads.
- **Hero avatar** slot added (commented out, `HERO AVATAR` in `index.html`) until `assets/images/me.webp` exists.
- **Bug fixed:** a `<!-- taste-skill-ignore -->` inside the commented-out Experience block closed the comment early, so "Education", "[Degree / Course]" and `-->` were showing on the page.
- `DESIGN.md` on disk was NOT overwritten (spec rule 8). The owner still needs to save the pasted version over it.
- Checks after this: lint 0/0; inspector 0 FAIL (WARNs: size-count, no-footage, off-centre, hero-void, as before); headless Edge: no console errors on file:// and http (index + 404), no horizontal scroll 360–1920, `T` works, one h1; Lighthouse mobile 98/100/100/100 (simulated LCP 2.3s, observed 122ms), desktop 100/100/100/100, page 263 KB.

### Note about the earlier session
Another agent session worked on this repo until 13:39 (commits up to f854a43) from the OLD DESIGN.md (RielTrack/FileShift). Commit 049de5c replaced its `index.html`, `css/style.css`, `js/main.js` with the new-spec build. Its one small JS fix (stop the demo video on Esc via the dialog `cancel` event) was ported.

### Checks run on the final version (2026-11-12)
- taste-skill inspector: **0 FAIL** at 1440/768/390 with `--allow few-pictures,eyebrow,mono,micro-label,hairline,outlined-box`. Each allowed rule is something the spec requires (mono `01 / LABEL` section labels, mono tags, 1px borders, header/footer borders) or the no-stock-photo rule. WARNs left: size-count, no-footage (no demo videos yet), hero-void (hero is text only by spec; fills once name/intro are real), off-centre (ragged card text at 768/390).
- Functional browser test (headless Edge over CDP, all pass): one h1 + aria-label after split text, section counters, images load with alt, in-page links resolve, noopener, ≥44px targets, hidden empty links, theme toggle + saved + reload, `T` shortcut, copy email + aria-live, mobile menu open/Esc/focus return/link closes/inert/scroll lock, no horizontal scroll at 360/390/768/1024/1440/1920, reduced motion shows everything, content visible with JS off, no console errors on file://.
- Lighthouse (local server): mobile 93 / 100 / 100 / 100, desktop 99 / 100 / 100 / 100.

- taste-skill lint: **0 FAIL, 0 WARN**. Every line the spec requires but the skill bans (mono labels and tags, `01 /` numbering, 1px borders, card spotlight, modal blur) carries a same-line `taste-skill-ignore: DESIGN.md §…` comment naming the section that asks for it.
- taste-skill direction: `dark-room`, seed 1825430341, no redraws. Idea: "On this page, the owner's own app screens become the lit exhibits in a dark room." Live things: circle theme reveal from the toggle, card tilt + cursor spotlight, copy email / demo login, `T` shortcut.
- Open-collection search (`assets.mjs "riel banknote Cambodia"`) ran: one CC BY-SA photo of a 5000-riel note on Wikimedia Commons. **Not used**: DESIGN.md rule 4 and the owner's no-found-photos rule. No found pictures are on the page, so there are no credits.

### How to re-run the checks (for agents)
- Lint: `node <taste-skill>/scripts/lint.mjs index.html 404.html css js`.
- Inspector (PowerShell): `node <taste-skill>/scripts/inspect.mjs index.html --allow few-pictures,eyebrow,mono,micro-label,hairline,outlined-box`.
- Lighthouse: serve the folder with any static server, then (PowerShell) `$env:CHROME_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"; npx -y lighthouse@12.8.2 http://localhost:PORT/ --chrome-flags="--headless=new"`.

### Next step
Owner: give name, role, intro, bio, city, remote yes/no, email, LinkedIn; KH Halal live URL; a public idevo download; RielTrack screenshots. **Next agent:** put them into `index.html` (+ `<head>`, JSON-LD, `404.html`, `site.webmanifest`, `tools/og-image.html`, then re-make `og-image.png` and the favicon PNGs), re-run the checks, update this log, commit.
