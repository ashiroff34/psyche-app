"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Flame, Zap, Heart, ArrowRight, Sparkles, BookOpen, CheckCircle, Target, Star, Clock, Lock, ChevronRight, Coins, Brain, Trophy, Share2, X, Mail } from "lucide-react";
import { useVerifiedShare } from "@/hooks/useVerifiedShare";
import { TYPE_COLORS } from "@/data/enneagram";
import { resolveTypeAwareCopy } from "@/hooks/useTypeAwareCopy";
import { useSubtypeAwareCopy } from "@/hooks/useSubtypeAwareCopy";
import StateCheckIn from "@/components/daily/StateCheckIn";
import LuckyDropToast from "@/components/daily/LuckyDropToast";
import ChibiMessage from "@/components/ChibiMessage";
import BodyMapCheckIn from "@/components/daily/BodyMapCheckIn";
import ReminderPrompt from "@/components/daily/ReminderPrompt";
import MorningEvening from "@/components/daily/MorningEvening";
import PracticeOfOpposite from "@/components/daily/PracticeOfOpposite";
import QuestionOfWeek from "@/components/daily/QuestionOfWeek";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { pickByFocus } from "@/data/psychometrics/regulatory-focus";
import { getFreshStartWindow, getFreshStartCopy, getImplementationIntent, type FreshStartCopy } from "@/lib/fresh-start";
import { isBonusDayToday } from "@/lib/variable-rewards";
import { getTodaysNorm } from "@/data/descriptive-norms";
import { recordSessionStart, recordSessionEnd, recordFeatureOffered } from "@/lib/behavioral-signals";
import { safeGet, safeSet, safeGetJSON, safeSetJSON } from "@/lib/safe-storage";
import ReactionTimeGame from "@/components/daily/ReactionTimeGame";

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

// ─── Today's Insight affirmations (type-specific, identity-reinforcing) ──────
const TYPE_AFFIRMATIONS: Record<number, string> = {
  1: "Your standards aren't perfectionism — they're your integrity speaking.",
  2: "Giving freely is your strength. Receiving is your practice.",
  3: "Your worth isn't in the doing. It's in the being.",
  4: "Your depth isn't a burden. It's your gift to the world.",
  5: "Your mind is your compass. Trust what you observe.",
  6: "Your loyalty is rare. It starts with trusting yourself.",
  7: "Joy isn't just for tomorrow. You can have it now, fully.",
  8: "Your power protects. Softness doesn't diminish it.",
  9: "Your peace matters. Claim it without apology.",
};

// ─── Pattern of the Day (Noom behavior chain tactic) ─────────────────────────
// Trigger → Thought → Pattern. Rotates by day-of-week across 9 type entries.
const TYPE_PATTERNS: Record<number, string> = {
  1: "Trigger: Something isn't done right. Thought: 'If I don't fix this, no one will.' Pattern: You take it on — and resent it later.",
  2: "Trigger: Someone seems to need help. Thought: 'They can't manage without me.' Pattern: You give — then feel overlooked when they don't notice.",
  3: "Trigger: A chance to impress. Thought: 'My worth depends on this.' Pattern: You perform — and lose track of what you actually want.",
  4: "Trigger: Someone doesn't notice your effort. Thought: 'I'm invisible.' Pattern: You pull away — before they can leave first.",
  5: "Trigger: Someone wants more of your time. Thought: 'I'll run empty.' Pattern: You withdraw — and miss the connection you secretly wanted.",
  6: "Trigger: Uncertainty appears. Thought: 'What if the worst happens?' Pattern: You plan for every disaster — and exhaust yourself before anything goes wrong.",
  7: "Trigger: A difficult feeling surfaces. Thought: 'I can outrun this.' Pattern: You pivot to something exciting — and the feeling waits.",
  8: "Trigger: You feel vulnerable. Thought: 'Weakness gets you hurt.' Pattern: You go harder — and the people closest to you feel pushed away.",
  9: "Trigger: Conflict emerges. Thought: 'It's not worth the disruption.' Pattern: You go along — and slowly disappear.",
};

// ─── Day 2 streak celebration copy (type-specific) ──────────────────────────
const DAY2_COPY: Record<number, string> = {
  1: "Day 2. The discipline is real. You're already ahead of most.",
  2: "Day 2. You showed up for yourself this time. That matters.",
  3: "Day 2. Consistency is the quiet kind of winning.",
  4: "Day 2. Depth requires return. You came back.",
  5: "Day 2. Consistency is the experiment. Data point collected.",
  6: "Day 2. You trusted the process. That took courage.",
  7: "Day 2. Staying is its own kind of adventure.",
  8: "Day 2. Strength is showing up when no one's watching.",
  9: "Day 2. Your presence matters. Even here.",
};
import WeeklyChallengeCard from "./WeeklyChallengeCard";
import IntegrationCompanion from "./IntegrationCompanion";
import DailyInsightCard from "@/components/DailyInsightCard";
import DailyObservationCard from "./DailyObservationCard";
import StreakCard from "@/components/streak/StreakCard";
import MorningPassionCheckIn from "./MorningPassionCheckIn";
import TheoryPracticeCard from "./TheoryPracticeCard";
import AudioReflection from "@/components/AudioReflection";
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
  // Contested type confidence
  isTypeContested?: boolean;
  contestedRunnerUp?: number;

  // Weekly challenge
  weeklyChallenge?: {
    id: string; name: string; emoji: string; description: string;
    goal: number; xpReward: number; tokenReward: number;
    progress: number; completed: boolean; rewardClaimed: boolean;
  };
  onClaimWeeklyReward?: () => void;
  onStreakShop?: () => void;
  /** Whether today's daily goal has been met (used to suppress streak-at-risk notifications) */
  dailyGoalMet?: boolean;
}

// ── Mastery Section ───────────────────────────────────────────────────────────
const MASTERY_CONCEPTS = [
  { id: "enneagram-core", label: "Core Enneagram", color: "#7c3aed", tags: ["enneagram", "type", "core"] },
  { id: "cognitive-functions", label: "Cognitive Functions", color: "#2563eb", tags: ["cognitive", "jungian", "mbti", "function"] },
  { id: "instinctual-subtypes", label: "Instincts & Subtypes", color: "#059669", tags: ["instinct", "subtype", "sp", "sx", "so", "hornevian", "harmonic"] },
  { id: "integration", label: "Integration & Growth", color: "#ea580c", tags: ["integration", "growth", "health", "levels"] },
];

function MasterySection({ units }: { units: PathUnit[] }) {
  const [open, setOpen] = useState(false);
  const [masteryData, setMasteryData] = useState<{ pct: number }[]>(MASTERY_CONCEPTS.map(() => ({ pct: 0 })));

  useEffect(() => {
    try {
      // Use completed lessons from psyche-completed-lessons
      const completedRaw = localStorage.getItem("psyche-completed-lessons");
      const completedIds = new Set<string>(completedRaw ? JSON.parse(completedRaw) : []);

      // Also check psyche-lesson-progress
      const progressRaw = localStorage.getItem("psyche-lesson-progress");
      const progressMap: Record<string, boolean> = progressRaw ? JSON.parse(progressRaw) : {};
      for (const [k, v] of Object.entries(progressMap)) {
        if (v) completedIds.add(k);
      }

      // Count completed lessons per concept by matching node IDs against concept tags
      const data = MASTERY_CONCEPTS.map(concept => {
        let total = 0;
        let completed = 0;
        for (const unit of units) {
          for (const node of unit.nodes) {
            // Check if node label/id/unitName contains any concept tag
            const searchStr = `${node.id} ${node.label} ${node.unitName} ${node.sublabel}`.toLowerCase();
            const matches = concept.tags.some(tag => searchStr.includes(tag));
            if (matches) {
              total++;
              if (completedIds.has(node.id) || node.status === "completed") completed++;
            }
          }
        }
        // Minimum of 5 "total" lessons per concept so bars show something meaningful
        const effectiveTotal = Math.max(total, 5);
        const pct = Math.round((completed / effectiveTotal) * 100);
        return { pct };
      });
      setMasteryData(data);
    } catch {}
  }, [units]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-2.5">
          <Trophy className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Mastery</span>
        </div>
        <ChevronRight
          className="w-4 h-4 transition-transform"
          style={{ color: "rgba(255,255,255,0.3)", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {MASTERY_CONCEPTS.map((concept, i) => (
                <div key={concept.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{concept.label}</span>
                    <span className="text-[10px] font-bold" style={{ color: concept.color }}>{masteryData[i].pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${concept.color}cc, ${concept.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${masteryData[i].pct}%` }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
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
  isTypeContested,
  contestedRunnerUp,
  weeklyChallenge,
  onClaimWeeklyReward,
  onStreakShop,
  dailyGoalMet = false,
}: Props) {
  const subtypeCopy = useSubtypeAwareCopy();
  // Alternate between regular greeting and philosophical provocation (even/odd days)
  const isPhilosophyDay = new Date().getDate() % 2 === 0;
  const subtypeGreeting = enneagramType > 0
    ? (isPhilosophyDay ? subtypeCopy("daily.philosophical.provocation") : subtypeCopy("hub.subtype.greeting"))
    : "";
  const subtypeGrowthFocus = enneagramType > 0 ? subtypeCopy("growth.focus") : "";
  const { regFocus } = usePsychometrics();
  const focusedStartLabel = pickByFocus(regFocus?.dominant, {
    promotion: "Today's next unlock",
    prevention: "Stay on track today",
    balanced: "Start here",
  });
  // Fresh-start effect (Dai, Milkman, Riis 2014): surface a banner on
  // temporal landmarks (Mondays, 1st of month, birthday, season changes).
  // Dismissed per-window with a localStorage key.
  const [freshStartState] = useState<{ visible: boolean; window: ReturnType<typeof getFreshStartWindow>; copy: FreshStartCopy | null; dismissKey?: string }>(() => {
    if (typeof window === "undefined") return { visible: false, window: "none" as const, copy: null };
    const w = getFreshStartWindow(new Date(), null);
    if (w === "none") return { visible: false, window: w, copy: null };
    const dismissKey = `psyche-fresh-start-dismissed-${w}-${new Intl.DateTimeFormat("en-CA").format(new Date())}`;
    if (localStorage.getItem(dismissKey)) return { visible: false, window: w, copy: null };
    const copy = getFreshStartCopy(w, name ?? null, enneagramType || null);
    return { visible: true, window: w, copy, dismissKey };
  });
  const [freshStartVisible, setFreshStartVisible] = useState(freshStartState.visible);
  const implementationIntent = typeof window !== "undefined" ? getImplementationIntent() : null;
  const bonusDay = typeof window !== "undefined" ? isBonusDayToday() : false;
  const todaysNorm = getTodaysNorm(enneagramType || null);

  // Session tracking (behavioral signals)
  useEffect(() => {
    recordSessionStart();
    const handleUnload = () => recordSessionEnd();
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") recordSessionEnd();
    };
    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibility);
    // Track which features are offered
    if (enneagramType > 0) {
      recordFeatureOffered("morning-intention");
      recordFeatureOffered("practice-opposite");
      recordFeatureOffered("body-map");
      recordFeatureOffered("state-checkin");
      recordFeatureOffered("question-of-week");
    }
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
      recordSessionEnd();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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

  // Daily-complete share prompt, shows once per day when all nodes are done
  const DAILY_SHARE_DISMISS_KEY = `psyche-daily-share-dismissed-${getDateKey()}`;
  const allDoneToday = completedToday >= totalNodes && totalNodes > 0;
  const [shareDismissed, setShareDismissed] = useState(() => {
    try { return typeof window !== "undefined" && !!localStorage.getItem(DAILY_SHARE_DISMISS_KEY); }
    catch { return false; }
  });
  const showDailySharePrompt = allDoneToday && !shareDismissed;

  const dailyShareHook = useVerifiedShare({
    shareId: `daily-complete-${getDateKey()}`,
    tokensPerShare: 10,
    title: "I just finished today's practice on Thyself",
    text: `Day ${streak > 0 ? streak : 1} done. Know thyself. thyself.app`,
    url: "https://thyself.app",
  });

  // Hoisted from IIFE to fix Rules of Hooks violation
  const challengeDateKey = getDateKey();
  const challengeStorageKey = `psyche-type-challenge-done-${challengeDateKey}`;
  const [challengeDone, setChallengeDone] = useState(false);
  useEffect(() => {
    try {
      setChallengeDone(!!localStorage.getItem(challengeStorageKey));
    } catch {}
  }, [challengeStorageKey]);

  // ─── Feature 1: Day 2 Streak Celebration Banner ───────────────────────────
  const dateKey = getDateKey();
  const day2DismissKey = `psyche-day2-banner-dismissed-${dateKey}`;
  const [day2Dismissed, setDay2Dismissed] = useState(() => {
    return safeGet(day2DismissKey) === "1";
  });
  const showDay2Banner = streak === 1 && enneagramType > 0 && !day2Dismissed;
  const day2TypeColor = TYPE_COLORS[enneagramType] ?? "#8b5cf6";

  // ─── Feature 2: "What to do next" Nudge Card ─────────────────────────────
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const completedLessons = safeGetJSON<string[]>("psyche-completed-lessons", []);
  const showNudgeCard = !nudgeDismissed && completedLessons.length < 3 && streak < 5 && enneagramType > 0;

  // ─── Feature 3: Soft Email Capture (3rd visit) ────────────────────────────
  const [emailCaptureVisible, setEmailCaptureVisible] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Increment daily visit count
    const visitCount = parseInt(safeGet("psyche-daily-visit-count", "0") ?? "0", 10) + 1;
    safeSet("psyche-daily-visit-count", String(visitCount));

    // Only show on 3rd+ visit
    if (visitCount < 3) return;

    // Check if already has email
    const profile = safeGetJSON<{ email?: string }>("psyche-profile", {});
    if (profile.email) return;

    // Check if dismissed within last 14 days
    const dismissedDate = safeGet("psyche-email-capture-dismissed");
    if (dismissedDate) {
      const dismissed = new Date(dismissedDate);
      const now = new Date();
      const daysDiff = (now.getTime() - dismissed.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 14) return;
    }

    setEmailCaptureVisible(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEmailSubmit = () => {
    if (!emailInput.trim() || !emailInput.includes("@")) return;
    const profile = safeGetJSON<Record<string, unknown>>("psyche-profile", {});
    profile.email = emailInput.trim();
    safeSetJSON("psyche-profile", profile);
    setEmailSubmitted(true);
    setTimeout(() => setEmailCaptureVisible(false), 2000);
  };

  const handleEmailDismiss = () => {
    safeSet("psyche-email-capture-dismissed", new Date().toISOString());
    setEmailCaptureVisible(false);
  };

  const typeGlowColor = enneagramType > 0 ? (TYPE_COLORS[enneagramType] ?? "#7c3aed") : "#7c3aed";

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0f0a1e",
      }}
    >
      {/* Ambient type-color glow — fixed, doesn't scroll */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${typeGlowColor}22 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
          transition: "background 1s ease",
        }}
      />

      {/* Variable reinforcement lucky drop toast */}
      <LuckyDropToast actionId="hub-visit" />

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-32">

        {/* ── Bonus Day banner (variable reinforcement) ── */}
        {bonusDay && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 px-4 py-3 rounded-2xl flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(234,179,8,0.18), rgba(217,70,239,0.14))",
              border: "1px solid rgba(234,179,8,0.4)",
            }}
          >
            <Sparkles className="w-5 h-5 text-yellow-300 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-200">
                Bonus day
              </p>
              <p className="text-xs opacity-85">All tokens earned today are doubled.</p>
            </div>
          </motion.div>
        )}

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

        {/* ── Day 2 Streak Celebration Banner ── */}
        <AnimatePresence>
          {showDay2Banner && (
            <motion.div
              key="day2-banner"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              className="mb-4 relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(15,10,30,0.6)",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
              }}
            >
              {/* Gradient border effect */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${day2TypeColor}, #8b5cf6, ${day2TypeColor})`,
                  margin: "-1px",
                  borderRadius: "inherit",
                }}
              />
              <div className="px-4 py-3 flex items-start gap-3" style={{ background: "rgba(15,10,30,0.92)", borderRadius: "inherit" }}>
                <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: day2TypeColor }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: day2TypeColor }}>
                    Welcome back
                  </p>
                  <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {DAY2_COPY[enneagramType] ?? "Day 2. You came back. That matters."}
                  </p>
                </div>
                <button
                  onClick={() => {
                    safeSet(day2DismissKey, "1");
                    setDay2Dismissed(true);
                  }}
                  aria-label="Dismiss"
                  className="shrink-0 mt-0.5 opacity-50 hover:opacity-90 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── "What to do next" Nudge Card ── */}
        <AnimatePresence>
          {showNudgeCard && (
            <motion.div
              key="nudge-card"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(99,102,241,0.06)",
                borderLeft: `3px solid ${TYPE_COLORS[enneagramType] ?? "#8b5cf6"}`,
                border: "1px solid rgba(99,102,241,0.15)",
                borderLeftWidth: "3px",
                borderLeftColor: TYPE_COLORS[enneagramType] ?? "#8b5cf6",
              }}
            >
              <div className="px-4 py-3 flex items-center gap-3">
                <Link href="/lessons" className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,0.12)" }}
                  >
                    <BookOpen className="w-4 h-4" style={{ color: TYPE_COLORS[enneagramType] ?? "#8b5cf6" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Recommended next
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                      Start your Type {enneagramType} deep dive &rarr;
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setNudgeDismissed(true)}
                  aria-label="Dismiss"
                  className="shrink-0 opacity-40 hover:opacity-80 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Soft Email Capture (3rd visit) ── */}
        <AnimatePresence>
          {emailCaptureVisible && (
            <motion.div
              key="email-capture"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 rounded-2xl"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.18)",
              }}
            >
              <div className="px-4 py-3">
                {emailSubmitted ? (
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-sm font-medium" style={{ color: "#34d399" }}>
                      You&apos;re subscribed! Watch for your first insight.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 shrink-0" style={{ color: "#a78bfa" }} />
                      <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                        Want your weekly type insight delivered?
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        aria-label="Email address for weekly type insight"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                        className="flex-1 min-w-0 px-3 py-2 rounded-xl text-sm outline-none"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(139,92,246,0.25)",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      />
                      <button
                        onClick={handleEmailSubmit}
                        className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                          boxShadow: "0 2px 8px rgba(139,92,246,0.3)",
                        }}
                      >
                        Subscribe
                      </button>
                    </div>
                    <button
                      onClick={handleEmailDismiss}
                      className="mt-2 text-xs transition-opacity hover:opacity-80"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Not now
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Visual hero: ring + chibi companion ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center mb-10"
        >
          {/* Progress ring (no chibi inside, clean ring only) */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-25"
              style={{ background: "radial-gradient(circle, #8b5cf6, #ec4899)", transform: "scale(1.2)" }}
            />
            <svg width="140" height="140" viewBox="0 0 140 140" className="relative">
              <defs>
                <linearGradient id="hub-ring-grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(233,213,255,0.12)" strokeWidth="6" />
              <motion.circle
                cx="70" cy="70" r="52" fill="none"
                stroke="url(#hub-ring-grad-top)"
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={ringCircumference}
                initial={{ strokeDashoffset: ringCircumference }}
                animate={{ strokeDashoffset: ringCircumference - (ringCircumference * overallProgress) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                style={{ transform: "rotate(-90deg)", transformOrigin: "70px 70px", filter: "drop-shadow(0 0 8px rgba(139,92,246,0.5))" }}
              />
              {/* Progress % in center */}
              <text x="70" y="74" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="700" fill="rgba(255,255,255,0.85)">
                {overallProgress}%
              </text>
              <text x="70" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.3)" letterSpacing="2">TODAY</text>
            </svg>
          </div>

          {/* Chibi companion */}
          {enneagramType > 0 && (
            <div className="relative flex flex-col items-center mt-2">
              <ChibiSprite
                type={enneagramType}
                instinct={instinct}
                size={150}
                state={warmupDoneToday ? "happy" : "idle"}
              />
            </div>
          )}

          {/* XP progress bar */}
          {xpToNext !== null && nextMilestoneLabel && (
            <div className="mt-4 w-48">
              <div className="flex justify-between text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span>{xpLabel}</span>
                <span>{xpToNext} to {nextMilestoneLabel}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #8b5cf6, #ec4899)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Type identity pills */}
          {(enneagramType > 0 || jungianType) && (
            <div className="flex flex-col items-center gap-1.5 mt-3">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {enneagramType > 0 && (
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ background: "rgba(139,92,246,0.2)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}
                  >
                    Type {enneagramType}
                  </span>
                )}
                {jungianType && (
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono"
                    style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}
                  >
                    {jungianType}
                  </span>
                )}
              </div>
              {/* Contested type indicator */}
              {isTypeContested && contestedRunnerUp && enneagramType > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px]"
                  style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "rgba(251,191,36,0.8)" }}
                >
                  <span>⚡</span>
                  <span>You&apos;re between Type {enneagramType} &amp; Type {contestedRunnerUp} — keep exploring</span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Streak Card ── */}
        <div className="mb-4">
          <StreakCard
            streak={streak}
            longest={longestStreak}
            freezeTokens={streakFreezes}
            enneagramType={enneagramType > 0 ? enneagramType : undefined}
            dailyCompleted={dailyGoalMet}
            onClick={onStreakShop}
          />
        </div>

        {/* ── Today's Insight affirmation (type-aware, identity-reinforcing) ── */}
        {enneagramType > 0 && TYPE_AFFIRMATIONS[enneagramType] && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-4 rounded-2xl px-4 py-3"
            style={{
              background: `linear-gradient(135deg, ${TYPE_COLORS[enneagramType] ?? "#8b5cf6"}12, rgba(255,255,255,0.02))`,
              border: `1px solid ${TYPE_COLORS[enneagramType] ?? "#8b5cf6"}28`,
            }}
          >
            <p
              className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5"
              style={{ color: TYPE_COLORS[enneagramType] ?? "#8b5cf6" }}
            >
              Today&apos;s insight
            </p>
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              &ldquo;{TYPE_AFFIRMATIONS[enneagramType]}&rdquo;
            </p>
          </motion.div>
        )}

        {/* ── Pattern of the Day (Noom behavior chain — trigger → thought → pattern) ── */}
        {enneagramType > 0 && TYPE_PATTERNS[enneagramType] && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-4 rounded-2xl px-4 py-3"
            style={{
              background: "rgba(10,6,22,0.7)",
              borderLeft: `3px solid ${TYPE_COLORS[enneagramType] ?? "#8b5cf6"}`,
              border: `1px solid rgba(255,255,255,0.07)`,
              borderLeftWidth: "3px",
              borderLeftColor: TYPE_COLORS[enneagramType] ?? "#8b5cf6",
            }}
          >
            <p
              className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5"
              style={{ color: TYPE_COLORS[enneagramType] ?? "#8b5cf6" }}
            >
              Today&apos;s pattern
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {TYPE_PATTERNS[enneagramType]}
            </p>
          </motion.div>
        )}

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          {/* Streak */}
          <div
            className={`relative flex flex-col items-center px-4 py-2.5 rounded-2xl backdrop-blur-sm shadow-sm transition-colors ${
              streakAtRisk && countdown.isCritical
                ? "bg-red-50 border border-red-200"
                : streakAtRisk && countdown.isUrgent
                ? "bg-orange-50 border border-orange-200"
                : "bg-white/80 border border-orange-500/20"
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
            <span className="text-[9px] text-white/40 uppercase tracking-wide mt-0.5">streak</span>

            {streakAtRisk && (
              <div
                className={`flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  countdown.isCritical
                    ? "bg-red-100 text-red-600"
                    : countdown.isUrgent
                    ? "bg-orange-100 text-orange-700"
                    : "bg-amber-900/20 text-amber-400"
                }`}
              >
                <Clock className="w-2.5 h-2.5" />
                {countdown.label}
              </div>
            )}

            {longestStreak > streak && longestStreak > 0 && (
              <span className="text-[8px] text-amber-400 font-medium mt-0.5">best: {longestStreak}</span>
            )}
            {streak > 0 && streak >= longestStreak && longestStreak > 0 && (
              <Star className="absolute -top-1.5 -left-1.5 w-4 h-4 text-amber-400 fill-amber-400" />
            )}
            {streakFreezes > 0 && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[9px] font-bold">{streakFreezes}</span>
              </div>
            )}
            {onStreakShop && (
              <button
                onClick={(e) => { e.stopPropagation(); onStreakShop(); }}
                className="mt-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all active:scale-95"
                style={{ background: "rgba(14,165,233,0.12)", color: "#38bdf8", border: "1px solid rgba(14,165,233,0.25)" }}
              >
                🛡️ Protect
              </button>
            )}
          </div>

          {/* XP */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl rounded-2xl border border-amber-500/20">
            <Zap className="w-5 h-5 text-amber-400 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{totalXP.toLocaleString()}</span>
            <span className="text-[9px] text-white/40 tracking-wide mt-0.5">{xpLabel}</span>
          </div>

          {/* Hearts / daily done */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-2xl rounded-2xl border border-rose-500/20">
            <Heart className="w-5 h-5 text-rose-500 mb-0.5" />
            <span className="text-xl font-bold text-slate-800 leading-none">{completedToday}/{totalNodes}</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wide mt-0.5">done today</span>
          </div>
        </motion.div>

        {/* ── Mastery bars ── */}
        <MasterySection units={units} />

        {/* ── Smart "Start today's practice" CTA ── picks the most-needed action ── */}
        {(() => {
          // Decision tree: warmup → reading → next path node → all done
          const allDone = completedToday >= totalNodes && totalNodes > 0;
          if (allDone) {
            return (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl text-center"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#34d399" }}>All done today</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>You've completed today's practice. Come back tomorrow!</p>
              </motion.div>
            );
          }

          // Type-aware base copy (falls back to generic if no type)
          const awareHeadline = resolveTypeAwareCopy("hub.start.headline", enneagramType || null);
          const awareSub = resolveTypeAwareCopy("hub.start.sub", enneagramType || null);

          let label = awareHeadline;
          let sub = awareSub;
          let action = onContinuePath;
          let icon = <Sparkles className="w-5 h-5" />;

          // Override with action-specific copy if there's a clear next step
          if (!warmupDoneToday) {
            label = "Today's warm-up";
            sub = "5 quick questions · ~2 min";
            icon = <Zap className="w-5 h-5" />;
          } else if (!readingDoneToday && onStartReading) {
            label = "Today's reading";
            sub = "A short reflection from your type";
            action = onStartReading;
            icon = <BookOpen className="w-5 h-5" />;
          } else if (nextNode) {
            label = `Continue: ${nextNode.label ?? "your path"}`;
            sub = "Pick up where you left off";
            icon = <Target className="w-5 h-5" />;
          }

          return (
            <>
            {freshStartVisible && freshStartState.copy && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-3 px-4 py-3 rounded-2xl relative"
                style={{
                  background: "linear-gradient(135deg, rgba(234,179,8,0.12), rgba(217,70,239,0.1))",
                  border: "1px solid rgba(234,179,8,0.3)",
                }}
              >
                <button
                  onClick={() => {
                    if (freshStartState.dismissKey) localStorage.setItem(freshStartState.dismissKey, "1");
                    setFreshStartVisible(false);
                  }}
                  className="absolute top-2 right-2 text-[10px] opacity-50 hover:opacity-90 px-2"
                >
                  ✕
                </button>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#fde68a" }}>
                  Fresh start
                </p>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {freshStartState.copy.headline}
                </p>
                <p className="text-xs opacity-70 leading-snug pr-6">
                  {freshStartState.copy.body}
                </p>
                {implementationIntent && (
                  <p className="text-[10px] opacity-60 mt-1.5 italic">
                    Your anchor: {implementationIntent.label.toLowerCase()}
                  </p>
                )}
              </motion.div>
            )}
            {subtypeGreeting && subtypeGreeting !== "Your practice is here." && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="w-full mb-3 px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.22)",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(167,139,250,0.7)" }}>
                  Today's focus{instinct ? ` · ${instinct.toUpperCase()}` : ""}{subtypeGrowthFocus ? ` · ${subtypeGrowthFocus}` : ""}
                </p>
                <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>
                  {subtypeGreeting}
                </p>
              </motion.div>
            )}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={action}
              className="w-full mb-6 p-4 rounded-2xl flex items-center gap-3 text-left transition-all active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(217,70,239,0.12))",
                border: "1px solid rgba(139,92,246,0.4)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.18)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {focusedStartLabel}
                </p>
                <p className="text-sm font-bold truncate" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {sub}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
            </motion.button>
            </>
          );
        })()}

        {/* ── Reminder prompt (shows day 2+ if no reminder set) ── */}
        <ReminderPrompt />

        {/* ── Chibi narration (parasocial voice, Horton & Wohl 1956) ── */}
        {enneagramType > 0 && (
          <div className="mb-4">
            <ChibiMessage enneagramType={enneagramType} />
          </div>
        )}

        {/* ── Descriptive norm (Schultz 2007 + injunctive pairing) ── */}
        {todaysNorm && (
          <div className="mb-3 px-3 py-2 rounded-xl" style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)" }}>
            <p className="text-[11px] opacity-65 leading-snug">{todaysNorm.text}</p>
            <p className="text-[10px] opacity-50 mt-0.5 italic">{todaysNorm.injunctive}</p>
          </div>
        )}

        {/* ── Trust badge (Pew 2019 privacy concern data) ── */}
        <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
          <span className="text-[10px]">🔒</span>
          <p className="text-[10px] opacity-60">Your personality data stays on this device. <a href="/data-usage" className="underline opacity-80">See what we store</a></p>
        </div>

        {/* ── Morning/Evening bookends (Gollwitzer 1999 implementation intentions) ── */}
        {enneagramType > 0 && <MorningEvening enneagramType={enneagramType} />}

        {/* ── Question of the week (Bjork 1994 desirable difficulty) ── */}
        {enneagramType > 0 && <QuestionOfWeek enneagramType={enneagramType} />}

        {/* ── Practice of the opposite (exposure-based growth) ── */}
        {enneagramType > 0 && <PracticeOfOpposite enneagramType={enneagramType} />}

        {/* ── Reaction time game (Greenwald IAT 1998) ── */}
        {enneagramType > 0 && <ReactionTimeGame enneagramType={enneagramType} />}

        {/* ── Body map check-in (Damasio somatic markers) ── */}
        <BodyMapCheckIn />

        {/* ── State check-in (30-second today-vs-usually micro-assessment) ── */}
        <StateCheckIn />

        {/* ── Morning Passion Check-In (60-second daily ritual) ── */}
        {enneagramType > 0 && (
          <MorningPassionCheckIn enneagramType={enneagramType} />
        )}

        {/* ── Today's Concept (theory + practice, collapsed by default) ── */}
        <TheoryPracticeCard />

        {/* ── Audio Reflection (opt-in, type-specific read-aloud) ── */}
        {enneagramType > 0 && (
          <div className="mb-6">
            <AudioReflection type={enneagramType} />
          </div>
        )}

        {/* ── Daily Observation Card (Day 2+, once per day) ── */}
        {enneagramType > 0 && (
          <DailyObservationCard
            enneagramType={enneagramType}
            typeName={enneagramTypeName}
          />
        )}

        {/* ── Token balance chip ── always visible ── */}
        <div className="flex justify-center mt-3 mb-6">
          <div
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
            style={{
              background: tokens > 0 ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${tokens > 0 ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)"}`,
            }}
          >
            <Coins className="w-3.5 h-3.5" style={{ color: tokens > 0 ? "#fbbf24" : "rgba(255,255,255,0.3)" }} />
            <span className="text-sm font-bold" style={{ color: tokens > 0 ? "#fbbf24" : "rgba(255,255,255,0.35)" }}>{tokens.toLocaleString()}</span>
            <span className="text-xs font-medium" style={{ color: tokens > 0 ? "rgba(245,158,11,0.7)" : "rgba(255,255,255,0.25)" }}>tokens</span>
          </div>
        </div>

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
                <div className="text-base shrink-0 mt-0.5 font-mono font-bold" style={{ color: "#fbbf24" }}>(+)</div>
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
                  className="text-amber-400 hover:text-amber-300 text-lg leading-none shrink-0 mt-0.5"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* ── Daily-complete share prompt ── */}
        <AnimatePresence>
          {showDailySharePrompt && (
            <motion.div
              key="daily-share-prompt"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring" as const, stiffness: 280, damping: 22 }}
              className="mb-5 rounded-2xl overflow-hidden"
              style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", boxShadow: "0 4px 20px rgba(52,211,153,0.12)" }}
            >
              <div className="px-4 py-3.5 flex items-center gap-3">
                {/* Chibi or check icon */}
                {enneagramType > 0 ? (
                  <div className="shrink-0">
                    <ChibiSprite type={enneagramType} instinct={instinct} state="happy" size={40} />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.2)" }}>
                    <CheckCircle className="w-5 h-5" style={{ color: "#34d399" }} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight" style={{ color: "#34d399" }}>
                    Practice complete!
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(52,211,153,0.75)" }}>
                    Share your streak and earn{" "}
                    <span className="font-bold text-emerald-300">+10 tokens</span>
                  </p>
                </div>

                {/* Share button */}
                <button
                  onClick={dailyShareHook.share}
                  disabled={dailyShareHook.isSharing}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 2px 10px rgba(16,185,129,0.35)" }}
                >
                  {dailyShareHook.isVerified ? (
                    <><Zap className="w-3.5 h-3.5" />+10t!</>
                  ) : dailyShareHook.isSharing ? (
                    "..."
                  ) : (
                    <><Share2 className="w-3.5 h-3.5" />Share</>
                  )}
                </button>

                {/* Dismiss */}
                <button
                  onClick={() => {
                    setShareDismissed(true);
                    try { localStorage.setItem(DAILY_SHARE_DISMISS_KEY, "1"); } catch {}
                  }}
                  aria-label="Dismiss"
                  className="shrink-0 ml-1"
                  style={{ color: "rgba(52,211,153,0.5)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Token awarded confirmation */}
              <AnimatePresence>
                {dailyShareHook.isVerified && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-3 flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">+10 tokens earned!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Integration Companion ── */}
        {enneagramType > 0 && (
          <IntegrationCompanion userType={enneagramType} />
        )}

        {/* ── Daily Insight Card ── */}
        {enneagramType >= 1 && enneagramType <= 9 && (
          <div className="px-4 mb-4">
            <DailyInsightCard typeNumber={enneagramType} typeColor={TYPE_COLORS[enneagramType]} />
          </div>
        )}

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

          {/* Inline path. show first active unit */}
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
                      <Lock className="w-5 h-5 text-white/40" />
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
                                {node.status === "locked" && <Lock className="text-white/40" style={{ width: SIZE*0.28, height: SIZE*0.28 }} />}
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
                                node.status === "completed" ? "text-violet-600" : "text-white/40"
                              }`}>
                                {node.label}
                              </p>
                              {node.sublabel && (
                                <p className="text-[10px] text-white/40 leading-tight mt-0.5">{node.sublabel}</p>
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
          className="mb-6 p-4 rounded-2xl rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-violet-500" />
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Today&apos;s Quests</p>
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
                quest.done ? "border-emerald-400 bg-emerald-500" : "border-white/15 bg-white/5"
              }`}>
                {quest.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-tight ${quest.done ? "text-white/40 line-through" : "text-slate-700"}`}>
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
              <span className={`text-xs font-medium shrink-0 ${quest.done ? "text-emerald-500" : "text-amber-400"}`}>
                {quest.reward}
              </span>
            </div>
          ))}

          {/* Full Day bonus */}
          {(() => {
            const allDone = questionsAnsweredToday >= 5 && warmupDoneToday && dailyXPEarned >= 50 && readingDoneToday;
            return (
              <div className={`mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                allDone ? "bg-amber-900/20" : "bg-white/5"
              }`}>
                <Star className={`w-4 h-4 shrink-0 ${allDone ? "text-amber-400" : "text-white/30"}`} />
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${allDone ? "text-amber-300" : "text-white/40"}`}>Full Day Bonus</p>
                  <p className="text-[10px] text-white/40">Complete all 4 quests for a bonus reward</p>
                </div>
                <span className={`text-xs font-bold ${allDone ? "text-amber-400" : "text-white/30"}`}>+20 tokens</span>
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
          const storageKey = challengeStorageKey;
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
                      Today&apos;s Type Challenge
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

              {/* Progress shortcut */}
              <Link
                href="/game"
                className="flex items-center justify-between p-3 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" style={{ color: "#fbbf24" }} />
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>View my progress</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
              </Link>

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
                  : "border-violet-500/20 hover:border-violet-500/40"
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
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-amber-100 text-amber-300">+25 tokens</span>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${readingDoneToday ? "text-emerald-700" : "text-slate-700"}`}>
                    {readingDoneToday ? "Reading complete, great work!" : "Tap to read today's insight"}
                  </p>
                </div>
                {!readingDoneToday && (
                  <ArrowRight className="w-4 h-4 text-white/40 shrink-0" />
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
            className="relative overflow-hidden p-5 rounded-2xl border border-violet-500/20"
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
                  <div className="text-[9px] text-white/40 capitalize">{insightData.category}</div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed font-serif text-[14px] italic mb-1.5">
                &ldquo;{insightData.quote}&rdquo;
              </p>
              <p className="text-xs text-white/40 mb-2">{insightData.author}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{insightData.reflection}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
