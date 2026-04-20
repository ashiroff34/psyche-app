"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain, CheckCircle, XCircle, Zap, ArrowRight, Sparkles } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";
import { TYPE_COLORS } from "@/data/enneagram";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Each card: show a quote/behavior/scenario, guess the type.

interface TypeMatchCard {
  id: number;
  prompt: string;           // The quote or behavior shown
  type: number;             // Correct answer (1-9)
  hint: string;             // Short explanation shown after
  tag: string;              // Label like "Quote", "Behavior", "Scenario"
}

const TYPE_MATCH_CARDS: TypeMatchCard[] = [
  // Type 1
  {
    id: 1, type: 1,
    tag: "Inner Dialogue",
    prompt: '"I keep noticing the typo on that sign. I know it shouldn\'t bother me. But it does. It really does."',
    hint: "Type 1s have a persistent inner critic that tracks all deviations from how things should be.",
  },
  {
    id: 2, type: 1,
    tag: "Behavior",
    prompt: "They re-read the email four times before sending it, changing the punctuation twice and rewriting the opening line entirely.",
    hint: "Type 1s review and refine compulsively, imperfection feels like a moral failing.",
  },
  {
    id: 3, type: 1,
    tag: "Growth Edge",
    prompt: '"Learning to say \'good enough\' was the hardest thing I\'ve ever done. My whole body resisted it."',
    hint: "The 1's growth involves releasing the grip of their inner standard, serenity over self-correction.",
  },
  // Type 2
  {
    id: 4, type: 2,
    tag: "Behavior",
    prompt: "Before their host could even stand up, they had already cleared three dishes from the table and asked if anyone needed water.",
    hint: "Type 2s anticipate others' needs and act on them, often before being asked.",
  },
  {
    id: 5, type: 2,
    tag: "Inner Dialogue",
    prompt: '"Of course I\'m fine. I\'m always fine. I just wish someone would notice that I\'m not fine."',
    hint: "Type 2s suppress their own needs while craving to be seen and appreciated, the hidden cost of their giving.",
  },
  {
    id: 6, type: 2,
    tag: "Quote",
    prompt: '"I don\'t really need much. I just want to know the people I love are okay."',
    hint: "Type 2s reframe their own needs as concern for others, their identity is built around being indispensable.",
  },
  // Type 3
  {
    id: 7, type: 3,
    tag: "Behavior",
    prompt: "They adjusted their speaking style, posture, and even vocabulary depending on who was in the room, and didn't notice they were doing it.",
    hint: "Type 3s shape-shift automatically to match the image that will succeed in any given environment.",
  },
  {
    id: 8, type: 3,
    tag: "Inner Dialogue",
    prompt: '"Rest feels wasteful. I get anxious if I\'m not moving toward something."',
    hint: "Type 3s are driven by their Doing, stopping means confronting the question: who am I when I\'m not performing?",
  },
  {
    id: 9, type: 3,
    tag: "Quote",
    prompt: '"I\'ve hit every goal I set. And yet there\'s always one more. It never actually feels like enough."',
    hint: "Type 3s chase achievement as a substitute for the feeling of being loved for who they are, not what they do.",
  },
  // Type 4
  {
    id: 10, type: 4,
    tag: "Inner Dialogue",
    prompt: '"Everyone else seems to just... fit. I\'ve never quite felt like I belonged anywhere. There\'s something missing in me."',
    hint: "Type 4s experience a persistent sense of deficiency, the feeling that something essential in them is absent.",
  },
  {
    id: 11, type: 4,
    tag: "Behavior",
    prompt: "A good thing happened today, and within an hour, they were already lamenting that it would eventually end.",
    hint: "Type 4s' fixation on melancholy pulls them toward what's absent even in good moments.",
  },
  {
    id: 12, type: 4,
    tag: "Quote",
    prompt: '"I don\'t want to be fixed. I want to be understood."',
    hint: "Type 4s crave deep, authentic recognition of their inner world, not solutions or cheerfulness.",
  },
  // Type 5
  {
    id: 13, type: 5,
    tag: "Behavior",
    prompt: "They spent two hours researching the restaurant before the dinner, not to impress, but because they genuinely needed to know.",
    hint: "Type 5s manage anxiety by gathering knowledge, preparation and information create a sense of inner adequacy.",
  },
  {
    id: 14, type: 5,
    tag: "Inner Dialogue",
    prompt: '"I need time alone to process that. I\'ll know how I feel about it later. Maybe next week."',
    hint: "Type 5s emotionally postpone, they intellectually store experiences and process them after the fact, in private.",
  },
  {
    id: 15, type: 5,
    tag: "Quote",
    prompt: '"I know a tremendous amount about a small number of things, and I\'m okay with that."',
    hint: "Type 5s invest deeply in chosen domains, depth over breadth, specialist over generalist.",
  },
  // Type 6
  {
    id: 16, type: 6,
    tag: "Inner Dialogue",
    prompt: '"I know it\'s fine. But what if it\'s not? I need to think through all the ways it could go wrong."',
    hint: "Type 6s' minds scan for threats and prepare contingencies, this is their defense against a fundamentally unpredictable world.",
  },
  {
    id: 17, type: 6,
    tag: "Behavior",
    prompt: "They were loyal to their team even when it was professionally costly. The loyalty wasn't strategic, it was just who they are.",
    hint: "Type 6s are deeply trustworthy and loyal, especially to structures and people that have proven reliable.",
  },
  {
    id: 18, type: 6,
    tag: "Quote",
    prompt: '"I don\'t fully trust my own judgment. That\'s why I need people I can check with."',
    hint: "Type 6s often doubt their own inner guidance, seeking external validation from trusted authorities.",
  },
  // Type 7
  {
    id: 19, type: 7,
    tag: "Behavior",
    prompt: "They booked a trip to Portugal, signed up for a pottery class, and outlined a new business idea, all in the same afternoon.",
    hint: "Type 7s generate possibilities enthusiastically, excitement is a buffer against anxiety and limitation.",
  },
  {
    id: 20, type: 7,
    tag: "Inner Dialogue",
    prompt: '"If I can just keep moving, keep planning, keep looking forward, everything will be fine."',
    hint: "Type 7s use mental activity and future-orientation to avoid the pain of being present to difficult feelings.",
  },
  {
    id: 21, type: 7,
    tag: "Quote",
    prompt: '"The worst feeling isn\'t sadness. It\'s boredom. Or being trapped."',
    hint: "Type 7s' core fear is deprivation and limitation, their freedom of movement, literal and mental, is essential to their identity.",
  },
  // Type 8
  {
    id: 22, type: 8,
    tag: "Behavior",
    prompt: "When someone in the meeting talked over them, they didn't get flustered, they just got louder, and the room shifted.",
    hint: "Type 8s have a commanding presence and respond to challenges by increasing their force rather than retreating.",
  },
  {
    id: 23, type: 8,
    tag: "Inner Dialogue",
    prompt: '"I\'d rather have someone fight me directly than smile while plotting something behind my back."',
    hint: "Type 8s value direct confrontation over hidden agendas, betrayal of trust is their deepest wound.",
  },
  {
    id: 24, type: 8,
    tag: "Quote",
    prompt: '"Vulnerability isn\'t weakness. I know that intellectually. Getting my body to believe it is another matter."',
    hint: "Type 8s' growth involves learning to open to vulnerability, their deepest fear is being controlled or harmed through weakness.",
  },
  // Type 9
  {
    id: 25, type: 9,
    tag: "Behavior",
    prompt: "They sat through the entire two-hour meeting without saying what they actually thought, because the moment never felt quite right.",
    hint: "Type 9s merge with the group's agenda rather than asserting their own, often not noticing their own perspective until much later.",
  },
  {
    id: 26, type: 9,
    tag: "Inner Dialogue",
    prompt: '"I don\'t want to cause a disruption. If I just let it go, things will probably settle on their own."',
    hint: "Type 9s avoid conflict to maintain their sense of inner peace, but this \'peace\' is often numbness masking their real experience.",
  },
  {
    id: 27, type: 9,
    tag: "Quote",
    prompt: '"When you ask me what I want, I genuinely don\'t know. I know what I don\'t want. But for myself? It\'s blank."',
    hint: "Type 9s lose contact with their own desires, preferences, and agenda, self-forgetting is their core pattern.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getTypeOptions(correctType: number): number[] {
  const others = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((t) => t !== correctType);
  const shuffled = shuffleArray(others).slice(0, 3);
  return shuffleArray([correctType, ...shuffled]);
}


const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer", 2: "The Helper", 3: "The Achiever",
  4: "The Individualist", 5: "The Investigator", 6: "The Loyalist",
  7: "The Enthusiast", 8: "The Challenger", 9: "The Peacemaker",
};

const ROUNDS = 5;
const XP_PER_CORRECT = 15;

// ─── Component ────────────────────────────────────────────────────────────────

type Phase = "intro" | "playing" | "result" | "finished";

export default function TypeMatchPage() {
  const { earnXP } = useGameState();

  const [phase, setPhase] = useState<Phase>("intro");
  const [deck, setDeck] = useState<TypeMatchCard[]>([]);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const xpAwarded = useRef(false);

  const card = deck[round];
  const correct = results.filter(Boolean).length;

  const startGame = () => {
    const cards = shuffleArray(TYPE_MATCH_CARDS).slice(0, ROUNDS);
    setDeck(cards);
    setRound(0);
    setSelected(null);
    setResults([]);
    setTotalXP(0);
    xpAwarded.current = false;
    setOptions(getTypeOptions(cards[0].type));
    setPhase("playing");
  };

  const handlePick = (type: number) => {
    if (selected !== null) return;
    const isCorrect = type === card.type;
    setSelected(type);
    const xp = isCorrect ? XP_PER_CORRECT : 0;
    setTotalXP((p) => p + xp);
    setResults((p) => [...p, isCorrect]);
    setPhase("result");
  };

  const nextRound = () => {
    const nextIdx = round + 1;
    if (nextIdx >= ROUNDS) {
      // Award XP
      if (!xpAwarded.current && totalXP > 0) {
        xpAwarded.current = true;
        earnXP(totalXP, "Type Match");
      }
      setPhase("finished");
    } else {
      setRound(nextIdx);
      setSelected(null);
      setOptions(getTypeOptions(deck[nextIdx].type));
      setPhase("playing");
    }
  };

  // ─── Intro ─────────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 mx-auto" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
            <Brain className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>Type Match</h1>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Read a quote, behavior, or inner dialogue.<br/>
            Identify which Enneagram type it represents.<br/>
            <span className="font-medium" style={{ color: "#a78bfa" }}>5 rounds  +{XP_PER_CORRECT} XP per correct</span>
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all"
            style={{ background: "linear-gradient(to right, #4f46e5, #7c3aed)" }}
          >
            Start Matching
          </motion.button>
          <Link href="/game" className="mt-4 block text-sm transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
            Back to Game
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Finished ──────────────────────────────────────────────────────────────

  if (phase === "finished") {
    const pct = Math.round((correct / ROUNDS) * 100);
    const grade =
      correct === ROUNDS ? "Perfect!" :
      correct >= 4 ? "Excellent!" :
      correct >= 3 ? "Good eye!" :
      "Keep studying!";

    const headerGradient = correct === ROUNDS
      ? "linear-gradient(135deg, #34d399, #14b8a6)"
      : correct >= 3
      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
      : "linear-gradient(135deg, #f59e0b, #f97316)";

    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f0a1e" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="rounded-3xl p-8 text-center text-white mb-4" style={{ background: headerGradient }}>
            <div className="text-2xl mb-2 font-mono">{correct === ROUNDS ? "(*)(+)" : correct >= 3 ? "(+)" : "(read)"}</div>
            <h2 className="text-2xl font-serif font-bold mb-1">{grade}</h2>
            <p className="text-white/70 text-sm">{correct} of {ROUNDS} correct</p>
          </div>

          <div className="rounded-3xl p-6 mb-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Round Results</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{pct}% accuracy</span>
            </div>
            <div className="flex gap-2">
              {results.map((r, i) => (
                <div key={i} className={`flex-1 h-2.5 rounded-full ${r ? "bg-emerald-400" : "bg-rose-400"}`} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 mb-6 flex items-center justify-between" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-400" />
              <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>XP Earned</span>
            </div>
            <span className="text-2xl font-bold" style={{ color: "#a78bfa" }}>+{totalXP}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 py-3.5 rounded-2xl text-white font-bold transition-all"
              style={{ background: "linear-gradient(to right, #4f46e5, #7c3aed)" }}
            >
              Play Again
            </button>
            <Link
              href="/game"
              className="flex-1 py-3.5 rounded-2xl font-semibold text-center transition-all"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}
            >
              Game Hub
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Playing / Result ──────────────────────────────────────────────────────

  if (!card) return null;

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col max-w-lg mx-auto" style={{ background: "#0f0a1e" }}>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-1.5 flex-1">
          {Array.from({ length: ROUNDS }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i < results.length
                  ? results[i] ? "bg-emerald-400" : "bg-rose-400"
                  : "bg-transparent"
              }`}
              style={
                i < results.length
                  ? {}
                  : i === round
                  ? { background: "rgba(139,92,246,0.5)" }
                  : { background: "rgba(255,255,255,0.1)" }
              }
            />
          ))}
        </div>
        <span className="text-xs font-mono shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{round + 1} / {ROUNDS}</span>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>
            <Sparkles className="w-3 h-3" />
            {card.tag}
          </div>

          <div className="rounded-3xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <p className="text-base leading-relaxed font-medium italic" style={{ color: "rgba(255,255,255,0.85)" }}>
              {card.prompt}
            </p>
          </div>

          <p className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            Which type is this?
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {options.map((type) => {
              const isSelected = selected === type;
              const isCorrectType = type === card.type;
              const showResult = selected !== null;

              const btnBg = showResult && isCorrectType
                ? "rgba(52,211,153,0.12)"
                : showResult && isSelected && !isCorrectType
                ? "rgba(248,113,113,0.12)"
                : selected === null
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.03)";
              const btnBorder = showResult && isCorrectType
                ? "rgba(52,211,153,0.6)"
                : showResult && isSelected && !isCorrectType
                ? "rgba(248,113,113,0.6)"
                : "rgba(255,255,255,0.1)";
              const btnColor = showResult && isCorrectType
                ? "#34d399"
                : showResult && isSelected && !isCorrectType
                ? "#f87171"
                : "rgba(255,255,255,0.8)";

              return (
                <motion.button
                  key={type}
                  whileTap={{ scale: selected === null ? 0.96 : 1 }}
                  onClick={() => handlePick(type)}
                  disabled={selected !== null}
                  className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${selected === null ? "cursor-pointer" : "cursor-default"}`}
                  style={{ background: btnBg, borderColor: btnBorder, color: btnColor }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-2 shadow-sm"
                    style={{ backgroundColor: TYPE_COLORS[type] }}
                  >
                    {type}
                  </div>
                  <span className="text-xs font-medium text-center leading-tight" style={{ color: btnColor }}>{TYPE_NAMES[type]}</span>
                  {showResult && isCorrectType && <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-emerald-500" />}
                  {showResult && isSelected && !isCorrectType && <XCircle className="absolute top-2 right-2 w-4 h-4 text-rose-500" />}
                </motion.button>
              );
            })}
          </div>

          {/* Reveal */}
          <AnimatePresence>
            {phase === "result" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{
                    background: selected === card.type ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                    border: `1px solid ${selected === card.type ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
                  }}
                >
                  {selected === card.type
                    ? <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: selected === card.type ? "#34d399" : "#f87171" }}>
                      {selected === card.type ? `Correct! Type ${card.type} ${TYPE_NAMES[card.type]}` : `That is Type ${card.type} ${TYPE_NAMES[card.type]}`}
                    </p>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{card.hint}</p>
                    <Link
                      href={`/enneagram/${card.type}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold transition-colors"
                      style={{ color: "#a78bfa" }}
                    >
                      Read more about Type {card.type} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={nextRound}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {round + 1 >= ROUNDS ? "See Results" : "Next Round"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
