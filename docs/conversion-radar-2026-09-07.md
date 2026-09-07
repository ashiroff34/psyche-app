# Conversion Radar — 2026-09-07

Audit of paywall placement, pricing copy, and conversion triggers.

## Verified healthy (no action)

| Audit item | Status |
|---|---|
| Paywall trigger timing | Fires at peak-emotional moments: `/enneagram/results:1393`, `/cognitive/results:1319`, plus 7 secondary assessments via `PostAssessmentUpsell` |
| Price anchoring | Annual $47 renders first, Free $0 last (`PAYWALL_VARIANT = "pricing_annual_first_v2"`) |
| Therapy anchor | "One therapy session is $200. A year of Thyself is $47." |
| Identity-based value prop | Type-personalized headline + `proBenefit` + `lossFrame` from `src/data/type-paywall-copy.ts` (all 9 types) |
| Loss frame | Present on `/pricing` and in every `PostAssessmentUpsell` body |
| Trial mechanics | 7 days, applied to every `pro_*` pack (`src/app/api/checkout/route.ts:57`) — already the researched optimum over 14 |
| CTA copy | "Try Free for 7 Days" / "Try Pro Free for 7 Days" — benefit + risk-reversal framed |
| Abandoned-checkout recovery | `?checkout=cancelled` renders "Nothing was charged" risk-reversal banner |
| Funnel instrumentation | `paywall_view` / `checkout_initiated` with per-entry-point `trigger` labels |
| Secondary assessment funnels | essential-enneagram, michael-caloz, mistype-investigator, personality-path, ieq9, quick, this-or-that all route into `/enneagram/results`, which carries the upsell |

## Gap fixed this run

**1. Orphan result screen: `/assessments/aspects`** — violated the peak-end rule. The Big Five Aspects result screen ended in a plain "See triangulation" navigation link with no next step, the only remaining result screen in the app without an upsell. Added `PostAssessmentUpsell` (trigger `aspects_result`), copy hooked to the split-factor finding the screen just surfaced. Committed as `d49d2f8`.

## Gaps found, NOT implemented (need founder decision)

**2. Streak milestone modal has no Pro path** — `src/components/MilestoneModal.tsx`
Principle: peak-end rule. A 30 or 100 day streak is the app's second-highest emotional peak, and the modal offers only Journal / Share / Dismiss. Proposal: at milestones >= 30 only, add a third soft option ("You have shown up 30 days. See what is underneath." → `/pricing?from=streak_milestone_30`). Held back because a celebration screen is brand-sensitive; pushing a paywall into it risks reading as exploitative and conflicts with the reflective positioning. Founder call.

**3. No cancellation or manage-subscription surface anywhere** — `src/app/settings/page.tsx`
There is no cancel flow, no billing-portal link, and no save-offer. Two separate consequences:
- Conversion: no "pause instead" or "here is what you lose" retention screen exists, so every churn is silent.
- Compliance: FTC click-to-cancel expects a symmetric, easy cancel path. Its absence is a diligence flag, not just a missed save-offer.
Recommendation: add a plain "Manage subscription" link to the Stripe billing portal in Settings, with an optional single pause-offer screen. Explicitly do NOT add friction beyond one screen — `src/app/pricing/page.tsx:15` commits this codebase to the post-Noom ethical standard. Needs a new `/api/billing-portal` route, so it is out of scope for an autonomous polish pass.

**4. No lifetime tier on `/pricing`** — anchoring ceiling is $47
The Priority 7 spec lists $149.99 lifetime, but the pricing page ships Annual / Monthly / Free only. A lifetime tier rendered first would raise the anchor and make $47/yr read as the moderate option. This is a pricing and product decision (new SKU, new Stripe product), not a copy fix. Founder call.

**5. Social proof is deliberately non-numeric** — `/pricing`: "Thousands are mapping their psyche with Thyself"
Specific numbers convert better than vague ones, but inventing a user count is not an option and real MAU is not yet in a range worth quoting. No action; revisit once MAU supports an honest figure.
