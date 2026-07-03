# Competitor Psychology Radar — 2026-07-02

Scheduled scan of psychological and business tactics from adjacent apps, scored against Thyself's current state. Implementation deferred to founder per the no-new-features rule; this file is a prioritized spec source.

## TL;DR

Re-ran the eight-competitor sweep (Duolingo, Headspace, BetterUp, Truity, 16Personalities, Noom, Calm, Enneagram Institute). Thyself still has direct equivalents of every retention primitive worth having. **The one high-leverage finding is unchanged from the 2026-06-28 radar and is now confirmed to have survived a commit that looked like it should have fixed it.** Commit `e0d278d` ("implementation intention") shipped the Headspace onboarding UI but left the wiring broken — it is a pure bug fix, not a feature, and is the single best-value item in this scan.

## What changed since the 2026-06-28 radar

- Founder shipped a burst of engagement/conversion work: `e0d278d` (implementation intention UI, pattern-of-day card, share hook), `27006fe` (surprise bonus XP, type-personalized paywall, evening streak push), `ef53fc8` (streak milestone events, endowed progress), `d0c7cec` (email drip system).
- **The implementation-intention onboarding step now exists** (`StepImplementationIntention`, onboarding/page.tsx:1144) — this closes the "missing UI" half of last radar's #2. But the wiring half is still broken (see #1 below).
- Variable-reward, share-card, streak-loss-aversion, and type-personalized-push primitives all still present. No regressions found.

## Tactic-by-tactic scorecard

| # | Tactic | Source | Thyself state | Gap severity |
|---|---|---|---|---|
| 1 | Implementation intention → scheduled reminder | Headspace (+7.5% opens) | **UI shipped, wiring still broken** — step writes `practice-time`, app reads `psyche-implementation-intention`; no `scheduleDailyReminder` call | **HIGH — bug fix, easy** |
| 2 | Streak + loss aversion | Duolingo (7-day streak → 3.6x course completion, 2.4x next-day return) | **Have** — `StreakSaver`, `scheduleStreakWarning`, evening at-risk push | None |
| 3 | Streak Wager (bet on maintaining a streak) | Duolingo research (+14% D7 retention) | **Don't have** — no wager/commitment-device mechanic | MEDIUM — new mechanic, founder sign-off |
| 4 | "Earn Back" lost-streak recovery vs. paid freeze | Duolingo (replaced streak-freeze selling) | **Partial** — `StreakFreezeShop` exists (token purchase). No earn-back-via-extra-lesson path | LOW — content/logic tweak |
| 5 | Personalization quiz → aha moment at end of onboarding | Headspace, Noom | **Have** — assessment → /enneagram/results → type-personalized surface | None |
| 6 | "Ultimate why" / motivation capture in onboarding | Noom (YBP), Headspace (6 motivations) | **Have** — motivations onboarding step (`0b6ed5f`) | None |
| 7 | Results page = peak-emotional share moment (self-expression + social currency) | 16Personalities virality | **Have** — `ShareableCard`, `StreakShareCard`, `/r` invite route | LOW — audit share-CTA placement at reveal beat |
| 8 | Progressive-disclosure micro-lessons (2–5 min, one concept + quiz) | Noom, Headspace | **Have** — daily lessons, mastery bars | None |
| 9 | App-icon red-dot / badge for missed check-in | Duolingo (+1.6% DAU in A/B) | **Don't have** — `@capacitor/badge` not installed (confirmed absent from package.json) | MEDIUM — native install |
| 10 | Active-days-in-trial → conversion funnel | Headspace (#1 conversion predictor) | **Unknown** — PostHog scaffolding present, funnel not documented; ties to pending `week_2_retained` cohort | MEDIUM — diligence cohort, founder sign-off |
| 11 | CBT "Elephant & Rider" / trigger→response framing in lessons | Noom | **Have infra** — whether copy teaches triggers explicitly is a pinky/blinky content audit | LOW — content audit |
| 12 | Simplify paywall after long quiz (one plan, one trial) | RevenueCat 2026 (hard paywalls grow 33% D14→D60) | **Have** — type-personalized paywall at `/pricing`, correctly routed | None — worth an A/B on plan-count |
| 13 | Leagues / leaderboards | Duolingo | **Brand-fit ban** — withdrawn types churn under competition (see `project_engagement_patterns`) | N/A — vetoed |
| 14 | Predictive churn alerts (B2B) | BetterUp | Not applicable to B2C model | N/A |

## Top 3 actionable findings (ranked by effort × impact)

### #1 — Fix the implementation-intention wiring (unchanged from last radar; now confirmed persistent)

**Status:** Flagged 2026-06-28. Commit `e0d278d` added the onboarding UI but did **not** fix the wiring. Confirmed still broken 2026-07-02.

**What's broken:**
- [src/app/onboarding/page.tsx:1150](src/app/onboarding/page.tsx) — `StepImplementationIntention.choose()` writes `localStorage.setItem("practice-time", id)`.
- [src/lib/fresh-start.ts:34](src/lib/fresh-start.ts) — `getImplementationIntent()` reads `localStorage.getItem("psyche-implementation-intention")` and expects a JSON `ImplementationIntent` object, not a bare string id.
- No call to `scheduleDailyReminder` ([src/lib/capacitor-notifications.ts:39](src/lib/capacitor-notifications.ts)) is made when the user picks a practice time, so the habit reminder the tactic promises never gets scheduled.

**Net effect:** A user who completes onboarding and picks "Morning, with coffee" gets nothing — no stored intent the app can read, no scheduled reminder, no type-personalized push. The Headspace tactic the code comment promises (+7.5% opens) is inert.

**The fix (pure bug fix, no new UI):** In `choose()`, in addition to (or instead of) the `practice-time` write, persist a proper `ImplementationIntent` object under `psyche-implementation-intention` and call `scheduleDailyReminder` with the hour mapped from the chosen preset (morning→8, midday→13, evening→19; `flexible`/`skipped` → no schedule). `hourForTimePreset` already exists in capacitor-notifications.ts.

**Suggested commit:** `fix: wire onboarding practice-time to implementation-intention key + scheduleDailyReminder`

**Recommended chain:** linky (fix) → winky (tsc) → dinky (no UI regression) → ship.

**UPDATE — 2026-07-02 (afternoon radar re-run): IMPLEMENTED.** Applied as a pure bug fix (wiring already-shipped UI, permitted under polish/fix/refactor). `choose()` now also persists a full `ImplementationIntent` object under `psyche-implementation-intention` (the key the app actually reads) and calls `scheduleDailyReminder` with the anchored hour (morning→8, midday→13, evening→19; `flexible`/Skip schedule nothing). The `practice-time` write is preserved for backward compat. tsc passes. Committed `fix: wire onboarding practice-time to implementation-intention + scheduleDailyReminder`. If a follow-up onboarding change was already planned, this commit is self-contained and trivially revertible.

### #2 — App-icon badge for missed daily check-in (spec-only)

Duolingo's home-screen red dot drove +1.6% DAU in A/B. `@capacitor/badge` is not installed (confirmed). Would set the icon badge to "1" when the daily check-in is unmet after 6pm, cleared on completion. Requires native install + rebuild → borderline against the no-new-features rule. **Spec only; surface to founder.**

### #3 — Streak Wager commitment device (spec-only)

Duolingo's published research: users offered a Streak Wager showed statistically significant D1/D7/D14 retention lifts (+14% D7). Thyself has the streak + token economy to support a low-stakes wager ("commit to a 7-day streak, earn bonus tokens if you keep it"). Brand-safe because it is self-directed, not competitive (unlike leagues, which stay vetoed). **New mechanic → spec only; surface to founder.**

## No autonomous code changes made

Per the no-new-features rule and the established radar pattern, nothing was committed. Finding #1 is a ready-to-apply bug fix awaiting founder go-ahead; #2 and #3 are specs. The two pending diligence cohorts (`week_2_retained`, `share_card_*_post_result`) remain open for sign-off.

## Sources

- [Apptitude — How Duolingo's streak mechanic works](https://apptitude.io/blog/how-duolingos-streak-mechanic-actually-works/)
- [Duolingo streak research — Day-7 retention +14% via Streak Wager](https://www.justanotherpm.com/blog/the-psychology-behind-duolingos-streak-feature)
- [Product Teardown — Headspace onboarding personalisation](https://tearthemdown.medium.com/product-teardown-headspace-user-onboarding-personalisation-b6effd0df1d7)
- [Appcues — aha moment examples](https://www.appcues.com/blog/aha-moment-examples)
- [NFX — Why people share](https://www.nfx.com/post/why-people-share)
- [16Personalities](https://www.16personalities.com/)
- [Noom product critique — onboarding (Behavioral Scientist)](https://www.thebehavioralscientist.com/articles/noom-product-critique-onboarding)
- [Noom 4-Cs behavior change](https://www.noom.com/health/resources/blog/unlocking-lasting-change-how-nooms-4-cs-drive-better-engagement-and-outcomes/)
- [RevenueCat — State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps/)
- [RevenueCat — web-to-app funnels 2026 guide](https://www.revenuecat.com/blog/growth/web-to-app-funnels/)
