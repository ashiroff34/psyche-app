# Type-Aware Personalization Radar — 2026-09-11

## Verdict

Type-aware UX is **strong**, not thin. The audit's working hypothesis (that the
app may treat a Two and an Eight identically) does not hold. One real gap found
and fixed; the rest of the surface area is already personalized.

## Audit results

| # | Surface | Status | Evidence |
|---|---|---|---|
| 1 | Personalized CTAs (daily / profile / growth) | PERSONALIZED | `HubView.tsx:1077` resolves `hub.start.headline` + `hub.start.sub`; `growth/page.tsx:101` uses `useTypeAwareCopy()` for the unlock gate; `profile/page.tsx` has 60 type references |
| 2 | Daily observations | PERSONALIZED | `daily-observations.ts`, `daily-insights-index.ts`, `community-voices.ts` all `Record<number, ...>`; `daily/page.tsx:1043-1047` selects insight, challenge, and community voice by type |
| 3 | Growth tips | PERSONALIZED | `growth-edges.ts` type-keyed; `/growth` resolves an active type and renders per-type content |
| 4 | Assessment result page | PERSONALIZED | `enneagram/results/page.tsx:1413` and `cognitive/results/page.tsx:1317` both pull type-specific paywall copy |
| 5 | Paywall copy | PERSONALIZED | `type-paywall-copy.ts` carries headline / lossFrame / proBenefit for all 9 types, consumed on `/pricing`, `/enneagram/results`, `/cognitive/results` |
| 6 | Lesson progression | PERSONALIZED | `lessons/page.tsx:122-127` `orderUnitsForType()` floats the user's own type unit to the front |

Also already type-aware (outside the brief): push notifications
(`capacitor-notifications.ts:158, 339` — per-type streak warnings and
re-engagement bodies), streak milestones (`streakMilestones.ts` — nine
messages per milestone), token pack headlines, journal empty state,
re-engagement banner, quiz completion, and the onboarding type reveal.

The `type-aware-copy.ts` library had 7 surfaces and 14 keys before this pass,
**all of them wired to live call sites** — no orphaned copy.

## Gap found and fixed

**`/assessments` next-assessment recommendation.** The hub's recommendation
engine (`getRecommendation`) returns a `why` field that is the persuasive case
for taking the next assessment. It branched only on completion booleans, so all
nine types read identical copy at the single highest-leverage funnel point in
the app — `/assessments` is the CTA target of all 224+ SEO landing pages, and
each additional completed dimension is both a retention lever and a
diligence-legible data point.

Worse, the instinctual-stacking branch made its argument with a worked example
about Type 5s ("Two Type 5s with different stackings can feel like entirely
different people") shown to users the app had *already typed as something else*.

Fixed in `30a9e45`: added SURFACE 8 to the copy library with 9 variants each for
`assessments.why.instinct`, `.tritype`, `.cognitive`, and `.bigfive`, and
threaded the user's type into `getRecommendation`. Each variant argues from that
type's Riso-Hudson core motivation (One: precision and where the correction
fires; Five: resolution and what gets conserved; Nine: one short step, nothing
to weigh up). The recommended assessment itself is unchanged. The pre-type
branch keeps the default string, so untyped users see exactly what they saw
before. tsc passes; no dashes, emoji, or trademarked instrument names.

## Remaining lower-priority candidates

Routes with zero type references. Most are legitimately generic (`glossary`,
`bookmarks`, `history`, `data-usage`, `beta`). Worth considering later:

- **`/read`** (library index) — section order is fixed. `/lessons` already floats
  the user's own type to the front; `/read` could reuse `orderUnitsForType`'s
  approach so the Enneagram section leads with the reader's own type.
- **`/type-match`**, **`/sprint`**, **`/arcs`** — entry copy is generic; each has
  a natural slot for a one-line type-framed reason to start.

None of these is close in value to the `/assessments` fix, which is why it was
the one implemented.
