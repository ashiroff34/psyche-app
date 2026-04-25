"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const COMPLETED_COUNT_KEY = "lessons-completed-count";

/**
 * Increments the persistent lesson-completed counter and returns the new value.
 * Call this exactly once per lesson completion.
 */
export function incrementLessonCount(): number {
  try {
    const raw = localStorage.getItem(COMPLETED_COUNT_KEY);
    const prev = raw !== null ? parseInt(raw, 10) : 0;
    const next = isNaN(prev) ? 1 : prev + 1;
    localStorage.setItem(COMPLETED_COUNT_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

/**
 * Returns true if the upgrade banner should be shown (count % 3 === 0)
 * and has not already been dismissed today.
 */
export function shouldShowUpgradeBanner(count: number): boolean {
  if (count % 3 !== 0) return false;
  try {
    const today = new Intl.DateTimeFormat("en-CA").format(new Date());
    const dismissedKey = `upgrade-dismissed-${today}`;
    return localStorage.getItem(dismissedKey) !== "1";
  } catch {
    return false;
  }
}

function dismissToday(): void {
  try {
    const today = new Intl.DateTimeFormat("en-CA").format(new Date());
    localStorage.setItem(`upgrade-dismissed-${today}`, "1");
  } catch {
    // ignore
  }
}

interface PostLessonUpgradeBannerProps {
  /** Pass the count returned from incrementLessonCount() */
  lessonCount: number;
}

export default function PostLessonUpgradeBanner({ lessonCount }: PostLessonUpgradeBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(shouldShowUpgradeBanner(lessonCount));
  }, [lessonCount]);

  function handleDismiss() {
    dismissToday();
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-xs mt-6 rounded-2xl px-5 py-4 relative"
          style={{
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full transition"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <X className="w-4 h-4" />
          </button>

          <p
            className="text-sm font-medium leading-snug pr-6 mb-3"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            Enjoying Thyself? Unlock your full type profile, subtypes, and growth path.
          </p>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-semibold rounded-xl px-4 py-2 transition"
            style={{
              background: "rgba(99,102,241,0.25)",
              color: "rgba(199,210,254,1)",
              border: "1px solid rgba(99,102,241,0.4)",
            }}
            onClick={handleDismiss}
          >
            See what&apos;s included &rarr;
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
