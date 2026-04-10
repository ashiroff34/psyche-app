"use client";

// Micro-Celebration (BJ Fogg Tiny Habits)
//
// Fogg's core loop: Anchor → Tiny Behavior → Immediate Celebration.
// The celebration must be *immediate* and *felt*. Not after 4/4 quests
// (that's a milestone), but after every single tiny action. The dopamine
// reinforcement wires the habit loop faster than any token system.
//
// This component shows a quick chibi fistpump + sparkle for 0.8s
// after any small action (answer one question, log one state, finish
// one reflection). Renders as a floating overlay, auto-dismisses.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  trigger: boolean; // flip to true to fire
  label?: string; // e.g., "Nice!", "Got it!", "Logged"
  onDone?: () => void;
}

export default function MicroCelebration({ trigger, label = "Nice!", onDone }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [trigger, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -8 }}
          transition={{ duration: 0.25, ease: "backOut" }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.95), rgba(217,70,239,0.9))",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-sm font-bold text-white">{label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
