# Behavioral Hooks Radar — 2026-09-14

Scheduled run with nobody at the keyboard. This is a report only. No app code was changed.

**Result: all six hooks are still wired.** No new gap has appeared since the 2026-09-13 evening recheck (`5805d75`).

Two commits touched `src/` since that pass. Neither removes or weakens a hook, and one makes the habit cue stronger.

---

## What changed since 09-13 evening

- `934bf06` makes the hub reminder card (`src/components/daily/ReminderPrompt.tsx`) call `scheduleDailyReminder` with a type-personalized notification. Before this fix, the picked time was saved and no reminder ever fired. This makes the **daily trigger stronger** and supports **hook 1 (loss aversion)** and **hook 3 (identity)**: the push text is built from the user's Enneagram type through `buildPersonalizedNotification`. The same commit removes emojis from the onboarding motivation and practice-time options (`src/app/onboarding/page.tsx`). That is a brand rule fix only. The endowed-progress card at `onboarding/page.tsx:504` did not change.
- `0609d44` rewrites the Pro feature list and hero copy on `/store` to match `/pricing`. This is conversion copy and has no hook impact.

## Hook anchors checked again

| Hook | Status | Anchor |
|---|---|---|
| 1. Loss aversion | WIRED | `StreakCard.tsx:92` ("at risk tonight"), `Navigation.tsx:469` (`useStreakWarning`), `HubView.tsx:422/429` (`StreakSaver`) |
| 2. Variable reward | WIRED | `variable-rewards.ts:47/79/90`, `QuizFullscreen.tsx:308` (`rollTokenDrop`) |
| 3. Identity reinforcement | WIRED (stronger) | type-matched daily voice and quiz pool, arcs for the user's own type first, **new:** type-personalized reminder push |
| 4. Progress illusion | WIRED | `HubView.tsx` heatmap, XP, tokens, daily percentage, lesson path |
| 5. Social proof | WIRED (thin) | `page.tsx:287` static copy, `/rarity` page |
| 6. Endowed progress | WIRED | `onboarding/page.tsx:250/504` |

## Open follow-ups (carried over)

- `DashboardScreen` (`src/app/page.tsx:654`) is still defined and never rendered. Its streak hero has no at-risk state. The founder should decide whether to delete it.
- Social proof is still static. Only add a live count once PostHog aggregates can back it.
- New: `ReminderPrompt` now logs `scheduled` on `reminder_set_from_hub`. Once events come in, compare D7 retention for `scheduled: true` against `scheduled: false`. That would give a diligence team evidence that the reminder works.

## Actions taken

None. No gap was found, so nothing was implemented.
