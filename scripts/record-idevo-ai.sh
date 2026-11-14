#!/usr/bin/env bash
# Records idevo making a learning path and its lessons with the built-in AI (owner, 2026-11-13).
# The AI runs on the owner's own server (not public yet). Address + token come ONLY from env vars,
# are typed into the app OFF camera, and are wiped by "pm clear" at the end. Never put them in a file.
# WARNING: "pm clear app.idevo.idevo" runs before and after (deletes all idevo data): emulator only.
# Run from the portfolio folder, emulator in dark mode (adb shell cmd uimode night yes):
#   IDEVO_AI_URL=https://... IDEVO_AI_TOKEN=... bash scripts/record-idevo-ai.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/idevo-raw
case "${DEVICE:-emulator-5554}" in emulator-*) ;; *) echo "Refusing: pm clear on a real phone"; exit 1;; esac
[ -n "${IDEVO_AI_URL:-}" ] && [ -n "${IDEVO_AI_TOKEN:-}" ] || { echo "Set IDEVO_AI_URL and IDEVO_AI_TOKEN"; exit 1; }

say() { local i c; for ((i=0; i<${#1}; i++)); do c="${1:i:1}"; [ "$c" = " " ] && c="%s"; $ADB shell input text "'$c'"; sleep 0.06; done; }
# waitc "part of a label" [timeout s]: waits for the AI answer; stops the script if it never comes
waitc() { local i; for ((i=0; i<${2:-60}; i++)); do dump | grep -qF "$1" && return 0; sleep 1; done; echo "TIMEOUT waiting for: $1" >&2; exit 1; }

$ADB shell pm clear app.idevo.idevo >/dev/null
demo_on
$ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 5

# --- off camera: connect the AI (Settings > Set up AI) ---
tapt Settings 2.5
tapc "Set up AI" 2.5
$ADB shell input tap 540 994; sleep 0.8; $ADB shell input text "$IDEVO_AI_URL"        # Server address field
$ADB shell input tap 470 1194; sleep 0.8; $ADB shell input text "$IDEVO_AI_TOKEN"     # Access token field
$ADB shell input keyevent KEYCODE_BACK; sleep 1
tapt "Check and connect" 1
waitc "gpt-oss" 30                                       # Settings row "AI connection · ... · gpt-oss-120b"
$ADB shell input keyevent KEYCODE_BACK; sleep 1.5
tapc "Tab 3 of 4" 2.5                                    # Learn tab with the "Learn with AI" card
has "Make a path with AI" || { echo "AI card not found"; exit 1; }

# --- on camera ---
TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start idevo-ai
sleep 3                                                  # Learn with AI
tapt "Make a path with AI" 2
say "I want to learn Flutter to build a simple app screen"; sleep 1.2
$ADB shell input keyevent KEYCODE_BACK; sleep 1          # keyboard down
tapt "Set up with AI" 1
waitc "Check what AI filled in" 40; sleep 4              # AI filled in name, goal and level
tapt "Create" 2.5                                        # Plan with AI
tapt "4" 1
tapt "Plan the course" 1
waitc "Save 4 modules" 60; sleep 4.5                     # the AI plan: 4 modules to check
tapt "Save 4 modules" 3.5                                # the path with its empty modules
tapt "Write lessons with AI" 2.5
tapt "3" 1
tapt "Draft without questions" 1
waitc "Save 3 lessons" 120; sleep 4.5                    # 3 lesson drafts, each can be edited or unticked
tapt "Save 3 lessons" 2.5                                # saved; the app starts drafting the next module
$ADB shell input keyevent KEYCODE_BACK; sleep 1.5        # leave; if the next module's drafts already started,
has "Discard" && tapt "Discard" 0                        # the app asks "Discard these drafts?" (unsaved ones only)
sleep 3.5                                                # the path: Module 1 with its 3 lessons
rec_stop idevo-ai "$OUT"                                 # screenrecord stops by itself at 180 s: second take for the lesson
TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start idevo-ailesson
sleep 1.5
tapc "Up next" 4.5                                      # the first lesson, marked "AI draft"
swipe 1500 900 900 3                                     # read on a little
# the AI lesson's own "Check yourself" (each AI lesson has 3; 2026-11-14): scroll to the first, show its answer
for i in 1 2 3 4 5 6 7 8 9 10; do has "Show answer" && break; swipe 1700 1000 900 1.5; done
has "Show answer" || { echo "Check yourself not found"; rec_stop idevo-ailesson "$OUT"; demo_off; $ADB shell pm clear app.idevo.idevo >/dev/null; exit 1; }
c=$(center "Show answer"); y=${c#* }; [ "$y" -gt 1500 ] && { swipe 1700 $((1700 - y + 1300)) 900 2; }   # answer area fully on screen
sleep 2
tapt "Show answer" 5                                     # the right answer and its reason
rec_stop idevo-ailesson "$OUT"
demo_off

$ADB shell pm clear app.idevo.idevo >/dev/null && echo "idevo reset (path, lessons and the AI address + token deleted)"
echo "Done. Raw take in $OUT"
