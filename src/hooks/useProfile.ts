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
  tritype?: string; // e.g., "514" — ordered: first=dominant, second=2nd, third=3rd
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
  assessmentHistory?: { id: string; name: string; result: string; completedAt: string }[];

  // Legacy fields for backward compat
  mbtiType?: string;
  enneagramCore?: number;
  enneagramScores?: { key: string; score: number; percentage: number }[];
  savedAt?: string;
}

const STORAGE_KEY = "psyche-profile";

// ─── Cross-component sync ────────────────────────────────────────────────────
// Any write to psyche-profile dispatches this event so ALL mounted
// useProfile() instances re-read immediately — changing your Enneagram type
// on the profile page instantly updates sprites/colors on every other page.
const PROFILE_CHANGE_EVENT = "psyche-profile-change";

function broadcastProfileChange(updated: PsycheProfile) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<PsycheProfile>(PROFILE_CHANGE_EVENT, { detail: updated })
    );
  }
}

// Helper used by external code (e.g. results pages) that write directly to
// localStorage without going through useProfile — call this after the write.
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
        broadcastProfileChange(updated); // ← notify all other mounted instances
      } catch {}
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
      const today = new Date().toISOString().split("T")[0];
      if (prev.lastVisitDate === today) return prev; // already tracked today

      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
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
    hasType,
    displayName,
  };
}
