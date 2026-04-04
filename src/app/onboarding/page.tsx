"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, X, User, Mail, HelpCircle } from "lucide-react";
import { notifyProfileChanged } from "@/hooks/useProfile";
import OuroborosLogo from "@/components/OuroborosLogo";

const TOTAL_STEPS = 2; // Welcome → Quick Setup

// ── Enneagram type quick-pick data ───────────────────────────────────────────

const TYPES = [
  { n: 1, name: "Perfectionist", tagline: "Principled · Idealistic" },
  { n: 2, name: "Helper",        tagline: "Caring · People-pleasing" },
  { n: 3, name: "Achiever",      tagline: "Driven · Success-oriented" },
  { n: 4, name: "Individualist", tagline: "Expressive · Introspective" },
  { n: 5, name: "Investigator",  tagline: "Perceptive · Private" },
  { n: 6, name: "Loyalist",      tagline: "Committed · Security-seeking" },
  { n: 7, name: "Enthusiast",    tagline: "Spontaneous · Future-focused" },
  { n: 8, name: "Challenger",    tagline: "Confident · Decisive" },
  { n: 9, name: "Peacemaker",    tagline: "Easy-going · Conflict-averse" },
];

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
        Know yourself{" "}
        <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          completely.
        </span>
      </h1>

      <p className="text-lg leading-relaxed max-w-md mb-10"
        style={{ color: "rgba(255,255,255,0.5)" }}>
        The Enneagram + Jungian cognitive functions, combined into one daily practice. Takes 2 minutes to set up.
      </p>

      <button
        onClick={onNext}
        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
        Free forever · No account required
      </p>
    </div>
  );
}

// ── Step 1: Quick Setup ───────────────────────────────────────────────────────

function isValidEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function StepQuickSetup({
  displayName, email, selectedType,
  onChangeName, onChangeEmail, onSelectType,
  onComplete, onNotSure,
}: {
  displayName: string;
  email: string;
  selectedType: number | null;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onSelectType: (n: number | null) => void;
  onComplete: () => void;
  onNotSure: () => void;
}) {
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (email && !isValidEmail(email)) setEmailError("Enter a valid email");
    else setEmailError("");
  };

  const canFinish = true; // Name, email, and type all optional — never block

  return (
    <div className="flex flex-col px-4 max-w-lg mx-auto w-full">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-2 text-center"
        style={{ color: "rgba(255,255,255,0.93)" }}>
        Quick setup
      </h2>
      <p className="text-sm text-center mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
        All fields optional — you can fill these in later.
      </p>

      {/* Name */}
      <div className="relative mb-3">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          <User className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={displayName}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="What should we call you? (optional)"
          maxLength={40}
          className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.88)" }}
        />
      </div>

      {/* Email */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              onChangeEmail(e.target.value);
              if (emailTouched && !isValidEmail(e.target.value)) setEmailError("Enter a valid email");
              else setEmailError("");
            }}
            onBlur={handleEmailBlur}
            placeholder="Email for updates (optional)"
            className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: emailError ? "1px solid rgba(248,113,113,0.6)" : "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.88)"
            }}
          />
        </div>
        {emailError && <p className="text-xs mt-1 pl-1" style={{ color: "#f87171" }}>{emailError}</p>}
      </div>

      {/* Type picker */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          Know your Enneagram type?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {TYPES.map((t) => {
            const active = selectedType === t.n;
            return (
              <button
                key={t.n}
                onClick={() => onSelectType(active ? null : t.n)}
                className="flex flex-col items-start p-3 rounded-2xl text-left transition-all active:scale-[0.97]"
                style={{
                  background: active ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.05)",
                  border: active ? "1.5px solid rgba(167,139,250,0.6)" : "1px solid rgba(255,255,255,0.09)",
                  boxShadow: active ? "0 0 0 1px rgba(167,139,250,0.3)" : "none",
                }}
              >
                <span className="text-lg font-black leading-none mb-0.5"
                  style={{ color: active ? "#a78bfa" : "rgba(255,255,255,0.6)" }}>
                  {t.n}
                </span>
                <span className="text-xs font-semibold leading-tight"
                  style={{ color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}>
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onComplete}
        disabled={!canFinish}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-3"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.45)" }}
      >
        {selectedType ? `Start as Type ${selectedType} →` : "Jump In →"}
      </button>

      {/* Not sure */}
      <button
        onClick={onNotSure}
        className="w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
      >
        <HelpCircle className="w-4 h-4" />
        Not sure of my type — help me find it (~5 min)
      </button>
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
              { icon: "🔞", text: "You must be 13 or older to use Thyself" },
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
  const [selectedType, setSelectedType] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-terms-accepted") === "true") setAcceptedTerms(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-onboarding-complete") === "true") router.replace("/");
    } catch {}
  }, [router]);

  if (!acceptedTerms) {
    return <TermsScreen onAccept={() => {
      setAcceptedTerms(true);
      try { localStorage.setItem("psyche-terms-accepted", "true"); } catch {}
    }} />;
  }

  const markComplete = (type?: number | null) => {
    try {
      localStorage.setItem("psyche-onboarding-complete", "true");
      localStorage.setItem("psyche-tutorial-complete", "true");
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const updates: Record<string, unknown> = {};
      if (displayName.trim()) updates.displayName = displayName.trim();
      if (email.trim()) updates.email = email.trim();
      if (type) updates.enneagramType = type;
      localStorage.setItem("psyche-profile", JSON.stringify({ ...p, ...updates }));
      notifyProfileChanged();
    } catch {}
  };

  const goNext = () => { setDirection(1); setStep((s) => s + 1); };
  const goPrev = () => { setDirection(-1); setStep((s) => s - 1); };

  const handleComplete = () => {
    markComplete(selectedType);
    router.push("/daily");
  };

  const handleNotSure = () => {
    markComplete(null);
    router.push("/assessments/essential-enneagram");
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepWelcome onNext={goNext} />;
      case 1: return (
        <StepQuickSetup
          displayName={displayName}
          email={email}
          selectedType={selectedType}
          onChangeName={setDisplayName}
          onChangeEmail={setEmail}
          onSelectType={setSelectedType}
          onComplete={handleComplete}
          onNotSure={handleNotSure}
        />
      );
      default: return <StepWelcome onNext={goNext} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0f0a1e" }}>
      {/* Aurora orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Top bar */}
      {step > 0 && (
        <div className="fixed top-16 left-0 right-0 z-40 px-4 sm:px-8 pt-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
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
              onClick={handleComplete}
              className="text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="min-h-screen flex items-center justify-center pt-24 pb-24 overflow-y-auto">
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
            className="w-full max-w-lg"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back button on step 1 */}
      {step > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-8 px-4 sm:px-8"
          style={{ background: "linear-gradient(to top, rgba(15,10,30,0.95) 60%, transparent)" }}>
          <div className="max-w-2xl mx-auto pt-4">
            <button
              onClick={goPrev}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
