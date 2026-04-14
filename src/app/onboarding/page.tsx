"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Mail, User, ChevronDown, RefreshCw, BookOpen, Sparkles } from "lucide-react";
import { notifyProfileChanged } from "@/hooks/useProfile";
import OuroborosLogo from "@/components/OuroborosLogo";
import QuickTypeAssessment from "@/components/assessments/QuickTypeAssessment";
import { enneagramTypes } from "@/data/enneagram";
import ChibiSprite from "@/components/ChibiSprite";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";
import { resolveTypeAwareCopy } from "@/hooks/useTypeAwareCopy";
import { posthog, EVENTS, setUserProperty } from "@/lib/posthog";
import TypeIdentityCard from "@/components/TypeIdentityCard";
import { Share2 } from "lucide-react";
import GuidingChibi from "@/components/onboarding/GuidingChibi";
import dynamic from "next/dynamic";
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

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
              { icon: "»", text: "For self-exploration only, not a clinical diagnosis" },
              { icon: "", text: "Your data stays on your device, never sold" },
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

// ── Type reveal sentences ─────────────────────────────────────────────────────

const TYPE_REVEAL_SENTENCES: Record<number, string> = {
  1: "You carry the vision of a better world, and the weight of making it real.",
  2: "You love with your whole heart, and you're learning to include yourself.",
  3: "You were born to become, and you're discovering who you are beneath the achievement.",
  4: "You transform suffering into meaning. That is your gift and your work.",
  5: "You see what others miss. Your mind is your compass.",
  6: "You build loyalty that lasts a lifetime. Trust begins with yourself.",
  7: "You chase joy because you know life is short. Now you're learning to stay.",
  8: "You protect what matters fiercely. Vulnerability is your final frontier.",
  9: "You make peace possible. Now make it for yourself, too.",
};

// ── Step 0: Welcome ───────────────────────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center px-5 max-w-sm mx-auto w-full">
      <div className="w-16 h-16 rounded-2xl overflow-hidden mb-7 shadow-xl flex-shrink-0"
        style={{ boxShadow: "0 12px 40px rgba(124,58,237,0.5)" }}>
        <OuroborosLogo size={64} />
      </div>

      <h1 className="text-4xl font-serif font-bold mb-5 leading-tight"
        style={{ color: "rgba(255,255,255,0.95)" }}>
        Know thyself{" "}
        <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          completely.
        </span>
      </h1>

      {/* What the Enneagram is */}
      <p className="text-base leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
        The Enneagram is an archetypal system mapping{" "}
        <span style={{ color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>9 personality types</span>
        {" "}, each defined by a core desire, a core fear, and a pattern of attention that shapes everything you do.
      </p>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.32)" }}>
        8 questions · ~3 minutes · Instant result
      </p>

      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}
      >
        Discover my type
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ── Step 1: Name (optional) ───────────────────────────────────────────────────

function StepName({
  onNext,
  onBack,
}: {
  onNext: (name: string) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");

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
        What should we call you?
      </h2>
      <p className="text-sm text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        Optional. skip anytime.
      </p>

      <div className="w-full relative mb-8">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
          <User className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onNext(name.trim()); }}
          placeholder="Your name…"
          maxLength={40}
          autoFocus
          className="w-full pl-11 pr-5 py-4 text-base rounded-2xl focus:outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.88)",
          }}
        />
      </div>

      <button
        onClick={() => onNext(name.trim())}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
        }}
      >
        {name.trim() ? `Let's go, ${name.trim().split(" ")[0]} →` : "Continue →"}
      </button>
    </div>
  );
}

// ── TypeRevealScreen ──────────────────────────────────────────────────────────

function TypeRevealScreen({
  result,
  displayName,
  onContinue,
  onExploreRunnerUp,
}: {
  result: { type: number; confidence: number; runnerUp: number; instinct?: string };
  displayName: string;
  onContinue: () => void;
  onExploreRunnerUp: () => void;
}) {
  const typeData = enneagramTypes.find((t) => t.number === result.type);
  const typeColor = typeData?.color ?? "#a78bfa";
  const typeName = typeData?.name ?? `Type ${result.type}`;
  const revealSentence = TYPE_REVEAL_SENTENCES[result.type] ?? "";
  // Always frame as "starting point", encourages further self-exploration over false confidence
  const confidenceLabel = "Starting point, keep exploring";
  const confidenceColor = "#f59e0b";

  // Mastery progress (endowed. always show a small positive number)
  const masteryPercent = Math.max(4, Math.min(12, Math.round(result.confidence * 0.08 + 2)));

  const [whyWrongOpen, setWhyWrongOpen] = useState(false);
  // Confetti burst on reveal
  const [confetti, setConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContinue = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onContinue();
  };

  const handleRunnerUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onExploreRunnerUp();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#0a0514" }}
    >
      {/* Confetti burst */}
      {confetti && (
        <Confetti
          recycle={false}
          numberOfPieces={240}
          gravity={0.18}
          colors={[typeColor, "#a78bfa", "#818cf8", "#ffffff", "#f0abfc"]}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 50, pointerEvents: "none" }}
        />
      )}

      {/* Ambient glow in the type's color */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${typeColor}28 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-sm w-full"
      >
        {/* Chibi. #1 hero element, first thing they see */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.08 }}
          className="relative mb-3"
        >
          {/* Color glow behind chibi */}
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: typeColor,
              opacity: 0.35,
              transform: "scale(0.85) translateY(10%)",
            }}
          />
          <ChibiSprite
            type={result.type}
            instinct={result.instinct?.split("/")[0]}
            size={200}
            state="happy"
            className="relative z-10 drop-shadow-2xl"
          />
        </motion.div>

        {/* Type number badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-3"
          style={{ background: `${typeColor}22`, border: `1px solid ${typeColor}44`, color: typeColor }}
        >
          Type {result.type}
        </motion.div>

        {/* Type name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-2xl font-serif font-bold mb-5"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          The {typeName}
        </motion.p>

        {/* Evocative sentence */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="text-base leading-relaxed mb-6 font-serif italic"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {resolveTypeAwareCopy("reveal.welcome", result.type) || revealSentence}
        </motion.p>

        {/* W/P/F/A bullets */}
        {TYPE_WPFA[result.type] && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="w-full text-left mb-6 rounded-2xl p-4 space-y-2.5"
            style={{ background: `${typeColor}0a`, border: `1px solid ${typeColor}20` }}
          >
            {(["wound", "passion", "fixation", "armor"] as const).map((key) => (
              <div key={key}>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: `${typeColor}cc` }}>
                  {key}
                </span>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {TYPE_WPFA[result.type][key]}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Hedge Hard: Visible low-confidence meter ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          className="w-full mb-4 px-4 py-3 rounded-2xl text-left"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
              Confidence
            </span>
            <span className="text-[10px] font-bold" style={{ color: confidenceColor }}>
              Low, starting point
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "22%" }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #f59e0b, #f97316)" }}
            />
          </div>
          <p className="text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
            This is one data point from a 12-question quiz. Real confidence comes from weeks of self-observation.
          </p>
        </motion.div>

        {/* ── Hedge Hard: Collapsible "Why this might be wrong" ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full mb-4 rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <button
            onClick={() => setWhyWrongOpen(!whyWrongOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
              Why this might be wrong
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform"
              style={{ color: "rgba(255,255,255,0.4)", transform: whyWrongOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
          <AnimatePresence>
            {whyWrongOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 text-[11px] leading-relaxed space-y-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <p>• Self-report tests measure who you <em>think</em> you are, not necessarily who you are.</p>
                  <p>• Stress, mood, and how you were feeling during the quiz can shift your answers.</p>
                  <p>• Look-alike types (2 vs 7, 6 vs 7, 4 vs 5) fool almost everyone on a short test.</p>
                  <p>• Read the description above carefully, does it <em>actually</em> feel like you, or just close?</p>
                  <p className="pt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                    The Enneagram is a lifelong self-observation practice. One quiz points a direction. Self-knowledge fills it in.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Hedge Hard: Keep exploring footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68 }}
          className="w-full mb-6 px-4 py-3 rounded-2xl text-left"
          style={{ background: `${typeColor}0c`, border: `1px solid ${typeColor}25` }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `${typeColor}bb` }}>
            Not sure yet? That's normal.
          </p>
          <div className="text-[11px] leading-relaxed space-y-1" style={{ color: "rgba(255,255,255,0.55)" }}>
            <p className="flex items-center gap-1.5"><RefreshCw className="w-3 h-3 shrink-0" /> Re-take the quiz in a week to check for consistency</p>
            <p className="flex items-center gap-1.5"><BookOpen className="w-3 h-3 shrink-0" /> Read the full type descriptions in the Explore tab</p>
          </div>
        </motion.div>

        {/* ── Clarify with own words, links to Mirror ── */}
        <motion.a
          href="/mirror"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
          className="w-full mb-4 px-4 py-3 rounded-2xl flex items-center gap-3 transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(217,70,239,0.08))",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c4b5fd" }}>
              Optional · experimental
            </p>
            <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
              Clarify your type with your own words
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Paste something you&apos;ve written, get an independent second opinion
            </p>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
        </motion.a>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-3"
          style={{
            background: `linear-gradient(135deg, ${typeColor}, #4f46e5)`,
            boxShadow: `0 8px 28px ${typeColor}55`,
          }}
        >
          This is me →
        </motion.button>

        {/* Runner-up button, prominent, not buried */}
        {result.runnerUp !== result.type && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            onClick={handleRunnerUp}
            className="w-full py-3 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98] mb-3"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            This doesn&apos;t feel like me → Try Type {result.runnerUp}
          </motion.button>
        )}

        {/* Peak-moment shareable. Embedded TypeIdentityCard right at reveal. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full mb-4"
        >
          <div className="text-center mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(217,70,239,0.9)" }}>
              Share your type
            </p>
            <p className="text-[11px] opacity-50 leading-snug">Tap to flip. Tap share to send a branded card.</p>
          </div>
          <TypeIdentityCard
            type={result.type}
            instinct={result.instinct?.split("/")[0]}
            displayName={displayName}
          />
        </motion.div>

        {/* Secondary: go to dedicated /identity page */}
        <motion.a
          href="/identity"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92 }}
          className="w-full py-3 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Get your shareable identity card
        </motion.a>

        {/* Personalized greeting if name provided */}
        {displayName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-[11px] mt-3"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Welcome, {displayName}.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

// ── Step 2: Type Preview ──────────────────────────────────────────────────────

const TYPE_PREVIEW_DATA = [
  { num: 1, name: "The Reformer", color: "#B85C38" },
  { num: 2, name: "The Helper", color: "#C4607A" },
  { num: 3, name: "The Achiever", color: "#C9921A" },
  { num: 4, name: "The Individualist", color: "#7B5AAD" },
  { num: 5, name: "The Investigator", color: "#3D6B9C" },
  { num: 6, name: "The Loyalist", color: "#7A8FA6" },
  { num: 7, name: "The Enthusiast", color: "#5B8FD0" },
  { num: 8, name: "The Challenger", color: "#9B2C2C" },
  { num: 9, name: "The Peacemaker", color: "#8B7355" },
];

function StepTypePreview({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 max-w-sm mx-auto w-full text-center">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-1 text-sm mb-8 transition-colors"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-3xl font-serif font-bold mb-3" style={{ color: "rgba(255,255,255,0.93)" }}>
        This will reveal{" "}
        <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          your Enneagram type
        </span>
      </h2>
      <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
        The Enneagram maps 9 personality types defined by what drives you at your core. not just what you do. By the end of 8 questions, you&apos;ll know which one is you.
      </p>

      <div className="grid grid-cols-3 gap-2 w-full mb-8">
        {TYPE_PREVIEW_DATA.map((t) => (
          <div
            key={t.num}
            className="flex flex-col items-center py-3 px-2 rounded-xl"
            style={{ background: `${t.color}15`, border: `1px solid ${t.color}28` }}
          >
            <span className="text-xl font-serif font-black mb-0.5" style={{ color: t.color }}>{t.num}</span>
            <span className="text-[9px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.38)" }}>{t.name}</span>
          </div>
        ))}
      </div>

      <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.22)" }}>
        8 questions · ~3 minutes · Ichazo, Naranjo, Riso-Hudson
      </p>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 28px rgba(124,58,237,0.5)" }}
      >
        Show me my type →
      </button>
    </div>
  );
}

// ── Step 5: Subtype unlock ────────────────────────────────────────────────────

// ── Step 11: What brought you here? ──────────────────────────────────────────

const MOTIVATION_OPTIONS = [
  { id: "curiosity", emoji: "🔍", label: "Curiosity", desc: "I just want to understand myself better" },
  { id: "relationships", emoji: "💞", label: "Relationships", desc: "Understanding others (or a specific person)" },
  { id: "growth", emoji: "🌱", label: "Growth", desc: "I want to change something about myself" },
  { id: "career", emoji: "🎯", label: "Career", desc: "Understand my working style and strengths" },
  { id: "struggle", emoji: "😔", label: "Struggle", desc: "I'm going through something and need a framework" },
] as const;

const MOTIVATION_MESSAGES: Record<string, string> = {
  relationships: "We'll help you understand the people around you, starting with yourself.",
  growth: "Growth starts with honest self-knowledge. You're in the right place.",
  curiosity: "Great minds ask great questions. Let's start exploring.",
  struggle: "Self-understanding is one of the most powerful tools you have right now.",
  career: "Knowing your type is a professional superpower. Let's unlock it.",
};

function StepMotivations({ onContinue }: { onContinue: (motivations: string[]) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    const motivations = Array.from(selected);
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      localStorage.setItem("psyche-profile", JSON.stringify({ ...p, motivations }));
    } catch {}
    onContinue(motivations);
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3" style={{ color: "rgba(255,255,255,0.95)" }}>
          What brought you here?
        </h2>
        <p className="text-sm leading-relaxed opacity-60">
          Select all that apply. This helps us personalize your path.
        </p>
      </div>
      <div className="space-y-3 mb-8">
        {MOTIVATION_OPTIONS.map(opt => {
          const isSelected = selected.has(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98] text-left"
              style={{
                background: isSelected ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isSelected ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: isSelected ? "#c4b5fd" : "rgba(255,255,255,0.85)" }}>
                  {opt.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {opt.desc}
                </p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.5)" }}>
                  <span className="text-white text-[10px] font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleContinue}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 28px rgba(124,58,237,0.4)" }}
      >
        {selected.size > 0 ? "Continue →" : "Skip for now →"}
      </button>
    </div>
  );
}

// ── Step 7: All Set ───────────────────────────────────────────────────────────

function StepAllSet({
  result,
  displayName,
  motivationMessage,
  onStart,
}: {
  result: { type: number; confidence: number; runnerUp: number };
  displayName: string;
  motivationMessage?: string;
  onStart: () => void;
}) {
  const typeData = enneagramTypes.find((t) => t.number === result.type);
  const typeColor = typeData?.color ?? "#a78bfa";

  // No auto-advance. user must tap to enter the app

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#0a0514" }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 65% 55% at 50% 50%, ${typeColor}22 0%, transparent 70%)` }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-sm w-full"
      >
        <div className="w-16 h-16 rounded-2xl overflow-hidden mb-7 flex-shrink-0"
          style={{ boxShadow: `0 0 40px ${typeColor}55` }}>
          <OuroborosLogo size={64} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif font-bold mb-3"
          style={{ color: "rgba(255,255,255,0.95)" }}
        >
          {displayName ? <>You&apos;re all set, {displayName.split(" ")[0]}.</> : <>You&apos;re all set.</>}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-base mb-1"
          style={{ color: typeColor }}
        >
          Type {result.type} · {typeData?.name ?? ""}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-sm mb-10 leading-relaxed text-center px-4"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          {motivationMessage ?? "Your journey begins today."}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-3"
          style={{ background: `linear-gradient(135deg, ${typeColor}, #4f46e5)`, boxShadow: `0 8px 28px ${typeColor}55` }}
        >
          Start Day 1 →
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          +50 tokens awarded for completing onboarding
        </motion.p>
      </motion.div>
    </div>
  );
}

// ── Step 5: Email Gate ────────────────────────────────────────────────────────

function StepEmailGate({
  result,
  prefillName,
  onSave,
  onSkip,
}: {
  result: { type: number; confidence: number; runnerUp: number; instinct?: string };
  prefillName?: string;
  onSave: (email: string, name: string) => void;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(prefillName ?? "");
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);

  const typeData = enneagramTypes.find((t) => t.number === result.type);
  // Always frame as a starting point, no "high confidence" claims
  const confidenceColor = "#f59e0b";
  const confidenceLabel = "Starting point";

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
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: `${confidenceColor}22`, color: confidenceColor, border: `1px solid ${confidenceColor}44` }}>
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
        Lock in your type
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
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] mb-2"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
        }}
      >
        Begin my journey →
      </button>
      <p className="text-xs mt-1 mb-2 text-center" style={{ color: "rgba(255,255,255,0.35)" }}>(+50 tokens on signup)</p>

      <button
        onClick={onSkip}
        className="text-center text-sm py-2 transition-colors"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Continue without saving
      </button>
    </div>
  );
}

// ── Manual Type Picker (skip flow) ────────────────────────────────────────────

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer", 2: "The Helper", 3: "The Achiever",
  4: "The Individualist", 5: "The Investigator", 6: "The Loyalist",
  7: "The Enthusiast", 8: "The Challenger", 9: "The Peacemaker",
};

// ── Step 9: Chibi Naming ───────────────────────────────────────────────────
// Psychological ownership (Pierce et al. 2003) + IKEA effect (Norton 2012).
// Self-assembled items valued 63% higher; naming creates intimate knowledge.

function StepChibiName({ type, onContinue }: { type: number; onContinue: () => void }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const DEFAULT_NAMES: Record<number, string[]> = {
    1: ["Athena", "Quill", "Sage"],
    2: ["Clover", "Hart", "Mira"],
    3: ["Blaze", "Nova", "Axel"],
    4: ["Luna", "Wren", "Indigo"],
    5: ["Corvus", "Owlet", "Ash"],
    6: ["Scout", "Sentry", "Juniper"],
    7: ["Zippy", "Pip", "Flint"],
    8: ["Ember", "Rook", "Ridge"],
    9: ["Mochi", "Moss", "River"],
  };
  const suggestions = DEFAULT_NAMES[type] ?? ["Companion"];

  function submit(finalName: string) {
    if (!finalName.trim()) return;
    try {
      const petRaw = localStorage.getItem("psyche-pet-state");
      const pet = petRaw ? JSON.parse(petRaw) : {};
      localStorage.setItem("psyche-pet-state", JSON.stringify({ ...pet, name: finalName.trim(), userNamed: true }));
      localStorage.setItem("psyche-chibi-name", finalName.trim());
    } catch {}
    try { posthog.capture("chibi_named", { name_length: finalName.trim().length, used_suggestion: suggestions.includes(finalName.trim()) }); } catch {}
    setSubmitted(true);
    setTimeout(onContinue, 700);
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <ChibiSprite type={type} size={170} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Meet your companion</h2>
        <p className="text-sm opacity-70 leading-relaxed px-4">
          This chibi is yours. They'll grow with you. Give them a name.
        </p>
      </div>
      <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <input
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") submit(name); }}
          maxLength={20}
          placeholder="A name for your chibi"
          className="w-full text-center text-lg font-semibold py-3 px-4 rounded-2xl mb-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
        />
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => setName(s)}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#c4b5fd" }}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => submit(name)}
          disabled={!name.trim() || submitted}
          className="w-full py-3 rounded-2xl font-semibold transition-all disabled:opacity-40"
          style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)", color: "white" }}
        >
          {submitted ? "Saved" : "This is their name"}
        </button>
      </div>
    </div>
  );
}

// ── Step 10: Implementation Intention ──────────────────────────────────────
// Gollwitzer (1999): "if X then Y" plans produce 2-3x goal completion vs
// general intentions. Capturing a specific anchor doubles daily return rate.

function StepImplementationIntention({ onContinue }: { onContinue: () => void }) {
  const [time, setTime] = useState("09:00");
  const [submitted, setSubmitted] = useState(false);

  // Derive a friendly label from the time
  function friendlyLabel(t: string): string {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
  }

  function submit() {
    const label = friendlyLabel(time);
    try {
      localStorage.setItem(
        "psyche-implementation-intention",
        JSON.stringify({ id: "time-picker", label: `at ${label}`, key: "time-picker", timeHint: time, capturedAt: new Date().toISOString() })
      );
    } catch {}
    try { posthog.capture("implementation_intention_set", { time }); } catch {}
    setSubmitted(true);
    setTimeout(onContinue, 700);
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3">When will you check in?</h2>
        <p className="text-sm opacity-70 leading-relaxed px-4">
          Pick a time. This becomes your daily reminder.
        </p>
      </div>
      <div className="rounded-3xl p-6 flex flex-col items-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          disabled={submitted}
          className="text-4xl font-bold text-center py-4 px-6 rounded-2xl mb-4 w-full"
          style={{
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "white",
            colorScheme: "dark",
          }}
        />
        <p className="text-sm opacity-70 mb-6">{friendlyLabel(time)} every day</p>
        <button
          onClick={submit}
          disabled={submitted}
          className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-[0.98] disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}
        >
          {submitted ? "Saved" : "Set reminder"}
        </button>
        <p className="text-[11px] opacity-40 text-center mt-4 leading-snug">
          You can change this anytime in settings.
        </p>
      </div>
    </div>
  );
}

function ManualTypePicker({ onSave }: { onSave: (name: string, type: number) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center px-6 max-w-sm mx-auto w-full pt-8 pb-24">
      <div className="w-12 h-12 rounded-2xl overflow-hidden mb-6 flex-shrink-0" style={{ boxShadow: "0 0 28px rgba(124,58,237,0.5)" }}>
        <OuroborosLogo size={48} />
      </div>
      <h2 className="text-2xl font-serif font-bold text-center mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>
        Welcome to Thyself
      </h2>
      <p className="text-sm text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        Tell us about yourself to personalize your experience.
      </p>

      {/* Name */}
      <div className="w-full mb-6">
        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "rgba(167,139,250,0.7)" }}>
          Your name (optional)
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.88)",
            }}
          />
        </div>
      </div>

      {/* Type picker */}
      <div className="w-full mb-8">
        <label className="block text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "rgba(167,139,250,0.7)" }}>
          Your Enneagram type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6,7,8,9].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="flex flex-col items-center py-3 px-2 rounded-xl transition-all active:scale-[0.97]"
              style={{
                background: type === t ? "rgba(124,58,237,0.22)" : "rgba(255,255,255,0.05)",
                border: type === t ? "1px solid rgba(167,139,250,0.5)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-lg font-serif font-bold mb-0.5" style={{ color: type === t ? "#c4b5fd" : "rgba(255,255,255,0.8)" }}>
                {t}
              </span>
              <span className="text-[9px] text-center leading-tight" style={{ color: type === t ? "rgba(196,181,253,0.7)" : "rgba(255,255,255,0.3)" }}>
                {TYPE_NAMES[t]}
              </span>
            </button>
          ))}
        </div>
        {!type && (
          <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
            Not sure yet?{" "}
            <a href="/onboarding?fromEnter=true" className="underline" style={{ color: "rgba(167,139,250,0.5)" }}>
              Take the assessment instead
            </a>
          </p>
        )}
      </div>

      <button
        onClick={() => type && onSave(name, type)}
        disabled={!type}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        style={{
          background: type ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.08)",
          boxShadow: type ? "0 8px 24px rgba(124,58,237,0.45)" : "none",
          color: type ? "white" : "rgba(255,255,255,0.3)",
          cursor: type ? "pointer" : "not-allowed",
        }}
      >
        Enter Thyself →
      </button>
      <p className="text-xs text-emerald-400/70 mt-2 text-center">(+) 50 bonus tokens on signup</p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

function OnboardingPageInner() {
  // ── First-User Flow ───────────────────────────────────────────────
  // New visitor lands on / (hero page)
  //   → taps "Discover your type"
  //   → Terms screen (if first time)
  //   → Step 0: Welcome
  //   → Step 1: Name (optional, 5s tap-to-skip)
  //   → Step 2: Type Preview (what is the Enneagram)
  //   → Step 3: Quiz (8 questions) + Subtype selection
  //   → Step 4: Type Reveal (confetti, "This is me →")
  //   → Step 5: Email gate (save result / skip)
  //   → Step 6: All Set ("+50 tokens · Start Day 1 →")
  //   → Lands on /daily
  //
  // Return visitor (incomplete):
  //   → Hero page shows "Continue where you left off" amber button
  //   → Tapping it resumes at saved step
  //
  // Return visitor (complete):
  //   → localStorage: psyche-onboarding-complete = "true"
  //   → Redirected to / which shows the app
  // ─────────────────────────────────────────────────────────────────
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromEnter = searchParams.get("fromEnter") === "true";
  const isManual = searchParams.get("manual") === "true";

  // Terms gate removed, not legally needed while localStorage-only
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  // 0=welcome, 1=name, 2=preview, 3=assessment, 4=type reveal, 5=subtype, 6=email gate, 7=all set, 8=manual picker, 9=chibi naming, 10=implementation intention, 11=motivations
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [motivationMessage, setMotivationMessage] = useState<string | undefined>(undefined);
  const [assessmentResult, setAssessmentResult] = useState<{
    type: number;
    confidence: number;
    runnerUp: number;
    instinct?: string;
  } | null>(null);

  // Persist current step so return visitors can resume
  useEffect(() => {
    if (step > 0) {
      try { localStorage.setItem("psyche-onboarding-step", String(step)); } catch {}
    }
  }, [step]);

  // Persist display name so it survives a page reload
  useEffect(() => {
    if (displayName) {
      try { localStorage.setItem("psyche-onboarding-name", displayName); } catch {}
    }
  }, [displayName]);

  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-onboarding-complete") === "true") {
        router.replace("/");
        return;
      }
      // Jump to type preview (→ assessment) if coming from enter experience
      if (fromEnter) setStep(2);
      // Jump to manual picker if user already knows their type
      else if (isManual) setStep(8);
      else {
        // Restore saved progress for return visitors
        const savedStep = parseInt(localStorage.getItem("psyche-onboarding-step") ?? "0", 10);
        const savedName = localStorage.getItem("psyche-onboarding-name") ?? "";
        if (savedName) setDisplayName(savedName);
        if (savedStep > 0 && savedStep < 7) setStep(savedStep);
      }
    } catch {}
  }, [router, fromEnter, isManual]);

  if (!acceptedTerms) {
    return (
      <TermsScreen
        onAccept={() => {
          setAcceptedTerms(true);
          try { localStorage.setItem("psyche-terms-accepted", "true"); } catch {}
          // Jump to correct step based on URL params
          if (fromEnter) setStep(2);
          else if (isManual) setStep(8);
          // else stay at step 0 (welcome)
        }}
      />
    );
  }

  const handleAssessmentComplete = (result: {
    type: number;
    confidence: number;
    runnerUp: number;
    instinct?: string;
  }) => {
    // Analytics: quiz_completed + type_revealed + tag user with their type
    try {
      posthog.capture(EVENTS.QUIZ_COMPLETED, {
        enneagramType: result.type,
        confidence: result.confidence,
        runnerUp: result.runnerUp,
        instinct: result.instinct ?? null,
        source: "onboarding_quick",
      });
      posthog.capture(EVENTS.TYPE_REVEALED, {
        enneagramType: result.type,
        instinct: result.instinct ?? null,
      });
      // Persist user properties so all future events are segmentable by type
      setUserProperty({
        enneagramType: result.type,
        instinct: result.instinct ?? null,
        firstTypeDate: new Date().toISOString().slice(0, 10),
      });
    } catch {}

    setAssessmentResult(result);
    // Save instinct immediately if selected in quiz
    if (result.instinct) {
      try {
        const raw = localStorage.getItem("psyche-profile");
        const p = raw ? JSON.parse(raw) : {};
        localStorage.setItem("psyche-profile", JSON.stringify({ ...p, instinctualStacking: result.instinct }));
      } catch {}
    }
    setStep(4); // go to type reveal
  };

  const handleRevealContinue = () => {
    setStep(6); // skip subtype step (now in quiz) → go to email gate
  };

  const handleRunnerUpExplore = () => {
    if (!assessmentResult) return;
    // Swap primary and runner-up, then show type reveal for runner-up
    setAssessmentResult((prev) => prev ? {
      type: prev.runnerUp,
      confidence: Math.max(30, prev.confidence - 20),
      runnerUp: prev.type,
    } : prev);
    // stay on step 3. the reveal will re-render with new type
  };

  const saveAndContinue = (email: string, name: string) => {
    if (!assessmentResult) return;
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const taken = ["quick"];
      if (assessmentResult.instinct) taken.push("instinctual");
      const updated = {
        ...p,
        enneagramType: assessmentResult.type,
        enneagramCore: assessmentResult.type,
        typeConfidence: Math.min(assessmentResult.confidence, 22),
        assessmentsTaken: taken,
        ...(assessmentResult.instinct ? {
          instinctualStacking: assessmentResult.instinct,
          enneagramSubtype: assessmentResult.instinct.split("/")[0],
        } : {}),
        email: email.trim(),
        ...(name.trim() ? { displayName: name.trim() } : {}),
      };
      localStorage.setItem("psyche-profile", JSON.stringify(updated));
      // Initialize pet state so /avatar and HubView work immediately
      try {
        const petRaw = localStorage.getItem("psyche-pet-state");
        if (!petRaw) {
          const today = new Date().toISOString().slice(0, 10);
          const PET_NAMES: Record<number, string> = {
            1: "Athena", 2: "Clover", 3: "Blaze", 4: "Luna",
            5: "Corvus", 6: "Scout", 7: "Zippy", 8: "Ember", 9: "Mochi",
          };
          localStorage.setItem("psyche-pet-state", JSON.stringify({
            name: PET_NAMES[assessmentResult.type] ?? "Companion",
            type: assessmentResult.type,
            health: 100, happiness: 100, hunger: 100,
            lastFed: today, lastPlayed: today, lastLogin: today,
            isAlive: true, revivalDaysCompleted: 0, revivalStartDate: null,
            equippedItems: {}, ownedItems: [], createdAt: today, totalDaysAlive: 0,
            companionXP: 0, companionLevel: 0, lastCompanionXPDate: "",
          }));
        }
      } catch {}
      localStorage.setItem("psyche-onboarding-complete", "true");
      localStorage.setItem("psyche-onboarding-complete-date", new Date().toISOString().slice(0, 10));
      localStorage.setItem("psyche-tutorial-complete", "true");
      localStorage.setItem("thyself_intent", "discover");
      localStorage.removeItem("psyche-onboarding-step");
      localStorage.removeItem("psyche-onboarding-name");
      notifyProfileChanged();
      // Award onboarding completion bonus
      try {
        const gsRaw = localStorage.getItem("psyche-game-state");
        const gs = gsRaw ? JSON.parse(gsRaw) : {};
        const current = (gs.tokens as number) ?? 0;
        localStorage.setItem("psyche-game-state", JSON.stringify({
          ...gs,
          tokens: current + 50,
          totalTokensEarned: ((gs.totalTokensEarned as number) ?? 0) + 50,
        }));
      } catch {}
    } catch {}

    // Analytics: onboarding_completed with email path
    try {
      posthog.capture(EVENTS.ONBOARDING_COMPLETED, {
        enneagramType: assessmentResult.type,
        instinct: assessmentResult.instinct ?? null,
        email_provided: true,
        path: "save_and_continue",
      });
    } catch {}

    // Register subscriber — stores in Resend Audience + sends welcome email
    if (email.trim()) {
      try {
        const chibiName = localStorage.getItem("psyche-chibi-name") ?? undefined;
        fetch("/api/register-subscriber", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            displayName: name.trim() || undefined,
            enneagramType: assessmentResult.type,
            chibiName,
          }),
        }).catch(() => {}); // fire and forget
      } catch {}
    }

    setStep(9); // → chibi naming → all set
  };

  const saveManual = (name: string, type: number) => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const updated = {
        ...p,
        enneagramType: type,
        assessmentsTaken: ["manual"],
        ...(name.trim() ? { displayName: name.trim() } : {}),
      };
      localStorage.setItem("psyche-profile", JSON.stringify(updated));
      localStorage.setItem("psyche-onboarding-complete", "true");
      localStorage.setItem("psyche-onboarding-complete-date", new Date().toISOString().slice(0, 10));
      localStorage.setItem("psyche-tutorial-complete", "true");
      localStorage.removeItem("psyche-onboarding-step");
      localStorage.removeItem("psyche-onboarding-name");
      notifyProfileChanged();
      try {
        const gsRaw = localStorage.getItem("psyche-game-state");
        const gs = gsRaw ? JSON.parse(gsRaw) : {};
        const current = (gs.tokens as number) ?? 0;
        localStorage.setItem("psyche-game-state", JSON.stringify({
          ...gs,
          tokens: current + 50,
          totalTokensEarned: ((gs.totalTokensEarned as number) ?? 0) + 50,
        }));
      } catch {}
    } catch {}
    // Analytics: onboarding_completed via manual path
    try {
      posthog.capture(EVENTS.ONBOARDING_COMPLETED, {
        enneagramType: type,
        path: "manual",
        email_provided: false,
      });
      setUserProperty({
        enneagramType: type,
        firstTypeDate: new Date().toISOString().slice(0, 10),
      });
    } catch {}
    router.push("/");
  };

  const skipSave = () => {
    if (!assessmentResult) return;
    try {
      const raw = localStorage.getItem("psyche-profile");
      const p = raw ? JSON.parse(raw) : {};
      const taken = ["quick"];
      if (assessmentResult.instinct) taken.push("instinctual");
      const updated = {
        ...p,
        enneagramType: assessmentResult.type,
        enneagramCore: assessmentResult.type,
        typeConfidence: Math.min(assessmentResult.confidence, 22),
        assessmentsTaken: taken,
        ...(assessmentResult.instinct ? {
          instinctualStacking: assessmentResult.instinct,
          enneagramSubtype: assessmentResult.instinct.split("/")[0],
        } : {}),
      };
      localStorage.setItem("psyche-profile", JSON.stringify(updated));
      // Initialize pet state
      try {
        const petRaw = localStorage.getItem("psyche-pet-state");
        if (!petRaw) {
          const today = new Date().toISOString().slice(0, 10);
          const PET_NAMES: Record<number, string> = {
            1: "Athena", 2: "Clover", 3: "Blaze", 4: "Luna",
            5: "Corvus", 6: "Scout", 7: "Zippy", 8: "Ember", 9: "Mochi",
          };
          localStorage.setItem("psyche-pet-state", JSON.stringify({
            name: PET_NAMES[assessmentResult.type] ?? "Companion",
            type: assessmentResult.type,
            health: 100, happiness: 100, hunger: 100,
            lastFed: today, lastPlayed: today, lastLogin: today,
            isAlive: true, revivalDaysCompleted: 0, revivalStartDate: null,
            equippedItems: {}, ownedItems: [], createdAt: today, totalDaysAlive: 0,
            companionXP: 0, companionLevel: 0, lastCompanionXPDate: "",
          }));
        }
      } catch {}
      localStorage.setItem("psyche-onboarding-complete", "true");
      localStorage.setItem("psyche-onboarding-complete-date", new Date().toISOString().slice(0, 10));
      localStorage.setItem("psyche-tutorial-complete", "true");
      localStorage.setItem("thyself_intent", "discover");
      localStorage.removeItem("psyche-onboarding-step");
      localStorage.removeItem("psyche-onboarding-name");
      notifyProfileChanged();
      // Award onboarding completion bonus
      try {
        const gsRaw = localStorage.getItem("psyche-game-state");
        const gs = gsRaw ? JSON.parse(gsRaw) : {};
        const current = (gs.tokens as number) ?? 0;
        localStorage.setItem("psyche-game-state", JSON.stringify({
          ...gs,
          tokens: current + 50,
          totalTokensEarned: ((gs.totalTokensEarned as number) ?? 0) + 50,
        }));
      } catch {}
    } catch {}
    // Analytics: onboarding_completed via skip-email path
    try {
      posthog.capture(EVENTS.ONBOARDING_COMPLETED, {
        enneagramType: assessmentResult.type,
        instinct: assessmentResult.instinct ?? null,
        email_provided: false,
        path: "skip_email",
      });
    } catch {}
    setStep(9); // → chibi naming → implementation intention → all set
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: step === 0
          ? "linear-gradient(160deg, #0d0520 0%, #0f0a1e 100%)"
          : step === 1
          ? "linear-gradient(160deg, #0a0d28 0%, #0f0a1e 100%)"
          : step === 2
          ? "linear-gradient(160deg, #130820 0%, #0c0a22 100%)"
          : step === 3
          ? "linear-gradient(160deg, #180a30 0%, #0f0824 100%)"
          : "#0f0a1e",
        transition: "background 0.6s ease",
      }}
    >
      {/* Aurora orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* SO5 guide chibi — visible steps 0–3, disappears at type reveal */}
      <GuidingChibi step={step} />

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

        {/* Step 1: Name (optional) */}
        {step === 1 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="min-h-screen flex items-center justify-center px-4 py-16"
          >
            <StepName
              onNext={(name) => {
                setDisplayName(name);
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          </motion.div>
        )}

        {/* Step 2: Type Preview */}
        {step === 2 && (
          <motion.div
            key="type-preview"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="min-h-screen flex items-center justify-center px-4 py-16"
          >
            <StepTypePreview
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          </motion.div>
        )}

        {/* Step 3: Assessment */}
        {step === 3 && (
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
                onClick={() => fromEnter ? router.push("/") : setStep(2)}
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
                  {displayName ? `Hey, ${displayName.split(" ")[0]} · ` : ""}Quick Type Finder · Ichazo · Naranjo · Riso &amp; Hudson
                </p>
              </div>
            </div>
            <QuickTypeAssessment onComplete={handleAssessmentComplete} />
          </motion.div>
        )}

        {/* Step 4: Type Reveal */}
        {step === 4 && assessmentResult && (
          <motion.div
            key={`reveal-${assessmentResult.type}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TypeRevealScreen
              result={assessmentResult}
              displayName={displayName}
              onContinue={handleRevealContinue}
              onExploreRunnerUp={handleRunnerUpExplore}
            />
          </motion.div>
        )}

        {/* Step 6: Email gate */}
        {step === 6 && assessmentResult && (
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
                prefillName={displayName}
                onSave={saveAndContinue}
                onSkip={skipSave}
              />
            </div>
          </motion.div>
        )}

        {/* Step 9: Chibi naming (psychological ownership / IKEA effect) */}
        {step === 9 && assessmentResult && (
          <motion.div
            key="chibi-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="min-h-screen flex items-center justify-center pt-8 pb-24 px-4"
          >
            <StepChibiName
              type={assessmentResult.type}
              onContinue={() => setStep(11)}
            />
          </motion.div>
        )}

        {/* Step 11: What brought you here? */}
        {step === 11 && assessmentResult && (
          <motion.div
            key="motivations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="min-h-screen flex items-center justify-center pt-8 pb-24 px-4"
          >
            <StepMotivations
              onContinue={(motivations) => {
                const firstMotivation = motivations[0];
                const msg = firstMotivation ? MOTIVATION_MESSAGES[firstMotivation] : undefined;
                setMotivationMessage(msg);
                setStep(7);
              }}
            />
          </motion.div>
        )}

        {/* Step 10: Implementation intention (if-then habit anchor) */}
        {step === 10 && assessmentResult && (
          <motion.div
            key="implementation-intention"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="min-h-screen flex items-center justify-center pt-8 pb-24 px-4"
          >
            <StepImplementationIntention
              onContinue={() => setStep(7)}
            />
          </motion.div>
        )}

        {/* Step 7: All Set */}
        {step === 7 && assessmentResult && (
          <motion.div
            key="all-set"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StepAllSet
              result={assessmentResult}
              displayName={displayName}
              motivationMessage={motivationMessage}
              onStart={() => router.push("/daily")}
            />
          </motion.div>
        )}

        {/* Step 8: Manual type picker (for users who already know their type) */}
        {step === 8 && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="min-h-screen flex items-center justify-center pt-8 pb-24"
          >
            <ManualTypePicker onSave={saveManual} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500" />
      </div>
    }>
      <OnboardingPageInner />
    </Suspense>
  );
}
