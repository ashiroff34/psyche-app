"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain,
  Compass,
  ArrowRight,
  Sparkles,
  Heart,
  UserCircle,
  Flame,
  Cat,
  BookOpen,
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
  // Always start as "loading" to avoid hydration mismatch (server renders
  // "loading", client reads localStorage in useEffect below)
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
        const dateKey = new Intl.DateTimeFormat("en-CA").format(new Date());
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

// ── Saved-progress step labels ────────────────────────────────────────────────

const RESUME_LABELS: Record<number, string> = {
  1: "Continue: Enter your name",
  2: "Continue: Preview the types",
  3: "Continue: Take the quiz",
  4: "Continue: See your type result",
  5: "Continue: Save your result",
  6: "Continue: You're almost done",
};

// ── State A: Enter Experience (new users) ────────────────────────────────────

function EnterScreen() {
  const router = useRouter();
  const [resumeStep, setResumeStep] = useState<number | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem("psyche-onboarding-step") ?? "0", 10);
      const done = localStorage.getItem("psyche-onboarding-complete") === "true";
      if (!done && saved > 0 && saved < 7) setResumeStep(saved);
    } catch {}
  }, []);

  // Show bubble after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(t);
  }, [showBubble]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-y-auto"
      style={{ background: "#08031a" }}
    >
      {/* Dot grid — drifts imperceptibly slow, ~60s full cycle */}
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ["0px 0px", "22px 22px"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none bg-dots"
        style={{ opacity: 0.5, zIndex: 0 }}
      />

      {/* Static radial glow (pure CSS, no animation, zero render cost after paint) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 40%, rgba(124,58,237,0.28) 0%, rgba(79,70,229,0.12) 35%, transparent 70%)",
        }}
      />

      {/* Aurora top-left */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)",
          willChange: "transform",
        }}
      />

      {/* Aurora bottom-right (second blob, cheap CSS) */}
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "10%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          filter: "blur(70px)",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 65%)",
          willChange: "transform",
        }}
      />

      {/* CENTER: rotating snake logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-6"
        style={{ width: 180, height: 180, zIndex: 10 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22%",
            background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4f46e5 100%)",
            boxShadow: "0 0 60px rgba(124,58,237,0.45)",
          }}
        />
        <motion.img
          src="/thyself-snake-only.svg"
          alt="Ouroboros"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* Headline (entrance only, no filter blur for perf) */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative font-serif font-bold text-center tracking-tight mb-4"
        style={{
          fontSize: "clamp(38px, 11vw, 62px)",
          lineHeight: 1.05,
          color: "rgba(255,255,255,0.96)",
          zIndex: 10,
        }}
      >
        Finally understand{" "}
        <span className="shimmer-text">why you are the way you are.</span>
      </motion.h1>

      {/* Thesis line */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative text-center leading-snug mb-4 font-serif italic"
        style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: "clamp(15px, 4vw, 19px)",
          maxWidth: "380px",
          zIndex: 10,
        }}
      >
        Before therapy, before any real change,
        <br />
        you need a map of your own psyche.
      </motion.p>

      {/* Sub-line */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative text-center leading-relaxed mb-6"
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(12px, 3.2vw, 14px)",
          maxWidth: "340px",
          zIndex: 10,
        }}
      >
        Typology gives you that map. Not transformation. Recognition.
      </motion.p>

      {/* Proof pills (no motion) */}
      <div
        className="relative flex items-center gap-2 flex-wrap justify-center mb-7"
        style={{ zIndex: 10 }}
      >
        {["self-knowledge, not a quiz", "grounded in real psychology", "private and honest"].map((pill) => (
          <span
            key={pill}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.24)",
              color: "rgba(167,139,250,0.72)",
            }}
          >
            {pill}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative flex flex-col items-center gap-3 w-full px-6"
        style={{ maxWidth: "360px", zIndex: 10 }}
      >
        {/* Resume button (only when there's in-progress onboarding) */}
        {resumeStep !== null && (
          <Link
            href="/onboarding"
            className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 animate-pulse"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.2))",
              border: "1px solid rgba(245,158,11,0.4)",
              color: "#fbbf24",
            }}
          >
            {RESUME_LABELS[resumeStep] ?? "Continue where you left off"} →
          </Link>
        )}

        {/* Primary CTA */}
        <Link
          href="/onboarding?fromEnter=true"
          prefetch
          className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 8px 32px rgba(124,58,237,0.5)",
          }}
        >
          Discover my type
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Secondary CTA (made prominent as a real button) */}
        <Link
          href="/onboarding?manual=true"
          prefetch
          className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(167,139,250,0.35)",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          I already know my type
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      {/* Endowed progress + curiosity gap (Nunes & Drèze 2006; Zeigarnik) — below CTAs to reduce density */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative w-full px-6 mt-4"
        style={{ maxWidth: "360px", zIndex: 10 }}
      >
        <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.18)" }}>
          <div className="flex justify-between items-baseline mb-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(167,139,250,0.7)" }}>
              Self-knowledge compounds
            </p>
            <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>14%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "14%" }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Chibi guide — fixed bottom-right with speech bubble */}
      <div className="fixed bottom-6 right-4 z-[150] flex flex-col items-end gap-2" style={{ pointerEvents: "none" }}>
        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          {showBubble && !bubbleDismissed && (
            <motion.div
              key="hero-bubble"
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-[172px]"
              style={{ pointerEvents: "auto" }}
            >
              <div
                style={{
                  background: "rgba(15, 10, 32, 0.97)",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                  borderRadius: 14,
                  padding: "10px 13px 10px 13px",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.08)",
                }}
              >
                <p className="text-xs leading-relaxed pr-3" style={{ color: "rgba(255,255,255,0.88)", fontFamily: "Inter, sans-serif" }}>
                  Tap below to start mapping your psyche. It takes about 3 minutes.
                </p>
                <button
                  onClick={() => setBubbleDismissed(true)}
                  aria-label="Dismiss"
                  className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)" }}
                >
                  ✕
                </button>
              </div>
              {/* Bubble tail */}
              <div className="absolute -bottom-[7px] right-7">
                <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "7px solid rgba(139, 92, 246, 0.4)" }} />
              </div>
              <div className="absolute -bottom-[5px] right-7">
                <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "7px solid rgba(15, 10, 32, 0.97)" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chibi — tap to reopen bubble */}
        <motion.button
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          onClick={() => { setBubbleDismissed(false); setShowBubble(true); }}
          aria-label="Tap for a hint"
          style={{
            pointerEvents: "auto",
            filter: "drop-shadow(0 4px 18px rgba(139,92,246,0.45))",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src="/sprites/chibi/5-so5.png?v=2"
            alt="Guide"
            width={68}
            height={68}
            style={{ imageRendering: "pixelated", display: "block" }}
          />
        </motion.button>
      </div>
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
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6 shadow-lg" style={{ boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}>
            <OuroborosLogo size={64} />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Ready to discover your type{name ? `, ${name}` : ""}?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            You&apos;ve completed the intro. Now take the assessment to map your Enneagram type and cognitive function stack.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/onboarding?fromEnter=true"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
            >
              <Compass className="w-5 h-5" />
              Find My Type
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
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6 shadow-lg" style={{ boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}>
            <OuroborosLogo size={64} />
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
            href="/onboarding?fromEnter=true"
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

// Type-specific insight quotes for the dashboard greeting card
const dashboardTypeQuotes: Record<number, { quote: string; label: string }> = {
  1: { quote: "Perfection is not attainable, but if we chase it we can catch excellence.", label: "Type 1 · The Reformer" },
  2: { quote: "You cannot pour from an empty cup. Taking care of yourself is part of taking care of others.", label: "Type 2 · The Helper" },
  3: { quote: "Authenticity is the daily practice of letting go of who we think we should be.", label: "Type 3 · The Achiever" },
  4: { quote: "What makes you different makes you beautiful. and infinitely valuable.", label: "Type 4 · The Individualist" },
  5: { quote: "Knowledge is not enough. The integrated mind turns insight into embodied action.", label: "Type 5 · The Investigator" },
  6: { quote: "Courage is not the absence of fear. It is taking the next step despite it.", label: "Type 6 · The Loyalist" },
  7: { quote: "The present moment always will have been. Slow down. depth is its own adventure.", label: "Type 7 · The Enthusiast" },
  8: { quote: "True strength includes the courage to be vulnerable with those you trust.", label: "Type 8 · The Challenger" },
  9: { quote: "Your voice matters. The world needs what only you, fully present, can offer.", label: "Type 9 · The Peacemaker" },
};

function DashboardScreen({
  profile,
  gameState,
  dailyProgress,
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

  // Greeting text
  const greeting = getGreeting();
  const greetingLabel = name
    ? `${greeting}, ${name}`
    : enneagramType
    ? `${greeting}, Type ${enneagramType}`
    : greeting;

  // Daily progress percentage
  const questionsAnswered: number = dailyProgress?.questionsAnswered ?? 0;
  const dailyGoal = 10; // default goal
  const dailyPct = Math.min(100, Math.round((questionsAnswered / dailyGoal) * 100));
  const hasDailyProgress = questionsAnswered > 0;

  // Type quote
  const typeQuote = enneagramType ? dashboardTypeQuotes[enneagramType as number] : null;

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
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto px-5 pt-10 pb-28"
      >
        {/* ── Greeting + Type Quote ────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.93)" }}>
            {greetingLabel}
          </h1>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Here&apos;s your day at a glance.</p>
          {typeQuote && (
            <div className="rounded-2xl p-4" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)" }}>
              <p className="text-sm italic leading-relaxed mb-1.5" style={{ color: "rgba(255,255,255,0.75)" }}>
                &ldquo;{typeQuote.quote}&rdquo;
              </p>
              <p className="text-xs font-medium" style={{ color: "rgba(167,139,250,0.7)" }}>{typeQuote.label}</p>
            </div>
          )}
        </motion.div>

        {/* ── Continue Where You Left Off ──────────────────────── */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link
            href="/daily"
            className="group flex flex-col w-full px-5 py-4 rounded-2xl transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
                Continue where you left off →
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" style={{ color: "rgba(167,139,250,0.7)" }} />
            </div>
            {hasDailyProgress && (
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                You&apos;re {dailyPct}% done with today&apos;s practice
              </p>
            )}
          </Link>
        </motion.div>

        {/* ── Streak Hero ──────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
              <Flame className="w-10 h-10 text-white" />
            </div>
            {streak > 0 && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full shadow-sm" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(249,115,22,0.4)" }}>
                <span className="text-sm font-bold text-orange-400">{streak}</span>
              </div>
            )}
          </div>
          <p className="mt-5 text-lg font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
            {streak === 0
              ? "Start your streak today"
              : streak === 1
              ? "1 day streak"
              : `${streak} day streak`}
          </p>
          {streak >= 7 && (
            <p className="text-xs text-orange-400 font-medium mt-0.5">You&apos;re on fire!</p>
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
              className="group flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <div className="w-16 h-16 flex-shrink-0">
                <PetCompanion type={enneagramType ?? 4} size={64} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.88)" }}>
                  {petState.name || "Your Companion"}
                </p>
                {!petState.isAlive ? (
                  <p className="text-xs font-medium text-red-400">Needs revival!</p>
                ) : (
                  <p className={`text-xs font-medium ${petStatusColor[petStatus!]}`}>
                    {petStatus}
                  </p>
                )}
                <div className="mt-2 w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className={`h-full rounded-full transition-all ${petHealthBarColor[petStatus!]}`}
                    style={{ width: `${Math.max(0, Math.min(100, petState.health ?? 0))}%` }}
                  />
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-all" style={{ color: "rgba(255,255,255,0.3)" }} />
            </Link>
          ) : (
            <Link
              href="/avatar"
              className="group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <Cat className="w-5 h-5 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }} />
              <span className="text-sm font-semibold transition-colors" style={{ color: "rgba(255,255,255,0.65)" }}>
                Meet your companion
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" style={{ color: "rgba(255,255,255,0.3)" }} />
            </Link>
          )}
        </motion.div>

        {/* ── Daily Insight ────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Today&apos;s Insight</p>
            <blockquote className="text-base font-serif leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.82)" }}>
              &ldquo;{insight.quote}&rdquo;
            </blockquote>
            <p className="text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
             , {insight.author}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              {insight.reflection}
            </p>
          </div>
        </motion.div>

        {/* ── Quick Stats Row ──────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <Zap className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>{xp}</span>
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>XP</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>{streak}</span>
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Streak</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <Heart className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>{hearts}</span>
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Hearts</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>{tokens}</span>
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Tokens</span>
            </div>
          </div>
        </motion.div>

        {/* ── Quick Actions ────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/sprint"
              className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)" }}>
                <Swords className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>Practice</span>
            </Link>
            <Link
              href="/read"
              className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.15)" }}>
                <BookOpen className="w-5 h-5 text-sky-400" />
              </div>
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>Read</span>
            </Link>
            <Link
              href="/compare"
              className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(236,72,153,0.15)" }}>
                <Brain className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>Compare</span>
            </Link>
          </div>
        </motion.div>

        {/* ── Your Type Card ──────────────────────────────────── */}
        {(enneagramType || cognitiveType) && (
          <motion.div variants={itemVariants}>
            <Link
              href="/profile"
              className="group flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <UserCircle className="w-6 h-6" style={{ color: "rgba(255,255,255,0.4)" }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Your Type</p>
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
                  {[
                    enneagramType ? `Type ${enneagramType}` : null,
                    cognitiveType,
                    profile.instinctualStacking,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-all" style={{ color: "rgba(255,255,255,0.3)" }} />
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

  // Redirect dashboard users to /daily (home is replaced by the daily page)
  useEffect(() => {
    if (state === "dashboard") router.replace("/daily");
  }, [state, router]);

  if (state === "loading" || state === "dashboard") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    );
  }

  if (state === "new") return <EnterScreen />;
  if (state === "onboarding") return <OnboardingResumeScreen profile={profile} />;
  return <AssessPromptScreen profile={profile} />;
}
