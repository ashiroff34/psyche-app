# Type-Aware Personalization Radar — 2026-09-13

## Verdict

Type-aware UX is still **solid** across all six layers audited. Since the
09-12 pass, three commits touched `src/` (`2729231`, `55a7fe1`, `10f8d30`).
They added `useProUnlocked` gating to the results upsell, `MilestoneModal`,
`PostLessonUpgradeBanner`, and the journal shadow work gate. None of them
removed any type-conditional logic.

This pass found one paywall surface that still used generic copy and fixed it.

## Six layers (checked again)

| # | Layer | Status | Evidence (type refs per file) |
|---|---|---|---|
| 1 | Personalized CTAs | PERSONALIZED | `daily/page.tsx` 28, `profile/page.tsx` 61, `growth/page.tsx` 7 |
| 2 | Daily observations | PERSONALIZED | unchanged (type-keyed `Record<number, ...>` data files) |
| 3 | Growth tips | PERSONALIZED | `growth/page.tsx` uses `useTypeAwareCopy` + type-keyed growth edges |
| 4 | Assessment result page | PERSONALIZED | `enneagram/results` 12, `cognitive/results` uses `getPaywallCopy` |
| 5 | Paywall copy | PERSONALIZED (post-lesson banner fixed this pass) | `getPaywallCopy` now on `/pricing`, both results pages, and `PostLessonUpgradeBanner` |
| 6 | Lesson progression | PERSONALIZED (order) / PARTIAL (text) | `orderUnitsForType` live at `lessons/page.tsx:526` |

## Fixed this pass

**The post-lesson upgrade banner gave every reader the same text.**
`PostLessonUpgradeBanner` shows after every third completed lesson. It had 0
type references and showed every reader the same identity line. A typed reader
now sees `getPaywallCopy(type).proBenefit`, the same copy source `/pricing`
and both results pages use. For example:

- Type 5: "Pro is the full source material: Naranjo's 27 character structures, tritype deep-dives, and shadow work, with nothing dumbed down."
- Type 9: "Pro is a slow, unhurried path through the deeper layers. A few minutes a day, no pressure, and it waits for you."

Readers with no type yet still see the original line. Show and dismiss rules,
the Pro gate, and the CTA are unchanged. All nine `proBenefit` strings were
checked for dashes and emoji, and none have any.

Commit `a1bff6d`. tsc passes (exit 0).

## Open (founder decision)

- **The post-lesson banner is readable for about 2 seconds.** It renders inside
  the "Lesson Complete" screen, and that screen calls
  `setTimeout(() => router.push("/daily"), 2500)`
  (`src/app/lessons/[unitId]/[lessonId]/LessonPageClient.tsx:81`). After the
  0.35s fade in, a 120 to 150 character pitch is on screen for about 2 seconds
  before the page navigates away. This is true whether the copy is type-aware
  or generic. The minimal fix is to skip the auto-redirect on banner turns (every
  third lesson, not dismissed, not Pro) and show a Continue button. It changes
  the lesson completion flow, so it was left for your call. Watch `/pricing?from=post_lesson`
  in PostHog before and after.
- Still open from earlier passes: the active arc is Type 4 for everyone (09-12), the
  hardcoded domain on `/arcs` (09-12), lesson text coverage at 23 of ~149
  (09-10 gap A), and the dead `MilestoneCelebration.tsx` (09-10 gap B).
- **Low priority:** `StreakFreezeShop.tsx` has 0 type refs. It is a token
  store rather than a Pro pitch, so type copy there would add little.
