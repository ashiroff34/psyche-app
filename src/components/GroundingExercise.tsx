"use client";

// Grounding Exercise (Dark Night Guardrail)
//
// Willoughby Britton (2017, PLOS ONE) documented adverse effects from
// contemplative practice. This component provides a one-tap exit from
// any deep philosophy lesson to a somatic grounding exercise.
//
// Available on every philosophy unit lesson. Not gamified. Not tracked.
// Just a safety valve.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

export default function GroundingExercise({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);

  const STEPS = [
    { instruction: "Feel your feet on the ground. Press them down gently.", duration: "10 seconds" },
    { instruction: "Name 5 things you can see right now.", duration: "Take your time" },
    { instruction: "Name 4 things you can hear.", duration: "Listen" },
    { instruction: "Name 3 things you can touch. Touch them.", duration: "Reach out" },
    { instruction: "Take one slow breath. In through the nose. Out through the mouth.", duration: "One breath" },
    { instruction: "You are here. You are safe. The practice will be here when you are ready.", duration: "" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center px-6"
      style={{ background: "rgba(10,5,20,0.95)" }}
    >
      <div className="max-w-sm w-full text-center">
        {onClose && (
          <button aria-label="Close" onClick={onClose} className="absolute top-6 right-6 opacity-50 hover:opacity-90">
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
          <Shield className="w-7 h-7 text-emerald-400" />
        </div>
        <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold mb-6">Ground yourself</p>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <p className="text-lg font-serif leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.92)" }}>
              {STEPS[step].instruction}
            </p>
            {STEPS[step].duration && (
              <p className="text-xs opacity-50 mb-8">{STEPS[step].duration}</p>
            )}
          </motion.div>
        </AnimatePresence>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full py-3 rounded-2xl font-semibold text-sm"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl font-semibold text-sm"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7" }}
          >
            I'm okay
          </button>
        )}

        <div className="mt-6 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] opacity-50 leading-relaxed">
            If self-inquiry is bringing up difficult feelings, that is normal and worth paying attention to. Slow down. Take care of yourself.
          </p>
          <p className="text-[10px] opacity-50 leading-relaxed mt-2">
            If you are in crisis: 988 Suicide and Crisis Lifeline (US) | 116 123 (UK) | cheetahhouse.org (meditation difficulties)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
