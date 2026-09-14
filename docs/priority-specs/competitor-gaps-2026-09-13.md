# Competitor Gaps — 2026-09-13

**Source:** competitor-radar (scheduled)
**Continues:** [competitor-gaps-2026-09-12.md](competitor-gaps-2026-09-12.md) (Gaps 7, 8, emoji rule violation)
**Status:** Gap 9 FIXED this pass. Emoji rule violation FIXED this pass. Gap 10 SPECCED, NOT BUILT (awaiting founder go-ahead per the no-new-features rule).

---

## Gap 9 — The hub reminder card promised a reminder and never scheduled one (bug, easy) — FIXED

**Competitor basis:** Headspace implementation intentions (Irrational Labs x Headspace x Purchasely, April 2026): a concrete when/where plan drove +7.5% total app opens and +4% unique returns. The tactic only works if the reminder attached to the plan actually fires.

**What was wrong:** `src/components/daily/ReminderPrompt.tsx` shows on the hub for users who skipped the onboarding practice-time step. Its copy says "Pick a time and we'll remind you tomorrow." `save()` wrote `psyche-implementation-intention` to localStorage and fired `reminder_set_from_hub`, but never called `scheduleDailyReminder`. The user got a "Set" confirmation and no notification, ever. Because the intention key was now set, the card also never showed again, so the user had no second chance.

**Fix:** `save()` now parses the picked `HH:MM`, builds the same type-personalized copy onboarding and Settings use (`buildPersonalizedNotification`), and calls `scheduleDailyReminder({ hour, minute, title, body })`. The PostHog event now carries `scheduled: boolean`, so the hub opt-in success rate is measurable (web and permission-denied both report `false`).

**Follow-up (not done, noted for Arianna):** Settings stores reminder time as a preset (`morning` / `afternoon` / `evening` via `hourForTimePreset`). A user who picks 9:30 PM on the hub and later toggles reminders in Settings will be rescheduled to the preset hour. Low frequency; fix by having the hub card also write `NotificationPrefs` with the nearest preset, or by teaching Settings an exact-time field.

---

## Rule violation — emojis in onboarding UI — FIXED

Carried over from the 09-12 pass. Removed the emoji fields and their render spans from `MOTIVATION_OPTIONS` (5 options) and `PRACTICE_TIME_OPTIONS` (3 options) in `src/app/onboarding/page.tsx`. Buttons are now label plus description only. The selected-state check glyph is a text character and was left alone.

---

## Gap 10 — The plan is set once and never revisited when it fails (medium)

**Competitor basis:** The same April 2026 Headspace experiment reported the uncomfortable half of the result: onboarding personalization doubled course starts and the plan lifted opens, but **active meditation days did not move**. Their conclusion was that behavioral design has to continue past onboarding with feedback loops and return nudges. Noom's weekly coach check-in and Duolingo's reminder-time adaptation are both forms of re-planning.

**Current state in Thyself:**
- Onboarding step 10 and the hub card capture an anchor (`psyche-implementation-intention`).
- `fresh-start.ts` reads the anchor only to substitute `{anchor}` into push copy.
- Nothing ever checks whether the user actually shows up near their anchor, and nothing offers a new anchor when they don't. A user who picked "Morning, with coffee" and consistently opens at 10 PM keeps getting an 8 AM reminder they ignore, which trains them to ignore the app's notifications altogether.

**Relationship to Gap 8:** Gap 8 (dormancy decay) changes the reminder *copy and cadence* when a user lapses. Gap 10 changes the *plan* while the user is still active but mistimed. Build Gap 8 first if only one is approved; they share the open-time log below.

### Implementation plan

1. **Log open hours (easy).** In the hub mount effect, append the local hour to `psyche-open-hours` (rolling last 14 entries, one per calendar day, date key via `Intl.DateTimeFormat("en-CA")`, never `new Date("YYYY-MM-DD")`). Add the key to the `data-usage` registry.
2. **Detect a mismatch (easy).** New pure helper `getAnchorMismatch(intent, openHours)` in `src/lib/fresh-start.ts`: returns the modal open hour when at least 5 of the last 7 logged days fall 3+ hours away from the anchor hour; otherwise `null`. Pure function, unit-testable.
3. **Re-plan card (medium).** Reuse `ReminderPrompt` layout. Copy, no dashes or emojis: headline "Your practice time moved"; body "You tend to open Thyself around {observed time}. Want your reminder there instead?"; primary "Move it", secondary "Keep {anchor}". "Move it" rewrites the intention and calls `scheduleDailyReminder`. "Keep" sets a 14-day snooze key.
4. **Analytics.** `anchor_mismatch_shown`, `anchor_moved` / `anchor_kept` with `{ from_hour, to_hour }`. This gives diligence a plan-adherence metric, which is rare in this category.
5. **Brand fit check.** Framed as the app noticing a pattern, which is on-voice for a self-knowledge product. No guilt copy, no streak threat.

**Effort:** about half a day. **Impact:** protects push opt-in (fewer ignored notifications), improves D7/D30 by keeping the reminder on the user's real rhythm. **Diligence value:** a plan-adherence cohort plus a behavioral-science citation on a shipped mechanic.

---

## Checked and already at parity (this pass)

- **Headspace implementation intention in onboarding:** built (step 10, `persistImplementationIntent`).
- **Headspace personalization quiz:** built (motivations step). Still write-only; see Gap 7 in the 09-12 spec.
- **16Personalities shareable results:** share cards exist across 40+ files.
- **Noom daily short psychology lessons:** lessons and daily practice cover this.
- **Truity free-then-paid depth report:** `/pricing` + Pro gates cover this.
- **Duolingo red-dot app badge (+1.6% DAU in their test):** already specced in [notification-optin-and-badge.md](notification-optin-and-badge.md), not built.

## Deferred (hard, not diligence-critical now)

- **Truity Enneagram for the Workplace (B2B team licensing):** a real revenue line for Truity, but a new product surface. Revisit after 150K MAU.
- **16Personalities localization (45+ languages):** deferred, same reasoning as 09-12.

## Sources

- [Purchasely: Behavioral science boosts Headspace course starts by over 100%](https://www.purchasely.com/blog/headspace-behavioral-science-onboarding-experiment)
- [Ludaxis: The psychology of gamification, Duolingo case study 2026](https://www.ludaxis.io/blog/gamification-in-apps-duolingo-case-study-2026)
- [StriveCloud: Duolingo gamification explained](https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo)
- [Digia: Duolingo's habit-forming reminders](https://www.digia.tech/post/duolingo-habit-forming-reminders-retention-architecture/)
- [VaaSBlock: Duolingo Q1 2026](https://www.vaasblock.com/ai/duolingo-revenue-ai-learning-q1-2026/)
- [SaaSweep: Noom review 2026](https://www.saasweep.com/blog/noom-review)
- [JobCannon: State of online personality testing 2026](https://jobcannon.io/blog/personality-test-industry-report-2026)
- [Truity: Enneagram for the Workplace](https://www.truity.com/test/enneagram-personality-test-business)
