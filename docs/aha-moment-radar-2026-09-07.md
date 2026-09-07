# Aha-Moment Radar — 2026-09-07

**Thyself's number: 12 taps / ~2.5–3 minutes from home to type reveal.**
Benchmark: Duolingo 60s, Headspace 3 min. Thyself sits at the Headspace end. The path length is fine. The problem remains what happens *at the moment of arrival*.

No commits touched the onboarding funnel since the 2026-09-06 run (all seven commits since were paywall copy, streak notifications, and post-assessment upsells on secondary assessments). The structural finding below is unchanged and still gated on founder sign-off.

---

## Correction to the 2026-09-06 report

That run reported **13 taps** and flagged the "10 questions" copy as inaccurate. Both were wrong. Verified counts from the source arrays:

| Array | Count | Line |
|---|---|---|
| `triageQuestions` | 3 | [QuickTypeAssessment.tsx:45](src/components/assessments/QuickTypeAssessment.tsx:45) |
| `gutQuestions` / `heartQuestions` / `headQuestions` | 3 each | [:129](src/components/assessments/QuickTypeAssessment.tsx:129), [:210](src/components/assessments/QuickTypeAssessment.tsx:210), [:291](src/components/assessments/QuickTypeAssessment.tsx:291) |
| confirm screen | 1 | [:988](src/components/assessments/QuickTypeAssessment.tsx:988) |
| `TYPE_INSTINCT_QS[n]` / `GENERIC_INSTINCT_QS` | 3 | [:571](src/components/assessments/QuickTypeAssessment.tsx:571) |

3 + 3 + 1 + 3 = **10 answer taps**. The "10 questions · ~3 minutes" copy is **accurate**, and the code comment at [onboarding/page.tsx:1508](src/app/onboarding/page.tsx:1508) documents the same breakdown. Nothing to fix there.

## 1. New-user journey map — 12 taps

| # | Screen | File |
|---|---|---|
| 1 | Home hero → "Discover my type" → `/onboarding?fromEnter=true` | [page.tsx](src/app/page.tsx) |
| 2 | Type Preview interstitial → "Start the assessment" | [onboarding/page.tsx:645](src/app/onboarding/page.tsx:645) |
| 3–5 | Triage Q1–Q3 (find your center) | |
| 6–8 | Center-specific Q1–Q3 | |
| 9 | Confirm screen (top type vs runner-up) | |
| 10–12 | Instinct Q1–Q3 | |
| — | Processing screen (2.5s, passive) | [QuickTypeAssessment.tsx:1182](src/components/assessments/QuickTypeAssessment.tsx:1182) |
| — | **AHA — TypeRevealScreen** | [onboarding/page.tsx:218](src/app/onboarding/page.tsx:218) |

Name entry is correctly skipped when `fromEnter=true`. There is a 380ms forced delay per answer ([QuickTypeAssessment.tsx:981](src/components/assessments/QuickTypeAssessment.tsx:981)) — 10 × 380ms ≈ 3.8s of pure waiting, plus 2.5s processing.

## 2. Signup wall — CLEAN

No `src/middleware.ts`. No route guards anywhere. No auth redirect in `page.tsx`, `onboarding/page.tsx`, or `QuickTypeAssessment.tsx`. The email gate is step 6, **after** the step-4 reveal, and skippable. This is the Duolingo pattern done correctly.

## 3. Assessment length — GOOD

10 taps, well under the 25-question drop-off threshold.

## 4. Result page quality — EMOTIONALLY STRONG, THEN IMMEDIATELY UNDERCUT

Opening is right: chibi sprite → type badge → "The {typeName}" → evocative type-aware sentence → Wound/Passion/Fixation/Armor bullets, confetti on mount. Recognition-first, not clinical.

Then DOM order (verified again this run, unchanged):

```
W/P/F/A bullets              ← recognition peaks here
Confidence meter (22%, orange, "Starting point, keep exploring")   :379
"Why this might be wrong" (collapsible)                            :409
"Not sure yet? That's normal."                                     :452
/mirror link ("Optional · experimental")                           :469
Achievement Unlocked card (+25 tokens, appears at 1.5s)            :501
CTA "This is me →"                                                 :543
"This doesn't feel like me → Try Type N"                           :558
SHARE CARD (TypeIdentityCard)                                      :576
"Get your shareable identity card" → /identity                     :596
```

**Three consecutive hedging blocks sit between the moment of recognition and every forward action.**

The hedging must stay — CLAUDE.md forbids pseudoscience framing and predictive-accuracy claims, and the `── Hedge Hard ──` comments show it was deliberate. The issue is **position, not existence**.

## 5. Processing moment — PRESENT

2.5s two-stage screen: "Mapping your pattern..." → (1.2s) → "Finding your type...". Result held in `pendingResultValue`, delivered on fade-out. Exactly the Headspace pattern.

## 6. Share moment — PRESENT BUT BURIED

`TypeIdentityCard` is embedded at reveal (comment: "Peak-moment shareable") and `useVerifiedShare` awards +20 tokens. But it renders **9th**, at `delay: 0.9`, roughly four phone-screens down — behind three hedge blocks, an experimental /mirror upsell, the achievement card, the primary CTA, and the runner-up escape hatch. Peak virality is the first ~15 seconds; almost nobody scrolls that far before tapping "This is me →".

---

## Biggest friction point

**The share card and primary CTA sit below three consecutive confidence-hedging blocks on the reveal screen, so the peak-emotional moment is spent on doubt instead of on recognition, sharing, or forward motion.**

## Recommended fix (still NOT applied — founder-gated)

Reorder `TypeRevealScreen` only. No copy deleted, no hedging removed:

1. Chibi → badge → name → evocative sentence → W/P/F/A *(unchanged)*
2. Share card + Achievement Unlocked — capture the peak
3. CTA "This is me →" and runner-up button
4. Confidence meter, "Why this might be wrong", "Not sure yet?" — below the fold, fully intact
5. /mirror link, /identity link

Every honesty guarantee survives; the user just reaches the share button and CTA before the caveats.

**Why not shipped:** `project_engagement_patterns.md` records an explicit rule — onboarding is an A/B target, never a replace target; changes route through a PostHog feature flag with both variants live. Reordering the single highest-conversion screen in the funnel is exactly what that rule exists for, and how prominently the app disclaims itself is a founder ethics call. Ready to implement as variant `reveal_order_v2` against current order as control, measured on `share_card_*_post_result` and step-4 → step-6 continue rate.

Secondary, cheap, also unshipped: drop the per-answer delay 380ms → 220ms (saves ~1.6s).

---

## Shipped this run

**Type Preview color drift — fixed.** `TYPE_PREVIEW_DATA` ([onboarding/page.tsx:632](src/app/onboarding/page.tsx:632)) hardcoded its own 9 hex colors instead of deriving from `enneagramTypes`. Two had drifted from the canonical values used everywhere else, including the reveal screen two screens later:

| Type | Preview grid (was) | Canonical | Effect |
|---|---|---|---|
| 5 | `#3D6B9C` | `#2980B9` | muted blue vs. canonical blue |
| 7 | `#5B8FD0` | `#1ABC9C` | **blue vs. canonical teal** |

Type 7 was rendered blue on screen 2 of the aha path and teal on the reveal screen. Now derived from `enneagramTypes` (already imported, and the same source `TypeRevealScreen` reads). Names derived too. tsc: PASS.

## Logged, not fixed

- **Emoji in onboarding UI** — violates the no-emoji rule. `MOTIVATION_OPTIONS` ([onboarding/page.tsx:695](src/app/onboarding/page.tsx:695)) uses 🔍 💞 🌱 🎯 😔; `PRACTICE_TIME_OPTIONS` ([:1137](src/app/onboarding/page.tsx:1137)) uses ☀️ 🌤️ 🌙. Both are post-aha (steps 11 and 12). Removing them changes the row layout, so it needs a design decision (drop the glyph column vs. substitute Lucide icons) rather than a bot's guess.
- **`TYPE_COLORS` vs `enneagramTypes[].color` disagree for Type 6** inside `src/data/enneagram.ts` itself — `TYPE_COLORS[6] = "#27AE60"` (green) but `enneagramTypes[6].color = "#7A8FA6"` (gray-blue). Pre-existing; resolving it means picking a canonical Six color, which is a design call. Affects any surface that reads one source vs. the other.
