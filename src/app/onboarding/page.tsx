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
import TutorialOverlay from "@/components/Tutorial";
import OuroborosLogo from "@/components/OuroborosLogo";

// Total visible steps = 7 (0 through 6).
const TOTAL_STEPS = 7;

// ── Step 0: Welcome ───────────────────────────────────────────────────────────

function StepWelcome() {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center mb-8 shadow-xl shadow-sky-200/50">
        <OuroborosLogo size={48} />
      </div>

      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
          Thyself
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-lg mb-8">
        A research-grounded personality system that combines the
        <span className="text-sky-600 font-medium"> Enneagram </span>
        with Carl Jung&apos;s
        <span className="text-indigo-600 font-medium"> cognitive function theory</span>
        {" "}&mdash; for real depth, not pop psychology.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["9 Enneagram Types", "8 Cognitive Functions", "27 Subtypes", "Shadow Model"].map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 text-sm text-slate-600 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-slate-400 italic">
        Next: the two systems at the heart of Thyself
      </p>
    </div>
  );
}

// ── Step 1: Why Thyself ──────────────────────────────────────────────────────

function StepWhyThyself() {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4">
        Why Thyself?
      </h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Most personality apps give you a label and stop there. Thyself goes deeper.
      </p>

      <div className="w-full max-w-md space-y-4 text-left">
        {[
          {
            title: "Understand WHY you do what you do",
            desc: "Not just behaviors — Thyself maps your core motivations, fears, and the unconscious patterns driving your life.",
          },
          {
            title: "Two proven systems, combined",
            desc: "The Enneagram reveals your emotional wiring. Jung's cognitive functions reveal how you think. Together, they give you the full picture.",
          },
          {
            title: "Grow every day",
            desc: "Daily quizzes, personalized growth challenges, and a pet companion that keeps you coming back. Real change happens with consistency.",
          },
          {
            title: "Go as deep as you want",
            desc: "From beginner basics to Naranjo's clinical frameworks and Beebe's shadow model — the depth is here when you're ready.",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Two Systems ───────────────────────────────────────────────────────

function StepTwoSystems() {
  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
          Two Systems, One You
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Two complementary lenses that illuminate different dimensions of who you are.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-sky-100 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-4">
            <Compass className="w-6 h-6 text-sky-600" />
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">The Enneagram</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Maps your core motivations, fears, and defense mechanisms through 9 interconnected personality structures.
          </p>
          <div className="space-y-2">
            {[
              { label: "9 Core Types", desc: "Fundamental personality patterns" },
              { label: "3 Instincts", desc: "Self-Preservation, Social, Sexual" },
              { label: "27 Subtypes", desc: "Type + instinct combinations" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <span className="text-xs text-slate-400 ml-1">&mdash; {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-indigo-100 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">Cognitive Functions</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Reveals how your mind processes information &mdash; perceiving and judging through 8 distinct mental functions.
          </p>
          <div className="space-y-2">
            {[
              { label: "8 Functions", desc: "Se, Si, Ne, Ni, Te, Ti, Fe, Fi" },
              { label: "16 Jungian Types", desc: "Unique function stacks" },
              { label: "Shadow Stack", desc: "Beebe's archetypal model" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <span className="text-xs text-slate-400 ml-1">&mdash; {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-6 italic">
        Next: your journey through the app
      </p>
    </div>
  );
}

// ── Step 2: Your Journey ──────────────────────────────────────────────────────

function StepJourney() {
  const steps = [
    { icon: Compass, label: "Take the Enneagram Assessment", desc: "Discover your core type, instinct, and subtype", color: "from-sky-400 to-sky-500" },
    { icon: Brain, label: "Take the Cognitive Assessment", desc: "Find your Jungian function stack", color: "from-indigo-400 to-indigo-500" },
    { icon: BookOpen, label: "Read your Type Deep-Dive", desc: "Subtypes, tritypes, Naranjo framework", color: "from-violet-400 to-violet-500" },
    { icon: Flame, label: "Build a Daily Practice", desc: "Personalized quizzes, prompts, and streaks", color: "from-orange-400 to-orange-500" },
    { icon: Heart, label: "Do the Inner Work", desc: "Shadow work, reframing, integration", color: "from-rose-400 to-rose-500" },
  ];

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
          Your Journey
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          A structured path from discovery to deep self-understanding.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-0">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex items-start gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                <step.icon className="w-5 h-5 text-white" />
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-10 bg-gradient-to-b from-slate-200 to-slate-100 my-1" />
              )}
            </div>
            <div className="pt-1.5 pb-4">
              <div className="text-sm font-semibold text-slate-800">{step.label}</div>
              <div className="text-xs text-slate-400">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center mt-4 italic">
        Next: what makes Thyself different from other apps
      </p>
    </div>
  );
}

// ── Step 3: What Makes This Different ────────────────────────────────────────

function StepDifferent() {
  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
          What Makes This Different
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Grounded in real personality science &mdash; not internet quizzes.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-red-50/50 border border-red-100">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">What we are not</div>
            <ul className="space-y-2">
              {[
                "16Personalities (not Jungian, uses Big Five)",
                "Self-report bias traps that tell you what you want to hear",
                "Pop-psychology entertainment quizzes",
                "Astrology-tier pseudoscience",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <X className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-3xl bg-emerald-50/50 border border-emerald-100">
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">What we are</div>
            <ul className="space-y-2">
              {[
                "Jung's Psychological Types (1921)",
                "Naranjo's clinical Enneagram tradition",
                "Beatrice Chestnut's subtype research",
                "Beebe's archetypal shadow model",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-100 text-center">
          <p className="text-sm text-slate-500 leading-relaxed">
            Every framework in Thyself is traceable to qualified clinical or academic research.
            We use forced-choice dichotomies and behavioral scenarios &mdash; not self-report bias traps.
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-6 italic">
        Next: tell us your name (optional) to personalise your experience
      </p>
    </div>
  );
}

// ── Step 4: Personalisation — Name + Email ───────────────────────────────────

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
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center mb-7 shadow-xl shadow-violet-200/50">
        <User className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
        Let&apos;s make this yours
      </h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Your email keeps your progress safe and lets us send your daily insights — no spam, ever.
      </p>

      <div className="w-full max-w-sm space-y-4">
        {/* Name */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={displayName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Name or nickname (optional)"
            maxLength={40}
            className="w-full pl-11 pr-5 py-4 text-base rounded-2xl border-2 border-slate-200 focus:border-sky-400 focus:outline-none bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-300 transition-all shadow-sm"
          />
        </div>

        {/* Email with validation */}
        <div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="Email address"
              className={`w-full pl-11 pr-5 py-4 text-base rounded-2xl border-2 ${
                emailError ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-sky-400"
              } focus:outline-none bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-300 transition-all shadow-sm`}
            />
          </div>
          {emailError && (
            <p className="text-xs text-rose-500 mt-1 text-left pl-1">{emailError}</p>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-1">
          We&apos;ll send a personalized daily insight based on your type. Unsubscribe any time.
        </p>
      </div>

      <p className="text-xs text-slate-400 mt-8 italic">
        Next: choose your starting path
      </p>
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
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
          Choose Your Path
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Where are you on your self-discovery journey?
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {paths.map((path, i) => (
          <button
            key={path.title}
            onClick={() => onComplete(path.href)}
            className="w-full flex items-center gap-4 p-5 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-100 hover:border-sky-200 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className={`w-12 h-12 rounded-2xl ${path.bgColor} flex items-center justify-center flex-shrink-0`}>
              <path.icon className="w-6 h-6 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 mb-0.5">{path.title}</div>
              <div className="text-sm text-slate-400">{path.description}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center mt-6 italic">
        First stop: find your Enneagram type
      </p>
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

  const [showTutorial, setShowTutorial] = useState(false);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-200/50">
                <OuroborosLogo size={22} />
              </div>
              <span className="text-xl font-serif font-semibold text-slate-800">Thyself</span>
            </div>

            <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Before we begin</h2>
            <p className="text-sm text-slate-500 mb-6">Please review and accept our terms to continue.</p>

            <div className="h-48 overflow-y-auto mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-3">
              <p><strong>Terms of Service</strong></p>
              <p>By using Thyself, you agree to the following:</p>
              <p><strong>1. Purpose.</strong> Thyself is an educational tool for personality self-discovery based on the Enneagram and Jungian cognitive function theory. It is not a substitute for professional psychological, medical, or therapeutic advice.</p>
              <p><strong>2. No Clinical Diagnosis.</strong> Assessment results are for self-exploration only. They do not constitute a clinical diagnosis or professional evaluation.</p>
              <p><strong>3. Your Data.</strong> Your profile data is stored locally on your device. If you provide an email, we may send periodic insights. You can unsubscribe at any time.</p>
              <p><strong>4. Accuracy.</strong> While our content is grounded in established frameworks (Riso-Hudson, Naranjo, Chestnut, Beebe), personality is complex and no system captures it completely. Use results as a starting point, not a final answer.</p>
              <p><strong>5. Age Requirement.</strong> You must be at least 13 years old to use Thyself.</p>
              <p><strong>6. Relationship Compatibility.</strong> Type comparison features are for self-understanding only. They do not predict relationship outcomes or prescribe behavior.</p>
              <p><strong>Privacy Policy:</strong> We collect minimal data. Your personality profile stays on your device. Email addresses (if provided) are used only for daily insight emails and are never shared with third parties.</p>
            </div>

            <button
              onClick={() => {
                setAcceptedTerms(true);
                try { localStorage.setItem("psyche-terms-accepted", "true"); } catch {}
              }}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg shadow-sky-200/50 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              I Accept — Let&apos;s Go
            </button>

            <p className="text-[10px] text-slate-400 text-center mt-3">
              By tapping above, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    );
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

      // Subscribe to daily emails if valid email provided
      if (emailVal?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
        fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailVal.trim(),
            name: displayNameVal?.trim() || undefined,
            enneagramType: p.enneagramType,
            cognitiveType: p.cognitiveType,
          }),
        }).catch(() => {}); // Fire and forget — don't block onboarding
      }
    } catch {}
  };

  const next = () => {
    // After personalization (step 5), show tutorial before Choose Path (step 6)
    if (step === 5) {
      setShowTutorial(true);
      return;
    }
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
      case 0:
        return <StepWelcome />;
      case 1:
        return <StepWhyThyself />;
      case 2:
        return <StepTwoSystems />;
      case 3:
        return <StepJourney />;
      case 4:
        return <StepDifferent />;
      case 5:
        return <StepPersonalization displayName={displayName} email={email} onChangeName={setDisplayName} onChangeEmail={setEmail} />;
      case 6:
        return <StepChoosePath onComplete={handlePathComplete} />;
      default:
        return <StepWelcome />;
    }
  };

  // On the last step the "Next" button becomes "Go to Assessment"
  const isLastStep = step === TOTAL_STEPS - 1;
  // On the choose-path step, the path cards handle navigation, so hide default next
  const showNextButton = !isLastStep;

  // Tutorial overlay shown between personalization and Choose Path
  if (showTutorial) {
    return (
      <TutorialOverlay
        onClose={() => {
          setShowTutorial(false);
          // Mark tutorial as complete
          try { localStorage.setItem("psyche-tutorial-complete", "true"); localStorage.removeItem("psyche-tutorial-active"); } catch {}
          // Advance to Choose Path
          setDirection(1);
          setStep(6);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-violet-200/15 rounded-full blur-3xl" />
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
                className={`transition-all duration-300 rounded-full ${
                  i === step
                    ? "w-8 h-3 bg-gradient-to-r from-sky-400 to-indigo-500"
                    : i < step
                    ? "w-3 h-3 bg-sky-300"
                    : "w-3 h-3 bg-slate-200"
                }`}
              />
            ))}
          </div>
          <button
            onClick={skip}
            className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-screen flex items-center justify-center pt-32 pb-32">
        <div className="w-full max-w-3xl" key={step}>
          {renderStep()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pb-8 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all ${
              step === 0
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:bg-white/70 hover:shadow-sm"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {showNextButton && (
            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sky-200/50 hover:shadow-xl hover:-translate-y-0.5"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isLastStep && (
            <button
              onClick={() => { markComplete(displayName, email); router.push("/enneagram/assess"); }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Start Enneagram Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
