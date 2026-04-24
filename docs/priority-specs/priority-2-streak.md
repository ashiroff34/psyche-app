# Priority 2 — Streak Mechanic: Implementation Spec

**Status:** NOT STARTED (as of 2026-04-22)
**Blocks:** Priority 7 (paywall trigger on streak milestone), PostHog dashboard (streak_milestone event)
**Migration:** `supabase/migrations/20260422000002_user_streaks.sql` — READY TO APPLY

---

## What to build

A Duolingo-style streak system: every day the user completes at least one lesson/daily observation, their streak increments. Missing a day resets it to 0 (unless they use a freeze token).

### Supabase table

Apply `supabase/migrations/20260422000002_user_streaks.sql` first. Schema:
- `current_streak` — today's streak count
- `longest_streak` — all-time high
- `last_activity_date` — the last date (local timezone) the user was active
- `freeze_tokens` — available StreakSaver tokens (1 free/week, more via paywall)

### Hook: increment streak

Call this when the user completes any daily activity:

```typescript
// src/lib/streak.ts
import { supabase } from '@/lib/supabase'

export async function recordActivity(userId: string): Promise<void> {
  const today = new Intl.DateTimeFormat('en-CA').format(new Date()) // 'YYYY-MM-DD'
  
  const { data: existing } = await supabase
    .from('user_streaks')
    .select('current_streak, longest_streak, last_activity_date, freeze_tokens')
    .eq('user_id', userId)
    .single()
  
  if (!existing) {
    // First activity ever — create row
    await supabase.from('user_streaks').insert({ user_id: userId, current_streak: 1, last_activity_date: today, total_days_active: 1 })
    return
  }
  
  const last = existing.last_activity_date
  if (last === today) return // Already counted today
  
  const yesterday = new Intl.DateTimeFormat('en-CA').format(new Date(Date.now() - 86400000))
  const isConsecutive = last === yesterday
  const newStreak = isConsecutive ? existing.current_streak + 1 : 1
  
  await supabase.from('user_streaks').upsert({
    user_id: userId,
    current_streak: newStreak,
    longest_streak: Math.max(newStreak, existing.longest_streak),
    last_activity_date: today,
    total_days_active: (existing.total_days_active ?? 0) + 1,
  })
  
  // Fire PostHog event on milestone
  if ([7, 30, 100, 365].includes(newStreak)) {
    import('@/lib/analytics').then(({ track }) => 
      track('streak_milestone', { streak: newStreak, userId })
    )
  }
}
```

> **UTC date bug warning:** Never use `new Date("YYYY-MM-DD")` — parses as UTC midnight. Use `Intl.DateTimeFormat("en-CA").format(new Date())` for the current local date.

---

## Components to build

### 1. `StreakCard` component

```
src/components/streak/StreakCard.tsx
```

A card shown on the home page / profile showing:
- Current streak count with flame emoji visual (use Framer Motion for pulse on increment)
- "X day streak" label
- Freeze token count (if > 0: "1 save available")
- Longest streak shown as a muted sub-stat

Props: `{ streak: number, longest: number, freezeTokens: number }`

Colors: use `TYPE_COLORS[enneagramType]` for the flame color.

### 2. `StreakSaver` modal

```
src/components/streak/StreakSaver.tsx
```

Triggered when the user opens the app and their streak is at risk (last activity was 2 days ago, freeze token available):
- "Your streak is about to break" message
- "Use a Freeze Token to save it" button (decrements freeze_tokens in user_streaks)
- "Let it break" button (resets streak to 0)
- 1 free freeze token per week (replenish logic: check if it's been 7 days since last use)

### 3. `MilestoneCelebration` component

```
src/components/streak/MilestoneCelebration.tsx
```

Full-screen overlay triggered at 7, 30, 100, 365 day streaks:
- Animated confetti (use Framer Motion)
- "X day streak!" headline
- "Share your streak" → uses identity card share flow
- "Keep going!" dismiss button

---

## Where to call `recordActivity`

Call after any of these actions succeed:
1. `daily/page.tsx` → when a lesson/daily observation is marked complete
2. `lessons/[id]/page.tsx` → when a lesson node is marked complete
3. `quiz/page.tsx` → when an assessment question is submitted

---

## Paywall integration (Priority 7 dependency)

After free users exhaust their 1 free freeze token/week:
- Show StreakSaver modal with "Get unlimited saves with Pro" CTA
- Gate behind RevenueCat subscription check when Priority 7 is built

---

## Testing notes

- Use `usePetState.ts` date patterns as a reference for local-timezone date handling
- Test: user in UTC-5 timezone completing activity at 11pm local (= 4am UTC next day)
- Test: user misses exactly 1 day → streak resets; uses freeze → streak preserved
- Test: streak milestone fires PostHog event at exactly 7, 30, 100, 365
