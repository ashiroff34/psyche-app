"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, RotateCcw } from "lucide-react";

const RETEST_DISMISSED_KEY = "retest-prompt-dismissed";

function daysSince(dateString: string): number {
  const then = new Date(dateString).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

interface RetestPromptProps {
  assessmentDate?: string;
}

export default function RetestPrompt({ assessmentDate }: RetestPromptProps) {
  const [dismissed, setDismissed] = useState(true); // default true to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const wasDismissed = localStorage.getItem(RETEST_DISMISSED_KEY) === "true";
    setDismissed(wasDismissed);
  }, []);

  if (!mounted) return null;
  if (!assessmentDate) return null;
  if (dismissed) return null;

  const days = daysSince(assessmentDate);
  if (days < 30) return null;

  function handleDismiss() {
    localStorage.setItem(RETEST_DISMISSED_KEY, "true");
    setDismissed(true);
  }

  return (
    <div
      className="relative p-5 rounded-2xl mb-6"
      style={{
        background: "linear-gradient(135deg, rgba(217,119,6,0.12) 0%, rgba(180,83,9,0.08) 100%)",
        border: "1px solid rgba(245,158,11,0.25)",
      }}
    >
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.08)" }}
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.4)" }} />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div
          className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: "rgba(245,158,11,0.15)" }}
        >
          <RotateCcw className="w-4 h-4" style={{ color: "#f59e0b" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-1" style={{ color: "rgba(245,158,11,0.9)" }}>
            30 days of learning later
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
            You took your first assessment 30 days ago. Research shows Enneagram self-knowledge often
            improves after studying the theory. people regularly discover a different type. Want to
            retake it?
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/enneagram/quick"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #d97706, #b45309)",
                boxShadow: "0 4px 14px rgba(217,119,6,0.35)",
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Assessment
            </Link>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
