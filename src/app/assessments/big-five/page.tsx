"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LikertAssessment from "@/components/assessments/LikertAssessment";
import AssessmentGuide from "@/components/assessments/AssessmentGuide";
import { bigFiveItems, factorDescriptions } from "@/data/assessments/big-five";
import { bigFiveFacets, facetsByFactor } from "@/data/bigFiveFacets";
import { bigFiveCrossMap } from "@/data/bigFiveCrossMap";
import { useProfile } from "@/hooks/useProfile";

type FactorScore = { key: string; score: number; percentage: number };
type FacetScore = { factor: string; facet: string; score: number; percentage: number };

function normalizeFacetKey(raw: string): string {
  return raw.toLowerCase();
}

function BigFiveResults({
  factorResults,
  facetResults,
  onSave,
}: {
  factorResults: FactorScore[];
  facetResults: FacetScore[];
  onSave: () => void;
}) {
  const { profile } = useProfile();
  const factorOrder = ["O", "C", "E", "A", "N"];
  const factorColors: Record<string, { bar: string; muted: string; text: string; border: string }> = {
    O: { bar: "bg-violet-500", muted: "bg-violet-400/60", text: "#c4b5fd", border: "rgba(139,92,246,0.3)" },
    C: { bar: "bg-sky-500", muted: "bg-sky-400/60", text: "#7dd3fc", border: "rgba(14,165,233,0.3)" },
    E: { bar: "bg-amber-500", muted: "bg-amber-400/60", text: "#fcd34d", border: "rgba(245,158,11,0.3)" },
    A: { bar: "bg-emerald-500", muted: "bg-emerald-400/60", text: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
    N: { bar: "bg-rose-500", muted: "bg-rose-400/60", text: "#fda4af", border: "rgba(244,63,94,0.3)" },
  };

  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  // Build facet score lookup: "factor:facetKey" -> percentage
  const facetLookup: Record<string, number> = {};
  facetResults.forEach((fs) => {
    facetLookup[`${fs.factor}:${normalizeFacetKey(fs.facet)}`] = fs.percentage;
  });

  const enneagramType = profile.enneagramType;
  const crossMap = enneagramType ? bigFiveCrossMap[enneagramType] : null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.95)" }}>
          Your Big Five Profile
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          The scientific gold standard in personality psychology
        </p>
      </div>

      {/* Factor cards with expandable facets */}
      <div className="space-y-4 mb-8">
        {factorOrder.map((f) => {
          const result = factorResults.find((r) => r.key === f);
          const desc = factorDescriptions[f];
          const pct = result?.percentage || 0;
          const isHigh = pct >= 50;
          const colors = factorColors[f];
          const facetsForFactor = facetsByFactor[f] || [];
          const isExpanded = expandedFactor === f;

          return (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* Factor header row */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {desc?.name || f}
                  </h3>
                  <span className="text-sm font-mono font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {pct}%
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    className={`h-full rounded-full ${colors.bar}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {isHigh ? desc?.high : desc?.low}
                </p>

                {/* Expand/collapse button */}
                <button
                  onClick={() => setExpandedFactor(isExpanded ? null : f)}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                  style={{ color: colors.text }}
                >
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {isExpanded ? "Hide" : "Show"} facet breakdown
                </button>
              </div>

              {/* Facets */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 pt-1 space-y-4"
                      style={{ borderTop: `1px solid rgba(255,255,255,0.07)` }}
                    >
                      {facetsForFactor.map((facet) => {
                        const facetPct = facetLookup[`${f}:${normalizeFacetKey(facet.key)}`] ?? 50;
                        const facetIsHigh = facetPct >= 50;
                        return (
                          <div key={facet.name}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold" style={{ color: colors.text }}>
                                {facet.name}
                              </span>
                              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {facetPct}%
                              </span>
                            </div>
                            <div
                              className="h-2 rounded-full overflow-hidden mb-1"
                              style={{ background: "rgba(255,255,255,0.08)" }}
                            >
                              <motion.div
                                className={`h-full rounded-full ${colors.muted}`}
                                initial={{ width: "0%" }}
                                animate={{ width: `${facetPct}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              />
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                              {facetIsHigh ? facet.high : facet.low}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Enneagram cross-map section */}
      {crossMap && enneagramType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl mb-8"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <h3 className="font-serif font-semibold mb-1" style={{ color: "rgba(196,181,253,0.95)" }}>
            Your Big Five + Enneagram Profile
          </h3>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            Type {enneagramType} · How your Enneagram type typically maps to the Big Five
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
            {crossMap.interpretation}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#6ee7b7" }}>
                Typically high for Type {enneagramType}
              </p>
              <div className="space-y-1">
                {crossMap.highFacets.map((facetName) => {
                  const facetData = bigFiveFacets.find((f) => f.name === facetName);
                  const actualPct = facetData
                    ? facetLookup[`${facetData.factor}:${normalizeFacetKey(facetData.key)}`]
                    : undefined;
                  const matches = actualPct !== undefined && actualPct >= 50;
                  return (
                    <div key={facetName} className="flex items-center gap-2 text-xs">
                      <span style={{ color: matches ? "#6ee7b7" : "rgba(255,255,255,0.3)" }}>
                        {matches ? "✓" : "·"}
                      </span>
                      <span style={{ color: matches ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}>
                        {facetName}
                        {actualPct !== undefined && (
                          <span className="ml-1 font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {actualPct}%
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#fda4af" }}>
                Typically low for Type {enneagramType}
              </p>
              <div className="space-y-1">
                {crossMap.lowFacets.map((facetName) => {
                  const facetData = bigFiveFacets.find((f) => f.name === facetName);
                  const actualPct = facetData
                    ? facetLookup[`${facetData.factor}:${normalizeFacetKey(facetData.key)}`]
                    : undefined;
                  const matches = actualPct !== undefined && actualPct < 50;
                  return (
                    <div key={facetName} className="flex items-center gap-2 text-xs">
                      <span style={{ color: matches ? "#fda4af" : "rgba(255,255,255,0.3)" }}>
                        {matches ? "✓" : "·"}
                      </span>
                      <span style={{ color: matches ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}>
                        {facetName}
                        {actualPct !== undefined && (
                          <span className="ml-1 font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {actualPct}%
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={onSave}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Save Results
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full py-3 rounded-2xl font-medium transition-all"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
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
  const [factorResults, setFactorResults] = useState<FactorScore[] | null>(null);
  const [facetResults, setFacetResults] = useState<FacetScore[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  // Map items to LikertAssessment format, including both factor and facet score keys
  const items = bigFiveItems.map((item) => ({
    id: item.id,
    text: item.text,
    // Track factor AND facet simultaneously via compound key "factor:facet"
    scores: {
      [item.factor]: 1,
      [`${item.factor}:${item.facet.toLowerCase()}`]: 1,
    },
    reversed: item.reversed,
  }));

  if (showGuide) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm transition mb-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <AssessmentGuide
          assessmentName="Big Five Personality (OCEAN)"
          timeEstimate="~15 min"
          onReady={() => setShowGuide(false)}
        />
      </div>
    );
  }

  if (factorResults) {
    return (
      <BigFiveResults
        factorResults={factorResults}
        facetResults={facetResults}
        onSave={() => {
          updateProfile({
            bigFiveScores: factorResults.map((r) => ({
              factor: r.key,
              score: r.score,
              percentage: r.percentage,
            })),
          });
          addXP(100, "big-five-complete");
          router.push("/assessments");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1
          className="text-2xl font-serif font-bold mb-1"
          style={{ color: "rgba(255,255,255,0.95)" }}
        >
          Big Five Personality
        </h1>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          The OCEAN model, the most scientifically validated personality framework. {items.length} items.
        </p>
      </div>
      <LikertAssessment
        title="Big Five (OCEAN)"
        description="Rate how much each statement describes you"
        items={items}
        gradientFrom="from-blue-400"
        gradientTo="to-indigo-500"
        onComplete={(r) => {
          // Count items per factor and per facet for normalization
          const factorCounts: Record<string, number> = {};
          const facetCounts: Record<string, number> = {};
          bigFiveItems.forEach((item) => {
            factorCounts[item.factor] = (factorCounts[item.factor] || 0) + 1;
            const facetKey = `${item.factor}:${item.facet.toLowerCase()}`;
            facetCounts[facetKey] = (facetCounts[facetKey] || 0) + 1;
          });

          // Separate factor scores from facet scores
          const factorKeys = ["O", "C", "E", "A", "N"];
          const normalizedFactors: FactorScore[] = factorKeys
            .map((f) => {
              const raw = r.rawScores[f] || 0;
              const maxPossible = (factorCounts[f] || 24) * 5;
              return {
                key: f,
                score: raw,
                percentage: Math.min(100, Math.round((raw / maxPossible) * 100)),
              };
            });

          // Extract facet scores
          const normalizedFacets: FacetScore[] = [];
          Object.entries(r.rawScores).forEach(([key, score]) => {
            if (key.includes(":")) {
              const [factor, ...facetParts] = key.split(":");
              const facetKey = facetParts.join(":");
              const maxPossible = (facetCounts[key] || 4) * 5;
              normalizedFacets.push({
                factor,
                facet: facetKey,
                score,
                percentage: Math.min(100, Math.round((score / maxPossible) * 100)),
              });
            }
          });

          setFacetResults(normalizedFacets);
          setFactorResults(normalizedFactors);
        }}
      />
    </div>
  );
}
