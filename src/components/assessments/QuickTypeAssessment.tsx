"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, BookOpen } from "lucide-react";

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
    sub: "Go with your gut — not what you should want",
    options: [
      {
        text: "To feel safe and prepared",
        detail: "Knowing what's coming and having a plan",
        triad: "head",
        learn: "Oscar Ichazo identified Fear as the core emotion of the Head center — Types 5, 6, and 7 all share an underlying anxiety about the future. When things get difficult, their attention moves to the mind: gathering information, planning, imagining alternatives. Riso & Hudson describe this center as the 'support' triad — these types seek mental frameworks to feel secure.",
      },
      {
        text: "To feel loved and valued",
        detail: "To know people truly see and appreciate you",
        triad: "heart",
        learn: "Ichazo identified Shame as the core emotion of the Heart center (Types 2, 3, 4). Under stress, these types turn toward questions of worth and connection: 'Am I loved? Do people see me?' Riso & Hudson describe this center as preoccupied with self-image — who you are to others and whether your emotional needs are being met.",
      },
      {
        text: "To feel in control and respected",
        detail: "Not to be pushed around or ignored",
        triad: "gut",
        learn: "Ichazo identified Anger as the core emotion of the Gut center (Types 8, 9, 1). When overwhelmed, these types react to whether they have autonomy, integrity, and solid ground. Claudio Naranjo described gut types as driven by a need to maintain their personal territory — physical, emotional, or moral.",
      },
    ],
  },
  {
    id: "t2",
    phase: "triage",
    text: "When you make a mistake, what hits first?",
    sub: "Before you can even think — what do you feel?",
    options: [
      {
        text: "Fear",
        detail: "Worry about what might go wrong because of it",
        triad: "head",
        learn: "In Ichazo's original Arica training, the Head center was the seat of Fear — a constant anticipation of what could go wrong. David Daniels (Stanford) noted that Head types respond to error by immediately scanning consequences: 'What does this mean for the future? What do I need to do now to be safe?'",
      },
      {
        text: "Shame",
        detail: "A sting of embarrassment about how you look",
        triad: "heart",
        learn: "Ichazo taught that the Heart center's underlying affect is Shame — a painful awareness of one's self-image in relation to others. Helen Palmer described it this way: Heart types experience mistakes as a public failure. The first hit is 'What does this say about me, and do people still value me?'",
      },
      {
        text: "Anger",
        detail: "Frustration at yourself or the situation",
        triad: "gut",
        learn: "Ichazo placed Anger at the core of the Gut/Body center. Claudio Naranjo expanded on this: gut types respond to mistakes with a visceral reaction — anger turned inward as self-criticism (Type 1), anger that erupts outward (Type 8), or anger that goes numb and disappears into numbness (Type 9).",
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
        learn: "Riso & Hudson ('The Wisdom of the Enneagram') describe the Head center as the seat of mental perception — types here are gifted at analysis, forethought, and systematic thinking. They are often seen as thoughtful and deliberate because their attention naturally goes to understanding and anticipating.",
      },
      {
        text: "Feeling and image-aware",
        detail: "You notice how things land emotionally and socially",
        triad: "heart",
        learn: "The Heart center governs emotional intelligence and self-presentation. Heart types are often the most interpersonally aware people in a room — they instinctively read the emotional temperature and are acutely conscious of how they and others come across. Naranjo described this as an orientation toward 'the human field.'",
      },
      {
        text: "Action-oriented and direct",
        detail: "You just do — instinct first, reflect later",
        triad: "gut",
        learn: "Ichazo placed instinct and somatic knowing in the Gut center. Gut types experience the world physically and act on instinct rather than deliberation. Naranjo described them as having a more immediate, embodied engagement with reality — they respond first and analyze later.",
      },
    ],
  },
];

const gutQuestions: Question[] = [
  {
    id: "g1",
    phase: "gut",
    text: "Your anger usually shows up as...",
    sub: "Anger is the core passion of the Gut center — Ichazo",
    options: [
      {
        text: "A quiet inner critic",
        detail: "Resentment that things aren't how they should be",
        types: [1], weight: 2,
        learn: "Ichazo named Type 1's passion as Anger, but Naranjo refined it: 1s experience anger as resentment — a smoldering dissatisfaction that reality fails the inner standard. Riso & Hudson describe it as the Superego turned inward: self-criticism, perfectionism, and a constant voice measuring everything against an ideal.",
      },
      {
        text: "Hot and direct",
        detail: "You confront — you don't hide when you're furious",
        types: [8], weight: 2,
        learn: "Type 8's passion, as named by Ichazo and developed by Naranjo, is Lust — an excess of vital energy that expresses as intensity and confrontation. Naranjo described 8s as having a 'counter-dependency': they push back, go big, and don't hide what they feel. The anger is the energy of life itself moving through them.",
      },
      {
        text: "Mostly suppressed",
        detail: "You go numb, merge, avoid the conflict",
        types: [9], weight: 2,
        learn: "Ichazo named Type 9's passion as Sloth — not laziness, but a deadening to one's own priorities and feelings, including anger. Naranjo called this 'narcotization': 9s merge with others and their environment, and anger gets buried under a desire to keep things comfortable and undisturbed.",
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
        learn: "Riso & Hudson describe Type 1's core desire as 'to be good, to have integrity, to be balanced.' Ichazo identified the 1's Holy Idea as Perfection — in its healthy form, a recognition that reality is already whole. The ego then fixates on trying to achieve that perfection through effort and self-correction.",
      },
      {
        text: "To be strong and self-reliant",
        detail: "To never be controlled, to protect what matters",
        types: [8], weight: 2,
        learn: "Type 8's core desire, per Riso & Hudson, is 'to protect themselves, to determine their own course in life.' Naranjo wrote that 8s hold a deep belief in the harshness of the world — you must be strong to survive. Self-reliance isn't a preference; it is a survival strategy.",
      },
      {
        text: "To have peace and harmony",
        detail: "To be okay, to merge, to avoid disruption",
        types: [9], weight: 2,
        learn: "Ichazo's Holy Idea for Type 9 is Love — a cosmic participation in existence without separation. The 9's ego pursues this as merging: keeping the peace, avoiding conflict, and going along with others to maintain an inner sense that everything is okay. Riso & Hudson describe this as the 9's central agenda: stability above all.",
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
        learn: "Riso & Hudson identify Type 1's core fear as 'being corrupt, evil, or defective.' This fear drives relentless self-improvement. Ichazo's ego-fixation for 1 is Resentment — the anger that arises when reality fails to match the internal ideal. The fear and the anger feed each other in a continuous loop.",
      },
      {
        text: "Being controlled or harmed by others",
        detail: "Being weak or betrayed",
        types: [8], weight: 3,
        learn: "Type 8's core fear is 'being harmed or controlled by others,' per Riso & Hudson. Ichazo's passion for 8 is Lust — an excess that protects against vulnerability. Naranjo described 8s as having a counter-phobic relationship to weakness: they go toward it aggressively so it can never sneak up on them.",
      },
      {
        text: "Loss and separation",
        detail: "The world falling apart, nothing mattering",
        types: [9], weight: 3,
        learn: "Riso & Hudson identify Type 9's core fear as 'loss and separation, of annihilation.' The 9's strategy is to merge and go along — as long as there's no conflict, there's no loss. Naranjo described the 9's core avoidance as their own existence: to feel their desires fully would risk separating from others.",
      },
    ],
  },
];

const heartQuestions: Question[] = [
  {
    id: "h1",
    phase: "heart",
    text: "Your sense of self mostly comes from...",
    sub: "Shame is the core passion of the Heart center — Ichazo",
    options: [
      {
        text: "Being needed and appreciated",
        detail: "Knowing people value you for what you give",
        types: [2], weight: 2,
        learn: "Ichazo's passion for Type 2 is Pride — not arrogance, but an inflation of self-worth through giving. Naranjo described 2s as convinced they know what others need, and receiving appreciation confirms this. Riso & Hudson note that 2's self-image is 'I am a loving, caring person' — a story maintained through constant acts of service.",
      },
      {
        text: "What you achieve and how you're seen",
        detail: "Your image, status, and accomplishments",
        types: [3], weight: 2,
        learn: "Ichazo's passion for Type 3 is Deceit — not dishonesty, but a self-deception where the persona becomes confused with the real self. Naranjo wrote that 3s adapt their image to what succeeds in a given context. Riso & Hudson: 'I am what I do. I am what I produce.' The performance becomes identity.",
      },
      {
        text: "Your unique identity and depth",
        detail: "Being authentic, different, emotionally real",
        types: [4], weight: 2,
        learn: "Ichazo's passion for Type 4 is Envy — a longing for what others seem to have that the 4 feels is missing in themselves. Naranjo described 4s as oriented toward authenticity: they construct and protect a sense of unique, special identity as a defense against feeling fundamentally defective. Riso & Hudson call this 'the identity type.'",
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
        learn: "Type 2's core fear, per Riso & Hudson, is 'being unwanted, being unloved, being thought unworthy of love.' Since 2s build their self-image on caring, being seen as selfish collapses the very foundation of who they believe themselves to be. Naranjo described this as the 2's 'giving to receive' — a cycle that can tip into manipulation.",
      },
      {
        text: "Being exposed as a failure or fraud",
        detail: "Your accomplishments falling apart publicly",
        types: [3], weight: 2,
        learn: "Type 3's core fear is 'being a failure or being worthless,' per Riso & Hudson. The image is everything — because the 3 has often lost touch with a self beneath the performance. Naranjo described this as a 'marketing orientation': your value is your presentation, so exposure of failure is existential.",
      },
      {
        text: "Having no identity — being ordinary",
        detail: "Being unseen, generic, without depth",
        types: [4], weight: 2,
        learn: "Type 4's core fear, per Riso & Hudson, is 'having no identity or personal significance.' The 4 builds an elaborate interior life and unique presentation to avoid the terror of being nobody. Naranjo described 4s as having an 'aristocratic' self-image: special, rare, and not to be confused with the ordinary.",
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
        learn: "Naranjo described Type 2s as 'other-referencing' — their attention moves naturally toward others' needs, desires, and feelings. Helen Palmer noted that 2s are often extraordinarily attuned to what people want and build connection through that attunement. The cost: they often lose track of their own needs entirely.",
      },
      {
        text: "Put your best self forward",
        detail: "Presenting your competence and appeal",
        types: [3], weight: 2,
        learn: "Riso & Hudson describe 3s as naturally adapting their presentation to what will be most admired. In relationships, this shows up as always presenting competence, success, and appeal. Naranjo noted that 3s may not realize they're performing — the persona has become genuinely confused with the self.",
      },
      {
        text: "Look for deep, authentic connection",
        detail: "Or pull back when it feels too surface",
        types: [4], weight: 2,
        learn: "Helen Palmer wrote that 4s are oriented toward depth and authenticity in relationships — they become restless with what feels superficial. Riso & Hudson note that 4s idealize connection while also withdrawing: the longing for deep union coexists with a fear of actually being seen and found lacking.",
      },
    ],
  },
];

const headQuestions: Question[] = [
  {
    id: "hd1",
    phase: "head",
    text: "When you're anxious, your mind...",
    sub: "Fear is the core passion of the Head center — Ichazo",
    options: [
      {
        text: "Goes deep on one thing",
        detail: "Researching, analyzing, pulling away to think",
        types: [5], weight: 2,
        learn: "Ichazo's passion for Type 5 is Avarice — not greed for money, but hoarding of energy, time, and knowledge. Naranjo described 5s as retreating to the mind when overwhelmed: they process privately, going deeper rather than wider. Riso & Hudson call this 'the investigative mode' — anxiety is managed by becoming the expert.",
      },
      {
        text: "Scans for what could go wrong",
        detail: "Questioning, anticipating threats, seeking reassurance",
        types: [6], weight: 2,
        learn: "Ichazo's passion for Type 6 is Fear — a constant vigilance to threat. Naranjo described 6s as having a 'paranoid scanning' of the environment for danger, betrayal, or inconsistency. Riso & Hudson note that 6s often test others to see if they can be trusted, because the baseline assumption is that things are not safe.",
      },
      {
        text: "Jumps to future possibilities",
        detail: "Planning, reframing, imagining what's next",
        types: [7], weight: 2,
        learn: "Ichazo's passion for Type 7 is Gluttony — a hunger for experience, options, and stimulation. Naranjo described 7s as using imagination to escape present discomfort: when anxious, they plan, reframe, or jump to what's next. Riso & Hudson call this 'anticipatory thinking' — the future is always more exciting than the present trouble.",
      },
    ],
  },
  {
    id: "hd2",
    phase: "head",
    text: "What do you most protect?",
    options: [
      {
        text: "Your private inner world and energy",
        detail: "You need alone time to think and recharge",
        types: [5], weight: 2,
        learn: "Riso & Hudson identify Type 5's core desire as 'to be capable and competent.' The way 5s protect this is by managing their exposure and energy output carefully. Naranjo wrote about 5s 'retreating behind a wall' — they give out very little of themselves and guard private space intensely.",
      },
      {
        text: "Your security and trusted alliances",
        detail: "Knowing who you can count on, having backup plans",
        types: [6], weight: 2,
        learn: "Type 6's core desire, per Riso & Hudson, is 'to have security and support.' Naranjo described 6s as keenly aware of who is reliable and who isn't — they build alliances carefully and test loyalty over time. Helen Palmer noted that 6s often have a strong sense of duty to the group or institution that offers security.",
      },
      {
        text: "Your freedom and options",
        detail: "Not being trapped, keeping the future open",
        types: [7], weight: 2,
        learn: "Type 7's core desire, per Riso & Hudson, is 'to be satisfied and content — to have their needs fulfilled.' What 7s most protect is their sense of possibility. Naranjo described 7s as deeply committed to keeping options open — commitment to one path feels like losing every other path.",
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
        learn: "Riso & Hudson identify Type 5's core fear as 'being helpless, useless, incapable.' The solution is knowledge: if you understand something thoroughly enough, you can't be caught off guard. Ichazo's fixation for 5 is Stinginess — a hoarding of inner resources to ensure there will always be enough left.",
      },
      {
        text: "Being without support or guidance",
        detail: "Being alone in a dangerous world",
        types: [6], weight: 3,
        learn: "Type 6's core fear is 'being without support and guidance,' per Riso & Hudson. This explains the 6's complicated relationship to authority — they often seek it for reassurance, then question it (because what if authority itself fails?). Naranjo called this 'ambivalence toward authority': you need it, but you can't fully trust it.",
      },
      {
        text: "Being trapped in pain or missing out",
        detail: "Being limited, bored, or deprived of joy",
        types: [7], weight: 3,
        learn: "Riso & Hudson identify Type 7's core fear as 'being deprived and in pain.' The response is to move — toward new experiences, options, and positive reframes. Naranjo described 7s as having a counter-phobic relationship to limitation: they flee it aggressively, planning and imagining their way into a more abundant future.",
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
  1: "The voice that says things can be better — and won't rest until they are.",
  2: "The heart that gives freely, and aches to be truly seen in return.",
  3: "The achiever who shapes an image to match what the world rewards.",
  4: "The soul searching for what's real — even when it hurts.",
  5: "The observer who retreats to understand before they act.",
  6: "The loyal skeptic who prepares for the worst while hoping for the best.",
  7: "The optimist who keeps the future bright so the present stays bearable.",
  8: "The force that refuses to be controlled or pushed aside.",
  9: "The peacemaker who merges with the world to keep the peace within.",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuickTypeAssessment({
  onComplete,
}: {
  onComplete: (result: { type: number; confidence: number; runnerUp: number }) => void;
}) {
  const [triadScores, setTriadScores] = useState<Record<string, number>>({ gut: 0, heart: 0, head: 0 });
  const [typeScores, setTypeScores] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<"triage" | "gut" | "heart" | "head" | "result">("triage");
  const [qIdx, setQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [expandedLearn, setExpandedLearn] = useState<number | null>(null);
  const [result, setResult] = useState<{ type: number; confidence: number; runnerUp: number } | null>(null);

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
          setPhase("result");
        }
      }
    }, 380);
  }

  function toggleLearn(e: React.MouseEvent, idx: number) {
    e.stopPropagation();
    setExpandedLearn(expandedLearn === idx ? null : idx);
  }

  // ── Result screen ──────────────────────────────────────────────────────────
  if (phase === "result" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto py-10 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
          className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-serif font-bold"
          style={{ backgroundColor: typeColors[result.type], boxShadow: `0 16px 48px ${typeColors[result.type]}50` }}
        >
          {result.type}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-serif font-bold mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>
            Type {result.type}: {typeNames[result.type]}
          </h2>
          <p className="text-sm italic mb-6 max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            "{typeTaglines[result.type]}"
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `${typeColors[result.type]}25`, color: typeColors[result.type] }}>
              {result.confidence}% match
            </div>
            {result.runnerUp !== result.type && (
              <div className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                Also consider: Type {result.runnerUp}
              </div>
            )}
          </div>

          <button
            onClick={() => onComplete(result)}
            className="w-full py-4 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-xl"
            style={{ background: `linear-gradient(135deg, ${typeColors[result.type]}, ${typeColors[result.type]}aa)` }}
          >
            <Check className="w-4 h-4" />
            Save My Type &amp; See Profile
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const progressLabel = phase === "triage"
    ? `Finding your center · ${qIdx + 1} of ${triageQuestions.length}`
    : `Narrowing your type · ${qIdx + 1} of ${phaseQuestions.length}`;

  return (
    <div className="max-w-lg mx-auto py-6 px-4">
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

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isLearnOpen = expandedLearn === i;
              const isDimmed = selectedOption !== null && !isSelected;

              return (
                <motion.div
                  key={i}
                  animate={{ opacity: isDimmed ? 0.35 : 1 }}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    border: isSelected
                      ? "2px solid rgba(139,92,246,0.7)"
                      : "2px solid rgba(255,255,255,0.08)",
                    background: isSelected
                      ? "rgba(139,92,246,0.12)"
                      : "rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Tap-to-select row */}
                  <button
                    onClick={() => handleSelect(i)}
                    className="w-full text-left px-4 pt-4 pb-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected ? "border-violet-400 bg-violet-500" : ""
                      }`}
                        style={!isSelected ? { borderColor: "rgba(255,255,255,0.25)" } : {}}>
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

                  {/* Learn more toggle */}
                  <button
                    onClick={(e) => toggleLearn(e, i)}
                    className="w-full flex items-center gap-1.5 px-4 pb-3 transition-opacity"
                    style={{ color: "rgba(139,92,246,0.7)" }}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      {isLearnOpen ? "Hide theory" : "Why does this matter? ↓"}
                    </span>
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
                        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {opt.learn}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
