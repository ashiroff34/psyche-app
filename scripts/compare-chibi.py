"""
Render original vs fixed chibi side-by-side on the Thyself dark background
(#0f0a1e) so we can actually see the difference.
"""

from pathlib import Path
from PIL import Image

BG = (15, 10, 30, 255)  # #0f0a1e, the Thyself app background

orig = Image.open("public/sprites/chibi/1-sp1.png").convert("RGBA")
fixed = Image.open("public/sprites/chibi-fixed/1-sp1.png").convert("RGBA")

# Scale down for side-by-side
size = 512
orig = orig.resize((size, size), Image.LANCZOS)
fixed = fixed.resize((size, size), Image.LANCZOS)

pad = 40
canvas = Image.new("RGBA", (size * 2 + pad * 3, size + pad * 2 + 40), BG)

canvas.paste(orig, (pad, pad + 40), orig)
canvas.paste(fixed, (pad * 2 + size, pad + 40), fixed)

# Labels (simple bitmap text)
from PIL import ImageDraw, ImageFont
draw = ImageDraw.Draw(canvas)
try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
except Exception:
    font = ImageFont.load_default()

draw.text((pad + size // 2 - 40, 14), "ORIGINAL", fill=(255, 255, 255, 220), font=font)
draw.text((pad * 2 + size + size // 2 - 25, 14), "FIXED", fill=(255, 255, 255, 220), font=font)

out = Path("public/sprites/chibi-fixed/_compare-1-sp1.png")
canvas.convert("RGBA").save(out)
print(f"wrote {out}")
