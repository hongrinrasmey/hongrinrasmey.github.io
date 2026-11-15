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
open(os.path.join(dst, 'done'), 'w').close()
print(f'{base}: {len(fs)} frames, {len(dups)} repeated frames inside motion blended -> {dst}')
# self-check: no single repeat left inside motion
chk = [cv2.resize(cv2.imread(os.path.join(dst, os.path.basename(fs[i])), cv2.IMREAD_GRAYSCALE), (240, 135), interpolation=cv2.INTER_AREA).astype(np.int16) for i in dups[:50]]
prev = [cv2.resize(cv2.imread(fs[i - 1], cv2.IMREAD_GRAYSCALE), (240, 135), interpolation=cv2.INTER_AREA).astype(np.int16) for i in dups[:50]]
assert all(np.abs(c - p).mean() > 0.05 for c, p in zip(chk, prev)), 'a blended frame still equals the frame before it'
