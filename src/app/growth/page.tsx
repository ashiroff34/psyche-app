"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, ChevronRight, RefreshCw, Check, ArrowRight, Leaf } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";

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
  1: "bg-rose-50 border-rose-100",
  2: "bg-pink-50 border-pink-100",
  3: "bg-amber-50 border-amber-100",
  4: "bg-purple-50 border-purple-100",
  5: "bg-blue-50 border-blue-100",
  6: "bg-emerald-50 border-emerald-100",
  7: "bg-teal-50 border-teal-100",
  8: "bg-orange-50 border-orange-100",
  9: "bg-slate-50 border-slate-100",
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function GrowthPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}>
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Growth Prompts</h1>
          <p className="text-slate-500 text-sm">Type-specific questions for genuine self-reflection</p>
        </div>

        {/* Type Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Viewing prompts for</span>
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
                      className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${selectedType === t.number ? "border-indigo-400 bg-indigo-50" : "border-slate-100 bg-white hover:border-slate-200"}`}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-1"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.number}
                      </div>
                      <span className="text-[9px] font-medium text-slate-500 text-center leading-tight">{t.name.replace("The ", "")}</span>
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
                <p className="text-sm font-semibold text-slate-800">Type {type.number} · {type.name}</p>
                <p className="text-xs text-slate-500">{growthInfo?.shortDesc}</p>
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
            <div className="bg-white border border-slate-100 shadow-md rounded-3xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Prompt</span>
                </div>
                <button
                  onClick={cyclePrompt}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Next prompt
                </button>
              </div>

              <p className="text-base font-medium text-slate-800 leading-relaxed mb-6">
                {currentPrompt}
              </p>

              {/* Reflection input */}
              <div className="relative">
                <textarea
                  rows={4}
                  placeholder="Write your reflection here... (optional — saved privately)"
                  value={reflectionText}
                  onChange={(e) => { setReflectionText(e.target.value); setSaved(false); }}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-violet-300 focus:bg-white transition-colors"
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
            </div>

            {/* All prompts for this type */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">All prompts for Type {activeType}</h3>
              <div className="space-y-2">
                {prompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setPromptIdx(i); setReflectionText(""); setSaved(false); }}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl transition-all text-sm ${i === promptIdx ? "bg-indigo-50 border border-indigo-100 text-indigo-800 font-medium" : "hover:bg-slate-50 text-slate-600"}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{p}</span>
                    {i === promptIdx && <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Growth tips */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 mb-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Growth tips for Type {activeType}</h3>
              <div className="space-y-2">
                {type.growthTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: type.color }} />
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm mb-4">Select a type above to see growth prompts.</p>
            <Link href="/enneagram/assess" className="inline-flex items-center gap-2 text-sm text-indigo-500 font-medium hover:text-indigo-700">
              Take assessment to find your type <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <Link href="/daily" className="block text-center text-xs text-slate-400 hover:text-slate-600 transition-colors pb-8">
          ← Back to Daily Practice
        </Link>
      </div>
    </div>
  );
}
