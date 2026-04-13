"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { LESSON_UNITS } from "@/data/lessons";
import type { MultipleChoiceContent } from "@/types/lessons";

interface PracticeModeProps {
  weakLessons: string[];
  onComplete: (xpEarned: number) => void;
  onExit: () => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];
const XP_REWARD = 5;
const MAX_QUESTIONS = 6;

interface PracticeQuestion {
  lessonId: string;
  exerciseId: string;
  content: MultipleChoiceContent;
}

// Simple seeded random for stable-but-varied selection
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticeMode({ weakLessons, onComplete, onExit }: PracticeModeProps) {
  // Build question pool from weak lessons, filter to multiple-choice only
  const questions: PracticeQuestion[] = useMemo(() => {
    const pool: PracticeQuestion[] = [];

    for (const unit of LESSON_UNITS) {
      for (const lesson of unit.lessons) {
        if (!weakLessons.includes(lesson.id)) continue;
        for (const exercise of lesson.exercises) {
          if (exercise.content.type === "multiple-choice") {
            pool.push({
              lessonId: lesson.id,
              exerciseId: exercise.id,
              content: exercise.content as MultipleChoiceContent,
            });
          }
        }
      }
    }

    // Stable-random selection using current minute as seed so it varies over time
    const rng = seededRandom(Math.floor(Date.now() / 60000));
    const shuffled = shuffleArray(pool, rng);
    return shuffled.slice(0, MAX_QUESTIONS);
  }, [weakLessons]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const currentQ = questions[currentIndex];
  const revealed = selected !== null;
  const isCorrect = revealed && selected === currentQ?.content.correctIndex;
  const progress = Math.round((currentIndex / Math.max(questions.length, 1)) * 100);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleContinue = () => {
    if (isCorrect) setCorrectCount((c) => c + 1);
    const next = currentIndex + 1;
    if (next >= questions.length) {
      setDone(true);
    } else {
      setCurrentIndex(next);
      setSelected(null);
    }
  };

  // Completion screen
  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: "#0f0a1e" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 px-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Practice Complete!</h2>
            <p className="text-slate-400 text-sm">
              {correctCount} / {questions.length} correct
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-violet-900/40 border border-violet-500/30 rounded-2xl px-6 py-4"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-bold text-white">+{XP_REWARD} XP earned</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onComplete(XP_REWARD)}
            className="w-full max-w-xs py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
          >
            Done
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  const { content } = currentQ;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ maxWidth: 640, margin: "0 auto", background: "#0f0a1e" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3">
        <button
          onClick={onExit}
          className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition shrink-0"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Question counter */}
        <span className="text-xs font-bold text-slate-400 shrink-0">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Practice label */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <Zap className="w-4 h-4 text-violet-400" />
        <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Practice Mode</span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-5 pt-2 pb-2">
            {/* Question */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-2xl px-5 py-4 mb-5"
            >
              <p className="text-base font-bold text-white leading-snug">
                {content.question}
              </p>
            </motion.div>

            {/* Options */}
            <div className="space-y-3">
              {content.options.map((opt, i) => {
                const isThisSelected = i === selected;
                const isThisCorrect = i === content.correctIndex;

                let borderColor = "border-slate-700";
                let bgColor = "bg-slate-800";
                let textColor = "text-slate-200";
                let letterBg = "bg-slate-700 text-slate-400";

                if (revealed) {
                  if (isThisCorrect) {
                    borderColor = "border-emerald-400";
                    bgColor = "bg-emerald-900/30";
                    textColor = "text-emerald-200";
                    letterBg = "bg-emerald-400 text-white";
                  } else if (isThisSelected && !isThisCorrect) {
                    borderColor = "border-rose-400";
                    bgColor = "bg-rose-900/30";
                    textColor = "text-rose-200";
                    letterBg = "bg-rose-400 text-white";
                  }
                }

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all min-h-[56px] ${borderColor} ${bgColor}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all ${letterBg}`}
                    >
                      {OPTION_LETTERS[i]}
                    </span>
                    <span className={`text-sm font-medium leading-snug flex-1 ${textColor}`}>
                      {opt}
                    </span>
                    {revealed && isThisCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                    )}
                    {revealed && isThisSelected && !isThisCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bottom feedback */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                className={`px-5 pt-5 pb-safe pb-8 border-t-2 ${
                  isCorrect
                    ? "bg-emerald-900/40 border-emerald-700"
                    : "bg-rose-900/40 border-rose-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <span
                    className={`font-bold text-base ${
                      isCorrect ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {isCorrect ? "Correct!" : "Not quite."}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {content.explanation}
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContinue}
                  className={`w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 ${
                    isCorrect
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-rose-500 hover:bg-rose-600"
                  } transition-colors`}
                >
                  {currentIndex + 1 >= questions.length ? "Finish" : "Next"}{" "}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
