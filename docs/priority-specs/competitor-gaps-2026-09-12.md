# Competitor Psychology Radar — Gap Specs (2026-09-12)

Source: scheduled `competitor-radar` run, 2026-09-12. Six web searches (Duolingo,
Headspace, Truity, 16Personalities, Noom, 2026 retention literature) plus one
verification search, compared against the current `src/` tree.

**Headline:** two new gaps, both of the same shape: Thyself *collects* a signal
and then never *uses* it. Plus one rule violation found along the way.

No code was changed. `AskUserQuestion` was unavailable (scheduled,
non-interactive run) and the no-new-features rule holds. Gaps 1 to 6 from
`competitor-gaps-2026-09-04.md`, `-09-10.md`, `-09-11.md` remain open; the
Gap 6 one-line drip bug is still present at
`src/app/api/cron/send-drips/route.ts:174`.

---

## Gap 7 — Onboarding motivations are write-only (easy to medium)

**Competitors:** Headspace, Noom.

**The finding:**

- Headspace (Irrational Labs study, April 2026 webinar): a short personalization
  quiz lifted course starts by **7.6 percentage points** over a default course.
  The mechanism the researchers name is *feeling seen*: the act of asking signals
  that the app is listening, and that is what drives action.
- Noom: the intake quiz (goals, emotional triggers, behavior patterns) sets which
  daily CBT lessons the user sees. The answers shape the curriculum.

The corollary both imply: **asking and then ignoring the answer is worse than not
asking.** The user has been told the app is listening.

**What Thyself has:** `StepMotivations` in `src/app/onboarding/page.tsx:711`
asks *why are you here* (curiosity / relationships / growth / career / struggle),
multi-select, and saves `motivations` to `psyche-profile` (line 728). It is used
exactly once: line 2081 picks one line for the "all set" screen. A search of
`src/` finds **no other reader** of `profile.motivations`. Home, daily, lessons,
the notification copy, and the email drip all behave the same whichever answer
the user gave.

The `struggle` answer matters most. Someone who said "I'm going through something
and need a framework" gets the same streak-first, XP-first home screen as someone
who is just curious.

**Implementation plan:**

1. **Read helper (easy).** `getMotivations(): MotivationId[]` in `src/lib/`,
   safe `JSON.parse` in try/catch, typed union, no `as any`.
2. **One visible downstream use (easy).** Start with the first card on the daily
   page: order existing content by motivation, and write no new content.
   - `relationships` → compatibility / `pair` entry point first
   - `career` → type-at-work page first
   - `growth` → growth / integration-line content first
   - `struggle` → journal and the grip / stress content first, streak card lower
   - `curiosity` → current default
3. **Echo the answer back (easy).** One line of copy on that card ("Because you
   said you're here for relationships…") delivers the feeling-seen effect.
   Draft with `pinky`, gate with `dinky`.
4. **Analytics (easy).** Register motivations as a PostHog person property at
   onboarding completion. That turns D7 / D30 retention by motivation into a chart
   an acquirer can read, and shows whether step 2 moved anything.
5. **Later (medium).** Feed motivation into the drip and notification copy next
   to the Enneagram type (pairs with Gap 5).

**Brand-fit:** passes. Nothing competitive. For `struggle`, keep the
no-clinical-claims rule: frame the content as a lens, never as treatment.

---

## Gap 8 — The daily reminder never adapts to dormancy (medium)

**Competitors:** Duolingo, plus the 2026 retention literature.

**The finding:**

- Re-engagement window: lapsing users are recoverable for about **3 to 7 days**;
  automated early-dormancy triggers get **2 to 3x** the return rate of waiting a
  week or more.
- Duolingo's reminders change as inactivity grows and end with an explicit stop:
  "These reminders don't seem to be working. We'll stop sending them for now." That
  final message is among their most effective, and it went viral.

**What Thyself has:** `scheduleDailyReminder` in
`src/lib/capacitor-notifications.ts:39` schedules one local notification with
`every: "day"` and a **fixed title and body**. It is only called from onboarding
(`onboarding/page.tsx:1186`) and settings (`settings/page.tsx:462, 483`), never
when the app opens. A user who has been gone 60 days still gets the day-1 line
every day. That trains them to ignore it, and a user who switches Thyself off at
the OS level is lost to push for good. `ComebackModal.tsx` already has well-tiered
return logic (1-3 / 4-13 / 14-29 / 30+ days), but it only runs *after* the user is
already back in the app.

**Implementation plan:**

1. **Reschedule on open (easy).** On app foreground, cancel and re-create the
   daily reminder from the stored practice-time preference. This resets the
   dormancy clock and lets step 2 work.
2. **Pre-schedule a decay ladder (medium).** Local notifications can be scheduled
   ahead, so no server is needed. On each open, replace the repeating reminder
   with one-shot notifications:
   - days 1-3: current daily reminder (type-aware via `buildPersonalizedNotification`)
   - day 5: one re-entry line, taking its voice from `TYPE_COMEBACK_LINE` in `ComebackModal.tsx`
   - day 10: one more
   - day 21: an honest stop message, then nothing until the next open
   Any open clears and rebuilds the ladder.
3. **Copy rule.** Use Duolingo's *mechanic* (decay, then an honest stop), never
   its *tone*. Duolingo's "You made Duo sad" guilt is off-brand for a reflective
   product. The stop line should read as respect ("We will stop reminding you. The
   door stays open."), with no chibi guilt. `pinky` drafts, `dinky` gates.
4. **Analytics.** Add a `reminder_ladder_step` property to the open event, so
   return-by-rung shows up in PostHog.

**Diligence value:** notification opt-out rate is a churn signal acquirers ask
about. A decaying ladder protects the push channel's lifetime value.

---

## Rule violation found in passing — emojis in onboarding UI (easy, polish)

The UI rule is no emojis; use text emoticons instead. Two onboarding steps render
emojis:

- `onboarding/page.tsx:695-700` → shown at line 756 (motivation options)
- `onboarding/page.tsx:1136-1139` → shown at line 1227 (practice-time options)

Onboarding is the first screen every new user sees. The fix is to remove the
`emoji` fields and their `<span>`s, or swap in text emoticons.
`MOTIVATION_MESSAGES` (703-709) should also get a `pinky` pass. Lines like
"professional superpower. Let's unlock it." and "Great minds ask great questions"
sound like generic pop copy, not the warm-precise house voice.

Not shipped: onboarding is A/B-only territory (`project_engagement_patterns.md`),
and even a polish edit there should be approved by Arianna first.

---

## Checked and already at parity (new this pass)

| Competitor tactic | Thyself equivalent |
|---|---|
| Headspace implementation intention (practice-time anchor) | `onboarding/page.tsx:1131` step 10 |
| Headspace personalization quiz before first content | onboarding motivations + assessment (collection is at parity; *use* is Gap 7) |
| Truity "crop free results at peak interest" | peak-emotional paywall at `/enneagram/results` (`project_conversion_playbook.md`) |
| Duolingo tiered comeback rewards | `ComebackModal.tsx` 4-tier bonus logic |
| Noom daily bite-sized psychology curriculum | `src/app/lessons`, `src/app/daily` |

## Deferred (hard, not diligence-critical now)

- **Localization.** 16Personalities runs in 49 languages. Thyself has no i18n
  library or message catalog. Hard, and it conflicts with the no-new-features
  rule. Revisit after the 7 priorities.
