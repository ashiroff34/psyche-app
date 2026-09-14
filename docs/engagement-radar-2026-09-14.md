# Engagement Radar — 2026-09-14

Result: 0 🔴 missing, 5 🟡 partial, 3 🟢 working. Same as 2026-09-13. None of the 5 src commits since then (reminder card, store copy, jungian self-id redirect, pro daily limit, post-lesson banner) closed a gap below.

| # | Area | Status | Evidence |
|---|---|---|---|
| 1 | Streak | 🟡 | `StreakCard` renders on /daily (`src/components/daily/HubView.tsx:908`). `recordActivity()` in `src/lib/streak.ts` still has **0 callers**, so Supabase `user_streaks` is never written. Streaks exist only on the device. |
| 2 | Daily content | 🟢 | `src/app/daily/page.tsx` shuffles content with a day seed (`shuffleWithSeed`, line 64) keyed to `Intl.DateTimeFormat("en-CA")` (line 86). |
| 3 | Push | 🟡 | Local notifications are wired in `src/lib/capacitor-notifications.ts`. `@capacitor/push-notifications` is in package.json but imported nowhere in src/, so the server can't send win-back pushes. |
| 4 | Paywall | 🟡 | 8 assessment pages use `PostAssessmentUpsell`, and there's a post-lesson banner plus `/pricing?from=` links. Checkout is Stripe only. RevenueCat shows up only in `src/app/terms/page.tsx`, so there's no native in-app purchase. |
| 5 | Onboarding | 🟢 | `QuickTypeAssessment` runs inside onboarding (`src/app/onboarding/page.tsx:2005`), then the type is revealed, then the user goes to /daily. |
| 6 | PostHog | 🟡 | See the gaps below. |
| 7 | CTA coverage | 🟢 | `/assessments` is the permanent "Know" tab in the bottom nav (`src/components/Navigation.tsx:41`). There's still no in-page `/assessments` link on home, daily, profile or HubView. |
| 8 | Lesson persistence | 🟡 | `src/hooks/useLessonProgress.ts` saves to localStorage. No migration creates a lesson progress table, so progress is lost on reinstall or a new device. |

## PostHog gaps (#6)
- `assessment_complete` still fires only in `src/app/assessments/ieq9-integrative/page.tsx:88`. No other assessment or result page sends it.
- `paywall_view` fires only when /pricing loads. `PostAssessmentUpsell` passes a `from` label but logs no impression itself, so we can't count people who see an upsell and don't click.
- The two event catalogs still disagree. `src/lib/analytics.ts:87,92` uses `lesson_complete` and `quiz_complete`, while `src/lib/posthog.ts:76,104` uses `lesson_completed` and `quiz_completed`.
- `paywall_triggered` appears 0 times and `assessment_completed` 0 times under those names. The live names are `paywall_view` and `assessment_complete`.
- `NEXT_PUBLIC_POSTHOG_KEY` is still empty in `.env.local`. Vercel prod wasn't checked.

## Highest-leverage fixes (fixes, not new features)
1. Call `recordActivity()` wherever the daily goal completes. Server-side streaks are the data source for D30 and DAU/MAU.
2. Send `assessment_complete` from every assessment and results page, and `paywall_view` whenever `PostAssessmentUpsell` renders.
3. Merge the two event catalogs into one list of names.

This is the second day in a row with the same findings. These 3 fixes need founder direction, since fixes 1 and 2 touch the priority 1 and 2 wiring.

## Recheck (later on 2026-09-14)
Still 0 🔴, 5 🟡, 3 🟢. The only new src commit is 27aabbf (`feat: add type-aware post-assessment upsell copy`). It changes copy only in `src/components/PostAssessmentUpsell.tsx`. That file mentions `paywall_view` only in a comment (line 37) and still sends no impression event. `recordActivity()` still has 0 callers, and `assessment_complete` is still sent only from ieq9-integrative. No change to the 3 fixes above.
