"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sun } from "lucide-react";
import { getTodayPassionCheckIn } from "@/data/passion-check-ins";

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

const STORAGE_KEY = (date: string) => `psyche-passion-checkin-${date}`;

interface Props {
  enneagramType: number;
}

export default function MorningPassionCheckIn({ enneagramType }: Props) {
  const [response, setResponse] = useState<"caught" | "missed" | "skip" | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY(getDateKey()));
      if (saved === "caught" || saved === "missed" || saved === "skip") {
        setResponse(saved);
      }
    } catch {}
    setLoaded(true);
  }, []);

  const checkIn = getTodayPassionCheckIn(enneagramType);
  if (!checkIn || !loaded) return null;

  const color = TYPE_COLORS[enneagramType] ?? "#8b5cf6";

  function handleResponse(r: "caught" | "missed" | "skip") {
    setResponse(r);
    try {
      localStorage.setItem(STORAGE_KEY(getDateKey()), r);
      // Track streak
      const streakKey = "psyche-passion-checkin-streak";
      const lastKey = "psyche-passion-checkin-last-date";
      const today = getDateKey();
      const lastDate = localStorage.getItem(lastKey);
      let streak = parseInt(localStorage.getItem(streakKey) ?? "0", 10);
      if (lastDate !== today) {
        const yesterday = (() => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          return new Intl.DateTimeFormat("en-CA").format(d);
        })();
        if (lastDate === yesterday) streak += 1;
        else streak = 1;
        localStorage.setItem(streakKey, String(streak));
        localStorage.setItem(lastKey, today);
      }
    } catch {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}14, rgba(255,255,255,0.03))`,
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 24px ${color}12`,
      }}
    >
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${color}18` }}
      >
        <div className="flex items-center gap-2">
          <Sun className="w-3.5 h-3.5" style={{ color }} />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color }}
          >
            Morning check-in · {checkIn.passionWord}
          </span>
        </div>
        {response && (
          <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
            ✓ done
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <p className="text-[15px] font-serif italic leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>
          {checkIn.question}
        </p>

        <AnimatePresence mode="wait">
          {!response ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <button
                onClick={() => handleResponse("caught")}
                className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold text-white transition-all active:scale-95 flex items-center justify-center gap-1.5"
                style={{ background: `linear-gradient(135deg, ${color}cc, ${color}88)` }}
              >
                <Check className="w-3.5 h-3.5" />
                Caught it
              </button>
              <button
                onClick={() => handleResponse("missed")}
                className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold transition-all active:scale-95"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Missed it
              </button>
              <button
                onClick={() => handleResponse("skip")}
                className="px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all active:scale-95"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ background: `${color}10`, border: `1px solid ${color}25` }}
            >
              <Check className="w-4 h-4" style={{ color }} />
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                {response === "caught"
                  ? "Noticed. That's the work."
                  : response === "missed"
                  ? "Awareness comes after, too. That counts."
                  : "Tomorrow then."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
