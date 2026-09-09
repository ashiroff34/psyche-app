# Conversion Radar — 2026-09-09 (pm pass)

Second pass of the day. The morning pass (`docs/conversion-radar-2026-09-09.md`)
named the cancellation path on `/pricing` (`55bcba9`). This pass re-verified the
six audit items, found no regressions, and closed one new gap that sits closer
to the money than anything previously logged.

## Fixed this pass

**`/pricing` swallowed checkout failures silently.**

`handleCheckout` did `if (data.url) window.location.href = data.url;` with no
else branch, and its `catch` only wrote to `console.error`. Every failure mode —
Stripe price ID unset (the route returns 503 by design), a 500 from the Stripe
API, the 15-second abort, a dropped connection — ended the same way: the button
showed "Opening checkout..." for a moment, reverted to "Try Free for 7 Days",
and said nothing. To the user, the buy button did nothing.

This is the most expensive silent failure in the product. Every other gap in
this radar's backlog concerns persuading someone to decide; this one happens
*after* they decided. `/store` already handles the identical failure correctly
with a toast (`src/app/store/page.tsx:311`) — `/pricing`, the page that sells
the subscription, was the one missing it.

**Psychology violated — feedback and attribution of failure.** With no error
message, the user attributes the dead button to the product, not to a transient
technical fault, and a second click is not obviously worth trying. The recovery
copy therefore leads with the reassurance ("Nothing was charged"), which is the
same risk-reversal move the abandoned-checkout banner already makes, rather than
with an apology.

**Second cost — the funnel's biggest step-down was unattributable.** A
technical failure and a change of heart both looked like `checkout_initiated`
with no `subscription_start` following it. A `checkout_failed` event now carries
`product_id`, `price`, `period`, `trigger`, and `reason`, so the drop between
those two steps can be split into "broke" and "chose not to". That split is a
number a diligence team asks for by name, and a misattributed conversion rate
understates the funnel.

Changes:
- `src/lib/analytics.ts` — added `checkout_failed` to `EventSchema` and a
  `Analytics.checkoutFailed` helper, matching the existing event style
- `src/app/pricing/page.tsx` — `checkoutError` state, a `reportCheckoutFailure`
  helper covering both the no-URL and thrown-error paths, and a rose alert
  rendered above the plan cards. The unconfigured-Stripe case gets its own line
  ("Checkout is not open yet. Your trial is still waiting when it is.") so a
  pre-launch state does not read as a bug

tsc: PASS.

## Verified healthy (no action)

| Audit item | Status |
|---|---|
| Paywall trigger timing | Peak-emotional at every entry. `/enneagram/results`, `/cognitive/results`, `PostAssessmentUpsell` on 8 secondary assessments |
| Funnel segmentation | 15 distinct `?from=` entry points into `/pricing`, all still carrying their trigger |
| Price anchoring | Annual $47 first, Monthly $7.99, Free $0 last (`PAYWALL_VARIANT = "pricing_annual_first_v2"`) |
| Therapy anchor | "One therapy session is $200. A year of Thyself is $47." |
| Identity-based value prop | `getPaywallCopy` personalizes headline, loss frame, and benefit for all 9 types |
| Loss framing | Present on `/pricing` and in `PostAssessmentUpsell` |
| Trial mechanics | 7 days on every `pro_*` pack, `api/checkout/route.ts:57` |
| CTA copy | Benefit + risk-reversal throughout. A scan for "Upgrade to" / "Go Pro" / "premium access" returns zero hits |
| Pro-gate routing | No Pro gate routes to `/store`. The six remaining `/store` links are all genuinely token-related (hearts, token balance, store nav) |
| Cancellation path | Named on `/pricing` as of `55bcba9` |
| Urgency / scarcity | Deliberately absent, documented post-Noom-FTC. Not a gap |

## Open gaps — carried forward, unchanged

All four still need founder sign-off; each needs a new route, a new Stripe
product, or new subscriber state, which the no-new-features rule reserves for
explicit instruction. Full detail in `docs/conversion-radar-2026-09-09.md`.

1. **No in-app subscription management or cancellation** — no billing-portal
   route, no Pro block in settings, so no save-offer surface at the moment loss
   aversion peaks, and churn is unmeasurable
2. **`invoice.payment_failed` is an unhandled TODO** (`api/webhook/route.ts:91`)
   — involuntary churn is 20 to 40 percent of subscription churn and the
   cheapest to recover
3. **The 7-day trial has no in-app presence** — no "day 4 of 7", no trial-day-5
   email (the drip clock runs from signup, not trial start)
4. **Social proof is unfalsifiable** — "Thousands are mapping their psyche with
   Thyself" needs a real PostHog number or should be cut

## Recommendation

Unchanged: gap 1 first. It is the only remaining item that is both a conversion
lever and a promise the product currently prints without keeping.
