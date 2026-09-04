# Competitor Psychology Radar — Gap Specs (2026-09-04)

Source: scheduled `competitor-radar` run, 2026-09-04. Six web searches across Duolingo,
Headspace, 16Personalities, Noom, Truity, and the 2026 subscription-app benchmark
literature, compared against the current `src/` tree.

**Headline:** Thyself is already at or near parity on most of what these apps do.
Streak loss-aversion (`StreakCard` → push → `StreakSaver`), streak freezes
(`StreakFreezeShop`), milestone celebration (`MilestoneModal`), comeback modal,
screenshot-optimized share cards (`ShareableCard`, `TikTokTypeCard`,
`StreakShareCard`, `RarityCard`), a type-personalized drip sequence
(day 3 / 7 / 14 / 30), and a 12-step onboarding with implementation intentions
are all shipped. Three real gaps remain.

One gap was **implemented in this pass** (see bottom). The three below need
founder sign-off before they are built, per the no-new-features rule.

---

## Gap 1 — Trial-window activation drip (medium)

**Competitor:** Headspace.

**The finding:** Headspace's internal data shows users with more *active days*
during the free trial are significantly more likely to convert to paid. The trial
window, not the paywall, is where conversion is decided.

**What Thyself has:** a 7-day free trial on Pro (`src/app/pricing/page.tsx`), and a
drip system (`src/app/api/send-drip/route.ts`, `src/app/api/cron/send-drips/route.ts`)
keyed to **days since install** at day 3 / 7 / 14 / 30.

**What's missing:** nothing is keyed to **trial day**. A user who starts a trial on
install day 20 gets no trial-specific sequence at all, and the day-3/7 emails they
do get are about their type, not about activating the thing they are paying for.

**Implementation plan:**

1. Persist trial start. The checkout route (`src/app/api/checkout/route.ts`) is the
   only place that knows a trial began. Write `trial_started_at` to the user's row
   (new nullable `timestamptz` column on the profiles/subscriptions table) at the
   `checkout.session.completed` webhook, not client-side.
2. Add a `TRIAL_CONTENT` map alongside `DAY_3_CONTENT` / `DAY_7_CONTENT` in
   `send-drip/route.ts`, keyed on trial day `1 | 3 | 6`, per Enneagram type:
   - **Trial day 1** — point at one Pro-only surface, not a feature list. Best
     candidate is the growth dashboard (Shadow Dialogue / Predictive Self /
     Blind Spot Radar), already used as the day-14 hook.
   - **Trial day 3** — mid-trial. Reflect back what they have actually done
     (entries written, lessons finished) and name the one Pro surface they have
     not opened yet.
   - **Trial day 6** — the day before charge. Honest, no false urgency: what
     continues, what stops. The pricing page copy already sets this tone
     ("7 days free, then keep it or cancel. No charge until day 7") and the email
     must not contradict it.
3. Extend the cron in `send-drips/route.ts` to select on `trial_started_at`
   alongside the existing install-day selection, and dedupe so a user in trial
   does not receive both an install-day and a trial-day email the same morning.
   Trial-day wins.
4. PostHog: emit `trial_drip_sent` with `{ trial_day, enneagram_type }` and
   `trial_converted` at the webhook, so the trial funnel is chartable. This is the
   diligence-relevant part; without it the trial is a black box.

**Expected impact:** conversion, not DAU/MAU. Directly serves Priority 7 (Paywall)
and produces a trial funnel chart a diligence team will ask for.

**Risk:** low. Additive to an existing, working drip system. The only new schema is
one nullable column.

---

## Gap 2 — Pause instead of cancel (medium)

**Competitor:** category-wide (2026 RevenueCat / subscription-app benchmarks).

**The finding:** offering "pause for 1 to 3 months" as an alternative to cancellation
recovers 30 to 40 percent of churners who would otherwise cancel outright.

**What Thyself has:** no cancel flow in `src/`. Cancellation happens entirely in the
App Store / Stripe portal, so the churn moment is invisible to the product and to
PostHog.

**Implementation plan:**

1. Add a "Manage subscription" section to `src/app/settings/page.tsx` for Pro users
   that intercepts before the deep link to the store's own cancel screen.
2. Offer pause (1 / 2 / 3 months) with an honest description: access stops, billing
   stops, streak and history are preserved, resumes automatically on the chosen date.
3. Store `paused_until` on the subscription row; `usePro` returns false while paused.
   On the store side, Stripe supports `pause_collection` natively; RevenueCat/App
   Store does not, so on iOS this becomes a "remind me in N months" flow plus a
   cancel deep link rather than a true billing pause. **Do not describe it as a pause
   on a platform where billing does not actually pause.**
4. PostHog: `cancel_intent`, `pause_selected`, `pause_resumed`, `cancel_completed`.

**Expected impact:** direct retention of paid subscribers, and it makes the churn
moment measurable for the first time.

**Risk:** medium. Platform-dependent behavior is the trap here — the iOS and web
paths genuinely differ, and copy that overpromises on iOS is a store-review and
trust problem. Build web/Stripe first; ship iOS only once the constraint is settled.

**Blocked on:** confirming which billing provider is actually live in production.

---

## Gap 3 — Opt-in friend streaks (hard)

**Competitor:** Duolingo.

**The finding:** Duolingo layered Friend Streaks onto the base streak for social
accountability. Streaks are, in their own words, their single most effective
retention lever, and the social layer extends it past the point where solo
motivation decays.

**What Thyself has:** solo streaks with freezes, and a compatibility/pair feature
(`src/app/pair/`, `src/app/compatibility/`) that already models a two-person link
and invite codes. The scaffolding for a paired relationship exists.

**Constraint (from project memory):** competitive gamification is a brand-fit
failure for Thyself. Leaderboards and leagues are banned. **Opt-in, friend-only,
non-ranked** accountability is the acceptable form, and a friend streak is exactly
that shape: two people, no ranking, no public board.

**Implementation plan:**

1. Reuse the existing invite-code mechanism from `pair` rather than inventing a
   second social graph.
2. New `friend_streaks` table: `(user_a, user_b, started_on, last_mutual_day,
   current_count)`, RLS scoped so each row is readable only by its two members.
3. A friend-streak day counts only when **both** people log an activity that day.
   This is the whole mechanism: it converts a private lapse into a visible one.
4. Surface it in `StreakCard` as a second, quieter line. It must not compete
   visually with the personal streak.
5. Hard rule: no notification that tells user A that user B has not practiced.
   The nudge goes to the person who is behind, never about them to someone else.
   Shaming a friend is the exact failure mode that makes this off-brand.

**Expected impact:** the largest DAU/MAU lever of the three, and the one that most
directly serves the 25 percent DAU/MAU diligence target.

**Risk:** high. New table, new RLS, new social surface, and real privacy design
work. This is the one that most needs explicit founder sign-off before any code.

---

## Considered and rejected

- **Leaderboards / leagues / XP ranking (Duolingo):** banned on brand fit. Already
  recorded in project memory; re-confirmed here so it is not re-proposed.
- **Human coaching (Noom's 4-Cs):** Noom's engagement rests substantially on human
  coaches checking in daily. Not viable for a solo founder, and it would introduce
  a clinical-advice surface that the acquisition posture explicitly avoids.
- **Truity's content model:** $19 one-off reports plus $199/$499 course tiers. This
  is a lower-engagement, higher-ticket model that runs against the daily-habit
  positioning. Their volume (10M+ assessments) comes from SEO, which Thyself is
  already pursuing under Priority 6.
- **More share-card surfaces (16Personalities):** already at parity. Four distinct
  share card components ship today, all screenshot-shaped.

---

## Implemented this pass

**Goal-based nudge segmentation** — `src/components/EngagementNudge.tsx`.

Onboarding asks "What brought you here?" and writes the answer to
`profile.motivations`. That answer was read exactly once, on the All Set screen,
and then never again. The 2026 retention literature puts goal-segmented nudge copy
at a 15 to 20 percent D30 improvement over one-size-fits-all, and the segmentation
data was already sitting in localStorage unused.

Two nudges now read it: the 3-day-absence re-entry nudge and a new goal-anchored
idle nudge that takes precedence over the generic one. The existing
Enneagram-type-personalized nudge remains the fallback for users who skipped the
motivations step. No new data collection, no schema change, no new screen.
