// Safe localStorage wrapper
//
// Safari private browsing and full-storage scenarios throw on setItem.
// This wrapper catches silently to prevent page crashes.
// For critical data (profile, game state), it also logs the failure.

/**
 * Safe localStorage.getItem with fallback.
 */
export function safeGet(key: string, fallback: string | null = null): string | null {
  if (typeof window === "undefined") return fallback;
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safe localStorage.setItem that never throws.
 * Returns true if successful, false if failed (quota exceeded, private browsing, etc.)
 */
export function safeSet(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    // Quota exceeded or private browsing
    return false;
  }
}

/**
 * Safe localStorage.removeItem that never throws.
 */
export function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {}
}

/**
 * Safe JSON parse from localStorage with typed fallback.
 */
export function safeGetJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safe JSON stringify + set to localStorage.
 */
export function safeSetJSON(key: string, value: unknown): boolean {
  return safeSet(key, JSON.stringify(value));
}
