#!/usr/bin/env bash
# Records the raw RielTrack demo on the Android emulator (VIDEOS.md, Method A).
# Before running: RielTrack 1.6 installed, sample data entered (salary $850, PassApp $3.50,
# internet $24.99, shopping 45,000 riel, $500 monthly limit), "Food and drinks" as the last-used category.
# Run from the portfolio folder:  bash scripts/record-rieltrack.sh
# The take saves one expense (12,000 riel, Food and drinks); the next run deletes it first.
# It switches the app to Khmer on camera and back to English afterwards.
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/rieltrack-raw

demo_on
for i in 1 2 3 4; do                                 # get to the tab bar, from wherever the app was left
  $ADB shell monkey -p com.rieltrack -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 2
  has "History" && break; $ADB shell input keyevent KEYCODE_BACK; sleep 1
done
tapt "History" 1.5                                  # remove the lunch from an earlier take, if any
if has "Food and drinks"; then tapt "Food and drinks" 1.5; tapt "Delete transaction" 2; fi
tapt "Home" 1.5; swipe 700 1700 400 1                # Home tab, scrolled to the top
has "Add expense" || { echo "RielTrack Home not found"; exit 1; }
GEAR=$(center "Settings")                            # gear position, still valid after the language changes

TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start rieltrack
sleep 2.5                                            # Home: month at a glance
tapt "Add expense" 1.2
tapt "KHR (៛)" 0.8
typeslow 12000; sleep 1
$ADB shell input keyevent KEYCODE_BACK; sleep 0.6    # hide keyboard
swipe 1500 900 700 1.2                               # Food and drinks is already selected
tapt "Save transaction" 2.8                          # back on Home, totals updated
tapt "History" 2.5
tapt "Reports" 2
swipe 1700 700 1200 2.5                              # spending by category
tapt "Budgets" 2.8
tapt "Home" 1.5
tapt "Settings" 1.5
tapt "ខ្មែរ" 2.2                                      # language: Khmer
$ADB shell input keyevent KEYCODE_BACK; sleep 3      # Home in Khmer
rec_stop rieltrack "$OUT"

# back to English (off camera)
logev() { :; }
$ADB shell input tap $GEAR; sleep 1.5
tapt "អង់គ្លេស" 2                                     # "English", written in Khmer
$ADB shell input keyevent KEYCODE_BACK; sleep 1
has "Add expense" && echo "Back in English" || echo "CHECK: app language not restored"
echo "Done. Raw take in $OUT"
