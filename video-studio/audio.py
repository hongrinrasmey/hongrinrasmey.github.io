# Adds music + soft sound effects to a rendered promo (opt-in: only storyboards with an "audio" block).
#   python video-studio/audio.py video-studio/kh-halal-marketplace.json [--portrait] [--out test.mp4]
# Reads the silent video (assets/videos/silent/<name>.mp4: refreshed whenever assets/videos/<name>.mp4 is a new silent render; --silent <file> for tests), asks render.js for the
# real event times (cuts, taps, labels, flip, outro), mixes music + effects at -16 LUFS / <= -1 dBTP, and writes
# assets/videos/<name>.mp4 (H.264 copied untouched + AAC 48 kHz stereo 192 kbps). Audio files live in
# video-studio/audio/ (git-ignored: the Pixabay license forbids passing the tracks on by themselves).
# Needs ffmpeg + numpy, and the same NODE_PATH as render.js. See video-studio/README.md, "Sound".
import atexit, json, os, re, shutil, subprocess, sys, tempfile
import numpy as np

SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
AUD = os.path.join(HERE, 'audio')

# sound -> (file in video-studio/audio/, gain dB after peak-normalising it[, keep N seconds[, starting at S s]]).
SOUNDS = {
    'mouse': ('mouse.mp3', 0), 'tap': ('tap.mp3', -6, .3), 'key': ('keys.mp3', -7), 'swoosh': ('swoosh.mp3', -11),
    'clean': ('clean.mp3', -10), 'pop': ('pop.mp3', -12, .16), 'chime': ('chime.mp3', -10), 'sparkle': ('sparkle.mp3', -11),
    'flip': ('cardflip.mp3', -9), 'toggle': ('toggle.mp3', -8), 'tick': ('tick.mp3', -12, .45),
    'hit': ('hit.mp3', -9, .55), 'riser': ('riser.mp3', -14, None, .82), 'bloom': ('bloom.mp3', -8, 2.0),
    'shimmer': ('shimmer.mp3', -20, 2.0, 2.3),
    # "cooler" set (owner 2026-11-14: "the sound effect is not cool enough")
    'fxwhoosh': ('fx-whoosh.mp3', -10, .6), 'glitch': ('fx-glitch.mp3', -8, None, 1.6), 'fxhit': ('fx-hit.mp3', -9, 1.0),
    'notify': ('fx-notify.mp3', -8, .7), 'boom': ('fx-boom.mp3', -7, 1.7),
}
# moment kind -> default sound (a storyboard's "labelSfx" / "tapSfx" picks another for one label or tap)
KIND = {'enter': 'swoosh', 'chapter': 'swoosh', 'tap': 'tap', 'key': 'key', 'label': 'pop', 'swipe': 'swoosh',
        'duoIn': 'clean', 'duoOut': 'clean', 'text': 'pop', 'hook': 'pop', 'outro': 'clean', 'cta': 'pop'}
# "kit": true in the audio block = the shared AUDIO.md 5b kit: no chapter or CTA sound, labels silent unless named in labelSfx,
# text hit on hook + text lines (last hook line +3 dB), riser into the outro + bloom on it, no swipe sounds,
# music dips only under hero sounds ("extra" with dB > 0, and the outro)
KIT = {'enter': 'fxwhoosh', 'chapter': None, 'label': None, 'swipe': None, 'text': None, 'hook': None, 'outro': 'boom', 'cta': None}   # no chapter/CTA tick: owner 2026-11-14 ("the beep sound always come up"); no text/hook hit: owner 2026-11-15 ("bom bom" when the words pop up)
LOWER = {'chapter': -3, 'swipe': -5, 'label': -2}   # extra dB for the busier kinds
PRIORITY = ['extra', 'enter', 'duoIn', 'duoOut', 'outro', 'text', 'hook', 'tap', 'key', 'cta', 'label', 'chapter', 'swipe']   # earlier wins a clash


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, **kw)
    if r.returncode: sys.exit(f'failed: {" ".join(cmd[:4])} ...\n{r.stderr.decode(errors="replace")[-1500:]}')
    return r


def decode(path):   # any audio file -> float32 stereo at 48 kHz
    raw = run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-']).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()


def duration(path):
    return float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path]).stdout)


def has_audio(path):
    return bool(run(['ffprobe', '-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', path]).stdout.strip())


def fade(n, kind):   # equal-power curve 0 -> 1 over n samples
    x = np.linspace(0, 1, max(n, 1), dtype=np.float32)
    return np.sin(x * np.pi / 2) if kind == 'in' else np.cos(x * np.pi / 2)


def music(a, total, tall):
    tr = decode(os.path.join(AUD, a['track']))
    parts = a.get('partsTall') if tall and a.get('partsTall') else a['parts']   # [[from, to], ...] track seconds, cut on beats
    xf = int(a.get('xfade', 0.25) * SR); h = xf // 2   # crossfade centred on each jump: the beat grid runs on unbroken
    out = np.zeros((0, 2), np.float32)
    for i, (s, e) in enumerate(parts):
        s0 = int(s * SR) - (h if i else 0); e0 = int(e * SR) + (h if i < len(parts) - 1 else 0)
        seg = tr[max(s0, 0):e0].copy()
        if i and len(out) >= xf and len(seg) >= xf:   # equal-power crossfade into the next part
            seg[:xf] *= fade(xf, 'in')[:, None]; out[-xf:] *= fade(xf, 'out')[:, None]
            out[-xf:] += seg[:xf]; seg = seg[xf:]
        out = np.concatenate([out, seg])
    start = int(a.get('at', 0) * SR)
    m = np.zeros((int(total * SR), 2), np.float32)
    seg = out[:len(m) - start]; m[start:start + len(seg)] = seg
    fi, fo = int(a.get('fadeIn', 0.4) * SR), int(a.get('fadeOut', 1.5) * SR)
    m[start:start + fi] *= fade(fi, 'in')[:, None]
    end = start + len(seg); m[end - fo:end] *= fade(fo, 'out')[:, None]
    return m * 10 ** (a.get('gain', 0) / 20)


def keystrokes(cfg, a, ev):
    # "typing": [{"take", "from", "to", "x", "y", "w", "h"}] = where text is typed by a script (no tap logged):
    # one key sound per new character, found from the cached recording frames (render.js extracts them)
    out = []
    for k in a.get('typing', []):
        take = k.get('take', 'main'); raw = cfg['raw'] if take == 'main' else cfg['takes'][take]['raw']
        d = os.path.join(tempfile.gettempdir(), 'promo-frames', os.path.splitext(os.path.basename(raw))[0])
        prev, last = None, -9
        for n in range(round(k['from'] * 30) + 1, round(k['to'] * 30) + 2):
            f = os.path.join(d, f'f_{n:05d}.jpg')
            x = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-vf', f"crop={k['w']}:{k['h']}:{k['x']}:{k['y']},format=gray", '-f', 'rawvideo', '-'],
                               capture_output=True).stdout
            x = np.frombuffer(x, np.uint8).reshape(k['h'], k['w']).astype(np.int16)
            if prev is not None:
                cols = np.nonzero((np.abs(x - prev) > 40).any(0))[0]
                t = (n - 1) / 30
                if len(cols) and cols[-1] - cols[0] > 30 and t - last > .08:   # a new character (the 4 px cursor blink is ignored)
                    last = t
                    for i, m in enumerate(ev['fm']):   # first output frame that shows this recording moment
                        if m and m[0] == take and t - 1 / 60 <= m[1] < t + .05: out.append(round(i / 30, 3)); break   # same rounding as the frame shown
            prev = x
    return out


def load(f, trim=None, start=0):   # peak-normalised effect + where its loudest point is; "keys.mp3" -> its single keystrokes
    x = decode(os.path.join(AUD, f))[int(start * SR):]
    if trim:   # several hits or a long tail: keep the first part, faded out (old 5 ms fade for the short ones)
        x = x[:int(trim * SR)].copy(); n = 240 if trim < .5 else int(.25 * trim * SR); x[-n:] *= np.linspace(1, 0, n, dtype=np.float32)[:, None]
    x /= max(np.abs(x).max(), 1e-6)
    env = np.convolve(np.abs(x).mean(1), np.ones(480) / 480, 'same')
    if f != 'keys.mp3': return [(x, int(np.argmax(env)))]
    hits, i, n = [], 0, int(.12 * SR)   # each keystroke: from 5 ms before its attack, 120 ms long
    while i < len(env):
        if env[i] > .25 * env.max():
            a = max(i - 240, 0); hits.append((x[a:a + n].copy(), i - a)); i += int(.09 * SR)
        else: i += 1
    for h, _ in hits: h[-480:] *= np.linspace(1, 0, 480, dtype=np.float32)[:, None]   # no click at the cut
    return hits or [(x, int(np.argmax(env)))]


def effects(cfg, ev, total, a, keys):
    web = cfg['device']['type'] == 'browser'
    lab, tsx = a.get('labelSfx', {}), a.get('tapSfx', {})
    kinds = {'enter': [(ev['devIn'], '')], 'chapter': [(t, '') for t in ev['chapters']], 'tap': [tuple(x) for x in ev['taps']],
             'key': [(t, '') for t in keys], 'label': [tuple(x) for x in ev['labels']], 'swipe': [(t, '') for t in ev['swipes']],
             'duoIn': [(d[0], '') for d in ev['duo']], 'duoOut': [(d[1], '') for d in ev['duo']], 'text': [(t, '') for t in ev['texts']],
             'hook': [(t, '') for t in ev['hook']], 'outro': [(ev['outro'], '')], 'cta': [(ev['cta'], '')]}
    kit = a.get('kit'); dflt = dict(KIND, **KIT) if kit else KIND
    kinds['extra'] = [(e[0], e[1]) for e in a.get('extra', [])]   # [[time, sound, dB?], ...]: one-off moments (hero chime, flip swoosh)
    xdb = {(e[0], e[1]): (e[2] if len(e) > 2 else 0) for e in a.get('extra', [])}
    off = set(a.get('sfxOff', []))   # e.g. ["chapter"] to switch a kind off for one video
    placed = []                      # one effect per moment: the more important kind wins within 0.2 s (a tap logged twice plays once)
    for k in PRIORITY:
        if k in off: continue
        for t, what in kinds[k]:
            snd = what if k == 'extra' else (lab.get(what) if k == 'label' else tsx.get(what) if k == 'tap' else None) or dflt[k]
            if not snd: continue
            if snd == 'tap' and web: snd = 'mouse'
            db = xdb[(t, what)] if k == 'extra' else 3 if (k == 'hook' and kit and t == max(ev['hook'])) else 0
            if 0 <= t < total and (snd == 'riser' or all(abs(t - p) > 0.2 for p, _, s2, _ in placed if s2 != 'riser')): placed.append((t, k, snd, db))
    if kit and 'outro' not in off: placed.append((ev['outro'], 'rise', 'riser', 0))   # peak-aligned: the swell ends as the title lands
    sfx, hero, cache, n = np.zeros((int(total * SR), 2), np.float32), np.zeros((int(total * SR), 2), np.float32), {}, 0
    for t, k, snd, xd in sorted(placed):
        f, db, *trim = SOUNDS[snd]
        if (f, *trim) not in cache: cache[(f, *trim)] = load(f, *trim)
        hits = cache[(f, *trim)]; x, pk = hits[n % len(hits)]; n += 1   # typing: a different key each time
        i = int(t * SR) - pk; x = x * 10 ** ((db + xd + LOWER.get(k, 0)) / 20)
        a0, b0 = max(i, 0), min(i + len(x), len(sfx))
        if b0 > a0:
            sfx[a0:b0] += x[a0 - i:b0 - i]
            if xd > 0 or k == 'outro': hero[a0:b0] += x[a0 - i:b0 - i]
    for b0, b1, snd in a.get('beds', []):   # [[from, to, sound]]: a quiet layer under a sped-up part (AI shimmer), 0.3 s fades
        f, db, *trim = SOUNDS[snd]
        x = decode(os.path.join(AUD, f))[int((trim[1] if len(trim) > 1 else 0) * SR):]
        x = x / max(np.abs(x).max(), 1e-6) * 10 ** (db / 20); L = min(int((b1 - b0) * SR), len(x)); x = x[:L].copy()
        fd = min(int(.3 * SR), L // 2); x[:fd] *= fade(fd, 'in')[:, None]; x[L - fd:] *= fade(fd, 'out')[:, None]
        s0 = int(b0 * SR); sfx[s0:s0 + L] += x[:len(sfx) - s0]
        placed.append((b0, 'bed', snd, 0))
    return sfx, (hero if kit else sfx), [(t, f'{k}:{snd}') for t, k, snd, _ in sorted(placed)]


def duck(m, sfx, db):   # music dips by db while an effect sounds (30 ms down, 250 ms back)
    on = (np.abs(sfx).max(1) > 10 ** (-40 / 20)).astype(np.float32)
    g = np.empty_like(on); y = 0.0
    up, dn = 1 - np.exp(-1 / (0.03 * SR)), 1 - np.exp(-1 / (0.25 * SR))
    for i, v in enumerate(on):   # one-pole follower; fine for < 1 min of audio
        y += (v - y) * (up if v > y else dn); g[i] = y
    return m * (1 - (1 - 10 ** (-db / 20)) * g)[:, None]


def loudness(path):
    err = run(['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-map', '0:a', '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr.decode()
    summ = err[err.rfind('Summary:'):]
    return float(re.search(r'I:\s+(-?[\d.]+) LUFS', summ).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+) dBFS', summ).group(1))


def main():
    args = sys.argv[1:]; cfg_path = os.path.abspath(args[0]); tall = '--portrait' in args
    cfg = json.load(open(cfg_path, encoding='utf-8')); a = cfg.get('audio')
    if '--audio' in args: a = dict(a or {}, **json.loads(args[args.index('--audio') + 1]))   # try another track: --audio '{"track": ..., "parts": ...}'
    if not a: sys.exit('no "audio" block in this storyboard: nothing to do')
    name = (cfg.get('out') or cfg['slug'] + '-promo') + ('-mobile' if tall else '')
    video = os.path.join(ROOT, 'assets', 'videos', name + '.mp4')
    silent = os.path.join(ROOT, 'assets', 'videos', 'silent', name + '.mp4')
    if '--silent' in args: silent = os.path.abspath(args[args.index('--silent') + 1])   # test: mix onto another silent render
    elif not has_audio(video):   # a fresh silent render: it becomes the silent copy (an older copy would put sound on the old picture)
        os.makedirs(os.path.dirname(silent), exist_ok=True); shutil.copy2(video, silent)
    elif not os.path.exists(silent): sys.exit(f'{video} already has sound and there is no silent copy: re-render it first')
    total = duration(silent)
    tmp = tempfile.mkdtemp(prefix='promo-audio-')
    atexit.register(shutil.rmtree, tmp, True)   # removed however the mix ends (a failed check exits early; the wav files are 20+ MB)
    evp = os.path.join(tmp, 'events.json')
    run(['node', os.path.join(HERE, 'render.js'), cfg_path, '--events', evp] + (['--portrait'] if tall else []), cwd=ROOT)
    ev = json.load(open(evp))
    if abs(ev['total'] - total) > 0.1: sys.exit(f'storyboard ({ev["total"]:.2f} s) and silent video ({total:.2f} s) differ: re-render first')

    m = music(a, total, tall)
    sfx, hero, placed = effects(cfg, ev, total, a, keystrokes(cfg, a, ev))
    def measure(x, name):   # loudnorm's first pass on a mix
        w = os.path.join(tmp, name)
        run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', w], input=x.astype(np.float32).tobytes())
        r = run(['ffmpeg', '-hide_banner', '-i', w, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-']).stderr.decode()
        return w, json.loads(r[r.rfind('{'):r.rfind('}') + 1])
    target = -16.0
    if a.get('musicDown'):   # "musicDown": dB (owner 2026-11-15: song a little lower) = song quieter by dB, effects exactly as loud as without it
        _, j0 = measure(duck(m, hero, a.get('duck', 5)) + sfx, 'ref.wav')
        m = m * 10 ** (-a['musicDown'] / 20)
    mix = duck(m, hero, a.get('duck', 5)) + sfx
    wav, j = measure(mix, 'mix.wav')
    if a.get('musicDown'): target = round(-16 + float(j['input_i']) - float(j0['input_i']), 2)   # same gain as the reference mix
    # two-pass loudnorm to -16 LUFS (or the musicDown target); true peak aimed at -1.5, then a -3 dBFS limiter (peaky hits over quiet songs; -2 let one mix reach -0.7 dBTP) so the AAC encode stays <= -1.0 dBTP
    ln = (f"loudnorm=I={target}:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}"
          f":measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
    out = os.path.abspath(args[args.index('--out') + 1]) if '--out' in args else video
    part = re.sub(r'\.mp4$', '', out, flags=re.I) + '.part.mp4'   # out is replaced only by a finished mix that passed the loudness check
    def encode(trim_db=0.0):
        run(['ffmpeg', '-v', 'error', '-y', '-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
             '-af', ln + f',volume={trim_db}dB,alimiter=limit=0.708:attack=1:release=60:level=false,aresample=48000', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-t', f'{total:.3f}',
             '-movflags', '+faststart', part])
        return loudness(part)
    lufs, tp = encode()
    if tp > -1.0: lufs, tp = encode(-(tp + 1.3))   # AAC overshoot on bass-heavy songs: once more, quieter by exactly the excess
    print(f'{name}: {total:.2f} s, {len(placed)} effects, {lufs:.1f} LUFS, true peak {tp:.1f} dBTP -> {out} '
          f'({os.path.getsize(part) / 1e6:.2f} MB)')
    for t, k in placed: print(f'  {t:6.2f}  {k}')
    if not (abs(lufs - target) <= 1 and tp <= -1.0): sys.exit(f'LOUDNESS OUT OF RANGE (target {target} LUFS): {out} not changed, the mix is in {part}')
    os.replace(part, out)


if __name__ == '__main__':
    main()
