"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X as XIcon, ArrowRight } from "lucide-react";
import type { SortingContent } from "@/types/lessons";

interface Props {
  content: SortingContent;
  onComplete: (mistakes: number) => void;
}

export default function SortingExercise({ content, onComplete }: Props) {
  const { instruction, categories, items } = content;

  // Track which category each item has been placed into (-1 = unplaced)
  const [placements, setPlacements] = useState<number[]>(() => items.map(() => -1));
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [flashWrong, setFlashWrong] = useState<number | null>(null);

  const unplacedItems = items
    .map((item, idx) => ({ ...item, idx }))
    .filter((_, idx) => placements[idx] === -1);

  const allPlaced = placements.every((p) => p !== -1);

  const handleItemTap = useCallback(
    (itemIdx: number) => {
      if (revealed || placements[itemIdx] !== -1) return;
      setSelectedItem((prev) => (prev === itemIdx ? null : itemIdx));
    },
    [revealed, placements]
  );

  const handleCategoryTap = useCallback(
    (catIdx: number) => {
      if (selectedItem === null || revealed) return;

      const newPlacements = [...placements];
      newPlacements[selectedItem] = catIdx;
      setPlacements(newPlacements);
      setSelectedItem(null);
    },
    [selectedItem, placements, revealed]
  );

  const handleCheckAnswers = () => {
    let wrongCount = 0;
    items.forEach((item, idx) => {
      if (placements[idx] !== item.categoryIndex) {
        wrongCount++;
      }
    });
    setMistakes(wrongCount);
    setRevealed(true);
  };

  const getItemsInCategory = (catIdx: number) => {
    return items
      .map((item, idx) => ({ ...item, idx }))
      .filter((_, idx) => placements[idx] === catIdx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">
        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-bold text-slate-900 dark:text-white mb-5 text-center"
        >
          {instruction}
        </motion.p>

        {/* Category buckets */}
        <div className={`grid gap-3 mb-6 ${categories.length === 2 ? "grid-cols-2" : categories.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {categories.map((cat, catIdx) => {
            const placedItems = getItemsInCategory(catIdx);
            const isTargetable = selectedItem !== null && !revealed;

            return (
              <motion.button
                key={catIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.08 }}
                whileTap={isTargetable ? { scale: 0.97 } : {}}
                onClick={() => handleCategoryTap(catIdx)}
                disabled={!isTargetable}
                className={`rounded-xl border-2 p-3 min-h-[120px] transition-all flex flex-col ${
                  isTargetable
                    ? "border-violet-300 dark:border-violet-600 bg-violet-50/50 dark:bg-violet-900/20"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                }`}
              >
                {/* Category label */}
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 text-center">
                  {cat}
                </span>

                {/* Placed items */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {placedItems.map((item) => {
                    const isWrong = revealed && item.categoryIndex !== catIdx;
                    const isRight = revealed && item.categoryIndex === catIdx;

                    return (
                      <motion.div
                        key={item.idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                          isRight
                            ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300"
                            : isWrong
                            ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-300"
                            : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        {item.text}
                        {isRight && <Check className="w-3 h-3 text-emerald-500" />}
                        {isWrong && <XIcon className="w-3 h-3 text-rose-400" />}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Unplaced items */}
        {unplacedItems.length > 0 && (
          <>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 text-center">
              Tap an item, then tap a category
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {unplacedItems.map((item) => {
                const isSelected = selectedItem === item.idx;
                const isFlashing = flashWrong === item.idx;

                return (
                  <motion.button
                    key={item.idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: isFlashing ? [1, 1.05, 1] : 1,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleItemTap(item.idx)}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all min-h-[48px] ${
                      isFlashing
                        ? "border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-700"
                        : isSelected
                        ? "border-violet-400 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 shadow-md"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.text}
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Bottom action */}
      <AnimatePresence>
        {allPlaced && !revealed && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="px-5 pt-5 pb-safe pb-8 border-t-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckAnswers}
              className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
              }}
            >
              Check Answers
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className={`px-5 pt-5 pb-safe pb-8 border-t-2 ${
              mistakes === 0
                ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700"
                : "bg-amber-50 dark:bg-amber-900/40 border-amber-200 dark:border-amber-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              {mistakes === 0 ? (
                <Check className="w-5 h-5 text-emerald-600" />
              ) : (
                <XIcon className="w-5 h-5 text-amber-600" />
              )}
              <span
                className={`font-bold text-base ${
                  mistakes === 0 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"
                }`}
              >
                {mistakes === 0
                  ? "Perfect sorting!"
                  : `${items.length - mistakes}/${items.length} correct.`}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onComplete(mistakes)}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 ${
                mistakes === 0
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-amber-500 hover:bg-amber-600"
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
