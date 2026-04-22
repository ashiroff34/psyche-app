"use client";

import { recordFeatureSkipped } from "@/lib/behavioral-signals";
// Morning Intention + Evening Reflection Bookends
//
// Gollwitzer 1999: implementation intentions 2-3x follow-through.
// Two daily touchpoints gated by time of day.
// Morning: type-specific intention ("notice when X arises today")
// Evening: paired reflection ("did X arise? what did you notice?")

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Check } from "lucide-react";
import { useSubtypeAwareCopy } from "@/hooks/useSubtypeAwareCopy";

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function getHour(): number {
  return new Date().getHours();
}

const MORNING_PROMPTS: Record<number, string> = {
  1: "Notice today when the inner critic speaks. What is it correcting?",
  2: "Notice today when you give before being asked. What do you hope to get back?",
  3: "Notice today when you adjust yourself for an audience. Who are you performing for?",
  4: "Notice today when longing or comparison arises. What is it pointing toward?",
  5: "Notice today when you retreat into your head. What are you retreating from?",
  6: "Notice today when you scan for danger. Is the danger real right now?",
  7: "Notice today when you reach for the next thing. What are you leaving?",
  8: "Notice today when you armor up. What would vulnerability look like here?",
  9: "Notice today when you go along. What is your actual opinion?",
};

const EVENING_PROMPTS: Record<number, string> = {
  1: "Did the inner critic speak today? What was it protecting you from?",
  2: "Did you give before being asked? What was underneath the giving?",
  3: "Did you perform today? What was underneath the performance?",
  4: "Did longing or comparison arise? Where was depth already present?",
  5: "Did you retreat into your head? What would engagement have looked like?",
  6: "Did you scan for danger? Was the danger real, or was the scanning the pattern?",
  7: "Did you reach for the next thing? What would staying have revealed?",
  8: "Did you armor up? What would softness have made possible?",
  9: "Did you go along? What was the opinion you held back?",
};

export default function MorningEvening({ enneagramType }: { enneagramType: number }) {
  const [response, setResponse] = useState("");
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const subtypeCopy = useSubtypeAwareCopy();

  const hour = getHour();
  const isMorning = hour >= 5 && hour < 14;
  const isEvening = hour >= 17 || hour < 2;
  const today = getDateKey();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = isMorning ? `psyche-morning-intention-${today}` : `psyche-evening-reflection-${today}`;
    if (localStorage.getItem(key)) setDone(true);
  }, [today, isMorning]);

  if (dismissed || done) return null;
  if (!isMorning && !isEvening) return null;
  if (!enneagramType) return null;

  const prompt = isMorning
    ? (MORNING_PROMPTS[enneagramType] ?? "What will you notice about yourself today?")
    : (EVENING_PROMPTS[enneagramType] ?? "What did you notice about yourself today?");

  const Icon = isMorning ? Sun : Moon;
  const label = isMorning ? "Morning intention" : "Evening reflection";
  const color = isMorning ? "rgba(251,191,36,0.8)" : "rgba(139,92,246,0.8)";
  const bgColor = isMorning ? "rgba(251,191,36,0.06)" : "rgba(139,92,246,0.06)";
  const borderColor = isMorning ? "rgba(251,191,36,0.18)" : "rgba(139,92,246,0.18)";

  function submit() {
    if (!response.trim()) return;
    const key = isMorning ? `psyche-morning-intention-${today}` : `psyche-evening-reflection-${today}`;
    try {
      localStorage.setItem(key, response.trim());
      // Also append to a rolling journal
      const histKey = isMorning ? "psyche-morning-journal" : "psyche-evening-journal";
      const hist = JSON.parse(localStorage.getItem(histKey) || "[]");
      hist.push({ date: today, type: enneagramType, response: response.trim() });
      localStorage.setItem(histKey, JSON.stringify(hist.slice(-90)));
    } catch {}
    setDone(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 rounded-2xl"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <p className="text-xs uppercase tracking-widest font-bold" style={{ color }}>{label}</p>
        </div>
        <button onClick={() => { recordFeatureSkipped(isMorning ? "morning-intention" : "evening-reflection"); setDismissed(true); }} className="text-[11px] opacity-40">Skip</button>
      </div>
      <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>{prompt}</p>
      <div className="flex gap-2">
        <input
          value={response}
          onChange={e => setResponse(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") submit(); }}
          placeholder={isMorning ? "I will notice..." : "I noticed..."}
          aria-label={isMorning ? "Morning intention" : "Evening reflection"}
          maxLength={200}
          className="flex-1 text-sm py-2 px-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
        />
        <button
          onClick={submit}
          disabled={!response.trim()}
          className="px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-30"
          style={{ background: bgColor, border: `1px solid ${borderColor}`, color }}
        >
          <Check className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
