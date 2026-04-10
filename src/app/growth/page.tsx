"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, ChevronRight, RefreshCw, Check, ArrowRight, ArrowLeft, Leaf, Lock, Zap } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import PetCompanion from "@/components/PetCompanion";
import { getTodaysPerspectiveSwap, INTEGRATION_TYPE } from "@/data/perspective-swaps";
import { TYPE_GROWTH_EDGES } from "@/data/growth-edges";
import { getWeeklyWisdom } from "@/data/type-wisdom";
import { getPrediction, SITUATION_CATEGORIES, type SituationCategory } from "@/data/predictive-self";
import { generateAvoidanceInsight, getTimingInsights } from "@/lib/behavioral-signals";
import { getDialogue, DIALOGUE_INTEGRATION_TYPE } from "@/data/shadow-dialogue";
import { TYPE_FORMATION } from "@/data/formation-map";

// ─── Token gate for Enneagram Growth Path ────────────────────────────────────
const ENNEAGRAM_GROWTH_UNLOCK_KEY = "psyche-enneagram-growth-unlocked";
const ENNEAGRAM_GROWTH_UNLOCK_COST = 300;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

function getDailyPrompt(typeNum: number): { prompt: string; promptIndex: number } {
  const type = enneagramTypes.find((t) => t.number === typeNum);
  if (!type || !type.journalPrompts.length) return { prompt: "", promptIndex: 0 };
  const idx = getDayOfYear() % type.journalPrompts.length;
  return { prompt: type.journalPrompts[idx], promptIndex: idx };
}

// ─── Type color map ────────────────────────────────────────────────────────────

const TYPE_GRADIENT: Record<number, string> = {
  1: "from-red-400 to-rose-500",
  2: "from-pink-400 to-rose-400",
  3: "from-amber-400 to-yellow-500",
  4: "from-purple-500 to-violet-600",
  5: "from-blue-500 to-indigo-600",
  6: "from-emerald-500 to-teal-500",
  7: "from-teal-400 to-cyan-500",
  8: "from-orange-500 to-red-500",
  9: "from-slate-400 to-slate-500",
};

const TYPE_BG: Record<number, string> = {
  1: "bg-rose-500/10 border-rose-500/20",
  2: "bg-pink-500/10 border-pink-500/20",
  3: "bg-amber-500/10 border-amber-500/20",
  4: "bg-purple-500/10 border-purple-500/20",
  5: "bg-blue-500/10 border-blue-500/20",
  6: "bg-emerald-500/10 border-emerald-500/20",
  7: "bg-teal-500/10 border-teal-500/20",
  8: "bg-orange-500/10 border-orange-500/20",
  9: "bg-white/5 border-white/10",
};

// ─── Growth Tips per type ─────────────────────────────────────────────────────
// Using the integrationLine insight as the core growth direction.

const GROWTH_THEMES: Record<number, { theme: string; shortDesc: string; integrationNote: string }> = {
  1: { theme: "Serenity", shortDesc: "Release the inner critic. Practice 'good enough.'", integrationNote: "Integrate toward Type 7 → allow joy and spontaneity" },
  2: { theme: "Humility", shortDesc: "Identify and express your own needs without apology.", integrationNote: "Integrate toward Type 4 → connect with your own emotional depth" },
  3: { theme: "Authenticity", shortDesc: "Pause performing. Ask: who am I when no one's watching?", integrationNote: "Integrate toward Type 6 → build genuine trust and cooperation" },
  4: { theme: "Equanimity", shortDesc: "Notice what IS present, not just what's missing.", integrationNote: "Integrate toward Type 1 → take disciplined action without waiting for inspiration" },
  5: { theme: "Engagement", shortDesc: "Move from observer to participant. Trust your adequacy.", integrationNote: "Integrate toward Type 8 → take decisive, embodied action" },
  6: { theme: "Courage", shortDesc: "Trust your inner knowing. Act without needing certainty.", integrationNote: "Integrate toward Type 9 → find inner peace without suppressing real experience" },
  7: { theme: "Sobriety", shortDesc: "Stay with what is. Let difficult feelings complete themselves.", integrationNote: "Integrate toward Type 5 → develop focused depth and stillness" },
  8: { theme: "Openness", shortDesc: "Vulnerability is not weakness. Open where you protect.", integrationNote: "Integrate toward Type 2 → lead with warmth and generosity" },
  9: { theme: "Presence", shortDesc: "Your perspective matters. Practice saying what you want.", integrationNote: "Integrate toward Type 3 → develop your own goals and act on them" },
};

// ─── Type-specific save messages ─────────────────────────────────────────────

const TYPE_GROWTH_MESSAGES: Record<number, string> = {
  1: "Type 1s grow by releasing the inner critic. This reflection matters.",
  2: "Type 2s grow by acknowledging their own needs. You're doing that now.",
  3: "Type 3s grow by valuing being over doing. This moment counts.",
  4: "Type 4s grow when the inner world is expressed, not just felt.",
  5: "Type 5s grow by engaging, not just observing. Well done.",
  6: "Type 6s grow by trusting themselves. This reflection builds that muscle.",
  7: "Type 7s grow by staying present with what is. You just did.",
  8: "Type 8s grow by allowing vulnerability. This is that.",
  9: "Type 9s grow by showing up for themselves first. You did today.",
};

// ─── Enneagram Growth Gate ────────────────────────────────────────────────────

function EnneagramGrowthGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [tokens, setTokens] = useState(0);
  const [spending, setSpending] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(ENNEAGRAM_GROWTH_UNLOCK_KEY) === "true");
      const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
      setTokens(typeof gs.tokens === "number" ? gs.tokens : 0);
    } catch { setUnlocked(false); }
  }, []);

  const handleUnlock = () => {
    if (tokens < ENNEAGRAM_GROWTH_UNLOCK_COST) {
      setErr(`You need ${ENNEAGRAM_GROWTH_UNLOCK_COST - tokens} more tokens. Earn them through daily practice.`);
      return;
    }
    setSpending(true);
    try {
      const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
      gs.tokens = (typeof gs.tokens === "number" ? gs.tokens : 0) - ENNEAGRAM_GROWTH_UNLOCK_COST;
      localStorage.setItem("psyche-game-state", JSON.stringify(gs));
      localStorage.setItem(ENNEAGRAM_GROWTH_UNLOCK_KEY, "true");
      setUnlocked(true);
    } catch { setErr("Something went wrong."); setSpending(false); }
  };

  if (unlocked === null) return <div className="min-h-screen" style={{ background: "#0f0a1e" }} />;
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative min-h-screen overflow-y-auto" style={{ background: "#0f0a1e" }}>
      {/* Blurred preview of actual content */}
      <div
        aria-hidden="true"
        style={{
          filter: "blur(6px)",
          opacity: 0.2,
          pointerEvents: "none",
          userSelect: "none",
          position: "absolute",
          inset: 0,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 80%)",
        }}
      >
        {children}
      </div>

      {/* Lock overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", backdropFilter: "blur(12px)" }}>
            <Leaf className="w-7 h-7" style={{ color: "#34d399" }} />
          </div>
          <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>Enneagram Growth Path</h1>
          <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.52)" }}>
            Type-specific growth prompts, integration practices, and daily reflection rooted in the Enneagram tradition.
          </p>
          <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            No subscription needed. Unlock once with tokens earned through daily practice.
          </p>
          <div className="flex items-center justify-center gap-2 mb-5 px-4 py-2.5 rounded-full"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)", backdropFilter: "blur(8px)" }}>
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-300">{ENNEAGRAM_GROWTH_UNLOCK_COST} tokens</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>· you have {tokens}</span>
          </div>
          {err && <p className="text-xs text-red-400 mb-3">{err}</p>}
          <button
            onClick={handleUnlock}
            disabled={spending || tokens < ENNEAGRAM_GROWTH_UNLOCK_COST}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-50 mb-3"
            style={{ background: "linear-gradient(135deg, #10b981, #0d9488)", boxShadow: "0 4px 24px rgba(16,185,129,0.45)" }}
          >
            {spending ? "Unlocking…" : tokens >= ENNEAGRAM_GROWTH_UNLOCK_COST ? "Unlock Enneagram Growth Path" : "Not enough tokens yet"}
          </button>
          <Link href="/daily" className="block text-xs underline underline-offset-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            Earn tokens through daily practice →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GrowthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [promptIdx, setPromptIdx] = useState(0);
  const [reflectionText, setReflectionText] = useState("");
  const [saved, setSaved] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Load user type from profile + listen for profile changes
  useEffect(() => {
    function loadType() {
      try {
        const raw = localStorage.getItem("psyche-profile");
        if (raw) {
          const p = JSON.parse(raw);
          const t = p.enneagramType ?? p.enneagramCore;
          if (t) {
            setUserType(t);
            setSelectedType(t);
          }
        }
      } catch {}
    }
    loadType();
    window.addEventListener("psyche-profile-change", loadType);
    return () => window.removeEventListener("psyche-profile-change", loadType);
  }, []);

  const activeType = selectedType ?? userType;
  const type = activeType ? enneagramTypes.find((t) => t.number === activeType) : null;
  const growthInfo = activeType ? GROWTH_THEMES[activeType] : null;

  const prompts = type?.journalPrompts ?? [];
  const currentPrompt = prompts[promptIdx] ?? "";

  const cyclePrompt = () => {
    setPromptIdx((i) => (i + 1) % prompts.length);
    setReflectionText("");
    setSaved(false);
  };

  const saveReflection = () => {
    if (!reflectionText.trim()) return;
    try {
      const key = `psyche-growth-${new Date().toISOString().split("T")[0]}-${activeType}`;
      localStorage.setItem(key, JSON.stringify({ type: activeType, prompt: currentPrompt, reflection: reflectionText, savedAt: new Date().toISOString() }));
      setSaved(true);
    } catch {}
  };

  const gradient = activeType ? TYPE_GRADIENT[activeType] : "from-violet-400 to-indigo-500";
  const bgClass = activeType ? TYPE_BG[activeType] : "bg-violet-50 border-violet-100";

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#0f0a1e" }}>
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm mb-4 transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}>
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.93)" }}>Growth Prompts</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Type-specific questions for genuine self-reflection</p>
        </div>

        {/* Type Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Viewing prompts for</span>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-indigo-500 font-medium hover:text-indigo-700 transition-colors"
            >
              {showAll ? "Hide" : "Change type"}
            </button>
          </div>

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pb-1">
                  {enneagramTypes.map((t) => (
                    <button
                      key={t.number}
                      onClick={() => { setSelectedType(t.number); setPromptIdx(0); setReflectionText(""); setSaved(false); setShowAll(false); }}
                      className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${selectedType === t.number ? "border-violet-400" : "border-white/10 hover:border-white/20"}`}
                      style={selectedType === t.number ? { background: "rgba(139,92,246,0.15)" } : { background: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-1"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.number}
                      </div>
                      <span className="text-[9px] font-medium text-center leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>{t.name.replace("The ", "")}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {activeType && type && (
            <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${bgClass}`}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: type.color }}
              >
                {type.number}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.93)" }}>Type {type.number} · {type.name}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{growthInfo?.shortDesc}</p>
              </div>
            </div>
          )}
        </div>

        {activeType && type && growthInfo ? (
          <>
            {/* Growth Theme */}
            <div className={`p-5 rounded-2xl border mb-5 bg-gradient-to-br ${gradient} text-white shadow-md`}>
              <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Growth Theme</div>
              <div className="text-xl font-serif font-bold mb-1">{growthInfo.theme}</div>
              <div className="text-sm text-white/80 leading-relaxed">{growthInfo.integrationNote}</div>
            </div>

            {/* Daily Prompt */}
            <div className="shadow-md rounded-3xl p-6 mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Today's Prompt</span>
                </div>
                <button
                  onClick={cyclePrompt}
                  className="flex items-center gap-1.5 text-xs transition-colors hover:text-violet-400"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Next prompt
                </button>
              </div>

              <p className="text-base font-medium leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.93)" }}>
                {currentPrompt}
              </p>

              {/* Reflection input */}
              <div className="relative">
                <textarea
                  rows={4}
                  placeholder="Write your reflection here... (optional, saved privately)"
                  value={reflectionText}
                  onChange={(e) => { setReflectionText(e.target.value); setSaved(false); }}
                  className="w-full resize-none rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
                />
                <AnimatePresence>
                  {saved && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-3 right-3 flex items-center gap-1 text-xs text-emerald-600 font-semibold"
                    >
                      <Check className="w-3.5 h-3.5" /> Saved
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {reflectionText.trim() && !saved && (
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={saveReflection}
                  className={`mt-3 w-full py-3 rounded-2xl bg-gradient-to-r ${gradient} text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all`}
                >
                  Save Reflection
                </motion.button>
              )}

              {/* Pet companion */}
              <div className="mt-4 rounded-2xl p-3 flex items-start gap-3" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <PetCompanion type={activeType ?? 4} size={48} />
                <div>
                  <p className="text-sm text-violet-300 leading-snug">
                    {saved
                      ? "Your companion feels your growth!"
                      : reflectionText.trim()
                      ? "Keep going, your companion is listening..."
                      : "Your companion waits patiently..."}
                  </p>
                  {saved && activeType && typeof activeType === "number" && TYPE_GROWTH_MESSAGES[activeType] && (
                    <p className="text-xs mt-1.5 italic leading-snug" style={{ color: "rgba(196,181,253,0.7)" }}>
                      {TYPE_GROWTH_MESSAGES[activeType]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* All prompts for this type */}
            <div className="rounded-3xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>All prompts for Type {activeType}</h3>
              <div className="space-y-2">
                {prompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setPromptIdx(i); setReflectionText(""); setSaved(false); }}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl transition-all text-sm ${i === promptIdx ? "font-medium" : "hover:bg-white/5"}`}
                    style={i === promptIdx
                      ? { background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)", color: "#c4b5fd" }
                      : { color: "rgba(255,255,255,0.6)" }}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>
                      {i + 1}
                    </span>
                    <span className="leading-snug">{p}</span>
                    {i === promptIdx && <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Growth tips */}
            <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Growth tips for Type {activeType}</h3>
              <div className="space-y-2">
                {type.growthTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: type.color }} />
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Perspective Swap (Galinsky 2008) ── */}
            {(() => {
              const swap = getTodaysPerspectiveSwap(activeType!);
              const intType = INTEGRATION_TYPE[activeType!];
              if (!swap) return null;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(217,70,239,0.06)", border: "1px solid rgba(217,70,239,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#f0abfc" }}>Perspective swap</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{swap.scenario}</p>
                  <div className="space-y-2 mb-3">
                    <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Your lens</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{swap.yourLens}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                      <p className="text-[10px] uppercase tracking-widest text-violet-300 mb-1">Integration toward {intType}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{swap.integrationLens}</p>
                    </div>
                  </div>
                  <p className="text-[11px] opacity-60 leading-relaxed italic">{swap.reflection}</p>
                </div>
              );
            })()}

            {/* ── Type Wisdom Feed ── */}
            {(() => {
              const wisdom = getWeeklyWisdom(activeType!);
              if (!wisdom) return null;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#fde68a" }}>Others of your type have said</h3>
                  <p className="text-base font-serif italic leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                    &ldquo;{wisdom.text}&rdquo;
                  </p>
                  <p className="text-xs opacity-50">{wisdom.source}</p>
                </div>
              );
            })()}

            {/* ── Growth Edges Inventory ── */}
            {(() => {
              const edges = TYPE_GROWTH_EDGES[activeType!];
              if (!edges?.length) return null;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6ee7b7" }}>Your growth edges</h3>
                  <p className="text-[11px] opacity-60 mb-3">Which of these have you explored?</p>
                  <div className="space-y-2">
                    {edges.map(edge => (
                      <div key={edge.id} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{edge.label}</p>
                        <p className="text-[11px] opacity-60">{edge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* ── Predictive Self (Mischel CAPS 1995) ── */}
            {(() => {
              const [selectedSit, setSelectedSit] = useState<SituationCategory | null>(null);
              const prediction = selectedSit && activeType ? getPrediction(activeType, selectedSit) : null;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#a5b4fc" }}>Predict your pattern</h3>
                  <p className="text-[11px] opacity-60 mb-3">What situation are you facing? See how your type will probably respond, and what the alternative looks like.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {SITUATION_CATEGORIES.map(cat => (
                      <button key={cat.id} onClick={() => setSelectedSit(selectedSit === cat.id ? null : cat.id)}
                        className="text-xs px-3 py-1.5 rounded-full transition-all"
                        style={{
                          background: selectedSit === cat.id ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${selectedSit === cat.id ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                          color: selectedSit === cat.id ? "#c7d2fe" : "rgba(255,255,255,0.65)",
                        }}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {prediction && (
                      <motion.div key={selectedSit} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                        <div className="p-3 rounded-xl mb-2" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Your habitual pattern</p>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{prediction.habitualPattern}</p>
                        </div>
                        <div className="p-3 rounded-xl mb-2" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                          <p className="text-[10px] uppercase tracking-widest text-emerald-300 mb-1">The integration alternative</p>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{prediction.integrationAlternative}</p>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
                          <p className="text-[10px] uppercase tracking-widest text-yellow-300 mb-1">The choice point</p>
                          <p className="text-xs leading-relaxed font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>{prediction.choicePoint}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })()}

            {/* ── Shadow Dialogue (Hermans 2001) ── */}
            {activeType && (() => {
              const dialogue = getDialogue(activeType);
              const intType = DIALOGUE_INTEGRATION_TYPE[activeType];
              const [showDialogue, setShowDialogue] = useState(false);
              const [dialogueStep, setDialogueStep] = useState(0);
              const [choices, setChoices] = useState<string[]>([]);
              if (!dialogue) return null;
              const visibleTurns = dialogue.turns.slice(0, showDialogue ? dialogueStep + 1 : 0);
              const atChoice = showDialogue && dialogueStep >= dialogue.choiceAfter && dialogueStep < dialogue.turns.length;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#c084fc" }}>Shadow dialogue</h3>
                  <p className="text-[11px] opacity-60 mb-3">{dialogue.topic}</p>
                  {!showDialogue ? (
                    <button onClick={() => { setShowDialogue(true); setDialogueStep(0); }}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }}>
                      Start the dialogue
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {visibleTurns.map((turn, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-xl" style={{
                            background: turn.speaker === "type" ? "rgba(255,255,255,0.04)" : "rgba(139,92,246,0.08)",
                            border: `1px solid ${turn.speaker === "type" ? "rgba(255,255,255,0.08)" : "rgba(139,92,246,0.2)"}`,
                          }}>
                          <p className="text-[9px] uppercase tracking-widest opacity-40 mb-1">
                            {turn.speaker === "type" ? `Type ${activeType}` : `Integration (${intType})`}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{turn.text}</p>
                        </motion.div>
                      ))}
                      {dialogueStep < dialogue.turns.length - 1 && !atChoice && (
                        <button onClick={() => setDialogueStep(dialogueStep + 1)}
                          className="w-full py-2 rounded-xl text-xs font-semibold"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                          Continue
                        </button>
                      )}
                      {atChoice && (
                        <div className="space-y-2 pt-1">
                          <p className="text-[10px] text-center opacity-50">Which voice do you want to speak as next?</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => { setChoices([...choices, "type"]); setDialogueStep(dialogueStep + 1); }}
                              className="py-2 rounded-xl text-xs font-semibold"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}>
                              Type {activeType}
                            </button>
                            <button onClick={() => { setChoices([...choices, "integration"]); setDialogueStep(dialogueStep + 1); }}
                              className="py-2 rounded-xl text-xs font-semibold"
                              style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#c084fc" }}>
                              Integration ({intType})
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── Formation Map (Millon + Riso-Hudson) ── */}
            {activeType && (() => {
              const formation = TYPE_FORMATION[activeType];
              const [showFormation, setShowFormation] = useState(false);
              if (!formation) return null;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#fda4af" }}>Personality archaeology</h3>
                  <p className="text-[11px] opacity-60 mb-3">How your Type {activeType} pattern likely formed. This is a hypothesis, not a diagnosis.</p>
                  {!showFormation ? (
                    <button onClick={() => setShowFormation(true)}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", color: "#fda4af" }}>
                      Explore my formation
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      {([
                        { label: "The childhood experience", text: formation.childhoodWound, color: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.2)" },
                        { label: "What you built in response", text: formation.adaptiveStrategy, color: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.18)" },
                        { label: "How it shows up now", text: formation.adultManifestation, color: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.18)" },
                        { label: "Typical consolidation", text: formation.consolidationAge, color: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
                        { label: "Where it lives in the body", text: formation.somaticSignature, color: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.15)" },
                        { label: "The liberation", text: formation.liberationInsight, color: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.2)" },
                      ]).map((section, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          className="p-3 rounded-xl" style={{ background: section.color, border: `1px solid ${section.border}` }}>
                          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">{section.label}</p>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>{section.text}</p>
                        </motion.div>
                      ))}
                      <p className="text-[10px] opacity-40 text-center leading-relaxed pt-2">
                        This is a generalized hypothesis based on Enneagram developmental theory. Your actual experience may differ. If this brings up difficult feelings, that is normal. Reach out to a trusted person or professional if needed.
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })()}

            {/* ── Behavioral Insights (avoidance + timing) ── */}
            {activeType && (() => {
              const avoidanceInsight = generateAvoidanceInsight(activeType);
              const timing = getTimingInsights();
              if (!avoidanceInsight && !timing) return null;
              return (
                <div className="rounded-3xl p-5 mb-5" style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.18)" }}>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#fda4af" }}>What your behavior reveals</h3>
                  <p className="text-[11px] opacity-50 mb-3">These insights come from how you USE the app, not from what you say about yourself.</p>
                  {avoidanceInsight && (
                    <div className="p-3 rounded-xl mb-2" style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.12)" }}>
                      <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Feature avoidance</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>{avoidanceInsight}</p>
                    </div>
                  )}
                  {timing && (
                    <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Usage patterns</p>
                      <p className="text-xs opacity-75">
                        Peak hour: {timing.peakHour > 12 ? timing.peakHour - 12 : timing.peakHour}{timing.peakHour >= 12 ? "pm" : "am"} ·
                        Peak day: {timing.peakDay} ·
                        Avg session: {timing.avgSessionMinutes} min ·
                        {timing.totalSessions} sessions logged
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── Decentering Index link ── */}
            <Link href="/assessments/decentering"
              className="block rounded-3xl p-5 mb-8 transition-all active:scale-[0.98]"
              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#c4b5fd" }}>Decentering Index</h3>
                  <p className="text-sm opacity-70">Measure your growth. Retake monthly.</p>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </div>
            </Link>
          </>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="text-4xl mb-4">~</div>
            <h3 className="text-lg font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>Your growth path starts with knowing your type</h3>
            <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Each Enneagram type has a unique path to growth. specific fears to face, virtues to cultivate, and integration lines to explore.
            </p>
            <Link href="/assessments/quick" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              Discover my type in 3 minutes →
            </Link>
          </div>
        )}

        <Link href="/daily" className="block text-center text-xs transition-colors pb-8 hover:text-violet-400" style={{ color: "rgba(255,255,255,0.35)" }}>
          ← Back to Daily Practice
        </Link>
      </div>
    </div>
  );
}
