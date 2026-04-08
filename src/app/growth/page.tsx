"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, ChevronRight, RefreshCw, Check, ArrowRight, ArrowLeft, Leaf, Lock, Zap } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import PetCompanion from "@/components/PetCompanion";

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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0f0a1e" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto"
          style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
          <Leaf className="w-7 h-7" style={{ color: "#34d399" }} />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>Enneagram Growth Path</h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          Type-specific growth prompts, integration practices, and daily reflection — rooted in the Enneagram tradition.
        </p>
        <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
          No subscription needed. Unlock once with tokens earned through daily practice.
        </p>
        <div className="flex items-center justify-center gap-2 mb-5 px-4 py-2.5 rounded-full"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-bold text-emerald-300">{ENNEAGRAM_GROWTH_UNLOCK_COST} tokens</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>· you have {tokens}</span>
        </div>
        {err && <p className="text-xs text-red-400 mb-3">{err}</p>}
        <button
          onClick={handleUnlock}
          disabled={spending || tokens < ENNEAGRAM_GROWTH_UNLOCK_COST}
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-50 mb-3"
          style={{ background: "linear-gradient(135deg, #10b981, #0d9488)", boxShadow: "0 4px 20px rgba(16,185,129,0.35)" }}
        >
          {spending ? "Unlocking…" : tokens >= ENNEAGRAM_GROWTH_UNLOCK_COST ? "Unlock Enneagram Growth Path" : "Not enough tokens yet"}
        </button>
        <Link href="/daily" className="block text-xs underline underline-offset-2" style={{ color: "rgba(255,255,255,0.3)" }}>
          Earn tokens through daily practice →
        </Link>
      </motion.div>
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

  // Load user type from profile
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const p = JSON.parse(raw);
        if (p.enneagramType) {
          setUserType(p.enneagramType);
          setSelectedType(p.enneagramType);
        }
      }
    } catch {}
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
    <EnneagramGrowthGate>
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
            <div className="rounded-3xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
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
          </>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="text-4xl mb-4">~</div>
            <h3 className="text-lg font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>Your growth path starts with knowing your type</h3>
            <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Each Enneagram type has a unique path to growth — specific fears to face, virtues to cultivate, and integration lines to explore.
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
    </EnneagramGrowthGate>
  );
}
