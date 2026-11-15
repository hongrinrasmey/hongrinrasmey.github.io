# Smooths a screen recording whose recorder repeated a frame now and then during motion (KH take: about every 6th
# frame while scrolling), which made scrolls and page animations judder. Each single repeated frame inside motion
# becomes the 50/50 blend of its two neighbours; still parts, page changes and every recording time stay as they are.
#   python video-studio/smooth.py assets/videos/kh-halal-marketplace-raw/kh-165516.mp4
# Reads the frames render.js extracted (<temp>/promo-frames/<take>/) and writes <temp>/promo-frames/<take>-smooth/,
# which render.js uses for a take with "smooth": true. Needs numpy + OpenCV (cv2).
import os, sys, glob, shutil, tempfile
import numpy as np, cv2

base = os.path.splitext(os.path.basename(sys.argv[1]))[0]
src = os.path.join(tempfile.gettempdir(), 'promo-frames', base)
dst = src + '-smooth'
if not os.path.exists(os.path.join(src, 'done')): sys.exit(f'no extracted frames in {src}: run render.js on the storyboard once first')
fs = sorted(glob.glob(os.path.join(src, 'f_*.jpg')))
small = [cv2.resize(cv2.imread(f, cv2.IMREAD_GRAYSCALE), (240, 135), interpolation=cv2.INTER_AREA).astype(np.int16) for f in fs]
d = [0.0] + [float(np.abs(small[i] - small[i - 1]).mean()) for i in range(1, len(small))]   # d[i]: change from frame i-1 to i
# a repeat inside motion: frame i equals i-1, while i-1 and i+1 both moved
dups = [i for i in range(2, len(fs) - 1) if d[i] < 0.05 and d[i - 1] > 0.3 and d[i + 1] > 0.3]
os.makedirs(dst, exist_ok=True)
for f in fs: shutil.copyfile(f, os.path.join(dst, os.path.basename(f)))
for i in dups:
    a, b = cv2.imread(fs[i - 1]), cv2.imread(fs[i + 1])
    cv2.imwrite(os.path.join(dst, os.path.basename(fs[i])), cv2.addWeighted(a, 0.5, b, 0.5, 0), [cv2.IMWRITE_JPEG_QUALITY, 95])

# --scroll (opt-in): a page scroll with repeats is still uneven after the blend (half steps, ghosted text). Each run of
# pure vertical scroll is re-spaced: every frame = the nearest real frame moved a few px to an evenly spaced position
# (the scroll keeps its own ease), rows uncovered by the move come from the neighbour frame. Header rows stay as they are.
def scroll_runs():
    runs, s = [], None
    for i in range(1, len(fs) + 1):
        m = i in moving_set if i < len(fs) else False
        if m and s is None: s = i - 1
        if not m and s is not None: runs.append((s, i - 1)); s = None
    return [r for r in runs if r[1] - r[0] >= 10 and any(r[0] < k <= r[1] for k in dups)]
def shift_of(a, b):   # page moved by dy px from a to b (b[y] = a[y + dy]), fit error
    errs = [(float(np.abs(a[200 + dy:1000 + dy:2, ::4] - b[200:1000:2, ::4]).mean()), dy) for dy in range(-60, 61)]
    return min(errs)[::-1]
n_scroll = 0
if '--scroll' in sys.argv:
    moving_set = set(i for i in range(1, len(fs)) if d[i] > 0.3 or i in dups)
    for a0, a1 in scroll_runs():
        g = [cv2.imread(fs[i], cv2.IMREAD_GRAYSCALE).astype(np.float32) for i in range(a0, a1 + 1)]
        steps = [shift_of(g[k - 1], g[k]) for k in range(1, len(g))]
        dys = [dy for dy, e in steps if e < 1.0]
        if len(dys) < len(steps) or len({np.sign(x) for x in dys if x}) != 1: continue   # not a clean one-way scroll
        hh = int(np.argmax(np.abs(g[0] - g[-1]).mean(axis=1) > 0.5))   # header: rows equal in the first and last frame
        if hh > 200: continue
        pos = np.cumsum([0] + dys)                                   # page offset of every frame of the run
        keep = [0] + [k for k in range(1, len(pos)) if pos[k] != pos[k - 1]]   # real (non-repeated) frames
        if len(keep) == len(pos): continue
        tgt = np.interp(np.linspace(0, len(keep) - 1, len(pos)), range(len(keep)), pos[keep])
        sp = np.convolve(np.pad(np.diff(tgt), 3, mode='edge'), np.ones(7) / 7, 'valid')   # even out the speed (a dropped frame = a double step)
        e = lambda n: (1 - np.cos(np.linspace(0, np.pi, n + 2)[1:-1])) / 2   # ease in/out: the recorded scroll starts and stops dead
        sp[:6] *= e(6); sp[-10:] *= e(10)[::-1]
        tgt = tgt[0] + np.concatenate([[0], np.cumsum(sp)]) * (tgt[-1] - tgt[0]) / sp.sum()
        imgs = {}
        for k, t in enumerate(tgt):
            t = int(round(t)); j = min(keep, key=lambda q: abs(pos[q] - t))
            nb = [q for q in keep if (pos[q] - t) * (pos[j] - t) < 0] or [j]   # a neighbour on the other side of t
            nb = min(nb, key=lambda q: abs(pos[q] - t))
            for q in (j, nb): imgs.setdefault(q, cv2.imread(fs[a0 + q]))
            out = imgs[j].copy(); H = out.shape[0]
            y = np.arange(hh, H)
            for q in (nb, j):                                         # j last: it wins wherever it has the row
                src = y + t - pos[q]; ok = (src >= hh) & (src < H)
                out[y[ok]] = imgs[q][src[ok]]
            cv2.imwrite(os.path.join(dst, os.path.basename(fs[a0 + k])), out, [cv2.IMWRITE_JPEG_QUALITY, 95])
        n_scroll += 1
        st = np.diff(np.round(tgt)); mv = st[np.abs(st) > 0]
        assert len(mv) == len(st) or len(mv) >= len(st) - 2, f'run {a0}-{a1}: still frames left inside the scroll'
        print(f'  scroll {a0 + 1}-{a1 + 1} (frames {(a0) / 30:.2f}-{a1 / 30:.2f} s): {len(pos) - len(keep)} repeats re-spaced, steps {mv.min():.0f}..{mv.max():.0f} px')

open(os.path.join(dst, 'done'), 'w').close()
print(f'{base}: {len(fs)} frames, {len(dups)} repeated frames inside motion blended, {n_scroll} scrolls re-spaced -> {dst}')
# self-check: no single repeat left inside motion
chk = [cv2.resize(cv2.imread(os.path.join(dst, os.path.basename(fs[i])), cv2.IMREAD_GRAYSCALE), (240, 135), interpolation=cv2.INTER_AREA).astype(np.int16) for i in dups[:50]]
prev = [cv2.resize(cv2.imread(os.path.join(dst, os.path.basename(fs[i - 1])), cv2.IMREAD_GRAYSCALE), (240, 135), interpolation=cv2.INTER_AREA).astype(np.int16) for i in dups[:50]]
assert all(np.abs(c - p).mean() > 0.05 for c, p in zip(chk, prev)), 'a blended frame still equals the frame before it'
