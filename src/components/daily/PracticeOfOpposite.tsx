"use client";

// Practice of the Opposite (exposure-based growth)
//
// Daily micro-challenge: do the thing your type avoids.
// The Enneagram's own growth model prescribes movement against type.
// Exposure-based approaches are the most validated mechanism for
// reducing avoidance in both clinical and personality psychology.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Check } from "lucide-react";

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

const CHALLENGES: Record<number, string[]> = {
  1: [
    "Leave one thing imperfect on purpose today. Do not fix it.",
    "Say 'good enough' out loud about something you would normally perfect.",
    "Let someone else do something their way, even if yours is better.",
    "Notice your inner critic once today and say: 'Thank you, I hear you.'",
    "Do something purely for fun with no productive value.",
  ],
  2: [
    "Ask someone for help today. A real ask, not a hint.",
    "Say no to one request without explaining why.",
    "Spend 30 minutes doing something just for yourself.",
    "Let someone struggle without stepping in to help.",
    "Name one thing you need out loud to someone.",
  ],
  3: [
    "Do something today with no audience. Tell no one.",
    "Rest for 10 minutes without calling it 'recharging to be productive.'",
    "Share one thing you failed at recently, without spinning it.",
    "Ask someone how they are and actually listen without thinking about yourself.",
    "Let a conversation end without making sure the other person was impressed.",
  ],
  4: [
    "Do one completely ordinary thing and pay full attention to it.",
    "Notice a moment of contentment and do not dismiss it as shallow.",
    "Tell someone something positive without adding a qualifier.",
    "Complete a small task without waiting for inspiration.",
    "Go through one hour without comparing your experience to anyone else's.",
  ],
  5: [
    "Share an unfinished thought with someone today.",
    "Respond to a message within 5 minutes instead of waiting.",
    "Do something physical: walk, stretch, cook. Stay in your body.",
    "Offer your opinion in a conversation without being asked.",
    "Say yes to a social invitation you would normally decline.",
  ],
  6: [
    "Make one small decision today without researching or asking anyone.",
    "Notice a worry and ask: is this danger real right now, or is it the pattern?",
    "Trust your first instinct on something instead of second-guessing.",
    "Do one thing that makes you slightly uncomfortable without preparing for it.",
    "Compliment yourself on one thing you handled well.",
  ],
  7: [
    "Stay with one activity 10 minutes longer than your instinct says.",
    "Sit with a boring moment without reaching for your phone.",
    "Let a conversation go deep instead of steering it toward something lighter.",
    "Notice when you start planning the next thing and stay with this thing.",
    "Feel one uncomfortable emotion for 30 seconds without reframing or escaping.",
  ],
  8: [
    "Let someone else lead a conversation you would normally control.",
    "Tell one person one small vulnerable truth.",
    "Ask for help in a way that does not position you as strong.",
    "Soften your voice in one interaction today.",
    "Admit that something hurt you, to yourself or to someone else.",
  ],
  9: [
    "State one preference out loud. Not a demand. Just a preference.",
    "Disagree with someone about something that matters, even mildly.",
    "Choose what to eat without asking what everyone else wants first.",
    "Notice one moment where you merged and name what you actually thought.",
    "Start one thing you have been putting off. Just the first step.",
  ],
};

export default function PracticeOfOpposite({ enneagramType }: { enneagramType: number }) {
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const today = getDateKey();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(`psyche-opposite-${today}`)) setDone(true);
  }, [today]);

  if (done || dismissed || !enneagramType) return null;

  const challenges = CHALLENGES[enneagramType] ?? [];
  if (!challenges.length) return null;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const challenge = challenges[dayOfYear % challenges.length];

  function complete() {
    try { localStorage.setItem(`psyche-opposite-${today}`, "1"); } catch {}
    setDone(true);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(217,70,239,0.06)", border: "1px solid rgba(217,70,239,0.18)" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-fuchsia-400" />
          <p className="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">Practice the opposite</p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-[11px] opacity-40">Skip</button>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.88)" }}>{challenge}</p>
      <button onClick={complete}
        className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
        style={{ background: "rgba(217,70,239,0.1)", border: "1px solid rgba(217,70,239,0.25)", color: "#f0abfc" }}>
        <Check className="w-3 h-3" /> I did it (or I will)
      </button>
    </motion.div>
  );
}
