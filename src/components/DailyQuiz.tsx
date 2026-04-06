"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Trophy, Zap } from "lucide-react";
import type { TypeQuizQuestion } from "@/data/type-quizzes";
import { REWARDS } from "@/data/rewards";
import { stableShuffleOptions } from "@/lib/shuffleOptions";

export interface QuizAnswer {
  questionId: number;
  selected: string;
  correct: boolean;
}

interface DailyQuizProps {
  questions: TypeQuizQuestion[];
  trackName: string;
  onComplete: (
    score: number,
    total: number,
    tokensEarned: number,
    answers: QuizAnswer[]
  ) => void;
}

export default function DailyQuiz({ questions, trackName, onComplete }: DailyQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const total = questions.length;
  const q = questions[currentIdx];

  // Stable shuffle of options per question. We identify the correct option by its
  // original letter from the data, then derive the new visual letter after shuffling.
  const { shuffledOptionObjects, shuffledAnswerLetter } = useMemo(() => {
    if (!q) return { shuffledOptionObjects: [] as { letter: string; text: string }[], shuffledAnswerLetter: "" };
    const correctIdx = q.options.findIndex(o => o.letter === q.answer);
    const { shuffled } = stableShuffleOptions(q.options, correctIdx, String(q.id));
    const LETTERS = ["A", "B", "C", "D"];
    const newAnswerIdx = shuffled.findIndex(o => o.letter === q.answer);
    return {
      shuffledOptionObjects: shuffled,
      shuffledAnswerLetter: LETTERS[newAnswerIdx] ?? q.answer,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);

  const handleSelect = useCallback(
    (visualLetter: string) => {
      if (revealed) return;
      setSelected(visualLetter);
      setRevealed(true);

      const isCorrect = visualLetter === shuffledAnswerLetter;
      setAnswers((prev) => [
        ...prev,
        { questionId: q.id, selected: visualLetter, correct: isCorrect },
      ]);

      if (isCorrect) {
        setScore((s) => s + 1);
        setTokensEarned((t) => t + REWARDS.CORRECT_ANSWER);
      }
    },
    [revealed, q, shuffledAnswerLetter]
  );

  const handleNext = useCallback(() => {
    if (currentIdx < total - 1) {
      setDirection(1);
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      // Quiz complete, calculate final score including current question
      const finalAnswers = answers;
      const finalScore = finalAnswers.filter((a) => a.correct).length;
      const baseTokens = finalScore * REWARDS.CORRECT_ANSWER;
      const isPerfect = finalScore === total;
      const bonus = isPerfect ? REWARDS.PERFECT_DAILY_QUIZ : 0;
      onComplete(finalScore, total, baseTokens + bonus, finalAnswers);
    }
  }, [currentIdx, total, answers, onComplete]);

  if (!q) return null;

  const VISUAL_LETTERS = ["A", "B", "C", "D"];
  const isCorrect = selected === shuffledAnswerLetter;
  const progressPercent = ((currentIdx + 1) / total) * 100;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{trackName}</span>
        <span className="text-xs text-slate-400">
          {q.category} &middot; Difficulty {q.difficulty}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question counter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentIdx ? "bg-sky-400" : i === currentIdx ? "bg-indigo-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400">{currentIdx + 1} / {total}</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIdx}
          custom={direction}
          initial={{ x: direction * 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -40, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 leading-relaxed">
            {q.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {shuffledOptionObjects.map((opt, idx) => {
              const visualLetter = VISUAL_LETTERS[idx];
              const isThis = selected === visualLetter;
              const isAnswer = visualLetter === shuffledAnswerLetter;
              let borderClass = "border-slate-200 hover:border-sky-300 hover:bg-sky-50/50";
              let bgClass = "bg-white";

              if (revealed) {
                if (isAnswer) {
                  borderClass = "border-emerald-300";
                  bgClass = "bg-emerald-50";
                } else if (isThis && !isCorrect) {
                  borderClass = "border-rose-300";
                  bgClass = "bg-rose-50";
                } else {
                  borderClass = "border-slate-100";
                  bgClass = "bg-white opacity-50";
                }
              } else if (isThis) {
                borderClass = "border-sky-400";
                bgClass = "bg-sky-50";
              }

              return (
                <button
                  key={opt.letter}
                  onClick={() => handleSelect(visualLetter)}
                  disabled={revealed}
                  className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${borderClass} ${bgClass}`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    revealed && isAnswer
                      ? "bg-emerald-500 text-white"
                      : revealed && isThis && !isCorrect
                      ? "bg-rose-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {revealed && isAnswer ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : revealed && isThis && !isCorrect ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      visualLetter
                    )}
                  </span>
                  <span className="text-sm text-slate-700 leading-relaxed pt-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback after answering */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              {/* Correct/Incorrect indicator */}
              <div className={`flex items-center gap-2 mb-3 px-4 py-2 rounded-xl ${
                isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-700">Correct!</span>
                    <span className="ml-auto flex items-center gap-1 text-sm font-bold text-emerald-600">
                      <Zap className="w-3.5 h-3.5" /> +{REWARDS.CORRECT_ANSWER}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-500" />
                    <span className="text-sm font-semibold text-rose-700">Not quite</span>
                    <span className="ml-auto text-xs text-rose-400">Answer: {shuffledAnswerLetter}</span>
                  </>
                )}
              </div>

              {/* Explanation */}
              <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">{q.explanation}</p>
              </div>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow-lg shadow-sky-200/50 hover:shadow-xl transition-all active:scale-[0.97]"
              >
                {currentIdx < total - 1 ? (
                  <>Next Question <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>See Results <Trophy className="w-4 h-4" /></>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
