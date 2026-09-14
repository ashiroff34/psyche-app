# Type-Aware Personalization Radar — 2026-09-14

## Verdict

Type-aware UX is still **solid** across all six layers audited. Since the
09-13 pass, six `src/` files changed (`daily/page.tsx`, `store/page.tsx`,
`pricing/page.tsx`, `onboarding/page.tsx`, `assessments/jungian-self-id`,
`ReminderPrompt.tsx`). None of them removed any type-conditional logic. The
hub reminder now schedules a push built by `buildPersonalizedNotification(type)`,
so that reminder text is type-aware too.

This pass found one paywall component with generic copy on eight result
screens and fixed it.

## Six layers (checked again)

| # | Layer | Status | Evidence (type refs per file) |
|---|---|---|---|
| 1 | Personalized CTAs | PERSONALIZED | `daily/page.tsx` 28, `profile/page.tsx` 54, `growth/page.tsx` 9 |
| 2 | Daily observations | PERSONALIZED | unchanged (type-keyed `Record<number, ...>` data files) |
| 3 | Growth tips | PERSONALIZED | `growth/page.tsx` uses `useTypeAwareCopy` + type-keyed growth edges |
| 4 | Assessment result page | PERSONALIZED | `enneagram/results` 12, `cognitive/results` uses `getPaywallCopy`, secondary results fixed this pass |
| 5 | Paywall copy | PERSONALIZED | `getPaywallCopy` now on `/pricing`, both primary results pages, `PostLessonUpgradeBanner`, `PostAssessmentUpsell` |
| 6 | Lesson progression | PERSONALIZED (order) / PARTIAL (text) | `orderUnitsForType` live on `lessons/page.tsx` |

## Fixed this pass

**The upsell on the secondary assessment results was the same for every type.**
`PostAssessmentUpsell` is the Pro card shown right after a result on eight
assessments: big five, attachment, values, aspects, regulatory focus,
decentering, instinctual, and tritype. Finishing an assessment is the
highest-intent moment in the app, and the card had 0 type references.

Each caller's own body copy stays, since it explains what that assessment
can't reach. A reader with a type now also sees one more line under it,
`getPaywallCopy(type).proBenefit`. This is the same copy source used by
`/pricing`, both primary results pages, and the post-lesson banner. For example:

- Type 2: "Pro gives you the subtype and relational layers, so you can stay close to people without disappearing into them."
- Type 6: "Pro cross-checks your type across multiple assessments and shows the reasoning, so the conclusion is one you can actually stand on."

Readers with no type yet see the card exactly as before. The Pro gate, the
trial CTA, and the `trigger` funnel labels haven't changed, so a before/after
check in PostHog works per screen (`/pricing?from=big_five_result`, etc.). All
nine `proBenefit` strings were checked again for dashes and emoji, and none
have any. One component edit covers all eight screens, with no caller changes.

Commit `27aabbf`. tsc passes (exit 0).

## Remaining generic surfaces (low priority)

Routes that link to `/pricing` and still have 0 type refs:

- `daily/page.tsx` unit limit gate: "Or try Pro free for 7 days, no daily limit"
  (added 09-13). The link is short and states a concrete benefit that fits
  the moment, so type copy would add length without much lift.
- `CognitivePremiumGate.tsx`: a Jungian feature list for a token unlock. It
  lists features rather than making a motivation pitch.
- `cognitive/learn`, `cognitive/assess`, `assessments/cognitive-type`,
  `history`: small inline Pro links, not pitches.

## Open (founder decision, carried forward)

- Post-lesson banner is readable for only about 2 seconds before the
  auto-redirect (`LessonPageClient.tsx`, 2500ms `setTimeout`). See 09-13.
- The active arc is Type 4 for every reader (09-12).
- Hardcoded domain on `/arcs` (09-12).
- Lesson text coverage is 23 of ~149 (09-10, gap A).
- `MilestoneCelebration.tsx` is dead code (09-10, gap B).
