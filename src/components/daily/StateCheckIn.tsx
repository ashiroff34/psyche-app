"use client";

// Daily state-vs-trait micro-check. 5 rotating items, ~30 seconds.
//
// Fleeson (2001) and Rauthmann et al. (2019) showed that personality is best
// understood as a density distribution of states, not a fixed trait. The
// gap between "who you are usually" (your trait) and "who you are today"
// (your state) is where the real growth lives.
//
// We rotate through the 10 Big Five Aspects so a full week's worth of
// check-ins covers all of them twice.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { ASPECTS, type Aspect } from "@/data/psychometrics/big-five-aspects";

// 5 state items (shorter, state-adapted versions of the BFAS items)
const STATE_ITEMS: Array<{ aspect: Aspect; text: string; reverse: boolean }> = [
  { aspect: "volatility", text: "I've felt irritable today.", reverse: false },
  { aspect: "withdrawal", text: "I've been worried or anxious today.", reverse: false },
  { aspect: "enthusiasm", text: "I've felt warm and sociable today.", reverse: false },
  { aspect: "assertiveness", text: "I've spoken up for what I wanted today.", reverse: false },
  { aspect: "industriousness", text: "I've followed through on my intentions today.", reverse: false },
  { aspect: "orderliness", text: "My day has felt organized.", reverse: false },
  { aspect: "compassion", text: "I've attuned to others' feelings today.", reverse: false },
  { aspect: "politeness", text: "I've held back from snapping at people.", reverse: false },
  { aspect: "opennessProper", text: "I've noticed beauty or had vivid imagination today.", reverse: false },
  { aspect: "intellect", text: "I've engaged with ideas that pulled me in.", reverse: false },
];

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

// Rotate items by day of year
function getTodaysItems() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const offset = (dayOfYear * 5) % STATE_ITEMS.length;
  const picks: typeof STATE_ITEMS = [];
  for (let i = 0; i < 5; i++) {
    picks.push(STATE_ITEMS[(offset + i) % STATE_ITEMS.length]);
  }
  return picks;
}

const STORAGE_KEY_DONE = (d: string) => `psyche-state-checkin-done-${d}`;

export default function StateCheckIn() {
  const { addStateCheckIn, aspects, stateHistory } = usePsychometrics();
  const [items] = useState(getTodaysItems);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const today = getDateKey();
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY_DONE(today))) {
      setDone(true);
    }
  }, []);

  function answer(v: number) {
    const aspect = items[idx].aspect;
    const next = { ...answers, [aspect]: items[idx].reverse ? 6 - v : v };
    setAnswers(next);
    if (idx < items.length - 1) {
      setTimeout(() => setIdx(idx + 1), 100);
    } else {
      const today = getDateKey();
      addStateCheckIn({ date: today, scores: next });
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_DONE(today), "1");
      }
      setTimeout(() => setDone(true), 120);
    }
  }

  if (dismissed) return null;

  if (done) {
    // Show state-vs-trait delta if we have both
    const deltas: Array<{ aspect: Aspect; trait: number; state: number; gap: number }> = [];
    if (aspects) {
      for (const [aspect, stateRaw] of Object.entries(answers) as [Aspect, number][]) {
        const trait = aspects.scores[aspect];
        const statePercent = Math.round(((stateRaw - 1) / 4) * 100);
        const gap = statePercent - trait;
        if (Math.abs(gap) >= 20) deltas.push({ aspect, trait, state: statePercent, gap });
      }
    }

    return (
      <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-4 h-4 text-violet-300" />
          <p className="text-xs uppercase tracking-widest text-violet-300 font-bold">Today's state, logged</p>
        </div>
        {deltas.length === 0 && (
          <p className="text-sm opacity-75">Your day matched your usual self closely.</p>
        )}
        {deltas.slice(0, 2).map(d => {
          const def = ASPECTS.find(a => a.key === d.aspect)!;
          const direction = d.gap > 0 ? "higher" : "lower";
          return (
            <div key={d.aspect} className="mb-2 last:mb-0">
              <p className="text-sm"><span className="font-bold">{def.name}</span> ran {Math.abs(d.gap)} points {direction} than usual today.</p>
              <p className="text-[11px] opacity-60 leading-snug">
                Trait {d.trait}, state {d.state}. {d.gap > 0 ? def.high : def.low}
              </p>
            </div>
          );
        })}
        <p className="text-[11px] opacity-50 mt-3 leading-snug">
          {stateHistory.length + 1} check-ins logged. These accumulate into your drift graph.
        </p>
      </div>
    );
  }

  const item = items[idx];
  const progress = ((idx + 1) / items.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-300" />
          <p className="text-xs uppercase tracking-widest text-violet-300 font-bold">Today vs usually</p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-[11px] opacity-50 hover:opacity-80">Skip</button>
      </div>
      <div className="h-1 rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#d946ef)" }} animate={{ width: `${progress}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>{item.text}</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(v => (
              <button key={v} onClick={() => answer(v)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                }}>
                {v}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-[10px] opacity-50 mt-1">
            <span>Not at all</span>
            <span>Very much</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
