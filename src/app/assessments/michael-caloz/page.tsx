"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import StructuredAssessment from "@/components/assessments/StructuredAssessment";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { calozSections } from "@/data/assessments/michael-caloz";
import { useProfile } from "@/hooks/useProfile";

export default function MichaelCalozPage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();
  const [showGuide, setShowGuide] = useState(true);

  if (showGuide) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <button onClick={() => router.push("/assessments")} className="flex items-center gap-1 text-sm transition mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <AssessmentGuide assessmentName="Structured Type Assessment" timeEstimate="~15 min" onReady={() => setShowGuide(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button onClick={() => router.push("/assessments")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Structured Type Assessment</h1>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Rate statements organized by theme, motivation, fear, self-image, relationships, and more.</p>
      </div>
      <StructuredAssessment
        sections={calozSections}
        onComplete={(r) => {
          updateProfile({ enneagramType: parseInt(r.topResult, 10) });
          addXP(100, "michael-caloz-complete");
          const params = new URLSearchParams({
            type: r.topResult,
            scores: JSON.stringify(r.allScores),
            confidence: "75",
            assessmentLength: "michael-caloz",
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
