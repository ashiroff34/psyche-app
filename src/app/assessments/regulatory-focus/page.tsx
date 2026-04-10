"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { RF_ITEMS, scoreRegulatoryFocus } from "@/data/psychometrics/regulatory-focus";
import { usePsychometrics } from "@/hooks/usePsychometrics";

const SCALE = [
  { v: 1, label: "Strongly disagree" },
  { v: 2, label: "Disagree" },
  { v: 3, label: "Neutral" },
  { v: 4, label: "Agree" },
  { v: 5, label: "Strongly agree" },
];

export default function RegulatoryFocusPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const { regFocus, saveRegFocus } = usePsychometrics();

  const item = RF_ITEMS[idx];
  const progress = ((idx + 1) / RF_ITEMS.length) * 100;

  function answer(v: number) {
    const next = { ...answers, [item.id]: v };
    setAnswers(next);
    if (idx < RF_ITEMS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 120);
    } else {
      const score = scoreRegulatoryFocus(next);
      saveRegFocus({ ...score, completedAt: new Date().toISOString() });
      setTimeout(() => setDone(true), 150);
    }
  }

  if (done || (regFocus && !Object.keys(answers).length)) {
    const r = regFocus;
    return (
      <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
        <div className="max-w-md mx-auto">
          <Link href="/mirrors" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-2xl font-bold mb-2">Regulatory Focus</h1>
          <p className="text-sm opacity-60 mb-6">
            Higgins (1997). Promotion focuses on gains and aspirations. Prevention focuses on safety and responsibilities.
          </p>
          {r && (
            <>
              <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}>
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Dominant</p>
                <p className="text-2xl font-bold capitalize">{r.dominant}</p>
                <p className="text-xs opacity-70 mt-2">
                  {r.dominant === "promotion" && "You are pulled forward by the gains. Messages framed as growth, possibility, and aspiration land best for you."}
                  {r.dominant === "prevention" && "You are pulled forward by what you want to protect. Messages framed as responsibility, safety, and avoiding loss land best for you."}
                  {r.dominant === "balanced" && "You move between both focuses without a strong pull to either."}
                </p>
              </div>
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-[10px] uppercase opacity-50">Promotion</p>
                  <p className="text-2xl font-bold">{r.promotion}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-[10px] uppercase opacity-50">Prevention</p>
                  <p className="text-2xl font-bold">{r.prevention}</p>
                </div>
              </div>
              <p className="text-[11px] opacity-50 text-center mb-4">
                The app will now frame CTAs and prompts to match your focus.
              </p>
            </>
          )}
          <Link href="/mirrors" className="block w-full py-3 text-center rounded-2xl font-semibold" style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}>
            Done
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
            <span>Regulatory Focus</span>
            <span>{idx + 1} / {RF_ITEMS.length}</span>
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
