# One track for all videos: candidates + sound kit (AUDIO.md steps 3-5), 2026-11-14

**I can't hear audio.** Everything below comes from the Pixabay page descriptions and from measurements (librosa tempo, key and energy; ffmpeg EBU R128 loudness). It says why a track *should* fit. You listen and choose.
License proof: `video-studio/licenses/pixabay-2026-11-14-one-track.md`. Files: `video-studio/music/` (git-ignored).

## Music candidates (AUDIO.md section 6)

| # | Track + artist | Official link | Length | BPM | Key | Mood / genre (page) | License | Why it should fit | Possible issue |
|---|---|---|---|---|---|---|---|---|---|
| **1 ★ my pick** | Tech Background, The_Mountain | [page](https://pixabay.com/music/corporate-tech-background-184156/) | 2:01 | 86 | G major | modern electronic, smooth synth plucks, steady beat; tech videos, explainers | Pixabay Content License, no credit needed | The only one with a **soft start that builds** (+11 dB over the first 30 s), which is the shape all three videos open with. Brightest sound of the five (crisp plucks for RielTrack) but the calmest tempo (good for idevo). Clean fade-out ending. Widest dynamics (LRA 10.7 LU): least "squashed". | 86 BPM is under the 100-110 brief. Content ID registered (YouTube). |
| 3 | Tutorial technology, PaulYudin | [page](https://pixabay.com/music/corporate-tutorial-technology-182513/) | 2:10 | 108 | A major | upbeat modern electronic; tech tutorials | same | Tempo right inside the brief, major key (bright, positive), very steady beat, clean ending. | Page says "upbeat": may be too energetic for idevo. Almost no build (same level all the way). Content ID registered. |
| A | Chill Advertising Music (Warm Story), Strawberry_Candy | [page](https://pixabay.com/music/corporate-chill-advertising-music-warm-story-627308/) | 1:56 | 112 | F minor | soft acoustic guitar, melodic piano, gentle beats | same | Warmest (acoustic: trust, community for KH), strongest beat of the five, clean natural ending. Already downloaded (round 2). | Acoustic, so less "tech" for RielTrack; minor key may feel less bright. Content ID registered. |
| 2 | Technology, Verclub_Music | [page](https://pixabay.com/music/corporate-technology-550887/) | 2:10 | 92 | G# major | "technology background music" | same | Steady, corporate. | Mastered very loud (-7.6 LUFS, peaks over 0 dBFS = clipped), same level all the way. Not in the top 3. |
| 5 | Minimal Technology, NastelBom | [page](https://pixabay.com/music/beats-minimal-technology-345194/) | 2:00 | 92 | G# major | sleek, minimal synth pulses, steady beat | same | Minimal, crisp. | Mastered very loud (-8.0 LUFS), dense; a dip at 40 s. Not in the top 3. |

Dropped: App Explainer Background (Tech Minimal): the page says "AI generated".

### Fit per video (from the measurements + descriptions)
| Track | KH Halal (warm, trust) | idevo (calm, smart) | RielTrack (crisp, precise) |
|---|---|---|---|
| 1 Tech Background | good: soft start, builds | good: calmest tempo | OK: crisp sound, slower beat |
| 3 Tutorial technology | good | maybe too energetic | good: tempo + steady beat |
| A Warm Story | best: warm acoustic | OK | weaker: acoustic, not "tech" |

## Previews (music only, no effects yet), in `video-review/audio-previews/`

Each song is cut once on a bar line (0.25 s crossfade) so that its **own ending** lands at the end of the video. No cut, caption or timing in the picture changed. All -16 LUFS (±0.3), true peak ≤ -1.2 dBTP, decode 0 errors, moov first.

| File | Song | Listen at |
|---|---|---|
| `kh-promo-1.mp4` | 1 Tech Background | 0:00 hook · 0:21 music jump (same level before and after) · 0:29 seller side · 0:43 outro · 0:46 end (fade) |
| `kh-promo-3.mp4` | 3 Tutorial technology | 0:00 hook · 0:21 jump · 0:43 outro · 0:46 end |
| `kh-promo-A.mp4` | A Warm Story | 0:00 (music starts ~0.3 s in) · 0:22 jump · 0:43 outro · 0:46 end |
| `idevo-promo-1.mp4` | 1 Tech Background | 0:00 hook · 0:23 jump · 0:42 outro · 0:46 end |
| `rieltrack-promo-1.mp4` | 1 Tech Background | 0:00 hook · 0:20.5 jump (the song moves to a quieter part, -4 dB, next to the Reports chapter at 20.6) · 0:34 outro · 0:37.5 end |

Song edits (track seconds): KH-1 `[[6.43, 27.59], [92.53, 117.94]]`, KH-3 `[[0, 21.36], [102.12, 127.33]]`, KH-A `[[0, 21.64], [87.1, 112.03]]`, idevo-1 `[[7.13, 30.42], [95.34, 118.02]]`, RielTrack-1 `[[7.13, 27.59], [101.01, 118.42]]`.

## Sound kit preview: `video-review/audio-previews/kit-14-sounds.m4a` (31 s)

Each sound once, at its planned level relative to the others (the whole file is normalised to -16 LUFS so you can hear it; in the videos they sit under the music).

| At | # | Sound | File | Source (license checked) |
|---|---|---|---|---|
| 0:00.5 | 1 | Soft whoosh | swoosh.mp3 | Swoosh 04, Universfield |
| 0:02.8 | 2 | UI tick | tick.mp3 | Soft Interface Click, Universfield |
| 0:04.5 | 3 | Mouse click | mouse.mp3 | Computer Mouse Click 02, Universfield |
| 0:06.7 | 4 | Touch tap | tap.mp3 | Touchscreen Tap, Desastar |
| - | 5 | Laptop typing | not used | no typing on screen in KH or idevo |
| 0:08.2 | 6 | Phone keypad ×5 | keys.mp3 | iPhone Typing, Rubyland1 |
| 0:10.3 | 7 | Positive chime | chime.mp3 | UI Success Chime, SoundShelfStudio |
| 0:12.9 | 8 | Flip swoosh (signature) | clean.mp3 | Clean Whoosh, DRAGON-STUDIO (no non-AI "swoosh with shimmer" found) |
| 0:14.7 | 9 | Text hit | hit.mp3 (first 0.55 s) | SFX impact soft CGA, attic13 (new) |
| 0:16.4 | 10 | Soft pop | pop.mp3 | Soft UI Pop, humordome |
| 0:17.8 | 11a | AI shimmer, option A | sparkle.mp3 | Fairy Sparkle, humordome (current) |
| 0:20.1 | 11b | AI shimmer, option B | shimmer.mp3 (2 s part) | UI Processing Data Progress 02, RescopicSound (new) |
| 0:23.3 | 12 | Card flip | cardflip.mp3 | flipCard, freesound_community |
| 0:25.5 | 13 | Soft riser | riser.mp3 (last 1.5 s) | Riser (3), u_1pruylktlg (new; page says "dramatic") |
| 0:28.2 | 14 | Outro bloom | bloom.mp3 (first 2 s) | Soft Cinematic Impact, Rizzard / freesound_community (new) |

## What I need from you
1. Which song: 1, 3 or A (or "none, find others")?
2. The kit: OK as is? Shimmer option A or B? Any sound to replace?

## One song per app (owner, later on 2026-11-14: "i want song audio each video, not one for all")

The one-track idea is dropped. Each app gets its own song (its desktop and phone videos share it). The effect kit above stays the same for all.

| App | Proposed song | Why (AUDIO.md §5 tempo range + measurements) | Preview (music only) |
|---|---|---|---|
| KH Halal | A Warm Story | 112 BPM (range 95-115), warm acoustic guitar + piano: trust, community | `kh-promo-A.mp4` |
| idevo | 1 Tech Background | 86 BPM (range 80-100), soft start that builds, calm but bright | `idevo-promo-1.mp4` |
| RielTrack | 3 Tutorial technology | 108 BPM (range 105-125), bright major key, very steady beat: precise | `rieltrack-promo-3.mp4` (0:21 music jump, 0:34 outro) |

Other options you can also listen to: `kh-promo-1.mp4` / `kh-promo-3.mp4` (KH with songs 1 and 3), `rieltrack-promo-1.mp4` (RielTrack with song 1), and the round-2 previews `preview-kh-B-piano-strings.mp4`, `preview-idevo-A-motivational-tech.mp4`, `preview-idevo-B-minimal-ambient.mp4`, `preview-rieltrack-A-jupiter.mp4`, `preview-rieltrack-B-fashion-minimal.mp4` (these have the older effects in them).
