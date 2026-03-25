"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AdaptiveAssessment from "@/components/assessments/AdaptiveAssessment";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { adaptiveRounds } from "@/data/assessments/personality-path";
import { useProfile } from "@/hooks/useProfile";

export default function PersonalityPathPage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();
  const [showGuide, setShowGuide] = useState(true);

  if (showGuide) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <AssessmentGuide assessmentName="Adaptive Narrowing" onReady={() => setShowGuide(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Adaptive Narrowing</h1>
        <p className="text-sm text-slate-400 mb-2">Progressive questions that narrow down your type — starts broad, gets specific.</p>
      </div>
      <AdaptiveAssessment
        rounds={adaptiveRounds}
        onComplete={(r) => {
          updateProfile({ enneagramType: parseInt(r.topResult) });
          addXP(75, "personality-path-complete");
          const params = new URLSearchParams({
            type: r.topResult,
            scores: JSON.stringify(r.allScores),
            confidence: "72",
            assessmentLength: "personality-path",
            showTwo: "false",
            secondType: r.allScores[1]?.key || "1",
            instinct: "SP",
            instinctScores: JSON.stringify([]),
          });
          router.push(`/enneagram/results?${params.toString()}`);
        }}
      />
    </div>
  );
}
