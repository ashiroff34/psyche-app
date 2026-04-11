"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { DECENTERING_ITEMS, scoreDecentering, interpretDecentering } from "@/data/psychometrics/decentering-index";
import { useProfile } from "@/hooks/useProfile";

const SCALE = [
  { v: 1, label: "Rarely true" },
  { v: 2, label: "Sometimes" },
  { v: 3, label: "About half the time" },
  { v: 4, label: "Often true" },
  { v: 5, label: "Almost always" },
];

export default function DecenteringPage() {
  const { profile } = useProfile();
  const type = profile.enneagramType ?? profile.enneagramCore ?? null;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<Array<{ score: number; percentage: number; date: string }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("psyche-decentering-history");
      try { if (raw) setHistory(JSON.parse(raw)); } catch {}
    } catch {}
  }, []);

  const item = DECENTERING_ITEMS[idx];
  const progress = ((idx + 1) / DECENTERING_ITEMS.length) * 100;

  // Replace {type} placeholder
  const itemText = item?.text.replace("{type}", type ? String(type) : "");

  function answer(v: number) {
    const next = { ...answers, [item.id]: v };
    setAnswers(next);
    if (idx < DECENTERING_ITEMS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 120);
    } else {
      const result = scoreDecentering(next);
      // Save to history
      const entry = { score: result.score, percentage: result.percentage, date: result.completedAt };
      const newHistory = [...history, entry].slice(-24); // keep last 2 years of monthly checks
      try {
        localStorage.setItem("psyche-decentering-history", JSON.stringify(newHistory));
        localStorage.setItem("psyche-decentering-latest", JSON.stringify(result));
      } catch {}
      setHistory(newHistory);
      setTimeout(() => setDone(true), 150);
    }
  }

  if (done) {
    const latest = history[history.length - 1];
    const interp = latest ? interpretDecentering(latest.percentage) : null;
    const prevScore = history.length >= 2 ? history[history.length - 2] : null;
    const delta = prevScore ? latest!.percentage - prevScore.percentage : null;

    return (
      <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
        <div className="max-w-md mx-auto">
          <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-2xl font-bold mb-2">Decentering Index</h1>
          <p className="text-sm opacity-60 mb-6">Your capacity to observe your patterns without being controlled by them.</p>

          {latest && interp && (
            <>
              <div className="mb-4 p-5 rounded-2xl text-center" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)" }}>
                <p className="text-4xl font-black mb-1">{latest.percentage}%</p>
                <p className="text-sm font-semibold capitalize text-violet-300 mb-2">{interp.level}</p>
                <p className="text-xs opacity-70 leading-relaxed">{interp.description}</p>
                {delta !== null && (
                  <p className="text-xs mt-3" style={{ color: delta > 0 ? "#34d399" : delta < 0 ? "#f87171" : "rgba(255,255,255,0.5)" }}>
                    {delta > 0 ? `+${delta}` : delta} points since last check
                  </p>
                )}
              </div>

              {/* History sparkline */}
              {history.length >= 2 && (
                <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-violet-400" />
                    <p className="text-xs uppercase tracking-widest opacity-60 font-bold">Growth over time</p>
                  </div>
                  <svg width="100%" viewBox="0 0 300 80" style={{ maxHeight: 80 }}>
                    {history.map((h, i) => {
                      const x = 10 + (i / Math.max(history.length - 1, 1)) * 280;
                      const y = 70 - (h.percentage / 100) * 60;
                      return <circle key={i} cx={x} cy={y} r="3" fill="#8b5cf6" />;
                    })}
                    {history.length >= 2 && (
                      <polyline
                        points={history.map((h, i) => {
                          const x = 10 + (i / Math.max(history.length - 1, 1)) * 280;
                          const y = 70 - (h.percentage / 100) * 60;
                          return `${x},${y}`;
                        }).join(" ")}
                        fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      />
                    )}
                  </svg>
                  <p className="text-[10px] opacity-50 text-center mt-1">
                    {history.length} measurements. Retake monthly to track real growth.
                  </p>
                </div>
              )}
            </>
          )}

          <Link href="/daily" className="block w-full py-3 text-center rounded-2xl font-semibold" style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}>
            Back to practice
          </Link>
          <p className="text-[10px] opacity-40 text-center mt-4 leading-relaxed">
            Based on Fresco et al. (2007) Experiences Questionnaire, adapted for Enneagram context. Retake monthly. Rising scores reflect genuine developmental growth.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/daily" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Cancel
        </Link>
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs opacity-60 mb-2">
            <span>Decentering Index</span>
            <span>{idx + 1} / {DECENTERING_ITEMS.length}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} animate={{ width: `${progress}%` }} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6">
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>{itemText}</p>
            <div className="space-y-2">
              {SCALE.map(s => (
                <button
                  key={s.v}
                  onClick={() => answer(s.v)}
                  className="w-full py-3 px-4 rounded-xl text-left text-sm font-medium transition-all active:scale-[0.98]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
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
