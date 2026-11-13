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
sleep 2.5                                          # Home: continue learning, this week
tapt "Continue" 2.5                                # lesson 2 "Space it out"
swipe 1700 1000 700 1.2                            # down to the practice question
tapt "Soon, so you can practise it again" 2.5
swipe 1500 1000 500 0.8
tapt "Mark as complete" 2
$ADB shell input keyevent KEYCODE_BACK; sleep 1.5
tapc "Tab 4 of 4" 2                                # Review
tapt "Start review" 2
tapt "Show answer" 2.5
tapc "Good, comes back" 1.5
$ADB shell input keyevent KEYCODE_BACK; sleep 1.2
tapc "Tab 3 of 4" 2                                # Learn: the path
tapt "Your progress" 3.5
$ADB shell input keyevent KEYCODE_BACK; sleep 1
tapc "Tab 1 of 4" 2                                # Home
tapt "Settings" 1.5
logev tap "540 940" "Language"; $ADB shell input tap 540 940; sleep 1.5   # Language row
tapt "ខ្មែរ" 2.5                                    # language: Khmer
$ADB shell input keyevent KEYCODE_BACK; sleep 3    # Home in Khmer
# screenrecord can drop the last frames when stopped: a small scroll makes it write the Khmer Home
# frames out (the cut ends before the scroll)
swipe 1700 1500 400 1.5
rec_stop idevo "$OUT"

$ADB shell pm clear app.idevo.idevo >/dev/null && echo "idevo reset (data + language)"
echo "Done. Raw take in $OUT"
