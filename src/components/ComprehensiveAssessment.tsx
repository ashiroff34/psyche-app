"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { coreTypePairs, likertStatements, instinctPairs, tritypePairs, type ForcedChoicePair, type AssessmentStatement } from "@/data/comprehensive-assessment";

type Phase = "intro" | "forced-choice" | "likert" | "instinct" | "tritype" | "calculating";

interface ComprehensiveResults {
  coreType: string;
  coreScores: { key: string; score: number; percentage: number }[];
  instinct: string;
  instinctScores: { sp: number; sx: number; so: number };
}

export default function ComprehensiveAssessment({ onComplete }: { onComplete: (results: ComprehensiveResults) => void }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentItem, setCurrentItem] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [likertAnswers, setLikertAnswers] = useState<Record<number, number>>({});

  // Shuffle pairs for each phase to reduce order bias
  const shuffledCorePairs = useMemo(() => [...coreTypePairs].sort(() => Math.random() - 0.5), []);
  const shuffledLikert = useMemo(() => [...likertStatements].sort(() => Math.random() - 0.5), []);
  const shuffledInstinct = useMemo(() => [...instinctPairs].sort(() => Math.random() - 0.5), []);
  const shuffledTritype = useMemo(() => [...tritypePairs].sort(() => Math.random() - 0.5), []);

  const getCurrentItems = (): (ForcedChoicePair | AssessmentStatement)[] => {
    switch (phase) {
      case "forced-choice": return shuffledCorePairs;
      case "likert": return shuffledLikert;
      case "instinct": return shuffledInstinct;
      case "tritype": return shuffledTritype;
      default: return [];
    }
  };

  const items = getCurrentItems();
  const totalItems = shuffledCorePairs.length + shuffledLikert.length + shuffledInstinct.length + shuffledTritype.length;
  const completedItems = phase === "forced-choice" ? currentItem :
    phase === "likert" ? shuffledCorePairs.length + currentItem :
    phase === "instinct" ? shuffledCorePairs.length + shuffledLikert.length + currentItem :
    phase === "tritype" ? shuffledCorePairs.length + shuffledLikert.length + shuffledInstinct.length + currentItem :
    totalItems;
  const overallProgress = (completedItems / totalItems) * 100;

  const phaseNames = { "forced-choice": "Core Type (Forced Choice)", likert: "Core Type (Resonance)", instinct: "Instinctual Variants", tritype: "Tritype Centers" };

  const choosePair = (side: "a" | "b", pair: ForcedChoicePair) => {
    const chosen = side === "a" ? pair.a : pair.b;
    const newScores = { ...scores };
    Object.entries(chosen.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);
    advance();
  };

  const rateLikert = (statement: AssessmentStatement, rating: number) => {
    setLikertAnswers({ ...likertAnswers, [statement.id]: rating });
    const newScores = { ...scores };
    Object.entries(statement.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val * rating;
    });
    setScores(newScores);
    advance();
  };

  const advance = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem(currentItem + 1);
    } else {
      // Move to next phase
      setCurrentItem(0);
      if (phase === "forced-choice") setPhase("likert");
      else if (phase === "likert") setPhase("instinct");
      else if (phase === "instinct") setPhase("tritype");
      else if (phase === "tritype") {
        setPhase("calculating");
        setTimeout(() => calculateResults(), 2000);
      }
    }
  };

  const calculateResults = () => {
    const typeScores = Object.entries(scores)
      .filter(([k]) => !["sp", "sx", "so"].includes(k))
      .sort(([, a], [, b]) => b - a);
    const maxScore = typeScores[0]?.[1] || 1;

    const instinctScores = {
      sp: scores["sp"] || 0,
      sx: scores["sx"] || 0,
      so: scores["so"] || 0,
    };
    const topInstinct = Object.entries(instinctScores).sort(([, a], [, b]) => b - a)[0][0];

    onComplete({
      coreType: typeScores[0][0],
      coreScores: typeScores.map(([key, score]) => ({
        key,
        score,
        percentage: Math.round((score / maxScore) * 100),
      })),
      instinct: topInstinct,
      instinctScores,
    });
  };

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mx-auto mb-6">
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Comprehensive Assessment</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            This in-depth assessment uses {totalItems} items across four sections modeled
            after validated Enneagram instruments (RHETI, TAS, WEPSS). It measures your core type,
            wing tendency, instinctual variant, and tritype centers.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8 text-left">
            {[
              { label: "Forced-Choice Pairs", count: shuffledCorePairs.length, desc: "RHETI-style paired comparisons" },
              { label: "Resonance Ratings", count: shuffledLikert.length, desc: "Rate how strongly each statement fits" },
              { label: "Instinctual Variants", count: shuffledInstinct.length, desc: "SP, SX, SO identification" },
              { label: "Tritype Centers", count: shuffledTritype.length, desc: "Head, Heart, Gut preferences" },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-xl bg-slate-50">
                <div className="text-sm font-medium text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-400">{s.count} items · {s.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mb-6">Estimated time: 15-20 minutes. Answer honestly — go with your first instinct.</p>
          <button onClick={() => setPhase("forced-choice")}
            className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-200/40 hover:shadow-xl transition-all">
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  if (phase === "calculating") {
    return (
      <div className="max-w-lg mx-auto py-20 px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Analyzing Your Responses</h2>
        <p className="text-slate-500 text-sm">Calculating your type across {totalItems} data points...</p>
        <div className="mt-8 h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
          <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full animate-pulse" style={{ width: "80%" }} />
        </div>
      </div>
    );
  }

  const item = items[currentItem];
  const isForcedChoice = phase === "forced-choice" || phase === "instinct" || phase === "tritype";

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{phaseNames[phase as keyof typeof phaseNames]}</span>
          <span>{Math.round(overallProgress)}% complete</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 mt-1">
          <span>Item {currentItem + 1} of {items.length} in this section</span>
          <span>{completedItems} of {totalItems} total</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${phase}-${currentItem}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          {isForcedChoice && (item as ForcedChoicePair).a ? (
            <div>
              <p className="text-sm text-slate-500 text-center mb-6">Which statement resonates more with you?</p>
              <div className="space-y-3">
                <button onClick={() => choosePair("a", item as ForcedChoicePair)}
                  className="w-full text-left p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-sky-300 hover:bg-sky-50/30 transition-all active:scale-[0.98]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 text-sm font-bold shrink-0">A</div>
                    <p className="text-sm text-slate-700 leading-relaxed">{(item as ForcedChoicePair).a.text}</p>
                  </div>
                </button>
                <div className="text-center text-xs text-slate-300">or</div>
                <button onClick={() => choosePair("b", item as ForcedChoicePair)}
                  className="w-full text-left p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all active:scale-[0.98]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-sm font-bold shrink-0">B</div>
                    <p className="text-sm text-slate-700 leading-relaxed">{(item as ForcedChoicePair).b.text}</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-500 text-center mb-4">How strongly does this resonate with you?</p>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 mb-6">
                <p className="text-slate-700 leading-relaxed text-center">{(item as AssessmentStatement).text}</p>
              </div>
              <div className="flex justify-center gap-3">
                {[
                  { val: 1, label: "Not at all" },
                  { val: 2, label: "A little" },
                  { val: 3, label: "Somewhat" },
                  { val: 4, label: "Strongly" },
                  { val: 5, label: "Deeply" },
                ].map((opt) => (
                  <button key={opt.val} onClick={() => rateLikert(item as AssessmentStatement, opt.val)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-slate-100 hover:border-sky-300 hover:bg-sky-50/30 transition-all active:scale-95 min-w-[70px]">
                    <div className="text-lg font-bold text-slate-700">{opt.val}</div>
                    <div className="text-[10px] text-slate-400">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
