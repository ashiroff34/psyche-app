"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { Check, ChevronDown, BookOpen, Zap, SkipForward, Share2 } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import { useVerifiedShare } from "@/hooks/useVerifiedShare";

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
    text: "When life gets hard, what do you most want?",
    sub: "Go with your gut. Not what you should want.",
    options: [
      {
        text: "To feel safe and prepared",
        detail: "Knowing what's coming and having a plan",
        triad: "head",
        learn: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
      },
      {
        text: "To feel loved and valued",
        detail: "To know people truly see and appreciate you",
        triad: "heart",
        learn: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
      },
      {
        text: "To feel in control and respected",
        detail: "Not to be pushed around or ignored",
        triad: "gut",
        learn: "Gut types (1, 8, 9) share a visceral relationship with anger — whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
      },
    ],
  },
  {
    id: "t2",
    phase: "triage",
    text: "When you make a mistake, what hits first?",
    sub: "Before you can even think: what do you feel?",
    options: [
      {
        text: "Fear",
        detail: "Worry about what might go wrong because of it",
        triad: "head",
        learn: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
      },
      {
        text: "Shame",
        detail: "A sting of embarrassment about how you look",
        triad: "heart",
        learn: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
      },
      {
        text: "Anger",
        detail: "Frustration at yourself or the situation",
        triad: "gut",
        learn: "Gut types (1, 8, 9) share a visceral relationship with anger — whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
      },
    ],
  },
  {
    id: "t3",
    phase: "triage",
    text: "People who know you well would say you're...",
    options: [
      {
        text: "Analytical and careful",
        detail: "You think things through, prepare, and question",
        triad: "head",
        learn: "Head types (5, 6, 7) share a background anxiety about safety and certainty. Their wound is about adequacy: Do I have enough inside to handle what's coming? Can I trust what I think I know?",
      },
      {
        text: "Feeling and image-aware",
        detail: "You notice how things land emotionally and socially",
        triad: "heart",
        learn: "Heart types (2, 3, 4) share a deep uncertainty about their own worth. Their wound is about identity: Am I lovable? Am I enough? Do I even exist without the performance?",
      },
      {
        text: "Action-oriented and direct",
        detail: "You just do. Instinct first, reflect later.",
        triad: "gut",
        learn: "Gut types (1, 8, 9) share a visceral relationship with anger — whether they redirect it inward, express it outward, or bury it completely. Their wound is about autonomy: being controlled, being bad, or being invisible.",
      },
    ],
  },
];

const gutQuestions: Question[] = [
  {
    id: "g1",
    phase: "gut",
    text: "Your anger usually shows up as...",
    sub: "How does frustration show up for you?",
    options: [
      {
        text: "A quiet inner critic",
        detail: "Resentment that things aren't how they should be",
        types: [1], weight: 2,
        learn: "Wound: I am only safe if I am good, correct, and beyond criticism.\n\nPassion: constant low hum of anger at everything that falls short — including themselves.\n\nFixation: brain runs the comparison between what is and what should be on loop, automatically.\n\nArmor: the perfectionist — highest standards in the room, holds themselves to it hardest.",
      },
      {
        text: "Hot and direct",
        detail: "You confront. You don't hide when you're furious.",
        types: [8], weight: 2,
        learn: "Wound: vulnerability gets you hurt, the world takes from the weak, I will never be weak.\n\nPassion: lust — excess of intensity, aggressive aliveness, needs to feel everything at full volume.\n\nFixation: brain always tracking power and violation — who has it, who's using it wrong.\n\nArmor: the protector — buried softness completely, leads with force because force kept them safe when tenderness didn't.",
      },
      {
        text: "Mostly suppressed",
        detail: "You go numb, merge, avoid the conflict",
        types: [9], weight: 2,
        learn: "Wound: my presence and needs create problems, safest thing is to disappear.\n\nPassion: sloth — deep numbing of own desire and agenda, chronic forgetting of what they actually want.\n\nFixation: brain drifts toward whatever keeps things comfortable, away from asserting own presence.\n\nArmor: the peacemaker — everyone loves them, no one really knows them, loses the thread of themselves adapting to others.",
      },
    ],
  },
  {
    id: "g2",
    phase: "gut",
    text: "What you want most is...",
    options: [
      {
        text: "To be good and do the right thing",
        detail: "To live with integrity and have things be correct",
        types: [1], weight: 2,
        learn: "Wound: I am only safe if I am good, correct, and beyond criticism.\n\nPassion: constant low hum of anger at everything that falls short — including themselves.\n\nFixation: brain runs the comparison between what is and what should be on loop, automatically.\n\nArmor: the perfectionist — highest standards in the room, holds themselves to it hardest.",
      },
      {
        text: "To be strong and self-reliant",
        detail: "To never be controlled, to protect what matters",
        types: [8], weight: 2,
        learn: "Wound: vulnerability gets you hurt, the world takes from the weak, I will never be weak.\n\nPassion: lust — excess of intensity, aggressive aliveness, needs to feel everything at full volume.\n\nFixation: brain always tracking power and violation — who has it, who's using it wrong.\n\nArmor: the protector — buried softness completely, leads with force because force kept them safe when tenderness didn't.",
      },
      {
        text: "To have peace and harmony",
        detail: "To be okay, to merge, to avoid disruption",
        types: [9], weight: 2,
        learn: "Wound: my presence and needs create problems, safest thing is to disappear.\n\nPassion: sloth — deep numbing of own desire and agenda, chronic forgetting of what they actually want.\n\nFixation: brain drifts toward whatever keeps things comfortable, away from asserting own presence.\n\nArmor: the peacemaker — everyone loves them, no one really knows them, loses the thread of themselves adapting to others.",
      },
    ],
  },
  {
    id: "g3",
    phase: "gut",
    text: "Your deepest fear is...",
    options: [
      {
        text: "Being corrupt, wrong, or bad",
        detail: "Violating your own principles",
        types: [1], weight: 3,
        learn: "Wound: I am only safe if I am good, correct, and beyond criticism.\n\nPassion: constant low hum of anger at everything that falls short — including themselves.\n\nFixation: brain runs the comparison between what is and what should be on loop, automatically.\n\nArmor: the perfectionist — highest standards in the room, holds themselves to it hardest.",
      },
      {
        text: "Being controlled or harmed by others",
        detail: "Being weak or betrayed",
        types: [8], weight: 3,
        learn: "Wound: vulnerability gets you hurt, the world takes from the weak, I will never be weak.\n\nPassion: lust — excess of intensity, aggressive aliveness, needs to feel everything at full volume.\n\nFixation: brain always tracking power and violation — who has it, who's using it wrong.\n\nArmor: the protector — buried softness completely, leads with force because force kept them safe when tenderness didn't.",
      },
      {
        text: "Loss and separation",
        detail: "The world falling apart, nothing mattering",
        types: [9], weight: 3,
        learn: "Wound: my presence and needs create problems, safest thing is to disappear.\n\nPassion: sloth — deep numbing of own desire and agenda, chronic forgetting of what they actually want.\n\nFixation: brain drifts toward whatever keeps things comfortable, away from asserting own presence.\n\nArmor: the peacemaker — everyone loves them, no one really knows them, loses the thread of themselves adapting to others.",
      },
    ],
  },
];

const heartQuestions: Question[] = [
  {
    id: "h1",
    phase: "heart",
    text: "Your sense of self mostly comes from...",
    sub: "Where does your sense of self come from?",
    options: [
      {
        text: "Being needed and appreciated",
        detail: "Knowing people value you for what you give",
        types: [2], weight: 2,
        learn: "Wound: I am only lovable if I am needed.\n\nPassion: pride in being the one who gives and is depended on — masks terror of own needs.\n\nFixation: brain constantly scans every room for what people need and how to provide it.\n\nArmor: the helper — shows up for everyone, quietly resents no one shows up the same way back.",
      },
      {
        text: "What you achieve and how you're seen",
        detail: "Your image, status, and accomplishments",
        types: [3], weight: 2,
        learn: "Wound: I am only lovable if I am succeeding.\n\nPassion: vanity — deep replacement of actual identity with whatever image gets most approval.\n\nFixation: brain constantly manages perception, constructs the version that lands best in any room.\n\nArmor: the achiever — always on, always impressive, no idea who they are when the room is empty.",
      },
      {
        text: "Your unique identity and depth",
        detail: "Being authentic, different, emotionally real",
        types: [4], weight: 2,
        learn: "Wound: something is fundamentally missing in me that everyone else has naturally.\n\nPassion: envy — chronic painful awareness of the gap between who they are and who they feel they should be.\n\nFixation: brain keeps returning to what's absent, what's lost, what's longed for.\n\nArmor: the depth, the aesthetic intensity — turns pain into something beautiful to make it mean something.",
      },
    ],
  },
  {
    id: "h2",
    phase: "heart",
    text: "What would devastate you most?",
    options: [
      {
        text: "Being seen as selfish or uncaring",
        detail: "People thinking you only help for yourself",
        types: [2], weight: 2,
        learn: "Wound: I am only lovable if I am needed.\n\nPassion: pride in being the one who gives and is depended on — masks terror of own needs.\n\nFixation: brain constantly scans every room for what people need and how to provide it.\n\nArmor: the helper — shows up for everyone, quietly resents no one shows up the same way back.",
      },
      {
        text: "Being exposed as a failure or fraud",
        detail: "Your accomplishments falling apart publicly",
        types: [3], weight: 2,
        learn: "Wound: I am only lovable if I am succeeding.\n\nPassion: vanity — deep replacement of actual identity with whatever image gets most approval.\n\nFixation: brain constantly manages perception, constructs the version that lands best in any room.\n\nArmor: the achiever — always on, always impressive, no idea who they are when the room is empty.",
      },
      {
        text: "Having no identity. Being ordinary.",
        detail: "Being unseen, generic, without depth",
        types: [4], weight: 2,
        learn: "Wound: something is fundamentally missing in me that everyone else has naturally.\n\nPassion: envy — chronic painful awareness of the gap between who they are and who they feel they should be.\n\nFixation: brain keeps returning to what's absent, what's lost, what's longed for.\n\nArmor: the depth, the aesthetic intensity — turns pain into something beautiful to make it mean something.",
      },
    ],
  },
  {
    id: "h3",
    phase: "heart",
    text: "In relationships, you most naturally...",
    options: [
      {
        text: "Focus on what the other person needs",
        detail: "Tuning in to them, often before yourself",
        types: [2], weight: 2,
        learn: "Wound: I am only lovable if I am needed.\n\nPassion: pride in being the one who gives and is depended on — masks terror of own needs.\n\nFixation: brain constantly scans every room for what people need and how to provide it.\n\nArmor: the helper — shows up for everyone, quietly resents no one shows up the same way back.",
      },
      {
        text: "Put your best self forward",
        detail: "Presenting your competence and appeal",
        types: [3], weight: 2,
        learn: "Wound: I am only lovable if I am succeeding.\n\nPassion: vanity — deep replacement of actual identity with whatever image gets most approval.\n\nFixation: brain constantly manages perception, constructs the version that lands best in any room.\n\nArmor: the achiever — always on, always impressive, no idea who they are when the room is empty.",
      },
      {
        text: "Look for deep, authentic connection",
        detail: "Or pull back when it feels too surface",
        types: [4], weight: 2,
        learn: "Wound: something is fundamentally missing in me that everyone else has naturally.\n\nPassion: envy — chronic painful awareness of the gap between who they are and who they feel they should be.\n\nFixation: brain keeps returning to what's absent, what's lost, what's longed for.\n\nArmor: the depth, the aesthetic intensity — turns pain into something beautiful to make it mean something.",
      },
    ],
  },
];

const headQuestions: Question[] = [
  {
    id: "hd1",
    phase: "head",
    text: "When you're anxious, your mind...",
    sub: "What does your mind do when things feel uncertain?",
    options: [
      {
        text: "Goes deep on one thing",
        detail: "Researching, analyzing, pulling away to think",
        types: [5], weight: 2,
        learn: "Wound: the world is too demanding and I don't have enough inside to meet it.\n\nPassion: avarice — hoarding the self, withholding presence because there might not be enough to go around.\n\nFixation: brain keeps rationing — calculating what can be given and what needs to be kept back.\n\nArmor: the observer — understands everything deeply from a safe distance, only comes out when fully resourced.",
      },
      {
        text: "Scans for what could go wrong",
        detail: "Questioning, anticipating threats, seeking reassurance",
        types: [6], weight: 2,
        learn: "Wound: the world is not safe and I cannot trust my own perception of it.\n\nPassion: fear — constant background hum of threat assessment, what could go wrong, who can be trusted.\n\nFixation: brain keeps doubting itself, seeking confirmation, testing the ground before every step.\n\nArmor: either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
      },
      {
        text: "Jumps to future possibilities",
        detail: "Planning, reframing, imagining what's next",
        types: [7], weight: 2,
        learn: "Wound: what I need won't be there when I need it, so I have to generate it myself.\n\nPassion: gluttony — insatiable hunger for experience and possibility, stopping means feeling what's underneath.\n\nFixation: brain lives in the future, always planning the next scenario to avoid present pain.\n\nArmor: the enthusiast — reframes everything into a lesson or story, makes pain look like growth before they even feel it.",
      },
    ],
  },
  {
    id: "hd2",
    phase: "head",
    text: "What do you most protect?",
    options: [
      {
        text: "I need to thoroughly understand something before I can trust it or invest myself in it. Engaging without enough information feels dangerous.",
        detail: "Comprehension as a prerequisite for safety",
        types: [5], weight: 2,
        learn: "Wound: the world is too demanding and I don't have enough inside to meet it.\n\nPassion: avarice — hoarding the self, withholding presence because there might not be enough to go around.\n\nFixation: brain keeps rationing — calculating what can be given and what needs to be kept back.\n\nArmor: the observer — understands everything deeply from a safe distance, only comes out when fully resourced.",
      },
      {
        text: "Your security and trusted alliances",
        detail: "Knowing who you can count on, having backup plans",
        types: [6], weight: 2,
        learn: "Wound: the world is not safe and I cannot trust my own perception of it.\n\nPassion: fear — constant background hum of threat assessment, what could go wrong, who can be trusted.\n\nFixation: brain keeps doubting itself, seeking confirmation, testing the ground before every step.\n\nArmor: either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
      },
      {
        text: "Your freedom and options",
        detail: "Not being trapped, keeping the future open",
        types: [7], weight: 2,
        learn: "Wound: what I need won't be there when I need it, so I have to generate it myself.\n\nPassion: gluttony — insatiable hunger for experience and possibility, stopping means feeling what's underneath.\n\nFixation: brain lives in the future, always planning the next scenario to avoid present pain.\n\nArmor: the enthusiast — reframes everything into a lesson or story, makes pain look like growth before they even feel it.",
      },
    ],
  },
  {
    id: "hd3",
    phase: "head",
    text: "Your deepest fear is...",
    options: [
      {
        text: "Being incompetent or without resources",
        detail: "Not knowing enough, being depleted",
        types: [5], weight: 3,
        learn: "Wound: the world is too demanding and I don't have enough inside to meet it.\n\nPassion: avarice — hoarding the self, withholding presence because there might not be enough to go around.\n\nFixation: brain keeps rationing — calculating what can be given and what needs to be kept back.\n\nArmor: the observer — understands everything deeply from a safe distance, only comes out when fully resourced.",
      },
      {
        text: "Being without support or guidance",
        detail: "Being alone in a dangerous world",
        types: [6], weight: 3,
        learn: "Wound: the world is not safe and I cannot trust my own perception of it.\n\nPassion: fear — constant background hum of threat assessment, what could go wrong, who can be trusted.\n\nFixation: brain keeps doubting itself, seeking confirmation, testing the ground before every step.\n\nArmor: either the loyal rule-follower who finds safety in systems, or the counterphobic rebel who attacks the threat first.",
      },
      {
        text: "Being trapped in pain or missing out",
        detail: "Being limited, bored, or deprived of joy",
        types: [7], weight: 3,
        learn: "Wound: what I need won't be there when I need it, so I have to generate it myself.\n\nPassion: gluttony — insatiable hunger for experience and possibility, stopping means feeling what's underneath.\n\nFixation: brain lives in the future, always planning the next scenario to avoid present pain.\n\nArmor: the enthusiast — reframes everything into a lesson or story, makes pain look like growth before they even feel it.",
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
    optionA: { text: "I bring intensity and charge into my close relationships — everything feels personal.", instinct: "sx" },
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
  // ── Lazy initializers — restore progress from localStorage on first mount ──
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
  const [phase, setPhase] = useState<"triage" | "gut" | "heart" | "head" | "instinct" | "result" | "subtype">(() => {
    try {
      const s = JSON.parse(localStorage.getItem(QUIZ_SAVE_KEY) || "null");
      if (s?.phase && s.phase !== "result" && s.phase !== "subtype" && s.phase !== "instinct") return s.phase;
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
    // This just dismisses the quiz — the page's onComplete handler navigates away
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
        (opt.types || []).forEach((t) => { ns[t] = (ns[t] || 0) + (opt.weight || 1); });

        if (qIdx < phaseQuestions.length - 1) {
          setTypeScores(ns);
          setQIdx(qIdx + 1);
          setSelectedOption(null);
        } else {
          setResult(computeResult(ns));
          setPhase("instinct");
          setQIdx(0);
          setSelectedOption(null);
        }
      }
    }, 380);
  }

  function toggleLearn(e: React.MouseEvent, idx: number) {
    e.stopPropagation();
    setExpandedLearn(expandedLearn === idx ? null : idx);
  }

  // ── Instinct phase (6 forced-choice questions) ─────────────────────────────
  if (phase === "instinct") {
    const iq = instinctQuestions[qIdx];
    if (!iq) {
      // All instinct questions answered — compute and go to result
      const stacking = computeInstinct(instinctScores);
      setPhase("result");
      // Store instinct alongside result for onComplete
      setSelectedInstinct(stacking);
      return null;
    }

    const progress = Math.round(((6 + qIdx) / 12) * 100); // 6 type questions already done

    function pickInstinct(instinct: "sp" | "sx" | "so") {
      const ns = { ...instinctScores, [instinct]: (instinctScores[instinct] ?? 0) + 1 };
      setInstinctScores(ns);
      if (qIdx < instinctQuestions.length - 1) {
        setQIdx(qIdx + 1);
      } else {
        const stacking = computeInstinct(ns);
        setSelectedInstinct(stacking);
        setPhase("result");
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto py-10 px-4"
      >
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span>Instinctual drive</span>
            <span>{qIdx + 1} / {instinctQuestions.length}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #10b981, #14b8a6)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <p className="text-[11px] uppercase tracking-widest font-bold mb-6" style={{ color: "rgba(16,185,129,0.7)" }}>
          Which feels more like you?
        </p>

        <div className="space-y-3">
          {[iq.optionA, iq.optionB].map((opt, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => pickInstinct(opt.instinct)}
              className="w-full text-left p-5 rounded-2xl transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                {opt.text}
              </p>
            </motion.button>
          ))}
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
          <ChibiSprite type={result.type} size={180} state="happy" className="relative z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold -mt-2 relative z-10"
            style={{ background: `${typeColors[result.type]}25`, color: typeColors[result.type], border: `1px solid ${typeColors[result.type]}40` }}
          >
            Type {result.type} · {result.confidence}% match
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="text-2xl font-serif font-bold mb-1 mt-4" style={{ color: "rgba(255,255,255,0.92)" }}>
            {typeNames[result.type]}
          </h2>
          <p className="text-sm italic mb-5 max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            "{typeTaglines[result.type]}"
          </p>

          {result.runnerUp !== result.type && (
            <div className="flex items-center justify-center mb-5">
              <div className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                Also consider: Type {result.runnerUp}
              </div>
            </div>
          )}

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

  // ── Subtype screen ──────────────────────────────────────────────────────────
  if (phase === "subtype" && result) {
    const typeColor = typeColors[result.type];
    return (
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-lg mx-auto py-10 px-4"
      >
        <div className="text-center mb-7">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: `${typeColor}18`, border: `1px solid ${typeColor}35`, color: typeColor }}
          >
            Type {result.type}. Subtype
          </div>
          <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>
            Unlock your avatar
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            Your instinctual subtype shapes how your type shows up in the world. and unlocks your personalized chibi.
          </p>
        </div>

        <div className="space-y-2 mb-6">
          {INSTINCT_OPTIONS.map(({ code, label, sublabel, desc, detail }) => {
            const isSelected = selectedInstinct === code;
            const isExpanded = expandedInstinct === code;
            return (
              <div
                key={code}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: isSelected ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.05)",
                  border: isSelected ? "1px solid rgba(167,139,250,0.45)" : "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <button
                  onClick={() => setSelectedInstinct(code)}
                  className="w-full text-left px-4 py-3.5 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold" style={{ color: isSelected ? "#c4b5fd" : "rgba(255,255,255,0.65)" }}>
                          {label}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}>
                          {sublabel}
                        </span>
                      </div>
                      <span className="text-xs leading-snug block" style={{ color: isSelected ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.38)" }}>
                        {desc}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedInstinct(isExpanded ? null : code); }}
                      className="shrink-0 mt-0.5 p-1 rounded-lg transition-colors"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
                    >
                      <ChevronDown size={12} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
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
                      <div className="px-4 pb-4 pt-0">
                        <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.07)" }} />
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onComplete({ ...result, instinct: selectedInstinct ?? undefined })}
          disabled={!selectedInstinct}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-35 mb-3"
          style={{
            background: selectedInstinct ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.08)",
            boxShadow: selectedInstinct ? "0 8px 24px rgba(124,58,237,0.45)" : "none",
          }}
        >
          Unlock my avatar →
        </button>
        <button
          onClick={() => onComplete(result)}
          className="w-full text-xs py-2 transition-colors text-center"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Skip for now
        </button>
      </motion.div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const progressLabel = phase === "triage"
    ? `Finding your center (${qIdx + 1} of ${triageQuestions.length})`
    : `Narrowing your type (${qIdx + 1} of ${phaseQuestions.length})`;

  return (
    <div className="max-w-lg mx-auto py-6 px-4">
      {/* Progress bar + skip button */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>{progressLabel}</span>
          <div className="flex items-center gap-3">
            <span>{Math.round(progress)}%</span>
            <button
              onClick={() => { setShowSkipConfirm(!showSkipConfirm); setSkipErr(""); }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full transition-all text-[10px] font-semibold"
              style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}
            >
              <SkipForward size={10} />
              Skip ({SKIP_COST}t)
            </button>
          </div>
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
