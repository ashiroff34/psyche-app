# Conversion Radar — 2026-09-14 (pm)

This morning's pass made the `/pricing` plan cards list only benefits Pro actually gates. This pass
checks the other direction: when a user clicks "Try Pro" on a locked wall, does `/pricing` mention
the thing they were trying to open?

## Re-verified, still solid

- **Post-assessment hook** (`PostAssessmentUpsell`, `QuickTypeAssessment`, `/enneagram/results`),
  **7-day trial** (`PRO_TRIAL_DAYS`, also set in `api/checkout/route.ts`), **annual-first anchoring**,
  **therapy price anchor**, **type-personalized headline / loss frame** (`getPaywallCopy`),
  **abandoned-checkout risk reversal**, **checkout failure surfacing**, **subscriber suppression**.
- **Gate routing**: all 17 `?from=` Pro entry points go to `/pricing`, none to `/store`.
- **Trial-framed CTAs** on every gate ("Try Pro Free for 7 Days").

## Fixed this pass

**Message mismatch between the locked wall and the page it sends you to.**

`/pricing` records `from` for analytics but never showed it to the user. Four walls unlock Pro benefits
that no plan card names:

| Gate (`from=`) | Unlock check (verified) | Named on `/pricing` before? |
|---|---|---|
| `type_history_gate` (`/history`) | `psyche-pro-unlocked` or `psyche-cognitive-unlocked` | No |
| `cognitive_learn_gate` (`/cognitive/learn`) | same | No |
| `type_self_work_gate` (`/enneagram/learn`) | `psyche-pro-unlocked` | No |
| `type_page_gate` (`/enneagram/[type]`) | `psyche-pro-unlocked` | No |

A user who taps "Try Pro Free" on Type History reads eight plan bullets, none of which say Type History.
The question "does this get me the thing I just hit?" goes unanswered at the point of payment.

Principles:
- **Message match / goal continuity.** Intent is highest at the wall. The next screen should confirm the
  specific goal, not restart the pitch from a generic feature list.
- **Value salience.** A concrete, already-desired item ("Type History") beats an abstract list for
  closing the decision.
- **Risk reversal at the goal.** The confirmation line restates the 7-day free trial next to the
  feature.

Change (`src/app/pricing/page.tsx`):
1. `GATE_FEATURES` maps 10 gate triggers to the feature each unlocks. Each entry was checked against
   its gate's unlock condition.
2. Visitors arriving from a mapped gate see: "You were opening Type History. Both Pro plans include it,
   free for your first 7 days." Hidden for subscribers and for non-gate entry points (`post_lesson`,
   `quick_result`, `streak_milestone`, results pages, direct).
3. `PAYWALL_VARIANT` → `pricing_annual_first_v4`.

The plan cards are unchanged, so the page stays the same length for everyone else.

Metric to watch: `paywall_view` → `checkout_initiated` rate by `trigger_event` for gate triggers,
v3 vs v4. Largest expected effect on `type_history_gate`, `cognitive_learn_gate`, `type_self_work_gate`,
`type_page_gate`.

## Open findings (need founder decision)

- **"restore" link is a dead end.** On `/enneagram/learn` the Self Work gate says "already a member?
  restore" and links to `/pricing?from=restore_link`. `/pricing` has no restore path; a subscriber on
  a new device sees the full sales page and a trial they have already used. Needs a real restore
  mechanism (Stripe customer lookup by email), which is backend work.
- **Plan cards still omit Type History, the cognitive path, and Type Self Work.** The callout covers
  gate arrivals. Direct visitors still don't see them. Adding them makes the list 11 lines, so it is a
  layout call.
- Carried over: recurring 500-token grant not implemented (`invoice.paid` webhook); "10 exclusive avatar
  outfits" and "Priority new features" have no mechanism; streak loss dead end under 3 tokens; Growth
  Path not in Pro vs Type 3 "tracked growth edges" copy; duplicate unit-limit modals; no cancellation
  save flow (new feature); unquantified social proof; no lifetime tier.
