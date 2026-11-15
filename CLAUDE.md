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
- **Videos:** "Watch video" = promo per app (`<slug>-promo.mp4`, phones `<slug>-promo-mobile.mp4` for idevo + RielTrack only; KH phone version dropped 2026-11-14, phones play the 16:9 KH promo); no "Full demo" any more (KH full demo removed 2026-11-15, owner: the promo is nearly as long). Made in `video-studio/` (README there); rules + QA in `VIDEOS.md`; recorders in `scripts/`. Raw takes in `assets/videos/*-raw/` (git-ignored): only the 6 takes the configs use are kept.
- **Budgets (DESIGN.md §12, owner approved):** CSS ≤ 36,000 bytes (about 35,500 used), JS ≤ 27,000 (about 25,500 used). Trim comments before adding code.
- **Checks after every change:** `node tools/check.mjs`; taste-skill lint 0/0; for videos the `VIDEOS.md` checklist. Exact commands (lint, inspector, Lighthouse): "How to re-run the checks" in `PROGRESS-LOG.md`.

### Hard rules learned (do not undo)
- Never invent content. Never film or show: Account/profile pages, messages, payouts, buyer names; blur email/phone/address. Never press "Place order". Logins and the idevo AI token only from env vars, never in a file or printed. Emulator only, never the owner's phone.
- No public KH Halal demo login (real-money checkout). No skill percentages. No found/stock photos. No "Private repo" labels. No hero terminal hint, no tilt, no glow behind the name, no contact panel glow.
- Do not push, publish or create public repos without the owner's yes.
- Never commit or push while a render is writing into `assets/videos/` (a half-written mp4 has no moov atom and will not play; check with `ffprobe`). Other sessions may be rendering.
- **Sound (decision changed by the owner, 2026-11-14):** the owner now wants music and sound in the videos. This replaces the earlier "keep silent" answer. Follow `AUDIO.md`: owner picks every track, licensed only, keep the silent versions, website sound control only after the owner's OK. Mixed 2026-11-14 (`video-studio/audio.py`, README "Sound"); KH full demo silent until 2026-11-15, then **with sound too (owner: "make the kh full demo have sound too")**, same KH song. Owner answers (2026-11-14): sound on the 6 promos only (full demo silent), muted by default + sound button, music + soft effects, free tracks only, no vocals/calm, same track desktop + phone; downloads to scratch + librosa install OK. AUDIO.md §4.6/§5a asked for ONE track for all videos, but **the owner reversed that the same day (2026-11-14): "i want song audio each video, not one for all"** = one song per app (desktop + phone of an app share it, as answered before). Kept from AUDIO.md: the one shared 14-sound effect kit (§5b). Applied in the final re-render (NEXT_STEPS items 8-10).

### Waiting on the owner
- idevo AI token rotated 2026-11-14 (worker `idevo-ai` in `E:\Idevo Project\backend`; `IDEVO_AI_URL` / `IDEVO_AI_TOKEN` user env vars). Still to rotate: both KH Halal passwords, and the Bakong token (its value showed in a screenshot in chat on 2026-11-14); remove the `KH_*` user env vars when no more recording is planned.
- Content: bio + "currently learning", "what I did / learned" per project, résumé PDF, LinkedIn, optionally a relaxed photo (`tools/photo-cutout.py`).
- Pin the 3 repos on github.com (manual).

### Latest
- 2026-11-15 (owner: "what's the point of the full if it's nearly the same time" -> "Remove it"): KH full demo removed: button + description (index.html), `.video-btn--full` rule (css), `kh-halal-marketplace.mp4` + poster deleted (git rm); storyboard kept. check.mjs PASS, Edge sound test 12/12. Docs updated. The REVIEW.md agent stopped early (API/billing error on the account, HTTP 403): review not done.
- 2026-11-15 (owner: "commit and push"): commit `82d91db` pushed to `main`; live checked: page shows "about 56 seconds", all 6 videos on the live site have the same byte size as local, old KH phone promo returns 404. Not committed (on purpose): `video-review/` (test videos, review work; the REVIEW.md agent is still writing there) and `drafts/` (owner posts them). `__pycache__/` added to .gitignore.
- 2026-11-15 09:54: KH promo final (56.0 s, 6.38 MB, -18.8 LUFS, TP -2.6, checkout start fixed: cart ~1.3 s before the click). All 6 videos pass QA; check.mjs PASS; Edge 14/14; index.html durations match. REVIEW.md running as a fresh agent -> `video-review/FINAL_REVIEW.md` (old review kept as `FINAL_REVIEW-2026-11-14.md`). Not committed, not pushed.
- 2026-11-15 09:41: 6-video queue done, QA passed (decode, moov, -18.4..-18.8 LUFS, TP <= -2.8, keyframes 2.0 s, no hard cut/flash, QR OK). Found: KH Checkout opened on the cart and clicked 0.1 s after the crossfade (1.5x) -> Checkout clip `[76.0, 78.1, 1]` (cart ~1.3 s, click 20.6 s): 56.0 s, index.html "about 56 seconds", song `[[10.8, 38.8], [43.33, 71.63]]` 8/16, extras +1.233. KH promo re-render + mix running (countdown window open).
- 2026-11-15: item 13 skipped (owner: will not post the videos on social media).
- 2026-11-15 (owner: "do all of these" = the REPORT.md clarity fixes): KH hook "Every product reviewed." (was "Built on trust."), KHQR label "KHQR bank QR · in riel" (promo + full), idevo hook "Describe what to learn in idevo.", idevo text card "Study offline. No account.", RielTrack outro "Track spending in US dollars and Cambodian riel."; promo.html hook lines `text-wrap: balance` (phone hook no lone word). FACTS.md + index.html (idevo description) updated. Timings unchanged (events checked). Stills `video-review/frames/clarity/`. 6-video queue + mix running. Item 13 still unanswered.
- 2026-11-15 (owner: NEXT_STEPS 11-16 then REVIEW.md): item 11 `video-review/PEOPLE_TEST.md` (owner runs it); item 12 cold-viewer test done by a fresh agent from 1-fps contact sheets only (`video-review/cold-viewer/`): all 3 apps understood correctly, results + 6 suggested clarity fixes (need owner OK) in `video-review/REPORT.md`; it found one real bug: KH Checkout chapter began on the wishlist page (0.5 s) -> Checkout now starts on the cart page (54.77 s, index.html "about 55 seconds", song re-fit `[[10.43, 25.19], [31.32, 71.63]]`, extras -0.733), KH promo re-rendering. Item 13 waiting: owner posts on social media? Items 14-16 drafts in `drafts/` (github-profile-README.md, linkedin.md, share-post.md), nothing published.
- 2026-11-15 (owner: "lower the song audio a little bit"): new `audio.py` key `"musicDown"`; 3 dB in all 4 storyboards; 6 videos remixed from their silent copies: song -2.5..-3 dB measured, effects unchanged (outro boom 0.0 dB), -18.4..-18.8 LUFS, true peak <= -1.4 dBTP, decode OK, Edge 14/14. Not committed.
- 2026-11-15 01:29: **final re-render + mix done** (6 videos in `assets/videos/`, silent copies in `assets/videos/silent/`). QA passed: decode 0 errors, moov first, AAC 48 kHz, -16.3/-15.8 LUFS, true peak <= -1.1 dBFS, keyframes max 2.0 s, no hard cut > 40, no brightness jump > 25, QR codes decode from the last frame (5 promos), Edge sound test 14/14, check.mjs PASS. Sizes: KH promo 6.38 MB 55.5 s, KH full 8.21 MB 62.93 s, idevo 6.17 / phone 8.49 MB 45.67 s, RielTrack 4.78 / phone 6.59 MB 37.57 s. Not committed, not pushed: waiting for the owner.
- 2026-11-15 (owner: "do all of these, one by one ... don't make any mistake"): `spotOut` 0.9 in all 4 storyboards (rule split: dim lifts slowly, label/outline keep 0.5 s; checked per highlight: labels lose <= 0.2 s). Full demo KHQR hold +0.6 s (recording 102.8 -> 103.4, still frame, blurs cover it) so "Stopped here: no order placed" shows fully: 62.93 s, index.html "about 1 minute 3 seconds"; sound re-timed (Fashion Minimal `[[2.93, 50.94], [56.82, 72.04]]` 9/15, extras +0.6). Old queue stopped; new final queue (6 renders + 6 mixes) running into `assets/videos/` from 00:45. **No commit/push until it has finished and passed QA.**
- 2026-11-15 (owner: "transition ... pop and then go to next slide"): cause = the highlight dim lifted in the last 0.5 s of each chapter (page brightened) right before the caption change. New opt-in `"spotOut": 0.9` (promo.html): highlight fades over 0.9 s, gone 0.2 s before the change. KH promo only so far (peak brightness step 7.1 -> 4.4); re-rendering to `video-review/test/kh-promo-v2.mp4`.
- 2026-11-15 (owner: "i don't need this part"): wishlist chapter removed from the KH promo (59.3 -> 55.5 s; Checkout now `xfadeCut` 0.3; extras moved -3.8 s; song fit `[[11.19, 25.19], [29.81, 71.61]]` 7/16 on a beat). index.html "about 56 seconds", wishlist removed from the description. KH promo re-rendering.
- 2026-11-15 (owner: "change the song back"): KH promo + full demo song back to **Fashion Minimal** (`video-studio/audio/rt-b.mp3`; promo fit `[[0.0, 29.81], [41.82, 71.61]]` 8/17 on a beat, full demo `[[0.0, 22.06], [31.32, 71.89]]` 8/15). Preview `video-review/test/kh-final-preview-fashion-minimal.mp4` (-16.3 LUFS, decode OK). Product Launch no longer used for KH.
- 2026-11-15 (owner: "make the kh full demo have sound too"): KH full demo gets the KH song (Product Launch, fit `[[0.0, 54.27], [110.06, 118.42]]`, 5/15 moments on a beat) + the kit; `audio` block in `kh-halal-marketplace-full.json`; index.html full demo button `data-sound`, description "plays with sound". Mixed after the final re-render.
- 2026-11-15 (owner: "now for the final video result"): QR codes in the 5 promo outros (`"qr"` outro key, scan-tested); stutter fixed (`smooth.py`, all 6 takes; KH test: repeats in motion 5 -> 1); KH song Product Launch re-fitted for 59.3 s. Final re-render of all 6 videos + sound mix running into `assets/videos/`. **Do not commit or push until it has finished and passed QA.**
- 2026-11-14 (owner: too much zoom): all zooms removed from the KH promo (61.23 s, 5.54 MB silent); QA passed. Previews `kh-calm-1-fashion-minimal` / `kh-calm-2-product-launch`. Waiting: owner picks the song.
- 2026-11-14 (owner: size changes between pages): new opt-in `camOut` (each chapter back to 1x before its cut) + zooms <= 1.2x in the KH promo (61.23 s); every cut now at the same size (measured). audio.py re-encodes once if AAC overshoots -1 dBTP. Previews `kh-song-1-fashion-minimal` / `kh-song-2-product-launch`. Waiting: owner picks.
- 2026-11-14 (owner): every KH promo chapter starts on its real click (60.83 s, index.html "about 1 minute"); new opt-in `dissolve` key; QA passed. Song previews `kh61-1-fashion-minimal` / `kh61-2-product-launch`. Waiting: owner picks.
- 2026-11-14 (owner): KH promo chapter 1 shows how the shopper reaches the product (home scroll, View All, list, click): 53.2 s, index.html "about 53 seconds"; QA passed. Song previews `kh53-1-fashion-minimal` / `kh53-2-product-launch`.
- 2026-11-14 (owner): KH promo + wishlist alerts, checkout (delivery fee), product table: 48.37 s, 13 chapters; QA passed; index.html "about 48 seconds". KH song previews `kh48-1-fashion-minimal` / `kh48-2-product-launch`. Waiting: owner picks.
- 2026-11-14 (owner): KH promo identity chapter removed too (38.77 s, poster 6.4, index.html "about 39 seconds"); QA passed. KH song still open: `kh-fit-1-fashion-minimal.mp4` / `kh-fit-2-product-launch.mp4`.
- 2026-11-14 (owner): KH promo filter chapter removed (43.07 s, index.html "about 43 seconds"); test render QA passed. KH song still open: previews `kh-fit-fashion-minimal.mp4` (best beat sync) + `kh-fit-minimal-technology.mp4`.
- 2026-11-14 (owner: do it): songs chosen by the agent (KH Product Launch, idevo Product Launch Review, RielTrack Modern Commercial); full demo test passed; 5 test mixes in `video-review/test/` (-15.8..-16.1 LUFS); audio.py refreshes the silent copy from a fresh render. Next: item 8 QR, then the one final re-render + mix into assets/videos.
- 2026-11-14 (owner: do all review fixes): keyframes every 2 s (render.js), `xfadeCut` + finale `lead` (promo.html, opt-in), slower identity/KHQR zooms; KH promo test render QA passed (only fix windows changed). Full demo test rendering. Assets not touched yet (one final re-render). Song still open (batch 3 not downloaded).
- 2026-11-14: song batch 3 (Synthwave, Lofi Upbeat, Funk) license-checked; KH frame review `video-review/KH_FRAME_REVIEW.md` (keyframe gaps 8.3 s, 3 hard cuts, finale dip to black 40.0-40.4, fast identity/KHQR zooms). Waiting: owner downloads the songs; decides on the review fixes.
- 2026-11-14: cooler effects in the kit + limiter in audio.py; 4 KH previews `kh-new-<song>.mp4`. Waiting: owner picks the KH song.
- 2026-11-14 (owner: another song): 4 new song candidates license-checked (`licenses/pixabay-2026-11-14-one-track.md` last table). Waiting for the downloads.
- 2026-11-14 (owner: effects not cool enough, change the song): 3 KH song previews `kh-song-*.mp4` + 5 cooler effects license-checked. Waiting: owner picks a song, downloads the 5 effects.
- 2026-11-14: mouse click +6 dB (owner); KH test mix `kh-promo-mix3.mp4`.
- 2026-11-14 (owner: beep keeps coming up): chapter/CTA tick removed from the kit; new KH test mix `kh-promo-mix2.mp4` (17 effects). Waiting: owner names the other sounds that don't fit.
- 2026-11-14 (owner: "choose the best one for each"): agent chose KH = Warm Story, idevo = Tech Background, RielTrack = Tutorial technology; AI sound = B (shimmer). `audio.py`: opt-in `"kit"`, `"extra"`, `"beds"`, sounds tick/hit/riser/bloom/shimmer (README "Sound" 4b). KH storyboard audio block rewritten; test mix `video-review/audio-previews/kh-promo-mix.mp4` (24 effects, -16.0 LUFS, TP -5.8, decode 0 errors, moov first). `assets/videos` untouched (final mix in the one re-render). Waiting: owner listens to the KH mix.
- 2026-11-14 (owner: "i want song audio each video, not one for all"): **one song per app again** (AUDIO.md one-track rule overridden; shared effect kit kept). Proposal from the measurements: KH = Warm Story, idevo = Tech Background, RielTrack = Tutorial technology (`video-review/AUDIO_ONE_TRACK.md` "One song per app"); new preview `rieltrack-promo-3.mp4`. Waiting for the owner's pick per app.
- 2026-11-14 (owner downloaded the 8 files): songs in `video-studio/music/` (tech-background, technology, tutorial-technology, minimal-technology, warm-story = kh-a), effects hit/riser/bloom/shimmer in `video-studio/audio/` (originals also in `E:\portfolio-audio\`). Measured + ranked, previews (music only, bar-line edit, own ending on the video end, -16 LUFS) + kit preview: `video-review/AUDIO_ONE_TRACK.md`, files in `video-review/audio-previews/`. Agent's pick: 1 Tech Background. Waiting: owner picks the song (1 / 3 / A) and OKs the kit (shimmer A or B).
- 2026-11-14 (owner: "do it all" + "play with the sound, you need not enable"): owner took every suggestion (5 promos, full demo silent; music + effects; free only; AUDIO.md §5a brief; seller-side start 29.13 s gets the signature sound in KH; 3 quiet idevo lesson ticks; music folder; kh-a in the race). **Site sound changed to option (b):** promos play with sound when the pop-up opens (`js/main.js` `soundOn = true`; if the browser blocks sound it plays muted and the button shows off); Sound button = mute, `aria-pressed`. index.html descriptions "plays with sound (the Sound button turns it off)". Edge: 12 sound checks PASS, full demo plays silent, check.mjs PASS, JS 26,912 / 27,000. Licenses: `video-studio/licenses/pixabay-2026-11-14-one-track.md` (5 tracks OK, App Explainer dropped: AI; 4 effects OK, 2 dropped: AI). `video-studio/music/` made (git-ignored). Waiting: owner downloads 4 songs + 4 effects.
- 2026-11-14 (owner: follow AUDIO.md step by step): step 1 (Section 4 questions, with the earlier answers to confirm) asked; step 2 done: `video-review/AUDIO_CUES.md` (real event times of the 5 promos from `render.js --events`, planned sound per moment, 5 differences from the AUDIO.md plan, e.g. no flip in the KH 16:9 promo). `video-studio/music/` does not exist yet. Waiting for the owner's answers.
- 2026-11-14 (owner pasted new `NEXT_STEPS.md` + `AUDIO.md`, saved word for word over the older copies): decision recorded: ONE music track for all videos (Hard rules, Sound). New in NEXT_STEPS: item 9b (keyframe every 2 s), items 8, 9, 9b, 10 in ONE final re-render. Item 1 (KH Halal "hardest problem + what I learned"): questions asked again, waiting for the owner's answers. Nothing else changed.
- 2026-11-14 (owner: "do it all" after the REVIEW.md report): C1 fixed (District + Province blurred in KH promo + full demo), Minor fixes M1-M8, M10, M14, M15 (M9, M11 owner to decide; M12, M13 left as is by the owner). New opt-in engine keys `tail` (duo) / `softOut` (finale), `render.js --events`. Sound added to the 5 promos (`video-studio/audio.py`; tracks chosen by the agent at the owner's request, Pixabay license, proof in `video-studio/licenses/`); site: muted + "Sound" button (`aria-pressed`, kept for the visit). KH phone version dropped. Phone pop-up full screen. QA: decode 0 errors, moov first, loudness -16 LUFS / TP <= -1.4, Edge 24/24 + sound test 4/4, check.mjs PASS, lint 0/0. **Not committed, not pushed.** Details in PROGRESS-LOG.md.
- 2026-11-14 (owner pasted `NEXT_STEPS.md` + `AUDIO.md`, both saved in the repo root): work list for what's left, done one item at a time with the owner's OK between items. Sound decision recorded (Hard rules above). `REVIEW.md` (final review) is referenced but not in the repo yet. Now on item 1 (KH Halal "hardest problem + what I learned"): questions asked, waiting for the owner's answers.
- 2026-11-14: `REVIEW.md` saved; review run early by a fresh subagent: `video-review/FINAL_REVIEW.md`. 1 Critical (C1: District + Province not blurred in the KH promo 16:9 and KH full demo, both live), 0 Major, 15 Minor. Nothing fixed yet: waiting for the owner's OK. Details in PROGRESS-LOG.md.
- 2026-11-14 (owner: "list everything" -> "do all of these"): live Lighthouse mobile 99/100/100/100, desktop 100 x4. Full QA (check.mjs, lint 0/0, inspector 0 FAIL, theme, reduced motion, no-JS, 44 px targets) found one bug, fixed: phone menu Tab order (js/main.js, Tab loops button <-> links). Videos: duo `inAt`/`outAt` (no dark gap, both KH), KHQR hold trimmed (KH promo 45.7 s), KH phone flip 0.6 s (47.5 s, no jump > 25), idevo lesson scroll 5x (50.6 s). sitemap.xml + robots.txt line. Old Latest entries moved to PROGRESS-LOG.md. Edge 22/22. Pushed with owner yes 2026-11-14; live files checked (same sizes, sitemap 200).
- 2026-11-14 (owner: "rate and review all the videos" -> "list everything" -> "do all of these"): KH phone promo `labelsTop` (labels above the phone, no longer over app text). RielTrack outro button orange (`ctaColor` removed, both files). idevo lesson scroll: still pauses cut with `join` (same 5x speed): 50.6 -> 47.0 s. KH full demo add-product chapter: still screens cut (`join` 163.4): 64.5 -> 62.3 s. index.html descriptions: idevo "about 47 seconds", full demo "about 1 minute 2 seconds". Release check: idevo v0.6.4 and RielTrack v1.6 match GitHub. QA: decode 0 errors, moov first, no audio; brightness jumps > 25: 0 in the 5 promos, KH full the same 4 cuts as before; frame strips of every changed part; 7 posters unchanged and clean; Edge 24/24 (4 buttons x 6 sizes); check.mjs PASS. Details in PROGRESS-LOG.md.
- Older entries: `PROGRESS-LOG.md`, "Moved from CLAUDE.md Latest (2026-11-14)".
