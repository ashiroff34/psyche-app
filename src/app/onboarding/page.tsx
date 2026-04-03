"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Brain,
  Compass,
  BookOpen,
  Flame,
  Heart,
  Layers,
  Crown,
  CheckCircle,
  User,
  Mail,
} from "lucide-react";
import { notifyProfileChanged } from "@/hooks/useProfile";
import OuroborosLogo from "@/components/OuroborosLogo";

// Total visible steps = 6 (0 through 5). Step "Why Thyself" removed, covered by Welcome.
const TOTAL_STEPS = 6;

// ── Step 0: Welcome ───────────────────────────────────────────────────────────

function StepWelcome() {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-8 shadow-xl" style={{ boxShadow: "0 12px 40px rgba(124,58,237,0.5)" }}>
        <OuroborosLogo size={48} />
      </div>

      <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.95)" }}>
        Welcome to{" "}
        <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Thyself
        </span>
      </h1>

      <p className="text-lg sm:text-xl leading-relaxed max-w-lg mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
        A research-grounded personality system that combines the
        <span style={{ color: "#a78bfa" }} className="font-medium"> Enneagram </span>
        with Carl Jung&apos;s
        <span style={{ color: "#818cf8" }} className="font-medium"> cognitive function theory</span>
        {" "}for real depth, not pop psychology.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["9 Enneagram Types", "8 Cognitive Functions", "27 Subtypes", "Shadow Model"].map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-2xl text-sm font-medium"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  );
}

// ── Step 1: Two Systems ───────────────────────────────────────────────────────

function StepTwoSystems() {
  const [expandedEnneagram, setExpandedEnneagram] = useState(false);
  const [expandedCognitive, setExpandedCognitive] = useState(false);

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
          Two Systems, One You
        </h2>
        <p className="max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Two complementary lenses that illuminate different dimensions of who you are.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Enneagram card */}
        <div className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.2)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(167,139,250,0.12)" }}>
            <Compass className="w-6 h-6" style={{ color: "#a78bfa" }} />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>The Enneagram</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            Maps your core motivations, fears, and defense mechanisms through 9 interconnected personality structures.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { label: "9 Core Types", desc: "Fundamental personality patterns" },
              { label: "3 Instincts", desc: "Self-Preservation, Social, Sexual" },
              { label: "27 Subtypes", desc: "Type + instinct combinations" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#a78bfa" }} />
                <div>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                  <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setExpandedEnneagram((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: "#a78bfa" }}
          >
            <motion.span animate={{ rotate: expandedEnneagram ? 90 : 0 }} transition={{ duration: 0.18 }}>▶</motion.span>
            {expandedEnneagram ? "Show less" : "Learn more"}
          </button>
          <AnimatePresence initial={false}>
            {expandedEnneagram && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="text-xs leading-relaxed mt-3 pt-3" style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(167,139,250,0.15)" }}>
                  The Enneagram reveals your <strong style={{ color: "rgba(255,255,255,0.8)" }}>WHY</strong>, your core fear, desire, and the defense mechanisms you unconsciously rely on. Rooted in Naranjo&apos;s clinical tradition and Chestnut&apos;s subtype research, it goes far deeper than popular misconceptions. Your type isn&apos;t a box, it&apos;s a map to your patterns.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cognitive Functions card */}
        <div className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(129,140,248,0.2)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(129,140,248,0.12)" }}>
            <Brain className="w-6 h-6" style={{ color: "#818cf8" }} />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>Cognitive Functions</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            Reveals how your mind processes information, perceiving and judging through 8 distinct mental functions.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { label: "8 Functions", desc: "Se, Si, Ne, Ni, Te, Ti, Fe, Fi" },
              { label: "16 Jungian Types", desc: "Unique function stacks" },
              { label: "Shadow Stack", desc: "Beebe's archetypal model" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#818cf8" }} />
                <div>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                  <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setExpandedCognitive((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: "#818cf8" }}
          >
            <motion.span animate={{ rotate: expandedCognitive ? 90 : 0 }} transition={{ duration: 0.18 }}>▶</motion.span>
            {expandedCognitive ? "Show less" : "Learn more"}
          </button>
          <AnimatePresence initial={false}>
            {expandedCognitive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="text-xs leading-relaxed mt-3 pt-3" style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(129,140,248,0.15)" }}>
                  Jung&apos;s cognitive functions describe <strong style={{ color: "rgba(255,255,255,0.8)" }}>HOW you think</strong>, the mental processes you rely on most. Unlike MBTI pop-culture tests, Thyself uses the full 8-function Beebe model including your shadow stack. This reveals not just your strengths, but the unconscious functions that emerge in stress, projection, and moments of unexpected reaction.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Your Journey ──────────────────────────────────────────────────────

function StepJourney() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const steps = [
    {
      icon: Compass,
      label: "Discover Your Type",
      desc: "Take the Enneagram + Cognitive assessments",
      color: "from-sky-400 to-sky-500",
      more: "You'll take two in-depth assessments using behavioral scenarios and forced-choice questions, designed to minimize self-report bias. Results unlock personalized quizzes, growth prompts, and reading material tailored to your exact type combination.",
    },
    {
      icon: Flame,
      label: "Build a Daily Practice",
      desc: "Quizzes, growth challenges & streaks",
      color: "from-orange-400 to-orange-500",
      more: "Each day you get a warm-up quiz, then deeper modules on your type, integration paths, and Jungian concepts. Correct answers earn XP and tokens. Your streak tracks consistency, miss a day and it resets, but a Streak Freeze can save you.",
    },
    {
      icon: Heart,
      label: "Do the Inner Work",
      desc: "Shadow work, reframing, integration",
      color: "from-rose-400 to-rose-500",
      more: "Growth means moving toward your integration direction, the type you borrow from when healthy. Reflection prompts ask you to notice your patterns in real situations. Shadow challenges invite you to engage your weaker functions with curiosity instead of avoidance.",
    },
  ];

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
          Your Journey
        </h2>
        <p className="max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Three phases, from first insight to deep integration.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                <step.icon className="w-5 h-5 text-white" />
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-full min-h-[2rem] my-1" style={{ background: "rgba(255,255,255,0.08)" }} />
              )}
            </div>
            <div className="pb-5 flex-1">
              <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{step.label}</div>
              <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</div>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <motion.span animate={{ rotate: expanded === i ? 90 : 0 }} transition={{ duration: 0.18 }}>▶</motion.span>
                {expanded === i ? "Show less" : "Learn more"}
              </button>
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs leading-relaxed mt-2 pl-1" style={{ color: "rgba(255,255,255,0.5)", borderLeft: "2px solid rgba(255,255,255,0.12)" }}>
                      {step.more}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 3: What Makes This Different ────────────────────────────────────────

function StepDifferent() {
  const [expandedWhy, setExpandedWhy] = useState(false);

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
          What Makes This Different
        </h2>
        <p className="max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Grounded in real personality science, not internet quizzes.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#f87171" }}>What we are not</div>
            <ul className="space-y-2">
              {[
                "16Personalities (not Jungian, uses Big Five)",
                "Self-report bias traps that tell you what you want to hear",
                "Pop-psychology entertainment quizzes",
                "Astrology-tier pseudoscience",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f87171" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-3xl" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#34d399" }}>What we are</div>
            <ul className="space-y-2">
              {[
                "Jung's Psychological Types (1921)",
                "Naranjo's clinical Enneagram tradition",
                "Beatrice Chestnut's subtype research",
                "Beebe's archetypal shadow model",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#34d399" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Every framework in Thyself is traceable to qualified clinical or academic research.
            We use forced-choice dichotomies and behavioral scenarios, not self-report bias traps.
          </p>
          <button
            onClick={() => setExpandedWhy((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors mt-3"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <motion.span animate={{ rotate: expandedWhy ? 90 : 0 }} transition={{ duration: 0.18 }}>▶</motion.span>
            {expandedWhy ? "Show less" : "Why does this matter?"}
          </button>
          <AnimatePresence initial={false}>
            {expandedWhy && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="text-xs leading-relaxed mt-3 pt-3" style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  Most people type themselves as what they <em>aspire</em> to be, not what they actually are. That&apos;s self-report bias, and it&apos;s why most personality tests give you flattering but useless results. Thyself uses behavioral scenarios designed to reveal patterns you might not consciously acknowledge. The goal isn&apos;t to validate your self-image, it&apos;s to show you the parts of yourself that are harder to see.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Personalisation, Name + Email ───────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function StepPersonalization({
  displayName,
  email,
  onChangeName,
  onChangeEmail,
}: {
  displayName: string;
  email: string;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
}) {
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const handleEmailChange = (val: string) => {
    onChangeEmail(val);
    if (emailTouched && val && !isValidEmail(val)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (email && !isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-7 shadow-xl" style={{ boxShadow: "0 8px 32px rgba(124,58,237,0.45)" }}>
        <User className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
        Let&apos;s make this yours
      </h2>
      <p className="max-w-md mx-auto mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
        Add your email so we can notify you when new features drop and keep your progress safe.
      </p>

      <div className="w-full max-w-sm space-y-4">
        {/* Name */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.35)" }}>
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={displayName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Name or nickname (optional)"
            maxLength={40}
            className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.88)" }}
          />
        </div>

        {/* Email with validation */}
        <div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="Email address"
              className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: emailError ? "1px solid rgba(248,113,113,0.6)" : "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.88)"
              }}
            />
          </div>
          {emailError && (
            <p className="text-xs mt-1 text-left pl-1" style={{ color: "#f87171" }}>{emailError}</p>
          )}
        </div>

        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          We&apos;ll notify you of new features &amp; updates. No spam, unsubscribe anytime.
        </p>
      </div>

    </div>
  );
}

// ── Step 5: Choose Your Path ──────────────────────────────────────────────────

function StepChoosePath({ onComplete }: { onComplete: (href: string) => void }) {
  const paths = [
    {
      icon: Sparkles,
      title: "I'm completely new",
      description: "Start with the Enneagram assessment and discover your type step by step.",
      href: "/enneagram/assess",
      color: "from-sky-400 to-sky-500",
      bgColor: "bg-sky-50",
    },
    {
      icon: Layers,
      title: "I know some of my type",
      description: "Enter what you know and we'll help you fill in the rest.",
      href: "/profile",
      color: "from-indigo-400 to-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Crown,
      title: "I know my full type",
      description: "Set up your profile and jump straight into deep learning and daily practice.",
      href: "/profile",
      color: "from-violet-400 to-violet-500",
      bgColor: "bg-violet-50",
    },
  ];

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
          Choose Your Path
        </h2>
        <p className="max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Where are you on your self-discovery journey?
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {paths.map((path) => (
          <button
            key={path.title}
            onClick={() => onComplete(path.href)}
            className="w-full flex items-center gap-4 p-5 rounded-3xl transition-all text-left group hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(167,139,250,0.12)" }}>
              <path.icon className="w-6 h-6" style={{ color: "#a78bfa" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.88)" }}>{path.title}</div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{path.description}</div>
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0 transition-all group-hover:translate-x-1" style={{ color: "rgba(167,139,250,0.5)" }} />
          </button>
        ))}
      </div>

      <p className="text-xs text-center mt-6 italic" style={{ color: "rgba(255,255,255,0.3)" }}>
        First stop: find your Enneagram type
      </p>
    </div>
  );
}

// ── Terms Screen ─────────────────────────────────────────────────────────────

function TermsScreen({ onAccept }: { onAccept: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
      <div className="w-full max-w-md">
        <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}>
              <OuroborosLogo size={40} />
            </div>
            <span className="text-xl font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Thyself</span>
          </div>

          <h2 className="text-xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>A few things first</h2>

          {/* Key points — always visible */}
          <div className="space-y-3 mb-4">
            {[
              { icon: "🔬", text: "For self-exploration only, not a clinical diagnosis" },
              { icon: "🔒", text: "Your data stays on your device, never sold" },
              { icon: "🔞", text: "You must be 13 or older to use Thyself" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
                <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.72)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Expandable full terms */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs mb-4 transition-colors"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            <span>{expanded ? "Hide full terms" : "See full terms"}</span>
            <span style={{ display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
          </button>

          {expanded && (
            <div className="mb-4 p-4 rounded-2xl text-xs leading-relaxed space-y-2.5 max-h-52 overflow-y-auto" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>1. Purpose.</strong> Thyself is an educational tool for personality self-discovery. It is not a substitute for professional psychological, medical, or therapeutic advice.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>2. No Clinical Diagnosis.</strong> Assessment results are for self-exploration only and do not constitute a clinical diagnosis.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>3. Your Data.</strong> Your profile is stored locally on your device. If you provide an email, we may send occasional insights. Unsubscribe any time.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>4. Accuracy.</strong> Content is grounded in established frameworks (Riso-Hudson, Naranjo, Chestnut, Beebe) but personality is complex. Use results as a starting point.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>5. Age.</strong> You must be at least 13 years old.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>6. Compatibility.</strong> Type comparison features are for self-understanding only and do not predict relationship outcomes.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>Privacy.</strong> We collect minimal data. Email addresses are used only for insights and never shared with third parties.</p>
            </div>
          )}

          <button
            onClick={onAccept}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98] hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.45)" }}
          >
            I Accept, Let&apos;s Go
          </button>

          <p className="text-[10px] text-center mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            By tapping above, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Onboarding Page ──────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  // Check if terms already accepted (returning user)
  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-terms-accepted") === "true") {
        setAcceptedTerms(true);
      }
    } catch {}
  }, []);

  // If onboarding already completed, redirect to home
  useEffect(() => {
    try {
      const done = localStorage.getItem("psyche-onboarding-complete");
      if (done === "true") {
        router.replace("/");
      }
    } catch {}
  }, [router]);

  // Persist onboarding step progress so the resume screen can show it
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      localStorage.setItem("psyche-profile", JSON.stringify({ ...p, onboardingStep: step }));
    } catch {}
  }, [step]);

  // Terms & Conditions screen
  if (!acceptedTerms) {
    return <TermsScreen onAccept={() => {
      setAcceptedTerms(true);
      try { localStorage.setItem("psyche-terms-accepted", "true"); } catch {}
    }} />;
  }

  const markComplete = (displayNameVal?: string, emailVal?: string) => {
    try {
      localStorage.setItem("psyche-onboarding-complete", "true");
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const updates: Record<string, string> = {};
      if (displayNameVal?.trim()) updates.displayName = displayNameVal.trim();
      if (emailVal?.trim()) updates.email = emailVal.trim();
      localStorage.setItem("psyche-profile", JSON.stringify({ ...p, ...updates }));
      notifyProfileChanged();

      // Email is saved to localStorage profile above, no server subscription needed
      // (app uses static export / Capacitor; push notifications are handled natively)
    } catch {}
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const skip = () => {
    markComplete(displayName, email);
    router.push("/");
  };

  const handlePathComplete = (href: string) => {
    markComplete(displayName, email);
    // Flag for "know my type" paths so we can prompt them to start learning
    if (href === "/profile") {
      try { localStorage.setItem("psyche-new-user-knows-type", "true"); } catch {}
    }
    router.push(href);
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepWelcome />;
      case 1: return <StepTwoSystems />;
      case 2: return <StepJourney />;
      case 3: return <StepDifferent />;
      case 4: return <StepPersonalization displayName={displayName} email={email} onChangeName={setDisplayName} onChangeEmail={setEmail} />;
      case 5: return <StepChoosePath onComplete={handlePathComplete} />;
      default: return <StepWelcome />;
    }
  };

  // On the choose-path step (last), path cards handle navigation, hide Next button
  const isLastStep = step === TOTAL_STEPS - 1;
  const showNextButton = !isLastStep;


  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0f0a1e" }}>
      {/* Aurora background orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Top Bar: Progress Dots + Skip */}
      <div className="fixed top-16 left-0 right-0 z-40 px-4 sm:px-8 pt-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i <= step + 1) {
                    setDirection(i > step ? 1 : -1);
                    setStep(i);
                  }
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === step ? 32 : 12,
                  height: 12,
                  background: i === step
                    ? "linear-gradient(90deg, #7c3aed, #4f46e5)"
                    : i < step
                    ? "rgba(167,139,250,0.5)"
                    : "rgba(255,255,255,0.12)"
                }}
              />
            ))}
          </div>
          <button
            onClick={skip}
            className="text-sm font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Skip
          </button>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="w-full max-w-3xl"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pb-8 px-4 sm:px-8" style={{ background: "linear-gradient(to top, rgba(15,10,30,0.95) 60%, transparent)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between pt-4">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all"
            style={{
              color: step === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.5)",
              cursor: step === 0 ? "not-allowed" : "pointer"
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {showNextButton && (
            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all text-white hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.45)" }}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
