"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Heart, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import PetSprite from "@/components/PetSprite";
import type { PathNodeConfig } from "./NodeBottomSheet";

interface InsightData {
  quote: string;
  author: string;
  reflection: string;
  category: string;
}

interface PetWidget {
  name: string;
  petType: number;
  health: number;
  hunger: number;
  isAlive: boolean;
}

interface Props {
  streak: number;
  totalXP: number;
  xpProgress: number; // 0-100
  xpLabel: string;
  xpToNext: number | null;
  nextMilestoneLabel: string | null;
  enneagramType: number;
  enneagramTypeName: string;
  jungianType: string;
  completedToday: number;
  totalNodes: number;
  petWidget: PetWidget | null;
  insightData: InsightData | null;
  activePathTab: "enneagram" | "jungian";
  onPathTabChange: (tab: "enneagram" | "jungian") => void;
  onContinuePath: () => void;
  onNodeTap: (node: PathNodeConfig) => void;
  miniPathNodes: PathNodeConfig[];
  nextNode: PathNodeConfig | null;
  streakFreezes: number;
}

export default function HubView({
  streak,
  totalXP,
  xpProgress,
  xpLabel,
  xpToNext,
  nextMilestoneLabel,
  enneagramType,
  jungianType,
  completedToday,
  totalNodes,
  petWidget,
  insightData,
  activePathTab,
  onPathTabChange,
  onContinuePath,
  onNodeTap,
  miniPathNodes,
  nextNode,
  streakFreezes,
}: Props) {
  const overallProgress = Math.round((completedToday / Math.max(totalNodes, 1)) * 100);
  const ringCircumference = 2 * Math.PI * 52;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #faf5ff 0%, #fdf4ff 50%, #fff1f2 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-32">

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          {/* Streak */}
          <div className="relative flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-orange-100">
            <Flame className="w-5 h-5 text-orange-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{streak}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">streak</span>
            {streakFreezes > 0 && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[9px] font-bold">{streakFreezes}</span>
              </div>
            )}
          </div>

          {/* XP */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-amber-100">
            <Zap className="w-5 h-5 text-amber-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{totalXP.toLocaleString()}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">{xpLabel}</span>
          </div>

          {/* Hearts / daily done */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-rose-100">
            <Heart className="w-5 h-5 text-rose-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{completedToday}/{totalNodes}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">done today</span>
          </div>
        </motion.div>

        {/* ── Gradient progress ring + pet ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-30"
              style={{
                background: "radial-gradient(circle, #8b5cf6, #ec4899)",
                transform: "scale(1.15)",
              }}
            />

            <svg width="152" height="152" viewBox="0 0 152 152" className="relative">
              <defs>
                <linearGradient id="hub-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Background track */}
              <circle
                cx="76"
                cy="76"
                r="52"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="6"
              />
              {/* Progress arc */}
              <motion.circle
                cx="76"
                cy="76"
                r="52"
                fill="none"
                stroke="url(#hub-ring-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                initial={{ strokeDashoffset: ringCircumference }}
                animate={{
                  strokeDashoffset:
                    ringCircumference - (ringCircumference * overallProgress) / 100,
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "76px 76px",
                  filter: "drop-shadow(0 0 8px rgba(139,92,246,0.5))",
                }}
              />
            </svg>

            {/* Center content — pet or % */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {petWidget?.isAlive ? (
                <div className="flex flex-col items-center">
                  <PetSprite type={petWidget.petType} size={52} />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-800">{overallProgress}%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">today</span>
                </div>
              )}
            </div>
          </div>

          {/* XP progress bar */}
          {xpToNext !== null && nextMilestoneLabel && (
            <div className="mt-4 w-48">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>{xpLabel}</span>
                <span>{xpToNext} to {nextMilestoneLabel}</span>
              </div>
              <div className="h-1.5 bg-violet-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Continue Path button ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-7"
        >
          <button
            onClick={onContinuePath}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #d946ef, #ec4899)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
            }}
          >
            <div className="text-left">
              <p className="font-bold text-lg leading-tight">Continue Path</p>
              <p className="text-white/70 text-sm mt-0.5">
                {nextNode ? nextNode.label : "All done for today!"}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </button>
        </motion.div>

        {/* ── Enneagram / Jungian tab toggle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-5"
        >
          <div className="flex gap-1 p-1 bg-white/70 backdrop-blur-sm rounded-xl border border-white shadow-sm">
            {(["enneagram", "jungian"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => onPathTabChange(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activePathTab === tab
                    ? "text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                style={
                  activePathTab === tab
                    ? { background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }
                    : {}
                }
              >
                {tab === "enneagram" ? "Enneagram" : "Jungian"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Mini path preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-white"
        >
          {nextNode && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              UP NEXT — {nextNode.unitName}
            </p>
          )}

          {/* Horizontal nodes row */}
          <div className="flex items-center justify-between px-2">
            {miniPathNodes.slice(0, 5).map((node, i) => (
              <div key={node.id} className="flex items-center">
                {/* Connector */}
                {i > 0 && (
                  <div
                    className="w-6 h-0.5 -mx-1"
                    style={{
                      background:
                        miniPathNodes[i - 1].status === "completed"
                          ? `linear-gradient(to right, ${miniPathNodes[i-1].gradTo}, ${node.gradFrom})`
                          : "#e2e8f0",
                    }}
                  />
                )}

                {/* Mini node */}
                <button
                  onClick={() => onNodeTap(node)}
                  className="relative flex flex-col items-center gap-1"
                >
                  <div className="relative" style={{ width: 36, height: 36 }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0">
                      <defs>
                        <linearGradient id={`mini-grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={node.gradFrom} />
                          <stop offset="100%" stopColor={node.gradTo} />
                        </linearGradient>
                      </defs>
                      {node.status === "locked" ? (
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                      ) : node.status === "completed" ? (
                        <circle
                          cx="18" cy="18" r="15"
                          fill="none"
                          stroke={`url(#mini-grad-${node.id})`}
                          strokeWidth="2"
                          style={{ filter: `drop-shadow(0 0 4px ${node.gradFrom}80)` }}
                        />
                      ) : (
                        <>
                          <circle cx="18" cy="18" r="15" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.5" />
                          <circle cx="18" cy="18" r="15" fill="none" stroke="#f59e0b" strokeWidth="2"
                            strokeDasharray="65 30" strokeLinecap="round"
                            style={{ transform: "rotate(-90deg)", transformOrigin: "18px 18px" }} />
                        </>
                      )}
                    </svg>
                    <div
                      className="absolute rounded-full"
                      style={{
                        inset: 4,
                        background:
                          node.status === "locked"
                            ? "#f1f5f9"
                            : `linear-gradient(135deg, ${node.gradFrom}, ${node.gradTo})`,
                        boxShadow: node.status !== "locked" ? `0 1px 6px ${node.gradFrom}50` : "none",
                      }}
                    />
                  </div>
                  <span
                    className={`text-[9px] font-medium leading-tight text-center max-w-[40px] ${
                      node.status === "current" ? "text-amber-600" : node.status === "completed" ? "text-violet-600" : "text-slate-400"
                    }`}
                  >
                    {node.label.split(" ")[0]}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Daily insight card ── */}
        {insightData && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="relative overflow-hidden p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-indigo-100/60"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-100/40 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
                >
                  <BookOpen className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-violet-600 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Today&apos;s Insight
                  </div>
                  <div className="text-[9px] text-slate-400 capitalize">{insightData.category}</div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed font-serif text-[14px] italic mb-1.5">
                &ldquo;{insightData.quote}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mb-2">— {insightData.author}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{insightData.reflection}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
