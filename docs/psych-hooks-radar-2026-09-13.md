# Behavioral Hooks Radar — 2026-09-13

Scheduled run with nobody at the keyboard. This is a report only. No app code was changed.

**Result: all six hooks are still in place.** No new gap has appeared since the 2026-09-12 pass.
This pass checked the four `src/` commits that landed after that pass
(`2729231`, `b8d67c3`, `55a7fe1`, `10f8d30`). None of them removes or weakens a hook.

---

## What changed since 09-12

- `2729231` hides Pro trial pitches from people who already pay (`src/hooks/useProUnlocked.ts`).
  In `src/components/MilestoneModal.tsx:188` only the upgrade button is hidden. The streak
  milestone celebration and the Share button still show for everyone, so the reward moment
  is unchanged.
- `b8d67c3` sorts upcoming arcs so the ones for the user's own type come first
  (`src/app/arcs/page.tsx`). This makes **identity reinforcement (hook 3) stronger**.
- `10f8d30` and `55a7fe1` change paywall gating and quiz instrumentation. Neither touches a
  retention hook.

## Hook-by-hook

### 1. Loss aversion (streak fear): WIRED
- `src/components/streak/StreakCard.tsx:38`: at-risk state after 6pm. At `:92` the label
  changes to "at risk tonight"
- `src/components/daily/HubView.tsx:~1310`: urgent and critical countdown banner, plus the
  `StreakSaver` modal
- `src/hooks/useStreakWarning.ts`: schedules the 8pm push. It is called from
  `Navigation.tsx:469`, so it runs on every route.

### 2. Variable reward schedule: WIRED
- `QuizFullscreen.tsx:308`: variable-ratio token drop (`rollTokenDrop`)
- `src/lib/variable-rewards.ts`: `rollLuckyDrop` (`:47`), `isBonusDayToday` (`:79`) and
  golden questions (`isGoldenQuestion`, `:90`)

### 3. Identity reinforcement: WIRED (stronger)
- The daily community voice and the quiz pool are both matched to the user's type
  (`src/app/daily/page.tsx`)
- **New:** the arcs page lists growth and shadow arcs for the user's own type first

### 4. Progress illusion: WIRED
- `HubView.tsx:~445`: 52-week activity heatmap, plus XP, tokens, the daily percentage and the
  lesson path

### 5. Social proof: WIRED (still thin)
- `src/app/page.tsx:287`: static "Thousands of people mapping their psyche"
- `/rarity` page
- Recommendation unchanged: only add a live number once PostHog aggregates can back it.

### 6. Endowed progress: WIRED
- `src/app/onboarding/page.tsx:250, 504`: "Achievement Unlocked" card after the type reveal
- `HubView.tsx:~450`: head-start banner on the first hub visit

---

## Carried-over follow-up (still open)

`DashboardScreen` (`src/app/page.tsx:654`) is still defined and still never rendered.
Its streak hero has no at-risk state. The founder should decide whether to delete it.

## Actions taken

None. No hook gap was found, so nothing was implemented.

---

## PM recheck (14:55)

Second scheduled run today. No commits have touched `src/` since the morning pass (`192329c`).
I spot-checked each hook again and all six are still wired: `StreakCard.tsx:92`,
`variable-rewards.ts:47/79/90`, `Navigation.tsx:469`, `onboarding/page.tsx:504`,
`page.tsx:287` and `HubView.tsx:422`.

There is one uncommitted change in the working tree that this bot did not make: the deletion of
`src/app/personality/[mbti]-enneagram-[type]/page.tsx`. It matches the routing-gotcha rule
(single `[slug]` route). It does not affect any retention hook. The bot left it alone.

**Actions taken:** none. No gap was found.
