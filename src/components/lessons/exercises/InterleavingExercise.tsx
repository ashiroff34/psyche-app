"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import type { InterleavingExerciseContent } from "@/types/lessons";

interface Props {
  content: InterleavingExerciseContent;
  onComplete: (mistakes: number) => void;
}

interface ItemState {
  selectedType: number | null;
  revealed: boolean;
}

export default function InterleavingExercise({ content, onComplete }: Props) {
  const { title, typeNumbers, items } = content;

  const [itemStates, setItemStates] = useState<ItemState[]>(
    items.map(() => ({ selectedType: null, revealed: false }))
  );
  const [finished, setFinished] = useState(false);

  const allAnswered = itemStates.every((s) => s.revealed);

  const handleSelect = (itemIdx: number, typeNum: number) => {
    if (itemStates[itemIdx].revealed) return;
    setItemStates((prev) =>
      prev.map((s, i) =>
        i === itemIdx ? { selectedType: typeNum, revealed: true } : s
      )
    );
  };

  const handleFinish = () => {
    const mistakes = itemStates.filter(
      (s, i) => s.selectedType !== items[i].correctType
    ).length;
    setFinished(true);
    setTimeout(() => onComplete(mistakes), 400);
  };

  const correctCount = finished
    ? itemStates.filter((s, i) => s.selectedType === items[i].correctType).length
    : 0;

  const typeDataMap = Object.fromEntries(
    typeNumbers.map((n) => [n, enneagramTypes.find((t) => t.number === n)])
  );

  return (
    <div
      className="flex flex-col h-full overflow-y-auto px-4 py-5 gap-4"
      style={{ color: "rgba(255,255,255,0.9)" }}
    >
      {/* Title */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgba(34,197,94,0.9)" }}>
          Interleaving Practice
        </p>
        <h3 className="text-base font-bold leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
          {title}
        </h3>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Identify which type each statement belongs to
        </p>
      </div>

      {/* Type legend */}
      <div className="flex flex-wrap gap-2">
        {typeNumbers.map((n) => {
          const data = typeDataMap[n];
          if (!data) return null;
          return (
            <div
              key={n}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: `${data.color}18`,
                border: `1px solid ${data.color}40`,
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
                style={{ background: data.color }}
              >
                {n}
              </div>
              <span className="text-xs font-medium" style={{ color: data.color }}>
                Type {n} — {data.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const state = itemStates[idx];
          const isCorrect = state.revealed && state.selectedType === item.correctType;
          const isWrong = state.revealed && state.selectedType !== item.correctType;
          const correctTypeData = typeDataMap[item.correctType];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: state.revealed
                  ? isCorrect
                    ? "1px solid rgba(16,185,129,0.5)"
                    : "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: state.revealed
                  ? isCorrect
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(239,68,68,0.08)"
                  : "rgba(255,255,255,0.04)",
              }}
            >
              {/* Statement */}
              <div className="px-4 pt-4 pb-3">
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {item.statement}
                </p>
              </div>

              {/* Type buttons */}
              {!state.revealed && (
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                  {typeNumbers.map((n) => {
                    const data = typeDataMap[n];
                    if (!data) return null;
                    return (
                      <button
                        key={n}
                        onClick={() => handleSelect(idx, n)}
                        className="flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: `${data.color}15`,
                          border: `1px solid ${data.color}40`,
                          color: data.color,
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ background: data.color }}
                        >
                          {n}
                        </span>
                        Type {n}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Feedback */}
              <AnimatePresence>
                {state.revealed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-xs font-semibold text-emerald-400">Correct</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-rose-400 shrink-0" />
                            <span className="text-xs font-semibold text-rose-400">
                              This is Type {item.correctType}{correctTypeData ? ` — ${correctTypeData.name}` : ""}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {item.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Continue button */}
      {allAnswered && !finished && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleFinish}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
        >
          <ArrowRight className="w-5 h-5" />
          Continue ({correctCount}/{items.length} correct)
        </motion.button>
      )}
    </div>
  );
}
