"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { enneagramTypes } from "@/data/enneagram";
import { useProfile } from "@/hooks/useProfile";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Side {
  text: string;
  types: Partial<Record<number, number>>;
}

interface Pair {
  id: number;
  category: string;
  a: Side;
  b: Side;
}

const PAIRS: Pair[] = [
  {
    id: 1, category: "Core Drive",
    a: { text: "I need things to be done right", types: { 1: 3, 6: 1 } },
    b: { text: "I need to feel connected to others", types: { 2: 3, 9: 1 } },
  },
  {
    id: 2, category: "Under Stress",
    a: { text: "I pull back and get quiet", types: { 4: 2, 5: 3, 9: 1 } },
    b: { text: "I push harder and take charge", types: { 3: 2, 8: 3, 1: 1 } },
  },
  {
    id: 3, category: "What You Fear",
    a: { text: "Being controlled or taken advantage of", types: { 8: 3, 6: 2 } },
    b: { text: "Being ordinary or without meaning", types: { 4: 3, 3: 2 } },
  },
  {
    id: 4, category: "How You Help",
    a: { text: "By giving people what they need emotionally", types: { 2: 3, 9: 2 } },
    b: { text: "By solving the problem efficiently", types: { 5: 2, 1: 2, 3: 2 } },
  },
  {
    id: 5, category: "Inner World",
    a: { text: "My mind is always analyzing, planning, or anticipating", types: { 5: 2, 6: 3, 7: 2 } },
    b: { text: "My body and gut lead. I act first, think later", types: { 8: 3, 9: 2, 1: 1 } },
  },
  {
    id: 6, category: "What Energizes You",
    a: { text: "Deep one-on-one conversations", types: { 4: 2, 5: 2, 2: 1 } },
    b: { text: "New experiences and adventures", types: { 7: 3, 3: 1 } },
  },
  {
    id: 7, category: "Core Fear",
    a: { text: "I fear being abandoned or unloved", types: { 2: 3, 4: 2, 6: 1 } },
    b: { text: "I fear being seen as weak or incompetent", types: { 8: 2, 3: 3, 5: 1 } },
  },
  {
    id: 8, category: "Attention Goes To",
    a: { text: "What could go wrong. I'm always scanning for threats", types: { 6: 3, 1: 1 } },
    b: { text: "What could go right. I'm naturally optimistic", types: { 7: 3, 2: 1, 9: 1 } },
  },
  {
    id: 9, category: "Conflict Style",
    a: { text: "I avoid conflict and smooth things over", types: { 9: 3, 2: 1 } },
    b: { text: "I lean into conflict. it doesn't scare me", types: { 8: 3, 1: 2 } },
  },
  {
    id: 10, category: "Identity",
    a: { text: "I know myself through what I've achieved", types: { 3: 3, 8: 1 } },
    b: { text: "I know myself through how I feel", types: { 4: 3, 2: 1 } },
  },
  {
    id: 11, category: "Need",
    a: { text: "I need space and privacy to recharge", types: { 5: 3, 4: 1, 9: 1 } },
    b: { text: "I need people around me to feel alive", types: { 2: 2, 7: 2, 3: 1 } },
  },
  {
    id: 12, category: "Under Pressure",
    a: { text: "I get perfectionistic and critical", types: { 1: 3, 3: 1 } },
    b: { text: "I get scattered and distracted", types: { 7: 3, 4: 1 } },
  },
  {
    id: 13, category: "Core Belief",
    a: { text: "The world is safe if I'm prepared", types: { 6: 3, 1: 1, 5: 1 } },
    b: { text: "The world is abundant if I stay open", types: { 7: 3, 9: 1 } },
  },
  {
    id: 14, category: "What Matters",
    a: { text: "Loyalty and trustworthiness above all", types: { 6: 3, 2: 1, 9: 1 } },
    b: { text: "Authenticity and originality above all", types: { 4: 3, 5: 1 } },
  },
  {
    id: 15, category: "Self-Image",
    a: { text: "I see myself as someone who makes things happen", types: { 3: 3, 8: 2 } },
    b: { text: "I see myself as someone who understands things", types: { 5: 3, 1: 1 } },
  },
  {
    id: 16, category: "Relationships",
    a: { text: "I give more than I take in relationships", types: { 2: 3, 9: 2 } },
    b: { text: "I need relationships on my own terms", types: { 5: 2, 8: 2, 4: 1 } },
  },
  {
    id: 17, category: "Emotional Pattern",
    a: { text: "I feel things intensely and sit with them", types: { 4: 3, 2: 1 } },
    b: { text: "I keep moving so I don't have to feel them", types: { 7: 3, 3: 2 } },
  },
  {
    id: 18, category: "Deepest Fear",
    a: { text: "That I'm fundamentally flawed at my core", types: { 4: 2, 1: 3 } },
    b: { text: "That the world will take more than I can give", types: { 5: 3, 9: 1 } },
  },
  {
    id: 19, category: "What You Resist",
    a: { text: "Being told what to do", types: { 8: 3, 4: 1, 6: 1 } },
    b: { text: "Being left out or forgotten", types: { 2: 2, 3: 2, 6: 1 } },
  },
  {
    id: 20, category: "Life Orientation",
    a: { text: "I merge with others. their reality becomes mine", types: { 9: 3, 2: 1 } },
    b: { text: "I stand apart. I need my distinct perspective", types: { 4: 2, 5: 2, 8: 1 } },
  },
];

// Max possible score for a single type across all pairs (used for confidence)
function computeMaxPossibleScore(): number {
  let max = 0;
  for (let t = 1; t <= 9; t++) {
    let total = 0;
    for (const pair of PAIRS) {
      const wa = (pair.a.types[t] ?? 0);
      const wb = (pair.b.types[t] ?? 0);
      total += Math.max(wa, wb);
    }
    if (total > max) max = total;
  }
  return max;
}
const MAX_POSSIBLE = computeMaxPossibleScore();

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ThisOrThatResult {
  type: number;
  runnerUp: number;
  confidence: number;
  scores: Record<number, number>;
}

interface Props {
  onComplete: (result: ThisOrThatResult) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTypeColor(typeNum: number): string {
  const t = enneagramTypes.find((e) => e.number === typeNum);
  return t?.color ?? "#7c3aed";
}

function getTypeName(typeNum: number): string {
  const t = enneagramTypes.find((e) => e.number === typeNum);
  return t?.name ?? `Type ${typeNum}`;
}

function getTypeBrief(typeNum: number): string {
  const t = enneagramTypes.find((e) => e.number === typeNum);
  return t?.brief ?? "";
}

function topTypes(scores: Record<number, number>): { type: number; score: number }[] {
  return Object.entries(scores)
    .map(([t, s]) => ({ type: parseInt(t), score: s }))
    .sort((a, b) => b.score - a.score);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ThisOrThat({ onComplete }: Props) {
  const { recordAssessment, addXP } = useProfile();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  });
  const [flashSide, setFlashSide] = useState<"a" | "b" | null>(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<ThisOrThatResult | null>(null);

  const pair = PAIRS[currentIndex];
  const progress = currentIndex / PAIRS.length;

  const handlePick = useCallback((side: "a" | "b") => {
    if (flashSide !== null) return; // debounce

    const chosen = side === "a" ? pair.a : pair.b;

    // Flash animation, then advance
    setFlashSide(side);

    setTimeout(() => {
      const newScores = { ...scores };
      for (const [typeStr, weight] of Object.entries(chosen.types)) {
        const t = parseInt(typeStr);
        newScores[t] = (newScores[t] ?? 0) + (weight as number);
      }
      setScores(newScores);
      setFlashSide(null);

      if (currentIndex + 1 >= PAIRS.length) {
        // Compute result
        const sorted = topTypes(newScores);
        const topType = sorted[0].type;
        const topScore = sorted[0].score;
        const runnerUp = sorted[1]?.type ?? topType;
        const rawConf = Math.round((topScore / MAX_POSSIBLE) * 100);
        const confidence = Math.min(rawConf, 55);

        const finalResult: ThisOrThatResult = {
          type: topType,
          runnerUp,
          confidence,
          scores: newScores,
        };

        recordAssessment("quick", confidence, topType);
        addXP(30, "this-or-that-complete");

        setResult(finalResult);
        setDone(true);
        onComplete(finalResult);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 420);
  }, [flashSide, pair, scores, currentIndex, recordAssessment, addXP, onComplete]);

  // ── Result Screen ──────────────────────────────────────────────────────────
  if (done && result) {
    return <ResultScreen result={result} />;
  }

  // ── Quiz Screen ────────────────────────────────────────────────────────────
  const ranked = topTypes(scores).slice(0, 3);
  const totalScored = ranked.reduce((s, e) => s + e.score, 0);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0f0a1e" }}
    >
      {/* Thin progress bar at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7)" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-4 pb-8 max-w-lg mx-auto w-full" style={{ paddingTop: "148px" }}>
        {/* Question counter */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2"
        >
          <span className="text-4xl font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
            {currentIndex + 1}
          </span>
          <span className="text-2xl font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
            {" "}/{" "}{PAIRS.length}
          </span>
        </motion.div>

        {/* Category label */}
        <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
          {pair.category}
        </p>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Card A */}
            <ChoiceCard
              text={pair.a.text}
              side="a"
              flash={flashSide === "a"}
              dimmed={flashSide === "b"}
              onPick={() => handlePick("a")}
            />

            {/* OR divider */}
            <div className="flex sm:flex-col items-center justify-center gap-2">
              <div className="flex-1 sm:flex-none h-px sm:h-8 sm:w-px w-8 sm:h-auto" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-xs font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>OR</span>
              <div className="flex-1 sm:flex-none h-px sm:h-8 sm:w-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>

            {/* Card B */}
            <ChoiceCard
              text={pair.b.text}
              side="b"
              flash={flashSide === "b"}
              dimmed={flashSide === "a"}
              onPick={() => handlePick("b")}
            />
          </motion.div>
        </AnimatePresence>

        {/* Live probability bar */}
        {totalScored > 0 && (
          <motion.div
            className="w-full mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xs mb-3 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              Your type is shaping up...
            </p>
            <div className="flex gap-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              {ranked.map(({ type, score }) => {
                const pct = totalScored > 0 ? (score / totalScored) * 100 : 0;
                return (
                  <motion.div
                    key={type}
                    className="h-full rounded-full"
                    style={{ background: getTypeColor(type) }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                );
              })}
            </div>
            <div className="flex gap-3 mt-2 justify-center flex-wrap">
              {ranked.map(({ type, score }, i) => {
                const pct = totalScored > 0 ? Math.round((score / totalScored) * 100) : 0;
                return (
                  <div key={type} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: getTypeColor(type) }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}
                    >
                      Type {type} · {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Choice Card ──────────────────────────────────────────────────────────────

interface ChoiceCardProps {
  text: string;
  side: "a" | "b";
  flash: boolean;
  dimmed: boolean;
  onPick: () => void;
}

function ChoiceCard({ text, flash, dimmed, onPick }: ChoiceCardProps) {
  return (
    <motion.button
      onClick={onPick}
      disabled={flash || dimmed}
      className="flex-1 text-left rounded-2xl p-6 relative overflow-hidden cursor-pointer"
      style={{
        background: flash
          ? "rgba(168,85,247,0.22)"
          : "rgba(255,255,255,0.04)",
        border: flash
          ? "1.5px solid rgba(168,85,247,0.7)"
          : "1.5px solid rgba(255,255,255,0.09)",
        opacity: dimmed ? 0.35 : 1,
        transition: "opacity 0.2s ease, background 0.15s ease, border-color 0.15s ease",
      }}
      whileHover={{ scale: dimmed ? 1 : 1.025 }}
      whileTap={{ scale: 0.97 }}
      animate={flash ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.22 }}
    >
      {/* Flash overlay */}
      {flash && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "rgba(168,85,247,0.15)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
      <p
        className="text-base font-medium leading-snug relative z-10"
        style={{ color: flash ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)" }}
      >
        {text}
      </p>
    </motion.button>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({ result }: { result: ThisOrThatResult }) {
  const { type, runnerUp, confidence, scores } = result;
  const topColor = getTypeColor(type);
  const runnerUpColor = getTypeColor(runnerUp);
  const sorted = topTypes(scores);
  const topScore = sorted[0]?.score ?? 1;
  const runnerUpScore = sorted.find((e) => e.type === runnerUp)?.score ?? 0;
  const showRunnerUp = runnerUp !== type && runnerUpScore / topScore >= 0.8;

  const resultsHref = `/enneagram/results?type=${type}&confidence=${confidence}&assessmentLength=quick&showTwo=${showRunnerUp}&secondType=${runnerUp}`;
  const deeperHref = `/assessments/self-id`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "#0f0a1e" }}
    >
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Low confidence badge */}
        <div className="flex justify-center mb-6">
          <span
            className="text-xs px-3 py-1 rounded-full font-medium tracking-wide"
            style={{
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Low confidence · quick snapshot
          </span>
        </div>

        {/* Top type card */}
        <motion.div
          className="rounded-3xl p-8 mb-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${topColor}22, ${topColor}08)`,
            border: `1.5px solid ${topColor}44`,
          }}
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div
            className="text-8xl font-black mb-2"
            style={{ color: topColor }}
          >
            {type}
          </div>
          <div
            className="text-xl font-semibold mb-3"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {getTypeName(type)}
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {getTypeBrief(type)}
          </p>
        </motion.div>

        {/* Runner-up */}
        {showRunnerUp && (
          <motion.div
            className="rounded-2xl px-5 py-4 mb-6 flex items-center gap-3"
            style={{
              background: `${runnerUpColor}11`,
              border: `1px solid ${runnerUpColor}33`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div
              className="text-2xl font-black"
              style={{ color: runnerUpColor }}
            >
              {runnerUp}
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                Close runner-up
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                Type {runnerUp} · {getTypeName(runnerUp)}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <motion.a
            href={resultsHref}
            className="block w-full py-4 rounded-2xl text-center font-semibold text-sm"
            style={{
              background: `linear-gradient(135deg, ${topColor}cc, ${topColor}99)`,
              color: "#fff",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See Full Results →
          </motion.a>

          <motion.a
            href={deeperHref}
            className="block w-full py-4 rounded-2xl text-center font-semibold text-sm"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.72)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Take a Deeper Assessment →
          </motion.a>
        </div>

        <p
          className="text-xs text-center mt-6 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Binary quick-tests narrow possibilities. they don't confirm type.
          <br />Take a longer assessment to build real confidence.
        </p>
      </motion.div>
    </div>
  );
}
