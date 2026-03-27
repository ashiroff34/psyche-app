"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import type { MatchingPairsContent } from "@/types/lessons";

interface Props {
  content: MatchingPairsContent;
  onComplete: (mistakes: number) => void;
}

export default function MatchingPairsExercise({ content, onComplete }: Props) {
  const { instruction, pairs } = content;

  // Shuffle right-side items once on mount
  const shuffledRight = useMemo(() => {
    const items = pairs.map((p, i) => ({ label: p.right, originalIndex: i }));
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [flashWrong, setFlashWrong] = useState<{ left: number; right: number } | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleLeftTap = useCallback(
    (idx: number) => {
      if (matched.has(idx) || completed) return;
      setSelectedLeft((prev) => (prev === idx ? null : idx));
    },
    [matched, completed]
  );

  const handleRightTap = useCallback(
    (shuffledIdx: number) => {
      if (selectedLeft === null || completed) return;
      const rightItem = shuffledRight[shuffledIdx];
      if (matched.has(rightItem.originalIndex)) return;

      // Check if it's a match
      if (rightItem.originalIndex === selectedLeft) {
        // Correct match
        const newMatched = new Set(matched);
        newMatched.add(selectedLeft);
        setMatched(newMatched);
        setSelectedLeft(null);

        // Check if all matched
        if (newMatched.size === pairs.length) {
          setCompleted(true);
        }
      } else {
        // Wrong match - flash red
        setMistakes((m) => m + 1);
        setFlashWrong({ left: selectedLeft, right: shuffledIdx });
        setTimeout(() => {
          setFlashWrong(null);
          setSelectedLeft(null);
        }, 600);
      }
    },
    [selectedLeft, matched, shuffledRight, pairs.length, completed]
  );

  const allDone = completed || matched.size === pairs.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      {/* Instructions */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center"
        >
          {instruction}
        </motion.p>

        {/* Two columns: Left and Right */}
        <div className="flex gap-3">
          {/* Left column */}
          <div className="flex-1 space-y-3">
            {pairs.map((pair, i) => {
              const isMatched = matched.has(i);
              const isSelected = selectedLeft === i;
              const isFlashing = flashWrong?.left === i;

              return (
                <motion.button
                  key={`left-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isMatched ? 0.5 : 1,
                    x: 0,
                    scale: isFlashing ? [1, 1.03, 1] : 1,
                  }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={!isMatched ? { scale: 0.96 } : {}}
                  onClick={() => handleLeftTap(i)}
                  disabled={isMatched}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all min-h-[48px] flex items-center gap-2 ${
                    isMatched
                      ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                      : isFlashing
                      ? "border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-700"
                      : isSelected
                      ? "border-violet-400 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {isMatched && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  <span className="leading-snug">{pair.left}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-3">
            {shuffledRight.map((item, shuffledIdx) => {
              const isMatched = matched.has(item.originalIndex);
              const isFlashing = flashWrong?.right === shuffledIdx;

              return (
                <motion.button
                  key={`right-${shuffledIdx}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: isMatched ? 0.5 : 1,
                    x: 0,
                    scale: isFlashing ? [1, 1.03, 1] : 1,
                  }}
                  transition={{ delay: shuffledIdx * 0.05 }}
                  whileTap={selectedLeft !== null && !isMatched ? { scale: 0.96 } : {}}
                  onClick={() => handleRightTap(shuffledIdx)}
                  disabled={isMatched || selectedLeft === null}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all min-h-[48px] flex items-center gap-2 ${
                    isMatched
                      ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                      : isFlashing
                      ? "border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-700"
                      : selectedLeft !== null && !isMatched
                      ? "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:border-violet-300"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {isMatched && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  <span className="leading-snug">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Match counter */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {pairs.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                matched.has(i) ? "bg-emerald-400 scale-110" : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom button when done */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="px-5 pt-5 pb-safe pb-8 border-t-2 bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700"
          >
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-base text-emerald-700 dark:text-emerald-300">
                {mistakes === 0 ? "Perfect matching!" : `All matched! ${mistakes} mistake${mistakes > 1 ? "s" : ""}.`}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onComplete(mistakes)}
              className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
