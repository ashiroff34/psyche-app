"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface TypeParagraph {
  typeNumber: number;
  paragraph: string;
}

interface NarrowingQuestion {
  types: number[];
  question: string;
  options: { text: string; scores: Record<number, number> }[];
}

export default function ParagraphAssessment({
  paragraphs,
  narrowingQuestions,
  onComplete,
}: {
  paragraphs: TypeParagraph[];
  narrowingQuestions: NarrowingQuestion[];
  onComplete: (result: { topResult: string; allScores: { key: string; score: number; percentage: number }[] }) => void;
}) {
  const [phase, setPhase] = useState<"read" | "narrow" | "done">("read");
  const [selectedParagraphs, setSelectedParagraphs] = useState<number[]>([]);
  const [narrowIdx, setNarrowIdx] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({});

  const relevantNarrowing = narrowingQuestions.filter((q) =>
    q.types.some((t) => selectedParagraphs.includes(t))
  );

  const toggleParagraph = (num: number) => {
    if (selectedParagraphs.includes(num)) {
      setSelectedParagraphs(selectedParagraphs.filter((n) => n !== num));
    } else if (selectedParagraphs.length < 3) {
      setSelectedParagraphs([...selectedParagraphs, num]);
    }
  };

  const answerNarrowing = (option: { text: string; scores: Record<number, number> }) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[parseInt(key)] = (newScores[parseInt(key)] || 0) + val;
    });
    // Add base score for selected paragraphs
    if (narrowIdx === 0) {
      selectedParagraphs.forEach((num, i) => {
        newScores[num] = (newScores[num] || 0) + (3 - i) * 3;
      });
    }
    setScores(newScores);

    if (narrowIdx < relevantNarrowing.length - 1) {
      setNarrowIdx(narrowIdx + 1);
    } else {
      // Calculate final results
      const allEntries = Object.entries(newScores).sort(([, a], [, b]) => b - a);
      const maxScore = allEntries[0]?.[1] || 1;
      onComplete({
        topResult: allEntries[0][0],
        allScores: allEntries.map(([key, score]) => ({
          key,
          score,
          percentage: Math.round((score / maxScore) * 100),
        })),
      });
    }
  };

  if (phase === "read") {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">
            Which descriptions fit you best?
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Read each paragraph carefully. Select up to 3 that resonate most deeply with your lifelong patterns — especially the parts about motivation and fear.
          </p>
        </div>

        <div className="space-y-4">
          {paragraphs.map((p, i) => {
            const isSelected = selectedParagraphs.includes(p.typeNumber);
            const rank = selectedParagraphs.indexOf(p.typeNumber) + 1;
            return (
              <motion.button
                key={p.typeNumber}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toggleParagraph(p.typeNumber)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? "border-sky-400 bg-sky-50/50"
                    : selectedParagraphs.length >= 3
                    ? "border-slate-100 bg-white opacity-50"
                    : "border-slate-100 bg-white hover:border-sky-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      isSelected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isSelected ? rank : String.fromCharCode(65 + i)}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.paragraph}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {selectedParagraphs.length >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky bottom-4 mt-8"
          >
            <button
              onClick={() => {
                if (relevantNarrowing.length > 0) {
                  setPhase("narrow");
                } else {
                  const newScores: Record<number, number> = {};
                  selectedParagraphs.forEach((num, i) => {
                    newScores[num] = (3 - i) * 3;
                  });
                  const allEntries = Object.entries(newScores).sort(([, a], [, b]) => b - a);
                  const maxScore = allEntries[0]?.[1] || 1;
                  onComplete({
                    topResult: allEntries[0][0],
                    allScores: allEntries.map(([key, score]) => ({
                      key,
                      score,
                      percentage: Math.round((score / maxScore) * 100),
                    })),
                  });
                }
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Continue with {selectedParagraphs.length} selected <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  if (phase === "narrow") {
    const q = relevantNarrowing[narrowIdx];
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Narrowing down</span>
            <span>{narrowIdx + 1} of {relevantNarrowing.length}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
              animate={{ width: `${((narrowIdx + 1) / relevantNarrowing.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={narrowIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-lg font-serif font-semibold text-slate-800 mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => answerNarrowing(opt)}
                  className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-sky-300 hover:bg-sky-50/30 transition-all active:scale-[0.98]"
                >
                  <p className="text-sm text-slate-700 leading-relaxed">{opt.text}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
