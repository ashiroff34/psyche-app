# Competitor Psychology Radar — 2026-09-08

**Bot:** competitor-radar (scheduled)
**Competitors researched:** Duolingo, Headspace, BetterUp, Truity, 16Personalities, Noom, Calm, Enneagram Institute
**Verdict:** Two findings. One is a genuinely new gap; one resolves an unknown the 09-06 pass left open, and it is more urgent than anything currently in the queue.

---

## What changed since the last pass (09-06)

Nothing in the published competitor literature moved in two days. The searches returned the same mechanics the 09-06 pass already audited: Duolingo's streak/notification/comeback architecture (DAU/MAU 28.6 to 33 percent, 116M MAU Q1 2026), Headspace's survey-to-personalized-plan onboarding, 16Personalities' screenshot-shaped identity results, Noom's CBT-shaped daily lessons and vulnerability-timed nudges, Truity's free-test-to-paid-report funnel.

The value in this pass came from auditing the codebase harder, not from the web.

---

## Finding 1 — Push permission is requested cold, and a decline kills the entire retention stack

**Status: not previously identified. Highest-leverage item found this pass.**

The 09-06 radar listed "soft prompts before push permission (+35% opt-in)" as **Unknown — not audited this pass**. It is now audited. The answer is worse than a missing nicety.

`requestNativePermission()` is exported from [capacitor-notifications.ts:24](../src/lib/capacitor-notifications.ts:24) and **is never called anywhere in `src/`**. The OS permission dialog is instead triggered implicitly, from inside `scheduleDailyReminder()`, at the moment the user taps a practice time in onboarding — see `persistImplementationIntent()` at [onboarding/page.tsx:1168](../src/app/onboarding/page.tsx:1168). There is no priming screen, no explanation, no second chance.

Why this matters more than any queued item:

- The cold prompt fires mid-onboarding, attached to a tap the user thinks is just picking a time. Nothing has explained what the notification is for.
- **A decline is permanent and silent.** `scheduleDailyReminder` returns `false` and the calling code swallows it in a bare `catch {}`. The user sees the onboarding step complete normally.
- A decline does not disable one feature. It disables the whole layer: the anchored daily reminder (the Headspace implementation-intention tactic the code comments cite as +7.5 percent opens), `scheduleStreakWarning`, `scheduleTomorrowStreakWarning`, and therefore the middle layer of the documented 3-layer streak loss-aversion stack (passive card, push, StreakSaver modal). The push layer just never exists for that user.
- Every downstream notification item in the queue — tiered inactivity push, behavior-adaptive timing, trial-window drip — inherits this ceiling. Building them on top of a suppressed opt-in rate is building on sand.

This is a defect in an existing shipped mechanic, not a new feature: the implementation intention the onboarding deliberately captures is inert for every user who declines, and the code cannot tell that it happened.

**Effort:** Easy. A priming step before the OS prompt, an explicit `requestNativePermission()` call, and handling the `false` return.
**Spec:** [priority-specs/notification-optin-and-badge.md](priority-specs/notification-optin-and-badge.md)

---

## Finding 2 — App icon badge (Duolingo's red dot) is absent

**Status: new gap, not in the 09-06 queue.**

Duolingo's published test on the app-icon badge for a missed lesson measured **+1.6 percent DAU** on its own. It is one of the cheapest documented DAU levers in the space, and it is the one piece of Duolingo's retention architecture Thyself has not replicated.

Codebase audit: no `badge` field is set on any scheduled notification in `capacitor-notifications.ts`; there is no `setBadgeCount`, no `applicationIconBadgeNumber`, and no badge plugin in `package.json`. The only `Badge` matches in `src/` are the achievement-badge type in `useGameState.ts`, which is unrelated. `@capacitor/local-notifications` is already a dependency and already supports the badge field, so no new dependency is required.

Notably, the badge is the one loss-aversion surface that works when the app is closed and notifications are declined or muted, which makes it a partial hedge against Finding 1.

**Effort:** Easy. Set `badge` on the daily reminder and streak-warning notifications; clear it on app resume via the already-installed `@capacitor/app` `appStateChange` listener.
**Spec:** [priority-specs/notification-optin-and-badge.md](priority-specs/notification-optin-and-badge.md)

---

## Everything else — still parity

| Competitor tactic (2026 evidence) | Thyself implementation | Status |
|---|---|---|
| Duolingo — streak loss aversion, freeze, milestone ladder | `streak/StreakCard.tsx`, `StreakSaver.tsx`, `StreakFreezeShop.tsx`, `MilestoneCelebration.tsx` | Covered |
| Duolingo — comeback mechanics for lapsed users | `ComebackModal.tsx`, 4 graduated tiers (1-3d gentle / 4-13d / 14-29d / 30d+ fresh start) | Covered, exceeds Duolingo |
| Duolingo — two-type notification system | `scheduleDailyReminder` + `scheduleStreakWarning` | Covered (gated by Finding 1) |
| Duolingo — mascot/personality-driven retention | `ChibiMessage.tsx`, `PetCompanion.tsx`, `AnimatedPet.tsx` | Covered |
| Duolingo — **app icon badge** | none | **GAP (Finding 2)** |
| Duolingo — streak wager (commitment device) | none | GAP (queued 09-06) |
| Headspace — survey to personalized plan, fast aha | `onboarding/page.tsx`, 12 steps | Covered |
| Headspace — implementation intentions | `StepImplementationIntention`, [onboarding/page.tsx:1186](../src/app/onboarding/page.tsx:1186) | Shipped, **silently inert on permission decline (Finding 1)** |
| Headspace — soft prompt before push permission | none; prompt is cold and implicit | **GAP (Finding 1)** |
| Headspace — trial active-days predict conversion | no trial-day tracking or drip | GAP (queued 09-06, #4) |
| 16Personalities — screenshot-shaped identity result cards | `TikTokTypeCard.tsx` (wired into `/enneagram/results` and `/profile`), `ShareableCard.tsx`, `StreakShareCard.tsx`, `RarityCard.tsx`, `/tiktok` studio | Covered |
| Noom — CBT-shaped daily lessons, process goals | `components/daily/`, `lessons/` | Covered |
| Noom — vulnerability-timed nudges | `EngagementNudge.tsx` | Covered |
| Truity — free test to paid in-depth report | `/pricing`, `CognitivePremiumGate.tsx`, `PostAssessmentUpsell.tsx` | Covered |
| 2026 macro — re-engage inside the 3-7 day window | `EngagementNudge.tsx` fires at 3+ days; `ComebackModal` at 1+ | Covered |
| 2026 macro — tier progression / year-in-review | `/wrapped` | Covered |

---

## Still deliberately NOT recommended

Leaderboards, leagues, and public competitive ranking. Unchanged brand-fit ban: competitive gamification contradicts the reflective-contemplative positioning. Opt-in friend-only remains the acceptable form.

---

## The queue (updated)

| # | Item | Effort | Evidence | Artifact |
|---|---|---|---|---|
| 1 | **Push opt-in priming + decline handling** | Easy | Unblocks the entire push layer; +35% opt-in from soft prompts | [spec](priority-specs/notification-optin-and-badge.md) — new this pass |
| 2 | **App icon badge** | Easy | +1.6% DAU (Duolingo published) | [spec](priority-specs/notification-optin-and-badge.md) — new this pass |
| 3 | Streak wager | Easy | D7 +14% (Duolingo published) | [spec](priority-specs/streak-wager.md) |
| 4 | Tiered inactivity push (1/3/7-day escalating copy) | Easy | Pure copy + scheduling on existing lib | Surfaced, not specced |
| 5 | Behavior-adaptive notification timing | Medium | ~45% lift vs. static schedules | Not specced |
| 6 | Trial-window activation drip | Medium | Trial active-days predict conversion | [gaps doc, Gap 1](priority-specs/competitor-gaps-2026-09-04.md) |
| 7 | Effort-based "Earn Back" streak recovery | Medium | Closes token-gated repair gap | [spec](priority-specs/streak-earn-back.md) |
| 8 | Pause instead of cancel | Medium | Recovers 30-40% of churners | [gaps doc, Gap 2](priority-specs/competitor-gaps-2026-09-04.md) |
| 9 | Opt-in friend streaks | Hard | Largest DAU/MAU lever available | [gaps doc, Gap 3](priority-specs/competitor-gaps-2026-09-04.md) |
| 10 | Home-screen streak widget | Hard | ~60% commitment lift | [spec](priority-specs/streak-home-widget.md) |

Items 1 and 2 jump the queue ahead of the streak wager. Item 1 in particular gates items 4, 5, and 6 — there is no reason to build more push mechanics before knowing what fraction of users can receive a push at all.

---

## Recommendation

Ship item 1 first, and instrument it. The single most useful number this codebase does not currently have is the push opt-in rate. Right now a decline is invisible: it is swallowed by a bare `catch {}`, so there is no PostHog event, no local flag, and no way to segment retention by whether the push layer was ever alive for that user. That is both a growth blind spot and a diligence gap, since it means the streak mechanic's measured effect is diluted by an unknown share of users for whom two of its three layers never fired.

Item 2 is a genuinely small change to the same file and can ride along in the same pass.

**No code was changed this pass.** Both items are specced only, per the standing no-new-features rule and the instruction to surface priority-list work rather than build it autonomously.

---

## Sources

- [Duolingo's Habit-Forming Reminders: A UX Breakdown](https://www.digia.tech/post/duolingo-habit-forming-reminders-retention-architecture/)
- [Duolingo gamification explained, StriveCloud](https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo)
- [Duolingo Statistics 2026, Udonis](https://www.blog.udonis.co/mobile-marketing/mobile-apps/duolingo)
- [Behavioral Science Boosts Headspace Course Starts by Over 100%, Purchasely](https://www.purchasely.com/blog/headspace-behavioral-science-onboarding-experiment)
- [How Headspace Struck Gold with Onboarding Emails, CleverTap](https://medium.com/mobile-marketing-insights-by-clevertap/how-headspace-struck-gold-with-onboarding-emails-best-practices-for-retaining-new-users-64bd384c907c)
- [Why People Share: The Psychology Behind Going Viral, NFX](https://www.nfx.com/post/why-people-share)
- [The State of Online Personality Testing in 2026, JobCannon](https://jobcannon.io/blog/personality-test-industry-report-2026)
- [What Noom can teach product teams about behavior change and retention](https://www.theirrationalmind.com/what-noom-can-teach-product-teams-about-behavior-change-and-retention-christine-may-behavioral-sc/)
- [App Retention Strategies in 2026, Userpilot](https://userpilot.com/blog/app-retention-strategies/)
- [Truity Enneagram Personality Test](https://www.truity.com/test/enneagram-personality-test)
