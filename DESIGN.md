# DESIGN.md: Portfolio Website, Complete Spec

> Read this entire file before writing any code. It is the single source of truth for this project.
> If anything here conflicts with your default habits, follow this file.
> If something is unclear or missing, **ask me** instead of guessing.
> Demo videos are a separate task: see `VIDEOS.md`.

---

## 1. Your role

Act as a **senior product designer (UX/UI) and senior front-end engineer** with 10+ years of experience building award-quality personal portfolios (the kind featured on Awwwards, Godly and Read.cv). You combine:
- **Design judgment:** typography, spacing, hierarchy, color and motion that feel intentional and premium, never template-like.
- **UX thinking:** every section has a clear purpose; visitors find what they need in seconds; nothing is decoration for its own sake.
- **Engineering quality:** clean, semantic, accessible, fast, well-commented code that a junior developer can read and maintain.
- **Honest mentorship:** I'm still learning. Explain decisions simply, point out problems you notice, and suggest better options, but don't build extra features without my OK.

Quality bar: *"Would a senior designer at a top studio and a senior engineer at a top tech company both sign off on this?"*

---

## 2. Summary

Build a **one-page developer portfolio** in **plain HTML + CSS + vanilla JavaScript** (no framework, no build step).
It must look **premium, modern and hand-crafted**, run **smoothly**, be **fully responsive**, support **dark/light mode**, have **refined animations**, and show **only my real information**: who I am (with my photo), my **3 projects: KH Halal Marketplace, idevo and RielTrack**, and how to contact me.
Keep the code clean, well-commented and easy for me to edit.

---

## 3. Golden rules (never break these)

1. **Never invent content.** No fake names, bios, projects, companies, metrics, testimonials, clients, dates or quotes.
2. **Content sources:** Section 5 ("My details"), facts from my GitHub (Section 6), and anything I tell you in chat. Nothing else.
3. **Missing info → ask me.** If you must continue, use an obvious placeholder like `[TODO: add live link]`, never a realistic-looking fake.
4. **Images allowed:** my own photo, screenshots/videos of my own projects, and monochrome logos for skills I listed (all in `assets/`). No stock, city, travel, decorative or AI-generated images. Missing image → a styled "Screenshot coming soon" box.
5. **Don't theme the site around a city, country or culture.** My location is one line of text.
6. **Everything described in this file is approved.** Don't add anything else (blog, CMS, widgets, chatbots, extra pages, third-party embeds) without asking. Exception: a YouTube embed only if I give a YouTube link.
7. **Keep the site simple:** no frameworks, no npm packages, no build step in the shipped site. It must work by opening `index.html`. Dev-only tools for testing (e.g. a local server, Lighthouse, a headless browser for screenshots) are OK, but ask before installing them.
8. **Don't delete or overwrite my files without asking**, especially in `assets/`. If an old project (e.g. an Astro site) exists in this folder, don't reuse its content or images; ask me before removing it.
9. **Read-only on my GitHub repos.** Never change, push to, or open issues on them.
10. **Explain in plain language.** After each stage, tell me in 2–4 short sentences what changed and which file I'd edit to change it myself.
11. **Quality over quantity.** A small, polished site beats a big, messy one.

---

## 4. Audience and goals

- **Audience:** recruiters, hiring managers, engineers and potential freelance clients.
- **In 10 seconds** a visitor should know: my name, what I do, and that I'm available.
- **In 1 minute** they should have seen my projects and be able to try a demo, download an app, or view the code.
- **Main actions:** "View my work", "Try live demo" / "Download", "Contact me".
- **Tone:** clear, confident, friendly. No buzzwords, no exaggeration.

---

## 5. My details

```
Name:            [YOUR NAME]            (may be suggested from my GitHub profile; confirm with me)
Role:            Full-Stack & Android Developer
One-line intro:  I design and build web and mobile apps from idea to release.
Bio (2–3 sent.): [...]
Location:        [City], Cambodia
Open to:         [Full-time / Freelance / Remote]
Available now:   [yes / no]
Currently:       [[what I'm building] · [what I'm learning], or none]

Quick stats (REAL numbers only, max 3, or leave empty)
  - [e.g. X years coding]
  - [e.g. X apps released]

Skills (may be suggested from my GitHub; confirm with me)
  Languages:     [...]
  Frontend:      [...]
  Mobile:        [...]
  Backend:       [...]
  Tools:         [...]
  Show logos:    yes

Projects (exactly these 3, in this order; #1 is the featured card. Fill the TODOs from GitHub, see Section 6)
  1. KH Halal Marketplace
  2. idevo
  3. RielTrack

  For each project:
     Type:            [TODO from GitHub: web app / Android app / iOS app / other]
     What it does:    [TODO from GitHub: one line]
     Problem solved:  [TODO from GitHub: 1–2 sentences]
     My role:         [TODO: ask me]
     Tech:            [TODO from GitHub: max ~6 main technologies]
     Key features:    [TODO from GitHub: 3 short bullets]
     Result/impact:   [real numbers only, from me, or leave empty]
     Live / Download: [TODO from GitHub: live URL (web) or APK / store link (mobile), or none]
     Demo login:      none (2026-11-12: owner chose videos only; real-money checkout)
     Video:           assets/videos/<slug>.mp4 + <slug>-poster.webp (made with VIDEOS.md). Done for all 3
                      (2026-11-12): kh-halal-marketplace, idevo, rieltrack. Scripts: scripts/record-*, scripts/motion/
     Code:            [TODO from GitHub: public repo URL, or "private"]
     Screenshots:     assets/images/<slug>.webp (+ <slug>-2.webp, <slug>-3.webp for mobile apps)

  Slugs: kh-halal-marketplace · idevo · rieltrack

Experience (optional)
  - [Company] · [Role] · [Start–End] · [1 real achievement]

Education (optional)
  - [School] · [Degree/Course] · [Year]

Contact
  Email:         [...]
  GitHub:        https://github.com/hongrinrasmey
  LinkedIn:      [...]
  Other:         [Telegram / etc., or none]
  Résumé:        assets/resume.pdf [yes / no]
  Reply time:    [e.g. within 24 hours, or none]

Photo
  My photo:      yes: assets/images/me.webp (I'll add it; if it's missing, remind me before finishing)
  Hero avatar:   yes (small round photo in the hero + bigger styled photo in About)

Site
  Last updated:  [e.g. November 2026]
  Domain:        [e.g. yourname.dev, or none yet]
```

---

## 6. Gather details from my GitHub (do this FIRST)

**My GitHub:** https://github.com/hongrinrasmey (username `hongrinrasmey`)

**Where to look**
- RielTrack → `hongrinrasmey/RielTrack-Downloads` (may be a releases-only repo; look for a source repo too)
- KH Halal Marketplace → search my repos for "halal" / "marketplace"
- idevo → search my repos for "idevo"

**Steps**
1. List my repos: `gh repo list hongrinrasmey --limit 100` (includes private repos if I'm logged in). If `gh` isn't installed or logged in, ask me to run `gh auth login`, or ask me for the repo links.
2. For each project read:
   - `README.md`: purpose, features, screenshots, live/demo links, demo logins
   - Repo description, topics and homepage (`gh repo view OWNER/REPO`)
   - Dependency/config files to detect the **type and tech stack**: `package.json`, `composer.json`, `requirements.txt`, `pubspec.yaml`, `build.gradle(.kts)`, `AndroidManifest.xml`, `*.xcodeproj`, `go.mod`, `Dockerfile`, etc.
   - Latest release (`gh release list`): version and download link
   - Images (`screenshots/`, `docs/`, README images): copy the best ones into `assets/images/`, convert to WebP, name them by slug
3. Check my GitHub profile (`gh api users/hongrinrasmey` and the `hongrinrasmey/hongrinrasmey` profile README if it exists) for name, bio, location, links and skills, to **suggest** values for Section 5.
4. Rewrite findings in clear, short, plain English (Section 15). Don't add claims.
5. **Never invent** my role, metrics, dates or testimonials; leave them `[TODO]` and ask.
6. **Show me a summary** per project (each fact + which repo/file it came from), plus suggested profile info and the remaining TODOs. **Wait for my confirmation** before building the Projects and About sections.
7. Private repo → no link and no label on the site (owner decision, 2026-11-12).

---

## 7. Tech stack and files

**Stack:** HTML5 + modern CSS (custom properties, grid, flexbox, `clamp()`, container-friendly layouts) + vanilla JavaScript. No libraries.

```
/
├── index.html              ← ALL page content; each section clearly commented
├── 404.html
├── css/style.css           ← tokens → base → layout → components → sections → utilities → motion/media queries
├── js/main.js              ← one file; each feature in its own commented init function
├── assets/
│   ├── fonts/              ← self-hosted Geist + Geist Mono (woff2)
│   ├── images/             ← me.webp, <slug>.webp screenshots, og-image.png
│   ├── videos/             ← <slug>.mp4 + <slug>-poster.webp (from VIDEOS.md)
│   └── resume.pdf          ← optional
├── favicon.svg, favicon-32.png, apple-touch-icon.png, site.webmanifest
├── robots.txt, sitemap.xml (sitemap only if a domain is known)
├── vercel.json             ← security headers + caching (or _headers for Netlify)
├── README.md
├── DESIGN.md               ← this file
└── VIDEOS.md
```

**Code style**
- Semantic, indented HTML. Comment every section: `<!-- ===== 02 · WORK ===== -->`.
- Class names simple and descriptive (BEM-light: `.project-card`, `.project-card__title`).
- JS: small, commented, defensive (check elements exist), `defer`-loaded, no globals, no `alert()`.
- No inline styles unless truly needed. No `!important` unless justified.
- Use `git`: init the repo if needed and commit after each working stage with clear messages (e.g. `Add projects section with video modal`).

---

## 8. Page structure (one page)

Order: Header → Hero → Work → About (tools + education) → Experience (if provided) → Contact → Footer.

### 8.1 Header
- Left: an orange mono `>_` prompt mark + my name. With JavaScript the mark is its own 44px button that opens the terminal (§11.2); without it, the mark is plain text inside the name link. Right: Work · About · Experience (only if provided) · Contact, a small outline "Résumé" button (if résumé exists, desktop only), and the theme toggle.
- Transparent at the top; after ~20px of scroll: `--bg` at 80% opacity, 12px backdrop blur, 1px bottom border.
- Active section link highlighted while scrolling (IntersectionObserver).
- Mobile (<768px): hamburger → full-screen menu; locks scroll; closes on link click, Esc or outside click; `aria-expanded` updates.
- "Skip to content" link as the first focusable element.

### 8.2 Hero (the first impression)
- **Avatar:** 64px circle of my photo (56px on mobile) with a 2px `--accent` ring, above the availability label.
- **Availability label:** mono, with pulsing dot: `● AVAILABLE FOR WORK` (only if Available = yes).
- **Name (h1):** huge, the visual centerpiece (split-text reveal, Section 11.2).
- **Role + one-line intro** in `--muted`, max 50rem, so role + sentence sit on one line from ~1366px up (owner 2026-11-12; it wraps on smaller screens).
- **"Currently" line** (if provided): mono, small, e.g. `CURRENTLY → building … · learning …`.
- **Buttons:** primary "View my work" (scrolls to Work); secondary "Contact me".
- **Small line:** location · open to remote.
- **Quick stats** (if provided): up to 3, below the buttons, divided by thin vertical borders; number in Geist 600, label in muted mono; count up once when visible. Never invent or round up.
- **Background:** very faint grid (Section 9.7). No background photos.
- Height: a bit under the viewport (`100svh − header − 64px`, max 836px; bottom padding 64px, and Work's top padding 64px after it) so Work starts sooner, but content must never be cut off on short screens (test 1366×768 and landscape phones). Content is centred top to bottom; on wide screens (≥1024px) the photo is centred in the space right of the text, as big as fits the hero's height (`0.8 × (100svh − 328px)`, max 540px, max 32vw), so it never makes the hero taller than the screen.

### 8.3 Work (most important section)
- Section label `01 / WORK` + heading (e.g. "Selected work").
- Work sits on a faint full-width band (`.section--band`: `--text` 3% over `--bg`, 1px border top and bottom), the only section that does, so the page doesn't repeat one rhythm.
- **Exactly 3 projects**, in order: KH Halal Marketplace (featured), idevo, RielTrack.
- **Featured card (#1):** full width. On ≥1024px it's split in two: media on one side (~7/12), text on the other (~5/12). On smaller screens media stacks on top.
- **Cards #2 and #3:** 2 columns on ≥768px, 1 column on mobile.
- **Media by project Type:**
  - Web app → one 16:10 screenshot, 12px radius, 1px border.
  - Mobile app → 1–3 phone screenshots inside simple Android-style CSS phone frames (black 3px bezel in both themes, corners `clamp(10px, 1.6vw, 20px)`, punch-hole camera dot centred in the status bar, thin border, no brand logos); screenshots are real emulator captures with status + gesture bars, 405×900, side by side with a 8–16px gap, never overlapping (every screen fully visible); all three level (2026-11-13: the raised middle phone looked off), no tilt. The phone media is 4:3 (taller than the web 16:10) with 6% × 4% padding, so the phones are ~25% bigger and readable; its background is `--text` 7% over `--surface` and the phone border `--text` 24%, so dark app screens stand out from the panel (2026-11-13).
- **Each card shows:** platform tag (`WEB` / `ANDROID` / `iOS`), title, one-line description, one muted line (featured card adds "I designed it and built it with AI tools."; its longer problem text stays in an HTML comment), 3 muted key features (featured card only), tech tags, small buttons (`btn--sm`). Version notes keep their case (`v1.6`, not uppercased).
- **Buttons (by Type):** "Try live demo" (web) or "Download APK" / "Get it on Google Play" / "Download on the App Store" (mobile) · "Watch video" · "View code" (public repos only; private repos show nothing). Hide any button without a link.
- **Demo login** (only if one exists): small mono line with a copy button.
- **Video modal:** "Watch video" opens an accessible modal with the muted, looping MP4 (`playsinline`, poster image, loaded only when opened). Closes with Esc, close button or backdrop click; focus returns to the button.

### 8.4 About (Tech + Education merged; owner 2026-11-12)
- Section label `02 / ABOUT`, heading "My background", nav "About" (`#about`).
- **Honesty rule (owner 2026-11-12):** the owner builds with AI coding tools and has not yet learned the foundations of these languages. The site says so openly. Never present the tools as mastered skills: no levels, no percentages, no "expert" wording.
- Under the heading: "I design and ship web and Android apps: a halal marketplace, a learning app and a money tracker. I build them with AI coding tools." as an intro line (what the owner made first, AI second; facts only from the Work cards) (`.tech__note`, h3 size); a commented-out slot below it for the owner's own 2–3 sentence bio. Then `.about__grid`: Education and Spoken languages, stacked. From 1024px the section is two equal columns (`.about__layout`): heading + intro line left, Education + languages right, labels on one line (no empty half). Education is a plain list (no timeline line or dot: one item; owner 2026-11-12): BIT, National University of Management, 2023 – 2026, final-year thesis project: KH Halal Marketplace. Spoken languages: Khmer (native) · English (basic).
- **No separate tool list (owner 2026-11-12):** the tools show only as tags on each project card. A list on its own repeated the cards and read as "I know these"; tags on a real app read as "used here".

### 8.5 Experience (only if provided)
- Section label `03 / EXPERIENCE`.
- Clean vertical timeline: role, company, dates (mono), one achievement each. Education below, smaller.

### 8.6 Contact
- Section label `04 / CONTACT` (renumber labels if Experience is hidden).
- Large heading: "Get in touch." (owner's choice, 2026-11-12; "work together" read as freelance).
- One friendly sentence + reply time (if provided).
- Row 1: email as big clickable text (the only `mailto:` link; 2px orange underline, 3px on hover) + copy button ("Copied!" for 2s, announced via `aria-live`) + "Download résumé" button (if provided). No separate "Email me" button (2026-11-13: it repeated the email link).
- Row 2: GitHub / LinkedIn / Telegram as text links (body size 18px since 2026-11-13, muted, orange on hover, icon + name + ↗, 44px tap height; `href="#"` stays hidden).
- Panel: same left/right edges and border as the project cards (inner padding `--card-pad`; edge to edge under 640px), plain `--surface` background (no glow: owner removed it 2026-11-12). One column at every width (label, heading, sentence, email row, profile links; 2026-11-13: two columns left ~500px empty in the middle). Email 24→36px from 768px (smaller than the heading). ≥1024px: 64px padding. Content centred in the panel (2026-11-13: left-aligned it left the right ~60% empty). About has no bottom padding, so only Contact's top padding sits between them.
- No contact form (it's in Future ideas).

### 8.7 Footer
- Small and muted: `© [year] [Name]` (year via JS) · "Last updated [Month Year]" (set manually) · "Back to top".

### 8.8 404 page
- Same header/footer style, short friendly message, "Back to home" button.

---

## 9. Design system

### 9.1 Concept
**"Precise and confident."** Big bold typography, generous whitespace, a strict grid, one warm accent. The projects are the hero; the design supports them. Small "engineered" details (mono labels, numbered sections, precise alignment) make it feel crafted.

### 9.2 Colors
```css
:root {                    /* Dark (default) */
  --bg:          #0C0A09;  /* warm near-black */
  --surface:     #171513;  /* cards (border: --text 16% over --surface) */
  --surface-2:   #1C1917;  /* tags, inputs, phone frames */
  --border:      #292524;
  --text:        #FAFAF9;
  --muted:       #A8A29E;
  --accent:      #FF6B35;  /* warm orange: fills */
  --accent-fg:   #0C0A09;  /* text on orange (never white) */
  --accent-text: #FF6B35;  /* orange as text/links */
}
[data-theme="light"] {
  --bg:          #FAFAF9;
  --surface:     #FFFFFF;
  --surface-2:   #F5F5F4;
  --border:      #E7E5E4;
  --text:        #0C0A09;
  --muted:       #57534E;
  --accent:      #FF6B35;  /* same orange for fills */
  --accent-fg:   #0C0A09;
  --accent-text: #C2410C;  /* darker orange for text (contrast) */
}
```
- `--accent` for fills (buttons, dot, selection); `--accent-text` whenever orange is text or a thin line (links, focus rings).
- Orange only for: primary buttons, link hover, focus rings, active nav, small highlights the availability dot and the soft light behind the hero photo (no frame around the photo: owner decision 2026-11-12). Never for large areas or body text.
- Everything passes **WCAG AA** in both themes (muted on bg ≈ 7.9:1 dark; text on orange ≈ 7:1; `#C2410C` on light bg ≈ 5:1).
- Dark is default; follow the system preference; save the choice in localStorage; set the theme in an inline `<head>` script **before paint** (no flash).

### 9.3 Typography
- **Geist** for headings and body; **Geist Mono** for labels, tags, dates and section numbers. Self-host the woff2 files in `assets/fonts/` (only weights used: 400, 500, 600, 700; mono 400, 500). Preload the weight used by the hero name.
- **Khmer:** add **Noto Sans Khmer** after Geist in every stack (via Google Fonts with `display=swap`; it downloads only if Khmer text appears).
- Stacks: `"Geist", "Noto Sans Khmer", system-ui, -apple-system, "Segoe UI", sans-serif` and `"Geist Mono", ui-monospace, monospace`.
- Headings: weight 600–700, letter-spacing `-0.03em` (h1) / `-0.02em` (h2–h3), line-height 1.05–1.15, `text-wrap: balance`.
- Body: weight 400, line-height 1.6, max 65ch, `text-wrap: pretty`.
- Labels: mono, uppercase, letter-spacing `0.05em`, **14px** (`--fs-label`; 12px → 13px → 14px on 2026-11-12 for readability). Decoration/wayfinding only; important info goes in body text.
- `-webkit-font-smoothing: antialiased`.

| Element | CSS | 360px | 768px | 1024px | 1440px |
|---|---|---|---|---|---|
| h1 (name) | `clamp(3rem, 8vw, 6.5rem)` | 48 | 61 | 82 | 104 |
| h2 (section) | `clamp(2rem, 4vw, 3rem)` | 32 | 32 | 41 | 48 |
| h3 (card title) | `clamp(1.25rem, 2vw, 1.5rem)` | 20 | 20 | 20 | 24 |
| Body | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | 16 | 17 | 18 | 18 |
| Small / label | `0.75rem–0.875rem` | 12–14 | 12–14 | 12–14 | 12–14 |

**Test h1 with my real name at 360px.** If it overflows or wraps awkwardly, reduce the size or break cleanly into first name / last name.

### 9.4 Layout and spacing
- **Container:** max-width 1600px; side padding 24px (mobile) / 32px (≥768px) / 48px (≥1280px).
- **Grid:** 12 columns on desktop, 1 on mobile.
- **Spacing scale (8px system):** 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128, as CSS variables. No random values.

| Element | Mobile | Desktop |
|---|---|---|
| Header height | 64px | 72px |
| Hero top padding (below header) | 96px | 128px |
| Hero bottom padding | 64px | 96px |
| Section padding (top and bottom) | 64px | 96px |
| Section label → heading | 16px | 16px |
| Heading → content | 32px | 48px |
| Paragraph spacing | 16px | 16px |
| Gap between project cards | 24px | 32px |
| Card inner padding | 20px | 28px |
| Card media → title | 20px | 24px |
| Gap between tags | 8px | 8px |
| Gap between buttons | 12px | 16px |
| Footer padding | 32px | 40px |

### 9.5 Shape and depth
- Radius: 12px for cards and images; 999px (pill) for buttons and tags; `clamp(10px, 1.6vw, 20px)` for phone frames (Android corners).
- Borders: 1px `--border`. No heavy shadows; depth comes from surfaces, borders and contrast.
- Dark-mode cards may have a 1px inner top highlight: `inset 0 1px 0 rgba(255,255,255,0.04)`.

### 9.6 Components
- **Buttons:** pill, min-height 44px, padding 12×24, Geist 500. Primary: `--accent` bg + `--accent-fg` text. Secondary: transparent + 1px border. Hover: subtle color shift + arrow icon nudges 4px right. Active: scale 0.98. Visible focus ring.
- **Tags:** Geist Mono, 14px, pill, `--surface-2` bg, `--muted` text, padding 4×10.
- **Links:** `--text` with a subtle underline; hover → `--accent-text` with the animated underline.
- **Project card:** `--surface`, 1px border, 12px radius, media with `overflow: hidden`. Hover (desktop): lift -4px, border → `--accent-text` at ~60%, media scales 1.03, cursor spotlight (Section 11.2). No tilt (owner removed it 2026-11-12).
- **Section label:** mono `01 / WORK`, muted, with a short 24px line before it.
- **Theme toggle:** 40px icon button (sun/moon inline SVG), `aria-label`, smooth icon swap.
- **Copy button:** icon + "Copied!" feedback; keyboard accessible.
- **Modal:** centered, max-width 900px (web video) or 420px (mobile video), `--surface`, 12px radius, backdrop `rgba(0,0,0,0.7)` + 8px blur; focus-trapped.
- **Icons:** one style only: inline SVG, 1.5px stroke, rounded caps, 20px default.

### 9.7 Premium details
- **Hero texture:** very faint grid (1px lines, ~6% opacity) fading out toward the bottom with a mask. The only glow is the soft `--accent` light (16%, radial) behind the photo's head; the 7% glow behind the name was removed on 2026-11-12 (it read as a muddy brown haze). No noise on top of it.
- **Focus rings:** 2px `--accent-text`, 2px offset, `:focus-visible` only.
- **Selection:** `--accent` bg, `--accent-fg` text.
- **Scrollbar:** thin, matches the theme.
- **Anchors:** `scroll-margin-top` = header height + 16px.
- **Optical alignment:** nudge the big h1 so its left edge visually lines up with body text.
- **Screenshots:** always 1px border + radius so light screenshots don't blend into a light background.
- **External links:** open in a new tab with `rel="noopener noreferrer"` and a small ↗ icon.
- **Favicon:** an orange `>_` prompt on a dark (`#0C0A09`) rounded square, same as the header mark.

### 9.8 Avoid
Purple/blue gradient blobs · glassmorphism everywhere · white text on orange · orange on large areas · emojis as decoration · stock or AI images · skill % bars · carousels · typing-effect text · particle backgrounds · autoplay sound · popups · cookie banners · scroll-jacking · more than one accent color · centered walls of text · low-contrast tiny text · fake "Trusted by" logos.

---

## 10. Responsive design

- Mobile-first CSS. Breakpoints: 640px, 768px, 1024px, 1280px.
- Must look **intentional** (not just "not broken") at **360, 390, 768, 1024, 1366×768, 1440, 1920px**, plus landscape phone.
- No horizontal scroll at any width; long words/URLs wrap (`overflow-wrap: anywhere`).
- Tap targets ≥ 44×44px; body text ≥ 16px.
- Work: featured card split on ≥1024px, stacked below; other cards 2 columns on ≥768px.
- About: 2 columns on ≥1024px, stacked below.
- Media uses fixed `aspect-ratio` boxes so nothing jumps while loading.

---

## 11. Motion

### 11.1 Motion system (use these tokens everywhere)
```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);   /* entrances, reveals */
  --ease-out:      cubic-bezier(0.22, 1, 0.36, 1);  /* hovers, UI */
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);  /* menu, modal */
  --dur-fast: 150ms;   /* color/opacity hovers */
  --dur-base: 300ms;   /* buttons, underlines, small moves */
  --dur-slow: 600ms;   /* section reveals */
  --dur-hero: 900ms;   /* hero name only */
}
```
- Hovers ≤ 300ms. Entrances 600–900ms. Nothing over 1s except the stats count-up.
- Exits are faster than entrances (~70% of the duration).
- Reveal distance 16–24px max; scale changes between 0.98 and 1.03. Subtle looks expensive.

### 11.2 What moves

| Element | Motion |
|---|---|
| **Hero name (the wow moment)** | Split-text reveal: each word slides up from behind a mask, 60ms stagger, `--dur-hero`, `--ease-out-expo`. Real text stays readable for screen readers (`aria-label` on h1, word spans `aria-hidden`). |
| Hero label, intro, buttons, stats | Fade + slide up 16px right after the name, 80ms stagger, `--dur-slow` |
| Sections and cards | Fade + slide up 24px once when 15% visible; side-by-side blocks stagger 100ms (no stagger when stacked: cards under 768px, About and Contact columns under 1024px) |
| **Phone screens** (idevo, RielTrack) | When the card is on screen, each phone fades once to its second screen (`data-next`) and back (quick swap `--dur-fast`: a slow crossfade showed two layouts at once, 2s per step, phones 150ms apart), then stops. Under 5s in all (WCAG 2.2.2). Hover or keyboard focus on the card pauses it |
| **Featured screenshot settle** | Each web screenshot zooms from `scale: 1.15` to 1 while that screenshot enters the screen (its own view timeline `--shot`, `entry 0%`–`entry 100%`; 2026-11-13: the card timeline left it zoomed and cut on phones, where the card is taller than the screen). The card uses `overflow: clip` (not `hidden`) so it is not a scroll container. The hover zoom adds on top |
| **Terminal** | `>_` button or the `` ` `` key opens a `<dialog>` (rises in `--dur-base`). Commands: help, whoami, projects/ls, open &lt;app&gt;, work, about, contact, email (copies), github, theme, clear, exit; ↑/↓ history, Tab completes a sure match. Every answer is read from the page (no copy of the content in JS). Jumps close it, scroll to the target and move focus there |
| **Theme switch** | Circle reveal from the toggle via the View Transitions API (~500ms). Fallback: 200ms color fade. |
| **Project cards (desktop only)** | Lift -4px (no tilt), soft orange spotlight (~6% opacity radial gradient via `--x`/`--y`); eases back in 400ms |
| **Links** | Orange underline grows left → right, `--dur-base` |
| Buttons | Color shift `--dur-fast`, arrow nudge `--dur-base`, active scale 0.98 |
| Header | Background/blur/border fade in after scroll, `--dur-base` |
| Availability dot | Gentle pulse (opacity + scale), 2s loop |
| Stats | Count up once over ~1s |
| Hero photo | Cut-out (no backdrop, `tools/photo-cutout.py`), suit fades out at the bottom and sides, soft orange light behind the head; no box, no frame, no hover effect. Rises in with the other hero items |
| Mobile menu | Fade + slight slide, 300ms, `--ease-in-out`; links stagger 40ms |
| Copy button | Icon swap → "Copied!" |

Not built now (Future ideas): text scramble, magnetic buttons, tech marquee, sticky stacking cards, custom cursor.

### 11.3 Motion rules
- Animate only `transform` and `opacity` (plus colors on hover). Never `width`, `height`, `top`, `left`, `margin`, `box-shadow`, or blur on large areas.
- **Content is fully visible without JavaScript**: add a `.js` class to `<html>` and only hide reveal elements when it's present.
- **`prefers-reduced-motion: reduce` turns off all motion**: no reveals, tilt, pulse, count-up, view transition or smooth scroll. Content just appears.
- Pointer effects only with `@media (hover: hover) and (pointer: fine)`; nothing important is hover-only.
- Each effect is its own commented function (`initHeroReveal()`, `initThemeTransition()`, `initSpotlight()`, …) so I can remove one easily.

---

## 12. Performance (smooth on real devices)

- **60fps** on a mid-range Android phone and a normal laptop. Test in Chrome DevTools → Performance with 4× CPU slowdown and fix long frames.
- **Budget:** JS ≤ 27 KB, CSS ≤ 35 KB raw (~9 KB each gzipped) (raised from 15/30 on 2026-11-12 for the phone, glow and pill effects, then for the terminal and screenshot settle (hero dots and 3D phone turn removed later the same day for simplicity), which the owner asked for: "do all of these"), page ≤ 1 MB without videos. Mobile Lighthouse: Performance, Accessibility, Best Practices, SEO all **≥ 90**; LCP < 2.0s; CLS < 0.05; INP < 200ms.
- Mouse-follow effects: one `requestAnimationFrame` per frame updating CSS variables; cache `getBoundingClientRect` on `mouseenter`.
- Scroll: prefer `IntersectionObserver` and CSS scroll timelines; any scroll listener is `{ passive: true }`. Reveal observers unobserve after running.
- `will-change` only while animating (add on start, remove after).
- `content-visibility: auto` + `contain-intrinsic-size` on below-the-fold sections.
- Backdrop blur only on the header and modal (≤ 12px).
- **Images:** WebP, explicit `width`/`height`, `srcset`/`sizes` where useful, `decoding="async"`, lazy below the fold. Hero avatar not lazy. Screenshots ≤ 300 KB, photo ≤ 150 KB.
- **Videos:** never in the page on load; the MP4 loads only when the modal opens (`preload="none"`).
- **Fonts:** self-hosted woff2, preload the hero weight, `font-display: swap`, matched fallback metrics to avoid layout shift.
- Native `scroll-behavior: smooth` only (disabled under reduced motion).

---

## 13. Accessibility

- Landmarks: `header`, `nav`, `main`, `section` (with `aria-labelledby`), `footer`. `lang="en"` on `<html>`.
- One `<h1>`; logical headings (h2 per section, h3 per card).
- Skip link; fully keyboard-usable in a logical order; visible `:focus-visible` styles.
- Icon-only buttons have `aria-label`; decorative SVGs `aria-hidden="true"`.
- Meaningful alt text (e.g. "[Project] home screen showing [what it shows]"); `alt=""` for decorative images.
- Menu and modal: `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-modal`, focus trap, Esc closes, focus returns to the trigger.
- Copy feedback via `aria-live="polite"`.
- Color is never the only signal; WCAG AA contrast in both themes.

---

## 14. SEO, sharing and hosting

- `<title>[Name] · [Role]</title>`, meta description (~150 chars) from my real intro, viewport meta, `theme-color` for both themes.
- Open Graph + Twitter card tags; canonical URL and `sitemap.xml` once a domain is known; `robots.txt`.
- JSON-LD `Person` schema: name, job title, `sameAs` links.
- **OG image** (`assets/images/og-image.png`, 1200×630): build it as `og-image.html` and render it to PNG (headless screenshot if available, otherwise ask me to screenshot it). Dark `--bg`, my name large in Geist 700, role in muted, orange dot + "Available for work" (if yes), GitHub handle or domain in mono bottom-left, thin orange bar on the left edge, my avatar on the right (if the photo exists).
- Favicon set + `site.webmanifest` (name, theme color, icons).
- **Print stylesheet:** hide nav, buttons and motion; black on white; show link URLs after links.
- `vercel.json` (or Netlify `_headers`): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, 1-year immutable cache for `/assets/fonts/*` only; `/assets/images/*` 1 day (`max-age=86400`), because photos and screenshots are replaced under the same file name.

---

## 15. Writing

- Use my words and confirmed GitHub facts. Light polishing is fine; no new facts, numbers or claims.
- Project text: **problem → what I built → result**, then tech.
- Short sentences, active voice, no clichés ("passionate", "guru", "ninja"), no exclamation marks.
- Sentence case for headings and buttons. Same verbs everywhere: "Try live demo", "Download APK", "Watch video", "View code", "Download résumé".
- Empty states are styled and calm: "Screenshot coming soon", "Demo coming soon".
- Keyboard shortcut: `T` toggles the theme (ignored while typing in inputs).

---

## 16. Process

1. **GitHub research (Section 6)** → show me the summary → wait for my confirmation.
2. **Check inputs:** list anything still `[TODO]` in Section 5 and ask me. Check what's in `assets/` (remind me if `me.webp` is missing).
3. **Plan:** in a few lines (sections, layout of the featured card, any concerns). Then build without waiting unless blocked.
4. **Build in stages** (commit after each):
   1. Files, fonts, design tokens, base styles
   2. Header, mobile menu, theme toggle (+ no-flash script)
   3. Hero
   4. Work: cards, phone frames, buttons, demo login copy, video modal
   5. About, Experience
   6. Contact, footer, 404
   7. Motion (Section 11): tokens and reveals first, then the signature effects one at a time, checking performance after each
   8. SEO, OG image, favicons, manifest, print styles, `vercel.json`
5. **Review like a senior designer:** check every width in Section 10 and both themes; fix spacing, alignment, hierarchy and contrast. If you can take screenshots (headless browser), review them yourself; otherwise ask me to check specific things.
6. **Run the checklist** (Section 18) and fix issues.
7. **Write README.md** (Section 17).
8. **Final summary to me:** what was built, how to open it, which file to edit for what, and every remaining TODO.

---

## 17. README.md (simple language)

1. How to open the site: double-click `index.html` or use VS Code "Live Server".
2. How to edit: text/links → `index.html` (look for the section comments); add a project → copy a `project-card` block; images → `assets/images/` (same names); colors → variables at the top of `css/style.css`; fonts → `assets/fonts/` + font variables.
3. Image tips: WebP, screenshots ~1600px wide under 300 KB, photo ~800px under 150 KB (squoosh.app).
4. Videos: see `VIDEOS.md`.
5. Put it online: push to GitHub → import into Vercel or Netlify (no build settings) → connect a custom domain.
6. Update the live site: edit → `git add .` → `git commit -m "..."` → `git push`.
7. List of remaining TODOs.

---

## 18. Final checklist (definition of done)

**Content**
- [ ] Only real info (Section 5, confirmed GitHub facts); no invented names, numbers, photos or claims
- [ ] Exactly 3 projects in the right order; buttons and media match each project's Type
- [ ] No broken links; buttons without links hidden; remaining placeholders marked `TODO`
- [ ] My photo shows in the hero avatar and About (or I was reminded it's missing)

**Design**
- [ ] Looks intentional at 360, 390, 768, 1024, 1366×768, 1440, 1920px and landscape phone
- [ ] Both themes polished; no theme flash on load
- [ ] Spacing, sizes, colors and radii follow Section 9 exactly; one accent color
- [ ] h1 tested with my real name on small phones

**Motion and performance**
- [ ] Only the motion in Section 11.2; all using the tokens
- [ ] Smooth at 60fps with 4× CPU slowdown; Lighthouse mobile ≥ 90 in all four categories; budgets in Section 12 met
- [ ] Reduced motion turns everything off; content visible without JS

**Accessibility and SEO**
- [ ] Keyboard-only works for the menu, toggle, copy buttons and modal; focus visible everywhere
- [ ] WCAG AA contrast in both themes; alt text; one h1
- [ ] Title, description, OG image, JSON-LD, favicons and manifest present; no console errors
- [ ] Khmer text renders correctly (test with a Khmer word, then remove it)

**Handover**
- [ ] README written; clear git history; final plain-language summary sent

---

## 19. Notes for me (not for the agent to build)

**My photo:** clear face, shoulders up, daylight facing a window, plain background, friendly expression. No sunglasses, filters or AI edits. Crop 4:5, ~800px wide, WebP under 150 KB → `assets/images/me.webp`.

**Screenshots:** real data (not empty screens), no personal info. Web: ~1600×1000. Mobile: full phone screenshots. WebP → `assets/images/<slug>.webp`.

**Videos:** follow `VIDEOS.md`.

**Beyond the site:**
- Custom domain (e.g. `yourname.dev`) connected in Vercel/Netlify.
- Professional email (e.g. `hello@yourname.dev` via Cloudflare Email Routing, free).
- GitHub and LinkedIn match the site: same photo, same headline, the 3 projects pinned with good READMEs.
- Ask 1–2 real people for a short testimonial for later.
- For public demos: test payments only, sample data, reset regularly.

---

## 20. Future ideas (do NOT build unless I ask)
- Extra effects: text scramble, magnetic buttons, tech marquee, sticky stacking cards, custom cursor
- Case-study pages per project
- Khmer / English language switch
- Contact form (Formspree)
- Blog / notes
- Testimonials (real ones only)
- Analytics (Plausible / Umami)
- Certificates, "Uses" page, command palette (Ctrl/Cmd + K)
