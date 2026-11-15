# AUDIO.md: Music and Sound for My Videos (2026-11-14)

> Put this file in the root of my portfolio repo, next to `NEXT_STEPS.md`.
> **Decision change (owner, 2026-11-14): I now want sound in my videos.** This replaces the earlier "keep silent" rule in `CLAUDE.md` / `PROGRESS-LOG.md`. Record this change in both files before starting.
> Goal: recommend music and sound effects that fit each video, let me choose, then mix them in professionally.

---

## 1. Your role

Act as a **senior sound designer and music supervisor** for product launch videos. You know how music and sound make motion feel smooth and premium: tempo, mood, sync to cuts, subtle sound effects, clean mixing and licensing.

---

## 2. Rules

1. **Read first:** `CLAUDE.md`, `PROGRESS-LOG.md`, `video-studio/README.md`, `video-studio/FACTS.md` and the storyboards (`video-studio/*.json`). Don't change the picture: approved cuts, captions and timing stay as they are (audio follows the video, not the other way round).
2. **When you're not sure: check first, then ask.** Check the repo, my GitHub and each track's official license page. If that doesn't answer it, ask me (one numbered list, a suggested answer each). Never assume.
3. **Be honest: you can't hear audio.** You can read descriptions, genres, moods and tags; measure **BPM, key, loudness and structure** (`ffmpeg ebur128`, `librosa`, `aubio`); and sync to the video's cut times. You can't judge how a track feels. **You shortlist and prepare; I listen and choose.** Never say a track "sounds great"; say why it *should* fit.
4. **Ask before** installing tools, downloading or paying for anything, changing the website code, committing or pushing. Never commit or push while a render is writing into `assets/videos/`.
5. **Keep the silent versions.** Save the current silent files as `<name>-silent.mp4` (or keep the silent render path) so I can go back.
6. After every change: same QA as before (full decode, moov first, Edge playback test, `node tools/check.mjs`), plus the audio checks in `REVIEW.md`. Update `CLAUDE.md` + `PROGRESS-LOG.md`.
7. Explain everything in **simple language**.

---

## 3. Licensing (must follow)

1. Only music/sounds with a clear license that allows use on my **portfolio website and social media** (LinkedIn, YouTube, Facebook, TikTok, Telegram), including commercial use.
2. **No popular/copyrighted songs**, not even short clips.
3. Where to look (**check each license yourself on the official site**; terms change):
   - Free: **Pixabay Music / Sound Effects**; **YouTube Audio Library** (check per-track attribution and whether use outside YouTube is allowed); **Uppbeat** (free tier needs credit); **Freesound** (only CC0 or CC-BY, follow attribution).
   - Paid only if I say so: Artlist, Epidemic Sound, Musicbed.
4. For every track and sound: save **license proof** (official page URL + screenshot/PDF + date) in `video-studio/licenses/`, and the credit in `video-studio/CREDITS.md`. If a credit is required, ask me where to show it (e.g. the site footer or the video description).
5. License unclear → don't use it; tell me.
6. AI-generated music only if its license clearly allows this use; ask me first.

---

## 4. Ask me first (before searching)

1. **Which videos get sound?** (Suggested: the 3 desktop promos + 3 phone promos; the KH full demo too, or keep it silent?)
2. **How should sound work on the website?**
   - (a) **Muted by default with a clear sound on/off button in the video modal** (recommended: browsers block autoplay with sound, and many people browse with sound off).
   - (b) Sound on when the visitor presses play (the modal opens on a click, so this can be allowed), with a mute button.
3. **Music + sound effects, music only, or effects only?** (Suggested: music + subtle effects.)
4. **Free tracks only, or paid OK?**
5. Any **style I like or dislike** (e.g. no vocals, no EDM)?
6. ~~Same track per promo?~~ **Decided (owner): ONE music track for ALL videos** (all promos, desktop + phone, and the KH full demo if it gets sound), edited to each video's length. Same track = one recognisable series.

**The videos must still make complete sense with sound off.** Sound adds feeling; it never carries information.

---

## 5. Sound direction per video (starting suggestions; I decide)

Base these on the **real** videos: read each storyboard and list its cut times, chapters, hero moments and outro before choosing.

| | KH Halal Marketplace | idevo | RielTrack |
|---|---|---|---|
| **Story (approved)** | "One marketplace. Two sides. Built on trust." Shopper → flip → seller | AI drafts the course → study it → flashcards → Khmer | "Spend in dollars. Pay in riel. Track both." |
| **Feeling** | Trust, warmth, community | Smart, calm, focused | Clarity, control, precision |
| **Music style** | Warm, uplifting modern pop/acoustic-electronic; light percussion | Calm modern electronic / soft keys with a gentle pulse (a little "tech" for the AI part, calm for studying) | Clean minimal electronic; crisp beat, confident, not aggressive |
| **Tempo** | ~95–115 BPM | ~80–100 BPM | ~105–125 BPM |
| **Avoid** | Anything religious-sounding or culturally stereotyped; heavy drops | Sleepy or sad tracks; busy drums | Hype/trailer music; harsh synths |
| **Vocals** | None (or wordless) | None | None |
| **Shape** | Soft start → builds through the shopper part → lift at the flip → steady seller part → warm resolve on the outro | Light pulse while the AI works → softer when studying → small lift on flashcards → soft resolve | Punchy hook → steady groove → small lift near the end → clean ending hit |

**Sound effects:** see the full kit and where each sound goes in Section 5b.

---

## 5a. One music track for all videos (owner's decision)

**Brief:** warm, minimal, modern tech/corporate; ~100–110 BPM; soft synths + light beat; **no vocals**; ~2 min long with a clear build and a clean ending (or a clean loop point), so it edits well to 38–65 s. It must sit "in the middle" of the three moods: warm enough for KH Halal, calm enough for idevo, crisp enough for RielTrack.

**Shortlist to check first (Pixabay; found by searching, not listened to):**
| # | Track | Artist | Length (listed) | Where I found it |
|---|---|---|---|---|
| 1 | Tech Background ← **try first** | The_Mountain | 2:01 | pixabay.com/music/search/code%20startup/ |
| 2 | Technology | Verclub_Music | 2:10 | pixabay.com/music/search/tutorial%20technology/ |
| 3 | Tutorial technology | PaulYudin | 2:10 | pixabay.com/music/search/tutorial%20technology/ |
| 4 | App Explainer Background (Tech Minimal) | (check the artist on the page) | 2:14 | pixabay.com/music/search/tech%20explainer/ |
| 5 | Minimal Technology | NastelBom | 1:59 | pixabay.com/music/search/technology%20data/ |

**For each one, before showing me:**
- Open the track's own page; confirm the title, artist, length and that it's under the **Pixabay Content License** (save the page URL + screenshot + date in `video-studio/licenses/`).
- Download (ask me first), measure BPM, loudness and structure (where it builds, where it can loop/end cleanly).
- Rate the fit for each video (KH / idevo / RielTrack) with reasons; flag tracks that are too energetic for idevo or too sleepy for RielTrack.
- If a track can't be found or its license isn't clear, drop it and suggest a replacement that matches the brief (same checks).
- **YouTube note:** a Pixabay license doesn't guarantee there will never be a Content ID claim on YouTube. Keep the license proof so I can dispute one. Not an issue on my website or LinkedIn.

**Previews:** make one low-quality preview of the **KH promo** with each of the top 3 tracks (`video-review/audio-previews/kh-promo-<track#>.mp4`), plus one preview of idevo and RielTrack with your top pick, so I can hear the same track across different videos. **I choose by listening.**

---

## 5b. Sound effect kit (one family for all videos)

Use **one small kit** of matching sounds across every video, so they feel like one series. Same character for all: **soft, clean, warm, modern UI**: nothing cartoonish, metallic, loud or "game-like".

### The kit (14 sounds)
| # | Sound | Character | Length | Search terms (Pixabay / Freesound CC0) |
|---|---|---|---|---|
| 1 | **Soft whoosh** | Airy, short, no hiss tail | 0.3–0.6 s | "soft whoosh", "air swipe", "transition whoosh short" |
| 2 | **UI tick** | Tiny, soft, high | < 0.1 s | "ui tick soft", "minimal click ui", "notification tick" |
| 3 | **Mouse click** | Soft, real mouse | < 0.1 s | "soft mouse click" |
| 4 | **Touch tap** | Soft glassy phone tap | < 0.1 s | "phone tap soft", "touch screen tap" |
| 5 | **Laptop typing** | Soft keys, quiet | per key | "soft keyboard typing", "laptop keys quiet" |
| 6 | **Phone keypad** | Tiny soft ticks, one per digit | per key | "phone keypad soft", "digital keypad tick" |
| 7 | **Positive chime** | Warm, short, 2 notes, not "game win" | 0.4–0.8 s | "soft success chime", "positive notification warm" |
| 8 | **Flip swoosh** | Smooth swoosh with a light shimmer | 0.5–0.8 s | "swoosh shimmer", "magic swipe soft" (avoid sparkly fairy sounds) |
| 9 | **Text hit** | Soft low "pluck/thud" for each headline line | 0.2–0.4 s | "soft impact pluck", "subtle hit ui", "soft thump" |
| 10 | **Soft pop** | Round, gentle | 0.1–0.2 s | "soft pop ui", "bubble pop gentle" |
| 11 | **AI "thinking" shimmer** | Very quiet digital sparkle/texture, loopable | loop | "digital shimmer loop", "data processing soft", "ambient tech texture" |
| 12 | **Card flip** | Soft paper/card | 0.2–0.3 s | "card flip soft", "paper flip" |
| 13 | **Soft riser** | Gentle swell leading into a big moment | 1–1.5 s | "soft riser short", "swell transition" |
| 14 | **Outro bloom** | Warm low hit + soft tail, "settling" | 1–2 s | "soft cinematic hit warm", "logo bloom soft" (no logo, just the sound) |

### Where each sound goes

**All videos**
| Moment | Sound |
|---|---|
| Each hook line appears | 9 Text hit (the line with the colored key word slightly stronger) |
| Device/phone enters | 1 Whoosh (soft) |
| Chapter caption + label pop in | 2 UI tick (quiet; one per chapter, not per label) |
| Text cards (big words on blur) | 9 Text hit per line, exactly as each line lands |
| Into the outro | 13 Riser, then 14 Outro bloom as the title lands |
| CTA button appears | 2 UI tick |

**KH Halal Marketplace** (web: mouse clicks)
| Chapter (real) | Sound |
|---|---|
| Halal clothing and dry food | 1 Whoosh as the browser arrives |
| Filter by halal claim | 3 Click on the filter |
| Every seller is identity-verified | 13 short riser into the zoom → **7 Positive chime** on "Identity verified" (the hero moment) |
| Add to cart, no account needed | 3 Click on Add to Cart → 10 Soft pop on "Added to cart" |
| Full Khmer version | 3 Click on the language switch → 1 short whoosh as the page changes |
| Pay with KHQR | 3 Click; during the 8x sped-up wait: **no sounds** |
| Works on phones too (duo) | 1 Whoosh as the panels move |
| Flip to the seller side | **8 Flip swoosh** (the signature moment) |
| A dashboard for every seller | 2 UI tick |
| Add a product in three steps | 3 Click per step (max 3) |
| Reviewed before it goes live | 7 Positive chime (softer than the verified one) |
| Finale (two panels) | 1 Whoosh → 14 Outro bloom |

**idevo** (Android: taps)
| Chapter (real) | Sound |
|---|---|
| Describe it in one sentence | 5 Laptop typing → *or* 6 keypad ticks for the typed sentence (phone keyboard; pick 6 to match) + 4 Tap on "Set up with AI" |
| AI plans the modules | 4 Tap on "Plan the course" → 11 AI shimmer, very quiet, while it plans |
| AI writes the lessons ("Writing..." → ticks) | 11 AI shimmer under the sped-up part → 2 UI tick as each lesson ticks (3 ticks) |
| Short lessons with a check | 4 Tap on "Show answer" → 7 Positive chime (soft) on the answer |
| Text card: "Remember it longer. / Offline. No account." | 9 Text hit per line |
| Flashcards that come back | 12 Card flip on the card → 4 Tap on the rating button |
| Use it in Khmer | 4 Tap → 1 short whoosh as the language switches |

**RielTrack** (Android: taps)
| Chapter (real) | Sound |
|---|---|
| Hook: Spend in dollars. / Pay in riel. / Track both. | 9 Text hit ×3 ("Track both." strongest) |
| Your month at a glance | 1 Whoosh as the phone enters |
| Add an expense in riel | 4 Tap → **6 Keypad tick per digit of 12000** → 4 Tap on Save → 7 Positive chime (soft) when "−12,000 ៛" appears on Home |
| Add income too | 4 Taps → 2 UI tick when the income total updates |
| Every transaction in one list | 2 UI tick (no sound for scrolling) |
| Compare with last month | 4 Tap on the Reports tab |
| Stay inside your budget | 10 Soft pop on "On track" |
| Text card: No account. / No cloud. / No ads. | 9 Text hit per line |
| Use it in Khmer | 4 Tap → 1 short whoosh |

### Sound effect rules
- **Less is more:** max ~1 effect every 0.5 s; skip anything that feels busy. The **positive chime** max 2–3 times per video (save it for real wins).
- **Sped-up parts (2x–30x):** no taps or typing sounds there (they'd sound like a machine gun); at most a quiet shimmer.
- **Scrolling:** no sound.
- **Volume:** effects sit **under** the music (felt more than heard); hero sounds (verified chime, flip swoosh, outro bloom) a little louder. Duck music −3 to −6 dB only under hero sounds.
- **Timing:** taps/clicks exactly on the real tap frame (use the tap logs); hits exactly on the frame a line appears (±1 frame).
- **Phone versions:** same sounds at the same story moments (timings from each phone storyboard).
- **Licenses:** CC0 or a clear free-commercial license only; save proof (Section 3). Never use a sound whose license you can't confirm.
- Show me the chosen kit (one short audio preview of all 14 sounds in a row) before mixing.

---

## 6. Recommendation (what you give me)

Because it's **one track for all videos**, present the candidates **once** (see Section 5a), with a fit rating per video:

| # | Track + artist | Official link | Length | BPM | Mood/genre tags | License (attribution?) | Why it should fit (tempo, structure, mood) | Possible issue |
|---|---|---|---|---|---|---|---|---|

- Mark one as "my pick" with the reason; **I choose**.
- Prefer tracks with a clear build and a clean ending, or a section that edits cleanly to the exact length.
- List the sound-effect pack(s) you'd use, with links and licenses.
- **Previews:** make quick low-quality preview renders of each video with each candidate (`video-review/audio-previews/preview-<video>-<track#>.mp4`) so I can hear them against the picture. Ask me before downloading anything.

---

## 7. Editing and mixing (after I choose)

**Fit the music to the picture**
- Detect beats/bars (`librosa`/`aubio`); line up the chapter cuts, the KH flip, hero moments and the CTA with beats where it looks natural. **Don't move any approved cut**; adjust the music edit instead.
- Edit to the exact length with clean musical cuts (on bar lines, short crossfades), never a hard chop. Natural ending, or a clean fade over the last ~1.5 s. Fade in over ~0.3–0.5 s.
- Phone versions: the same track edited to their length and cuts.

**Mix**
- Effects frame-accurate (±1 frame) to the visual event, using the real tap logs (`taps` in the storyboards / tap log files) for clicks.
- Duck the music −3 to −6 dB under effects, smoothly.
- No clipping, no harsh frequencies, no sudden jumps.
- **Loudness:** integrated **−16 LUFS** (±1), true peak **≤ −1.0 dBTP** (`ffmpeg -af ebur128`, or `loudnorm` two-pass). All videos within 1 LU of each other.

**Export and engine**
- Add audio as a **separate, opt-in step** in the render pipeline (e.g. a `"audio"` block in each storyboard: track file, start offset, edit points, effects list, gain), so silent renders still work and other videos aren't affected. Document it in `video-studio/README.md`.
- Audio: AAC, 48 kHz, stereo, 160–192 kbps. Keep the existing video settings. Flag any file that grows a lot.

**Website** (only after my choice in Section 4, and my OK to edit code)
- Option (a): the modal video starts muted with an accessible **sound on/off button** (icon + text, keyboard usable, `aria-pressed`, remembers the choice during the visit).
- Option (b): plays with sound after the click, with a visible mute button.
- Never autoplay with sound outside the modal. Update the `index.html` video descriptions if needed. Run the Edge playback test again.

---

## 8. Process

1. Record the decision change in `CLAUDE.md` + `PROGRESS-LOG.md`.
2. Ask me the questions in Section 4.
3. List each video's cut times, chapters, hero moments and outro (from the storyboards and the rendered files).
4. Search candidates; **check every license on the official page**.
5. Show me the tables + sound-effect plan (+ previews if I said yes). **Wait for my choice.**
6. Build the opt-in audio step; mix the first video (KH promo); show it to me (I listen); apply feedback; then the rest.
7. Save licenses + credits; run the audio checks in `REVIEW.md`; give me exact timestamps to listen to myself (start, hero moments, flip, ending).
8. Website sound button (after my OK). Update docs, logs, and the site descriptions.

---

## 9. Done means

- [ ] Decision change recorded in `CLAUDE.md` + `PROGRESS-LOG.md`
- [ ] I chose every track; nothing used without my OK
- [ ] License proof + credit for every track and sound
- [ ] Music edited cleanly to each video; natural endings; approved cuts unchanged
- [ ] Effects subtle, consistent, frame-accurate
- [ ] −16 LUFS (±1), true peak ≤ −1 dBTP, all videos within 1 LU
- [ ] Silent versions kept; videos still make sense with sound off
- [ ] Website sound control works and is accessible (as I chose)
- [ ] Full QA passed; docs and logs updated
