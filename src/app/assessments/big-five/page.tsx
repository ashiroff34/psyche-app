"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LikertAssessment from "@/components/assessments/LikertAssessment";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { bigFiveItems, factorDescriptions } from "@/data/assessments/big-five";
import { useProfile } from "@/hooks/useProfile";

function BigFiveResults({ results, onSave }: { results: { key: string; score: number; percentage: number }[]; onSave: () => void }) {
  const factorOrder = ["O", "C", "E", "A", "N"];
  const factorColors: Record<string, string> = {
    O: "bg-violet-500",
    C: "bg-sky-500",
    E: "bg-amber-500",
    A: "bg-emerald-500",
    N: "bg-rose-500",
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Your Big Five Profile</h2>
        <p className="text-sm text-slate-500">The scientific gold standard in personality psychology</p>
      </div>

      <div className="space-y-5 mb-8">
        {factorOrder.map((f) => {
          const result = results.find((r) => r.key === f);
          const desc = factorDescriptions[f];
          const pct = result?.percentage || 0;
          const isHigh = pct >= 50;
          return (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white border border-slate-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-semibold text-slate-800">{desc?.name || f}</h3>
                <span className="text-sm font-mono font-bold text-slate-600">{pct}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                <motion.div
                  className={`h-full rounded-full ${factorColors[f]}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isHigh ? desc?.high : desc?.low}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onSave}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Save Results
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full py-3 rounded-2xl bg-slate-50 text-slate-600 font-medium hover:bg-slate-100 transition-all"
        >
          Back to Assessments
        </button>
      </div>
    </div>
  );
}

export default function BigFivePage() {
  const router = useRouter();
  const { updateProfile, addXP } = useProfile();
  const [results, setResults] = useState<{ key: string; score: number; percentage: number }[] | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const items = bigFiveItems.map((item) => ({
    id: item.id,
    text: item.text,
    scores: { [item.factor]: 1 },
    reversed: item.reversed,
  }));

  if (showGuide) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <AssessmentGuide assessmentName="Big Five Personality (OCEAN)" timeEstimate="~15 min" onReady={() => setShowGuide(false)} />
      </div>
    );
  }

  if (results) {
    return (
      <BigFiveResults
        results={results}
        onSave={() => {
          updateProfile({ bigFiveScores: results.map((r) => ({ factor: r.key, score: r.score, percentage: r.percentage })) });
          addXP(100, "big-five-complete");
          router.push("/profile");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-1">Big Five Personality</h1>
        <p className="text-sm text-slate-400 mb-2">The OCEAN model, the most scientifically validated personality framework. {items.length} items.</p>
      </div>
      <LikertAssessment
        title="Big Five (OCEAN)"
        description="Rate how much each statement describes you"
        items={items}
        gradientFrom="from-blue-400"
        gradientTo="to-indigo-500"
        onComplete={(r) => {
          // Normalize scores: each factor has items scoring +1, max possible depends on item count
          // Calculate percentages relative to theoretical max per factor
          const factorCounts: Record<string, number> = {};
          bigFiveItems.forEach((item) => {
            factorCounts[item.factor] = (factorCounts[item.factor] || 0) + 1;
          });
          const normalized = r.allScores.map((s) => {
            const maxPossible = (factorCounts[s.key] || 10) * 5; // max score per item is 5
            return {
              key: s.key,
              score: s.score,
              percentage: Math.min(100, Math.round((s.score / maxPossible) * 100)),
            };
          });
          setResults(normalized);
        }}
      />
    </div>
  );
}
