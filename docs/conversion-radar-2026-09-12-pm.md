# Conversion Radar — 2026-09-12 (pm)

Second pass today. The morning pass stopped four upsells from pitching a trial to paying
subscribers. This pass checks the other side of that promise: whether Pro actually unlocks
what `/pricing` says it includes.

## Re-verified, still solid

- **Post-assessment hook.** All 19 assessments end on an upsell. 8 render
  `PostAssessmentUpsell` inline. The other 10 (`cognitive-type`, `essential-enneagram`,
  `ieq9-integrative`, `michael-caloz`, `mistype-investigator`, `personality-path`, `quick`,
  `self-id`, `this-or-that`) route to `/enneagram/results` or `/cognitive/results`, which
  carry their own. `jungian-self-id` is an 8-line redirect.
- **Trial.** 7 days, single-sourced from `PRO_TRIAL_DAYS`. No stray literals.
- **CTA copy.** The only "Unlock ..." strings left are token spends, not Pro CTAs.
- **Abandoned checkout.** Pro cancels return to `/pricing?checkout=cancelled` with an
  objection-handling banner.

## Fixed this pass

**Pro subscribers were charged tokens for two features `/pricing` sells as Pro.**

`/pricing` lists "Shadow Work lab" and "Tritype deep-dive" under both Pro plans, and
`type-paywall-copy.ts` promises shadow and tritype layers in nearly every type's loss frame.
Neither token gate that guards that content checked `psyche-pro-unlocked`:

| Gate | Content | Cost | Who saw it |
|---|---|---|---|
| `ShadowWorkGate` in `src/app/journal/page.tsx` | Shadow Work tab | 150 tokens | **Only Pro subscribers**, since it renders inside the Inner Work Lab `ProGate` |
| `AdvancedContentGate` in `src/app/enneagram/learn/page.tsx` | Stackings, Tritypes, Deep Systems | 100 tokens | Everyone, Pro included |

Principle violated: **expectation confirmation**. Right after purchase, buyers look for
proof they chose well (post-purchase dissonance). The first thing a new subscriber opening
Shadow Work met was a lock and a price, for the feature named first on the plan they just
started. In a 7-day trial that is the moment they decide whether to cancel, so this is
trial-to-paid leakage and a refund risk, not a cosmetic issue.

Second gap on the same gate: **a dead end at peak desire**. A free user short on tokens got
a disabled "Not enough tokens yet" button and nothing else. `CognitivePremiumGate` already
offers another route at that moment; the Advanced gate did not.

Changes:
1. Both gates now open for `psyche-pro-unlocked`, matching the `CognitivePremiumGate` pattern
   (token unlock OR Pro).
2. The Advanced Enneagram tab lock icons are hidden for Pro.
3. When tokens are short, the Advanced gate adds "Or try Pro free for 7 days, tritypes
   included →" linking to `/pricing?from=advanced_enneagram_gate`, so it shows up as its own
   source in paywall attribution.

tsc: PASS.

## Open findings (need founder decision)

- **`ShadowWorkGate` is now effectively always open.** The only users who can reach it are
  Pro. It stays in place, so shadow work does not become free if `ProGate` changes. Removing
  it is a separate cleanup.
- **Enneagram Growth Path (300 tokens) is not included in Pro.** The Inner Work Lab gate says
  it is "available for tokens, no subscription needed", so this looks deliberate. Type 3's
  paywall copy does promise "tracked growth edges", though. Decide whether Pro should include
  it, or rewrite that line.
- **"Advanced assessments"** is listed as a Pro feature. No assessment is Pro-gated today
  except the cognitive-type flow. Either gate one or drop the line.
- Carried over: no cancellation save flow (new feature), unquantified social proof, no
  lifetime tier, duplicated Pro-flag reads across gate pages.
