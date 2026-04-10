// Fresh-Start Effect (Dai, Milkman, Riis 2014, Management Science)
//
// People engage in aspirational behavior more at "temporal landmarks":
// Mondays, first-of-month, new year, birthdays, and post-event. The paper
// showed Google searches for "diet", gym visits, and goal commitments all
// spike at these moments. Using them as re-engagement windows produces
// dramatically higher open and follow-through rates than generic pushes.
//
// This module exposes:
//   - getFreshStartWindow()     → which temporal landmark is active today
//   - getFreshStartCopy()       → warm, type-aware copy for that window
//   - getImplementationIntent() → retrieves stored anchor from onboarding
//   - personalizeWithAnchor()   → replaces {anchor} placeholders in push copy

export type FreshStartWindow =
  | "monday"        // First day of work week
  | "monthStart"    // 1st of month
  | "yearStart"     // Jan 1-3
  | "birthday"      // user's birthday (requires birthday in profile)
  | "seasonChange"  // solstice/equinox windows
  | "none";

export interface ImplementationIntent {
  id: string;
  label: string;
  key: string;
  timeHint: string;
  capturedAt: string;
}

export function getImplementationIntent(): ImplementationIntent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("psyche-implementation-intention");
    return raw ? (JSON.parse(raw) as ImplementationIntent) : null;
  } catch {
    return null;
  }
}

export function getFreshStartWindow(now = new Date(), birthday?: string | null): FreshStartWindow {
  const dow = now.getDay(); // 0=Sun, 1=Mon
  const dom = now.getDate();
  const month = now.getMonth(); // 0-indexed

  if (month === 0 && dom <= 3) return "yearStart";
  if (dom === 1) return "monthStart";

  if (birthday) {
    const [bm, bd] = birthday.split("-").map(Number);
    if (bm - 1 === month && bd === dom) return "birthday";
  }

  // Season changes: Mar 20, Jun 21, Sep 22, Dec 21 (rough)
  const seasonDays: [number, number][] = [[2, 20], [5, 21], [8, 22], [11, 21]];
  for (const [m, d] of seasonDays) {
    if (month === m && Math.abs(dom - d) <= 1) return "seasonChange";
  }

  if (dow === 1) return "monday";
  return "none";
}

export interface FreshStartCopy {
  headline: string;
  body: string;
  cta: string;
}

export function getFreshStartCopy(window: FreshStartWindow, displayName?: string | null, enneagramType?: number | null): FreshStartCopy {
  const name = displayName ? `, ${displayName}` : "";
  switch (window) {
    case "yearStart":
      return {
        headline: `Fresh year${name}`,
        body: "A temporal landmark is the cheapest way to start something. Use this one.",
        cta: "Set today's intention",
      };
    case "monthStart":
      return {
        headline: `New month${name}`,
        body: "Research says today is when you are most likely to stick with something new. What do you want to notice about yourself this month?",
        cta: "Open today's practice",
      };
    case "birthday":
      return {
        headline: `Happy birthday${name}`,
        body: "Birthdays are a fresh-start window. Your insights today are a gift, no streak required.",
        cta: "Claim today's insight",
      };
    case "seasonChange":
      return {
        headline: "The season is turning",
        body: "Some parts of you move with the light. Notice what is shifting.",
        cta: "Today's reflection",
      };
    case "monday":
      return {
        headline: "New week, new clarity",
        body: "Mondays are the strongest weekly landmark for new intentions. One check-in today carries the week.",
        cta: "Start the week",
      };
    case "none":
    default:
      return {
        headline: "Your practice is here",
        body: "A small, consistent act of self-knowledge.",
        cta: "Open today",
      };
  }
}

/**
 * Replaces {anchor} placeholder in push copy with the user's stored
 * implementation intention. Example: "It's {anchor} time" →
 * "It's after-morning-coffee time". Falls back to the original string.
 */
export function personalizeWithAnchor(copy: string): string {
  const intent = getImplementationIntent();
  if (!intent) return copy.replace(/\{anchor\}/g, "");
  return copy.replace(/\{anchor\}/g, intent.label.toLowerCase());
}
