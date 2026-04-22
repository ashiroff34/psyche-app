"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Zap, ArrowRight, Lock, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import type { LessonWithStatus, UnitWithStatus } from "@/hooks/useMergedLearnState";
import { SCAFFOLD_LABELS } from "@/types/lessons";
import type { ScaffoldStep } from "@/types/lessons";

interface Props {
  lesson: LessonWithStatus | null;
  unit: UnitWithStatus | null;
  onClose: () => void;
}

export default function NodeSheet({ lesson, unit, onClose }: Props) {
  const router = useRouter();

  // Close on backdrop tap / escape
  useEffect(() => {
    if (!lesson) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lesson, onClose]);

  const isOpen = !!lesson && !!unit;
  const isLocked = lesson?.status === "locked";
  const isCompleted = lesson?.status === "completed";
  const scaffoldStep = lesson?.scaffoldStep;
  const scaffoldLabel = scaffoldStep ? SCAFFOLD_LABELS[scaffoldStep as ScaffoldStep] : null;
  const estimatedMinutes = lesson ? Math.max(1, Math.round((lesson.exercises.length * 0.5))) : 0;
  const xpReward = lesson?.xpReward ?? 20;

  const handleStart = () => {
    if (!lesson || !unit) return;
    router.push(`/lessons/${unit.id}/${lesson.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            style={{
              background: "#12082a",
              border: "1px solid rgba(139,92,246,0.25)",
              borderBottom: "none",
              paddingBottom: "env(safe-area-inset-bottom, 24px)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose();
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>

            <div className="px-6 pb-6">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {/* Scaffold step badge */}
              {scaffoldLabel && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{
                    background: `${scaffoldLabel.color}22`,
                    border: `1px solid ${scaffoldLabel.color}44`,
                    color: scaffoldLabel.color,
                  }}
                >
                  {scaffoldLabel.label}
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl font-bold text-white mb-1">{lesson?.title}</h2>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{lesson?.subtitle}</p>

              {/* Locked state */}
              {isLocked && (
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl mb-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Lock className="w-5 h-5 text-white/40" />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Complete earlier lessons in this unit to unlock.
                  </p>
                </div>
              )}

              {/* Completed state */}
              {isCompleted && (
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl mb-4"
                  style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <Crown className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-400">Lesson Complete!</p>
                    {lesson.xpEarned != null && (
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>+{lesson.xpEarned} XP earned</p>
                    )}
                  </div>
                </div>
              )}

              {/* Meta info row */}
              {!isLocked && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>~{estimatedMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>+{xpReward} XP</span>
                  </div>
                  {lesson?.exercises.length != null && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{lesson.exercises.length} exercises</span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA button */}
              {!isLocked && (
                <motion.button
                  onClick={handleStart}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: isCompleted
                      ? "linear-gradient(135deg, #059669, #10b981)"
                      : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    boxShadow: isCompleted
                      ? "0 4px 20px rgba(16,185,129,0.4)"
                      : "0 4px 20px rgba(124,58,237,0.5)",
                  }}
                >
                  {isCompleted ? "Review Lesson" : "Start Lesson"}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
