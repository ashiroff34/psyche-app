"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, BookOpen, Sparkles, HelpCircle } from "lucide-react";
import Link from "next/link";
import { enneagramTypes } from "@/data/enneagram";

type Phase = "intro" | "guide" | "reading" | "select" | "confirm" | "done";

const selfTypingGuide = [
  {
    title: "Focus on motivation, not behavior",
    description: "Two very different-looking people can share the same type because they share the same core fear and desire. Ask yourself: WHY do I do what I do, not just WHAT do I do?",
  },
  {
    title: "Think about your patterns under stress",
    description: "Your type shows up most clearly when you're stressed, tired, or caught off-guard. That's when your automatic patterns take over. Which descriptions match your worst moments?",
  },
  {
    title: "Consider what you've been like your whole life",
    description: "Your type doesn't change — it's the pattern you've had since childhood. Don't type based on who you are right now or who you want to be. Think about your lifelong default.",
  },
  {
    title: "Notice what you DON'T want to admit",
    description: "The Enneagram specifically targets blind spots. If a description makes you uncomfortable because it's uncomfortably true — that might be your type. We resist seeing our own core patterns.",
  },
  {
    title: "Ask: what would people who know me best say?",
    description: "We all have a self-image that may differ from reality. If your closest friend or partner were reading these descriptions, which would they point to for you?",
  },
];

const typeEssences = enneagramTypes.map((t) => ({
  number: t.number,
  name: t.name,
  color: t.color,
  coreFear: t.coreFear,
  coreDesire: t.coreDesire,
  coreMotivation: t.coreMotivation,
  description: t.description,
  keyTraits: t.keyTraits,
  healthyTraits: t.healthyTraits,
  averageTraits: t.averageTraits,
  unhealthyTraits: t.unhealthyTraits,
}));

export default function SelfIdentification({
  onComplete,
}: {
  onComplete: (selectedType: number) => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [guideStep, setGuideStep] = useState(0);
  const [expandedType, setExpandedType] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [topCandidates, setTopCandidates] = useState<number[]>([]);

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">
            Self-Identification
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> Recommended by Enneagram experts
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Nearly every major Enneagram expert — from Russ Hudson to Beatrice Chestnut to David Daniels at Stanford — agrees that <strong>self-identification through reading and reflection</strong> is the most reliable path to finding your true type.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Why? Because the Enneagram is about <em>internal motivation</em>, not external behavior. No test can fully access your inner world — only you can. Tests are useful starting points, but they measure how you <em>report</em> your behavior, which is filtered through your self-image (which is itself shaped by your type).
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            This guided process will teach you how to read the types with the right lens, then let you identify which pattern has been yours for your whole life.
          </p>
          <button
            onClick={() => setPhase("guide")}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold shadow-lg shadow-amber-200/40 hover:shadow-xl transition-all"
          >
            Learn How to Self-Type
          </button>
        </motion.div>
      </div>
    );
  }

  if (phase === "guide") {
    const step = selfTypingGuide[guideStep];
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>How to identify your type</span>
            <span>{guideStep + 1} of {selfTypingGuide.length}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              animate={{ width: `${((guideStep + 1) / selfTypingGuide.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={guideStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => guideStep > 0 ? setGuideStep(guideStep - 1) : setPhase("intro")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={() => {
              if (guideStep < selfTypingGuide.length - 1) {
                setGuideStep(guideStep + 1);
              } else {
                setPhase("reading");
              }
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all"
          >
            {guideStep === selfTypingGuide.length - 1 ? "Read the Types" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "reading") {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Read Each Type Carefully
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Read through all nine types. Notice which descriptions create a feeling of recognition — especially the parts about motivation, fear, and the patterns you&apos;d rather not admit to. Select 2-3 that feel closest.
          </p>
        </div>

        <div className="space-y-4">
          {typeEssences.map((type) => {
            const isExpanded = expandedType === type.number;
            const isCandidate = topCandidates.includes(type.number);
            return (
              <motion.div
                key={type.number}
                layout
                className={`rounded-2xl border-2 transition-colors overflow-hidden ${
                  isCandidate
                    ? "border-amber-300 bg-amber-50/30"
                    : "border-slate-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setExpandedType(isExpanded ? null : type.number)}
                  className="w-full text-left p-5 flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-serif font-bold shrink-0"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-slate-800">
                      Type {type.number}: {type.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      Core fear: {type.coreFear}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCandidate && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-100 text-amber-700">
                        Selected
                      </span>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-slate-400"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4">
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {type.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-red-50/50">
                            <div className="text-xs font-medium text-red-700 mb-1">Core Fear</div>
                            <p className="text-xs text-red-600/80">{type.coreFear}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50/50">
                            <div className="text-xs font-medium text-emerald-700 mb-1">Core Desire</div>
                            <p className="text-xs text-emerald-600/80">{type.coreDesire}</p>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-slate-500 mb-1">Core Motivation</div>
                          <p className="text-xs text-slate-500">{type.coreMotivation}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-[10px] font-medium text-emerald-600 mb-1">At Their Best</div>
                            <div className="flex flex-wrap gap-1">
                              {type.healthyTraits.slice(0, 3).map((t) => (
                                <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-emerald-50 text-emerald-600">{t}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-medium text-amber-600 mb-1">Average</div>
                            <div className="flex flex-wrap gap-1">
                              {type.averageTraits.slice(0, 3).map((t) => (
                                <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-amber-50 text-amber-600">{t}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-medium text-red-600 mb-1">Under Stress</div>
                            <div className="flex flex-wrap gap-1">
                              {type.unhealthyTraits.slice(0, 3).map((t) => (
                                <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-red-50 text-red-600">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isCandidate) {
                              setTopCandidates(topCandidates.filter((n) => n !== type.number));
                            } else if (topCandidates.length < 3) {
                              setTopCandidates([...topCandidates, type.number]);
                            }
                          }}
                          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                            isCandidate
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              : topCandidates.length >= 3
                              ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                              : "bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                          }`}
                          disabled={!isCandidate && topCandidates.length >= 3}
                        >
                          {isCandidate ? "✓ This resonates — remove" : topCandidates.length >= 3 ? "Max 3 selected" : "This resonates with me"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {topCandidates.length >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky bottom-4 mt-8"
          >
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-lg border border-amber-200 shadow-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-700">
                  {topCandidates.length} type{topCandidates.length > 1 ? "s" : ""} selected
                </div>
                <div className="text-xs text-slate-400">
                  {topCandidates.map((n) => `Type ${n}`).join(", ")}
                </div>
              </div>
              <button
                onClick={() => setPhase("select")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all"
              >
                Choose Your Type <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  if (phase === "select") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Which Type Is Yours?
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Of the types you selected, which one describes your <strong>lifelong, automatic pattern</strong> — especially your core fear and motivation?
          </p>
        </div>

        <div className="space-y-3">
          {topCandidates.map((num) => {
            const type = enneagramTypes.find((t) => t.number === num)!;
            return (
              <button
                key={num}
                onClick={() => {
                  setSelectedType(num);
                  setPhase("confirm");
                }}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all hover:border-amber-300 hover:bg-amber-50/30 ${
                  selectedType === num ? "border-amber-400 bg-amber-50" : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-serif font-bold shrink-0"
                    style={{ backgroundColor: type.color }}
                  >
                    {num}
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-slate-800">
                      Type {num}: {type.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fear: {type.coreFear} · Desire: {type.coreDesire}
                    </p>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setPhase("reading")}
          className="flex items-center gap-2 mt-6 text-sm text-slate-400 hover:text-slate-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to reading
        </button>
      </div>
    );
  }

  if (phase === "confirm" || phase === "done") {
    const type = enneagramTypes.find((t) => t.number === selectedType)!;
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-serif font-bold mx-auto mb-6"
            style={{ backgroundColor: type.color }}
          >
            {type.number}
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">
            Type {type.number}: {type.name}
          </h2>
          <p className="text-sm text-slate-400 mb-6">Your self-identified Enneagram type</p>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 mb-6">
            <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm font-medium mb-1">
              <CheckCircle className="w-4 h-4" />
              Type saved!
            </div>
            <p className="text-xs text-emerald-600/80">
              Self-identification is the gold standard in the Enneagram community.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 mb-6 text-left">
            <h3 className="text-sm font-medium text-sky-800 mb-2">
              Want to confirm with a scientific assessment?
            </h3>
            <p className="text-xs text-sky-600/80 mb-3">
              While self-identification is the most recommended method, validated assessments can help confirm your type or reveal blind spots you might have missed. The Comprehensive Assessment uses research-backed methodology from RHETI, WEPSS, and TAS.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/enneagram/assess"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:shadow-lg transition-all"
              >
                Take the Comprehensive Assessment
              </Link>
              <Link
                href="/assessments"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:border-sky-200 transition-all"
              >
                Browse All Assessments
              </Link>
            </div>
          </div>

          <button
            onClick={() => onComplete(selectedType!)}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold shadow-lg shadow-amber-200/40 hover:shadow-xl transition-all"
          >
            View My Type Profile
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
}
