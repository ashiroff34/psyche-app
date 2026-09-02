"use client";

// Post-assessment Pro upsell — peak-emotional-moment paywall.
//
// The moment a user finishes an assessment and reads their result is the
// highest-intent point in the whole app (peak-end rule). The primary results
// screens (enneagram, cognitive) already carry an upsell; the secondary
// assessments delivered a result and then dropped the user straight back to
// the assessment list with no next step.
//
// Copy follows the conversion playbook: loss frame first (what stays missing
// without Pro), trial-framed CTA second (reverses risk instead of signalling
// a charge). Routes to /pricing — never /store, which is token purchase only.
//
// Hidden for existing Pro subscribers.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const PRO_UNLOCK_KEY = "psyche-pro-unlocked";

interface PostAssessmentUpsellProps {
  /** Small uppercase label above the headline. */
  eyebrow: string;
  /** One-line identity-based hook. */
  headline: string;
  /** Loss-framed body: what stays out of reach without Pro. */
  body: string;
  /** Animation delay, to match the surrounding result sequence. */
  delay?: number;
}

export default function PostAssessmentUpsell({
  eyebrow,
  headline,
  body,
  delay = 0,
}: PostAssessmentUpsellProps) {
  const [proUnlocked, setProUnlocked] = useState(true);

  useEffect(() => {
    try {
      setProUnlocked(localStorage.getItem(PRO_UNLOCK_KEY) === "true");
    } catch {
      setProUnlocked(false);
    }
  }, []);

  if (proUnlocked) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        href="/pricing"
        className="block p-5 rounded-2xl relative overflow-hidden transition-all hover:scale-[1.01]"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(217,70,239,0.12))",
          border: "1px solid rgba(139,92,246,0.4)",
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.18), transparent 70%)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-violet-300" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-300">
              {eyebrow}
            </span>
          </div>
          <p className="text-base font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.95)" }}>
            {headline}
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            {body}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-violet-200">
              Try Pro Free for 7 Days
            </span>
            <ArrowRight className="w-4 h-4 text-violet-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
