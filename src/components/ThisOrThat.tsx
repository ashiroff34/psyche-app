"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

interface ThisOrThatPair {
  left: { text: string; scores: Record<string, number> };
  right: { text: string; scores: Record<string, number> };
}

const pairs: ThisOrThatPair[] = [
  { left: { text: "I withdraw to think things through", scores: { "5": 2, "4": 1, "9": 1 } }, right: { text: "I take action and deal with it head-on", scores: { "8": 2, "3": 1, "7": 1 } } },
  { left: { text: "I need to be needed by others", scores: { "2": 3, "6": 1 } }, right: { text: "I need to be competent and self-sufficient", scores: { "5": 2, "1": 1, "3": 1 } } },
  { left: { text: "I avoid conflict to keep the peace", scores: { "9": 3, "2": 1 } }, right: { text: "I confront problems directly", scores: { "8": 3, "1": 1 } } },
  { left: { text: "I feel things very deeply and intensely", scores: { "4": 3, "sx": 1 } }, right: { text: "I prefer to stay calm and even-keeled", scores: { "9": 2, "5": 1, "sp": 1 } } },
  { left: { text: "Achievement and success drive me", scores: { "3": 3, "8": 1 } }, right: { text: "Understanding and knowledge drive me", scores: { "5": 3, "1": 1 } } },
  { left: { text: "I scan for what could go wrong", scores: { "6": 3, "1": 1 } }, right: { text: "I focus on what could go right", scores: { "7": 3, "9": 1 } } },
  { left: { text: "I adapt who I am based on the situation", scores: { "3": 2, "9": 2 } }, right: { text: "I stay true to myself regardless of context", scores: { "4": 2, "1": 2 } } },
  { left: { text: "I energize groups and bring enthusiasm", scores: { "7": 3, "so": 1 } }, right: { text: "I observe from the edges before engaging", scores: { "5": 2, "4": 1, "sp": 1 } } },
  { left: { text: "Rules exist for good reason", scores: { "1": 2, "6": 2 } }, right: { text: "Rules are made to be questioned", scores: { "7": 1, "8": 2, "4": 1 } } },
  { left: { text: "I lose myself in helping others", scores: { "2": 3, "9": 1 } }, right: { text: "I protect my time and energy fiercely", scores: { "5": 2, "8": 1, "sp": 1 } } },
  { left: { text: "I need deep one-on-one connections", scores: { "sx": 3, "4": 1 } }, right: { text: "I thrive in group settings and community", scores: { "so": 3, "7": 1 } } },
  { left: { text: "I prepare and plan for the worst case", scores: { "6": 2, "sp": 2 } }, right: { text: "I trust things will work out", scores: { "7": 2, "9": 2 } } },
  { left: { text: "I seek intensity and transformation", scores: { "sx": 3, "8": 1 } }, right: { text: "I seek comfort and stability", scores: { "sp": 3, "9": 1 } } },
  { left: { text: "I express my anger openly", scores: { "8": 3, "sx": 1 } }, right: { text: "I suppress my anger or don't notice it", scores: { "9": 2, "1": 1, "sp": 1 } } },
  { left: { text: "I care deeply about social roles and belonging", scores: { "so": 3, "6": 1 } }, right: { text: "I'm happiest being independent and autonomous", scores: { "5": 2, "sp": 1, "4": 1 } } },
  { left: { text: "I tend to idealize people and experiences", scores: { "7": 2, "4": 1, "sx": 1 } }, right: { text: "I see people and situations realistically", scores: { "1": 1, "5": 1, "8": 1, "sp": 1 } } },
  { left: { text: "My worth comes from what I do", scores: { "3": 3, "1": 1 } }, right: { text: "My worth comes from who I am inside", scores: { "4": 3, "9": 1 } } },
  { left: { text: "I fear being controlled by others", scores: { "8": 3, "sx": 1 } }, right: { text: "I fear being abandoned or unsupported", scores: { "6": 2, "2": 2 } } },
  { left: { text: "I need variety, stimulation, and new experiences", scores: { "7": 3, "sx": 1 } }, right: { text: "I need routine, predictability, and quiet", scores: { "sp": 2, "5": 1, "6": 1 } } },
  { left: { text: "I'm drawn to what's missing and melancholic", scores: { "4": 3 } }, right: { text: "I'm drawn to what's working and optimistic", scores: { "7": 2, "3": 1, "9": 1 } } },
];

interface Results {
  scores: Record<string, number>;
  topTypes: { key: string; score: number }[];
  topInstinct: string;
}

export default function ThisOrThat({ onComplete }: { onComplete: (results: Results) => void }) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const pair = pairs[current];
  const progress = ((current + 1) / pairs.length) * 100;

  // Live type probability
  const typeScores = Object.entries(scores)
    .filter(([k]) => !["sp", "sx", "so"].includes(k))
    .sort(([, a], [, b]) => b - a);
  const maxScore = typeScores[0]?.[1] || 1;

  const choose = useCallback((side: "left" | "right") => {
    if (isAnimating) return;
    setDirection(side);
    setIsAnimating(true);

    const chosen = side === "left" ? pair.left : pair.right;
    const newScores = { ...scores };
    Object.entries(chosen.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);

    setTimeout(() => {
      if (current < pairs.length - 1) {
        setCurrent(current + 1);
      } else {
        // Calculate results
        const allTypes = Object.entries(newScores)
          .filter(([k]) => !["sp", "sx", "so"].includes(k))
          .sort(([, a], [, b]) => b - a)
          .map(([key, score]) => ({ key, score }));

        const instincts = ["sp", "sx", "so"]
          .map((k) => ({ key: k, score: newScores[k] || 0 }))
          .sort((a, b) => b.score - a.score);

        onComplete({
          scores: newScores,
          topTypes: allTypes,
          topInstinct: instincts[0]?.key || "sp",
        });
      }
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  }, [current, scores, pair, isAnimating, onComplete]);

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-medium mb-3">
          <Zap className="w-3 h-3" /> Rapid-Fire Mode
        </div>
        <p className="text-sm text-slate-400">Tap the side that resonates more. Go with your gut!</p>
      </div>

      {/* Progress ring */}
      <div className="flex justify-center mb-8">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" stroke="#e2e8f0" strokeWidth="2" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={`${progress}, 100`}
              style={{ transition: "stroke-dasharray 0.3s ease" }} />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-600">
            {current + 1}/{pairs.length}
          </div>
        </div>
      </div>

      {/* This or That Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, x: direction === "left" ? -100 : direction === "right" ? 100 : 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => choose("left")}
            className="group p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-sky-400 hover:bg-sky-50/50 transition-all active:scale-95 text-left min-h-[140px] flex items-center"
          >
            <p className="text-sm font-medium text-slate-700 leading-relaxed group-hover:text-sky-800 transition-colors">
              {pair.left.text}
            </p>
          </button>
          <button
            onClick={() => choose("right")}
            className="group p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all active:scale-95 text-left min-h-[140px] flex items-center"
          >
            <p className="text-sm font-medium text-slate-700 leading-relaxed group-hover:text-indigo-800 transition-colors">
              {pair.right.text}
            </p>
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Live Type Probability */}
      {typeScores.length > 0 && (
        <div className="mt-8 p-4 rounded-2xl bg-white/50 border border-slate-100">
          <div className="text-xs font-medium text-slate-400 mb-3">Emerging Pattern</div>
          <div className="space-y-2">
            {typeScores.slice(0, 4).map(([type, score]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-12 text-xs font-mono text-slate-500">Type {type}</div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
