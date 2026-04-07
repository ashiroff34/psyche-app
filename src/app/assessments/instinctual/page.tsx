"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { instinctualQuestions } from "@/data/instinctualQuestions";
import { instinctualVariants, instinctualStackings } from "@/data/subtypes";
import { useProfile } from "@/hooks/useProfile";

type Instinct = "sp" | "sx" | "so";

const INSTINCT_LABELS: Record<Instinct, string> = {
  sp: "Self-Preservation",
  sx: "Sexual / One-to-One",
  so: "Social",
};

const INSTINCT_COLORS: Record<Instinct, { gradient: string; bg: string; border: string; text: string; bar: string }> = {
  sp: {
    gradient: "from-emerald-500 to-teal-600",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.3)",
    text: "#6ee7b7",
    bar: "bg-emerald-500",
  },
  sx: {
    gradient: "from-rose-500 to-pink-600",
    bg: "rgba(244,63,94,0.1)",
    border: "rgba(244,63,94,0.3)",
    text: "#fda4af",
    bar: "bg-rose-500",
  },
  so: {
    gradient: "from-violet-500 to-indigo-600",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.3)",
    text: "#c4b5fd",
    bar: "bg-violet-500",
  },
};

const STACKING_TITLES: Record<string, string> = {
  "sp/sx": "The Grounded Intimate",
  "sp/so": "The Practical Builder",
  "sx/sp": "The Intense Sovereign",
  "sx/so": "The Magnetic Connector",
  "so/sp": "The Responsible Architect",
  "so/sx": "The Passionate Tribe-Maker",
};

function computeStacking(selections: Record<number, Instinct>): {
  scores: Record<Instinct, number>;
  stacking: string;
  ranked: Instinct[];
} {
  const scores: Record<Instinct, number> = { sp: 0, sx: 0, so: 0 };
  Object.values(selections).forEach((instinct) => {
    scores[instinct]++;
  });
  const ranked = (Object.entries(scores) as [Instinct, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);
  const stacking = ranked.slice(0, 2).join("/");
  return { scores, stacking, ranked };
}

function ResultsView({
  selections,
  onSave,
}: {
  selections: Record<number, Instinct>;
  onSave: () => void;
}) {
  const router = useRouter();
  const { scores, stacking, ranked } = computeStacking(selections);
  const total = Object.values(scores).reduce((s, n) => s + n, 0);
  const dominantInstinct = instinctualVariants.find((v) => v.code === ranked[0]);
  const stackingData = instinctualStackings.find((s) => s.code === stacking);
  const title = STACKING_TITLES[stacking] || "Your Stacking";
  const dominantColors = INSTINCT_COLORS[ranked[0]];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: dominantColors.bg, border: `1px solid ${dominantColors.border}`, color: dominantColors.text }}
        >
          <Layers className="w-3.5 h-3.5" />
          Instinctual Stacking Results
        </div>
        <h2
          className="text-4xl font-serif font-bold mb-2"
          style={{ color: "rgba(255,255,255,0.95)" }}
        >
          {stacking.toUpperCase()}
        </h2>
        <p className="text-lg font-medium mb-1" style={{ color: dominantColors.text }}>
          {title}
        </p>
        {stackingData && (
          <p className="text-sm max-w-md mx-auto leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.55)" }}>
            {stackingData.description}
          </p>
        )}
      </motion.div>

      {/* Score bars */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl mb-6 space-y-4"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          Your Instinct Scores
        </h3>
        {(["sp", "sx", "so"] as Instinct[]).map((inst) => {
          const pct = total > 0 ? Math.round((scores[inst] / total) * 100) : 0;
          const colors = INSTINCT_COLORS[inst];
          return (
            <div key={inst}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: colors.text }}>
                  {inst.toUpperCase()} {INSTINCT_LABELS[inst]}
                </span>
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {scores[inst]}/{total}
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className={`h-full rounded-full ${colors.bar}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Dominant instinct description */}
      {dominantInstinct && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl mb-6"
          style={{
            background: dominantColors.bg,
            border: `1px solid ${dominantColors.border}`,
          }}
        >
          <h3 className="font-serif font-semibold mb-1" style={{ color: dominantColors.text }}>
            Your Dominant: {dominantInstinct.fullName}
          </h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
            {dominantInstinct.description}
          </p>
          <div className="space-y-1">
            {dominantInstinct.focus.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span style={{ color: dominantColors.text }}>·</span>
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stacking characteristics */}
      {stackingData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <h3 className="font-serif font-semibold mb-3" style={{ color: "rgba(255,255,255,0.88)" }}>
            {stackingData.name} Stacking
          </h3>
          <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
            Blind spot: <span style={{ color: "rgba(255,255,255,0.6)" }}>{stackingData.blind}</span>
          </p>
          <div className="space-y-1.5">
            {stackingData.characteristics.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="mt-0.5 text-violet-400">·</span>
                {c}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3"
      >
        <button
          onClick={onSave}
          className="w-full py-3 rounded-2xl font-semibold text-white shadow-lg transition-all"
          style={{ background: `linear-gradient(to right, ${dominantColors.gradient.replace("from-", "").replace(" to-", ", ")})` }}
        >
          Save to Profile
        </button>
        <button
          onClick={() => router.push("/assessments")}
          className="w-full py-3 rounded-2xl font-medium transition-all"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
        >
          Back to Assessments
        </button>
      </motion.div>
    </div>
  );
}

export default function InstinctualPage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, Instinct>>({});
  const [selectedThisQuestion, setSelectedThisQuestion] = useState<"A" | "B" | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [saved, setSaved] = useState(false);

  const total = instinctualQuestions.length;
  const question = instinctualQuestions[currentIndex];
  const progress = Math.round(((currentIndex) / total) * 100);

  function handleSelect(choice: "A" | "B") {
    setSelectedThisQuestion(choice);
  }

  function handleNext() {
    if (selectedThisQuestion === null) return;
    const instinct =
      selectedThisQuestion === "A"
        ? question.optionA.instinct
        : question.optionB.instinct;
    const newSelections = { ...selections, [question.id]: instinct };
    setSelections(newSelections);
    setSelectedThisQuestion(null);

    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelectedThisQuestion(null);
    }
  }

  function handleSave() {
    if (saved) return;
    const { stacking, ranked } = computeStacking(selections);
    updateProfile({
      instinctualStacking: stacking,
      enneagramSubtype: ranked[0],
    });
    addXP(75, "instinctual-complete");
    setSaved(true);
    setTimeout(() => router.push("/assessments"), 800);
  }

  // Intro screen
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#0f0a1e" }}>
        <div className="max-w-2xl mx-auto px-4 pt-6 w-full">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm transition mb-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full text-center"
          >
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6"
            >
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4" style={{ color: "rgba(255,255,255,0.95)" }}>
              Instinctual Stacking
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Your instinctual drives shape <em>how</em> your Enneagram type expresses itself. Discover which of the three survival instincts (Self-Preservation, Sexual/One-to-One, and Social) runs your life most powerfully.
            </p>
            <div
              className="p-4 rounded-xl text-sm text-left space-y-2 mb-8"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                <span className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>30 forced-choice questions.</span>{" "}
                Each presents two statements. Pick whichever is MORE like you, not which you wish were true.
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>
                There are no right or wrong answers. Go with your gut. Takes about 5 minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setStarted(true)}
                className="w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-600 shadow-lg hover:shadow-xl transition-all"
              >
                Begin Assessment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
        <ResultsView
          selections={selections}
          onSave={handleSave}
        />
        {saved && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-2xl"
            style={{ background: "rgba(16,185,129,0.9)" }}>
            <CheckCircle2 className="w-4 h-4" /> Saved to profile!
          </div>
        )}
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f0a1e" }}>
      {/* Top bar */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => (currentIndex === 0 ? setStarted(false) : handleBack())}
            className="flex items-center gap-1 text-sm transition"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            {currentIndex + 1} / {total}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden mb-8" style={{ background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              Which is more like you?
            </p>

            <div className="flex flex-col gap-4 flex-1">
              {(["A", "B"] as const).map((choice) => {
                const option = choice === "A" ? question.optionA : question.optionB;
                const isSelected = selectedThisQuestion === choice;
                const instColors = INSTINCT_COLORS[option.instinct];
                return (
                  <button
                    key={choice}
                    onClick={() => handleSelect(choice)}
                    className="flex-1 p-6 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: isSelected ? instColors.bg : "rgba(255,255,255,0.05)",
                      border: isSelected
                        ? `1px solid ${instColors.border}`
                        : "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <p
                      className="text-base leading-relaxed font-medium"
                      style={{
                        color: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {option.text}
                    </p>
                    {isSelected && (
                      <div className="mt-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" style={{ color: instColors.text }} />
                        <span className="text-xs font-medium" style={{ color: instColors.text }}>
                          Selected
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <div className="mt-6">
              <button
                onClick={handleNext}
                disabled={selectedThisQuestion === null}
                className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                style={
                  selectedThisQuestion !== null
                    ? { background: "linear-gradient(to right, #8b5cf6, #6366f1)", color: "white" }
                    : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", cursor: "not-allowed" }
                }
              >
                {currentIndex < total - 1 ? (
                  <>Next <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>See My Results <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
