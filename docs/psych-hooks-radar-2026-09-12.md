# Behavioral Hooks Radar — 2026-09-12

Scheduled run with nobody at the keyboard. This is a report only. No app code was changed.

**Result: all six hooks are still in place.** No new gap has appeared since the 2026-09-09 pass.
This pass also checked the three streak and reward commits that landed after that pass
(`c9f185d`, `b31b00e`, `fc98e91`).

---

## Hook-by-hook

### 1. Loss aversion (streak fear): WIRED
- `src/components/streak/StreakCard.tsx:38`: in the evening the card switches to an at-risk state
  (`streak > 0 && !dailyCompleted && hours >= 18`) and the label changes to "at risk tonight" (`:92`)
- `src/components/daily/HubView.tsx:1311-1330`: a countdown banner ("Your N-day streak ends in ...")
  with urgent and critical tiers
- `HubView.tsx:422-435, 1954`: the `StreakSaver` modal
- `src/hooks/useStreakWarning.ts` + `src/lib/capacitor-notifications.ts`: the 8pm push. Since
  `fc98e91` it is scheduled from every route, not only from home.

### 2. Variable reward schedule: WIRED (stronger than last pass)
- `src/components/daily/QuizFullscreen.tsx:308, 645`: variable-ratio token drop (`rollTokenDrop`)
- **New since 09-09:** golden questions (`src/lib/variable-rewards.ts:90`). About 12% of questions
  each day give 3x XP (`src/app/daily/page.tsx:1113-1154, 2686`). The pick is seeded by question
  and day, so refreshing the page does not change which questions are golden.
  The day key uses `Intl.DateTimeFormat("en-CA")` (`variable-rewards.ts:37`), so the day
  follows the user's local date instead of UTC.
- `isBonusDayToday()` doubles rewards on about 1 day in 8

### 3. Identity reinforcement: WIRED
- `src/app/daily/page.tsx:1047`: the daily community voice matches the user's type
- `:1068-1069`: the quiz pool includes questions filtered to the user's `typeSpecific` type

### 4. Progress illusion: WIRED
- `HubView.tsx:439-448`: a 52-week activity heatmap built from `psyche-activity-log`, plus XP,
  tokens, the daily percentage and the lesson path

### 5. Social proof: WIRED (still thin, same as before)
- `src/app/page.tsx:287`: static "Thousands of people mapping their psyche"
- `/rarity` (`RarityCard`), linked from `src/components/Navigation.tsx:170`

The recommendation has not changed. Only strengthen this once PostHog aggregates can support a
real number. A made-up weekly count would be a brand-honesty risk and a diligence risk.

### 6. Endowed progress: WIRED
- `src/app/page.tsx:363`: progress bar that starts partly filled on the entry screen
- `src/app/onboarding/page.tsx:250, 504-527`: "Achievement Unlocked" card after the type reveal
- `HubView.tsx:450`: head-start banner on the first hub visit

---

## Carried-over follow-up (still open)

`DashboardScreen` (`src/app/page.tsx:654`) is still defined and still never rendered (there is
no `<DashboardScreen` anywhere). Its streak hero has no at-risk state, so bringing that screen
back would quietly remove hook 1 from it. Deleting the whole block is a decision for the founder.

## Actions taken

None. No hook gap was found, so nothing was implemented.
