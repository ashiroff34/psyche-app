# Engagement Radar — 2026-09-13

Sweep of retention hooks against the 25% DAU/MAU + 20% D30 acquisition bar. Since the 2026-09-12 pass, the only commit touching an engagement file is `55a7fe1`, which instruments `src/app/assessments/quick/page.tsx`. Verdicts are unchanged. Two things were corrected or added this pass: the `useProUnlocked` hook does exist, and there is an event-taxonomy split. Both are covered below. Full background is in [engagement-radar-2026-09-11.md](engagement-radar-2026-09-11.md).

## Verdict summary

| # | Area | Status | Re-verified evidence |
|---|---|---|---|
| 1 | Streak mechanic | 🟡 PARTIAL | `StreakCard` renders at `src/components/daily/HubView.tsx:908` (hub mounted by `/daily` and `/onboarding`), and `StreakSaver` renders at `:1954`. `recordActivity` / `getStreakRecord` / `useFreezeToken` in `src/lib/streak.ts` still have **0 importers**, so `user_streaks` is never written. The `streakMilestone` call at `streak.ts:85` is dead code. Only `src/hooks/useGameState.ts:1294` fires. |
| 2 | Daily content | 🟢 WORKING | `src/app/daily/page.tsx` rotates per-type insights by `getDayOfYear()` (`:78`, `:796`) using `Intl.DateTimeFormat("en-CA")`. |
| 3 | Push notifications | 🔴 MISSING | `@capacitor/push-notifications` ^8.0.3 is in `package.json`, but `PushNotifications` appears **0 times** in `src/`. `src/lib/capacitor-notifications.ts` is `LocalNotifications` only: daily reminder, same-day and next-day streak warnings. There is no device-token storage and no server send, so lapsed users can't be reached. |
| 4 | Paywall triggers | 🟡 PARTIAL | `PostAssessmentUpsell` is mounted in 8 assessment pages (tritype, big-five, attachment, regulatory-focus, values, instinctual, aspects, decentering). There are also `/pricing` CTAs on the enneagram and cognitive results pages and in `MilestoneModal.tsx:193`. **Correction to 09-12:** the entitlement hook `useProUnlocked` exists (`src/hooks/useProUnlocked.ts:15`, 4 importers). Checkout goes through Stripe, and there is no RevenueCat for native. There is still no `paywall_triggered` at the gates. `paywall_view` fires only on `/pricing` (`pricing/page.tsx:199`). |
| 5 | Onboarding | 🟢 WORKING | `src/app/onboarding/page.tsx` runs from `QuickTypeAssessment` to `/daily` (`:2119`). |
| 6 | PostHog events | 🔴 MISSING | `NEXT_PUBLIC_POSTHOG_KEY=` is still **empty** in `.env.local`, so every event no-ops. `assessment_complete` fires only from `ieq9-integrative/page.tsx:88`, which leaves **17 of 18** assessment dirs uninstrumented on that schema. |
| 7 | CTA coverage | 🟢 WORKING | Home links to assessments at `src/app/page.tsx:492,556,564`, and profile at `src/app/profile/page.tsx:1742,1751,1788,1880`. Assessments is a nav tab. The daily hub has no inline CTA, but the nav covers it. |
| 8 | Lesson completion | 🟡 PARTIAL | `useLessonProgress` persists to localStorage (`:34`, `:50`), so progress survives close. There's no Supabase sync, so progress is lost on reinstall or a device switch. |

## New finding: two parallel event taxonomies

`55a7fe1` instrumented the quick type finder with `posthog.capture(EVENTS.QUIZ_STARTED | QUIZ_SKIPPED | QUIZ_COMPLETED | TYPE_REVEALED)` from `src/lib/posthog.ts`. It did not use the typed `Analytics.assessmentComplete` wrapper in `src/lib/analytics.ts`, which the admin dashboard funnel reads (`admin/page.tsx:380`). The SEO funnel is now measurable, but it reports as `quiz_completed` rather than `assessment_complete`, so assessment totals will be split across two event names. The fix is to either fire both events or alias them in PostHog. Pick one convention before instrumenting the remaining 17 assessments.

## Required-event check

| Event | Defined | Fired |
|---|---|---|
| assessment_completed (`assessment_complete`) | yes | 1 of 18 assessments (quick finder uses `quiz_completed` instead) |
| lesson_completed (`lesson_complete`) | yes | yes, `LessonPageClient.tsx:92` |
| streak_milestone | yes | yes, `useGameState.ts:1294` (the `streak.ts:85` site is unreachable) |
| paywall_triggered | **no** | only `paywall_view` on /pricing |

## Founder decision (not collected)

2 items are 🔴 MISSING, so the task calls for asking the founder which to prioritize. This run was unattended and no question tool was available, so no answer was collected. The ranking below stands in its place.

## Ranked recommendation

1. **Set `NEXT_PUBLIC_POSTHOG_KEY`** locally and in Vercel prod. It's config only, and it lights up every wired event, including the new quick-finder funnel. Without it, DAU/MAU and D30 can't be measured at all.
2. **Unify the completion event** (`assessment_complete` vs `quiz_completed`), then instrument the 17 remaining assessment pages.
3. **Wire remote push** (`@capacitor/push-notifications`, device tokens in Supabase, server-side send). This is the missing middle layer of the streak loss-aversion stack for lapsed users.
4. **Call `recordActivity()`** where the daily goal is met, so streaks persist server-side and the dead `streak_milestone` path revives.
