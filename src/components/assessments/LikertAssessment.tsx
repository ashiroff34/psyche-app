"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LikertItem {
  id: number;
  text: string;
  scores: Record<string, number>;
  reversed?: boolean;
}

interface LikertResults {
  topResult: string;
  allScores: { key: string; score: number; percentage: number }[];
  rawScores: Record<string, number>;
}

export default function LikertAssessment({
  title,
  description,
  items,
  scaleLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  gradientFrom = "from-sky-400",
  gradientTo = "to-indigo-500",
  onComplete,
}: {
  title: string;
  description: string;
  items: LikertItem[];
  scaleLabels?: string[];
  gradientFrom?: string;
  gradientTo?: string;
  onComplete: (results: LikertResults) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const progress = ((currentIdx + 1) / items.length) * 100;
  const item = items[currentIdx];

  const rate = (value: number) => {
    const actualValue = item.reversed ? 6 - value : value;
    const newScores = { ...scores };
    Object.entries(item.scores).forEach(([key, weight]) => {
      newScores[key] = (newScores[key] || 0) + weight * actualValue;
    });
    setScores(newScores);

    if (currentIdx < items.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate results
      const allEntries = Object.entries(newScores).sort(([, a], [, b]) => b - a);
      const maxScore = allEntries[0]?.[1] || 1;
      onComplete({
        topResult: allEntries[0][0],
        allScores: allEntries.map(([key, score]) => ({
          key,
          score,
          percentage: Math.round((score / maxScore) * 100),
        })),
        rawScores: newScores,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>{title}</span>
          <span>{currentIdx + 1} of {items.length}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6 rounded-2xl bg-white border border-slate-100 mb-6">
            <p className="text-slate-700 leading-relaxed text-center text-lg font-serif">
              &ldquo;{item.text}&rdquo;
            </p>
          </div>

          <p className="text-sm text-slate-400 text-center mb-4">How much does this describe you?</p>

          <div className="flex justify-center gap-2 sm:gap-3">
            {scaleLabels.map((label, idx) => {
              const val = idx + 1;
              return (
                <button
                  key={val}
                  onClick={() => rate(val)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-slate-100 hover:border-sky-300 hover:bg-sky-50/30 transition-all active:scale-95 min-w-[60px] sm:min-w-[75px]"
                >
                  <div className="text-lg font-bold text-slate-700">{val}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight text-center">{label}</div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
