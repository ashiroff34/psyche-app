"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle } from "lucide-react";

// ─── Glossary definitions ─────────────────────────────────────────────────────

const glossary: Record<string, { title: string; body: string; learnMore?: string }> = {
  wing: {
    title: "Wing",
    body: "Your wing is the type adjacent to yours on the Enneagram circle that most influences your personality. Every type has two possible wings, for example, a Type 4 can be a 4w3 (influenced by Type 3) or a 4w5 (influenced by Type 5). Most people lean toward one wing.",
  },
  instinct: {
    title: "Instinct Variant",
    body: "The three instincts (Self-Preservation, Social, and Sexual/One-to-One) are biological drives that shape HOW your Enneagram type expresses itself. Your dominant instinct is the one you focus on most, often to the point of obsession. The same Enneagram type looks quite different across the three instincts.",
  },
  subtype: {
    title: "Subtype",
    body: "Your subtype is the combination of your Enneagram type and dominant instinct. There are 27 subtypes total (9 types × 3 instincts). Subtypes explain why two people of the same type can seem completely different from each other.",
  },
  tritype: {
    title: "Tritype",
    body: "Tritype identifies your dominant type in each of the three centers (Head, Heart, Body). For example, a 479 means Type 4 (Heart center), Type 7 (Head center), Type 9 (Body center). Your tritype describes which types you rely on as backup strategies.",
  },
  "cognitive functions": {
    title: "Cognitive Functions",
    body: "Cognitive functions are 8 mental processes (like Introverted Intuition, Extroverted Feeling, etc.) that describe HOW you think and perceive the world, not just what you prefer. They go deeper than MBTI letters by describing the actual patterns in your mind.",
  },
  "cognitive stack": {
    title: "Cognitive Stack",
    body: "Your cognitive stack is the order in which your 8 cognitive functions operate. Your top 2 are your strongest, you use them naturally. Functions 3,4 are supportive. Functions 5,8 are your 'shadow', less conscious and harder to access.",
  },
  shadow: {
    title: "Shadow Functions",
    body: "Shadow functions are your four least-developed cognitive functions. They operate largely unconsciously and often emerge as blind spots, projections, or defensive reactions under stress. Understanding your shadow helps you grow beyond your default patterns.",
  },
  xp: {
    title: "XP (Experience Points)",
    body: "XP measures your learning progress. You earn XP by completing daily practice, quizzes, and readings. As your XP grows, your level increases and you unlock new leagues and badges. Bonus XP multipliers (2x, 3x) can appear randomly.",
  },
  tokens: {
    title: "Tokens",
    body: "Tokens are the in-app currency you earn through readings, quests, and daily practice. Use them in the Shop to buy streak freezes (protect your streak if you miss a day), revive your pet, buy extra hearts, and more.",
  },
  streak: {
    title: "Streak",
    body: "Your streak counts consecutive days of completing at least one activity. Missing a day resets it to zero, unless you use a Streak Freeze. Streaks unlock special badges and show your consistency over time.",
  },
  hearts: {
    title: "Hearts (Lives)",
    body: "Hearts represent your lives during quizzes. You lose one heart for each wrong answer. When you run out, you'll need to wait for them to refill (1 per 30 min) or buy more with tokens. Correct answers never cost hearts.",
  },
  league: {
    title: "Leagues",
    body: "Leagues track your overall progress level: Bronze → Silver → Gold → Platinum → Diamond. You advance by earning XP over time. Leagues are just milestones, there's no competition with other users.",
  },
  "integration line": {
    title: "Integration / Growth Line",
    body: "Your integration (growth) line points to the type you take on positive qualities from when you're healthy and growing. For example, Type 4 integrates toward Type 1, becoming more disciplined and grounded.",
  },
  "disintegration line": {
    title: "Disintegration / Stress Line",
    body: "Your disintegration (stress) line points to the type you take on negative qualities from when under stress. For example, Type 4 disintegrates toward Type 2, becoming clingy and needy. Recognizing this pattern is a key tool for self-awareness.",
  },
  ieq9: {
    title: "iEQ9",
    body: "The iEQ9 (Integrative Enneagram Questionnaire) is one of the most scientifically validated Enneagram assessments. It measures core motivation and fear rather than surface behavior, making it more accurate than traditional tests.",
  },
  wepss: {
    title: "WEPSS",
    body: "The Wagner Enneagram Personality Style Scales (WEPSS) is a validated research instrument for assessing Enneagram type. It measures healthy, average, and unhealthy traits for each type.",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface GlossaryTipProps {
  term: keyof typeof glossary;
  children?: React.ReactNode;
  inline?: boolean; // show term text inline (default: just show ? icon)
}

export default function GlossaryTip({ term, children, inline = false }: GlossaryTipProps) {
  const [open, setOpen] = useState(false);
  const entry = glossary[term];
  if (!entry) return null;

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        className={`inline-flex items-center gap-1 ${inline ? "text-slate-600 underline decoration-dotted underline-offset-2" : ""}`}
        aria-label={`What is ${entry.title}?`}
      >
        {inline && <span className="text-sm">{children ?? entry.title}</span>}
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-500 transition-colors shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[80]"
              onClick={() => setOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[90] max-w-lg mx-auto rounded-t-3xl shadow-2xl p-6 pb-10" style={{ background: "rgba(20,15,40,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.2)" }}>
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{entry.title}</h3>
                </div>
                <button onClick={() => setOpen(false)} className="transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{entry.body}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
