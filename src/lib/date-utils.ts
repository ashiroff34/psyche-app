/** Milliseconds in one day. Use this instead of the magic number 86400000. */
export const MS_PER_DAY = 86_400_000;

// Centralized date utility to avoid UTC vs local timezone inconsistency.
//
// The app previously used two different approaches:
//   1. new Date().toISOString().slice(0,10) — returns UTC date (WRONG near midnight)
//   2. new Intl.DateTimeFormat("en-CA").format(new Date()) — returns local date (CORRECT)
//
// This module provides a single getDateKey() that always returns the
// user's LOCAL date in YYYY-MM-DD format.

/**
 * Returns today's date in YYYY-MM-DD format in the user's LOCAL timezone.
 * Use this everywhere instead of toISOString().slice(0,10).
 */
export function getLocalDateKey(date?: Date): string {
  return new Intl.DateTimeFormat("en-CA").format(date ?? new Date());
}

/**
 * Returns the day of year (1-366) for the given date.
 */
export function getDayOfYear(date?: Date): number {
  const d = date ?? new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

/**
 * Returns the ISO week key (e.g., "2026-W15") for the given date.
 */
export function getWeekKey(date?: Date): string {
  const d = date ?? new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}
