# Make the smaller screenshot copies that phones and laptops download (the srcset lists in index.html).
# Run after replacing a screenshot:   python -I tools/small-copies.py
# For every "name-960.webp 960w" in a srcset it writes assets/images/name-960.webp from name.webp.
import os, re
from PIL import Image

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html = open(os.path.join(root, 'index.html'), encoding='utf-8').read()
html = re.sub(r'<!--.*?-->', '', html, flags=re.S)
copies = sorted(set(re.findall(r'(assets/images/[\w-]+)-(\d+)\.webp \2w', ' '.join(re.findall(r'srcset="([^"]+)"', html)))))
assert copies, 'no "-960.webp 960w" entries in a srcset in index.html'

for base, width in copies:
    w = int(width)
    im = Image.open(os.path.join(root, base + '.webp'))
    assert im.width > w, f'{base}.webp is only {im.width}px wide, smaller than its {w}w copy'
    out = os.path.join(root, f'{base}-{w}.webp')
    im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(out, 'WEBP', quality=85, method=6)
    print(f'{base}-{w}.webp  {os.path.getsize(out):,} bytes')
