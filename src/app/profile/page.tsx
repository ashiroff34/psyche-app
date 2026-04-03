"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  UserCircle,
  Settings,
  Sparkles,
  ChevronRight,
  Brain,
  Compass,
  Heart,
  Shield,
  ArrowRight,
  Edit3,
  Check,
  Star,
  TrendingUp,
  Zap,
  Target,
  Eye,
  RefreshCw,
  Wand2,
  Flame,
} from "lucide-react";
import { cognitiveFunctions, mbtiTypes } from "@/data/cognitive-functions";
import { enneagramTypes } from "@/data/enneagram";
import { shadowPositions } from "@/data/deep-cognitive";
import { instinctualStackings } from "@/data/subtypes";
import { tritypes, getCenter, getOrderedTritypeThyself } from "@/data/tritypes";
import { useProfile, PsycheProfile } from "@/hooks/useProfile";
import { ExperienceLevelToggle } from "@/components/Tooltip";
import ChibiSprite, { ChibiState } from "@/components/ChibiSprite";
import ShareableCard from "@/components/ShareableCard";
import NextStepBanner from "@/components/NextStepBanner";
import BeginnerBanner from "@/components/BeginnerBanner";
import GlossaryTip from "@/components/GlossaryTip";
import FirstVisitTooltip from "@/components/FirstVisitTooltip";


const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

const INSTINCTUAL_OPTIONS = [
  { code: "sp/sx", label: "sp/sx" },
  { code: "sp/so", label: "sp/so" },
  { code: "sx/sp", label: "sx/sp" },
  { code: "sx/so", label: "sx/so" },
  { code: "so/sp", label: "so/sp" },
  { code: "so/sx", label: "so/sx" },
];


// ─── Type DNA Bars ────────────────────────────────────────────────────────────

function buildTypeDNA(
  profile: import("@/hooks/useProfile").PsycheProfile,
): { num: number; name: string; color: string; pct: number; label: string }[] {
  // If assessment scores are available, use them directly
  if (profile.enneagramScores && profile.enneagramScores.length > 0) {
    const maxPct = Math.max(...profile.enneagramScores.map(s => s.percentage), 1);
    return enneagramTypes.map(t => {
      const s = profile.enneagramScores!.find(x => parseInt(x.key) === t.number);
      const pct = s ? Math.round((s.percentage / maxPct) * 100) : 5;
      return { num: t.number, name: t.name, color: t.color, pct, label: s ? `${s.percentage}%` : "—" };
    });
  }

  // Otherwise, derive approximate bars from declared type + wing + tritype
  const scores: Record<number, number> = {};
  enneagramTypes.forEach(t => { scores[t.number] = 10; }); // baseline noise

  const core = profile.enneagramType ?? profile.enneagramCore;
  if (core) {
    scores[core] = (scores[core] ?? 0) + 90;
    // Wing
    const wingNum = profile.enneagramWing ? parseInt(profile.enneagramWing.slice(-1)) : NaN;
    if (!isNaN(wingNum) && wingNum >= 1 && wingNum <= 9) scores[wingNum] = (scores[wingNum] ?? 0) + 45;
    // Integration / disintegration lines add moderate resonance
    const typeData = enneagramTypes.find(t => t.number === core);
    if (typeData?.integrationLine) scores[typeData.integrationLine] = (scores[typeData.integrationLine] ?? 0) + 25;
  }

  // Tritype components
  [profile.tritypeFirst, profile.tritypeSecond, profile.tritypeThird,
   profile.tritypeHead, profile.tritypeHeart, profile.tritypeGut].forEach((n, i) => {
    if (n && n >= 1 && n <= 9) scores[n] = (scores[n] ?? 0) + [35, 25, 15, 30, 22, 14][i];
  });

  const maxScore = Math.max(...Object.values(scores), 1);
  return enneagramTypes.map(t => ({
    num: t.number,
    name: t.name,
    color: t.color,
    pct: Math.round((scores[t.number] / maxScore) * 100),
    label: t.number === core ? "Primary" : "",
  })).sort((a, b) => b.pct - a.pct);
}

function TypeDNASection({ profile }: { profile: import("@/hooks/useProfile").PsycheProfile }) {
  const bars = buildTypeDNA(profile);
  const hasScores = !!(profile.enneagramScores && profile.enneagramScores.length > 0);
  return (
    <div className="mt-6 p-6 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white/93">Type Resonance Map</h3>
          <p className="text-xs text-white/35 mt-0.5">
            {hasScores ? "Based on your assessment results" : "Estimated from your declared type"}
          </p>
        </div>
        {!hasScores && (
          <span className="text-[10px] text-white/35 italic bg-white/5 border border-white/[0.09] rounded-full px-2 py-0.5">
            Take the assessment for real data
          </span>
        )}
      </div>
      <div className="space-y-2">
        {bars.map(bar => (
          <div key={bar.num} className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
              style={{ backgroundColor: bar.color }}
            >
              {bar.num}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-white/60 truncate">{bar.name}</span>
                {bar.label && (
                  <span className="text-[10px] text-white/35 ml-2 shrink-0">{bar.label}</span>
                )}
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: bar.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: bar.num * 0.04 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Type Combination Insights ────────────────────────────────────────────────

function getTypeCombinationInsight(mbti: string, ennea: number, wing?: string, stacking?: string): string {
  const mbtiData = mbtiTypes.find(t => t.code === mbti);
  const enneaData = enneagramTypes.find(t => t.number === ennea);
  if (!mbtiData || !enneaData) return "";

  const dominant = mbtiData?.stack?.[0];
  const domFunc = cognitiveFunctions.find(f => f.code === dominant);

  const stackingData = stacking ? instinctualStackings?.find(s => s.code === stacking) : null;

  const parts: string[] = [];

  // Jungian Type + Enneagram pairing
  if (["INTJ", "INTP", "INFJ", "INFP"].includes(mbti) && [4, 5, 9].includes(ennea)) {
    parts.push(`As an ${mbti} ${ennea}, your introverted and contemplative nature is amplified. You likely have a profound inner world with deep reflective capacity.`);
  } else if (["ENTJ", "ESTJ", "ESTP"].includes(mbti) && [3, 7, 8].includes(ennea)) {
    parts.push(`As an ${mbti} ${ennea}, your action-oriented assertiveness is doubled. You're likely a natural driver who turns vision into tangible results with remarkable force.`);
  } else if (["ENFJ", "ESFJ", "ENFP"].includes(mbti) && [2, 6, 9].includes(ennea)) {
    parts.push(`As an ${mbti} ${ennea}, your relational and people-oriented energy is deeply reinforced. Connection and community are at the very core of how you move through the world.`);
  } else {
    parts.push(`As an ${mbti} ${ennea}, you blend ${domFunc?.alias || dominant}'s perspective with ${enneaData.name}'s core motivation. This creates a unique tension and richness.`);
  }

  // Wing flavor
  if (wing) {
    const wingNum = parseInt(wing.charAt(wing.length - 1));
    const wingType = enneagramTypes.find(t => t.number === wingNum);
    if (wingType) {
      parts.push(`Your ${wing} wing adds a ${wingType.name.toLowerCase()} flavor, blending ${enneaData.coreDesire.toLowerCase()} with touches of ${wingType?.keyTraits?.[0]?.toLowerCase() || "depth"}.`);
    }
  }

  // Instinctual overlay
  if (stackingData) {
    parts.push(`With ${stacking} stacking, your blind spot is ${stackingData.blind} energy. ${stackingData.characteristics[0] || ""}`);
  }

  return parts.join(" ");
}

// ─── Daily Reflection Prompt ──────────────────────────────────────────────────

function getDailyPrompt(dominant: string): string {
  const func = cognitiveFunctions.find(f => f.code === dominant);
  if (!func) return "Take a moment to observe how your mind processes the world around you.";

  const prompts: Record<string, string[]> = {
    Ni: [
      "What pattern have you been sensing but not yet named? Sit with it today.",
      "Close your eyes. What image comes to mind about where your life is heading?",
      "What insight have you been ignoring because you can't fully explain it yet?",
    ],
    Ne: [
      "What three seemingly unrelated ideas could you connect right now?",
      "What possibility excites you most today? Follow that thread.",
      "Look at something familiar and ask: what else could this become?",
    ],
    Si: [
      "What lesson from your past is most relevant to your current challenge?",
      "Recall a moment of deep contentment. What elements of it can you recreate today?",
      "What routine or ritual grounds you? Honor it fully today.",
    ],
    Se: [
      "Engage all five senses right now. What do you notice that you usually miss?",
      "What physical action would bring you fully into this moment?",
      "Look around. What in your environment demands your attention right now?",
    ],
    Ti: [
      "What mental model or framework are you refining right now? What part doesn't quite fit?",
      "Where have you been accepting others' reasoning without testing it yourself?",
      "Strip something complex down to its core logic. What remains?",
    ],
    Te: [
      "What system in your life is inefficient? Draft a plan to streamline it.",
      "What measurable goal can you accomplish today?",
      "Where can you bring more structure to something that feels chaotic?",
    ],
    Fi: [
      "Check in: does what you're doing today align with what you truly value?",
      "What emotion have you been suppressing? Give it space without judgment.",
      "Where in your life are you compromising your authenticity?",
    ],
    Fe: [
      "Who in your life needs your warmth and attention today?",
      "Notice the emotional atmosphere around you. What does it need from you?",
      "Where have you been over-accommodating at the cost of your own needs?",
    ],
  };

  const dayIndex = Math.floor(Date.now() / 86400000) % 3;
  return prompts[dominant]?.[dayIndex] || func.inDaily;
}

// ─── Growth Tips ──────────────────────────────────────────────────────────────

function getInferiorTips(inferiorCode: string): string[] {
  const tips: Record<string, string[]> = {
    Se: [
      "Practice grounding: walk barefoot, cook a meal mindfully, engage your senses.",
      "Push yourself to try one new physical experience this week.",
      "When you feel stuck in abstraction, move your body, even a brief walk helps.",
    ],
    Si: [
      "Create one small routine and stick to it. Consistency is its own reward.",
      "Document your experiences, journaling builds the Si memory bank.",
      "Practice being present with sensory details instead of leaping to the next idea.",
    ],
    Ne: [
      "Allow yourself to brainstorm without editing. Let ideas flow freely.",
      "Explore something outside your usual domain, a podcast, book, or conversation.",
      "When you feel boxed in, list five 'what if' possibilities. Even silly ones count.",
    ],
    Ni: [
      "Set aside quiet time to reflect on the bigger picture of your life.",
      "Practice sitting with ambiguity, not everything needs an immediate answer.",
      "Ask: where is this all heading? Trust the vision that emerges, even if it's faint.",
    ],
    Fe: [
      "Practice expressing warmth directly, tell someone what they mean to you.",
      "Observe group dynamics and practice attuning to the emotional atmosphere.",
      "Ask others how they feel, then listen without analyzing or fixing.",
    ],
    Fi: [
      "Spend time alone asking: what do I truly value, apart from what works?",
      "Journal about moments when something felt deeply right or deeply wrong.",
      "Practice saying 'this matters to me' without needing external validation.",
    ],
    Te: [
      "Take one project and create a clear plan with deadlines and deliverables.",
      "Practice making decisions based on evidence and external standards.",
      "Ask: what does the data say? Let facts guide you alongside your feelings.",
    ],
    Ti: [
      "When you catch yourself deferring to group opinion, pause and think it through yourself.",
      "Practice deconstructing arguments logically before responding emotionally.",
      "Build a personal framework for something that interests you, define your own terms.",
    ],
  };
  return tips[inferiorCode] || [];
}

function getIntegrationTips(enneaType: number, integrationLine: number): string[] {
  const targetType = enneagramTypes.find(t => t.number === integrationLine);
  if (!targetType) return [];
  return targetType.healthyTraits.slice(0, 3).map(trait =>
    `Practice embodying ${trait.toLowerCase()}, this is the gift your integration to Type ${integrationLine} (${targetType.name}) offers you.`
  );
}

// ─── Section: Jungian Type Picker ─────────────────────────────────────────────

function MBTIPicker({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
        <Brain className="w-4 h-4 text-indigo-400" />
        Jungian Type
      </label>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {MBTI_TYPES.map(type => {
          const data = mbtiTypes.find(t => t.code === type);
          const isSelected = selected === type;
          return (
            <motion.button
              key={type}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(type)}
              className={`relative p-3 rounded-2xl text-sm font-semibold transition-all duration-200 border-2 ${
                isSelected
                  ? "border-indigo-400 bg-indigo-500/15 text-indigo-300 shadow-md"
                  : "border-white/[0.09] bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {type}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
              <div className="text-[10px] font-normal text-white/35 mt-0.5 truncate">
                {data?.name?.replace(/^The /, "")}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Enneagram Core Picker ───────────────────────────────────────────

function EnneagramCorePicker({ selected, onSelect }: { selected?: number; onSelect: (v: number) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
        <Compass className="w-4 h-4 text-violet-400" />
        Enneagram Core Type
      </label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
          const data = enneagramTypes.find(t => t.number === num);
          const isSelected = selected === num;
          return (
            <motion.button
              key={num}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(num)}
              className={`relative p-3 rounded-2xl text-center transition-all duration-200 border-2 ${
                isSelected
                  ? "border-violet-400 bg-violet-500/15 shadow-md"
                  : "border-white/[0.09] bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className={`text-xl font-serif font-bold ${isSelected ? "text-violet-300" : "text-white/60"}`}>
                {num}
              </div>
              <div className="text-[10px] text-white/35 mt-0.5 truncate">
                {data?.name?.replace(/^The /, "")}
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Wing Picker ─────────────────────────────────────────────────────

function WingPicker({ coreType, selected, onSelect }: { coreType: number; selected?: string; onSelect: (v: string) => void }) {
  const validCore = typeof coreType === "number" && coreType >= 1 && coreType <= 9;
  if (!validCore) return null;
  const leftWing = coreType === 1 ? 9 : coreType - 1;
  const rightWing = coreType === 9 ? 1 : coreType + 1;
  const options = [
    { code: `${coreType}w${leftWing}`, label: `${coreType}w${leftWing}` },
    { code: `${coreType}w${rightWing}`, label: `${coreType}w${rightWing}` },
  ];

  return (
    <div>
      <label className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
        <Star className="w-4 h-4 text-amber-400" />
        Wing
      </label>
      <div className="flex gap-3 mt-2">
        {options.map(opt => {
          const isSelected = selected === opt.code;
          return (
            <motion.button
              key={opt.code}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(opt.code)}
              className={`relative flex-1 p-4 rounded-2xl text-center font-semibold transition-all duration-200 border-2 ${
                isSelected
                  ? "border-amber-400 bg-amber-500/15 text-amber-300 shadow-md"
                  : "border-white/[0.09] bg-white/5 text-white/60 hover:border-white/20"
              }`}
            >
              {opt.label}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Instinctual Stacking Picker ─────────────────────────────────────

function InstinctualPicker({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-rose-400" />
        Instinctual Stacking
      </label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {INSTINCTUAL_OPTIONS.map(opt => {
          const isSelected = selected === opt.code;
          return (
            <motion.button
              key={opt.code}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(opt.code)}
              className={`relative p-3 rounded-2xl text-sm font-semibold text-center transition-all duration-200 border-2 ${
                isSelected
                  ? "border-rose-400 bg-rose-500/15 text-rose-300 shadow-md"
                  : "border-white/[0.09] bg-white/5 text-white/60 hover:border-white/20"
              }`}
            >
              {opt.label}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Tritype Picker ──────────────────────────────────────────────────

// ─── Section: Tritype Picker (Order-Aware) ────────────────────────────────────
// In the iEQ9/Fauvre tritype system, ORDER MATTERS:
//   Slot 1 = dominant (most used) type
//   Slot 2 = second most used type
//   Slot 3 = third most used type
// Each slot must be from a different center: Gut (8,9,1) / Heart (2,3,4) / Head (5,6,7)

const ALL_ENNEA_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getCenterLabel(type: number): string {
  if ([8, 9, 1].includes(type)) return "Gut";
  if ([2, 3, 4].includes(type)) return "Heart";
  return "Head";
}

function getCenterColor(type: number): { border: string; bg: string; text: string } {
  if ([8, 9, 1].includes(type)) return { border: "border-emerald-400", bg: "bg-emerald-500/15", text: "text-emerald-300" };
  if ([2, 3, 4].includes(type)) return { border: "border-rose-400", bg: "bg-rose-500/15", text: "text-rose-300" };
  return { border: "border-indigo-400", bg: "bg-indigo-500/15", text: "text-indigo-300" };
}

function TritypePicker({
  first, second, third, onFirst, onSecond, onThird,
}: {
  first?: number; second?: number; third?: number;
  onFirst: (v: number) => void; onSecond: (v: number) => void; onThird: (v: number) => void;
}) {
  const selected = [first, second, third].filter((v): v is number => v !== undefined);

  // Thyself lookup when all 3 are selected
  const archetype = first && second && third
    ? getOrderedTritypeThyself([first, second, third], tritypes)
    : undefined;

  const tritypeDisplay = selected.length === 3 ? selected.join("-") : selected.length > 0 ? selected.join("-") + "-?" : null;

  // Which slots are active, colors spelled out in full for Tailwind JIT
  const slots = [
    { label: "1st", sublabel: "Dominant / Core", value: first, onSelect: onFirst,
      headerBg: "bg-violet-50/50", dotBg: "bg-violet-500", labelText: "text-violet-700" },
    { label: "2nd", sublabel: "Second most used", value: second, onSelect: onSecond,
      headerBg: "bg-purple-50/50", dotBg: "bg-purple-500", labelText: "text-purple-700" },
    { label: "3rd", sublabel: "Third most used", value: third, onSelect: onThird,
      headerBg: "bg-fuchsia-50/50", dotBg: "bg-fuchsia-500", labelText: "text-fuchsia-700" },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <label className="text-sm font-medium text-white/60 flex items-center gap-2">
          <Target className="w-4 h-4 text-violet-400" />
          Tritype
        </label>
        {tritypeDisplay && (
          <div className="text-right">
            <span className="px-3 py-1 rounded-lg bg-violet-500/15 text-violet-300 text-sm font-bold font-mono border border-violet-500/30">
              {tritypeDisplay}
            </span>
            {archetype && (
              <div className="text-[11px] text-violet-400 mt-1 font-medium">{archetype}</div>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-white/35 mb-1">
        <span className="font-semibold text-white/60">Order matters. Drag to reorder.</span> Pick one type from each center (Gut: 8,9,1 · Heart: 2,3,4 · Head: 5,6,7). First is your dominant, last is least used. Tap the arrows to swap positions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {slots.map((slot, slotIndex) => {
          // Determine which types are already used in other slots
          const otherSlotValues = [first, second, third].filter((v, i) => i !== slotIndex && v !== undefined) as number[];
          const otherCenters = otherSlotValues.map(getCenter);

          return (
            <div key={slot.label} className="rounded-2xl bg-white/5 border border-white/[0.09] overflow-hidden">
              <div className={`px-3 py-2 flex items-center justify-between border-b border-white/[0.09] bg-white/5`}>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${slot.dotBg} flex items-center justify-center shrink-0`}>
                    <span className="text-[10px] font-bold text-white">{slotIndex + 1}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white/93">{slot.label}</span>
                    <span className="text-[10px] text-white/35 ml-1.5">{slot.sublabel}</span>
                  </div>
                </div>
                {/* Swap arrows */}
                <div className="flex gap-0.5">
                  {slotIndex > 0 && slot.value && (
                    <button
                      onClick={() => {
                        const vals = [first, second, third];
                        const prev = vals[slotIndex - 1];
                        const curr = vals[slotIndex];
                        if (curr !== undefined) {
                          [onFirst, onSecond, onThird][slotIndex - 1](curr);
                          if (prev !== undefined) [onFirst, onSecond, onThird][slotIndex](prev);
                        }
                      }}
                      className="w-5 h-5 rounded bg-white/10 border border-white/[0.09] flex items-center justify-center text-white/35 hover:text-white/60 text-[10px]"
                      title="Move up"
                    >
                      ↑
                    </button>
                  )}
                  {slotIndex < 2 && slot.value && (
                    <button
                      onClick={() => {
                        const vals = [first, second, third];
                        const next = vals[slotIndex + 1];
                        const curr = vals[slotIndex];
                        if (curr !== undefined) {
                          [onFirst, onSecond, onThird][slotIndex + 1](curr);
                          if (next !== undefined) [onFirst, onSecond, onThird][slotIndex](next);
                        }
                      }}
                      className="w-5 h-5 rounded bg-white/10 border border-white/[0.09] flex items-center justify-center text-white/35 hover:text-white/60 text-[10px]"
                      title="Move down"
                    >
                      ↓
                    </button>
                  )}
                </div>
              </div>
              <div className="p-2.5">
                <div className="grid grid-cols-3 gap-1">
                  {ALL_ENNEA_TYPES.map(num => {
                    const isSelectedHere = slot.value === num;
                    const isSelectedElsewhere = otherSlotValues.includes(num);
                    const wouldDuplicateCenter = !isSelectedHere && !isSelectedElsewhere && otherCenters.includes(getCenter(num));
                    const isDisabled = isSelectedElsewhere || wouldDuplicateCenter;
                    const data = enneagramTypes.find(t => t.number === num);
                    const centerColors = getCenterColor(num);

                    return (
                      <motion.button
                        key={num}
                        whileHover={isDisabled ? {} : { scale: 1.06 }}
                        whileTap={isDisabled ? {} : { scale: 0.94 }}
                        onClick={() => !isDisabled && slot.onSelect(num)}
                        disabled={isDisabled}
                        title={isDisabled ? `${getCenterLabel(num)} center already selected` : data?.name}
                        className={`relative p-1.5 rounded-xl text-center transition-all duration-200 border-2 ${
                          isSelectedHere
                            ? `${centerColors.border} ${centerColors.bg} shadow-sm`
                            : isDisabled
                            ? "border-white/[0.09] bg-white/5 opacity-30 cursor-not-allowed"
                            : "border-white/[0.09] bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className={`text-base font-serif font-bold ${isSelectedHere ? centerColors.text : "text-white/60"}`}>
                          {num}
                        </div>
                        <div className={`text-[8px] truncate ${isSelectedHere ? centerColors.text : "text-white/35"}`}>
                          {getCenterLabel(num)}
                        </div>
                        {isSelectedHere && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-violet-500 flex items-center justify-center`}
                          >
                            <Check className="w-2 h-2 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {slot.value && (
                  <div className="mt-2 px-2 py-1.5 rounded-xl bg-white/5 border border-white/[0.09] flex items-center justify-between">
                    <span className="text-xs font-medium text-white/93">
                      Type {slot.value}, {enneagramTypes.find(t => t.number === slot.value)?.name}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${getCenterColor(slot.value).bg} ${getCenterColor(slot.value).text}`}>
                      {getCenterLabel(slot.value)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selected.length === 3 && archetype && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center gap-3"
        >
          <div className="w-7 h-7 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
            <Target className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-violet-300">{selected.join("-")}, {archetype}</div>
            <div className="text-[10px] text-violet-400 mt-0.5">
              Dominant: {selected[0]} ({getCenterLabel(selected[0])} center) · Second: {selected[1]} ({getCenterLabel(selected[1])} center) · Third: {selected[2]} ({getCenterLabel(selected[2])} center)
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({ profile }: { profile: PsycheProfile }) {
  const mbtiData = profile.mbtiType ? mbtiTypes.find(t => t.code === profile.mbtiType) : null;
  const enneaData = profile.enneagramCore ? enneagramTypes.find(t => t.number === profile.enneagramCore) : null;

  // Ordered tritype: prefer the new first/second/third fields, fall back to parsing the tritype string
  const tritypeOrdered: [number, number, number] | null = (() => {
    if (profile.tritypeFirst && profile.tritypeSecond && profile.tritypeThird) {
      return [profile.tritypeFirst, profile.tritypeSecond, profile.tritypeThird];
    }
    if (profile.tritype && profile.tritype.length === 3) {
      const nums = profile.tritype.split("").map(Number);
      if (nums.every(n => n >= 1 && n <= 9)) return nums as [number, number, number];
    }
    return null;
  })();

  const tritypeThyself = tritypeOrdered ? getOrderedTritypeThyself(tritypeOrdered, tritypes) : undefined;

  const [chibiState, setChibiState] = useState<ChibiState>("idle");

  // After 2 seconds on page, briefly go happy then return to idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setChibiState("happy");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Return to idle after happy animation finishes (~1.4s for 3 bounces at 0.4s each)
  useEffect(() => {
    if (chibiState === "happy") {
      const timer = setTimeout(() => {
        setChibiState("idle");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [chibiState]);

  if (!mbtiData && !enneaData) return null;

  const hasChibi = !!((profile.enneagramType || profile.enneagramCore) && profile.instinctualStacking);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl p-6 sm:p-8 shadow-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {hasChibi ? (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="rounded-2xl border-2 border-white/[0.09] shadow-lg overflow-visible flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)", width: 160, height: 160 }}
            >
              <ChibiSprite
                type={(profile.enneagramType ?? profile.enneagramCore)!}
                instinct={profile.instinctualStacking!}
                size={260}
                state={chibiState}
              />
            </motion.div>
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-200/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white/93 tracking-tight">
              Your Type at a Glance
            </h2>
            <p className="text-sm text-white/60 mt-1">Your unique psychological fingerprint</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Jungian Type Section */}
        {mbtiData && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl backdrop-blur border border-white/[0.09]" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Cognitive Type</div>
                <GlossaryTip term="cognitive functions" />
              </div>
              <BeginnerBanner
                dismissKey="profile-cognitive-intro"
                message="Your cognitive type shows HOW you think, the mental tools you use most naturally. It goes deeper than MBTI letters. Tap any function abbreviation below to learn what it means."
                primaryLabel="Learn more"
                primaryHref="/cognitive"
              />
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif font-bold" style={{ color: mbtiData.color }}>
                  {mbtiData.code}
                </span>
                <span className="text-sm text-white/60">{mbtiData.name}</span>
              </div>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{mbtiData.brief}</p>

              {/* Function Stack Visualization */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-white/35 font-medium">Function Stack</div>
                  <GlossaryTip term="cognitive stack" />
                </div>
                <div className="flex gap-1.5">
                  {mbtiData.stack.map((fn, i) => {
                    const func = cognitiveFunctions.find(f => f.code === fn);
                    const labels = ["Dom", "Aux", "Tert", "Inf"];
                    return (
                      <div key={fn} className="flex-1">
                        <div
                          className="h-2 rounded-full mb-1"
                          style={{
                            backgroundColor: func?.color || "#94a3b8",
                            opacity: 1 - i * 0.2,
                          }}
                        />
                        <div className="text-[10px] font-mono font-medium text-center" style={{ color: func?.color }}>
                          {fn}
                        </div>
                        <div className="text-[8px] text-white/35 text-center">{labels[i]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enneagram Section */}
        {enneaData && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl backdrop-blur border border-white/[0.09]" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="text-xs font-medium text-violet-400 uppercase tracking-wider mb-2">Enneagram</div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif font-bold" style={{ color: enneaData.color }}>
                  {enneaData.number}
                </span>
                <span className="text-sm text-white/60">{enneaData.name}</span>
              </div>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{enneaData.brief}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {profile.enneagramWing && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-medium border border-amber-500/30">
                    {profile.enneagramWing}
                  </span>
                )}
                {profile.instinctualStacking && (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 text-xs font-medium border border-rose-500/30">
                    {profile.instinctualStacking}
                  </span>
                )}
                {tritypeOrdered && (
                  <div className="w-full mt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-violet-500/15 text-violet-300 text-xs font-medium border border-violet-500/30 font-mono">
                        {tritypeOrdered.join("-")}
                        {tritypeThyself ? ` \u2014 ${tritypeThyself}` : ""}
                      </span>
                    </div>
                    <div className="mt-1.5 flex gap-2 flex-wrap text-[10px] text-white/35">
                      <span><span className="font-medium text-white/60">1st (dominant):</span> Type {tritypeOrdered[0]} · {getCenterLabel(tritypeOrdered[0])} center</span>
                      <span className="text-white/10">·</span>
                      <span><span className="font-medium text-white/60">2nd:</span> Type {tritypeOrdered[1]} · {getCenterLabel(tritypeOrdered[1])} center</span>
                      <span className="text-white/10">·</span>
                      <span><span className="font-medium text-white/60">3rd:</span> Type {tritypeOrdered[2]} · {getCenterLabel(tritypeOrdered[2])} center</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-6 flex flex-wrap gap-2">
        {mbtiData && (
          <>
            <Link
              href={`/cognitive/learn?type=${mbtiData.code}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500/15 text-indigo-300 text-xs font-medium hover:bg-indigo-500/25 transition border border-indigo-500/30"
            >
              <Brain className="w-3.5 h-3.5" />
              Learn about your type
              <ChevronRight className="w-3 h-3" />
            </Link>
            <Link
              href={`/cognitive/learn?type=${mbtiData.code}#shadow`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 text-white/60 text-xs font-medium hover:bg-white/10 transition border border-white/[0.09]"
            >
              <Eye className="w-3.5 h-3.5" />
              See your shadow stack <GlossaryTip term="shadow" />
              <ChevronRight className="w-3 h-3" />
            </Link>
          </>
        )}
        {enneaData && profile.instinctualStacking && (
          <Link
            href={`/enneagram/learn?type=${enneaData.number}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-500/15 text-violet-300 text-xs font-medium hover:bg-violet-500/25 transition border border-violet-500/30"
          >
            <Compass className="w-3.5 h-3.5" />
            Explore your subtype
            <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Personalized Insights Section ────────────────────────────────────────────

function PersonalizedInsights({ profile }: { profile: PsycheProfile }) {
  const mbtiData = profile.mbtiType ? mbtiTypes.find(t => t.code === profile.mbtiType) : null;
  const enneaData = profile.enneagramCore ? enneagramTypes.find(t => t.number === profile.enneagramCore) : null;
  const stackingData = profile.instinctualStacking ? instinctualStackings?.find(s => s.code === profile.instinctualStacking) : null;

  if (!mbtiData && !enneaData) return null;

  const dominant = mbtiData?.stack[0];
  const domFunc = dominant ? cognitiveFunctions.find(f => f.code === dominant) : null;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200/50">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-white/93">Personalized Insights</h3>
          <p className="text-xs text-white/60">Tailored to your unique type combination</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Dominant Function Daily Reflection */}
        {domFunc && (
          <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: domFunc.color + "20" }}>
                <Brain className="w-3.5 h-3.5" style={{ color: domFunc.color }} />
              </div>
              <span className="text-xs font-medium text-white/60">Your Dominant: {domFunc.name}</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed italic">
              &ldquo;{getDailyPrompt(dominant!)}&rdquo;
            </p>
            <div className="mt-3 text-[10px] text-white/35 uppercase tracking-wider">Daily reflection prompt</div>
          </div>
        )}

        {/* Enneagram Growth & Stress Arrows */}
        {enneaData && (
          <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-white/60">Growth &amp; Stress Arrows</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-serif font-bold text-sm" style={{ backgroundColor: enneaData.color }}>
                  {enneaData.number}
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-serif font-bold text-sm ring-2 ring-emerald-500/30" style={{ backgroundColor: enneagramTypes.find(t => t.number === enneaData.integrationLine)?.color }}>
                  {enneaData.integrationLine}
                </div>
                <div className="text-xs text-white/60">
                  <span className="font-medium text-emerald-400">Growth:</span> {enneagramTypes.find(t => t.number === enneaData.integrationLine)?.name}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-serif font-bold text-sm" style={{ backgroundColor: enneaData.color }}>
                  {enneaData.number}
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400" />
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-serif font-bold text-sm ring-2 ring-rose-500/30" style={{ backgroundColor: enneagramTypes.find(t => t.number === enneaData.disintegrationLine)?.color }}>
                  {enneaData.disintegrationLine}
                </div>
                <div className="text-xs text-white/60">
                  <span className="font-medium text-rose-400">Stress:</span> {enneagramTypes.find(t => t.number === enneaData.disintegrationLine)?.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instinctual Stacking Blind Spot */}
        {stackingData && (
          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-medium text-white/60">Your Blind Spot: {stackingData.blind}</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              As a <span className="font-semibold">{profile.instinctualStacking}</span>, your blind spot is{" "}
              <span className="font-semibold text-rose-300">{stackingData.blind}</span> energy.{" "}
              {stackingData.blind === "Social"
                ? "You may overlook group dynamics, social expectations, and your role within communities."
                : stackingData.blind === "Sexual"
                ? "You may struggle with deep intimate vulnerability, intense one-to-one chemistry, and transformative passion."
                : "You may neglect physical self-care, material security, and practical grounding."}
            </p>
          </div>
        )}

        {/* Type Combination Insight */}
        {mbtiData && enneaData && (
          <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium text-white/60">Type Combination Insight</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {getTypeCombinationInsight(
                profile.mbtiType!,
                (profile.enneagramType ?? profile.enneagramCore)!,
                profile.enneagramWing,
                profile.instinctualStacking
              )}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Growth Edge Widget ───────────────────────────────────────────────────────

function GrowthEdge({ profile }: { profile: PsycheProfile }) {
  const mbtiData = profile.mbtiType ? mbtiTypes.find(t => t.code === profile.mbtiType) : null;
  const enneaData = profile.enneagramCore ? enneagramTypes.find(t => t.number === profile.enneagramCore) : null;

  if (!mbtiData && !enneaData) return null;

  const inferior = mbtiData?.stack[3];
  const inferiorFunc = inferior ? cognitiveFunctions.find(f => f.code === inferior) : null;
  const inferiorTips = inferior ? getInferiorTips(inferior) : [];
  const integrationTips = enneaData ? getIntegrationTips(enneaData.number, enneaData.integrationLine) : [];

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-3xl p-6 sm:p-8 shadow-lg bg-emerald-500/10 border border-emerald-500/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-white/93">Your Growth Edge</h3>
          <p className="text-xs text-white/60">Where your deepest transformation awaits</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Inferior Function */}
        {inferiorFunc && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: inferiorFunc.color + "20" }}>
                <Brain className="w-3.5 h-3.5" style={{ color: inferiorFunc.color }} />
              </div>
              <div>
                <div className="text-sm font-medium text-white/93">Inferior Function: {inferiorFunc.code}</div>
                <div className="text-[10px] text-white/35">{inferiorFunc.name}, {inferiorFunc.alias}</div>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {shadowPositions?.[3]?.description?.slice(0, 200) || "Your inferior function is your aspirational edge \u2014 challenging yet deeply rewarding to develop."}
            </p>
            <ul className="space-y-2">
              {inferiorTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] font-bold text-emerald-400">{i + 1}</span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Integration Line */}
        {enneaData && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/93">
                  Integration: Type {enneaData.number} &rarr; {enneaData.integrationLine}
                </div>
                <div className="text-[10px] text-white/35">
                  {enneaData.name} integrates to {enneagramTypes.find(t => t.number === enneaData.integrationLine)?.name}
                </div>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              When you're growing, you take on the healthy traits of Type {enneaData.integrationLine}. This is your path toward wholeness.
            </p>
            <ul className="space-y-2">
              {integrationTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] font-bold text-emerald-400">{i + 1}</span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
            {enneaData.growthTips[0] && (
              <div className="mt-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-emerald-300 italic">&ldquo;{enneaData.growthTips[0]}&rdquo;</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Today's Intention Card ───────────────────────────────────────────────────

const STATIC_INTENTIONS: Record<number, string[]> = {
  1: [
    "Notice one moment today where 'good enough' actually is enough.",
    "Practice saying yes to something imperfect.",
    "Let one small thing go uncorrected, and breathe through it.",
    "Appreciate your own effort before judging the result.",
    "Ask yourself: what would I do if I weren't afraid of getting it wrong?",
  ],
  2: [
    "Do one kind thing today without telling anyone.",
    "Check in with your own needs before helping someone else.",
    "Let someone give to you without deflecting or minimizing.",
    "Notice when you're helping from genuine care versus from a need to be needed.",
    "Set one small limit and hold it without guilt.",
  ],
  3: [
    "Do one thing today purely for enjoyment, not for results.",
    "Share something vulnerable with someone you trust.",
    "Pause before your next task and ask: who am I being, not what am I doing?",
    "Let a conversation go somewhere unproductive without steering it back.",
    "Notice when you're performing versus when you're just being yourself.",
  ],
  4: [
    "Find one ordinary thing today that actually moves you.",
    "Do a mundane task with full presence, no meaning-making required.",
    "Reach out to someone instead of waiting to be found.",
    "Notice the gap between how you feel and how others perceive you, and be curious about it.",
    "Let yourself be average at something today, and stay with that feeling.",
  ],
  5: [
    "Share one thought or observation before you've fully refined it.",
    "Stay physically present in a social situation a little longer than is comfortable.",
    "Let someone help you with something, accept the offer without analysis.",
    "Notice when you're retreating into your head and gently come back to the room.",
    "Do something with your hands today, make, build, or move.",
  ],
  6: [
    "Make one small decision today without seeking reassurance.",
    "Notice a worry and ask: what is the most likely outcome, not the worst case?",
    "Trust your gut on something small.",
    "Do one thing that feels slightly risky, and notice you're okay afterward.",
    "Thank someone who has been consistent and reliable in your life.",
  ],
  7: [
    "Stay with one feeling of discomfort today instead of moving past it.",
    "Finish something you've been putting off.",
    "Spend 10 minutes doing nothing, no input, no plans.",
    "Let one conversation go deep instead of keeping it light.",
    "Notice when you're reframing a difficulty as an adventure, and ask what you might be avoiding.",
  ],
  8: [
    "Let someone else lead something today, even if you'd do it differently.",
    "Ask someone how they're doing, and listen without fixing.",
    "Share something you find difficult without framing it as already handled.",
    "Soften your approach with one person who seems to be struggling.",
    "Notice the difference between strength and force today.",
  ],
  9: [
    "State one preference today, even a small one like where to eat.",
    "Notice when you're drifting into someone else's agenda and gently return to yours.",
    "Start one thing you've been putting off, even just for 5 minutes.",
    "Ask yourself: what do I actually want right now?",
    "Say no to one request that doesn't serve you today.",
  ],
};

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function getStaticIntention(enneagramType: number | undefined | null): string {
  if (!enneagramType || !STATIC_INTENTIONS[enneagramType]) {
    // Generic fallback
    return "Take one small step today toward something that matters to you.";
  }
  const intentions = STATIC_INTENTIONS[enneagramType];
  return intentions[getDayOfYear() % intentions.length];
}

function TodaysIntentionCard({ profile }: { profile: Pick<PsycheProfile, "enneagramType" | "enneagramCore" | "instinctualStacking" | "tritype" | "cognitiveType" | "mbtiType"> }) {
  const enneagramType = profile.enneagramType ?? profile.enneagramCore;
  const cognitiveType = profile.cognitiveType ?? profile.mbtiType;

  const [intention, setIntention] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  const dateKey = new Date().toISOString().split("T")[0];
  const storageKey = `psyche-ai-challenge-${dateKey}-e${enneagramType ?? ""}-c${cognitiveType ?? ""}`;

  const fallbackIntention = getStaticIntention(enneagramType ?? null);

  const fetchIntention = useCallback(async (force = false) => {
    if (!enneagramType && !cognitiveType) return;

    if (!force) {
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          setIntention(cached);
          return;
        }
      } catch {}
    }

    // Reset the guard so that after a forced refresh, a future auto-fetch can
    // still run if profile changes (e.g. after hydration settles).
    if (force) {
      fetchedRef.current = false;
    }

    setLoading(true);
    setIntention("");

    // Use static fallback, no AI needed
    setIntention(fallbackIntention);
    try {
      localStorage.setItem(storageKey, fallbackIntention);
    } catch {}
    setLoading(false);
  }, [enneagramType, cognitiveType, profile.instinctualStacking, profile.tritype, storageKey, fallbackIntention]);

  useEffect(() => {
    if (!fetchedRef.current && (enneagramType || cognitiveType)) {
      fetchedRef.current = true;
      fetchIntention();
    }
  }, [fetchIntention, enneagramType, cognitiveType]);

  if (!enneagramType && !cognitiveType) return null;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-lg bg-emerald-500/10 border border-emerald-500/20"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-bl-full pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white/93">Today&apos;s Intention</h3>
              <p className="text-xs text-white/60">A practice for your type · resets daily</p>
            </div>
          </div>
          <button
            onClick={() => fetchIntention(true)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Loading shimmer skeleton */}
        {loading && !intention && (
          <div className="space-y-2.5">
            <div className="h-4 bg-emerald-500/20 rounded-full w-full animate-pulse" />
            <div className="h-4 bg-emerald-500/20 rounded-full w-5/6 animate-pulse" style={{ animationDelay: "75ms" }} />
            <div className="h-4 bg-emerald-500/20 rounded-full w-3/4 animate-pulse" style={{ animationDelay: "150ms" }} />
          </div>
        )}

        {/* Intention text */}
        <AnimatePresence mode="wait">
          {intention && (
            <motion.div
              key={intention.slice(0, 40)}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20"
            >
              <p className="text-white/80 leading-relaxed font-serif text-[15px]">
                {intention}
                {loading && (
                  <span className="inline-block w-0.5 h-4 bg-emerald-500 ml-0.5 animate-pulse" />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { profile, loaded, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  // (Editor no longer auto-opens, the empty state card has a CTA button)

  const updateField = useCallback(
    (key: string, value: any) => {
      const updates: Partial<PsycheProfile> = { [key]: value };

      // Auto-clear wing when core changes
      if (key === "enneagramType") {
        updates.enneagramWing = undefined;
      }

      // Auto-build tritype string from dominance-ordered slots (first/second/third)
      // This replaces the old center-based (head/heart/gut) tritype building.
      const newProfile = { ...profile, ...updates };
      if (newProfile.tritypeFirst && newProfile.tritypeSecond && newProfile.tritypeThird) {
        updates.tritype = `${newProfile.tritypeFirst}${newProfile.tritypeSecond}${newProfile.tritypeThird}`;
      }

      // Map legacy fields for backward compat
      if (key === "cognitiveType") updates.mbtiType = value;
      if (key === "enneagramType") updates.enneagramCore = value;

      updateProfile(updates);
    },
    [profile, updateProfile]
  );

  const hasProfile = profile.cognitiveType || profile.enneagramType;

  // Compatibility shim, the sub-components expect old field names
  const compat = {
    mbtiType: profile.cognitiveType || profile.mbtiType,
    enneagramCore: profile.enneagramType || profile.enneagramCore,
    enneagramWing: profile.enneagramWing,
    instinctualStacking: profile.instinctualStacking,
    tritypeFirst: profile.tritypeFirst,
    tritypeSecond: profile.tritypeSecond,
    tritypeThird: profile.tritypeThird,
    tritype: profile.tritype,
  };

  // Check if new user who chose "I know my type" path (must be before conditional return)
  const [showNewUserPrompt, setShowNewUserPrompt] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-new-user-knows-type") === "true") {
        setShowNewUserPrompt(true);
      }
    } catch {}
  }, []);

  const dismissNewUserPrompt = () => {
    setShowNewUserPrompt(false);
    try { localStorage.removeItem("psyche-new-user-knows-type"); } catch {}
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #160f38 0%, #0f0a1e 100%)" }}>
      <FirstVisitTooltip
        storageKey="psyche-visited-profile"
        message="Set your Enneagram type here, your daily practice and chibi pet unlock once you do!"
        icon="✨"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Beginner onboarding banner */}
        <BeginnerBanner
          dismissKey="profile-page"
          message="This is your personality profile. Explore your type below, check your instinctual subtype, wing, and tritype. When you're ready, head to your Daily Path to start learning."
          primaryLabel="Go to Daily Path"
          primaryHref="/daily"
        />

        {/* New user welcome banner — only for "I know my type" path */}
        {showNewUserPrompt && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg"
          >
            <h3 className="font-serif font-bold text-lg mb-1">Profile saved! Ready to start learning?</h3>
            <p className="text-white/70 text-sm mb-4">Your type is set up. Head to Daily Practice for personalized quizzes, insights, and growth challenges.</p>
            <div className="flex items-center gap-3">
              <Link
                href="/daily"
                onClick={dismissNewUserPrompt}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Flame className="w-4 h-4" />
                Go to Daily Practice
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                onClick={dismissNewUserPrompt}
                className="px-4 py-2.5 text-white/50 hover:text-white text-sm font-medium transition-all"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-200/50">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                My Profile
              </h1>
              <p className="text-sm text-white/60 mt-0.5">Your personality type dashboard</p>
            </div>
          </div>
          {hasProfile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isEditing
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                  : "bg-white/5 text-white/60 border border-white/[0.09] hover:border-violet-500/40 hover:text-violet-300"
              }`}
            >
              {isEditing ? (
                <>
                  <Check className="w-4 h-4" />
                  Done
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  Edit Type
                </>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* ── Empty state: no type set yet ─────────────────────────────────── */}
        {!hasProfile && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 rounded-3xl bg-violet-500/10 border border-violet-500/20 p-8 sm:p-10 text-center shadow-lg"
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white/93 mb-2">Your profile is empty</h2>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Tell Thyself your Enneagram type and MBTI, everything personalises once you do.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: "🐾", text: "Your chibi matches your type" },
                { icon: "🎯", text: "Quizzes tailored to your path" },
                { icon: "🌱", text: "Personalised growth insights" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.09] text-xs font-medium text-white/60 shadow-sm"
                >
                  <span>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsEditing(true)}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Set up my profile →
            </motion.button>
          </motion.div>
        )}

        {/* Type Input Form */}
        <AnimatePresence mode="wait">
          {isEditing && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-10"
            >
              <div className="rounded-3xl p-6 sm:p-8 shadow-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-5 h-5 text-white/35" />
                  <h2 className="text-lg font-serif font-bold text-white/93">
                    {hasProfile ? "Edit Your Type" : "Set Up Your Profile"}
                  </h2>
                </div>

                <div className="space-y-8">
                  <MBTIPicker selected={compat.mbtiType} onSelect={(v) => updateField("cognitiveType", v)} />

                  <div className="border-t border-white/[0.09]" />

                  <EnneagramCorePicker selected={compat.enneagramCore} onSelect={(v) => updateField("enneagramType", v)} />

                  {compat.enneagramCore && (
                    <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
                      <WingPicker
                        coreType={compat.enneagramCore}
                        selected={compat.enneagramWing}
                        onSelect={(v) => updateField("enneagramWing", v)}
                      />
                    </motion.div>
                  )}

                  <div className="border-t border-white/[0.09]" />

                  <InstinctualPicker
                    selected={compat.instinctualStacking}
                    onSelect={(v) => updateField("instinctualStacking", v)}
                  />

                  <div className="border-t border-white/[0.09]" />

                  <TritypePicker
                    first={compat.tritypeFirst}
                    second={compat.tritypeSecond}
                    third={compat.tritypeThird}
                    onFirst={(v) => updateField("tritypeFirst", v)}
                    onSecond={(v) => updateField("tritypeSecond", v)}
                    onThird={(v) => updateField("tritypeThird", v)}
                  />
                </div>

                {hasProfile && (
                  <motion.button
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    className="mt-8 w-full py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Save &amp; View Profile
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Dashboard */}
        {hasProfile && !isEditing && (
          <div className="space-y-8">
            <ProfileCard profile={compat} />
            <PersonalizedInsights profile={compat} />
            <GrowthEdge profile={compat} />
          </div>
        )}

        {/* "Complete Your Profile" nudge when partial type known */}
        {hasProfile && !isEditing && (!compat.mbtiType || !compat.enneagramCore) && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif font-bold text-white/93 mb-1">Complete Your Profile</h3>
                <p className="text-sm text-white/80 mb-4">
                  {!compat.mbtiType && compat.enneagramCore
                    ? "You know your Enneagram type, now discover your cognitive function stack to get the full picture."
                    : !compat.enneagramCore && compat.mbtiType
                    ? "You know your cognitive type, now discover your Enneagram to understand your core motivations."
                    : "Discover more of your type to unlock deeper insights."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {!compat.mbtiType && (
                    <Link
                      href="/cognitive/assess"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition shadow-lg shadow-indigo-200/50"
                    >
                      <Brain className="w-4 h-4" />
                      Discover Cognitive Type
                    </Link>
                  )}
                  {!compat.enneagramCore && (
                    <Link
                      href="/enneagram/assess"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition shadow-lg shadow-sky-200/50"
                    >
                      <Compass className="w-4 h-4" />
                      Discover Enneagram Type
                    </Link>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 text-sm font-medium border border-white/[0.09] hover:border-white/20 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    I know it, enter manually
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!hasProfile && !isEditing && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-500/15 flex items-center justify-center mb-6">
              <UserCircle className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white/93 mb-3">Set Up Your Profile</h2>
            <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
              Enter your Jungian type, Enneagram, and more to unlock personalized insights, growth tips, and daily reflections.
            </p>

            {/* Three paths */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
              <Link href="/enneagram/assess" className="group p-5 rounded-2xl bg-white/5 border-2 border-white/[0.09] hover:border-violet-500/40 transition-all">
                <Compass className="w-6 h-6 text-violet-400 mb-3" />
                <h3 className="text-sm font-semibold text-white/93 mb-1">I&apos;m New</h3>
                <p className="text-xs text-white/60">Take the assessments to discover your type from scratch.</p>
              </Link>
              <button onClick={() => setIsEditing(true)} className="group p-5 rounded-2xl bg-white/5 border-2 border-white/[0.09] hover:border-indigo-500/40 transition-all text-left">
                <Target className="w-6 h-6 text-indigo-400 mb-3" />
                <h3 className="text-sm font-semibold text-white/93 mb-1">I Know Part</h3>
                <p className="text-xs text-white/60">Enter what you know and discover the rest.</p>
              </button>
              <button onClick={() => setIsEditing(true)} className="group p-5 rounded-2xl bg-white/5 border-2 border-white/[0.09] hover:border-emerald-500/40 transition-all text-left">
                <Sparkles className="w-6 h-6 text-emerald-400 mb-3" />
                <h3 className="text-sm font-semibold text-white/93 mb-1">I Know My Type</h3>
                <p className="text-xs text-white/60">Enter your full type and jump straight into personalized content.</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Type DNA Bars */}
        {hasProfile && !isEditing && profile.enneagramType && (
          <TypeDNASection profile={profile} />
        )}

        {/* Shareable Profile Card */}
        {hasProfile && !isEditing && (
          <div className="mt-6">
            <ShareableCard
              enneagramType={profile.enneagramType}
              enneagramTypeName={enneagramTypes.find(t => t.number === profile.enneagramType)?.name}
              enneagramColor={enneagramTypes.find(t => t.number === profile.enneagramType)?.color}
              instinctualStacking={profile.instinctualStacking}
              tritype={profile.tritype}
              mbtiType={profile.cognitiveType || profile.mbtiType}
              mbtiTypeName={mbtiTypes.find(t => t.code === (profile.cognitiveType || profile.mbtiType))?.name}
              enneagramWing={profile.enneagramWing}
              displayName={profile.displayName}
            />
          </div>
        )}

        {/* Next Step guidance */}
        {hasProfile && !isEditing && (
          <NextStepBanner
            href={profile.enneagramType ? `/enneagram/learn?type=${profile.enneagramType}` : "/enneagram/assess"}
            label={profile.enneagramType ? "Dive deeper into your type" : "Discover your Enneagram type"}
            sublabel={profile.enneagramType ? "Explore subtypes, tritypes, and the Naranjo framework" : "Take the assessment to unlock personalized insights"}
            icon={<Compass className="w-5 h-5" />}
            color="#0ea5e9"
          />
        )}
      </div>
    </div>
  );
}
