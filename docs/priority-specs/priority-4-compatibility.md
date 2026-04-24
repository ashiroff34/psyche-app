# Priority 4 — Compatibility Feature: Implementation Spec

**Status:** NOT STARTED (as of 2026-04-22)
**Strategic note:** Compatibility is the Co-Star-style viral mechanic. Each share brings in new installs. Strong DAU/MAU signal because users return to check new matches.
**Migration:** `supabase/migrations/20260422000004_relationships.sql` — READY TO APPLY

---

## What to build

Allow two users to connect via invite code and see their Enneagram compatibility analysis.

### User flow

1. User A opens Compatibility tab → "Invite someone"
2. App generates a unique 8-char code (e.g. `TH4X9B2K`) → stores in `relationships` table
3. User A shares the code (copy / native share sheet) or shares a direct link
4. User B opens the app → enters the code → connection is established
5. Both users see the compatibility analysis: strengths, tensions, growth tips

---

## Invite code generation

```typescript
// src/lib/compatibility.ts
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'  // no ambiguous chars (0/O, 1/I)
  return Array.from(
    crypto.getRandomValues(new Uint8Array(8)),
    b => chars[b % chars.length]
  ).join('')
}

export function getInviteLink(code: string): string {
  return `https://thyself.app/connect?code=${code}`
}
```

---

## Compatibility analysis (content)

**DO NOT use generic astrology-style compatibility.** Content must be grounded in Enneagram theory.

For each type pair (A + B), provide:
1. **Core dynamic** — what draws these types together (1-2 sentences, Naranjo/Riso-Hudson grounded)
2. **Strengths** — 3 bullet points (specific, behavioral)
3. **Tensions** — 2 bullet points (specific, not judgmental)
4. **Growth invitation** — 1 tip for each partner

All 81 type pairs (9×9) need content. Store as static data in `src/data/compatibility.ts`.

**blinky must review all type-pair descriptions** before shipping — compatibility claims are among the most misattributed in Enneagram pop-psych.

---

## Routes to create

```
src/app/compatibility/page.tsx              — Compatibility home (invite flow)
src/app/compatibility/[code]/page.tsx       — Accept invite flow
src/app/compatibility/results/page.tsx      — Analysis view (shared between both users)
```

---

## Shareable card (viral mechanic)

The shareable card is what makes this viral. Generate a 1200×630 canvas card:

```typescript
// src/lib/share-card.ts
import html2canvas from 'html2canvas'

export async function generateCompatibilityCard(
  typeA: number, typeB: number, userName: string, partnerName: string
): Promise<Blob> {
  const card = document.getElementById('compatibility-card')
  if (!card) throw new Error('Card element not found')
  const canvas = await html2canvas(card, { scale: 2 })
  return new Promise(resolve => canvas.toBlob(b => resolve(b!), 'image/png'))
}
```

Card content:
- "User A (Type X) + User B (Type Y)"
- Top compatibility strength in large type
- Thyself logo + "thyself.app" watermark
- Deep link back to app

---

## Supabase table

Apply migration `20260422000004_relationships.sql`. Key columns:
- `invite_code` — unique, 8-char, used for deep links
- `status` — `pending` → `active` → `archived`
- `compatibility_score` — 0–1 pre-computed float
- `compatibility_notes` — JSON with strengths/tensions/tips

---

## PostHog events

```typescript
track('compatibility_invite_created', { type_a: 4 })
track('compatibility_invite_accepted', { type_a: 4, type_b: 5 })
track('compatibility_card_shared', { type_a: 4, type_b: 5, method: 'native' | 'copy' })
track('compatibility_card_viewed', { type_a: 4, type_b: 5 })
```

---

## Paywall gate

Entire feature is Pro-only (gated via `usePro`). Show paywall sheet on tab tap if not Pro.

---

## SEO pages (Priority 6 overlap)

Compatibility pages are also high-value SEO targets. After building the in-app feature, generate static SEO pages via `/seo compatibility 4 5`, `/seo compatibility 2 8`, etc. These can use the same content from `src/data/compatibility.ts`.
