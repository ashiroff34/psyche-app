"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ParagraphAssessment from "@/components/assessments/ParagraphAssessment";
import { essentialParagraphs, narrowingQuestions } from "@/data/assessments/essential-enneagram";
import { useProfile } from "@/hooks/useProfile";

export default function EssentialEnneagramPage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Essential Enneagram</h1>
        <p className="text-sm text-slate-400 mb-4">Read nine descriptions and identify which fits you, the Stanford-validated paragraph identification method.</p>
      </div>
      <ParagraphAssessment
        paragraphs={essentialParagraphs}
        narrowingQuestions={narrowingQuestions}
        onComplete={(r) => {
          updateProfile({ enneagramType: parseInt(r.topResult) });
          addXP(75, "essential-enneagram-complete");
          const params = new URLSearchParams({
            type: r.topResult,
            scores: JSON.stringify(r.allScores),
            confidence: "68",
            assessmentLength: "essential-enneagram",
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
