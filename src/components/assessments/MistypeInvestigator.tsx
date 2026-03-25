"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";

interface MistypePair {
  typeA: number;
  typeB: number;
  commonConfusion: string;
  questions: {
    text: string;
    optionA: { text: string; leansToward: number };
    optionB: { text: string; leansToward: number };
  }[];
}

export default function MistypeInvestigator({
  pairs,
  onComplete,
}: {
  pairs: MistypePair[];
  onComplete: (result: { topResult: string; allScores: { key: string; score: number; percentage: number }[] }) => void;
}) {
  const [phase, setPhase] = useState<"select" | "investigate" | "results">("select");
  const [selectedPairs, setSelectedPairs] = useState<number[]>([]);
  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({});

  const activePairs = selectedPairs.map((i) => pairs[i]);
  const currentPair = activePairs[currentPairIdx];

  const togglePair = (idx: number) => {
    if (selectedPairs.includes(idx)) {
      setSelectedPairs(selectedPairs.filter((i) => i !== idx));
    } else {
      setSelectedPairs([...selectedPairs, idx]);
    }
  };

  const answer = (leansToward: number) => {
    const newScores = { ...scores };
    newScores[leansToward] = (newScores[leansToward] || 0) + 1;
    setScores(newScores);

    if (currentQIdx < currentPair.questions.length - 1) {
      setCurrentQIdx(currentQIdx + 1);
    } else if (currentPairIdx < activePairs.length - 1) {
      setCurrentPairIdx(currentPairIdx + 1);
      setCurrentQIdx(0);
    } else {
      // Done — calculate results
      const sorted = Object.entries(newScores)
        .map(([key, score]) => ({ key, score }))
        .sort((a, b) => b.score - a.score);
      const maxScore = sorted[0]?.score || 1;
      onComplete({
        topResult: sorted[0].key,
        allScores: sorted.map((s) => ({
          ...s,
          percentage: Math.round((s.score / maxScore) * 100),
        })),
      });
    }
  };

  if (phase === "select") {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">
            Mistype Investigator
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Select the type pairs you&apos;re confused between. We&apos;ll ask targeted questions to help you distinguish them.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {pairs.map((pair, idx) => {
            const isSelected = selectedPairs.includes(idx);
            const typeA = enneagramTypes.find((t) => t.number === pair.typeA);
            const typeB = enneagramTypes.find((t) => t.number === pair.typeB);
            return (
              <button
                key={idx}
                onClick={() => togglePair(idx)}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${
                  isSelected ? "border-rose-300 bg-rose-50/30" : "border-slate-100 bg-white hover:border-rose-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: typeA?.color }}
                    >
                      {pair.typeA}
                    </div>
                    <span className="text-slate-300 text-sm">vs</span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: typeB?.color }}
                    >
                      {pair.typeB}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="ml-auto px-2 py-0.5 text-[10px] font-medium rounded-full bg-rose-100 text-rose-600">Selected</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{pair.commonConfusion}</p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-3">
          {selectedPairs.length > 0 && (
            <button
              onClick={() => setPhase("investigate")}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Search className="w-4 h-4" />
              Investigate {selectedPairs.length} Pair{selectedPairs.length > 1 ? "s" : ""}
            </button>
          )}
          <a
            href="https://www.enneagraminstitute.com/misidentifying-enneagram-types"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition"
          >
            <ExternalLink className="w-3 h-3" />
            Enneagram Institute Mistype Guide
          </a>
        </div>
      </div>
    );
  }

  if (phase === "investigate" && currentPair) {
    const q = currentPair.questions[currentQIdx];
    const totalQuestions = activePairs.reduce((sum, p) => sum + p.questions.length, 0);
    const completedQuestions = activePairs
      .slice(0, currentPairIdx)
      .reduce((sum, p) => sum + p.questions.length, 0) + currentQIdx;
    const progress = ((completedQuestions + 1) / totalQuestions) * 100;

    const typeA = enneagramTypes.find((t) => t.number === currentPair.typeA);
    const typeB = enneagramTypes.find((t) => t.number === currentPair.typeB);

    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>
              Type {currentPair.typeA} vs {currentPair.typeB}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPairIdx}-${currentQIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-lg font-serif font-semibold text-slate-800 mb-6 text-center">
              {q.text}
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => answer(q.optionA.leansToward)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-rose-300 hover:bg-rose-50/20 transition-all active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: typeA?.color }}
                  >
                    {q.optionA.leansToward}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{q.optionA.text}</p>
                </div>
              </button>
              <div className="text-center text-xs text-slate-300">or</div>
              <button
                onClick={() => answer(q.optionB.leansToward)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-rose-300 hover:bg-rose-50/20 transition-all active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: typeB?.color }}
                  >
                    {q.optionB.leansToward}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{q.optionB.text}</p>
                </div>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
