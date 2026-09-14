# Conversion Radar — 2026-09-14

Yesterday's pm pass made `/store` describe the same Pro that `/pricing` sells. This pass audits
`/pricing` itself against the code that actually gates Pro. That finding had been carried over
three passes.

## Re-verified, still solid

- **Post-assessment hook** (`PostAssessmentUpsell`, `QuickTypeAssessment`, `/enneagram/results`),
  **7-day trial** (`PRO_TRIAL_DAYS` on both plans), **annual-first anchoring**, **streak milestone
  upsell** (`MilestoneModal`), **post-lesson banner** (`PostLessonUpgradeBanner`). All unchanged.
- **Trial-framed CTA copy** ("Try Free for 7 Days") on both paid plans.

## Fixed this pass

**`/pricing` listed two Pro benefits that do not exist and left out one that does.**

| Claim | Reality (verified in code) |
|---|---|
| "Audio reflections" (both plans) | `AudioReflection` renders ungated in `HubView.tsx` for every typed user. Free users already have it. |
| "Advanced assessments" (both plans) | No assessment reads Pro status except the Cognitive Functions Assessment (`/assessments/cognitive-type`, `/cognitive/assess`, gated on `psyche-pro-unlocked` or `psyche-cognitive-unlocked`). The vague label hid the one real benefit. |
| Monthly card had no tokens line | `grantProLocally()` in `store/success/page.tsx` credits 500 tokens for every `pro_*` pack. Only Annual listed it, so Monthly looked smaller than it is. |
| `/store`: "500 bonus tokens every month" | Tokens are credited once, at checkout success. Renewals credit nothing (`api/webhook/route.ts` is still TODO). |
| `/assessments/decentering` upsell: "audio reflections" | Same false claim as `/pricing`. |

Principles:
- **Claim integrity at the payment point.** A subscriber who pays for "Audio reflections" and finds the
  same card they had for free reads that as bait. Refund/chargeback risk, and an acquirer diligence flag
  on marketing claims.
- **Value salience / specificity.** "Cognitive Functions Assessment" names a wall users actually hit
  (`CognitivePremiumGate`). "Advanced assessments" names nothing.
- **Plan parity in anchoring.** Leaving tokens off Monthly made the plan look worse than it is. The
  annual-first anchor should come from price, not from missing lines.

Changes:
1. `src/app/pricing/page.tsx`: both plans "Audio reflections" → "Advanced Enneagram tabs",
   "Advanced assessments" → "Cognitive Functions Assessment". Monthly gains "500 bonus tokens".
   `PAYWALL_VARIANT` bumped to `pricing_annual_first_v3` so PostHog can split before and after.
2. `src/app/store/page.tsx`: "500 bonus tokens every month" → "500 bonus tokens when you start".
3. `src/app/assessments/decentering/page.tsx`: upsell body names the cognitive functions instead of audio
   reflections.

tsc: PASS.

Metric to watch: `checkout_initiated` on `/pricing` by `paywall_variant` (v2 vs v3), especially
`pro_monthly` share, plus any refund requests that mention missing features.

## Open findings (need founder decision)

- **Recurring token grant is not implemented.** If "500 tokens every month" is the intended Pro promise,
  `api/webhook/route.ts` needs an `invoice.paid` handler. That backend work needs your approval.
- **"10 exclusive avatar outfits & backgrounds"** (`/store`) and **"Priority new features"**
  (`/pricing`, `/store`): no Pro-only cosmetic flag or feature access mechanism found in `src/`. Keep and
  build, or drop.
- **Streak loss is a dead end at under 3 tokens** (carried over from 2026-09-13-pm).
- Carried over: Growth Path not in Pro vs Type 3 "tracked growth edges" copy; duplicate unit-limit
  modals; no cancellation save flow (new feature); unquantified social proof; no lifetime tier.
