"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, BookOpen, Sparkles, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cognitiveFunctions, mbtiTypes } from "@/data/cognitive-functions";

type Phase = "intro" | "guide" | "functions" | "types" | "select" | "done";

const selfTypingGuide = [
  {
    title: "Understand the 4 axes, not the 4 letters",
    description: "Forget I/E, S/N, T/F, J/P as isolated traits. What matters is your cognitive function STACK — how your mind actually processes information. An INFP and an ISFP share Fi dominance but perceive the world completely differently (Ne vs Se).",
  },
  {
    title: "Identify your dominant function first",
    description: "Your dominant function is the one you use most naturally and effortlessly — it's so automatic you might not even notice it. Ask yourself: Do I primarily take in information (perceiving) or make judgments (deciding) as my default mode?",
  },
  {
    title: "Notice what exhausts you vs. energizes you",
    description: "Your dominant function energizes you even after hours of use. Your inferior function (the opposite) drains you quickly. If deep analytical thinking (Ti) energizes you but managing group emotions (Fe) is exhausting, that's a strong signal.",
  },
  {
    title: "Look at your cognitive blind spots",
    description: "Your 7th and 8th functions (the 'trickster' and 'demon' in the Beebe model) are where you're most likely to make errors or feel threatened. What kinds of thinking or perceiving consistently trip you up?",
  },
  {
    title: "Your type is about HOW, not WHAT",
    description: "Two people can both love art — one through Se (sensory immersion in the physical beauty) and another through Ni (seeing symbolic meaning beneath the surface). The content of your interests doesn't determine your type — how your mind engages with them does.",
  },
];

const functionGroups = {
  perceiving: cognitiveFunctions.filter((f) => f.category === "Perceiving"),
  judging: cognitiveFunctions.filter((f) => f.category === "Judging"),
};

export default function JungianSelfIdentification({
  onComplete,
}: {
  onComplete: (selectedType: string, dominantFunction: string) => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [guideStep, setGuideStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedType, setExpandedType] = useState<string | null>(null);

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">
            Jungian Self-Identification
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> Recommended by Jungian analysts
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Jung himself believed that understanding your own cognitive patterns through study and reflection
            was more valuable than any test. Learn how the 8 functions work, read the 16 type profiles,
            and identify which stack describes how YOUR mind actually operates.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Tests measure how you <em>report</em> your cognition. Only you can observe how your mind
            actually processes information from the inside.
          </p>
          <button
            onClick={() => setPhase("guide")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200/40 hover:shadow-xl transition-all"
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
            <span>How to identify your cognitive type</span>
            <span>{guideStep + 1} of {selfTypingGuide.length}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full"
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
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
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
                setPhase("types");
              }
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-lg transition-all"
          >
            {guideStep === selfTypingGuide.length - 1 ? "Browse the 16 Types" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "types") {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
            Browse the 16 Types
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Read through each type&apos;s cognitive function stack. Which one describes how YOUR mind
            naturally processes information? Pay attention to the dominant function — that&apos;s the key.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {mbtiTypes.map((type) => {
            const isExpanded = expandedType === type.code;
            const isSelected = selectedType === type.code;
            return (
              <motion.div key={type.code} layout>
                <button
                  onClick={() => setExpandedType(isExpanded ? null : type.code)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-50"
                      : isExpanded
                      ? "border-violet-200 bg-violet-50/30"
                      : "border-slate-100 bg-white hover:border-indigo-200"
                  }`}
                >
                  <div className="font-mono text-lg font-bold mb-1" style={{ color: type.color }}>
                    {type.code}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{type.name}</div>
                  <div className="flex gap-1 flex-wrap">
                    {type.stack.map((f: string, j: number) => (
                      <span
                        key={f}
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          j === 0
                            ? "bg-indigo-100 text-indigo-700 font-semibold"
                            : j === 1
                            ? "bg-violet-50 text-violet-600"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  {isSelected && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-indigo-600 font-medium">
                      <CheckCircle className="w-3 h-3" /> Selected
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {expandedType && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm mb-6"
          >
            {(() => {
              const type = mbtiTypes.find((t) => t.code === expandedType)!;
              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-bold" style={{ color: type.color }}>{type.code}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{type.name}</div>
                      <div className="text-xs text-slate-400">Stack: {type.stack.join(" → ")}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {type.stack.map((funcCode: string, i: number) => {
                      const func = cognitiveFunctions.find((f) => f.code === funcCode);
                      const roles = ["Dominant (Hero)", "Auxiliary (Parent)", "Tertiary (Child)", "Inferior (Aspirational)"];
                      return (
                        <div key={funcCode} className="p-3 rounded-xl bg-slate-50">
                          <div className="text-[10px] font-medium text-slate-400 mb-1">{roles[i]}</div>
                          <div className="font-mono text-sm font-bold" style={{ color: func?.color }}>{funcCode}</div>
                          <div className="text-xs text-slate-500">{func?.name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedType(expandedType);
                      setPhase("done");
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium text-sm hover:shadow-lg transition-all"
                  >
                    This is my type
                  </button>
                </div>
              );
            })()}
          </motion.div>
        )}

        <button
          onClick={() => setPhase("guide")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to guide
        </button>
      </div>
    );
  }

  if (phase === "done" && selectedType) {
    const type = mbtiTypes.find((t) => t.code === selectedType)!;
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center"
        >
          <div className="font-mono text-4xl font-bold mb-2" style={{ color: type.color }}>
            {type.code}
          </div>
          <p className="text-sm text-slate-500 mb-1">{type.name}</p>
          <p className="text-xs text-slate-400 mb-6">Stack: {type.stack.join(" → ")}</p>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 mb-6">
            <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm font-medium mb-1">
              <CheckCircle className="w-4 h-4" />
              Type saved!
            </div>
            <p className="text-xs text-emerald-600/80">
              Self-identification through study is the method Jung himself preferred.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 mb-6 text-left">
            <h3 className="text-sm font-medium text-indigo-800 mb-2">
              Want to confirm with an assessment?
            </h3>
            <p className="text-xs text-indigo-600/80 mb-3">
              Assessments can help validate your self-identification or reveal functions you might be overlooking.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/cognitive/assess"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-lg transition-all"
              >
                Cognitive Functions Assessment
              </Link>
              <Link
                href="/assessments"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 transition-all"
              >
                Browse All Assessments
              </Link>
            </div>
          </div>

          <button
            onClick={() => onComplete(selectedType, type.stack[0])}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200/40 hover:shadow-xl transition-all"
          >
            View My Type Profile
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
}
