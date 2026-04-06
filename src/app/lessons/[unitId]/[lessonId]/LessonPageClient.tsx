"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

    router.push("/daily");
  };

  const handleExit = () => {
    router.push("/daily");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

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
        <div className="w-8 h-8 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
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
