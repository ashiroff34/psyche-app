"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { Check, ChevronDown, BookOpen, Zap, SkipForward, Share2, ArrowLeft, AlertCircle } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import { useVerifiedShare } from "@/hooks/useVerifiedShare";
import { TYPE_WPFA } from "@/data/wound-passion-fixation-armor";
import { resolveTypeAwareCopy } from "@/hooks/useTypeAwareCopy";

// ─── Quiz save/resume key ─────────────────────────────────────────────────────
const QUIZ_SAVE_KEY = "psyche-quiz-progress-quick";
const SKIP_COST = 30; // tokens

// ─── Theory ──────────────────────────────────────────────────────────────────
// Oscar Ichazo (triadic centers, passions, fixations)
// Claudio Naranjo (character structure, 9 core fixations)
// Don Riso & Russ Hudson (Levels of Development, core fears/desires)
// Helen Palmer (awareness-through-recognition method)
// David Daniels & Virginia Price (Essential Enneagram / Stanford)
// ─────────────────────────────────────────────────────────────────────────────

type Triad = "gut" | "heart" | "head" | null;

interface Option {
  text: string;
  detail?: string;
  learn: string;          // expandable theory content
  triad?: Triad;
  types?: number[];
  weight?: number;
}

interface Question {
  id: string;
  phase: "triage" | "gut" | "heart" | "head";
  text: string;
  sub?: string;
  options: Option[];
}

// ─── Questions ────────────────────────────────────────────────────────────────

const triageQuestions: Question[] = [
  {
    id: "t1",
    phase: "triage",
    text: "When life falls apart, which would feel like the WORST?",
    sub: "First instinct, no wrong answers.",
    options: [
      {
        text: "Walking in blind, no plan, no idea what's coming",
        detail: "The ground under you feeling unknown and uncertain",
        triad: "head",
        learn: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
      },
      {
        text: "Feeling unseen, not wanted, not valued, invisible",
        detail: "Being dismissed by the people whose approval matters",
        triad: "heart",
        learn: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
      },
      {
        text: "Something bigger taking your autonomy away",
        detail: "Being controlled, pushed around, or made smaller",
        triad: "gut",
        learn: "Gut types (1, 8, 9) share a visceral relationship with anger, whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
      },
    ],
  },
  {
    id: "t2",
    phase: "triage",
    text: "You just messed something up. Before you can even think, what lands in your body?",
    sub: "The felt sense, not the thought.",
    options: [
      {
        text: "A racing mind already running scenarios",
        detail: "Scanning for consequences, risks, what to do next",
        triad: "head",
        learn: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
      },
      {
        text: "A hot flush of 'how do I look right now'",
        detail: "The sting of being seen in a bad light",
        triad: "heart",
        learn: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
      },
      {
        text: "A jolt of frustration, at yourself or the situation",
        detail: "A body-level 'this isn't right' before words",
        triad: "gut",
        learn: "Gut types (1, 8, 9) share a visceral relationship with anger, whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
      },
    ],
  },
  {
    id: "t3",
    phase: "triage",
    text: "Which of these would you defend to the last inch?",
    sub: "The thing you'd never give up without a fight.",
    options: [
      {
        text: "Your right to figure things out your own way",
        detail: "Your inner world, your time, your ability to think clearly",
        triad: "head",
        learn: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
      },
      {
        text: "Your worth and place in the lives that matter",
        detail: "Being seen, needed, or recognized by the people you care about",
        triad: "heart",
        learn: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
      },
      {
        text: "Your solid ground, your integrity, your territory",
        detail: "Your principles, your autonomy, what you stand for",
        triad: "gut",
        learn: "Gut types (1, 8, 9) share a visceral relationship with anger, whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
      },
    ],
  },
];

// Center questions now score primary type + partial weight on look-alike types
// This prevents winner-take-all triage errors, a type 6 trapped in gut phase
// still gets partial credit for Type 6 via Type 1 option (both have inner critic)
const gutQuestions: Question[] = [
  {
    id: "g1",
    phase: "gut",
    text: "Where does the tension live in you?",
    sub: "When you're pushed to your edge.",
    options: [
      {
        text: "In a loud inner critic, you're hardest on yourself",
        detail: "Tight jaw, a running tally of what's wrong, and a need to fix it",
        types: [1, 6], weight: 2,  // 1 primary, 6 look-alike (both have inner critic)
        learn: "Wound: I am only safe if I am good, correct, and beyond criticism.\n\nPassion: constant low hum of anger at everything that falls short, including themselves.\n\nFixation: brain runs the comparison between what is and what should be on loop, automatically.\n\nArmor: the perfectionist, highest standards in the room, holds themselves to it hardest.",
      },
      {
        text: "In hot, direct force, you don't hide what you feel",
        detail: "Pushing back hard, taking up space, meeting threat head-on",
        types: [8], weight: 2,
        learn: "Wound: vulnerability gets you hurt, the world takes from the weak, I will never be weak.\n\nPassion: lust, excess of intensity, aggressive aliveness, needs to feel everything at full volume.\n\nFixation: brain always tracking power and violation, who has it, who's using it wrong.\n\nArmor: the protector, buried softness completely, leads with force because force kept them safe when tenderness didn't.",
      },
      {
        text: "Underneath, quietly, you merge, deflect, go numb",
        detail: "Your irritation gets absorbed before anyone notices it",
        types: [9, 5], weight: 2,  // 9 primary, 5 look-alike (both withdraw)
        learn: "Wound: my presence and needs create problems, safest thing is to disappear.\n\nPassion: sloth, deep numbing of own desire and agenda, chronic forgetting of what they actually want.\n\nFixation: brain drifts toward whatever keeps things comfortable, away from asserting own presence.\n\nArmor: the peacemaker, everyone loves them, no one really knows them, loses the thread of themselves adapting to others.",
      },
    ],
  },
  {
    id: "g2",
    phase: "gut",
    text: "What do you most want to be?",
    sub: "The self-ideal you keep reaching for.",
    options: [
      {
        text: "Good, principled, and beyond reproach",
        detail: "Living with integrity even when it costs you",
        types: [1, 3], weight: 2,  // 1 primary, 3 look-alike (both high standards)
        learn: "Wound: I am only safe if I am good, correct, and beyond criticism.\n\nPassion: constant low hum of anger at everything that falls short, including themselves.\n\nFixation: brain runs the comparison between what is and what should be on loop, automatically.\n\nArmor: the perfectionist, highest standards in the room, holds themselves to it hardest.",
      },
      {
        text: "Strong enough that no one can push you around",
        detail: "Self-reliant, in charge of your own fate, unshakeable",
        types: [8, 6], weight: 2,  // 8 primary, 6cp look-alike (counterphobic)
        learn: "Wound: vulnerability gets you hurt, the world takes from the weak, I will never be weak.\n\nPassion: lust, excess of intensity, aggressive aliveness, needs to feel everything at full volume.\n\nFixation: brain always tracking power and violation, who has it, who's using it wrong.\n\nArmor: the protector, buried softness completely, leads with force because force kept them safe when tenderness didn't.",
      },
      {
        text: "At peace, unbothered, in harmony with everything",
        detail: "Where nothing can disturb your inner quiet",
        types: [9, 2], weight: 2,  // 9 primary, 2 look-alike (both accommodating)
        learn: "Wound: my presence and needs create problems, safest thing is to disappear.\n\nPassion: sloth, deep numbing of own desire and agenda, chronic forgetting of what they actually want.\n\nFixation: brain drifts toward whatever keeps things comfortable, away from asserting own presence.\n\nArmor: the peacemaker, everyone loves them, no one really knows them, loses the thread of themselves adapting to others.",
      },
    ],
  },
  {
    id: "g3",
    phase: "gut",
    text: "What's the single worst thing that could be true about you?",
    sub: "The thing you work hardest never to be.",
    options: [
      {
        text: "That you're actually bad, corrupt, or a hypocrite",
        detail: "That your failings outweigh your intentions",
        types: [1], weight: 3,
        learn: "Wound: I am only safe if I am good, correct, and beyond criticism.\n\nPassion: constant low hum of anger at everything that falls short, including themselves.\n\nFixation: brain runs the comparison between what is and what should be on loop, automatically.\n\nArmor: the perfectionist, highest standards in the room, holds themselves to it hardest.",
      },
      {
        text: "That you're actually weak, used, or at someone's mercy",
        detail: "That someone could take something from you and you couldn't stop it",
        types: [8], weight: 3,
        learn: "Wound: vulnerability gets you hurt, the world takes from the weak, I will never be weak.\n\nPassion: lust, excess of intensity, aggressive aliveness, needs to feel everything at full volume.\n\nFixation: brain always tracking power and violation, who has it, who's using it wrong.\n\nArmor: the protector, buried softness completely, leads with force because force kept them safe when tenderness didn't.",
      },
      {
        text: "That you don't actually matter, no presence, no weight",
        detail: "That the world would go on unchanged if you weren't in it",
        types: [9], weight: 3,
        learn: "Wound: my presence and needs create problems, safest thing is to disappear.\n\nPassion: sloth, deep numbing of own desire and agenda, chronic forgetting of what they actually want.\n\nFixation: brain drifts toward whatever keeps things comfortable, away from asserting own presence.\n\nArmor: the peacemaker, everyone loves them, no one really knows them, loses the thread of themselves adapting to others.",
      },
    ],
  },
];

const heartQuestions: Question[] = [
  {
    id: "h1",
    phase: "heart",
    text: "Where does the pull to 'be enough' live in you?",
    sub: "The place you quietly keep working to earn your worth.",
    options: [
      {
        text: "You earn it by being the one people can always count on",
        detail: "Your value comes from being needed, loved, remembered",
        types: [2, 9], weight: 2,  // 2 primary, 9 look-alike (both accommodating)
        learn: "Wound: I am only lovable if I am needed.\n\nPassion: pride in being the one who gives and is depended on, masks terror of own needs.\n\nFixation: brain constantly scans every room for what people need and how to provide it.\n\nArmor: the helper, shows up for everyone, quietly resents no one shows up the same way back.",
      },
      {
        text: "You earn it by succeeding, being impressive, efficient, on top",
        detail: "Your value comes from what you accomplish and how you land",
        types: [3, 1], weight: 2,  // 3 primary, 1 look-alike (both high performers)
        learn: "Wound: I am only lovable if I am succeeding.\n\nPassion: vanity, deep replacement of actual identity with whatever image gets most approval.\n\nFixation: brain constantly manages perception, constructs the version that lands best in any room.\n\nArmor: the achiever, always on, always impressive, no idea who they are when the room is empty.",
      },
      {
        text: "You earn it by being genuinely different, deep, real",
        detail: "Your value comes from not being like everyone else",
        types: [4, 5], weight: 2,  // 4 primary, 5 look-alike (both withdrawn/depth)
        learn: "Wound: something is fundamentally missing in me that everyone else has naturally.\n\nPassion: envy, chronic painful awareness of the gap between who they are and who they feel they should be.\n\nFixation: brain keeps returning to what's absent, what's lost, what's longed for.\n\nArmor: the depth, the aesthetic intensity, turns pain into something beautiful to make it mean something.",
      },
    ],
  },
  {
    id: "h2",
    phase: "heart",
    text: "Which of these would flatten you most?",
    sub: "The hit that goes all the way to the core.",
    options: [
      {
        text: "Being called selfish, ungenerous, or cold",
        detail: "Hearing that your care was actually about you",
        types: [2], weight: 2,
        learn: "Wound: I am only lovable if I am needed.\n\nPassion: pride in being the one who gives and is depended on, masks terror of own needs.\n\nFixation: brain constantly scans every room for what people need and how to provide it.\n\nArmor: the helper, shows up for everyone, quietly resents no one shows up the same way back.",
      },
      {
        text: "Being exposed as a failure with nothing to show for the effort",
        detail: "Hearing that the image was hollow underneath",
        types: [3], weight: 2,
        learn: "Wound: I am only lovable if I am succeeding.\n\nPassion: vanity, deep replacement of actual identity with whatever image gets most approval.\n\nFixation: brain constantly manages perception, constructs the version that lands best in any room.\n\nArmor: the achiever, always on, always impressive, no idea who they are when the room is empty.",
      },
      {
        text: "Being told you're actually ordinary, generic, no depth, forgettable",
        detail: "Hearing that nothing sets you apart",
        types: [4], weight: 2,
        learn: "Wound: something is fundamentally missing in me that everyone else has naturally.\n\nPassion: envy, chronic painful awareness of the gap between who they are and who they feel they should be.\n\nFixation: brain keeps returning to what's absent, what's lost, what's longed for.\n\nArmor: the depth, the aesthetic intensity, turns pain into something beautiful to make it mean something.",
      },
    ],
  },
  {
    id: "h3",
    phase: "heart",
    text: "In close relationships, your instinct is to...",
    sub: "Not what you've trained yourself to do, what you do first.",
    options: [
      {
        text: "Read the other person before reading yourself",
        detail: "Their needs come into focus before your own do",
        types: [2, 6], weight: 2,  // 2 primary, 6 look-alike (both attuned to others)
        learn: "Wound: I am only lovable if I am needed.\n\nPassion: pride in being the one who gives and is depended on, masks terror of own needs.\n\nFixation: brain constantly scans every room for what people need and how to provide it.\n\nArmor: the helper, shows up for everyone, quietly resents no one shows up the same way back.",
      },
      {
        text: "Show the version of yourself most likely to impress them",
        detail: "Lead with competence, charisma, and what you bring",
        types: [3, 7], weight: 2,  // 3 primary, 7 look-alike (both energetic/appealing)
        learn: "Wound: I am only lovable if I am succeeding.\n\nPassion: vanity, deep replacement of actual identity with whatever image gets most approval.\n\nFixation: brain constantly manages perception, constructs the version that lands best in any room.\n\nArmor: the achiever, always on, always impressive, no idea who they are when the room is empty.",
      },
      {
        text: "Test if they can handle your actual depth, then pull back if not",
        detail: "Go all in or not at all; surface feels like a waste",
        types: [4, 8], weight: 2,  // 4 primary, 8 look-alike (both intensity-seeking)
        learn: "Wound: something is fundamentally missing in me that everyone else has naturally.\n\nPassion: envy, chronic painful awareness of the gap between who they are and who they feel they should be.\n\nFixation: brain keeps returning to what's absent, what's lost, what's longed for.\n\nArmor: the depth, the aesthetic intensity, turns pain into something beautiful to make it mean something.",
      },
    ],
  },
];

const headQuestions: Question[] = [
  {
    id: "hd1",
    phase: "head",
    text: "When something feels uncertain, where does your mind go first?",
    sub: "The reflex, before you decide what to do.",
    options: [
      {
        text: "Inward, to understand it deeply before engaging",
        detail: "Researching, analyzing, pulling back until you're sure",
        types: [5, 4], weight: 2,  // 5 primary, 4 look-alike (both withdraw)
        learn: "Wound: the world is too demanding and I don't have enough inside to meet it.\n\nPassion: avarice, hoarding the self, withholding presence because there might not be enough to go around.\n\nFixation: brain keeps rationing, calculating what can be given and what needs to be kept back.\n\nArmor: the observer, understands everything deeply from a safe distance, only comes out when fully resourced.",
      },
      {
        text: "Outward, scanning for what could go wrong and who to trust",
        detail: "Double-checking, seeking reassurance, preparing for worst case",
        types: [6, 1], weight: 2,  // 6 primary, 1 look-alike (both anxious rule-followers)
        learn: "Wound: the world is not safe and I cannot trust my own perception of it.\n\nPassion: fear, constant background hum of threat assessment, what could go wrong, who can be trusted.\n\nFixation: brain keeps doubting itself, seeking confirmation, testing the ground before every step.\n\nArmor: either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
      },
      {
        text: "Forward, to the next thing, the plan, the bright possibility",
        detail: "Reframing, imagining what's next, moving past the uncomfortable",
        types: [7, 3], weight: 2,  // 7 primary, 3 look-alike (both forward-motion)
        learn: "Wound: what I need won't be there when I need it, so I have to generate it myself.\n\nPassion: gluttony, insatiable hunger for experience and possibility, stopping means feeling what's underneath.\n\nFixation: brain lives in the future, always planning the next scenario to avoid present pain.\n\nArmor: the enthusiast, reframes everything into a lesson or story, makes pain look like growth before they even feel it.",
      },
    ],
  },
  {
    id: "hd2",
    phase: "head",
    text: "What do you guard most carefully?",
    sub: "The thing you won't let anyone take from you.",
    options: [
      {
        text: "Your inner world, your time, your energy, your right to think",
        detail: "Your privacy is oxygen; you give yourself carefully",
        types: [5], weight: 2,
        learn: "Wound: the world is too demanding and I don't have enough inside to meet it.\n\nPassion: avarice, hoarding the self, withholding presence because there might not be enough to go around.\n\nFixation: brain keeps rationing, calculating what can be given and what needs to be kept back.\n\nArmor: the observer, understands everything deeply from a safe distance, only comes out when fully resourced.",
      },
      {
        text: "Your trusted circle, the people and systems that have your back",
        detail: "You protect the things that keep the ground stable",
        types: [6], weight: 2,
        learn: "Wound: the world is not safe and I cannot trust my own perception of it.\n\nPassion: fear, constant background hum of threat assessment, what could go wrong, who can be trusted.\n\nFixation: brain keeps doubting itself, seeking confirmation, testing the ground before every step.\n\nArmor: either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
      },
      {
        text: "Your options, your freedom, your ability to pivot anywhere",
        detail: "Feeling trapped is the actual nightmare",
        types: [7], weight: 2,
        learn: "Wound: what I need won't be there when I need it, so I have to generate it myself.\n\nPassion: gluttony, insatiable hunger for experience and possibility, stopping means feeling what's underneath.\n\nFixation: brain lives in the future, always planning the next scenario to avoid present pain.\n\nArmor: the enthusiast, reframes everything into a lesson or story, makes pain look like growth before they even feel it.",
      },
    ],
  },
  {
    id: "hd3",
    phase: "head",
    text: "Which of these would be the most unbearable reality?",
    sub: "The nightmare scenario at the core.",
    options: [
      {
        text: "Being helpless, without knowledge, skills, or inner resources to cope",
        detail: "Getting caught depleted, exposed, with nothing left inside",
        types: [5], weight: 3,
        learn: "Wound: the world is too demanding and I don't have enough inside to meet it.\n\nPassion: avarice, hoarding the self, withholding presence because there might not be enough to go around.\n\nFixation: brain keeps rationing, calculating what can be given and what needs to be kept back.\n\nArmor: the observer, understands everything deeply from a safe distance, only comes out when fully resourced.",
      },
      {
        text: "Being alone, no one reliable, no backup, no one to turn to",
        detail: "Having to face a dangerous world by yourself, with no certainty",
        types: [6], weight: 3,
        learn: "Wound: the world is not safe and I cannot trust my own perception of it.\n\nPassion: fear, constant background hum of threat assessment, what could go wrong, who can be trusted.\n\nFixation: brain keeps doubting itself, seeking confirmation, testing the ground before every step.\n\nArmor: either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
      },
      {
        text: "Being stuck, trapped in pain with no escape and nothing to look forward to",
        detail: "The absence of possibility; the future going dark",
        types: [7], weight: 3,
        learn: "Wound: what I need won't be there when I need it, so I have to generate it myself.\n\nPassion: gluttony, insatiable hunger for experience and possibility, stopping means feeling what's underneath.\n\nFixation: brain lives in the future, always planning the next scenario to avoid present pain.\n\nArmor: the enthusiast, reframes everything into a lesson or story, makes pain look like growth before they even feel it.",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeResult(scores: Record<number, number>) {
  const entries = Object.entries(scores)
    .map(([k, v]) => ({ type: Number(k), score: v }))
    .sort((a, b) => b.score - a.score);
  const top = entries[0];
  const second = entries[1];
  const total = entries.reduce((s, e) => s + e.score, 0);
  return {
    type: top.type,
    confidence: total > 0 ? Math.round((top.score / total) * 100) : 0,
    runnerUp: second?.type ?? top.type,
  };
}

const typeNames: Record<number, string> = {
  1: "Perfectionist", 2: "Helper", 3: "Achiever",
  4: "Individualist", 5: "Investigator", 6: "Loyalist",
  7: "Enthusiast", 8: "Challenger", 9: "Peacemaker",
};
const typeColors: Record<number, string> = {
  1: "#e11d48", 2: "#f97316", 3: "#eab308",
  4: "#a855f7", 5: "#3b82f6", 6: "#14b8a6",
  7: "#22c55e", 8: "#ef4444", 9: "#94a3b8",
};
const typeTaglines: Record<number, string> = {
  1: "The voice that says things can be better. It won't rest until they are.",
  2: "The heart that gives freely, and aches to be truly seen in return.",
  3: "The achiever who shapes an image to match what the world rewards.",
  4: "The soul searching for what's real. Even when it hurts.",
  5: "The observer who retreats to understand before they act.",
  6: "The loyal skeptic who prepares for the worst while hoping for the best.",
  7: "The optimist who keeps the future bright so the present stays bearable.",
  8: "The force that refuses to be controlled or pushed aside.",
  9: "The peacemaker who merges with the world to keep the peace within.",
};

// ─── Swipeable option card ────────────────────────────────────────────────────

function SwipeOption({
  opt,
  i,
  selectedOption,
  expandedLearn,
  onSelect,
  onToggleLearn,
}: {
  opt: Option;
  i: number;
  selectedOption: number | null;
  expandedLearn: number | null;
  onSelect: (i: number) => void;
  onToggleLearn: (e: React.MouseEvent, i: number) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-4, 0, 4]);
  const selectGlow = useTransform(x, [0, 70], [0, 1]);

  const isSelected = selectedOption === i;
  const isLearnOpen = expandedLearn === i;
  const isDimmed = selectedOption !== null && !isSelected;
  const disabled = selectedOption !== null;

  const bind = useDrag(
    ({ movement: [mx], last }) => {
      if (disabled) return;
      x.set(mx);
      if (last) {
        if (mx > 65) {
          onSelect(i);
        }
        animate(x, 0, { type: "spring", stiffness: 450, damping: 28 });
      }
    },
    { axis: "x", enabled: !disabled }
  );

  return (
    <motion.div
      {...(bind() as object)}
      animate={{ opacity: isDimmed ? 0.35 : 1 }}
      style={{
        x,
        rotate,
        touchAction: "pan-y",
        borderRadius: "16px",
        overflow: "hidden",
        border: isSelected
          ? "2px solid rgba(139,92,246,0.7)"
          : "2px solid rgba(255,255,255,0.08)",
        background: isSelected
          ? "rgba(139,92,246,0.12)"
          : "rgba(255,255,255,0.04)",
        cursor: disabled ? "default" : "grab",
      }}
    >
      {/* Swipe-right glow hint */}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: 14, pointerEvents: "none",
          background: "rgba(139,92,246,0.18)",
          opacity: selectGlow,
        }}
      />

      {/* Tap-to-select row */}
      <button
        onClick={() => !disabled && onSelect(i)}
        className="w-full text-left px-4 pt-4 pb-3 relative"
        style={{ userSelect: "none" }}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              isSelected ? "border-violet-400 bg-violet-500" : ""
            }`}
            style={!isSelected ? { borderColor: "rgba(255,255,255,0.25)" } : {}}
          >
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>
              {opt.text}
            </p>
            {opt.detail && (
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                {opt.detail}
              </p>
            )}
          </div>
        </div>
      </button>

      {/* Expand toggle */}
      <button
        onClick={(e) => onToggleLearn(e, i)}
        className="w-full flex items-center gap-1.5 px-4 pb-3 relative"
        style={{ color: "rgba(139,92,246,0.6)" }}
      >
        <BookOpen className="w-3 h-3 shrink-0" />
        <span className="text-xs font-medium">{isLearnOpen ? "Collapse" : "Expand"}</span>
        <motion.div
          animate={{ rotate: isLearnOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      {/* Expandable theory */}
      <AnimatePresence>
        {isLearnOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-xs leading-relaxed space-y-2"
              style={{ color: "rgba(255,255,255,0.52)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {opt.learn.split("\n\n").map((para, pi) => (
                <p key={pi}>{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Instinct forced-choice questions (6 total, 2 per pairing) ──────────────

interface InstinctQ {
  id: string;
  optionA: { text: string; instinct: "sp" | "sx" | "so" };
  optionB: { text: string; instinct: "sp" | "sx" | "so" };
}

const instinctQuestions: InstinctQ[] = [
  // SP vs SX
  {
    id: "i1",
    optionA: { text: "I feel most settled when my finances, health, and home are in order.", instinct: "sp" },
    optionB: { text: "I feel most alive when I have an intense, charged connection with someone.", instinct: "sx" },
  },
  {
    id: "i2",
    optionA: { text: "I'm most at peace when I've handled the practical basics and things feel under control.", instinct: "sp" },
    optionB: { text: "I'm most at peace when I feel deeply seen and wanted by someone who matters to me.", instinct: "sx" },
  },
  // SP vs SO
  {
    id: "i3",
    optionA: { text: "A quiet life of physical comfort and private stability appeals to me more than a public one.", instinct: "sp" },
    optionB: { text: "I want to contribute something meaningful to a community or cause larger than myself.", instinct: "so" },
  },
  {
    id: "i4",
    optionA: { text: "I'm more motivated by personal comfort and security than by status or recognition.", instinct: "sp" },
    optionB: { text: "I'm more motivated by my reputation and standing in the eyes of others than by comfort.", instinct: "so" },
  },
  // SX vs SO
  {
    id: "i5",
    optionA: { text: "I'd rather have one extraordinary, all-consuming connection than a wide social network.", instinct: "sx" },
    optionB: { text: "I'd rather be well-connected in a community and known by many than intensely bonded with one person.", instinct: "so" },
  },
  {
    id: "i6",
    optionA: { text: "I bring intensity and charge into my close relationships, everything feels personal.", instinct: "sx" },
    optionB: { text: "I naturally read group dynamics and position myself within social structures.", instinct: "so" },
  },
];

function computeInstinct(scores: Record<string, number>): string {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (entries.length < 2) return "sp/sx";
  return `${entries[0][0]}/${entries[1][0]}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

const INSTINCT_OPTIONS = [
  {
    code: "sp/sx",
    label: "Self-Preservation first",
    sublabel: "Self-Pres + Sexual",
    desc: "Security-focused and intensely private. You take care of essentials first: shelter, health, finances. When you connect, it's deep and selective.",
    detail: "Self-Preservation types orient around survival and comfort: physical safety, routines, and resources. The Sexual secondary means that once your needs are met, you invest in passionate one-on-one connections. You tend to be private, self-sufficient, and quietly intense. Not the center of attention, but fiercely present in close relationships.",
  },
  {
    code: "sp/so",
    label: "Self-Preservation first",
    sublabel: "Self-Pres + Social",
    desc: "Practical and community-minded. You're a builder. You make sure the basics are handled, then show up reliably for the people and groups that matter to you.",
    detail: "Self-Preservation primary with Social secondary. You focus on stability and practicality while also caring about belonging and contribution. You tend to be the dependable one: steady, responsible, good at maintaining systems and communities. Less interested in one-on-one intensity; more interested in building something lasting together.",
  },
  {
    code: "sx/sp",
    label: "Sexual (One-to-One) first",
    sublabel: "Sexual + Self-Pres",
    desc: "Intensely magnetic and self-contained. You're drawn to deep, transformative connection and bring real presence to everything you do. Privacy matters to you.",
    detail: "The Sexual instinct (also called the One-to-One instinct) is about chemistry, intensity, and depth. Not necessarily romantic, but always personal. With Self-Pres secondary, you balance this intensity with a need for your own space and resources. You're selective, passionate, and don't spread yourself thin. When you focus on someone or something, you really focus.",
  },
  {
    code: "sx/so",
    label: "Sexual (One-to-One) first",
    sublabel: "Sexual + Social",
    desc: "Charismatic and deeply connected. You bring intensity into group settings. You want meaningful exchange, not just pleasant interaction. You make rooms feel alive.",
    detail: "Sexual primary means you seek depth and chemistry. Social secondary means you also want to belong and matter within a broader community. This combination produces people who are magnetically attractive in groups: they pull others in, create spark, and often become the emotional center of their communities. You crave meaning in both intimate and group contexts.",
  },
  {
    code: "so/sp",
    label: "Social first",
    sublabel: "Social + Self-Pres",
    desc: "Purposeful and grounded. You care about your role in the bigger picture and you're reliable enough to actually follow through. A builder of communities and institutions.",
    detail: "Social primary means you orient around belonging, hierarchy, and your role in the group. Self-Pres secondary keeps you practical and sustainable. You don't burn out trying to be everything to everyone. This combination produces leaders, organizers, and institutional builders: people who care deeply about collective wellbeing and are structured enough to maintain it.",
  },
  {
    code: "so/sx",
    label: "Social first",
    sublabel: "Social + Sexual",
    desc: "A passionate connector. You want deep belonging: to matter to people and be seen in the groups you care about. You bring real intensity into social settings.",
    detail: "Social primary with Sexual secondary creates an especially relational combination. You want to belong and matter, and you pursue that with real intensity. You're often the one forging the deep bonds within a group, the person others feel truly seen by. You may struggle with being everything to everyone, because you genuinely care and the connections feel real.",
  },
];

export default function QuickTypeAssessment({
  onComplete,
}: {
  onComplete: (result: { type: number; confidence: number; runnerUp: number; instinct?: string }) => void;
}) {
  // ── Lazy initializers, restore progress from localStorage on first mount ──
  const [triadScores, setTriadScores] = useState<Record<string, number>>(() => {
    try {
      const s = JSON.parse(localStorage.getItem(QUIZ_SAVE_KEY) || "null");
      if (s?.phase && s.phase !== "result" && s.phase !== "subtype") return s.triadScores ?? { gut: 0, heart: 0, head: 0 };
    } catch {}
    return { gut: 0, heart: 0, head: 0 };
  });
  const [typeScores, setTypeScores] = useState<Record<number, number>>(() => {
    try {
      const s = JSON.parse(localStorage.getItem(QUIZ_SAVE_KEY) || "null");
      if (s?.phase && s.phase !== "result" && s.phase !== "subtype") return s.typeScores ?? {};
    } catch {}
    return {};
  });
  const [instinctScores, setInstinctScores] = useState<Record<string, number>>({ sp: 0, sx: 0, so: 0 });
  const [phase, setPhase] = useState<"triage" | "gut" | "heart" | "head" | "confirm" | "instinct" | "result" | "subtype">(() => {
    try {
      const s = JSON.parse(localStorage.getItem(QUIZ_SAVE_KEY) || "null");
      if (s?.phase && s.phase !== "result" && s.phase !== "subtype" && s.phase !== "instinct" && s.phase !== "confirm") return s.phase;
    } catch {}
    return "triage";
  });
  const [qIdx, setQIdx] = useState<number>(() => {
    try {
      const s = JSON.parse(localStorage.getItem(QUIZ_SAVE_KEY) || "null");
      if (s?.phase && s.phase !== "result" && s.phase !== "subtype") return s.qIdx ?? 0;
    } catch {}
    return 0;
  });
  const [selectedInstinct, setSelectedInstinct] = useState<string | null>(null);
  const [expandedInstinct, setExpandedInstinct] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [expandedLearn, setExpandedLearn] = useState<number | null>(null);
  const [result, setResult] = useState<{ type: number; confidence: number; runnerUp: number } | null>(null);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [skipErr, setSkipErr] = useState("");
  const [tokenBalance, setTokenBalance] = useState<number>(() => {
    try {
      const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
      return typeof gs.tokens === "number" ? gs.tokens : 0;
    } catch { return 0; }
  });

  // ── Share hook for result screen (+20 tokens) ─────────────────────────────
  const resultShareHook = useVerifiedShare({
    shareId: `quiz-result-${result?.type ?? 0}`,
    tokensPerShare: 20,
    title: `I'm a Type ${result?.type ?? ""} on the Enneagram`,
    text: result
      ? `I just took the Thyself quiz and discovered I'm a ${typeNames[result.type]}. Know thyself at thyself.app`
      : "Know thyself. thyself.app",
    url: "https://thyself.app",
  });

  // ── Persist progress to localStorage on every question advance ───────────
  useEffect(() => {
    if (phase === "result" || phase === "subtype") {
      // Clear save once quiz is done
      try { localStorage.removeItem(QUIZ_SAVE_KEY); } catch {}
      return;
    }
    try {
      localStorage.setItem(QUIZ_SAVE_KEY, JSON.stringify({ phase, qIdx, triadScores, typeScores }));
    } catch {}
  }, [phase, qIdx, triadScores, typeScores]);

  // ── Skip quiz for 30 tokens ──────────────────────────────────────────────
  function handleSkipQuiz() {
    if (tokenBalance < SKIP_COST) {
      setSkipErr(`Need ${SKIP_COST} tokens. You have ${tokenBalance}.`);
      return;
    }
    try {
      const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
      gs.tokens = (gs.tokens ?? 0) - SKIP_COST;
      localStorage.setItem("psyche-game-state", JSON.stringify(gs));
      localStorage.removeItem(QUIZ_SAVE_KEY);
    } catch {}
    // Skip to a neutral "Type 5" placeholder (user will self-identify from results)
    // This just dismisses the quiz, the page's onComplete handler navigates away
    onComplete({ type: 0, confidence: 0, runnerUp: 0 });
  }

  const phaseQuestions = phase === "gut" ? gutQuestions : phase === "heart" ? heartQuestions : headQuestions;
  const currentQ = phase === "triage" ? triageQuestions[qIdx] : phaseQuestions[qIdx];

  const totalQ = triageQuestions.length + phaseQuestions.length;
  const answeredCount = phase === "triage" ? qIdx : triageQuestions.length + qIdx;
  const progress = (answeredCount / totalQ) * 100;

  function handleSelect(optIdx: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    setExpandedLearn(null);

    setTimeout(() => {
      const opt = currentQ.options[optIdx];

      if (phase === "triage") {
        const ns = { ...triadScores };
        if (opt.triad) ns[opt.triad] = (ns[opt.triad] || 0) + 1;

        if (qIdx < triageQuestions.length - 1) {
          setTriadScores(ns);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          const dominant = Object.entries(ns).sort(([, a], [, b]) => b - a)[0][0] as Triad;
          setPhase(dominant!);
          setQIdx(0);
          setSelectedOption(null);
        }
      } else {
        const ns = { ...typeScores };
        // Primary type (index 0) gets full weight; look-alikes (index 1+) get half weight
        // This prevents winner-take-all triage errors: a 6 trapped in gut phase still gets
        // partial credit for Type 6 via the "inner critic" Type 1 option.
        (opt.types || []).forEach((t, i) => {
          const w = opt.weight || 1;
          const scaled = i === 0 ? w : w * 0.5;
          ns[t] = (ns[t] || 0) + scaled;
        });

        if (qIdx < phaseQuestions.length - 1) {
          setTypeScores(ns);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          setTypeScores(ns);
          setResult(computeResult(ns));
          setPhase("confirm");
          setSelectedOption(null);
        }
      }
    }, 380);
  }

  function toggleLearn(e: React.MouseEvent, idx: number) {
    e.stopPropagation();
    setExpandedLearn(expandedLearn === idx ? null : idx);
  }

  // ── Confirmation phase (Stanford-style: pick which feels more like you) ───
  if (phase === "confirm" && result) {
    const topType = result.type;
    const secondType = result.runnerUp !== result.type ? result.runnerUp : null;
    const topWpfa = TYPE_WPFA[topType];
    const secondWpfa = secondType ? TYPE_WPFA[secondType] : null;
    const topColor = typeColors[topType];
    const secondColor = secondType ? typeColors[secondType] : "#8b5cf6";

    function confirmChoice(chosen: number) {
      // If user picks the runner-up, swap it in as the primary result
      if (chosen !== topType) {
        setResult({
          type: chosen,
          confidence: result!.confidence,
          runnerUp: topType,
        });
      }
      setPhase("instinct");
      setQIdx(0);
      setSelectedOption(null);
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto py-6 px-4"
      >
        {/* Header */}
        <div className="mb-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(139,92,246,0.7)" }}>
            Quick gut check
          </p>
          <h2 className="text-xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>
            Which one feels more like you?
          </h2>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Read both. Pick the one that lands in your chest, not the one that sounds better.
          </p>
        </div>

        <div className="space-y-3">
          {/* Top type card */}
          {topWpfa && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -2 }}
              onClick={() => confirmChoice(topType)}
              className="w-full text-left rounded-2xl p-4 transition-all"
              style={{
                background: `linear-gradient(135deg, ${topColor}14, rgba(255,255,255,0.03))`,
                border: `1.5px solid ${topColor}50`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: `${topColor}22`, color: topColor, border: `1px solid ${topColor}44` }}
                >
                  Type {topType}
                </span>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {typeNames[topType]}
                </span>
              </div>
              <div className="space-y-2">
                {(["wound", "passion", "fixation", "armor"] as const).map((key) => (
                  <div key={key} className="flex gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wide shrink-0 pt-0.5" style={{ color: `${topColor}cc`, minWidth: 52 }}>
                      {key}
                    </span>
                    <span className="text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {topWpfa[key]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.button>
          )}

          {/* Second type card */}
          {secondWpfa && secondType && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -2 }}
              onClick={() => confirmChoice(secondType)}
              className="w-full text-left rounded-2xl p-4 transition-all"
              style={{
                background: `linear-gradient(135deg, ${secondColor}14, rgba(255,255,255,0.03))`,
                border: `1.5px solid ${secondColor}50`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: `${secondColor}22`, color: secondColor, border: `1px solid ${secondColor}44` }}
                >
                  Type {secondType}
                </span>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {typeNames[secondType]}
                </span>
              </div>
              <div className="space-y-2">
                {(["wound", "passion", "fixation", "armor"] as const).map((key) => (
                  <div key={key} className="flex gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wide shrink-0 pt-0.5" style={{ color: `${secondColor}cc`, minWidth: 52 }}>
                      {key}
                    </span>
                    <span className="text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {secondWpfa[key]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.button>
          )}
        </div>

        {/* Soft disclaimer */}
        <p className="text-[11px] text-center mt-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          Neither feels right? Pick the closest one, you'll keep exploring after.
        </p>
      </motion.div>
    );
  }

  // ── Instinct phase (6 forced-choice questions) ─────────────────────────────
  if (phase === "instinct") {
    const iq = instinctQuestions[qIdx];
    if (!iq) {
      // All instinct questions answered, skip result screen and go straight to onComplete
      const stacking = computeInstinct(instinctScores);
      setSelectedInstinct(stacking);
      if (result) onComplete({ ...result, instinct: stacking });
      return null;
    }

    const progress = Math.round(((6 + qIdx) / 12) * 100); // 6 type questions already done

    function pickInstinct(instinct: "sp" | "sx" | "so") {
      const ns = { ...instinctScores, [instinct]: (instinctScores[instinct] ?? 0) + 1 };
      setInstinctScores(ns);
      if (qIdx < instinctQuestions.length - 1) {
        setQIdx(qIdx + 1);
      } else {
        // Skip result screen, go straight to onComplete
        const stacking = computeInstinct(ns);
        setSelectedInstinct(stacking);
        if (result) onComplete({ ...result, instinct: stacking });
      }
    }

    function instinctBack() {
      if (qIdx > 0) {
        // Decrement instinct counter for the last answer (best-effort, may not match)
        setQIdx(qIdx - 1);
      } else {
        // Go back to last type question
        const lastTypePhase = (Object.entries(triadScores).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "head") as "gut" | "heart" | "head";
        const lastPhaseQs = lastTypePhase === "gut" ? gutQuestions : lastTypePhase === "heart" ? heartQuestions : headQuestions;
        setPhase(lastTypePhase);
        setQIdx(lastPhaseQs.length - 1);
        setResult(null);
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto py-6 px-4"
      >
        {/* Back button */}
        <div className="mb-3">
          <button
            onClick={instinctBack}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={11} />
            Back
          </button>
        </div>

        {/* Progress bar, matches type quiz style */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Your drive
            </span>
            <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
              {6 + qIdx + 1} / 12
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef, #ec4899)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Type-contextualized header */}
        {result && qIdx === 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-3 rounded-2xl"
            style={{ background: `${typeColors[result.type]}10`, border: `1px solid ${typeColors[result.type]}30` }}>
            <p className="text-xs" style={{ color: `${typeColors[result.type]}cc` }}>
              Now let's figure out how your Type {result.type} shows up. Everyone has all three drives (survival, intensity, belonging), but one leads.
            </p>
          </motion.div>
        )}

        {/* Question prompt */}
        <motion.div
          key={`q-${qIdx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl font-serif font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.92)" }}>
            Which feels more like you?
          </h2>
          <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Trust your gut, there's no wrong answer.
          </p>
        </motion.div>

        {/* Visual icon row, adds visual interest */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {(["sp", "sx", "so"] as const).map((inst) => {
            const isInQuestion = iq.optionA.instinct === inst || iq.optionB.instinct === inst;
            const labels = { sp: "Survival", sx: "Intensity", so: "Belonging" };
            const colors = { sp: "#10b981", sx: "#ec4899", so: "#3b82f6" };
            return (
              <div
                key={inst}
                className="flex flex-col items-center gap-1 transition-opacity"
                style={{ opacity: isInQuestion ? 1 : 0.18 }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black uppercase"
                  style={{
                    background: isInQuestion ? `${colors[inst]}22` : "rgba(255,255,255,0.05)",
                    color: colors[inst],
                    border: `1px solid ${isInQuestion ? colors[inst] + "55" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {inst}
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {labels[inst]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Cards, match SwipeOption style */}
        <div className="space-y-3">
          {[iq.optionA, iq.optionB].map((opt, i) => {
            const colors = { sp: "#10b981", sx: "#ec4899", so: "#3b82f6" };
            const color = colors[opt.instinct];
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2 }}
                onClick={() => pickInstinct(opt.instinct)}
                className="w-full text-left p-5 rounded-2xl transition-all relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${color}10, rgba(255,255,255,0.03))`,
                  border: `2px solid ${color}30`,
                  boxShadow: `0 4px 16px ${color}10`,
                }}
              >
                {/* Decorative corner badge */}
                <div
                  className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                >
                  {opt.instinct}
                </div>
                <p className="text-sm leading-relaxed pr-12" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {opt.text}
                </p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // ── Result screen ──────────────────────────────────────────────────────────
  if (phase === "result" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto py-10 px-4 text-center"
      >
        {/* Chibi is the FIRST thing they see */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 18, delay: 0.05 }}
          className="relative flex flex-col items-center mb-2"
        >
          {/* Glow ring behind chibi */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 mx-auto"
            style={{
              width: 180, height: 180,
              background: typeColors[result.type],
              top: "10%", left: "50%", transform: "translateX(-50%)",
            }}
          />
          <ChibiSprite type={result.type} instinct={selectedInstinct?.split("/")[0]} size={180} state="happy" className="relative z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold -mt-2 relative z-10"
            style={{ background: `${typeColors[result.type]}25`, color: typeColors[result.type], border: `1px solid ${typeColors[result.type]}40` }}
          >
            Type {result.type} · Starting point
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(167,139,250,0.7)" }}>
            {resolveTypeAwareCopy("quiz.complete.headline", result.type)}
          </p>
          <h2 className="text-2xl font-serif font-bold mb-1 mt-1" style={{ color: "rgba(255,255,255,0.92)" }}>
            {typeNames[result.type]}
          </h2>
          <p className="text-sm italic mb-5 max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            &ldquo;{typeTaglines[result.type]}&rdquo;
          </p>

          {result.runnerUp !== result.type && (
            <div className="flex items-center justify-center mb-3">
              <div className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                Also consider: Type {result.runnerUp}
              </div>
            </div>
          )}

          {/* Deep assessment upsell, soft, one-line */}
          <a
            href="/assessments/ieq9-integrative"
            className="block text-center text-[11px] font-medium mb-5 transition-colors"
            style={{ color: "rgba(167,139,250,0.55)" }}
          >
            Want a deeper, more accurate read? → Take the integrative assessment (175 items, ~25 min)
          </a>

          {/* Share result for tokens */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.7)" }}>
                Share your type
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {resultShareHook.isVerified
                  ? "+20 tokens earned!"
                  : resultShareHook.canEarn
                    ? "earn +20 tokens"
                    : "already earned today"}
              </p>
            </div>
            <button
              onClick={resultShareHook.share}
              disabled={resultShareHook.isSharing}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-60"
              style={{
                background: resultShareHook.isVerified
                  ? "linear-gradient(135deg, #fbbf24, #f97316)"
                  : `linear-gradient(135deg, ${typeColors[result.type]}, ${typeColors[result.type]}aa)`,
              }}
            >
              {resultShareHook.isVerified ? (
                <><Zap className="w-3.5 h-3.5" />+20t!</>
              ) : (
                <><Share2 className="w-3.5 h-3.5" />Share</>
              )}
            </button>
          </motion.div>

          {selectedInstinct && (
            <p className="text-xs mb-5 font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
              Instinct: {selectedInstinct.toUpperCase()}
            </p>
          )}

          <button
            onClick={() => onComplete({ ...result, instinct: selectedInstinct ?? undefined })}
            className="w-full py-4 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-xl"
            style={{ background: `linear-gradient(135deg, ${typeColors[result.type]}, ${typeColors[result.type]}aa)` }}
          >
            <Check className="w-4 h-4" />
            This is me
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // Dead "subtype" phase removed — instinct is now determined by the
  // instinct questions phase and stored in selectedInstinct. The old
  // subtype picker was unreachable and showed generic sp descriptions.

  // ── Question screen ────────────────────────────────────────────────────────
  const progressLabel = phase === "triage"
    ? `Finding your center (${qIdx + 1} of ${triageQuestions.length})`
    : `Narrowing your type (${qIdx + 1} of ${phaseQuestions.length})`;

  // Back button: decrement question index (visual only, score stays for simplicity)
  const canGoBack = qIdx > 0 || phase !== "triage";
  function handleBack() {
    setSelectedOption(null);
    setExpandedLearn(null);
    if (qIdx > 0) {
      setQIdx(qIdx - 1);
    } else if (phase === "gut" || phase === "heart" || phase === "head") {
      setPhase("triage");
      setQIdx(triageQuestions.length - 1);
    }
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4">
      {/* Top row: back + skip */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handleBack}
          disabled={!canGoBack}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all disabled:opacity-30"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Previous question"
        >
          <ArrowLeft size={11} />
          Back
        </button>
        <button
          onClick={() => { setShowSkipConfirm(!showSkipConfirm); setSkipErr(""); }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full transition-all text-[11px] font-semibold"
          style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}
        >
          <SkipForward size={11} />
          Skip ({SKIP_COST}t)
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>{progressLabel}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {/* Skip confirmation dropdown */}
        <AnimatePresence>
          {showSkipConfirm && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="mt-2 p-3 rounded-2xl"
              style={{ background: "rgba(22,12,48,0.95)", border: "1px solid rgba(251,191,36,0.25)" }}
            >
              <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                Skip this quiz for <span className="text-amber-300 font-bold">{SKIP_COST} tokens</span>? You have {tokenBalance}.
              </p>
              {skipErr && <p className="text-xs text-red-400 mb-2">{skipErr}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleSkipQuiz}
                  disabled={tokenBalance < SKIP_COST}
                  className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #d97706, #fbbf24)", color: "#000" }}
                >
                  <Zap size={10} className="inline mr-1" />
                  Skip for {SKIP_COST}t
                </button>
                <button
                  onClick={() => setShowSkipConfirm(false)}
                  className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
                >
                  Keep going
                </button>
              </div>
              {tokenBalance < SKIP_COST && (
                <p className="text-[10px] mt-2 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Earn tokens through daily practice
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${phase}-${qIdx}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question text */}
          <div className="mb-5">
            <h2 className="text-xl font-serif font-semibold leading-snug mb-1"
              style={{ color: "rgba(255,255,255,0.9)" }}>
              {currentQ.text}
            </h2>
            {currentQ.sub && (
              <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.35)" }}>{currentQ.sub}</p>
            )}
          </div>

          {/* Options. swipeable */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => (
              <SwipeOption
                key={i}
                opt={opt}
                i={i}
                selectedOption={selectedOption}
                expandedLearn={expandedLearn}
                onSelect={handleSelect}
                onToggleLearn={toggleLearn}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
