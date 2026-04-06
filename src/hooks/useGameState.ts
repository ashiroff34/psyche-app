"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type League = "bronze" | "silver" | "gold" | "platinum" | "diamond";
export type DailyGoal = "casual" | "regular" | "serious" | "insane";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  category: "progress" | "streak" | "mastery" | "special" | "social";
  earnedAt?: string; // ISO date
}

export interface XPEvent {
  amount: number;
  source: string;
  timestamp: string;
}

export interface GameState {
  // XP & Levels
  xp: number;
  level: number;
  league: League;

  // Streaks
  streakCount: number;
  longestStreak: number;
  lastActivityDate: string;
  streakFreezes: number;
  streakFreezeUsedDate: string | null;

  // Growth Streak (journal / growth practice days)
  growthStreakCount: number;
  lastGrowthDate: string;

  // Tokens (in-app currency)
  tokens: number;

  // Daily Goals
  dailyGoal: DailyGoal;
  dailyXPEarned: number;
  dailyGoalMet: boolean;
  dailyGoalDate: string;

  // Achievements/Badges
  badges: Badge[];

  // Pet System
  petHealth: number;
  petHappiness: number;
  petLastFed: string;
  petAlive: boolean;
  petName: string;

  // Quiz Progress
  quizStreak: number;
  totalCorrect: number;
  totalAttempted: number;
  difficultyLevel: number;

  // Learning progress per topic
  topicProgress: Record<string, number>;

  // Hint tokens
  hintTokens: number;

  // Daily Reading
  completedReadingIds: string[];
  dailyReadingDate: string; // date of last completed reading

  // XP history (last 7 days for chart)
  xpHistory: { date: string; xp: number }[];

  // Hearts (lives) system
  hearts: number;
  maxHearts: number;
  heartsRefillTime: string | null; // ISO date when hearts started refilling

  // Lifetime stats
  totalXPEarned: number;
  totalTokensEarned: number;
  totalTokensSpent: number;
  accountCreated: string;

  // Token drop pity counter
  sessionsSinceTokenDrop: number;

  // XP Boost (2x for 1 hour)
  xpBoostExpiry: string | null; // ISO timestamp when boost expires

  // Per-type mastery (0–100 points per Enneagram type 1–9)
  typeMastery: Record<string, number>;

  // Weekly challenge tracking
  weeklyStats: {
    weekKey: string;
    daysGoalMet: number;
    quizCorrect: number;
    modulesCompleted: number;
    rewardClaimed: boolean;
  };
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "psyche-game-state";

// ─── Standalone topic progress helper ───────────────────────────────────────
// Call from any page to mark a learning topic complete without importing the
// full useGameState hook. The game page reads this on next mount.
export function markTopicComplete(topicId: string, progressPct = 100) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : {};
    const existing = state.topicProgress ?? {};
    // Only write if this would actually increase progress
    if ((existing[topicId] ?? 0) < progressPct) {
      state.topicProgress = { ...existing, [topicId]: progressPct };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {}
}

/** Call from any component to track quiz_correct or module_complete without importing the full hook */
export function trackWeeklyEvent(type: "quiz_correct" | "module_complete") {
  if (typeof window === "undefined") return;
  try {
    const weekKey = getISOWeekKey();
    const raw = localStorage.getItem("psyche-game-state");
    const state = raw ? JSON.parse(raw) : {};
    const ws = state.weeklyStats?.weekKey === weekKey
      ? { ...state.weeklyStats }
      : { weekKey, daysGoalMet: 0, quizCorrect: 0, modulesCompleted: 0, rewardClaimed: false };
    if (type === "quiz_correct") ws.quizCorrect = (ws.quizCorrect || 0) + 1;
    if (type === "module_complete") ws.modulesCompleted = (ws.modulesCompleted || 0) + 1;
    state.weeklyStats = ws;
    localStorage.setItem("psyche-game-state", JSON.stringify(state));
  } catch {}
}

export const DAILY_GOAL_MINUTES: Record<DailyGoal, number> = {
  casual: 5,
  regular: 15,
  serious: 30,
  insane: 60,
};

// XP needed per minute of goal: ~10 XP per minute of activity
export const DAILY_GOAL_XP: Record<DailyGoal, number> = {
  casual: 50,
  regular: 150,
  serious: 300,
  insane: 600,
};

// Exponential XP curve: level N requires baseXP * (N^1.8)
const BASE_XP_PER_LEVEL = 100;

export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(BASE_XP_PER_LEVEL * Math.pow(level, 1.8));
}

export function getLevelFromXP(xp: number): number {
  let level = 1;
  while (getXPForLevel(level + 1) <= xp) {
    level++;
    if (level >= 50) break;
  }
  return level;
}

export function getXPProgress(xp: number): {
  currentLevel: number;
  xpInLevel: number;
  xpForNextLevel: number;
  progress: number;
} {
  const currentLevel = getLevelFromXP(xp);
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  const xpInLevel = xp - currentLevelXP;
  const xpForNextLevel = nextLevelXP - currentLevelXP;
  const progress = xpForNextLevel > 0 ? xpInLevel / xpForNextLevel : 1;
  return { currentLevel, xpInLevel, xpForNextLevel, progress };
}

export function getLeague(level: number): League {
  if (level >= 40) return "diamond";
  if (level >= 30) return "platinum";
  if (level >= 20) return "gold";
  if (level >= 10) return "silver";
  return "bronze";
}

// ─── Type Mastery ────────────────────────────────────────────────────────────

export type MasteryLevel = "Novice" | "Apprentice" | "Familiar" | "Proficient" | "Advanced" | "Master";

export function getMasteryLevel(points: number): MasteryLevel {
  if (points >= 100) return "Master";
  if (points >= 80) return "Advanced";
  if (points >= 60) return "Proficient";
  if (points >= 40) return "Familiar";
  if (points >= 20) return "Apprentice";
  return "Novice";
}

/** Standalone helper — call from any page to increment a type's mastery without importing the full hook */
export function incrementTypeMastery(typeNum: string | number, points = 10) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : {};
    const existing: Record<string, number> = state.typeMastery ?? {};
    const key = String(typeNum);
    const newVal = Math.min(100, (existing[key] ?? 0) + points);
    state.typeMastery = { ...existing, [key]: newVal };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export const LEAGUE_COLORS: Record<League, { bg: string; text: string; border: string; gradient: string }> = {
  bronze: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", gradient: "from-orange-400 to-orange-600" },
  silver: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300", gradient: "from-slate-300 to-slate-500" },
  gold: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", gradient: "from-amber-400 to-yellow-500" },
  platinum: { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-300", gradient: "from-cyan-400 to-teal-500" },
  diamond: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-300", gradient: "from-violet-400 to-purple-600" },
};

export const LEAGUE_NAMES: Record<League, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
};

// ─── Badge Definitions ───────────────────────────────────────────────────────

export const BADGE_DEFINITIONS: Omit<Badge, "earnedAt">[] = [
  // Progress
  { id: "first-steps", name: "First Steps", description: "Complete your first quiz", icon: "\u{1F463}", category: "progress" },
  { id: "type-explorer", name: "Type Explorer", description: "Discover your Enneagram type", icon: "\u{1F9ED}", category: "progress" },
  { id: "function-master", name: "Function Master", description: "Discover your cognitive type", icon: "\u{1F9E0}", category: "progress" },
  { id: "dual-wielder", name: "Dual Wielder", description: "Complete both Enneagram and Cognitive assessments", icon: "\u2694\uFE0F", category: "progress" },
  { id: "level-10", name: "Double Digits", description: "Reach Level 10", icon: "\u{1F31F}", category: "progress" },
  { id: "level-25", name: "Quarter Century", description: "Reach Level 25", icon: "\u{1F451}", category: "progress" },
  { id: "level-50", name: "Transcendent", description: "Reach the maximum Level 50", icon: "\u{1F4AB}", category: "progress" },

  // Streaks
  { id: "week-warrior", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "\u{1F525}", category: "streak" },
  { id: "fortnight-fury", name: "Fortnight Fury", description: "Maintain a 14-day streak", icon: "\u{1F300}", category: "streak" },
  { id: "month-master", name: "Month Master", description: "Maintain a 30-day streak", icon: "\u26A1", category: "streak" },
  { id: "century-club", name: "Century Club", description: "Maintain a 100-day streak", icon: "\u{1F3C6}", category: "streak" },
  { id: "streak-saver", name: "Streak Saver", description: "Use a streak freeze", icon: "\u2744\uFE0F", category: "streak" },

  // Mastery
  { id: "shadow-diver", name: "Shadow Diver", description: "Explore shadow functions", icon: "\u{1F311}", category: "mastery" },
  { id: "deep-thinker", name: "Deep Thinker", description: "Complete 50 quizzes", icon: "\u{1F4DA}", category: "mastery" },
  { id: "perfect-score", name: "Perfect Score", description: "Get 100% on a quiz", icon: "\u{1F4AF}", category: "mastery" },
  { id: "accuracy-ace", name: "Accuracy Ace", description: "Maintain 80%+ accuracy over 100 questions", icon: "\u{1F3AF}", category: "mastery" },
  { id: "bookworm", name: "Bookworm", description: "Read all history sections", icon: "\u{1F4D6}", category: "mastery" },
  { id: "quiz-streak-10", name: "On Fire", description: "Get 10 correct answers in a row", icon: "\u{1F4A5}", category: "mastery" },
  { id: "all-topics", name: "Renaissance Mind", description: "Make progress in every topic", icon: "\u{1F308}", category: "mastery" },

  // Special
  { id: "night-owl", name: "Night Owl", description: "Complete an activity after midnight", icon: "\u{1F989}", category: "special" },
  { id: "early-bird", name: "Early Bird", description: "Complete an activity before 7 AM", icon: "\u{1F426}", category: "special" },
  { id: "speed-demon", name: "Speed Demon", description: "Complete a quiz in under 60 seconds", icon: "\u{1F3CE}\uFE0F", category: "special" },
  { id: "pet-parent", name: "Pet Parent", description: "Keep your pet alive for 30 days", icon: "\u{1F495}", category: "special" },
  { id: "big-spender", name: "Big Spender", description: "Spend 500 tokens total", icon: "\u{1F4B0}", category: "special" },
  { id: "token-hoarder", name: "Token Hoarder", description: "Save up 1000 tokens", icon: "\u{1F3E6}", category: "special" },

  // Social
  { id: "daily-devotee", name: "Daily Devotee", description: "Complete daily goals 7 days in a row", icon: "\u2B50", category: "social" },
  { id: "goal-setter", name: "Goal Setter", description: "Change your daily goal for the first time", icon: "\u{1F3AF}", category: "social" },
  { id: "comeback-kid", name: "Comeback Kid", description: "Return after 7+ days away", icon: "\u{1F91D}", category: "social" },
];

export interface BadgeProgress {
  id: string;
  name: string;
  icon: string;
  description: string;
  current: number;
  target: number;
  pct: number; // 0–100
  label: string; // e.g. "4 / 7 days"
}

export function getBadgeProgress(state: GameState): BadgeProgress[] {
  const earnedIds = new Set(state.badges.map((b) => b.id));

  const candidates: BadgeProgress[] = [];

  const add = (
    id: string,
    name: string,
    icon: string,
    description: string,
    current: number,
    target: number,
    labelFn: (c: number, t: number) => string
  ) => {
    if (earnedIds.has(id)) return;
    const clamped = Math.min(current, target);
    const pct = Math.round((clamped / target) * 100);
    if (pct < 100) {
      candidates.push({
        id,
        name,
        icon,
        description,
        current: clamped,
        target,
        pct,
        label: labelFn(clamped, target),
      });
    }
  };

  // Streak badges
  add("week-warrior", "Week Warrior", "🔥", "Maintain a 7-day streak",
    state.streakCount, 7, (c, t) => `${c} / ${t} days`);
  add("fortnight-fury", "Fortnight Fury", "🌀", "Maintain a 14-day streak",
    state.streakCount, 14, (c, t) => `${c} / ${t} days`);
  add("month-master", "Month Master", "⚡", "Maintain a 30-day streak",
    state.streakCount, 30, (c, t) => `${c} / ${t} days`);
  add("century-club", "Century Club", "🏆", "Maintain a 100-day streak",
    state.streakCount, 100, (c, t) => `${c} / ${t} days`);

  // Level badges
  add("level-10", "Double Digits", "🌟", "Reach Level 10",
    state.level, 10, (c, t) => `Level ${c} / ${t}`);
  add("level-25", "Quarter Century", "👑", "Reach Level 25",
    state.level, 25, (c, t) => `Level ${c} / ${t}`);
  add("level-50", "Transcendent", "💫", "Reach Level 50",
    state.level, 50, (c, t) => `Level ${c} / ${t}`);

  // Mastery badges
  add("deep-thinker", "Deep Thinker", "📚", "Answer 50 questions",
    state.totalAttempted, 50, (c, t) => `${c} / ${t} questions`);
  add("quiz-streak-10", "On Fire", "💥", "Get 10 correct in a row",
    state.quizStreak, 10, (c, t) => `${c} / ${t} in a row`);
  add("accuracy-ace", "Accuracy Ace", "🎯", "Answer 100 questions with 80%+ accuracy",
    state.totalAttempted, 100, (c, t) => `${c} / ${t} questions`);

  // Sort by progress % descending (closest to earning = first), take top 2
  candidates.sort((a, b) => b.pct - a.pct);
  return candidates.slice(0, 2);
}

// ─── Shop Items ──────────────────────────────────────────────────────────────

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  action: string;
  available: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: "streak-freeze", name: "Streak Freeze", description: "Protect your streak for 1 missed day", cost: 50, icon: "\u2744\uFE0F", action: "freeze", available: true },
  { id: "pet-revival", name: "Pet Revival", description: "Bring your pet back from 0 health", cost: 100, icon: "\u{1F49A}", action: "revive", available: true },
  { id: "pet-food", name: "Pet Food", description: "+20 health, +10 happiness", cost: 10, icon: "\u{1F356}", action: "feed", available: true },
  { id: "pet-treat", name: "Pet Treat", description: "+5 happiness", cost: 5, icon: "\u{1F36C}", action: "treat", available: true },
  { id: "hint-token", name: "Hint Token", description: "Eliminate one wrong answer in quizzes", cost: 25, icon: "\u{1F4A1}", action: "hint", available: true },
  { id: "xp-boost", name: "XP Boost", description: "2x XP for 1 hour", cost: 200, icon: "\u{1F680}", action: "boost", available: true },
  { id: "custom-pet", name: "Custom Pet (Coming Soon)", description: "Unlock a new pet companion", cost: 500, icon: "\u{1F431}", action: "pet", available: false },
];

// ─── Topic definitions for skill tree ────────────────────────────────────────

export interface TopicNode {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  requires: string[];
  unlockedByDefault: boolean;
  unlockCondition?: string; // human-readable
  href: string; // navigation target when clicked
}

export const TOPIC_TREE: TopicNode[] = [
  { id: "enneagram-basics", name: "Enneagram Basics", description: "The 9 types, centers of intelligence, and core motivations", xpReward: 200, requires: [], unlockedByDefault: true, href: "/enneagram/learn" },
  { id: "core-type", name: "Your Core Type", description: "Deep dive into your specific Enneagram type", xpReward: 300, requires: ["enneagram-basics"], unlockedByDefault: false, unlockCondition: "Take the Enneagram assessment → Get Enneagram Basics", href: "/enneagram/assess" },
  { id: "subtypes-instincts", name: "Subtypes & Instincts", description: "Self-preservation, sexual, and social instincts", xpReward: 350, requires: ["core-type"], unlockedByDefault: false, unlockCondition: "Complete Your Core Type first", href: "/enneagram/learn" },
  { id: "tritypes", name: "Tritypes", description: "Your three-center type combination", xpReward: 400, requires: ["core-type"], unlockedByDefault: false, unlockCondition: "Complete Your Core Type first", href: "/enneagram/learn" },
  { id: "cognitive-intro", name: "Cognitive Functions Intro", description: "Jung's 8 cognitive functions explained", xpReward: 200, requires: [], unlockedByDefault: true, href: "/cognitive/learn" },
  { id: "function-stack", name: "Your Function Stack", description: "Your dominant, auxiliary, tertiary, and inferior functions", xpReward: 300, requires: ["cognitive-intro"], unlockedByDefault: false, unlockCondition: "Take the Cognitive assessment → Get Cognitive Intro first", href: "/cognitive/assess" },
  { id: "shadow-functions", name: "Shadow Functions", description: "The opposing personality, senex, trickster, and demon", xpReward: 400, requires: ["function-stack"], unlockedByDefault: false, unlockCondition: "Complete Your Function Stack first", href: "/cognitive/learn" },
  { id: "loops-grips", name: "Loops & Grips", description: "When functions go wrong: stress patterns and growth", xpReward: 450, requires: ["shadow-functions"], unlockedByDefault: false, unlockCondition: "Complete Shadow Functions first", href: "/cognitive/learn" },
  { id: "history", name: "History & Sources", description: "Jung, Naranjo, Riso-Hudson, Beebe, and the research lineage", xpReward: 150, requires: [], unlockedByDefault: true, href: "/history" },
];

// ─── Leaderboard simulation ─────────────────────────────────────────────────

export interface LeaderboardEntry {
  name: string;
  xp: number;
  level: number;
  league: League;
  isPlayer: boolean;
}

const SIMULATED_NAMES = [
  "IntrospectiveINFJ", "ShadowExplorer", "TypeNerd42", "EnneagramJunkie",
  "NiDom_Life", "FeelerHealer", "SeTerror", "JungianDreams",
  "FiCore_4w5", "GrowthEdge", "TeAux_Power", "SxSo_8w7",
  "QuietObserver", "FunctionStacker", "TritypeMaster", "CognitiveNomad",
  "LoopBreaker", "GripSurvivor", "IntegrationPath",
];

export function generateLeaderboard(playerXP: number, playerLevel: number): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = SIMULATED_NAMES.map((name) => {
    // Cluster around player's XP with some variance
    const variance = playerXP * 0.6;
    const xp = Math.max(0, Math.floor(playerXP + (Math.random() - 0.45) * variance));
    const level = getLevelFromXP(xp);
    return { name, xp, level, league: getLeague(level), isPlayer: false };
  });

  entries.push({
    name: "You",
    xp: playerXP,
    level: playerLevel,
    league: getLeague(playerLevel),
    isPlayer: true,
  });

  entries.sort((a, b) => b.xp - a.xp);
  return entries.slice(0, 15);
}

// ─── Pet Emojis based on health/happiness ────────────────────────────────────

export function getPetEmoji(health: number, happiness: number, alive: boolean): string {
  if (!alive) return "\u{1F480}";
  if (health < 20) return "\u{1F63F}";
  if (health < 40) return "\u{1F640}";
  if (happiness > 80 && health > 80) return "\u{1F63B}";
  if (happiness > 60) return "\u{1F63A}";
  if (happiness < 30) return "\u{1F63E}";
  return "\u{1F431}";
}

export function getPetMood(health: number, happiness: number, alive: boolean): string {
  if (!alive) return "Your pet needs revival...";
  if (health < 20) return "Desperately hungry! Feed me!";
  if (health < 40) return "Getting pretty hungry...";
  if (happiness > 80 && health > 80) return "Living my best life!";
  if (happiness > 60) return "Feeling good!";
  if (happiness < 30) return "Could use some love...";
  if (health < 60) return "A snack would be nice";
  return "Doing okay!";
}

// ─── Weekly Challenge ─────────────────────────────────────────────────────────

export interface WeeklyChallengeTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  goal: number;
  xpReward: number;
  tokenReward: number;
  progressKey: "daysGoalMet" | "quizCorrect" | "modulesCompleted";
}

export const WEEKLY_CHALLENGES: WeeklyChallengeTemplate[] = [
  { id: "streak", name: "Streak Warrior", emoji: "🔥", description: "Meet your daily goal 5 days this week", goal: 5, xpReward: 100, tokenReward: 30, progressKey: "daysGoalMet" },
  { id: "quiz", name: "Quiz Master", emoji: "🧠", description: "Answer 30 questions correctly this week", goal: 30, xpReward: 100, tokenReward: 30, progressKey: "quizCorrect" },
  { id: "module", name: "Deep Diver", emoji: "📚", description: "Complete 3 full learning modules this week", goal: 3, xpReward: 100, tokenReward: 30, progressKey: "modulesCompleted" },
];

function getISOWeekKey(): string {
  const d = new Date();
  const day = d.getDay() || 7; // Mon=1 ... Sun=7
  d.setDate(d.getDate() + 4 - day); // pivot to Thursday of current week
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function getCurrentWeeklyChallenge(): { challenge: WeeklyChallengeTemplate; weekKey: string } {
  const weekKey = getISOWeekKey();
  const weekNum = parseInt(weekKey.split("-W")[1] ?? "0") || 0;
  const challenge = WEEKLY_CHALLENGES[weekNum % WEEKLY_CHALLENGES.length];
  return { challenge, weekKey };
}

// ─── Default State ───────────────────────────────────────────────────────────

function getToday(): string {
  // Use local calendar date so streaks don't reset early for non-UTC users
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function createDefaultState(): GameState {
  return {
    xp: 0,
    level: 1,
    league: "bronze",
    streakCount: 0,
    longestStreak: 0,
    lastActivityDate: "",
    streakFreezes: 0,
    streakFreezeUsedDate: null,
    growthStreakCount: 0,
    lastGrowthDate: "",
    tokens: 50, // starter tokens
    dailyGoal: "regular",
    dailyXPEarned: 0,
    dailyGoalMet: false,
    dailyGoalDate: getToday(),
    badges: [],
    petHealth: 100,
    petHappiness: 100,
    petLastFed: new Date().toISOString(), // ISO timestamp so decay math is precise
    petAlive: true,
    petName: "Thyself Cat",
    quizStreak: 0,
    totalCorrect: 0,
    totalAttempted: 0,
    difficultyLevel: 1,
    topicProgress: {},
    hintTokens: 0,
    completedReadingIds: [],
    dailyReadingDate: "",
    hearts: 5,
    maxHearts: 5,
    heartsRefillTime: null,
    xpHistory: [{ date: getToday(), xp: 0 }],
    totalXPEarned: 0,
    totalTokensEarned: 50,
    totalTokensSpent: 0,
    accountCreated: getToday(),
    sessionsSinceTokenDrop: 0,
    xpBoostExpiry: null,
    typeMastery: {},
    weeklyStats: { weekKey: "", daysGoalMet: 0, quizCorrect: 0, modulesCompleted: 0, rewardClaimed: false },
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useGameState() {
  const [state, setState] = useState<GameState>(createDefaultState());
  const [loaded, setLoaded] = useState(false);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);
  const [xpGainAnimation, setXpGainAnimation] = useState<{ amount: number; source: string } | null>(null);
  const [badgeUnlockAnimation, setBadgeUnlockAnimation] = useState<Badge | null>(null);
  const saveRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as GameState;
        // Ensure all fields exist (migration safety)
        const merged = { ...createDefaultState(), ...parsed };
        setState(merged);
      } else {
        // First load: migrate streakCount and xp from psyche-profile if present
        try {
          const profileRaw = localStorage.getItem("psyche-profile");
          if (profileRaw) {
            const profile = JSON.parse(profileRaw);
            const migratedDefaults = createDefaultState();
            if (typeof profile.streakCount === "number" && profile.streakCount > 0) {
              migratedDefaults.streakCount = profile.streakCount;
              migratedDefaults.longestStreak = profile.streakCount;
            }
            if (typeof profile.xp === "number" && profile.xp > 0) {
              migratedDefaults.xp = profile.xp;
              migratedDefaults.totalXPEarned = profile.xp;
              migratedDefaults.level = getLevelFromXP(profile.xp);
            }
            if (typeof profile.lastVisitDate === "string") {
              migratedDefaults.lastActivityDate = profile.lastVisitDate;
            }
            setState(migratedDefaults);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedDefaults));
          }
        } catch {
          // Migration failed, use defaults
        }
      }
    } catch {
      // Use defaults
    }
    setLoaded(true);
  }, []);

  // Save to localStorage (debounced)
  const save = useCallback((newState: GameState) => {
    if (saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch {}
    }, 100);
  }, []);

  // Helper: update state + save
  const update = useCallback(
    (updater: (prev: GameState) => GameState) => {
      setState((prev) => {
        const next = updater(prev);
        save(next);
        return next;
      });
    },
    [save]
  );

  // ── Streak Management ──────────────────────────────────────────────────────

  const checkStreak = useCallback(() => {
    update((prev) => {
      const today = getToday();
      if (prev.lastActivityDate === today) return prev; // already checked today

      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0];

      let newStreak = prev.streakCount;
      let freezes = prev.streakFreezes;
      let freezeUsed = prev.streakFreezeUsedDate;

      if (prev.lastActivityDate === yesterday) {
        // Consecutive day - streak continues (will increment when XP earned)
      } else if (prev.lastActivityDate === twoDaysAgo && freezes > 0 && freezeUsed !== yesterday) {
        // Missed yesterday but have a freeze
        freezes -= 1;
        freezeUsed = yesterday;
        // Streak preserved (streak-saver badge is checked in auto-check useEffect)
      } else if (prev.lastActivityDate && prev.lastActivityDate !== today) {
        // Streak broken
        newStreak = 0;
      }

      // Reset daily XP if it's a new day
      const dailyReset = prev.dailyGoalDate !== today;

      // Pet health is managed by real-time sync in the useEffect above.
      // checkStreak only handles streak + daily goal reset.

      return {
        ...prev,
        streakCount: newStreak,
        streakFreezes: freezes,
        streakFreezeUsedDate: freezeUsed,
        dailyXPEarned: dailyReset ? 0 : prev.dailyXPEarned,
        dailyGoalMet: dailyReset ? false : prev.dailyGoalMet,
        dailyGoalDate: today,
      };
    });
  }, [update]);

  // ── XP System ──────────────────────────────────────────────────────────────

  const earnXP = useCallback(
    (amount: number, source: string) => {
      // Variable ratio reinforcement: occasional bonus
      let bonusMultiplier = 1;
      if (Math.random() < 0.1) bonusMultiplier = 2; // 10% chance of double XP
      if (Math.random() < 0.03) bonusMultiplier = 3; // 3% chance of triple XP
      // XP Boost shop item: read from updater arg to avoid stale closure
      const finalAmount = Math.floor(amount * bonusMultiplier);

      setXpGainAnimation({ amount: finalAmount, source: bonusMultiplier > 1 ? `${source} (${bonusMultiplier}x BONUS!)` : source });
      setTimeout(() => setXpGainAnimation(null), 2500);

      update((prev) => {
        const today = getToday();
        // XP Boost shop item: read from prev to avoid stale closure
        const boostActive = prev.xpBoostExpiry && new Date(prev.xpBoostExpiry).getTime() > Date.now();
        const boostedAmount = (boostActive && bonusMultiplier === 1) ? finalAmount * 2 : finalAmount;
        const newXP = prev.xp + boostedAmount;
        const oldLevel = prev.level;
        const newLevel = getLevelFromXP(newXP);
        const newLeague = getLeague(newLevel);

        // Update daily XP
        const newDailyXP = (prev.dailyGoalDate === today ? prev.dailyXPEarned : 0) + boostedAmount;
        const goalTarget = DAILY_GOAL_XP[prev.dailyGoal];
        const dailyGoalMet = newDailyXP >= goalTarget;

        // Update streak
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        let newStreak = prev.streakCount;
        if (prev.lastActivityDate !== today) {
          if (prev.lastActivityDate === yesterday || prev.streakFreezeUsedDate === yesterday) {
            newStreak = prev.streakCount + 1;
          } else if (!prev.lastActivityDate) {
            newStreak = 1;
          } else {
            newStreak = 1; // streak was broken, start fresh
          }
        }
        const longestStreak = Math.max(prev.longestStreak, newStreak);

        // Update XP history
        const xpHistory = [...prev.xpHistory];
        const todayEntry = xpHistory.find((e) => e.date === today);
        if (todayEntry) {
          todayEntry.xp += boostedAmount;
        } else {
          xpHistory.push({ date: today, xp: boostedAmount });
        }
        // Keep last 30 days
        while (xpHistory.length > 30) xpHistory.shift();

        // Weekly stats: track days goal was met
        const currentWeekKey = getISOWeekKey();
        const currentWS = prev.weeklyStats?.weekKey === currentWeekKey
          ? { ...prev.weeklyStats }
          : { weekKey: currentWeekKey, daysGoalMet: 0, quizCorrect: 0, modulesCompleted: 0, rewardClaimed: false };
        if (dailyGoalMet && !prev.dailyGoalMet) {
          currentWS.daysGoalMet = (currentWS.daysGoalMet || 0) + 1;
        }

        // Token rewards: earn tokens on milestones
        let bonusTokens = 0;
        if (dailyGoalMet && !prev.dailyGoalMet) bonusTokens += 15; // daily goal completion reward
        if (newLevel > oldLevel) bonusTokens += newLevel * 5; // level up reward
        if (newStreak > prev.streakCount && newStreak % 7 === 0) bonusTokens += 25; // weekly streak bonus

        if (newLevel > oldLevel) {
          setLevelUpAnimation(true);
          setTimeout(() => setLevelUpAnimation(false), 3000);
        }

        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          league: newLeague,
          dailyXPEarned: newDailyXP,
          dailyGoalMet,
          dailyGoalDate: today,
          streakCount: newStreak,
          longestStreak,
          lastActivityDate: today,
          tokens: prev.tokens + bonusTokens,
          totalXPEarned: prev.totalXPEarned + finalAmount,
          totalTokensEarned: prev.totalTokensEarned + bonusTokens,
          xpHistory,
          weeklyStats: currentWS,
        };
      });
    },
    [update]
  );

  // ── Token System ───────────────────────────────────────────────────────────

  const spendTokens = useCallback(
    (amount: number): boolean => {
      let success = false;
      update((prev) => {
        if (prev.tokens < amount) return prev;
        success = true;
        return {
          ...prev,
          tokens: prev.tokens - amount,
          totalTokensSpent: prev.totalTokensSpent + amount,
        };
      });
      return success;
    },
    [update]
  );

  const recordTokenDrop = useCallback(
    (amount: number) => {
      update((prev) => ({
        ...prev,
        tokens: prev.tokens + amount,
        totalTokensEarned: prev.totalTokensEarned + amount,
        sessionsSinceTokenDrop: 0,
      }));
    },
    [update]
  );

  const bumpSessionCount = useCallback(() => {
    update((prev) => ({
      ...prev,
      sessionsSinceTokenDrop: (prev.sessionsSinceTokenDrop ?? 0) + 1,
    }));
  }, [update]);

  const earnTokens = useCallback(
    (amount: number, _source: string) => {
      update((prev) => ({
        ...prev,
        tokens: prev.tokens + amount,
        totalTokensEarned: prev.totalTokensEarned + amount,
      }));
    },
    [update]
  );

  // ── Daily Reading ──────────────────────────────────────────────────────────

  const completeReading = useCallback(
    (readingId: string, tokenReward: number, xpReward: number) => {
      const today = getToday();
      update((prev) => ({
        ...prev,
        tokens: prev.tokens + tokenReward,
        totalTokensEarned: prev.totalTokensEarned + tokenReward,
        dailyXPEarned: (prev.dailyXPEarned ?? 0) + xpReward,
        totalXPEarned: prev.totalXPEarned + xpReward,
        xp: prev.xp + xpReward,
        completedReadingIds: prev.completedReadingIds?.includes(readingId)
          ? prev.completedReadingIds
          : [...(prev.completedReadingIds ?? []), readingId],
        dailyReadingDate: today,
      }));
    },
    [update]
  );

  // ── Pet System ─────────────────────────────────────────────────────────────
  // Pet health decays ~15 hp/day from last fed timestamp.
  // Feeding resets lastFed to now (ISO timestamp) and fully restores health.

  // Recalculate live pet health based on stored lastFed timestamp
  const computePetHealthFromTimestamp = useCallback((lastFedISO: string): number => {
    if (!lastFedISO) return 0;
    const hoursSince = (Date.now() - new Date(lastFedISO).getTime()) / 3600000;
    const HEALTH_PER_HOUR = 15 / 24; // 15 hp/day
    return Math.max(0, Math.round(100 - hoursSince * HEALTH_PER_HOUR));
  }, []);

  // Sync live health into state on mount and every 5 minutes
  useEffect(() => {
    if (!loaded) return;
    const syncHealth = () => {
      update((prev) => {
        if (!prev.petLastFed) return prev;
        const liveHealth = computePetHealthFromTimestamp(prev.petLastFed);
        const liveHappiness = Math.max(0, Math.round(liveHealth * 0.9)); // happiness tracks health
        const petAlive = liveHealth > 0;
        if (liveHealth === prev.petHealth && liveHappiness === prev.petHappiness) return prev;
        return { ...prev, petHealth: liveHealth, petHappiness: liveHappiness, petAlive };
      });
    };
    syncHealth(); // immediate sync on mount
    const interval = setInterval(syncHealth, 5 * 60 * 1000); // re-sync every 5 min
    return () => clearInterval(interval);
  }, [loaded, update, computePetHealthFromTimestamp]);

  const feedPet = useCallback(
    (type: "food" | "treat" = "food"): boolean => {
      const cost = type === "food" ? 10 : 5;
      let success = false;
      update((prev) => {
        if (prev.tokens < cost) return prev;
        if (!prev.petAlive && type !== "food") return prev;
        success = true;
        // Food fully resets the timer (full health restore)
        // Treat gives +15 happiness but only partially extends fed timer by 6hrs
        if (type === "food") {
          const nowISO = new Date().toISOString();
          return {
            ...prev,
            tokens: prev.tokens - cost,
            totalTokensSpent: prev.totalTokensSpent + cost,
            petHealth: 100,
            petHappiness: 100,
            petLastFed: nowISO, // full reset, counts down from now
            petAlive: true,
          };
        } else {
          // Treat: advance lastFed by 6 hours (gives extra time)
          const currentLastFed = prev.petLastFed ? new Date(prev.petLastFed).getTime() : Date.now();
          const extendedFed = new Date(currentLastFed + 6 * 3600000).toISOString();
          return {
            ...prev,
            tokens: prev.tokens - cost,
            totalTokensSpent: prev.totalTokensSpent + cost,
            petHappiness: Math.min(100, prev.petHappiness + 15),
            petLastFed: extendedFed,
            petAlive: true,
          };
        }
      });
      return success;
    },
    [update]
  );

  const revivePet = useCallback((): boolean => {
    let success = false;
    update((prev) => {
      if (prev.tokens < 100) return prev;
      success = true;
      // Revival sets lastFed to now, restoring from 0
      const nowISO = new Date().toISOString();
      return {
        ...prev,
        tokens: prev.tokens - 100,
        totalTokensSpent: prev.totalTokensSpent + 100,
        petHealth: 100,
        petHappiness: 60,
        petLastFed: nowISO,
        petAlive: true,
      };
    });
    return success;
  }, [update]);

  const getPetStatus = useCallback(() => {
    return {
      emoji: getPetEmoji(state.petHealth, state.petHappiness, state.petAlive),
      mood: getPetMood(state.petHealth, state.petHappiness, state.petAlive),
      health: state.petHealth,
      happiness: state.petHappiness,
      alive: state.petAlive,
      name: state.petName,
    };
  }, [state.petHealth, state.petHappiness, state.petAlive, state.petName]);

  // ── Badge System ───────────────────────────────────────────────────────────

  const unlockBadge = useCallback(
    (badgeId: string) => {
      update((prev) => {
        if (prev.badges.find((b) => b.id === badgeId)) return prev; // already earned
        const definition = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
        if (!definition) return prev;
        const newBadge: Badge = { ...definition, earnedAt: new Date().toISOString() };
        setBadgeUnlockAnimation(newBadge);
        setTimeout(() => setBadgeUnlockAnimation(null), 3000);
        return {
          ...prev,
          badges: [...prev.badges, newBadge],
          tokens: prev.tokens + 10, // bonus tokens for badge
          totalTokensEarned: prev.totalTokensEarned + 10,
        };
      });
    },
    [update]
  );

  const hasBadge = useCallback(
    (badgeId: string): boolean => {
      return state.badges.some((b) => b.id === badgeId);
    },
    [state.badges]
  );

  // ── Shop Actions ───────────────────────────────────────────────────────────

  const purchaseItem = useCallback(
    (itemId: string): boolean => {
      const item = SHOP_ITEMS.find((i) => i.id === itemId);
      if (!item || !item.available) return false;

      let success = false;
      update((prev) => {
        if (prev.tokens < item.cost) return prev;
        success = true;
        const base = {
          ...prev,
          tokens: prev.tokens - item.cost,
          totalTokensSpent: prev.totalTokensSpent + item.cost,
        };

        switch (item.action) {
          case "freeze":
            return { ...base, streakFreezes: base.streakFreezes + 1 };
          case "revive": {
            const nowISO = new Date().toISOString();
            return { ...base, petHealth: 100, petHappiness: 60, petAlive: true, petLastFed: nowISO };
          }
          case "feed": {
            const nowISO = new Date().toISOString();
            return { ...base, petHealth: 100, petHappiness: 100, petLastFed: nowISO, petAlive: true };
          }
          case "treat":
            return { ...base, petHappiness: Math.min(100, base.petHappiness + 5) };
          case "hint":
            return { ...base, hintTokens: base.hintTokens + 1 };
          case "boost": {
            const boostExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
            return { ...base, xpBoostExpiry: boostExpiry };
          }
          default:
            return base;
        }
      });
      return success;
    },
    [update]
  );

  // ── Quiz Progress ──────────────────────────────────────────────────────────

  const recordQuizAnswer = useCallback(
    (correct: boolean) => {
      update((prev) => {
        const newAttempted = prev.totalAttempted + 1;
        const newCorrect = prev.totalCorrect + (correct ? 1 : 0);
        const newQuizStreak = correct ? prev.quizStreak + 1 : 0;

        // Adjust difficulty based on performance
        let diff = prev.difficultyLevel;
        if (newQuizStreak >= 5 && diff < 10) diff += 1;
        if (!correct && prev.quizStreak === 0 && diff > 1) diff -= 1;

        return {
          ...prev,
          totalAttempted: newAttempted,
          totalCorrect: newCorrect,
          quizStreak: newQuizStreak,
          difficultyLevel: diff,
        };
      });
    },
    [update]
  );

  // ── Quiz Completion (for event-driven badges) ─────────────────────────────

  const recordQuizComplete = useCallback(
    (durationSeconds: number, accuracy: number) => {
      // Speed demon, quiz completed in under 60 seconds
      if (durationSeconds > 0 && durationSeconds < 60) {
        unlockBadge("speed-demon");
      }
      // Perfect score, 100% accuracy on a completed quiz
      if (accuracy >= 100) {
        unlockBadge("perfect-score");
      }
      // First steps, completed a quiz
      unlockBadge("first-steps");
    },
    [unlockBadge]
  );

  // ── Topic Progress ─────────────────────────────────────────────────────────

  const updateTopicProgress = useCallback(
    (topicId: string, progress: number) => {
      update((prev) => ({
        ...prev,
        topicProgress: {
          ...prev.topicProgress,
          [topicId]: Math.min(100, Math.max(prev.topicProgress[topicId] ?? 0, progress)),
        },
      }));
    },
    [update]
  );

  const updateTypeMastery = useCallback(
    (typeNum: string | number, points: number) => {
      const key = String(typeNum);
      update((prev) => ({
        ...prev,
        typeMastery: {
          ...prev.typeMastery,
          [key]: Math.min(100, (prev.typeMastery?.[key] ?? 0) + points),
        },
      }));
    },
    [update]
  );

  const isTopicUnlocked = useCallback(
    (topicId: string): boolean => {
      const topic = TOPIC_TREE.find((t) => t.id === topicId);
      if (!topic) return false;
      if (topic.unlockedByDefault) return true;
      // Check prerequisites
      return topic.requires.every((req) => (state.topicProgress[req] ?? 0) >= 50);
    },
    [state.topicProgress]
  );

  // ── Weekly Challenge ───────────────────────────────────────────────────────

  const claimWeeklyReward = useCallback(() => {
    const weekKey = getISOWeekKey();
    update((prev) => {
      const ws = prev.weeklyStats?.weekKey === weekKey
        ? prev.weeklyStats
        : { weekKey, daysGoalMet: 0, quizCorrect: 0, modulesCompleted: 0, rewardClaimed: false };
      if (ws.rewardClaimed) return prev;
      const { challenge } = getCurrentWeeklyChallenge();
      const progress = ws[challenge.progressKey] ?? 0;
      if (progress < challenge.goal) return prev;
      const newXP = prev.xp + challenge.xpReward;
      return {
        ...prev,
        xp: newXP,
        level: getLevelFromXP(newXP),
        tokens: prev.tokens + challenge.tokenReward,
        totalXPEarned: prev.totalXPEarned + challenge.xpReward,
        totalTokensEarned: prev.totalTokensEarned + challenge.tokenReward,
        weeklyStats: { ...ws, rewardClaimed: true },
      };
    });
  }, [update]);

  // ── Daily Goal ─────────────────────────────────────────────────────────────

  const setDailyGoal = useCallback(
    (goal: DailyGoal) => {
      update((prev) => ({ ...prev, dailyGoal: goal }));
    },
    [update]
  );

  // ── Growth Streak ──────────────────────────────────────────────────────────

  const incrementGrowthStreak = useCallback(() => {
    update((prev) => {
      const today = getToday();
      if (prev.lastGrowthDate === today) return prev; // already counted today
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      let newGrowthStreak: number;
      if (prev.lastGrowthDate === yesterday) {
        newGrowthStreak = prev.growthStreakCount + 1;
      } else if (!prev.lastGrowthDate) {
        newGrowthStreak = 1;
      } else {
        newGrowthStreak = 1; // gap — reset
      }
      return {
        ...prev,
        growthStreakCount: newGrowthStreak,
        lastGrowthDate: today,
      };
    });
  }, [update]);

  // ── Hearts System ──────────────────────────────────────────────────────────
  // 1 heart refills every 10 minutes. Timer advances from the original start
  // time (not reset to "now") so partial progress is preserved across refills.

  const HEART_REFILL_MS = 10 * 60 * 1000; // 10 minutes per heart

  const loseHeart = useCallback(() => {
    setState((prev) => {
      if (prev.hearts <= 0) return prev;
      const updated = {
        ...prev,
        hearts: prev.hearts - 1,
        heartsRefillTime: prev.heartsRefillTime || new Date().toISOString(),
      };
      save(updated);
      return updated;
    });
  }, [save]);

  const gainHeart = useCallback(() => {
    setState((prev) => {
      if (prev.hearts >= prev.maxHearts) return prev;
      const newHearts = prev.hearts + 1;
      const updated = {
        ...prev,
        hearts: newHearts,
        heartsRefillTime: newHearts >= prev.maxHearts ? null : prev.heartsRefillTime,
      };
      save(updated);
      return updated;
    });
  }, [save]);

  const refillHearts = useCallback(() => {
    setState((prev) => {
      if (prev.hearts >= prev.maxHearts) return prev;
      if (!prev.heartsRefillTime) return prev;
      const refillStart = new Date(prev.heartsRefillTime).getTime();
      const elapsed = Date.now() - refillStart;
      const heartsToAdd = Math.floor(elapsed / HEART_REFILL_MS);
      if (heartsToAdd <= 0) return prev;
      const newHearts = Math.min(prev.maxHearts, prev.hearts + heartsToAdd);
      // Advance refill time by exactly heartsToAdd intervals, preserves partial progress
      const newRefillTime =
        newHearts >= prev.maxHearts
          ? null
          : new Date(refillStart + heartsToAdd * HEART_REFILL_MS).toISOString();
      const updated = {
        ...prev,
        hearts: newHearts,
        heartsRefillTime: newRefillTime,
      };
      save(updated);
      return updated;
    });
  }, [save]); // eslint-disable-line react-hooks/exhaustive-deps

  const buyHearts = useCallback(() => {
    setState((prev) => {
      if (prev.tokens < 20) return prev;
      const updated = {
        ...prev,
        hearts: prev.maxHearts,
        heartsRefillTime: null,
        tokens: prev.tokens - 20,
        totalTokensSpent: prev.totalTokensSpent + 20,
      };
      save(updated);
      return updated;
    });
  }, [save]);

  // ── Auto-check badges + refill hearts ────────────────────────────────────

  useEffect(() => {
    if (!loaded) return;

    // Auto-refill hearts based on elapsed time (1 heart per 10 min)
    if (state.hearts < (state.maxHearts ?? 5) && state.heartsRefillTime) {
      const elapsed = Date.now() - new Date(state.heartsRefillTime).getTime();
      const heartsToAdd = Math.floor(elapsed / (10 * 60 * 1000));
      if (heartsToAdd > 0) {
        refillHearts();
      }
    }

    // Time-based badges
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5 && state.lastActivityDate === getToday()) {
      unlockBadge("night-owl");
    }
    if (hour >= 5 && hour < 7 && state.lastActivityDate === getToday()) {
      unlockBadge("early-bird");
    }

    // Streak badges
    if (state.streakCount >= 7) unlockBadge("week-warrior");
    if (state.streakCount >= 14) unlockBadge("fortnight-fury");
    if (state.streakCount >= 30) unlockBadge("month-master");
    if (state.streakCount >= 100) unlockBadge("century-club");

    // Level badges
    if (state.level >= 10) unlockBadge("level-10");
    if (state.level >= 25) unlockBadge("level-25");
    if (state.level >= 50) unlockBadge("level-50");

    // Quiz badges
    if (state.totalAttempted >= 50) unlockBadge("deep-thinker");
    if (state.quizStreak >= 10) unlockBadge("quiz-streak-10");
    if (state.totalAttempted >= 100 && state.totalCorrect / state.totalAttempted >= 0.8) {
      unlockBadge("accuracy-ace");
    }

    // Token badges
    if (state.tokens >= 1000) unlockBadge("token-hoarder");
    if (state.totalTokensSpent >= 500) unlockBadge("big-spender");

    // Topic progress
    const allTopics = TOPIC_TREE.every((t) => (state.topicProgress[t.id] ?? 0) > 0);
    if (allTopics) unlockBadge("all-topics");

    // Comeback kid
    if (state.lastActivityDate) {
      const daysSince = Math.floor(
        (Date.now() - new Date(state.lastActivityDate).getTime()) / 86400000
      );
      if (daysSince >= 7 && state.streakCount <= 1 && state.totalXPEarned > 0) {
        unlockBadge("comeback-kid");
      }
    }

    // ── Profile-derived badges ──────────────────────────────────────────────
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) {
        const p = JSON.parse(raw);
        // First steps, has any XP at all
        if (state.totalAttempted >= 1) unlockBadge("first-steps");
        // Type explorer, discovered enneagram type
        if (p.enneagramType) unlockBadge("type-explorer");
        // Function master, discovered cognitive type
        if (p.cognitiveType || p.mbtiType) unlockBadge("function-master");
        // Dual wielder, both assessments done
        if (p.enneagramType && (p.cognitiveType || p.mbtiType)) unlockBadge("dual-wielder");
      }
    } catch {}

    // Perfect score badge is only awarded by recordQuizComplete() on 100% accuracy
    // — not by streak, which is a separate metric

    // Pet parent, pet alive 30+ days (use accountCreated as proxy for pet birth)
    if (state.petAlive && state.accountCreated) {
      const daysSinceBorn = Math.floor(
        (Date.now() - new Date(state.accountCreated).getTime()) / 86400000
      );
      if (daysSinceBorn >= 30) unlockBadge("pet-parent");
    }

    // Daily devotee, streak of 7+ means consistent daily goals
    if (state.streakCount >= 7) unlockBadge("daily-devotee");

    // Goal setter, changed daily goal from the default "regular"
    if (state.dailyGoal !== "regular") unlockBadge("goal-setter");

    // Shadow diver, explored shadow functions topic
    if ((state.topicProgress["shadow-functions"] ?? 0) > 0) unlockBadge("shadow-diver");

    // Bookworm, completed the history topic
    if ((state.topicProgress["history"] ?? 0) >= 100) unlockBadge("bookworm");

    // Streak saver, used a streak freeze at some point
    if (state.streakFreezeUsedDate) unlockBadge("streak-saver");

  }, [loaded, state.streakCount, state.level, state.totalAttempted, state.quizStreak, state.tokens, state.totalTokensSpent, state.topicProgress, state.lastActivityDate, state.totalCorrect, state.totalXPEarned, state.hearts, state.heartsRefillTime, state.dailyGoal, state.petAlive, state.accountCreated, state.streakFreezeUsedDate, unlockBadge, refillHearts]);

  return {
    state,
    loaded,

    // XP
    earnXP,
    getXPProgress: () => getXPProgress(state.xp),

    // Tokens
    spendTokens,
    earnTokens,
    recordTokenDrop,
    bumpSessionCount,

    // Streaks
    checkStreak,
    incrementGrowthStreak,

    // Pet
    feedPet,
    revivePet,
    getPetStatus,

    // Badges
    unlockBadge,
    hasBadge,

    // Shop
    purchaseItem,

    // Quiz
    recordQuizAnswer,
    recordQuizComplete,

    // Topics
    updateTopicProgress,
    isTopicUnlocked,

    // Type Mastery
    updateTypeMastery,

    // Daily Goal
    setDailyGoal,

    // Daily Reading
    completeReading,

    // Weekly Challenge
    claimWeeklyReward,
    weeklyChallenge: (() => {
      const { challenge, weekKey } = getCurrentWeeklyChallenge();
      const ws = state.weeklyStats?.weekKey === weekKey
        ? state.weeklyStats
        : { weekKey, daysGoalMet: 0, quizCorrect: 0, modulesCompleted: 0, rewardClaimed: false };
      const progress = ws[challenge.progressKey] ?? 0;
      return { ...challenge, progress, completed: progress >= challenge.goal, rewardClaimed: ws.rewardClaimed, weekKey };
    })(),

    // Hearts
    loseHeart,
    gainHeart,
    refillHearts,
    buyHearts,

    // XP Boost
    xpBoostActive: !!(state.xpBoostExpiry && new Date(state.xpBoostExpiry).getTime() > Date.now()),
    xpBoostExpiry: state.xpBoostExpiry,

    // Animations
    levelUpAnimation,
    xpGainAnimation,
    badgeUnlockAnimation,
  };
}
