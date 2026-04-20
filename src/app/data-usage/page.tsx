"use client";

// Trust + Data Usage Page (DuckDuckGo Privacy Dashboard pattern)
//
// Pew Research 2019: 81% of Americans feel little control over data collected.
// 2023 follow-up: 73% more concerned than a year ago. Privacy is a positioning
// lever, not a footer item. Signal's homepage is the gold standard.

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Smartphone, Cloud, Download, Trash2 } from "lucide-react";

interface StorageItem {
  key: string;
  label: string;
  where: "device" | "cloud";
  description: string;
  sizeApprox?: string;
}

const STORAGE_MAP: StorageItem[] = [
  { key: "psyche-profile", label: "Your type profile", where: "device", description: "Enneagram type, wing, instinct, MBTI, Big Five scores, display name." },
  { key: "psyche-game-state", label: "Progress + tokens", where: "device", description: "XP, level, tokens, streaks, badges. Everything about your journey." },
  { key: "psyche-pet-state", label: "Chibi companion", where: "device", description: "Your chibi's name, health, mood, items. They live on your phone." },
  { key: "psyche-state-history", label: "State check-ins", where: "device", description: "Daily state-vs-trait micro-checks. Never sent to a server." },
  { key: "psyche-drift-snapshots", label: "Drift graph data", where: "device", description: "Longitudinal aspect snapshots with optional life-event tags." },
  { key: "psyche-schwartz-result", label: "Values assessment", where: "device", description: "Your Schwartz Basic Values scores." },
  { key: "psyche-aspects-result", label: "Big Five Aspects", where: "device", description: "10-aspect scores from the DeYoung assessment." },
  { key: "psyche-context-selves", label: "Work/Home/Love selves", where: "device", description: "Context-dependent personality variants." },
  { key: "psyche-implementation-intention", label: "Habit anchor", where: "device", description: "Your chosen check-in time anchor." },
  { key: "psyche-chibi-name", label: "Chibi name", where: "device", description: "The name you gave your companion." },
  { key: "email (if provided)", label: "Email address", where: "cloud", description: "Stored in Supabase only if you opted in. Used for occasional insights." },
  { key: "confessions", label: "Anonymous confessions", where: "cloud", description: "Type-tagged text you chose to share publicly. No PII attached." },
];

export default function DataUsagePage() {
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [wipeArmed, setWipeArmed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const s: Record<string, string> = {};
    for (const item of STORAGE_MAP) {
      if (item.where === "device") {
        try {
          const raw = localStorage.getItem(item.key);
          if (raw) {
            const bytes = new Blob([raw]).size;
            s[item.key] = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
          }
        } catch {}
      }
    }
    setSizes(s);
  }, []);

  function handleExport() {
    if (typeof window === "undefined") return;
    const data: Record<string, unknown> = {};
    for (const item of STORAGE_MAP) {
      if (item.where === "device") {
        try {
          const raw = localStorage.getItem(item.key);
          if (raw) data[item.key] = JSON.parse(raw);
        } catch {}
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `thyself-data-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleWipe() {
    if (typeof window === "undefined") return;
    if (!wipeArmed) {
      setWipeArmed(true);
      // auto-disarm after 4s so a stray tap can't commit later
      window.setTimeout(() => setWipeArmed(false), 4000);
      return;
    }
    for (const item of STORAGE_MAP) {
      if (item.where === "device") {
        try { localStorage.removeItem(item.key); } catch {}
      }
    }
    window.location.href = "/";
  }

  const deviceItems = STORAGE_MAP.filter(i => i.where === "device");
  const cloudItems = STORAGE_MAP.filter(i => i.where === "cloud");

  return (
    <div className="min-h-screen text-white p-6 pb-20" style={{ background: "#0a0614" }}>
      <div className="max-w-md mx-auto">
        <Link href="/settings" className="inline-flex items-center gap-2 text-sm opacity-60 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h1 className="text-3xl font-bold">Your data</h1>
          </div>
          <p className="text-sm opacity-60 mb-6 leading-relaxed">
            Thyself processes personality data on your device. Here is everything we store and where it lives.
          </p>
        </motion.div>

        {/* On-device */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">On your device only</p>
          </div>
          <div className="space-y-2">
            {deviceItems.map(item => (
              <div key={item.key} className="p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <span className="text-[10px] font-mono opacity-50">{sizes[item.key] ?? "empty"}</span>
                </div>
                <p className="text-[11px] opacity-60 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="w-4 h-4 text-violet-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Cloud (opt-in only)</p>
          </div>
          <div className="space-y-2">
            {cloudItems.map(item => (
              <div key={item.key} className="p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                <p className="text-sm font-semibold mb-0.5">{item.label}</p>
                <p className="text-[11px] opacity-60 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleExport}
            className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7" }}>
            <Download className="w-4 h-4" /> Export all
          </button>
          <button onClick={handleWipe}
            className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={
              wipeArmed
                ? { background: "rgba(239,68,68,0.22)", border: "1px solid rgba(239,68,68,0.55)", color: "#fecaca" }
                : { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }
            }>
            <Trash2 className="w-4 h-4" /> {wipeArmed ? "Tap again to confirm" : "Wipe data"}
          </button>
        </div>

        <p className="text-[10px] opacity-40 text-center mt-6 leading-relaxed">
          We do not sell your data. We do not share it with third parties. We do not use it for advertising. Your personality is yours.
        </p>
      </div>
    </div>
  );
}
