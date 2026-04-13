"use client";

import { recordFeatureSkipped } from "@/lib/behavioral-signals";
// Body Map Check-In (Damasio somatic markers + Craig interoception)
//
// Quick somatic awareness exercise embedded in the daily practice.
// 3 questions about physical sensations, woven into the existing hub.
// Over time, builds a somatic profile by type center.
//
// Gut types (8/9/1): tension in belly, jaw, lower body
// Heart types (2/3/4): tension in chest, shoulders, throat
// Head types (5/6/7): tension in head, neck, shallow breathing

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Check } from "lucide-react";

const BODY_QUESTIONS = [
  { id: "chest", text: "Right now, is your chest open or tight?", options: ["Open", "Neutral", "Tight"], area: "heart" },
  { id: "shoulders", text: "Are your shoulders lifted or dropped?", options: ["Dropped (relaxed)", "Neutral", "Lifted (tense)"], area: "heart" },
  { id: "belly", text: "Is there tension in your gut right now?", options: ["Relaxed", "Neutral", "Tense"], area: "gut" },
  { id: "breath", text: "Where is your breathing?", options: ["Deep (belly)", "Middle (chest)", "Shallow (throat)"], area: "head" },
  { id: "jaw", text: "Is your jaw clenched or relaxed?", options: ["Relaxed", "Neutral", "Clenched"], area: "gut" },
];

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

// Rotate 3 questions per day from the pool of 5
function getTodaysQuestions() {
  if (!BODY_QUESTIONS.length) return [];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const offset = (dayOfYear * 3) % BODY_QUESTIONS.length;
  return [0, 1, 2].map(i => BODY_QUESTIONS[(offset + i) % BODY_QUESTIONS.length]);
}

export default function BodyMapCheckIn() {
  const [questions] = useState(getTodaysQuestions);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const today = getDateKey();
    if (typeof window === "undefined") return;
    if (localStorage.getItem(`psyche-body-check-${today}`)) setDone(true);
  }, []);

  function answer(v: number) {
    const q = questions[idx];
    const next = { ...answers, [q.id]: v };
    setAnswers(next);
    if (idx < questions.length - 1) {
      setTimeout(() => { if (mountedRef.current) setIdx(idx + 1); }, 100);
    } else {
      const today = getDateKey();
      // Save to history
      try {
        const histRaw = localStorage.getItem("psyche-body-history");
        const hist = histRaw ? JSON.parse(histRaw) : [];
        hist.push({ date: today, answers: next });
        localStorage.setItem("psyche-body-history", JSON.stringify(hist.slice(-90)));
        localStorage.setItem(`psyche-body-check-${today}`, "1");
      } catch {}
      setTimeout(() => { if (mountedRef.current) setDone(true); }, 120);
    }
  }

  if (dismissed) return null;

  if (done) {
    // Summarize tension areas
    const areas: Record<string, number> = { gut: 0, heart: 0, head: 0 };
    for (const q of questions) {
      const a = answers[q.id];
      if (typeof a === "number" && a === 2) areas[q.area] += 1; // tense/tight/clenched/shallow
    }
    const topArea = Object.entries(areas).sort(([, a], [, b]) => b - a)[0];
    const centerLabels: Record<string, string> = { gut: "body center (gut)", heart: "heart center (chest)", head: "head center (mind)" };

    return (
      <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Check className="w-4 h-4 text-emerald-400" />
          <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold">Body check, logged</p>
        </div>
        {topArea && topArea[1] > 0 ? (
          <p className="text-sm opacity-75">Most tension in your {centerLabels[topArea[0]] ?? topArea[0]} today.</p>
        ) : (
          <p className="text-sm opacity-75">Relatively relaxed across all areas today.</p>
        )}
      </div>
    );
  }

  const q = questions[idx];

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold">Body check</p>
        </div>
        <button onClick={() => { recordFeatureSkipped("body-map"); setDismissed(true); }} className="text-[11px] opacity-50 hover:opacity-80">Skip</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
          <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>{q.text}</p>
          <div className="flex gap-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => answer(i)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                }}>
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
