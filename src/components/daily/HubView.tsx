"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Flame, Zap, Heart, ArrowRight, Sparkles, BookOpen, CheckCircle, Target, Star, Clock, Lock, ChevronRight, Coins, Brain } from "lucide-react";

// ─── Type-match preview cards (subset for daily challenge) ────────────────────
const DAILY_CHALLENGE_CARDS = [
  { id: 1, tag: "Inner Dialogue", prompt: '"I keep noticing the typo on that sign. I know it shouldn\'t bother me. But it does. It really does."', type: 1 },
  { id: 2, tag: "Behavior", prompt: "Before their host could even stand up, they had already cleared three dishes from the table and asked if anyone needed water.", type: 2 },
  { id: 3, tag: "Inner Dialogue", prompt: '"Rest feels wasteful. I get anxious if I\'m not moving toward something."', type: 3 },
  { id: 4, tag: "Inner Dialogue", prompt: '"Everyone else seems to just... fit. I\'ve never quite felt like I belonged anywhere."', type: 4 },
  { id: 5, tag: "Behavior", prompt: "They spent two hours researching the restaurant before the dinner, not to impress, but because they genuinely needed to know.", type: 5 },
  { id: 6, tag: "Inner Dialogue", prompt: '"I know it\'s fine. But what if it\'s not? I need to think through all the ways it could go wrong."', type: 6 },
  { id: 7, tag: "Behavior", prompt: "They booked a trip to Portugal, signed up for a pottery class, and outlined a new business idea, all in the same afternoon.", type: 7 },
  { id: 8, tag: "Inner Dialogue", prompt: '"I\'d rather have someone fight me directly than smile while plotting something behind my back."', type: 8 },
  { id: 9, tag: "Behavior", prompt: "They sat through the entire two-hour meeting without saying what they actually thought, because the moment never felt quite right.", type: 9 },
  { id: 10, tag: "Quote", prompt: '"I don\'t really need much. I just want to know the people I love are okay."', type: 2 },
  { id: 11, tag: "Growth Edge", prompt: '"Learning to say \'good enough\' was the hardest thing I\'ve ever done. My whole body resisted it."', type: 1 },
  { id: 12, tag: "Quote", prompt: '"I\'ve hit every goal I set. And yet there\'s always one more. It never actually feels like enough."', type: 3 },
  { id: 13, tag: "Quote", prompt: '"I don\'t want to be fixed. I want to be understood."', type: 4 },
  { id: 14, tag: "Quote", prompt: '"I know a tremendous amount about a small number of things, and I\'m okay with that."', type: 5 },
  { id: 15, tag: "Quote", prompt: '"I don\'t fully trust my own judgment. That\'s why I need people I can check with."', type: 6 },
  { id: 16, tag: "Quote", prompt: '"The worst feeling isn\'t sadness. It\'s boredom. Or being trapped."', type: 7 },
  { id: 17, tag: "Quote", prompt: '"Vulnerability isn\'t weakness. I know that intellectually. Getting my body to believe it is another matter."', type: 8 },
  { id: 18, tag: "Inner Dialogue", prompt: '"When you ask me what I want, I genuinely don\'t know. I know what I don\'t want. But for myself? It\'s blank."', type: 9 },
];

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function getDailyCards() {
  const dayOfYear = (() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    return Math.floor((now.getTime() - start.getTime()) / 86400000);
  })();
  const idx1 = dayOfYear % DAILY_CHALLENGE_CARDS.length;
  const idx2 = (dayOfYear + 1) % DAILY_CHALLENGE_CARDS.length;
  return [DAILY_CHALLENGE_CARDS[idx1], DAILY_CHALLENGE_CARDS[idx2]];
}

const TYPE_NAMES: Record<number, string> = {
  1: "Type 1", 2: "Type 2", 3: "Type 3",
  4: "Type 4", 5: "Type 5", 6: "Type 6",
  7: "Type 7", 8: "Type 8", 9: "Type 9",
};
import WeeklyChallengeCard from "./WeeklyChallengeCard";
import PetSprite from "@/components/PetSprite";
import ChibiSprite from "@/components/ChibiSprite";
import type { PathNodeConfig } from "./NodeBottomSheet";
import type { PathUnit } from "./PathView";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ── Midnight countdown helper ────────────────────────────────────────────── */
function useMidnightCountdown() {
  const [secsLeft, setSecsLeft] = useState<number>(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
    };
    setSecsLeft(calc());
    const id = setInterval(() => setSecsLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secsLeft / 3600);
  const m = Math.floor((secsLeft % 3600) / 60);
  const s = secsLeft % 60;
  const label = h > 0
    ? `${h}h ${String(m).padStart(2, "0")}m`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  const isUrgent = secsLeft < 3 * 3600; // < 3 hours = urgent
  const isCritical = secsLeft < 1 * 3600; // < 1 hour = critical

  return { label, isUrgent, isCritical, secsLeft };
}

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
  onContinuePath: () => void;
  onNodeTap: (node: PathNodeConfig) => void;
  miniPathNodes: PathNodeConfig[];
  nextNode: PathNodeConfig | null;
  streakFreezes: number;
  // Inline path
  units?: PathUnit[];
  onViewFullPath?: () => void;
  // Token balance
  tokens?: number;
  // Chibi greeting mascot
  instinct?: string;
  name?: string;
  // New engagement props
  longestStreak?: number;
  questionsAnsweredToday?: number;
  warmupDoneToday?: boolean;
  dailyXPEarned?: number;
  readingDoneToday?: boolean;
  onStartReading?: () => void;
  // Weekly challenge
  weeklyChallenge?: {
    id: string; name: string; emoji: string; description: string;
    goal: number; xpReward: number; tokenReward: number;
    progress: number; completed: boolean; rewardClaimed: boolean;
  };
  onClaimWeeklyReward?: () => void;
}

export default function HubView({
  streak,
  totalXP,
  xpProgress,
  xpLabel,
  xpToNext,
  nextMilestoneLabel,
  enneagramType,
  enneagramTypeName,
  jungianType,
  completedToday,
  totalNodes,
  petWidget,
  insightData,
  onContinuePath,
  onNodeTap,
  miniPathNodes,
  nextNode,
  streakFreezes,
  longestStreak = 0,
  questionsAnsweredToday = 0,
  warmupDoneToday = false,
  dailyXPEarned = 0,
  readingDoneToday = false,
  onStartReading,
  units = [],
  onViewFullPath,
  tokens = 0,
  instinct,
  name,
  weeklyChallenge,
  onClaimWeeklyReward,
}: Props) {
  const overallProgress = Math.round((completedToday / Math.max(totalNodes, 1)) * 100);
  const ringCircumference = 2 * Math.PI * 52;
  const countdown = useMidnightCountdown();
  // Show streak countdown when: user has a streak AND hasn't finished today's practice
  const streakAtRisk = streak > 0 && !warmupDoneToday;

  // Endowed progress: show a "head start" banner on first hub visit if user has XP from assessments
  const [showHeadStart, setShowHeadStart] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "psyche-hub-welcomed";
    if (!localStorage.getItem(key) && totalXP > 0 && questionsAnsweredToday === 0) {
      setShowHeadStart(true);
      localStorage.setItem(key, "true");
      setTimeout(() => setShowHeadStart(false), 4000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // First-time token explainer, shows once after user earns their first tokens
  const [showTokenTooltip, setShowTokenTooltip] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || tokens <= 0) return;
    const seen = localStorage.getItem("psyche-token-tooltip-seen");
    if (!seen) {
      setShowTokenTooltip(true);
      const t = setTimeout(() => {
        setShowTokenTooltip(false);
        localStorage.setItem("psyche-token-tooltip-seen", "true");
      }, 5000);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0f0a1e",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-32">

        {/* ── Endowed progress banner ── */}
        <AnimatePresence>
          {showHeadStart && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className="mb-5 flex items-center gap-3 px-4 py-3 rounded-2xl text-white font-medium text-sm"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 4px 16px rgba(139,92,246,0.35)" }}
            >
              <Zap className="w-5 h-5 shrink-0 fill-white" />
              <span>You&apos;ve already earned <strong>{totalXP} XP</strong>. You&apos;re ahead of the starting line!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          {/* Streak */}
          <div
            className={`relative flex flex-col items-center px-4 py-2.5 rounded-2xl backdrop-blur-sm shadow-sm transition-colors ${
              streakAtRisk && countdown.isCritical
                ? "bg-red-50 border border-red-200"
                : streakAtRisk && countdown.isUrgent
                ? "bg-orange-50 border border-orange-200"
                : "bg-white/80 border border-orange-100"
            }`}
          >
            <Flame
              className={`w-5 h-5 mb-0.5 ${
                streakAtRisk && countdown.isCritical
                  ? "text-red-500 animate-pulse"
                  : streakAtRisk && countdown.isUrgent
                  ? "text-orange-600"
                  : "text-orange-500"
              }`}
            />
            <span className="text-xl font-bold text-slate-800 leading-none">{streak}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">streak</span>

            {/* Countdown badge — shows when streak is at risk */}
            {streakAtRisk && (
              <div
                className={`flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  countdown.isCritical
                    ? "bg-red-100 text-red-600"
                    : countdown.isUrgent
                    ? "bg-orange-100 text-orange-700"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <Clock className="w-2.5 h-2.5" />
                {countdown.label}
              </div>
            )}

            {longestStreak > streak && longestStreak > 0 && (
              <span className="text-[8px] text-amber-500 font-medium mt-0.5">best: {longestStreak}</span>
            )}
            {streak > 0 && streak >= longestStreak && longestStreak > 0 && (
              <Star className="absolute -top-1.5 -left-1.5 w-4 h-4 text-amber-400 fill-amber-400" />
            )}
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
            <span className="text-[9px] text-slate-400 tracking-wide mt-0.5">{xpLabel}</span>
          </div>

          {/* Hearts / daily done */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-rose-100">
            <Heart className="w-5 h-5 text-rose-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{completedToday}/{totalNodes}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">done today</span>
          </div>
        </motion.div>

        {/* ── Token balance chip + first-time explainer ── */}
        <AnimatePresence>
          {tokens > 0 && (
            <motion.div
              key="token-chip"
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              className="flex justify-center -mt-4 mb-6"
            >
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 shadow-sm">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-sm font-bold text-amber-700">{tokens.toLocaleString()}</span>
                <span className="text-xs text-amber-500 font-medium">tokens</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* First-time token tooltip */}
        <AnimatePresence>
          {showTokenTooltip && (
            <motion.div
              key="token-tooltip"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", damping: 20, stiffness: 280 }}
              className="mb-5 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(245,158,11,0.25)" }}
            >
              <div
                className="px-4 py-3 flex items-start gap-3"
                style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}
              >
                <div className="text-2xl shrink-0 mt-0.5">🪙</div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "#fbbf24" }}>You earned tokens!</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(251,191,36,0.8)" }}>
                    Tokens are your in-app currency. Spend them in the{" "}
                    <span className="font-semibold">Store</span> on streak freezes, pet accessories, and more.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowTokenTooltip(false);
                    try { localStorage.setItem("psyche-token-tooltip-seen", "true"); } catch {}
                  }}
                  className="text-amber-500 hover:text-amber-700 text-lg leading-none shrink-0 mt-0.5"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Gradient progress ring + pet ── */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
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

            {/* Center content — chibi or % */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {enneagramType ? (
                <ChibiSprite
                  type={enneagramType}
                  instinct={instinct}
                  size={64}
                  state={warmupDoneToday ? "happy" : "idle"}
                />
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

          {/* Type identity pills */}
          {(enneagramType > 0 || jungianType) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
              {enneagramType > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 text-[11px] font-bold">
                  Type {enneagramType}
                </span>
              )}
              {jungianType && (
                <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold font-mono">
                  {jungianType}
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Streak-at-risk urgent banner ── */}
        <AnimatePresence>
          {streakAtRisk && countdown.isCritical && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              className="mb-4 flex items-center gap-3 px-4 py-3 rounded-2xl border border-red-200 bg-red-50"
            >
              <Flame className="w-5 h-5 text-red-500 shrink-0 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-red-700 leading-tight">
                  Your {streak}-day streak ends in {countdown.label}!
                </p>
                <p className="text-xs text-red-500 mt-0.5">Complete today's practice before midnight.</p>
              </div>
            </motion.div>
          )}
          {streakAtRisk && countdown.isUrgent && !countdown.isCritical && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              className="mb-4 flex items-center gap-3 px-4 py-3 rounded-2xl border border-orange-200 bg-orange-50"
            >
              <Flame className="w-5 h-5 text-orange-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-orange-700 leading-tight">
                  {streak}-day streak at risk, {countdown.label} left
                </p>
                <p className="text-xs text-orange-500 mt-0.5">Don't let your streak break tonight.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════════
             ── INLINE LEARNING PATH (Duolingo-style) ──
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="mb-2"
        >
          {/* Section header row */}
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Learning Path</p>
            {onViewFullPath && (
              <button
                onClick={onViewFullPath}
                className="flex items-center gap-1 text-[11px] font-semibold text-violet-500 hover:text-violet-700 transition-colors"
              >
                See all units <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Inline path — show first active unit */}
          {(() => {
            const activeUnit = units[0]; // show first unit (current unit)
            if (!activeUnit) return null;
            const nodes = activeUnit.nodes;
            const completedCount = nodes.filter(n => n.status === "completed").length;
            const isFullyDone = completedCount === nodes.length;
            const isAllLocked = nodes.every(n => n.status === "locked");
            const pct = Math.round((completedCount / Math.max(nodes.length, 1)) * 100);

            // S-curve offsets, Duolingo zigzag
            const offsets = [
              { x: 20, align: "flex-start" },
              { x: 80, align: "center" },
              { x: 140, align: "flex-end" },
              { x: 80, align: "center" },
              { x: 20, align: "flex-start" },
            ];

            return (
              <div>
                {/* Unit banner */}
                <div
                  className="relative flex items-center justify-between px-5 py-3.5 rounded-2xl mb-5 overflow-hidden"
                  style={
                    isAllLocked
                      ? { background: "#cbd5e1" }
                      : isFullyDone
                      ? { background: "linear-gradient(135deg,#10b981,#6366f1)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }
                      : { background: "linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)", boxShadow: "0 4px 20px rgba(139,92,246,0.35)" }
                  }
                >
                  {/* Shimmer overlay */}
                  {!isAllLocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />
                  )}
                  <div className="relative">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isAllLocked ? "text-slate-500" : "text-white/70"}`}>
                      Unit 1
                    </p>
                    <p className={`text-base font-bold mt-0.5 ${isAllLocked ? "text-slate-500" : "text-white"}`}>
                      {activeUnit.name}
                    </p>
                  </div>
                  <div className="relative flex items-center gap-2">
                    {isAllLocked ? (
                      <Lock className="w-5 h-5 text-slate-400" />
                    ) : isFullyDone ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-white/25">
                          <motion.div
                            className="h-2 rounded-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          />
                        </div>
                        <span className="text-xs font-bold text-white">{pct}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* S-curve nodes */}
                <div className="relative px-2">
                  {nodes.map((node, nodeIdx) => {
                    const SIZE = node.status === "current" ? 72 : 60;
                    const r = SIZE / 2 - 4;
                    const circ = 2 * Math.PI * r;
                    const gId = `ig-vp-${node.id}`;
                    const gAmId = `ig-am-${node.id}`;

                    // Zigzag alignment: left / center / right / center / left
                    const rowAligns = ["justify-start", "justify-center", "justify-end", "justify-center", "justify-start"];
                    const rowAlign = rowAligns[nodeIdx % rowAligns.length];
                    const isLast = nodeIdx === nodes.length - 1;

                    return (
                      <div key={node.id} className="relative">
                        {/* Connector */}
                        {!isLast && (
                          <div
                            className="absolute left-1/2 -translate-x-px w-0.5 z-0"
                            style={{
                              top: SIZE + 4,
                              height: node.status === "current" ? 44 : 40,
                              background: node.status === "completed"
                                ? "linear-gradient(to bottom, #8b5cf6, #ec4899)"
                                : "rgba(255,255,255,0.12)",
                              opacity: node.status === "completed" ? 0.6 : 1,
                            }}
                          />
                        )}

                        {/* Node row */}
                        <div className={`flex ${rowAlign} mb-12 relative z-10`}>
                          <div className="flex flex-col items-center gap-2">
                            {/* Node button */}
                            <motion.button
                              whileTap={{ scale: 0.92 }}
                              whileHover={node.status !== "locked" ? { scale: 1.07 } : {}}
                              onClick={() => onNodeTap(node)}
                              className="relative flex-shrink-0"
                              style={{
                                width: SIZE,
                                height: SIZE,
                                filter: node.status === "completed"
                                  ? "drop-shadow(0 0 8px rgba(139,92,246,0.55))"
                                  : node.status === "current"
                                  ? "drop-shadow(0 0 14px rgba(251,146,60,0.75))"
                                  : "none",
                              }}
                            >
                              <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0">
                                <defs>
                                  <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                  </linearGradient>
                                  <linearGradient id={gAmId} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#f97316" />
                                  </linearGradient>
                                </defs>
                                {node.status === "locked" && (
                                  <circle cx={SIZE/2} cy={SIZE/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                                )}
                                {node.status === "completed" && (
                                  <circle cx={SIZE/2} cy={SIZE/2} r={r} fill="none" stroke={`url(#${gId})`} strokeWidth="3.5" />
                                )}
                                {node.status === "current" && (
                                  <>
                                    <circle cx={SIZE/2} cy={SIZE/2} r={r} fill="none" stroke="#ede9fe" strokeWidth="3.5" />
                                    <motion.circle
                                      cx={SIZE/2} cy={SIZE/2} r={r}
                                      fill="none" stroke={`url(#${gAmId})`}
                                      strokeWidth="3.5" strokeLinecap="round"
                                      strokeDasharray={`${circ * 0.45} ${circ * 0.55}`}
                                      transform={`rotate(-90 ${SIZE/2} ${SIZE/2})`}
                                      animate={{ rotate: ["-90deg", "270deg"] }}
                                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                      style={{ originX: "50%", originY: "50%" }}
                                    />
                                  </>
                                )}
                              </svg>
                              {/* Inner fill */}
                              <div
                                className="absolute rounded-full flex items-center justify-center"
                                style={{
                                  inset: 6,
                                  background: node.status === "locked"
                                    ? "#f1f5f9"
                                    : node.status === "completed"
                                    ? "linear-gradient(135deg,#8b5cf6,#ec4899)"
                                    : "linear-gradient(135deg,#f59e0b,#f97316)",
                                }}
                              >
                                {node.status === "locked" && <Lock className="text-slate-400" style={{ width: SIZE*0.28, height: SIZE*0.28 }} />}
                                {node.status === "completed" && <CheckCircle className="text-white" style={{ width: SIZE*0.32, height: SIZE*0.32 }} />}
                                {node.status === "current" && <Star className="text-white fill-white" style={{ width: SIZE*0.3, height: SIZE*0.3 }} />}
                              </div>
                              {/* START badge */}
                              {node.status === "current" && (
                                <motion.div
                                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold tracking-wide shadow-lg whitespace-nowrap"
                                  style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
                                  animate={{ y: [0, -3, 0] }}
                                  transition={{ duration: 1.6, repeat: Infinity }}
                                >
                                  START
                                </motion.div>
                              )}
                            </motion.button>

                            {/* Label */}
                            <div className="text-center max-w-[90px]">
                              <p className={`text-[11px] font-semibold leading-snug ${
                                node.status === "current" ? "text-orange-600 font-bold" :
                                node.status === "completed" ? "text-violet-600" : "text-slate-400"
                              }`}>
                                {node.label}
                              </p>
                              {node.sublabel && (
                                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{node.sublabel}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* ── Daily Quests ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.37 }}
          className="mb-6 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-white"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-violet-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today&apos;s Quests</p>
          </div>
          {[
            {
              label: "Answer 5 questions",
              done: questionsAnsweredToday >= 5,
              progress: Math.min(questionsAnsweredToday, 5),
              total: 5,
              reward: "+10 XP bonus",
            },
            {
              label: "Complete the warm-up",
              done: warmupDoneToday,
              progress: warmupDoneToday ? 1 : 0,
              total: 1,
              reward: "+5 tokens",
            },
            {
              label: "Earn 50 XP today",
              done: dailyXPEarned >= 50,
              progress: Math.min(dailyXPEarned, 50),
              total: 50,
              reward: "+15 XP bonus",
            },
            {
              label: "Complete today's reading",
              done: readingDoneToday,
              progress: readingDoneToday ? 1 : 0,
              total: 1,
              reward: "+25 tokens",
            },
          ].map((quest, i) => (
            <div key={i} className={`flex items-center gap-3 py-2 ${i < 3 ? "border-b border-slate-50" : ""}`}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                quest.done ? "border-emerald-400 bg-emerald-400" : "border-slate-200 bg-white"
              }`}>
                {quest.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-tight ${quest.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                  {quest.label}
                </p>
                {!quest.done && quest.total > 1 && (
                  <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all"
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
              <span className={`text-xs font-medium shrink-0 ${quest.done ? "text-emerald-500" : "text-amber-500"}`}>
                {quest.reward}
              </span>
            </div>
          ))}

          {/* Full Day bonus */}
          {(() => {
            const allDone = questionsAnsweredToday >= 5 && warmupDoneToday && dailyXPEarned >= 50 && readingDoneToday;
            return (
              <div className={`mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                allDone ? "bg-amber-50" : "bg-slate-50/60"
              }`}>
                <Star className={`w-4 h-4 shrink-0 ${allDone ? "text-amber-500" : "text-slate-300"}`} />
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${allDone ? "text-amber-700" : "text-slate-400"}`}>Full Day Bonus</p>
                  <p className="text-[10px] text-slate-400">Complete all 4 quests for a bonus reward</p>
                </div>
                <span className={`text-xs font-bold ${allDone ? "text-amber-600" : "text-slate-300"}`}>+20 tokens</span>
              </div>
            );
          })()}
        </motion.div>

        {/* ── Weekly Challenge ── */}
        {weeklyChallenge && (
          <WeeklyChallengeCard
            challenge={weeklyChallenge}
            onClaim={onClaimWeeklyReward ?? (() => {})}
          />
        )}

        {/* ── Daily Type Challenge ── */}
        {(() => {
          const dateKey = getDateKey();
          const storageKey = `psyche-type-challenge-done-${dateKey}`;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [challengeDone, setChallengeDone] = useState(false);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            try {
              setChallengeDone(!!localStorage.getItem(storageKey));
            } catch {}
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);

          const dailyCards = getDailyCards();

          return (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="mb-6"
            >
              <div
                className={`rounded-2xl border overflow-hidden transition-all ${
                  challengeDone ? "border-emerald-200" : "border-violet-200/60 shadow-sm"
                }`}
                style={challengeDone ? { background: "#f0fdf4" } : { background: "rgba(139,92,246,0.06)", backdropFilter: "blur(8px)" }}
              >
                {/* Header */}
                <div
                  className="flex items-center gap-3 px-4 py-3 border-b"
                  style={challengeDone ? { borderColor: "#bbf7d0" } : { borderColor: "rgba(139,92,246,0.12)" }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={challengeDone
                      ? { background: "#dcfce7" }
                      : { background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
                  >
                    {challengeDone
                      ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                      : <Brain className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-bold uppercase tracking-wide ${challengeDone ? "text-emerald-600" : "text-violet-600"}`}>
                      Today&apos;s Type Challenge ✦
                    </p>
                    <p className={`text-sm font-medium ${challengeDone ? "text-emerald-700" : "text-slate-700"}`}>
                      {challengeDone ? "Challenge complete!" : "Can you identify the type?"}
                    </p>
                  </div>
                  <Link
                    href="/type-match"
                    className="flex items-center gap-1 text-xs font-semibold shrink-0"
                    style={{ color: challengeDone ? "#059669" : "#8b5cf6" }}
                    onClick={() => {
                      try {
                        localStorage.setItem(storageKey, "1");
                        setChallengeDone(true);
                      } catch {}
                    }}
                  >
                    {challengeDone ? "Play again" : "Play full game"}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Cards preview */}
                {!challengeDone && (
                  <div className="p-3 space-y-2">
                    {dailyCards.map((card) => (
                      <Link
                        key={card.id}
                        href="/type-match"
                        className="block"
                        onClick={() => {
                          try {
                            localStorage.setItem(storageKey, "1");
                            setChallengeDone(true);
                          } catch {}
                        }}
                      >
                        <div
                          className="rounded-xl p-3 border transition-all hover:scale-[1.01]"
                          style={{ background: "rgba(255,255,255,0.7)", borderColor: "rgba(139,92,246,0.15)" }}
                        >
                          <span
                            className="inline-block text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1.5"
                            style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6" }}
                          >
                            {card.tag}
                          </span>
                          <p className="text-[13px] text-slate-700 leading-snug font-serif italic line-clamp-2">
                            {card.prompt}
                          </p>
                          <p className="text-[10px] text-violet-500 font-semibold mt-1.5">
                            Tap to guess the type →
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* ── Today's Reading card ── */}
        {onStartReading && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.39 }}
            className="mb-6"
          >
            <button
              onClick={onStartReading}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                readingDoneToday
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white/80 backdrop-blur-sm border-indigo-100/60 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  readingDoneToday
                    ? "bg-emerald-100"
                    : "bg-gradient-to-br from-indigo-100 to-violet-100"
                }`}>
                  {readingDoneToday
                    ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                    : <BookOpen className="w-5 h-5 text-indigo-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${readingDoneToday ? "text-emerald-600" : "text-indigo-600"}`}>
                      Today&apos;s Reading
                    </span>
                    {!readingDoneToday && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-amber-100 text-amber-700">+25 tokens</span>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${readingDoneToday ? "text-emerald-700" : "text-slate-700"}`}>
                    {readingDoneToday ? "Reading complete, great work!" : "Tap to read today's insight"}
                  </p>
                </div>
                {!readingDoneToday && (
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </button>
          </motion.div>
        )}

        {/* ── Daily insight card ── */}
        {insightData && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
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
              <p className="text-xs text-slate-400 mb-2">{insightData.author}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{insightData.reflection}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
