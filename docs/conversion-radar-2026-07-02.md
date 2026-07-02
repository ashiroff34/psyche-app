# Conversion Psychology Radar — 2026-07-02

Audit of paywall placement, pricing copy, and conversion triggers against documented behavioral principles (peak-end, anchoring, loss framing, identity value prop). Filtered against the founder's established playbook: **authority proof (Ichazo/Naranjo/Riso-Hudson/Jung), not crowd claims; trust-based pricing, no scarcity countdowns** (post-Noom FTC standard).

## Verdict: flow is mature. 1 copy fix shipped, 1 structural gap surfaced for sign-off.

---

## What's already strong (no action)

- **Peak-emotional paywall (Enneagram):** `src/app/enneagram/results/page.tsx:1401` — type-personalized upsell fires at the reveal moment, with loss frame ("your type stays surface-level") + identity headline + `Try Pro Free for 7 Days`. Textbook peak-end. Routes to `/pricing`.
- **Pricing anchoring:** `src/app/pricing/page.tsx:154` — therapy anchor ("One therapy session is $200. A year of Thyself is $47") + annual/monthly per-month framing. Annual is the highlighted best-value option.
- **Trial length:** 7-day trial, applied at Stripe checkout (`src/app/api/checkout/route.ts:56-57`) and messaged consistently. Optimized (7 > 14 on commitment speed).
- **CTA copy:** benefit/trial-framed `Try Pro Free for 7 Days` across all Pro gates. No feature-focused "Get premium access" language remaining.
- **Authority proof:** "Built on Ichazo, Naranjo, and Riso-Hudson — not pop psychology" on pricing. Deliberate substitute for fabricated "Join 50,000 people" crowd claims — do NOT add invented social-proof numbers (violates playbook + FTC-adjacent honesty standard).

---

## GAP 1 (shipped) — Weak, feature-focused copy on the cognitive-results paywall

**File:** `src/app/cognitive/results/page.tsx:1314-1315`
**Principle:** identity-based value prop + loss framing.
Old copy was a bland feature list ("Unlock the Jungian function stack, your cognitive type, and deep-dive learning") with no identity hook and no loss frame — a stark contrast to the rich Enneagram-results upsell.

**Fixed (committed):**
- Headline: `Full Cognitive Path` → `Your mind, fully mapped`
- Body → "Four letters barely scratch the surface. Unlock your full function stack, shadow states, and grip patterns to understand why you think the way you do. Built on Jung, not pop psychology."

Adds a loss frame ("barely scratch the surface"), identity value prop ("why you think the way you do"), and authority proof (Jung). tsc PASS. Commit: `feat: improve conversion psychology — identity-based, loss-framed copy on cognitive results paywall`.

Note: 3 sibling gate screens still carry the old string and could be unified for consistency: `src/app/assessments/cognitive-type/page.tsx:54`, `src/app/cognitive/assess/page.tsx:31`, `src/app/cognitive/learn/page.tsx:1949`.

**Follow-up (shipped, second pass 2026-07-02):** all 3 sibling screens unified to the same identity headline + loss-frame + Jung authority-proof copy as the main results gate. Every cognitive Pro-gate in the app now presents one consistent, playbook-compliant message. tsc PASS. Commit: `feat: improve conversion psychology — unify cognitive Pro-gate copy across 3 sibling screens` (8241f27).

---

## GAP 2 (SURFACED — needs founder sign-off, not auto-fixed) — Cognitive assessment hard-gates before ANY result reveal

**File:** `src/app/cognitive/results/page.tsx:1308`
**Principle:** peak-end rule — the #1 conversion trigger is the highest-intent moment right after finishing an assessment.

The Enneagram flow does this correctly: shows the full free result (the emotional peak / "aha"), THEN upsells deeper Pro content. The cognitive flow does the opposite — a user who just completed the assessment hits a cold `Lock` screen and **never sees their 4-letter type or function stack at all**. There is no "aha" to convert on; the user doesn't even know what they'd be paying to unlock.

Every high-converting typology competitor (16Personalities, Truity) reveals the free type summary first, then paywalls the deep dive. Recommend: **show the cognitive type + a teaser of the function stack (the peak), then gate shadow/grip/deep-dive behind Pro.**

This is a flow change, not copy polish — per the "no new features / surface to Arianna" rule it is left for your decision rather than implemented autonomously. This is the single highest-leverage conversion change available.

---

## GAP 3 (minor) — No in-app cancel/pause flow

Grep found no `cancelSubscription` / "pause instead" screen. Subscriptions are Stripe/App-Store managed, so cancellation happens in the platform portal — a "here's what you'll lose" retention screen isn't wired in. Low priority; only relevant once paid volume exists and churn is measurable. Note for later, not now.

---

## Recommended next action

Decide on **Gap 2** (reveal cognitive result before gating). It's the biggest unrealized conversion lever in the app and directly maps to the peak-end principle you're already executing well on the Enneagram side.
