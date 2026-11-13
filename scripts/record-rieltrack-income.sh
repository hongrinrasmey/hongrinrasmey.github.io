#!/usr/bin/env bash
# Records RielTrack adding an income (owner, 2026-11-13: show "add income").
# Sample entry: $150.00, Freelance, today. It is deleted again off camera, so the sample data stays the same.
# Run from the portfolio folder, emulator in light mode (adb shell cmd uimode night no):
#   bash scripts/record-rieltrack-income.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/rieltrack-raw

demo_on
for i in 1 2 3 4; do                                   # get to the tab bar, from wherever the app was left
  $ADB shell monkey -p com.rieltrack -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 2
  has "History" && break; $ADB shell input keyevent KEYCODE_BACK; sleep 1
done
dump | grep -qF 'text="+$150.00"' && { echo "A +\$150.00 entry already exists: delete it first"; exit 1; }
tapt "Home" 1.5; swipe 700 1700 400 1
has "Add income" || { echo "RielTrack Home not found"; exit 1; }

TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start rieltrack-income
sleep 3                                                # Home: income $850.00
tapt "Add income" 2                                    # Income is already chosen, amount in USD
for d in 1 5 0; do $ADB shell input text "$d"; sleep 0.3; done; sleep 2
$ADB shell input keyevent KEYCODE_BACK; sleep 1        # hide keyboard
swipe 1500 900 700 2                                   # income categories
tapt "Freelance" 2.5
tapt "Save transaction" 4.6                            # Home: income now $1,000.00; wait out the snackbar
swipe 1700 1200 600 4                                  # the new income in Recent transactions
rec_stop rieltrack-income "$OUT"
demo_off

# delete the sample income again (off camera)
logev() { :; }
tapt "History" 1.5
tapc 'text="+$150.00' 1.5
dump | grep -qF 'Freelance' && tapt "Delete transaction" 2 || { echo "CHECK: not the sample income, left alone"; exit 1; }
dump | grep -qF 'text="+$150.00"' && echo "CHECK: sample income still there" || echo "Sample income deleted"
tapt "Home" 1
echo "Done. Raw take in $OUT"
