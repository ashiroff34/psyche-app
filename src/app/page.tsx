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
  Trophy,
  Gamepad2,
  Cat,
  BookOpen,
  CheckCircle,
  Lock,
  ChevronDown,
  Star,
  Zap,
  Target,
  Clock,
  X,
  Coins,
} from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import OuroborosLogo from "@/components/OuroborosLogo";

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

      const hasEnneagram = !!p.enneagramType;
      const hasCognitive = !!(p.cognitiveType || p.mbtiType);

      if (hasEnneagram || hasCognitive) {
        setState("dashboard");
      } else if (onboardingDone === "true") {
        // Onboarding complete but no type set yet — prompt them to take assessment
        setState("assess_prompt");
      } else {
        // In-progress onboarding
        setState("onboarding");
      }
    } catch {
      setState("new");
    }
  }, []);

  return { state, profile, gameState };
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
  const [showToast, setShowToast] = useState(false);

  const blockNav = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Toast for blocked navigation */}
      {showToast && (
        <div className="fixed bottom-24 left-4 right-4 z-[60] flex items-center gap-3 px-5 py-4 bg-slate-900 text-white rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <BookOpen className="w-5 h-5 text-sky-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Complete the tutorial first</p>
            <p className="text-xs text-slate-400">Tap &quot;I&apos;m new here&quot; or &quot;Start the Tutorial&quot; above to begin.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="p-1 text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Hero */}
      <section className="relative overflow-hidden flex-1 flex items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-indigo-50" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sky-100 text-sky-700 text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Research-based personality science
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Know yourself{" "}
              <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                completely.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto">
              The only app that maps both your Enneagram type and cognitive function
              stack — then helps you grow.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 mb-6 w-full max-w-md mx-auto">
              <Link
                href="/onboarding"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-200/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-full justify-center"
              >
                <Sparkles className="w-5 h-5" />
                I&apos;m new here — Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/onboarding"
                className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-semibold border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 w-full justify-center"
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
              { label: "27 subtypes", icon: Compass, color: "text-sky-600" },
              { label: "8 cognitive functions", icon: Brain, color: "text-indigo-600" },
              { label: "Daily growth practice", icon: Flame, color: "text-orange-500" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-xs font-medium text-slate-600 text-center leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2 text-slate-400 text-sm"
          >
            <span>See how it works</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Below the fold: feature previews */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
              Everything in one place
            </h2>
            <p className="text-slate-500">Start free. Go as deep as you want.</p>
          </div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Compass,
                title: "Enneagram",
                desc: "9 types, 27 subtypes, tritypes, and clinical frameworks.",
                href: "/onboarding",
                color: "bg-sky-50",
                iconColor: "text-sky-600",
                badge: "Free",
              },
              {
                icon: Brain,
                title: "Cognitive Functions",
                desc: "Jung's 8 functions, Beebe's shadow model, your full stack.",
                href: "/onboarding",
                color: "bg-indigo-50",
                iconColor: "text-indigo-600",
                badge: "Free",
              },
              {
                icon: Flame,
                title: "Daily Practice",
                desc: "Personalized quizzes, insights, and streak tracking.",
                href: "/onboarding",
                color: "bg-orange-50",
                iconColor: "text-orange-500",
                badge: "Free",
              },
              {
                icon: Gamepad2,
                title: "Game",
                desc: "XP, levels, and challenges based on your type.",
                href: "/onboarding",
                color: "bg-emerald-50",
                iconColor: "text-emerald-600",
                badge: "Free",
              },
              {
                icon: Cat,
                title: "Avatar & Pet",
                desc: "A companion that grows alongside you.",
                href: "/onboarding",
                color: "bg-violet-50",
                iconColor: "text-violet-600",
                badge: "Free",
              },
              {
                icon: Beaker,
                title: "Inner Work",
                desc: "Shadow dialogue, reframing, and pattern tracking.",
                href: "/onboarding",
                color: "bg-rose-50",
                iconColor: "text-rose-600",
                badge: "Free",
              },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <a
                  href="#"
                  onClick={blockNav}
                  className="group block p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif font-semibold text-slate-800">{item.title}</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-medium text-sky-500 mt-4 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
              How it works
            </h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">Three steps to genuine self-knowledge.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Discover your type",
                desc: "Take our Enneagram and cognitive function assessments — both grounded in clinical frameworks, not surface behaviors.",
                color: "from-sky-400 to-sky-500",
                href: "/onboarding",
              },
              {
                step: "02",
                title: "Go deeper",
                desc: "Explore your subtypes, shadow functions, tritypes, and what they mean for your actual life — work, love, stress, growth.",
                color: "from-indigo-400 to-violet-500",
                href: "/onboarding",
              },
              {
                step: "03",
                title: "Practice daily",
                desc: "Type-personalized quizzes, growth challenges, and a living profile that reflects where you actually are.",
                color: "from-violet-400 to-purple-500",
                href: "/onboarding",
              },
            ].map((item, i) => (
              <div key={item.step}>
                <a href="#" onClick={blockNav} className="group block p-6 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 hover:shadow-lg transition-all h-full">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <span className="text-white font-mono font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-medium text-sky-500 mt-4 group-hover:gap-2 transition-all">
                    Get started <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
              <OuroborosLogo size={14} />
            </div>
            <span className="font-serif font-semibold text-slate-700">Thyself</span>
          </div>
          <p className="text-xs text-slate-400">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-200/50">
            <OuroborosLogo size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Ready to discover your type{name ? `, ${name}` : ""}?
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            You&apos;ve completed the intro. Now take the assessment to map your Enneagram type and cognitive function stack.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/enneagram/assess"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-200/40 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Compass className="w-5 h-5" />
              Enneagram Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cognitive/assess"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white border-2 border-slate-100 text-indigo-700 rounded-2xl font-semibold hover:border-indigo-200 hover:bg-indigo-50 transition-all"
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
  const totalSteps = 7;
  const step = Math.min(rawStep, totalSteps);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-200/50">
            <OuroborosLogo size={32} />
          </div>

          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Welcome back{name ? `, ${name}` : ""}!
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Ready to discover your type? You&apos;re almost there.
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${(step / totalSteps) * 100}%` }}
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-700"
              />
            </div>
          </div>

          <Link
            href="/onboarding"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-200/40 hover:shadow-xl hover:-translate-y-0.5 transition-all mb-6"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-400 mb-3">Or jump straight to:</p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/enneagram/assess"
                className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 text-sky-700 rounded-xl text-sm font-medium hover:bg-sky-100 transition-all"
              >
                <Compass className="w-4 h-4" />
                Enneagram Assessment
              </Link>
              <Link
                href="/cognitive/assess"
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-all"
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

// ── State C: Dashboard ────────────────────────────────────────────────────────

const pathSteps = [
  { id: "enneagram", label: "Enneagram Type", shortLabel: "Enneagram", href: "/enneagram/assess" },
  { id: "cognitive", label: "Cognitive Stack", shortLabel: "Cognitive", href: "/cognitive/assess" },
  { id: "deepdive", label: "Type Deep-Dive", shortLabel: "Deep-Dive", href: "/enneagram/learn" },
  { id: "streak", label: "7-Day Streak", shortLabel: "Streak", href: "/daily" },
  { id: "advanced", label: "Advanced Features", shortLabel: "Advanced", href: "/game" },
];

function getCompletedSteps(profile: Record<string, any>, gameState: Record<string, any>) {
  return {
    enneagram: !!profile.enneagramType,
    cognitive: !!(profile.cognitiveType || profile.mbtiType),
    deepdive: !!profile.visitedLearnPage,
    streak: (gameState.streakCount ?? profile.streakCount ?? 0) >= 7,
    advanced: false,
  };
}

function PathRail({
  profile,
  gameState,
}: {
  profile: Record<string, any>;
  gameState: Record<string, any>;
}) {
  const completed = getCompletedSteps(profile, gameState);
  const firstIncomplete = pathSteps.findIndex((s) => !completed[s.id as keyof typeof completed]);
  const activeIdx = firstIncomplete === -1 ? pathSteps.length - 1 : firstIncomplete;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Your Path</h3>
      <div className="flex items-center gap-0">
        {pathSteps.map((step, i) => {
          const done = completed[step.id as keyof typeof completed];
          const isActive = i === activeIdx;
          const isFuture = i > activeIdx;

          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              {/* Node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <Link href={isActive ? step.href : "#"} tabIndex={isActive ? 0 : -1}>
                  <motion.div
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={isActive ? { repeat: Infinity, duration: 2, repeatDelay: 0.5, ease: "easeInOut" } : {}}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      done
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-200/50"
                        : isActive
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-200/60"
                        : "bg-slate-100 text-slate-400"
                    }`}
                    style={isActive ? { boxShadow: "0 0 0 4px rgba(186, 230, 253, 0.8), 0 0 12px rgba(14, 165, 233, 0.35)" } : {}}
                  >
                    {done ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : isActive ? (
                      <ArrowRight className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                  </motion.div>
                </Link>
                <span
                  className={`text-[9px] mt-1.5 font-medium text-center leading-tight max-w-[52px] truncate ${
                    done ? "text-indigo-600" : isActive ? "text-sky-600" : "text-slate-300"
                  }`}
                >
                  {step.shortLabel}
                </span>
              </div>

              {/* Connector line */}
              {i < pathSteps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 rounded-full ${
                    done ? "bg-indigo-200" : "bg-slate-100"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatPills({
  profile,
  gameState,
}: {
  profile: Record<string, any>;
  gameState: Record<string, any>;
}) {
  const streak = gameState.streakCount ?? profile.streakCount ?? 0;
  const tokens = gameState.tokens ?? profile.tokens ?? 0;
  const xp = gameState.xp ?? profile.xp ?? 0;
  const level = Math.max(1, Math.floor(xp / 1000) + 1);

  return (
    <div className="flex gap-3 flex-wrap">
      {/* Streak */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 border border-white/80">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-semibold text-slate-700">{streak} days</span>
        <span className="text-xs text-slate-400">Streak</span>
      </div>

      {/* Tokens — ✦ coin symbol in amber */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-white/80">
        <span className="text-amber-500 text-sm font-bold leading-none">✦</span>
        <span className="text-sm font-semibold text-slate-700">{tokens}</span>
        <span className="text-xs text-slate-400">Tokens</span>
      </div>

      {/* XP with level badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-white/80">
        <Zap className="w-4 h-4 text-indigo-500" />
        <span className="text-sm font-semibold text-slate-700">{xp} XP</span>
        <span className="text-xs text-slate-400">XP</span>
        <span className="ml-1 px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
          Lv {level}
        </span>
      </div>
    </div>
  );
}

function NextUpCards({ profile, gameState }: { profile: Record<string, any>; gameState: Record<string, any> }) {
  const hasCognitive = !!(profile.cognitiveType || profile.mbtiType);
  const streak = gameState.streakCount ?? profile.streakCount ?? 0;
  const petName = profile.petName || "your pet";
  const petHungry = profile.petHunger !== undefined && profile.petHunger < 30;
  const enneagramType = profile.enneagramType;

  const today = new Date().toISOString().split("T")[0];
  const hasJournaledToday = profile.lastJournalDate === today;
  const hasQuizzedToday = profile.completedQuizzes?.includes(`quiz-${today}`);

  const cards: Array<{ label: string; desc: string; href: string; icon: any; color: string; bg: string }> = [];

  if (!hasCognitive) {
    cards.push({ label: "Discover your cognitive stack", desc: "Find out how your mind works", href: "/cognitive/assess", icon: Brain, color: "text-indigo-600", bg: "bg-indigo-50" });
  }
  if (!hasJournaledToday || !hasQuizzedToday) {
    cards.push({ label: "Journal prompt waiting", desc: "Today's reflection is ready", href: "/daily", icon: BookOpen, color: "text-violet-600", bg: "bg-violet-50" });
  }
  if (streak > 0 && streak < 7) {
    cards.push({ label: "Keep your streak alive", desc: `${streak}-day streak — don't break it!`, href: "/daily", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" });
  }
  if (petHungry) {
    cards.push({ label: `${petName} is hungry`, desc: "Visit your avatar to feed them", href: "/avatar", icon: Cat, color: "text-rose-500", bg: "bg-rose-50" });
  }

  // Fallback cards
  if (cards.length < 3 && enneagramType) {
    cards.push({ label: `Explore Type ${enneagramType} in depth`, desc: "Subtypes, tritype, and Naranjo framework", href: `/enneagram/learn?type=${enneagramType}`, icon: Compass, color: "text-sky-600", bg: "bg-sky-50" });
  }
  if (cards.length < 3) {
    cards.push({ label: "Today's deep learning", desc: "Deepen your self-understanding", href: "/enneagram/learn", icon: Star, color: "text-sky-600", bg: "bg-sky-50" });
  }
  if (cards.length < 3) {
    cards.push({ label: "Check your game stats", desc: "XP, achievements, and challenges", href: "/game", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" });
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-3">What to do next</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {cards.slice(0, 3).map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Link
              href={card.href}
              className="group flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
            >
              <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 leading-tight mb-0.5">{card.label}</div>
                <div className="text-xs text-slate-400">{card.desc}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function QuickAccessGrid() {
  const tiles = [
    { href: "/daily", icon: Flame, label: "Daily", color: "text-orange-500", bg: "bg-orange-50" },
    { href: "/enneagram", icon: Compass, label: "Enneagram", color: "text-sky-600", bg: "bg-sky-50" },
    { href: "/cognitive", icon: Brain, label: "Cognitive", color: "text-indigo-600", bg: "bg-indigo-50" },
    { href: "/game", icon: Gamepad2, label: "Game", color: "text-emerald-600", bg: "bg-emerald-50" },
    { href: "/avatar", icon: Cat, label: "Avatar", color: "text-violet-600", bg: "bg-violet-50" },
    { href: "/journal", icon: Beaker, label: "Inner Work", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick access</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.href}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.05 }}
          >
            <Link
              href={tile.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group"
            >
              <div className={`w-9 h-9 rounded-xl ${tile.bg} flex items-center justify-center`}>
                <tile.icon className={`w-4 h-4 ${tile.color}`} />
              </div>
              <span className="text-xs font-medium text-slate-600">{tile.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const ALL_SECTIONS = [
  { href: "/daily", icon: Flame, label: "Daily Practice", desc: "Quizzes, insights & streak", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
  { href: "/enneagram", icon: Compass, label: "Enneagram", desc: "Types, subtypes & tritypes", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
  { href: "/cognitive", icon: Brain, label: "Cognitive", desc: "Your function stack", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  { href: "/journal", icon: Beaker, label: "Inner Work", desc: "Shadow & reframe tools", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
  { href: "/game", icon: Gamepad2, label: "Progress", desc: "XP, levels & achievements", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { href: "/avatar", icon: Cat, label: "Pet & Avatar", desc: "Your companion", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  { href: "/compare", icon: Heart, label: "Compare", desc: "Type compatibility", color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
  { href: "/history", icon: Clock, label: "History", desc: "Typology timeline", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  { href: "/correlations", icon: ArrowRight, label: "Correlations", desc: "Enneagram × cognitive", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
  { href: "/profile", icon: UserCircle, label: "My Profile", desc: "Your full type profile", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-100" },
  { href: "/dashboard", icon: Sparkles, label: "Dashboard", desc: "Radar chart & insights", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  { href: "/store", icon: Star, label: "Store", desc: "Earn & spend tokens", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100" },
];

function TodayHeroCard({ profile, gameState }: { profile: Record<string, any>; gameState: Record<string, any> }) {
  const hasCognitive = !!(profile.cognitiveType || profile.mbtiType);
  const hasEnneagram = !!profile.enneagramType;
  const streak = gameState.streakCount ?? profile.streakCount ?? 0;
  const today = new Date().toISOString().split("T")[0];
  const didPracticeToday = profile.lastPracticeDate === today || (gameState.lastQuizDate === today);

  // Determine the ONE thing to do
  let action: { label: string; desc: string; href: string; cta: string };
  if (!hasEnneagram) {
    action = { label: "Find your Enneagram type", desc: "Take the assessment to unlock your personalized experience", href: "/enneagram/assess", cta: "Start Assessment" };
  } else if (!hasCognitive) {
    action = { label: "Discover your cognitive stack", desc: "Map your 8 Jungian functions to complete your profile", href: "/cognitive/assess", cta: "Take Assessment" };
  } else if (!didPracticeToday) {
    action = { label: "Your daily practice is ready", desc: "Quiz, insight, and growth challenge — personalized to your type", href: "/daily", cta: "Start Practice" };
  } else {
    action = { label: "Keep exploring", desc: "Dive deeper into your type or try a new feature", href: "/enneagram/learn", cta: "Explore" };
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 p-6 sm:p-8 mb-6 shadow-lg shadow-sky-200/40">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold">
              <Flame className="w-3 h-3" /> {streak}-day streak
            </span>
          )}
          {didPracticeToday && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold">
              <CheckCircle className="w-3 h-3" /> Done today
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">{action.label}</h2>
        <p className="text-sm text-white/70 mb-5">{action.desc}</p>
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-2xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          {action.cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function StreakCelebration({ streak }: { streak: number }) {
  const [show, setShow] = useState(true);
  if (!show || streak < 2) return null;
  const milestones = [7, 14, 30, 60, 100];
  const isMilestone = milestones.includes(streak);
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`mb-4 p-4 rounded-2xl text-center ${isMilestone ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white" : "bg-orange-50 border border-orange-100"}`}
    >
      <div className="flex items-center justify-center gap-2">
        <Flame className={`w-5 h-5 ${isMilestone ? "text-white" : "text-orange-500"}`} />
        <span className={`font-bold ${isMilestone ? "text-lg" : "text-sm"} ${isMilestone ? "text-white" : "text-orange-700"}`}>
          {isMilestone ? `${streak}-day streak milestone!` : `${streak}-day streak — keep it going!`}
        </span>
        <button onClick={() => setShow(false)} className={`ml-2 ${isMilestone ? "text-white/60 hover:text-white" : "text-orange-300 hover:text-orange-500"}`}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function DashboardScreen({
  profile,
  gameState,
}: {
  profile: Record<string, any>;
  gameState: Record<string, any>;
}) {
  const name = profile.displayName;
  const enneagramType = profile.enneagramType;
  const cognitiveType = profile.cognitiveType || profile.mbtiType;
  const streak = gameState.streakCount ?? profile.streakCount ?? 0;
  const tokens = gameState.tokens ?? profile.tokens ?? 0;
  const xp = gameState.xp ?? profile.xp ?? 0;
  const level = Math.max(1, Math.floor(xp / 1000) + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-indigo-50/30">
      {/* Hero header — centered chibi + greeting */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100/40 via-white to-indigo-100/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          {/* Chibi + Greeting — centered hero */}
          <div className="flex flex-col items-center text-center mb-6">
            {enneagramType && profile.instinctualStacking && (
              <div className="mb-4">
                <ChibiSprite
                  type={enneagramType}
                  instinct={profile.instinctualStacking as string}
                  size={160}
                  state="idle"
                />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
              {getGreeting()}{name ? `, ${name}` : ""}!
            </h1>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {enneagramType && (
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold shadow-sm">
                  Type {enneagramType}
                </span>
              )}
              {cognitiveType && (
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold font-mono shadow-sm">
                  {cognitiveType}
                </span>
              )}
              {profile.instinctualStacking && (
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold shadow-sm">
                  {profile.instinctualStacking}
                </span>
              )}
            </div>
          </div>

          {/* Stats row — glass pills centered */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-orange-100/50 shadow-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-slate-700">{streak}</span>
              <span className="text-xs text-slate-400">streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-amber-100/50 shadow-sm">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-slate-700">{tokens}</span>
              <span className="text-xs text-slate-400">tokens</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-indigo-100/50 shadow-sm">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-bold text-slate-700">Lv {level}</span>
              <span className="text-xs text-slate-400">{xp} XP</span>
            </div>
          </div>

          {/* Path rail */}
          <div className="mb-4">
            <PathRail profile={profile} gameState={gameState} />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        {/* Streak celebration */}
        <StreakCelebration streak={streak} />

        {/* BIG hero action — Duolingo-style ONE clear thing to do */}
        <TodayHeroCard profile={profile} gameState={gameState} />

        {/* What to do next */}
        <div className="mb-8">
          <NextUpCards profile={profile} gameState={gameState} />
        </div>

        {/* Learning Units — Duolingo-style vertical path */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Your Learning Path</h3>
          <div className="space-y-3">
            {[
              { label: "Enneagram Basics", desc: "Core types, motivations & fears", href: "/enneagram/learn", icon: Compass, color: "bg-sky-500", done: !!profile.enneagramType },
              { label: "Find Your Type", desc: "Take the Enneagram assessment", href: "/enneagram/assess", icon: Target, color: "bg-sky-400", done: !!profile.enneagramType },
              { label: "Cognitive Functions", desc: "Jung's 8 mental processes", href: "/cognitive/learn", icon: Brain, color: "bg-indigo-500", done: !!(profile.cognitiveType || profile.mbtiType) },
              { label: "Your Function Stack", desc: "Discover your cognitive type", href: "/cognitive/assess", icon: Brain, color: "bg-indigo-400", done: !!(profile.cognitiveType || profile.mbtiType) },
              { label: "Subtypes & Instincts", desc: "SP, SO, SX — how your type expresses", href: "/enneagram/learn?tab=instincts", icon: Flame, color: "bg-orange-500", done: !!profile.instinctualStacking },
              { label: "Inner Work", desc: "Shadow dialogue, reframing, patterns", href: "/journal", icon: Beaker, color: "bg-rose-500", done: false },
              { label: "Compare & Correlate", desc: "How types relate across systems", href: "/compare", icon: BookOpen, color: "bg-pink-500", done: false },
            ].map((unit, i) => (
              <Link
                key={unit.label}
                href={unit.href}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  unit.done
                    ? "bg-white/80 border-emerald-100 hover:shadow-md"
                    : "bg-white/60 border-slate-100 hover:border-sky-200 hover:shadow-md"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl ${unit.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  {unit.done ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <unit.icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800">{unit.label}</div>
                  <div className="text-xs text-slate-400">{unit.desc}</div>
                </div>
                {unit.done ? (
                  <span className="text-xs font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-50">Done</span>
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Full section grid — all areas accessible */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Everything in Thyself</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALL_SECTIONS.map((section) => (
              <div key={section.href}>
                <Link
                  href={section.href}
                  className={`group flex items-start gap-3 p-4 bg-white rounded-2xl border ${section.border} hover:shadow-md hover:-translate-y-0.5 transition-all`}
                >
                  <div className={`w-9 h-9 rounded-xl ${section.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <section.icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-800 truncate">{section.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-tight">{section.desc}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { state, profile, gameState } = useHomeState();
  const router = useRouter();
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
    // swipe right on home — no previous tab
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

  if (state === "new") return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><HeroScreen /></div>;
  if (state === "onboarding") return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><OnboardingResumeScreen profile={profile} /></div>;
  if (state === "assess_prompt") return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><AssessPromptScreen profile={profile} /></div>;
  return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><DashboardScreen profile={profile} gameState={gameState} /></div>;
}
