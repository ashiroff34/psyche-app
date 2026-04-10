"use client";

// Question of the Week (desirable difficulty, Bjork 1994)
//
// One deep philosophical question per week, type-filtered. Persistent
// card on HubView. Users sit with it all week.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

const WEEKLY_QUESTIONS: Record<number, string[]> = {
  1: [
    "What would change if you stopped trying to be good and started trying to be honest?",
    "Whose standards are you actually living by?",
    "What would 'enough' feel like in your body, not just your mind?",
    "What are you afraid will happen if you stop correcting?",
  ],
  2: [
    "What do you actually need that you have never asked for?",
    "What would your relationships look like if love were not a transaction?",
    "Who are you when no one needs you?",
    "What is the cost of being indispensable?",
  ],
  3: [
    "What would you pursue if no one could see you doing it?",
    "When did you last do something purely because it mattered to you, not because it would impress?",
    "What is underneath the performance?",
    "If all your accomplishments were erased, what would be left?",
  ],
  4: [
    "What if the ordinary life you dismiss is the one that actually fits?",
    "What would contentment feel like? Not as a concept. As a sensation.",
    "What are you comparing yourself to, and why does it have authority over you?",
    "What if you are already who you are becoming?",
  ],
  5: [
    "What would you lose if you stopped researching and started doing?",
    "When does understanding become a way to avoid being touched by experience?",
    "What would engagement look like if it did not cost as much as you think?",
    "What do you know that you have never put into practice?",
  ],
  6: [
    "What would you do differently if you trusted that you already know enough?",
    "What is the doubt protecting you from?",
    "What would life feel like without the constant scanning?",
    "Who would you be if you did not need an authority to lean on?",
  ],
  7: [
    "What are you running from when you reach for the next thing?",
    "What would happen if you stayed with boredom for 10 minutes?",
    "What is the experience you keep moving toward but never arriving at?",
    "What would depth look like for you? Not breadth. Depth.",
  ],
  8: [
    "What would vulnerability give you that strength cannot?",
    "Who are you protecting when you armor up? What would happen if you stopped?",
    "What is the softest thing about you? Can you let one person see it?",
    "What would trust look like if it did not require control?",
  ],
  9: [
    "What is your actual opinion about the thing you just agreed with?",
    "What would it cost to be fully present? Not merged. Present.",
    "What is the anger you buried saying about what matters to you?",
    "What do you want that you have never said out loud?",
  ],
};

export default function QuestionOfWeek({ enneagramType }: { enneagramType: number }) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const week = getWeekKey();
    if (localStorage.getItem(`psyche-qow-dismissed-${week}`)) setDismissed(true);
  }, []);

  if (dismissed || !enneagramType) return null;

  const questions = WEEKLY_QUESTIONS[enneagramType] ?? [];
  if (!questions.length) return null;
  const weekNum = parseInt(getWeekKey().split("W")[1] ?? "1", 10);
  const question = questions[weekNum % questions.length];

  function dismiss() {
    try { localStorage.setItem(`psyche-qow-dismissed-${getWeekKey()}`, "1"); } catch {}
    setDismissed(true);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="mb-4 rounded-2xl overflow-hidden"
      style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.18)" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <HelpCircle className="w-4 h-4 text-yellow-300 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-yellow-300 font-bold mb-1">Question of the week</p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>{question}</p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 opacity-40 shrink-0" /> : <ChevronDown className="w-4 h-4 opacity-40 shrink-0" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4">
          <p className="text-[11px] opacity-50 leading-relaxed mb-3">
            Sit with this question all week. Do not rush to answer it. Let it work on you in the background. The depth comes from living with the question, not from finding the answer.
          </p>
          <button onClick={dismiss} className="text-[11px] opacity-40 hover:opacity-70">
            I've sat with this enough
          </button>
        </div>
      )}
    </motion.div>
  );
}
