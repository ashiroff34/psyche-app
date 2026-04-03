"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  LessonProgressState,
  LessonResult,
  LessonInProgress,
  Unit,
} from "@/types/lessons";
import { LESSON_UNITS, getLesson } from "@/data/lessons";

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "psyche-lesson-progress";

function createDefaultState(): LessonProgressState {
  return {
    completedLessons: {},
    currentLesson: undefined,
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLessonProgress() {
  const [state, setState] = useState<LessonProgressState>(createDefaultState);
  const [loaded, setLoaded] = useState(false);
  const saveRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Initial load from localStorage ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LessonProgressState;
        setState(parsed);
      }
    } catch {
      // Use defaults
    }
    setLoaded(true);
  }, []);

  // ── Save helper (debounced, matching useGameState pattern) ───────────────
  const save = useCallback((newState: LessonProgressState) => {
    if (saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch {}
    }, 100);
  }, []);

  // ── State update helper ──────────────────────────────────────────────────
  const update = useCallback(
    (updater: (prev: LessonProgressState) => LessonProgressState) => {
      setState((prev) => {
        const next = updater(prev);
        save(next);
        return next;
      });
    },
    [save]
  );

  // ── Query helpers ────────────────────────────────────────────────────────

  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => {
      return !!state.completedLessons[lessonId];
    },
    [state.completedLessons]
  );

  const isUnitCompleted = useCallback(
    (unitId: string): boolean => {
      const unit = LESSON_UNITS.find((u) => u.id === unitId);
      if (!unit || unit.lessons.length === 0) return false;
      return unit.lessons.every((l) => !!state.completedLessons[l.id]);
    },
    [state.completedLessons]
  );

  const isLessonAvailable = useCallback(
    (unitId: string, lessonId: string): boolean => {
      const unit = LESSON_UNITS.find((u) => u.id === unitId);
      if (!unit) return false;

      // Check prerequisite unit is completed
      if (unit.requiresUnit) {
        const prereqUnit = LESSON_UNITS.find((u) => u.id === unit.requiresUnit);
        if (prereqUnit && prereqUnit.lessons.length > 0) {
          const prereqDone = prereqUnit.lessons.every(
            (l) => !!state.completedLessons[l.id]
          );
          if (!prereqDone) return false;
        }
      }

      // Sequential unlock: must complete previous lesson in unit
      const lessonIndex = unit.lessons.findIndex((l) => l.id === lessonId);
      if (lessonIndex < 0) return false;
      if (lessonIndex === 0) return true; // First lesson in unit is always available (if prereq met)

      const prevLesson = unit.lessons[lessonIndex - 1];
      return !!state.completedLessons[prevLesson.id];
    },
    [state.completedLessons]
  );

  type LessonStatus = "locked" | "available" | "in-progress" | "completed";

  const getLessonStatus = useCallback(
    (unitId: string, lessonId: string): LessonStatus => {
      if (state.completedLessons[lessonId]) return "completed";
      if (
        state.currentLesson?.unitId === unitId &&
        state.currentLesson?.lessonId === lessonId
      ) {
        return "in-progress";
      }
      if (isLessonAvailable(unitId, lessonId)) return "available";
      return "locked";
    },
    [state.completedLessons, state.currentLesson, isLessonAvailable]
  );

  const getUnitProgress = useCallback(
    (unitId: string): { completed: number; total: number; pct: number } => {
      const unit = LESSON_UNITS.find((u) => u.id === unitId);
      if (!unit) return { completed: 0, total: 0, pct: 0 };
      const total = unit.lessons.length;
      const completed = unit.lessons.filter(
        (l) => !!state.completedLessons[l.id]
      ).length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { completed, total, pct };
    },
    [state.completedLessons]
  );

  // ── Mutation helpers ─────────────────────────────────────────────────────

  const startLesson = useCallback(
    (unitId: string, lessonId: string) => {
      update((prev) => ({
        ...prev,
        currentLesson: {
          unitId,
          lessonId,
          exerciseIndex: 0,
          answers: [],
          recycleQueue: [],
        },
      }));
    },
    [update]
  );

  const recordAnswer = useCallback(
    (correct: boolean) => {
      update((prev) => {
        if (!prev.currentLesson) return prev;
        const cl = prev.currentLesson;
        const newAnswers = [...cl.answers, correct];
        const newRecycleQueue = correct
          ? cl.recycleQueue
          : [...cl.recycleQueue, cl.exerciseIndex];
        return {
          ...prev,
          currentLesson: {
            ...cl,
            exerciseIndex: cl.exerciseIndex + 1,
            answers: newAnswers,
            recycleQueue: newRecycleQueue,
          },
        };
      });
    },
    [update]
  );

  const completeLesson = useCallback(
    (
      lessonId: string,
      score: number,
      xpEarned: number,
      perfectRun: boolean
    ): LessonResult => {
      const result: LessonResult = {
        completedAt: new Date().toISOString(),
        score,
        xpEarned,
        perfectRun,
      };

      update((prev) => ({
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: result,
        },
        currentLesson: undefined,
      }));

      // Earn XP via useGameState, callers should wire this up:
      // const { earnXP } = useGameState();
      // earnXP(xpEarned, "lesson");
      // We dispatch a custom event so that any listening game-state hook can pick it up.
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("psyche-lesson-complete", {
            detail: { lessonId, xpEarned, score, perfectRun },
          })
        );
      }

      return result;
    },
    [update]
  );

  const clearCurrentLesson = useCallback(() => {
    update((prev) => ({
      ...prev,
      currentLesson: undefined,
    }));
  }, [update]);

  const resetProgress = useCallback(() => {
    const fresh = createDefaultState();
    setState(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // ── Return ───────────────────────────────────────────────────────────────

  return {
    state,
    loaded,

    // Queries
    isLessonCompleted,
    isUnitCompleted,
    isLessonAvailable,
    getLessonStatus,
    getUnitProgress,

    // Mutations
    startLesson,
    recordAnswer,
    completeLesson,
    clearCurrentLesson,
    resetProgress,
  };
}
