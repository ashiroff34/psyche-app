"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, AlertTriangle, Brain, Heart, Shield, Lightbulb, CheckCircle, Clock } from "lucide-react";

const guideSteps = [
  {
    icon: Brain,
    title: "Answer as your past self, not your ideal self",
    content: "The RHETI (the most validated Enneagram test) specifically instructs: answer based on how you HAVE BEEN throughout your life, not how you'd like to be. If you've recently started working on yourself, answer as the person you were before that growth, that's your core pattern.",
    tip: "Ask yourself: \"What would I have done at age 20?\" or \"What do I do when I'm tired and not trying to be my best?\"",
    color: "bg-indigo-500/20 text-indigo-300",
  },
  {
    icon: Heart,
    title: "Think motivation, not behavior",
    content: "Most personality tests measure what you DO. The Enneagram measures WHY you do it. Two people can both be high achievers, one driven by fear of worthlessness (Type 3) and another by fear of being bad (Type 1). Same behavior, completely different inner engine.",
    tip: "For each question, ask: \"What would drive me to feel this way?\" rather than \"Do I do this?\"",
    color: "bg-rose-500/20 text-rose-300",
  },
  {
    icon: AlertTriangle,
    title: "Watch for blind spots, you can't see what you can't see",
    content: "Enneagram expert Beatrice Chestnut warns that your type specifically targets what you're blind to about yourself, and you're blind to the fact that you're blind to it. Research shows self-reports only correlate ~0.27 with actual observed behavior. The questions that make you uncomfortable might be the most important ones.",
    tip: "If a question makes you defensive or you think \"that's definitely not me\", pause. That reaction itself may be revealing.",
    color: "bg-amber-500/20 text-amber-300",
  },
  {
    icon: Shield,
    title: "Go with your gut, not your analysis",
    content: "Research on response bias shows that overthinking leads to social desirability bias, you unconsciously choose answers that make you look good. The RHETI recommends going with your first instinct. Your initial, uncensored reaction is usually more accurate than a carefully considered one.",
    tip: "Spend no more than 10-15 seconds per question. Your first reaction is usually your truest one.",
    color: "bg-emerald-500/20 text-emerald-300",
  },
  {
    icon: Lightbulb,
    title: "Your results may change as you learn the system",
    content: "This is important: most people mistype themselves on their first attempt. As you learn more about the Enneagram and cognitive functions, you'll understand the types more deeply and may realize your initial result was influenced by your self-image rather than your actual pattern. This is normal and expected.",
    tip: "Treat your result as a strong hypothesis, not a diagnosis. Read about your top 2-3 types and see which core fear and desire truly resonates over time.",
    color: "bg-violet-500/20 text-violet-300",
  },
  {
    icon: BookOpen,
    title: "Think about stress, not your best days",
    content: "Your personality type shows up most clearly when you're under pressure, exhausted, or caught off-guard, when your automatic patterns take over. Russ Hudson emphasizes that your type is your default operating system, not who you are on your best day.",
    tip: "When answering, think: \"What do I do when I'm stressed and not monitoring myself?\" That's your type talking.",
    color: "bg-sky-500/20 text-sky-300",
  },
];

export default function AssessmentGuide({
  onReady,
  assessmentName,
  timeEstimate,
}: {
  onReady: () => void;
  assessmentName: string;
  timeEstimate?: string;
}) {
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);

  if (skipped) return null;

  const current = guideSteps[step];
  const Icon = current.icon;
  const isLast = step === guideSteps.length - 1;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>
          Before You Begin
        </h2>
        <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          {assessmentName}, {guideSteps.length} tips for the most accurate results
        </p>
        {timeEstimate && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-500/30 text-sky-400 text-xs font-semibold" style={{ background: "rgba(14,165,233,0.1)" }}>
            <Clock className="w-3.5 h-3.5" />
            This assessment takes about {timeEstimate}
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {guideSteps.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i < step
                ? "w-2 h-2 bg-indigo-400"
                : i === step
                ? "w-4 h-2 bg-indigo-500"
                : "w-2 h-2"
            }`}
            style={i >= step && i !== step ? { background: "rgba(255,255,255,0.15)" } : {}}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-11 h-11 rounded-xl ${current.color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                {current.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                {current.content}
              </p>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Practical tip: </span>
                  {current.tip}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => step > 0 ? setStep(step - 1) : null}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium disabled:opacity-30 transition hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          onClick={() => { setSkipped(true); onReady(); }}
          className="text-xs transition hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Skip guide
        </button>

        <button
          onClick={() => {
            if (isLast) {
              setSkipped(true);
              onReady();
            } else {
              setStep(step + 1);
            }
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-lg transition-all"
        >
          {isLast ? (
            <>
              <CheckCircle className="w-4 h-4" /> Start Assessment
            </>
          ) : (
            <>
              Next <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
