# Conversion Psychology Radar — 2026-07-03

Audit of paywall placement, pricing copy, and conversion triggers against documented behavioral principles (peak-end, anchoring, risk-reversal, loss framing, identity value prop). Filtered against the founder's playbook: authority proof (Ichazo/Naranjo/Riso-Hudson/Jung), no fabricated crowd claims, trust-based pricing (no scarcity countdowns, post-Noom FTC standard).

## Verdict: flow is mature. 1 new copy gap found and fixed. 1 prior structural gap still pending founder sign-off.

---

## GAP (shipped) — Monthly plan CTA hid its own free trial

**File:** `src/app/pricing/page.tsx:75`
**Principle:** risk-reversal + internal consistency.

The checkout route applies the 7-day free trial to **every** Pro subscription — `subscription_data: { trial_period_days: 7 }` fires whenever `packId.startsWith("pro_")` (`src/app/api/checkout/route.ts:57`). So `pro_monthly` carries the identical trial as `pro_annual`.

But the pricing card CTA for Monthly read **"Start Monthly"** — commitment-framed, signalling an immediate charge. This:
- Contradicted the page's own promise directly above the cards ("7 days free, then keep it or cancel. No charge until day 7").
- Buried a risk-reversal on the plan a hesitant, price-sensitive user is most likely to choose. Trial-framed CTAs beat commitment-framed ones (established conversion-playbook rule).

Prior radar runs verified the *gate-screen* CTAs but never flagged this one on the pricing page itself.

**Fixed (committed `07e7727`):** `Start Monthly` → `Try Free for 7 Days`. Both Pro plans now surface the trial honestly; Annual stays differentiated by its "Best value" badge, price, and highlighted styling. tsc PASS.

---

## Still strong (no action)

- **Peak-emotional Enneagram paywall** — type-personalized upsell at the reveal moment with loss frame + identity headline + trial CTA (`src/app/enneagram/results/page.tsx`). Textbook peak-end.
- **Pricing anchoring** — therapy anchor ("One therapy session is $200. A year of Thyself is $47") + annual/monthly per-month framing; annual highlighted as best value.
- **Trial length** — 7-day (7 > 14 on commitment speed), applied consistently at checkout and now messaged consistently across both Pro CTAs.
- **Authority proof** — "Built on Ichazo, Naranjo, and Riso-Hudson — not pop psychology" substitutes for fabricated social-proof numbers. Do NOT add invented "Join 50,000 people" claims (violates playbook + honesty standard).

---

## GAP still open (needs founder sign-off — NOT auto-fixed)

**Cognitive assessment hard-gates before any result reveal** — `src/app/cognitive/results/page.tsx`. Unlike the Enneagram flow (reveal free result → upsell deeper Pro content), the cognitive flow shows a cold `Lock` screen before the user sees their 4-letter type at all. No "aha" to convert on. This is a flow change (not copy polish), so per the "no new features / surface to Arianna" rule it stays for your decision. Remains the single highest-leverage unrealized conversion lever. First surfaced 2026-07-02.

## Minor / later

- **No in-app cancel/pause retention flow** — subscriptions are Stripe/App-Store managed; a "here's what you'll lose" screen isn't wired in. Low priority until paid volume and measurable churn exist.
