"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Eye, Flame } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import {
  INTEGRATION_TYPE,
  INTEGRATION_TYPE_NAMES,
  INTEGRATION_GIFT,
  getTodayIntegrationMessage,
} from "@/data/integration-messages";

// ─── Activity detection ───────────────────────────────────────────────────────
// "Active" = user engaged with growth content today or yesterday
// Signals: morning observation responded to, journal entry saved today

function getDateKey(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return new Intl.DateTimeFormat("en-CA").format(d);
}

function detectGrowthActivity(): "active" | "recent" | "dormant" {
  try {
    const today = getDateKey(0);
    const yesterday = getDateKey(1);

    // Morning observation done today?
    const morningToday = !!localStorage.getItem(`psyche-morning-response-${today}`);
    if (morningToday) return "active";

    // Journal entry today?
    const reflections = localStorage.getItem("psyche-reflections");
    if (reflections) {
      const parsed = JSON.parse(reflections) as { date?: string; savedAt?: string }[];
      if (Array.isArray(parsed)) {
        const hasToday = parsed.some(r => {
          const d = r.date ?? r.savedAt ?? "";
          return d.startsWith(today);
        });
        if (hasToday) return "active";
      }
    }

    // Morning observation done yesterday?
    const morningYesterday = !!localStorage.getItem(`psyche-morning-response-${yesterday}`);
    if (morningYesterday) return "recent";

    return "dormant";
  } catch {
    return "dormant";
  }
}

// ─── Type color map ───────────────────────────────────────────────────────────

const TYPE_COLOR: Record<number, string> = {
  1: "#94a3b8", // slate
  2: "#f9a8d4", // pink
  3: "#fbbf24", // amber
  4: "#a78bfa", // violet
  5: "#93c5fd", // blue
  6: "#6ee7b7", // emerald
  7: "#34d399", // green
  8: "#f87171", // red
  9: "#cbd5e1", // soft slate
};

const TYPE_GRADIENT: Record<number, string> = {
  1: "from-slate-600 to-slate-700",
  2: "from-pink-500 to-rose-600",
  3: "from-amber-400 to-orange-500",
  4: "from-violet-500 to-purple-600",
  5: "from-blue-500 to-indigo-600",
  6: "from-emerald-500 to-teal-600",
  7: "from-green-400 to-emerald-500",
  8: "from-red-500 to-rose-600",
  9: "from-slate-400 to-slate-500",
};

// ─── Response mode ────────────────────────────────────────────────────────────

type ResponseMode = "witness" | "explore" | null;

function getStorageKey(): string {
  return `psyche-integration-response-${getDateKey(0)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  userType: number;
}

export default function IntegrationCompanion({ userType }: Props) {
  const integrationTypeNum = INTEGRATION_TYPE[userType] ?? 7;
  const message = getTodayIntegrationMessage(userType);
  const [activity, setActivity] = useState<"active" | "recent" | "dormant">("dormant");
  const [responded, setResponded] = useState<ResponseMode>(null);
  const [showExplore, setShowExplore] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setActivity(detectGrowthActivity());
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved === "witness" || saved === "explore") setResponded(saved);
    } catch {}
    setLoaded(true);
  }, []);

  if (!message || !loaded) return null;

  const integrationName = INTEGRATION_TYPE_NAMES[integrationTypeNum];
  const gift = INTEGRATION_GIFT[userType];
  const color = TYPE_COLOR[integrationTypeNum];
  const gradient = TYPE_GRADIENT[integrationTypeNum];

  function handleRespond(mode: ResponseMode) {
    setResponded(mode);
    if (mode === "explore") setShowExplore(true);
    try {
      localStorage.setItem(getStorageKey(), mode ?? "");
    } catch {}
  }

  const isDormant = activity === "dormant";
  const chibiOpacity = isDormant ? 0.45 : 1;
  const chibiState = activity === "active" ? "happy" : "idle";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
            Integration Companion
          </p>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${color}18`, color }}
        >
          Type {integrationTypeNum} · {integrationName}
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: `1px solid ${color}25`,
          background: "rgba(255,255,255,0.03)",
          opacity: responded ? 0.85 : 1,
        }}
      >
        {/* Chibi + message header */}
        <div className="flex items-start gap-4 p-4">
          {/* Chibi */}
          <motion.div
            style={{ opacity: chibiOpacity }}
            animate={isDormant ? { opacity: [0.4, 0.5, 0.4] } : {}}
            transition={isDormant ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
            className="shrink-0 mt-1"
          >
            <ChibiSprite type={integrationTypeNum} size={52} state={chibiState} />
          </motion.div>

          {/* Message bubble */}
          <div className="flex-1 min-w-0">
            {isDormant && !responded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 mb-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Waiting for you…
                </span>
              </motion.div>
            )}
            {activity === "active" && !responded && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <Flame className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] text-amber-400 font-semibold">Active today</span>
              </div>
            )}
            <p
              className="text-sm leading-relaxed font-serif italic"
              style={{ color: isDormant && !responded ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.72)" }}
            >
              &ldquo;{message.text}&rdquo;
            </p>
          </div>
        </div>

        {/* Integration gift label */}
        <div
          className="px-4 pb-3 -mt-1"
          style={{ paddingLeft: "calc(52px + 2rem)" }}
        >
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            Your growth direction: <span style={{ color }}>{gift}</span>
          </span>
        </div>

        {/* Response buttons. shown until responded */}
        <AnimatePresence>
          {!responded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-4"
            >
              <div
                className="h-px mb-3"
                style={{ background: `${color}20` }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleRespond("witness")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Witness
                </button>
                <button
                  onClick={() => handleRespond("explore")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}35`,
                    color,
                  }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Explore
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Responded state */}
        <AnimatePresence>
          {responded && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 pb-4"
            >
              <div className="h-px mb-3" style={{ background: `${color}20` }} />
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                {responded === "witness"
                  ? "Witnessed. That's enough for now."
                  : "Prompt noted. Come back to it."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explore prompt. shown after tapping Explore */}
        <AnimatePresence>
          {showExplore && message.explorePrompt && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="mx-4 mb-4 p-3 rounded-xl"
                style={{ background: `${color}10`, border: `1px solid ${color}20` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${color}99` }}>
                  Reflection prompt
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {message.explorePrompt}
                </p>
                <a
                  href="/journal"
                  className="inline-flex items-center gap-1 mt-2.5 text-xs font-semibold"
                  style={{ color }}
                >
                  Open journal <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
