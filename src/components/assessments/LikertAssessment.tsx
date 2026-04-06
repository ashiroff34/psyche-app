"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

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

  // ~8 seconds per question on average
  const minsRemaining = useMemo(() => {
    const secsLeft = (items.length - currentIdx) * 8;
    return Math.max(1, Math.round(secsLeft / 60));
  }, [currentIdx, items.length]);

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
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span>{title}</span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-sky-400 font-medium">
              <Clock className="w-3 h-3" />
              ~{minsRemaining} min left
            </span>
            <span>{currentIdx + 1} of {items.length}</span>
          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
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
          <div className="p-6 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="leading-relaxed text-center text-lg font-serif" style={{ color: "rgba(255,255,255,0.9)" }}>
              &ldquo;{item.text}&rdquo;
            </p>
          </div>

          <p className="text-sm text-center mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>How much does this describe you?</p>

          <div className="flex justify-center gap-2 sm:gap-3">
            {scaleLabels.map((label, idx) => {
              const val = idx + 1;
              return (
                <button
                  key={val}
                  onClick={() => rate(val)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all active:scale-95 min-w-[60px] sm:min-w-[75px] hover:border-sky-400/50"
                  style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>{val}</div>
                  <div className="text-[9px] sm:text-[10px] leading-tight text-center" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
