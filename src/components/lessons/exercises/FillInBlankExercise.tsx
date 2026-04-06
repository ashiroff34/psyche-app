"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import type { FillInBlankContent } from "@/types/lessons";
import { stableShuffleOptions } from "@/lib/shuffleOptions";

interface Props {
  content: FillInBlankContent;
  onAnswer: (correct: boolean) => void;
  exerciseId?: string;
}

export default function FillInBlankExercise({ content, onAnswer, exerciseId }: Props) {
  const { sentence, options, correctIndex, explanation } = content;

  // Stable shuffle so chips don't jump on re-renders, but correct answer position is randomized
  const { shuffled: shuffledOptions, newCorrectIndex } = useMemo(
    () => stableShuffleOptions(options, correctIndex, exerciseId ?? sentence),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exerciseId, sentence]
  );

  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;
  const isCorrect = selected === newCorrectIndex;

  const handleChipTap = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
  };

  // Split sentence at the blank marker "___"
  const parts = sentence.split("___");

  const renderSentence = () => {
    return (
      <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed text-center">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span
                className={`inline-block min-w-[80px] mx-1 px-3 py-1 rounded-lg border-2 border-dashed text-center font-bold transition-all ${
                  selected !== null
                    ? isCorrect
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                    : "border-violet-300 dark:border-violet-600 bg-violet-50 dark:bg-violet-900/20 text-violet-400 dark:text-violet-500"
                }`}
              >
                {selected !== null ? shuffledOptions[selected] : "\u00A0\u00A0\u00A0"}
              </span>
            )}
          </span>
        ))}
      </p>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-2">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-6"
        >
          Fill in the blank
        </motion.p>

        {/* Sentence with blank */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl px-5 py-6 border border-slate-100 dark:border-slate-700 shadow-sm mb-8"
        >
          {renderSentence()}
        </motion.div>

        {/* Word chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {shuffledOptions.map((opt, i) => {
            const isThisSelected = i === selected;
            const isThisCorrect = i === newCorrectIndex;

            let chipStyle =
              "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200";

            if (revealed) {
              if (isThisCorrect) {
                chipStyle = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300";
              } else if (isThisSelected && !isThisCorrect) {
                chipStyle = "border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300";
              } else {
                chipStyle = "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-600";
              }
            } else if (isThisSelected) {
              chipStyle = "border-violet-400 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300";
            }

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileTap={!revealed ? { scale: 0.95 } : {}}
                onClick={() => handleChipTap(i)}
                disabled={revealed}
                className={`px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all min-h-[48px] ${chipStyle}`}
              >
                <span className="flex items-center gap-1.5">
                  {opt}
                  {revealed && isThisCorrect && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  {revealed && isThisSelected && !isThisCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                </span>
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
