# DESIGN.md: Portfolio Website, Complete Spec

> Read this entire file before writing any code. It is the single source of truth for this project.
> If anything here conflicts with your default habits, follow this file.
> If something is unclear or missing, **ask me** instead of guessing.

---

## 0. Quick summary (for the agent)

Build a **one-page developer portfolio** in **plain HTML + CSS + vanilla JavaScript** (no framework, no build step).
It must look **premium, modern and hand-crafted**, be **fully responsive**, support **dark/light mode**, have **subtle animations**, and show **only my real information**: who I am, my projects (including **RielTrack** and **FileShift**), and how to contact me.
I am still learning, so keep the code clean, well-commented, and easy for me to edit.

---

## 1. Golden rules (never break these)

1. **Never invent content.** No fake names, bios, projects, companies, metrics, testimonials, clients, dates or quotes.
2. **The only content source is Section 3 ("My details")** plus anything I tell you directly in chat.
3. **Missing info → ask me first.** If you must continue, use an obvious placeholder like `[TODO: add RielTrack live link]`, never a realistic-looking fake.
4. **No stock, city, travel or decorative photos.** Allowed images: my own photo and screenshots/videos of my own projects in `assets/`. Missing image → a neutral box with the text "Screenshot coming soon".
5. **Don't theme the site around a city, country or culture.** My location is one line of text, nothing more.
6. **Don't add features I didn't ask for.** No blog, CMS, widgets (weather, clock, timezone, live data), chatbots, extra pages or third-party embeds. If you think something would help, suggest it and wait for my answer.
7. **Keep it simple.** No frameworks, no npm packages, no build tools unless I approve. The site must work by double-clicking `index.html`.
8. **Don't delete or overwrite my files without asking**, especially anything in `assets/` or an old project in this folder. If an old project (e.g. an Astro site) exists, do not reuse its content or images; ask me before removing it.
9. **Explain in plain language.** After each step, tell me in 2–4 short sentences what changed and which file I'd edit to change it myself.
10. **Quality over quantity.** A small, polished site beats a big, messy one.

---

## 2. Who the site is for and what it must do

- **Audience:** recruiters, hiring managers, engineers and potential freelance clients.
- **In 10 seconds** a visitor should know: my name, what I do, and that I'm available.
- **In 1 minute** they should have seen my best projects and be able to try a demo or view the code.
- **Main actions (CTAs):** "View my work", "Try the live demo", "Contact me".
- **Tone of writing:** clear, confident, friendly, no buzzwords ("passionate ninja rockstar"), no exaggeration.

---

## 3. My details (the ONLY content source; I will fill this in)

```
Name:            [YOUR NAME]
Role:            [e.g. Full-Stack Developer]
One-line intro:  [e.g. I build fast, clean web apps that solve real problems.]
Bio (2–3 sent.): [...]
Location:        [City], Cambodia
Open to:         [Full-time / Freelance / Remote — pick]
Available now:   [yes / no]

Skills
  Languages:     [e.g. JavaScript, TypeScript, Python]
  Frontend:      [e.g. HTML, CSS, React, Tailwind]
  Backend:       [e.g. Node.js, Express, PostgreSQL]
  Tools:         [e.g. Git, Docker, Figma, Vercel]

Projects (in order of importance)
  1. RielTrack
     What it does:   [one line]
     Problem solved: [1–2 sentences]
     My role:        [e.g. Solo — design, frontend, backend]
     Tech:           [...]
     Key features:   [3 bullet points]
     Result/impact:  [real numbers only, or leave empty]
     Live demo:      [URL or none]
     Demo login:     [email / password or none]
     Video demo:     [assets/videos/rieltrack.mp4 or YouTube URL or none]
     Code:           [GitHub URL or private]
     Screenshot:     [assets/images/rieltrack.webp or none]

  2. FileShift
     What it does:   [one line]
     Problem solved: [...]
     My role:        [...]
     Tech:           [...]
     Key features:   [...]
     Result/impact:  [...]
     Live demo:      [...]
     Demo login:     [...]
     Video demo:     [...]
     Code:           [...]
     Screenshot:     [assets/images/fileshift.webp or none]

  3. [Optional project] ...

Experience (optional)
  - [Company] — [Role] — [Start–End] — [1 real achievement]

Education (optional)
  - [School] — [Degree/Course] — [Year]

Contact
  Email:     [...]
  GitHub:    [...]
  LinkedIn:  [...]
  Other:     [Telegram / X / etc. or none]
  Résumé:    assets/resume.pdf [yes / no]
  Photo:     assets/images/me.webp [yes / no]

Website domain (optional): [e.g. yourname.dev or none yet]
```

---

## 4. Tech stack and file structure

**Stack:** HTML5 + modern CSS (custom properties, grid, flexbox, `clamp()`) + vanilla JavaScript (ES modules not required). No libraries.

```
/
├── index.html            ← ALL page content; each section clearly commented
├── css/
│   └── style.css         ← design tokens at the top, then base, layout, components, sections, utilities
├── js/
│   └── main.js           ← theme toggle, mobile menu, scroll reveal, copy-email, header on scroll, active nav
├── assets/
│   ├── images/           ← me.webp, rieltrack.webp, fileshift.webp, og-image.png
│   ├── videos/           ← short project demo clips (mp4, muted)
│   └── resume.pdf
├── favicon.svg           ← my initials in the accent color
├── robots.txt
├── sitemap.xml           ← only if a domain is known
├── 404.html              ← simple, on-brand, link back home
├── README.md
└── DESIGN.md             ← this file
```

**Code style**
- Semantic, indented, readable HTML. Comment every section: `<!-- ===== 02 · PROJECTS ===== -->`.
- CSS organized top-to-bottom: tokens → reset/base → layout → components → sections → utilities → media queries / reduced motion.
- Class names simple and descriptive (BEM-light: `.project-card`, `.project-card__title`).
- JS small, commented, defensive (check elements exist), no global clutter, no `alert()`.
- No inline styles except where truly needed. No `!important` unless justified.

---

## 5. Page structure (one page)

### 5.1 Header / Navigation
- Left: my name (or initials logo). Right: Work · About · Experience · Contact + theme toggle.
- Transparent at top; after scrolling ~20px becomes solid background with a subtle bottom border.
- Active section link is highlighted while scrolling.
- Mobile (<768px): hamburger button → full-screen overlay menu; locks page scroll while open; closes on link click, Esc key, or outside click; `aria-expanded` updates.
- A "Skip to content" link as the first focusable element.

### 5.2 Hero
- Small mono label with pulsing dot: `● AVAILABLE FOR WORK` (only if Available = yes).
- Huge name (h1). Role + one-line intro below in muted color.
- Buttons: **primary** "View my work" (filled accent) → scrolls to projects; **secondary** "Contact me" (outline).
- Small line under buttons: location + "open to remote".
- Background: plain, or a very faint grid / noise texture. No photos.
- Height: roughly the viewport on desktop, but content must never be cut off on short screens.

### 5.3 Selected Work (most important section)
- Section label: `01 / SELECTED WORK` (mono, muted) + heading.
- **Featured card (first project, full width):** large screenshot (16:10, rounded), title, one-line description, 1–2 sentence problem/solution, 3 key features, tech tags, buttons.
- **Other cards:** 2-column grid on desktop, 1 column on mobile.
- Each card shows:
  - Screenshot (or "Screenshot coming soon" box)
  - Title + one-line description
  - Tech tags (mono, pill-shaped)
  - Buttons: **Live demo** · **Watch video** · **Code**. Hide any button that has no link. If code is private, show a small "Private repo" label instead.
  - **Demo login** line if provided, with a copy button: `Demo: demo@rieltrack.app / demo1234 [copy]`
- "Watch video" opens an accessible modal with the muted, looping demo video (or a YouTube embed only if I provided a YouTube link). Modal closes with Esc, close button, or backdrop click, and returns focus to the button.

### 5.4 About
- Section label `02 / ABOUT`.
- Two columns on desktop: bio text left, my photo right (if provided; otherwise text-only layout, no placeholder person).
- Skills grouped (Languages / Frontend / Backend / Tools) as mono tags. **No percentage bars or star ratings.**

### 5.5 Experience (only if I provided it)
- Section label `03 / EXPERIENCE`.
- Clean vertical timeline: role, company, dates (mono), one achievement each.
- Education below, smaller, if provided.

### 5.6 Contact
- Section label `04 / CONTACT`.
- Large heading: "Let's work together." (or "Let's build something.")
- One friendly sentence.
- Email shown as big clickable text (`mailto:`) + a copy button that shows "Copied!" for 2 seconds (with an `aria-live` announcement).
- Icons for GitHub / LinkedIn / others. "Download résumé" button if provided.
- No contact form unless I ask (if I do: Formspree, with validation and success/error states).

### 5.7 Footer
- Small and muted: `© [year] [Name]` (year set by JS), "Back to top" link.

### 5.8 404 page
- Same header/footer style, short message, "Back to home" button.

---

## 6. Design system

### 6.1 Concept
**"Precise & confident."** Big bold typography, generous whitespace, a strict grid, and exactly one accent color. The projects are the hero; the design supports them instead of competing with them. Small "engineered" details (mono labels, numbered sections, precise alignment) make it feel crafted.

### 6.2 Colors (CSS custom properties)
```css
:root {               /* Dark: default */
  --bg:        #0A0A0A;
  --surface:   #141414;
  --surface-2: #1C1C1C;
  --border:    #262626;
  --text:      #FAFAFA;
  --muted:     #A1A1AA;
  --accent:    #C6F432;   /* lime */
  --accent-fg: #0A0A0A;   /* text on accent buttons */
}
[data-theme="light"] {
  --bg:        #FAFAFA;
  --surface:   #FFFFFF;
  --surface-2: #F4F4F5;
  --border:    #E4E4E7;
  --text:      #0A0A0A;
  --muted:     #52525B;
  --accent:    #4D7C0F;   /* darker lime for contrast on light */
  --accent-fg: #FFFFFF;
}
```
- Accent used ONLY for: primary buttons, links on hover, focus rings, active nav, small highlights, the availability dot.
- All text/background pairs must pass **WCAG AA** in both themes.
- Easy to re-theme: changing `--accent` should be the only edit needed for a new brand color.

### 6.3 Typography
- Headings: **Space Grotesk** 600–700, letter-spacing `-0.02em`, line-height 1.05–1.15.
- Body: **Inter** 400–500, line-height 1.6, max line length ~65 characters.
- Labels/tags/dates: **JetBrains Mono** 400–500, small, uppercase, letter-spacing `0.05em`.
- Load from Google Fonts with `display=swap` and `preconnect`, only the weights used. Fallback: system-ui stack.
- Fluid scale:
  - h1: `clamp(3rem, 9vw, 7.5rem)`
  - h2: `clamp(2rem, 4vw, 3rem)`
  - h3: `clamp(1.25rem, 2vw, 1.5rem)`
  - body: `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`
  - small/label: `0.75rem–0.875rem`

### 6.4 Spacing, layout and shape
- 8px spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 (as CSS variables).
- Section padding: 96–128px desktop, 64px mobile.
- Container: max-width 1100px, side padding 24px (mobile) / 32px (desktop).
- Grid: 12 columns desktop, 1 column mobile.
- Radius: 12px cards/images, 999px buttons and tags.
- Borders: 1px `var(--border)`. Shadows: none or extremely subtle; use borders and contrast instead.

### 6.5 Components
- **Buttons:** pill shape, min-height 44px, padding 12×24. Primary = accent bg + accent-fg text. Secondary = transparent + border. Hover: color shift + arrow icon nudges 4px right. Visible focus ring.
- **Tags:** mono, small, pill, surface-2 background, muted text.
- **Project card:** surface background, 1px border, 12px radius, image on top with `overflow: hidden`. Hover: lift -4px, border becomes accent, image scales 1.03.
- **Section label:** mono `01 / SELECTED WORK`, muted, with a short line before it.
- **Theme toggle:** sun/moon inline SVG icon button with `aria-label`, smooth icon swap.
- **Copy buttons:** icon + "Copied!" feedback, keyboard accessible.
- **Modal:** for demo videos; focus-trapped, Esc closes, backdrop blur is OK here only.

### 6.6 Micro-details (the "crafted" feel)
- `::selection` uses the accent color.
- Focus rings: 2px accent outline with 2px offset (`:focus-visible` only).
- Thin custom scrollbar matching the theme.
- `scroll-behavior: smooth` + `scroll-margin-top` so headings aren't hidden under the sticky header.
- Favicon: my initials in accent on dark.
- Consistent alignment: everything snaps to the grid and spacing scale; no random values.

### 6.7 Things to avoid
Purple/blue gradient blobs · glassmorphism everywhere · emojis as decoration · stock photos · skill % bars · carousels/sliders · auto-playing audio · typing-effect hero text · particle backgrounds · more than one accent color · centered walls of text · tiny low-contrast gray text · fake "Trusted by" logos.

---

## 7. Animation and interaction

**Approach:** CSS transitions/keyframes + `IntersectionObserver`. No animation libraries.

| Element | Animation |
|---|---|
| Hero (on load) | Label, name, intro, buttons slide up 24px + fade in; stagger 80ms; duration 700ms; easing `cubic-bezier(0.16, 1, 0.3, 1)` |
| Sections (on scroll) | Fade in + translateY(24px → 0), once, when 15% visible |
| Project cards | Staggered reveal (100ms apart); hover lift + accent border + image zoom 1.03 |
| Buttons | 200ms color transition; arrow nudge on hover |
| Header | Background/border fade-in after scroll |
| Availability dot | Gentle pulse (opacity/scale) |
| Theme switch | Smooth 200ms color transition on `background-color`/`color` |
| Copy button | Icon swap → "Copied!" |

**Rules**
- Animate only `transform` and `opacity` (except color transitions). Target smooth 60fps.
- No layout shift caused by animations.
- **Content must be fully visible if JavaScript fails or is disabled** (add a `.js` class to `<html>` and only hide elements for reveal when it's present).
- **`prefers-reduced-motion: reduce` → disable all motion** (no reveals, no hover movement, no pulse, no smooth scroll).
- Hover-only effects must not hide information on touch devices.

---

## 8. Responsive design (required)

- **Mobile-first CSS.** Breakpoints: `640px`, `768px`, `1024px`, `1280px`.
- Must look intentional (not just "not broken") at: **360, 390, 768, 1024, 1440, 1920px** widths.
- No horizontal scrolling at any width. Long words/URLs wrap (`overflow-wrap: anywhere` where needed).
- Tap targets ≥ 44×44px. Text readable without zoom (body ≥ 16px).
- Projects: 1 column (mobile) → 2 columns (≥768px); featured card stays full width.
- About: stacked (mobile) → 2 columns (≥1024px).
- Images: `width: 100%; height: auto;` with fixed aspect ratio boxes so nothing jumps.
- Test landscape phone (short height) so the hero doesn't overflow.

---

## 9. Project demos (RielTrack, FileShift, and others)

Make it **effortless** for visitors to see my projects working:
- **Live demo button** goes to the deployed app (opens in new tab, `rel="noopener noreferrer"`).
- **Demo login** shown on the card with a copy button, so visitors don't have to sign up.
- **Video demo** (20–40s, muted, looping, with `poster` image and `playsinline`) in a modal. This is the backup if the live demo is down or sleeping.
- **Code button** goes to the GitHub repo; if private, show "Private repo".
- If a project has **no** live demo yet, show the video or screenshot and a small "Demo coming soon" label. Never a broken link.
- Never embed the live app in an iframe on the portfolio (slow, can break).

*(Notes for me, not for the site: host frontends on Vercel/Netlify, backends on Render/Railway/Fly.io, databases on Supabase/Neon. For FileShift's public demo: limit upload size, auto-delete files, add rate limits. Seed demo accounts with realistic sample data and reset it regularly.)*

---

## 10. Accessibility (required)

- Semantic landmarks: `header`, `nav`, `main`, `section` (with `aria-labelledby`), `footer`.
- Exactly one `<h1>`; logical heading order (h2 per section, h3 per card).
- Skip-to-content link. Everything usable by keyboard only, in a logical tab order.
- Visible `:focus-visible` styles everywhere.
- Icon-only buttons/links have `aria-label`. Decorative SVGs have `aria-hidden="true"`.
- Alt text on all meaningful images (e.g. "RielTrack dashboard showing monthly spending chart"); empty `alt=""` for decorative ones.
- Mobile menu and modal: correct `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-modal`, focus trap, Esc to close, focus returns to trigger.
- Copy feedback announced via `aria-live="polite"`.
- Color is never the only way information is shown. WCAG AA contrast in both themes.
- `lang="en"` on `<html>`.

---

## 11. Performance

- Target **Lighthouse 90+** in Performance, Accessibility, Best Practices and SEO (mobile).
- Images: WebP (or AVIF), ideally ≤ 200–300 KB each, correct dimensions, explicit `width`/`height`, `loading="lazy"` + `decoding="async"` (except the first visible image).
- Videos: MP4 H.264, ≤ 5 MB, `preload="none"`, only loaded when the modal opens.
- Fonts: only needed weights, `display=swap`, `preconnect`.
- CSS and JS each in one file; JS loaded with `defer`. No unused code.
- No layout shift (CLS ≈ 0).

---

## 12. SEO and sharing

In `<head>`:
- `<title>[Name] · [Role]</title>` and a meta description (~150 chars) using my real intro.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<meta name="theme-color">` for dark and light.
- Open Graph + Twitter card tags (title, description, `og:image` = `assets/images/og-image.png` 1200×630, url when domain known).
- Canonical URL (when domain known), favicon (SVG + fallback), `robots.txt`.
- JSON-LD `Person` schema with my name, job title, and social links (`sameAs`).
- Inline script in `<head>` to set the theme **before paint** (prevents flash of wrong theme).

---

## 13. Writing and content guidelines

- Use my words from Section 3. You may **lightly polish grammar and clarity**, but don't add new facts, numbers or claims.
- Lead project descriptions with the **problem and outcome**, then the tech.
- Short sentences, active voice, no jargon soup, no clichés ("passionate", "guru", "ninja").
- Buttons use action verbs: "Try live demo", "Watch video", "View code", "Download résumé".
- Keep the whole page scannable: headings, short paragraphs, tags.

---

## 14. Working process (step by step)

1. **Check inputs.** Read Section 3. If it still has `[...]` placeholders for name, role, projects or contact, list what's missing and ask me. Check what files exist in `assets/`.
2. **Show the plan** in a few lines: sections, colors, fonts, any questions. Then start building (don't wait unless something is blocking).
3. **Build in stages**, committing to git after each working stage:
   1. File structure + design tokens + base styles
   2. Header, navigation, mobile menu, theme toggle
   3. Hero
   4. Projects (cards, demo login copy, video modal)
   5. About, Experience
   6. Contact, footer, 404
   7. Animations + reduced-motion
   8. SEO/meta, favicon, OG image placeholder (plain text-based, not a photo)
4. **Review like a senior designer.** Check every breakpoint (Section 8) and both themes. Look at spacing, alignment, hierarchy, contrast, consistency. Fix what's off.
5. **Run the checklist** in Section 16 and fix issues.
6. **Write README.md** (Section 15).
7. **Final summary to me:** what was built, how to open it, which file to edit for each kind of change, and every remaining `TODO`.

**Git commit style:** short, clear messages, e.g. `Add projects section with demo modal`.

---

## 15. README.md must include (in simple language)

1. **How to open the site:** double-click `index.html` (or use VS Code "Live Server").
2. **How to edit:**
   - My text and links → `index.html` (which section comment to look for)
   - Add a new project → copy one `project-card` block and change text, image, links
   - Change images → put files in `assets/images/`, keep or update file names
   - Change colors → `--accent` and other variables at the top of `css/style.css`
   - Change fonts → the Google Fonts link in `index.html` + font variables in CSS
3. **Image tips:** use WebP, ~1600px wide screenshots, under 300 KB (free tool: squoosh.app).
4. **How to put it online:** push to GitHub → enable GitHub Pages, or import to Vercel/Netlify (no build settings needed) → connect a custom domain.
5. **How to update the live site:** edit → `git add .` → `git commit -m "..."` → `git push`.
6. **List of TODOs** still to fill in.

---

## 16. Final checklist (definition of done)

**Content**
- [ ] Only my real info is on the page; no invented names, projects, numbers or photos
- [ ] Every remaining placeholder is clearly marked `TODO`
- [ ] No broken links; buttons without links are hidden

**Design**
- [ ] Looks polished at 360, 390, 768, 1024, 1440, 1920px
- [ ] Dark and light themes both look intentional; no flash on load
- [ ] Consistent spacing, alignment, fonts and colors (only one accent)

**Interaction**
- [ ] Mobile menu, theme toggle, copy buttons, video modal all work with mouse, touch and keyboard
- [ ] Animations smooth; fully disabled with reduced motion; content visible without JS

**Accessibility**
- [ ] One h1, logical headings, landmarks, skip link, focus styles, alt text, aria labels
- [ ] WCAG AA contrast in both themes

**Performance & SEO**
- [ ] Images optimized and lazy-loaded; no layout shift
- [ ] Title, description, OG tags, favicon, JSON-LD present
- [ ] No console errors or warnings

**Handover**
- [ ] README written in simple language
- [ ] Git history with clear commits
- [ ] Final summary sent to me in plain language

---

## 17. Future ideas (do NOT build unless I ask)
- Separate case-study pages per project
- Blog / notes
- Contact form with Formspree
- Khmer / English language switch
- Analytics (Plausible / Umami)
- Testimonials (only real ones)
