#!/usr/bin/env bash
# Records the raw idevo demo on the Android emulator (VIDEOS.md, Method A).
# First runs seed-idevo.sh (the app's own "Learn how to learn" sample path, studied over a few earlier
# days by moving the emulator clock), so Home and Progress show real history. No personal data.
# WARNING: "pm clear app.idevo.idevo" runs in the seed AND at the end (deletes all idevo data; the end one
# also puts the language back). That is why it only runs on the emulator.
# Run from the portfolio folder:  bash scripts/record-idevo.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/idevo-raw
case "${DEVICE:-emulator-5554}" in emulator-*) ;; *) echo "Refusing: pm clear on a real phone"; exit 1;; esac

bash scripts/seed-idevo.sh || { echo "seed failed"; exit 1; }
demo_on
$ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 5
has "Continue" || { echo "idevo Home with 'Continue' not found"; exit 1; }

TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start idevo
# slow on purpose (owner, 2026-11-13): every result stays on screen 3-4 s so the video can explain it
sleep 4.5                                          # Home: continue learning, this week
tapt "Continue" 4                                  # lesson 2 "Space it out": read the top
swipe 1700 1000 700 3                              # down to the practice question
tapt "Soon, so you can practise it again" 4        # answer + explanation
swipe 1500 1000 500 1.5
tapt "Mark as complete" 4                          # path finished
$ADB shell input keyevent KEYCODE_BACK; sleep 4    # Home: streak + this week
tapc "Tab 4 of 4" 3.5                              # Review: flashcards due + coming up
tapt "Start review" 3
tapt "Show answer" 4                               # answer + the 4 grading buttons
tapc "Good, comes back" 3
$ADB shell input keyevent KEYCODE_BACK; sleep 3    # Review: one fewer due, schedule updated
tapc "Tab 3 of 4" 3                                # Learn: the path
tapt "Your progress" 5
$ADB shell input keyevent KEYCODE_BACK; sleep 1
tapc "Tab 1 of 4" 2                                # Home
tapt "Settings" 2.5
logev tap "540 940" "Language"; $ADB shell input tap 540 940; sleep 2.5   # Language row
tapt "ខ្មែរ" 3.5                                    # language: Khmer
$ADB shell input keyevent KEYCODE_BACK; sleep 3    # Home in Khmer
# screenrecord can drop the last frames when stopped: a small scroll makes it write the Khmer Home
# frames out (the cut ends before the scroll)
swipe 1700 1500 400 2
rec_stop idevo "$OUT"
demo_off                                             # status bar back to normal

$ADB shell pm clear app.idevo.idevo >/dev/null && echo "idevo reset (data + language)"
echo "Done. Raw take in $OUT"
