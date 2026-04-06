"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LikertAssessment from "@/components/assessments/LikertAssessment";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { cognitiveTypeItems, typeStacks } from "@/data/assessments/cognitive-type";
import { useProfile } from "@/hooks/useProfile";

function determineCognitiveTypeFromScores(functionScores: Record<string, number>): string {
  // For each of the 16 types, calculate how well the user's function scores match the type's stack
  let bestType = "INTJ";
  let bestScore = -Infinity;

  for (const [type, stack] of Object.entries(typeStacks)) {
    // Weight: dominant=4, auxiliary=3, tertiary=2, inferior=1
    const weights = [4, 3, 2, 1];
    let score = 0;
    stack.forEach((func, i) => {
      score += (functionScores[func] || 0) * weights[i];
    });
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  }

  return bestType;
}

export default function CognitiveTypePage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();
  const [showGuide, setShowGuide] = useState(true);

  const items = cognitiveTypeItems.map((s) => ({
    id: s.id,
    text: s.text,
    scores: s.scores,
  }));

  if (showGuide) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm transition mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <AssessmentGuide assessmentName="Cognitive Functions Assessment" timeEstimate="~12 min" onReady={() => setShowGuide(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Cognitive Functions Assessment</h1>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Advanced cognitive analysis, {items.length} items assessing all 8 cognitive functions individually.</p>
      </div>
      <LikertAssessment
        title="Cognitive Functions"
        description="Rate how strongly each describes you"
        items={items}
        gradientFrom="from-indigo-400"
        gradientTo="to-blue-500"
        onComplete={(r) => {
          // Determine the 4-letter type from function scores
          const cogType = determineCognitiveTypeFromScores(r.rawScores);
          const topFunction = r.allScores[0]?.key || "Ni";

          updateProfile({ cognitiveType: cogType, dominantFunction: topFunction });
          addXP(100, "cognitive-type-complete");

          const params = new URLSearchParams({
            func: topFunction,
            scores: JSON.stringify(r.allScores),
            type: cogType,
          });
          router.push(`/cognitive/results?${params.toString()}`);
        }}
      />
    </div>
  );
}
