"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain,
  Compass,
  Beaker,
  ArrowRight,
  Sparkles,
  Heart,
  UserCircle,
  Flame,
  Gamepad2,
  Cat,
  BookOpen,
  ChevronDown,
  Zap,
  Coins,
  Swords,
} from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import PetCompanion from "@/components/PetCompanion";
import OuroborosLogo from "@/components/OuroborosLogo";
import { getTodayInsight } from "@/data/daily-insights-index";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function useHomeState() {
  const [state, setState] = useState<"loading" | "new" | "onboarding" | "assess_prompt" | "dashboard">("loading");
  const [profile, setProfile] = useState<Record<string, any>>({});
  const [gameState, setGameState] = useState<Record<string, any>>({});
  const [dailyProgress, setDailyProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      const onboardingDone = localStorage.getItem("psyche-onboarding-complete");

      if (!raw && !onboardingDone) {
        setState("new");
        return;
      }

      const p = raw ? JSON.parse(raw) : {};
      setProfile(p);

      try {
        const gs = localStorage.getItem("psyche-game-state");
        if (gs) setGameState(JSON.parse(gs));
      } catch {}

      try {
        const dateKey = new Date().toISOString().split("T")[0];
        const dp = localStorage.getItem(`psyche-daily-${dateKey}`);
        if (dp) setDailyProgress(JSON.parse(dp));
      } catch {}

      const hasEnneagram = !!p.enneagramType;
      const hasCognitive = !!(p.cognitiveType || p.mbtiType);

      if (hasEnneagram || hasCognitive) {
        setState("dashboard");
      } else if (onboardingDone === "true") {
        // Onboarding complete but no type set yet, prompt them to take assessment
        setState("assess_prompt");
      } else {
        // In-progress onboarding
        setState("onboarding");
      }
    } catch {
      setState("new");
    }
  }, []);

  return { state, profile, gameState, dailyProgress };
}

// ── State A: New User Hero ────────────────────────────────────────────────────

const staggerChildren = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HeroScreen() {

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "#0f0a1e" }}>
      {/* Aurora orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
      <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />

      {/* Hero */}
      <section className="relative overflow-hidden flex-1 flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa" }}>
              <Sparkles className="w-4 h-4" />
              Research-based personality science
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tight mb-6" style={{ color: "rgba(255,255,255,0.95)" }}>
              Know yourself{" "}
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                completely.
              </span>
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              The only app that maps both your Enneagram type and cognitive function
              stack, then helps you grow.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 mb-6 w-full max-w-md mx-auto">
              <Link
                href="/onboarding"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 w-full justify-center hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}
              >
                <Sparkles className="w-5 h-5" />
                I&apos;m new here, Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/onboarding"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 w-full justify-center hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <BookOpen className="w-5 h-5" />
                Start the Tutorial
              </Link>
            </div>
          </motion.div>

          {/* Value props */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-4"
          >
            {[
              { label: "27 subtypes", icon: Compass, color: "#a78bfa" },
              { label: "8 cognitive functions", icon: Brain, color: "#818cf8" },
              { label: "Daily growth practice", icon: Flame, color: "#fb923c" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span className="text-xs font-medium text-center leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <span>See how it works</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Below the fold: feature previews */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
              Everything in one place
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Start free. Go as deep as you want.</p>
          </div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { icon: Compass, title: "Enneagram", desc: "9 types, 27 subtypes, tritypes, and clinical frameworks.", iconColor: "#a78bfa", badge: "Free" },
              { icon: Brain, title: "Cognitive Functions", desc: "Jung's 8 functions, Beebe's shadow model, your full stack.", iconColor: "#818cf8", badge: "Free" },
              { icon: Flame, title: "Daily Practice", desc: "Personalized quizzes, insights, and streak tracking.", iconColor: "#fb923c", badge: "Free" },
              { icon: Gamepad2, title: "Game", desc: "XP, levels, and challenges based on your type.", iconColor: "#34d399", badge: "Free" },
              { icon: Cat, title: "Avatar & Pet", desc: "A companion that grows alongside you.", iconColor: "#c084fc", badge: "Free" },
              { icon: Beaker, title: "Inner Work", desc: "Shadow dialogue, reframing, and pattern tracking.", iconColor: "#f87171", badge: "Free" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Link
                  href="/onboarding"
                  className="group block p-6 rounded-2xl transition-all hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{item.title}</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-medium mt-4 group-hover:gap-2 transition-all" style={{ color: "#a78bfa" }}>
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
              How it works
            </h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>Three steps to genuine self-knowledge.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Discover your type", desc: "Take our Enneagram and cognitive function assessments, both grounded in clinical frameworks, not surface behaviors.", color: "from-violet-500 to-indigo-600" },
              { step: "02", title: "Go deeper", desc: "Explore your subtypes, shadow functions, tritypes, and what they mean for your actual life, work, love, stress, growth.", color: "from-indigo-500 to-violet-600" },
              { step: "03", title: "Practice daily", desc: "Type-personalized quizzes, growth challenges, and a living profile that reflects where you actually are.", color: "from-violet-600 to-purple-700" },
            ].map((item) => (
              <div key={item.step}>
                <Link href="/onboarding" className="group block p-6 rounded-2xl transition-all hover:-translate-y-0.5 h-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <span className="text-white font-mono font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-serif font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-medium mt-4 group-hover:gap-2 transition-all" style={{ color: "#a78bfa" }}>
                    Get started <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <OuroborosLogo size={14} />
            </div>
            <span className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Thyself</span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Built on Carl Jung&apos;s Psychological Types, Naranjo&apos;s clinical Enneagram, Beatrice Chestnut&apos;s subtypes, and Beebe&apos;s archetypal model.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ── State B1: Onboarding Done but No Type Yet ────────────────────────────────

function AssessPromptScreen({ profile }: { profile: Record<string, any> }) {
  const name = profile.displayName;
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
      <div className="w-full max-w-md">
        <div className="rounded-3xl p-8 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}>
            <OuroborosLogo size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Ready to discover your type{name ? `, ${name}` : ""}?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            You&apos;ve completed the intro. Now take the assessment to map your Enneagram type and cognitive function stack.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/enneagram/assess"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
            >
              <Compass className="w-5 h-5" />
              Enneagram Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cognitive/assess"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Brain className="w-5 h-5" />
              Cognitive Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── State B2: Onboarding In Progress ─────────────────────────────────────────

function OnboardingResumeScreen({ profile }: { profile: Record<string, any> }) {
  const name = profile.displayName;
  const rawStep = profile.onboardingStep ?? 1;
  const totalSteps = 6;
  const step = Math.min(rawStep + 1, totalSteps);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
      <div className="w-full max-w-md">
        <div className="rounded-3xl p-8 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}>
            <OuroborosLogo size={32} />
          </div>

          <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Welcome back{name ? `, ${name}` : ""}!
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            Ready to discover your type? You&apos;re almost there.
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                style={{ width: `${(step / totalSteps) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #4f46e5)" }}
                className="h-full rounded-full transition-all duration-700"
              />
            </div>
          </div>

          <Link
            href="/onboarding"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5 mb-6"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Or jump straight to:</p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/enneagram/assess"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                <Compass className="w-4 h-4" />
                Enneagram Assessment
              </Link>
              <Link
                href="/cognitive/assess"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(79,70,229,0.15)", color: "#818cf8", border: "1px solid rgba(79,70,229,0.25)" }}
              >
                <Brain className="w-4 h-4" />
                Cognitive Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── State C: Today Dashboard ─────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function DashboardScreen({
  profile,
  gameState,
}: {
  profile: Record<string, any>;
  gameState: Record<string, any>;
  dailyProgress: Record<string, any>;
}) {
  const name = profile.displayName;
  const enneagramType = profile.enneagramType;
  const cognitiveType = profile.cognitiveType || profile.mbtiType;
  const streak = gameState.streakCount ?? profile.streakCount ?? 0;
  const tokens = gameState.tokens ?? profile.tokens ?? 0;
  const xp = gameState.xp ?? profile.xp ?? 0;
  const hearts = gameState.hearts ?? gameState.maxHearts ?? 5;
  const insight = getTodayInsight();

  const [petState, setPetState] = useState<Record<string, any> | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-pet-state");
      if (raw) setPetState(JSON.parse(raw));
    } catch {}
  }, []);

  const petStatus = petState
    ? !petState.isAlive ? "Dead"
    : petState.health < 20 ? "Sick"
    : petState.happiness < 30 ? "Sad"
    : petState.hunger < 30 ? "Hungry"
    : petState.health > 80 && petState.happiness > 80 && petState.hunger > 80 ? "Thriving"
    : petState.health > 50 && petState.happiness > 50 && petState.hunger > 50 ? "Happy"
    : "Okay"
    : null;

  const petStatusColor: Record<string, string> = {
    Dead: "text-gray-500",
    Sick: "text-red-500",
    Sad: "text-blue-400",
    Hungry: "text-orange-500",
    Thriving: "text-emerald-500",
    Happy: "text-green-500",
    Okay: "text-yellow-500",
  };

  const petHealthBarColor: Record<string, string> = {
    Dead: "bg-gray-400",
    Sick: "bg-red-500",
    Sad: "bg-blue-400",
    Hungry: "bg-orange-500",
    Thriving: "bg-emerald-500",
    Happy: "bg-green-500",
    Okay: "bg-yellow-500",
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto px-5 pt-10 pb-28"
      >
        {/* ── Greeting + Streak ────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-1">
            {name ? `Hey, ${name}` : "Hey there"}
          </h1>
          <p className="text-sm text-slate-400">Here&apos;s your day at a glance.</p>
        </motion.div>

        {/* ── Streak Hero ──────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
              <Flame className="w-10 h-10 text-white" />
            </div>
            {streak > 0 && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white border border-orange-200 shadow-sm">
                <span className="text-sm font-bold text-orange-600">{streak}</span>
              </div>
            )}
          </div>
          <p className="mt-5 text-lg font-semibold text-slate-800">
            {streak === 0
              ? "Start your streak today"
              : streak === 1
              ? "1 day streak"
              : `${streak} day streak`}
          </p>
          {streak >= 7 && (
            <p className="text-xs text-orange-500 font-medium mt-0.5">You&apos;re on fire!</p>
          )}
        </motion.div>

        {/* ── Continue Learning CTA ────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link
            href="/daily"
            className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Continue Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Pet Companion ──────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-6">
          {petState ? (
            <Link
              href="/avatar"
              className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <PetCompanion type={enneagramType ?? 4} size={64} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 mb-0.5">
                  {petState.name || "Your Companion"}
                </p>
                {!petState.isAlive ? (
                  <p className="text-xs font-medium text-red-500">Needs revival!</p>
                ) : (
                  <p className={`text-xs font-medium ${petStatusColor[petStatus!]}`}>
                    {petStatus}
                  </p>
                )}
                <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${petHealthBarColor[petStatus!]}`}
                    style={{ width: `${Math.max(0, Math.min(100, petState.health ?? 0))}%` }}
                  />
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ) : (
            <Link
              href="/avatar"
              className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
            >
              <Cat className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
                Meet your companion
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}
        </motion.div>

        {/* ── Daily Insight ────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Today&apos;s Insight</p>
            <blockquote className="text-base font-serif text-slate-700 leading-relaxed mb-2">
              &ldquo;{insight.quote}&rdquo;
            </blockquote>
            <p className="text-xs font-medium text-slate-500 mb-3">
             , {insight.author}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {insight.reflection}
            </p>
          </div>
        </motion.div>

        {/* ── Quick Stats Row ──────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl bg-indigo-50/70 border border-indigo-100/50">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-bold text-slate-700">{xp}</span>
              <span className="text-[10px] text-slate-400 font-medium">XP</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl bg-orange-50/70 border border-orange-100/50">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold text-slate-700">{streak}</span>
              <span className="text-[10px] text-slate-400 font-medium">Streak</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl bg-rose-50/70 border border-rose-100/50">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-bold text-slate-700">{hearts}</span>
              <span className="text-[10px] text-slate-400 font-medium">Hearts</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl bg-amber-50/70 border border-amber-100/50">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-slate-700">{tokens}</span>
              <span className="text-[10px] text-slate-400 font-medium">Tokens</span>
            </div>
          </div>
        </motion.div>

        {/* ── Quick Actions ────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/sprint"
              className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                <Swords className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Practice</span>
            </Link>
            <Link
              href="/read"
              className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                <BookOpen className="w-5 h-5 text-sky-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Read</span>
            </Link>
            <Link
              href="/compare"
              className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-slate-100 hover:border-pink-200 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                <Brain className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Compare</span>
            </Link>
          </div>
        </motion.div>

        {/* ── Your Type Card ──────────────────────────────────── */}
        {(enneagramType || cognitiveType) && (
          <motion.div variants={itemVariants}>
            <Link
              href="/profile"
              className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
            >
              {enneagramType ? (
                <div className="w-12 h-12 flex-shrink-0">
                  <ChibiSprite
                    type={enneagramType}
                    instinct={profile.instinctualStacking}
                    size={48}
                    state="idle"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-slate-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Your Type</p>
                <p className="text-sm font-semibold text-slate-800">
                  {[
                    enneagramType ? `Type ${enneagramType}` : null,
                    cognitiveType,
                    profile.instinctualStacking,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { state, profile, gameState, dailyProgress } = useHomeState();
  const router = useRouter();

  // No auto-redirect, Home tab shows its own dashboard with chibi greeting.

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) < 80 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) router.push("/daily");
    // swipe right on home, no previous tab
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    );
  }

  if (state === "new") return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="fixed inset-0 z-[100] overflow-y-auto" style={{ background: "#0f0a1e" }}><HeroScreen /></div>;
  if (state === "onboarding") return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><OnboardingResumeScreen profile={profile} /></div>;
  if (state === "assess_prompt") return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><AssessPromptScreen profile={profile} /></div>;
  return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><DashboardScreen profile={profile} gameState={gameState} dailyProgress={dailyProgress} /></div>;
}
