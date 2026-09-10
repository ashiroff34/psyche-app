# Competitor Psychology Radar — Gap Specs (2026-09-10)

Source: scheduled `competitor-radar` run, 2026-09-10. Six web searches across
Duolingo, Headspace, 16Personalities, Noom, and the 2026 subscription-app
benchmark literature, compared against the current `src/` tree.

**Headline:** the three gaps from the 2026-09-04 pass (trial-window activation
drip, pause-instead-of-cancel, opt-in friend streaks) are all still unbuilt and
still awaiting founder sign-off — see `competitor-gaps-2026-09-04.md`. This pass
found **one new gap** they did not cover, plus one strategic finding that is a
business-model decision rather than a build.

No code was changed this pass. `AskUserQuestion` was unavailable (scheduled,
non-interactive run), so no tactic was selected, and the project no-new-features
rule holds: polish, fix, refactor only, surface to Arianna and await instruction.

---

## Gap 4 — Streak identity status (the missing half of the streak stack)

**Competitor:** Duolingo (Streak Society).

**The finding:** Duolingo's own framing is that *identity formation* through the
Streak Society and social sharing is the highest-durability retention state —
"users who identify as streak maintainers are more resilient to streak-break risk
than users who are simply afraid of losing progress." Loss aversion holds a user
until the day they lose the streak; identity survives the loss.

**What Thyself has:** a complete loss-aversion stack and nothing else.

| Layer | Component | Mechanism |
|---|---|---|
| Passive at-risk state | `src/components/streak/StreakCard.tsx` | loss aversion |
| 8pm push | `scheduleStreakWarning` in `src/lib/capacitor-notifications.ts` | loss aversion |
| Rescue modal | `src/components/streak/StreakSaver.tsx` | loss aversion |
| Freeze purchase | `src/components/StreakFreezeShop.tsx` | loss aversion |
| Comeback after break | `src/components/ComebackModal.tsx` | loss recovery |

`MilestoneCelebration.tsx` and `MilestoneModal.tsx` fire at 7 / 14 / 30 / 60 /
100 / 365 days, pay a token bonus (`BONUS_TOKENS`), and dismiss. Nothing
persists. The user is never told, on any surface they return to, *who they have
become* by practicing 60 days running — only what they stand to lose tonight.

**Why this one is unusually well-matched to Thyself:** Duolingo has to invent an
identity ("streak maintainer") that has nothing to do with Spanish. Thyself is
already an identity product — the entire app is about who the user is. A
persistent practice status is the one gamification layer here that reads as
on-theme rather than bolted on, and it does not touch the competitive-gamification
ban recorded in `project_engagement_patterns.md` (no leaderboards, no leagues, no
ranking against other users — this is status relative to the user's own history
only).

**Implementation plan (medium):**

1. Derive, do not store. Add `src/lib/streak-status.ts` exporting
   `statusForStreak(longestStreak: number): StreakStatus | null`, computed from
   the **longest** streak the user has reached, not the current one — that is the
   whole point: the status must survive a break. Read longest from the existing
   `user_streaks` row (`supabase/migrations/20260422000002_user_streaks.sql`);
   if the column is not there yet, that migration is the one place to add it.
2. Name the tiers in Thyself's register, not Duolingo's. Avoid club/society/rank
   framing (competitive) and avoid mystical framing (banned in UI copy). Tiers
   should describe the practice, e.g. thresholds at 7 / 30 / 100 / 365 named for
   what sustained self-observation actually is. Route the copy through `pinky`,
   then `dinky` before it ships.
3. Surface it in exactly three places, no more:
   - `src/app/profile/page.tsx` — the durable home for it, near the type identity.
   - `StreakCard` — a single line under the count, present whether or not the
     streak is currently at risk.
   - `ComebackModal` — the highest-value placement. A user who just broke a
     100-day streak should be told the status is intact. This is the specific
     moment loss aversion has nothing left to offer and identity does.
4. Do **not** add it to `StreakShareCard` in the same change. Sharing a status
   tier is a separate decision with its own brand risk; ship the private version
   first and measure.
5. PostHog: `streak_status_earned` with `{ tier, longest_streak }`, and add tier
   as a user property so post-break retention can be split by whether a status
   was held. That split is the diligence-readable claim — "users who reached
   tier N retain X% after a streak break" is a retention-architecture argument an
   acquirer can read, and it is unmeasurable without the property.

**Expected impact:** post-break retention, which is currently served only by
`ComebackModal`. Does not move DAU/MAU directly.

**Risk:** low technically, real on brand. A tier system on a contemplative app
can read as cheap. If the copy pass cannot make it sound like Thyself, drop it —
this is not worth shipping at 80% voice.

---

## Strategic finding (not a build) — hard paywall vs freemium

RevenueCat's 2026 State of Subscription Apps reports a median **D35 trial-to-paid
of 10.7% for hard paywalls vs 2.1% for freemium** — a 5x gap. Thyself is
freemium with Pro gates (`/pricing`, per `project_conversion_playbook.md`).

Flagging, not recommending. A hard paywall would gut Priority 6 — 224+ SEO pages
exist to convert organic search traffic that will not hit a signup wall — and it
contradicts the 500K-install / 150K-MAU top-of-funnel targets in
`project_acquisition_target.md`. The two goals are in genuine tension and the
resolution is a founder call, not an autonomous one.

The testable middle path, if it is ever wanted: a hard gate on the *assessment
result* only, leaving SEO content and the daily practice free. That is the peak
emotional moment already identified in the conversion playbook. It would need to
run as a PostHog feature flag with both variants live, same rule as onboarding.

---

## Checked and already at parity

- **16Personalities viral share loop** — `ShareableCard`, `TikTokTypeCard`,
  `TikTokFrame`, `RarityCard`, `StreakShareCard`, `/wrapped`, `/r` referral route.
  Screenshot-optimized share surfaces are shipped and TikTok-shaped.
- **Headspace personalized-plan onboarding** — `src/app/onboarding/page.tsx`
  (2,152 lines) already ends in a personalized plan with implementation
  intentions (`src/lib/fresh-start.ts`). Remains an A/B target only, never a
  replace target (`project_engagement_patterns.md`).
- **Noom bite-sized daily CBT lessons** — `src/app/lessons/`, `src/app/daily/`.
- **Personalized notification copy** — `buildPersonalizedNotification` and
  `TYPE_STREAK_WARNING` in `capacitor-notifications.ts` already do per-type
  variants, which is the "3x open rate over generic" tactic.
- **App icon badge / red dot** (Duolingo, +1.6% DAU) — already specced in
  `notification-optin-and-badge.md`. Still unbuilt; needs a badge plugin, so it
  is not a zero-dependency change.
