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

---

## Evening recheck

Third scheduled run today. Three commits touched `src/` after the PM recheck (`52d1d24`). None of them removes or weakens a hook.

- `a1bff6d` changes the upgrade banner copy after a lesson so it matches the user's type (`src/components/lessons/PostLessonUpgradeBanner.tsx`). This is a small boost to **identity reinforcement (hook 3)**.
- `2dab5f0` lets Pro subscribers skip the 2 units a day cap (`src/app/daily/page.tsx:~612`). It also adds a trial link to the unit limit modals when the user has no tokens left. The streak repair path in the second modal (`streakDeclined`) is unchanged, so **loss aversion (hook 1)** still works.
- `447101f` makes `/assessments/jungian-self-id` redirect to `/cognitive/assess`. This is routing only and has no hook impact.

Every hook anchor was checked again and is still present:

| Hook | Anchor |
|---|---|
| 1. Loss aversion | `StreakCard.tsx:92`, `Navigation.tsx:469`, `HubView.tsx:422` |
| 2. Variable reward | `variable-rewards.ts:47/79/90`, `QuizFullscreen.tsx:308` |
| 5. Social proof | `page.tsx:287` |
| 6. Endowed progress | `onboarding/page.tsx:504` |

The follow-up carried over from earlier passes is still open: `DashboardScreen` is still never rendered.

**Actions taken:** none. No gap was found, so no app code was changed.
