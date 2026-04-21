"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import QuickTypeAssessment from "@/components/assessments/QuickTypeAssessment";
import { useProfile } from "@/hooks/useProfile";

export default function QuickAssessmentPage() {
  const router = useRouter();
  const { addXP, recordAssessment, updateProfile } = useProfile();

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="max-w-lg mx-auto px-4 pt-20 pb-2">
        <button
          onClick={() => router.push("/assessments")}
          className="flex items-center gap-1 text-sm mb-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
            Quick Type Finder
          </h1>
        </div>
        <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
          8 questions · Based on Ichazo, Naranjo, Riso &amp; Hudson · Most accurate short test
        </p>
      </div>

      <QuickTypeAssessment
        onComplete={(result) => {
          // type === 0 means user skipped the quiz
          if (!result.type) {
            router.push("/assessments");
            return;
          }
          recordAssessment("quick", result.confidence, result.type);
          addXP(50, "quick-assessment-complete");
          const instinct = (result as { instinct?: string }).instinct ?? "SP";
          // Persist instinct to profile so chibi sprites sync across the app
          // (ChibiSprite reads profile.instinctualStacking; without this, every
          // chibi falls back to "sp" regardless of what the user answered).
          updateProfile({ instinctualStacking: instinct.toLowerCase().slice(0, 2) });
          const params = new URLSearchParams({
            type: String(result.type),
            scores: JSON.stringify([]),
            confidence: String(Math.min(result.confidence, 22)),
            assessmentLength: "quick",
            showTwo: result.runnerUp !== result.type ? "true" : "false",
            secondType: String(result.runnerUp),
            instinct: instinct.toUpperCase().slice(0, 2),
            instinctScores: JSON.stringify([]),
          });
          router.push(`/enneagram/results?${params.toString()}`);
        }}
      />
    </div>
  );
}
