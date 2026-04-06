"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import type { DiscriminationItem } from "@/data/discriminationExercises";

// ── Local type definition (mirrors DiscriminationContent in types/lessons.ts) ─

export interface DiscriminationContent {
  type: "discrimination";
  typeA: number;
  typeB: number;
  prompt: string;
  items: DiscriminationItem[];
}

interface ItemState {
  selected: "A" | "B" | null;
  revealed: boolean;
}

interface Props {
  content: DiscriminationContent;
  onComplete: (mistakes: number) => void;
}

export default function DiscriminationExercise({ content, onComplete }: Props) {
  const { typeA, typeB, prompt, items } = content;

  const [itemStates, setItemStates] = useState<ItemState[]>(
    items.map(() => ({ selected: null, revealed: false }))
  );
  const [finished, setFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const typeAData = enneagramTypes.find((t) => t.number === typeA);
  const typeBData = enneagramTypes.find((t) => t.number === typeB);

  const allAnswered = itemStates.every((s) => s.revealed);

  const handleSelect = (itemIdx: number, choice: "A" | "B") => {
    if (itemStates[itemIdx].revealed) return;

    setItemStates((prev) =>
      prev.map((s, i) =>
        i === itemIdx ? { selected: choice, revealed: true } : s
      )
    );
  };

  const handleFinish = () => {
    const mistakes = itemStates.filter(
      (s, i) => s.selected !== items[i].answer
    ).length;
    setFinished(true);
    setShowResults(true);
    setTimeout(() => onComplete(mistakes), 400);
  };

  const score = finished
    ? itemStates.filter((s, i) => s.selected === items[i].answer).length
    : 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-6 gap-5" style={{ color: "rgba(255,255,255,0.9)" }}>
      {/* Header: two type badges */}
      <div className="flex items-center gap-3 justify-center flex-wrap">
        {[{ data: typeAData, label: "A" }, { data: typeBData, label: "B" }].map(({ data, label }) =>
          data ? (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: `${data.color}20`, border: `1px solid ${data.color}50` }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-serif font-bold"
                style={{ backgroundColor: data.color }}
              >
                {data.number}
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: data.color }}>Type {data.number}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{data.name}</div>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Prompt */}
      <p className="text-sm text-center leading-relaxed px-2" style={{ color: "rgba(255,255,255,0.6)" }}>
        {prompt}
      </p>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item, idx) => {
          const state = itemStates[idx];
          const isCorrect = state.revealed && state.selected === item.answer;
          const isWrong = state.revealed && state.selected !== item.answer;
          const correctTypeData =
            item.answer === "A" ? typeAData : typeBData;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
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
                  {item.text}
                </p>
              </div>

              {/* Answer buttons */}
              {!state.revealed && (
                <div className="flex gap-2 px-4 pb-4">
                  {([{ letter: "A" as const, data: typeAData }, { letter: "B" as const, data: typeBData }]).map(
                    ({ letter, data }) =>
                      data ? (
                        <button
                          key={letter}
                          onClick={() => handleSelect(idx, letter)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            backgroundColor: `${data.color}15`,
                            border: `1px solid ${data.color}40`,
                            color: data.color,
                          }}
                        >
                          <span
                            className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: data.color }}
                          >
                            {data.number}
                          </span>
                          Type {data.number}
                        </button>
                      ) : null
                  )}
                </div>
              )}

              {/* Result feedback */}
              <AnimatePresence>
                {state.revealed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      {/* Correct / wrong badge */}
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
                              This belongs to Type {correctTypeData?.number} ({correctTypeData?.name})
                            </span>
                          </>
                        )}
                      </div>
                      {/* Explanation */}
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
          className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
        >
          Continue ({score}/{items.length} correct)
        </motion.button>
      )}
    </div>
  );
}
