# Cut the owner out of the blue studio backdrop -> assets/images/me.webp (800x1000, transparent).
# Run: python -I tools/photo-cutout.py tools/source/photo_2025-03-15_09-31-46.jpg assets/images/me.webp
import sys, numpy as np
from PIL import Image
from scipy import ndimage as nd
src, out = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
h, w, _ = im.shape
bg = np.median(np.concatenate([im[:40, :40].reshape(-1,3), im[:40, -40:].reshape(-1,3)]), 0)
dist = np.linalg.norm(im - bg, axis=2)
near = dist < 60
lab, _ = nd.label(near)
seeds = set(np.unique(np.concatenate([lab[0], lab[:, 0], lab[:, -1]]))) - {0}
bgmask = np.isin(lab, list(seeds))          # blue touching top/sides only: tie survives
top = np.arange(h)[:, None] < h * 0.6       # above the tie: any blue gap (between hairs) is backdrop too
bgmask |= near & top
# soft edge: alpha ramps over the colour distance inside a thin band round the hard mask
band = nd.binary_dilation(bgmask, iterations=3) & ~nd.binary_erosion(bgmask, iterations=3)
a = np.where(bgmask, 0.0, 1.0)
ramp = np.clip((dist - 25) / 80, 0, 1)
a = np.where(band, ramp, a)
a = nd.gaussian_filter(a, 0.7); a[~nd.binary_dilation(bgmask, iterations=4)] = 1
# despill: edge pixels lose the blue cast
# despill: near the cut, no channel may beat red (hair/suit go neutral, skin stays warm)
rgb = im.copy(); edge = nd.binary_dilation(bgmask, iterations=6) | top
r = rgb[..., 0]
rgb[..., 1] = np.where(edge, np.minimum(rgb[..., 1], r + 4), rgb[..., 1])
rgb[..., 2] = np.where(edge, np.minimum(rgb[..., 2], r), rgb[..., 2])
ch = round(w * 5 / 4)
# premultiplied resize, so hidden blue under transparent pixels can't bleed into the edge
def rs(x): return np.asarray(Image.fromarray(x.astype(np.float32), 'F').resize((800, 1000), Image.LANCZOS))
A = rs(a[:ch]); P = [rs(np.clip(rgb[:ch, :, k], 0, 255) * a[:ch]) for k in range(3)]
A = np.clip(A, 0, 1); safe = np.maximum(A, 1e-3)
C = np.dstack([np.clip(p / safe, 0, 255) for p in P]); C[A < 1e-3] = 0
img = Image.fromarray(np.dstack([C, A * 255]).round().astype(np.uint8))
img.save(out, 'WEBP', quality=82, method=6)
assert img.mode == 'RGBA' and img.size == (800, 1000)
al = np.asarray(img)[..., 3]
print('transparent share', round((al < 10).mean(), 3), 'tie alpha', al[900, 400])
