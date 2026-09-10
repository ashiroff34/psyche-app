# Conversion Radar — 2026-09-10

## Verdict

The funnel is in good shape. Six of the seven audit dimensions passed. One
gap was severe and is now fixed; the rest are notes for the founder.

## Fixed this pass — price integrity (commit cd6daa2)

Pro was priced in two places with two different numbers:

| Surface | Monthly | Annual | Annual savings claim |
|---|---|---|---|
| `/pricing` | $7.99 | $47 | (none shown) |
| `/store` | $4.99 | $39.99 | "-33%" |

Both check out through the *same* two Stripe price IDs (`pro_monthly`,
`pro_annual` in `src/app/api/checkout/route.ts`), so one of those screens was
quoting a price the user would never be charged.

Why it mattered beyond cosmetics:

- **Perceived bait-and-switch.** A user who meets $4.99 in the store and then
  $7.99 on the paywall reads it as a price hike. That is the fastest way to
  lose a sale that was already won, and it is the exact pattern the wellness
  space is under scrutiny for post-Noom.
- **Anchoring collapse.** `/pricing` is built so Annual reads as "best value"
  against Monthly. That argument only holds if Monthly is genuinely $7.99.
- **Stale savings math.** "-33%" was computed from the store's own numbers.
  Against the real prices the annual saving is 51%, so the store was
  *understating* its own best offer.

Fix: `src/data/pro-pricing.ts` is now the single source of truth. `/pricing`
and `/store` both import from it; all percent and per-month figures are
derived, not typed.

**Founder action required:** confirm `PRO_MONTHLY_PRICE = 7.99` and
`PRO_ANNUAL_PRICE = 47` match the live Stripe prices behind
`STRIPE_PRICE_PRO_MONTHLY` / `STRIPE_PRICE_PRO_ANNUAL`. The code cannot verify
this — env-driven price IDs are opaque to the client. If Stripe actually
charges $4.99, change the constant, not the component.

## Also fixed — invisible risk reversal on /store (same commit)

`/api/checkout` applies `trial_period_days: 7` to every `pro_*` pack, but
`/store` never mentioned it and its button read "Subscribe Monthly" /
"Subscribe Annually (Save 33%)" — copy that signals an immediate charge.
The strongest lever on the page was being left unused, and the store was
under-promising against its own checkout.

Now: "7 days free, then keep it or cancel. No charge until day 7." above a
"Try Free for 7 Days" CTA, matching `/pricing`.

## Passed

1. **Paywall trigger timing** — fires at genuine peaks, not arbitrary points:
   `enneagram_result`, `cognitive_result`, `quick_result`, `post_lesson`,
   `streak_milestone` (>= 14 days, `MilestoneModal.tsx:190`), plus content
   gates. Every entry point carries a distinct `?from=` label, so `paywall_view`
   is segmentable in PostHog — 20 labelled triggers, no unattributed links.

2. **Pricing page psychology** — anchoring (highest total price first, Free
   last), authority proof (Ichazo / Naranjo / Riso-Hudson), type-personalized
   headline + loss frame via `getPaywallCopy`, therapy anchor ($200 vs $47),
   trial-framed CTA, abandoned-checkout risk-reversal banner, and a surfaced
   checkout-failure state. No scarcity countdowns — a deliberate and correct
   choice for this brand.

3. **Trial mechanics** — 7 days, applied server-side to all `pro_*` packs.
   7 beats 14 on commitment speed. Correct as built.

4. **CTA copy** — 14 occurrences, all benefit-and-trial framed. Zero instances
   of "Get premium access", "Go Pro", or "Upgrade now" anywhere in `src/`.

5. **Post-assessment hook** — every assessment terminates in an upsell. The
   eight secondary assessments use `PostAssessmentUpsell`; the eight thin
   wrappers (`quick`, `this-or-that`, `michael-caloz`, `mistype-investigator`,
   `personality-path`, `essential-enneagram`, `ieq9-integrative`, `self-id`)
   route into `/enneagram/results`, which carries its own. No dead ends.

6. **Pro-gate routing** — all Pro gates route to `/pricing`. The one remaining
   `/store` link in `CognitivePremiumGate.tsx` is a token top-up and sits
   beside a `/pricing` alternative, which is correct.

## Open, not actioned

- **Cancellation friction / save offer.** There is no in-app cancel flow —
  cancellation is `mailto:support@thyself.app`. A "pause instead" or
  "here's what you'll lose" screen has nothing to attach to. Worth building
  only once self-serve cancellation exists; until then the email path is
  honest and the paywall names it explicitly, which is the right trade.

- **Social proof is a vague crowd claim.** `/pricing` says "Thousands are
  mapping their psyche with Thyself". Unlike the authority proof beside it,
  this is unverifiable and would not survive diligence if the number is not
  real. Either substantiate it with an actual figure or drop it — the
  Ichazo/Naranjo/Riso-Hudson line is doing the heavier lifting anyway.
  Not changed autonomously: only the founder knows the true number.

- **No trial-ending nudge.** Nothing reminds a user on day 5 or 6 that the
  trial converts. This raises involuntary-churn refunds and hurts the
  trial-to-paid number diligence will ask about. Retention work, not
  conversion — flagging rather than building, per the no-new-features rule.
