"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, ArrowRight, Eye, BookOpen, Zap } from "lucide-react";
import { getDailyObservation, getObservationSet } from "@/data/daily-observations";

const STORAGE_KEY_EMAIL = "psyche-notification-email";
const STORAGE_KEY_SHOWN = (dateKey: string) => `psyche-morning-observation-shown-${dateKey}`;

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

export function shouldShowMorningObservation(): boolean {
  try {
    return !localStorage.getItem(STORAGE_KEY_SHOWN(getDateKey()));
  } catch {
    return false;
  }
}

interface MorningObservationProps {
  typeNumber: number;
  onDismiss: () => void;
}

type ResponseMode = "witness" | "explore" | "practice";
type Phase = "reading" | "responded" | "email";

const RESPONSE_CONFIG: Record<ResponseMode, {
  label: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  description: string;
}> = {
  witness: {
    label: "Witness",
    icon: <Eye size={18} />,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.25)",
    description: "Observe without trying to change it.",
  },
  explore: {
    label: "Explore",
    icon: <BookOpen size={18} />,
    color: "#67e8f9",
    glow: "rgba(103,232,249,0.2)",
    description: "Sit with the journal prompt.",
  },
  practice: {
    label: "Practice",
    icon: <Zap size={18} />,
    color: "#86efac",
    glow: "rgba(134,239,172,0.2)",
    description: "Try the micro-exercise today.",
  },
};

export default function MorningObservation({ typeNumber, onDismiss }: MorningObservationProps) {
  const [phase, setPhase] = useState<Phase>("reading");
  const [selectedMode, setSelectedMode] = useState<ResponseMode | null>(null);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailError, setEmailError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const observation = getDailyObservation(typeNumber);
  const observationSet = getObservationSet(typeNumber);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY_SHOWN(getDateKey()), "1");
    } catch {}
    onDismiss();
  }

  // Load saved email
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EMAIL);
      if (saved) setEmail(saved);
    } catch {}
  }, []);

  // If no observation data for this type, dismiss without triggering during render
  useEffect(() => {
    if (!observation || !observationSet) dismiss();
  // onDismiss is stable from parent; observation/observationSet are derived from typeNumber
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeNumber]);

  if (!observation || !observationSet) return null;

  function handleResponse(mode: ResponseMode) {
    setSelectedMode(mode);
    try {
      localStorage.setItem(`psyche-morning-response-${getDateKey()}`, mode);
    } catch {}
    setPhase("responded");
  }

  function handleEmailSave() {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Enter an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("That doesn't look like an email.");
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY_EMAIL, trimmed);
    } catch {}
    setEmailError("");
    setEmailSaved(true);
  }

  function handleSkipEmail() {
    dismiss();
  }

  const config = selectedMode ? RESPONSE_CONFIG[selectedMode] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#05020f" }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: 520,
            height: 520,
            top: "-20%",
            left: "-15%",
            background: "radial-gradient(circle, rgba(88,28,135,0.28) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 30, -15, 0], scale: [1, 0.94, 1.06, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: 440,
            height: 440,
            bottom: "-15%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-sm mx-auto px-6 flex flex-col min-h-screen">
        <AnimatePresence mode="wait">

          {/* ── Phase 1: Reading ── */}
          {phase === "reading" && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col flex-1 justify-between py-10"
            >
              {/* Header */}
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase"
                    style={{ background: "rgba(167,139,250,0.12)", color: "rgba(167,139,250,0.8)", border: "1px solid rgba(167,139,250,0.2)" }}
                  >
                    Type {typeNumber} · {observationSet.typeName}
                  </div>
                </div>
                <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}
                </p>
              </div>

              {/* Observation text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex-1 flex items-center py-12"
              >
                <blockquote
                  className="text-[18px] leading-relaxed font-light"
                  style={{ color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}
                >
                  &ldquo;{observation.text}&rdquo;
                </blockquote>
              </motion.div>

              {/* Response buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col gap-3"
              >
                <p className="text-[12px] text-center mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  How do you want to meet this today?
                </p>
                {(["witness", "explore", "practice"] as ResponseMode[]).map((mode) => {
                  const cfg = RESPONSE_CONFIG[mode];
                  return (
                    <button
                      key={mode}
                      onClick={() => handleResponse(mode)}
                      className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid rgba(255,255,255,0.1)`,
                      }}
                    >
                      <span style={{ color: cfg.color }}>{cfg.icon}</span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>{cfg.label}</span>
                        <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>{cfg.description}</span>
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {/* ── Phase 2: Response detail ── */}
          {phase === "responded" && config && selectedMode && (
            <motion.div
              key="responded"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col flex-1 justify-between py-10"
            >
              {/* Mode label */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full self-start"
                style={{ background: config.glow, border: `1px solid ${config.color}30` }}
              >
                <span style={{ color: config.color }}>{config.icon}</span>
                <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: config.color }}>
                  {config.label}
                </span>
              </div>

              {/* Prompt or instruction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="flex-1 flex flex-col justify-center gap-6 py-10"
              >
                {selectedMode === "witness" && (
                  <p className="text-[17px] leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.88)" }}>
                    Carry this with you today. No action required — just notice.
                  </p>
                )}
                {selectedMode === "explore" && (
                  <>
                    <p className="text-[13px] uppercase tracking-widest font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Journal prompt</p>
                    <p className="text-[17px] leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.88)" }}>
                      {observation.explorePrompt}
                    </p>
                  </>
                )}
                {selectedMode === "practice" && (
                  <>
                    <p className="text-[13px] uppercase tracking-widest font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Today&apos;s practice</p>
                    <p className="text-[17px] leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.88)" }}>
                      {observation.practiceInstruction}
                    </p>
                  </>
                )}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={() => setPhase("email")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-[15px] transition-all active:scale-[0.98]"
                  style={{ background: config.color, color: "#0f0a1e" }}
                >
                  Begin your day
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── Phase 3: Email capture ── */}
          {phase === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col flex-1 justify-between py-10"
            >
              <div className="flex flex-col gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: "rgba(167,139,250,0.15)" }}
                >
                  <Mail size={20} style={{ color: "rgba(167,139,250,0.9)" }} />
                </div>
                <h2 className="text-[24px] font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Evening check-in
                </h2>
                <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  At the end of the day, we&apos;ll send you a short follow-up — asking what, if anything, surfaced.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] uppercase tracking-widest font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your email
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); setEmailSaved(false); }}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 rounded-xl text-[15px] outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: emailError ? "1px solid rgba(251,113,133,0.6)" : "1px solid rgba(255,255,255,0.13)",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    />
                    {emailSaved && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle size={18} style={{ color: "#86efac" }} />
                      </motion.span>
                    )}
                  </div>
                  {emailError && (
                    <p className="text-[12px]" style={{ color: "rgba(251,113,133,0.9)" }}>{emailError}</p>
                  )}
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Used only for Thyself evening follow-ups. Never shared.
                  </p>
                </div>

                <button
                  onClick={emailSaved ? dismiss : handleEmailSave}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-[15px] transition-all active:scale-[0.98]"
                  style={{ background: emailSaved ? "rgba(134,239,172,0.15)" : "rgba(167,139,250,0.9)", color: emailSaved ? "#86efac" : "#0f0a1e" }}
                >
                  {emailSaved ? (
                    <>
                      <CheckCircle size={16} />
                      Saved — enter the day
                    </>
                  ) : (
                    <>
                      Save &amp; enter the day
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <button
                  onClick={handleSkipEmail}
                  className="w-full py-3 text-[14px] transition-all"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Skip for now
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
