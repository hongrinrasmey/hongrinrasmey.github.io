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
- `DESIGN.md` on disk was replaced with the pasted warm-orange version after the owner said yes (2026-11-12).
- **Type scale** folded onto the spec's five steps (§9.3 table): 14 (small + labels, `--fs-label` = `--fs-small`) / body / h3 / h2 / h1. Buttons, wordmark and card text use `--fs-body`; hero intro and About bio use `--fs-h3`; contact heading `--fs-h2`; contact email `--fs-h3` at every width (48px broke real addresses in the narrow column) with a 44px tap height.
- KH Halal screenshot is `loading="lazy"` (it is below the fold at every width, §12).
- Checks (final): lint 0/0; inspector 0 FAIL, sizes 14/18/24/48/104, WARNs defended in `.taste-skill/critique.md` round 3 (no-footage: videos are a separate task; off-centre: frame measured 165/165px, the 192px is ragged text; hero-void: fills with real name + avatar); `scenes.mjs` ran (no scroll scenes on the sheet; reduced-motion sheet made). Headless Edge functional test all pass: skip link first, mobile menu open/aria-expanded/scroll lock/Esc closes + focus returns/link click closes, ≥44px targets, one h1, alt on images, no broken `#` links, noopener, empty links hidden, theme toggle + saved + reload, `T`, copy email + aria-live, reduced motion shows everything, no JS hides nothing, no console errors on file:// and http, no horizontal scroll 360–1920, Khmer font loads only with Khmer text. Lighthouse mobile with gzip (`npx serve`, like Vercel/Netlify): **100/100/100/100, LCP 1.7s, CLS 0**; without compression (http-server) 98, LCP 2.3s. Desktop 100 ×4. Page 263 KB.

### Update 2026-11-12 (third pass): full audit against DESIGN.md on disk
Owner decisions (2026-11-12): (1) replace DESIGN.md with the pasted version: done; (2) when the taste-skill direction sheet and DESIGN.md disagree, **DESIGN.md wins** (sheet "The dark room", seed 1825430341: its photo-led hero, scatter work, inset portrait and visit-card contact are not used because they need stock/found photos and a layout DESIGN.md does not allow).
Fixed to match the spec exactly:
- Featured card split 7/12 media + 5/12 text at ≥1024px; the web screenshot has its own 16:10 frame, 12px radius, 1px border (§8.3). Cards 2–3 show one line only; their problem text + features are kept in an HTML comment in each card.
- Header: `--bg` 80% + 12px blur + border after 20px scroll; 64px mobile / 72px desktop; anchors offset header + 16px.
- Hero: padding 96/64 (mobile) and 128/96 (≥768px); faint 64px grid texture at 4% fading out (§9.7); h1 nudged -0.04em (optical alignment).
- §9.4 spacing via tokens `--card-pad` (20/28), `--btn-gap` (12/16), `--gutter` (24/32 from 768px), card gaps 24/32, footer 32/40, heading→content 32/48.
- Tags mono 12px, padding 4×10, muted (skill pills too). `--fs-label` 12px (mono labels/tags/dates), `--fs-small` 14px (nav, footer, notes).
- Buttons press scale 0.98; card hover border `--accent-text` 60%; spotlight 6%; icon strokes 1.5px (index + 404); modal 900px web / 420px phone videos (`video-modal--phone`, set in initVideo by the card's platform tag).
- Headings -0.03em (h1) / -0.02em (h2–h3), h1 line-height 1.05; `p { max-width: 65ch; text-wrap: pretty }`.
- About photo: 1px border; greyscale-to-colour only for mouse users.
- Fallback fonts with matched metrics (§12): "Geist Fallback" = Arial at size-adjust 103.1%, ascent 98%, descent 29.1%; "Geist Mono Fallback" = Courier New 100%, ascent 101%, descent 30% (measured in Edge with canvas measureText).
- `content-visibility: auto` on `.projects__grid` and `.about__grid` only. **Not on the sections**: style containment resets the CSS counters, and every label became "01 /".
- Budgets (§12) met as raw files: CSS 29,860 bytes (≤ 30,000), JS 14,999 bytes (≤ 15,000), measured on the LF files git stores. Done by shortening comments, one shared rule for all mono labels/tags/dates (`.section-label, .tags li, .platform-tag, …` near the top of section 3), `:is()` for the text-link underline, and tighter JS (same behaviour). Gzipped: CSS ~8 KB, JS ~5.5 KB; page 192 KB transferred. **Keep an eye on these two numbers when adding code.**
- Card tilt caches the card position on mouseenter (§12) and clamps the cursor to the card, so the tilt never passes ±4° even if the page scrolls under a resting mouse.
Checks (final): lint 0/0; inspector 0 FAIL with `--allow ...,small-text` (12px tags are §9.6); sizes 12/14/18/24/48/104; WARNs no-footage, off-centre (optical h1 nudge + ragged text; frame is 165/165), hero-void, defended in `.taste-skill/critique.md` round 4. scenes.mjs ran (no scenes). Functional test all pass, plus video modal (420/900, preload none, focus in and back, emptied on close). 60fps scroll at 4× CPU slowdown (median frame 16.7ms, none over 33ms). Lighthouse with gzip: mobile 99/100/100/100 LCP 1.8s CLS 0; desktop 100 ×4. Screens checked: light + dark, 1440, 1366×768, 390, 844×390 landscape.

**Owner decision (2026-11-12, final):** keep the site on DESIGN.md. Do NOT add found/stock photos, credits, found video clips or the taste-skill sheet layouts ("The dark room", seed 1825430341) even though the skill asks for them; DESIGN.md rule 4 and §8 win. The remaining inspector WARNs (no-footage, off-centre, hero-void) are accepted until the owner sends their photo, name, bio, RielTrack screenshots and videos.

### Update 2026-11-12 (fourth pass): wider container, tighter Contact
Owner approved after a design review:
- `--container` 1100px → **1200px** (`css/style.css` line 65; DESIGN.md §9.4 updated to match). At 1920px each side margin drops from ~410px to ~360px; featured card media is bigger.
- Contact panel (≥1024px): removed `min-height: 70svh` and `.contact__details { align-self: end }`; the grid now uses `align-items: end`, so the two columns share a bottom line with no dead space.
- Checked: the "missing h1 at 1920" seen in a quick screenshot was capture timing (mid split-text animation), not a bug. The 390px "overflow" was headless Edge's minimum window width, not the page.
- Checks: lint 0/0; inspector 0 FAIL, same 3 WARNs as before (off-centre now 116/154 at 1440: optical h1 nudge + ragged text); Lighthouse mobile 100/100/100/100, LCP 1.7s, CLS 0. CSS 29,820 bytes (budget 30,000).
- Still open from the review: hero right-half void and thin About need the owner's photo, name and bio (content, not CSS).

### Update 2026-11-12 (fifth pass): links + screenshots found by the agent
- **KH Halal live demo**: `https://kh-halal-marketplace.onrender.com/` (service name from the repo's `render.yaml`; checked live, title "KH Halal Marketplace"). "Try live demo" now shows; "Demo coming soon" removed. Owner should confirm it is theirs and safe for public visitors (Bakong points at the SIT test API).
- **idevo download**: none public. APKs exist only in releases of the PRIVATE `Idevo` repo (v0.6.4), so visitors can't download them. Kept "Download coming soon". A public `Idevo-Downloads` repo (like RielTrack-Downloads) would fix it; ask the owner, never create it.
- **RielTrack screenshots**: none on GitHub or in `E:\RielTrack Project`. Taken by the agent: public 1.6 APK (SHA-256 checked) on the `Pixel_API37` emulator, the app's own preview sample data entered by hand (salary $850, lunch ៛12,000, PassApp $3.50, internet $24.99, shopping ៛45,000, $500 monthly limit), Android demo-mode status bar 9:41. Home / History / Budgets → `assets/images/rieltrack.webp`, `-2`, `-3` (390×844, ~20 KB each), in phone frames like idevo.
- Featured card (≥1024px) `align-items: center`, so the screenshot no longer floats at the top with empty space under it.
- Checks: lint 0/0; inspector 0 FAIL, same 3 WARNs; Lighthouse mobile (gzip) 100/100/100/100, LCP 1.8s, CLS 0, page 254 KiB, no console errors. CSS 29,821 bytes.
- **Phone frames fixed**: `.phone` had `aspect-ratio: 390/844` on its border-box (3px padding + 1px border) and `object-fit: cover`, so screenshots lost their left/right edges ("Plan", "Hard" cut). Now `.phone { flex: none }` and `.phone img { width: auto; height: 100% }`: the frame takes its width from each screenshot, nothing is cropped. RielTrack images re-exported at the emulator's real 9:20 (405×900, no crop); idevo stays 390×844. Checked at 1440/800/768/390.
- **Owner decision (2026-11-12): no "Private repo" label on any card.** Removed all three; DESIGN.md §6 step 7 and §8.3 updated. Public repo → add a "View code" button (comment above the projects in `index.html`).

### Update 2026-11-12 (sixth pass): wider layout on big screens
Owner asked for less empty space at the sides on wide screens.
- `--container` 1200px → **1400px**, then **1600px** (owner: "a bit more") (`css/style.css` line 65) and a new `--gutter: 48px` from 1280px up (one line before the 1024px block). DESIGN.md §9.4 updated.
- Result: side space at 1920 is ~160px (was ~360px), at 1440 48px (was ~120px). Below 1280 nothing changed.
- Featured card body lost `height: 100%`: with the bigger screenshot the button was pushed to the card bottom (gap under the tags). Now the text block centres and the button sits under the tags.
- Checked with headless Edge screenshots at 1920/1440/1280/1024. CSS ~29,900 bytes (budget 30,000: ~100 bytes left).

### Update 2026-11-12 (seventh pass): idevo download is public
- **Owner approved** ("do all of these") creating a public download repo. Created `hongrinrasmey/Idevo-Downloads` (README from facts in the Idevo README + release notes only; commit uses the GitHub no-reply email because GitHub blocks pushes that expose the private one). Release `v0.6.4` = the 3 APKs from the private `Idevo` v0.6.4 release, SHA-256 checked against GitHub's digests, + `SHA256SUMS-0.6.4.txt`; notes copied from the private release. Checked logged-out: `releases/latest` → 200, APK download → 206.
- idevo card: "Download APK" → `https://github.com/hongrinrasmey/Idevo-Downloads/releases/latest`, note `v0.6.4` (no Android version shown: `minSdk = flutter.minSdkVersion`, not confirmed). New idevo version → add a release there and change the note.
- Work heading "Three apps I designed and built" → **"Apps I designed and built"** (owner asked if the count is needed; it goes stale when a project is added).
- README TODO list: KH Halal demo, idevo download, RielTrack screenshots ticked.
- Checks: lint 0/0; inspector 0 FAIL, same 3 WARNs.

### Update 2026-11-12 (seventh pass): About in two equal columns
- `.about__grid` at ≥1024px: `7fr 5fr` → `1fr 1fr` (owner approved). The gap between bio and skills shrank, and the skills now start on the same line as the Contact right column. DESIGN.md §8.4 updated.
- The left side still looks empty until the owner sends the real bio and `assets/images/me.webp` (content, not CSS).
- Checked: headless Edge screenshots of About at 1920 and 1024 (at 1024 the pills wrap to two lines, which is fine).

### Update 2026-11-12 (eighth pass): About polish
- Skill pills: Geist Mono 14px, padding 6×12, logos 18px at 75% opacity (`.tags--skills` in `css/style.css`, right after `.tags svg`). Card tags stay 12px. Logos kept (owner's earlier choice); dimming makes solid logos (JS/TS/Kotlin) weigh about the same as outlined ones (PostgreSQL/Node).
- Removed "Based in [City], Cambodia." from About: the hero line already says it (DESIGN.md rule 5: location is one line). `.about__meta` CSS removed too. DESIGN.md §8.4 updated.
- Checked: About screenshot at 1920. Longest pill ("Cloudflare Workers") ~200px fits a 390px phone.
- Note: another session was editing at the same time (phone hover removed in CSS, `js/main.js`). Those changes were NOT part of this commit.

### Update 2026-11-12 (ninth pass): owner photo + email
- Owner gave their photo (`assets/images/photo_2025-03-15_09-31-46.jpg`, 827×1063, left untracked as the original) and email `hongrinrasmey012@gmail.com` (both mailto links + visible text in Contact; the copy button reads the link).
- `me.webp` 800×1000 (4:5, bottom of the suit trimmed, 30 KB) for About; `me-avatar.webp` 128×128 (face crop, 3 KB) for the hero avatar, so the hero doesn't load the big file. Both slots un-commented in `index.html`. Alt text still "Photo of [TODO: Your Name]" until the name is known.
- Bugs the photo exposed, fixed: (1) `.about__skills` stretched its rows to the taller left column, so big gaps between skill groups → `align-content: start`. (2) The orange frame's bottom 12px was clipped (`content-visibility: auto` on `.about__grid` clips overflow) → `.about__photo` gets 12px bottom margin.
- Checked over CDP with real device widths 360/390/768/1024/1440/1920: no horizontal scroll, email fits at 360 (279px in a 312px column), all images load, no console errors. Screenshots of hero + About at 1920.
- CSS 29,9xx bytes: **under 40 bytes left in the 30,000 budget** (shorten comments before adding code).
- Not done (needs name): OG image avatar, JSON-LD, favicon initials.

### Update 2026-11-12: project card hover, reviewed and fixed
- **Tilt scales with card width**: `d = Math.min(8, 4800 / width)` → ±4° on cards up to 1200px wide, ±1.8° on the 1334px featured card, ±3.7° on 651px cards (was ±4° everywhere, which warped the wide featured card).
- **Edge flicker fixed (was a real bug)**: the hit test used the tilted/lifted shape, so near any edge (worst at the bottom, from the 4px lift) the card slid out from under the mouse → mouseleave → reset → back under the mouse → repeat. `initTilt()` now runs on one window `mousemove` + `scroll` (passive, one rAF) and decides "over the card" from the resting box (`offsetLeft/Top` chain, which ignores transforms). It sets `.is-tilting`; CSS uses `:is(:hover, .is-tilting)` for lift, border, spotlight and screenshot zoom so they stay in step. Only tilts when the pointer is inside `<main>` (not over the header, mobile menu or video pop-up); resets when the mouse leaves the window. Scrolling under a still mouse now updates the tilt (old code kept a stale box).
- **Phone screenshots no longer lift on hover** (card moves as one piece; `.phone` transition removed).
- Tests (headless Edge over CDP, 4× CPU slowdown; scripts were in the session scratchpad): angles at 85% across = expected exactly; all 4 edges of both cards stay tilted (before: 0/8); scroll-under-mouse −2.95° vs −3.01° expected; no tilt over header; reset after leaving window; frames median 16.7ms, p95 16.8ms, 0 over 33ms; no console errors. Lint 0/0. Lighthouse 100×4 mobile (LCP 1.7s, TBT 20ms) and desktop.
- Budgets: JS 14,989 / 15,000 (comments shortened to fit), CSS 29,914 / 30,000. **Both are nearly full.**

### Update 2026-11-12 (tenth pass): owner name
- Name **Hong Rinrasmey** everywhere the TODO was: header wordmark, h1, footer, `<title>`, og/twitter title, JSON-LD, both photo alts (index.html), 404.html (title, wordmark, footer), `site.webmanifest`, `tools/og-image.html`.
- Favicon: initials **HR** (`favicon.svg`). `favicon-32.png` + `apple-touch-icon.png` drawn with Python Pillow (Arial Bold, same geometry), because headless Edge can't open a 180px/32px window and rendered a plain orange square. Note added in `tools/icon.html`.
- `og-image.png` re-made: name + round photo (`me.webp`, orange ring) on the right; the role line is `hidden` until the role is known (no "[TODO]" in shared links). `og:image:alt` = "Hong Rinrasmey".
- Checked over CDP 360–1920: h1 wraps to 2 lines on phones and fits (314px in a 312–314px column), no horizontal scroll, no console errors (index + 404).
- Still TODO: role, intro, bio, city, remote, contact sentence, LinkedIn.

### Update 2026-11-12: About photo frame
- Solid orange block behind the photo → 1px orange outline offset 12px (`.about__photo::before`).
- Owner did not want greyscale. Instead the blue studio background was replaced (colour key + edge despill, numpy/scipy, script was in the session scratchpad) with a warm dark backdrop (#161311 + faint orange glow behind the head). `me.webp` and `me-avatar.webp` re-made from the original jpg; the greyscale CSS was removed. Photo is full colour everywhere.

### Update 2026-11-12: hero depth (option C)
- Owner said the hero looked flat. Grid 4% -> 6%, plus `.hero::after`: one soft orange radial glow (7%) behind the name, ending inside the hero (no hard edge). DESIGN.md §9.7 updated. Checked dark + light at 1920.
- Drafts A (big photo right, no avatar) and B (idevo + RielTrack phone frames right) were built in the session scratchpad only, NOT in the repo, for the owner to choose. Role/intro (option D) still need the owner's own words.
- CSS 29,927 / 30,000 bytes.

### Update 2026-11-12: photo moved to the hero (draft A, owner approved)
- Round avatar and the About photo removed; one framed 4:5 photo (`.hero__photo`, same orange outline frame) in the hero. Phones/tablets: above the name, `min(56%, 240px)`. ≥1024px: hero grid `1fr auto`, photo right `clamp(280px, 26vw, 400px)`; title row is `1fr` so the text sits at the bottom, level with the photo bottom. If status/now/stats are un-commented, change `repeat(3, auto)` / `span 4` to match the row count.
- Photo is above the fold now: no `loading="lazy"`, `fetchpriority="high"`. `me-avatar.webp` deleted (unused). About is bio + skills only.
- CSS 29,984 / 30,000 bytes (comments shortened to fit). Checked with screenshots at 1440, 1024, 500.
- `og-image.png` still has the old blue-background round photo: re-make from `tools/og-image.html`.

### Update 2026-11-12: role + intro, hero gap, share image
- **Owner chose (2026-11-12):** role "Full-Stack & Android Developer", intro "I design and build web and mobile apps from idea to release." Put in the hero, `<title>`, meta/OG/Twitter description + titles, JSON-LD `jobTitle`, `tools/og-image.html` (role un-hidden), DESIGN.md §5. `og-image.png` re-made (role + new photo).
- **Hero gap (wide screens):** grid columns `auto 1fr` (text takes its own width), photo `place-self: end center` in the rest, width `clamp(280px, min(30vw, 50svh), 480px)` (50svh keeps it inside short laptop screens). Gap name→photo at 1860 ~210px (was ~400). At 1024 the name wraps to 2 lines (same as before).
- Lint had 1 FAIL from commit dc304ea (hero glow radial-gradient, DESIGN.md §9.7): marked `taste-skill-ignore`.
- Checks: lint 0/0; screenshots 1860×914, 1440, 1366×768, 1024, 768, 390, 360; Lighthouse (gzip) mobile 99/100/100/100 LCP 1.8s CLS 0, desktop 100×4, no console errors. CSS 29,994 / 30,000.
- Owner may send a more relaxed photo later (daylight, plain wall): redo with the same background replacement, `me.webp` 800×1000.
- Still TODO: bio, city, remote, contact sentence, LinkedIn.

### Update 2026-11-12: About replaced by Skills; hero + contact text filled
Owner asked for a section that shows what they know instead of "About me" (the hero already has photo, name, role, intro). Owner answers: Phnom Penh, open to remote; contact line "open to full-time developer roles"; experience = education only (details not sent yet); LinkedIn not given (icon stays hidden).
- `02 · SKILLS` "What I work with" (`#skills`, nav "Skills"). Left: "What I can do", 3 items (`.caps`), each from real project facts and linking to the card that proves it (`#kh-halal`, `#idevo`, `#rieltrack`, ids added to the 3 `<article>`s). Right: the same tool groups. DESIGN.md §8.4 rewritten.
- Hero line "Phnom Penh, Cambodia · Open to remote work"; contact sentence filled. **No `[TODO]` left on the visible page.**
- CSS: `.about__bio` removed, `.caps` added; `scroll-margin-top` moved from `.section` to `[id]` so card links land under the header (measured 88px = 72 header + 16). Comments shortened: CSS 29,991 / 30,000 bytes.
- Checks: lint 0/0; CDP at 360/390/768/1024/1440/1920: no horizontal scroll, no TODO text, links land at 88px, no console errors.
- Still open: education details, LinkedIn URL, résumé PDF.

### Update 2026-11-12: honest AI wording, Tech + Education sections
Owner said the projects were built with AI and they do not yet know the foundations of Kotlin, Node.js etc. Owner chose to **say it openly**. Owner degree: Bachelor's in Business Information Technology (BIT), National University of Management, 2023–2026. No work experience yet.
- Hero intro + meta/og/twitter descriptions: "I design and ship web and mobile apps, using AI tools to build them." Card text (all 3, two inside HTML comments): "I designed it and built it with AI tools." Work heading "Apps I designed and shipped".
- `02 · SKILLS` → `02 · TECH` "What I build with" (`#tech`, nav "Tech"): left one honest sentence (`.tech__note`), right the tool groups plus "How I build: AI-assisted development". The "What I can do" column was removed (owner: it repeated the Work section). Owner asked about skill percentages: advised against (CLAUDE.md §5 bans them, and they would claim knowledge the owner says they don't have).
- `03 · EDUCATION` "Where I studied" (`#education`, nav link added), one `.timeline` item. The old commented-out Experience block was replaced; `.education*` CSS removed. JSON-LD `alumniOf` added.
- **Do not** add levels, percentages or "expert" words to Tech (DESIGN.md §8.4 honesty rule).
- Another session was adding animations to `css/style.css` + `js/main.js` at the same time (photo wipe, phone screen cycling, pill pop-in, label roll). Those were NOT part of this commit (only my CSS lines were staged). With them the CSS is ~32.4 KB, over the 30,000 budget.
- Checks: lint 0/0 (run before the other session's edits); CDP 360–1920 no horizontal scroll, no TODO text, labels 01–04, nav links land under the header, no console errors.

### Update 2026-11-12: orange photo frame removed
- Owner chose option 1 of 3 (remove / bold offset / glow): the 1px orange outline offset 12px behind the hero photo only showed on two sides and looked like a glitch. Removed `.hero__photo::before`, its hover shift, and the 12px margins that made room for it. Photo keeps its 1px grey border + 12px radius. DESIGN.md (orange usage list + motion table) updated.
- Header name kept (owner asked why it repeats the h1: it is the sticky home link; spec §5).
- Uncommitted work from another session (phone screen swap, hero glow follows mouse, skill pill pop-in, section label draw; `css/style.css` + `js/main.js`) was NOT in this commit; its photo `frame-in` animation was removed with the frame. With that work the CSS file is ~31,900 bytes, **over the 30,000 budget**.
- Checked: headless Edge screenshots at 1440, 1024, 500.

### Update 2026-11-12: motion cut back (owner: "do all of these")
After a review of the other session's new effects (phone screens, phone drift, hero glow, pill pop, label roll, photo wipe):
- **Removed:** section label line-draw + number roll, and the hero photo wipe (the photo rises in with the other hero items again). CSS rules, reduced-motion and print selectors, DESIGN.md §11 rows removed.
- **Phone screens** (`initPhoneScreens` in `js/main.js`): one loop back to the first screen, 1.2s per screen, then stop and disconnect. Measured: swaps 1.4s to 4.1s after the card shows, done before 5s (WCAG 2.2.2), ends in the HTML order, no change after. Hover/focus still pauses.
- Kept: phone drift, hero glow follow, skill pill pop-in.
- Tests (headless Edge, CDP, 4x CPU): frames median 16.7ms, p95 16.8ms; no console errors; no horizontal scroll at 1440; reduced motion: no clones, pills and photo visible; clone images have alt="" (6 real alts).
- Sizes: CSS 31,200 (old budget 30,000; DESIGN.md says 33,000, raised by the other session), JS 17,921 (old 15,000; DESIGN.md says 18,000). **Owner has not approved the raised budgets.**
- Not committed: the same files hold the other session's unfinished work (photo cut-out mask, new idevo screenshots). Lint has 1 FAIL from that session (`.hero__photo img` mask gradient), not from this change.

### Update 2026-11-12: hero photo is a cut-out
- Owner asked to fix the photo "box". Three drafts built and screenshotted in dark + light (scratchpad only): A fade edges (fine in dark, a brown smudge in light: rejected), B cut-out (works in both: **chosen**), C arch-top box.
- `me.webp` (800×1000, ~40 KB) is now transparent: made by `tools/photo-cutout.py` from the original jpg (blue key flood-filled from the top/side edges only so the blue tie stays; blue gaps in the top 60% also removed; edge despill; premultiplied resize so no blue halo). New photo → re-run that script (it needs a plain blue/flat backdrop).
- CSS: `.hero__photo img` has no border/radius, `mask-image` fades the suit out (58% → 92%); `.hero__photo::before` is a 16% orange radial light behind the head. `tools/og-image.html` avatar got `background: #161311` so the share image keeps its dark circle.
- Checked: headless Edge over CDP, 6 loads each at 390 and 1440 in light + dark: photo loaded, opacity 1, no console errors, no horizontal scroll. (Flipping `data-theme` after load in headless stops frame rendering: a test-tool quirk, not the page.) Screenshots 1440/1024/600.

### Update 2026-11-12: Tech + Education merged into About
Owner: both sections looked empty on their own ("do all of these").
- One section `02 · ABOUT` "My background" (`#about`, nav Work / About / Contact). Left (`.about__side`, new CSS line under `.tech__note`): the honest AI sentence, then an "Education" label + the BIT timeline item (role is now `<h4>` under the `<h3>` label). Right: the tool groups, unchanged. Contact is `03`. DESIGN.md §8, §8.1, §8.4 updated.
- Checked: headless Edge full-page screenshots at 1440 and 500.
- Waiting on the owner for content (never invent): short bio, "currently learning", education details (courses, final project, certificates), spoken languages, résumé PDF, LinkedIn, KH Halal demo login (or remove that row), one line per project on what they did/learned, demo videos.
- Only `index.html`, the one CSS line and the docs were committed; the other session's CSS/JS work is still uncommitted.
- Education item: "Final-year thesis project: KH Halal Marketplace." (`.timeline__text`, links to `#kh-halal`, same underline style as contact links). Fixed a bug from the merge: `h4` was missing from the margin reset and the heading rule (big gap + wrong weight).
- Spoken languages in About (left column, under Education): "Khmer (native) · English (basic)" (owner chose basic). LinkedIn: optional; owner asked if needed, told no.

### Update 2026-11-12: tool list removed from About
Owner asked what the tool list was for; agreed it repeated the card tags and invited questions about tools they have not learned yet.
- Removed the tool pill groups and the simpleicons SVG sprite at the top of `<body>` (only the pills used it; `assets/icons/` kept as source). About is now two `.about__side` columns: left "I build my apps with AI coding tools." (the "These are the technologies…" half was dropped: nothing below it any more); right Education + Spoken languages.
- CSS removed: `.tags svg`, `.tags--skills`, `.about__skills`. In the other session's uncommitted work (not committed here): pill pop-in CSS + `initSkillPills()` removed (dead), and the stacked no-stagger rule now targets `.about__side`.
- Checks: headless Edge screenshots 1440 + 500, no console errors from the page. CSS 31,158 / JS 17,680 bytes (with the uncommitted work).

### Update 2026-11-12: hero first-screen fixes (owner: "do all of these")
- **Centred top to bottom**: name used to start ~55% down the screen (text sat on the photo's bottom line). Phones/tablets: `.hero__inner` `justify-content: center`. ≥1024px: rows `1fr repeat(3, auto) 1fr` (equal empty rows above/below the text), photo `grid-row: 1 / -1; place-self: center start`, so it sits next to the name instead of centred in the leftover space (gap name→photo ~64px + photo side fade). If status/now/stats are un-commented, change `repeat(3, auto)` to match.
- **Photo sides fade**: the shoulders touch the left/right edges of `me.webp` (alpha 255 on both edge columns), which drew two straight vertical cuts. `.hero__photo img` now has a second mask (fade 0–18% and 82–100% across, `mask-composite: intersect`). The head spans 21–76% of the width, so it is untouched.
- **Hero line + meta/og/twitter descriptions**: "I design and ship web and mobile apps." (the AI clause moved out of the headline). The AI note is still on the page: featured card text, About note "I build my apps with AI coding tools", skill pill "AI-assisted development". `og-image.png` has no intro text, so not re-made.
- Checks: lint 0/0; CDP at real widths 360/390/768/1024/1366/1440/1843, dark + light: photo loaded + visible, no horizontal scroll, no console errors; equal-ish space above/below at every width. CSS 31,736 bytes.
- Only my hero lines were committed; the other session's phone-swap work in the same files is still uncommitted.

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
- Lighthouse: test through a server that gzips (`npx -y serve@14.2.4 -l 8138 .`); http-server sends files uncompressed and makes mobile LCP look ~0.6s slower than on Vercel/Netlify.
- Inspector (PowerShell): `node <taste-skill>/scripts/inspect.mjs index.html --allow few-pictures,eyebrow,mono,micro-label,hairline,outlined-box,small-text`.
- Lighthouse: serve the folder with any static server, then (PowerShell) `$env:CHROME_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"; npx -y lighthouse@12.8.2 http://localhost:PORT/ --chrome-flags="--headless=new"`.

### Next step
Owner: give name, role, intro, bio, city, remote yes/no, email, LinkedIn; KH Halal live URL; a public idevo download; RielTrack screenshots. **Next agent:** put them into `index.html` (+ `<head>`, JSON-LD, `404.html`, `site.webmanifest`, `tools/og-image.html`, then re-make `og-image.png` and the favicon PNGs), re-run the checks, update this log, commit.
