"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight,
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
import BeginnerBanner from "@/components/BeginnerBanner";

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
    { level: 8, label: "Obsessive & Punitive", description: "Severe and punishing — to themselves and others. Breakdowns of self-control in the very areas they've judged others." },
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
    { level: 1, label: "Authentic & Self-Accepting", description: "Genuinely outstanding — inspirational to others. A living example that success and integrity are compatible. Authentic, inner-directed, and deeply real." },
    { level: 2, label: "Self-Assured & Admirable", description: "Highly adaptable, energetic, and ambitious. Competent and effective in everything they undertake. Genuinely impressive and worth admiring." },
    { level: 3, label: "Goal-Oriented & Efficient", description: "Extremely industrious and productive. Focused on goals, making things happen. A reliable team leader who inspires confidence in others." },
    { level: 4, label: "Status-Conscious & Competitive", description: "Becoming highly concerned with performance and image. Comparing themselves to others. Needing to demonstrate their superiority." },
    { level: 5, label: "Calculating & Image-Oriented", description: "Willing to cut corners to maintain image. Everything becomes performance. Starting to believe their own persona. Deep fear of failure." },
    { level: 6, label: "Deceptive & Opportunistic", description: "Becoming deliberately deceptive. Saying whatever is needed to get ahead. Exploiting others while maintaining charming exterior." },
    { level: 7, label: "Unprincipled & Devious", description: "Willing to do anything to succeed. Betrayal of others for personal gain. Sabotaging competitors." },
    { level: 8, label: "Jealous & Malicious", description: "Terrified of being exposed as a fraud. Vindictive and cruel toward those who see through them." },
    { level: 9, label: "Psychopathic Betrayal", description: "Complete loss of morality in service of image. Profound self-alienation — no longer knowing who they are beneath the persona." },
  ],
  4: [
    { level: 1, label: "Inspired & Deeply Creative", description: "Renewing themselves through creative expression. Profoundly individualistic — transforming personal pain into universal art. Emotionally honest and courageous." },
    { level: 2, label: "Introspective & Sensitive", description: "Highly perceptive and self-aware. Creating beauty from personal experience. Deeply feeling and empathetic — seeing into the hearts of others." },
    { level: 3, label: "Emotionally Authentic", description: "Finding the universal in the personal. Creating from genuine emotional truth. Witty, aesthetically refined, and gentle." },
    { level: 4, label: "Romanticizing & Self-Pitying", description: "Beginning to exaggerate emotional responses. Feeling misunderstood and different. Withdrawing from others. Longing for the beautiful or ideal." },
    { level: 5, label: "Self-Indulgent & Withdrawn", description: "Consumed by moods and feelings. Becoming self-absorbed. Unable or unwilling to function normally. Using aesthetic experience as escape." },
    { level: 6, label: "Melancholic & Inhibited", description: "Feeling that nothing compares to the inner ideal. Becoming hopeless about self and future. Envious of others' apparent happiness." },
    { level: 7, label: "Self-Contemptuous & Alienated", description: "Feeling fundamentally flawed and beyond help. Cutting off from others. Contemptuous of those who seem less sensitive or authentic." },
    { level: 8, label: "Depressed & Despairing", description: "Severe depression and self-hatred. Feeling too damaged to be helped. Seeing the world through a lens of absolute hopelessness." },
    { level: 9, label: "Self-Destructive & Despairing", description: "Complete emotional breakdown. Possibly engaging in self-destructive behavior as a form of control over feelings. Clinical crisis." },
  ],
  5: [
    { level: 1, label: "Visionary & Pioneering", description: "A true visionary — contributing genuinely revolutionary insights. Able to synthesize vast amounts of information into profound understanding." },
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
    { level: 1, label: "Courageous & Self-Affirming", description: "Profoundly courageous — acting on inner truth despite fear. Deeply loyal and self-affirming. Able to bring a group together through genuine commitment." },
    { level: 2, label: "Engaging & Reliable", description: "Warm, engaging, and reliable. Deeply committed to people and causes. Balancing personal security needs with genuine trust of others." },
    { level: 3, label: "Responsible & Hardworking", description: "Committed, responsible, and trustworthy. Creating safety through competence and preparation. Building loyal relationships and solid communities." },
    { level: 4, label: "Dutiful & Dependent", description: "Becoming more dependent on outside authority. Needing clear guidelines and rules. Anxiety when facing ambiguity or having to act independently." },
    { level: 5, label: "Suspicious & Doubtful", description: "Beginning to mistrust their own judgment. Seeking reassurance but not believing it. Seeing potential threats everywhere. Difficulty committing." },
    { level: 6, label: "Defensive & Anxious", description: "Feeling persecuted and besieged. Overreacting to perceived threats. Either over-compliant or rebelliously counterdependent." },
    { level: 7, label: "Paranoid & Blaming", description: "Seeing dangerous forces everywhere. Paranoid projection — attributing their own fears to others. Becoming accusatory and hostile." },
    { level: 8, label: "Masochistic & Self-Defeating", description: "Feeling helpless and trapped. Clinging to sources of security that further undermine them. Panicking and making decisions that create the feared outcomes." },
    { level: 9, label: "Self-Abasing & Crises", description: "Complete loss of trust in self and world. Breakdown of ego — profound identity crisis." },
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
    { level: 1, label: "Heroically Strong & Magnanimous", description: "Using strength to protect and empower others. Truly heroic — fighting for justice with no fear of personal cost. Magnanimous and big-hearted." },
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

// ── Main inner component ──────────────────────────────────────────────────
function ResultsInner() {
  const searchParams = useSearchParams();
  const { profile, loaded, updateProfile } = useProfile();
  const [activeTab, setActiveTab] = useState(0);

  // Auto-open Subtypes tab when arriving from self-ID flow
  useEffect(() => {
    if (searchParams.get("confidence") === "self-id") setActiveTab(1);
  }, [searchParams]);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [growthMode, setGrowthMode] = useState<"integration" | "disintegration">("integration");

  const typeNum = parseInt(searchParams.get("type") ?? String(profile.enneagramType ?? "1"));
  const typeData = enneagramTypes.find((t) => t.number === typeNum);

  // iEQ9-style confidence and dual-type reporting
  const confidenceParam = searchParams.get("confidence") ?? "70";
  const isSelfId = confidenceParam === "self-id";
  const confidence = isSelfId ? 100 : (parseInt(confidenceParam) || 70);
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
  useEffect(() => {
    if (!typeData) return;
    updateProfile({
      enneagramType: typeNum,
      savedAt: new Date().toISOString(),
    });
    // Mark learning path progress
    markTopicComplete("enneagram-basics");
    markTopicComplete("core-type");
  }, [typeNum]);

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No type found. <Link href="/enneagram/assess" className="text-sky-500 underline">Take the assessment</Link></p>
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
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 border border-indigo-100">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-indigo-100 text-indigo-600 text-xs font-medium">
                    <Compass className="w-3 h-3" /> {showTwo ? "Top Matches (iEQ9)" : "Your Enneagram Result"}
                  </div>
                  {/* Confidence badge */}
                  {isSelfId ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-violet-50 border-violet-100 text-violet-600 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      Self-Identified
                    </div>
                  ) : (
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
                      confidence >= 60
                        ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                        : confidence >= 35
                        ? "bg-amber-50 border-amber-100 text-amber-600"
                        : "bg-rose-50 border-rose-100 text-rose-500"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      {confidence >= 60 ? "High confidence" : confidence >= 35 ? "Moderate confidence" : "Low confidence"} · {confidence}%
                    </div>
                  )}
                </div>

                {/* Primary type */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-5xl font-serif font-bold text-slate-900">{typeData.number}</span>
                  <div>
                    <h1 className="text-2xl font-serif font-bold text-slate-900">{typeData.name}</h1>
                    <p className="text-sm text-indigo-500 font-medium">{typeData.alias}</p>
                  </div>
                </div>
                <p className="text-slate-600 max-w-lg leading-relaxed">{typeData.brief}</p>

                {/* Second type display when low confidence (iEQ9 reporting norm) */}
                {showTwo && secondTypeData && (
                  <div className="mt-4 p-4 rounded-2xl bg-white/60 border border-indigo-100">
                    <p className="text-xs font-mono text-amber-600 uppercase tracking-wider mb-2">
                      Also a strong match — read both
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-serif font-bold text-slate-700">{secondTypeData.number}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{secondTypeData.name}</p>
                        <p className="text-xs text-slate-500">{secondTypeData.alias}</p>
                      </div>
                      <div className="ml-auto text-2xl">{secondTypeData.icon}</div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Your scores for types {typeData.number} and {secondTypeData.number} are close. Per iEQ9 reporting
                      norms, both are considered valid candidates — read both descriptions and decide which resonates
                      more deeply at the level of motivation, not behavior.
                    </p>
                  </div>
                )}

                {/* Low confidence nudge (even if not showing two types) */}
                {!showTwo && confidence < 50 && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Your confidence score is moderate. Consider taking the deeper assessment or reviewing
                      the type descriptions for your top 2 results before deciding.
                    </p>
                  </div>
                )}
              </div>
              <div className="text-4xl">{typeData.icon}</div>
            </div>

            {/* Instinct variant display */}
            {dominantInstinct && (
              <div className="mt-5 p-4 rounded-2xl bg-white/60 border border-violet-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-violet-600 uppercase tracking-wider">
                    Dominant Instinct
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-violet-100 text-violet-600">
                    {dominantInstinct}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800">{instinctLabel[dominantInstinct]}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{instinctDesc[dominantInstinct]}</p>
              </div>
            )}

            {/* Wings quick display */}
            <div className="mt-5 flex gap-3 flex-wrap">
              <div className="px-4 py-2 rounded-xl bg-white/70 border border-indigo-100 text-xs text-slate-600">
                <span className="font-medium text-indigo-600">Wing:</span> {typeData.wings.left}
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/70 border border-indigo-100 text-xs text-slate-600">
                <span className="font-medium text-indigo-600">Wing:</span> {typeData.wings.right}
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/70 border border-emerald-100 text-xs text-slate-600">
                <span className="font-medium text-emerald-600">Growth →</span> Type {typeData.integrationLine}
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/70 border border-rose-100 text-xs text-slate-600">
                <span className="font-medium text-rose-500">Stress →</span> Type {typeData.disintegrationLine}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl mb-6 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 min-w-max px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === i ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── TAB 1: OVERVIEW ──────────────────────────────────────── */}
          {activeTab === 0 && (
            <motion.div key="overview" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

              {/* Core Triad */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Core Fear</span>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed">{typeData.coreFear}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Core Desire</span>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed">{typeData.coreDesire}</p>
                </div>
                <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">Core Motivation</span>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed">{typeData.coreMotivation}</p>
                </div>
              </div>

              {/* Full description */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" /> Type Description
                </h3>
                <p className="text-slate-600 leading-relaxed">{typeData.description}</p>
              </div>

              {/* Key Traits Spectrum */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" /> Key Traits
                </h3>
                <div className="space-y-3">
                  {typeData.keyTraits.map((trait, i) => (
                    <div key={trait}>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span className="font-medium text-slate-700">{trait}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
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
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-violet-400" /> Famous Examples
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {examples.map((ex) => (
                    <div key={ex.name} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                        {ex.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{ex.name}</div>
                        <div className="text-xs text-slate-400">{ex.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration / Disintegration Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Integration (Growth)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-emerald-700">{typeData.integrationLine}</span>
                    <span className="text-sm text-emerald-700">{intLine?.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In growth, Type {typeNum} takes on the healthy qualities of Type {typeData.integrationLine}: {intLine?.healthyTraits.slice(0, 3).join(", ")}.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Disintegration (Stress)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-rose-700">{typeData.disintegrationLine}</span>
                    <span className="text-sm text-rose-700">{disLine?.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under stress, Type {typeNum} takes on the average/unhealthy qualities of Type {typeData.disintegrationLine}: {disLine?.averageTraits.slice(0, 3).join(", ")}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: SUBTYPES ──────────────────────────────────────── */}
          {activeTab === 1 && (
            <motion.div key="subtypes" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

              {/* Beginner guidance banner */}
              <BeginnerBanner
                dismissKey="results-subtypes"
                message="Now pick your subtype — this tells the app how your type expresses itself. Read all three descriptions below and tap the one that feels most true to you."
                primaryLabel="Confirm with an assessment"
                primaryHref="/assessments"
                secondaryLabel="Go to Profile"
                secondaryHref="/profile"
              />

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-xs text-amber-700 leading-relaxed">
                  <strong>Instinctual Subtypes</strong> are how your core type's energy is filtered through one of three biological instincts: Self-Preservation (SP), Sexual/One-to-One (SX), or Social (SO). The same Enneagram type can look dramatically different depending on which instinct is dominant.
                </p>
              </div>

              {/* How to identify your subtype */}
              <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">How to identify your subtype</p>
                <div className="space-y-2.5">
                  {[
                    { label: "SP — Self-Preservation", q: "Do you often think about health, money, comfort, safety, or having enough? Is your energy mostly focused on taking care of yourself and your immediate environment?", color: "text-amber-700 bg-amber-50" },
                    { label: "SX — Sexual / One-to-One", q: "Are you drawn to intensity, chemistry, and deep one-on-one connection? Do you tend to be all-or-nothing with people and experiences?", color: "text-rose-700 bg-rose-50" },
                    { label: "SO — Social", q: "Are you aware of where you stand in groups, relationships, and society? Do you care about belonging, roles, and how you come across to others?", color: "text-sky-700 bg-sky-50" },
                  ].map(({ label, q, color }) => (
                    <div key={label} className={`p-3 rounded-xl ${color}`}>
                      <p className="text-xs font-semibold mb-1">{label}</p>
                      <p className="text-xs leading-relaxed opacity-80">{q}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">Tip: the instinct that runs most of your daily concerns — even if you dislike it — is likely your dominant one.</p>
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
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                        (selectedSubtype ?? saved) === inst
                          ? "bg-sky-500 text-white border-sky-500 shadow-md"
                          : "bg-white text-slate-500 border-slate-200 hover:border-sky-200"
                      }`}
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
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isSelected ? "border-sky-300 shadow-md" : "border-slate-100"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedSubtype(isExpanded ? null : sub.name)}
                      className="w-full text-left p-5 bg-white hover:bg-slate-50 transition"
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
                          <h3 className="font-semibold text-slate-800">{sub.name}</h3>
                          <p className="text-xs text-indigo-500 font-medium">{sub.chestnutName}</p>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />}
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
                          <div className="px-5 pb-5 bg-white space-y-4 border-t border-slate-50">
                            <p className="text-slate-600 text-sm leading-relaxed pt-4">{sub.description}</p>

                            <div>
                              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Key Patterns</h4>
                              <ul className="space-y-1.5">
                                {sub.keyPatterns.map((p) => (
                                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                              <p className="text-xs font-semibold text-slate-600 mb-1">How they differ</p>
                              <p className="text-xs text-slate-500 leading-relaxed">{sub.howTheyDiffer}</p>
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                              <p className="text-xs font-semibold text-emerald-700 mb-1">Growth Path</p>
                              <p className="text-xs text-slate-600 leading-relaxed">{sub.growthPath}</p>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedSubtype(sub.instinct);
                                updateProfile({ enneagramSubtype: sub.instinct, instinctualStacking: sub.instinct });
                              }}
                              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                                (selectedSubtype ?? profile.enneagramSubtype) === sub.instinct
                                  ? "bg-sky-100 text-sky-700 border border-sky-200"
                                  : "bg-slate-800 text-white hover:bg-slate-700"
                              }`}
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
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <p className="text-xs text-sky-700 leading-relaxed">
                  <strong>Levels of Development</strong> (Riso-Hudson) describe the spectrum from psychological health to dysfunction within your type. Click any level to learn more.
                </p>
              </div>

              {/* Healthy Band */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Healthy — Levels 1-3</span>
                </div>
                <div className="space-y-2">
                  {healthyLevels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => setSelectedLevel(selectedLevel === lvl.level ? null : lvl.level)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedLevel === lvl.level
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-slate-100 bg-white hover:border-emerald-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                          <span className="font-medium text-slate-800 text-sm">{lvl.label}</span>
                        </div>
                        {selectedLevel === lvl.level ? <ChevronUp className="w-4 h-4 text-emerald-500" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                      </div>
                      <AnimatePresence>
                        {selectedLevel === lvl.level && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-slate-600 mt-3 leading-relaxed overflow-hidden"
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
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Average — Levels 4-6</span>
                </div>
                <div className="space-y-2">
                  {averageLevels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => setSelectedLevel(selectedLevel === lvl.level ? null : lvl.level)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedLevel === lvl.level
                          ? "border-amber-300 bg-amber-50"
                          : "border-slate-100 bg-white hover:border-amber-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                          <span className="font-medium text-slate-800 text-sm">{lvl.label}</span>
                        </div>
                        {selectedLevel === lvl.level ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                      </div>
                      <AnimatePresence>
                        {selectedLevel === lvl.level && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-slate-600 mt-3 leading-relaxed overflow-hidden"
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
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Unhealthy — Levels 7-9</span>
                </div>
                <div className="space-y-2">
                  {unhealthyLevels.map((lvl) => (
                    <button
                      key={lvl.level}
                      onClick={() => setSelectedLevel(selectedLevel === lvl.level ? null : lvl.level)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedLevel === lvl.level
                          ? "border-rose-300 bg-rose-50"
                          : "border-slate-100 bg-white hover:border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                          <span className="font-medium text-slate-800 text-sm">{lvl.label}</span>
                        </div>
                        {selectedLevel === lvl.level ? <ChevronUp className="w-4 h-4 text-rose-500" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                      </div>
                      <AnimatePresence>
                        {selectedLevel === lvl.level && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-slate-600 mt-3 leading-relaxed overflow-hidden"
                          >
                            {lvl.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 leading-relaxed">
                <strong>Note:</strong> Most people oscillate between Levels 4-6 in daily life. Levels 1-3 represent genuine psychological growth and are accessed through sustained inner work, not just good circumstances.
              </div>
            </motion.div>
          )}

          {/* ── TAB 4: GROWTH ────────────────────────────────────────── */}
          {activeTab === 3 && (
            <motion.div key="growth" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

              {/* Integration / Disintegration toggle */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setGrowthMode("integration")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    growthMode === "integration" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500"
                  }`}
                >
                  Integration (Growth)
                </button>
                <button
                  onClick={() => setGrowthMode("disintegration")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    growthMode === "disintegration" ? "bg-rose-500 text-white shadow-sm" : "text-slate-500"
                  }`}
                >
                  Disintegration (Stress)
                </button>
              </div>

              <AnimatePresence mode="wait">
                {growthMode === "integration" ? (
                  <motion.div key="int" initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-semibold text-slate-800">Growing Toward Type {typeData.integrationLine}</h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        In genuine growth, Type {typeNum} begins to embody the healthy qualities of Type {typeData.integrationLine}: {intLine?.healthyTraits.join(", ")}. This isn't mimicry — it's the natural expansion that happens when you're no longer run by your type's core fear.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {intLine?.healthyTraits.map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="dis" initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                    <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-rose-500" />
                        <h3 className="font-semibold text-slate-800">Stress Pattern: Toward Type {typeData.disintegrationLine}</h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Under sustained stress, Type {typeNum} can take on the average or unhealthy qualities of Type {typeData.disintegrationLine}: {disLine?.averageTraits.slice(0, 4).join(", ")}. Recognizing this pattern is the first step in interrupting it.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {disLine?.averageTraits.map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Growth Tips */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Growth Practices for Type {typeNum}
                </h3>
                <div className="space-y-3">
                  {typeData.growthTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journal Prompts */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-500" /> Journal Prompts
                </h3>
                <div className="space-y-3">
                  {typeData.journalPrompts.map((prompt, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/70 border border-violet-100">
                      <p className="text-sm text-slate-700 leading-relaxed italic">"{prompt}"</p>
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
                    <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1">Passion (Vice)</div>
                      <div className="text-lg font-bold text-slate-800 mb-2">{naranjo.passion}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{naranjo.passionDescription}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Fixation (Cognitive Habit)</div>
                      <div className="text-lg font-bold text-slate-800 mb-2">{naranjo.fixation}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{naranjo.fixationDescription}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Virtue (Transformed Quality)</div>
                      <div className="text-lg font-bold text-slate-800 mb-2">{naranjo.virtue}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{naranjo.virtueDescription}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">Holy Idea (Ichazo)</div>
                      <div className="text-lg font-bold text-slate-800 mb-2">{naranjo.holyIdea}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{naranjo.holyIdeaDescription}</p>
                    </div>
                  </div>

                  {/* Trap & Defense */}
                  <div className="space-y-3">
                    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">The Trap</div>
                      <div className="text-base font-semibold text-slate-800 mb-2">{naranjo.trap}</div>
                      <p className="text-sm text-slate-600 leading-relaxed">{naranjo.trapDescription}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Defense Mechanism</div>
                      <div className="text-base font-semibold text-slate-800 mb-2">{naranjo.defenseM}</div>
                      <p className="text-sm text-slate-600 leading-relaxed">{naranjo.defenseMDescription}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Hornevian / Harmonic / Object Relations */}
              <div className="space-y-3">
                {hornevian && (
                  <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Hornevian Group</span>
                    </div>
                    <div className="font-semibold text-slate-800 mb-1">{hornevian.name}</div>
                    <p className="text-xs text-slate-500 mb-2 italic">{hornevian.strategy}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{hornevian.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {hornevian.types.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${t === typeNum ? "bg-indigo-200 text-indigo-800" : "bg-white text-slate-500"}`}>
                          Type {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {harmonic && (
                  <div className="p-5 rounded-2xl bg-violet-50 border border-violet-100">
                    <div className="flex items-center gap-2 mb-2">
                      <GitMerge className="w-4 h-4 text-violet-500" />
                      <span className="text-xs font-bold text-violet-600 uppercase tracking-wide">Harmonic Group</span>
                    </div>
                    <div className="font-semibold text-slate-800 mb-1">{harmonic.name}</div>
                    <p className="text-xs text-slate-500 mb-2 italic">{harmonic.response}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{harmonic.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {harmonic.types.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${t === typeNum ? "bg-violet-200 text-violet-800" : "bg-white text-slate-500"}`}>
                          Type {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {objectRel && (
                  <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">Object Relations Group</span>
                    </div>
                    <div className="font-semibold text-slate-800 mb-1">{objectRel.name}</div>
                    <p className="text-xs text-slate-500 mb-2 italic">{objectRel.relationship}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{objectRel.description}</p>
                    <div className="mt-3 p-3 rounded-xl bg-white/70 border border-rose-100">
                      <p className="text-xs text-slate-600 leading-relaxed">{objectRel.psychodynamics}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {objectRel.types.map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${t === typeNum ? "bg-rose-200 text-rose-800" : "bg-white text-slate-500"}`}>
                          Type {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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
        <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
      </div>
    }>
      <ResultsInner />
    </Suspense>
  );
}
