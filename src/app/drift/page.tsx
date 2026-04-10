"use client";

// Personality Drift Graph
//
// Longitudinal view of your state check-ins and aspect snapshots with
// optional life-event tagging. Based on Roberts, Walton, & Viechtbauer (2006)
// cumulative continuity research: traits change with roles, transitions,
// and life events. Watching your own drift is the retention moat, nobody
// leaves an app holding 1-2 years of their becoming.

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { ASPECTS, type Aspect } from "@/data/psychometrics/big-five-aspects";

export default function DriftPage() {
  const { stateHistory, driftSnapshots, aspects, tagLastDrift } = usePsychometrics();
  const [selectedAspect, setSelectedAspect] = useState<Aspect>("volatility");
  const [eventInput, setEventInput] = useState("");
  const [tagging, setTagging] = useState(false);

  // Build time series of state check-ins for the selected aspect
  const timeSeries = useMemo(() => {
    const rows = stateHistory
      .filter(c => c.scores[selectedAspect] !== undefined)
      .map(c => ({
        date: c.date,
        value: Math.round(((c.scores[selectedAspect] - 1) / 4) * 100),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
    return rows;
  }, [stateHistory, selectedAspect]);

  const currentTrait = aspects?.scores[selectedAspect];
  const avgState = timeSeries.length
    ? Math.round(timeSeries.reduce((a, b) => a + b.value, 0) / timeSeries.length)
    : null;

  const trend =
    timeSeries.length >= 4
      ? (() => {
          const recent = timeSeries.slice(-Math.ceil(timeSeries.length / 2));
          const early = timeSeries.slice(0, Math.floor(timeSeries.length / 2));
          const recentAvg = recent.reduce((a, b) => a + b.value, 0) / recent.length;
          const earlyAvg = early.reduce((a, b) => a + b.value, 0) / early.length;
          return recentAvg - earlyAvg;
        })()
      : 0;

  // Sparkline SVG
  const maxVal = 100;
  const W = 320;
  const H = 120;
  const padX = 10;
  const padY = 10;
  const pts =
    timeSeries.length >= 2
      ? timeSeries
          .map((r, i) => {
            const x = padX + (i / (timeSeries.length - 1)) * (W - padX * 2);
            const y = H - padY - (r.value / maxVal) * (H - padY * 2);
            return `${x},${y}`;
          })
          .join(" ")
      : "";

  const aspectDef = ASPECTS.find(a => a.key === selectedAspect)!;

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/mirrors" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-2">Drift</h1>
          <p className="text-sm opacity-60 mb-6 leading-relaxed">
            Personality is not fixed. This is your movement over time, state check-ins plus aspect re-tests.
          </p>
        </motion.div>

        {/* Aspect picker */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Aspect</p>
          <div className="grid grid-cols-2 gap-2">
            {ASPECTS.map(a => (
              <button
                key={a.key}
                onClick={() => setSelectedAspect(a.key)}
                className="py-2 px-3 rounded-xl text-xs font-semibold transition-all text-left"
                style={{
                  background: selectedAspect === a.key ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedAspect === a.key ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)"}`,
                  color: selectedAspect === a.key ? "#c4b5fd" : "rgba(255,255,255,0.7)",
                }}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Summary card */}
        <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
          <p className="text-sm font-bold mb-1">{aspectDef.name}</p>
          <p className="text-[11px] opacity-60 mb-3">{aspectDef.description}</p>
          <div className="flex items-baseline gap-4 mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Trait</p>
              <p className="text-xl font-bold">{currentTrait ?? "—"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Avg state</p>
              <p className="text-xl font-bold">{avgState ?? "—"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Trend</p>
              <p className="text-xl font-bold flex items-center gap-1">
                {trend > 5 ? <TrendingUp className="w-4 h-4 text-emerald-300" /> : trend < -5 ? <TrendingDown className="w-4 h-4 text-red-300" /> : <Minus className="w-4 h-4 opacity-50" />}
                {trend !== 0 ? (trend > 0 ? "+" : "") + Math.round(trend) : "0"}
              </p>
            </div>
          </div>

          {/* Sparkline */}
          {timeSeries.length >= 2 ? (
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 120 }}>
              <line x1={padX} y1={H - padY - ((currentTrait ?? 50) / 100) * (H - padY * 2)} x2={W - padX} y2={H - padY - ((currentTrait ?? 50) / 100) * (H - padY * 2)} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <polyline points={pts} fill="none" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {timeSeries.map((r, i) => {
                const x = padX + (i / Math.max(timeSeries.length - 1, 1)) * (W - padX * 2);
                const y = H - padY - (r.value / maxVal) * (H - padY * 2);
                return <circle key={r.date} cx={x} cy={y} r="2" fill="#d946ef" />;
              })}
            </svg>
          ) : (
            <p className="text-xs opacity-50 text-center py-6">
              {timeSeries.length === 1
                ? "One check-in so far. Come back tomorrow for a line."
                : "No check-ins yet. Start the daily state practice to build your drift."}
            </p>
          )}
          <p className="text-[10px] opacity-50 mt-2 text-center">
            Dashed line = measured trait. Solid line = lived state over time.
          </p>
        </div>

        {/* Drift snapshots (full re-tests) */}
        {driftSnapshots.length > 0 && (
          <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Aspect snapshots</p>
            {driftSnapshots.slice(-5).map((snap, i) => (
              <div key={i} className="text-xs opacity-70 mb-1 flex justify-between">
                <span>{new Date(snap.date).toLocaleDateString()}</span>
                <span>{snap.aspectScores[selectedAspect] ?? "—"}</span>
              </div>
            ))}
            {!tagging && (
              <button onClick={() => setTagging(true)} className="text-[11px] text-violet-300 underline mt-2">
                <Plus className="inline w-3 h-3 mr-0.5" /> Tag last with life event
              </button>
            )}
            {tagging && (
              <div className="mt-3 flex gap-2">
                <input
                  autoFocus
                  value={eventInput}
                  onChange={e => setEventInput(e.target.value)}
                  placeholder="e.g. started new job"
                  className="flex-1 text-xs px-3 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
                />
                <button
                  onClick={() => {
                    if (eventInput.trim()) {
                      tagLastDrift(eventInput.trim());
                      setEventInput("");
                      setTagging(false);
                    }
                  }}
                  className="text-xs px-3 py-2 rounded-lg font-semibold"
                  style={{ background: "rgba(139,92,246,0.3)", border: "1px solid rgba(139,92,246,0.5)" }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty state nudge */}
        {timeSeries.length < 3 && (
          <div className="p-4 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="text-xs opacity-60 leading-relaxed">
              Daily state check-ins are the fuel for this graph. One per day builds a real picture of how you actually move across weeks and months.
            </p>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href="/assessments/aspects" className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Retake aspects
          </Link>
          <Link href="/mirrors" className="p-3 rounded-xl text-center text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Triangulate
          </Link>
        </div>
      </div>
    </div>
  );
}
