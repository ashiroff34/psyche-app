"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Lock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
} from "lucide-react";
import { LESSON_UNITS } from "@/data/lessons";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useProfile } from "@/hooks/useProfile";

// ── Unit Status Helpers ──────────────────────────────────────────────────────

type UnitStatus = "locked" | "available" | "completed";

function useUnitStatus() {
  const { isUnitCompleted, getUnitProgress, isLessonAvailable, getLessonStatus } =
    useLessonProgress();
  const { profile } = useProfile();

  const getUnitStatus = useCallback(
    (unitId: string): UnitStatus => {
      const unit = LESSON_UNITS.find((u) => u.id === unitId);
      if (!unit) return "locked";

      // A unit with no lessons is "available" if prereqs met, so users can see it
      if (unit.lessons.length === 0) {
        if (!unit.requiresUnit) return "available";
        const prereq = LESSON_UNITS.find((u) => u.id === unit.requiresUnit);
        if (!prereq) return "available";
        // Prereq with no lessons counts as "met"
        if (prereq.lessons.length === 0) return "available";
        return isUnitCompleted(prereq.id) ? "available" : "locked";
      }

      if (isUnitCompleted(unitId)) return "completed";

      // Check if any lesson in this unit is available
      const hasAvailable = unit.lessons.some((l) =>
        isLessonAvailable(unitId, l.id)
      );
      return hasAvailable ? "available" : "locked";
    },
    [isUnitCompleted, isLessonAvailable]
  );

  return { getUnitStatus, getUnitProgress, getLessonStatus, profile };
}

// ── Personalized Subtitle ────────────────────────────────────────────────────

function getPersonalizedSubtitle(
  unitId: string,
  subtitle: string,
  profile: { enneagramType?: number; cognitiveType?: string }
): string {
  if (unitId === "your-type" && profile.enneagramType) {
    return `Deep dive into Type ${profile.enneagramType} — your core motivations`;
  }
  if (unitId === "your-mind" && profile.cognitiveType) {
    return `How your ${profile.cognitiveType} mind shapes your thinking`;
  }
  return subtitle;
}

// ── Status Colors & Icons ────────────────────────────────────────────────────

function statusColor(status: UnitStatus | "in-progress") {
  switch (status) {
    case "completed":
      return "border-emerald-200 bg-emerald-50/50";
    case "available":
      return "border-sky-200 bg-white";
    case "in-progress":
      return "border-violet-200 bg-violet-50/30";
    default:
      return "border-slate-200 bg-slate-50/60 opacity-60";
  }
}

// ── Lesson Node (Zigzag) ─────────────────────────────────────────────────────

function LessonNode({
  unitId,
  lessonId,
  title,
  status,
  index,
}: {
  unitId: string;
  lessonId: string;
  title: string;
  status: "locked" | "available" | "in-progress" | "completed";
  index: number;
}) {
  // Zigzag: alternate left/right
  const isRight = index % 2 === 1;

  const nodeColor =
    status === "completed"
      ? "bg-emerald-500 border-emerald-300 shadow-emerald-200/50"
      : status === "available" || status === "in-progress"
      ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 border-violet-300 shadow-violet-200/50"
      : "bg-slate-300 border-slate-200";

  const inner =
    status === "completed" ? (
      <CheckCircle className="w-5 h-5 text-white" />
    ) : status === "locked" ? (
      <Lock className="w-4 h-4 text-slate-100" />
    ) : (
      <Star className="w-5 h-5 text-white" />
    );

  const node = (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 ${isRight ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg ${nodeColor} transition-all ${
          status === "available" ? "ring-2 ring-violet-300 ring-offset-2" : ""
        }`}
      >
        {inner}
      </div>
      <span
        className={`text-sm font-medium max-w-[180px] ${
          status === "locked" ? "text-slate-400" : "text-slate-700"
        }`}
      >
        {title}
      </span>
    </motion.div>
  );

  if (status === "available" || status === "in-progress") {
    return (
      <Link href={`/lessons/${unitId}/${lessonId}`} className="block">
        {node}
      </Link>
    );
  }

  if (status === "completed") {
    return (
      <Link href={`/lessons/${unitId}/${lessonId}`} className="block">
        {node}
      </Link>
    );
  }

  return <div className="pointer-events-none">{node}</div>;
}

// ── Unit Card ────────────────────────────────────────────────────────────────

function UnitCard({
  unit,
  index,
}: {
  unit: (typeof LESSON_UNITS)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { getUnitStatus, getUnitProgress, getLessonStatus, profile } =
    useUnitStatus();

  const status = getUnitStatus(unit.id);
  const progress = getUnitProgress(unit.id);
  const subtitle = getPersonalizedSubtitle(unit.id, unit.subtitle, profile);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`rounded-2xl border p-4 transition-all ${statusColor(status)}`}
    >
      {/* Unit header */}
      <button
        onClick={() => {
          if (status !== "locked" && unit.lessons.length > 0) {
            setExpanded(!expanded);
          }
        }}
        disabled={status === "locked" || unit.lessons.length === 0}
        className="w-full flex items-center gap-3 text-left"
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
            status === "completed"
              ? "bg-emerald-100"
              : status === "available"
              ? "bg-sky-100"
              : "bg-slate-100"
          }`}
        >
          {status === "completed" ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          ) : status === "locked" ? (
            <Lock className="w-5 h-5 text-slate-400" />
          ) : (
            <span>{unit.icon}</span>
          )}
        </div>

        {/* Title & subtitle */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">
              UNIT {unit.order}
            </span>
            {status === "completed" && (
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                Complete
              </span>
            )}
          </div>
          <h3
            className={`text-base font-semibold truncate ${
              status === "locked" ? "text-slate-400" : "text-slate-800"
            }`}
          >
            {unit.title}
          </h3>
          <p className="text-xs text-slate-400 truncate">{subtitle}</p>
        </div>

        {/* Expand chevron */}
        {unit.lessons.length > 0 && status !== "locked" && (
          <div className="flex-shrink-0">
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        )}
      </button>

      {/* Progress bar */}
      {unit.lessons.length > 0 && status !== "locked" && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>
              {progress.completed}/{progress.total} lessons
            </span>
            <span>{progress.pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  status === "completed"
                    ? "linear-gradient(90deg, #10b981, #059669)"
                    : "linear-gradient(90deg, #8b5cf6, #d946ef)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress.pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* No lessons yet placeholder */}
      {unit.lessons.length === 0 && status !== "locked" && (
        <p className="mt-3 text-xs text-slate-400 italic">
          Lessons coming soon
        </p>
      )}

      {/* Expanded: lesson nodes in zigzag pattern */}
      <AnimatePresence>
        {expanded && unit.lessons.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 flex flex-col items-center gap-4">
              {unit.lessons.map((lesson, i) => {
                const lessonStatus = getLessonStatus(unit.id, lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`w-full flex ${
                      i % 2 === 0 ? "justify-start pl-4" : "justify-end pr-4"
                    }`}
                  >
                    <LessonNode
                      unitId={unit.id}
                      lessonId={lesson.id}
                      title={lesson.title}
                      status={lessonStatus}
                      index={i}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Overall Progress ─────────────────────────────────────────────────────────

function OverallProgress() {
  const { getUnitProgress } = useLessonProgress();

  let totalLessons = 0;
  let completedLessons = 0;
  for (const unit of LESSON_UNITS) {
    const prog = getUnitProgress(unit.id);
    totalLessons += prog.total;
    completedLessons += prog.completed;
  }

  const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <Zap className="w-5 h-5 text-violet-500" />
      <div className="flex-1">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #8b5cf6, #d946ef)",
            }}
          />
        </div>
      </div>
      <span className="text-sm font-bold text-slate-600">{pct}%</span>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const { loaded } = useLessonProgress();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/40 via-white to-sky-50/30">
      {/* Header */}
      <div className="pt-20 pb-4 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-200/50">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Learn
            </h1>
            <p className="text-xs text-slate-400">
              Master psychology through bite-sized lessons
            </p>
          </div>
        </div>

        {/* Overall progress bar */}
        <OverallProgress />
      </div>

      {/* Unit list */}
      <div className="px-4 sm:px-6 pb-28 max-w-2xl mx-auto">
        <div className="space-y-3">
          {LESSON_UNITS.map((unit, i) => (
            <UnitCard key={unit.id} unit={unit} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
