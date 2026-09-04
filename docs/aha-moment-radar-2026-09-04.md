# Aha-Moment Radar — 2026-09-04

**Headline: the path itself is in good shape (12 taps, ~3 min, no auth wall, resonant reveal, processing beat, share card at peak). The real problem is that none of it is measurable — the aha funnel has no denominator. `onboarding_started` was defined and fired nowhere; `quick_type_finder` never fired `quiz_started`. Fixed this pass.**

Benchmarks: Duolingo 60s · Headspace 3min · **Thyself ~3min / 12 taps**

---

## 1. New user journey map

| # | Screen | Route / component | Taps | Personalized? |
|---|---|---|---|---|
| 0 | Hero | `src/app/page.tsx` → `EnterScreen` | — | no |
| 1 | Tap "Discover my type" | → `/onboarding?fromEnter=true` | 1 | no |
| 2 | **Type Preview** (what the Enneagram is + 9-type grid) | `onboarding/page.tsx:644` | 1 | **no** |
| 3 | Triage Q1–Q3 (find your center) | `QuickTypeAssessment.tsx:45` | 3 | yes |
| 4 | Triad Q4–Q6 (narrow the type) | `QuickTypeAssessment.tsx:129/210/291` | 3 | yes |
| 5 | Confirm (top vs runner-up) | `QuickTypeAssessment.tsx:990` | 1 | yes |
| 6 | Instinct Q7–Q9 | `QuickTypeAssessment.tsx:1159` | 3 | yes |
| 7 | Processing (2.5s, two-stage) | `QuickTypeAssessment.tsx:1180` | — | — |
| 8 | **TYPE REVEAL — aha** | `onboarding/page.tsx:220` | — | yes |

**12 taps, 4 screens, ~3 minutes.** Welcome and Name are correctly bypassed by `fromEnter=true`.

## 2. Signup wall — CLEAR

No `src/middleware.ts`, no auth route group, no guard anywhere on the path. Onboarding is entirely `localStorage`. The email gate is step 6, **after** the reveal, and is skippable. This is the Duolingo pattern, correctly implemented.

## 3. Assessment length — 10 interactions (well under the 25 risk threshold)

3 triage + 3 triad + 1 confirm + 3 instinct. Auto-advance at 380ms. Skip-for-tokens escape hatch present.

## 4. Result page quality — STRONG

Chibi sprite first (200px spring entrance), then type badge, then "The {typeName}", then a type-aware evocative sentence, then Wound / Passion / Fixation / Armor. Resonant, not clinical. Confetti on entry; "Achievement Unlocked +25 tokens" at 1.5s. Confidence honestly hedged with a runner-up escape hatch.

## 5. Processing moment — PRESENT

2.5s two-stage screen ("mapping" → "finding" at 1.2s). Result held in `pendingResultValue` and delivered only after the fade. Headspace pattern, correct.

## 6. Share moment — PRESENT AT PEAK

`TypeIdentityCard` embedded directly in the reveal under "Share your type", immediately below the primary CTA — inside the first 30 seconds post-result.

---

## Biggest friction point

**The aha funnel is unmeasurable, so its friction is invisible.**

Before this pass the first PostHog event on the primary new-user path was `QUIZ_COMPLETED` (`onboarding/page.tsx:1597`) — which only fires for users who *finish* all 10 questions. `ONBOARDING_STARTED` was defined in `src/lib/posthog.ts:70` and captured nowhere in the codebase. `QUIZ_STARTED` was captured only by the 175-question iEQ9 assessment, never by the Quick Type Finder that every new user actually takes.

One sentence: **you could not compute the landing-to-aha conversion rate or locate a single drop-off point, because the top of the funnel emitted no events at all — every measurement of the aha moment had a numerator and no denominator.**

## Fixed this pass

1. **`onboarding_started`** now fires once on onboarding mount, with `entry` (`enter` / `manual` / `resume` / `fresh`) and `resumed_at_step`. Gives the funnel its denominator and separates cold starts from resumes.
2. **`quiz_started`** now fires once when step 3 mounts, with `assessment: "quick_type_finder"`, `length: 10`, `source: "onboarding"`. Isolates the Type Preview interstitial as its own measurable step: `onboarding_started → quiz_started` is now exactly the cost of that screen.
3. **Copy defect:** the reveal screen still said "12-question quiz" while every other entry point says 10 (leftover from `970d227`). Corrected. The number now agrees across all six surfaces.

tsc: PASS.

## Recommended next — needs founder decision, NOT autonomous

**The Type Preview interstitial (step 2) is the one removable tap on the path.** It is a full screen of exposition — what the Enneagram is, the 9-type grid, "10 questions · ~3 minutes" — shown after the user has already committed by tapping "Discover my type" and before they have invested anything. It sits at the classic highest-drop-off position. Duolingo's canonical fix was to delete the equivalent explainer.

It is not a clear delete: it sets length expectations and frames the Enneagram as not-a-quiz, both of which plausibly lift completion. **Per the stored engagement rule, onboarding is an A/B target, never a replace target** — any change here must ship behind a PostHog feature flag with both variants live.

With the two events added above, that A/B is now actually measurable. Suggested test once traffic allows:
- **Control:** current flow, `onboarding_started → quiz_started` includes the interstitial tap.
- **Variant:** `fromEnter=true` routes straight to step 3, interstitial skipped, the "10 questions · ~3 minutes" expectation moved into the quiz header.
- **Primary metric:** `onboarding_started → type_revealed` conversion. **Guardrail:** quiz completion rate, to catch the expectation-setting loss.

## Also noted (out of scope, worth a separate pass)

`MOTIVATION_OPTIONS` (`onboarding/page.tsx:697`) carries emoji labels, against the project UI rule (no emojis, text emoticons only).
