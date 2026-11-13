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
- Owner gave their photo (original 827×1063 jpg, now in git-ignored `tools/source/photo_2025-03-15_09-31-46.jpg`) and email `hongrinrasmey012@gmail.com` (both mailto links + visible text in Contact; the copy button reads the link).
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

### Update 2026-11-12: no reveal stagger when stacked
- `css/style.css` (after `.js-ready .reveal.is-visible`): `transition-delay: 0ms` for all reveals under 768px (cards in one column) and for `.about__skills` / `.contact__details` under 1024px (Tech and Contact stacked). Side-by-side blocks keep the 100ms stagger. DESIGN.md §11 row updated.
- Tested (headless Edge, CDP): delays 0s at 360/390; at 900 cards 0.1/0.2s and Tech/Contact 0s; at 1440 0.1/0.2/0.1/0.1s. Every `.reveal` reaches opacity 1 after scrolling, no horizontal scroll, no console errors. Lint: same 1 FAIL from the other session's photo mask. CSS 31,434 bytes. Not committed (other session's work in the same files).

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

### Update 2026-11-12: phone cards fade to NEW screens (owner: "do all of these")
Owner: the swap only reshuffled the same 3 screens. Now each phone `<img>` has `data-next` + `data-next-alt` (`index.html`); `initPhoneScreens()` in `js/main.js` clones it once and fades old 3 → new 3 → old 3, one loop (2s steps, under 5s, WCAG 2.2.2), then stops. Waits for the next images to load (no blank frame). No CSS change. Remove `data-next` to keep a phone still.
- idevo (390×844, from the private repo's golden test images `test/golden/goldens/*_light.png`): `idevo-library.webp` (notes), `idevo-path.webp` (Flutter basics path), `idevo-progress.webp` (stats).
- RielTrack (405×900, public 1.6 APK, SHA-256 checked, on `Pixel_API37` at `E:\Android\sdk`; same sample data re-entered by hand, $500 limit): `rieltrack-reports.webp`, `rieltrack-categories.webp` (Reports scrolled to Spending by category), `rieltrack-add.webp` (New transaction, 12000 ៛ Food, not saved). The emulator keeps showing a faint satellite icon in the status bar; it was painted over with the bar colour (status bar only, checked flat). Plan tab is empty (no accounts), so not used.
- Checks: headless Edge over CDP at 1440×900 and 390×844: both cards go new → back → stop, images load, no console errors; lint 0/0.
- `initPhoneScreens()` is part of the other session's uncommitted JS, so only the images + `index.html` were committed. **JS is 17,906 bytes (budget 15,000), CSS 31,846 (budget 30,000)** with that uncommitted work.

### Update 2026-11-12: plainer KH Halal lead
- Card lead "A bilingual marketplace…" → "A marketplace for halal products in Cambodia, in Khmer and English." (owner asked what "bilingual" meant).
- Work heading "Apps I designed and shipped" → "Apps I designed and built" (owner's choice).
- **Card tilt removed** (owner: "remove it"). `initTilt()` → `initSpotlight()` in `js/main.js`: same resting-box hit test, sets `.is-hover` + `--x/--y` only, no transform. CSS `.is-tilting` → `.is-hover`; the 120ms tilt transition is gone. Hover = lift 4px + orange border + spotlight + screenshot zoom 1.03. DESIGN.md §8.3/§11 + README updated. NOT committed: `css/style.css` + `js/main.js` still hold another session's uncommitted work. Not browser-tested yet.
- **Hover top border fixed:** `content-visibility: auto` on `.projects__grid` clips paint at the grid edge, so the lifted card (-4px) lost its top border + top corners. Removed from `.projects__grid` (kept on `.about__grid`). Checked in headless Edge at 1707px: hovered idevo card now has an orange top border (pixel row read), only the hovered card gets `.is-hover`. Not committed (same reason).

### Update 2026-11-12: full-project bug audit
- **Hero not centred (≥1024px), fixed.** The grid had `1fr repeat(3, auto) 1fr` but 4 text items (name, intro, buttons, place line), so auto-placement put the name INSIDE the top `1fr` row. Space above the text was 82px vs 191px below at 1440 (0 vs 172 at 1024). Now `repeat(4, auto)` + `.hero__inner::before { grid-area: 1 / 1 }` (empty spacer fills row 1, so all text flows from row 2 in HTML order). Do not pin the h1 with `grid-row: 2`: the intro then auto-places into row 1, above the name. Measured: equal space above/below at 1024/1366/1440/1920; phones/tablets unchanged.
- **Holding `T` strobed the theme** (key repeat flips dark/light ~30×/s, a flashing risk). `initShortcuts` now ignores `e.repeat`.
- **Print rule removed**: `a[href^="mailto"]::after` collided with the contact email's underline `::after` (absolute, scaleX(0): invisible) and every printed http link is hidden anyway, so the rule did nothing useful.
- Cleanup: duplicate `.section` padding in the 1024px block, redundant `min-height` on `.btn--sm`, `.stats__*` rules grouped, `root` reused in `initTilt`. README section table (02 · ABOUT, 03 · CONTACT), icons line and photo line updated.
- Checked and NOT bugs: nav anchors land at header + 16px; Contact stops higher only because it is the end of the page (scrollY = max). 
- Checks: lint 0/0; CDP at 390/768/1024/1366/1440/1920: hero order + centring, no horizontal scroll, no console errors on index. CSS 31,134, JS 17,761 bytes.
- Not committed: `css/style.css` and `js/main.js` still hold the other session's uncommitted phone-swap / hero-glow work.

### Update 2026-11-12: `>_` mark in the header + new favicon
- Owner did not want "HR" initials (tried an orange HR square first). Chose the terminal prompt from 6 drafts: `<span class="wordmark__mark" aria-hidden="true">&gt;_</span>` before the name in `index.html` + `404.html`; CSS `.wordmark__mark` (Geist Mono 500, `--accent-text`, so it is dark orange in light mode). No blinking cursor (continuous motion, WCAG 2.2.2).
- `favicon.svg`: dark `#0C0A09` rounded square, orange `>` chevron + `_` bar drawn as paths (no font). `favicon-32.png` + `apple-touch-icon.png` (square, iOS rounds it) drawn with Pillow from the same 32-unit geometry. DESIGN.md §5 + favicon line, README, `tools/icon.html` note updated.
- Checked: header screenshots dark + light, PNGs viewed. Not committed (other session's uncommitted work is in `css/style.css`).

### Update 2026-11-12: audit fixes 1–7 (owner: "do all of these")
1. Cache: `/assets/*` 1-year `immutable` split into `/assets/fonts/*` (1 year, immutable) and `/assets/images/*` (`max-age=86400`), in `vercel.json` and `_headers` (Netlify merges same-name headers from overlapping rules, so the rules must not overlap). Reason: photos/screenshots are replaced under the same name. DESIGN.md §12 line updated.
2. `tools/check.mjs` added (see "How to re-run the checks"). Proven: on a copy with the old `repeat(3, auto)` hero it FAILs (191px at 1440) and it FAILs on a missing image.
3. `<noscript>` Noto Sans Khmer link removed from `index.html` + `404.html` (render-blocking Google request for no-JS visitors, page has no Khmer). `initKhmerFont()` still loads it when Khmer text appears.
4. Card lift, orange border and screenshot zoom moved into `@media (hover: hover) and (pointer: fine)` (taps on phones left cards stuck "hovered"). Reduced-motion overrides come later and still win.
5. `setTheme()` updates both `meta[name=theme-color]` so the phone browser bar follows the toggle (checked: #0C0A09 → #FAFAF9).
6. Dead CSS removed: `.contact__text a` from the 4 link-underline selectors, `.project-card__note + .project-card__note`.
7. Original photo moved to `tools/source/` (git-ignored); `tools/photo-cutout.py` Run line updated.
Checks: `node tools/check.mjs` all PASS; lint 0/0; mouse lift `matrix(…, -4)`. CSS 31,133, JS 17,717 bytes. Not committed (other session's uncommitted work in the same files, plus its favicon changes).

### Update 2026-11-12: review fixes (session ee)
- Owner approved the 33 KB CSS / 18 KB JS budgets (DESIGN.md §12), keeping phone swap, drift and hero glow.
- DESIGN.md §11 phone row: "1.2s per screen" → "2s per step" (matches `setInterval(…, 2000)` in `initPhoneScreens`). Old log line 265 left as history.
- `css/style.css`: the two `.stats__item` rules merged into one.
- Print: no change. `.contact__social` is hidden in print, so the removed link-URL rule only printed the email twice.
- Browser test (headless Edge, CDP, fresh tab per load) at ~19:05, before the newest JS edits: 360–1920 no horizontal scroll, one h1, images + alt, ≥44px targets, no TODO, no console errors (http + file://); phone swap A→B→A then stops; scroll at 4× CPU median 16.7ms, p95 16.8ms; reduced motion: no clones, all visible. Reveal "failures" only when headless reports `visibilityState=hidden` (tab never scrolled): tool quirk.
- **JS is 22,947 bytes at 19:10 (budget 18,000)** after another session's edits. Re-test and trim before committing. Nothing committed by this session.

### Update 2026-11-12: terminal, hero dots, 3D phones, screenshot settle (owner: "do all of these")
- **Terminal**: `>_` in the header is now a 44px `.term-btn` (no-JS fallback: `.wordmark__mark--nojs` span in the name link); `` ` `` also opens it. `<dialog class="term">` at the end of `index.html`, `initTerminal()` in `js/main.js`. Commands help/whoami/projects(ls)/open &lt;app&gt;/work/about/contact/email/github/theme/clear/exit, ↑↓ history, Tab completes a sure match only. All answers read from the DOM. Jumps use the offsetTop chain (ignores the 24px reveal slide) one frame after close, then focus the target (`[tabindex="-1"]:focus` has no outline).
- **Hero dots**: `initHeroDots()` canvas (`.hero__dots`, `.hero.has-dots::before` off) on fine pointer + motion allowed only; redraws on theme change (MutationObserver), size (ResizeObserver), stops when idle or off screen.
- **3D phones**: `rotate: y 16deg → -16deg` added to the `drift` keyframes, `perspective: 1200px` on the phone media.
- **Screenshot settle**: `settle` keyframes (`scale: 1.15` → 1) on the web screenshot, `entry 0%–100%` of `--card`. Reduced motion: `animation: none` (the global duration rule can't stop scroll-linked animations).
- Tests (headless Edge over CDP, scripts in the session scratchpad): terminal 48/48 at 1440 + 360 (open by click/`` ` ``, focus, every command, `t` typed doesn't toggle theme, history, Tab, Esc, copy, jump lands at header+16, no sideways scroll, no console errors); dots (idle = 0 frames, stops after leave, light-theme colours, touch + reduced motion keep the grid); phones +6.4° / 0° / −6.4° at 85/50/15% of the screen; zoom 1.147 → 1.075 → 1; check.mjs all pass; lint 0/0. 4× CPU: dots add ~0.3ms per frame. Scroll frame drops at 4× were the same with and without the new CSS (machine noise while another session ran).
- **Headless quirk**: after `Emulation.setDeviceMetricsOverride` the tab sometimes reports `visibilityState: hidden` and runs no frames, so smooth scrolls/rAF stall in tests. Keep a rAF loop running in the test or check `visibilityState` before calling it a bug.
- Sizes: CSS 33.9 KB, JS 26.3 KB raw (9.1 / 8.8 KB gzip). DESIGN.md §12 budget raised to 35 / 27 KB.
- Not committed: `css/style.css`, `js/main.js`, `index.html` also hold another session's uncommitted work.

### Update 2026-11-12: motion trimmed (owner: "do all of these")
Review said the page was close to too busy (~13 moving things). Cut:
- **Hero glow follow removed**: `initHeroGlow()` + the `.hero::after` translate/transition. The glow stays, still. The dots are the one mouse effect in the hero.
- **Phone drift removed**: keyframes renamed `drift` → `turn`, only `rotate: y 16deg → -16deg`. The middle phone keeps its static `translateY(-4%)`.
- **Scroll progress bar removed**: the `<div class="scroll-progress">`, its CSS, the JS fallback in `initScroll()` (now header only), the reduced-motion and print selectors. DESIGN.md §9.2/§11.2 + README updated.
- Tests: glow `translate: none` after mouse moves, no `--gx`; phones `animation: turn`, `translate: none`, rotate present, middle offset kept; no `.scroll-progress`; header `is-scrolled` still toggles; 4× CPU scroll 0 of 299 frames over 20ms; reduced motion still; no console errors; check.mjs all pass; lint 0/0; earlier terminal/dots/phones/zoom tests pass in a visible tab. CSS 33,104 / JS 25,065 bytes.

### Update 2026-11-12: hero gap + one-line intro (owner: "do all of these")
- Photo (≥1024px): `place-self: center` in column 2 (was start + up to 10vw nudge right, from commit 6a9ec0a; this partly undoes that, after the owner said "do all of these" to the closer-photo idea), width `clamp(280px, min(32vw, min(100svh − 296px, 676px) × 0.8), 540px)` = as big as fits the hero height. `.hero { overflow-x: clip }` because the bigger photo's `::before` light (10% wider) poked 1px past the window at 1024–1100.
- `.hero__intro` max-width 36rem → 50rem: one line from 1366 up, 3 lines on phones (unchanged feel), 1 line at 768.
- Measured (gap text→photo / photo width): 1869×916 251→189 / 458→496; 1920 256→167 / 480→540; 1440 124→73 / 432→461. 1366×768 hero was 8px taller than the screen, now fits (696). No sideways scroll 360–2560, check.mjs all pass, lint 0/0, no console errors. CSS 33,420 bytes.
- Owner's item 2 (a relaxed photo instead of the suit/ID look) waits for a new photo: run `tools/photo-cutout.py`.

### Update 2026-11-12: glow behind the name removed (owner: "do all of these")
- `.hero::after` (7% orange radial behind the name) deleted: on real screens it read as a muddy brown haze. The only glow left is `.hero__photo::before` (16%, behind the head). DESIGN.md §9.7 updated.
- Checks: `::after` content none and photo light present at 1869 + 390; no sideways scroll; no console errors; dots tests pass; check.mjs all pass; lint 0/0; screenshots dark + light 1869, dark 390. CSS 33,089 bytes.

### Update 2026-11-12: demo videos for all 3 projects (VIDEOS.md)
Owner approved the plan, the shot lists and an 8 s style test ("do all of these", "that look great").
- **Files:** `assets/videos/kh-halal-marketplace.mp4` (1920×1080, 24.9 s, 3.95 MB), `idevo.mp4` (720×1560, 26.2 s, 1.94 MB), `rieltrack.mp4` (720×1560, 24.0 s, 1.81 MB), each with `<slug>-poster.webp`. H.264, no audio, `+faststart`. Wired into the three "Watch video" buttons (`data-video` / `data-poster` in `index.html`).
- **Real footage only.** Android: the `Pixel_API37` emulator (owner's phone never touched; it showed `unauthorized`), RielTrack 1.6 + idevo 0.6.4 from the public download repos (SHA-256 checked; the old emulator copies 1.4-debug / 0.5.0 had no data). RielTrack sample data typed in (salary $850, PassApp $3.50, internet $24.99, shopping ៛45,000, $500 limit); the video adds ៛12,000 Food live. idevo uses the app's own "Learn how to learn" sample path. KH Halal: live site as a guest (cart is localStorage; the only POST is `cart/validate`), stops at the cart, never checkout.
- **Motion graphics** (`scripts/motion/compose.html` scene + `render.js`): dark `#0C0A09` stage, orange glow, 64px grid, phone or browser frame sliding in, gentle sway, zoom on the key moment, tap ripples and a cursor drawn from the logged taps/mouse path, Geist captions (real features only), end card with the card's tech tags, `>_ Hong Rinrasmey`. Rendered frame by frame (smooth 30 fps), then ffmpeg. Per-project config: `scripts/motion/<slug>.json` (clip times, speed, captions, zoom).
- **Recording scripts:** `scripts/record-rieltrack.sh`, `scripts/record-idevo.sh` (wipes idevo data: refuses anything but an emulator), `scripts/record-kh-halal-marketplace.js`, helpers `scripts/lib-adb.sh` (taps by label from a UI dump, never guessed coordinates; demo mode on/off). README "Demo videos" says how to re-make them.
- Raw takes in `assets/videos/<slug>-raw/` are git-ignored.
- Cleanup: demo mode off (`sysui_demo_allowed 0`), temp files deleted, emulator closed. Android's "No screen lock" notification was snoozed 2 h on the emulator (comes back by itself).
- Checked in headless Edge (file://, 1440 and 390): all 3 buttons show, videos load + play, phone-size pop-up for the Android cards (418px), Esc closes, focus returns, no horizontal scroll, no console errors.
- Committed with a separate index: only these lines/files. The other session's uncommitted work (CSS/JS, icons, terminal, `btn--sm`, etc.) is still uncommitted.
- Owner feedback: the browser frame looked like a Mac (traffic-light dots) and the caption was tight under it. Now a neutral bar (centred address pill, lock icon, Geist not mono), browser 1312×820, even gaps (56 top, 28 to the caption). KH video 3.69 MB.

### Update 2026-11-12: demo videos v3 (owner: "do all of these", "more cool and smooth")
After an honest review (RielTrack 8, idevo 7, KH Halal 6 out of 10), everything on that list was done:
- **Engine** (`scripts/motion/compose.html`): camera keyframes `[srcTime, zoom, x, y, move]` with eased zoom + pan (replaces `zooms`), letter-by-letter title and end name, accent rule that draws, captions blur in with an optional role tag, cursor 1.5× with a click squeeze, slowly moving grid, hard cuts (the crossfade made ghost frames), ripples follow recording time so they stop at a cut. Segments take an optional speed (third number).
- **RielTrack** (26.5 s, 2.11 MB): new take; no pointless Food tap; 1.6× zoom on the riel amount; Khmer ending (Settings → ខ្មែរ → Home in Khmer); script deletes an earlier take's lunch and switches back to English (label "អង់គ្លេស").
- **idevo** (26.6 s, 1.89 MB): new take; shorter lesson; 1.2× zooms (idevo text runs edge to edge, more would cut words); "Continue learning" Home; Khmer ending; `pm clear` at the end resets data + language.
- **KH Halal** (38.6 s, 3.87 MB at CRF 26): guest (browse, price, cart, Khmer, mosques) + customer (signed in off camera → Wishlist) + seller (signed in off camera → Dashboard, Products, Add product form, not saved). Browser 1280×800 (bigger text), 7 zooms. Logins only from env vars `KH_CUSTOMER_*` / `KH_SELLER_*`, never in a file (grep checked). Screencast sends frames only on change, so each part repeats its last frame at the real end.
- **Not filmed on purpose:** checkout/payment, Messages (opening it marks chats read: it happened once in the read-only check), Notifications, seller Orders (other buyers' names), Payouts (Bakong ID), verification, profile (email).
- Checks: headless Edge 1440 + 390, all 3 play, phone pop-up 418px, Esc + focus, no errors, no horizontal scroll. Emulator: demo mode off, temp files gone, closed. RielTrack keeps the sample data (+ the take's lunch, deleted by the next run).
- Owner should change both KH Halal passwords (weak, and written in chat).

### Update 2026-11-12: video follow-ups 1-6 (owner: "do all of these")
- **Richer sample data.** RielTrack: `scripts/seed-rieltrack.sh` adds 9 past-dated entries through the app's own form + date picker (Oct: salary, food, transport, internet, shopping; early Nov: 4 small ones), so History has several days and Reports says "32% more than last month". idevo: `scripts/seed-idevo.sh` moves the emulator clock back (`cmd time_detector set_auto_detection_enabled false` + `cmd alarm set-time`; a `trap` always turns automatic time back on) and studies the sample path on days -6/-5/-3/-1; `record-idevo.sh` runs it first. Video shows "2-day streak, studied on 5 of the last 7 days" and a full Progress chart.
- **Bugs found and fixed while doing it:** RielTrack amounts use a non-breaking space before ៛, so the lunch clean-up never matched (two lunches in a take; re-recorded); it now matches "−12,000" and checks the edit screen before deleting. Android's "No screen lock" notification (shield icon) came back after an emulator reboot: `demo_on` in `scripts/lib-adb.sh` now snoozes it every time.
- **KH Halal seller part** types a demo product name ("Halal Beef Jerky 200g", like the form's own placeholder) into the add-product form, presses no button; the script lists every non-GET request per part: seller part = login only.
- **Final videos:** KH Halal 39.3 s / 3.79 MB, idevo 27.3 s / 2.15 MB, RielTrack 26.9 s / 2.17 MB. idevo zooms 1.12× (its headings start at the screen edge; 1.2× clipped them).
- **Posters** now show a key moment: KH price in riel + dollars, idevo Progress, RielTrack the "12000 ៛" zoom (`poster` time in each `scripts/motion/<slug>.json`).
- **Video descriptions** (`index.html`): a `visually-hidden` paragraph per video, linked with `aria-describedby` on its "Watch video" button. Update it when a video changes.
- **Pop-up (css):** frame background `#0C0A09` (the videos' own) and phone ratio 720/1560; the phone pop-up width also follows the screen height, so no bars and no white strip. Checked 1440×900, 1366×768, 1920×1080, 390×844, 844×390: ratio exact, all fit.
- **GIFs** (8 s, 300 px, 12 fps, under 3 MB) added to the PUBLIC `RielTrack-Downloads` (a9d1c1f) and `Idevo-Downloads` (02491a5) READMEs, committed with the GitHub no-reply email.
- Emulator: clock automatic, demo mode off, closed. Nothing pushed from this repo.

### Update 2026-11-12: published on GitHub Pages (owner: "now push", chose this session to do it)
- **Live:** https://hongrinrasmey.github.io/portfolio/ (public repo `hongrinrasmey/portfolio`, Pages from `main` /, `.nojekyll`).
- **History rewritten before the first push:** 60 of 66 commits had the private Gmail as author/committer; `git filter-branch --env-filter` changed them to `248713826+hongrinrasmey@users.noreply.github.com` (files identical: same tree). `refs/original` deleted. Backup of the old history: a git bundle in that session's scratchpad (not in the repo). Checked first: the Gmail and the KH Halal passwords were never in any file or commit message.
- This repo's `git config --local user.email` is the no-reply address; the GLOBAL one is still the Gmail, so commits in other repos on this PC would show it.
- Live test (headless Edge, 1440 + 390): all 3 videos play, posters, phone pop-up, Esc + focus, no broken images, fonts load, no 4xx responses, no console errors, 404 page works, og-image 200. The résumé link is only an HTML comment until `assets/resume.pdf` exists.
- Commit IDs changed: anything that noted old IDs (e.g. "commit 3c87440") refers to the pre-rewrite history.

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
- Page check (saved, no packages): `node tools/check.mjs`: console errors, sideways scroll, one h1, `#` link targets, image files, hero order + centring at 360–1920. Exit 1 on FAIL. Run it after every CSS/HTML change.
- Lint: `node <taste-skill>/scripts/lint.mjs index.html 404.html css js`.
- Lighthouse: test through a server that gzips (`npx -y serve@14.2.4 -l 8138 .`); http-server sends files uncompressed and makes mobile LCP look ~0.6s slower than on Vercel/Netlify.
- Inspector (PowerShell): `node <taste-skill>/scripts/inspect.mjs index.html --allow few-pictures,eyebrow,mono,micro-label,hairline,outlined-box,small-text`.
- Lighthouse: serve the folder with any static server, then (PowerShell) `$env:CHROME_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"; npx -y lighthouse@12.8.2 http://localhost:PORT/ --chrome-flags="--headless=new"`.

### Next step
Owner: give name, role, intro, bio, city, remote yes/no, email, LinkedIn; KH Halal live URL; a public idevo download; RielTrack screenshots. **Next agent:** put them into `index.html` (+ `<head>`, JSON-LD, `404.html`, `site.webmanifest`, `tools/og-image.html`, then re-make `og-image.png` and the favicon PNGs), re-run the checks, update this log, commit.

### Update 2026-11-12: folder cleanup (owner: "remove the folders that are not needed")
- Removed from git: `assets/icons/` (16 simpleicons SVGs, unused since the tool list left About) and `assets/images/.gitkeep`. README + DESIGN.md file trees updated.
- `.taste-skill/`: old inspector screenshot folders deleted (incl. ones from the Astro version); `critique.md` + `direction.json` kept.
- `_old-astro-version/`: deleted (owner said "delete it"); its `.gitignore` line removed.
- Kept on purpose: `tools/` (og-image, icon PNGs, photo cut-out, check.mjs) and `tools/source/` (original photo, needed by `tools/photo-cutout.py`).

### Update 2026-11-12: project card redesign (review 7/10, owner: "do all of these")
1. Featured card: problem paragraph moved into an HTML comment (kept bullets); its AI sentence joined the lead. Lead and bullets are `--muted`, weight 400: only the title is bright.
2. Phones bigger and fanned: media padding `4% 6%` (was `6% 4%`), no gap, `.phone + .phone { margin-left: -3% }`, sides `rotate(±4deg) translateY(3%)`, middle `z-index: 1`. Measured 1440: phones ~367px tall, 10–40px from the panel edges, nothing clipped.
3. Phone swap: `--dur-fast` (150ms) instead of `--dur-slow` (the slow crossfade showed two layouts on top of each other). No JS change.
4. `.project-card__note` no longer uppercased ("v0.6.4", "Android 8.0+ · v1.6").
5. Dark `--surface` #141210 → #171513; card border `color-mix(in srgb, var(--text) 16%, var(--surface))` (works in both themes; hover border still wins).
6. Card buttons (demo, download, video) use `btn--sm` (still 44px tall).
- Checks: `node tools/check.mjs` all PASS; lint 0/0; CDP screenshots 1440 dark + light, 390: no sideways scroll, no console errors. CSS 33,312 / 35,000 bytes. DESIGN.md §8.3, §11 phone row, `--surface` updated.
- Headless test notes: `html { scroll-behavior: smooth }` makes `scrollIntoView` do nothing in a hidden headless tab (set `scrollBehavior='auto'` first); `Page.captureScreenshot` `clip` uses page, not viewport, coordinates; headless fires a synthetic mousemove, so cards can show `.is-hover` with no mouse.
- Not committed (other sessions' uncommitted work is in the same files).

### Update 2026-11-12: phone layout calmer (owner: "do all of these")
- Fan tilt removed: the ±4° flat tilt stacked with the 16° scroll turn and made the side phones look like they were falling. Sides keep `translateY(3%)`, middle `translateY(-4%)` + on top. Scroll turn unchanged.
- Media padding `4% 6%` → `6%`; overlap `-3%` → `-2%`. DESIGN.md §8.3 updated.
- Measured (gap top/bottom of the middle phone): 1660: 30/61px, 1440: 26/52, 390: 13/27; left/right gaps equal. check.mjs all PASS, no console errors, no sideways scroll.

### Update 2026-11-12: Contact panel redesign (review 6.5/10, owner: "do all of these")
1. ≥1024px padding `96/64` → `64` all round; `.contact__details { justify-self: end }` puts the right block against the panel's right edge (columns stay `1fr 1fr`: `1fr auto` let a long button row squeeze the text column). Panel 309px tall at 1440 (was ~370).
2. The icon row (`ul.contact__social`) is gone: GitHub / LinkedIn / Telegram are `btn btn--secondary social-link` buttons (icon + name + ↗) at the end of `.contact__actions`; `href="#"` still hides them (`link-opt`). Keep `social-link`: the terminal `github` command finds the link by it.
3. Email: own steady underline `1px var(--accent-text)`, 2px on hover. Removed from the shared grow-bar rule (its `::after` sat ~10px under the text in the 44px box).
4. Heading "Let's work together." → **"Let's talk."** (owner wants full-time roles; agent picked the first offered option because the owner did not choose).
5. Panel border = project card border; `radial-gradient` 8% orange light top-right (taste-skill-ignore). Under 640px `border-inline: 0` (panel is edge to edge).
- Checks: check.mjs all PASS; lint 0/0; CDP at 1700/1440/1024/390 + light: no sideways scroll, no console errors, buttons ≥45px, terminal GitHub link found. CSS 33,630 / 35,000. DESIGN.md §8.6 updated.
- Line endings: all working files are LF (git stores LF, `core.autocrlf=true`). Don't "restore CRLF".

### Update 2026-11-12: phones never overlap (owner chose option A)
- Owner: the middle phone hid the side screens ("Details", "Manage", "Budgets" cut). `.phone + .phone { margin-left: -2% }` removed; `.project-card__media--phones` has `gap: clamp(8px, 2.5%, 16px)`. Same phone size. DESIGN.md §8.3 updated.
- Measured gaps between phones (incl. scroll turn): 1700: 16px, 1024: 10px, 390 and 360: 8px. check.mjs all PASS, no sideways scroll, no console errors.
- Contact panel glow removed (owner): background is plain `var(--surface)`; border kept. Do not add it back.

### Update 2026-11-12: About layout (review 5.5/10, owner: "do all of these")
1. "I build my apps with AI coding tools." moved into `.section__head` under the h2 (`.tech__note` got `margin-top: var(--s-4)`). The empty left column is gone; `.about__grid` now holds Education + Spoken languages (`.about__side` each, stagger kept).
2. Tops line up: both labels at the same y (measured 1770: 393/393, 1024: 380/380). `.about__side` lost its inner grid (it put 60px between label and content).
3. Timeline line + orange dot removed (`.timeline` is just `display: grid; gap`). Markup unchanged (`ol.timeline > li.timeline__item`), so more schools can be added.
4. Bio: NOT written (never invent). Commented-out `<p class="tech__note">[TODO: …]</p>` slot under the AI line in `index.html`.
- Checks: check.mjs all PASS; lint 0/0; CDP 1770/1024/800/390 + light: no sideways scroll, no console errors. CSS 33,183 bytes. DESIGN.md §8.4 updated.

### Update 2026-11-12: Android phones (owner chose A + B)
Owner: the phones did not look like Android.
- **B: idevo screenshots re-shot** (replace the old golden test images). App on `Pixel_API37` (1080×2400) = installed release 0.6.4, SHA-256 checked equal to the public `idevo-0.6.4-x86_64.apk` (`a2c3bb0d…018e`). Demo mode status bar 9:41, mobile icon hidden (`network -e mobile hide`), demo mode exited after. App's own sample path "Learn how to learn"; 3 sample notes typed by hand (Reading list / Dart isolates / How widgets rebuild, titles from the old golden image). One flashcard answer shown, NOT graded. Same file names: `idevo-home/lesson/review` + `-library/-path/-progress.webp`, now **405×900** like RielTrack (15–30 KB). `index.html` width/height 390×844 → 405×900; library alt no longer says "pinned note"; source comment added. Note: home says "Good evening" and notes say "Today 20:24/20:25" (the emulator's real clock; status bar is demo 9:41).
- **A: Android frame** (`.phone` in `css/style.css`): `--r: clamp(10px, 1.6vw, 20px)` corners, bezel `#0C0A09` in both themes (was `var(--bg)`, white in light mode), `.phone::before` punch-hole dot (4% of phone width, `top: calc(3px + 2.6%)`, z-index 2 above the swap images). Checked by zoom: dot sits centred in the status bar between clock and icons on both apps.
- Checks: check.mjs all PASS; lint 0/0; CDP 1700, 1440 light, 390: no sideways scroll, no console errors. CSS 33,539 / 35,000. DESIGN.md §8.3 + radius line updated.

### Note 2026-11-12: KH Halal demo logins NOT created (correction)
- The fifth-pass note "Bakong points at the SIT test API" is out of date. The repo's `render.yaml` now says checkout is LIVE with real-money orders, `BAKONG_API_BASE_URL=https://api-bakong.nbc.gov.kh` (production).
- Owner asked for public customer + seller demo logins. Not done: on a real-money marketplace a public seller login lets anyone post listings and set a payout account (scam risk); a customer login allows fake reviews, chat spam, stock-holding orders and password changes. Seller approval also needs admin access the agent does not have.
- Options given to the owner: A demo videos (recommended; "Watch video" buttons already built), B "logins on request" line, C a separate demo deployment (own DB, checkout off, daily reset; repo has `backend/scripts/seed-db-scenarios.js`). Waiting for the owner's choice. The `project-card__login` row stays `hidden`.

### Update 2026-11-12: Contact heading
- "Let's talk." → **"Get in touch."** (owner chose it from 4 options). `index.html` `#contact-title`, DESIGN.md §8.6. Not committed (other sessions' uncommitted work in `index.html`).

### Update 2026-11-12: terminal UI
- Head: orange `>_` mark + "Terminal" (Geist), `esc` key hint (hidden on touch), line under the head, shadow. Welcome is 2 lines ("Hi, I'm …" + hint).
- Quick command chips under the log (`.term__chips`, `data-cmd` = help/whoami/projects/contact; click runs the command, focus back to the input). 44px tall.
- `help` prints two columns (command orange, text muted, `.term__row`); each typed command gets a gap above it (`.term__echo`).
- Input bar on `--bg`, orange 2px left bar when focused (was an orange top line).
- Checked: check.mjs all PASS; screenshots 1280 + 390 with help/whoami run, no console errors. CSS 34,8xx / 35,000 (nearly full), JS 25,6xx / 27,000. Not committed (other sessions' work in the same files).

### Update 2026-11-12: visual review fixes (owner: "do all of these")
Honest review listed: thin About, ID-style photo, big gap under the hero, Contact edges off, generic look, tiny text, small phones. Layout fixes done; content items wait for the owner.
- **Hero gap:** hero `min-height` = `100svh − header − 64px` (max 836px), bottom padding 64px from 768px, `.hero + .section { padding-top: 64px }`. Photo width calc 296 → 328 (same size at 1440). Last hero line → Work: ~415px → ~340px at 1440×900.
- **Contact panel edges = card edges** at every width ≥640 (`max-width: var(--container)`, `width: calc(100% − 2 × gutter)`, inner padding `--card-pad`; under 640px edge to edge with `--gutter` padding). Measured 48/1382 at 1440 for both.
- **Phones ~25% bigger:** `.project-card__media--phones` `aspect-ratio: 4/3`, padding `6% 4%` (1440: 152×334 → 190×418; 390: 78×168 → 97×210). Fits at 360–1920, no overlap.
- **Labels/tags 12 → 13px** (`--fs-label`).
- **About:** new `.about__layout` on the container (`index.html`): ≥1024px heading + note left, Education + languages stacked right; head is `display: grid` so "02 / ABOUT" and "EDUCATION" tops match (measured equal at 1440 + 1024).
- **Removed `content-visibility: auto` from `.about__grid`**: it left the block unpainted until scrolled near (blank area in full-page captures) and saved nothing on 3 lines of text.
- **Phone swap guard:** waits on `naturalWidth` instead of `complete` (a broken image is "complete" and would show an empty black screen). Swap still A→B→A then stops (tested).
- Terminal CSS: 3 lint FAILs (dialog shadow, mono) from the other session marked `taste-skill-ignore` (a terminal is literal code, a dialog is an overlay).
- Checks: `node tools/check.mjs` all PASS; lint 0/0; CDP 360/390/768/1024/1440/1920 no sideways scroll, no console errors; light mode screenshot OK; reduced motion: no clones, all visible; Lighthouse mobile (gzip) 99/100/100/100, LCP 2.0s, CLS 0, TBT 100ms. CSS 34,892 / 35,000, JS 25,582 / 27,000.
- **Waiting on the owner (never invent):** a relaxed photo (daylight / working, not the suit), 2–3 sentence bio + "currently learning", 2–3 lines per project on what they did/learned, résumé PDF, LinkedIn.
- Not committed: same files hold other sessions' uncommitted work.

### Update 2026-11-12: second visual round (owner: "do all of these")
- **About intro** (`index.html` `.tech__note`): "I design and ship web and Android apps: a halal marketplace, a learning app and a money tracker. I build them with AI coding tools." (what they made first, AI second; facts from the Work cards only). Bio slot still commented out.
- **Terminal hint:** `<span class="term-hint"><button class="term-hint__btn">Try the >_ terminal</button></span>` inside `.hero__meta` (not a new hero item: a 5th row would break the `repeat(4, auto)` centring). JS only, own line (`display: block`; inline wrapped and left a stray "·" on phones), 44px tall, hidden in print. `initTerminal` binds `.term-btn, .term-hint__btn`; `whoami` reads `.hero__meta.firstChild` so it prints only the location line.
- **Work band:** `.section--band` on `#work` (`--text` 3% over `--bg`, 1px border top/bottom). Works in both themes (checked).
- CSS budget kept: comments shortened, 34,931 / 35,000. JS 25,7xx / 27,000.
- Tests (CDP, 1440 + 390): hint shows, opens terminal, focus goes into the input, `whoami` = name / intro / "Phnom Penh, Cambodia · Open to remote work", focus returns to the hint after close; no console errors. check.mjs all PASS (hero still centred, 0px), lint 0/0. Screenshots dark + light 1440, dark 390.
- **Dark phone screenshots NOT done:** both apps support dark mode (RielTrack `isAppInDarkTheme(ThemeMode.SYSTEM)` + dynamic colour: turn dynamic colour off or the wallpaper tints it; idevo `darkTheme` + `themeMode`). Not shot because another session (`my-portfolio-website-7b`) was busy re-making the demo videos with the same `Pixel_API37` emulator (RielTrack open on it, videos written 21:08–21:24). Do it when the emulator is free: `cmd uimode night yes`, same screens + data as the light set, same file names, then `cmd uimode night no`.
- Not committed (other sessions' work in the same files).
- **Later (owner): "Try the >_ terminal" hero hint removed** (HTML, CSS, print selector, JS binding; `whoami` reads `.hero__meta` again). The `>_` header button and the `` ` `` key still open the terminal. Do not add it back.

### Update 2026-11-12: slots for the review's content items (owner: "add all, I will put it later")
- Review rated the site 7.5/10; the gaps were content. Added a commented-out `WHAT I DID / LEARNED` `<p class="project-card__text">[TODO…]</p>` under the lead of all 3 project cards in `index.html` (existing style, no CSS change). Already there: résumé buttons (header + Contact, `href="#"` hides them), LinkedIn button, bio + "learning now" slot in About. Photo: swap `assets/images/me.webp` via `tools/photo-cutout.py`. Nothing shows on the page until the owner fills a slot. check.mjs all PASS. Not committed.

### Update 2026-11-12: review follow-up, items 1-8 (owner: "do all of these, one by one")
- **1 Checkpoint commit** 9695302 (all uncommitted work of earlier sessions). Repo `user.email` is now `248713826+hongrinrasmey@users.noreply.github.com` (owner chose to hide the private address before going public).
- **8 Fewer effects:** hero dots canvas (`initHeroDots`, `.hero__dots`) and 3D phone turn removed. Screenshot `settle` zoom kept. DESIGN.md/README updated.
- **5 Text:** `--fs-label` 13 → 14px (mono tags + labels). Card text was already 18px at 1440, muted contrast 7.2:1 (dark).
- **7 Tests** (headless Edge, CDP): light + dark at 1440/390/360: images load, reveals visible, no sideways scroll, no console errors; terminal help/whoami/projects/email/contact pass (use `form.requestSubmit()` in tests: a fake Enter keydown does not submit); KH Halal + RielTrack videos play; scroll at 4× CPU median 16.7ms. Fast headless scrolls can leave reveals at opacity 0 (frames skipped): a test quirk, passes 6/6 at normal speed.
- **2 Deploy prep** (9c10e40): address `https://hongrinrasmey.github.io/portfolio/` in canonical, og:url, og/twitter image, JSON-LD url; `404.html` paths `/portfolio/…`; `.nojekyll`; README deploy steps.
- **3 KH Halal logins:** no change (row stays hidden; videos instead).
- **Blocked:** creating public repos (`hongrinrasmey/portfolio`, profile README `hongrinrasmey/hongrinrasmey`, README ready in the session scratchpad) was denied by the permission system: owner must allow or run it. Commit-email rewrite (filter-branch, 60+ commits) and dark phone screenshots (**6**) wait for session `my-portfolio-website-7b`, which was re-rendering idevo/RielTrack videos and holds the emulator. Its uncommitted files were left alone.

### Update 2026-11-12: dark phone screenshots + video pop-up fix (session 11)
- **Video pop-up bug fixed** (`initVideo`, `js/main.js`): the dialog's `close` event can arrive after the next video has opened; its `frame.replaceChildren()` then removed the new video (froze after ~0.5s). Now `if (modal.open) return;` first. Repeated open/close test: 5 of 9 froze before, 9 of 9 play after.
- **Dark phone screenshots** (all 12, same names, 405×900 WebP, 14–29 KB): emulator `cmd uimode night yes` + `demo_on`. idevo re-seeded with `scripts/seed-idevo.sh` (pm clear!) + the 3 sample notes typed again (Reading list / Dart isolates / How widgets rebuild, only the text the old shot showed). Answer shown, flashcard NOT graded; RielTrack form closed without saving. Emulator reset after (demo off, night no) and closed.
- The emulator crashed once mid-session and lost idevo data written just before (re-seed fixed it). Night mode resets on reboot.
- Live test on https://hongrinrasmey.github.io/portfolio/ (headless Edge): light + dark 1440/390, images, reveals, terminal, 3 videos play, scroll 4× CPU median 16.7ms, no console errors: all pass. 404 loads `/portfolio/css/style.css`.
- Still open: GitHub profile README repo (`hongrinrasmey/hongrinrasmey`) not created (permission denied for this session); pinning repos is manual on github.com.

### Update 2026-11-12: KH Halal demo logins: videos only (owner chose A)
- No public demo login (real-money checkout). The hidden `project-card__login` row, its CSS and the "Demo login" edit notes (index.html comment, README) were removed. The copy-button JS stays (Contact email uses it). DESIGN.md §5 project entry says "none". Do not add demo logins back.
- check.mjs all PASS.

### Update 2026-11-13: KH Halal video re-cut (owner: "not good", no Mosques, fewer zooms)
- QA review of the old cut: zoom on almost every screen (7 keyframes, some cut text mid-sentence, e.g. cart summary), Mosques part not wanted, ~2s logged-in home that looked the same as the guest home, a blank white frame while the cart page loaded. The working copy also held a broken half-rendered mp4 from an earlier session (no moov atom).
- New cut from the same raw take (`kh-223023`), only `scripts/motion/kh-halal-marketplace.json` changed: guest browse, product, price, add to cart, cart, Khmer; customer wishlist; seller dashboard, products, add-product form with the name typed. Mosques removed. **Only 2 zooms**: the riel + dollar price (1.4x) and the typed product name (1.6x); every other screen is shown whole. Cart segment starts at 16.1s (page load blank before that).
- 32.4 s, 2.58 MB, new poster (price zoom). `index.html` video description updated (about 30 seconds, no mosque list). check.mjs all PASS.
- Render needs Playwright 1.49.1 via `NODE_PATH` (installed in the session scratchpad this time).

### Update 2026-11-13: idevo + RielTrack videos re-cut (owner: "all the video, best cut")
- QA found in the old idevo video 4 **blank white flashes** (route changes at raw 25.5-25.7, 29.9, 44.3, 48.6 sat inside segments) and 4 tiny 1.12x zoom pulses that only wobbled. RielTrack: a 0.3s Home flash between Budgets and Settings, and a crop zoom on the language row that cut words.
- idevo (`scripts/motion/idevo.json`): cuts moved off the blank frames, Learn tab pass-through dropped (straight to Progress), segments 1.4-2.8s (no sub-second flashes), **no zooms**. 31.8 s, 1.73 MB, poster = Progress.
- RielTrack (`scripts/motion/rieltrack.json`): one zoom only (the 12000 ៛ amount), Settings starts at 45.1 (after its fade-in), whole screen shown when it turns Khmer. 26.2 s, 1.93 MB.
- Blank check: ffmpeg `entropy` on the phone/browser area, 10 fps; old idevo shows hits (<0.31), all 3 new videos none. Frame sheets reviewed. `index.html` idevo description "about 30 seconds". check.mjs all PASS.
- Same raw takes (no new recording).

### Update 2026-11-13: videos round 2: RielTrack + idevo re-recorded (owner: "do all of these")
- **RielTrack**: `scripts/seed-rieltrack.sh extra` adds 4 early-October entries (run once, done) so Home says "27% more than last month" (was 1340%: Home compares the same days of last month). `record-rieltrack.sh` now waits out the "Transaction added" snackbar and scrolls so the new ៛12,000 row shows; scrolls Home to the top before Settings. New take `rieltrack-084450`, video 28.3 s, one zoom (amount).
- **idevo**: re-recorded at 08:51 real time, so Home says "Good morning" with the 9:41 status bar. Take `idevo-085148` (ends on Khmer Settings: the Home frame after Back was not captured). Lesson cut to the practice question, Khmer part shortened, no zooms, blank route-change frames (25.0-25.2, 29.3, 43.4, 47.6) outside the cut. 26.5 s.
- Both: no blank frames (entropy check), frame sheets reviewed. Emulator: demo mode off by the scripts, idevo `pm clear` at the end (as before).
- KH Halal in progress: see next entry.

### Update 2026-11-13: KH Halal card shows 3 screenshots (owner chose "main + 2 small")
- New `.project-card__shots` grid in the featured card (`index.html`): first `.project-card__media--web` full width, the rest 2 per row. Copy a block to add a screenshot. CSS: 2 lines above `.project-card__media--web`; the ≥1024px margin rule now targets `.project-card__shots`.
- New images from the LIVE site as a guest (Playwright 1.49.1, 1280×800, light): `kh-halal-product.webp` (Black Hijab, KHR 20,500 / USD 5.00), `kh-halal-cart.webp` (cart after Add to Cart; only POST was `cart/validate`, cart is browser-only). No login, no checkout.
- Checks: check.mjs all PASS; screenshots 1440 + 390: no sideways scroll, no console errors. Seller dashboard shot not added (needs a login).

### Update 2026-11-13: Contact panel in one column
- Owner: "do all of these" after a Contact review. The two columns left ~500px empty in the middle at ≥1024px. Now one column at every width (label, heading, sentence, email, buttons): `.contact__grid` keeps only `padding: var(--s-7)` at ≥1024px; `justify-self: end` removed. (The first half of this was swept into the other session's commit 78a3e45.)
- Email bigger: `clamp(1.5rem, 2.5vw, 2.25rem)` from 768px (24px at 768, 36px from 1440; heading is 48px). Phones keep `--fs-h3` (20px): bigger would not fit 360px.
- `.contact__details` reveal delay 0 at every width (stacked, so no stagger).
- Checks: check.mjs all PASS; CDP screenshots dark + light at 360/390/768/1024/1440/1920: no sideways scroll, no console errors, email fits (503px at 1440, 279px at 360), underline pixel = #FF6B35 dark / #C2410C light. CSS 33,9xx / 35,000.
- Telegram: `https://t.me/Rasmey_12` (owner sent @Rasmey_12; checked: t.me shows "Hong rin rasmey"). Phone number from the same screenshot NOT put on the site.
- Waiting on the owner: start date ("available from …"), LinkedIn, résumé PDF.
- **Later same day (owner: "improve the layout"):** small shots are now crops at 2x (960×600) so their text is readable, with a mono caption under each (`figure.project-card__shot` + `figcaption`): `kh-halal-product.webp` (title, riel + dollar price, verified seller) "Riel + dollar prices", and NEW `kh-halal-khmer.webp` (home hero in Khmer) "Full Khmer version". The cart shot was dropped (unreadable when small; the video shows the cart). Checked dark 1440/1100/390: no sideways scroll, no console errors, check.mjs all PASS. Only the shots block of `index.html` was committed (another session's Contact edits there are still uncommitted).

### Update 2026-11-13: Contact buttons simplified (owner: "do all of these")
- "Email me" button removed (it repeated the email link). Row 1 (`.contact__actions`): the big email link (`#email-link`, the only `mailto:` now; the comment says "2 places") + "Copy email" + hidden résumé button. Row 2 (`.contact__social`): GitHub / LinkedIn / Telegram as quiet `.social-link` text links (14px muted, orange on hover, ↗ nudges, 44px tall), no `btn` classes. Keep `#email-link` and `.social-link`: the terminal `email` / `github` commands find them.
- Email underline 1px → 2px orange, 3px on hover. Row 1 lost its 24px top margin (text → email gap is the panel's 48px).
- Print: was hiding all of `.contact__actions` (that would hide the email now) → hides `.contact__actions .btn` and `.contact__social`.
- The other session's commit 9ad1142 swept in this change's CSS; the HTML came in the next commit.
- Tests (headless Edge, CDP): 1440/390/360: all contact targets ≥44px, no sideways scroll, one mailto, no "Email me", GitHub + Telegram shown, LinkedIn hidden; social hover colour changes; terminal email + github answer; print shows email, hides buttons; copy button (stub clipboard) copies the exact address, shows + announces "Copied!", resets after 2s; no console errors; check.mjs all PASS. A real-click copy test fails the same way on the old version too (headless clipboard/visibility quirk). CSS 34,611 / 35,000.
- **Main KH Halal shot re-made (owner chose "show real products"):** `kh-halal-marketplace.webp` is now the live home page scrolled down 363px (guest, 1280×800 shot at 2x, scaled to 1280×800, 79 KB): bottom of the banner + "Featured Products" with the first row of 5 real listings (riel + dollar prices, discounts). Before it ended in an empty white strip under the "Featured Products" heading. Alt text updated. No requests other than GET. Checked dark 1440/1100/390: no sideways scroll, no console errors, check.mjs all PASS.

### Update 2026-11-13: UI review fixes (owner: "do all of these, one by one")
Review rated the site 7.5/10. Done (CSS only, `css/style.css`):
- **Phone cards:** phone panel background `--text` 7% over `--surface` (was `--surface-2`), phone border `--text` 24%: dark app screens no longer blend into the panel. All 3 phones level (raised middle phone removed; also from the reduced-motion rule). Phones NOT made bigger: 3 phones already fill ~98% of the 4:3 panel width.
- **Contact:** content centred in the panel (`justify-items`/`text-align: center`, rows `justify-content: center`); profile links 14px → body size (18px), gap 32px.
- **About → Contact gap:** `#about { padding-bottom: 0 }` (two stacked section paddings made ~256px of empty space at desktop).
- **Not changed (review was wrong):** KH Halal small shots are already the same height (both 16:10 frames, 960×600). Hero gap: the empty space only showed in a very tall test window; at 1440×900 the hero is balanced and check.mjs measures 0px centring difference.
- **Waiting on the owner:** bio + "learning now" (slot in About), relaxed photo (`tools/photo-cutout.py`).
- Checks: check.mjs all PASS (360–1920); lint 0/0; screenshots 1440 dark + light. CSS 34,775 / 35,000 bytes.
- `index.html` had another session's uncommitted change (4 lines); not part of this commit.
