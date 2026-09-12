# Competitor Psychology Radar — 2026-09-12

**Bot:** competitor-radar (scheduled)
**Competitors researched:** Duolingo, Headspace, Truity, 16Personalities, Noom, 2026 retention literature
**Verdict:** Two new gaps, both "signal collected, never used." One UI rule violation. No code changed.
**Specs:** [competitor-gaps-2026-09-12.md](priority-specs/competitor-gaps-2026-09-12.md)

---

## What changed since the last pass (09-11)

- Recent commits (94ff5a0, 30a9e45, 667b97e) are aha-moment and conversion copy work. None of them touch Gaps 1 to 6.
- Gap 6 drip bug is still present: `send-drips/route.ts:174` still gates day 30 on `enneagramType`.

## New findings

| # | Gap | Source | Difficulty | Impact |
|---|---|---|---|---|
| 7 | Onboarding `motivations` are stored and never read again | Headspace (+7.6pp from personalization), Noom | easy to medium | D7 retention, feeling seen; adds a PostHog cohort dimension |
| 8 | Daily reminder is a fixed string that repeats forever; no dormancy decay | Duolingo stop message; 3-7 day recovery window, 2-3x return | medium | protects push opt-in; recovers lapsing users |
| — | Emojis rendered in onboarding (lines 756, 1227) break the UI rule | internal rule | easy | polish, first-impression surface |

## Web research notes

- Duolingo Q1 2026: 116M MAU, 38M DAU (about 33% DAU/MAU); sources disagree, with some citing 50M+ DAU.
- Headspace: users with more active trial days convert more (already the basis of Gap 1).
- 16Personalities: 49 languages; screenshot-optimized results drive TikTok spread. Share cards are already at parity; localization deferred.
- Truity: free results cut off at the point of interest. Already at parity.

## Recommended order if Arianna approves

1. Emoji removal in onboarding (minutes, pure rule compliance)
2. Gap 7 steps 1-4 (read helper, one daily-card use, echo line, PostHog property)
3. Gap 6 one-line drip fix (outward-facing email, needs sign-off)
4. Gap 8 reschedule-on-open, then the decay ladder

## Sources

- [Ludaxis — Duolingo gamification psychology 2026](https://www.ludaxis.io/blog/gamification-in-apps-duolingo-case-study-2026)
- [VaaSBlock — Duolingo Q1 2026](https://www.vaasblock.com/ai/duolingo-revenue-ai-learning-q1-2026/)
- [Purchasely — Headspace behavioral science onboarding](https://www.purchasely.com/blog/headspace-behavioral-science-onboarding-experiment)
- [How They Grow — Headspace](https://www.howtheygrow.co/p/how-headspace-grows-the-monk-who)
- [SoulTrace — Truity free vs paid](https://soultrace.app/en/blog/truity-personality-test)
- [JobCannon — Personality testing industry report 2026](https://jobcannon.io/blog/personality-test-industry-report-2026)
- [SaaSweep — Noom review 2026](https://www.saasweep.com/blog/noom-review)
- [Enable3 — Mobile app retention 2026](https://enable3.io/blog/mobile-app-retention-2025)
- [Really Good Emails — Duolingo "These reminders don't seem to be working"](https://reallygoodemails.com/emails/these-reminders-dont-seem-to-be-working)
- [Sherwood — Duolingo notifications](https://sherwood.news/tech/duolingo-q2-earnings-monthly-active-users-milestone/)
