# Type-Aware Personalization Radar — 2026-09-10

Verdict: **type-aware UX is solid.** All six audited layers adapt to the user's
Enneagram type. One shipping copy defect found and fixed; two structural gaps
surfaced for founder decision (both are feature work, not polish).

## Layer-by-layer

| # | Layer | Status | Evidence |
|---|---|---|---|
| 1 | Personalized CTAs | covered | `src/hooks/useTypeAwareCopy.ts` + `src/data/type-aware-copy.ts` — 14 keys x 9 variants + default, consumed in daily hub, journal, store, onboarding, retention banner, quick assessment, growth gate |
| 2 | Daily observations | covered | `daily/page.tsx` reads `typeInsights[type]`, `typeChallenges[type]`, `communityVoicesByType[type]`, `getTodayInsightForType()`; second layer at `src/data/subtype-aware-copy.ts` keyed to all 27 instinctual subtypes |
| 3 | Growth tips | covered | `growth/page.tsx` — `GROWTH_THEMES`, per-type `journalPrompts`, `TYPE_GROWTH_EDGES`, `perspective-swaps`, `shadow-dialogue`, `formation-map`, all keyed by type |
| 4 | Assessment result page | covered | `enneagram/results/page.tsx` pulls `subtypes`, `communityVoicesByType`, and `getPaywallCopy(typeNum)` for the upsell |
| 5 | Paywall copy | covered | `src/data/type-paywall-copy.ts` — headline + lossFrame + proBenefit for all 9 types, all three fields consumed on `/pricing`; headline + lossFrame on `/enneagram/results` |
| 6 | Lesson progression | partial | ordering is type-first (`orderUnitsForType` hoists the reader's own type unit); content adaptation reaches only ~23 of ~149 lessons |

Engagement surfaces beyond the six audited layers are also type-aware:
`StreakSaver` (`TYPE_SAVER_COPY`), `StreakCard` (`TYPE_COLORS` flame),
`MilestoneModal` (`activeMilestone.messages[type]`), and both 8pm streak-warning
and re-engagement push notifications (`buildStreakWarningNotification`,
`buildPersonalizedNotification`).

## Fixed this pass

**`src/app/lessons/page.tsx:100`** — the personalized subtitle for the "Your
Type" unit rendered as `Deep dive into Type 4. your core motivations`: a stray
period mid-sentence, lowercase continuation, and a truncated copy of the
authored subtitle that had drifted out of sync with it. Now
`Type ${N}. ${subtitle}`, matching the sibling branch's `Your type. ${subtitle}`
pattern and staying in sync with the authored string. tsc PASS. Committed
`fix: repair broken type-personalized lesson subtitle`.

## Open gaps (founder decision — feature work, not polish)

**A. Lesson content coverage, ~15%.** Only 23 of ~149 lessons carry
`personalized: true`, which is the flag that routes exercises through
`personalizeExercises()` (token substitution for `{typeName}`, `{coreFear}`,
`{coreDesire}`, `{coreMotivation}`, cognitive stack). Lesson *order* is
type-first for everyone; lesson *text* is type-adaptive for a minority. The
minimal change is per-lesson and additive: add `personalized: true` plus
`personalizeFor: "enneagramType"` to a lesson and swap generic nouns in its
exercise prompts for the existing tokens. No new component, no new data file.
Highest-leverage units to convert first are the nine `type-[N]` deep-dives,
since a reader lands there first under the type-first ordering.

**B. Dead component with zero type awareness.**
`src/components/streak/MilestoneCelebration.tsx` (131 lines) is rendered
nowhere; `src/components/MilestoneModal.tsx` is the live milestone surface and
is type-aware. The dead file is the only streak component with no type
handling, so it reads as a personalization gap in any grep-based audit but is
not user-visible. Suggest deleting it.

**C. Deliberately not personalized (no action).**
`StreakFreezeShop` item descriptions ("Protects your streak for 1 day if you
miss your practice") are functional product descriptions of what an item does.
The mechanic is identical for all nine types, so type-framing here would add
words without adding truth.
