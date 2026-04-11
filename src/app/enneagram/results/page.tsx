"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  User,
  Brain,
  Shield,
  Flame,
  Star,
  Layers,
  Compass,
  GitMerge,
  BookOpen,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Share2,
} from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import { subtypes } from "@/data/subtypes";
import {
  naranjoFramework,
  hornevianGroups,
  harmonicGroups,
  objectRelationsGroups,
} from "@/data/deep-enneagram";
import { useProfile } from "@/hooks/useProfile";
import { markTopicComplete } from "@/hooks/useGameState";
import GuidedJourney from "@/components/GuidedJourney";
import NextStepBanner from "@/components/NextStepBanner";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import TypeDiscoveryModal from "@/components/TypeDiscoveryModal";
import TikTokTypeCard from "@/components/TikTokTypeCard";

// ── Famous examples ───────────────────────────────────────────────────────
const famousExamples: Record<number, { name: string; note: string }[]> = {
  1: [
    { name: "Hermione Granger", note: "Relentless pursuit of correctness" },
    { name: "Gandhi", note: "Principled moral reformer" },
    { name: "Martha Stewart", note: "Perfectionist standards" },
    { name: "Confucius", note: "Ethical ideal" },
  ],
  2: [
    { name: "Princess Diana", note: "Devoted public service" },
    { name: "Dolly Parton", note: "Warm generous spirit" },
    { name: "Mother Teresa", note: "Self-sacrificing love" },
    { name: "Oprah Winfrey", note: "Nurturing emotional connection" },
  ],
  3: [
    { name: "Barack Obama", note: "Inspiring achievement" },
    { name: "Taylor Swift", note: "Image-conscious reinvention" },
    { name: "Tony Robbins", note: "Motivational performance" },
    { name: "Coco Chanel", note: "Success through image" },
  ],
  4: [
    { name: "Sylvia Plath", note: "Deep emotional authenticity" },
    { name: "Frida Kahlo", note: "Unique personal expression" },
    { name: "Edgar Allan Poe", note: "Melancholic depth" },
    { name: "Virginia Woolf", note: "Profound inner world" },
  ],
  5: [
    { name: "Albert Einstein", note: "Pure investigative curiosity" },
    { name: "Bill Gates", note: "Systematic analytical mastery" },
    { name: "Nikola Tesla", note: "Reclusive genius" },
    { name: "Marie Curie", note: "Focused scientific depth" },
  ],
  6: [
    { name: "Sigmund Freud", note: "Questioning analytical vigilance" },
    { name: "Malala Yousafzai", note: "Courage despite fear" },
    { name: "Tom Hanks", note: "Reliable loyal warmth" },
    { name: "Princess Leia", note: "Loyal committed fighter" },
  ],
  7: [
    { name: "Robin Williams", note: "Restless joyful energy" },
    { name: "Miley Cyrus", note: "Experience-seeking variety" },
    { name: "Mozart", note: "Prolific joyful genius" },
    { name: "Elton John", note: "Vivid enthusiastic life" },
  ],
  8: [
    { name: "Winston Churchill", note: "Commanding strength" },
    { name: "Martin Luther King Jr.", note: "Forceful justice" },
    { name: "Serena Williams", note: "Intense competitive power" },
    { name: "Toni Morrison", note: "Uncompromising creative authority" },
  ],
  9: [
    { name: "Abraham Lincoln", note: "Patient unifying calm" },
    { name: "Audrey Hepburn", note: "Gentle peaceful grace" },
    { name: "Keanu Reeves", note: "Low-key accepting presence" },
    { name: "Fred Rogers", note: "Warm unconditional peace" },
  ],
};

// ── Levels of Development (Riso-Hudson) ──────────────────────────────────
const levelsOfDevelopment: Record<number, { level: number; label: string; description: string }[]> = {
  1: [
    { level: 1, label: "Wise & Discerning", description: "Extraordinarily wise and discerning, knowing when to act and when to refrain. Inspiring moral clarity without imposing standards on others. Realistic acceptance of imperfection." },
    { level: 2, label: "Principled & Purposeful", description: "Responsible, consistent, and reliable. Has strong sense of right and wrong. Teaches and demonstrates their principles through personal example." },
    { level: 3, label: "Reasonable & Ethical", description: "Highly conscientious, with strong personal standards. Strives to be fair, balanced, and objective. Hard-working and dependable in all commitments." },
    { level: 4, label: "Orderly & Methodical", description: "Becoming more orderly and structured. May start to prioritize rules and procedures over flexibility. Systematic but possibly rigid in approach." },
    { level: 5, label: "Critically Judgmental", description: "Becoming critical of others who don't meet their standards. Can be impersonal, cold, and self-righteous. Feels others are not trying hard enough." },
    { level: 6, label: "Preachy & Opinionated", description: "Feeling they must tell others what's right. Overly critical, moralizing, condescending. Resentful when others don't follow their standards." },
    { level: 7, label: "Intolerant & Inflexible", description: "Repressed by their own strictness. Hypocritical, claiming to be righteous while violating their own principles. Becoming obsessive." },
    { level: 8, label: "Obsessive & Punitive", description: "Severe and punishing, to themselves and others. Breakdowns of self-control in the very areas they've judged others." },
    { level: 9, label: "Condemnatory & Cruel", description: "Fanatical moralizing combined with actions that contradict their stated values. Potential for harm done in the name of righteousness." },
  ],
  2: [
    { level: 1, label: "Unconditionally Loving", description: "Profoundly generous and humble. Genuinely altruistic, helping others without any expectation of return. Love as a pure gift freely given." },
    { level: 2, label: "Empathetic & Caring", description: "Warm, nurturing, and compassionate. Deeply attentive to others' needs. Shows care through practical help and emotional support." },
    { level: 3, label: "Friendly & Encouraging", description: "Optimistic, helpful, and appreciative. Makes others feel valued and seen. Adept at fostering connection and warmth in groups." },
    { level: 4, label: "Well-Meaning & Intrusive", description: "Beginning to focus heavily on relationships for self-worth. Giving advice and support even when unsolicited. Becoming people-pleasing." },
    { level: 5, label: "Possessive & Manipulative", description: "Becoming overly involved in others' lives. Possessive of close relationships. Using help as a form of control or to create obligation." },
    { level: 6, label: "Self-Important & Domineering", description: "Feeling indispensable. Inserting themselves into others' lives, making themselves needed. Resentful when care isn't reciprocated." },
    { level: 7, label: "Self-Deceived & Entitled", description: "Convinced of their own selflessness while acting in deeply self-interested ways. Coercive 'love' with anger at those who don't respond." },
    { level: 8, label: "Victimized & Manipulative", description: "Playing victim role. Using illness or guilt to hold others captive. Feeling completely unappreciated despite everything done for others." },
    { level: 9, label: "Chronic Self-Neglect", description: "Severe psychosomatic illness. Believing self-sacrifice is the path to love, reaching a state of total self-depletion." },
  ],
  3: [
    { level: 1, label: "Authentic & Self-Accepting", description: "Genuinely outstanding, inspirational to others. A living example that success and integrity are compatible. Authentic, inner-directed, and deeply real." },
    { level: 2, label: "Self-Assured & Admirable", description: "Highly adaptable, energetic, and ambitious. Competent and effective in everything they undertake. Genuinely impressive and worth admiring." },
    { level: 3, label: "Goal-Oriented & Efficient", description: "Extremely industrious and productive. Focused on goals, making things happen. A reliable team leader who inspires confidence in others." },
    { level: 4, label: "Status-Conscious & Competitive", description: "Becoming highly concerned with performance and image. Comparing themselves to others. Needing to demonstrate their superiority." },
    { level: 5, label: "Calculating & Image-Oriented", description: "Willing to cut corners to maintain image. Everything becomes performance. Starting to believe their own persona. Deep fear of failure." },
    { level: 6, label: "Deceptive & Opportunistic", description: "Becoming deliberately deceptive. Saying whatever is needed to get ahead. Exploiting others while maintaining charming exterior." },
    { level: 7, label: "Unprincipled & Devious", description: "Willing to do anything to succeed. Betrayal of others for personal gain. Sabotaging competitors." },
    { level: 8, label: "Jealous & Malicious", description: "Terrified of being exposed as a fraud. Vindictive and cruel toward those who see through them." },
    { level: 9, label: "Psychopathic Betrayal", description: "Complete loss of morality in service of image. Profound self-alienation, no longer knowing who they are beneath the persona." },
  ],
  4: [
    { level: 1, label: "Inspired & Deeply Creative", description: "Renewing themselves through creative expression. Profoundly individualistic, transforming personal pain into universal art. Emotionally honest and courageous." },
    { level: 2, label: "Introspective & Sensitive", description: "Highly perceptive and self-aware. Creating beauty from personal experience. Deeply feeling and empathetic, seeing into the hearts of others." },
    { level: 3, label: "Emotionally Authentic", description: "Finding the universal in the personal. Creating from genuine emotional truth. Witty, aesthetically refined, and gentle." },
    { level: 4, label: "Romanticizing & Self-Pitying", description: "Beginning to exaggerate emotional responses. Feeling misunderstood and different. Withdrawing from others. Longing for the beautiful or ideal." },
    { level: 5, label: "Self-Indulgent & Withdrawn", description: "Consumed by moods and feelings. Becoming self-absorbed. Unable or unwilling to function normally. Using aesthetic experience as escape." },
    { level: 6, label: "Melancholic & Inhibited", description: "Feeling that nothing compares to the inner ideal. Becoming hopeless about self and future. Envious of others' apparent happiness." },
    { level: 7, label: "Self-Contemptuous & Alienated", description: "Feeling fundamentally flawed and beyond help. Cutting off from others. Contemptuous of those who seem less sensitive or authentic." },
    { level: 8, label: "Depressed & Despairing", description: "Severe depression and self-hatred. Feeling too damaged to be helped. Seeing the world through a lens of absolute hopelessness." },
    { level: 9, label: "Self-Destructive & Despairing", description: "Complete emotional breakdown. Possibly engaging in self-destructive behavior as a form of control over feelings. Clinical crisis." },
  ],
  5: [
    { level: 1, label: "Visionary & Pioneering", description: "A true visionary, contributing genuinely revolutionary insights. Able to synthesize vast amounts of information into profound understanding." },
    { level: 2, label: "Perceptive & Innovative", description: "Exceptionally observant. Able to see what others miss. Forming deep, penetrating insights. A love of learning that is joyful rather than defensive." },
    { level: 3, label: "Concentrated & Capable", description: "Focusing intensely on areas of interest. Becoming expert and specialized. Patient, thorough, and methodically building knowledge." },
    { level: 4, label: "Detached & Cerebral", description: "Starting to use intellect to maintain distance from feelings and demands. Becoming more private. Needing to understand everything before engaging." },
    { level: 5, label: "Preoccupied & Isolating", description: "Pulling away from others to protect their inner world. Preoccupied with complex mental worlds. Difficulty with practical demands of everyday life." },
    { level: 6, label: "Provocative & Nihilistic", description: "Feeling the world is threatening and intrusive. Becoming dismissive of others. Using intellectual superiority as a defense." },
    { level: 7, label: "Reclusive & Eccentric", description: "Severely withdrawing from the world. Cutting off from relationships. Eccentric thinking that may seem bizarre to others." },
    { level: 8, label: "Delusional & Frightened", description: "Becoming paranoid about outside world. Mental isolation producing strange ideas. Unable to function in normal social world." },
    { level: 9, label: "Psychotic Breaks", description: "Complete withdrawal from reality. Possible schizoid or psychotic episodes. Total breakdown of ability to engage with external world." },
  ],
  6: [
    { level: 1, label: "Courageous & Self-Affirming", description: "Profoundly courageous, acting on inner truth despite fear. Deeply loyal and self-affirming. Able to bring a group together through genuine commitment." },
    { level: 2, label: "Engaging & Reliable", description: "Warm, engaging, and reliable. Deeply committed to people and causes. Balancing personal security needs with genuine trust of others." },
    { level: 3, label: "Responsible & Hardworking", description: "Committed, responsible, and trustworthy. Creating safety through competence and preparation. Building loyal relationships and solid communities." },
    { level: 4, label: "Dutiful & Dependent", description: "Becoming more dependent on outside authority. Needing clear guidelines and rules. Anxiety when facing ambiguity or having to act independently." },
    { level: 5, label: "Suspicious & Doubtful", description: "Beginning to mistrust their own judgment. Seeking reassurance but not believing it. Seeing potential threats everywhere. Difficulty committing." },
    { level: 6, label: "Defensive & Anxious", description: "Feeling persecuted and besieged. Overreacting to perceived threats. Either over-compliant or rebelliously counterdependent." },
    { level: 7, label: "Paranoid & Blaming", description: "Seeing dangerous forces everywhere. Paranoid projection, attributing their own fears to others. Becoming accusatory and hostile." },
    { level: 8, label: "Masochistic & Self-Defeating", description: "Feeling helpless and trapped. Clinging to sources of security that further undermine them. Panicking and making decisions that create the feared outcomes." },
    { level: 9, label: "Self-Abasing & Crises", description: "Complete loss of trust in self and world. Breakdown of ego, profound identity crisis." },
  ],
  7: [
    { level: 1, label: "Ecstatic & Assimilating", description: "Appreciating and savoring the full richness of experience. Deeply joyful without grasping. Able to be present with satisfaction rather than seeking more." },
    { level: 2, label: "Enthusiastic & Accomplished", description: "Infectious enthusiasm and joy. Extraordinarily productive. Synthesizing diverse areas into brilliant, innovative creations." },
    { level: 3, label: "Spontaneous & Versatile", description: "Quick and lively. Seeking adventure and novelty. Bringing vitality and fun to life. Able to engage many interests with genuine skill." },
    { level: 4, label: "Scattered & Restless", description: "Constantly seeking new experiences to avoid discomfort. Difficulty focusing. Mind always jumping to the next exciting possibility." },
    { level: 5, label: "Acquisitive & Escapist", description: "Needing more and more stimulation to feel satisfied. Becoming greedy for experiences. Using activity and busyness to avoid deeper feelings." },
    { level: 6, label: "Uninhibited & Impulsive", description: "Acting on every impulse without reflection. No boundaries. Seeking pleasure regardless of consequences. Becoming rude and insensitive." },
    { level: 7, label: "Excessive & Dependent", description: "Compulsive pleasure-seeking. Addictive behavior. Unable to stop themselves from pursuing gratification. Increasingly erratic behavior." },
    { level: 8, label: "Reckless & Insensitive", description: "Fleeing from pain at any cost. Shockingly callous about impact on others. Potentially dangerous behavior in pursuit of stimulation." },
    { level: 9, label: "Hysterical & Paralyzed", description: "Complete panic as reality closes in. Feeling trapped. Possible breakdown or flight into substances as the only way out." },
  ],
  8: [
    { level: 1, label: "Heroically Strong & Magnanimous", description: "Using strength to protect and empower others. Truly heroic, fighting for justice with no fear of personal cost. Magnanimous and big-hearted." },
    { level: 2, label: "Decisive & Authoritative", description: "Self-confident and strong. A natural leader who takes charge when needed. Protective of those under their care. Straight-talking and fair." },
    { level: 3, label: "Resourceful & Hardworking", description: "Energetic and self-reliant. Taking initiative and making things happen. Direct and decisive without being overbearing." },
    { level: 4, label: "Domineering & Confrontational", description: "Starting to push others around. Boastful about self-sufficiency. Needing to be in control and to prevail. Challenging authority." },
    { level: 5, label: "Combative & Expansive", description: "Openly combative and threatening. Attempting to dominate and control their environment. Using intimidation to get what they want." },
    { level: 6, label: "Intimidating & Ruthless", description: "Willing to use any means to stay on top. Ruthless in pursuit of their agenda. Threatening to those who challenge them." },
    { level: 7, label: "Destructive & Impulsive", description: "Believing they can do whatever they want. Antisocial behavior. Violating others' boundaries and rights without guilt." },
    { level: 8, label: "Sociopathic & Vengeful", description: "Becoming truly dangerous. Ruthless vengefulness against those who have crossed them. Using force without limits." },
    { level: 9, label: "Murderous Recklessness", description: "Total abandonment of restraint. The complete absence of humanity in how they treat others. Most extreme manifestation of the passion." },
  ],
  9: [
    { level: 1, label: "Serene & Receptive", description: "Profoundly at peace with themselves and the world. Able to bring genuine healing and comfort to others. Integrated and whole." },
    { level: 2, label: "Optimistic & Reassuring", description: "Genuinely accepting of others and themselves. Seeing the good in people. Creating harmony through real understanding, not avoidance." },
    { level: 3, label: "Stable & Supportive", description: "Easygoing and unpretentious. Emotionally steady. A healing presence. Patient and truly non-judgmental with others." },
    { level: 4, label: "Accommodating & Agreeable", description: "Becoming overly accommodating to avoid conflict. Giving up their own priorities to keep peace. Saying yes when they mean no." },
    { level: 5, label: "Passive & Disengaged", description: "Tuning out from problems. Becoming passive and stubborn. Refusing to engage with difficult issues. Numbing through routine." },
    { level: 6, label: "Resigned & Neglectful", description: "Retreating more deeply into autopilot. Neglecting themselves and their relationships. Going along to get along while resentment builds." },
    { level: 7, label: "Dissociative & Scattered", description: "Becoming deeply disconnected from their own identity and needs. Passive-aggressive resistance to demands. Scattered and unfocused." },
    { level: 8, label: "Depersonalized & Oblivious", description: "Barely present to their own life. Becoming numb and disoriented. Suppressing their identity entirely to avoid any form of conflict." },
    { level: 9, label: "Complete Dissociation", description: "Total withdrawal from self and world. Multiple dissociative states. Extreme depersonalization as the final result of total self-abandonment." },
  ],
};

const tabs = ["Overview", "Subtypes", "Levels", "Growth", "Deep Psychology"];

// ── Next assessment ladder ────────────────────────────────────────────────────
const NEXT_ASSESSMENT_LADDER = [
  {
    id: "self-id",
    label: "Self-Identification",
    desc: "Read all 9 types and recognize yourself. the expert-recommended method",
    href: "/assessments/self-id",
    points: "+15%",
    color: "#f59e0b",
  },
  {
    id: "essential-enneagram",
    label: "Essential Enneagram",
    desc: "Stanford paragraph method. choose the paragraph that fits your inner world",
    href: "/assessments/essential-enneagram",
    points: "+15%",
    color: "#a78bfa",
  },
  {
    id: "integrative",
    label: "Integrative Assessment",
    desc: "175-question Likert scale based on validated instruments",
    href: "/assessments/ieq9-integrative",
    points: "+20%",
    color: "#38bdf8",
  },
  {
    id: "deep",
    label: "Deep Assessment",
    desc: "iEQ9-inspired 144 questions. the most thorough self-report option",
    href: "/assessments/ieq9-integrative",
    points: "+25%",
    color: "#4ade80",
  },
];

function NextAssessmentPrompt({ taken }: { taken: string[] }) {
  const next = NEXT_ASSESSMENT_LADDER.find((a) => !taken.includes(a.id));
  if (!next) return null;

  return (
    <Link
      href={next.href}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ background: `${next.color}12`, border: `1px solid ${next.color}30` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
        style={{ background: `${next.color}22`, color: next.color }}
      >
        {next.points}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
          Increase confidence → {next.label}
        </p>
        <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
          {next.desc}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
    </Link>
  );
}

// ── Main inner component ──────────────────────────────────────────────────
function ResultsInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { profile, loaded, updateProfile } = useProfile();
  const [activeTab, setActiveTab] = useState(0);
  const [showTypeCard, setShowTypeCard] = useState(false);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [growthMode, setGrowthMode] = useState<"integration" | "disintegration">("integration");
  const [expandedDeepField, setExpandedDeepField] = useState<string | null>(null);

  const typeNum = parseInt(searchParams.get("type") ?? String(profile.enneagramType ?? "1"));
  const typeData = enneagramTypes.find((t) => t.number === typeNum);

  // Detect first-ever type discovery (profile had no type before this page loaded)
  // Must use useEffect. localStorage is not available during SSR
  const [isFirstDiscovery, setIsFirstDiscovery] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-profile");
      if (!raw) { setIsFirstDiscovery(true); return; }
      const p = JSON.parse(raw);
      setIsFirstDiscovery(!p.enneagramType || p.enneagramType === 0);
    } catch {
      setIsFirstDiscovery(false);
    }
  }, []);

  // iEQ9-style confidence and dual-type reporting
  const confidence = parseInt(searchParams.get("confidence") ?? "70");
  const showTwo = searchParams.get("showTwo") === "true";
  const secondTypeNum = parseInt(searchParams.get("secondType") ?? "0");
  const secondTypeData = secondTypeNum ? enneagramTypes.find((t) => t.number === secondTypeNum) : null;

  // Instinct variant result
  const dominantInstinct = searchParams.get("instinct") as "SP" | "SO" | "SX" | null;
  const instinctLabel: Record<string, string> = {
    SP: "Self-Preservation",
    SO: "Social",
    SX: "Sexual / One-to-One",
  };
  const instinctDesc: Record<string, string> = {
    SP: "Your dominant drive is toward physical safety, health, comfort, and material security.",
    SO: "Your dominant drive is toward belonging, status, and meaningful participation in groups and communities.",
    SX: "Your dominant drive is toward deep, intense one-to-one connection and experiences of aliveness.",
  };

  // Save to localStorage on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!typeData) return;
    updateProfile({
      enneagramType: typeNum,
      savedAt: new Date().toISOString(),
    });
    markTopicComplete("enneagram-basics");
    markTopicComplete("core-type");
  }, [typeNum]); // intentionally omitting updateProfile. it's stable

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0a1e" }}>
        <div className="text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.3)" }} />
          <p style={{ color: "rgba(255,255,255,0.5)" }}>No type found. <Link href="/enneagram/assess" className="text-sky-500 underline">Take the assessment</Link></p>
        </div>
      </div>
    );
  }

  const naranjo = naranjoFramework.find((n) => n.type === typeNum);
  const typeSubtypes = subtypes.filter((s) => s.type === typeNum);
  const levels = levelsOfDevelopment[typeNum] ?? [];
  const examples = famousExamples[typeNum] ?? [];
  const hornevian = hornevianGroups.find((g) => g.types.includes(typeNum));
  const harmonic = harmonicGroups.find((g) => g.types.includes(typeNum));
  const objectRel = objectRelationsGroups.find((g) => g.types.includes(typeNum));

  const intLine = enneagramTypes.find((t) => t.number === typeData.integrationLine);
  const disLine = enneagramTypes.find((t) => t.number === typeData.disintegrationLine);

  const healthyLevels = levels.slice(0, 3);
  const averageLevels = levels.slice(3, 6);
  const unhealthyLevels = levels.slice(6, 9);

  const traitBarWidth = (idx: number, total: number) => `${Math.round(((total - idx) / total) * 80 + 20)}%`;

  return (
    <div className="min-h-screen py-12" style={{ background: "#0f0a1e" }}>
      <TypeDiscoveryModal typeNum={typeNum} isFirstDiscovery={isFirstDiscovery} />
      <AnimatePresence>
        {showTypeCard && (
          <TikTokTypeCard
            enneagramType={typeNum}
            wing={profile.enneagramWing ?? undefined}
            instinct={dominantInstinct ?? profile.instinctualStacking ?? undefined}
            tritype={profile.tritype ?? undefined}
            mbtiType={profile.cognitiveType ?? profile.mbtiType ?? undefined}
            displayName={profile.displayName ?? undefined}
            onClose={() => setShowTypeCard(false)}
          />
        )}
      </AnimatePresence>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm mb-4 transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Hero Header */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="p-8 rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                    <Compass className="w-3 h-3" /> {showTwo ? "Top Matches (iEQ9)" : "Your Enneagram Result"}
                  </div>
                  {/* Confidence badge. tappable */}
                  <ConfidenceBadge confidenceOverride={confidence} />
                </div>

                {/* Primary type */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-5xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>{typeData.number}</span>
                  <div>
                    <h1 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>{typeData.name}</h1>
                    <p className="text-sm text-indigo-500 font-medium">{typeData.alias}</p>
                  </div>
                </div>
                <p className="max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{typeData.brief}</p>

                {/* Second type display when low confidence (iEQ9 reporting norm) */}
                {showTwo && secondTypeData && (
                  <div className="mt-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-xs font-mono text-amber-600 uppercase tracking-wider mb-2">
                      Also a strong match, read both
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.75)" }}>{secondTypeData.number}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{secondTypeData.name}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{secondTypeData.alias}</p>
                      </div>
                      <div className="ml-auto text-2xl">{secondTypeData.icon}</div>
                    </div>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Your scores for types {typeData.number} and {secondTypeData.number} are close. Per iEQ9 reporting
                      norms, both are considered valid candidates, read both descriptions and decide which resonates
                      more deeply at the level of motivation, not behavior.
                    </p>
                    <div className="flex gap-3 mt-4">
                      <Link href={`/enneagram/learn?type=${typeData.number}`}
                        className="flex-1 py-2.5 rounded-xl text-center text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                        Explore Type {typeData.number} →
                      </Link>
                      <Link href={`/enneagram/learn?type=${secondTypeData.number}`}
                        className="flex-1 py-2.5 rounded-xl text-center text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                        Explore Type {secondTypeData.number} →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Low confidence nudge */}
                {confidence < 65 && (
                  <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(245,158,11,0.9)" }}>
                      <strong>Confidence: {confidence}%</strong>. the quick test is just a starting point.
                      Tap the badge above to see which assessments will lock in your type.
                    </p>
                  </div>
                )}
              </div>
              <div className="text-4xl">{typeData.icon}</div>
            </div>

            {/* Instinct variant display */}
            {dominantInstinct && (
              <div className="mt-5 p-4 rounded-2xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-violet-600 uppercase tracking-wider">
                    Dominant Instinct
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-violet-100 text-violet-600">
                    {dominantInstinct}
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{instinctLabel[dominantInstinct]}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{instinctDesc[dominantInstinct]}</p>
              </div>
            )}

            {/* Wings quick display */}
            <div className="mt-5 flex gap-3 flex-wrap">
              <div className="px-4 py-2 rounded-xl text-xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
                <span className="font-medium text-indigo-400">Wing:</span> {typeData.wings.left}
              </div>
              <div className="px-4 py-2 rounded-xl text-xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
                <span className="font-medium text-indigo-400">Wing:</span> {typeData.wings.right}
              </div>
              <div className="px-4 py-2 rounded-xl text-xs" style={{ background: "rgba(91,143,208,0.12)", border: "1px solid rgba(91,143,208,0.3)", color: "rgba(255,255,255,0.55)" }}>
                <span className="font-medium" style={{ color: "#5B8FD0" }}>Growth →</span> Type {typeData.integrationLine}
              </div>
              <div className="px-4 py-2 rounded-xl text-xs" style={{ background: "rgba(201,146,26,0.12)", border: "1px solid rgba(201,146,26,0.3)", color: "rgba(255,255,255,0.55)" }}>
                <span className="font-medium" style={{ color: "#C9921A" }}>Stress →</span> Type {typeData.disintegrationLine}
              </div>
            </div>

            {/* Share CTA. TikTok / Instagram viral card */}
            <motion.div
              className="mt-6 rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid rgba(139,92,246,0.3)", background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(217,70,239,0.12))" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTypeCard(true)}
            >
              <div className="px-5 py-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #d946ef)", boxShadow: "0 4px 16px rgba(124,58,237,0.5)" }}>
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">Share to TikTok / Instagram</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Generate your type card · earn +15 tokens
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
              </div>
            </motion.div>

            <Link
              href="/compatibility"
              className="mt-3 rounded-2xl overflow-hidden flex items-center gap-4 px-5 py-4 transition-all"
              style={{ border: "1px solid rgba(233,30,140,0.3)", background: "linear-gradient(135deg, rgba(233,30,140,0.12), rgba(139,92,246,0.10))" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #E91E8C, #8b5cf6)", boxShadow: "0 4px 16px rgba(233,30,140,0.4)" }}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Compare with a friend</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  See how your types interact · discover compatibility
                </p>
              </div>
              <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
            </Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl mb-6 overflow-x-auto" style={{ background: "rgba(255,255,255,0.06)" }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className="flex-1 min-w-max px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={activeTab === i
                ? { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)" }
                : { color: "rgba(255,255,255,0.4)" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── TAB 1: OVERVIEW ──────────────────────────────────────── */}
          {activeTab === 0 && (
            <motion.div key="overview" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

              {/* ── Core Wound + What They're Really Doing ── */}
              {typeData.dropdownSections && (() => {
                const coreWound = typeData.dropdownSections.find(s => s.title === "The Core Wound");
                const reallyDoing = typeData.dropdownSections.find(s => s.title === "What They're Really Doing");
                if (!coreWound && !reallyDoing) return null;
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coreWound && (
                      <div className="p-6 rounded-2xl" style={{ background: "#0f0a1e", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 4px 24px rgba(139,92,246,0.12)" }}>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest mb-3 px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.18)", color: "#a78bfa", letterSpacing: "0.12em" }}>
                          Core Wound
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>{coreWound.content}</p>
                      </div>
                    )}
                    {reallyDoing && (
                      <div className="p-6 rounded-2xl" style={{ background: "#0f0a1e", border: "1px solid rgba(99,102,241,0.3)", boxShadow: "0 4px 24px rgba(99,102,241,0.12)" }}>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest mb-3 px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.18)", color: "#818cf8", letterSpacing: "0.12em" }}>
                          What They&apos;re Really Doing
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>{reallyDoing.content}</p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Core Triad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Core Fear</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>{typeData.coreFear}</p>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Core Desire</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>{typeData.coreDesire}</p>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">Core Motivation</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>{typeData.coreMotivation}</p>
                </div>
              </div>

              {/* Full description */}
              <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <BookOpen className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} /> Type Description
                </h3>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{typeData.description}</p>
              </div>

              {/* Key Traits Spectrum */}
              <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <Star className="w-4 h-4 text-amber-400" /> Key Traits
                </h3>
                <div className="space-y-3">
                  {typeData.keyTraits.map((trait, i) => (
                    <div key={trait}>
                      <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <span className="font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{trait}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: traitBarWidth(i, typeData.keyTraits.length) }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Famous Examples */}
              <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <User className="w-4 h-4 text-violet-400" /> Famous Examples
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {examples.map((ex) => (
                    <div key={ex.name} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                        {ex.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{ex.name}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{ex.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration / Disintegration Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl" style={{ background: "rgba(91,143,208,0.08)", border: "1px solid rgba(91,143,208,0.25)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4" style={{ color: "#5B8FD0" }} />
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#5B8FD0" }}>Integration (Growth)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold" style={{ color: "#5B8FD0" }}>{typeData.integrationLine}</span>
                    <span className="text-sm" style={{ color: "#5B8FD0" }}>{intLine?.name}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    In growth, Type {typeNum} takes on the healthy qualities of Type {typeData.integrationLine}: {intLine?.healthyTraits.slice(0, 3).join(", ")}.
                  </p>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: "rgba(201,146,26,0.08)", border: "1px solid rgba(201,146,26,0.25)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-4 h-4" style={{ color: "#C9921A" }} />
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#C9921A" }}>Disintegration (Stress)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold" style={{ color: "#C9921A" }}>{typeData.disintegrationLine}</span>
                    <span className="text-sm" style={{ color: "#C9921A" }}>{disLine?.name}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Under stress, Type {typeNum} takes on the average/unhealthy qualities of Type {typeData.disintegrationLine}: {disLine?.averageTraits.slice(0, 3).join(", ")}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: SUBTYPES ──────────────────────────────────────── */}
          {activeTab === 1 && (
            <motion.div key="subtypes" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="p-4 rounded-2xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(245,158,11,0.85)" }}>
                  <strong>Instinctual Subtypes</strong> are how your core type's energy is filtered through one of three biological instincts: Self-Preservation (SP), Sexual/One-to-One (SX), or Social (SO). The same Enneagram type can look dramatically different depending on which instinct is dominant.
                </p>
              </div>

              {/* Subtype selector */}
              <div className="flex gap-2">
                {(["sp", "sx", "so"] as const).map((inst) => {
                  const saved = profile.enneagramSubtype;
                  return (
                    <button
                      key={inst}
                      onClick={() => {
                        setSelectedSubtype(inst);
                        updateProfile({ enneagramSubtype: inst });
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border"
                      style={(selectedSubtype ?? saved) === inst
                        ? { background: "rgb(14,165,233)", color: "white", borderColor: "rgb(14,165,233)" }
                        : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                      }
                    >
                      {inst === "sp" ? "Self-Pres" : inst === "sx" ? "Sexual" : "Social"}
                    </button>
                  );
                })}
              </div>

              {typeSubtypes.map((sub) => {
                const isExpanded = expandedSubtype === sub.name;
                const isSelected = (selectedSubtype ?? profile.enneagramSubtype) === sub.instinct;
                return (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl transition-all overflow-hidden"
                    style={isSelected
                      ? { border: "1px solid rgb(125,211,252)", boxShadow: "0 4px 16px rgba(14,165,233,0.2)" }
                      : { border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    <button
                      onClick={() => setExpandedSubtype(isExpanded ? null : sub.name)}
                      className="w-full text-left p-5 transition" style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                              sub.instinct === "sp" ? "bg-amber-100 text-amber-700" :
                              sub.instinct === "sx" ? "bg-rose-100 text-rose-700" :
                              "bg-sky-100 text-sky-700"
                            }`}>
                              {sub.instinct.toUpperCase()}
                            </span>
                            {sub.isCountertype && (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-violet-100 text-violet-600">
                                Countertype
                              </span>
                            )}
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-sky-500" />
                            )}
                          </div>
                          <h3 className="font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>{sub.name}</h3>
                          <p className="text-xs text-indigo-400 font-medium">{sub.chestnutName}</p>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 mt-1" style={{ color: "rgba(255,255,255,0.3)" }} /> : <ChevronDown className="w-4 h-4 shrink-0 mt-1" style={{ color: "rgba(255,255,255,0.3)" }} />}
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
                          <div className="px-5 pb-5 space-y-4" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <p className="text-sm leading-relaxed pt-4" style={{ color: "rgba(255,255,255,0.6)" }}>{sub.description}</p>

                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "rgba(255,255,255,0.75)" }}>Key Patterns</h4>
                              <ul className="space-y-1.5">
                                {sub.keyPatterns.map((p) => (
                                  <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                              <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>How they differ</p>
                              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{sub.howTheyDiffer}</p>
                            </div>

                            <div className="p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                              <p className="text-xs font-semibold text-emerald-600 mb-1">Growth Path</p>
                              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{sub.growthPath}</p>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedSubtype(sub.instinct);
                                updateProfile({ enneagramSubtype: sub.instinct, instinctualStacking: sub.instinct });
                              }}
                              className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                              style={(selectedSubtype ?? profile.enneagramSubtype) === sub.instinct
                                ? { background: "rgba(14,165,233,0.15)", color: "rgba(14,165,233,0.9)", border: "1px solid rgba(14,165,233,0.3)" }
                                : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.88)" }
                              }
                            >
                              {(selectedSubtype ?? profile.enneagramSubtype) === sub.instinct ? "✓ This is my subtype" : "Select as my subtype"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ── TAB 3: LEVELS ────────────────────────────────────────── */}
          {activeTab === 2 && (
            <motion.div key="levels" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="p-4 rounded-2xl" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}>
                <p className="text-xs text-sky-400 leading-relaxed">
                  <strong>Levels of Development</strong> (Riso-Hudson) describe the spectrum from psychological health to dysfunction within your type. Click any level to learn more.
                </p>
              </div>

              {/* Healthy Band */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Healthy, Levels 1-3</span>
                </div>
                <div className="space-y-2">
                  {healthyLevels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => setSelectedLevel(selectedLevel === lvl.level ? null : lvl.level)}
                      className="w-full text-left p-4 rounded-xl transition-all"
                      style={selectedLevel === lvl.level
                        ? { background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                          <span className="font-medium text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{lvl.label}</span>
                        </div>
                        {selectedLevel === lvl.level ? <ChevronUp className="w-4 h-4 text-emerald-500" /> : <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />}
                      </div>
                      <AnimatePresence>
                        {selectedLevel === lvl.level && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm mt-3 leading-relaxed overflow-hidden"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            {lvl.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>

              {/* Average Band */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Average, Levels 4-6</span>
                </div>
                <div className="space-y-2">
                  {averageLevels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => setSelectedLevel(selectedLevel === lvl.level ? null : lvl.level)}
                      className="w-full text-left p-4 rounded-xl transition-all"
                      style={selectedLevel === lvl.level
                        ? { background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                          <span className="font-medium text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{lvl.label}</span>
                        </div>
                        {selectedLevel === lvl.level ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />}
                      </div>
                      <AnimatePresence>
                        {selectedLevel === lvl.level && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm mt-3 leading-relaxed overflow-hidden"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            {lvl.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>

              {/* Unhealthy Band */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Unhealthy, Levels 7-9</span>
                </div>
                <div className="space-y-2">
                  {unhealthyLevels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => setSelectedLevel(selectedLevel === lvl.level ? null : lvl.level)}
                      className="w-full text-left p-4 rounded-xl transition-all"
                      style={selectedLevel === lvl.level
                        ? { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                          <span className="font-medium text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{lvl.label}</span>
                        </div>
                        {selectedLevel === lvl.level ? <ChevronUp className="w-4 h-4 text-rose-500" /> : <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />}
                      </div>
                      <AnimatePresence>
                        {selectedLevel === lvl.level && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm mt-3 leading-relaxed overflow-hidden"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            {lvl.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl text-xs leading-relaxed" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "rgba(99,102,241,0.9)" }}>
                <strong>Note:</strong> Most people oscillate between Levels 4-6 in daily life. Levels 1-3 represent genuine psychological growth and are accessed through sustained inner work, not just good circumstances.
              </div>
            </motion.div>
          )}

          {/* ── TAB 4: GROWTH ────────────────────────────────────────── */}
          {activeTab === 3 && (
            <motion.div key="growth" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

              {/* Integration / Disintegration toggle */}
              <div className="flex gap-2 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                <button
                  onClick={() => setGrowthMode("integration")}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={growthMode === "integration"
                    ? { background: "#5B8FD0", color: "white" }
                    : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  Integration (Growth)
                </button>
                <button
                  onClick={() => setGrowthMode("disintegration")}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={growthMode === "disintegration"
                    ? { background: "#C9921A", color: "white" }
                    : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  Disintegration (Stress)
                </button>
              </div>

              <AnimatePresence mode="wait">
                {growthMode === "integration" ? (
                  <motion.div key="int" initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                    <div className="p-6 rounded-2xl" style={{ background: "rgba(91,143,208,0.08)", border: "1px solid rgba(91,143,208,0.25)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5" style={{ color: "#5B8FD0" }} />
                        <h3 className="font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>Growing Toward Type {typeData.integrationLine}</h3>
                      </div>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                        In genuine growth, Type {typeNum} begins to embody the healthy qualities of Type {typeData.integrationLine}: {intLine?.healthyTraits.join(", ")}. This isn&apos;t mimicry, it&apos;s the natural expansion that happens when you&apos;re no longer run by your type&apos;s core fear.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {intLine?.healthyTraits.map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(91,143,208,0.15)", color: "#5B8FD0" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="dis" initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                    <div className="p-6 rounded-2xl" style={{ background: "rgba(201,146,26,0.08)", border: "1px solid rgba(201,146,26,0.25)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5" style={{ color: "#C9921A" }} />
                        <h3 className="font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>Stress Pattern: Toward Type {typeData.disintegrationLine}</h3>
                      </div>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                        Under sustained stress, Type {typeNum} can take on the average or unhealthy qualities of Type {typeData.disintegrationLine}: {disLine?.averageTraits.slice(0, 4).join(", ")}. Recognizing this pattern is the first step in interrupting it.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {disLine?.averageTraits.map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(201,146,26,0.15)", color: "#C9921A" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Growth Tips */}
              <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <Sparkles className="w-4 h-4 text-amber-400" /> Growth Practices for Type {typeNum}
                </h3>
                <div className="space-y-3">
                  {typeData.growthTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journal Prompts */}
              <div className="p-6 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <BookOpen className="w-4 h-4 text-violet-500" /> Journal Prompts
                </h3>
                <div className="space-y-3">
                  {typeData.journalPrompts.map((prompt, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
                      <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.75)" }}>"{prompt}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 5: DEEP PSYCHOLOGY ───────────────────────────────── */}
          {activeTab === 4 && (
            <motion.div key="deep" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

              {naranjo && (
                <>
                  {/* Naranjo Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Passion */}
                    <div className="p-5 rounded-2xl col-span-2 sm:col-span-1" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1">Passion (Vice)</div>
                      <div className="text-lg font-bold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{naranjo.passion}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{naranjo.passionDescription}</p>
                      <button
                        onClick={() => setExpandedDeepField(expandedDeepField === "passion" ? null : "passion")}
                        className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-rose-500 uppercase tracking-wider"
                      >
                        {expandedDeepField === "passion" ? "Less" : "Learn more"}
                        <ChevronDown className="w-3 h-3" style={{ transform: expandedDeepField === "passion" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      <AnimatePresence>
                        {expandedDeepField === "passion" && (
                          <motion.div
                            key="passion-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                              Original Ichazo term: {naranjo.passion.split(",")[0].split("-")[0].trim()}. In integration (growth), this passion transforms into the type's virtue through self-awareness. The passion is not a flaw but an excess of a quality. it becomes the gift when balanced.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Fixation */}
                    <div className="p-5 rounded-2xl col-span-2 sm:col-span-1" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Fixation (Cognitive Habit)</div>
                      <div className="text-lg font-bold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{naranjo.fixation}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{naranjo.fixationDescription}</p>
                      <button
                        onClick={() => setExpandedDeepField(expandedDeepField === "fixation" ? null : "fixation")}
                        className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-amber-500 uppercase tracking-wider"
                      >
                        {expandedDeepField === "fixation" ? "Less" : "Learn more"}
                        <ChevronDown className="w-3 h-3" style={{ transform: expandedDeepField === "fixation" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      <AnimatePresence>
                        {expandedDeepField === "fixation" && (
                          <motion.div
                            key="fixation-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                              The cognitive habit that keeps the passion in place. Where the passion is felt in the body-emotion, the fixation is the mental story that reinforces it. (Naranjo, <em>Character &amp; Neurosis</em>)
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Virtue */}
                    <div className="p-5 rounded-2xl col-span-2 sm:col-span-1" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Virtue (Transformed Quality)</div>
                      <div className="text-lg font-bold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{naranjo.virtue}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{naranjo.virtueDescription}</p>
                      <button
                        onClick={() => setExpandedDeepField(expandedDeepField === "virtue" ? null : "virtue")}
                        className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-emerald-500 uppercase tracking-wider"
                      >
                        {expandedDeepField === "virtue" ? "Less" : "Learn more"}
                        <ChevronDown className="w-3 h-3" style={{ transform: expandedDeepField === "virtue" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      <AnimatePresence>
                        {expandedDeepField === "virtue" && (
                          <motion.div
                            key="virtue-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                              Emerges naturally when the passion is no longer compulsive. The virtue is not a practice or discipline. it is what's revealed underneath. (Naranjo / Riso &amp; Hudson)
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Holy Idea */}
                    <div className="p-5 rounded-2xl col-span-2 sm:col-span-1" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}>
                      <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">Holy Idea (Ichazo)</div>
                      <div className="text-lg font-bold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{naranjo.holyIdea}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{naranjo.holyIdeaDescription}</p>
                      <button
                        onClick={() => setExpandedDeepField(expandedDeepField === "holyIdea" ? null : "holyIdea")}
                        className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-sky-500 uppercase tracking-wider"
                      >
                        {expandedDeepField === "holyIdea" ? "Less" : "Learn more"}
                        <ChevronDown className="w-3 h-3" style={{ transform: expandedDeepField === "holyIdea" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      <AnimatePresence>
                        {expandedDeepField === "holyIdea" && (
                          <motion.div
                            key="holyIdea-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                              The higher cognitive perception that dissolves the fixation. Holy Ideas are not beliefs to adopt. they are experienced directly when the fixation relaxes. (Ichazo, Arica School)
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Trap & Defense */}
                  <div className="space-y-3">
                    {/* Trap */}
                    <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>The Trap</div>
                      <div className="text-base font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{naranjo.trap}</div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{naranjo.trapDescription}</p>
                      <button
                        onClick={() => setExpandedDeepField(expandedDeepField === "trap" ? null : "trap")}
                        className="mt-3 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {expandedDeepField === "trap" ? "Less" : "Learn more"}
                        <ChevronDown className="w-3 h-3" style={{ transform: expandedDeepField === "trap" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      <AnimatePresence>
                        {expandedDeepField === "trap" && (
                          <motion.div
                            key="trap-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                              The trap is the type's attempt to satisfy their core desire using the same strategies that created their suffering. (Naranjo)
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Defense Mechanism */}
                    <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Defense Mechanism</div>
                      <div className="text-base font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)" }}>{naranjo.defenseM}</div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{naranjo.defenseMDescription}</p>
                      <button
                        onClick={() => setExpandedDeepField(expandedDeepField === "defenseM" ? null : "defenseM")}
                        className="mt-3 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {expandedDeepField === "defenseM" ? "Less" : "Learn more"}
                        <ChevronDown className="w-3 h-3" style={{ transform: expandedDeepField === "defenseM" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      <AnimatePresence>
                        {expandedDeepField === "defenseM" && (
                          <motion.div
                            key="defenseM-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                              Psychological defense mechanisms were mapped to Enneagram types by Riso &amp; Hudson in <em>The Wisdom of the Enneagram</em> (1999). The mechanism is unconscious and automatic. it protects the ego but maintains the pattern.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </>
              )}

              {/* Hornevian / Harmonic / Object Relations */}
              <div className="space-y-3">
                {hornevian && (
                  <div className="p-5 rounded-2xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Hornevian Group</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: "rgba(255,255,255,0.88)" }}>{hornevian.name}</div>
                    <p className="text-xs mb-2 italic" style={{ color: "rgba(255,255,255,0.4)" }}>{hornevian.strategy}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{hornevian.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {hornevian.types.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${t === typeNum ? "bg-indigo-200 text-indigo-800" : ""}`}
                          style={t === typeNum ? {} : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                          Type {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {harmonic && (
                  <div className="p-5 rounded-2xl" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <GitMerge className="w-4 h-4 text-violet-500" />
                      <span className="text-xs font-bold text-violet-400 uppercase tracking-wide">Harmonic Group</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: "rgba(255,255,255,0.88)" }}>{harmonic.name}</div>
                    <p className="text-xs mb-2 italic" style={{ color: "rgba(255,255,255,0.4)" }}>{harmonic.response}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{harmonic.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {harmonic.types.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${t === typeNum ? "bg-violet-200 text-violet-800" : ""}`}
                          style={t === typeNum ? {} : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                          Type {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {objectRel && (
                  <div className="p-5 rounded-2xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">Object Relations Group</span>
                    </div>
                    <div className="font-semibold mb-1" style={{ color: "rgba(255,255,255,0.88)" }}>{objectRel.name}</div>
                    <p className="text-xs mb-2 italic" style={{ color: "rgba(255,255,255,0.4)" }}>{objectRel.relationship}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{objectRel.description}</p>
                    <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{objectRel.psychodynamics}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {objectRel.types.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${t === typeNum ? "bg-rose-200 text-rose-800" : ""}`}
                          style={t === typeNum ? {} : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                          Type {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Next Assessment Prompt */}
              <NextAssessmentPrompt taken={profile.assessmentsTaken ?? []} />

              {/* CTA */}
              <div className="pt-2">
                <Link href="/daily" className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:shadow-lg transition-all">
                  <div>
                    <div className="font-semibold">Apply this to daily practice</div>
                    <div className="text-xs text-sky-100 mt-0.5">Get type-personalized insights every day</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Guided Journey */}
              <GuidedJourney source="enneagram" />

              <NextStepBanner
                href="/enneagram/learn"
                label="Learn about your type in depth"
                sublabel="Explore detailed type descriptions, growth paths, and integration lines"
                icon={<Compass className="w-5 h-5" />}
                color="#0ea5e9"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Page wrapper with Suspense ────────────────────────────────────────────
export default function EnneagramResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-800 border-t-violet-400 animate-spin" />
      </div>
    }>
      <ResultsInner />
    </Suspense>
  );
}
