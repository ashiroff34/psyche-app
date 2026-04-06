"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ThisOrThat, { type ThisOrThatResult } from "@/components/assessments/ThisOrThat";

export default function ThisOrThatPage() {
  const router = useRouter();

  function handleComplete(result: ThisOrThatResult) {
    const params = new URLSearchParams({
      type: String(result.type),
      confidence: String(result.confidence),
      assessmentLength: "quick",
      showTwo: result.runnerUp !== result.type ? "true" : "false",
      secondType: String(result.runnerUp),
      scores: JSON.stringify([]),
      instinct: "SP",
      instinctScores: JSON.stringify([]),
    });
    router.push(`/enneagram/results?${params.toString()}`);
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-12 pb-3 max-w-lg mx-auto w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="mt-2">
          <h1
            className="text-xl font-serif font-bold"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            This or That
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            20 pairs · 2 minutes
          </p>
        </div>
      </div>

      <ThisOrThat onComplete={handleComplete} />
    </div>
  );
}
