"use client";

// Persistence for the new psychometric layers: Schwartz Values, Big Five
// Aspects, Regulatory Focus, State-Trait micro-check history, Drift snapshots,
// and Context-Dependent selves (work/home/love).
//
// All stored in localStorage (client-only, privacy-preserving).

import { useCallback, useEffect, useState } from "react";
import type { SchwartzResult } from "@/data/psychometrics/schwartz-values";
import type { AspectResult } from "@/data/psychometrics/big-five-aspects";

const KEYS = {
  schwartz: "psyche-schwartz-result",
  aspects: "psyche-aspects-result",
  regFocus: "psyche-reg-focus",
  stateHistory: "psyche-state-history",
  driftSnapshots: "psyche-drift-snapshots",
  contextSelves: "psyche-context-selves",
} as const;

export interface RegulatoryFocusResult {
  promotion: number; // 0-100
  prevention: number; // 0-100
  dominant: "promotion" | "prevention" | "balanced";
  completedAt: string;
}

export interface StateCheckIn {
  date: string; // YYYY-MM-DD
  scores: Record<string, number>; // aspect key → 1-5
}

export interface DriftSnapshot {
  date: string;
  aspectScores: Record<string, number>;
  lifeEvent?: string;
}

export interface ContextSelves {
  work?: Record<string, number>;
  home?: Record<string, number>;
  love?: Record<string, number>;
  updatedAt?: string;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded, ignore
  }
}

export function usePsychometrics() {
  const [schwartz, setSchwartz] = useState<SchwartzResult | null>(null);
  const [aspects, setAspects] = useState<AspectResult | null>(null);
  const [regFocus, setRegFocus] = useState<RegulatoryFocusResult | null>(null);
  const [stateHistory, setStateHistory] = useState<StateCheckIn[]>([]);
  const [driftSnapshots, setDriftSnapshots] = useState<DriftSnapshot[]>([]);
  const [contextSelves, setContextSelves] = useState<ContextSelves>({});

  useEffect(() => {
    setSchwartz(read<SchwartzResult | null>(KEYS.schwartz, null));
    setAspects(read<AspectResult | null>(KEYS.aspects, null));
    setRegFocus(read<RegulatoryFocusResult | null>(KEYS.regFocus, null));
    setStateHistory(read<StateCheckIn[]>(KEYS.stateHistory, []));
    setDriftSnapshots(read<DriftSnapshot[]>(KEYS.driftSnapshots, []));
    setContextSelves(read<ContextSelves>(KEYS.contextSelves, {}));
  }, []);

  const saveSchwartz = useCallback((r: SchwartzResult) => {
    write(KEYS.schwartz, r);
    setSchwartz(r);
  }, []);

  const saveAspects = useCallback((r: AspectResult) => {
    write(KEYS.aspects, r);
    setAspects(r);
    // Also append to drift snapshots for longitudinal tracking
    const snap: DriftSnapshot = {
      date: new Date().toISOString(),
      aspectScores: r.scores as unknown as Record<string, number>,
    };
    const existing = read<DriftSnapshot[]>(KEYS.driftSnapshots, []);
    const updated = [...existing, snap];
    write(KEYS.driftSnapshots, updated);
    setDriftSnapshots(updated);
  }, []);

  const saveRegFocus = useCallback((r: RegulatoryFocusResult) => {
    write(KEYS.regFocus, r);
    setRegFocus(r);
  }, []);

  const addStateCheckIn = useCallback((c: StateCheckIn) => {
    const existing = read<StateCheckIn[]>(KEYS.stateHistory, []);
    // Replace same-day entry if exists
    const filtered = existing.filter(x => x.date !== c.date);
    const updated = [...filtered, c].slice(-180); // keep last ~6 months
    write(KEYS.stateHistory, updated);
    setStateHistory(updated);
  }, []);

  const tagLastDrift = useCallback((event: string) => {
    const existing = read<DriftSnapshot[]>(KEYS.driftSnapshots, []);
    if (!existing.length) return;
    existing[existing.length - 1].lifeEvent = event;
    write(KEYS.driftSnapshots, existing);
    setDriftSnapshots([...existing]);
  }, []);

  const saveContextSelf = useCallback(
    (ctx: "work" | "home" | "love", scores: Record<string, number>) => {
      const current = read<ContextSelves>(KEYS.contextSelves, {});
      const updated: ContextSelves = {
        ...current,
        [ctx]: scores,
        updatedAt: new Date().toISOString(),
      };
      write(KEYS.contextSelves, updated);
      setContextSelves(updated);
    },
    []
  );

  return {
    schwartz,
    aspects,
    regFocus,
    stateHistory,
    driftSnapshots,
    contextSelves,
    saveSchwartz,
    saveAspects,
    saveRegFocus,
    addStateCheckIn,
    tagLastDrift,
    saveContextSelf,
  };
}
