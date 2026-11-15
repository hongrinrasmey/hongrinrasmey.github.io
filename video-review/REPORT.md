# Test report: people test, cold-viewer test, social compression

Date: 2026-11-15. Videos tested: the final 16:9 promos in `assets/videos/` (KH Halal, idevo, RielTrack).

## 11. People test: ready for you

The sheet is `video-review/PEOPLE_TEST.md`. You run it with 3 to 5 people, with the 6 questions (including "Did the music fit the video?") and a table to fill in. After you fill it in, Claude makes a fix list (most common problems first) and asks you which ones to do.

**Status:** waiting for you.

## 12. Cold-viewer test: done

**How:** a new agent that knew nothing about the apps got only 3 pictures: one frame per second of each promo (`video-review/cold-viewer/*-sheet.png`). It answered what each app is, who it's for, its 3 main features and what to do next. Its answers were compared with `video-studio/FACTS.md`.

**Result in one line:** it understood all 3 apps correctly. Nothing it said was wrong. It found 1 real mistake (fixed) and a few spots that are hard to understand.

### What it understood (compared with FACTS.md)

| | What it is | Who for | 3 features | Next step | Matches FACTS.md? |
|---|---|---|---|---|---|
| KH Halal | halal clothing + dry food website from verified sellers in Cambodia, Khmer + English | shoppers and sellers | guest cart + KHQR; Khmer version; seller dashboard, 3-step add product, admin review | "Try it live" / QR, kh-halal-marketplace.onrender.com | yes |
| idevo | Android learning app: describe a topic, AI drafts the course | self-learners | AI plans modules + writes lessons labelled "AI draft"; lessons with a check (answer + reason); flashcards with spaced repetition | "Download APK" / QR, Idevo-Downloads, v0.6.4 | yes |
| RielTrack | Android money tracker in dollars and riel | people who pay in both currencies (guessed Cambodia) | riel expense with dollar value + income; history with search/currency filter + month compare; monthly budget | "Download APK" / QR, RielTrack-Downloads, v1.6 | yes |

### Problems it found

**Fixed already (it was a real mistake):**

1. **KH, 19 s:** the "Checkout" chapter began on the wishlist page for about half a second. That was the part you asked to remove. Checkout now starts on the cart page, with a soft crossfade, and the cart shows for about 1.3 s before the "Proceed to checkout" click (a first try at 1.5x clicked 0.1 s after the crossfade: too sudden). The video is 55.5 → 56.0 s long.

**Hard to understand: fixes 2-6 done 2026-11-15 after your OK ("do all of these"); #7 left as is (your rule):**

| # | Video, time | What the viewer noticed | Suggested fix |
|---|---|---|---|
| 2 | KH, 25-30 s | "KHQR" is never explained. People outside Cambodia don't know it's a bank payment QR. | Label "KHQR in riel" → "KHQR bank QR · in riel" (KH promo + full demo). **Done** |
| 3 | idevo, 29 s | "Remember it longer. Offline. No account." seems to clash with the AI course building (only the small end line says the AI needs your server). | Now "Remember it longer. / Study offline. No account." **Done** |
| 4 | idevo, 0-42 s | The app's name first shows at 42 s (the outro). | Hook line 1 now "Describe what to learn in idevo." (phones: the line splits evenly). **Done** |
| 5 | RielTrack | The word "Cambodia" never appears; some viewers won't know the ៛ sign. | Outro line "Track spending in dollars and riel." → "Track spending in US dollars and Cambodian riel." **Done** |
| 6 | KH, 2 s | "Built on trust." is vague until the admin-review part at the end. | Hook line 3 now "Every product reviewed." **Done** |
| 7 | KH, 14 s | The caption "Full Khmer version" appears while the English page still shows (the click on the language switch comes right after). | Leave it: you asked that every chapter starts on its real click. Mentioned only so you know. |

**Not real problems (they only look odd as single frames):** the grey dim around highlights (in motion it fades in and out), frames caught mid-crossfade (RielTrack 2 s and 22 s, KH 49 s), and the KH name caught mid-animation at the outro (52 s).

## 13. Social compression test: skipped

NEXT_STEPS says to do this only if you post the videos on social media. Your answer (2026-11-15): **no**. So it was not done. The videos stay on your website only.
