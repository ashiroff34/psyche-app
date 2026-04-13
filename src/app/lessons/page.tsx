"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Lock, CheckCircle, ChevronDown, ChevronUp,
  Target, Scale, Heart, Star, Pencil,
  Search, Shield, Sparkles, Flame, Wind, Brain, Lightbulb,
  Compass, Users, Layers, BarChart2, Eye, Shuffle, BookMarked, Zap,
  type LucideIcon,
} from "lucide-react";
import { LESSON_UNITS } from "@/data/lessons";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useProfile } from "@/hooks/useProfile";
import PetCompanion from "@/components/PetCompanion";
import PracticeMode from "@/components/lessons/PracticeMode";

// ── Category Colors ──────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, { accent: string; bg: string; border: string; text: string }> = {
  "enneagram-intro":    { accent: "#6366f1", bg: "bg-indigo-50/60",   border: "border-indigo-200",  text: "text-indigo-600"   },
  "enneagram-type":     { accent: "#7c3aed", bg: "bg-violet-50/60",   border: "border-violet-200",  text: "text-violet-600"   },
  "cognitive-intro":    { accent: "#3b82f6", bg: "bg-blue-50/60",     border: "border-blue-200",    text: "text-blue-600"     },
  "cognitive-function": { accent: "#06b6d4", bg: "bg-cyan-50/60",     border: "border-cyan-200",    text: "text-cyan-600"     },
  "exploration":        { accent: "#f59e0b", bg: "bg-amber-50/60",    border: "border-amber-200",   text: "text-amber-600"    },
  "philosophy":         { accent: "#10b981", bg: "bg-emerald-50/60",  border: "border-emerald-200", text: "text-emerald-600"  },
};

const CATEGORY_LABELS: Record<string, string> = {
  "enneagram-intro":    "Enneagram · Introduction",
  "enneagram-type":     "Enneagram · Type Deep Dive",
  "cognitive-intro":    "Cognitive · Introduction",
  "cognitive-function": "Cognitive · Functions",
  "exploration":        "Exploration",
  "philosophy":         "Philosophy",
};

// ── Crown Level Helpers ──────────────────────────────────────────────────────

function crownRingStyle(level: 0 | 1 | 2 | 3 | 4 | 5): React.CSSProperties {
  if (level === 2) return { outline: "2px solid #cd7f32", outlineOffset: "2px" };
  if (level === 3) return { outline: "2px solid #c0c0c0", outlineOffset: "2px" };
  if (level === 4) return { outline: "2px solid #fbbf24", outlineOffset: "2px" };
  if (level === 5) return { outline: "2px solid #a855f7", outlineOffset: "2px" };
  return {};
}

const UNIT_ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Target, Scale, Heart, Star, Pencil,
  Search, Shield, Sparkles, Flame, Wind, Brain, Lightbulb,
  Compass, Users, Layers, BarChart2, Eye, Shuffle, BookMarked, Zap,
};
// ── Unit Status Helpers ──────────────────────────────────────────────────────

type UnitStatus = "locked" | "available" | "completed";

function useUnitStatus() {
  const { isUnitCompleted, getUnitProgress, isLessonAvailable, getLessonStatus, getLessonCrownLevel } =
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

  return { getUnitStatus, getUnitProgress, getLessonStatus, getLessonCrownLevel, profile };
}

// ── Personalized Subtitle ────────────────────────────────────────────────────

function getPersonalizedSubtitle(
  unitId: string,
  subtitle: string,
  profile: { enneagramType?: number; cognitiveType?: string }
): string {
  if (unitId === "your-type" && profile.enneagramType) {
    return `Deep dive into Type ${profile.enneagramType}. your core motivations`;
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
  categoryColor,
  crownLevel,
}: {
  unitId: string;
  lessonId: string;
  title: string;
  status: "locked" | "available" | "in-progress" | "completed";
  index: number;
  categoryColor: string;
  crownLevel: 0 | 1 | 2 | 3 | 4 | 5;
}) {
  // Zigzag: alternate left/right
  const isRight = index % 2 === 1;

  // Completed nodes use emerald; available/in-progress use the category accent color
  const nodeStyle: React.CSSProperties =
    status === "available" || status === "in-progress"
      ? { background: categoryColor }
      : {};

  const nodeColor =
    status === "completed"
      ? "bg-emerald-500 border-emerald-300 shadow-emerald-200/50"
      : status === "available" || status === "in-progress"
      ? "border-transparent shadow-lg"
      : "bg-slate-300 border-slate-200";

  const inner =
    status === "completed" ? (
      <CheckCircle className="w-5 h-5 text-white" />
    ) : status === "locked" ? (
      <Lock className="w-4 h-4 text-slate-100" />
    ) : (
      <Star className="w-5 h-5 text-white" />
    );

  // Crown ring: use inline outline style for levels 1-5
  const crownStyle = crownLevel >= 1 ? crownRingStyle(crownLevel) : {};

  const node = (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 ${isRight ? "flex-row-reverse" : ""}`}
    >
      <div className="relative flex-shrink-0">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg ${nodeColor} transition-all`}
          style={{
            ...nodeStyle,
            ...crownStyle,
          }}
        >
          {inner}
        </div>
        {crownLevel === 5 && (
          <span className="absolute -top-2 -right-2 text-xs leading-none" title="Legendary">✨</span>
        )}
      </div>
      <div className={`flex flex-col max-w-[180px]`}>
        <span
          className={`text-sm font-medium ${
            status === "locked" ? "text-slate-400" : "text-slate-700"
          }`}
        >
          {title}
        </span>
        {crownLevel === 5 && (
          <span className="text-[9px] uppercase tracking-widest font-bold text-purple-500">Legendary</span>
        )}
      </div>
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
  const [tipOpen, setTipOpen] = useState(false);
  const { getUnitStatus, getUnitProgress, getLessonStatus, getLessonCrownLevel, profile } =
    useUnitStatus();

  const status = getUnitStatus(unit.id);
  const progress = getUnitProgress(unit.id);
  const subtitle = getPersonalizedSubtitle(unit.id, unit.subtitle, profile);

  const catColors = CATEGORY_COLORS[unit.category] ?? {
    accent: "#8b5cf6",
    bg: "bg-violet-50/60",
    border: "border-violet-200",
    text: "text-violet-600",
  };
  const catLabel = CATEGORY_LABELS[unit.category] ?? unit.category;

  // Icon bg: completed → emerald, locked → slate, otherwise use category bg
  const iconBgClass =
    status === "completed"
      ? "bg-emerald-100"
      : status === "locked"
      ? "bg-slate-100"
      : catColors.bg;

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
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${iconBgClass}`}
        >
          {status === "completed" ? (
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          ) : status === "locked" ? (
            <Lock className="w-5 h-5 text-slate-400" />
          ) : (() => {
              const I = unit.icon ? UNIT_ICON_MAP[unit.icon] : null;
              return I
                ? <I className={`w-5 h-5 ${catColors.text}`} />
                : <span className={`text-sm font-bold ${catColors.text}`}>{unit.order}</span>;
            })()}
        </div>

        {/* Title & subtitle */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400">
              UNIT {unit.order}
            </span>
            {status === "completed" && (
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                Complete
              </span>
            )}
          </div>
          {/* Category badge */}
          {status !== "locked" && (
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${catColors.text}`}>
              {catLabel}
            </span>
          )}
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
                    : catColors.accent,
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

      {/* Cheat Sheet / Tip Card */}
      {unit.tipCard && status !== "locked" && (
        <div className="mt-3">
          <button
            onClick={() => setTipOpen(!tipOpen)}
            className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-all hover:opacity-80 ${catColors.text} ${catColors.border} ${catColors.bg}`}
          >
            <span>{tipOpen ? "Hide" : "Cheat Sheet"}</span>
            {tipOpen ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
          <AnimatePresence>
            {tipOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className={`mt-2 rounded-xl p-3 border ${catColors.bg} ${catColors.border}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${catColors.text}`}>
                    {unit.tipCard.title}
                  </p>
                  <ul className="space-y-1.5">
                    {unit.tipCard.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className={`mt-0.5 text-[10px] ${catColors.text}`}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
                const catColor = CATEGORY_COLORS[unit.category]?.accent ?? "#8b5cf6";
                const crown = getLessonCrownLevel(lesson.id);
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
                      categoryColor={catColor}
                      crownLevel={crown}
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
  const { loaded, isUnitCompleted, state } = useLessonProgress();
  const { profile } = useProfile();
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [noWeakSpotsToast, setNoWeakSpotsToast] = useState(false);

  const completedCount = LESSON_UNITS.filter((u) => isUnitCompleted(u.id)).length;
  const totalUnits = LESSON_UNITS.length;
  const petMessage =
    completedCount === 0
      ? "Your companion is excited to learn with you!"
      : completedCount >= totalUnits
      ? "Your companion is so proud!"
      : "Your companion has been studying hard!";

  // Find lessons with score < 80%
  const weakLessons = Object.entries(state.completedLessons)
    .filter(([, result]) => result.score < 80)
    .map(([id]) => id);

  const handlePracticeClick = () => {
    if (weakLessons.length === 0) {
      setNoWeakSpotsToast(true);
      setTimeout(() => setNoWeakSpotsToast(false), 2500);
    } else {
      setPracticeOpen(true);
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-800 border-t-violet-400 rounded-full animate-spin" />
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
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Learn
            </h1>
            <p className="text-xs text-slate-400">
              Master psychology through bite-sized lessons
            </p>
          </div>
          {/* Practice button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handlePracticeClick}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Practice
          </motion.button>
        </div>

        {/* Overall progress bar */}
        <OverallProgress />
      </div>

      {/* No weak spots toast */}
      <AnimatePresence>
        {noWeakSpotsToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl"
          >
            No weak spots yet!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet study buddy */}
      <div className="px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 bg-indigo-50/60 border border-indigo-100/40 rounded-2xl px-4 py-3 mb-6">
          <PetCompanion type={profile?.enneagramType ?? 4} size={44} />
          <span className="text-xs text-indigo-600 font-medium">{petMessage}</span>
        </div>
      </div>

      {/* Unit list */}
      <div className="px-4 sm:px-6 pb-28 max-w-2xl mx-auto">
        <div className="space-y-3">
          {LESSON_UNITS.map((unit, i) => (
            <UnitCard key={unit.id} unit={unit} index={i} />
          ))}
        </div>
      </div>

      {/* Practice Mode overlay */}
      <AnimatePresence>
        {practiceOpen && (
          <PracticeMode
            weakLessons={weakLessons}
            onComplete={(_xp) => {
              setPracticeOpen(false);
              // XP event dispatched by caller if needed; lesson progress hook
              // already listens for psyche-lesson-complete events
            }}
            onExit={() => setPracticeOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
