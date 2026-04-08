"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

// ── Questions ─────────────────────────────────────────────────────────────────
// Each question targets one type's CORE MOTIVATION (not surface behavior).
// Scoring: A = +2 for target type. B = +1 for types that most commonly answer B.
// Based on Riso-Hudson, Naranjo, and Chestnut frameworks.

const questions: {
  type: number;
  text: string;
  a: string;
  b: string;
  bScores: number[]; // types that resonate with the B answer
}[] = [
  {
    type: 1,
    text: "Internally, there is often a voice telling you...",
    a: "...that something is not quite right and needs to be corrected, including yourself.",
    b: "...that things are fine as they are, or that there are more interesting things to focus on.",
    bScores: [7, 9],
  },
  {
    type: 2,
    text: "In close relationships, you tend to feel most yourself when...",
    a: "...you are needed, and people turn to you. Being indispensable feels meaningful.",
    b: "...you are understood on your own terms, not because of what you do for others.",
    bScores: [4, 5],
  },
  {
    type: 3,
    text: "When you enter a new environment, you naturally...",
    a: "...read what is valued there and present the version of yourself that fits.",
    b: "...show up the same way regardless, and let others adjust to who you are.",
    bScores: [1, 8],
  },
  {
    type: 4,
    text: "There is often a quiet sense that...",
    a: "...something essential is missing from your life, even when things are objectively good.",
    b: "...what you have is enough, or that the next goal is right around the corner.",
    bScores: [7, 9],
  },
  {
    type: 5,
    text: "When you feel overwhelmed, your first instinct is to...",
    a: "...withdraw, observe, and process alone. Social demands drain you when you are already depleted.",
    b: "...stay in the situation, talk it out, or find stimulation that breaks the feeling.",
    bScores: [2, 7],
  },
  {
    type: 6,
    text: "When it comes to trust, you tend to...",
    a: "...question, test, and take time. Trust is earned through consistency, not assumed.",
    b: "...extend it fairly readily, going on instinct and adjusting later if needed.",
    bScores: [7, 8],
  },
  {
    type: 7,
    text: "When pain, boredom, or difficulty comes up, you usually...",
    a: "...reframe it, find the upside, or pivot toward something more stimulating.",
    b: "...sit with it. Avoiding it would feel like avoiding the truth of the situation.",
    bScores: [1, 4],
  },
  {
    type: 8,
    text: "In conflict or confrontation, you typically...",
    a: "...move toward it. You feel more alive in direct confrontation than in avoidance.",
    b: "...weigh it carefully and often let it go, especially if the relationship matters.",
    bScores: [9, 2],
  },
  {
    type: 9,
    text: "When your opinion differs from someone close to you, you tend to...",
    a: "...soften or withhold it to preserve the peace. The discomfort of conflict outweighs being right.",
    b: "...say what you think. Keeping your view to yourself would feel like a compromise of who you are.",
    bScores: [1, 8],
  },
];

// ── Type info ─────────────────────────────────────────────────────────────────

const typeInfo: Record<number, {
  name: string;
  tagline: string;
  description: string;
  color: string;
  glow: string;
}> = {
  1: {
    name: "The Reformer",
    tagline: "Principled. Purposeful. Self-controlled.",
    description: "You have a strong internal sense of right and wrong and hold yourself to a high standard. You notice what could be better and feel a quiet responsibility to fix it. Your inner critic is active, but so is your integrity.",
    color: "#facc15",
    glow: "rgba(234,179,8,0.2)",
  },
  2: {
    name: "The Helper",
    tagline: "Caring. Generous. Attuned to others.",
    description: "You are wired to sense what people need, often before they say it. You give freely and warmly, but underneath there is a deep need to feel needed and loved. Your warmth is real, and so is the cost of neglecting yourself.",
    color: "#f87171",
    glow: "rgba(239,68,68,0.18)",
  },
  3: {
    name: "The Achiever",
    tagline: "Driven. Adaptable. Image-conscious.",
    description: "You are highly effective and know how to read a room. You shape how others perceive you and push relentlessly toward success. Beneath the achievement is a fear that your worth depends entirely on your performance.",
    color: "#fb923c",
    glow: "rgba(249,115,22,0.2)",
  },
  4: {
    name: "The Individualist",
    tagline: "Sensitive. Authentic. Longing for depth.",
    description: "You experience life with unusual emotional depth. You long for something you cannot quite name and sometimes feel that others have something you are missing. Your authenticity and inner richness are your greatest gifts.",
    color: "#a78bfa",
    glow: "rgba(139,92,246,0.25)",
  },
  5: {
    name: "The Investigator",
    tagline: "Perceptive. Private. Knowledge-seeking.",
    description: "You observe more than you participate. You need to understand before you act and guard your energy carefully. Your mind is your sanctuary, and depth of knowledge is how you feel capable and secure.",
    color: "#38bdf8",
    glow: "rgba(14,165,233,0.2)",
  },
  6: {
    name: "The Loyalist",
    tagline: "Committed. Vigilant. Security-seeking.",
    description: "You are acutely attuned to risk and deeply loyal to those who earn your trust. You question, prepare, and anticipate, but once you commit, you are steadfast. Your vigilance protects the people you love.",
    color: "#fbbf24",
    glow: "rgba(234,179,8,0.2)",
  },
  7: {
    name: "The Enthusiast",
    tagline: "Spontaneous. Optimistic. Possibility-driven.",
    description: "You are wired for what is next. You move toward stimulation and away from pain with remarkable ease. Your optimism and energy are infectious, and your deepest challenge is learning to stay when things get hard.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
  },
  8: {
    name: "The Challenger",
    tagline: "Powerful. Direct. Fiercely protective.",
    description: "You move through the world with force and clarity. You protect the people you love, challenge injustice head-on, and have no patience for weakness or dishonesty. Vulnerability is the one territory you avoid.",
    color: "#f87171",
    glow: "rgba(239,68,68,0.22)",
  },
  9: {
    name: "The Peacemaker",
    tagline: "Receptive. Calming. Self-forgetting.",
    description: "You bring calm to chaos and can genuinely see all sides of a situation. You merge with others so naturally that you sometimes lose track of your own desires. Your presence steadies everyone around you.",
    color: "#6ee7b7",
    glow: "rgba(52,211,153,0.15)",
  },
};

// ── Quiz screen ───────────────────────────────────────────────────────────────

function QuizScreen({
  question,
  index,
  total,
  onAnswer,
}: {
  question: typeof questions[0];
  index: number;
  total: number;
  onAnswer: (choice: "a" | "b") => void;
}) {
  const [selected, setSelected] = useState<"a" | "b" | null>(null);
  const progress = (index / total) * 100;

  const handleSelect = (choice: "a" | "b") => {
    if (selected) return;
    setSelected(choice);
    setTimeout(() => onAnswer(choice), 600);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="w-full max-w-lg mx-auto px-4 flex flex-col"
    >
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
            {index + 1} of {total}
          </span>
          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5)" }}
            initial={{ width: `${(index / total) * 100}%` }}
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <p className="text-xl sm:text-2xl font-serif font-semibold mb-8 text-center leading-snug" style={{ color: "rgba(255,255,255,0.93)" }}>
        {question.text}
      </p>

      {/* Answer cards */}
      <div className="flex flex-col gap-4">
        {(["a", "b"] as const).map((choice) => {
          const text = choice === "a" ? question.a : question.b;
          const isSelected = selected === choice;
          const isOther = selected !== null && selected !== choice;

          return (
            <motion.button
              key={choice}
              onClick={() => handleSelect(choice)}
              animate={{
                opacity: isOther ? 0.35 : 1,
                scale: isSelected ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="w-full text-left p-5 rounded-2xl transition-all"
              style={{
                background: isSelected
                  ? "rgba(124,58,237,0.25)"
                  : "rgba(255,255,255,0.05)",
                border: isSelected
                  ? "2px solid rgba(167,139,250,0.6)"
                  : "2px solid rgba(255,255,255,0.09)",
                boxShadow: isSelected
                  ? "0 0 24px rgba(124,58,237,0.2)"
                  : "none",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-xs font-bold mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: isSelected ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.08)",
                    color: isSelected ? "#a78bfa" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {choice.toUpperCase()}
                </span>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: isSelected ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.7)" }}>
                  {text}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Result type card ──────────────────────────────────────────────────────────

function TypeCard({
  typeNum,
  isPrimary,
}: {
  typeNum: number;
  isPrimary: boolean;
}) {
  const [open, setOpen] = useState(isPrimary);
  const info = typeInfo[typeNum];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: isPrimary ? `linear-gradient(135deg, rgba(15,10,30,0.9), rgba(15,10,30,0.7))` : "rgba(255,255,255,0.04)",
        border: isPrimary ? `1px solid ${info.color}40` : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isPrimary ? `0 8px 40px ${info.glow}` : "none",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        {/* Type number badge */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg"
          style={{
            background: isPrimary ? `${info.color}20` : "rgba(255,255,255,0.06)",
            color: isPrimary ? info.color : "rgba(255,255,255,0.5)",
            border: isPrimary ? `1px solid ${info.color}40` : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {typeNum}
        </div>

        <div className="flex-1 min-w-0">
          {isPrimary && (
            <div className="text-xs font-semibold mb-0.5" style={{ color: info.color }}>
              Most likely
            </div>
          )}
          <div className="font-serif font-bold" style={{ color: isPrimary ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)", fontSize: isPrimary ? "1.1rem" : "1rem" }}>
            Type {typeNum}. {info.name}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {info.tagline}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {info.description}
                </p>
                <Link
                  href={`/enneagram/${typeNum}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4 transition-all hover:gap-2.5"
                  style={{ color: isPrimary ? info.color : "#a78bfa" }}
                >
                  Explore Type {typeNum} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────────────────────────

function ResultScreen({
  scores,
  onRetake,
}: {
  scores: Record<number, number>;
  onRetake: () => void;
}) {
  const sorted = Object.entries(scores)
    .map(([type, score]) => ({ type: Number(type), score }))
    .sort((a, b) => b.score - a.score);

  const primary = sorted[0];
  const alsoConsider = sorted.slice(1, 3).filter((t) => t.score > 0);
  const primaryInfo = typeInfo[primary.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto px-4 pb-16"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 font-bold text-3xl font-serif"
          style={{
            background: `${primaryInfo.color}18`,
            border: `2px solid ${primaryInfo.color}40`,
            color: primaryInfo.color,
            boxShadow: `0 12px 40px ${primaryInfo.glow}`,
          }}
        >
          {primary.type}
        </motion.div>

        <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Your quick result
        </p>
        <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>
          Type {primary.type}, {primaryInfo.name}
        </h1>
        <p className="text-sm" style={{ color: primaryInfo.color }}>
          {primaryInfo.tagline}
        </p>
      </div>

      {/* Primary type card */}
      <div className="mb-3">
        <TypeCard typeNum={primary.type} isPrimary={true} />
      </div>

      {/* Could also be */}
      {alsoConsider.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3 px-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            Could also be
          </p>
          <div className="flex flex-col gap-2">
            {alsoConsider.map((t) => (
              <TypeCard key={t.type} typeNum={t.type} isPrimary={false} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-center mb-6 px-4" style={{ color: "rgba(255,255,255,0.3)" }}>
        This is a quick screen, not a diagnosis. The full assessment gives you a confirmed type, subtype, and cognitive function stack.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Link
          href="/assessments"
          className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5 text-white"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
          }}
        >
          Go deeper
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          onClick={onRetake}
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl font-medium transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retake
        </button>
      </div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function QuickAssessPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  });
  const [phase, setPhase] = useState<"quiz" | "result">("quiz");

  const handleAnswer = (choice: "a" | "b") => {
    const q = questions[currentQ];
    setScores((prev) => {
      const next = { ...prev };
      if (choice === "a") {
        next[q.type] = (next[q.type] || 0) + 2;
      } else {
        // B answer scores +1 for each type that commonly gives this answer
        for (const t of q.bScores) {
          next[t] = (next[t] || 0) + 1;
        }
      }
      return next;
    });

    if (currentQ < questions.length - 1) {
      setCurrentQ((n) => n + 1);
    } else {
      setPhase("result");
    }
  };

  const handleRetake = () => {
    setScores({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
    setCurrentQ(0);
    setPhase("quiz");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0f0a1e" }}
    >
      {/* Aurora orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-16 pt-24">
        <AnimatePresence mode="wait">
          {phase === "quiz" ? (
            <QuizScreen
              key={currentQ}
              question={questions[currentQ]}
              index={currentQ}
              total={questions.length}
              onAnswer={handleAnswer}
            />
          ) : (
            <ResultScreen
              key="result"
              scores={scores}
              onRetake={handleRetake}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
