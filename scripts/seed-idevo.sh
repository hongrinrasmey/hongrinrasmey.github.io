#!/usr/bin/env bash
# Gives idevo a few days of real study history on the EMULATOR, so the Progress chart is not empty.
# It moves the emulator's clock back (6, 5, 3 and 1 days), studies the app's own "Learn how to learn"
# sample path on each day, then turns automatic time back on (also if anything fails).
# Leaves lesson 2 ("Space it out") and today's flashcard reviews for the recording.
# WARNING: starts with "pm clear app.idevo.idevo" (deletes all idevo data). Emulator only.
# Run from the portfolio folder:  bash scripts/seed-idevo.sh   (record-idevo.sh runs it for you)
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
logev() { :; }
case "${DEVICE:-emulator-5554}" in emulator-*) ;; *) echo "Refusing: clock change + pm clear on a real phone"; exit 1;; esac

$ADB shell cmd time_detector set_auto_detection_enabled true; sleep 2
NOW=$($ADB shell date +%s | tr -d '\r')
restore_clock() { $ADB shell cmd time_detector set_auto_detection_enabled true >/dev/null; }
trap restore_clock EXIT
day() {   # day N -> emulator clock set to N days ago (same time of day)
  $ADB shell cmd time_detector set_auto_detection_enabled false
  $ADB shell cmd alarm set-time $(( (NOW - $1 * 86400) * 1000 )) >/dev/null; sleep 1
  echo "clock: $($ADB shell date | tr -d '\r')"
}
to_learn() { for i in 1 2 3 4; do has "Tab 3 of 4" && break; dump | grep -q 'Tab 3 of 4' && break; $ADB shell input keyevent KEYCODE_BACK; sleep 1; done; tapc "Tab 3 of 4" 1.5; }

day 6                                                   # load the sample path, finish lesson 1
$ADB shell pm clear app.idevo.idevo >/dev/null
$ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 5
tapt "Choose something to learn" 1.5
tapt "Or try a sample path" 2.5
tapt "Start: Test yourself" 2.5
swipe 1700 1000 700 1.2
tapt "Reading it once, then recalling it from memory" 1.5
swipe 1800 900 700 1.2
tapt "Mark as complete" 2
echo "day -6: lesson 1 done"

day 5                                                   # review the three flashcards
$ADB shell am force-stop app.idevo.idevo; $ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 4
tapc "Tab 4 of 4" 2
tapt "Start review" 2
for i in 1 2 3; do tapt "Show answer" 1.2; tapc "Good, comes back" 1.5; done
echo "day -5: 3 flashcards reviewed"

day 3                                                   # finish lesson 3
$ADB shell am force-stop app.idevo.idevo; $ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 4
to_learn
tapc "Learn how to learn" 2
tapc "Say it in your own words" 2.5
tapt "Show answer" 1.2
swipe 1800 900 700 1.2
tapt "Mark as complete" 2
echo "day -3: lesson 3 done"

day 1                                                   # lesson 1 quiz
$ADB shell am force-stop app.idevo.idevo; $ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 4
to_learn
tapc "Learn how to learn" 2
tapc "Test yourself" 2.5
swipe 1800 600 700 1; swipe 1800 600 700 1
tapt "Take the quiz" 2
tapt "Reading it once, then recalling it from memory" 1
tapt "Check answer" 2
echo "day -1: quiz answered"

$ADB shell am force-stop app.idevo.idevo
restore_clock; sleep 2
echo "clock back to automatic: $($ADB shell date | tr -d '\r')"
