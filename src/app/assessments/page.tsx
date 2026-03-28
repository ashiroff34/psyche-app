"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Sparkles,
  Brain,
  Target,
  Compass,
  Search,
  BarChart3,
  Layers,
  Zap,
  ArrowRight,
  Star,
  ArrowLeft,
  Clock,
} from "lucide-react";

type Tab = "enneagram" | "jungian" | "scientific";

const tabs: { key: Tab; label: string; icon: typeof Compass }[] = [
  { key: "enneagram", label: "Enneagram", icon: Compass },
  { key: "jungian", label: "Cognitive", icon: Brain },
  { key: "scientific", label: "Scientific", icon: BarChart3 },
];

interface AssessmentCard {
  id: string;
  tab: Tab;
  icon: typeof Compass;
  title: string;
  subtitle: string;
  description: string;
  timeEstimate: string;
  tags: string[];
  gradient: string;
  href: string;
  recommended?: boolean;
  scientificPick?: boolean;
}

const assessments: AssessmentCard[] = [
  // ENNEAGRAM
  {
    id: "self-identify",
    tab: "enneagram",
    icon: BookOpen,
    title: "Self-Identification",
    subtitle: "Read, reflect, and identify your type",
    description: "The method recommended by virtually every major Enneagram expert. Read detailed descriptions of all nine types with guided questions to help you see yourself honestly.",
    timeEstimate: "~10 min",
    tags: ["Expert recommended"],
    gradient: "from-amber-400 to-orange-500",
    href: "/assessments/essential-enneagram",
    recommended: true,
  },
  {
    id: "deep",
    tab: "enneagram",
    icon: Sparkles,
    title: "Deep Assessment (iEQ9/WEPSS)",
    subtitle: "144-question scientific assessment",
    description: "Based on RHETI, iEQ9, and WEPSS validated instruments. Covers motivation, integration, and disintegration patterns. The most data-driven self-report option.",
    timeEstimate: "~60 min",
    tags: ["153 Qs", "iEQ9 + WEPSS"],
    gradient: "from-indigo-500 to-violet-600",
    href: "/enneagram/assess",
    scientificPick: true,
  },
  {
    id: "essential",
    tab: "enneagram",
    icon: Layers,
    title: "Essential Enneagram",
    subtitle: "Stanford paragraph identification method",
    description: "Read nine holistic descriptions and identify which patterns match your lifelong experience. Validated against expert typing interviews with ~66-68% accuracy.",
    timeEstimate: "~5 min",
    tags: ["Stanford-validated"],
    gradient: "from-sky-400 to-blue-500",
    href: "/assessments/essential-enneagram",
  },
  {
    id: "ieq9",
    tab: "enneagram",
    icon: Target,
    title: "Integrative Assessment",
    subtitle: "iEQ9-inspired 175-item Likert",
    description: "Rate 175 statements across core type, wing, instinctual variant, and stress/growth dimensions. The most thorough adaptive Likert assessment.",
    timeEstimate: "~25 min",
    tags: ["175 Qs"],
    gradient: "from-indigo-400 to-violet-500",
    href: "/assessments/ieq9-integrative",
  },
  {
    id: "personality-path",
    tab: "enneagram",
    icon: Zap,
    title: "Adaptive Narrowing",
    subtitle: "Progressive rounds that narrow your type",
    description: "Starts broad (Head, Heart, or Gut center?) then progressively narrows through 80+ targeted questions. Each answer shapes the next.",
    timeEstimate: "~12 min",
    tags: ["80+ Qs"],
    gradient: "from-teal-400 to-cyan-500",
    href: "/assessments/personality-path",
  },
  {
    id: "caloz",
    tab: "enneagram",
    icon: Layers,
    title: "Structured Type Assessment",
    subtitle: "Michael Caloz-inspired organized test",
    description: "12 themed sections (motivation, fear, self-image, relationships, stress, growth, and more). Rate 108 statements for a clear, organized comparison.",
    timeEstimate: "~15 min",
    tags: ["108 Qs"],
    gradient: "from-violet-400 to-purple-500",
    href: "/assessments/michael-caloz",
  },
  {
    id: "standard",
    tab: "enneagram",
    icon: Brain,
    title: "Standard Assessment",
    subtitle: "36-question quick version",
    description: "36 core questions covering all 9 types plus 9 instinct variant questions. Good accuracy for a first pass.",
    timeEstimate: "~15 min",
    tags: ["45 Qs"],
    gradient: "from-sky-400 to-indigo-500",
    href: "/enneagram/assess",
  },
  {
    id: "mistype",
    tab: "enneagram",
    icon: Search,
    title: "Mistype Investigator",
    subtitle: "Distinguish commonly confused types",
    description: "Already have a guess? Select type pairs you're torn between and answer 75 targeted distinguishing questions. Links to Enneagram Institute's mistype guide too.",
    timeEstimate: "~8 min",
    tags: ["75 Qs"],
    gradient: "from-rose-400 to-pink-500",
    href: "/assessments/mistype-investigator",
  },
  // JUNGIAN
  {
    id: "jungian-self-id",
    tab: "jungian",
    icon: BookOpen,
    title: "Jungian Self-Identification",
    subtitle: "Study the functions, identify your stack",
    description: "Jung himself believed studying your own cognitive patterns was more valuable than any test. Learn the 8 functions, browse 16 type profiles, and identify which stack matches how your mind actually works.",
    timeEstimate: "~15 min",
    tags: ["Expert recommended"],
    gradient: "from-violet-400 to-purple-500",
    href: "/assessments/jungian-self-id",
    recommended: true,
  },
  {
    id: "cognitive-full",
    tab: "jungian",
    icon: Brain,
    title: "Cognitive Functions Full",
    subtitle: "68-question axis-based assessment",
    description: "Full 8-function stack analysis with IRT-informed weighting. Measures across 4 axes: Ni-Se, Ne-Si, Ti-Fe, Fi-Te.",
    timeEstimate: "~25 min",
    tags: ["68 Qs", "Most accurate"],
    gradient: "from-indigo-500 to-violet-600",
    href: "/cognitive/assess",
    scientificPick: true,
  },
  {
    id: "cognitive-type",
    tab: "jungian",
    icon: Brain,
    title: "Advanced Cognitive Type",
    subtitle: "80-item individual function assessment",
    description: "Goes beyond standard MBTI to individually assess all 8 cognitive functions (Se, Si, Ne, Ni, Te, Ti, Fe, Fi). 10 items per function.",
    timeEstimate: "~12 min",
    tags: ["80 Qs"],
    gradient: "from-indigo-400 to-blue-500",
    href: "/assessments/cognitive-type",
  },
  {
    id: "cognitive-standard",
    tab: "jungian",
    icon: Brain,
    title: "Cognitive Functions Standard",
    subtitle: "36-question quick version",
    description: "Quick axis-based assessment with consistency checks. Good for a first pass at your cognitive function stack.",
    timeEstimate: "~15 min",
    tags: ["36 Qs"],
    gradient: "from-sky-400 to-indigo-500",
    href: "/cognitive/assess",
  },
  // SCIENTIFIC
  {
    id: "big-five",
    tab: "scientific",
    icon: BarChart3,
    title: "Big Five Personality (OCEAN)",
    subtitle: "The scientific gold standard — 120 items",
    description: "The most scientifically validated personality model in psychology. Measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism with 6 facets each.",
    timeEstimate: "~15 min",
    tags: ["120 Qs", "IPIP-NEO"],
    gradient: "from-blue-400 to-indigo-500",
    href: "/assessments/big-five",
  },
];

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("enneagram");
  const filteredAssessments = assessments.filter((a) => a.tab === activeTab);

  return (
    <div className="min-h-screen py-16 pb-32 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> Type Assessments
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">
            Discover Your Type
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Multiple paths to self-discovery — from expert-recommended self-identification to scientifically validated assessments.
          </p>
          <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 max-w-md mx-auto leading-relaxed">
            <strong>Thyself focuses primarily on the Enneagram</strong> as your core personality framework, but we also offer Carl Jung&apos;s Cognitive Functions and Big Five assessments for a complete picture.
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-1 justify-center ${
                  isActive
                    ? "text-slate-800 bg-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Assessment Cards */}
        <div className="space-y-4">
          {filteredAssessments.map((assessment, i) => {
            const Icon = assessment.icon;
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href={assessment.href}
                  className="group block p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-50 transition-all duration-200 relative overflow-hidden"
                >
                  {assessment.recommended && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Star className="w-3 h-3" /> Recommended
                    </div>
                  )}
                  {assessment.scientificPick && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
                      <FlaskConical className="w-3 h-3" /> Most Scientific
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${assessment.gradient} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5 pr-24">
                        <h3 className="text-lg font-serif font-semibold text-slate-800">{assessment.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{assessment.subtitle}</p>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3">{assessment.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Time estimate — always first and visually distinct */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
                          <Clock className="w-3 h-3" />
                          {assessment.timeEstimate}
                        </span>
                        {assessment.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 text-xs rounded-lg bg-slate-50 text-slate-500 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
