"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Flame,
  Star,
  Trophy,
  Heart,
  Zap,
  Lock,
  Gift,
  ShoppingBag,
  Target,
  Crown,
  Shield,
  Sparkles,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Gem,
  Coffee,
  BookOpen,
  Brain,
  Compass,
  ArrowRight,
  Share2,
} from "lucide-react";
import NextStepBanner from "@/components/NextStepBanner";
import StreakShareCard from "@/components/StreakShareCard";
import {
  useGameState,
  BADGE_DEFINITIONS,
  SHOP_ITEMS,
  TOPIC_TREE,
  DAILY_GOAL_XP,
  DAILY_GOAL_MINUTES,
  LEAGUE_COLORS,
  LEAGUE_NAMES,
  getXPProgress,
  getLeague,
  generateLeaderboard,
  getPetMood,
  getMasteryLevel,
  type DailyGoal,
  type Badge,
  type League,
} from "@/hooks/useGameState";
import { enneagramTypes } from "@/data/enneagram";
import PetSprite from "@/components/PetSprite";
import { usePetState } from "@/hooks/usePetState";
import { useRewards } from "@/components/Rewards";
import GameIntro from "@/components/GameIntro";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};


// ─── Sub-Components ──────────────────────────────────────────────────────────

function XPBar({
  xpInLevel,
  xpForNextLevel,
  progress,
  level,
}: {
  xpInLevel: number;
  xpForNextLevel: number;
  progress: number;
  level: number;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
          Level {level}
        </span>
        <span className="font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
          {xpInLevel.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress * 100, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
      </div>
    </div>
  );
}

function CircularProgress({
  progress,
  size = 120,
  strokeWidth = 8,
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - Math.min(progress, 1) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function StatPill({
  icon: Icon,
  value,
  label,
  iconStyle,
  valueStyle,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: string | number;
  label: string;
  iconStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl">
      <Icon className="w-4 h-4" style={iconStyle} />
      <div>
        <div className="text-sm font-mono font-semibold" style={valueStyle}>{value}</div>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Section Components ──────────────────────────────────────────────────────

function HeaderSection({
  state,
  xpProgress,
  enneagramType,
  cognitiveType,
}: {
  state: any;
  xpProgress: any;
  enneagramType?: number;
  cognitiveType?: string;
}) {
  const leagueColor = LEAGUE_COLORS[state.league as League];
  const [showShareCard, setShowShareCard] = useState(false);

  return (
    <>
    <motion.div {...fadeUp} className="mb-8">
      {/* Top Stats Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* League Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${leagueColor.gradient} text-white shadow-lg`}>
          <Crown className="w-4 h-4" />
          <span className="text-sm font-semibold">{LEAGUE_NAMES[state.league as League]}</span>
        </div>

        {/* Streak — with share button */}
        <div className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-2xl bg-orange-50 border border-orange-200">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-mono font-semibold text-orange-600">{state.streakCount}</span>
          <span className="text-[10px] text-orange-400 uppercase tracking-wider">streak</span>
          {state.streakCount >= state.longestStreak && state.streakCount > 0 && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-600 border border-amber-200">(PB)</span>
          )}
          <button
            onClick={() => setShowShareCard(true)}
            className="ml-1 p-1 rounded-lg text-orange-400 hover:text-orange-600 hover:bg-orange-100 transition-all"
            title="Share your streak"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Growth Streak */}
        {(state.growthStreakCount ?? 0) > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-sm">~</span>
            <span className="text-sm font-mono font-semibold text-emerald-600">{state.growthStreakCount}</span>
            <span className="text-[10px] text-emerald-500 uppercase tracking-wider">growth streak</span>
          </div>
        )}

        {/* Tokens */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200">
          <Gem className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-mono font-semibold text-amber-600">{state.tokens}</span>
          <span className="text-[10px] text-amber-400 uppercase tracking-wider">tokens</span>
        </div>

        {/* Total XP */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-50 border border-sky-200">
          <Zap className="w-4 h-4 text-sky-500" />
          <span className="text-sm font-mono font-semibold text-sky-600">{state.xp.toLocaleString()}</span>
          <span className="text-[10px] text-sky-400 uppercase tracking-wider">total xp</span>
        </div>

        {/* Streak Freezes */}
        {state.streakFreezes > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-50 border border-cyan-200">
            <Shield className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-mono font-semibold text-cyan-600">{state.streakFreezes}</span>
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider">freezes</span>
          </div>
        )}
      </div>

      {/* XP Progress Bar */}
      <XPBar
        xpInLevel={xpProgress.xpInLevel}
        xpForNextLevel={xpProgress.xpForNextLevel}
        progress={xpProgress.progress}
        level={xpProgress.currentLevel}
      />
    </motion.div>

    {/* Streak Share Card modal */}
    {showShareCard && (
      <StreakShareCard
        streak={state.streakCount}
        longestStreak={state.longestStreak}
        level={xpProgress.currentLevel}
        league={state.league}
        totalXP={state.xp}
        enneagramType={enneagramType}
        cognitiveType={cognitiveType}
        onClose={() => setShowShareCard(false)}
      />
    )}
    </>
  );
}

function DailyGoalSection({
  state,
  onChangeGoal,
}: {
  state: any;
  onChangeGoal: (goal: DailyGoal) => void;
}) {
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const goalTarget = DAILY_GOAL_XP[state.dailyGoal as DailyGoal];
  const progress = goalTarget > 0 ? state.dailyXPEarned / goalTarget : 0;

  const goals: { key: DailyGoal; label: string; minutes: number; xp: number }[] = [
    { key: "casual", label: "Casual", minutes: 5, xp: 50 },
    { key: "regular", label: "Regular", minutes: 15, xp: 150 },
    { key: "serious", label: "Serious", minutes: 30, xp: 300 },
    { key: "insane", label: "Insane", minutes: 60, xp: 600 },
  ];

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>Daily Goal</h3>
        <button
          onClick={() => setShowGoalPicker(!showGoalPicker)}
          className="text-xs text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1 transition-colors"
        >
          Change <ChevronDown className={`w-3 h-3 transition-transform ${showGoalPicker ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <CircularProgress progress={progress} size={110} strokeWidth={10}>
          <div className="text-center">
            {state.dailyGoalMet ? (
              <div className="text-2xl">&#x2705;</div>
            ) : (
              <>
                <div className="text-lg font-mono font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {Math.min(Math.round(progress * 100), 100)}%
                </div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider">complete</div>
              </>
            )}
          </div>
        </CircularProgress>

        <div className="flex-1">
          <div className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span className="font-mono font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{state.dailyXPEarned}</span>
            {" / "}
            <span className="font-mono">{goalTarget}</span> XP today
          </div>
          <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            {state.dailyGoalMet
              ? "Goal complete! Keep going for bonus XP."
              : `${goalTarget - state.dailyXPEarned} XP to go`}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Target className="w-3.5 h-3.5 text-orange-400" />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>
              {DAILY_GOAL_MINUTES[state.dailyGoal as DailyGoal]} min/day &middot;{" "}
              <span className="capitalize font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{state.dailyGoal}</span> mode
            </span>
          </div>
          {state.dailyGoalMet && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium"
            >
              <Sparkles className="w-3 h-3" /> +15 tokens earned!
            </motion.div>
          )}
        </div>
      </div>

      {/* Goal Picker */}
      <AnimatePresence>
        {showGoalPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {goals.map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    onChangeGoal(g.key);
                    setShowGoalPicker(false);
                  }}
                  className="p-3 rounded-xl text-left transition-all"
                  style={state.dailyGoal === g.key
                    ? { background: "rgba(99,102,241,0.2)", border: "2px solid rgba(99,102,241,0.5)" }
                    : { background: "rgba(255,255,255,0.05)", border: "2px solid transparent" }
                  }
                >
                  <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{g.label}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {g.minutes} min &middot; {g.xp} XP
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PetWidget({ state, petName, petType, onFeed, onTreat, onRevive }: {
  state: any;
  petName: string;
  petType: number;
  onFeed: () => void;
  onTreat: () => void;
  onRevive: () => void;
}) {
  const mood = getPetMood(state.petHealth, state.petHappiness, state.petAlive);

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 className="text-lg font-serif font-semibold mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>Your Companion</h3>

      <div className="text-center mb-4">
        <div className="flex justify-center mb-2">
          <PetSprite type={petType} size={80} />
        </div>
        <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{petName}</div>
        <div className="text-xs italic mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{mood}</div>
      </div>

      {/* Health & Happiness bars */}
      <div className="space-y-2.5 mb-4">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-400" /> Health</span>
            <span className="font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>{state.petHealth}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              className={`h-full rounded-full ${
                state.petHealth > 60 ? "bg-emerald-400" : state.petHealth > 30 ? "bg-amber-400" : "bg-rose-400"
              }`}
              animate={{ width: `${state.petHealth}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> Happiness</span>
            <span className="font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>{state.petHappiness}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              className={`h-full rounded-full ${
                state.petHappiness > 60 ? "bg-sky-400" : state.petHappiness > 30 ? "bg-amber-400" : "bg-slate-400"
              }`}
              animate={{ width: `${state.petHappiness}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {state.petAlive ? (
          <>
            <button
              onClick={onFeed}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-medium hover:bg-emerald-100 transition-colors border border-emerald-100"
            >
              <span>&#x1F356;</span> Feed (10)
            </button>
            <button
              onClick={onTreat}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-600 text-xs font-medium hover:bg-amber-100 transition-colors border border-amber-100"
            >
              <span>&#x1F36C;</span> Treat (5)
            </button>
          </>
        ) : (
          <button
            onClick={onRevive}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-violet-50 text-violet-600 text-xs font-medium hover:bg-violet-100 transition-colors border border-violet-100"
          >
            <span>&#x1F49A;</span> Revive (100 tokens)
          </button>
        )}
      </div>
    </motion.div>
  );
}

function BadgeGrid({ badges }: { badges: Badge[] }) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>Achievements</h3>
        <span className="text-xs font-mono text-slate-400">
          {badges.length} / {BADGE_DEFINITIONS.length}
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
        {BADGE_DEFINITIONS.map((def) => {
          const earned = badges.find((b) => b.id === def.id);
          const isHovered = hoveredBadge === def.id;

          return (
            <div
              key={def.id}
              className="relative"
              onMouseEnter={() => setHoveredBadge(def.id)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`w-full aspect-square rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all ${
                  earned
                    ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-400/50 shadow-sm"
                    : "border-2 border-white/10 grayscale opacity-40"
                }`}
              >
                {earned ? (
                  <span>{def.icon}</span>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-300" />
                )}
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-[10px] rounded-xl whitespace-nowrap z-20 shadow-lg pointer-events-none"
                  >
                    <div className="font-semibold">{def.name}</div>
                    <div className="text-slate-300 mt-0.5">{def.description}</div>
                    {earned?.earnedAt && (
                      <div className="text-slate-400 mt-1">
                        Earned {new Date(earned.earnedAt).toLocaleDateString()}
                      </div>
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-800 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SkillTree({
  topicProgress,
  isTopicUnlocked,
}: {
  topicProgress: Record<string, number>;
  isTopicUnlocked: (id: string) => boolean;
}) {
  const router = useRouter();

  // Split into two columns: Enneagram path and Cognitive path
  const enneagramPath = TOPIC_TREE.filter((t) =>
    ["enneagram-basics", "core-type", "subtypes-instincts", "tritypes"].includes(t.id)
  );
  const cognitivePath = TOPIC_TREE.filter((t) =>
    ["cognitive-intro", "function-stack", "shadow-functions", "loops-grips"].includes(t.id)
  );
  const standalone = TOPIC_TREE.filter((t) => t.id === "history");

  const NodeComponent = ({ topic, index }: { topic: typeof TOPIC_TREE[0]; index: number }) => {
    const unlocked = isTopicUnlocked(topic.id);
    const progress = topicProgress[topic.id] ?? 0;

    return (
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index }}
        className="relative"
      >
        {/* Connector line */}
        {index > 0 && (
          <div className="absolute left-6 -top-4 w-0.5 h-4 bg-slate-200" />
        )}

        <div
          onClick={() => unlocked && router.push(topic.href)}
          role={unlocked ? "button" : undefined}
          tabIndex={unlocked ? 0 : undefined}
          onKeyDown={(e) => unlocked && e.key === "Enter" && router.push(topic.href)}
          className="relative flex items-center gap-4 p-4 rounded-2xl transition-all"
          style={unlocked
            ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }
            : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.6, cursor: "not-allowed" }
          }
        >
          {/* Node circle */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              progress >= 100
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-200/50"
                : unlocked
                ? "bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-lg shadow-sky-200/50"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            {progress >= 100 ? (
              <Check className="w-5 h-5" />
            ) : unlocked ? (
              <span className="text-xs font-mono font-bold">{progress}%</span>
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.85)" }}>{topic.name}</span>
              <span className="text-[10px] font-mono text-amber-500 flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5" /> {topic.xpReward}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate">{topic.description}</div>

            {/* Progress bar */}
            {unlocked && progress > 0 && progress < 100 && (
              <div className="h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            )}

            {!unlocked && topic.unlockCondition && (
              <div className="text-[10px] text-orange-500 mt-1.5 flex items-center gap-1 font-medium">
                <Lock className="w-2.5 h-2.5 shrink-0" />
                <span>{topic.unlockCondition}</span>
              </div>
            )}
          </div>

          {unlocked && progress < 100 && (
            <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0" />
          )}
          {!unlocked && (
            <ChevronRight className="w-4 h-4 text-orange-300 flex-shrink-0 opacity-50" />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 className="text-lg font-serif font-semibold mb-6" style={{ color: "rgba(255,255,255,0.9)" }}>Learning Path</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Enneagram Path */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">
              <Compass className="w-4 h-4 text-sky-500" />
            </div>
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Enneagram Track</span>
          </div>
          <div className="space-y-3">
            {enneagramPath.map((topic, i) => (
              <NodeComponent key={topic.id} topic={topic} index={i} />
            ))}
          </div>
        </div>

        {/* Cognitive Path */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Brain className="w-4 h-4 text-indigo-500" />
            </div>
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Cognitive Track</span>
          </div>
          <div className="space-y-3">
            {cognitivePath.map((topic, i) => (
              <NodeComponent key={topic.id} topic={topic} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Standalone - History */}
      <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
            <BookOpen className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Bonus Track</span>
        </div>
        <div className="space-y-3">
          {standalone.map((topic, i) => (
            <NodeComponent key={topic.id} topic={topic} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TokenShop({ tokens, onPurchase }: { tokens: number; onPurchase: (id: string) => void }) {
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);

  const handlePurchase = (id: string) => {
    onPurchase(id);
    setPurchaseFeedback(id);
    setTimeout(() => setPurchaseFeedback(null), 1500);
  };

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-semibold flex items-center gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
          <ShoppingBag className="w-5 h-5 text-amber-500" /> Token Shop
        </h3>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
          <Gem className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-sm font-mono font-semibold text-amber-600">{tokens}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SHOP_ITEMS.map((item) => {
          const canAfford = tokens >= item.cost;
          const justPurchased = purchaseFeedback === item.id;

          return (
            <motion.div
              key={item.id}
              whileHover={item.available ? { scale: 1.02 } : {}}
              className="relative p-4 rounded-2xl border transition-all"
              style={!item.available
                ? { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.6 }
                : canAfford
                ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", opacity: 0.7 }
              }
            >
              {!item.available && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                  Coming Soon
                </div>
              )}

              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{item.name}</div>
              <div className="text-[11px] mt-0.5 mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{item.description}</div>

              {item.available && (
                <button
                  onClick={() => canAfford && handlePurchase(item.id)}
                  disabled={!canAfford}
                  className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    justPurchased
                      ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                      : canAfford
                      ? "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  {justPurchased ? (
                    <>
                      <Check className="w-3 h-3" /> Purchased!
                    </>
                  ) : (
                    <>
                      <Gem className="w-3 h-3" /> {item.cost} tokens
                    </>
                  )}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function TypeMasterySection({ typeMastery, userEnneagramType }: { typeMastery: Record<string, number>; userEnneagramType?: number }) {
  const MASTERY_STYLES: Record<string, { background: string; color: string; boxShadow?: string }> = {
    Novice:      { background: "rgba(30, 20, 50, 0.9)",    color: "#C0C0C0" },
    Apprentice:  { background: "rgba(200, 200, 220, 0.12)", color: "rgba(255,255,255,0.85)" },
    Familiar:    { background: "rgba(201, 146, 26, 0.15)", color: "#C9921A" },
    Proficient:  { background: "rgba(201, 146, 26, 0.22)", color: "#D4A017" },
    Advanced:    { background: "rgba(155, 44, 44, 0.18)",  color: "#E05555" },
    Master:      { background: "rgba(155, 44, 44, 0.28)",  color: "#FF6B6B", boxShadow: "0 0 20px rgba(155,44,44,0.4)" },
  };

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.32 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 className="text-lg font-serif font-semibold mb-1 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
        <Star className="w-5 h-5 text-violet-400" /> Type Mastery
      </h3>
      <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Complete type-specific lessons to earn mastery points for each of the 9 types.</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {enneagramTypes.map((type) => {
          const points = typeMastery?.[String(type.number)] ?? 0;
          const started = points > 0;
          const label = getMasteryLevel(points);
          const masteryStyle = MASTERY_STYLES[label] ?? { background: "rgba(30, 20, 50, 0.9)", color: "#C0C0C0" };
          const isUserType = userEnneagramType === type.number;

          return (
            <div
              key={type.number}
              className="relative flex flex-col items-center p-3 rounded-2xl transition-all"
              style={isUserType
                ? { background: "rgba(139,92,246,0.15)", border: "2px solid rgba(139,92,246,0.6)", boxShadow: "0 0 12px rgba(139,92,246,0.3)" }
                : started
                ? { background: masteryStyle.background, border: "1px solid rgba(255,255,255,0.12)", boxShadow: masteryStyle.boxShadow }
                : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.5 }
              }
            >
              {isUserType && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider" style={{ background: "rgba(139,92,246,0.8)", color: "#fff", whiteSpace: "nowrap" }}>
                  Your type
                </div>
              )}
              {/* Type Number Badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-serif font-bold mb-2"
                style={{ backgroundColor: started ? type.color : "#cbd5e1" }}
              >
                {type.number}
              </div>

              {/* Type name (short) */}
              <div className="text-[10px] text-center font-medium leading-tight mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                {type.name.replace("The ", "")}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full overflow-hidden mb-1.5" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: started ? type.color : "#cbd5e1" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${points}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              {/* Mastery label */}
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ color: started ? masteryStyle.color : "#94a3b8" }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function LeaderboardSection({ state }: { state: any }) {
  const [leaderboard] = useState(() =>
    generateLeaderboard(state.xp, state.level)
  );

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.35 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-semibold flex items-center gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
          <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
        </h3>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
          {LEAGUE_NAMES[state.league as League]} League
        </span>
      </div>

      {/* Social signal — makes leaderboard feel alive */}
      {(() => {
        const signals = [
          "(+) Type 8s are dominating this week",
          "(+) 3 new badges unlocked in your league today",
          "(*) Top players have 7+ day streaks",
          "(>) Type 4s climbing fast this week",
          "(*) 5 players hit a new personal best today",
        ];
        // Pick signal based on day of year so it changes daily but feels deterministic
        const idx = new Date().getDay() % signals.length;
        return (
          <div className="mx-4 mb-3 px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <span className="text-sm">{signals[idx]}</span>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>Updates daily</p>
          </div>
        );
      })()}

      <div className="space-y-1.5">
        {leaderboard.map((entry, i) => {
          const leagueColor = LEAGUE_COLORS[entry.league];
          return (
            <motion.div
              key={`${entry.name}-${i}`}
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all"
              style={entry.isPlayer
                ? { background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)" }
                : undefined
              }
            >
              {/* Rank */}
              <div className={`w-6 text-center text-xs font-mono font-bold ${
                i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-orange-400" : "text-slate-300"
              }`}>
                {i + 1}
              </div>

              {/* Name */}
              <div className="flex-1 text-sm truncate" style={{ fontWeight: entry.isPlayer ? 600 : 400, color: entry.isPlayer ? "#38bdf8" : "rgba(255,255,255,0.65)" }}>
                {entry.name}
              </div>

              {/* Level Badge */}
              <div className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium ${leagueColor.bg} ${leagueColor.text}`}>
                Lv.{entry.level}
              </div>

              {/* XP */}
              <div className="text-xs font-mono text-slate-400 w-16 text-right">
                {entry.xp.toLocaleString()}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function StatsSection({ state }: { state: any }) {
  const accuracy =
    state.totalAttempted > 0
      ? Math.round((state.totalCorrect / state.totalAttempted) * 100)
      : 0;

  return (
    <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
        <TrendingUp className="w-5 h-5 text-sky-500" /> Your Stats
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatPill icon={Zap} value={state.totalXPEarned.toLocaleString()} label="Lifetime XP" iconStyle={{ color: "#38bdf8" }} valueStyle={{ color: "#38bdf8" }} />
        <StatPill icon={Flame} value={state.longestStreak} label="Best Streak" iconStyle={{ color: "#fb923c" }} valueStyle={{ color: "#fb923c" }} />
        <StatPill icon={Target} value={`${accuracy}%`} label="Accuracy" iconStyle={{ color: "#34d399" }} valueStyle={{ color: "#34d399" }} />
        <StatPill icon={BookOpen} value={state.totalAttempted} label="Questions" iconStyle={{ color: "#818cf8" }} valueStyle={{ color: "#818cf8" }} />
        <StatPill icon={Trophy} value={state.badges.length} label="Badges" iconStyle={{ color: "#fbbf24" }} valueStyle={{ color: "#fbbf24" }} />
        <StatPill icon={Gem} value={state.totalTokensEarned} label="Tokens Earned" iconStyle={{ color: "#a78bfa" }} valueStyle={{ color: "#a78bfa" }} />
      </div>

      {/* XP History mini chart */}
      {state.xpHistory.length > 1 && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Recent XP Activity</div>
          <div className="flex items-end gap-1 h-16">
            {state.xpHistory.slice(-14).map((entry: { date: string; xp: number }, i: number) => {
              const maxXP = Math.max(...state.xpHistory.slice(-14).map((e: { xp: number }) => e.xp), 1);
              const height = Math.max((entry.xp / maxXP) * 100, 4);
              return (
                <motion.div
                  key={entry.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="flex-1 bg-gradient-to-t from-sky-400 to-indigo-400 rounded-t-sm min-h-[2px]"
                  title={`${entry.date}: ${entry.xp} XP`}
                />
              );
            })}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", marginTop: "6px" }}>Last 14 days of XP activity</p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Overlay Animations ──────────────────────────────────────────────────────

function LevelUpOverlay({ level }: { level: number }) {
  return (
    <>
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: 2, duration: 0.4 }}
          className="text-6xl mb-4"
        >
          &#x1F389;
        </motion.div>
        <h2 className="text-3xl font-serif font-bold text-gradient mb-2">Level Up!</h2>
        <p className="text-lg font-mono text-slate-600">Level {level}</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${LEAGUE_COLORS[getLeague(level)].gradient} text-white text-sm font-semibold`}>
            {LEAGUE_NAMES[getLeague(level)]} League
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">+{level * 5} bonus tokens!</p>
      </motion.div>
    </motion.div>
    </>
  );
}

function BadgeUnlockOverlay({ badge }: { badge: Badge }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: 2, duration: 0.5 }}
          className="text-6xl mb-4"
        >
          {badge.icon}
        </motion.div>
        <div className="text-xs text-amber-500 uppercase tracking-wider font-mono mb-2">Badge Unlocked</div>
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-1">{badge.name}</h2>
        <p className="text-sm text-slate-500">{badge.description}</p>
        <p className="text-xs text-emerald-500 mt-3">+10 tokens</p>
      </motion.div>
    </motion.div>
  );
}

function XPGainToast({ amount, source }: { amount: number; source: string }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, x: 0 }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -30, x: "-50%" }}
      className="fixed top-20 left-1/2 z-50 px-5 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl shadow-xl flex items-center gap-2"
    >
      <Zap className="w-4 h-4" />
      <span className="font-mono font-bold">+{amount} XP</span>
      <span className="text-sky-100 text-sm">{source}</span>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function GamePage() {
  const game = useGameState();
  const { state, loaded } = game;
  const { bigConfetti, balloonBurst } = useRewards();

  // Fire confetti on level-up / badge animations
  useEffect(() => {
    if (game.levelUpAnimation) bigConfetti();
  }, [game.levelUpAnimation, bigConfetti]);

  useEffect(() => {
    if (game.badgeUnlockAnimation) balloonBurst();
  }, [game.badgeUnlockAnimation, balloonBurst]);

  // Read enneagram type + cognitive type for pet and share card
  const [petType, setPetType] = useState<number>(1);
  const [profileEnneagram, setProfileEnneagram] = useState<number | undefined>();
  const [profileCognitive, setProfileCognitive] = useState<string | undefined>();
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        const t = profile.enneagramType ?? profile.enneagramCore;
        if (typeof t === "number" && t >= 1 && t <= 9) {
          setPetType(t);
          setProfileEnneagram(t);
        }
        const c = profile.cognitiveType ?? profile.mbtiType;
        if (c) setProfileCognitive(c);
      }
    } catch {}
  }, []);

  // Use the SINGLE authoritative pet system (usePetState)
  const pet = usePetState(petType);
  const petName = pet.petState?.name || state.petName || "Your Pet";
  const petHealth = pet.petState?.health ?? state.petHealth;
  const petHappiness = pet.petState?.happiness ?? state.petHappiness;
  const petAlive = pet.petState ? pet.petState.health > 0 : state.petAlive;

  // Check streak on mount
  useEffect(() => {
    if (loaded) {
      game.checkStreak();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-8 h-8 border-2 border-sky-200 border-t-sky-500 rounded-full"
        />
      </div>
    );
  }

  const xpProgress = getXPProgress(state.xp);

  return (
    <div className="min-h-screen pb-20">
      {/* Overlay Animations */}
      <AnimatePresence>
        {game.levelUpAnimation && <LevelUpOverlay level={state.level} />}
        {game.badgeUnlockAnimation && <BadgeUnlockOverlay badge={game.badgeUnlockAnimation} />}
        {game.xpGainAnimation && (
          <XPGainToast amount={game.xpGainAnimation.amount} source={game.xpGainAnimation.source} />
        )}
      </AnimatePresence>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-violet-100/15 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title */}
        <motion.div {...fadeUp} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Game Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
            Your <span className="text-gradient">Journey</span>
          </h1>
          <p className="mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            Level up your self-knowledge. Earn XP, maintain your streak, and unlock achievements.
          </p>
        </motion.div>

        {/* Header Stats */}
        <HeaderSection
          state={state}
          xpProgress={xpProgress}
          enneagramType={profileEnneagram}
          cognitiveType={profileCognitive}
        />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left column: Daily Goal + Pet */}
          <div className="lg:col-span-1 space-y-6">
            <DailyGoalSection state={state} onChangeGoal={game.setDailyGoal} />
            <PetWidget
              state={{ petHealth, petHappiness, petAlive }}
              petName={petName}
              petType={petType}
              onFeed={() => pet.feedPet(game.spendTokens)}
              onTreat={() => pet.playWithPet(game.spendTokens)}
              onRevive={() => pet.revivePet("tokens", game.spendTokens)}
            />
          </div>

          {/* Right column: Badges + Stats */}
          <div className="lg:col-span-2 space-y-6">
            <BadgeGrid badges={state.badges} />
            <StatsSection state={state} />
          </div>
        </div>

        {/* Type Mastery - Full width */}
        <div className="mb-6">
          <TypeMasterySection typeMastery={state.typeMastery ?? {}} userEnneagramType={profileEnneagram} />
        </div>

        {/* Learning Path - Full width */}
        <div className="mb-6">
          <SkillTree
            topicProgress={state.topicProgress}
            isTopicUnlocked={game.isTopicUnlocked}
          />
        </div>

        {/* Bottom Row: Shop + Leaderboard */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <TokenShop tokens={state.tokens} onPurchase={game.purchaseItem} />
          <LeaderboardSection state={state} />
        </div>

        {/* Quick Actions */}
        <motion.div {...fadeUp} transition={{ delay: 0.45 }} className="p-6 rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg">
          <h3 className="text-lg font-serif font-semibold mb-1">Ready to earn XP?</h3>
          <p className="text-white/60 text-xs mb-4">Quick games earn XP fast</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/daily"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Flame className="w-4 h-4" /> Daily Quiz
            </Link>
            <Link
              href="/sprint"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/25 hover:bg-white/35 text-white rounded-xl text-sm font-bold transition-all backdrop-blur-sm border border-white/30"
            >
              <Award className="w-4 h-4" /> Sprint Mode
            </Link>
            <Link
              href="/type-match"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Brain className="w-4 h-4" /> Type Match
            </Link>
            <Link
              href="/enneagram/learn"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Compass className="w-4 h-4" /> Learn Enneagram
            </Link>
            <Link
              href="/cognitive/learn"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Brain className="w-4 h-4" /> Learn Cognitive
            </Link>
          </div>
        </motion.div>

        <GameIntro />

        {/* Next Step Banner */}
        <div className="mt-2">
          <NextStepBanner
            href="/daily"
            label="Go to today's practice"
            sublabel="Complete your daily quiz and earn XP toward your next league"
            icon={<Flame className="w-5 h-5" />}
            color="#f97316"
            dismissKey="game-daily-practice"
          />
        </div>
      </div>
    </div>
  );
}
