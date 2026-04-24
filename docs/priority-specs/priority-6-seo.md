# Priority 6 — SEO Landing Pages: Implementation Spec

**Status:** NOT STARTED (as of 2026-04-23)
**Strategic note:** 1,000 SEO pages = long-tail organic moat. Acquirers see a defensible content library, not a one-trick quiz app. Type-specific pages rank for high-intent queries ("enneagram type 4 explained", "INFJ cognitive functions"). Free traffic compounds post-acquisition.
**Tracker:** `docs/seo-tracker.md` — update after each page ships.

---

## Why static pages matter

`/enneagram/[type]` is currently `"use client"` — Google cannot crawl it. The SEO pages are a separate route with:
- `generateMetadata()` — title, description, OG tags
- `<script type="application/ld+json">` — JSON-LD (Article schema)
- Server-rendered HTML — fully crawlable
- 1,500+ words of original, blinky-reviewed content per page

---

## Traffic priority order

Build in this order (highest search volume first):

### Enneagram (9 pages)
```
1. Type 4 — "enneagram 4", "enneagram type 4" (~165K/mo)
2. Type 2 — "enneagram 2", "enneagram helper type"
3. Type 9 — "enneagram 9", "enneagram peacemaker"
4. Type 5 — "enneagram 5", "enneagram investigator"
5. Type 1 — "enneagram 1", "enneagram perfectionist"
6. Type 8 — "enneagram 8", "enneagram challenger"
7. Type 3 — "enneagram 3", "enneagram achiever"
8. Type 7 — "enneagram 7", "enneagram enthusiast"
9. Type 6 — "enneagram 6", "enneagram loyalist"
```

### Cognitive Functions / 16 Types (16 pages)
```
1. INFJ — highest search volume, fan-favorite
2. INTJ — "rarest type" queries
3. ENFP — viral on TikTok / Reddit
4. INFP — "enneagram 4 mbti" crossover
5. ENTJ, INTP, ENTP, ISFJ, ISFP, ESFP, ESTP, ESTJ, ISTJ, ESFJ, ENFJ, ISTP
```

### Compatibility (10 high-volume pairs to start)
```
4+9, 4+5, 2+9, 1+7, 5+8, 2+4, 3+9, 1+4, 8+2, 6+9
```

---

## Route structure

```
src/app/enneagram/type-[1-9]/page.tsx          — Enneagram type pages
src/app/cognitive-functions/[mbti]/page.tsx    — 16-type pages
src/app/compatibility/[typeA]-[typeB]/page.tsx — Compatibility SEO pages
```

---

## Page structure (required for every page)

### 1. `generateMetadata()` — server function

```typescript
export async function generateMetadata(
  { params }: { params: { type: string } }
): Promise<Metadata> {
  return {
    title: `Enneagram Type 4: The Individualist | Thyself`,
    description: `Deep dive into Enneagram Type 4 — core motivations, fears, growth path, famous Type 4s, and how the Individualist shows up in relationships and work.`,
    openGraph: {
      title: `Enneagram Type 4: The Individualist`,
      description: `...`,
      url: `https://thyself.app/enneagram/type-4`,
      type: 'article',
    },
    alternates: {
      canonical: `https://thyself.app/enneagram/type-4`,
    }
  }
}
```

### 2. JSON-LD schema

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Enneagram Type 4: The Individualist',
  description: '...',
  author: { '@type': 'Organization', name: 'Thyself' },
  publisher: { '@type': 'Organization', name: 'Thyself', url: 'https://thyself.app' },
  url: 'https://thyself.app/enneagram/type-4',
  datePublished: '2026-04-23',
  dateModified: '2026-04-23',
}

// In JSX:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

### 3. Page sections (required — 1,500+ words total)

```
H1: Enneagram Type [N]: The [Name]
H2: Core Motivation & Fear
H2: Key Traits
H2: How Type [N] Shows Up at Work
H2: How Type [N] Shows Up in Relationships
H2: Growth Path (Integration toward Type [X])
H2: Stress Path (Disintegration toward Type [Y])
H2: Wings: [N]w[N-1] and [N]w[N+1]
H2: Instinctual Variants (sp / sx / so)
H2: Famous Type [N]s
CTA: "Discover your type" → links to /quiz or /assessments
```

### 4. CTA block (required — acquisition funnel)

```tsx
<section className="bg-[TYPE_COLOR] rounded-2xl p-8 text-center">
  <h2>Discover your Enneagram type</h2>
  <p>Take the free Thyself assessment — 10 minutes, no email required.</p>
  <Link href="/assessments">Start the assessment</Link>
</section>
```

---

## Content rules

- **All content reviewed by blinky** before shipping — no exceptions.
- **Source hierarchy**: Ichazo → Naranjo → Riso-Hudson for Enneagram; Jung → Briggs Myers for 16-type.
- **No MBTI® trademark** — say "16-type" or "cognitive function type", not "MBTI type".
- **No pseudoscience framing** — present as "psychological frameworks and self-knowledge tools".
- **TYPE_COLORS** — import from `src/data/enneagram.ts`. Never hardcode hex values.
- **No `new Date("YYYY-MM-DD")`** — use `Intl.DateTimeFormat("en-CA")` for date display.
- **Minimum 1,500 words** — thin content won't rank. Google wants depth.
- **Original sentences** — never copy from Wikipedia or existing Enneagram sites. Write original.

---

## `/seo` command workflow

The `/seo` command chains agents in order:
```
linky (builds page scaffold) 
→ pinky (writes content, 1,500+ words)
→ blinky (fact-checks all psychological claims)
→ dinky (UI polish: TYPE_COLORS, touch targets, no AI labels)
→ winky (tsc health check)
→ /ship (commit + push)
```

Usage:
```
/seo enneagram 4       — generate Type 4 page
/seo enneagram 2       — generate Type 2 page
/seo cognitive INFJ    — generate INFJ cognitive page
/seo compatibility 4 5 — generate Type 4+5 compatibility page
/seo audit             — report page count vs. 1,000-page target
```

---

## Sitemap integration

Add all SEO pages to `src/app/sitemap.ts`:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const enneagramPages = [1,2,3,4,5,6,7,8,9].map(n => ({
    url: `https://thyself.app/enneagram/type-${n}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: n === 4 ? 0.9 : 0.8,
  }))
  
  return [
    { url: 'https://thyself.app', lastModified: new Date(), priority: 1.0 },
    ...enneagramPages,
    // Add cognitive + compatibility pages as built
  ]
}
```

---

## Tracker

Update `docs/seo-tracker.md` after each page ships. Ship log format:
```
<!-- SEO_LOG_START -->
2026-04-23 | /enneagram/type-4 | shipped | 1,620 words | blinky: ACCURATE
<!-- SEO_LOG_END -->
```

---

## PostHog events

```typescript
track('seo_page_viewed', { page_type: 'enneagram', type_number: 4 })
track('seo_cta_clicked', { page_type: 'enneagram', type_number: 4, destination: 'assessments' })
```

---

## Monthly targets (from seo-tracker.md)

| Month | Pages | Types covered |
|---|---|---|
| 1-2 | 5 | 9 Enneagram types done |
| 3-4 | 40 | + first 16-type pages |
| 5-6 | 200 | + top compatibility pairs |
| 7-8 | 400 | long-tail coverage |
| 9-12 | 1,000 | full library |
