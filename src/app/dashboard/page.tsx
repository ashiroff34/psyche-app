"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, TrendingUp, TrendingDown, Feather, Share2, RotateCcw, BookOpen, Brain, Compass, Sun, Moon } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import { mbtiTypes, cognitiveFunctions } from "@/data/cognitive-functions";
import { subtypes } from "@/data/subtypes";
import RadarChart from "@/components/RadarChart";
import { useProfile, notifyProfileChanged } from "@/hooks/useProfile";

function DailyInsight({ type }: { type: number }) {
  const t = enneagramTypes.find((e) => e.number === type);
  if (!t) return null;
  const allPrompts = [...t.growthTips, ...t.journalPrompts];
  const dayIndex = Math.floor(Date.now() / 86400000) % allPrompts.length;
  const insight = allPrompts[dayIndex];

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100">
      <div className="flex items-center gap-2 mb-3">
        <Sun className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-medium text-slate-500">Daily Growth Insight</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{insight}&rdquo;</p>
    </div>
  );
}

function StressGrowthToggle({ type }: { type: number }) {
  const [mode, setMode] = useState<"growth" | "stress">("growth");
  const t = enneagramTypes.find((e) => e.number === type);
  if (!t) return null;
  const target = mode === "growth" ? t.integrationLine : t.disintegrationLine;
  const targetType = enneagramTypes.find((e) => e.number === target);

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-700">Mode Shift</span>
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
          <button onClick={() => setMode("growth")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${mode === "growth" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>
            <TrendingUp className="w-3 h-3 inline mr-1" />Growth
          </button>
          <button onClick={() => setMode("stress")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${mode === "stress" ? "bg-rose-500 text-white" : "text-slate-500"}`}>
            <TrendingDown className="w-3 h-3 inline mr-1" />Stress
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-bold" style={{ backgroundColor: t.color }}>
          {t.number}
        </div>
        <div className="text-xl text-slate-400">→</div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-bold ${mode === "growth" ? "ring-2 ring-emerald-300" : "ring-2 ring-rose-300"}`} style={{ backgroundColor: targetType?.color }}>
          {target}
        </div>
        <div className="flex-1 ml-2">
          <div className="text-sm font-medium text-slate-700">{targetType?.name}</div>
          <div className="text-xs text-slate-400">
            {mode === "growth" ? "You take on their healthy traits" : "You take on their unhealthy traits"}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(mode === "growth" ? targetType?.healthyTraits : targetType?.unhealthyTraits)?.map((trait) => (
          <span key={trait} className={`px-2 py-0.5 text-xs rounded-md ${mode === "growth" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{trait}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { profile, loaded, clearProfile } = useProfile(); // reactive — updates when type changes anywhere

  const enneagramType = profile.enneagramType ? enneagramTypes.find((t) => t.number === profile.enneagramType) : null;
  const mbtiType = profile.cognitiveType ? mbtiTypes.find((t) => t.code === profile.cognitiveType) : null;
  const typeSubtypes = profile.enneagramType ? subtypes.filter((s) => s.type === profile.enneagramType) : [];

  if (!loaded) return <div className="min-h-screen flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>;

  if (!enneagramType && !mbtiType) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 text-sky-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mb-3">Your Dashboard Awaits</h1>
          <p className="text-slate-500 mb-8">Take an assessment to build your personality profile. Your results will be saved here.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/enneagram/assess" className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-sky-200/40">
              Enneagram Assessment
            </Link>
            <Link href="/cognitive/assess" className="px-6 py-3 bg-white text-slate-700 rounded-xl font-medium border border-slate-200">
              Cognitive Functions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Build radar chart data
  const radarLabels = enneagramTypes.map((t) => `${t.number}`);
  const radarValues = enneagramTypes.map((t) => {
    const score = profile.enneagramScores?.find((s) => parseInt(s.key) === t.number);
    return score?.percentage || 0;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 text-sky-600 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> Your Personality Profile
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Your Dashboard</h1>
        </div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              {enneagramType && (
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold" style={{ backgroundColor: enneagramType.color }}>
                  {enneagramType.number}
                </div>
              )}
              <div>
                <div className="text-2xl font-serif font-bold">
                  {profile.instinctualStacking && <span className="text-sky-300 font-mono text-lg mr-2">{profile.instinctualStacking}</span>}
                  {profile.tritype && <span className="text-indigo-300 font-mono text-lg mr-2">{profile.tritype}</span>}
                  {mbtiType && <span className="text-violet-300 font-mono text-lg">{mbtiType.code}</span>}
                </div>
                <div className="text-slate-400 text-sm">
                  {enneagramType?.name} {enneagramType && "·"} {mbtiType?.name}
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">{enneagramType?.brief}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => { clearProfile(); notifyProfileChanged(); }}
                className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Radar Chart */}
          {profile.enneagramScores && (
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <h3 className="font-serif font-semibold text-slate-800 mb-4">Type Resonance</h3>
              <div className="flex justify-center">
                <RadarChart labels={radarLabels} values={radarValues} size={250} />
              </div>
            </motion.div>
          )}

          {/* Stress/Growth Toggle */}
          {enneagramType && (
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <StressGrowthToggle type={enneagramType.number} />
              <div className="mt-4">
                <DailyInsight type={enneagramType.number} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Subtypes */}
        {typeSubtypes.length > 0 && (
          <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <h3 className="font-serif font-semibold text-slate-800 mb-4">Your Subtypes</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {typeSubtypes.map((sub) => (
                <div key={sub.instinct} className={`p-4 rounded-xl border ${sub.isCountertype ? "border-violet-200 bg-violet-50/30" : "border-slate-100"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                      sub.instinct === "sp" ? "bg-emerald-100 text-emerald-700" :
                      sub.instinct === "sx" ? "bg-rose-100 text-rose-700" :
                      "bg-sky-100 text-sky-700"
                    }`}>{sub.instinct.toUpperCase()}</span>
                    {sub.isCountertype && <span className="text-[9px] text-violet-500 font-medium">COUNTER</span>}
                  </div>
                  <div className="text-sm font-medium text-slate-700 mb-1">{sub.chestnutName}</div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{sub.description.slice(0, 120)}...</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href={`/enneagram/learn?type=${profile.enneagramType}`} className="p-4 rounded-xl bg-white border border-slate-100 card-hover text-center">
            <BookOpen className="w-5 h-5 text-sky-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-slate-600">Deep Dive</span>
          </Link>
          <Link href="/compare" className="p-4 rounded-xl bg-white border border-slate-100 card-hover text-center">
            <Brain className="w-5 h-5 text-violet-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-slate-600">Compare</span>
          </Link>
          <Link href="/journal" className="p-4 rounded-xl bg-white border border-slate-100 card-hover text-center">
            <Feather className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-slate-600">Inner Work</span>
          </Link>
          <Link href="/enneagram/assess" className="p-4 rounded-xl bg-white border border-slate-100 card-hover text-center">
            <RotateCcw className="w-5 h-5 text-amber-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-slate-600">Retake</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
