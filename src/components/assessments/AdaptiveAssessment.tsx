"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AdaptiveRound {
  id: string;
  title: string;
  description: string;
  questions: {
    text: string;
    options: {
      text: string;
      scores: Record<string, number>;
    }[];
  }[];
}

export default function AdaptiveAssessment({
  rounds,
  onComplete,
}: {
  rounds: AdaptiveRound[];
  onComplete: (result: { topResult: string; allScores: { key: string; score: number; percentage: number }[] }) => void;
}) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const round = rounds[roundIdx];
  const question = round.questions[questionIdx];

  const totalQuestions = rounds.reduce((sum, r) => sum + r.questions.length, 0);
  const completedQuestions = rounds.slice(0, roundIdx).reduce((sum, r) => sum + r.questions.length, 0) + questionIdx;
  const progress = ((completedQuestions + 1) / totalQuestions) * 100;

  const selectOption = (option: { text: string; scores: Record<string, number> }) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);

    if (questionIdx < round.questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
    } else if (roundIdx < rounds.length - 1) {
      setRoundIdx(roundIdx + 1);
      setQuestionIdx(0);
    } else {
      // Done
      const sorted = Object.entries(newScores).sort(([, a], [, b]) => b - a);
      const maxScore = sorted[0]?.[1] || 1;
      onComplete({
        topResult: sorted[0][0],
        allScores: sorted.map(([key, score]) => ({
          key,
          score,
          percentage: Math.round((score / maxScore) * 100),
        })),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>{round.title}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-300 mt-1">{round.description}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${roundIdx}-${questionIdx}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-serif font-semibold text-slate-800 mb-6">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectOption(option)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-teal-300 hover:bg-teal-50/30 transition-all active:scale-[0.98]"
              >
                <p className="text-sm text-slate-700 leading-relaxed">{option.text}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
