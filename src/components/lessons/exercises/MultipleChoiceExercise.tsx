"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import type { MultipleChoiceContent } from "@/types/lessons";
import { stableShuffleOptions } from "@/lib/shuffleOptions";

interface Props {
  content: MultipleChoiceContent;
  onAnswer: (correct: boolean) => void;
  exerciseId?: string;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function MultipleChoiceExercise({ content, onAnswer, exerciseId }: Props) {
  const { question, options, correctIndex, explanation } = content;

  // Stable shuffle so options don't jump on re-renders, but correct answer position is randomized.
  // Include options and correctIndex in deps so stale shuffles are never served if content changes.
  const { shuffled: shuffledOptions, newCorrectIndex } = useMemo(
    () => stableShuffleOptions(options, correctIndex, exerciseId ?? question),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exerciseId, question, options, correctIndex]
  );

  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;
  const isCorrect = selected === newCorrectIndex;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      {/* Question area */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">
        {/* Question text */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 dark:bg-slate-800 rounded-2xl px-5 py-4 mb-6"
        >
          <p className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {question}
          </p>
        </motion.div>

        {/* Options */}
        <div className="space-y-3">
          {shuffledOptions.map((opt, i) => {
            const isThisSelected = i === selected;
            const isThisCorrect = i === newCorrectIndex;

            let borderColor = "border-slate-200 dark:border-slate-700";
            let bgColor = "bg-white dark:bg-slate-800";
            let textColor = "text-slate-800 dark:text-slate-200";
            let letterBg = "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400";

            if (revealed) {
              if (isThisCorrect) {
                borderColor = "border-emerald-400";
                bgColor = "bg-emerald-50 dark:bg-emerald-900/30";
                textColor = "text-emerald-800 dark:text-emerald-200";
                letterBg = "bg-emerald-400 text-white";
              } else if (isThisSelected && !isThisCorrect) {
                borderColor = "border-rose-400";
                bgColor = "bg-rose-50 dark:bg-rose-900/30";
                textColor = "text-rose-800 dark:text-rose-200";
                letterBg = "bg-rose-400 text-white";
              }
            }

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
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

      {/* Bottom feedback sheet */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className={`px-5 pt-5 pb-safe pb-8 border-t-2 ${
              isCorrect
                ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700"
                : "bg-rose-50 dark:bg-rose-900/40 border-rose-200 dark:border-rose-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
              <span
                className={`font-bold text-base ${
                  isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
                }`}
              >
                {isCorrect ? "Correct!" : "Not quite."}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {explanation}
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onAnswer(isCorrect)}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 ${
                isCorrect
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-rose-500 hover:bg-rose-600"
              } transition-colors`}
            >
              Continue <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
