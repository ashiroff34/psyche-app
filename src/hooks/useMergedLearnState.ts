"use client";

import { useMemo } from "react";
import { LESSON_UNITS } from "@/data/lessons";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useGameState } from "@/hooks/useGameState";
import type { Unit, Lesson } from "@/types/lessons";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NodeStatus = "locked" | "available" | "current" | "completed";

export interface LessonWithStatus extends Lesson {
  status: NodeStatus;
  xpEarned?: number;
}

export interface UnitWithStatus extends Unit {
  isLocked: boolean;
  progress: { completed: number; total: number };
  lessonsWithStatus: LessonWithStatus[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useMergedLearnState() {
  const {
    state: progressState,
    loaded,
    isUnitCompleted,
    isLessonAvailable,
    getUnitProgress,
  } = useLessonProgress();

  const { state: gameState } = useGameState();

  const unitsWithStatus: UnitWithStatus[] = useMemo(() => {
    return LESSON_UNITS.map((unit) => {
      // Beta testers bypass all unit locks
      const isBeta = typeof window !== "undefined" && (() => { try { return localStorage.getItem("psyche-beta-access") === "true"; } catch { return false; } })();

      // Determine if unit is locked based on requiresUnit
      let isLocked = false;
      if (!isBeta && unit.requiresUnit) {
        const prereq = LESSON_UNITS.find((u) => u.id === unit.requiresUnit);
        if (prereq && prereq.lessons.length > 0) {
          isLocked = !isUnitCompleted(prereq.id);
        }
      }

      const progress = getUnitProgress(unit.id);

      // Compute per-lesson statuses
      // First non-completed lesson in an unlocked unit = "current"
      let foundCurrent = false;
      const lessonsWithStatus: LessonWithStatus[] = unit.lessons.map((lesson) => {
        const isCompleted = !!progressState.completedLessons[lesson.id];
        const result = progressState.completedLessons[lesson.id];

        if (isCompleted) {
          return {
            ...lesson,
            status: "completed" as NodeStatus,
            xpEarned: result?.xpEarned,
          };
        }

        if (isLocked) {
          return { ...lesson, status: "locked" as NodeStatus };
        }

        const available = isLessonAvailable(unit.id, lesson.id);
        if (!available) {
          return { ...lesson, status: "locked" as NodeStatus };
        }

        // First available non-completed lesson = current
        if (!foundCurrent) {
          foundCurrent = true;
          return { ...lesson, status: "current" as NodeStatus };
        }

        return { ...lesson, status: "available" as NodeStatus };
      });

      return {
        ...unit,
        isLocked,
        progress: { completed: progress.completed, total: progress.total },
        lessonsWithStatus,
      };
    });
  }, [progressState.completedLessons, isUnitCompleted, isLessonAvailable, getUnitProgress]);

  // Find the globally current node across all units
  const currentLesson = useMemo(() => {
    for (const unit of unitsWithStatus) {
      const cur = unit.lessonsWithStatus.find((l) => l.status === "current");
      if (cur) return { unit, lesson: cur };
    }
    return null;
  }, [unitsWithStatus]);

  return {
    loaded,
    unitsWithStatus,
    currentLesson,
    gameState,
  };
}
