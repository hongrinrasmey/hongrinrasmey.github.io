#!/usr/bin/env bash
# Records the raw idevo demo on the Android emulator (VIDEOS.md, Method A).
# Uses the app's own "Learn how to learn" sample path, so no personal data is involved.
# WARNING: runs "pm clear app.idevo.idevo" at the start AND the end, which deletes all idevo data
# on the device (the end one also puts the language back). That is why it only runs on the emulator.
# Run from the portfolio folder:  bash scripts/record-idevo.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/idevo-raw
case "${DEVICE:-emulator-5554}" in emulator-*) ;; *) echo "Refusing: pm clear on a real phone"; exit 1;; esac

demo_on
$ADB shell pm clear app.idevo.idevo >/dev/null
$ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 5
has "Choose something to learn" || { echo "idevo Home not found"; exit 1; }

TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start idevo
sleep 2.5                                          # Home
tapt "Choose something to learn" 1.5
tapt "Or try a sample path" 2.5                    # path with 3 lessons
tapt "Start: Test yourself" 2.2                    # lesson 1
swipe 1700 1000 700 1.2                            # down to the practice question
tapt "Reading it once, then recalling it from memory" 2.5
$ADB shell input keyevent KEYCODE_BACK; sleep 1.2  # back to the path
$ADB shell input keyevent KEYCODE_BACK; sleep 1.2  # back to Learn
tapc "Tab 4 of 4" 2                                # Review
tapt "Start review" 2
tapt "Show answer" 2.5
tapt "Good, comes back in 1 day" 1.5
$ADB shell input keyevent KEYCODE_BACK; sleep 1.2
tapc "Tab 3 of 4" 1.5                              # Learn
tapt "Your progress" 3
$ADB shell input keyevent KEYCODE_BACK; sleep 1
tapc "Tab 1 of 4" 2                                # Home
tapt "Settings" 1.5
logev tap "540 940" "Language"; $ADB shell input tap 540 940; sleep 1.5   # Language row
tapt "ខ្មែរ" 2.5                                    # language: Khmer
$ADB shell input keyevent KEYCODE_BACK; sleep 3    # Home in Khmer
rec_stop idevo "$OUT"

$ADB shell pm clear app.idevo.idevo >/dev/null && echo "idevo reset (data + language)"
echo "Done. Raw take in $OUT"
