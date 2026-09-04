# Conversion Radar — 2026-09-04

Shipped: `dc1e4fe` — 2 gaps closed. tsc PASS.

## Audit result by area

| # | Area | Status |
|---|---|---|
| 1 | Paywall trigger timing | GOOD — fires at emotional peaks: enneagram result, cognitive result, 4 secondary assessments, streak milestone, post-lesson |
| 2 | Pricing page psychology | GOOD — annual-first anchoring, therapy anchor ($200 vs $47), loss frame, identity headline per type, authority proof, social proof |
| 3 | Trial mechanics | GOOD — 7 days on all `pro_*` packs, "No charge until day 7" |
| 4 | Upgrade CTA copy | GOOD — "Try Pro Free for 7 Days" everywhere; zero feature-focused CTAs remain |
| 5 | Post-assessment hook | GOOD — all 6 result screens carry an upsell |
| 6 | Cancellation friction | ABSENT — deliberately not built, see below |

## Fixed this run

**1. Abandoned checkout got no recovery treatment.**
`cancel_url` routes to `/pricing?checkout=cancelled`, but the page read that
param only to tag `paywall_view.trigger_event`. The visitor saw a page
identical to the one they had just bounced off. This is the highest-intent
segment in the funnel — they clicked buy and stopped — and the objection at
that moment is nearly always "am I about to be charged".
Fix: risk-reversal banner ("Nothing was charged") shown only on return from a
cancelled checkout, restating the trial terms at the point of hesitation.

**2. `CognitivePremiumGate` never offered Pro.**
The gate presented one price (300 tokens) with nothing to judge it against,
and the only fallback for a user who could not afford it was the token store.
Violates basic choice architecture, and it routes the highest-intent moment
the component sees toward the lower-LTV purchase.
Fix: Pro alternative beside the token cost, trial-framed, routed to
`/pricing?from=cognitive_gate` (never `/store` — tokens only).

## Not fixed — needs founder decision

**Cancellation friction (audit item 6) — recommend NOT building.**
There is no cancel or manage-subscription surface at all; cancellation happens
in Stripe. The task brief asks for a "pause instead" / "here's what you'll
lose" interstitial. Three reasons to leave it:
- The pricing page's own comment cites the post-Noom FTC settlement as the
  reason for trust-based pricing. A retention interstitial is the same
  category of pattern the FTC click-to-cancel rule targets.
- The page advertises "Cancel anytime". Adding friction contradicts shipped copy.
- It is a new feature, and the standing rule is polish/fix/refactor only.

**Pro entitlement is localStorage-only (`psyche-pro-unlocked`), read inline in
12+ files.** Conversion-relevant in both directions: a churned subscriber keeps
Pro forever, and a paying subscriber on a second device is shown the paywall.
The second is the worst possible experience for the users who already
converted. Fixing it means a server-checked entitlement and a shared hook —
too large to do unattended.
