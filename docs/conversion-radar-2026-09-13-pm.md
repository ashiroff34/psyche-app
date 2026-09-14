# Conversion Radar — 2026-09-13 (pm)

The morning pass made Pro remove the daily unit limit. The two passes before it made Pro unlock
Shadow Work, tritypes and the advanced Enneagram tabs. This pass checks whether every surface that
*describes* Pro was updated to match.

## Re-verified, still solid

- **Post-assessment hook, 7-day trial (`PRO_TRIAL_DAYS`), annual-first anchoring on `/pricing`,
  streak milestone upsell** (`MilestoneModal` → `/pricing?from=streak_milestone`). Unchanged.
- **Unit-limit walls** in `daily/page.tsx` still offer the trial path at 0 tokens.

## Fixed this pass

**`/store` described a smaller Pro than `/pricing` sells, and claimed a benefit that does not exist.**

`/store` is where a user compares "earn tokens" with "go Pro". It was still describing the old split:

| Surface | Said | Reality |
|---|---|---|
| Hero subtitle | "Enneagram tools unlock with tokens... Jungian depth tools require Pro." | Pro also unlocks the advanced Enneagram tabs (tritypes, stackings) and removes the daily lesson limit. |
| Pro tier card | "Inner Work Lab, shadow work, type dynamics" | Same gap. |
| `PRO_FEATURES` | "Ad-free experience" | The app has no ads (no AdSense/AdMob code anywhere in `src/`). Nothing to be free of. |
| `PRO_FEATURES` | "Advanced type analysis reports" | `/report` has no Pro gate. Free users get the same report. |
| `PRO_FEATURES` | *(missing)* "No daily lesson limit", tritypes | Both are on `/pricing` and are real Pro benefits. |

Principles violated:
- **Value salience at the comparison point.** The token vs Pro choice is made on this page. It left out
  the two benefits that answer walls the user has already hit (unit limit, advanced tabs lock).
- **Message consistency across paywall surfaces.** A user who reads `/pricing`, then `/store`, sees two
  different Pros. Inconsistency reads as untrustworthy at the moment of payment.
- **Claim integrity.** "Ad-free" and "advanced reports" are benefits a subscriber cannot find. That is
  refund and chargeback risk, and a diligence flag on marketing claims.

Changes (`src/app/store/page.tsx`):
1. Hero subtitle: "Two ways in. Unlock Enneagram tools one at a time with tokens you earn for free,
   or go Pro for the Jungian depth tools, advanced Enneagram tabs and no daily lesson limit."
   Growth Path stays token-only, so the copy does not say Pro includes all Enneagram tools.
2. Pro tier card lists advanced Enneagram tabs and no daily lesson limit.
3. `PRO_FEATURES`: replaced "Ad-free experience" and "Advanced type analysis reports" with
   "Tritypes, stackings and advanced Enneagram tabs included" and "No daily lesson limit". Grid stays
   at 6 items. Removed the now-unused `Eye` import.

tsc: PASS.

Metric to watch: `checkout_initiated` for `pro_monthly` / `pro_annual` with source `/store`, before vs
after this commit.

## Open findings (need founder decision)

- **Streak loss is a dead end at under 3 tokens.** The "Your Streak Ended" modal in `daily/page.tsx`
  offers a 3-token repair "until midnight" and shows only a disabled button when the user can't afford
  it. That is the strongest loss-aversion moment in the app. A paid route is not a one-line fix: the
  prompt is shown once per day (`psyche-repair-shown-<date>`), so a user who buys tokens and comes back
  would find no repair option. Options: let the modal reappear after a token purchase, or let a Pro
  trial include one free repair (Pro does not list streak protection today).
- **"Priority access to new features"** on `/store` has no mechanism behind it. Keep, define, or drop.
- **`/pricing` still lists "Advanced assessments" and "Audio reflections"**. Neither is Pro-gated
  (carried over from 2026-09-12-pm and 2026-09-13).
- Carried over: Pro Monthly receives 500 tokens but only Annual lists them; Growth Path not in Pro vs
  Type 3 "tracked growth edges" copy; duplicate unit-limit modals; no cancellation save flow (new
  feature); unquantified social proof; no lifetime tier.
