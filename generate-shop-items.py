#!/usr/bin/env python3
"""Generates all 20 shop item PNGs into public/shop/"""

import cairosvg
import os

OUT = os.path.join(os.path.dirname(__file__), "public", "shop")
os.makedirs(OUT, exist_ok=True)

ITEMS = {}

# ─── HATS ─────────────────────────────────────────────────────────────────────

ITEMS["hat-crown"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M120 340 L120 280 L180 200 L256 300 L332 200 L392 280 L392 340 Z" fill="#F59E0B" stroke="#92400E" stroke-width="12" stroke-linejoin="round"/>
  <rect x="108" y="320" width="296" height="60" rx="12" fill="#D97706" stroke="#92400E" stroke-width="10"/>
  <circle cx="256" cy="350" r="18" fill="#EF4444" stroke="#92400E" stroke-width="6"/>
  <circle cx="180" cy="350" r="14" fill="#3B82F6" stroke="#1E40AF" stroke-width="5"/>
  <circle cx="332" cy="350" r="14" fill="#10B981" stroke="#065F46" stroke-width="5"/>
  <ellipse cx="200" cy="295" rx="10" ry="18" fill="#FDE68A" opacity=".6"/>
  <ellipse cx="256" cy="265" rx="10" ry="18" fill="#FDE68A" opacity=".6"/>
  <ellipse cx="312" cy="295" rx="10" ry="18" fill="#FDE68A" opacity=".6"/>
  <polygon points="180,200 188,218 207,218 193,229 198,248 180,237 162,248 167,229 153,218 172,218" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
  <polygon points="256,170 265,192 288,192 271,206 277,228 256,215 235,228 241,206 224,192 247,192" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
  <polygon points="332,200 340,218 359,218 345,229 350,248 332,237 314,248 319,229 305,218 324,218" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
</svg>"""

ITEMS["hat-wizard"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M256 60 L320 320 L192 320 Z" fill="#6D28D9" stroke="#3B0764" stroke-width="14" stroke-linejoin="round"/>
  <ellipse cx="256" cy="320" rx="160" ry="36" fill="#7C3AED" stroke="#3B0764" stroke-width="12"/>
  <path d="M204 292 Q256 268 308 292" stroke="#FDE68A" stroke-width="10" fill="none" stroke-linecap="round"/>
  <polygon points="230,160 234,172 247,172 237,180 241,192 230,184 219,192 223,180 213,172 226,172" fill="#FDE68A" stroke="#D97706" stroke-width="2"/>
  <polygon points="272,220 275,230 285,230 278,236 280,246 272,241 264,246 266,236 259,230 269,230" fill="#FDE68A" stroke="#D97706" stroke-width="2"/>
  <circle cx="244" cy="110" r="8" fill="#FDE68A"/>
  <circle cx="268" cy="190" r="6" fill="#C4B5FD"/>
  <path d="M258 140 Q280 130 278 160 Q260 155 258 140Z" fill="#FDE68A"/>
  <circle cx="290" cy="150" r="5" fill="#C4B5FD" opacity=".8"/>
  <circle cx="226" cy="240" r="4" fill="#FDE68A" opacity=".7"/>
</svg>"""

ITEMS["hat-flower"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 280 Q150 250 210 260 Q256 255 302 260 Q362 250 412 280" stroke="#4ADE80" stroke-width="14" fill="none" stroke-linecap="round"/>
  <ellipse cx="160" cy="258" rx="22" ry="12" fill="#22C55E" transform="rotate(-30 160 258)"/>
  <ellipse cx="352" cy="258" rx="22" ry="12" fill="#22C55E" transform="rotate(30 352 258)"/>
  <ellipse cx="256" cy="252" rx="18" ry="10" fill="#16A34A"/>
  <g transform="translate(256,230)">
    <circle cx="0" cy="-28" r="16" fill="#FCA5A5"/><circle cx="20" cy="-15" r="16" fill="#FCA5A5"/>
    <circle cx="20" cy="8" r="16" fill="#FCA5A5"/><circle cx="0" cy="20" r="16" fill="#FCA5A5"/>
    <circle cx="-20" cy="8" r="16" fill="#FCA5A5"/><circle cx="-20" cy="-15" r="16" fill="#FCA5A5"/>
    <circle cx="0" cy="0" r="14" fill="#FDE68A"/>
  </g>
  <g transform="translate(168,248)">
    <circle cx="0" cy="-20" r="12" fill="#F9A8D4"/><circle cx="14" cy="-10" r="12" fill="#F9A8D4"/>
    <circle cx="14" cy="6" r="12" fill="#F9A8D4"/><circle cx="0" cy="16" r="12" fill="#F9A8D4"/>
    <circle cx="-14" cy="6" r="12" fill="#F9A8D4"/><circle cx="-14" cy="-10" r="12" fill="#F9A8D4"/>
    <circle cx="0" cy="0" r="10" fill="#FDE68A"/>
  </g>
  <g transform="translate(344,248)">
    <circle cx="0" cy="-20" r="12" fill="#FDA4AF"/><circle cx="14" cy="-10" r="12" fill="#FDA4AF"/>
    <circle cx="14" cy="6" r="12" fill="#FDA4AF"/><circle cx="0" cy="16" r="12" fill="#FDA4AF"/>
    <circle cx="-14" cy="6" r="12" fill="#FDA4AF"/><circle cx="-14" cy="-10" r="12" fill="#FDA4AF"/>
    <circle cx="0" cy="0" r="10" fill="#FDE68A"/>
  </g>
  <circle cx="210" cy="256" r="10" fill="#FDE68A" stroke="#CA8A04" stroke-width="3"/>
  <circle cx="302" cy="256" r="10" fill="#FDE68A" stroke="#CA8A04" stroke-width="3"/>
</svg>"""

ITEMS["hat-santa"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M256 80 Q340 160 360 300 L150 300 Q170 160 256 80Z" fill="#DC2626" stroke="#991B1B" stroke-width="14" stroke-linejoin="round"/>
  <ellipse cx="256" cy="308" rx="150" ry="34" fill="white" stroke="#E5E7EB" stroke-width="6"/>
  <circle cx="300" cy="100" r="38" fill="white" stroke="#E5E7EB" stroke-width="6"/>
  <circle cx="180" cy="304" r="8" fill="#F3F4F6" opacity=".6"/>
  <circle cx="210" cy="316" r="7" fill="#F3F4F6" opacity=".6"/>
  <circle cx="256" cy="320" r="8" fill="#F3F4F6" opacity=".6"/>
  <circle cx="300" cy="316" r="7" fill="#F3F4F6" opacity=".6"/>
  <circle cx="330" cy="304" r="8" fill="#F3F4F6" opacity=".6"/>
  <path d="M240 100 Q228 160 222 240" stroke="#EF4444" stroke-width="14" stroke-linecap="round" opacity=".4"/>
</svg>"""

ITEMS["hat-catears"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="290" width="312" height="40" rx="20" fill="#F9A8D4" stroke="#DB2777" stroke-width="10"/>
  <path d="M160 290 L120 160 L220 240 Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="12" stroke-linejoin="round"/>
  <path d="M160 276 L134 188 L204 246 Z" fill="#FBCFE8"/>
  <path d="M352 290 L392 160 L292 240 Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="12" stroke-linejoin="round"/>
  <path d="M352 276 L378 188 L308 246 Z" fill="#FBCFE8"/>
  <path d="M226 310 L246 295 L256 308 L266 295 L286 310 L266 322 L256 308 L246 322 Z" fill="#F472B6" stroke="#BE185D" stroke-width="4"/>
  <circle cx="256" cy="310" r="8" fill="#BE185D"/>
</svg>"""

# ─── FRAMES ───────────────────────────────────────────────────────────────────

ITEMS["frame-galaxy"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#7C3AED" stop-opacity="0"/>
      <stop offset="75%" stop-color="#7C3AED" stop-opacity=".9"/>
      <stop offset="85%" stop-color="#EC4899" stop-opacity=".8"/>
      <stop offset="92%" stop-color="#6D28D9" stop-opacity=".7"/>
      <stop offset="100%" stop-color="#4F46E5" stop-opacity=".3"/>
    </radialGradient>
  </defs>
  <circle cx="256" cy="256" r="250" fill="url(#g1)"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="#4F46E5" stroke-width="0"/>
  <circle cx="256" cy="256" r="24" fill="#7C3AED" opacity=".15"/>
  <circle cx="256" cy="30" r="6" fill="white" opacity=".9"/>
  <circle cx="340" cy="58" r="4" fill="#C4B5FD" opacity=".8"/>
  <circle cx="440" cy="178" r="5" fill="white" opacity=".7"/>
  <circle cx="462" cy="256" r="6" fill="#F0ABFC" opacity=".9"/>
  <circle cx="440" cy="332" r="4" fill="white" opacity=".7"/>
  <circle cx="340" cy="452" r="5" fill="#C4B5FD" opacity=".8"/>
  <circle cx="256" cy="482" r="6" fill="white" opacity=".9"/>
  <circle cx="172" cy="452" r="4" fill="#F0ABFC" opacity=".8"/>
  <circle cx="72" cy="332" r="5" fill="white" opacity=".7"/>
  <circle cx="50" cy="256" r="6" fill="#C4B5FD" opacity=".9"/>
  <circle cx="72" cy="178" r="4" fill="white" opacity=".7"/>
  <circle cx="172" cy="58" r="5" fill="#F0ABFC" opacity=".8"/>
  <circle cx="390" cy="118" r="3" fill="white"/>
  <circle cx="124" cy="392" r="3" fill="white"/>
  <circle cx="392" cy="394" r="3" fill="#C4B5FD"/>
  <circle cx="122" cy="120" r="3" fill="#F0ABFC"/>
</svg>"""

ITEMS["frame-golden"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gg" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#F59E0B" stop-opacity="0"/>
      <stop offset="74%" stop-color="#D97706" stop-opacity=".7"/>
      <stop offset="83%" stop-color="#F59E0B" stop-opacity=".95"/>
      <stop offset="92%" stop-color="#FDE68A" stop-opacity=".6"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity=".2"/>
    </radialGradient>
  </defs>
  <circle cx="256" cy="256" r="250" fill="url(#gg)"/>
  <line x1="256" y1="14" x2="256" y2="58" stroke="#FDE68A" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <line x1="389" y1="51" x2="371" y2="86" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="461" y1="181" x2="429" y2="197" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="498" y1="256" x2="454" y2="256" stroke="#FDE68A" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <line x1="461" y1="331" x2="429" y2="315" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="389" y1="461" x2="371" y2="426" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="256" y1="498" x2="256" y2="454" stroke="#FDE68A" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <line x1="123" y1="461" x2="141" y2="426" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="51" y1="331" x2="83" y2="315" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="14" y1="256" x2="58" y2="256" stroke="#FDE68A" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <line x1="51" y1="181" x2="83" y2="197" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <line x1="123" y1="51" x2="141" y2="86" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".8"/>
</svg>"""

ITEMS["frame-rainbow"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="17%" stop-color="#F97316"/>
      <stop offset="33%" stop-color="#EAB308"/>
      <stop offset="50%" stop-color="#22C55E"/>
      <stop offset="67%" stop-color="#3B82F6"/>
      <stop offset="83%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
  </defs>
  <circle cx="256" cy="256" r="240" fill="none" stroke="url(#rb)" stroke-width="52"/>
  <circle cx="256" cy="20" r="8" fill="white" opacity=".9"/>
  <circle cx="492" cy="256" r="8" fill="white" opacity=".9"/>
  <circle cx="256" cy="492" r="8" fill="white" opacity=".9"/>
  <circle cx="20" cy="256" r="8" fill="white" opacity=".9"/>
  <circle cx="437" cy="437" r="6" fill="white" opacity=".7"/>
  <circle cx="75" cy="75" r="6" fill="white" opacity=".7"/>
</svg>"""

ITEMS["frame-ice"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ic" cx="50%" cy="50%" r="50%">
      <stop offset="62%" stop-color="#0EA5E9" stop-opacity="0"/>
      <stop offset="74%" stop-color="#0EA5E9" stop-opacity=".8"/>
      <stop offset="85%" stop-color="#BAE6FD" stop-opacity=".95"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity=".3"/>
    </radialGradient>
  </defs>
  <circle cx="256" cy="256" r="250" fill="url(#ic)"/>
  <polygon points="256,8 244,40 268,40" fill="#BAE6FD" opacity=".95"/>
  <polygon points="392,54 372,82 398,90" fill="#7DD3FC" opacity=".85"/>
  <polygon points="472,190 444,198 454,224" fill="#BAE6FD" opacity=".95"/>
  <polygon points="504,256 472,242 472,270" fill="#7DD3FC" opacity=".85"/>
  <polygon points="472,322 444,314 454,288" fill="#BAE6FD" opacity=".95"/>
  <polygon points="392,458 372,430 398,422" fill="#7DD3FC" opacity=".85"/>
  <polygon points="256,504 244,472 268,472" fill="#BAE6FD" opacity=".95"/>
  <polygon points="120,458 140,430 114,422" fill="#7DD3FC" opacity=".85"/>
  <polygon points="40,322 68,314 58,288" fill="#BAE6FD" opacity=".95"/>
  <polygon points="8,256 40,242 40,270" fill="#7DD3FC" opacity=".85"/>
  <polygon points="40,190 68,198 58,224" fill="#BAE6FD" opacity=".95"/>
  <polygon points="120,54 140,82 114,90" fill="#7DD3FC" opacity=".85"/>
</svg>"""

ITEMS["frame-shadow"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sh" cx="50%" cy="50%" r="50%">
      <stop offset="58%" stop-color="#1E1B4B" stop-opacity="0"/>
      <stop offset="72%" stop-color="#312E81" stop-opacity=".75"/>
      <stop offset="83%" stop-color="#1E1B4B" stop-opacity=".92"/>
      <stop offset="92%" stop-color="#4C1D95" stop-opacity=".65"/>
      <stop offset="100%" stop-color="#1E1B4B" stop-opacity=".25"/>
    </radialGradient>
  </defs>
  <circle cx="256" cy="256" r="250" fill="url(#sh)"/>
  <ellipse cx="256" cy="60" rx="30" ry="14" fill="#6D28D9" opacity=".4"/>
  <ellipse cx="440" cy="180" rx="24" ry="12" fill="#5B21B6" opacity=".4"/>
  <ellipse cx="450" cy="340" rx="26" ry="13" fill="#6D28D9" opacity=".4"/>
  <ellipse cx="256" cy="458" rx="30" ry="14" fill="#5B21B6" opacity=".4"/>
  <ellipse cx="66" cy="340" rx="24" ry="12" fill="#6D28D9" opacity=".4"/>
  <ellipse cx="72" cy="180" rx="26" ry="13" fill="#5B21B6" opacity=".4"/>
</svg>"""

# ─── ACCESSORIES ──────────────────────────────────────────────────────────────

ITEMS["acc-sparkle"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(90,90)"><path d="M0,-30 L7,-7 L30,0 L7,7 L0,30 L-7,7 L-30,0 L-7,-7Z" fill="#FDE68A" stroke="#F59E0B" stroke-width="3"/></g>
  <g transform="translate(420,110)"><path d="M0,-24 L6,-6 L24,0 L6,6 L0,24 L-6,6 L-24,0 L-6,-6Z" fill="#FDE68A" stroke="#F59E0B" stroke-width="3"/></g>
  <g transform="translate(130,400)"><path d="M0,-20 L5,-5 L20,0 L5,5 L0,20 L-5,5 L-20,0 L-5,-5Z" fill="#FDE68A" stroke="#F59E0B" stroke-width="3"/></g>
  <g transform="translate(400,400)"><path d="M0,-26 L6,-6 L26,0 L6,6 L0,26 L-6,6 L-26,0 L-6,-6Z" fill="#FDE68A" stroke="#F59E0B" stroke-width="3"/></g>
  <g transform="translate(256,70)"><path d="M0,-18 L4,-4 L18,0 L4,4 L0,18 L-4,4 L-18,0 L-4,-4Z" fill="white" stroke="#FDE68A" stroke-width="3"/></g>
  <g transform="translate(70,256)"><path d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4Z" fill="white" stroke="#FDE68A" stroke-width="3"/></g>
  <g transform="translate(442,256)"><path d="M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4Z" fill="white" stroke="#FDE68A" stroke-width="3"/></g>
  <g transform="translate(256,442)"><path d="M0,-18 L4,-4 L18,0 L4,4 L0,18 L-4,4 L-18,0 L-4,-4Z" fill="white" stroke="#FDE68A" stroke-width="3"/></g>
  <circle cx="180" cy="150" r="6" fill="#FDE68A" opacity=".8"/>
  <circle cx="340" cy="190" r="5" fill="white" opacity=".8"/>
  <circle cx="155" cy="310" r="6" fill="#FDE68A" opacity=".8"/>
  <circle cx="360" cy="310" r="5" fill="white" opacity=".8"/>
  <circle cx="310" cy="430" r="6" fill="#FDE68A" opacity=".8"/>
  <circle cx="200" cy="200" r="4" fill="white" opacity=".6"/>
  <circle cx="320" cy="360" r="4" fill="#FDE68A" opacity=".6"/>
</svg>"""

ITEMS["acc-hearts"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M90 110 C90 88 58 68 58 96 C58 116 90 138 90 138 C90 138 122 116 122 96 C122 68 90 88 90 110Z" fill="#FB7185" stroke="#E11D48" stroke-width="5"/>
  <path d="M410 88 C410 70 386 52 386 78 C386 96 410 112 410 112 C410 112 434 96 434 78 C434 52 410 70 410 88Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="4"/>
  <path d="M130 410 C130 392 108 375 108 397 C108 413 130 428 130 428 C130 428 152 413 152 397 C152 375 130 392 130 410Z" fill="#FDA4AF" stroke="#BE123C" stroke-width="4"/>
  <path d="M400 400 C400 379 372 360 372 384 C372 402 400 420 400 420 C400 420 428 402 428 384 C428 360 400 379 400 400Z" fill="#FB7185" stroke="#E11D48" stroke-width="5"/>
  <path d="M256 62 C256 50 241 40 241 55 C241 66 256 76 256 76 C256 76 271 66 271 55 C271 40 256 50 256 62Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="3"/>
  <path d="M68 256 C68 244 53 234 53 249 C53 259 68 269 68 269 C68 269 83 259 83 249 C83 234 68 244 68 256Z" fill="#FDA4AF" stroke="#BE123C" stroke-width="3"/>
  <path d="M452 256 C452 244 437 234 437 249 C437 259 452 269 452 269 C452 269 467 259 467 249 C467 234 452 244 452 256Z" fill="#FB7185" stroke="#E11D48" stroke-width="3"/>
  <path d="M256 452 C256 440 241 430 241 445 C241 455 256 465 256 465 C256 465 271 455 271 445 C271 430 256 440 256 452Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="3"/>
  <circle cx="196" cy="194" r="7" fill="#FCA5A5" opacity=".8"/>
  <circle cx="320" cy="324" r="7" fill="#FCA5A5" opacity=".8"/>
  <circle cx="196" cy="324" r="5" fill="#FDA4AF" opacity=".7"/>
  <circle cx="320" cy="194" r="5" fill="#FDA4AF" opacity=".7"/>
</svg>"""

ITEMS["acc-notes"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(90,140) rotate(-15)">
    <rect x="-5" y="-65" width="10" height="75" fill="#A78BFA" rx="4"/>
    <ellipse cx="-17" cy="10" rx="22" ry="15" fill="#A78BFA"/>
    <rect x="5" y="-65" width="34" height="11" fill="#A78BFA" rx="3"/>
  </g>
  <g transform="translate(390,100) rotate(10)">
    <rect x="-5" y="-58" width="10" height="68" fill="#C4B5FD" rx="4"/>
    <ellipse cx="-17" cy="10" rx="20" ry="13" fill="#C4B5FD"/>
    <rect x="5" y="-58" width="30" height="10" fill="#C4B5FD" rx="3"/>
  </g>
  <g transform="translate(410,340) rotate(-8)">
    <rect x="-5" y="-52" width="8" height="60" fill="#DDD6FE" rx="3"/>
    <ellipse cx="-15" cy="8" rx="17" ry="12" fill="#DDD6FE"/>
    <rect x="3" y="-52" width="8" height="60" fill="#DDD6FE" rx="3" transform="translate(26,0)"/>
    <ellipse cx="14" cy="8" rx="17" ry="12" fill="#DDD6FE" transform="translate(26,0)"/>
    <rect x="3" y="-52" width="37" height="9" fill="#DDD6FE" rx="3"/>
    <rect x="3" y="-39" width="37" height="9" fill="#DDD6FE" rx="3"/>
  </g>
  <g transform="translate(115,390) rotate(12)">
    <rect x="-5" y="-52" width="10" height="62" fill="#A78BFA" rx="4"/>
    <ellipse cx="-17" cy="10" rx="20" ry="13" fill="#A78BFA"/>
    <rect x="5" y="-52" width="30" height="10" fill="#A78BFA" rx="3"/>
  </g>
  <g transform="translate(380,420) rotate(-5)">
    <rect x="-4" y="-42" width="8" height="50" fill="#C4B5FD" rx="3"/>
    <ellipse cx="-13" cy="8" rx="15" ry="11" fill="#C4B5FD"/>
    <rect x="4" y="-42" width="24" height="8" fill="#C4B5FD" rx="2"/>
  </g>
  <circle cx="256" cy="78" r="6" fill="#DDD6FE" opacity=".8"/>
  <circle cx="58" cy="300" r="6" fill="#A78BFA" opacity=".8"/>
  <circle cx="460" cy="210" r="5" fill="#C4B5FD" opacity=".8"/>
</svg>"""

ITEMS["acc-lightning"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="282,58 218,244 266,244 208,454 324,220 270,220 334,58" fill="#FDE68A" stroke="#D97706" stroke-width="8" stroke-linejoin="round"/>
  <polygon points="108,118 80,190 102,190 74,284 136,172 112,172 142,98" fill="#FEF08A" stroke="#CA8A04" stroke-width="5" stroke-linejoin="round" opacity=".9"/>
  <polygon points="408,138 380,210 402,210 374,304 436,192 412,192 442,118" fill="#FEF08A" stroke="#CA8A04" stroke-width="5" stroke-linejoin="round" opacity=".9"/>
  <polygon points="128,342 108,394 126,394 106,456 156,382 136,382 160,326" fill="#FDE68A" stroke="#D97706" stroke-width="4" stroke-linejoin="round" opacity=".8"/>
  <polygon points="392,348 372,400 390,400 370,462 420,388 400,388 424,334" fill="#FDE68A" stroke="#D97706" stroke-width="4" stroke-linejoin="round" opacity=".8"/>
  <circle cx="256" cy="68" r="6" fill="white" opacity=".7"/>
  <circle cx="88" cy="108" r="5" fill="white" opacity=".6"/>
  <circle cx="422" cy="128" r="5" fill="white" opacity=".6"/>
</svg>"""

ITEMS["acc-stars"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="256,58 269,96 310,96 278,118 290,156 256,134 222,156 234,118 202,96 243,96" fill="#FDE68A" stroke="#F59E0B" stroke-width="6"/>
  <polygon points="98,180 108,208 138,208 116,224 124,252 98,236 72,252 80,224 58,208 88,208" fill="#FEF08A" stroke="#D97706" stroke-width="5"/>
  <polygon points="402,158 412,186 442,186 420,202 428,230 402,214 376,230 384,202 362,186 392,186" fill="#FDE68A" stroke="#F59E0B" stroke-width="5"/>
  <polygon points="138,382 146,404 170,404 152,417 158,439 138,426 118,439 124,417 106,404 130,404" fill="#FEF08A" stroke="#D97706" stroke-width="4"/>
  <polygon points="382,382 390,404 414,404 396,417 402,439 382,426 362,439 368,417 350,404 374,404" fill="#FDE68A" stroke="#F59E0B" stroke-width="4"/>
  <polygon points="256,402 263,420 282,420 268,430 274,448 256,438 238,448 244,430 230,420 249,420" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3"/>
  <polygon points="74,100 79,114 94,114 83,122 87,136 74,128 61,136 65,122 54,114 69,114" fill="#FEF3C7" stroke="#D97706" stroke-width="3" opacity=".9"/>
  <polygon points="438,100 443,114 458,114 447,122 451,136 438,128 425,136 429,122 418,114 433,114" fill="#FEF3C7" stroke="#D97706" stroke-width="3" opacity=".9"/>
  <circle cx="182" cy="118" r="6" fill="#FEF08A" opacity=".8"/>
  <circle cx="332" cy="442" r="6" fill="#FDE68A" opacity=".8"/>
</svg>"""

# ─── BACKGROUNDS ──────────────────────────────────────────────────────────────

ITEMS["bg-sunset"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#F97316"/>
      <stop offset="40%" stop-color="#FB923C"/>
      <stop offset="70%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#FDBA74"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#s1)" rx="20"/>
  <ellipse cx="256" cy="340" rx="100" ry="100" fill="#FEF3C7" opacity=".95"/>
  <ellipse cx="256" cy="340" rx="82" ry="82" fill="#FFFBEB"/>
  <rect x="0" y="380" width="512" height="132" fill="#C2410C" opacity=".45" rx="0"/>
  <rect x="0" y="400" width="512" height="112" fill="#9A3412" opacity=".3"/>
  <ellipse cx="110" cy="190" rx="75" ry="30" fill="white" opacity=".75"/>
  <ellipse cx="66" cy="200" rx="52" ry="24" fill="white" opacity=".65"/>
  <ellipse cx="158" cy="196" rx="58" ry="22" fill="white" opacity=".65"/>
  <ellipse cx="390" cy="165" rx="80" ry="28" fill="white" opacity=".75"/>
  <ellipse cx="348" cy="173" rx="58" ry="24" fill="white" opacity=".65"/>
  <ellipse cx="432" cy="170" rx="52" ry="22" fill="white" opacity=".65"/>
  <line x1="256" y1="228" x2="256" y2="205" stroke="#FDE68A" stroke-width="6" opacity=".7" stroke-linecap="round"/>
  <line x1="318" y1="250" x2="335" y2="234" stroke="#FDE68A" stroke-width="5" opacity=".6" stroke-linecap="round"/>
  <line x1="194" y1="250" x2="177" y2="234" stroke="#FDE68A" stroke-width="5" opacity=".6" stroke-linecap="round"/>
</svg>"""

ITEMS["bg-aurora"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#0C4A6E"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#a1)" rx="20"/>
  <circle cx="60" cy="55" r="2.5" fill="white" opacity=".9"/>
  <circle cx="142" cy="38" r="2" fill="white" opacity=".8"/>
  <circle cx="302" cy="48" r="2.5" fill="white" opacity=".9"/>
  <circle cx="422" cy="68" r="2" fill="white" opacity=".8"/>
  <circle cx="482" cy="38" r="2.5" fill="white" opacity=".9"/>
  <circle cx="28" cy="142" r="2" fill="white" opacity=".7"/>
  <circle cx="462" cy="128" r="2" fill="white" opacity=".7"/>
  <circle cx="220" cy="28" r="2" fill="white" opacity=".75"/>
  <path d="M-20 210 Q100 128 200 188 Q300 248 400 168 Q452 136 540 186" stroke="#4ADE80" stroke-width="30" fill="none" opacity=".45" stroke-linecap="round"/>
  <path d="M-20 250 Q100 168 200 228 Q300 288 400 208 Q452 176 540 228" stroke="#2DD4BF" stroke-width="24" fill="none" opacity=".4" stroke-linecap="round"/>
  <path d="M-20 288 Q80 218 180 268 Q280 318 380 248 Q440 218 540 268" stroke="#818CF8" stroke-width="18" fill="none" opacity=".35" stroke-linecap="round"/>
  <path d="M-20 318 Q100 268 200 308 Q300 348 400 288 Q452 262 540 302" stroke="#4ADE80" stroke-width="14" fill="none" opacity=".3" stroke-linecap="round"/>
  <ellipse cx="256" cy="496" rx="290" ry="28" fill="#0C4A6E" opacity=".9"/>
  <polygon points="78,446 94,404 110,446" fill="#083344" opacity=".7"/>
  <polygon points="402,454 418,410 434,454" fill="#083344" opacity=".7"/>
  <polygon points="168,440 188,390 208,440" fill="#0C4A6E" opacity=".6"/>
  <polygon points="304,450 324,400 344,450" fill="#083344" opacity=".7"/>
</svg>"""

ITEMS["bg-blossoms"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="b1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#FDF2F8"/>
      <stop offset="60%" stop-color="#FCE7F3"/>
      <stop offset="100%" stop-color="#FBCFE8"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#b1)" rx="20"/>
  <path d="M40 430 Q120 348 200 288 Q240 260 282 246" stroke="#9D174D" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M200 288 Q232 226 262 184" stroke="#9D174D" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M200 288 Q262 276 314 264" stroke="#9D174D" stroke-width="8" fill="none" stroke-linecap="round"/>
  <g transform="translate(262,184)">
    <circle cx="0" cy="-12" r="10" fill="#FCA5A5"/><circle cx="11" cy="0" r="10" fill="#FCA5A5"/>
    <circle cx="6" cy="12" r="10" fill="#FCA5A5"/><circle cx="-6" cy="12" r="10" fill="#FCA5A5"/>
    <circle cx="-11" cy="0" r="10" fill="#FCA5A5"/><circle cx="0" cy="0" r="8" fill="#FDE68A"/>
  </g>
  <g transform="translate(314,260)">
    <circle cx="0" cy="-10" r="9" fill="#F9A8D4"/><circle cx="9" cy="0" r="9" fill="#F9A8D4"/>
    <circle cx="5" cy="11" r="9" fill="#F9A8D4"/><circle cx="-5" cy="11" r="9" fill="#F9A8D4"/>
    <circle cx="-9" cy="0" r="9" fill="#F9A8D4"/><circle cx="0" cy="0" r="7" fill="#FEF08A"/>
  </g>
  <ellipse cx="138" cy="138" rx="11" ry="6" fill="#FCA5A5" opacity=".8" transform="rotate(-30 138 138)"/>
  <ellipse cx="362" cy="98" rx="10" ry="6" fill="#F9A8D4" opacity=".75" transform="rotate(20 362 98)"/>
  <ellipse cx="422" cy="202" rx="9" ry="5" fill="#FCA5A5" opacity=".8" transform="rotate(-10 422 202)"/>
  <ellipse cx="78" cy="282" rx="10" ry="6" fill="#FDA4AF" opacity=".75" transform="rotate(25 78 282)"/>
  <ellipse cx="442" cy="342" rx="9" ry="5" fill="#FCA5A5" opacity=".8" transform="rotate(-18 442 342)"/>
  <ellipse cx="198" cy="402" rx="10" ry="6" fill="#F9A8D4" opacity=".75" transform="rotate(15 198 402)"/>
  <ellipse cx="362" cy="422" rx="9" ry="5" fill="#FCA5A5" opacity=".8" transform="rotate(-24 362 422)"/>
  <ellipse cx="98" cy="442" rx="8" ry="5" fill="#FDA4AF" opacity=".75" transform="rotate(10 98 442)"/>
  <ellipse cx="460" cy="98" rx="8" ry="5" fill="#FCA5A5" opacity=".7" transform="rotate(-15 460 98)"/>
  <ellipse cx="50" cy="160" rx="9" ry="5" fill="#F9A8D4" opacity=".7" transform="rotate(30 50 160)"/>
</svg>"""

ITEMS["bg-starfield"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sf" cx="50%" cy="40%" r="65%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#1E1B4B"/>
      <stop offset="55%" stop-color="#0F0A2E"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#sf)" rx="20"/>
  <ellipse cx="322" cy="162" rx="110" ry="65" fill="#4F46E5" opacity=".13"/>
  <ellipse cx="158" cy="302" rx="90" ry="54" fill="#7C3AED" opacity=".1"/>
  <ellipse cx="402" cy="362" rx="80" ry="50" fill="#2563EB" opacity=".09"/>
  <circle cx="58" cy="48" r="2.2" fill="white" opacity=".9"/>
  <circle cx="152" cy="78" r="1.6" fill="white" opacity=".8"/>
  <circle cx="282" cy="38" r="2.8" fill="white" opacity=".95"/>
  <circle cx="392" cy="58" r="1.6" fill="white" opacity=".7"/>
  <circle cx="472" cy="88" r="2.2" fill="white" opacity=".85"/>
  <circle cx="28" cy="162" r="1.6" fill="white" opacity=".8"/>
  <circle cx="118" cy="138" r="2.2" fill="#C7D2FE" opacity=".9"/>
  <circle cx="222" cy="118" r="1.6" fill="white" opacity=".7"/>
  <circle cx="342" cy="128" r="2.2" fill="white" opacity=".85"/>
  <circle cx="452" cy="168" r="1.6" fill="#BAE6FD" opacity=".8"/>
  <circle cx="78" cy="232" r="2.8" fill="white" opacity=".9"/>
  <circle cx="178" cy="198" r="1.6" fill="white" opacity=".7"/>
  <circle cx="312" cy="218" r="2.2" fill="#C7D2FE" opacity=".85"/>
  <circle cx="432" cy="238" r="1.6" fill="white" opacity=".8"/>
  <circle cx="492" cy="298" r="2.2" fill="white" opacity=".9"/>
  <circle cx="48" cy="318" r="1.6" fill="#BAE6FD" opacity=".7"/>
  <circle cx="158" cy="358" r="2.2" fill="white" opacity=".85"/>
  <circle cx="258" cy="328" r="1.6" fill="white" opacity=".8"/>
  <circle cx="382" cy="308" r="2.8" fill="white" opacity=".9"/>
  <circle cx="98" cy="418" r="1.6" fill="#C7D2FE" opacity=".7"/>
  <circle cx="198" cy="448" r="2.2" fill="white" opacity=".85"/>
  <circle cx="318" cy="438" r="1.6" fill="white" opacity=".8"/>
  <circle cx="442" cy="418" r="2.2" fill="white" opacity=".9"/>
  <circle cx="482" cy="458" r="1.6" fill="#BAE6FD" opacity=".7"/>
  <path d="M256 256 L259 267 L256 278 L253 267Z" fill="white" opacity=".9"/>
  <path d="M245 267 L256 264 L267 267 L256 270Z" fill="white" opacity=".9"/>
  <path d="M128 178 L131 186 L128 194 L125 186Z" fill="white" opacity=".8"/>
  <path d="M120 186 L128 183 L136 186 L128 189Z" fill="white" opacity=".8"/>
  <path d="M388 338 L391 346 L388 354 L385 346Z" fill="white" opacity=".8"/>
  <path d="M380 346 L388 343 L396 346 L388 349Z" fill="white" opacity=".8"/>
</svg>"""

ITEMS["bg-forest"] = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fg" cx="50%" cy="62%" r="62%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#14532D"/>
      <stop offset="68%" stop-color="#052E16"/>
      <stop offset="100%" stop-color="#020C08"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#fg)" rx="20"/>
  <ellipse cx="256" cy="488" rx="290" ry="52" fill="#4ADE80" opacity=".07"/>
  <ellipse cx="256" cy="468" rx="210" ry="34" fill="#86EFAC" opacity=".05"/>
  <polygon points="78,482 108,342 138,482" fill="#052E16"/>
  <polygon points="98,482 128,302 158,482" fill="#064E3B"/>
  <polygon points="46,482 88,360 130,482" fill="#052E16" opacity=".8"/>
  <polygon points="372,482 402,322 432,482" fill="#052E16"/>
  <polygon points="392,482 422,302 452,482" fill="#064E3B"/>
  <polygon points="342,482 382,360 422,482" fill="#052E16" opacity=".8"/>
  <polygon points="198,482 240,278 282,482" fill="#065F46"/>
  <polygon points="218,482 256,258 294,482" fill="#052E16"/>
  <circle cx="158" cy="302" r="6" fill="#BBF7D0" opacity=".9"/>
  <circle cx="158" cy="302" r="12" fill="#4ADE80" opacity=".28"/>
  <circle cx="342" cy="260" r="5" fill="#BBF7D0" opacity=".85"/>
  <circle cx="342" cy="260" r="10" fill="#4ADE80" opacity=".22"/>
  <circle cx="422" cy="198" r="6" fill="#BBF7D0" opacity=".9"/>
  <circle cx="422" cy="198" r="12" fill="#86EFAC" opacity=".28"/>
  <circle cx="98" cy="220" r="5" fill="#BBF7D0" opacity=".85"/>
  <circle cx="98" cy="220" r="10" fill="#4ADE80" opacity=".22"/>
  <circle cx="280" cy="178" r="4" fill="#D1FAE5" opacity=".9"/>
  <circle cx="280" cy="178" r="9" fill="#4ADE80" opacity=".18"/>
  <circle cx="462" cy="322" r="5" fill="#BBF7D0" opacity=".8"/>
  <circle cx="462" cy="322" r="10" fill="#4ADE80" opacity=".22"/>
  <circle cx="58" cy="362" r="4" fill="#BBF7D0" opacity=".85"/>
  <circle cx="58" cy="362" r="9" fill="#4ADE80" opacity=".18"/>
  <path d="M0 382 Q128 342 256 362 Q384 382 512 352" stroke="#4ADE80" stroke-width="2" fill="none" opacity=".12"/>
</svg>"""

# ─── CONVERT ALL TO PNG ────────────────────────────────────────────────────────

print(f"Generating {len(ITEMS)} shop item PNGs...")
for name, svg in ITEMS.items():
    out_path = os.path.join(OUT, f"{name}.png")
    cairosvg.svg2png(bytestring=svg.encode(), write_to=out_path, output_width=512, output_height=512)
    print(f"  ✓ {name}.png")

print(f"\nDone! All files saved to public/shop/")
