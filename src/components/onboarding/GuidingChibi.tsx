"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assetPath } from "@/lib/assetPath";

// SO5 is the guide — the Social 5 archetype (teacher, observer, synthesizer)
// Appropriate for onboarding: curious, knowledgeable, non-intrusive.
const SPRITE = "/sprites/chibi/5-so5.png";

const STEP_MESSAGES: Record<number, string> = {
  0: "Hi. I'll guide you through. Takes about 4 minutes.",
  1: "What should I call you? Feel free to skip.",
  2: "Nine types. You'll recognize yours when you see it.",
  3: "Go with your gut. Your first instinct is usually truest.",
};

interface GuidingChibiProps {
  step: number;
}

export default function GuidingChibi({ step }: GuidingChibiProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const visible = step >= 0 && step <= 3;

  // Trigger bubble with delay after each step change
  useEffect(() => {
    setShowBubble(false);
    setDismissed(false);
    if (!visible) return;
    const t = setTimeout(() => setShowBubble(true), 700);
    return () => clearTimeout(t);
  }, [step, visible]);

  // Auto-dismiss bubble after 7 seconds
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 7000);
    return () => clearTimeout(t);
  }, [showBubble]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="guiding-chibi"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-4 z-[150] flex flex-col items-end gap-2"
          style={{ pointerEvents: "none" }}
        >
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {showBubble && !dismissed && (
              <motion.div
                key={`bubble-${step}`}
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
                  <p
                    className="text-xs leading-relaxed pr-3"
                    style={{ color: "rgba(255,255,255,0.88)", fontFamily: "Inter, sans-serif" }}
                  >
                    {STEP_MESSAGES[step]}
                  </p>

                  {/* Dismiss ✕ */}
                  <button
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss"
                    className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold transition-opacity hover:opacity-100"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Bubble tail pointing down toward chibi */}
                <div className="absolute -bottom-[7px] right-7">
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "7px solid rgba(139, 92, 246, 0.4)",
                    }}
                  />
                </div>
                <div className="absolute -bottom-[5px] right-7">
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "7px solid rgba(15, 10, 32, 0.97)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chibi — tapping re-opens bubble */}
          <motion.button
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            onClick={() => {
              setDismissed(false);
              setShowBubble(true);
            }}
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
              src={assetPath(SPRITE)}
              alt="Guide"
              width={68}
              height={68}
              style={{ imageRendering: "pixelated", display: "block" }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
