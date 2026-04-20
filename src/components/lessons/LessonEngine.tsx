"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import type { Lesson, Exercise, ExerciseContent } from "@/types/lessons";
import ConceptIntroCard from "./exercises/ConceptIntroCard";
import MultipleChoiceExercise from "./exercises/MultipleChoiceExercise";
import MatchingPairsExercise from "./exercises/MatchingPairsExercise";
import FillInBlankExercise from "./exercises/FillInBlankExercise";
import ScenarioExercise from "./exercises/ScenarioExercise";
import SortingExercise from "./exercises/SortingExercise";
import DiscriminationExercise, { type DiscriminationContent } from "./exercises/DiscriminationExercise";
import FreeRecallExercise from "./exercises/FreeRecallExercise";
import SocraticPrompt from "./exercises/SocraticPrompt";
import InterleavingExercise from "./exercises/InterleavingExercise";
import StorySceneExercise from "./exercises/StorySceneExercise";
import LessonComplete from "./LessonComplete";

interface LessonEngineProps {
  lesson: Lesson;
  onComplete: (score: number, xpEarned: number, perfect: boolean) => void;
  onExit: () => void;
}

const MAX_HEARTS = 5;
const MAX_RECYCLES = 2;
const PERFECT_BONUS_MULTIPLIER = 1.5;

export default function LessonEngine({ lesson, onComplete, onExit }: LessonEngineProps) {
  // Build the exercise queue: original exercises in order
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward (for animation)

  // Recycle queue for wrong answers
  const recycleQueueRef = useRef<{ exerciseIndex: number; recycleCount: number }[]>([]);

  // Full exercise sequence: original exercises + recycled ones (appended dynamically)
  const [exerciseSequence, setExerciseSequence] = useState<number[]>(() =>
    lesson.exercises.map((_, i) => i)
  );

  // Track recycle counts per exercise
  const recycleCounts = useRef<Map<number, number>>(new Map());

  const totalExercises = exerciseSequence.length;
  const currentExerciseIndex = exerciseSequence[currentIndex];
  const currentExercise = lesson.exercises[currentExerciseIndex];

  // Progress: based on how far through the current sequence we are
  const progress = Math.round((currentIndex / Math.max(totalExercises, 1)) * 100);

  const advanceToNext = useCallback(() => {
    setDirection(1);

    const nextIndex = currentIndex + 1;

    if (nextIndex >= exerciseSequence.length) {
      // Check if there are recycled exercises to append
      if (recycleQueueRef.current.length > 0) {
        const toRecycle = recycleQueueRef.current;
        recycleQueueRef.current = [];
        const newIndices = toRecycle.map((r) => r.exerciseIndex);
        setExerciseSequence((prev) => [...prev, ...newIndices]);
        setCurrentIndex(nextIndex);
      } else {
        // Lesson complete
        setCompleted(true);
      }
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, exerciseSequence]);

  const handleCorrectAnswer = useCallback(() => {
    setCorrectCount((c) => c + 1);
    setTotalAttempts((t) => t + 1);
    advanceToNext();
  }, [advanceToNext]);

  const handleWrongAnswer = useCallback(() => {
    setTotalAttempts((t) => t + 1);
    setHearts((h) => Math.max(0, h - 1));

    // Add to recycle queue if not recycled too many times
    const exIdx = currentExerciseIndex;
    const currentRecycleCount = recycleCounts.current.get(exIdx) || 0;
    if (currentRecycleCount < MAX_RECYCLES) {
      recycleCounts.current.set(exIdx, currentRecycleCount + 1);
      recycleQueueRef.current.push({
        exerciseIndex: exIdx,
        recycleCount: currentRecycleCount + 1,
      });
    }

    advanceToNext();
  }, [advanceToNext, currentExerciseIndex]);

  const handleExerciseAnswer = useCallback(
    (correct: boolean) => {
      if (correct) {
        handleCorrectAnswer();
      } else {
        handleWrongAnswer();
      }
    },
    [handleCorrectAnswer, handleWrongAnswer]
  );

  const handleExerciseComplete = useCallback(
    (mistakes: number) => {
      setTotalAttempts((t) => t + 1);
      if (mistakes === 0) {
        setCorrectCount((c) => c + 1);
      } else {
        setHearts((h) => Math.max(0, h - 1));
        // Recycle if there were mistakes
        const exIdx = currentExerciseIndex;
        const currentRecycleCount = recycleCounts.current.get(exIdx) || 0;
        if (currentRecycleCount < MAX_RECYCLES) {
          recycleCounts.current.set(exIdx, currentRecycleCount + 1);
          recycleQueueRef.current.push({
            exerciseIndex: exIdx,
            recycleCount: currentRecycleCount + 1,
          });
        }
      }
      advanceToNext();
    },
    [advanceToNext, currentExerciseIndex]
  );

  // Calculate final results
  if (completed) {
    const scorePct = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
    const isPerfect = correctCount === totalAttempts && totalAttempts > 0;
    const baseXP = lesson.xpReward;
    const earnedXP = Math.round(
      baseXP * (scorePct / 100) * (isPerfect ? PERFECT_BONUS_MULTIPLIER : 1)
    );

    return (
      <LessonComplete
        score={scorePct}
        xpEarned={earnedXP}
        perfectRun={isPerfect}
        lessonTitle={lesson.title}
        onContinue={() => onComplete(scorePct, earnedXP, isPerfect)}
      />
    );
  }

  if (!currentExercise) return null;

  // Render the appropriate exercise component
  const renderExercise = (exercise: Exercise) => {
    const content: ExerciseContent = exercise.content;
    switch (content.type) {
      case "concept-intro":
        return (
          <ConceptIntroCard
            content={content}
            onContinue={() => {
              setCorrectCount((c) => c + 1);
              setTotalAttempts((t) => t + 1);
              advanceToNext();
            }}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceExercise
            content={content}
            onAnswer={handleExerciseAnswer}
            exerciseId={exercise.id}
          />
        );
      case "matching-pairs":
        return (
          <MatchingPairsExercise
            content={content}
            onComplete={handleExerciseComplete}
          />
        );
      case "fill-in-blank":
        return (
          <FillInBlankExercise
            content={content}
            onAnswer={handleExerciseAnswer}
            exerciseId={exercise.id}
          />
        );
      case "scenario":
        return (
          <ScenarioExercise
            content={content}
            onAnswer={handleExerciseAnswer}
            exerciseId={exercise.id}
          />
        );
      case "sorting":
        return (
          <SortingExercise
            content={content}
            onComplete={handleExerciseComplete}
          />
        );
      case "discrimination":
        return (
          <DiscriminationExercise
            content={content as DiscriminationContent}
            onComplete={handleExerciseComplete}
          />
        );
      case "free-recall":
        return (
          <FreeRecallExercise
            content={content}
            onContinue={() => {
              setCorrectCount((c) => c + 1);
              setTotalAttempts((t) => t + 1);
              advanceToNext();
            }}
          />
        );
      case "socratic-prompt":
        return (
          <SocraticPrompt
            content={content}
            onContinue={() => {
              setCorrectCount((c) => c + 1);
              setTotalAttempts((t) => t + 1);
              advanceToNext();
            }}
          />
        );
      case "interleaving":
        return (
          <InterleavingExercise
            content={content}
            onComplete={handleExerciseComplete}
          />
        );
      case "story-scene":
        return (
          <StorySceneExercise
            content={content}
            onAnswer={handleExerciseAnswer}
            exerciseId={exercise.id}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ maxWidth: 640, margin: "0 auto", background: "#0f0a1e" }}>
      {/* Top bar: X | progress bar | hearts */}
      <div className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3">
        {/* Exit button */}
        <button
          onClick={onExit}
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition shrink-0"
        >
          <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <motion.div
              key={i}
              animate={
                i === hearts && hearts < MAX_HEARTS
                  ? { scale: [1, 1.3, 1] }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  i < hearts
                    ? "text-rose-500 fill-rose-500"
                    : "text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exercise content with animated transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentIndex}-${currentExerciseIndex}`}
          initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 flex flex-col overflow-hidden"
        >
          {renderExercise(currentExercise)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
