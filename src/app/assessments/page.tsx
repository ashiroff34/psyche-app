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
  Heart,
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
    id: "quick",
    tab: "enneagram",
    icon: Zap,
    title: "Quick Type Finder",
    subtitle: "8 questions · Based on original theorists",
    description: "The fastest accurate path to your type. Uses Oscar Ichazo's triadic centers (gut/heart/head) and Naranjo's core fixations to narrow your type in about 3 minutes.",
    timeEstimate: "~3 min",
    tags: ["8 Questions", "Ichazo · Naranjo · R&H"],
    gradient: "from-violet-500 to-indigo-600",
    href: "/assessments/quick",
    recommended: true,
  },
  {
    id: "this-or-that",
    tab: "enneagram",
    icon: Zap,
    title: "This or That",
    subtitle: "20 binary choices · 2 minutes",
    description: "Rapid-fire binary pairs that narrow your type through instinct, not analysis. Pick which statement resonates more — no overthinking. Watch your type emerge in real time.",
    timeEstimate: "~2 min",
    tags: ["20 Pairs", "Live probability"],
    gradient: "from-fuchsia-500 to-pink-600",
    href: "/assessments/this-or-that",
  },
  {
    id: "self-identify",
    tab: "enneagram",
    icon: BookOpen,
    title: "Self-Identification",
    subtitle: "Read, reflect, and identify your type",
    description: "The method recommended by virtually every major Enneagram expert. Read detailed descriptions of all nine types with guided questions to help you see yourself honestly.",
    timeEstimate: "~10 min",
    tags: ["Expert recommended", "+15% confidence"],
    gradient: "from-amber-400 to-orange-500",
    href: "/assessments/self-id",
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
  {
    id: "attachment",
    tab: "scientific",
    icon: Heart,
    title: "Attachment Style",
    subtitle: "ECR-R inspired · 20 questions · 4 styles",
    description: "Discover your relational blueprint — how early bonds shaped your approach to intimacy and connection. Based on Bowlby and Ainsworth's foundational research, with a cross-map to your Enneagram type.",
    timeEstimate: "~5 min",
    tags: ["20 Qs", "Bowlby · Ainsworth · ECR-R"],
    gradient: "from-pink-500 to-violet-600",
    href: "/assessments/attachment",
  },
  {
    id: "instinctual",
    tab: "enneagram",
    icon: Layers,
    title: "Instinctual Stacking",
    subtitle: "30 forced-choice questions · SP, SX, SO",
    description: "Your instinctual drives shape HOW your Enneagram type expresses itself. Discover which of the three survival instincts runs your life most powerfully — and your full ranked stacking.",
    timeEstimate: "~5 min",
    tags: ["30 Qs", "SP · SX · SO"],
    gradient: "from-violet-500 to-indigo-600",
    href: "/assessments/instinctual",
  },
  {
    id: "tritype",
    tab: "enneagram",
    icon: Layers,
    title: "Tritype Assessment",
    subtitle: "27 forced-choice questions · Gut, Heart, Head",
    description: "Tritype identifies your dominant Enneagram type from each of the three centers of intelligence. Based on Katherine Fauvre's research, this forced-choice assessment uncovers your three-digit code and named archetype.",
    timeEstimate: "~8 min",
    tags: ["27 Qs", "Fauvre · Forced-Choice"],
    gradient: "from-purple-500 to-violet-600",
    href: "/assessments/tritype",
  },
  // SCIENTIFIC
  {
    id: "big-five",
    tab: "scientific",
    icon: BarChart3,
    title: "Big Five Personality (OCEAN)",
    subtitle: "The scientific gold standard, 120 items",
    description: "The most scientifically validated personality model in psychology. Measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism with 6 facets each.",
    timeEstimate: "~15 min",
    tags: ["120 Qs", "IPIP-NEO"],
    gradient: "from-blue-400 to-indigo-500",
    href: "/assessments/big-five",
  },
];

// The 3 "Start Here" assessments — always visible, no tab needed
const FEATURED_IDS = ["quick", "this-or-that", "self-identify"];

function AssessmentCard({ assessment }: { assessment: AssessmentCard }) {
  const Icon = assessment.icon;
  return (
    <Link
      href={assessment.href}
      className="group block p-5 rounded-2xl transition-all duration-200 relative overflow-hidden hover:-translate-y-0.5"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      {assessment.recommended && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <Star className="w-3 h-3" /> Start here
        </div>
      )}
      {assessment.scientificPick && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
          <FlaskConical className="w-3 h-3" /> Most Scientific
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${assessment.gradient} flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-serif font-semibold mb-0.5 pr-20" style={{ color: "rgba(255,255,255,0.88)" }}>{assessment.title}</h3>
          <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{assessment.subtitle}</p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{assessment.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.2)", color: "#38bdf8" }}>
              <Clock className="w-3 h-3" />
              {assessment.timeEstimate}
            </span>
            {assessment.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-lg font-medium"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function AssessmentsPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("enneagram");

  const featured = assessments.filter((a) => FEATURED_IDS.includes(a.id));
  const rest = assessments.filter((a) => !FEATURED_IDS.includes(a.id));
  const filteredRest = rest.filter((a) => a.tab === activeTab);

  return (
    <div className="min-h-screen py-16 pb-32 px-4" style={{ background: "#0f0a1e" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Find Your Type
          </h1>
          <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Start with any of these three — they take 2–10 minutes and cover 95% of what you need.
          </p>
        </div>

        {/* Guide me CTA */}
        <div className="mb-6 p-4 rounded-2xl flex items-center justify-between gap-4"
          style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div>
            <p className="text-white/90 text-sm font-semibold">Not sure which to take?</p>
            <p className="text-violet-400/60 text-xs mt-0.5">Most people start with the Quick Type Finder — 5 min, instant result.</p>
          </div>
          <Link href="/assessments/quick"
            className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white" }}>
            Start here →
          </Link>
        </div>

        {/* Featured 3 */}
        <div className="space-y-3 mb-8">
          {featured.map((a) => <AssessmentCard key={a.id} assessment={a} />)}
        </div>

        {/* More options toggle */}
        <button
          onClick={() => setShowAll((v) => !v)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all"
          style={{
            background: showAll ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
            border: "1px solid rgba(139,92,246,0.2)",
            color: showAll ? "#c4b5fd" : "rgba(255,255,255,0.45)",
          }}
        >
          <ArrowLeft className={`w-4 h-4 transition-transform ${showAll ? "rotate-90" : "-rotate-90"}`} />
          {showAll ? "Hide extra assessments" : "More assessments"}
        </button>

        {/* Expanded: filtered by type */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            {/* Sub-tabs */}
            <div className="flex items-center gap-1 p-1 rounded-2xl mb-5" style={{ background: "rgba(255,255,255,0.06)" }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1 justify-center"
                    style={isActive
                      ? { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }
                      : { color: "rgba(255,255,255,0.45)" }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="space-y-3">
              {filteredRest.map((a) => <AssessmentCard key={a.id} assessment={a} />)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
