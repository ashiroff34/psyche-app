"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Scenario {
  situation: string;
  context: string;
  responses: { text: string; emoji: string; scores: Record<string, number> }[];
}

// Scenarios designed to elicit actual defense mechanisms, fixations, and core motivations
// rather than surface-level behavioral stereotypes. Each scenario targets a specific
// psychological pressure point where types diverge based on Naranjo's passion/fixation framework.
const scenarios: Scenario[] = [
  {
    situation: "The Unspoken Truth",
    context: "You realize a close friend has been subtly dishonest with you about something that matters. They don't know you've found out.",
    responses: [
      { text: "Confront them directly — dishonesty is something you can't tolerate, and they need to hear it", emoji: "", scores: { "8": 3, "1": 1 } },
      { text: "Say nothing but internally catalogue it — now you know something important about their character", emoji: "", scores: { "5": 2, "6": 2 } },
      { text: "Feel hurt that the relationship isn't as authentic as you thought — question whether you really know them", emoji: "", scores: { "4": 3 } },
      { text: "Let it go — bringing it up would create conflict, and maybe they had a good reason", emoji: "", scores: { "9": 3 } },
    ],
  },
  {
    situation: "The Vulnerable Moment",
    context: "You're going through something genuinely difficult and a friend asks 'How are you really doing?' with sincere concern.",
    responses: [
      { text: "Deflect with humor or optimism — you don't want to bring them down, and honestly you'd rather not go there", emoji: "", scores: { "7": 3, "3": 1 } },
      { text: "Give a measured, accurate answer but maintain composure — falling apart won't solve anything", emoji: "", scores: { "5": 2, "1": 1, "3": 1 } },
      { text: "Open up — you've been waiting for someone to really ask, and the emotions come flooding out", emoji: "", scores: { "4": 2, "6": 1, "2": 1 } },
      { text: "Turn it around — start asking about THEIR problems instead, because focusing on others is easier", emoji: "", scores: { "2": 3, "9": 1 } },
    ],
  },
  {
    situation: "The Incompetent Authority",
    context: "Your manager at work is clearly making poor decisions that are affecting the entire team. Others are complaining privately but no one is speaking up.",
    responses: [
      { text: "Document the problems methodically and present them with suggested improvements — there's a right way to handle this", emoji: "", scores: { "1": 3 } },
      { text: "Challenge them directly in the next meeting — someone needs to tell the truth, and you're not afraid to", emoji: "", scores: { "8": 3 } },
      { text: "Analyze the situation privately but don't get involved — it's not worth the energy expenditure", emoji: "", scores: { "5": 3 } },
      { text: "Try to understand both sides — maybe the manager is dealing with pressure you can't see", emoji: "", scores: { "9": 2, "6": 1, "2": 1 } },
    ],
  },
  {
    situation: "The Achievement",
    context: "You just accomplished something significant — a promotion, a creative milestone, a personal goal you've been working toward for months.",
    responses: [
      { text: "Feel a brief satisfaction, then immediately start thinking about the next goal — you can't rest on this", emoji: "", scores: { "3": 3 } },
      { text: "Feel proud but also notice what wasn't perfect about it — if only you'd done X differently", emoji: "", scores: { "1": 3 } },
      { text: "Feel a quiet, private satisfaction — you don't need others to validate what you know you've done", emoji: "", scores: { "5": 2, "8": 1 } },
      { text: "Want to celebrate with someone specific — achievements feel hollow without someone to share them with", emoji: "", scores: { "2": 2, "sx": 1, "7": 1 } },
    ],
  },
  {
    situation: "The Abandonment",
    context: "A person you considered a close friend has gradually stopped initiating contact. They're not hostile — just... fading away.",
    responses: [
      { text: "Notice it immediately and feel rejected — start questioning what you did wrong or what's wrong with you", emoji: "", scores: { "4": 3, "2": 1 } },
      { text: "Barely notice — you have your own inner world and don't track social reciprocity that closely", emoji: "", scores: { "5": 2, "9": 2 } },
      { text: "Feel anxious about it — reach out to test whether they're still loyal, maybe several times", emoji: "", scores: { "6": 3 } },
      { text: "Move on quickly — there are plenty of other people and experiences to invest in", emoji: "", scores: { "7": 3 } },
    ],
  },
  {
    situation: "The Moral Dilemma",
    context: "You discover that breaking a rule would genuinely help someone you care about, with almost no chance of getting caught.",
    responses: [
      { text: "Follow the rule anyway — principles aren't principles if you abandon them when it's convenient", emoji: "", scores: { "1": 3 } },
      { text: "Break the rule without hesitation — rules that don't serve people are worthless", emoji: "", scores: { "8": 3 } },
      { text: "Break the rule to help them, then feel privately guilty about it afterward", emoji: "", scores: { "6": 2, "2": 2 } },
      { text: "Analyze it from multiple angles — there's probably a way to help that doesn't require rule-breaking", emoji: "", scores: { "5": 2, "3": 1, "7": 1 } },
    ],
  },
  {
    situation: "The Empty Room",
    context: "You find yourself completely alone for an extended period — no phone, no distractions, just you and your thoughts.",
    responses: [
      { text: "Feel a deep sense of relief — finally, no demands on your energy or attention", emoji: "", scores: { "5": 3, "sp": 1 } },
      { text: "Feel restless almost immediately — your mind starts generating plans, ideas, and things to do", emoji: "", scores: { "7": 3 } },
      { text: "Sink into a rich, complex emotional landscape — you access feelings you normally keep moving too fast to notice", emoji: "", scores: { "4": 3 } },
      { text: "Feel uncomfortable — you start thinking about whether anyone is thinking about you, whether you're missed", emoji: "", scores: { "2": 2, "3": 1, "6": 1 } },
    ],
  },
  {
    situation: "The Injustice",
    context: "You witness someone in a position of power treating a vulnerable person unfairly. Others are watching but doing nothing.",
    responses: [
      { text: "Intervene immediately — you physically cannot watch this happen without acting", emoji: "", scores: { "8": 3 } },
      { text: "Feel intense moral outrage — this is exactly what's wrong with the world, and you want to correct it properly", emoji: "", scores: { "1": 3 } },
      { text: "Feel deeply for the vulnerable person — you want to comfort them and make sure they're okay", emoji: "", scores: { "2": 3 } },
      { text: "Observe the dynamics carefully — you want to understand the full picture before deciding what, if anything, to do", emoji: "", scores: { "5": 2, "6": 1, "9": 1 } },
    ],
  },
  {
    situation: "The Mirror",
    context: "Someone who knows you very well tells you: 'You know what your biggest blind spot is?' and shares an honest observation about you.",
    responses: [
      { text: "Listen carefully but your inner critic has already beaten them to it — you probably already knew this about yourself", emoji: "", scores: { "1": 3 } },
      { text: "Feel a sting of shame — their observation touches something you've worked hard to keep hidden", emoji: "", scores: { "3": 2, "4": 2 } },
      { text: "Appreciate their honesty intellectually but feel yourself emotionally shutting down to process it alone", emoji: "", scores: { "5": 3 } },
      { text: "Get defensive first, then anxiously wonder if they're right — question whether you can trust their perspective", emoji: "", scores: { "6": 3 } },
    ],
  },
  {
    situation: "The Crossroads",
    context: "You're at a major life crossroads — a decision that will significantly change your path. Both options have real costs and real benefits.",
    responses: [
      { text: "Analyze both options exhaustively — you need complete information before you can commit", emoji: "", scores: { "5": 2, "6": 2 } },
      { text: "Choose the option that opens the most future possibilities — you can't stand closing doors permanently", emoji: "", scores: { "7": 3 } },
      { text: "Choose the option that feels most aligned with who you truly are — even if it's harder", emoji: "", scores: { "4": 3, "1": 1 } },
      { text: "Avoid choosing for as long as possible — maybe if you wait, the decision will make itself", emoji: "", scores: { "9": 3 } },
    ],
  },
];

interface ScenarioResults {
  scores: Record<string, number>;
  topResult: string;
  allScores: { key: string; score: number; percentage: number }[];
}

export default function ScenarioAssessment({
  onComplete,
}: {
  onComplete: (results: ScenarioResults) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const scenario = scenarios[current];
  const progress = ((current + 1) / scenarios.length) * 100;

  const choose = (response: (typeof scenarios)[0]["responses"][0]) => {
    setSelectedEmoji(response.emoji);

    const newScores = { ...scores };
    Object.entries(response.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);

    setTimeout(() => {
      setSelectedEmoji(null);
      if (current < scenarios.length - 1) {
        setCurrent(current + 1);
      } else {
        const typeScores = Object.entries(newScores)
          .filter(([k]) => !["sp", "sx", "so"].includes(k))
          .sort(([, a], [, b]) => b - a);
        const maxScore = typeScores[0]?.[1] || 1;

        onComplete({
          scores: newScores,
          topResult: typeScores[0][0],
          allScores: typeScores.map(([key, score]) => ({
            key,
            score,
            percentage: Math.round((score / maxScore) * 100),
          })),
        });
      }
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span>Scenario {current + 1} of {scenarios.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
        <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scenario Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 mb-6">
            <div className="text-xs font-medium text-sky-500 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {scenario.situation}
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              {scenario.context}
            </p>
          </div>

          {/* Response Options */}
          <div className="space-y-3">
            {scenario.responses.map((response, idx) => (
              <button
                key={idx}
                onClick={() => choose(response)}
                disabled={selectedEmoji !== null}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group ${
                  selectedEmoji === response.emoji
                    ? "border-sky-400 bg-sky-50 scale-[1.02]"
                    : selectedEmoji !== null
                    ? "border-slate-50 bg-slate-50/50 opacity-50"
                    : "border-slate-100 bg-white hover:border-sky-200 hover:bg-sky-50/30 active:scale-[0.98]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{response.emoji}</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{response.text}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
