"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

// ─── Theory ──────────────────────────────────────────────────────────────────
// Based on the foundational work of:
//   • Oscar Ichazo (triadic centers: gut/heart/head; passions & fixations)
//   • Claudio Naranjo (character structure, 9 core fixations)
//   • Don Riso & Russ Hudson (Levels of Development, triads in Wisdom of the Enneagram)
//   • Helen Palmer (awareness-through-recognition method)
//   • David Daniels & Virginia Price (Essential Enneagram / Stanford research)
//
// Method: triage → triad → type (8-10 questions, 100% tap-based)
// ─────────────────────────────────────────────────────────────────────────────

type Triad = "gut" | "heart" | "head" | null;

interface Question {
  id: string;
  phase: "triage" | "gut" | "heart" | "head";
  text: string;
  sub?: string;
  options: {
    text: string;
    detail?: string;
    triad?: Triad;
    types?: number[];
    weight?: number;
  }[];
}

const triageQuestions: Question[] = [
  {
    id: "t1",
    phase: "triage",
    text: "When life gets hard, what do you most want?",
    sub: "Go with your gut — not what you *should* want",
    options: [
      { text: "To feel safe and prepared", detail: "Knowing what's coming and having a plan", triad: "head" },
      { text: "To feel loved and valued", detail: "To know people truly see and appreciate you", triad: "heart" },
      { text: "To feel in control and respected", detail: "Not to be pushed around or ignored", triad: "gut" },
    ],
  },
  {
    id: "t2",
    phase: "triage",
    text: "When you make a mistake, your first inner feeling is...",
    sub: "Before you can even think — what hits first?",
    options: [
      { text: "Fear", detail: "Worry about what might go wrong because of it", triad: "head" },
      { text: "Shame", detail: "A stab of embarrassment about how you look", triad: "heart" },
      { text: "Anger", detail: "Frustration at yourself or the situation", triad: "gut" },
    ],
  },
  {
    id: "t3",
    phase: "triage",
    text: "People who know you well would say you tend to be...",
    options: [
      { text: "Analytical and careful", detail: "You think things through, prepare, and question", triad: "head" },
      { text: "Feeling and image-aware", detail: "You notice how things land emotionally and socially", triad: "heart" },
      { text: "Action-oriented and direct", detail: "You just do — instinct first, reflect later", triad: "gut" },
    ],
  },
];

const gutQuestions: Question[] = [
  {
    id: "g1",
    phase: "gut",
    text: "Your anger usually shows up as...",
    sub: "Anger is the core emotion of the Gut center (Ichazo)",
    options: [
      { text: "A quiet inner critic", detail: "Resentment that things aren't how they should be", types: [1], weight: 2 },
      { text: "Hot and direct", detail: "You confront it — you don't hide when you're furious", types: [8], weight: 2 },
      { text: "Mostly suppressed", detail: "You go numb, merge with others, avoid the conflict", types: [9], weight: 2 },
    ],
  },
  {
    id: "g2",
    phase: "gut",
    text: "What you want most is...",
    options: [
      { text: "To be good and do the right thing", detail: "To live with integrity and have things be correct", types: [1], weight: 2 },
      { text: "To be strong and self-reliant", detail: "To never be controlled, to protect what matters", types: [8], weight: 2 },
      { text: "To have peace and harmony", detail: "To be okay, to merge, to avoid disruption", types: [9], weight: 2 },
    ],
  },
  {
    id: "g3",
    phase: "gut",
    text: "Your deepest fear is...",
    options: [
      { text: "Being corrupt, wrong, or bad", detail: "Violating your own principles", types: [1], weight: 3 },
      { text: "Being controlled or harmed by others", detail: "Being weak or betrayed", types: [8], weight: 3 },
      { text: "Loss and separation", detail: "The world falling apart, nothing mattering", types: [9], weight: 3 },
    ],
  },
];

const heartQuestions: Question[] = [
  {
    id: "h1",
    phase: "heart",
    text: "Your sense of self mostly comes from...",
    sub: "Shame is the core emotion of the Heart center (Ichazo)",
    options: [
      { text: "Being needed and appreciated", detail: "Knowing people value you for what you give", types: [2], weight: 2 },
      { text: "What you achieve and how you're seen", detail: "Your image, status, and accomplishments", types: [3], weight: 2 },
      { text: "Your unique identity and depth", detail: "Being authentic, different, emotionally real", types: [4], weight: 2 },
    ],
  },
  {
    id: "h2",
    phase: "heart",
    text: "What would devastate you most?",
    options: [
      { text: "Being seen as selfish or uncaring", detail: "People thinking you only help for yourself", types: [2], weight: 2 },
      { text: "Being exposed as a failure or fraud", detail: "Your accomplishments falling apart publicly", types: [3], weight: 2 },
      { text: "Having no identity — being ordinary", detail: "Being unseen, generic, without depth", types: [4], weight: 2 },
    ],
  },
  {
    id: "h3",
    phase: "heart",
    text: "In relationships, you most naturally...",
    options: [
      { text: "Focus on what the other person needs", detail: "Tuning in to them, often before yourself", types: [2], weight: 2 },
      { text: "Put your best self forward", detail: "Presenting your competence and appeal", types: [3], weight: 2 },
      { text: "Look for deep, authentic connection", detail: "Or pull back when it feels too surface-level", types: [4], weight: 2 },
    ],
  },
];

const headQuestions: Question[] = [
  {
    id: "hd1",
    phase: "head",
    text: "When you're anxious, your mind...",
    sub: "Fear is the core emotion of the Head center (Ichazo)",
    options: [
      { text: "Goes deep on one thing", detail: "Researching, analyzing, pulling away to think alone", types: [5], weight: 2 },
      { text: "Scans for what could go wrong", detail: "Questioning, anticipating threats, seeking reassurance", types: [6], weight: 2 },
      { text: "Jumps to future possibilities", detail: "Planning, reframing, imagining what's next", types: [7], weight: 2 },
    ],
  },
  {
    id: "hd2",
    phase: "head",
    text: "What do you most protect?",
    options: [
      { text: "Your private inner world and energy", detail: "You need alone time to recharge and think", types: [5], weight: 2 },
      { text: "Your security and trusted alliances", detail: "Knowing who you can count on, having backup plans", types: [6], weight: 2 },
      { text: "Your freedom and options", detail: "Not being trapped, keeping the future open", types: [7], weight: 2 },
    ],
  },
  {
    id: "hd3",
    phase: "head",
    text: "Your deepest fear is...",
    options: [
      { text: "Being incompetent or without resources", detail: "Not knowing enough, being depleted", types: [5], weight: 3 },
      { text: "Being without support or guidance", detail: "Being alone in a dangerous world", types: [6], weight: 3 },
      { text: "Being trapped in pain or missing out", detail: "Being limited, bored, or deprived of joy", types: [7], weight: 3 },
    ],
  },
];

// ─── Score → type ─────────────────────────────────────────────────────────────

function computeResult(scores: Record<number, number>): { type: number; confidence: number; runnerUp: number } {
  const entries = Object.entries(scores)
    .map(([k, v]) => ({ type: Number(k), score: v }))
    .sort((a, b) => b.score - a.score);
  const top = entries[0];
  const second = entries[1];
  const total = entries.reduce((s, e) => s + e.score, 0);
  const confidence = total > 0 ? Math.round((top.score / total) * 100) : 0;
  return { type: top.type, confidence, runnerUp: second?.type ?? top.type };
}

const typeNames: Record<number, string> = {
  1: "Perfectionist", 2: "Helper", 3: "Achiever",
  4: "Individualist", 5: "Investigator", 6: "Loyalist",
  7: "Enthusiast", 8: "Challenger", 9: "Peacemaker",
};

const typeColors: Record<number, string> = {
  1: "#e11d48", 2: "#f97316", 3: "#eab308",
  4: "#a855f7", 5: "#3b82f6", 6: "#14b8a6",
  7: "#22c55e", 8: "#ef4444", 9: "#94a3b8",
};

const typeTaglines: Record<number, string> = {
  1: "The voice that says things can be better — and won't rest until they are.",
  2: "The heart that gives freely, and aches to be truly seen in return.",
  3: "The achiever who shapes an image to match what the world rewards.",
  4: "The soul searching for what's real — even when it hurts.",
  5: "The observer who retreats to understand before they act.",
  6: "The loyal skeptic who prepares for the worst while hoping for the best.",
  7: "The optimist who keeps the future bright so the present stays bearable.",
  8: "The force that refuses to be controlled or pushed aside.",
  9: "The peacemaker who merges with the world to keep the peace within.",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuickTypeAssessment({
  onComplete,
}: {
  onComplete: (result: { type: number; confidence: number; runnerUp: number }) => void;
}) {
  const [triadScores, setTriadScores] = useState<Record<string, number>>({ gut: 0, heart: 0, head: 0 });
  const [typeScores, setTypeScores] = useState<Record<number, number>>({});
  const [triad, setTriad] = useState<Triad>(null);
  const [phase, setPhase] = useState<"triage" | "gut" | "heart" | "head" | "result">("triage");
  const [qIdx, setQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<{ type: number; confidence: number; runnerUp: number } | null>(null);

  const triageQ = triageQuestions[qIdx];
  const phaseQuestions = phase === "gut" ? gutQuestions : phase === "heart" ? heartQuestions : headQuestions;
  const currentQ = phase === "triage" ? triageQ : phaseQuestions[qIdx];

  const totalQuestions = triageQuestions.length + phaseQuestions.length;
  const answeredCount = phase === "triage" ? qIdx : triageQuestions.length + qIdx;
  const progress = (answeredCount / totalQuestions) * 100;

  function handleSelect(optIdx: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);

    setTimeout(() => {
      const opt = currentQ.options[optIdx];

      if (phase === "triage") {
        const newTriadScores = { ...triadScores };
        if (opt.triad) newTriadScores[opt.triad] = (newTriadScores[opt.triad] || 0) + 1;

        if (qIdx < triageQuestions.length - 1) {
          setTriadScores(newTriadScores);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          // Determine dominant triad
          const dominant = (Object.entries(newTriadScores).sort(([, a], [, b]) => b - a)[0][0]) as Triad;
          setTriad(dominant);
          setPhase(dominant!);
          setQIdx(0);
          setSelectedOption(null);
        }
      } else {
        // Type scoring phase
        const newTypeScores = { ...typeScores };
        (opt.types || []).forEach((t) => {
          newTypeScores[t] = (newTypeScores[t] || 0) + (opt.weight || 1);
        });

        if (qIdx < phaseQuestions.length - 1) {
          setTypeScores(newTypeScores);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          const res = computeResult(newTypeScores);
          setResult(res);
          setPhase("result");
        }
      }
    }, 400);
  }

  if (phase === "result" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto py-10 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-serif font-bold shadow-2xl"
          style={{ backgroundColor: typeColors[result.type], boxShadow: `0 16px 48px ${typeColors[result.type]}50` }}
        >
          {result.type}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">
            Type {result.type}: {typeNames[result.type]}
          </h2>
          <p className="text-sm text-slate-500 italic mb-6 max-w-sm mx-auto leading-relaxed">
            "{typeTaglines[result.type]}"
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${typeColors[result.type]}18`, color: typeColors[result.type] }}>
              {result.confidence}% match
            </div>
            {result.runnerUp !== result.type && (
              <div className="px-3 py-1.5 rounded-full bg-slate-50 text-slate-500 text-xs font-medium">
                Also consider: Type {result.runnerUp}
              </div>
            )}
          </div>

          <button
            onClick={() => onComplete(result)}
            className="w-full py-4 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${typeColors[result.type]}, ${typeColors[result.type]}cc)` }}
          >
            <Check className="w-4 h-4" />
            Save My Type & See Profile
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const progressLabel = phase === "triage"
    ? `Identifying your center (${qIdx + 1}/${triageQuestions.length})`
    : `Narrowing your type (${qIdx + 1}/${phaseQuestions.length})`;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>{progressLabel}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${phase}-${qIdx}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
        >
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-serif font-semibold text-slate-800 mb-1 leading-snug">
              {currentQ.text}
            </h2>
            {currentQ.sub && (
              <p className="text-xs text-slate-400 italic">{currentQ.sub}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-violet-400 bg-violet-50/50"
                      : selectedOption !== null
                      ? "border-slate-100 bg-white opacity-40"
                      : "border-slate-100 bg-white hover:border-violet-200 hover:bg-violet-50/20 active:scale-[0.99]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected ? "border-violet-500 bg-violet-500" : "border-slate-200"
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{opt.text}</p>
                      {opt.detail && (
                        <p className="text-xs text-slate-400 mt-0.5">{opt.detail}</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
