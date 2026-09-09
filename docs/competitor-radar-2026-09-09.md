# Competitor Psychology Radar — 2026-09-09

**Bot:** competitor-radar (scheduled)
**Competitors researched:** Duolingo, Headspace, BetterUp, Truity, 16Personalities, Noom, Calm, Enneagram Institute
**Verdict:** One new finding, well evidenced and easy. Plus one dead-code artifact that happens to be the exact surface the finding needs.

---

## What changed since the last pass (09-08)

**Nothing shipped from the queue.** Both 09-08 findings are still open, verified this pass:

- `requestNativePermission()` at [capacitor-notifications.ts:24](../src/lib/capacitor-notifications.ts:24) still has **zero callers** in `src/`. The push prompt is still cold and implicit, and a decline is still swallowed.
- No `badge:` field is set on any notification in `capacitor-notifications.ts`. No app-icon badge.

The 12 commits since 09-07 are all conversion-radar copy work (type-aware gate copy, comeback modal return line, post-assessment upsell) plus one streak fix. Good work, but orthogonal to the notification layer, which remains the gating item.

The web returned nothing new. Duolingo's DAU/MAU is now reported above 50 percent with 55 percent of DAUs retained month over month — a bigger number than prior passes cited, but the same underlying mechanics already audited. The value in this pass again came from the codebase.

---

## Finding 3 — The session ends in reward, never in benefit

**Status: new. Not identified by any prior pass.**

Headspace's post-session touchpoint is the one piece of their onboarding-to-habit architecture Thyself has not replicated. After a session completes, Headspace asks how the user is feeling. Every teardown of their funnel treats this as an engagement touchpoint; it is more than that. It is a **benefit attribution device**. It makes the user consciously register that something shifted, and credit the app for it. Reward tells the user they did the thing. Attribution tells them the thing worked. Only the second one creates a reason to come back that survives the novelty of the streak, and only the second one creates a reason to pay.

Thyself's completion moment is reward-only. Audit:

- Daily goal completion fires `showDailyGoalCelebration` in [daily/page.tsx](../src/app/daily/page.tsx) — confetti, XP, companion XP.
- Unit completion fires `setUnitCelebration({ unitName, xp })`, auto-dismissed after 5s.
- `MicroCelebration`, `TokenDropOverlay`, `MilestoneModal`, `MilestoneCelebration` — all reward surfaces.
- Nowhere in `src/` is the user asked whether the session changed anything. A `grep` for `was this helpful`, `did that help`, `feel now`, `shifted`, `resonate` across all of `src/` returns **only SEO prose on compatibility and cognitive pages**. Zero product surfaces.

`StateCheckIn.tsx` is not this. It is a hub-level state-vs-trait instrument built on the Big Five Aspects (Fleeson 2001, Rauthmann 2019), it asks about the whole day (`"I've felt irritable today"`), it rotates ten items on a day-of-year cycle, and it is not attached to session completion. It measures the user's day. It does not measure the session's effect.

### Why this matters beyond retention

There is a second consequence, and for this company it may be the larger one.

`src/lib/analytics.ts` defines 267 lines of typed events. `posthog.ts` defines 24 named constants. Across all of them there is **not one self-reported outcome signal** — the closest is `passion_checkin_completed`, which carries a `rating` for a passion check-in, not for whether anything helped. Every metric Thyself can currently show a diligence team is an engagement metric: opens, streaks, completions, conversions.

Thyself is positioning to a psychometrics acquirer. The Myers-Briggs Company, Truity, and the BetterUp-adjacent field all sell on *outcomes*, not session counts. An acquirer's question is not "how often do they open it" but "does it do anything." Right now the answer in the data room is: unknown, we never asked. A one-tap post-session signal is the cheapest possible instrument that turns that into a chart.

**Effort:** Easy. One component, one analytics event, one insertion point in an existing celebration flow.
**Brand fit:** Clean. Reflective and self-observational, which is the positioning. No competitive or gamified element.
**Spec:** [priority-specs/post-session-benefit-signal.md](priority-specs/post-session-benefit-signal.md)

---

## Finding 4 — `DailyCompleteOverlay.tsx` is orphaned

**Status: new. Dead code.**

[components/daily/DailyCompleteOverlay.tsx](../src/components/daily/DailyCompleteOverlay.tsx) has **zero importers**. `grep -rn "DailyComplete" src/` matches only its own definition line. It is a fully built 6-second session-complete overlay — streak count, XP earned, 16 animated star particles, correct dialog a11y roles — that nothing renders. Every one of its sibling components in `components/daily/` has exactly one importer; this one has none.

Two ways to resolve it, and they point the same direction:

1. **Wire it as the vehicle for Finding 3.** The overlay already occupies precisely the moment the benefit question belongs in, already receives `streak` and `xpEarned`, and already has a dismiss contract. Adding the one-tap question to it is a smaller change than building a new surface.
2. Delete it.

Option 1 is recommended and is what the spec assumes. Either way this is a fix, not a feature — it falls inside the polish/fix/refactor rule without needing an exception.

---

## Finding 5 — The milestone ladder skips the window where users actually churn

**Status: new, lower confidence. Flagged, not specced.**

[streak.ts:17](../src/lib/streak.ts:17) — `const MILESTONES = [7, 30, 100, 365]`.

The first positive milestone is day 7. Headspace's own finding is that roughly ten consecutive days is where a habit consolidates, and the retention literature is consistent that the steepest drop is days 1 through 3. Thyself's *negative* mechanics already cover that window well — `ComebackModal` fires from 1 day lapsed, `EngagementNudge` from 3 — but there is no *positive* marker before day 7. The user gets a week of nothing, then a celebration.

Adding a day-3 milestone is a one-line change to an existing constant plus a bonus-token entry. I am flagging rather than speccing it because the evidence for day 3 specifically is inferential rather than a published A/B result, unlike the badge and wager numbers. Worth an A/B, not worth asserting.

---

## Everything else — still parity

| Competitor tactic (2026 evidence) | Thyself implementation | Status |
|---|---|---|
| Duolingo — delay signup until after first value moment (+20% D1) | Email gate is step 5, **after** the type reveal at step 4, and skippable — [onboarding/page.tsx:876](../src/app/onboarding/page.tsx:876) | Covered |
| Duolingo — streak loss aversion, freeze, milestone ladder | `StreakCard`, `StreakSaver`, `StreakFreezeShop`, `MilestoneCelebration` | Covered (see Finding 5) |
| Duolingo — comeback mechanics for lapsed users | `ComebackModal.tsx`, 4 graduated tiers, now type-aware (`f7b61be`) | Covered, exceeds Duolingo |
| Duolingo — mascot-driven retention | `ChibiMessage`, `PetCompanion`, `AnimatedPet` | Covered |
| Duolingo — **app icon badge** | none | **GAP (09-08 Finding 2, unshipped)** |
| Duolingo — streak wager | none | GAP (09-06, unshipped) |
| Headspace — survey to personalized plan, fast aha | `onboarding/page.tsx`, 12 steps | Covered |
| Headspace — implementation intentions | `StepImplementationIntention` | Shipped, **inert on permission decline (09-08 Finding 1, unshipped)** |
| Headspace — soft prompt before push permission | none | **GAP (09-08 Finding 1, unshipped)** |
| Headspace — **post-session feeling check-in** | none | **GAP (Finding 3)** |
| Headspace — 10-day habit window | milestones start at day 7 | **Partial (Finding 5)** |
| Noom — CBT-shaped daily curriculum, trigger identification | `components/daily/` (29 components), `lessons/`, `arcs/`, `sprint/` | Covered |
| Noom — vulnerability-timed nudges | `EngagementNudge.tsx` | Covered |
| 16Personalities — identity-shaped shareable results | `TikTokTypeCard`, `ShareableCard`, `StreakShareCard`, `RarityCard`, `/tiktok` | Covered |
| Truity — free test to paid in-depth report | `/pricing`, `CognitivePremiumGate`, `PostAssessmentUpsell` | Covered |
| 2026 macro — paywall after one meaningful action (D7 19→27%) | paywall is post-assessment, not at registration | Covered |
| 2026 macro — instant-win reward in onboarding | "+50 tokens · Start Day 1" at `StepAllSet` | Covered |

---

## Still deliberately NOT recommended

Leaderboards, leagues, public competitive ranking. Unchanged brand-fit ban.

---

## The queue

| # | Item | Effort | Evidence | Artifact |
|---|---|---|---|---|
| 1 | Push opt-in priming + decline handling | Easy | Gates the entire push layer; +35% opt-in from soft prompts | [spec](priority-specs/notification-optin-and-badge.md) |
| 2 | App icon badge | Easy | +1.6% DAU (Duolingo published) | [spec](priority-specs/notification-optin-and-badge.md) |
| 3 | **Post-session benefit signal** | Easy | Only outcome metric in the product; closes a diligence gap | [spec](priority-specs/post-session-benefit-signal.md) — new |
| 4 | **Wire or delete `DailyCompleteOverlay`** | Easy | Dead code; is the surface item 3 needs | folded into the item 3 spec — new |
| 5 | Streak wager | Easy | D7 +14% (Duolingo published) | [spec](priority-specs/streak-wager.md) |
| 6 | Tiered inactivity push | Easy | Copy + scheduling on existing lib | Surfaced, not specced |
| 7 | Day-3 milestone | Easy | Inferential; A/B candidate | Flagged (Finding 5) |
| 8 | Behavior-adaptive notification timing | Medium | ~45% lift vs. static schedules | Not specced |
| 9 | Trial-window activation drip | Medium | Trial active-days predict conversion | [gaps doc](priority-specs/competitor-gaps-2026-09-04.md) |
| 10 | Effort-based "Earn Back" streak recovery | Medium | Closes token-gated repair gap | [spec](priority-specs/streak-earn-back.md) |
| 11 | Pause instead of cancel | Medium | Recovers 30-40% of churners | [gaps doc](priority-specs/competitor-gaps-2026-09-04.md) |
| 12 | Opt-in friend streaks | Hard | Largest DAU/MAU lever available | [gaps doc](priority-specs/competitor-gaps-2026-09-04.md) |
| 13 | Home-screen streak widget | Hard | ~60% commitment lift | [spec](priority-specs/streak-home-widget.md) |

Items 1 and 2 keep their position — nothing has changed to displace them, and item 1 still gates items 6, 8 and 9. Items 3 and 4 enter behind them because they are independent of the notification layer and can be done in the same sitting.

---

## Recommendation

Items 1 and 2 have now been top of the queue for two passes without moving. They are both small edits to one file. If dev time is going into engagement work at all — and the last twelve commits say it is — those two should absorb an hour before any more conversion copy ships, because every push mechanic built after them inherits an opt-in rate nobody has measured.

Item 3 is the one I would add to that sitting. It is the same size as the other two, it is the only item in the whole queue that produces an **outcome** metric rather than an engagement metric, and the component it needs is already written and sitting unused in the tree.

**No code was changed this pass.** Specced only, per the standing no-new-features rule and the instruction to surface priority-list work rather than build it autonomously.

---

## Sources

- [Duolingo Gamification: 5 Tactics for User Retention, StriveCloud](https://www.strivecloud.io/blog/blog-gamification-examples-boost-user-retention-duolingo)
- [Duolingo's Habit-Forming Reminders: A UX Breakdown, Digia](https://www.digia.tech/post/duolingo-habit-forming-reminders-retention-architecture/)
- [The Psychology Behind Duolingo's Streak Feature, JustAnotherPM](https://www.justanotherpm.com/blog/the-psychology-behind-duolingos-streak-feature)
- [How Duolingo Gamified Monthly Active Users, The PM Repo](https://www.thepmrepo.com/articles/how-duolingo-gamified-monthly-active-users-lessons-in-habit-formation)
- [Product Teardown — Headspace: User onboarding personalisation](https://tearthemdown.medium.com/product-teardown-headspace-user-onboarding-personalisation-b6effd0df1d7)
- [How Headspace Grows: The Monk Who Built a $3B Meditation App](https://www.howtheygrow.co/p/how-headspace-grows-the-monk-who)
- [Aha moment examples: How to find and design yours, Appcues](https://www.appcues.com/blog/aha-moment-examples)
- [Why People Share: The Psychology Behind Going Viral, NFX](https://www.nfx.com/post/why-people-share)
- [The Psychology of Viral Content: Why We Share, Comgroup](https://www.comgroup.com/blog/the-psychology-of-viral-content-why-we-share)
- [Noom Review 2026: Psychology-First Weight Loss, Calorie Trackers](https://calorie-trackers.com/reviews/noom/)
- [The State of Subscription Apps 2026, RevenueCat](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026)
- [17 App Engagement Strategies to Boost Retention in 2026, StriveCloud](https://www.strivecloud.io/blog/increase-mobile-app-engagement-optimized)
- [Mobile App Retention Strategies for 2026, Enable3](https://enable3.io/blog/mobile-app-retention-2025)
