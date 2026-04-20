"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Coins, Flame, Heart, ChevronRight, X } from "lucide-react";

const STORAGE_KEY = "psyche-game-intro-seen";

const slides = [
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    iconBg: "from-indigo-500 to-violet-500",
    title: "XP & Levels",
    body: "You earn XP (experience points) by answering questions, completing readings, and finishing daily practice. As your XP grows, your level increases. Sometimes you'll get a 2× or 3× XP bonus, completely random, just like life.",
  },
  {
    icon: <Coins className="w-8 h-8 text-white" />,
    iconBg: "from-amber-400 to-orange-500",
    title: "Tokens",
    body: "Tokens are your in-app currency. Earn them through readings, daily quests, and the Full Day bonus. Spend them in the Shop on streak freezes (skip a missed day without losing your streak), extra hearts, and pet revival.",
  },
  {
    icon: <Flame className="w-8 h-8 text-white" />,
    iconBg: "from-orange-400 to-rose-500",
    title: "Streaks",
    body: "Your streak counts how many days in a row you've done at least one activity. Miss a day and it resets, unless you use a Streak Freeze. Streaks unlock badges and show your consistency over time. Even one question a day counts.",
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    iconBg: "from-rose-400 to-pink-500",
    title: "Hearts & Your Pet",
    body: "You have 5 hearts, lose one for each wrong quiz answer. Hearts refill on their own (1 every 30 min), or you can buy more with tokens. Your pet companion needs to be fed too, visit the Pet tab to keep them healthy and happy.",
  },
];

export default function GameIntro() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  const next = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      dismiss();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[70]"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-[80] max-w-lg mx-auto rounded-t-3xl shadow-2xl pb-10 overflow-hidden" style={{ background: "rgba(20,15,40,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Top gradient accent */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${slides[step].iconBg}`} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${slides[step].iconBg} flex items-center justify-center shadow-lg`}>
                  {slides[step].icon}
                </div>
                <button
                  onClick={dismiss}
                  aria-label="Dismiss intro"
                  className="-mr-2 -mt-1 p-2.5 transition-colors hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex gap-1.5 mb-4">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-indigo-500" : "w-2 bg-white/20"}`}
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
                >
                  <h2 className="text-xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>{slides[step].title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{slides[step].body}</p>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={next}
                className={`mt-8 w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r ${slides[step].iconBg} shadow-lg active:scale-[0.98] transition-all`}
              >
                {step < slides.length - 1 ? (
                  <>Next <ChevronRight className="w-4 h-4" /></>
                ) : (
                  "Got it, let's go!"
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
