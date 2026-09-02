# Aha-Moment Radar — 2026-09-02

**Headline: aha moment is 12 taps / ~3 minutes from landing. No auth wall. Result page is emotionally resonant, has a processing beat, and has a share card at peak. The path is in good shape — the one structural drag is a non-personalized explainer screen sitting between intent and the first question.**

Benchmarks: Duolingo 60s · Headspace 3min · **Thyself ~3min / 12 taps**

---

## 1. New user journey map

| # | Screen | Route / component | Taps | Personalized? |
|---|---|---|---|---|
| 0 | Hero | `src/app/page.tsx` → `EnterScreen` | — | no |
| 1 | Tap "Discover my type" | → `/onboarding?fromEnter=true` | 1 | no |
| 2 | **Type Preview** (what the Enneagram is + 9-type grid) | `onboarding/page.tsx:644` `StepTypePreview` | 1 | **no** |
| 3 | Triage Q1–Q3 (find your center) | `QuickTypeAssessment.tsx:45` | 3 | yes |
| 4 | Triad Q4–Q6 (narrow the type) | `QuickTypeAssessment.tsx:129/210/291` | 3 | yes |
| 5 | Confirm screen (top vs runner-up) | `QuickTypeAssessment.tsx:990` | 1 | yes |
| 6 | Instinct Q7–Q9 | `QuickTypeAssessment.tsx:1159` | 3 | yes |
| 7 | Processing (2.5s, two-stage) | `QuickTypeAssessment.tsx:1118` | — | — |
| 8 | **TYPE REVEAL — aha** | `onboarding/page.tsx:220` `TypeRevealScreen` | — | yes |

**Total: 12 taps, ~3 minutes.** Welcome and Name steps are correctly bypassed by `fromEnter=true` (`onboarding/page.tsx:1561`).

## 2. Signup wall — CLEAR

No `src/middleware.ts`, no auth route group, no auth guard anywhere on the path. Onboarding runs entirely on `localStorage`. The email gate is **step 6, after the reveal** (`handleRevealContinue` → `setStep(6)`, `onboarding/page.tsx:1633`), and it is skippable. This is the Duolingo pattern, correctly implemented.

## 3. Assessment length — 10 questions (under the 25-question risk threshold)

3 triage + 3 triad + 1 confirm + 3 instinct. Answers auto-advance after 380ms; progress bar runs continuously (83% at the last triad question → 83% at the first instinct question, no regression). Skip-for-30-tokens escape hatch exists.

**Defect found and fixed:** all six entry points advertised "8 questions" while the quiz asks 10 — users hit two unannounced screens after believing they were done, at the single highest-drop-off point in the funnel. Fixed in `970d227`.

## 4. Result page quality — STRONG

`TypeRevealScreen` opens with the chibi sprite (200px, spring entrance), then the type badge, then "The {typeName}", then a type-aware evocative sentence via `resolveTypeAwareCopy("reveal.welcome", type)`, then the Wound / Passion / Fixation / Armor block. Emotionally resonant, not clinical. Confetti burst on entry; "Achievement Unlocked +25 tokens" card at 1.5s. Confidence is honestly hedged ("Low, starting point") with a runner-up escape: "This doesn't feel like me → Try Type N".

## 5. Processing moment — PRESENT

2.5s two-stage screen: "Mapping your pattern..." → "Finding your type..." at 1.2s (`QuickTypeAssessment.tsx:1180-1188`). Result is held in `pendingResultValue` and delivered only once the screen fades. This is the Headspace pattern, correctly implemented.

## 6. Share moment — PRESENT AT PEAK

`TypeIdentityCard` is embedded directly in the reveal (`onboarding/page.tsx:576`), under a "Share your type" header, immediately below the primary CTA — inside the first 30 seconds post-result. A secondary link to `/identity` follows. The standalone quiz result screen additionally wires `useVerifiedShare` at +20 tokens.

---

## Biggest friction point

**The Type Preview interstitial (step 2, `onboarding/page.tsx:644`) is the only full screen between the user's decision to start and their first question, and it tells them nothing about themselves** — so the one moment their intent is highest is spent reading a definition of the Enneagram rather than answering a question about their own life.

### Recommendation (needs founder sign-off — not implemented)

Do not simply delete it: it carries real conversion weight per the conversion playbook — the "not a personality quiz" positioning, the Ichazo/Naranjo/Riso-Hudson authority proof, and the time expectation. Instead **fold it into Q1**: render the 9-type grid and the "maps the structure underneath your behavior" line as a collapsed header above the first triage question, so the user is answering within one tap of the hero. Saves one full screen and one tap; keeps every piece of copy.

This is a product decision, so it is surfaced rather than shipped. Worth A/B testing behind a PostHog flag with both variants live, per the onboarding-as-A/B-only rule.

## Shipped this pass

- `970d227` — `fix: correct advertised quiz length — 10 questions, not 8` (6 files, tsc clean)
