"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Clock,
  Heart,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Eye,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { usePsychometrics } from "@/hooks/usePsychometrics";
import { enneagramTypes } from "@/data/enneagram";
import EnneagramCircle from "@/components/EnneagramCircle";
import { Leaf, ArrowRight as ArrowRightIcon } from "lucide-react";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";

// ─── Growth data (inline, mirrors growth/page.tsx) ──────────────────────────

const GROWTH_THEMES: Record<number, { theme: string; shortDesc: string; integrationNote: string }> = {
  1: { theme: "Serenity", shortDesc: "Release the inner critic. Practice 'good enough.'", integrationNote: "Integrate toward Type 7, allow joy and spontaneity" },
  2: { theme: "Humility", shortDesc: "Identify and express your own needs without apology.", integrationNote: "Integrate toward Type 4, connect with your own emotional depth" },
  3: { theme: "Authenticity", shortDesc: "Pause performing. Ask: who am I when no one's watching?", integrationNote: "Integrate toward Type 6, build genuine trust and cooperation" },
  4: { theme: "Equanimity", shortDesc: "Notice what IS present, not just what's missing.", integrationNote: "Integrate toward Type 1, take disciplined action without waiting for inspiration" },
  5: { theme: "Engagement", shortDesc: "Move from observer to participant. Trust your adequacy.", integrationNote: "Integrate toward Type 8, take decisive, embodied action" },
  6: { theme: "Courage", shortDesc: "Trust your inner knowing. Act without needing certainty.", integrationNote: "Integrate toward Type 9, find inner peace without suppressing real experience" },
  7: { theme: "Sobriety", shortDesc: "Stay with what is. Let difficult feelings complete themselves.", integrationNote: "Integrate toward Type 5, develop focused depth and stillness" },
  8: { theme: "Openness", shortDesc: "Vulnerability is not weakness. Open where you protect.", integrationNote: "Integrate toward Type 2, lead with warmth and generosity" },
  9: { theme: "Presence", shortDesc: "Your perspective matters. Practice saying what you want.", integrationNote: "Integrate toward Type 3, develop your own goals and act on them" },
};

// ─── Dimension definitions ────────────────────────────────────────────────────

interface Dimension {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  assessmentId: string;
  href: string;
}

const DIMENSIONS: Dimension[] = [
  {
    id: "enneagram",
    label: "Enneagram Type",
    shortLabel: "Type",
    description: "Your core motivational structure. The center of the whole system.",
    color: "#8b5cf6",
    assessmentId: "quick",
    href: "/assessments/quick",
  },
  {
    id: "instinct",
    label: "Instinctual Stacking",
    shortLabel: "Instinct",
    description: "Which survival drive (SP, SX, SO) shapes how your type expresses itself.",
    color: "#d946ef",
    assessmentId: "instinctual",
    href: "/assessments/instinctual",
  },
  {
    id: "tritype",
    label: "Tritype",
    shortLabel: "Tritype",
    description: "Your dominant type from each of the three intelligence centers.",
    color: "#6366f1",
    assessmentId: "tritype",
    href: "/assessments/tritype",
  },
  {
    id: "cognitive",
    label: "Cognitive Type",
    shortLabel: "Cognitive",
    description: "Your Jungian function stack. How you process information and make decisions.",
    color: "#0ea5e9",
    assessmentId: "jungian-self-id",
    href: "/assessments/jungian-self-id",
  },
  {
    id: "bigfive",
    label: "Big Five",
    shortLabel: "Big Five",
    description: "The most scientifically validated personality model. OCEAN trait profile.",
    color: "#10b981",
    assessmentId: "big-five",
    href: "/assessments/big-five",
  },
];

// ─── Recommendation engine ────────────────────────────────────────────────────

interface Recommendation {
  dimensionId: string;
  title: string;
  subtitle: string;
  why: string;
  timeEstimate: string;
  href: string;
  gradient: string;
  tags: string[];
}

function getRecommendation(
  hasType: boolean,
  hasInstinct: boolean,
  hasTritype: boolean,
  hasCognitive: boolean,
  hasBigFive: boolean,
  isContested: boolean,
): Recommendation {
  if (!hasType) {
    return {
      dimensionId: "enneagram",
      title: "Quick Type Finder",
      subtitle: "8 questions · ~3 minutes",
      why: "Start here. Your Enneagram type is the foundation. Everything else in the system builds on it. This takes 3 minutes and draws on Ichazo and Naranjo's core frameworks.",
      timeEstimate: "~3 min",
      href: "/assessments/quick",
      gradient: "from-violet-500 to-indigo-600",
      tags: ["8 Questions", "Ichazo · Naranjo"],
    };
  }
  if (!hasInstinct) {
    return {
      dimensionId: "instinct",
      title: "Instinctual Stacking",
      subtitle: "30 forced-choice questions · SP, SX, SO",
      why: "You have your type. Now find your subtype. Your instinctual stacking determines which version of your type you actually live. Two Type 5s with different stackings can feel like different people.",
      timeEstimate: "~5 min",
      href: "/assessments/instinctual",
      gradient: "from-fuchsia-500 to-pink-600",
      tags: ["30 Questions", "SP · SX · SO"],
    };
  }
  if (!hasTritype) {
    return {
      dimensionId: "tritype",
      title: "Tritype Assessment",
      subtitle: "27 forced-choice questions · Gut, Heart, Head",
      why: "Your tritype reveals which type from each intelligence center you draw on most. It explains why two people of the same type can feel so different in relationships and under stress.",
      timeEstimate: "~8 min",
      href: "/assessments/tritype",
      gradient: "from-indigo-500 to-violet-600",
      tags: ["27 Questions", "Fauvre · Forced-Choice"],
    };
  }
  if (!hasCognitive) {
    return {
      dimensionId: "cognitive",
      title: "Jungian Self-Identification",
      subtitle: "Study your function stack, identify your type",
      why: "Adding your cognitive type reveals the 'how' behind your Enneagram 'why.' The overlap between your type's Jungian stack and your Enneagram fixation is where real self-knowledge lives.",
      timeEstimate: "~15 min",
      href: "/assessments/jungian-self-id",
      gradient: "from-sky-400 to-blue-600",
      tags: ["Expert recommended", "Jung · Beebe"],
    };
  }
  if (!hasBigFive) {
    return {
      dimensionId: "bigfive",
      title: "Big Five Personality (OCEAN)",
      subtitle: "120 items · The scientific gold standard",
      why: "You've mapped the full Enneagram and cognitive picture. The Big Five adds the empirically validated layer. It cross-validates your other results and adds nuance that trait-based science captures uniquely.",
      timeEstimate: "~15 min",
      href: "/assessments/big-five",
      gradient: "from-emerald-400 to-teal-600",
      tags: ["120 Questions", "IPIP-NEO"],
    };
  }
  // All mapped. recommend mistype investigation if contested, otherwise deep assessment
  if (isContested) {
    return {
      dimensionId: "enneagram",
      title: "Mistype Investigator",
      subtitle: "Distinguish your most commonly confused types",
      why: "Your results show a close split between two types. This assessment focuses specifically on the pairs you're most likely confusing. It's more useful than retaking a general assessment.",
      timeEstimate: "~8 min",
      href: "/assessments/mistype-investigator",
      gradient: "from-rose-500 to-pink-600",
      tags: ["Targeted", "Type disambiguation"],
    };
  }
  return {
    dimensionId: "enneagram",
    title: "Deep Assessment (iEQ9/WEPSS)",
    subtitle: "144-question scientific assessment",
    why: "You've completed the full profile map. The Deep Assessment is the most data-rich instrument available. It adds integration/disintegration patterns, wing dynamics, and stress lines to your existing results.",
    timeEstimate: "~60 min",
    href: "/enneagram/assess",
    gradient: "from-indigo-500 to-violet-700",
    tags: ["153 Questions", "iEQ9 + WEPSS"],
  };
}

// ─── Assessment card data ─────────────────────────────────────────────────────

type Tab = "enneagram" | "jungian" | "scientific";

interface AssessmentItem {
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
}

const ALL_ASSESSMENTS: AssessmentItem[] = [
  {
    id: "quick",
    tab: "enneagram",
    icon: Zap,
    title: "Quick Type Finder",
    subtitle: "8 questions · Based on original theorists",
    description: "The fastest accurate path to your type. Uses Oscar Ichazo's triadic centers and Naranjo's core fixations to narrow your type in about 3 minutes.",
    timeEstimate: "~3 min",
    tags: ["8 Questions", "Ichazo · Naranjo"],
    gradient: "from-violet-500 to-indigo-600",
    href: "/assessments/quick",
  },
  {
    id: "this-or-that",
    tab: "enneagram",
    icon: Zap,
    title: "This or That",
    subtitle: "20 binary choices · 2 minutes",
    description: "Rapid-fire binary pairs that narrow your type through instinct, not analysis. Watch your type emerge in real time.",
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
    description: "The method recommended by virtually every major Enneagram expert. Read detailed descriptions of all nine types with guided questions.",
    timeEstimate: "~10 min",
    tags: ["Expert recommended", "+15% confidence"],
    gradient: "from-amber-400 to-orange-500",
    href: "/assessments/self-id",
  },
  {
    id: "essential",
    tab: "enneagram",
    icon: Layers,
    title: "Essential Enneagram",
    subtitle: "Stanford paragraph identification method",
    description: "Read nine holistic descriptions and identify which patterns match your lifelong experience. Validated against expert typing interviews.",
    timeEstimate: "~5 min",
    tags: ["Stanford-validated", "~66% accuracy"],
    gradient: "from-sky-400 to-blue-500",
    href: "/assessments/essential-enneagram",
  },
  {
    id: "ieq9",
    tab: "enneagram",
    icon: Target,
    title: "Integrative Assessment",
    subtitle: "iEQ9-inspired 175-item Likert",
    description: "Rate 175 statements across core type, wing, instinctual variant, and stress/growth dimensions.",
    timeEstimate: "~25 min",
    tags: ["175 Questions"],
    gradient: "from-indigo-400 to-violet-500",
    href: "/assessments/ieq9-integrative",
  },
  {
    id: "deep",
    tab: "enneagram",
    icon: Sparkles,
    title: "Deep Assessment (iEQ9/WEPSS)",
    subtitle: "144-question scientific assessment",
    description: "Based on RHETI, iEQ9, and WEPSS validated instruments. The most data-driven self-report option.",
    timeEstimate: "~60 min",
    tags: ["153 Questions", "iEQ9 + WEPSS"],
    gradient: "from-indigo-500 to-violet-600",
    href: "/enneagram/assess",
  },
  {
    id: "personality-path",
    tab: "enneagram",
    icon: Zap,
    title: "Adaptive Narrowing",
    subtitle: "Progressive rounds that narrow your type",
    description: "Starts broad (Head, Heart, or Gut center?) then progressively narrows through 80+ targeted questions.",
    timeEstimate: "~12 min",
    tags: ["80+ Questions"],
    gradient: "from-teal-400 to-cyan-500",
    href: "/assessments/personality-path",
  },
  {
    id: "caloz",
    tab: "enneagram",
    icon: Layers,
    title: "Structured Type Assessment",
    subtitle: "Michael Caloz-inspired organized test",
    description: "12 themed sections covering motivation, fear, self-image, relationships, stress, growth and more.",
    timeEstimate: "~15 min",
    tags: ["108 Questions"],
    gradient: "from-violet-400 to-purple-500",
    href: "/assessments/michael-caloz",
  },
  {
    id: "mistype",
    tab: "enneagram",
    icon: Search,
    title: "Mistype Investigator",
    subtitle: "Distinguish commonly confused types",
    description: "Already have a guess? Select type pairs you're torn between and answer targeted distinguishing questions.",
    timeEstimate: "~8 min",
    tags: ["75 Questions"],
    gradient: "from-rose-400 to-pink-500",
    href: "/assessments/mistype-investigator",
  },
  {
    id: "instinctual",
    tab: "enneagram",
    icon: Layers,
    title: "Instinctual Stacking",
    subtitle: "30 forced-choice questions · SP, SX, SO",
    description: "Discover which of the three survival instincts runs your life most powerfully and your full ranked stacking.",
    timeEstimate: "~5 min",
    tags: ["30 Questions", "SP · SX · SO"],
    gradient: "from-violet-500 to-indigo-600",
    href: "/assessments/instinctual",
  },
  {
    id: "tritype",
    tab: "enneagram",
    icon: Layers,
    title: "Tritype Assessment",
    subtitle: "27 forced-choice questions · Gut, Heart, Head",
    description: "Identify your dominant type from each of the three centers of intelligence.",
    timeEstimate: "~8 min",
    tags: ["27 Questions", "Fauvre · Forced-Choice"],
    gradient: "from-purple-500 to-violet-600",
    href: "/assessments/tritype",
  },
  {
    id: "jungian-self-id",
    tab: "jungian",
    icon: BookOpen,
    title: "Jungian Self-Identification",
    subtitle: "Study the functions, identify your stack",
    description: "Learn the 8 functions, browse 16 type profiles, and identify which stack matches how your mind actually works.",
    timeEstimate: "~15 min",
    tags: ["Expert recommended"],
    gradient: "from-violet-400 to-purple-500",
    href: "/assessments/jungian-self-id",
  },
  {
    id: "cognitive-full",
    tab: "jungian",
    icon: Brain,
    title: "Cognitive Functions Full",
    subtitle: "68-question axis-based assessment",
    description: "Full 8-function stack analysis with IRT-informed weighting. Measures across 4 axes: Ni-Se, Ne-Si, Ti-Fe, Fi-Te.",
    timeEstimate: "~25 min",
    tags: ["68 Questions", "Most accurate"],
    gradient: "from-indigo-500 to-violet-600",
    href: "/cognitive/assess",
  },
  {
    id: "cognitive-type",
    tab: "jungian",
    icon: Brain,
    title: "Advanced Cognitive Type",
    subtitle: "80-item individual function assessment",
    description: "Individually assess all 8 cognitive functions (Se, Si, Ne, Ni, Te, Ti, Fe, Fi). 10 items per function.",
    timeEstimate: "~12 min",
    tags: ["80 Questions"],
    gradient: "from-indigo-400 to-blue-500",
    href: "/assessments/cognitive-type",
  },
  {
    id: "attachment",
    tab: "scientific",
    icon: Heart,
    title: "Attachment Style",
    subtitle: "ECR-R inspired · 20 questions · 4 styles",
    description: "Discover your relational blueprint. How early bonds shaped your approach to intimacy and connection.",
    timeEstimate: "~5 min",
    tags: ["20 Questions", "Bowlby · Ainsworth"],
    gradient: "from-pink-500 to-violet-600",
    href: "/assessments/attachment",
  },
  {
    id: "big-five",
    tab: "scientific",
    icon: BarChart3,
    title: "Big Five Personality (OCEAN)",
    subtitle: "The scientific gold standard, 120 items",
    description: "The most scientifically validated personality model in psychology. Measures OCEAN with 6 facets each.",
    timeEstimate: "~15 min",
    tags: ["120 Questions", "IPIP-NEO"],
    gradient: "from-blue-400 to-indigo-500",
    href: "/assessments/big-five",
  },
  // ── New psychometric assessments ──
  {
    id: "values",
    tab: "scientific",
    icon: Heart,
    title: "Schwartz Values",
    subtitle: "What you actually prioritize, 10 universal values",
    description: "Based on Schwartz's cross-cultural values theory. Measures Self-Direction, Stimulation, Achievement, Power, Security, Conformity, Tradition, Benevolence, and Universalism.",
    timeEstimate: "~2 min",
    tags: ["20 Items", "Schwartz 2012"],
    gradient: "from-fuchsia-400 to-pink-500",
    href: "/assessments/values",
  },
  {
    id: "aspects",
    tab: "scientific",
    icon: Layers,
    title: "Big Five Aspects",
    subtitle: "10 aspects, because most people are split within a factor",
    description: "DeYoung, Quilty, Peterson (2007). Splits each Big Five factor into two aspects with separable neural substrates.",
    timeEstimate: "~3 min",
    tags: ["30 Items", "DeYoung 2007"],
    gradient: "from-purple-400 to-violet-500",
    href: "/assessments/aspects",
  },
  {
    id: "regulatory-focus",
    tab: "scientific",
    icon: Zap,
    title: "Regulatory Focus",
    subtitle: "Are you pulled by gains or pushed by avoiding losses?",
    description: "Higgins (1997). Promotion focus vs prevention focus. Changes how growth prompts are framed for you.",
    timeEstimate: "~1 min",
    tags: ["6 Items", "Higgins 1997"],
    gradient: "from-amber-400 to-orange-500",
    href: "/assessments/regulatory-focus",
  },
  {
    id: "decentering",
    tab: "scientific",
    icon: Eye,
    title: "Decentering Index",
    subtitle: "Measure your growth. Retake monthly.",
    description: "Fresco (2007). Tracks your capacity to observe patterns without being controlled by them.",
    timeEstimate: "~2 min",
    tags: ["8 Items", "Growth Metric"],
    gradient: "from-violet-400 to-indigo-500",
    href: "/assessments/decentering",
  },
];

const tabs: { key: Tab; label: string; icon: typeof Compass }[] = [
  { key: "enneagram", label: "Enneagram", icon: Compass },
  { key: "jungian", label: "Cognitive", icon: Brain },
  { key: "scientific", label: "Scientific", icon: BarChart3 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AssessmentListCard({ item }: { item: AssessmentItem }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{item.title}</h3>
          <span
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium shrink-0"
            style={{ background: "rgba(14,165,233,0.1)", color: "#38bdf8" }}
          >
            <Clock className="w-2.5 h-2.5" />
            {item.timeEstimate}
          </span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{item.subtitle}</p>
      </div>
      <ArrowRight className="w-4 h-4 shrink-0 mt-2.5 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: "rgba(255,255,255,0.6)" }} />
    </Link>
  );
}

// ─── Growth tab ───────────────────────────────────────────────────────────────

function GrowthTab({ myType }: { myType: number }) {
  const theme = GROWTH_THEMES[myType];
  const typeColor: Record<number, string> = {
    1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
    5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
  };
  const color = typeColor[myType] ?? "#8b5cf6";

  if (!theme || !myType) {
    return (
      <div className="text-center py-16">
        <p className="text-white/40 text-sm">Complete a type assessment to unlock your growth path.</p>
        <Link href="/assessments/quick" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)" }}>
          Find your type
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Growth theme card */}
      <div className="p-5 rounded-2xl" style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-4 h-4" style={{ color }} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>Type {myType} Growth Theme</span>
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>{theme.theme}</h2>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{theme.shortDesc}</p>
      </div>

      {/* Integration direction */}
      <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Integration direction</p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{theme.integrationNote}</p>
      </div>

      {/* Wound / Passion / Fixation / Armor */}
      {[
        { label: "Wound", key: "wound" },
        { label: "Passion", key: "passion" },
        { label: "Fixation", key: "fixation" },
        { label: "Armor", key: "armor" },
      ].map(({ label }) => (
        <div key={label} className="px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            {label === "Wound" && TYPE_WPFA[myType]?.wound}
            {label === "Passion" && TYPE_WPFA[myType]?.passion}
            {label === "Fixation" && TYPE_WPFA[myType]?.fixation}
            {label === "Armor" && TYPE_WPFA[myType]?.armor}
          </p>
        </div>
      ))}

      {/* Go deeper */}
      <Link
        href="/growth"
        className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
      >
        <Leaf className="w-4 h-4" />
        Full growth journal
      </Link>

      {/* Three Mirrors cross-lens CTA */}
      <Link
        href="/mirrors"
        className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(217,70,239,0.12) 100%)",
          border: "1px solid rgba(139,92,246,0.28)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: "#c4b5fd" }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>The Three Mirrors</p>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>Where your lenses agree — and where they don't</p>
          </div>
        </div>
        <ArrowRightIcon className="w-4 h-4 shrink-0" style={{ color: "rgba(196,181,253,0.6)" }} />
      </Link>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

// ─── Explore tab: type grid ───────────────────────────────────────────────────

const TYPE_CENTER_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

function ExploreTab({ myType }: { myType: number }) {
  return (
    <div>
      {/* ── Three Mirrors feature hero ── */}
      <Link
        href="/mirrors"
        className="group block mb-6 rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, #1a0a3a 0%, #2a0a4a 50%, #1a0a3a 100%)",
          border: "1px solid rgba(139,92,246,0.4)",
          boxShadow: "0 0 0 1px rgba(217,70,239,0.1), 0 8px 32px rgba(124,58,237,0.25)",
        }}
      >
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)" }} />
        <div className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(217,70,239,0.3))", border: "1px solid rgba(139,92,246,0.3)" }}>
            <Sparkles className="w-6 h-6" style={{ color: "#c4b5fd" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(196,181,253,0.7)" }}>Cross-lens synthesis</p>
            <h2 className="text-base font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>The Three Mirrors</h2>
            <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
              Motivation · Trait · Values — where they agree and where they don't
            </p>
          </div>
          <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "rgba(196,181,253,0.5)" }} />
        </div>
      </Link>

      {/* Enneagram diagram */}
      <div className="flex justify-center mb-8">
        <EnneagramCircle selectedType={myType || undefined} size={240} />
      </div>

      {/* Type grid */}
      <div className="space-y-2">
        {enneagramTypes.map((type) => {
          const color = TYPE_CENTER_COLORS[type.number] ?? "#8b5cf6";
          const isMyType = type.number === myType;
          return (
            <Link
              key={type.number}
              href={`/enneagram/learn?type=${type.number}`}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.98]"
              style={{
                background: isMyType ? `${color}14` : "rgba(255,255,255,0.03)",
                border: isMyType ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: isMyType ? `0 4px 16px ${color}18` : "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: color }}
              >
                {type.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {type.name}
                  </span>
                  {isMyType && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${color}30`, color }}>
                      Your type
                    </span>
                  )}
                </div>
                <p className="text-xs line-clamp-1" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {type.brief}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />
            </Link>
          );
        })}
      </div>

      {/* Link to full enneagram page */}
      <Link
        href="/enneagram"
        className="flex items-center justify-center gap-2 mt-6 py-3 rounded-2xl text-sm font-medium transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
      >
        <BookOpen className="w-4 h-4" />
        Full Enneagram reference
      </Link>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AssessmentsPage() {
  const { profile } = useProfile();
  const { schwartz, aspects } = usePsychometrics();
  const [pageMode, setPageMode] = useState<"know" | "explore" | "growth">("know");
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("enneagram");

  // Derive dimension completion from profile
  const hasType = !!(profile.enneagramType || profile.enneagramCore);
  const hasInstinct = !!profile.instinctualStacking;
  const hasTritype = !!(
    (profile.tritypeFirst && profile.tritypeSecond && profile.tritypeThird) ||
    (profile.tritype && profile.tritype.length >= 3)
  );
  const hasCognitive = !!(profile.cognitiveType || profile.mbtiType);
  const hasBigFive = !!(profile.bigFiveScores && profile.bigFiveScores.length > 0);
  const isContested = !!profile.isTypeContested;

  const completedDimensions = [hasType, hasInstinct, hasTritype, hasCognitive, hasBigFive].filter(Boolean).length;
  const recommendation = getRecommendation(hasType, hasInstinct, hasTritype, hasCognitive, hasBigFive, isContested);
  const recDimension = DIMENSIONS.find(d => d.id === recommendation.dimensionId) ?? DIMENSIONS[0];

  const dimStatus = [
    { dim: DIMENSIONS[0], done: hasType },
    { dim: DIMENSIONS[1], done: hasInstinct },
    { dim: DIMENSIONS[2], done: hasTritype },
    { dim: DIMENSIONS[3], done: hasCognitive },
    { dim: DIMENSIONS[4], done: hasBigFive },
  ];

  const filteredAll = ALL_ASSESSMENTS.filter(a => a.tab === activeTab);

  const myType = profile.enneagramType ?? profile.enneagramCore ?? 0;

  return (
    <div className="min-h-screen pb-32 px-4 pt-10" style={{ background: "#0f0a1e" }}>
      <div className="max-w-2xl mx-auto">

        {/* ── Know / Explore outer tabs ── */}
        <div
          className="flex items-center gap-1 mb-8 p-1 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {(["know", "explore", "growth"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setPageMode(mode)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                pageMode === mode
                  ? { background: "rgba(139,92,246,0.25)", color: "#c4b5fd", boxShadow: "0 2px 8px rgba(139,92,246,0.2)" }
                  : { color: "rgba(255,255,255,0.35)" }
              }
            >
              {mode === "know" ? "Know" : mode === "explore" ? "Explore" : "Growth"}
            </button>
          ))}
        </div>

        {/* ── Explore tab ── */}
        {pageMode === "explore" && <ExploreTab myType={myType} />}

        {/* ── Growth tab ── */}
        {pageMode === "growth" && <GrowthTab myType={myType} />}

        {/* ── Know tab ── */}
        {pageMode === "know" && <>

        {/* ── Header ── */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(139,92,246,0.7)" }}>
            Self-Assessment
          </p>
          <h1 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.93)" }}>
            {completedDimensions === 0
              ? "Map yourself"
              : completedDimensions === 5
              ? "Your full map"
              : "Continue mapping"}
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
            {completedDimensions === 0
              ? "Five dimensions. Start with your Enneagram type. Everything builds from there."
              : completedDimensions === 5
              ? "You've mapped all five dimensions. Go deeper or explore the full library."
              : `${completedDimensions} of 5 dimensions mapped.`}
          </p>
        </div>

        {/* ── Three Mirrors — hero feature card ── */}
        <Link
          href="/mirrors"
          className="group block mb-6 rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #1a0a3a 0%, #2a0a4a 50%, #1a0a3a 100%)",
            border: "1px solid rgba(139,92,246,0.4)",
            boxShadow: "0 0 0 1px rgba(217,70,239,0.1), 0 8px 32px rgba(124,58,237,0.25)",
          }}
        >
          {/* Top rainbow gradient bar */}
          <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)" }} />

          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* Icon cluster */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(217,70,239,0.3))", border: "1px solid rgba(139,92,246,0.3)" }}>
                <Sparkles className="w-6 h-6" style={{ color: "#c4b5fd" }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(196,181,253,0.7)" }}>
                    Cross-lens synthesis
                  </span>
                </div>
                <h2 className="text-lg font-bold leading-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
                  The Three Mirrors
                </h2>
                <p className="text-xs mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>
                  See where your motivation, traits, and values line up — and where they contradict each other. That's where the real insight is.
                </p>
              </div>

              <ArrowRight className="w-5 h-5 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" style={{ color: "rgba(196,181,253,0.5)" }} />
            </div>

            {/* Three lenses row */}
            <div className="flex gap-2 mt-4">
              {[
                { label: "Motivation", sub: "Enneagram", color: "#8b5cf6", done: hasType },
                { label: "Trait", sub: "Big Five Aspects", color: "#a855f7", done: !!aspects },
                { label: "Values", sub: "Schwartz", color: "#d946ef", done: !!schwartz },
              ].map(({ label, sub, color, done }) => (
                <div
                  key={label}
                  className="flex-1 px-2.5 py-2 rounded-xl"
                  style={{
                    background: done ? `${color}20` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${done ? `${color}40` : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: done ? color : "rgba(255,255,255,0.2)" }} />
                    <p className="text-[9px] font-bold uppercase tracking-widest truncate" style={{ color: done ? color : "rgba(255,255,255,0.3)" }}>
                      {label}
                    </p>
                  </div>
                  <p className="text-[10px] font-medium leading-snug" style={{ color: done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* ── Dimension tracker ── */}
        <div
          className="mb-6 p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
              Dimensions mapped
            </span>
            <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
              {completedDimensions}/5
            </span>
          </div>
          <div className="flex items-center gap-2">
            {dimStatus.map(({ dim, done }) => (
              <div key={dim.id} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full h-1.5 rounded-full transition-all duration-500"
                  style={{ background: done ? dim.color : "rgba(255,255,255,0.08)" }}
                />
                <div className="flex items-center gap-1">
                  {done
                    ? <CheckCircle2 className="w-2.5 h-2.5" style={{ color: dim.color }} />
                    : <Circle className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.2)" }} />
                  }
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wide leading-none"
                    style={{ color: done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}
                  >
                    {dim.shortLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recommended session card ── */}
        <motion.div
          key={recommendation.href}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            Your next session
          </p>
          <Link
            href={recommendation.href}
            className="group block rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}
          >
            {/* Gradient header */}
            <div
              className={`relative px-5 py-5 bg-gradient-to-br ${recommendation.gradient}`}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />

              {/* Dimension badge */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mb-3"
                style={{ background: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.9)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                {recDimension.label}
              </div>

              <h2 className="text-xl font-serif font-bold text-white mb-1 pr-10">
                {recommendation.title}
              </h2>
              <p className="text-sm text-white/70">{recommendation.subtitle}</p>

              <ArrowRight className="absolute top-5 right-5 w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Why this? section */}
            <div
              className="px-5 py-4"
              style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Why this session
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {recommendation.why}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {recommendation.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-medium"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium"
                  style={{ background: "rgba(14,165,233,0.12)", color: "#38bdf8" }}
                >
                  <Clock className="w-2.5 h-2.5" />
                  {recommendation.timeEstimate}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── New-user path: show 3-step journey when no type ── */}
        {!hasType && (
          <div
            className="mb-6 p-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              Your starting path
            </p>
            <div className="space-y-2">
              {[
                { num: 1, label: "Quick Type Finder", sub: "~3 min", href: "/assessments/quick", color: "#8b5cf6", active: true },
                { num: 2, label: "Instinctual Stacking", sub: "~5 min", href: "/assessments/instinctual", color: "#d946ef", active: false },
                { num: 3, label: "Tritype Assessment", sub: "~8 min", href: "/assessments/tritype", color: "#6366f1", active: false },
              ].map(({ num, label, sub, href, color, active }) => (
                <Link
                  key={num}
                  href={active ? href : "#"}
                  onClick={active ? undefined : (e) => e.preventDefault()}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all"
                  style={{
                    background: active ? `${color}12` : "rgba(255,255,255,0.025)",
                    border: `1px solid ${active ? `${color}30` : "rgba(255,255,255,0.06)"}`,
                    opacity: active ? 1 : 0.5,
                    cursor: active ? "pointer" : "default",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{ background: active ? color : "rgba(255,255,255,0.08)", color: active ? "#0f0a1e" : "rgba(255,255,255,0.3)" }}
                  >
                    {num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold" style={{ color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>{label}</p>
                  </div>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── All sessions toggle ── */}
        <button
          onClick={() => setShowAll(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all mb-1"
          style={{
            background: showAll ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${showAll ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.08)"}`,
            color: showAll ? "#c4b5fd" : "rgba(255,255,255,0.45)",
          }}
        >
          <span>All sessions</span>
          {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                {/* Tabs */}
                <div
                  className="flex items-center gap-1 p-1 rounded-2xl mb-4"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1 justify-center"
                        style={isActive
                          ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.92)" }
                          : { color: "rgba(255,255,255,0.38)" }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* List */}
                <div className="space-y-2">
                  {filteredAll.map(item => (
                    <AssessmentListCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Related tools ── */}
        <div className="mt-8">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            Related tools
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/compare", label: "Compare Types", sub: "Side by side type analysis", icon: ArrowRight, color: "#6366f1" },
              { href: "/correlations", label: "Correlations", sub: "Cross-model overlaps", icon: ArrowRight, color: "#0ea5e9" },
            ].map(({ href, label, sub, color }) => (
              <Link
                key={href}
                href={href}
                className="p-4 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-7 h-7 rounded-xl flex items-center justify-center mb-2" style={{ background: `${color}20` }}>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>{label}</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{sub}</p>
              </Link>
            ))}
          </div>
        </div>

        </> /* end Know tab */}

      </div>
    </div>
  );
}
