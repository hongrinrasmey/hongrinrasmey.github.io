#!/usr/bin/env bash
# Records the raw RielTrack demo on the Android emulator (VIDEOS.md, Method A).
# Before running: RielTrack 1.6 installed, sample data entered (salary $850, PassApp $3.50,
# internet $24.99, shopping 45,000 riel, $500 monthly limit), app open on Home.
# Run from the portfolio folder:  bash scripts/record-rieltrack.sh
# The take saves one real expense (12,000 riel, Food and drinks). Delete it in History before a retake.
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/rieltrack-raw

demo_on
$ADB shell monkey -p com.rieltrack -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 2
tapt "Home" 1.5; swipe 700 1700 400 1      # Home tab, scrolled to the top
has "Add expense" || { echo "RielTrack Home not found"; exit 1; }

TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start rieltrack
sleep 2.5                                   # Home: month at a glance
tapt "Add expense" 1.2
tapt "KHR (៛)" 0.8
typeslow 12000; sleep 1
$ADB shell input keyevent KEYCODE_BACK; sleep 0.6   # hide keyboard
swipe 1500 900 700 0.8
tapt "Food and drinks" 1.2
tapt "Save transaction" 2.8                 # back on Home, totals updated
tapt "History" 2.5
tapt "Reports" 2
swipe 1700 700 1200 2.5                     # spending by category
tapt "Budgets" 2.8
tapt "Home" 2.5
rec_stop rieltrack "$OUT"
echo "Done. Raw take in $OUT"
