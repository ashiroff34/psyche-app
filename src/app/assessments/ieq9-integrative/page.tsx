"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LikertAssessment from "@/components/assessments/LikertAssessment";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { coreStatements, wingStatements, instinctStatements, stressGrowthStatements } from "@/data/assessments/ieq9-style";
import { useProfile } from "@/hooks/useProfile";
import { posthog, EVENTS, setUserProperty } from "@/lib/posthog";

export default function IEQ9IntegrativePage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();
  const [showGuide, setShowGuide] = useState(true);

  // Analytics: track when users actually start the deep assessment
  useEffect(() => {
    if (!showGuide) {
      try { posthog.capture(EVENTS.QUIZ_STARTED, { assessment: "ieq9_integrative", length: 175 }); } catch {}
    }
  }, [showGuide]);

  const allItems = useMemo(
    () => [...coreStatements, ...wingStatements, ...instinctStatements, ...stressGrowthStatements].map((s) => ({
      id: s.id,
      text: s.text,
      scores: s.scores,
    })),
    []
  );

  if (showGuide) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <button onClick={() => router.push("/assessments")} className="flex items-center gap-1 text-sm transition mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <AssessmentGuide assessmentName="Integrative Assessment" timeEstimate="~25 min" onReady={() => setShowGuide(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button onClick={() => router.push("/assessments")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Integrative Assessment</h1>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>iEQ9-inspired, {allItems.length} items across core type, wing, instinct, and stress/growth.</p>
      </div>
      <LikertAssessment
        title="Integrative Assessment"
        description="Rate how strongly each statement resonates with you"
        items={allItems}
        gradientFrom="from-indigo-400"
        gradientTo="to-violet-500"
        onComplete={(r) => {
          // Filter out instinct keys (sp, sx, so) to get type scores
          const typeScores = r.allScores.filter((s) => !["sp", "sx", "so"].includes(s.key));
          const topType = typeScores[0]?.key || "9";
          const instinctKey = r.allScores.find((s) => ["sp", "sx", "so"].includes(s.key))?.key ?? null;
          updateProfile({ enneagramType: parseInt(topType) });
          addXP(100, "ieq9-integrative-complete");
          // Analytics: deep quiz completed with higher confidence than quick quiz
          try {
            posthog.capture(EVENTS.QUIZ_COMPLETED, {
              assessment: "ieq9_integrative",
              enneagramType: parseInt(topType),
              runnerUp: typeScores[1]?.key ? parseInt(typeScores[1].key) : null,
              instinct: instinctKey,
              length: 175,
              source: "deep_assessment",
            });
            setUserProperty({
              enneagramType: parseInt(topType),
              instinct: instinctKey,
              hasCompletedDeepAssessment: true,
            });
          } catch {}
          const params = new URLSearchParams({
            type: topType,
            scores: JSON.stringify(typeScores),
            confidence: "80",
            assessmentLength: "ieq9-integrative",
            showTwo: "false",
            secondType: typeScores[1]?.key || "1",
            instinct: r.allScores.find((s) => ["sp", "sx", "so"].includes(s.key))?.key?.toUpperCase() || "SP",
            instinctScores: JSON.stringify(r.allScores.filter((s) => ["sp", "sx", "so"].includes(s.key))),
          });
          router.push(`/enneagram/results?${params.toString()}`);
        }}
      />
    </div>
  );
}
