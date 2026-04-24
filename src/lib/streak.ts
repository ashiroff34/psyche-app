/**
 * Supabase-backed streak recording.
 *
 * Requires: supabase/migrations/20260422000002_user_streaks.sql to be applied.
 *
 * Falls back silently if Supabase is unavailable — the localStorage streak in
 * useGameState.ts continues to work as the source of truth until the migration
 * is live. Once it is, call recordActivity() whenever a user completes a daily
 * activity so the cloud row stays in sync.
 *
 * UTC date bug note: NEVER use new Date("YYYY-MM-DD") — it parses as UTC midnight
 * and can be off by a day in most timezones. Always use Intl.DateTimeFormat("en-CA").
 */

import { supabase } from "@/lib/supabase";

const MILESTONES = [7, 30, 100, 365] as const;

export interface StreakRecord {
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;   // YYYY-MM-DD local
  freeze_tokens: number;
  total_days_active: number;
}

// ─── Core: record a daily activity ───────────────────────────────────────────

export async function recordActivity(userId: string): Promise<void> {
  if (!supabase) return; // Supabase not configured yet

  const today = new Intl.DateTimeFormat("en-CA").format(new Date()); // YYYY-MM-DD local

  const { data: existing, error } = await supabase
    .from("user_streaks")
    .select("current_streak, longest_streak, last_activity_date, freeze_tokens, total_days_active")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.warn("[streak] fetch error:", error.message);
    return;
  }

  if (!existing) {
    // First activity ever — create row
    await supabase.from("user_streaks").insert({
      user_id: userId,
      current_streak: 1,
      longest_streak: 1,
      last_activity_date: today,
      freeze_tokens: 1,
      total_days_active: 1,
    });
    return;
  }

  const last = existing.last_activity_date as string;
  if (last === today) return; // Already counted today

  const yesterday = new Intl.DateTimeFormat("en-CA").format(new Date(Date.now() - 86_400_000));
  const isConsecutive = last === yesterday;
  const currentStreak = (existing.current_streak as number) ?? 0;
  const newStreak = isConsecutive ? currentStreak + 1 : 1;
  const longestStreak = existing.longest_streak as number ?? 0;
  const totalDays = (existing.total_days_active as number) ?? 0;

  const { error: upsertError } = await supabase.from("user_streaks").upsert({
    user_id: userId,
    current_streak: newStreak,
    longest_streak: Math.max(newStreak, longestStreak),
    last_activity_date: today,
    total_days_active: totalDays + 1,
  });

  if (upsertError) {
    console.warn("[streak] upsert error:", upsertError.message);
    return;
  }

  // Fire analytics on milestone streaks
  if ((MILESTONES as readonly number[]).includes(newStreak)) {
    try {
      const { Analytics } = await import("@/lib/analytics");
      Analytics.streakMilestone({ milestone: newStreak as 7 | 30 | 100 | 365, current_streak: newStreak });
    } catch {
      // analytics failure should never break streak recording
    }
  }
}

// ─── Read current streak for a user ──────────────────────────────────────────

export async function getStreakRecord(userId: string): Promise<StreakRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("user_streaks")
    .select("current_streak, longest_streak, last_activity_date, freeze_tokens, total_days_active")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as StreakRecord;
}

// ─── Use a freeze token to preserve a broken streak ──────────────────────────

export async function useFreezeToken(userId: string): Promise<boolean> {
  if (!supabase) return false;

  const record = await getStreakRecord(userId);
  if (!record || record.freeze_tokens <= 0) return false;

  const today = new Intl.DateTimeFormat("en-CA").format(new Date());

  const { error } = await supabase.from("user_streaks").upsert({
    user_id: userId,
    last_activity_date: today, // marks today as active, preserving the streak
    freeze_tokens: record.freeze_tokens - 1,
    freeze_token_last_used_date: today,
  });

  return !error;
}
