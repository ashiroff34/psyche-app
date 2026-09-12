# Conversion Radar — 2026-09-12

Audit of paywall placement, pricing copy, and conversion triggers.

## Already solid (carried from 2026-09-11, re-verified)

- **Peak-moment trigger.** Every assessment result carries an upsell (`PostAssessmentUpsell`,
  `/enneagram/results`, `/cognitive/results`, quick quiz result).
- **Trial.** 7 days, single-sourced from `PRO_TRIAL_DAYS` across `/api/checkout` and all CTAs.
- **Anchoring.** `/pricing` reads Annual ($47, "Save $48.88 a year") → Monthly ($7.99) → Free.
- **Identity + loss framing.** Per-type `headline` / `lossFrame` from `type-paywall-copy.ts`.
- **CTA copy.** No feature-framed "Upgrade" / "Go Pro" / "Unlock in Store" strings remain;
  every Pro CTA reads "Try Pro Free for N Days" and routes to `/pricing`.

## Fixed this pass

**Four upsells pitched a free trial to people already paying for Pro.**
Yesterday `/pricing` learned to respect subscribers, but the surfaces that link *into* it
did not. `PostAssessmentUpsell` and every gate page check `psyche-pro-unlocked`; these four
never read it:

| Surface | What a subscriber saw |
|---|---|
| `src/app/enneagram/results/page.tsx` | "Go deeper, Type N" card with a loss frame for content they already own |
| `src/components/assessments/QuickTypeAssessment.tsx` | "Without subtypes and tritype, this stays surface-level" at their result |
| `src/components/lessons/PostLessonUpgradeBanner.tsx` | "Pro takes you the rest of the way" every 3rd lesson |
| `src/components/MilestoneModal.tsx` | Trial CTA in place of "Keep Going" at 14+ day streaks |

Principle violated: peak-end rule, inverted. The result reveal and streak milestone are the
moments that most shape how a subscriber remembers the product. A "you're missing out" loss
frame there tells a paying user the thing they paid for is not what they have, which is a
retention and refund risk, not a conversion. It also pollutes `/pricing?from=` attribution
with clicks that can never convert.

Change: new `src/hooks/useProUnlocked.ts` (starts `true` so no upsell flashes for a subscriber
before localStorage is read; `/pricing` keeps its own `false` default since it is the offer).
All four surfaces now hide the pitch for Pro; the milestone modal falls back to "Keep Going".

tsc: PASS.

## Open findings (need founder decision, unchanged)

- **No cancellation save flow.** No self-serve cancel exists; a "pause instead" screen has
  nothing to attach to. New feature, deferred under the no-new-features rule.
- **Social proof unquantified.** Keep vague until MAU supports a true number.
- **No lifetime tier.** Priority-7 spec lists $149.99 lifetime as a top anchor; pricing decision.
- **Pro-flag reads are duplicated** in ~10 gate pages. They can adopt `useProUnlocked`
  mechanically, but gate pages need a `false` default (they gate content), so a refactor
  should take the default as a parameter. Left out to keep this commit reviewable.
