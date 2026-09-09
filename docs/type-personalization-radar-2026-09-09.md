# Type-Personalization Radar — 2026-09-09

Audit of whether the app adapts messaging, CTAs, and triggers by Enneagram type.

**Verdict: all 6 audited layers are personalized. One previously unaudited surface is not — `/arcs` serves every user the Type 4 arc.**

Since the 2026-08-06 pass, both open cleanup items closed and one layer improved:

- `TYPE_PAYWALL_HEADLINES` duplication resolved — headlines now live in a single shared module, [type-paywall-copy.ts](src/data/type-paywall-copy.ts), imported by both `/pricing` and `/enneagram/results`. Zero remaining references to the old duplicated const.
- Em-dashes gone from paywall copy (`grep "—" src/data/type-paywall-copy.ts` → no hits).
- Paywall depth extended past the headline: `TypePaywallCopy` is now `{ headline, lossFrame, proBenefit }` for all 9 types plus a default — the exact enhancement flagged as optional last pass.
- Lesson progression upgraded PARTIAL → COVERED: [lessons/page.tsx:122](src/app/lessons/page.tsx:122) `orderUnitsForType()` now hoists the user's own type unit, wired at [lessons/page.tsx:526](src/app/lessons/page.tsx:526).

---

## Findings by audited area

| # | Area | Status | Evidence |
|---|------|--------|----------|
| 1 | Personalized CTAs (daily/profile/growth) | COVERED | `useTypeAwareCopy` consumed by `HubView`, `MorningEvening`, `RetentionBanner`, `QuickTypeAssessment`, journal, store, onboarding, tiktok. `growth/page.tsx` selects `GROWTH_THEMES`, per-type journal prompts, gradient and bg by active type ([growth/page.tsx:231](src/app/growth/page.tsx:231)) |
| 2 | Daily observations | COVERED | [daily-observations.ts](src/data/daily-observations.ts) is `Record<number, DailyObservationSet>` — per-type first-person Naranjo voice, explore prompt, practice instruction, integration direction, ×4 rotating |
| 3 | Growth tips | COVERED | `growth-edges.ts`, `formation-map.ts`, `GROWTH_THEMES`, all keyed by active type |
| 4 | Assessment result page | COVERED | [enneagram/results/page.tsx](src/app/enneagram/results/page.tsx) — subtypes, levels, famous examples, Hornevian/harmonic/object-relations groups, integration and disintegration lines, countertype flag, all derived from `typeNum` |
| 5 | Paywall copy | COVERED (deep) | `getPaywallCopy(profile.enneagramType)` returns headline + loss frame + Pro benefit per type, used on `/pricing` ([pricing/page.tsx:167](src/app/pricing/page.tsx:167)) and at the results-page gate |
| 6 | Lesson progression | COVERED | `orderUnitsForType()` reorders the curriculum type-first; `your-type` unit description personalizes; `PetCompanion` renders the user's type |

Engagement layer beyond the 6 required areas also checks out: `streakMilestones.ts` carries a per-type message for all 9 types with a generic fallback, and `StreakCard`, `StreakSaver`, `MilestoneModal`, `ComebackModal`, `EngagementNudge`, and `capacitor-notifications.ts` all read the user's type.

---

## Gap: `/arcs` hardcodes the Type 4 arc for every user

**This is the one real one-size-fits-all surface left, and it is the worst possible one to have —** the content is explicitly type-addressed, so the mismatch is visible to the user rather than merely bland.

[arcs/page.tsx:153](src/app/arcs/page.tsx:153):

```
const ACTIVE_ARC = ARCS[0];
const UPCOMING_ARCS = ARCS.slice(1);
```

`ARCS[0]` is `arc-4-1`, "The 4→1 Arc — Turning Longing into Craft." A Type 8 opening "Growth Arcs" from the nav ([Navigation.tsx:192](src/components/Navigation.tsx:192)) is told their active 30-day campaign is about "the depth of feeling" and what "Type 4 learns from Type 1." Their own arc (`arc-shadow-8-5`) sits below in the Upcoming list.

Two follow-on defects from the same hardcode:

- The share hook is pinned to the Type 4 arc too — `shareId: "arc-complete-4-1"` with body text "Just finished the Longing into Craft arc" ([arcs/page.tsx:446](src/app/arcs/page.tsx:446)). Every completing user shares Type 4 content, and all nine types write to one share-dedup id.
- `url: "https://thyself.app/arcs"` in that same hook is a hardcoded domain, against the project code rule. Only occurrence in the file.

### Coverage is already complete — every type has exactly one arc

| Type | Arc | Kind |
|---|---|---|
| 1 | `arc-shadow-1-4` | shadow |
| 2 | `arc-shadow-2-8` | shadow |
| 3 | `arc-shadow-3-9` | shadow |
| 4 | `arc-4-1` | integration |
| 5 | `arc-5-8` | integration |
| 6 | `arc-shadow-6-3` | shadow |
| 7 | `arc-shadow-7-1` | shadow |
| 8 | `arc-shadow-8-5` | shadow |
| 9 | `arc-9-3` | integration |

No new arcs are needed. The selector is a nine-entry map from type to arc id.

### Why this is not a one-line fix

Only `ARCS[0]` has a `prompts` array — `prompts?: string[]` is optional and the other eight arcs omit it. The day modal reads `ACTIVE_ARC.prompts[modalDay - 1]` ([arcs/page.tsx:517](src/app/arcs/page.tsx:517)). Swapping the active arc by type without prompts would hand eight of nine types an empty 30-day campaign — a worse experience than the current mismatch.

**The blocker is content, not code: 8 arcs × 30 prompts = 240 prompts**, each needing to be right about that type's stress or integration direction. That is a `pinky` drafting pass followed by `blinky` review, not a radar auto-fix.

### Proposed minimal change, in order

1. **Content (blocking).** Draft 30 prompts per remaining arc in the existing four-phase shape the Type 4 arc uses (Week 1 naming / Week 2 turning / Week 3 discipline / Week 4 integration / Days 29–30 completion). Shadow arcs describe a disintegration direction, so the arc structure is "recognize the collapse → name what it protects → practice the counter-move → integrate," not the integration-arc shape. `blinky` must confirm each arc's direction against Riso-Hudson lines before any of it ships.
2. **Selector.** Replace the two module-level consts with a type-derived pick inside the component:
   - add `ARC_BY_TYPE: Record<number, string>` next to `ARCS`
   - `const activeArc = useMemo(() => ARCS.find(a => a.id === ARC_BY_TYPE[profile.enneagramType ?? 4]) ?? ARCS[0], [profile.enneagramType])`
   - `const upcomingArcs = useMemo(() => ARCS.filter(a => a.id !== activeArc.id), [activeArc])`
   - replace the 20 `ACTIVE_ARC` / `UPCOMING_ARCS` references with the locals
   - untyped users keep `ARCS[0]`, so the current behavior is the fallback, not a regression
3. **Progress reset already handled.** [arcs/page.tsx:457](src/app/arcs/page.tsx:457) re-inits when `stored.arcId !== ACTIVE_ARC.id`, so a user who sets or changes their type gets a fresh arc rather than day-14 progress on someone else's campaign. That guard works unchanged against the derived arc.
4. **Share hook.** Derive `shareId` as `arc-complete-${activeArc.id}` and the share text from `activeArc.subtitle`; replace the hardcoded `https://thyself.app/arcs` with the site-url source used elsewhere (no `SITE_URL` helper exists in `src/lib` today — one is worth adding since this is the only literal in the file).

Impact: `/arcs` is a top-level nav destination selling a 30-day commitment. A user whose first impression of the feature is a campaign addressed to a different type has no reason to start day 1. This is the largest remaining retention leak attributable to missed personalization.

---

## Lower-priority, non-blocking

- **`/read`** ([read/page.tsx](src/app/read/page.tsx)) renders `READING_SECTIONS` in fixed order with no type ordering — the same pattern `orderUnitsForType()` solves for lessons would apply directly. Low traffic (heart-refill filler), so low value.
- **`MicroCelebration`** takes a caller-supplied `label` and shows for 900ms. Type-personalizing it is not worth the surface area; noted only so a future pass does not re-flag it.

## Notes

Implementation was gated on an `AskUserQuestion` selection. This was a non-interactive scheduled run with no user present, and the one gap found is content-blocked, so no code was changed and nothing was committed.
