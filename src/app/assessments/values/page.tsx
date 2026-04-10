"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { SCHWARTZ_ITEMS, scoreSchwartz, SCHWARTZ_VALUES } from "@/data/psychometrics/schwartz-values";
import { usePsychometrics } from "@/hooks/usePsychometrics";

const SCALE = [
  { v: 1, label: "Not like me" },
  { v: 2, label: "A little" },
  { v: 3, label: "Somewhat" },
  { v: 4, label: "Moderately" },
  { v: 5, label: "Like me" },
  { v: 6, label: "Very much" },
];

export default function ValuesAssessmentPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const { schwartz, saveSchwartz } = usePsychometrics();

  const item = SCHWARTZ_ITEMS[idx];
  const progress = ((idx + 1) / SCHWARTZ_ITEMS.length) * 100;

  function answer(v: number) {
    const next = { ...answers, [item.id]: v };
    setAnswers(next);
    if (idx < SCHWARTZ_ITEMS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 150);
    } else {
      const result = scoreSchwartz(next);
      saveSchwartz(result);
      setTimeout(() => setDone(true), 150);
    }
  }

  if (done || (schwartz && !Object.keys(answers).length)) {
    const result = schwartz;
    return (
      <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
        <div className="max-w-md mx-auto">
          <Link href="/mirrors" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Mirrors
          </Link>
          <h1 className="text-2xl font-bold mb-2">Your Values</h1>
          <p className="text-sm opacity-60 mb-6">
            Based on Schwartz's 10 universal values, ipsatively centered so relative priority is what matters.
          </p>
          {result && (
            <>
              <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Top 3 values</p>
                <div className="space-y-2">
                  {result.topValues.map(v => {
                    const def = SCHWARTZ_VALUES.find(x => x.key === v)!;
                    return (
                      <div key={v}>
                        <p className="text-sm font-bold text-violet-300">{def.name}</p>
                        <p className="text-xs opacity-70 leading-snug">{def.definition}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Least emphasized</p>
                <div className="space-y-2">
                  {result.bottomValues.map(v => {
                    const def = SCHWARTZ_VALUES.find(x => x.key === v)!;
                    return (
                      <div key={v}>
                        <p className="text-sm font-bold opacity-80">{def.name}</p>
                        <p className="text-xs opacity-60 leading-snug">{def.definition}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <Link href="/mirrors" className="block w-full py-3 text-center rounded-2xl font-semibold" style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}>
            See triangulation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/mirrors" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Cancel
        </Link>
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs opacity-60 mb-2">
            <span>Schwartz Values</span>
            <span>{idx + 1} / {SCHWARTZ_ITEMS.length}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} animate={{ width: `${progress}%` }} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6">
            <p className="text-[11px] uppercase tracking-widest opacity-60 mb-3">How much is this person like you?</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>{item.text}</p>
            <div className="space-y-2">
              {SCALE.map(s => (
                <button
                  key={s.v}
                  onClick={() => answer(s.v)}
                  className="w-full py-3 px-4 rounded-xl text-left text-sm font-medium transition-all active:scale-[0.98]"
                  style={{
                    background: answers[item.id] === s.v ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${answers[item.id] === s.v ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)"}`,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
