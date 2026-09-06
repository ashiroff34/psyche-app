# Spec — Streak Wager (commitment device)

Source: scheduled `competitor-radar` run, 2026-09-06. Competitor: Duolingo.
Status: **specced, not built.** Needs founder sign-off per the no-new-features rule.

## The finding

Duolingo's Streak Wager lets a user stake in-app currency on maintaining a streak for
a fixed window, paid back at a multiple on success and forfeited on failure. Their
published research reports statistically significant D1, D7 and D14 retention gains,
with **D7 retention up 14%**.

The mechanism is not the payout. It is that a stake the user chose to place converts
"I intend to practice" into "I have something at risk," which is the form of
commitment loss aversion actually acts on.

## Why Thyself lacks exactly this

The token shop ([StreakFreezeShop.tsx:142](../../src/components/StreakFreezeShop.tsx:142))
has three items:

| Item | Cost | Direction |
|---|---|---|
| Streak Freeze | 50 | protective |
| Double XP Day | 75 | amplifying |
| Streak Repair | 150 | protective |

All three spend tokens to *soften a loss or increase a gain*. None puts anything at
risk. The existing streak stack — passive `StreakCard` at-risk state → Capacitor push
→ `StreakSaver` modal — is likewise entirely about rescuing a streak already in
danger. Every mechanic in the app operates after the intention has already weakened.

A wager operates before it does. That is the gap.

## Design

**Placement.** A fourth item in `StreakFreezeShop`, visually distinct from the three
protective ones — this is the only item in the shop that can lose the user tokens, and
the UI must not let that be a surprise.

**Terms.** Stake 50 tokens on completing the daily goal 7 days running. Success pays
100. Failure forfeits the 50. One active wager at a time.

Rationale for these numbers: 50 matches the Freeze price, so the stake reads as "one
freeze's worth" — a known quantity to any user who has used the shop. 2x is Duolingo's
own multiplier and is the smallest ratio that reads as worth doing. Seven days matches
the first milestone tier in
[MilestoneCelebration.tsx:10](../../src/components/streak/MilestoneCelebration.tsx:10),
so a won wager and the first milestone land on the same day.

**Eligibility.** Offer only at streak >= 3. Below that the user has no established
behavior to bet on and the wager is closer to a slot machine than a commitment device.
This gate is the difference between a behavioral tool and a gambling surface, and it
is not optional.

**Interaction with freezes.** A freeze consumed during an active wager keeps the wager
alive. Users who bought protection should not be punished for using it; the alternative
teaches them to hoard freezes, which suppresses the mechanic that already works.

**Interaction with repair.** Repair does **not** revive a lost wager. Repair restores
the streak; the wager is already settled. Allowing repair to undo a wager loss removes
the stake, and the stake is the whole point.

## Implementation

1. **State.** Extend the `user_streaks` row (`src/lib/streak.ts`, `freeze_tokens` is
   already there) with `wager_started_on date`, `wager_stake int`, `wager_target_days
   int`, `wager_settled boolean`. Nullable; no wager is the default. Mirror to
   localStorage the way the shop already mirrors freeze state, so the card renders
   before the network settles.

2. **Settlement on rollover.** The streak-day rollover already runs on app open (see
   `c2307fb`, `42a8eb5`). Extend it: if a wager is active and unsettled, and the streak
   day advanced without a break, increment progress; at `wager_target_days`, credit
   `stake * 2` and mark settled. If the streak broke and no freeze covered it, mark
   settled with no payout.

   Settlement must be idempotent and server-authoritative. A user who opens the app
   twice must not be paid twice, and the payout must not be computable client-side.

3. **Date handling.** Use `Intl.DateTimeFormat("en-CA")` for every day boundary.
   `new Date("YYYY-MM-DD")` parses as UTC midnight and will settle wagers a day early
   for users west of UTC. This is a known Thyself bug class; do not reintroduce it.

4. **Surfacing progress.** A quiet line on `StreakCard` while a wager is active:
   `Wager: day 4 of 7`. No countdown pressure, no color escalation. The wager is
   already the pressure; adding urgency copy on top of it is the point at which this
   stops being reflective and starts being coercive.

5. **Settlement moment.** Reuse `MicroCelebration` on a win. On a loss, say it plainly
   and once — no shame copy, no re-offer in the same session. The CLAUDE.md learning
   principle ("never shame the user") applies to a lost wager more than anywhere else
   in the app.

6. **PostHog.** `wager_offered`, `wager_placed` (with `stake`, `streak_at_placement`),
   `wager_won`, `wager_lost`. The diligence-relevant chart is D7 retention for
   wager-placers vs. matched non-placers — that is the number Duolingo published and
   the one an acquirer will want reproduced on Thyself's own data.

## Copy notes

- No dashes in UI text, no emojis, no "AI" label, no mystical framing (house rules).
- Avoid gambling register entirely: no "bet", "odds", "jackpot", "double or nothing".
  "Wager" is borderline; **"Commit"** is the better label for Thyself's voice and is
  also the more accurate description of the mechanic.
  Suggested item name: **Commitment** — "Put 50 tokens behind a 7 day run. Finish and
  get 100 back."
- Route any Pro upsell that appears near this to `/pricing`, never `/store`.

## Risk

Low-medium. Additive to a working shop and a working rollover. Two real risks:

1. **Gambling read.** Mitigated by the streak >= 3 gate, one-wager-at-a-time, fixed
   terms with no escalation, and non-gambling language. Worth a second look before
   store submission — App Store review is sensitive to staking mechanics even when the
   currency is not purchasable for cash. **Confirm whether tokens are purchasable with
   real money in production**; if they are, this needs a legal read before it ships,
   and that is a blocking question, not a footnote.
2. **Settlement bugs are trust bugs.** A user who loses a wager to a timezone bug will
   not file a report, they will churn. Server-authoritative settlement and the `en-CA`
   date rule are both load-bearing.

## Expected impact

D7 retention, which is upstream of the 20%+ D30 and 25% DAU/MAU diligence targets.
Duolingo's own figure is +14% D7; a solo-founder app with a smaller token economy
should expect less, but the direction is well established and the instrumentation in
step 6 makes the actual lift measurable rather than assumed.
