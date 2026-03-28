"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MistypeInvestigator from "@/components/assessments/MistypeInvestigator";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { mistypePairs } from "@/data/assessments/mistype-investigator";
import { useProfile } from "@/hooks/useProfile";

export default function MistypeInvestigatorPage() {
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
        <AssessmentGuide assessmentName="Mistype Investigator" timeEstimate="~8 min" onReady={() => setShowGuide(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
      <MistypeInvestigator
        pairs={mistypePairs}
        onComplete={(r) => {
          updateProfile({ enneagramType: parseInt(r.topResult) });
          addXP(50, "mistype-investigator-complete");
          const params = new URLSearchParams({
            type: r.topResult,
            scores: JSON.stringify(r.allScores),
            confidence: "65",
            assessmentLength: "mistype-investigator",
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
