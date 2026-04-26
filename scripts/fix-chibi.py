"""
fix-chibi.py — Restore stripped interiors in watercolor chibi PNGs.

Problem: the chibis were bg-removed with a tool that over-removed — pale
interior watercolor areas that were close to paper-white got turned
transparent, so on a dark background the character looks "hollowed out."

Fix (per-pixel, no ML):
  1. Composite the PNG onto a solid white canvas — every transparent-interior
     pixel becomes white paper again; every opaque colored stroke stays.
  2. Flood-fill from the four edges: any near-white pixel reachable from the
     border gets set back to transparent (RGBA 0,0,0,0). This removes ONLY the
     exterior paper while leaving interior whites intact.

Result: chibi PNG with proper interior fills + transparent outside, so it
renders cleanly on any background (dark, light, cosmic).

Usage:
    python3 fix-chibi.py <input.png> <output.png>
    python3 fix-chibi.py --all <src_dir> <dst_dir>
"""

from __future__ import annotations

import argparse
import os
import sys
from collections import deque
from pathlib import Path

from PIL import Image


# Threshold for what counts as "paper white" (R,G,B all >= this).
# 235 catches genuine paper whites without wiping out cream/ivory interior fills.
WHITE_THRESHOLD = 235


def fix_chibi(src_path: str, dst_path: str) -> None:
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size

    white_bg = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    composite = Image.alpha_composite(white_bg, img)

    px = composite.load()
    assert px is not None

    visited = bytearray(w * h)  # 0 = unvisited, 1 = visited
    q: deque[tuple[int, int]] = deque()

    def enqueue_border() -> None:
        for x in range(w):
            q.append((x, 0))
            q.append((x, h - 1))
        for y in range(h):
            q.append((0, y))
            q.append((w - 1, y))

    enqueue_border()

    cleared = 0
    while q:
        x, y = q.popleft()
        if x < 0 or x >= w or y < 0 or y >= h:
            continue
        idx = y * w + x
        if visited[idx]:
            continue
        r, g, b, _a = px[x, y]
        if r >= WHITE_THRESHOLD and g >= WHITE_THRESHOLD and b >= WHITE_THRESHOLD:
            visited[idx] = 1
            px[x, y] = (255, 255, 255, 0)
            cleared += 1
            q.append((x + 1, y))
            q.append((x - 1, y))
            q.append((x, y + 1))
            q.append((x, y - 1))
        else:
            visited[idx] = 1

    composite.save(dst_path, "PNG")
    print(f"  wrote {dst_path}  ({cleared} exterior px cleared, {w}x{h})")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="Batch a whole folder")
    ap.add_argument("src", help="Input file or dir")
    ap.add_argument("dst", help="Output file or dir")
    args = ap.parse_args()

    if args.all:
        src_dir = Path(args.src)
        dst_dir = Path(args.dst)
        dst_dir.mkdir(parents=True, exist_ok=True)
        files = sorted(src_dir.glob("*.png"))
        print(f"Fixing {len(files)} chibis → {dst_dir}")
        for f in files:
            fix_chibi(str(f), str(dst_dir / f.name))
    else:
        Path(args.dst).parent.mkdir(parents=True, exist_ok=True)
        fix_chibi(args.src, args.dst)

    return 0


if __name__ == "__main__":
    sys.exit(main())
