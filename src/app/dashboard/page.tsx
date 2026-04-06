"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, TrendingUp, TrendingDown, Feather, RotateCcw, BookOpen, Brain, Compass, Sun, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import { mbtiTypes } from "@/data/cognitive-functions";
import { subtypes } from "@/data/subtypes";
import RadarChart from "@/components/RadarChart";
import { useProfile, notifyProfileChanged } from "@/hooks/useProfile";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import RetestPrompt from "@/components/RetestPrompt";

// ── Confidence ladder: next assessment to take ────────────────────────────────
const ASSESSMENT_LADDER = [
  { id: "quick", label: "Quick Type Finder", href: "/assessments/quick", points: "Baseline" },
  { id: "self-id", label: "Self-Identification", href: "/assessments/self-id", points: "+15%" },
  { id: "essential-enneagram", label: "Essential Enneagram", href: "/assessments/essential-enneagram", points: "+15%" },
  { id: "integrative", label: "Integrative Assessment", href: "/assessments/ieq9-integrative", points: "+20%" },
  { id: "deep", label: "Deep Assessment", href: "/assessments/ieq9-integrative", points: "+25%" },
];

function ConfidenceLadder({ taken }: { taken: string[] }) {
  const remaining = ASSESSMENT_LADDER.filter((a) => !taken.includes(a.id));
  const completed = ASSESSMENT_LADDER.filter((a) => taken.includes(a.id));
  if (remaining.length === 0) return null;
  const next = remaining[0];

  return (
    <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
        Confidence Ladder
      </p>
      <div className="space-y-2 mb-4">
        {completed.map((a) => (
          <div key={a.id} className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#22c55e" }} />
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{a.label}</span>
            <span className="ml-auto text-xs font-semibold" style={{ color: "#22c55e" }}>{a.points}</span>
          </div>
        ))}
        {remaining.map((a, i) => (
          <div key={a.id} className="flex items-center gap-3" style={{ opacity: i === 0 ? 1 : 0.4 }}>
            <Circle className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />
            <span className="text-sm" style={{ color: i === 0 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}>{a.label}</span>
            <span className="ml-auto text-xs font-semibold" style={{ color: "rgba(167,139,250,0.8)" }}>{a.points}</span>
          </div>
        ))}
      </div>
      <Link
        href={next.href}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 6px 20px rgba(124,58,237,0.35)" }}
      >
        Next: {next.label}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function DailyInsight({ type }: { type: number }) {
  const t = enneagramTypes.find((e) => e.number === type);
  if (!t) return null;
  const allPrompts = [...t.growthTips, ...t.journalPrompts];
  const dayIndex = Math.floor(Date.now() / 86400000) % allPrompts.length;
  const insight = allPrompts[dayIndex];

  return (
    <div className="p-5 rounded-2xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Sun className="w-4 h-4" style={{ color: "#f59e0b" }} />
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(245,158,11,0.8)" }}>Daily Insight</span>
      </div>
      <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.72)" }}>&ldquo;{insight}&rdquo;</p>
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
    <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>Mode Shift</span>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => setMode("growth")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={mode === "growth" ? { background: "#22c55e", color: "#fff" } : { color: "rgba(255,255,255,0.4)" }}
          >
            <TrendingUp className="w-3 h-3 inline mr-1" />Growth
          </button>
          <button
            onClick={() => setMode("stress")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={mode === "stress" ? { background: "#ef4444", color: "#fff" } : { color: "rgba(255,255,255,0.4)" }}
          >
            <TrendingDown className="w-3 h-3 inline mr-1" />Stress
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-bold text-lg" style={{ backgroundColor: t.color }}>
          {t.number}
        </div>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-bold text-lg"
          style={{
            backgroundColor: targetType?.color,
            boxShadow: mode === "growth" ? "0 0 0 2px rgba(34,197,94,0.5)" : "0 0 0 2px rgba(239,68,68,0.5)",
          }}
        >
          {target}
        </div>
        <div className="flex-1 ml-2">
          <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{targetType?.name}</div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            {mode === "growth" ? "Their healthy traits emerge in you" : "Their unhealthy traits emerge under stress"}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(mode === "growth" ? targetType?.healthyTraits : targetType?.unhealthyTraits)?.map((trait) => (
          <span
            key={trait}
            className="px-2 py-0.5 text-xs rounded-md"
            style={mode === "growth"
              ? { background: "rgba(34,197,94,0.12)", color: "#4ade80" }
              : { background: "rgba(239,68,68,0.12)", color: "#f87171" }}
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { profile, loaded, clearProfile } = useProfile();

  const enneagramType = profile.enneagramType ? enneagramTypes.find((t) => t.number === profile.enneagramType) : null;
  const mbtiType = profile.cognitiveType ? mbtiTypes.find((t) => t.code === profile.cognitiveType) : null;
  const typeSubtypes = profile.enneagramType ? subtypes.filter((s) => s.type === profile.enneagramType) : [];
  const taken = profile.assessmentsTaken ?? [];

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!enneagramType && !mbtiType) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20" style={{ background: "#0f0a1e" }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <Compass className="w-10 h-10" style={{ color: "rgba(139,92,246,0.8)" }} />
          </div>
          <h1 className="text-2xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.92)" }}>Your Dashboard Awaits</h1>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Take an assessment to build your personality profile.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/assessments/quick"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              Start Assessment
            </Link>
            <Link href="/cognitive/assess"
              className="px-6 py-3 rounded-xl font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
              Cognitive Functions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const radarLabels = enneagramTypes.map((t) => `${t.number}`);
  const radarValues = enneagramTypes.map((t) => {
    const score = profile.enneagramScores?.find((s) => parseInt(s.key) === t.number);
    return score?.percentage || 0;
  });

  return (
    <div className="min-h-screen py-12 pb-32" style={{ background: "#0f0a1e" }}>
      {/* Aurora */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "rgba(167,139,250,0.9)" }}>
            <Sparkles className="w-3 h-3" /> Your Personality Profile
          </div>
          <h1 className="text-3xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>Dashboard</h1>
        </div>

        {/* 30-day retest prompt */}
        <RetestPrompt assessmentDate={profile.assessmentDate} />

        {/* Profile Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl mb-6 relative overflow-hidden"
          style={{
            background: enneagramType
              ? `linear-gradient(135deg, ${enneagramType.color}22 0%, rgba(79,70,229,0.12) 100%)`
              : "rgba(255,255,255,0.05)",
            border: enneagramType ? `1px solid ${enneagramType.color}30` : "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div className="flex items-start gap-5 flex-wrap">
            {enneagramType && (
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-serif font-black text-white flex-shrink-0"
                style={{ backgroundColor: enneagramType.color, boxShadow: `0 8px 24px ${enneagramType.color}50` }}
              >
                {enneagramType.number}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
                  {enneagramType?.name}
                  {mbtiType && <span className="ml-2 font-mono" style={{ color: "rgba(167,139,250,0.9)" }}>{mbtiType.code}</span>}
                </h2>
                {profile.typeConfidence !== undefined && <ConfidenceBadge />}
              </div>
              {profile.instinctualStacking && (
                <span className="text-sm font-mono mr-2" style={{ color: "rgba(167,139,250,0.7)" }}>{profile.instinctualStacking}</span>
              )}
              {profile.tritype && (
                <span className="text-sm font-mono mr-2" style={{ color: "rgba(99,179,237,0.8)" }}>{profile.tritype}</span>
              )}
              <p className="text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{enneagramType?.brief}</p>
            </div>
            <div className="text-4xl">{enneagramType?.icon}</div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => { clearProfile(); notifyProfileChanged(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
            >
              <RotateCcw className="w-3 h-3" /> Reset Profile
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Confidence Ladder */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <ConfidenceLadder taken={taken} />
          </motion.div>

          {/* Daily Insight + Stress/Growth */}
          <div className="space-y-4">
            {enneagramType && (
              <>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                  <DailyInsight type={enneagramType.number} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                  <StressGrowthToggle type={enneagramType.number} />
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Radar Chart */}
        {profile.enneagramScores && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl mb-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="font-serif font-semibold mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>Type Resonance</h3>
            <div className="flex justify-center">
              <RadarChart labels={radarLabels} values={radarValues} size={250} />
            </div>
          </motion.div>
        )}

        {/* Subtypes */}
        {typeSubtypes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="p-6 rounded-2xl mb-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="font-serif font-semibold mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>Your Subtypes</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {typeSubtypes.map((sub) => (
                <div
                  key={sub.instinct}
                  className="p-4 rounded-xl"
                  style={{
                    background: sub.isCountertype ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.04)",
                    border: sub.isCountertype ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs font-mono font-bold rounded" style={{
                      background: sub.instinct === "sp" ? "rgba(34,197,94,0.15)" : sub.instinct === "sx" ? "rgba(239,68,68,0.15)" : "rgba(14,165,233,0.15)",
                      color: sub.instinct === "sp" ? "#4ade80" : sub.instinct === "sx" ? "#f87171" : "#38bdf8",
                    }}>
                      {sub.instinct.toUpperCase()}
                    </span>
                    {sub.isCountertype && <span className="text-[9px] font-semibold" style={{ color: "rgba(167,139,250,0.7)" }}>COUNTER</span>}
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>{sub.chestnutName}</div>
                  <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "rgba(255,255,255,0.4)" }}>{sub.description.slice(0, 120)}...</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { href: `/enneagram/learn?type=${profile.enneagramType}`, icon: BookOpen, label: "Deep Dive", color: "#38bdf8" },
            { href: "/compare", icon: Brain, label: "Compare", color: "#a78bfa" },
            { href: "/journal", icon: Feather, label: "Journal", color: "#4ade80" },
            { href: "/assessments", icon: RotateCcw, label: "Assessments", color: "#f59e0b" },
          ].map(({ href, icon: Icon, label, color }) => (
            <Link
              key={href}
              href={href}
              className="p-4 rounded-xl text-center transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
