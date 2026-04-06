"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getLesson, personalizeExercises } from "@/data/lessons";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useProfile } from "@/hooks/useProfile";
import { useGameState } from "@/hooks/useGameState";
import LessonEngine from "@/components/lessons/LessonEngine";
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

  // Load and personalize lesson
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
  }, [unitId, lessonId, progressLoaded, profileLoaded, profile, startLesson]);

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

  return (
    <LessonEngine
      lesson={preparedLesson}
      onComplete={handleComplete}
      onExit={handleExit}
    />
  );
}
