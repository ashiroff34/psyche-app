"use client";

import { useState, useEffect, useCallback } from "react";

export interface PsycheProfile {
  // Enneagram
  enneagramType?: number;
  enneagramWing?: string;
  instinctualStacking?: string;
  enneagramSubtype?: string; // e.g., "sx"
  tritypeHead?: number;
  tritypeHeart?: number;
  tritypeGut?: number;
  tritype?: string; // e.g., "514", ordered: first=dominant, second=2nd, third=3rd
  // Dominance-ordered tritype slots (preferred over center-based slots above)
  tritypeFirst?: number;  // dominant / most used type
  tritypeSecond?: number; // second most used type
  tritypeThird?: number;  // third most used type

  // Cognitive
  cognitiveType?: string; // e.g., "INTJ"
  dominantFunction?: string; // e.g., "Ni"

  // User info
  displayName?: string;

  // Engagement
  email?: string;
  streakCount?: number;
  lastVisitDate?: string;
  totalDaysVisited?: number;
  completedQuizzes?: string[];
  journalEntries?: number;
  xp?: number; // experience points for gamification
  badges?: string[];

  // Big Five OCEAN scores
  bigFiveScores?: { factor: string; score: number; percentage: number }[];
  // Self-identification flag
  selfIdentified?: boolean;
  // Assessment history
  assessmentHistory?: {
    id: string;
    name: string;
    result: string;
    completedAt: string;
    topType?: number;
    scores?: Record<string, number>;
    confidence?: number;
  }[];

  // Re-test prompt
  assessmentDate?: string;       // ISO date of first completed assessment

  // Confidence system
  typeConfidence?: number;       // 0–95, compounded across assessments
  assessmentsTaken?: string[];   // e.g. ["quick", "essential-enneagram", "deep"]

  // Conflict resolution — weighted votes from each assessment
  assessmentVotes?: { id: string; type: number }[];
  isTypeContested?: boolean;     // true when runner-up holds >30% of weighted vote
  contestedRunnerUp?: number;    // the runner-up type when contested

  // Legacy fields for backward compat
  mbtiType?: string;
  enneagramCore?: number;
  enneagramScores?: { key: string; score: number; percentage: number }[];
  savedAt?: string;
}

const STORAGE_KEY = "psyche-profile";

// Confidence boosts per assessment (how much each adds to compound score)
const CONFIDENCE_BOOSTS: Record<string, number> = {
  "quick": 0,                  // sets the baseline from raw score
  "essential-enneagram": 15,
  "self-id": 15,
  "integrative": 20,
  "deep": 25,
};

// How much each assessment's type vote weighs in conflict resolution.
// A heavier assessment can override a lighter one.
const ASSESSMENT_VOTE_WEIGHTS: Record<string, number> = {
  "quick": 1,
  "essential-enneagram": 2,
  "self-id": 1.5,
  "integrative": 3,
  "deep": 4,
};

// Resolve the winning type from all assessment votes using weighted majority.
// Returns the winner, the runner-up (if any), and whether the result is contested
// (runner-up holds >30% of the weighted vote — meaning it's close enough to matter).
function resolveTypeFromVotes(votes: { id: string; type: number }[]): {
  winner: number;
  runnerUp: number | null;
  isContested: boolean;
} {
  if (votes.length === 0) return { winner: 0, runnerUp: null, isContested: false };

  const weightedTotals: Record<number, number> = {};
  for (const vote of votes) {
    const w = ASSESSMENT_VOTE_WEIGHTS[vote.id] ?? 1;
    weightedTotals[vote.type] = (weightedTotals[vote.type] ?? 0) + w;
  }

  const sorted = Object.entries(weightedTotals)
    .map(([t, w]) => ({ type: parseInt(t), weight: w }))
    .sort((a, b) => b.weight - a.weight);

  const winner = sorted[0].type;
  const runnerUp = sorted.length > 1 ? sorted[1].type : null;
  const totalWeight = sorted.reduce((sum, e) => sum + e.weight, 0);
  const isContested =
    runnerUp !== null && sorted[1].weight / totalWeight > 0.3;

  return { winner, runnerUp, isContested };
}

// ─── Cross-component sync ────────────────────────────────────────────────────
// Any write to psyche-profile dispatches this event so ALL mounted
// useProfile() instances re-read immediately, changing your Enneagram type
// on the profile page instantly updates sprites/colors on every other page.
const PROFILE_CHANGE_EVENT = "psyche-profile-change";

function broadcastProfileChange(updated: PsycheProfile) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<PsycheProfile>(PROFILE_CHANGE_EVENT, { detail: updated })
    );
  }
}

// Check whether a streak freeze is currently active.
// Returns true if the freeze covers today, cleans up expired keys, and returns false otherwise.
export function checkStreakFreeze(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const active = localStorage.getItem("psyche-streak-freeze-active");
    const expires = localStorage.getItem("psyche-streak-freeze-expires");
    if (active !== "true" || !expires) return false;
    const today = new Intl.DateTimeFormat("en-CA").format(new Date());
    if (expires >= today) return true;
    // Expired — clean up
    localStorage.removeItem("psyche-streak-freeze-active");
    localStorage.removeItem("psyche-streak-freeze-expires");
    return false;
  } catch {
    return false;
  }
}

// Helper used by external code (e.g. results pages) that write directly to
// localStorage without going through useProfile, call this after the write.
export function notifyProfileChanged() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    broadcastProfileChange(parsed);
  } catch {}
}

export function useProfile() {
  const [profile, setProfile] = useState<PsycheProfile>({});
  const [loaded, setLoaded] = useState(false);

  // ── Load & re-sync helper ──────────────────────────────────────────────────
  const readFromStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const normalized: PsycheProfile = {
          ...parsed,
          enneagramType: parsed.enneagramType ?? parsed.enneagramCore,
          cognitiveType: parsed.cognitiveType ?? parsed.mbtiType,
        };
        setProfile(normalized);
        return normalized;
      }
    } catch {}
    return null;
  }, []);

  // Initial load
  useEffect(() => {
    readFromStorage();
    setLoaded(true);
  }, [readFromStorage]);

  // Subscribe to cross-component profile changes
  // When any page saves a new enneagramType/cognitiveType, all mounted
  // useProfile() instances immediately re-read and re-render.
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<PsycheProfile>;
      if (ev.detail) {
        const normalized: PsycheProfile = {
          ...ev.detail,
          enneagramType: ev.detail.enneagramType ?? ev.detail.enneagramCore,
          cognitiveType: ev.detail.cognitiveType ?? ev.detail.mbtiType,
        };
        setProfile(normalized);
      } else {
        readFromStorage();
      }
    };
    window.addEventListener(PROFILE_CHANGE_EVENT, handler);
    return () => window.removeEventListener(PROFILE_CHANGE_EVENT, handler);
  }, [readFromStorage]);

  const updateProfile = useCallback((updates: Partial<PsycheProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      // Schedule broadcast outside of the state updater to avoid
      // "setState during render" React warning
      setTimeout(() => broadcastProfileChange(updated), 0);
      return updated;
    });
  }, []);

  const clearProfile = useCallback(() => {
    setProfile({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Track daily visit & streak
  const trackVisit = useCallback(() => {
    setProfile((prev) => {
      const today = new Intl.DateTimeFormat("en-CA").format(new Date());
      if (prev.lastVisitDate === today) return prev; // already tracked today

      const yd = new Date(); yd.setDate(yd.getDate() - 1);
      const yesterday = new Intl.DateTimeFormat("en-CA").format(yd);
      const isConsecutive = prev.lastVisitDate === yesterday;
      const newStreak = isConsecutive ? (prev.streakCount ?? 0) + 1 : 1;
      const updated = {
        ...prev,
        lastVisitDate: today,
        streakCount: newStreak,
        totalDaysVisited: (prev.totalDaysVisited ?? 0) + 1,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        broadcastProfileChange(updated);
      } catch {}
      return updated;
    });
  }, []);

  const addXP = useCallback((amount: number, badge?: string) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        xp: (prev.xp ?? 0) + amount,
        badges: badge ? [...(prev.badges ?? []), badge] : prev.badges,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        broadcastProfileChange(updated);
      } catch {}
      return updated;
    });
  }, []);

  // Call this whenever an assessment completes.
  // Uses weighted voting to resolve conflicts: heavier assessments override lighter ones.
  // Confidence compounds only across assessments that agree with the weighted winner.
  const recordAssessment = useCallback((
    assessmentId: string,
    rawConfidence: number,
    type: number
  ) => {
    setProfile((prev) => {
      const taken = prev.assessmentsTaken ?? [];
      const alreadyTook = taken.includes(assessmentId);
      const prevVotes = prev.assessmentVotes ?? [];

      // ── Update the vote record ────────────────────────────────────────────
      // If re-taking, replace the old vote; otherwise append.
      const newVotes = alreadyTook
        ? prevVotes.map((v) => v.id === assessmentId ? { id: assessmentId, type } : v)
        : [...prevVotes, { id: assessmentId, type }];

      // ── Resolve the winning type from all weighted votes ──────────────────
      const { winner, runnerUp, isContested } = resolveTypeFromVotes(newVotes);

      // ── Compound confidence ───────────────────────────────────────────────
      // Quick sets a low baseline. Every subsequent assessment that agrees with
      // the weighted winner adds its boost. Disagreement with the winner is
      // a smaller penalty (the heavier test already corrected the direction).
      let newConfidence: number;

      if (assessmentId === "quick") {
        // Always a low baseline — the starting point, not a verdict
        newConfidence = Math.min(rawConfidence, 22);
      } else {
        const boost = CONFIDENCE_BOOSTS[assessmentId] ?? 5;
        const base = prev.typeConfidence ?? Math.min(rawConfidence, 22);
        const agreesWithWinner = type === winner;

        if (alreadyTook) {
          // Re-taking: small bonus if still agrees, small penalty if changed opinion
          newConfidence = agreesWithWinner
            ? Math.min(95, base + 5)
            : Math.max(10, base - 5);
        } else {
          // First time taking this assessment
          newConfidence = agreesWithWinner
            ? Math.min(95, base + boost)
            : Math.max(10, base - 3); // lighter penalty — weighted winner already corrected course
        }
      }

      // If the resolved winner just flipped from what was stored, knock back
      // slightly to signal "type is under review" (but not a freefall)
      const prevWinner = prev.enneagramType;
      if (prevWinner && prevWinner !== winner && assessmentId !== "quick") {
        newConfidence = Math.max(12, newConfidence - 5);
      }

      // Set assessmentDate on the very first assessment taken
      const isFirstEver = taken.length === 0 && !prev.assessmentDate;

      // Award referral tokens on first-ever assessment
      if (isFirstEver) {
        try {
          const referralCode = localStorage.getItem("psyche-referral-code");
          const alreadyRewarded = localStorage.getItem("psyche-referral-rewarded");
          if (referralCode && !alreadyRewarded) {
            localStorage.setItem("psyche-referral-rewarded", "1");
            // Award tokens to this (referred) user via game state
            const gsRaw = localStorage.getItem("psyche-game-state");
            const gs = gsRaw ? JSON.parse(gsRaw) : {};
            const limitedBonus = localStorage.getItem("psyche-referral-limited-bonus") === "true" ? 100 : 0;
            gs.tokens = (gs.tokens ?? 0) + 50 + limitedBonus;
            localStorage.setItem("psyche-game-state", JSON.stringify(gs));
            if (limitedBonus) localStorage.removeItem("psyche-referral-limited-bonus");
          }
        } catch {}
      }

      const historyEntry = {
        id: assessmentId,
        name: assessmentId,
        result: `Type ${winner}`,
        completedAt: new Date().toISOString(),
        topType: winner,
        confidence: Math.round(newConfidence),
      };
      const prevHistory = prev.assessmentHistory ?? [];
      const newHistory = alreadyTook
        ? prevHistory.map((h) => h.id === assessmentId ? historyEntry : h)
        : [...prevHistory, historyEntry];

      const updated = {
        ...prev,
        enneagramType: winner,
        typeConfidence: Math.round(newConfidence),
        assessmentsTaken: alreadyTook ? taken : [...taken, assessmentId],
        assessmentVotes: newVotes,
        isTypeContested: isContested,
        assessmentHistory: newHistory,
        ...(isContested && runnerUp ? { contestedRunnerUp: runnerUp } : { contestedRunnerUp: undefined }),
        ...(isFirstEver ? { assessmentDate: new Date().toISOString() } : {}),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        broadcastProfileChange(updated);
      } catch {}
      return updated;
    });
  }, []);

  const markQuizComplete = useCallback((quizId: string) => {
    setProfile((prev) => {
      if (prev.completedQuizzes?.includes(quizId)) return prev;
      const updated = {
        ...prev,
        completedQuizzes: [...(prev.completedQuizzes ?? []), quizId],
        xp: (prev.xp ?? 0) + 50,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        broadcastProfileChange(updated);
      } catch {}
      return updated;
    });
  }, []);

  // Derived helpers
  const hasType = loaded && (!!profile.enneagramType || !!profile.cognitiveType);
  const displayName = profile.cognitiveType
    ? `${profile.instinctualStacking ? profile.instinctualStacking + " " : ""}${profile.tritype || profile.enneagramType || ""} ${profile.cognitiveType}`.trim()
    : profile.enneagramType
    ? `Type ${profile.enneagramType}`
    : null;

  return {
    profile,
    loaded,
    updateProfile,
    clearProfile,
    trackVisit,
    addXP,
    markQuizComplete,
    recordAssessment,
    hasType,
    displayName,
  };
}
