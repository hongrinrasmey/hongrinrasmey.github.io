# CLAUDE.md — My Portfolio Website

Read this whole file before doing anything. These rules override any default habits.
**Agents: read section 13 (Progress log) first to see where the work stands, then continue from there. Update section 13 after every change.**

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

### Current state
- Plain HTML/CSS/JS site in the project root (`index.html`, `css/style.css`, `js/main.js`, `favicon.svg`, `README.md`).
- **Section 3 is still all placeholders**, so every piece of personal content on the page is an obvious `[TODO: ...]`. Nothing is invented.
- The earlier Astro version (it had an invented persona, city photos and a blog, which break rules 1–6) was moved, not deleted, into `_old-astro-version/`. It is git-ignored. Delete that folder once you no longer want it.

### Decisions made
- Optional "Open to work" badge: left out (it is optional and reads as decoration). Ask the owner if they want it.
- Experience section: present in `index.html` but commented out, because no experience was provided. Uncomment to use it; also uncomment its nav link.
- Links left as `href="#"` (Live, Code, GitHub, LinkedIn, résumé) are hidden automatically by CSS (`.link-opt[href="#"]`). Put a real URL in and the button appears.
- Open Graph image line is commented out in `<head>` until a real image exists (no fake image).
- Light mode accent: buttons keep lime `#C6F432` with dark text; accent-coloured text/links use darker `#4A6600` for contrast.

### Done (2026-11-12)
1. Moved old Astro project into `_old-astro-version/`.
2. Built the one-page site per sections 4–8.
3. Checked layout at 360 / 390 / 768 / 1024 / 1440 widths. No horizontal scroll at any width.
4. Tested in a headless browser: theme toggle + saved choice after reload, mobile menu (opens, closes on link, closes on Escape and returns focus), scroll reveal, copy-email, footer year, one `<h1>`, no console errors.
5. Wrote README.md, then ran git init and the first commit.
6. Added contact layout (2 columns on desktop), hero height cap, and `scroll-margin-top` so menu links don't land under the sticky header.

7. Placeholder box text set to 20px so it reads as a box, not a small label. Font sizes merged into fewer steps.
8. Final checks after the last CSS change:
   - taste-skill inspector: **0 FAIL** at 1440 / 768 / 390, run with `--allow few-pictures` because rule 3 bans stock photos. Re-run it without `--allow` once real screenshots are in.
   - Lighthouse mobile: Performance 95, Accessibility 100, Best Practices 100, SEO 100. Desktop: 99 / 100 / 100 / 100.
   - Remaining warnings, kept on purpose: no video (rule 3), "little motion" (section 8 asks for subtle motion), and in-between font sizes at 768px (they come from `clamp()`, which section 7 requires).

### How to re-run the checks (for agents)
- Inspector: `node <taste-skill>/scripts/inspect.mjs index.html --allow few-pictures`. Run it from PowerShell, because the Bash sandbox blocks the browser.
- Lighthouse: serve the folder locally, then `npx -y lighthouse@12.8.2 http://localhost:PORT/ --chrome-flags="--headless=new"` with `CHROME_PATH` set to Edge (`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`).

### Still TODO (needs the owner's real details)
- Fill in every `[TODO: ...]` in `index.html` from section 3: name, role, intro, bio, location, remote yes/no, skills, 2–4 projects, email, GitHub, LinkedIn.
- Add `assets/images/me.jpg` (optional), project screenshots, and `assets/resume.pdf` (optional).
- Add an Open Graph image and uncomment its `<meta>` line.
- Update `<title>` and meta description with the real name.
