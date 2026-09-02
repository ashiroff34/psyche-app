# Conversion Radar — 2026-09-02

**Verdict: 1 real gap found and fixed. Post-assessment hook was missing on the secondary assessments.**

Prior runs (2026-08-05, 2026-08-06) audited the two primary results screens and marked the
post-assessment hook "solid." That was true but incomplete: the audit never enumerated the
*other* assessments. This run did, and found 17 assessment pages with zero link to `/pricing`.

## Audit results

| Dimension | Status | Evidence |
|---|---|---|
| Paywall trigger timing | Solid | Peak-emotional gates at `enneagram/results:1401`, `cognitive/results:1311`, journal, history, cognitive learn |
| Pricing page psychology | Solid | Type-personalized headline (`TYPE_PAYWALL_HEADLINES`), authority proof (Ichazo / Naranjo / Riso-Hudson), therapy anchor ($200 session vs $47/yr), annual "Best value" high-anchor, honest social proof, trial CTA |
| Trial mechanics | Solid | 7-day trial (`api/checkout/route.ts:57`), applied to every `pro_*` pack, "No charge until day 7" |
| Upgrade CTA copy | Solid | "Try Pro Free for 7 Days" across all 12 upsell surfaces; zero feature-focused copy |
| **Post-assessment hook** | **GAP — fixed this run** | Only 3 of 20 assessment/result screens linked to `/pricing` |
| Cancellation friction | Feature-territory | Still no in-app cancel / pause-instead flow (founder call, unchanged) |

## The gap (peak-end rule violation)

The moment a user finishes an assessment and reads their result is the highest-intent point in
the app. Four free, ungated assessments delivered a full result screen and then dropped the user
straight back to the assessment list with no next step:

- `assessments/instinctual` — full stacking result (sp/sx/so scores, dominant instinct, blind spot), then "Back to Assessments"
- `assessments/tritype` — full tritype reveal with archetype and center scores, then "Next Step" pointing at the assessment list
- `assessments/big-five`, `assessments/attachment` — same shape

This is a direct peak-end-rule miss, and it is the exact content Pro sells: the pricing page's own
loss frame reads "Without subtypes, tritype, and Shadow Work, your type stays surface-level." A user
who just learned their stacking or tritype is at maximum intent for that content and was shown nothing.

## Fix shipped

New shared component `src/components/PostAssessmentUpsell.tsx`, wired into the two result screens
whose output maps directly onto Pro's value prop (instinctual stacking, tritype).

Psychology applied:
- **Peak-end rule** — fires at the result reveal, not at an arbitrary navigation point
- **Loss framing** — leads with what stays out of reach, not with a feature list
- **Risk reversal** — trial-framed CTA ("Try Pro Free for 7 Days"), matching every other upsell surface
- **Correct routing** — `/pricing`, never `/store` (token purchase only)
- **Honors Pro** — reads `psyche-pro-unlocked` and renders nothing for existing subscribers, so paid
  users never see a "Try Pro Free" prompt (the failure mode fixed in `3e6cee7`)

Copy:
- instinctual: "Your stacking is the map. The 27 subtypes are the territory." / "Without the subtype deep-dives, countertype patterns, and Shadow Work, your instinctual stacking stays a label. Pro takes you the rest of the way."
- tritype: "Knowing your tritype is the start. Living it is the work." / "Without the tritype deep-dive, subtype layers, and Shadow Work, {code} stays three numbers. Pro takes you the rest of the way."

`npx tsc --noEmit`: PASS.

## Deliberately NOT added (would be regressions)

1. **Urgency / scarcity countdowns** — omitted by design (post-Noom FTC ethical standard). Fake urgency is acquisition-diligence risk, not lift.
2. **Specific social-proof numbers** ("Join 50,000...") — Thyself is not at that scale; a fabricated number is dishonest and legally exposed. Honest "Thousands are mapping their psyche" stays.
3. **Upsell on `big-five` / `attachment` results** — those results do not map onto a Pro feature the way stacking and tritype do. Adding a generic prompt there would be upsell noise, not a peak-end hook. Revisit if Pro gains Big Five depth content.

## For founder (surface, do not build)

- **Cancellation retention flow** — still the one genuinely missing conversion lever. A post-subscribe
  pause-instead / "here's what you'll lose" screen requires a Stripe billing-portal integration plus UI,
  which lands in new-feature territory and awaits explicit instruction. Highest-leverage churn reducer
  and reads well in diligence (retention feeds the DAU/MAU defensibility story).
