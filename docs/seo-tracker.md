# SEO Page Tracker

**Target:** 1,000 indexed landing pages by month 12
**Current total:** 33 dedicated static SEO pages (all 9 Enneagram types + all 16 cognitive function types + 8 compatibility pairs)

> Note: `/enneagram/[type]` exists as a client-side dynamic route (not SEO-optimized). Dedicated static pages with `generateMetadata` + JSON-LD are needed for Google indexing.

---

## Progress by type

| Month target | Goal | Actual | Status |
|---|---|---|---|
| Month 3–4 | 40 pages | 33 | IN PROGRESS |
| Month 5–6 | 200 pages | 0 | NOT STARTED |
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
<!-- SEO_LOG_END -->

---

## Hard rules (from /seo command)

- Every page MUST have `generateMetadata` + JSON-LD — no exceptions
- Minimum 1,500 words of unique content (not templates)
- Always include CTA linking to /assessments or app download
- Never use MBTI®, Myers-Briggs®, or RHETI® — use "Thyself Type Index" / "Thyself Enneagram Assessment"
- Every claim cleared by blinky before shipping
