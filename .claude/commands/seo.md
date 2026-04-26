---
description: SEO landing page workflow — audit current page count, generate new type/compatibility/function pages toward the 1,000-page acquisition target. Priority 6 of the 7 dev priorities.
argument-hint: <audit | enneagram <type> | cognitive <type> | compatibility <typeA> <typeB> | status>
---

# /seo — SEO landing page workflow

Priority 6 target: 1,000 indexed landing pages by month 12.
Target volume: Month 3–4: 40 pages → Month 5–6: 200 pages → Month 7–8: 400 pages → Month 9–12: 1,000 pages.

## Parse $ARGUMENTS

- `audit` or `status` → count existing pages and show progress toward 1,000
- `enneagram <type>` → generate page for /enneagram/type-[N] (e.g. `enneagram 4`)
- `cognitive <type>` → generate page for /cognitive-functions/[type] (e.g. `cognitive infj`)
- `compatibility <typeA> <typeB>` → generate page for /compatibility/[typeA]/[typeB]
- Empty → run audit first, then ask which type to generate next

---

## MODE: audit / status

Check existing SEO pages:

```bash
# Count enneagram type pages
ls "/Users/ariannashiroff/Documents/Thyself/psyche-app 2/src/app/enneagram/" 2>/dev/null | grep -v "page\|layout\|error" | wc -l

# Count cognitive function pages
ls "/Users/ariannashiroff/Documents/Thyself/psyche-app 2/src/app/cognitive-functions/" 2>/dev/null | grep -v "page\|layout\|error" | wc -l

# Count compatibility pages
find "/Users/ariannashiroff/Documents/Thyself/psyche-app 2/src/app/compatibility/" -name "page.tsx" 2>/dev/null | wc -l
```

Output:
```
SEO STATUS — <date>

PAGES PUBLISHED:
  Enneagram type pages:      <N> / 27 target (9 types × 3 subtypes)
  Cognitive function pages:  <N> / 16 target
  Compatibility pages:       <N> / 200+ target
  Big Five pages:            <N>
  TOTAL: <N> / 1,000 target (<N>% to goal)

MONTHLY TARGET: <which month we're in> → target <N> pages
STATUS: ON TRACK / BEHIND by <N> pages

NEXT 3 TO BUILD:
  1. /enneagram/type-[N] (highest-traffic Enneagram types first: 4, 2, 9, 5, 1...)
  2. /cognitive-functions/infj (highest-traffic MBTI types: INFJ, INTJ, ENFP...)
  3. /enneagram/type-[N]-wing-[W]
```

---

## MODE: generate page

### Route to create

**Enneagram:** `src/app/enneagram/type-[N]/page.tsx` (e.g. `type-4`)
**Wings:** `src/app/enneagram/type-[N]-wing-[W]/page.tsx`
**Subtypes:** `src/app/enneagram/type-[N]-[sp|sx|so]/page.tsx`
**Cognitive:** `src/app/cognitive-functions/[mbti]/page.tsx` (e.g. `infj`)
**Compatibility:** `src/app/compatibility/enneagram-[N]/enneagram-[M]/page.tsx`

### Required page structure (every SEO page MUST have all of these)

```typescript
// 1. generateMetadata — unique per page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '<Type Name> Personality Type | Thyself',
    description: '<150-char description with primary keyword>',
    openGraph: {
      title: '...',
      description: '...',
      images: [{ url: '/og/<type>.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: 'https://thyself.app/<route>' },
  }
}

// 2. JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',  // or FAQPage for FAQ sections
  headline: '...',
  description: '...',
  author: { '@type': 'Organization', name: 'Thyself' },
}

// 3. Minimum 1,500 words of unique content (not generated templates)
// 4. Internal links to 5+ related type pages
// 5. CTA: 'Take the free Thyself assessment' linking to /assessments or app download
```

### Content requirements per page

**Enneagram type page must include:**
- Core motivation, fear, and desire (Riso-Hudson)
- Levels of development (brief)
- Wings and integration/disintegration lines
- Instinctual subtypes (sp/sx/so overview)
- Growth tips (3-5 practical items)
- Famous examples (historically documented only)
- FAQ section (5+ questions with JSON-LD FAQPage markup)
- Internal links: related types, compatibility pages, cognitive function crossmap
- CTA to take Thyself Enneagram Assessment (NOT RHETI® or any trademark)

**Run blinky after drafting** — every psychological claim must be verified.

### Workflow

1. **linky** drafts the page structure and TypeScript/Next.js boilerplate
2. **pinky** writes the type description content (Naranjo voice for observations, warm-precise for structured sections)
3. **blinky** fact-checks all psychological claims
4. **dinky** reviews copy for UI rules (no "AI" labels, no dashes in copy)
5. **winky** verifies tsc passes and no regressions
6. `/ship seo: add /enneagram/type-[N] landing page`

### Traffic priority order

**Enneagram (build in this order):**
Type 4 → Type 2 → Type 9 → Type 5 → Type 1 → Type 8 → Type 3 → Type 7 → Type 6
(Ordered by search interest; Type 4 gets highest organic search volume.)

**Cognitive functions (build in this order):**
INFJ → INTJ → ENFP → INFP → ENTP → ISFJ → ENTJ → ENFJ → others

**Compatibility (build highest-interest pairs first):**
Type 4 + Type 5 → Type 2 + Type 8 → Type 9 + Type 1 → Type 4 + Type 9

## Hard rules

- Never use MBTI®, Myers-Briggs®, or RHETI® anywhere in generated pages — use "Thyself Type Index" / "Thyself Enneagram Assessment"
- Every claim must clear blinky before shipping
- Each page must have `generateMetadata` + JSON-LD — no exceptions
- Minimum 1,500 words of unique content per page
- Always include a CTA linking to /assessments or app download
- Log each new page to `docs/seo-tracker.md` between the `SEO_LOG_START` / `SEO_LOG_END` markers: `| /enneagram/type-4 | SHIPPED | <date> |`
- Also update the route's status row in `docs/seo-tracker.md` from NOT STARTED → SHIPPED
