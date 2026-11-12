# Shared adb helpers for the record-*.sh scripts (see VIDEOS.md).
# Finds UI elements by their visible text / content-desc, so no tap coordinates are guessed.
export MSYS_NO_PATHCONV=1                       # Git Bash on Windows: keep /sdcard paths as they are
ADB_BIN="${ADB_BIN:-/e/Android/sdk/platform-tools/adb.exe}"
ADB="$ADB_BIN -s ${DEVICE:-emulator-5554}"      # emulator by default: never touches a real phone

dump() { $ADB shell uiautomator dump /sdcard/ui.xml >/dev/null; $ADB shell cat /sdcard/ui.xml; }
# center "exact label" -> "x y" centre of the first element whose text or content-desc equals the label
center() {
  dump | tr '>' '\n' | grep -F -e "text=\"$1\"" -e "content-desc=\"$1\"" | head -1 \
    | grep -oE 'bounds="\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]"' | grep -oE '[0-9]+' | tr '\n' ' ' \
    | awk 'NF==4{print int(($1+$3)/2), int(($2+$4)/2)}'
}
# tapt "exact label" [wait seconds] -> stops the script if the label is not on screen
tapt() {
  local c; c=$(center "$1")
  [ -z "$c" ] && { echo "NOT FOUND: $1 (stopping)" >&2; exit 1; }
  logev tap "$c" "$1"
  $ADB shell input tap $c; sleep "${2:-1}"
}
# logev kind "x y" label -> "seconds-since-rec_start kind x y label" into $TAPLOG (used to draw tap ripples)
logev() { [ -n "${TAPLOG:-}" ] && echo "$(awk -v a="$(date +%s.%N)" -v b="$REC_T0" 'BEGIN{printf "%.3f", a-b}') $1 $2 $3" >> "$TAPLOG"; return 0; }
has() { [ -n "$(center "$1")" ]; }
# tapc "part of label" [wait] -> like tapt, but the label only has to contain the text (e.g. tabs with badges)
tapc() {
  local c; c=$(dump | tr '>' '\n' | grep -F -e "$1" | grep -E '(text|content-desc)="' | head -1 \
    | grep -oE 'bounds="\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]"' | grep -oE '[0-9]+' | tr '\n' ' ' \
    | awk 'NF==4{print int(($1+$3)/2), int(($2+$4)/2)}')
  [ -z "$c" ] && { echo "NOT FOUND: *$1* (stopping)" >&2; exit 1; }
  logev tap "$c" "$1"
  $ADB shell input tap $c; sleep "${2:-1}"
}
# typeslow "12000" -> types one character at a time, like a person
typeslow() { local i; for ((i=0; i<${#1}; i++)); do $ADB shell input text "${1:i:1}"; sleep 0.15; done; }
swipe() { logev swipe "540 $1" "to$2"; $ADB shell input swipe 540 "$1" 540 "$2" "${3:-700}"; sleep "${4:-1}"; }

demo_on() {
  $ADB shell settings put global sysui_demo_allowed 1
  for c in "enter" "clock -e hhmm 0941" "battery -e level 100 -e plugged false" \
           "network -e mobile hide" "network -e wifi show -e level 4 -e fully true" \
           "notifications -e visible false"; do
    $ADB shell am broadcast -a com.android.systemui.demo -e command $c >/dev/null
  done
  # demo mode can't hide Android's "No screen lock" safety notification (a shield next to the clock):
  # snooze it for 3 hours; it comes back by itself
  local k; for k in $($ADB shell dumpsys notification --noredact | grep -oE "key=0\|android\|2345\|[^ :]+\|1000" | sort -u | sed 's/^key=//'); do
    $ADB shell "cmd notification snooze --for 10800000 '$k'" >/dev/null
  done
}
demo_off() {
  $ADB shell am broadcast -a com.android.systemui.demo -e command exit >/dev/null
  $ADB shell settings put global sysui_demo_allowed 0
}
# rec_start name / rec_stop name outdir -> screen recording on the device, pulled to outdir, then deleted there
rec_start() { $ADB shell "screenrecord --bit-rate 12000000 /sdcard/$1.mp4" & REC_PID=$!; REC_T0=$(date +%s.%N); sleep 1.5; }
rec_stop() {
  sleep 1; $ADB shell pkill -INT screenrecord; wait "$REC_PID" 2>/dev/null; sleep 1.5
  mkdir -p "$2"; local f="$2/$1-$(date +%H%M%S)"
  $ADB pull "/sdcard/$1.mp4" "$f.mp4" && $ADB shell rm "/sdcard/$1.mp4"
  [ -n "${TAPLOG:-}" ] && mv "$TAPLOG" "$f.taps.txt"
  $ADB shell rm -f /sdcard/ui.xml
}
