# CLAUDE.md — My Portfolio Website

Read this whole file before doing anything. These rules override any default habits.
**Agents: read section 13 (Progress log) first to see where the work stands, then continue from there. Update section 13 after every change.**
**`DESIGN.md` is the full, newer spec (owner, 2026-11-12). Where it differs from sections 4–9 below (3 fonts incl. JetBrains Mono, numbered mono section labels, 1px borders, pill buttons, darker light-mode accent `#4D7C0F`), follow DESIGN.md.**

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

### Current state (2026-11-12)
- Site rebuilt to the `DESIGN.md` spec, in 8 commits (tokens → header → hero → projects → about → contact/404 → motion → SEO).
- Plain HTML/CSS/JS: `index.html`, `css/style.css`, `js/main.js`, `404.html`, `robots.txt`, `favicon.svg` + `favicon.png`, `assets/images/og-image.png`, `tools/` (helpers to re-make the OG image and PNG icon).
- **Section 3 is still all placeholders**, so every personal detail is an obvious `[TODO: ...]`. Only "RielTrack" and "FileShift" (named in DESIGN.md) are real. Nothing invented.
- The old Astro version is still in `_old-astro-version/` (git-ignored). Ask the owner before deleting it.

### Decisions made
- "Available for work" hero label: in `index.html` but commented out (owner has not said yes).
- Experience section + its nav link: commented out (no experience given). Section numbers are a CSS counter, so they stay 01/02/03… when it is shown.
- Links left as `href="#"` and video buttons with `data-video=""` are hidden by CSS (`.link-opt`). "Demo coming soon" shows while the live link is `#`.
- One card in the "other projects" grid spans full width (mirrored split layout on desktop), so there is no empty half.
- Contact section sits on `--surface` (a tone step) so the last screen is not empty ground.
- Reveal animation is hidden only under `.js-ready` (set by main.js), so content shows if main.js fails. Uses `translate` so it never fights the card hover `transform`.
- Mobile menu: full-screen overlay; while open, `main`, footer and skip link are `inert` and the page cannot scroll.
- Video pop-up is a native `<dialog>`; the video element is created only when it opens (nothing downloads before). YouTube links become `youtube-nocookie` embeds. With reduced motion the video does not autoplay.
- `404.html` uses root paths (`/css/style.css`). Works on Netlify/Vercel/custom domain/`user.github.io`; a project page at `/REPO/` needs the prefix (noted in the file and README).
- OG image is a plain text placeholder made from `tools/og-image.html` (no photo).
- Owner rule (2026-11-12): **never add stock or found photos/clips** to pass the design skill's picture checks.

### Checks run on the final version (2026-11-12)
- taste-skill inspector: **0 FAIL** at 1920/1440/768/390 with `--allow eyebrow,mono,micro-label,numbering,hairline,outlined-box,font-count,glass,few-pictures,no-footage`. Every allowed rule is something DESIGN.md requires (mono labels, "01 /" labels, 1px borders, 3 fonts, modal blur) or the owner's no-stock-photo rule. Remaining WARN `off-centre` (170 vs 194px) comes from short `[TODO]` lines not reaching the right edge.
- Browser test (56 checks, all pass): no horizontal scroll and ≥44px tap targets at 360/390/768/1024/1440/1920; one h1; labelled sections; hidden empty links; header on scroll; active nav; reveal; card hover; theme toggle + saved + reload; light-mode contrast ≥4.5:1; copy email/demo login + "Copied!" + aria-live; video modal open/Esc/backdrop/close button/focus return/YouTube; mobile menu open/Esc/link/outside click/inert/scroll lock; reduced motion; JavaScript off; 404 at a nested address; opened from file://; no console errors.
- Lighthouse mobile 95 / 100 / 100 / 100 (CLS 0), desktop 98 / 100 / 100 / 100.
- Without any `--allow`: 6 FAIL, all of them DESIGN.md requirements or the no-stock-photo rule (eyebrow, mono, micro-label, hairline, few-pictures, font-count). Expected.
- Critique (skill format, 2 rounds) is in `.taste-skill/critique.md` (git-ignored). Final: design 6.5 · usability 8 · creativity 5 · content 3 → 6.3; capped by the spec's mono/numbered labels and by placeholder content.
- Owner added 4 screenshots of other apps (`assets/images/idevo-*.webp`, `kh-halal-marketplace.webp`). Not used and not committed: DESIGN.md names only RielTrack and FileShift. Ask the owner.

### How to re-run the checks (for agents)
- Inspector: from PowerShell (the Bash sandbox blocks the browser): `node <taste-skill>/scripts/inspect.mjs index.html --allow eyebrow,mono,micro-label,numbering,hairline,outlined-box,font-count,glass,few-pictures,no-footage`. Drop `few-pictures` once real screenshots are in.
- Lighthouse: `chrome-launcher` cannot find Edge here. Start Edge yourself (`msedge.exe --headless=new --remote-debugging-port=9333 --user-data-dir=<temp>`), serve the folder from a separate process (a server in the same process as a blocking `execSync` hangs), then `npx -y lighthouse@12.8.2 http://127.0.0.1:PORT/ --port=9333`.

### Next step
The owner fills in section 3 / DESIGN.md section 3. **Next agent:** copy the real values into `index.html` (and `<head>`, JSON-LD, `404.html`, `tools/og-image.html`), replace every `[TODO: ...]`, re-make `og-image.png`, then re-run the checks above, update this log and commit.

### Still TODO (needs the owner's real details)
- Every `[TODO: ...]` in `index.html`: name, role, intro, bio, city, open-to, skills, RielTrack/FileShift descriptions, features, tech, contact sentence, email.
- Links: live demos, code (or "Private repo"), GitHub, LinkedIn, Telegram (optional), résumé.
- Screenshots `assets/images/rieltrack.webp`, `fileshift.webp`; optional `me.webp`, demo videos, demo logins.
- Whether to show "Available for work" and the Experience section.
- Domain (then: canonical, og:url, full og:image URL, sitemap.xml).
- Initials in `favicon.svg`.
