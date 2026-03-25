"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import JungianSelfIdentification from "@/components/assessments/JungianSelfIdentification";
import { useProfile } from "@/hooks/useProfile";

export default function JungianSelfIdPage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
      <JungianSelfIdentification
        onComplete={(selectedType, dominantFunction) => {
          updateProfile({ cognitiveType: selectedType, dominantFunction });
          addXP(100, "jungian-self-identified");
          const params = new URLSearchParams({
            func: dominantFunction,
            scores: JSON.stringify([]),
            type: selectedType,
          });
          router.push(`/cognitive/results?${params.toString()}`);
        }}
      />
    </div>
  );
}
