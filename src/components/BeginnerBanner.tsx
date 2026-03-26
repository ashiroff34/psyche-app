"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";

const TUTORIAL_KEY = "psyche-tutorial-complete";

interface BeginnerBannerProps {
  /** Main guidance text shown to the user */
  message: string;
  /** Label on the primary CTA button */
  primaryLabel: string;
  /** Where the primary button navigates */
  primaryHref?: string;
  /** Callback instead of href for primary button */
  primaryOnClick?: () => void;
  /** Optional second button label */
  secondaryLabel?: string;
  /** Where the secondary button navigates */
  secondaryHref?: string;
  /** Unique key to track per-session dismissal */
  dismissKey: string;
}

export default function BeginnerBanner({
  message,
  primaryLabel,
  primaryHref,
  primaryOnClick,
  secondaryLabel,
  secondaryHref,
  dismissKey,
}: BeginnerBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tutorialDone = localStorage.getItem(TUTORIAL_KEY) === "true";
    const dismissed = sessionStorage.getItem(`beginner-dismissed-${dismissKey}`) === "true";
    setVisible(!tutorialDone && !dismissed);
  }, [dismissKey]);

  const dismiss = () => {
    sessionStorage.setItem(`beginner-dismissed-${dismissKey}`, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mx-4 mb-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-indigo-800 leading-snug mb-3">{message}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {primaryHref ? (
                  <Link
                    href={primaryHref}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors"
                  >
                    {primaryLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : primaryOnClick ? (
                  <button
                    onClick={primaryOnClick}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors"
                  >
                    {primaryLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : null}
                {secondaryLabel && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
            <button
              onClick={dismiss}
              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-indigo-300 hover:text-indigo-500 hover:bg-indigo-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
