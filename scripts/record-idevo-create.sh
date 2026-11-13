#!/usr/bin/env bash
# Records idevo creating a learning path with one module and one lesson (owner, 2026-11-13: show "create a lesson").
# Sample text only: the topic is the app's own example ("Flutter basics"), the lesson is two plain sentences.
# WARNING: "pm clear app.idevo.idevo" runs before and after (deletes all idevo data): emulator only.
# Run from the portfolio folder, emulator in dark mode (adb shell cmd uimode night yes):
#   bash scripts/record-idevo-create.sh
set -u
cd "$(dirname "$0")/.."
. scripts/lib-adb.sh
OUT=assets/videos/idevo-raw
case "${DEVICE:-emulator-5554}" in emulator-*) ;; *) echo "Refusing: pm clear on a real phone"; exit 1;; esac

# typing like a person: one character at a time (adb needs %s for a space)
say() { local i c; for ((i=0; i<${#1}; i++)); do c="${1:i:1}"; [ "$c" = " " ] && c="%s"; $ADB shell input text "'$c'"; sleep 0.06; done; }

$ADB shell pm clear app.idevo.idevo >/dev/null
demo_on
$ADB shell monkey -p app.idevo.idevo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 5
tapc "Tab 3 of 4" 2                                     # Learn tab: "What do you want to learn?"
has "Create a learning path" || { echo "Learn empty state not found"; exit 1; }

TAPLOG=$(mktemp); : > "$TAPLOG"
rec_start idevo-create
sleep 3                                                  # Learn: make a path from your own words
tapt "Create a learning path" 2
say "Flutter basics"; sleep 0.8
tapc "What should you be able to do after" 0.8
say "Build a simple app screen"; sleep 1.5              # level stays Beginner
tapt "Create" 3.5                                        # empty path: add the first module
tapt "Add module" 1.5
say "Basics"; sleep 0.8
tapt "Add" 3                                             # Module 1 · Basics
# the "Add lesson" row is merged with the path header in the accessibility tree (one node, bounds
# [0,304][1080,1139]); the row is its last 242 px. Tap the row, after checking the node is where it was measured.
b=$(dump | tr '>' '\n' | grep -F 'Add lesson' | grep -oE 'bounds="[^"]+"' | tail -1)
[ "$b" = 'bounds="[0,304][1080,1139]"' ] || { echo "Add lesson row moved ($b): stopping"; exit 1; }
logev tap "300 897" "Add lesson"; $ADB shell input tap 300 897; sleep 2
say "What is a widget?"; sleep 0.6
tapc "Explain the idea" 0.6
say "Everything you see in a Flutter app is a widget. Widgets sit inside other widgets to build the screen."; sleep 2
tapt "Save" 4.5                                          # the new lesson, ready to study
$ADB shell input keyevent KEYCODE_BACK; sleep 4          # the path with its first lesson
swipe 1300 1260 300 1.5                                 # tiny scroll: screenrecord writes the last frames
rec_stop idevo-create "$OUT"
demo_off

$ADB shell pm clear app.idevo.idevo >/dev/null && echo "idevo reset (sample path, module and lesson deleted)"
echo "Done. Raw take in $OUT"
