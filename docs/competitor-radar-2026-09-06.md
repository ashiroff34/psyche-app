# Competitor Psychology Radar — 2026-09-06

Autonomous scan. Six web searches across Duolingo, Headspace, 16Personalities, Noom,
Truity, and the 2026 app-retention literature, compared against the current `src/` tree.

Differential pass against the [2026-09-02 radar](competitor-radar-2026-09-02.md) and the
[2026-09-04 gap specs](priority-specs/competitor-gaps-2026-09-04.md).

**No code shipped.** The no-new-features rule in `CLAUDE.md` is explicit: surface to
Arianna, await instruction. The scheduled task's "implement if easy" branch is
overridden by that rule. Output is one spec plus this report.

## What changed since the last pass

The repo is moving again. Ten commits since 2026-09-02, after 26 idle days — the
internship window has closed and the queue is being worked. Notably `c2307fb` and
`42a8eb5` finished the streak-at-risk push loop, and `02946e5` shipped the goal-based
nudge segmentation that the 09-04 pass identified.

That matters for this radar's recommendation: the constraint is no longer dev time.

## One new tactic, and it is a real gap

Every prior radar concluded parity. This pass found one exception, and it is well
evidenced.

**Duolingo's Streak Wager.** A commitment device: the user stakes in-app currency on
maintaining a 7-day streak, and is paid back double if they succeed. Duolingo's own
published research reports statistically significant D1, D7 and D14 retention lifts,
with **D7 up 14%**. The mechanism is not the reward — it is that a stake the user
placed themselves converts an abstract intention into an owned loss.

**Thyself does not have this.** `grep -rin "wager|commitment device|stake\b" src/`
returns no match in any mechanic. What exists in
[StreakFreezeShop.tsx:142](../src/components/StreakFreezeShop.tsx:142) is three items —
Freeze (50 tokens), Double XP (75), Repair (150) — and all three are *protective or
amplifying*. Every one of them is spent to soften a loss or increase a gain. None asks
the user to put something at risk. That is the entire missing half of the loss-aversion
loop, and it is the half with the published retention number attached.

Why it is easy here specifically: the token economy, the shop UI, the daily-goal
completion signal and the streak-day rollover all already exist. A wager is a fourth
shop item plus a settlement check on rollover. It reuses everything.

Spec written: [priority-specs/streak-wager.md](priority-specs/streak-wager.md).

## Everything else — still parity

| Competitor tactic (2026 evidence) | Thyself implementation | Status |
|---|---|---|
| Duolingo — streak loss-aversion, milestone ladder, freeze/repair | `streak/StreakCard.tsx`, `StreakSaver.tsx`, `MilestoneCelebration.tsx`, `StreakFreezeShop.tsx` | Covered |
| Duolingo — **streak wager (commitment device)** | none | **GAP** |
| Headspace — onboarding survey → personalized plan → fast aha | `onboarding/page.tsx` (2,154 lines, 12 steps) | Covered |
| Headspace — implementation intentions ("when will you practice?") | `StepImplementationIntention`, [onboarding/page.tsx:1133](../src/app/onboarding/page.tsx:1133) | Covered |
| 16Personalities — screenshot-shaped, identity-flattering result cards | `TikTokTypeCard.tsx`, `ShareableCard.tsx`, `StreakShareCard.tsx`, `RarityCard.tsx` | Covered |
| Noom — daily CBT-shaped lessons, trigger identification, process goals | `components/daily/` (33 components), `lessons/` | Covered |
| Noom — goal-segmented nudge copy | `EngagementNudge.tsx` (shipped 09-04, `02946e5`) | Covered |
| Truity — free test → paid in-depth report | `/pricing`, `/store`, `CognitivePremiumGate.tsx` | Covered |
| 2026 macro — goal asked at signup → personalized plan (+18% retention) | onboarding motivations step, read by nudges | Covered |
| 2026 macro — soft prompts before push permission (+35% opt-in) | worth verifying separately; not audited this pass | Unknown |

Truity's 2026 numbers are worth recording as market context rather than a tactic:
$8–15M/year on one-off $19–$69 reports, and the industry report notes the subscription
model is where the category is heading but "few B2C platforms have cracked it."
16Personalities does $15–25M/year with under 20 employees. Thyself's subscription
posture is the differentiated one; no change indicated.

## Still deliberately NOT recommended

- **Leaderboards, leagues, XP ranking** — brand-fit failure, recorded in
  `project_engagement_patterns.md`. Re-confirmed so it is not re-proposed.
- **Human coaching (Noom's model)** — depends on staffed coaches; solo-founder
  infeasible and a clinical-advice liability surface in diligence.
- **Any "AI"-labeled personalization surface** — UI rule, regardless of mechanic.

## The queue

Unchanged from 09-02 and 09-04, minus the item that shipped. Ranked by
impact-per-unit-effort:

| # | Item | Effort | Evidence | Artifact |
|---|---|---|---|---|
| 1 | **Streak wager** | Easy | D7 +14% (Duolingo published) | [spec](priority-specs/streak-wager.md) — new this pass |
| 2 | Tiered inactivity push (1/3/7-day escalating copy) | Easy | Reuses `capacitor-notifications.ts`; pure copy + scheduling | Surfaced, not specced |
| 3 | Behavior-adaptive notification timing | Medium | ~45% lift vs. static schedules | Not specced |
| 4 | Trial-window activation drip | Medium | Trial active-days predict conversion | [gaps doc, Gap 1](priority-specs/competitor-gaps-2026-09-04.md) |
| 5 | Effort-based "Earn Back" streak recovery | Medium | Closes token-gated repair gap | [spec](priority-specs/streak-earn-back.md) |
| 6 | Pause instead of cancel | Medium | Recovers 30–40% of churners | [gaps doc, Gap 2](priority-specs/competitor-gaps-2026-09-04.md) |
| 7 | Opt-in friend streaks | Hard | Largest DAU/MAU lever available | [gaps doc, Gap 3](priority-specs/competitor-gaps-2026-09-04.md) |
| 8 | Home-screen streak widget | Hard | ~60% commitment lift; diligence-legible | [spec](priority-specs/streak-home-widget.md) |

Also still pending founder sign-off from earlier passes: the two diligence-readable
PostHog cohorts, `week_2_retained` and `share_card_*_post_result`.

## Recommendation

Ship the **streak wager** first. It is the only item on the list that is
simultaneously (a) backed by a competitor's own published retention number, (b) a
mechanic Thyself genuinely lacks rather than a variation on one it has, and (c) small
enough to land in a single session because the token economy and shop UI already exist.

Then item 2 (tiered inactivity push) as the cheap follow-on.

Cadence note, repeated from 09-02: this radar has now returned "parity" three passes
running and found exactly one new mechanic in four. Monthly would surface the same
result at a fraction of the cost.

## Sources

- [The Psychology Behind Duolingo's Streak Feature](https://www.justanotherpm.com/blog/the-psychology-behind-duolingos-streak-feature)
- [App Teardown: How Duolingo's Streak Mechanic Actually Works](https://apptitude.io/blog/how-duolingos-streak-mechanic-actually-works/)
- [Duolingo's Habit-Forming Reminders: A UX Breakdown](https://www.digia.tech/post/duolingo-habit-forming-reminders-retention-architecture/)
- [How Headspace Grows](https://www.howtheygrow.co/p/how-headspace-grows-the-monk-who)
- [Aha moment examples](https://www.appcues.com/blog/aha-moment-examples)
- [The State of Online Personality Testing in 2026: Industry Report](https://jobcannon.io/blog/personality-test-industry-report-2026)
- [Why People Share: The Psychology Behind Going Viral](https://www.nfx.com/post/why-people-share)
- [Noom Review 2026: Psychology-Based Weight Loss](https://www.saasweep.com/blog/noom-review)
- [App Retention Strategies in 2026](https://userpilot.com/blog/app-retention-strategies/)
- [17 App Engagement Strategies to Boost Retention in 2026](https://www.strivecloud.io/blog/increase-mobile-app-engagement-optimized)
