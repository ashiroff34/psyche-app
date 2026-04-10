"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ASPECT_ITEMS, scoreAspects, ASPECTS } from "@/data/psychometrics/big-five-aspects";
import { usePsychometrics } from "@/hooks/usePsychometrics";

const SCALE = [
  { v: 1, label: "Strongly disagree" },
  { v: 2, label: "Disagree" },
  { v: 3, label: "Neutral" },
  { v: 4, label: "Agree" },
  { v: 5, label: "Strongly agree" },
];

export default function AspectsAssessmentPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const { aspects, saveAspects } = usePsychometrics();

  const item = ASPECT_ITEMS[idx];
  const progress = ((idx + 1) / ASPECT_ITEMS.length) * 100;

  function answer(v: number) {
    const next = { ...answers, [item.id]: v };
    setAnswers(next);
    if (idx < ASPECT_ITEMS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 120);
    } else {
      const result = scoreAspects(next);
      saveAspects(result);
      setTimeout(() => setDone(true), 150);
    }
  }

  if (done || (aspects && !Object.keys(answers).length)) {
    const result = aspects;
    return (
      <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
        <div className="max-w-md mx-auto">
          <Link href="/mirrors" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Mirrors
          </Link>
          <h1 className="text-2xl font-bold mb-2">Your Big Five Aspects</h1>
          <p className="text-sm opacity-60 mb-6">
            10 aspects (DeYoung, Quilty, Peterson, 2007). Two aspects per Big Five factor, because most people are split.
          </p>
          {result && (
            <>
              {result.splitAspects.length > 0 && (
                <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(217,70,239,0.08)", border: "1px solid rgba(217,70,239,0.3)" }}>
                  <p className="text-xs uppercase tracking-widest text-fuchsia-300 mb-2">Split factors</p>
                  <p className="text-xs opacity-70 mb-3">Places where your two aspects point in different directions.</p>
                  {result.splitAspects.map(s => {
                    const hi = ASPECTS.find(a => a.key === s.high)!;
                    const lo = ASPECTS.find(a => a.key === s.low)!;
                    return (
                      <div key={s.factor} className="mb-2">
                        <p className="text-sm font-bold">{s.factor}</p>
                        <p className="text-xs opacity-70 leading-snug">
                          High {hi.name} ({result.scores[s.high]}), low {lo.name} ({result.scores[s.low]}), gap of {s.gap}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mb-6 space-y-2">
                {ASPECTS.map(a => {
                  const score = result.scores[a.key];
                  return (
                    <div key={a.key} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="text-sm font-semibold">{a.name}</p>
                        <span className="text-xs font-mono opacity-70">{score}</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full" style={{ width: `${score}%`, background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} />
                      </div>
                      <p className="text-[11px] opacity-50 mt-1">{a.factor}</p>
                    </div>
                  );
                })}
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
            <span>Big Five Aspects</span>
            <span>{idx + 1} / {ASPECT_ITEMS.length}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} animate={{ width: `${progress}%` }} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6">
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
