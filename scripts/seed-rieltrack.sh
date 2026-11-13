#!/usr/bin/env bash
# Adds past-dated SAMPLE entries to RielTrack on the emulator, through the app's own form and date
# picker, so History has several days and Reports can compare with last month (VIDEOS.md: demo data only).
# Run ONCE, after the base sample data (salary $850, PassApp $3.50, internet $24.99, shopping 45,000 riel,
# $500 limit). Running it twice adds the entries twice. Dates are for November 2026 (the emulator's month).
# Run from the portfolio folder:  bash scripts/seed-rieltrack.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
logev() { :; }

TODAY_LABEL="$(date '+%A, %-d %B %Y')"      # the form shows today's date like "Thursday, 12 November 2026"

home() {
  for i in 1 2 3 4; do
    $ADB shell monkey -p com.rieltrack -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 1.5
    has "History" && break; $ADB shell input keyevent KEYCODE_BACK; sleep 1
  done
  tapt "Home" 1.2; swipe 700 1700 400 0.8
}
# add KIND AMOUNT CURRENCY PREV_MONTH(0/1) "Day label in the picker" "Category"
add() {
  home
  if [ "$1" = income ]; then tapt "Add income" 1.5; else tapt "Add expense" 1.5; fi
  [ "$3" = KHR ] && tapt "KHR (៛)" 0.8
  $ADB shell input text "$2"; sleep 0.6
  $ADB shell input keyevent KEYCODE_BACK; sleep 0.8
  tapt "$TODAY_LABEL" 1.5
  [ "$4" = 1 ] && tapt "Change to previous month" 1
  tapt "$5" 0.8
  tapt "OK" 1
  swipe 1500 700 500 1
  tapt "$6" 0.8
  tapt "Save transaction" 2
  has "Add expense" && echo "added: $1 $2 $3 $5 $6" || { echo "NOT BACK ON HOME after $5"; exit 1; }
}

if [ "${1:-}" != extra ]; then
add income  850   USD 1 "Thursday, October 1, 2026"      "Salary"
add expense 15000 KHR 1 "Saturday, October 10, 2026"     "Food and drinks"
add expense 4     USD 1 "Thursday, October 15, 2026"     "Transportation"
add expense 24.99 USD 1 "Tuesday, October 20, 2026"      "Bills and utilities"
add expense 30000 KHR 1 "Sunday, October 25, 2026"       "Shopping"
add expense 10000 KHR 0 "Tuesday, November 3, 2026"      "Food and drinks"
add expense 2.50  USD 0 "Saturday, November 7, 2026"     "Transportation"
add expense 8000  KHR 0 "Monday, November 9, 2026"       "Food and drinks"
add expense 14000 KHR 0 "Wednesday, November 11, 2026"   "Food and drinks"
fi
# early-October spending, so Home's "compared with the same days last month" is a normal number
# (without it: ~1340% more). Already seeded before 2026-11-13? Run only these: bash scripts/seed-rieltrack.sh extra
add expense 40000 KHR 1 "Friday, October 2, 2026"        "Shopping"
add expense 3     USD 1 "Tuesday, October 6, 2026"       "Transportation"
add expense 20    USD 1 "Thursday, October 8, 2026"      "Bills and utilities"
add expense 12000 KHR 1 "Monday, October 12, 2026"       "Food and drinks"
echo "Seed done."
