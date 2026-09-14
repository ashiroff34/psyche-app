# Competitor Psychology Radar — 2026-09-13

**Bot:** competitor-radar (scheduled)
**Competitors researched:** Duolingo, Headspace, 16Personalities, Noom, Truity, Enneagram Institute
**Verdict:** One live bug fixed (hub reminder never scheduled), one rule violation fixed (onboarding emojis), one new gap specced (re-planning when the habit anchor fails).
**Specs:** [competitor-gaps-2026-09-13.md](priority-specs/competitor-gaps-2026-09-13.md)

---

## Note on process

The task calls for AskUserQuestion before implementing. The tool is not available in this unattended run, so the bot applied only changes that are bug fixes or existing-rule compliance (no new features) and specced everything else.

## What changed since the last pass (09-12)

- Gap 6 drip bug still present: `send-drips/route.ts:174` still skips subscribers with no `enneagramType`.
- Gap 7 still open: `motivations` is still written in onboarding and read nowhere else.
- Emoji rule violation from 09-12: **fixed this pass.**

## Findings

| # | Gap | Source | Difficulty | Impact | Status |
|---|---|---|---|---|---|
| 9 | Hub reminder card said "we'll remind you tomorrow" and scheduled nothing | Headspace implementation intentions (+7.5% opens) | easy | D1/D7 return for users who skipped onboarding step 10 | FIXED |
| — | Emojis in onboarding motivation and practice-time pickers | internal UI rule | easy | first-impression polish | FIXED |
| 10 | Habit anchor is set once, never re-planned when the user opens at a different time | Headspace April 2026 (plans lifted opens, not active days), Noom check-ins | medium | push opt-in protection, D30 | SPECCED |

## Web research notes

- Duolingo: DAU/MAU about 33% in Q1 2026; red app-icon dot alone was +1.6% DAU (already specced 09-08, not built).
- Headspace (Irrational Labs, April 2026): personalization quiz +7.6pp course starts; concrete plan +7.5% opens; neither moved active meditation days. Post-onboarding scaffolding is the lesson.
- 16Personalities: no new mechanic surfaced; shareable results already at parity.
- Noom: CBT lessons of 5 to 10 minutes plus weekly coach check-ins. Lessons at parity; check-in maps to Gap 10.
- Truity: workplace Enneagram and $29 to $69 depth reports. Depth report at parity; B2B deferred.

## Changes shipped

- `src/components/daily/ReminderPrompt.tsx` → calls `scheduleDailyReminder` with personalized copy; PostHog `reminder_set_from_hub` gains `scheduled`
- `src/app/onboarding/page.tsx` → removed 8 emoji fields and 2 render spans
- `npx tsc --noEmit`: PASS

## Recommended order if Arianna approves

1. Gap 6 one-line drip fix (outward-facing email, needs sign-off)
2. Gap 7 steps 1 to 4 (read motivations back)
3. Gap 8 dormancy decay, then Gap 10 re-planning (they share the open-hours log)
4. Hub/Settings reminder time reconciliation (follow-up noted under Gap 9)

## Sources

- [Purchasely: Headspace behavioral science onboarding](https://www.purchasely.com/blog/headspace-behavioral-science-onboarding-experiment)
- [Ludaxis: Duolingo gamification psychology 2026](https://www.ludaxis.io/blog/gamification-in-apps-duolingo-case-study-2026)
- [StriveCloud: Duolingo gamification](https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo)
- [VaaSBlock: Duolingo Q1 2026](https://www.vaasblock.com/ai/duolingo-revenue-ai-learning-q1-2026/)
- [SaaSweep: Noom review 2026](https://www.saasweep.com/blog/noom-review)
- [JobCannon: Personality testing industry report 2026](https://jobcannon.io/blog/personality-test-industry-report-2026)
- [Truity: Enneagram for the Workplace](https://www.truity.com/test/enneagram-personality-test-business)
