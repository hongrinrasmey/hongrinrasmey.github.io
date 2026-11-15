#!/usr/bin/env bash
# Records idevo's AI turning a lesson into flashcards (owner, 2026-11-15).
# Lesson: the app's own sample lesson "Test yourself" (retrieval practice), so the cards lead into
# the flashcard review in the promo. Study this lesson > Turn it into flashcards > 5 > Draft them >
# the AI's 5 cards (checked before saving) > Save 5 flashcards.
# The AI runs on the owner's own server. Address + token come ONLY from env vars, are typed into
# the app OFF camera, and are wiped by "pm clear" at the end. Never put them in a file.
# WARNING: "pm clear app.idevo.idevo" runs before and after (deletes all idevo data): emulator only.
# Run from the portfolio folder, emulator in dark mode (adb shell cmd uimode night yes):
#   IDEVO_AI_URL=https://... IDEVO_AI_TOKEN=... bash scripts/record-idevo-cards.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/idevo-raw
case "${DEVICE:-emulator-5554}" in emulator-*) ;; *) echo "Refusing: pm clear on a real phone"; exit 1;; esac
[ -n "${IDEVO_AI_URL:-}" ] && [ -n "${IDEVO_AI_TOKEN:-}" ] || { echo "Set IDEVO_AI_URL and IDEVO_AI_TOKEN"; exit 1; }
# However the script ends (a step not found, a time-out, Ctrl+C): stop recording, wipe the AI token, demo mode off
trap '$ADB shell pkill -INT screenrecord >/dev/null 2>&1; $ADB shell pm clear app.idevo.idevo >/dev/null; demo_off' EXIT
waitc() { local i; for ((i=0; i<${2:-60}; i++)); do dump | grep -qF "$1" && return 0; sleep 1; done; echo "TIMEOUT waiting for: $1" >&2; exit 1; }

$ADB shell pm clear app.idevo.idevo >/dev/null
$ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 5

# --- off camera: load the sample path, connect the AI, open the lesson at "Study this lesson" ---
tapt "Choose something to learn" 1.5
tapt "Or try a sample path" 2.5
tapt "Start: Test yourself" 2.5
$ADB shell input keyevent KEYCODE_BACK; sleep 1.5            # path screen
$ADB shell input keyevent KEYCODE_BACK; sleep 1.5            # Learn tab
tapc "Tab 1 of 4" 2
tapt Settings 2.5
tapc "Set up AI" 2.5
$ADB shell input tap 540 994; sleep 0.8; $ADB shell input text "$IDEVO_AI_URL"        # Server address field
$ADB shell input tap 470 1194; sleep 0.8; $ADB shell input text "$IDEVO_AI_TOKEN"     # Access token field
$ADB shell input keyevent KEYCODE_BACK; sleep 1
tapt "Check and connect" 1
waitc "gpt-oss" 30
$ADB shell input keyevent KEYCODE_BACK; sleep 1.5
tapc "Tab 3 of 4" 2
tapc "Learn how to learn" 2
tapt "Continue: Test yourself" 2.5
for i in 1 2 3 4 5 6; do has "Turn it into flashcards" && break; swipe 1700 1000 700 1.2; done
swipe 1700 1300 700 1.5                                  # "Study this lesson" in the lower middle
has "Turn it into flashcards" || { echo "flashcard tool not found"; exit 1; }
demo_on

# --- on camera ---
TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start idevo-cards
sleep 2
tapt "Turn it into flashcards" 2.5                       # Flashcards with AI
tapt "5" 1
tapt "Draft them" 1
waitc "untick anything before saving" 120; sleep 4.5    # 5 AI drafts, each can be edited or unticked
for i in 1 2 3; do has "Save 5 flashcards" && break; swipe 1700 1000 900 1.5; done   # save button is below the list
sleep 1
tapt "Save 5 flashcards" 4                              # back on the lesson: "5 flashcards added. They are due now."
rec_stop idevo-cards "$OUT"
demo_off

$ADB shell pm clear app.idevo.idevo >/dev/null && echo "idevo reset (sample path, cards and the AI address + token deleted)"
echo "Done. Raw take in $OUT"
