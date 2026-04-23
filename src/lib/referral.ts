/**
 * Referral helper — single source of truth for referral codes + share URLs.
 *
 * Each user gets a unique 6-char code stored in localStorage at
 * `psyche-my-referral-code`. Share URLs point to the current origin
 * (works on thyself.app or localhost).
 *
 * The `/r?code=XXX` page captures the code and the referee is credited
 * with bonus tokens when they complete their first assessment
 * (see src/hooks/useProfile.ts line ~334).
 */

const CODE_KEY = "psyche-my-referral-code";

/** Get or create the current user's referral code. */
export function getOrCreateReferralCode(): string {
  if (typeof window === "undefined") return "THYSELF";
  try {
    let code = localStorage.getItem(CODE_KEY);
    if (!code) {
      code = Math.random().toString(36).slice(2, 8).toUpperCase();
      localStorage.setItem(CODE_KEY, code);
    }
    return code;
  } catch {
    return "THYSELF";
  }
}

/**
 * Build a referral share URL. Uses the current origin so links work
 * on localhost, preview deploys, or production without needing config.
 */
export function getReferralShareUrl(): string {
  const code = getOrCreateReferralCode();
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://thyself.app";
  return `${origin}/r?code=${code}`;
}

