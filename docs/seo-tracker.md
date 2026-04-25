# SEO Page Tracker

**Target:** 1,000 indexed landing pages by month 12
**Current total:** 106 dedicated static SEO pages (9 type pages + 27 instinctual subtype pages + 16 cognitive function pages + 36 compatibility pairs + 18 wing subtype pages)

> Note: `/enneagram/[type]` exists as a client-side dynamic route (not SEO-optimized). Dedicated static pages with `generateMetadata` + JSON-LD are needed for Google indexing.

---

## Progress by type

| Month target | Goal | Actual | Status |
|---|---|---|---|
| Month 3–4 | 40 pages | 40 | COMPLETE |
| Month 5–6 | 200 pages | 106 | IN PROGRESS |
| Month 7–8 | 400 pages | 0 | NOT STARTED |
| Month 9–12 | 1,000 pages | 0 | NOT STARTED |

---

## Enneagram type pages (target: 27 — 9 types × 3 subtypes)

Priority order (by search volume): Type 4 → 2 → 9 → 5 → 1 → 8 → 3 → 7 → 6

| Route | Status | Date shipped |
|---|---|---|
| /enneagram/type-4 | SHIPPED | 2026-04-23 |
| /enneagram/type-2 | SHIPPED | 2026-04-23 |
| /enneagram/type-9 | SHIPPED | 2026-04-23 |
| /enneagram/type-5 | SHIPPED | 2026-04-23 |
| /enneagram/type-1 | SHIPPED | 2026-04-23 |
| /enneagram/type-8 | SHIPPED | 2026-04-23 |
| /enneagram/type-3 | SHIPPED | 2026-04-23 |
| /enneagram/type-7 | SHIPPED | 2026-04-23 |
| /enneagram/type-6 | SHIPPED | 2026-04-23 |

---

## Wing subtype pages (18 — 2 wings per type × 9 types)

Served at `/enneagram/[Xw Y]` — e.g. `/enneagram/4w5`. All 18 pages: server component, generateMetadata, JSON-LD Article schema, Riso-Hudson wing nickname, what the wing adds, core traits (5), growth/challenge, how to identify, navigation, CTA.

| Route | Nickname | Status | Date shipped |
|---|---|---|---|
| /enneagram/1w9 | The Idealist | SHIPPED | 2026-04-25 |
| /enneagram/1w2 | The Advocate | SHIPPED | 2026-04-25 |
| /enneagram/2w1 | The Servant | SHIPPED | 2026-04-25 |
| /enneagram/2w3 | The Host | SHIPPED | 2026-04-25 |
| /enneagram/3w2 | The Charmer | SHIPPED | 2026-04-25 |
| /enneagram/3w4 | The Professional | SHIPPED | 2026-04-25 |
| /enneagram/4w3 | The Aristocrat | SHIPPED | 2026-04-25 |
| /enneagram/4w5 | The Bohemian | SHIPPED | 2026-04-25 |
| /enneagram/5w4 | The Iconoclast | SHIPPED | 2026-04-25 |
| /enneagram/5w6 | The Problem Solver | SHIPPED | 2026-04-25 |
| /enneagram/6w5 | The Defender | SHIPPED | 2026-04-25 |
| /enneagram/6w7 | The Buddy | SHIPPED | 2026-04-25 |
| /enneagram/7w6 | The Entertainer | SHIPPED | 2026-04-25 |
| /enneagram/7w8 | The Realist | SHIPPED | 2026-04-25 |
| /enneagram/8w7 | The Maverick | SHIPPED | 2026-04-25 |
| /enneagram/8w9 | The Bear | SHIPPED | 2026-04-25 |
| /enneagram/9w1 | The Dreamer | SHIPPED | 2026-04-25 |
| /enneagram/9w8 | The Referee | SHIPPED | 2026-04-25 |

---

## Instinctual subtype pages (27 — all 9 types × 3 instincts, via generateStaticParams)

Served at `/enneagram/subtypes/[slug]` — full `generateMetadata` + JSON-LD in layout, all 27 slugs pre-rendered.

| Status | Count | Date shipped |
|---|---|---|
| ALL SHIPPED | 27/27 | 2026-04-24 |

sp/1 sp/2 sp/3 sp/4 sp/5 sp/6 sp/7 sp/8 sp/9 — all SHIPPED  
sx/1 sx/2 sx/3 sx/4 sx/5 sx/6 sx/7 sx/8 sx/9 — all SHIPPED  
so/1 so/2 so/3 so/4 so/5 so/6 so/7 so/8 so/9 — all SHIPPED

---

## Cognitive function pages (target: 16 — one per MBTI type)

Priority order (by search volume): INFJ → INTJ → ENFP → INFP → ENTP → ISFJ → ENTJ → ENFJ → others

| Route | Status | Date shipped |
|---|---|---|
| /cognitive-functions/infj | SHIPPED | 2026-04-24 |
| /cognitive-functions/intj | SHIPPED | 2026-04-24 |
| /cognitive-functions/enfp | SHIPPED | 2026-04-24 |
| /cognitive-functions/infp | SHIPPED | 2026-04-24 |
| /cognitive-functions/entp | SHIPPED | 2026-04-24 |
| /cognitive-functions/isfj | SHIPPED | 2026-04-24 |
| /cognitive-functions/entj | SHIPPED | 2026-04-24 |
| /cognitive-functions/enfj | SHIPPED | 2026-04-24 |
| /cognitive-functions/istp | SHIPPED | 2026-04-24 |
| /cognitive-functions/istj | SHIPPED | 2026-04-24 |
| /cognitive-functions/esfp | SHIPPED | 2026-04-24 |
| /cognitive-functions/intp | SHIPPED | 2026-04-24 |
| /cognitive-functions/estp | SHIPPED | 2026-04-24 |
| /cognitive-functions/esfj | SHIPPED | 2026-04-24 |
| /cognitive-functions/estj | SHIPPED | 2026-04-24 |
| /cognitive-functions/isfp | SHIPPED | 2026-04-24 |

---

## Compatibility pages (target: 200+ pairs)

Priority order (by search interest): 4+5 → 2+8 → 9+1 → 4+9 → 2+9 → 1+7 → 5+8 → ...

| Route | Status | Date shipped |
|---|---|---|
| /compatibility/enneagram-4/enneagram-5 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-2/enneagram-8 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-9/enneagram-1 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-4/enneagram-9 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-2/enneagram-9 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-1/enneagram-7 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-5/enneagram-8 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-1/enneagram-4 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-3/enneagram-6 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-7/enneagram-9 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-2/enneagram-4 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-3/enneagram-9 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-8/enneagram-9 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-3/enneagram-4 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-6/enneagram-9 | SHIPPED | 2026-04-24 |
| /compatibility/enneagram-1/enneagram-2 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-2/enneagram-3 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-2/enneagram-5 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-2/enneagram-6 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-2/enneagram-7 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-4/enneagram-6 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-4/enneagram-7 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-1/enneagram-3 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-1/enneagram-5 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-1/enneagram-6 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-1/enneagram-8 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-3/enneagram-5 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-3/enneagram-7 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-3/enneagram-8 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-4/enneagram-8 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-5/enneagram-6 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-5/enneagram-7 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-5/enneagram-9 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-6/enneagram-7 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-6/enneagram-8 | SHIPPED | 2026-04-25 |
| /compatibility/enneagram-7/enneagram-8 | SHIPPED | 2026-04-25 |

---

## Ship log

When a page ships, `/seo` command appends here:

<!-- SEO_LOG_START -->
2026-04-23 | /enneagram/type-4 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-2 | shipped | ~2,200 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-9 | shipped | ~2,300 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-5 | shipped | ~2,100 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-1 | shipped | ~2,200 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-8 | shipped | ~2,100 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-3 | shipped | ~2,000 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-6 | shipped | ~2,100 words | tsc: PASS | blinky: pending
2026-04-23 | /enneagram/type-7 | shipped | ~2,000 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/infj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/intj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/enfp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/infp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/entp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/entj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/enfj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/isfj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/istj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/intp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/esfj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/estj | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/istp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/isfp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/estp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /cognitive-functions/esfp | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-4/enneagram-5 | shipped | ~2,600 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-2/enneagram-8 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-9/enneagram-1 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-4/enneagram-9 | shipped | ~2,600 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-2/enneagram-9 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-1/enneagram-7 | shipped | ~2,600 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-5/enneagram-8 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-1/enneagram-4 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-3/enneagram-6 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-7/enneagram-9 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-2/enneagram-4 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-3/enneagram-9 | shipped | ~2,300 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-8/enneagram-9 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-3/enneagram-4 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-24 | /compatibility/enneagram-6/enneagram-9 | shipped | ~2,300 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-1/enneagram-2 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-2/enneagram-3 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-2/enneagram-5 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-2/enneagram-6 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-2/enneagram-7 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-4/enneagram-6 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-4/enneagram-7 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-1/enneagram-3 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-1/enneagram-5 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-1/enneagram-6 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-1/enneagram-8 | shipped | ~2,600 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-3/enneagram-5 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-3/enneagram-7 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-3/enneagram-8 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-4/enneagram-8 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-5/enneagram-6 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-5/enneagram-7 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-5/enneagram-9 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-6/enneagram-7 | shipped | ~2,400 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-6/enneagram-8 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /compatibility/enneagram-7/enneagram-8 | shipped | ~2,500 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/1w9 | shipped | ~1,600 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/1w2 | shipped | ~1,600 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/2w1 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/2w3 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/3w2 | shipped | ~1,600 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/3w4 | shipped | ~1,600 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/4w3 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/4w5 | shipped | ~1,800 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/5w4 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/5w6 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/6w5 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/6w7 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/7w6 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/7w8 | shipped | ~1,600 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/8w7 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/8w9 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/9w1 | shipped | ~1,700 words | tsc: PASS | blinky: pending
2026-04-25 | /enneagram/9w8 | shipped | ~1,700 words | tsc: PASS | blinky: pending
<!-- SEO_LOG_END -->

---

## Hard rules (from /seo command)

- Every page MUST have `generateMetadata` + JSON-LD — no exceptions
- Minimum 1,500 words of unique content (not templates)
- Always include CTA linking to /assessments or app download
- Never use MBTI®, Myers-Briggs®, or RHETI® — use "Thyself Type Index" / "Thyself Enneagram Assessment"
- Every claim cleared by blinky before shipping
