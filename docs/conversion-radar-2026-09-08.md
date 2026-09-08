# Conversion Radar — 2026-09-08

Audit of paywall placement, pricing copy, and conversion triggers.

## Verified healthy (no action)

| Audit item | Status |
|---|---|
| Post-assessment hook | Complete coverage. Every one of the 18 assessment routes now terminates in an upsell-carrying screen — 8 carry `PostAssessmentUpsell` inline, the other 10 redirect into `/enneagram/results` or `/cognitive/results`, which both carry one |
| Paywall trigger timing | Peak-emotional: `/enneagram/results:1393`, `/cognitive/results:1319`, `MilestoneModal:190` (streak milestone), `PostLessonUpgradeBanner:99` |
| Price anchoring | Annual $47 first, Free $0 last (`PAYWALL_VARIANT = "pricing_annual_first_v2"`) |
| Therapy anchor | "One therapy session is $200. A year of Thyself is $47." |
| Identity-based value prop | Type-personalized headline + `proBenefit` + `lossFrame` per type (`src/data/type-paywall-copy.ts`) |
| Loss frame | On `/pricing` and in every `PostAssessmentUpsell` |
| Trial mechanics | 7 days on every `pro_*` pack (`src/app/api/checkout/route.ts:57`) — the researched optimum over 14 |
| CTA copy | Benefit + risk-reversal framed at every gate ("Try Pro Free for 7 Days", "Unlock Self Work — Free for 7 days"). No feature-focused CTA remains |
| Abandoned-checkout recovery | `?checkout=cancelled` renders the "Nothing was charged" risk-reversal banner |

## Gap fixed this run

**1. Nine Pro gates were invisible to the conversion funnel** — committed as `e967c42`

Every gate below linked to a bare `/pricing`, so `paywall_view` recorded them all as `trigger_event: "direct"`, indistinguishable from someone tapping Pricing in the nav menu. The funnel had a denominator but no segmentation: it could measure *that* people convert, never *which gate* converts. That is the single highest-leverage measurement in a freemium funnel, and its absence is also a diligence-legibility problem — an acquirer's team asks which surface drives subscriptions first.

Costliest conflation was `QuickTypeAssessment.tsx:1404`: a post-result CTA at a peak-emotional moment, reported identically to idle nav browsing.

| File | Trigger added |
|---|---|
| `src/app/journal/page.tsx:2433` | `inner_work_lab_gate` |
| `src/app/assessments/cognitive-type/page.tsx:58` | `cognitive_type_gate` |
| `src/app/cognitive/assess/page.tsx:35` | `cognitive_assess_gate` |
| `src/app/cognitive/learn/page.tsx:1953` | `cognitive_learn_gate` |
| `src/app/history/page.tsx:847` | `type_history_gate` |
| `src/app/enneagram/learn/page.tsx:173` | `type_self_work_gate` |
| `src/app/enneagram/learn/page.tsx:180` | `restore_link` |
| `src/app/enneagram/[type]/page.tsx:101` | `type_page_gate` |
| `src/components/assessments/QuickTypeAssessment.tsx:1404` | `quick_result` |

`trigger_event` is typed as a free-form `string` (`src/lib/analytics.ts:106`), so no schema change was needed. `checkout_initiated` inherits the same value via `triggerRef`, so gate → checkout → subscription is now traceable end to end. tsc: PASS.

**Deliberately not tagged:** the nav menu entry (`src/components/Navigation.tsx:182`). A query string there breaks the active-state highlight, which matches on `pathname.startsWith(item.href)` (`Navigation.tsx:292`) against a `usePathname()` value that excludes the query. Leaving it untagged also keeps `"direct"` meaningful — it now denotes nav and deep-link traffic only, with every gate named.

## Gaps still open (need founder decision — unchanged from 2026-09-07)

**2. No cancellation or manage-subscription surface** — `src/app/settings/page.tsx`
No cancel flow, no billing-portal link, no save-offer. Conversion cost: every churn is silent, with no "pause instead" retention screen. Compliance cost: FTC click-to-cancel expects a symmetric cancel path, so its absence is a diligence flag independent of the missed save. Needs a new `/api/billing-portal` route — out of scope for an autonomous polish pass. Recommend one plain "Manage subscription" link plus at most one pause-offer screen; more friction than that breaks the post-Noom ethical standard this codebase commits to at `src/app/pricing/page.tsx:15`.

**3. No lifetime tier on `/pricing`** — anchoring ceiling is $47
The Priority 7 spec lists $149.99 lifetime; the page ships Annual / Monthly / Free. A lifetime tier rendered first would raise the anchor and reframe $47/yr as the moderate option. Requires a new SKU and Stripe product — pricing decision, not a copy fix.

**4. Social proof is non-numeric** — "Thousands are mapping their psyche with Thyself"
Specific numbers convert better, but inventing a count is not an option and real MAU is not yet worth quoting. No action; revisit when MAU supports an honest figure.
