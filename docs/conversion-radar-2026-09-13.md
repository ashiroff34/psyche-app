# Conversion Radar — 2026-09-13

Yesterday's pm pass checked whether Pro unlocks the content `/pricing` sells. This pass
checks the other half: whether Pro removes the *limits* a free user hits, and whether
limit walls offer the paid path.

## Re-verified, still solid

- **Post-assessment hook.** All assessments end on an upsell or route to a results page that
  carries one (see 2026-09-12-pm).
- **Trial.** 7 days, single-sourced from `PRO_TRIAL_DAYS`.
- **Anchoring.** `/pricing` still leads with Pro Annual, savings quantified.
- **Token and Pro gates** fixed yesterday (`ShadowWorkGate`, `AdvancedContentGate`) are
  unchanged.

## Fixed this pass

**The daily unit limit blocked Pro subscribers and dead-ended free users.**

`src/app/daily/page.tsx` caps new curriculum units at 2 per day once an account is 5+ days
old. The bypass checked only `psyche-beta-access`, so:

| Who | What they saw | Principle violated |
|---|---|---|
| Pro subscriber (including mid-trial) | "Daily Limit Reached. Come back tomorrow, or spend a token" | **Expectation confirmation.** A subscriber gets rationed like a free user during the 7 days they decide whether to keep paying. |
| Free user with 0 tokens | A disabled "Not enough tokens" button and "Come back tomorrow" | **Peak intent, no offer.** Asking for a third unit in one day is the strongest engagement signal the app gets. The wall had no paid way through. |

Changes:
1. `handleLessonNodeTap` now bypasses the limit for `psyche-pro-unlocked` as well as beta.
2. Both "Daily Limit Reached" modals (path view and final block) show
   "Or try Pro free for 7 days, no daily limit →" when tokens are 0, linking to
   `/pricing?from=daily_unit_limit`. That puts it in paywall attribution as its own source.
3. `/pricing` lists "No daily lesson limit" on both Pro plans, so the page names the benefit
   the gate now promises. This is also a better value prop than most of the list: it answers
   a limit the user has already hit.

tsc: PASS.

Metric to watch: `paywall_view` and `checkout_initiated` where `from = daily_unit_limit`, plus
trial-to-paid for users who hit the limit during their trial.

## Open findings (need founder decision)

- **"Audio reflections" is sold as Pro but is free.** `AudioReflection` renders in
  `HubView` for any user with a type, and `assessments/decentering` names it as a Pro
  benefit. That is a feature claim a buyer cannot verify as exclusive. Either gate it behind
  Pro or drop it from both Pro plan lists and the decentering upsell copy.
- **Pro Monthly gets 500 tokens too.** `grantProLocally` credits 500 tokens for every Pro
  pack, but only the Annual card lists "500 bonus tokens". Monthly undersells what it gives,
  or Monthly over-grants. Decide which.
- **Two duplicate unit-limit modals** in `daily/page.tsx`. Both were patched. Consolidating
  them into one component is a refactor for a later pass.
- Carried over: Growth Path (300 tokens) not in Pro vs Type 3 "tracked growth edges" copy;
  "Advanced assessments" line with nothing Pro-gated; no cancellation save flow (new feature);
  unquantified social proof; no lifetime tier.
