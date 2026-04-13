"use client";

// Implicit Reaction Time Game (Greenwald IAT 1998, Back et al. 2009)
//
// Measures how automatically someone identifies with type-related concepts.
// Present a word, user taps "resonates" or "doesn't." Speed of response
// reveals implicit identification strength. No questionnaire can capture this.
//
// Embedded in the daily practice. ~30 seconds. Feels like a game, not a test.

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check } from "lucide-react";

const TYPE_WORDS: Record<number, string[]> = {
  1: ["integrity", "correction", "standards", "right", "wrong", "should", "improve", "discipline"],
  2: ["needed", "caring", "helping", "warmth", "giving", "love", "connection", "selfless"],
  3: ["winning", "success", "image", "efficient", "achievement", "admiration", "goals", "performance"],
  4: ["unique", "depth", "longing", "authentic", "misunderstood", "beautiful", "intense", "meaning"],
  5: ["knowledge", "privacy", "observation", "understanding", "competence", "boundaries", "retreat", "thinking"],
  6: ["safety", "loyalty", "doubt", "trust", "preparation", "vigilance", "authority", "certainty"],
  7: ["freedom", "options", "adventure", "excitement", "novelty", "possibilities", "fun", "escape"],
  8: ["control", "strength", "power", "justice", "autonomy", "confrontation", "protect", "intensity"],
  9: ["peace", "harmony", "comfort", "easygoing", "calm", "routine", "merging", "gentle"],
};

// Neutral words for baseline comparison
const NEUTRAL_WORDS = ["table", "window", "Tuesday", "paper", "walking", "clock", "garden", "ordinary"];

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

interface Props {
  enneagramType: number;
}

export default function ReactionTimeGame({ enneagramType }: Props) {
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [started, setStarted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const wordStartRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);
  const [reactions, setReactions] = useState<Array<{ word: string; isTypeWord: boolean; reactionMs: number; resonated: boolean }>>([]);

  // Build today's word list: 4 type words + 4 neutral, shuffled
  const [words] = useState(() => {
    const typeWords = TYPE_WORDS[enneagramType] ?? TYPE_WORDS[1];
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const offset = (dayOfYear * 4) % typeWords.length;
    const selectedType = [0, 1, 2, 3].map(i => ({ word: typeWords[(offset + i) % typeWords.length], isTypeWord: true }));
    const selectedNeutral = [0, 1, 2, 3].map(i => ({ word: NEUTRAL_WORDS[(offset + i) % NEUTRAL_WORDS.length], isTypeWord: false }));
    // Interleave
    const mixed = [...selectedType, ...selectedNeutral];
    for (let i = mixed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
    }
    return mixed;
  });

  useEffect(() => {
    const today = getDateKey();
    if (typeof window === "undefined") return;
    if (localStorage.getItem(`psyche-reaction-${today}`)) setDone(true);
  }, []);

  useEffect(() => {
    if (started && !showWord && wordIdx < words.length) {
      const delay = 400 + Math.random() * 300; // variable delay before showing word
      const t = setTimeout(() => {
        setShowWord(true);
        wordStartRef.current = performance.now();
      }, delay);
      return () => clearTimeout(t);
    }
  }, [started, showWord, wordIdx, words.length]);

  function respond(resonated: boolean) {
    const reactionMs = Math.round(performance.now() - wordStartRef.current);
    const newReactions = [...reactions, {
      word: words[wordIdx].word,
      isTypeWord: words[wordIdx].isTypeWord,
      reactionMs,
      resonated,
    }];
    setReactions(newReactions);
    setShowWord(false);

    if (wordIdx < words.length - 1) {
      setWordIdx(wordIdx + 1);
    } else {
      // Done, save results
      const today = getDateKey();
      try {
        // Compute avg reaction time for type words vs neutral
        const typeReactions = newReactions.filter(r => r.isTypeWord);
        const neutralReactions = newReactions.filter(r => !r.isTypeWord);
        const avgType = typeReactions.length ? Math.round(typeReactions.reduce((a, b) => a + b.reactionMs, 0) / typeReactions.length) : 0;
        const avgNeutral = neutralReactions.length ? Math.round(neutralReactions.reduce((a, b) => a + b.reactionMs, 0) / neutralReactions.length) : 0;
        const implicitStrength = avgNeutral > 0 ? Math.round(((avgNeutral - avgType) / avgNeutral) * 100) : 0;

        const result = { date: today, type: enneagramType, avgTypeMs: avgType, avgNeutralMs: avgNeutral, implicitStrength, reactions: newReactions };
        localStorage.setItem(`psyche-reaction-${today}`, JSON.stringify(result));

        // Append to history
        const hist = JSON.parse(localStorage.getItem("psyche-reaction-history") || "[]");
        hist.push({ date: today, avgTypeMs: avgType, avgNeutralMs: avgNeutral, implicitStrength });
        localStorage.setItem("psyche-reaction-history", JSON.stringify(hist.slice(-90)));
      } catch {}
      if (mountedRef.current) setDone(true);
    }
  }

  if (dismissed || !enneagramType) return null;

  if (done) {
    // Show result
    const today = getDateKey();
    let result: any = null;
    try {
      const raw = localStorage.getItem(`psyche-reaction-${today}`);
      if (raw) result = JSON.parse(raw);
    } catch {}

    if (!result) return null;

    return (
      <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-4 h-4 text-indigo-400" />
          <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Reaction time, logged</p>
        </div>
        <p className="text-sm opacity-75">
          Type words: {result.avgTypeMs}ms avg. Neutral words: {result.avgNeutralMs}ms avg.
          {result.implicitStrength > 10 && (
            <span className="text-indigo-300"> You respond {result.implicitStrength}% faster to type-related concepts. Your pattern runs deep.</span>
          )}
          {result.implicitStrength <= 10 && result.implicitStrength >= -10 && (
            <span> Similar speed for both. Your identification is flexible.</span>
          )}
          {result.implicitStrength < -10 && (
            <span> You actually respond faster to neutral words. Interesting. Your type identification may be less automatic than expected.</span>
          )}
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)" }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Reaction time</p>
          </div>
          <button onClick={() => setDismissed(true)} className="text-[11px] opacity-40">Skip</button>
        </div>
        <p className="text-sm opacity-70 mb-3">8 words will flash. Tap "resonates" or "doesn't." Go fast. ~20 seconds.</p>
        <button onClick={() => setStarted(true)}
          className="w-full py-2 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
          Start
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)" }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">{wordIdx + 1} / {words.length}</p>
      </div>
      <AnimatePresence mode="wait">
        {showWord && (
          <motion.div key={wordIdx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <p className="text-2xl font-bold text-center py-6" style={{ color: "rgba(255,255,255,0.95)" }}>
              {words[wordIdx].word}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => respond(true)}
                className="py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7" }}>
                Resonates
              </button>
              <button onClick={() => respond(false)}
                className="py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                Doesn't
              </button>
            </div>
          </motion.div>
        )}
        {!showWord && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-center py-8 text-lg opacity-30">...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
