"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Mail, User } from "lucide-react";
import { notifyProfileChanged } from "@/hooks/useProfile";
import OuroborosLogo from "@/components/OuroborosLogo";
import QuickTypeAssessment from "@/components/assessments/QuickTypeAssessment";
import { enneagramTypes } from "@/data/enneagram";

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// ── Terms ─────────────────────────────────────────────────────────────────────

function TermsScreen({ onAccept }: { onAccept: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
      <div className="w-full max-w-md">
        <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl shadow-lg overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}>
              <OuroborosLogo size={40} />
            </div>
            <span className="text-xl font-serif font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>Thyself</span>
          </div>

          <h2 className="text-xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>A few things first</h2>

          <div className="space-y-3 mb-4">
            {[
              { icon: "🔬", text: "For self-exploration only, not a clinical diagnosis" },
              { icon: "🔒", text: "Your data stays on your device, never sold" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
                <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.72)" }}>{text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs mb-4 transition-colors"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            <span>{expanded ? "Hide full terms" : "See full terms"}</span>
            <span style={{ display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
          </button>

          {expanded && (
            <div className="mb-4 p-4 rounded-2xl text-xs leading-relaxed space-y-2.5 max-h-52 overflow-y-auto"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>1. Purpose.</strong> Thyself is an educational tool for personality self-discovery. It is not a substitute for professional psychological, medical, or therapeutic advice.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>2. No Clinical Diagnosis.</strong> Assessment results are for self-exploration only and do not constitute a clinical diagnosis.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>3. Your Data.</strong> Your profile is stored locally on your device. If you provide an email, we may send occasional insights. Unsubscribe any time.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>4. Accuracy.</strong> Content is grounded in established frameworks (Riso-Hudson, Naranjo, Chestnut, Beebe) but personality is complex. Use results as a starting point.</p>
              <p><strong style={{ color: "rgba(255,255,255,0.82)" }}>5. Compatibility.</strong> Type comparison features are for self-understanding only and do not predict relationship outcomes.</p>
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

// ── Step 0: Welcome ───────────────────────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-20 h-20 rounded-3xl overflow-hidden mb-8 shadow-xl flex-shrink-0"
        style={{ boxShadow: "0 12px 40px rgba(124,58,237,0.5)" }}>
        <OuroborosLogo size={80} />
      </div>

      <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4"
        style={{ color: "rgba(255,255,255,0.95)" }}>
        Know thyself{" "}
        <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          completely.
        </span>
      </h1>

      <p className="text-lg leading-relaxed max-w-md mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
        Answer 8 questions to discover your Enneagram type — based on the original theorists.
      </p>
      <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
        Takes about 3 minutes.
      </p>

      <button
        onClick={onNext}
        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}
      >
        Discover My Type
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ── Step 1: Intent Fork ───────────────────────────────────────────────────────

type Intent = "discover" | "learn" | "practice";

const intentOptions: {
  id: Intent;
  emoji: string;
  label: string;
  description: string;
}[] = [
  {
    id: "discover",
    emoji: "🔍",
    label: "Discover my type",
    description: "I want to find out which Enneagram type I am",
  },
  {
    id: "learn",
    emoji: "📚",
    label: "Learn the full system",
    description: "I want to understand all 9 types deeply",
  },
  {
    id: "practice",
    emoji: "🌱",
    label: "Daily growth practice",
    description: "I want to use this for ongoing self-development",
  },
];

function StepIntent({
  onNext,
  onBack,
}: {
  onNext: (intent: Intent) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Intent | null>(null);

  return (
    <div className="flex flex-col items-center px-4 max-w-md mx-auto w-full">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-1 text-sm mb-6 transition-colors"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2
        className="text-3xl font-serif font-bold mb-2 text-center"
        style={{ color: "rgba(255,255,255,0.93)" }}
      >
        What brings you here?
      </h2>
      <p className="text-sm text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        This shapes your first experience.
      </p>

      <div className="w-full space-y-3 mb-8">
        {intentOptions.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="w-full text-left px-5 py-4 rounded-2xl transition-all active:scale-[0.98]"
              style={{
                background: isSelected
                  ? "rgba(124,58,237,0.18)"
                  : "rgba(255,255,255,0.05)",
                border: isSelected
                  ? "1px solid rgba(167,139,250,0.45)"
                  : "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{opt.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-base font-semibold leading-snug"
                    style={{
                      color: isSelected ? "rgba(167,139,250,1)" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {opt.label}
                  </p>
                  <p
                    className="text-sm mt-0.5 leading-snug"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {opt.description}
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center"
                  style={{
                    borderColor: isSelected ? "#a78bfa" : "rgba(255,255,255,0.2)",
                    background: isSelected ? "#a78bfa" : "transparent",
                  }}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full" style={{ background: "#fff" }} />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => { if (selected) onNext(selected); }}
        disabled={!selected}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          boxShadow: selected ? "0 8px 24px rgba(124,58,237,0.45)" : "none",
        }}
      >
        Continue
      </button>
    </div>
  );
}

// ── Step 2: Email Gate ────────────────────────────────────────────────────────

function StepEmailGate({
  result,
  onSave,
  onSkip,
}: {
  result: { type: number; confidence: number; runnerUp: number };
  onSave: (email: string, name: string) => void;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);

  const typeData = enneagramTypes.find((t) => t.number === result.type);
  const confidenceColor =
    result.confidence >= 70 ? "#22c55e" : result.confidence >= 45 ? "#f59e0b" : "#ef4444";
  const confidenceLabel =
    result.confidence >= 70 ? "High confidence" : result.confidence >= 45 ? "Moderate" : "Low confidence";

  const handleSave = () => {
    if (!isValidEmail(email)) {
      setTouched(true);
      setEmailError("Enter a valid email to save your results");
      return;
    }
    onSave(email, name);
  };

  return (
    <div className="flex flex-col px-4 max-w-lg mx-auto w-full">
      {/* Result card */}
      <div
        className="rounded-3xl p-5 mb-6"
        style={{
          background: `${typeData?.color ?? "#7c3aed"}15`,
          border: `1px solid ${typeData?.color ?? "#7c3aed"}35`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black flex-shrink-0"
            style={{
              background: `${typeData?.color ?? "#7c3aed"}22`,
              color: typeData?.color ?? "#7c3aed",
            }}
          >
            {result.type}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: typeData?.color ?? "#7c3aed" }}>
              Your Type
            </p>
            <p className="text-xl font-serif font-bold leading-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
              The {typeData?.name ?? `Type ${result.type}`}
            </p>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-2xl font-black leading-none" style={{ color: confidenceColor }}>
              {result.confidence}%
            </span>
            <span className="text-[10px] font-semibold leading-snug" style={{ color: confidenceColor }}>
              {confidenceLabel}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          {typeData?.brief}
        </p>
        {result.runnerUp !== result.type && (
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            Also consider: Type {result.runnerUp}
          </p>
        )}
      </div>

      <h2
        className="text-2xl font-serif font-bold mb-1 text-center"
        style={{ color: "rgba(255,255,255,0.93)" }}
      >
        Save your results
      </h2>
      <p className="text-sm text-center mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
        Enter your email to keep your type and track your growth over time.
      </p>

      {/* Name (optional) */}
      <div className="relative mb-3">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
          <User className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should we call you? (optional)"
          maxLength={40}
          className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.88)",
          }}
        />
      </div>

      {/* Email (required) */}
      <div className="mb-5">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched) {
                setEmailError(isValidEmail(e.target.value) ? "" : "Enter a valid email");
              }
            }}
            onBlur={() => {
              setTouched(true);
              if (email && !isValidEmail(email)) setEmailError("Enter a valid email to save your results");
            }}
            placeholder="Your email (required to save)"
            className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: emailError ? "1px solid rgba(248,113,113,0.6)" : "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.88)",
            }}
          />
        </div>
        {emailError && (
          <p className="text-xs mt-1 pl-1" style={{ color: "#f87171" }}>{emailError}</p>
        )}
        <p className="text-xs mt-1.5 pl-1" style={{ color: "rgba(255,255,255,0.25)" }}>
          Stored on your device only · Never sold or shared
        </p>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-3"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
        }}
      >
        Save My Type &amp; Explore →
      </button>

      <button
        onClick={onSkip}
        className="text-center text-xs py-2 transition-colors"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        Continue without saving
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  // 0 = welcome, 1 = intent, 2 = assessment, 3 = email gate
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent>("discover");
  const [assessmentResult, setAssessmentResult] = useState<{
    type: number;
    confidence: number;
    runnerUp: number;
  } | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-terms-accepted") === "true") setAcceptedTerms(true);
      if (localStorage.getItem("psyche-onboarding-complete") === "true") router.replace("/");
    } catch {}
  }, [router]);

  if (!acceptedTerms) {
    return (
      <TermsScreen
        onAccept={() => {
          setAcceptedTerms(true);
          try { localStorage.setItem("psyche-terms-accepted", "true"); } catch {}
        }}
      />
    );
  }

  const handleAssessmentComplete = (result: {
    type: number;
    confidence: number;
    runnerUp: number;
  }) => {
    setAssessmentResult(result);
    setStep(3);
  };

  const getPostOnboardingRoute = (
    result: { type: number; confidence: number; runnerUp: number },
    chosenIntent: Intent
  ): string => {
    if (chosenIntent === "learn") return "/lessons";
    if (chosenIntent === "practice") return "/daily";
    // discover (default) → results page
    const params = new URLSearchParams({
      type: String(result.type),
      confidence: String(Math.min(result.confidence, 22)),
      assessmentLength: "quick",
      showTwo: result.runnerUp !== result.type ? "true" : "false",
      secondType: String(result.runnerUp),
      instinct: "SP",
      instinctScores: JSON.stringify([]),
    });
    return `/enneagram/results?${params.toString()}`;
  };

  const saveAndContinue = (email: string, name: string) => {
    if (!assessmentResult) return;
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const updated = {
        ...p,
        enneagramType: assessmentResult.type,
        typeConfidence: Math.min(assessmentResult.confidence, 22),
        assessmentsTaken: ["quick"],
        email: email.trim(),
        ...(name.trim() ? { displayName: name.trim() } : {}),
      };
      localStorage.setItem("psyche-profile", JSON.stringify(updated));
      localStorage.setItem("psyche-onboarding-complete", "true");
      localStorage.setItem("psyche-tutorial-complete", "true");
      localStorage.setItem("thyself_intent", intent);
      notifyProfileChanged();
    } catch {}

    router.push(getPostOnboardingRoute(assessmentResult, intent));
  };

  const skipSave = () => {
    if (!assessmentResult) return;
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const updated = {
        ...p,
        enneagramType: assessmentResult.type,
        typeConfidence: Math.min(assessmentResult.confidence, 22),
        assessmentsTaken: ["quick"],
      };
      localStorage.setItem("psyche-profile", JSON.stringify(updated));
      localStorage.setItem("psyche-onboarding-complete", "true");
      localStorage.setItem("psyche-tutorial-complete", "true");
      localStorage.setItem("thyself_intent", intent);
      notifyProfileChanged();
    } catch {}
    router.push(getPostOnboardingRoute(assessmentResult, intent));
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0f0a1e" }}>
      {/* Aurora orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <StepWelcome onNext={() => setStep(1)} />
          </motion.div>
        )}

        {/* Step 1: Intent fork */}
        {step === 1 && (
          <motion.div
            key="intent"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="min-h-screen flex items-center justify-center px-4 py-16"
          >
            <StepIntent
              onNext={(chosen) => {
                setIntent(chosen);
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          </motion.div>
        )}

        {/* Step 2: Assessment (no extra chrome — the component fills the screen) */}
        {step === 2 && (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="min-h-screen pt-16 pb-32"
          >
            <div className="max-w-lg mx-auto px-4 pt-4 pb-2">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm mb-3 transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0">
                  <OuroborosLogo size={28} />
                </div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Quick Type Finder · Ichazo · Naranjo · Riso &amp; Hudson
                </p>
              </div>
            </div>
            <QuickTypeAssessment onComplete={handleAssessmentComplete} />
          </motion.div>
        )}

        {/* Step 3: Email gate */}
        {step === 3 && assessmentResult && (
          <motion.div
            key="email-gate"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="min-h-screen flex items-center justify-center pt-16 pb-24 overflow-y-auto"
          >
            <div className="w-full max-w-lg py-6">
              <StepEmailGate
                result={assessmentResult}
                onSave={saveAndContinue}
                onSkip={skipSave}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
