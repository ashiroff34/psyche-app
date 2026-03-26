"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  Flame,
  Trophy,
  Heart,
  Zap,
  X,
  ArrowRight,
  BookOpen,
  Skull,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type BannerVariant =
  | "pet-dying"
  | "pet-dead"
  | "pet-hungry"
  | "streak-at-risk"
  | "comeback"
  | "daily-not-done"
  | "level-up-close";

interface BannerData {
  variant: BannerVariant;
  message: string;
  href: string;
  actionLabel: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  buttonClass: string;
  comebackDays?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDateKey() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(isoA: string, isoB: string): number {
  const a = new Date(isoA).getTime();
  const b = new Date(isoB).getTime();
  return Math.max(0, Math.floor(Math.abs(b - a) / 86400000));
}

function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level, 1.8));
}

function getLevelFromXP(xp: number): number {
  let level = 1;
  while (getXPForLevel(level + 1) <= xp) {
    level++;
    if (level >= 50) break;
  }
  return level;
}

const AUTO_DISMISS_MS = 8000;

// ─── Component ───────────────────────────────────────────────────────────────

export default function RetentionBanner() {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem("retention-banner-dismissed") === "true") {
      setDismissed(true);
      return;
    }

    // Only show to returning users (psyche-profile must exist)
    const hasProfile = !!localStorage.getItem("psyche-profile");
    if (!hasProfile) return;

    // Don't show until onboarding/tutorial is complete
    if (localStorage.getItem("psyche-tutorial-complete") !== "true") return;

    const today = getDateKey();

    // Read all relevant state
    let profile: Record<string, unknown> = {};
    let gameState: Record<string, unknown> = {};
    let petState: Record<string, unknown> | null = null;
    let dailyProgress: Record<string, unknown> | null = null;

    try {
      const raw = localStorage.getItem("psyche-profile");
      if (raw) profile = JSON.parse(raw);
    } catch {}

    try {
      const raw = localStorage.getItem("psyche-game-state");
      if (raw) gameState = JSON.parse(raw);
    } catch {}

    try {
      const raw = localStorage.getItem("psyche-pet-state");
      if (raw) petState = JSON.parse(raw);
    } catch {}

    try {
      const raw = localStorage.getItem(`psyche-daily-${today}`);
      if (raw) dailyProgress = JSON.parse(raw);
    } catch {}

    const petName = (petState?.name as string) || "Your pet";
    const petHealth = typeof petState?.health === "number" ? petState.health : null;
    const petHunger = typeof petState?.hunger === "number" ? petState.hunger : null;
    const petAlive = petState?.isAlive !== false;

    const xp =
      typeof gameState.xp === "number"
        ? gameState.xp
        : typeof profile.xp === "number"
        ? profile.xp
        : 0;
    const streakCount =
      typeof gameState.streakCount === "number"
        ? gameState.streakCount
        : typeof profile.streakCount === "number"
        ? profile.streakCount
        : 0;
    const lastVisitDate = typeof profile.lastVisitDate === "string" ? profile.lastVisitDate : null;

    const currentLevel = getLevelFromXP(xp);
    const nextLevelXP = getXPForLevel(currentLevel + 1);
    const xpToNextLevel = nextLevelXP - xp;

    const now = new Date();
    const hour = now.getHours();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    let data: BannerData | null = null;

    // Priority 1: Pet dying (health < 20, alive)
    if (petState && petAlive && petHealth !== null && petHealth < 20) {
      data = {
        variant: "pet-dying",
        message: `${petName} is in critical condition! Care for them now.`,
        href: "/avatar",
        actionLabel: "Help Now",
        icon: <AlertTriangle className="w-4 h-4" />,
        gradient: "from-red-500/10 via-rose-500/10 to-red-500/5",
        textColor: "text-red-700",
        buttonClass: "bg-red-500 hover:bg-red-600 text-white",
      };
    }
    // Priority 2: Pet dead
    else if (petState && !petAlive) {
      data = {
        variant: "pet-dead",
        message: `${petName} needs revival! They've been waiting for you.`,
        href: "/avatar",
        actionLabel: "Revive",
        icon: <Skull className="w-4 h-4" />,
        gradient: "from-slate-500/10 via-slate-400/10 to-slate-500/5",
        textColor: "text-slate-700",
        buttonClass: "bg-slate-600 hover:bg-slate-700 text-white",
      };
    }
    // Priority 3: Pet hungry (hunger < 30, alive)
    else if (petState && petAlive && petHunger !== null && petHunger < 30) {
      data = {
        variant: "pet-hungry",
        message: `${petName} is hungry! Feed them to earn bonus tokens.`,
        href: "/avatar",
        actionLabel: "Feed Pet",
        icon: <Heart className="w-4 h-4" />,
        gradient: "from-orange-500/10 via-amber-500/10 to-orange-500/5",
        textColor: "text-orange-700",
        buttonClass: "bg-orange-500 hover:bg-orange-600 text-white",
      };
    }
    // Priority 4: Streak at risk (last visit was yesterday, now past 9pm)
    else if (lastVisitDate === yesterday && hour >= 21 && streakCount > 0) {
      data = {
        variant: "streak-at-risk",
        message: `Don't break your ${streakCount}-day streak! Complete today's quiz before midnight.`,
        href: "/daily",
        actionLabel: "Practice Now",
        icon: <Flame className="w-4 h-4" />,
        gradient: "from-orange-500/10 via-red-500/10 to-orange-500/5",
        textColor: "text-orange-700",
        buttonClass: "bg-orange-500 hover:bg-orange-600 text-white",
      };
    }
    // Priority 5: Comeback bonus (3+ days since last visit)
    else if (lastVisitDate && lastVisitDate !== today) {
      const daysSince = daysBetween(lastVisitDate, today);
      if (daysSince >= 3) {
        const claimed = sessionStorage.getItem("comeback-claimed-date") === today;
        if (!claimed) {
          data = {
            variant: "comeback",
            message: `Welcome back! You've been gone ${daysSince} day${daysSince !== 1 ? "s" : ""} — claim your comeback bonus (+50 XP).`,
            href: "/daily",
            actionLabel: "Claim Bonus",
            icon: <Trophy className="w-4 h-4" />,
            gradient: "from-violet-500/10 via-purple-500/10 to-violet-500/5",
            textColor: "text-violet-700",
            buttonClass: "bg-violet-500 hover:bg-violet-600 text-white",
            comebackDays: daysSince,
          };
        }
      }
    }

    // Priority 6: Daily not done
    if (!data) {
      const quizDoneToday = dailyProgress && (dailyProgress.questionsAnswered as number) > 0;
      if (!quizDoneToday) {
        data = {
          variant: "daily-not-done",
          message: "Your daily practice is waiting — just a few minutes to earn your streak bonus.",
          href: "/daily",
          actionLabel: "Start Practice",
          icon: <BookOpen className="w-4 h-4" />,
          gradient: "from-sky-500/10 via-indigo-500/10 to-sky-500/5",
          textColor: "text-sky-700",
          buttonClass: "bg-sky-500 hover:bg-sky-600 text-white",
        };
      }
    }

    // Priority 7: Level up close (within 50 XP of next level)
    if (!data && xpToNextLevel <= 50 && currentLevel < 50) {
      data = {
        variant: "level-up-close",
        message: `You're almost Level ${currentLevel + 1}! Just ${xpToNextLevel} more XP to level up.`,
        href: "/game",
        actionLabel: "View Progress",
        icon: <Zap className="w-4 h-4" />,
        gradient: "from-amber-500/10 via-yellow-500/10 to-amber-500/5",
        textColor: "text-amber-700",
        buttonClass: "bg-amber-500 hover:bg-amber-600 text-white",
      };
    }

    setBanner(data);
  }, []);

  // Auto-dismiss after AUTO_DISMISS_MS
  useEffect(() => {
    if (banner && !dismissed) {
      timerRef.current = setTimeout(() => {
        handleDismiss();
      }, AUTO_DISMISS_MS);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner]);

  const handleDismiss = () => {
    sessionStorage.setItem("retention-banner-dismissed", "true");
    setDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <AnimatePresence>
      {banner && !dismissed && (
        <motion.div
          key="retention-banner"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`fixed bottom-6 right-6 z-50 max-w-sm w-full rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden`}
        >
          {/* Gradient accent strip */}
          <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} pointer-events-none rounded-2xl`} />

          <div className="relative p-4 flex items-start gap-3">
            {/* Icon */}
            <div className={`shrink-0 mt-0.5 ${banner.textColor}`}>
              {banner.icon}
            </div>

            {/* Message */}
            <p className={`flex-1 text-sm font-medium ${banner.textColor} leading-snug`}>
              {banner.message}
            </p>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss"
              className={`shrink-0 p-1 rounded-md ${banner.textColor} opacity-50 hover:opacity-100 transition-opacity`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action button row */}
          <div className="relative px-4 pb-4">
            <Link
              href={banner.href}
              onClick={handleDismiss}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${banner.buttonClass}`}
            >
              {banner.actionLabel}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
