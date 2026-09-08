# Conversion Radar — 2026-09-08 (pm pass)

Second audit of the day. The morning pass (`docs/conversion-radar-2026-09-08.md`) closed
the funnel-segmentation gap in `e967c42`. This pass re-checked all six audit items and
found no regressions. Every remaining gap is founder-decision shaped: each one needs
either a new Stripe product, a new route touching payments, or new subscriber state,
which the no-new-features rule reserves for explicit instruction.

## Verified healthy (no action)

| Audit item | Status |
|---|---|
| Paywall trigger timing | Peak-emotional at every entry: `enneagram/results:1393`, `cognitive/results:1319`, `MilestoneModal:190`, `PostLessonUpgradeBanner:99`, `QuickTypeAssessment:1404` |
| Funnel segmentation | All 15 `/pricing` entry points now carry a distinct `?from=` trigger (verified this pass — `e967c42` holding) |
| Post-assessment hook | Complete. 8 secondary assessments carry `PostAssessmentUpsell` inline; the rest terminate in `/enneagram/results` or `/cognitive/results`, both of which carry an upsell. `self-id` (959 lines) redirects to `/enneagram/results:739` — covered |
| Price anchoring | Annual $47 read first, Free $0 last (`PAYWALL_VARIANT = "pricing_annual_first_v2"`) |
| Therapy anchor | "One therapy session is $200. A year of Thyself is $47." |
| Identity-based value prop | Type-personalized `headline` + `lossFrame` + `proBenefit` for all 9 types (`src/data/type-paywall-copy.ts`) |
| Trial mechanics | 7 days applied to every `pro_*` pack at `api/checkout/route.ts:57` — the researched optimum over 14 |
| CTA copy | Benefit + risk-reversal at every gate. No feature-focused CTA remains |
| Abandoned-checkout recovery | `?checkout=cancelled` renders the "Nothing was charged" banner at the exact point hesitation occurred |
| Urgency / scarcity | Deliberately absent, documented as an ethical stance post-Noom FTC settlement. Not treated as a gap |

## Gap 1 — There is no way to cancel inside the app (highest severity)

`/pricing` makes two explicit promises: "Cancel anytime" (trust row, line ~325) and
"cancel before day 7 and you pay nothing" (abandoned-checkout banner). Neither is
fulfilled anywhere in the product:

- No Stripe billing portal route — `src/app/api/` has checkout, webhook, verify-purchase, and four mail routes, no portal
- No subscription section in `src/app/settings/page.tsx` — grep for `subscription|billing|Manage` returns nothing
- `api/webhook/route.ts:74` only *listens* for `customer.subscription.deleted`, so cancellation is assumed to happen entirely outside the app

**Psychology violated — reactance and perceived risk at the commit moment.** A visible,
one-tap exit is what makes a trial feel like a trial. When the exit is invisible, a
share of users resolve the uncertainty by not starting. The promise being printed on the
page and then not existing is worse than silence: it is the first thing a skeptical user
checks after subscribing.

**Second cost — no churn-save surface exists.** There is no "pause instead of cancel"
and no "here is what you lose" screen, so every cancellation is a silent, uncontested
exit. The save-offer screen is the single highest-yield retention surface in a
subscription product, and its absence also means zero cancellation-reason data, which
diligence teams ask for by name.

**Proposed change (needs sign-off — touches payments):**
1. `src/app/api/portal/route.ts` — `stripe.billingPortal.sessions.create` keyed on the stored customer id, returning to `/settings`
2. Settings row: "Manage subscription", visible only when `psyche-pro-unlocked` is true
3. Save-offer interstitial before the portal redirect, loss-framed in the user's own type copy. Reuse `lossFrame` from `type-paywall-copy.ts` verbatim: for a Four, "A type number is the least specific thing about you" is a sharper retention argument than any generic discount. Offer pause (Stripe subscription pause) as the primary action, cancel as the secondary

## Gap 2 — The price anchor tops out at the price you want people to pay

`PLANS` carries Annual $47, Monthly $7.99, Free $0. The dev-priority spec calls for a
$149.99 lifetime tier that was never built.

**Psychology violated — extremeness aversion / the compromise effect.** In a three-tier
set, the middle option takes disproportionate share. As shipped, the option Thyself wants
sold is also the largest number on the page, so it absorbs the flinch instead of being
sheltered by one. Placing lifetime $149 above annual $47 makes $47 read as the moderate
choice without changing a single word of the annual card.

The morning pass's ordering fix (highest first) already did everything ordering can do.
The ceiling is the limit now, not the sequence.

**Proposed change (needs sign-off — requires a new Stripe product):** add
`pro_lifetime` with `STRIPE_PRICE_PRO_LIFETIME`, `mode: "payment"` (not subscription, so
no trial branch applies), rendered first with no badge — the badge stays on Annual, which
is what should still convert.

## Gap 3 — The drip clock runs from signup, not from trial start

`api/send-drip` and `api/cron/send-drips` fire on days 3, 7, 14 and 30 measured from
registration. Trial state is not an input. A user who signs up in April and starts a
trial in September receives nothing during the seven days that decide the subscription.

**Psychology violated — the peak-end rule, at the one end that bills.** A 7-day trial
has exactly one high-leverage message: around day 5, recapping what the user actually
found and naming what continues after day 7. It converts on the specific thing they
discovered, at the moment the decision is live. Right now no message exists at all.

**Proposed change (needs sign-off — requires new subscriber state):** record
`trial_started_at` on `checkout.session.completed` when `mode === "subscription"`, then
add a trial-day-5 branch to the cron keyed on that timestamp rather than signup date.

## Gap 4 — The social proof line is unverifiable

`src/app/pricing/page.tsx:243`: "Thousands are mapping their psyche with Thyself."

Vague quantities read as filler rather than proof, so the line earns little conversion
lift. It also sits directly above the page's own comment citing the post-Noom-FTC ethical
standard for wellness pricing — an unsubstantiated user-count claim is exactly the
category that settlement covered, and an acquirer's diligence team will ask what number
backs it.

The authority proof one line above ("Built on Ichazo, Naranjo, and Riso-Hudson, not pop
psychology") is stronger, substantiable, and already differentiating. **Proposed change
(founder's call, needs the real figure):** replace with a specific verifiable count once
PostHog can supply one, or cut the line and let the authority proof stand alone.

## Recommendation

Gap 1 first, and not primarily as a conversion play: the app currently prints a promise
it cannot keep. Gaps 2 and 3 are the largest measurable conversion levers remaining.
Gap 4 is a half-hour copy decision blocked only on knowing the real number.
