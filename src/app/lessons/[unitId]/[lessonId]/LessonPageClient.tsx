"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getLesson, personalizeExercises, LESSON_UNITS } from "@/data/lessons";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useProfile } from "@/hooks/useProfile";
import { useGameState } from "@/hooks/useGameState";
import LessonEngine from "@/components/lessons/LessonEngine";
import { Analytics } from "@/lib/analytics";
import GroundingExercise from "@/components/GroundingExercise";
import type { Lesson } from "@/types/lessons";

export default function LessonPageClient({
  params,
}: {
  params: Promise<{ unitId: string; lessonId: string }>;
}) {
  const { unitId, lessonId } = use(params);
  const router = useRouter();
  const { completeLesson, startLesson, loaded: progressLoaded } = useLessonProgress();
  const { profile, loaded: profileLoaded } = useProfile();
  const game = useGameState();
  const { earnXP } = game;

  const [preparedLesson, setPreparedLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completionShown, setCompletionShown] = useState(false);
  const [showGrounding, setShowGrounding] = useState(false);
  const lessonStartedAt = useRef<number>(Date.now());

  // Load and personalize lesson — run only once when both loaders are ready.
  // profile is captured at load time only; we don't want re-runs on profile
  // updates (XP awards etc.) because that resets in-progress exercise state.
  useEffect(() => {
    if (!progressLoaded || !profileLoaded) return;

    const lesson = getLesson(unitId, lessonId);
    if (!lesson) {
      setError("Lesson not found");
      return;
    }

    if (lesson.exercises.length === 0) {
      setError("This lesson has no exercises yet. Check back soon!");
      return;
    }

    // Personalize exercises if needed
    let finalLesson = lesson;
    if (lesson.personalized) {
      const personalized = personalizeExercises(lesson.exercises, profile);
      finalLesson = { ...lesson, exercises: personalized };
    }

    setPreparedLesson(finalLesson);
    startLesson(unitId, lessonId);

    // Fire lesson_start analytics
    const typeMatch = unitId.match(/^type-(\d)$/);
    const typeFocus = typeMatch ? parseInt(typeMatch[1], 10) : 0;
    const unitIndex = LESSON_UNITS.findIndex((u) => u.id === unitId);
    const lessonIndex = lesson.exercises ? 0 : 0; // index within unit; default to 0 if not available
    Analytics.lessonStart({
      lesson_id: lessonId,
      framework: "enneagram",
      type_focus: typeFocus,
      lesson_index: unitIndex >= 0 ? unitIndex : 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId, lessonId, progressLoaded, profileLoaded]); // profile intentionally omitted — lesson is personalized once at load

  // ── Handlers ───────────────────────────────────────────────────────────────

  // Redirect after showing completion screen
  useEffect(() => {
    if (completionShown) {
      const t = setTimeout(() => router.push("/daily"), 2500);
      return () => clearTimeout(t);
    }
  }, [completionShown, router]);

  const handleComplete = (score: number, xpEarned: number, perfect: boolean) => {
    completeLesson(lessonId, score, xpEarned, perfect);
    earnXP(xpEarned, "lesson");

    // Fire lesson_complete analytics
    const timeSpent = Math.round((Date.now() - lessonStartedAt.current) / 1000);
    Analytics.lessonComplete({
      lesson_id: lessonId,
      framework: "enneagram",
      time_spent_seconds: timeSpent,
      score: Math.round(score * 100) / 100,
    });

    // Increment type mastery when completing a type-specific lesson unit
    const typeMatch = unitId.match(/^type-(\d)$/);
    if (typeMatch) {
      const typeNum = typeMatch[1];
      const masteryGain = perfect ? 15 : 10;
      game.updateTypeMastery(typeNum, masteryGain);
    }

    setCompletionShown(true);
  };

  const handleExit = () => {
    router.push("/daily");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (completionShown) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50" style={{ background: "#0f0a1e" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <div className="text-6xl mb-6 text-center">✦</div>
          <h2 className="text-2xl font-serif font-bold text-center mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>Lesson Complete</h2>
          <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Continuing to your practice...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-slate-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => router.push("/lessons")}
          className="px-6 py-3 rounded-2xl font-bold text-white"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  if (!preparedLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-800 border-t-violet-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Check if this is a philosophy/exploration lesson (show grounding button)
  const currentUnit = LESSON_UNITS.find(u => u.id === unitId);
  const isPhilosophy = currentUnit?.category === "philosophy" || currentUnit?.category === "exploration";

  return (
    <>
      <LessonEngine
        lesson={preparedLesson}
        onComplete={handleComplete}
        onExit={handleExit}
      />
      {/* Grounding exercise button for philosophy/exploration lessons (dark night guardrail) */}
      {isPhilosophy && !showGrounding && (
        <button
          onClick={() => setShowGrounding(true)}
          className="fixed bottom-4 right-4 z-40 px-3 py-2 rounded-full text-[10px] font-semibold flex items-center gap-1.5"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }}
        >
          Ground yourself
        </button>
      )}
      {showGrounding && <GroundingExercise onClose={() => setShowGrounding(false)} />}
    </>
  );
}
