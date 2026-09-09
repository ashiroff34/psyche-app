# Conversion Radar — 2026-09-09

## Verdict

The acquisition-facing conversion surfaces are in good shape. Paywall timing,
anchoring, loss framing, trial length, and funnel instrumentation are all
already correct. The remaining gaps are all **post-purchase** — retention,
cancellation, and involuntary churn — which is now the weakest link in the
LTV:CAC story a diligence team will read.

## Audited and healthy (no action)

| Area | Status |
|---|---|
| Paywall trigger timing | Peak-emotional. `/enneagram/results`, `/cognitive/results`, plus 8 secondary assessments via `PostAssessmentUpsell`. All 10 Enneagram assessments route to `/enneagram/results`, so the hook has full coverage. |
| Price anchoring | Annual $47 read first, then $7.99/mo, then Free. Deliberate high-first ordering (`PAYWALL_VARIANT = "pricing_annual_first_v2"`). |
| Identity-based value prop | `getPaywallCopy(profile.enneagramType)` personalizes headline, loss frame, and benefit line per type. |
| Loss framing | Present on `/pricing` and in `PostAssessmentUpsell` (loss frame first, trial CTA second). |
| Trial length | 7 days, applied to every `pro_*` pack in `src/app/api/checkout/route.ts:57`. Matches the research-optimal length. |
| CTA copy | "Try Free for 7 Days" on both paid plans — benefit + risk-reversal, not feature-focused. |
| Therapy anchor | "One therapy session is $200. A year of Thyself is $47." |
| Abandoned-checkout recovery | `?checkout=cancelled` renders a "Nothing was charged" risk-reversal banner. |
| Funnel analytics | `paywall_view` → `checkout_initiated` → `subscription_start`, segmented by `trigger_event` and `user_lessons_completed`. |

## Fixed this pass

**Cancellation path was promised but never named.** `/pricing` told users to
"cancel before day 7 and you pay nothing" while the product stated no
cancellation mechanism anywhere. A risk-reversal promise the reader cannot act
on is not risk reversal — it leaves an unanswered "how do I get out of this"
objection at the decision point, and it sits badly against the FTC
negative-option standard the page's own comments invoke.

Added the actual path (support@thyself.app, pre-filled subject) directly under
the trial line. Commit `55bcba9`. tsc PASS.

## Open gaps — need founder decision (not built autonomously)

These are all new surfaces, so they fall under the no-new-features rule.

### 1. No subscription management or in-app cancellation (highest impact)

There is no Pro section in `src/app/settings/page.tsx`, no Stripe billing
portal route, and no `billing_portal` call anywhere in `src/`. A paying
subscriber cannot see their plan, their renewal date, or cancel without
emailing support.

**Psychology missed:** the moment before cancelling is when loss aversion is at
its absolute peak — it is the single highest-yield place in the funnel for a
"here is what you lose" or "pause for a month instead" screen. Right now that
moment happens entirely inside an email thread where no save offer can fire.

**Also a diligence issue:** churn is unmeasurable when cancellation is manual,
and the FTC negative-option rule expects a cancellation mechanism at least as
simple as sign-up.

**Proposed:** `src/app/api/billing-portal/route.ts` creating a Stripe
`billingPortal.sessions` link, a Pro block in settings showing plan + renewal
date, and a pre-portal interstitial with a loss-framed save offer.

### 2. `invoice.payment_failed` is an unhandled TODO

`src/app/api/webhook/route.ts:91` — the case is wired but does nothing.
Involuntary churn (expired cards, failed retries) is typically 20 to 40 percent
of all subscription churn, and it is the cheapest churn to recover: a dunning
email recovers a customer who never chose to leave.

**Proposed:** send a card-update email on `invoice.payment_failed`, reusing the
existing Resend setup in `send-receipt`.

### 3. The 7-day trial has no in-app presence

Nothing in the app ever shows "day 4 of 7" or what expires on day 7. The trial
runs invisibly and then converts or lapses.

**Psychology missed:** goal-gradient (visible progress toward a deadline drives
activation) and the Zeigarnik effect the drip emails already exploit well. A
user who never opens the Pro features before day 7 churns silently.

**Proposed:** a small trial-status line on `/daily` for trialing users, naming
the day and one unopened Pro surface.

### 4. Social proof is unfalsifiable

`/pricing` reads "Thousands are mapping their psyche with Thyself." Vague
magnitude claims convert worse than specific ones and carry substantiation
risk. The authority proof next to it ("Built on Ichazo, Naranjo, and
Riso-Hudson") is the stronger asset and is doing more work.

**Proposed:** replace with a specific, true, verifiable number once one exists
in PostHog, or drop the line and let the authority proof stand alone.

## Deliberate non-findings

No urgency or scarcity mechanic was recommended. `/pricing` documents this as a
trust-based pricing decision following the post-Noom FTC settlement standard for
the wellness category, and countdown timers would contradict Thyself's
reflective positioning. Leaving as-is.
