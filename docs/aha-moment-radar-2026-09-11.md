# Aha-Moment Radar — 2026-09-11

**Thyself has two aha paths, and the one that carries organic traffic is the worse of the two.**

| | Home funnel | SEO funnel (180 pages) |
|---|---|---|
| Entry | `/` hero | any of 180 SEO landing pages |
| Promise at the moment of commitment | "10 questions · ~3 minutes" | **"175 scored items"** |
| Next screen | `/onboarding?fromEnter=true`, quiz starts | `/assessments`, a 20-option chooser |
| Taps to type named | 9 | 10 + a 20-way decision |
| Reveal screen | `TypeRevealScreen` (chibi, recognition sentence, W/P/F/A) | `/enneagram/results` (iEQ9 chip, number, name, alias, `typeData.brief`) |

Home path is unchanged from the 2026-09-10 audit and still measures **12 taps / ~2–3 min**, no auth wall, 6 questions to the type name, 2.5s processing beat, share card present. That audit stands.

This pass looked at the entry point the previous passes did not: the 180 SEO pages that are Priority 6's entire purpose.

---

## BIGGEST FRICTION POINT

**Every SEO page sold the assessment as "175 scored items" and then dropped the user on a 20-option menu, so the highest-intent visitor in the funnel met a 30-minute promise and a decision instead of a 6-question quiz.**

Counts at time of audit:
- `grep -rl 'href="/assessments"' src/app` → **180 files**
- `grep -rl 'href="/onboarding' src/app` → **4 files**

The tuned onboarding funnel was reachable essentially only from the home hero. A visitor landing on `/enneagram/type-4` from organic search, having just read 2,400 words about Type 4 and being maximally primed for recognition, scrolls to the single CTA and reads a number that describes a different, much longer instrument than the one the button leads to.

### Shipped this pass

[src/components/seo/EnneagramTypePage.tsx:390](src/components/seo/EnneagramTypePage.tsx:390)
- copy: "175 scored items" → "Six questions to your type"
- CTA href: `/assessments` → `/assessments/quick`

Covers the 9 Enneagram type pages, which are the highest-traffic SEO surface. Removes one tap and one 20-way decision; replaces a 175-item promise with the true 6-question one. `npx tsc --noEmit`: PASS.

Also corrects a trademark-adjacent naming slip: the CTA now says "Thyself Enneagram Assessment", the canonical name, rather than the generic "Thyself assessment".

---

## Queued for founder sign-off

**1. Roll the same fix to the remaining 171 SEO pages.**
The cognitive-function (16), compatibility (45), subtype, wing, tritype, work, relationships, friendship, childhood, growth, stress, communication, parenting and famous-examples pages each inline their own CTA rather than sharing a component. They all point at `/assessments`. This is mechanical (a scripted `href` swap plus a copy line per family) but it changes the conversion destination on 171 pages at once, which is a funnel decision rather than a polish decision. Not shipped autonomously.

Worth pairing with a refactor: extract one `<SeoAssessmentCta>` component so this never drifts across 180 files again.

**2. The SEO funnel lands on the clinical reveal, not the tuned one.**
`/assessments/quick` routes to `/enneagram/results`, which opens with a `Top Matches (iEQ9)` chip, a confidence badge, then number / name / alias / `typeData.brief`. That is the clinical register the 2026-09-10 audit praised `TypeRevealScreen` for avoiding. Share card is present and well-placed (inside the hero block, immediately after the wings row, [results/page.tsx:497](src/app/enneagram/results/page.tsx:497)) — better placed than in `TypeRevealScreen`, in fact. The gap is the opening line, not the share.

Cheapest fix: render the same recognition sentence + W/P/F/A block above `typeData.brief` on `/enneagram/results`. Touches reveal copy, so it needs sign-off under the same rule that queued item 3.

**3. Still pending from 2026-09-10:** move the share card above the four-block hedge stack in `TypeRevealScreen` (pure reorder, no copy deleted). Unchanged since that pass.

---

## Verdict

| Check | Status |
|---|---|
| Auth wall before content | CLEAN, no middleware.ts, no route guards |
| Assessment length | CLEAN, 6 questions to type |
| Processing moment | PRESENT, 2.5s two-beat |
| Share at peak (results page) | STRONG, in-hero placement |
| Share at peak (onboarding reveal) | BURIED under 4 hedge blocks (queued) |
| Home aha path | 12 taps, ~2–3 min |
| **SEO aha path** | **was 13 taps + a 20-way decision + a 175-item promise; now 12 taps on the 9 type pages, unchanged on 171 others** |
