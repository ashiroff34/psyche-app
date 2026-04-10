"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, Footprints } from "lucide-react";
import { getTodayTheoryPracticePair } from "@/data/theory-practice-pairs";

// Theory + Practice Card
// The midday pause, one philosophical concept + one thing to try.
// Collapsed by default (drop-down) so it never overwhelms.

export default function TheoryPracticeCard() {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<"theory" | "practice">("theory");
  const pair = getTodayTheoryPracticePair();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(167,139,250,0.2)", border: "1px solid rgba(167,139,250,0.3)" }}
        >
          <Lightbulb className="w-4 h-4" style={{ color: "#c4b5fd" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>
            Today's concept
          </p>
          <p className="text-sm font-semibold truncate mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
            {pair.concept}
          </p>
        </div>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform"
          style={{
            color: "rgba(255,255,255,0.35)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="px-4 pt-4 pb-5">
              {/* Phase toggle */}
              <div
                className="flex gap-1 p-1 rounded-xl mb-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <button
                  onClick={() => setPhase("theory")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all"
                  style={
                    phase === "theory"
                      ? { background: "rgba(167,139,250,0.2)", color: "#c4b5fd", boxShadow: "0 2px 8px rgba(139,92,246,0.15)" }
                      : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  <Lightbulb className="w-3 h-3" />
                  Theory
                </button>
                <button
                  onClick={() => setPhase("practice")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all"
                  style={
                    phase === "practice"
                      ? { background: "rgba(52,211,153,0.2)", color: "#6ee7b7", boxShadow: "0 2px 8px rgba(16,185,129,0.15)" }
                      : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  <Footprints className="w-3 h-3" />
                  Practice
                </button>
              </div>

              <AnimatePresence mode="wait">
                {phase === "theory" ? (
                  <motion.div
                    key="theory"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm font-serif italic leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {pair.theory}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="practice"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(52,211,153,0.08)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#34d399" }}>
                      Try this · {pair.practiceDuration}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {pair.practice}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
