"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Flame, Zap, Star, CheckCircle, XCircle, Trophy, Lightbulb,
  Target, ChevronRight, Brain, Compass, Clock,
  BarChart3, Sparkles, ArrowRight, Copy, Check,
  Layers, History,
  GraduationCap, Dumbbell, Crown, Snowflake, Heart, Wand2,
  AlertTriangle, Frown
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useGameState, trackWeeklyEvent } from "@/hooks/useGameState";
import { usePetState } from "@/hooks/usePetState";
import SlotCounter from "react-slot-counter";
import PetCompanion from "@/components/PetCompanion";
import ChibiSprite from "@/components/ChibiSprite";
import NextStepBanner from "@/components/NextStepBanner";
import BeginnerBanner from "@/components/BeginnerBanner";
import { useRewards } from "@/components/Rewards";
import FirstVisitTooltip from "@/components/FirstVisitTooltip";
import HubView from "@/components/daily/HubView";
import NodeBottomSheet, { type PathNodeConfig } from "@/components/daily/NodeBottomSheet";
import type { PathUnit } from "@/components/daily/PathIteration4";
import UnitSection from "@/components/learn/UnitSection";
import NodeSheet from "@/components/learn/NodeSheet";
import { useMergedLearnState } from "@/hooks/useMergedLearnState";
import type { LessonWithStatus, UnitWithStatus } from "@/hooks/useMergedLearnState";
import QuizFullscreen from "@/components/daily/QuizFullscreen";
import LessonBriefOverlay from "@/components/daily/LessonBriefOverlay";
import DailyReading from "@/components/daily/DailyReading";
import { getDailyReading } from "@/data/dailyReadings";
import MilestoneModal from "@/components/MilestoneModal";
import { cognitiveGrowthEdges } from "@/data/cognitiveGrowthEdges";
import { typeQuizQuestions } from "@/data/type-quizzes";
import { introQuestions } from "@/data/intro-questions";
import { rateCard, getCardPriority, type FSRSCard } from "@/lib/fsrs";
import { instinctualStackings } from "@/data/subtypes";
import { orderedTritypeThyselfs } from "@/data/tritypes";

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY: Seeded PRNG (deterministic shuffle per day)
   ═══════════════════════════════════════════════════════════════════════════ */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  const rng = seededRandom(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getTodaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY: Heart refill timer formatting
   ═══════════════════════════════════════════════════════════════════════════ */
function formatRefillTime(isoDate: string): string {
  const refillStart = new Date(isoDate).getTime();
  // Hearts refill every 10 minutes (matches HEART_REFILL_MS in useGameState)
  const REFILL_INTERVAL = 10 * 60 * 1000;
  const elapsed = Date.now() - refillStart;
  const timeUntilNext = REFILL_INTERVAL - (elapsed % REFILL_INTERVAL);
  if (timeUntilNext <= 0) return "";
  const totalMin = Math.ceil(timeUntilNext / 60000);
  if (totalMin < 60) return `${totalMin}m`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */
interface Question {
  id: string;
  q: string;
  opts: string[];
  ans: number;
  exp: string;
  /**
   * Knowledge tier:
   *   0 = Framework intro  (what IS this system, not yet in bank)
   *   1 = Recognition      (label/name from a hint, not yet in bank)
   *   2 = Recall           (core-fear, passion, integration, current "easy")
   *   3 = Application      (subtypes, harmonic groups, scenarios)
   *   4 = Analysis         (Naranjo fixations, Riso levels, countertypes)
   */
  tier: 0 | 1 | 2 | 3 | 4;
  module: "type" | "cognitive" | "cross" | "history";
  typeSpecific?: number; // 0 = general, 1-9 = specific to that enneagram type
  cognitiveSpecific?: string; // e.g. "INTJ" or empty for general
  tags: string[];
}

interface DailyProgress {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  xpEarned: number;
  modulesCompleted: string[];
  warmupDone: boolean;
  streakCorrect: number;
  bestStreak: number;
  timeSpentMinutes: number;
  moduleScores: Record<string, { correct: number; total: number; xp: number }>;
  nonQuizCompleted: string[]; // reflection/challenge node ids
}

interface DifficultyState {
  level: number;
  correctAtLevel: number;
  totalAtLevel: number;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DAILY INSIGHTS (per type, 7 each, rotated by day)
   ═══════════════════════════════════════════════════════════════════════════ */
const typeInsights: Record<number, string[]> = {
  1: [
    "Notice today when your inner critic activates. Instead of pushing it away, ask: 'What are you trying to protect me from?' The critic learned the wrong method -- but it has good intentions.",
    "Perfection is a moving target your mind invented. Pick one task today and declare it 'done enough.' Practice the radical act of letting something be sufficient.",
    "Your integration line is Type 7. Do one thing purely for fun today -- zero productivity attached. Notice how the inner critic reacts. That reaction IS the work.",
    "Resentment is often repressed anger. If you're carrying a slow burn about someone, ask yourself: 'Have I clearly told them what I actually need?'",
    "The virtue of Type 1 is Serenity -- not just calm, but genuine acceptance that this moment is already complete. What if nothing needed fixing right now?",
    "Notice where you hold yourself to different standards than others. Ones are often hardest on themselves. Would you speak to a close friend the way you speak to yourself?",
    "Your shadow holds gold. The moments you're less than perfect are exactly where your humanity lives. What would it mean to treasure those imperfect moments?"
  ],
  2: [
    "Practice identifying one need YOU have today -- not a need you're meeting for others. Just notice it. You don't have to act. Simply acknowledge: 'I need ___.'",
    "Your integration line is Type 4. Spend 20 minutes alone today doing something purely for your own pleasure -- not to share, not to show. Just for you.",
    "Giving often carries an invisible price tag. Today, notice when you offer help -- is there a quiet hope the person will respond in a certain way?",
    "Pride -- Type 2's passion -- is the belief that you don't have needs. It's a disguised disconnection from yourself. What do you actually need today?",
    "Receiving is harder than giving for most Twos. Let someone help you today. The discomfort you feel is pointing directly at your growth edge.",
    "The most honest love you can give is expressing your own needs clearly. Relationships built on unspoken exchange eventually crack. Say what you actually want.",
    "Your emotional intelligence is remarkable. The growth edge: turning that same attunement inward. What emotion are YOU feeling right now, underneath all the helping?"
  ],
  3: [
    "Notice the gap today between what you're performing and what you actually feel. The performance is so automatic for Threes that it takes real practice to catch it.",
    "Your integration line is Type 6. Check in with someone you trust -- not to perform, but to say 'I've been struggling with ___.' Notice if that feels dangerous.",
    "Deceit -- 3's passion -- is not lying to others. It's self-deceit: losing contact with your authentic feelings in constant adaptation to what succeeds.",
    "Rest is radical self-revelation for a Three. In rest, the performer has nowhere to hide. Schedule 30 unstructured minutes today and notice who shows up.",
    "Your deepest fear is worthlessness. Today: is there one relationship where you are loved simply for existing, not for achieving? If yes, nurture it.",
    "Success strategies that work at 25 can trap you at 45. What strategy might be outdated? What are you still running out of habit rather than genuine alignment?",
    "Authenticity is not the opposite of competence. The most respected people can say 'I don't know' or 'I was wrong.' Your competence is not threatened by your humanity."
  ],
  4: [
    "The fixation of Type 4 is Melancholy -- returning again and again to what's missing. Today, interrupt that habit once: name three things that are actually present and good.",
    "Your integration line is Type 1. Pick a task you've been 'not ready' for and do the first step mechanically, without waiting for inspiration. Notice what happens.",
    "Envy is not about wanting what others have. It's the aching feeling that others have access to a life that should be yours. What specifically do you envy? That points at your values.",
    "Your emotional depth is genuinely rare. The growth edge: depth without drama. Feeling fully without using the feeling as identity.",
    "For today: what is already here that you've been overlooking in the search for what's missing? What's present that you've dismissed as ordinary?",
    "Authenticity is 4's core drive -- but authenticity can become another performance. Are you expressing genuinely, or playing the role of 'the deep one'?",
    "Your unique way of seeing is a real gift. The shadow is using it to stay in comfortable isolation rather than risking real connection."
  ],
  5: [
    "Your integration line is Type 8. Take one decisive action today in an area where you've been observing or analyzing. Embodied action is the fastest path through the 5's retreat.",
    "Avarice -- 5's passion -- is the hoarding of energy, time, and inner space. Where are you over-conserving today in a way that's keeping you contracted?",
    "Notice when you retract from a conversation to process later. Valid -- but is there one exchange where you stay present instead of storing it for later analysis?",
    "The integrated Five uses knowledge in service of engagement with life, not as a substitute for it. What are you still researching instead of actually doing?",
    "Your privacy and self-sufficiency are genuine strengths. The shadow: isolation that prevents the very understanding you seek. Other people ARE the data you need.",
    "Your body knows things your mind hasn't caught up to. Spend 5 minutes in bodily awareness today -- not to analyze, just to inhabit. What does your body know?",
    "Competence is your castle. The walls keep you safe and keep the world out. Today: let someone see something you don't fully understand yet."
  ],
  6: [
    "Anxiety often has a specific object if you look closely. Write down the one thing you're most anxious about. Then: 'What's the actual probability?' and 'What would I do if it happened?'",
    "Your integration line is Type 9. Practice sitting with not-knowing for 5 minutes today. Don't research, plan, or ask anyone. Just rest in uncertainty.",
    "Your threat-detection is powerful. Can you also apply it to safety? Where are things actually more secure than you're registering?",
    "Fear -- 6's passion -- is not cowardice. It's the vigilant mind running worst-case scenarios. The virtue is Courage: acting despite fear rather than waiting for certainty.",
    "Counterphobic and phobic Sixes are both avoiding the same core: trusting their own inner knowing. What does YOUR gut actually say about the situation you're facing?",
    "Loyalty is one of your most beautiful qualities. Are you loyal because people deserve it, or because leaving feels too scary?",
    "The Six's deepest fear is often themselves -- not trusting their own judgment. Today: make one decision completely alone, without asking for input. Then stick with it."
  ],
  7: [
    "Today's challenge: stay with one feeling of discomfort instead of moving on. Just 5 minutes. Anxiety, boredom, sadness -- whatever comes. It won't kill you, and it WILL teach you something.",
    "Your integration line is Type 5. Choose one topic today and go deep instead of wide. Depth is the antidote to the 7's scattered brilliance.",
    "Gluttony -- 7's passion -- is the mind's insistence that more options and more stimulation will finally bring satisfaction. What if this moment already has everything you need?",
    "Notice today when you reframe pain into something positive. Reframing is a genuine superpower AND a defense. Can you let something hurt just a little without fixing it?",
    "What's one thing you've promised that you need to either complete or honestly release? Unfinished commitments are a drain on your energy.",
    "Commitment creates freedom. When you stay with something through the difficult middle, you access depth unavailable to those who leave early.",
    "Future-planning is your native language. The practice: 5 minutes today with no plans, no next steps, no brainstorming. Just be here."
  ],
  8: [
    "Your integration line is Type 2. Do one vulnerable thing today. Not weakness -- vulnerability. Share something you're genuinely uncertain about with someone you trust.",
    "Lust -- 8's passion -- is the need to feel fully alive through power or intensity. Where are you seeking intensity today that might be covering a softer feeling underneath?",
    "Your protective impulse toward those you love is extraordinary. The shadow: protection that becomes control. Are you protecting people, or making decisions for them?",
    "You most fear being controlled or betrayed. Are you testing people in ways they don't know about? What does it cost you when they fail the test?",
    "Your directness is a gift. The growth edge is the delivery. The same truth, offered with care rather than force, is far more powerful.",
    "What are you angry about underneath the anger? 8's anger often protects a wound -- a betrayal, an injustice. What is your anger actually protecting?",
    "Integration for 8 looks like caring for others' vulnerability as much as you protect your own autonomy. Today: let someone be imperfect and fragile without challenging it."
  ],
  9: [
    "Your integration line is Type 3. Pick one priority that is YOURS -- not the family's, not your partner's. Take one step toward it today, even a tiny one.",
    "Sloth -- 9's passion -- is not laziness. It's the forgetting of your own agenda in the merge with others' priorities. What do YOU want?",
    "Notice today when you say 'I don't mind' or 'whatever you want.' Each time: pause and ask what you actually prefer.",
    "Your capacity to hold multiple perspectives is profound. The shadow: holding so many that you lose your own. What is your actual position on something that matters?",
    "Nines often wake up in mid-life to vague dissatisfaction -- years of accommodation without self-expression. What small thing have you wanted for yourself that keeps getting deferred?",
    "Anger is the 9's hidden emotion. Chronic accommodation accumulates into something that needs to be said. Where has something been building?",
    "Peace is your gift to the world. The distinction: healthy peace flows from integrating conflict, while unhealthy peace is avoiding it. Which is yours today?"
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH CHALLENGES (per type, 7 each)
   ═══════════════════════════════════════════════════════════════════════════ */
const typeChallenges: Record<number, string[]> = {
  1: [
    "Find one small imperfection today and consciously choose not to fix it. Let it be. Notice the discomfort dissolving.",
    "Send a message to someone you've been critical of expressing genuine appreciation for something they do well.",
    "Set a timer for 15 minutes and do something playful with zero agenda. Doodle, dance, play a game.",
    "Write down your inner critic's most frequent phrase. Then write a compassionate response as if from your wisest friend.",
    "Share one mistake you made recently with someone close to you -- not to explain or justify it, just to name it.",
    "Notice something in your environment that 'should' be different. Practice the thought: 'This is exactly as it needs to be right now.'",
    "Do one task today to 80% quality and stop there. Deliberately choose good enough over perfect."
  ],
  2: [
    "Ask for help with something today -- even something small. Let someone else do the giving.",
    "Write down three things you want -- not for others, just for yourself. Read them out loud.",
    "Have a conversation today without asking how the other person is doing first. Start with sharing something about yourself.",
    "Cancel one commitment that you made out of obligation rather than genuine desire.",
    "Spend an hour doing something that is purely, entirely for your own enjoyment. No sharing it afterward.",
    "Tell one person clearly what you need from them this week. Use the words 'I need.'",
    "Write a list of what you've given to others this week, and what you've received. Notice the imbalance."
  ],
  3: [
    "Have one conversation today where you admit you don't know something -- without pivoting to what you do know.",
    "Spend 30 minutes completely offline and unproductive. No podcasts, no thinking about work. Just be.",
    "Write down who you are when you're not succeeding at anything. Who is the 'you' beneath all the accomplishments?",
    "Tell someone close to you about something you're currently failing at or finding hard.",
    "Complete one task today without telling anyone about it or posting about it.",
    "Reschedule something work-related to spend unplanned time with someone you care about.",
    "Write a letter to your future self about what you VALUE -- not what you want to achieve."
  ],
  4: [
    "Do one ordinary, mundane task with full presence and appreciation today. Dishes, walking, making coffee.",
    "Reach out to someone and say something positive about them -- with no accompanying complaint or emotional intensity.",
    "Write for 10 minutes about something you're grateful for that you usually overlook because it's 'too ordinary.'",
    "Finish one creative project you've been waiting to feel inspired enough to complete.",
    "Spend an hour with someone whose life seems ordinary to you -- with genuine curiosity about what they find meaningful.",
    "Notice one moment today where you feel comparative to others. Write down what the comparison is actually pointing at.",
    "Do something kind for someone without letting it become a story about your depth or sensitivity."
  ],
  5: [
    "Reach out to someone you care about just to connect -- no agenda, no information to exchange. Just to be in contact.",
    "Join a conversation you'd normally observe from the edges. Contribute without preparing your contribution first.",
    "Share something you're currently uncertain about or learning -- without having mastered it first.",
    "Spend 20 minutes in your body: walk, stretch, exercise, cook. Without processing it mentally.",
    "Do one thing that requires trusting someone else's competence rather than doing it yourself.",
    "Tell someone something personal about you that you've been keeping private.",
    "Do something socially spontaneous today -- say yes to an invitation you would normally decline."
  ],
  6: [
    "Make one decision today without asking for a second opinion. Trust the first reasonable answer you arrive at.",
    "Write down your worst-case scenario for something you're anxious about. Then write: 'And I would handle it by...'",
    "Do one thing today that makes you slightly uncomfortable -- not dangerous, just outside your comfort zone.",
    "Notice one moment of trusting your own perception today and acknowledge it out loud: 'I knew that.'",
    "Reach out to an authority figure you've been avoiding -- initiate the interaction rather than waiting.",
    "Write a list of five things that have gone well this week. Read it slowly.",
    "Identify one belief you hold about why something won't work. Challenge it by looking for evidence that it could."
  ],
  7: [
    "Choose one thing from your someday list and commit to NOT doing it. Consciously release it.",
    "Sit with boredom for 10 minutes without reaching for your phone, a task, or stimulation of any kind.",
    "Finish something you started more than a week ago before beginning anything new today.",
    "Write about something difficult in your past -- not to reframe it positively, but just to sit with how it actually felt.",
    "Have a conversation where you ask about someone's pain or difficulty -- and stay with it without offering solutions.",
    "Plan less than usual today. Do one unplanned hour where you respond to what arises rather than directing it.",
    "Go deep on one book, article, or subject for 45 minutes rather than scanning multiple things."
  ],
  8: [
    "Ask someone today how they're really doing -- and listen for the full answer without formulating your response.",
    "Express appreciation to someone without adding a challenge, critique, or instruction.",
    "Do something for someone that gives them power or autonomy rather than dependence on you.",
    "Let someone 'win' an argument today -- not because you're wrong, but as a practice in releasing the need to dominate.",
    "Share something you're currently afraid of with someone you trust.",
    "Do one soft, gentle thing today: write, create, tend to a plant or animal, sit quietly.",
    "Notice where you're using force when persuasion would work better. Try the persuasion."
  ],
  9: [
    "Write down three things you want -- not what would be fine, but what you actually want. Read them out loud.",
    "Disagree with someone today. Pick a low-stakes situation and share your actual perspective.",
    "Block one hour for something that is entirely your own project, interest, or goal.",
    "Say no to one request that you don't genuinely want to fulfill.",
    "Notice one moment today when you start to merge with someone else's energy or mood. Pause and check: what are YOU feeling?",
    "Contact someone you've been thinking about but haven't reached out to -- on your own initiative.",
    "Spend 10 minutes writing about what YOU want your life to look like in 5 years."
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   QUESTION BANK, adapted from type-quizzes.ts (451 questions)
   ═══════════════════════════════════════════════════════════════════════════ */

const LETTER_TO_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

// Map difficulty 1-5 → tier 2-4 (recall / application / analysis)
function difficultyToTier(d: number): 0 | 1 | 2 | 3 | 4 {
  if (d <= 2) return 2;
  if (d <= 3) return 3;
  return 4;
}

// Convert category string to a kebab-case tag
function categoryToTag(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const QUESTION_BANK: Question[] = [
  // Intro questions (tier 0-1), teach the frameworks first
  ...introQuestions.map((iq) => ({
    id: iq.id,
    q: iq.q,
    opts: iq.opts,
    ans: iq.ans,
    exp: iq.exp,
    tier: iq.tier as 0 | 1 | 2 | 3 | 4,
    module: iq.module,
    tags: iq.tags,
  })),
  // Type-specific questions (tier 2-4)
  ...typeQuizQuestions.map((tq) => ({
    id: `tq_${tq.id}`,
    q: tq.question,
    opts: tq.options.map((o) => o.text),
    ans: LETTER_TO_INDEX[tq.answer] ?? 0,
    exp: tq.explanation,
    tier: difficultyToTier(tq.difficulty),
    module: "type" as const,
    typeSpecific: tq.type,
    tags: [categoryToTag(tq.category)],
  })),
];


/* ═══════════════════════════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════════════════════════
   STREAK FLAME COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
function StreakFlame({ count }: { count: number }) {
  const size = Math.min(count * 4 + 20, 60);
  const intensity = Math.min(count / 10, 1);
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="relative flex items-center gap-1"
    >
      <Flame
        style={{ width: size, height: size, color: `hsl(${30 - intensity * 15}, ${80 + intensity * 20}%, ${55 - intensity * 10}%)` }}
        className="drop-shadow-lg"
      />
      {count > 0 && (
        <span className="text-lg font-bold" style={{ color: `hsl(${30 - intensity * 15}, 90%, 45%)` }}>
          {count}
        </span>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BAR CHART COMPONENT (7-day activity)
   ═══════════════════════════════════════════════════════════════════════════ */
function WeeklyBarChart({ data }: { data: { day: string; value: number }[] }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / maxVal) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-sky-400 min-h-[2px] relative"
          >
            {d.value > 0 && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-500">
                {d.value}
              </span>
            )}
          </motion.div>
          <span className="text-[10px] text-slate-400">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PERCENTAGE RING COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
function PercentageRing({ percent, size = 100, label }: { percent: number; size?: number; label: string }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={6} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#ring-gradient)" strokeWidth={6} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-xl font-bold text-slate-800">{Math.round(percent)}%</span>
      </div>
      <span className="text-xs text-slate-400 mt-1">{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE CONFIG
   ═══════════════════════════════════════════════════════════════════════════ */
const MODULE_CONFIG = [
  { id: "type", title: "Type-Specific Quiz", icon: Target, color: "indigo", count: 20, time: "15 min", description: "Deep questions about YOUR Enneagram type", xpBonus: 0 },
  { id: "cognitive", title: "Cognitive Function Deep Dive", icon: Brain, color: "sky", count: 15, time: "15 min", description: "Your cognitive function stack explored", xpBonus: 0 },
  { id: "cross", title: "Cross-System Challenge", icon: Layers, color: "violet", count: 12, time: "15 min", description: "Where Enneagram meets cognitive functions", xpBonus: 10 },
  { id: "history", title: "History & Theory", icon: History, color: "amber", count: 12, time: "15 min", description: "The minds and ideas behind the systems", xpBonus: 0 },
  { id: "cross-bonus", title: "Bonus Round", icon: Layers, color: "violet", count: 12, time: "10 min", description: "Extra cross-system challenge", xpBonus: 0 },
] as const;

const colorMap: Record<string, { bg: string; border: string; text: string; light: string; iconBg: string }> = {
  indigo: { bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600", light: "bg-indigo-100", iconBg: "bg-indigo-100" },
  sky: { bg: "bg-sky-50", border: "border-sky-100", text: "text-sky-600", light: "bg-sky-100", iconBg: "bg-sky-100" },
  violet: { bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-600", light: "bg-violet-100", iconBg: "bg-violet-100" },
  amber: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600", light: "bg-amber-100", iconBg: "bg-amber-100" },
};

/* ═══════════════════════════════════════════════════════════════════════════
   SPACED REPETITION, per-question stat tracking
   ═══════════════════════════════════════════════════════════════════════════ */
const SR_KEY = "psyche-question-stats";

interface QStat {
  seen: number;       // total times shown
  correct: number;    // total correct answers
  lastSeen: string;   // ISO date
  fsrs?: FSRSCard;    // FSRS v6 card state (optional for backwards compat)
}

function loadQStats(): Record<string, QStat> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SR_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveQStat(id: string, correct: boolean) {
  try {
    const stats = loadQStats();
    const prev = stats[id] ?? { seen: 0, correct: 0, lastSeen: "" };
    // Update legacy counters + FSRS card in one write
    const updatedFSRS = rateCard(prev.fsrs ?? null, correct);
    stats[id] = {
      seen: prev.seen + 1,
      correct: prev.correct + (correct ? 1 : 0),
      lastSeen: new Intl.DateTimeFormat("en-CA").format(new Date()),
      fsrs: updatedFSRS,
    };
    localStorage.setItem(SR_KEY, JSON.stringify(stats));
  } catch {}
}

/**
 * Pick `n` questions from `pool` using FSRS v6 spaced repetition.
 * Questions with FSRS due dates in the past (or never seen) are highest priority.
 * Within the same FSRS priority, accuracy and recency serve as tiebreakers.
 */
function srSelectQuestions(pool: Question[], n: number, stats: Record<string, QStat>): Question[] {
  if (pool.length <= n) return pool;
  const weighted = pool.map(q => {
    const s = stats[q.id];
    // FSRS priority: 0=new, 1=overdue, 2+=days until due
    const priority = getCardPriority(s?.fsrs ?? null);
    return { q, priority, lastSeen: s?.lastSeen ?? "" };
  });

  // Sort: lower priority number = higher urgency (due sooner / never seen)
  weighted.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    // Tiebreak: older lastSeen first (less recent = more overdue)
    if (a.lastSeen === b.lastSeen) return 0;
    if (!a.lastSeen) return -1;
    if (!b.lastSeen) return 1;
    return a.lastSeen < b.lastSeen ? -1 : 1;
  });

  // Take top n from sorted list, then shuffle just those to avoid a predictable ordering
  const top = weighted.slice(0, n).map(w => w.q);
  // Fisher-Yates with simple random (not seeded, we want variety even within same priority tier)
  for (let i = top.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [top[i], top[j]] = [top[j], top[i]];
  }
  return top;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function DailyPage() {
  const { profile, loaded, trackVisit, markQuizComplete, addXP } = useProfile();
  const { state: gameStateRaw, earnXP: gameEarnXP, loseHeart, buyHearts, xpGainAnimation, completeReading, recordTokenDrop, bumpSessionCount, weeklyChallenge, claimWeeklyReward } = useGameState();
  const enneagramTypeForPet = profile.enneagramType ?? profile.enneagramCore;
  const { petState: livePetState, awardDailyGoalXP } = usePetState(enneagramTypeForPet);

  // ── Merged learn state (21 curriculum units) ──
  const { unitsWithStatus } = useMergedLearnState();
  const [selectedLesson, setSelectedLesson] = useState<LessonWithStatus | null>(null);
  const [selectedLessonUnit, setSelectedLessonUnit] = useState<UnitWithStatus | null>(null);

  // ── Daily unit limit gate ──
  const DAILY_UNIT_LIMIT = 2;
  const UNIT_LIMIT_ACTIVATES_DAY = 5;
  const [unitLimitGate, setUnitLimitGate] = useState<{ pendingLesson: LessonWithStatus; pendingUnit: UnitWithStatus } | null>(null);

  // Track which unit IDs have been started today
  const getTodayStartedUnits = (): Set<string> => {
    try {
      const raw = localStorage.getItem(`psyche-units-started-${getDateKey()}`);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  };
  const recordUnitStarted = (unitId: string) => {
    try {
      const current = getTodayStartedUnits();
      current.add(unitId);
      localStorage.setItem(`psyche-units-started-${getDateKey()}`, JSON.stringify([...current]));
    } catch {}
  };

  // Days since account created (used to activate gate after Day 5)
  const daysSinceCreated = (() => {
    if (!gameStateRaw.accountCreated) return 999;
    const created = new Date(gameStateRaw.accountCreated).getTime();
    return Math.floor((Date.now() - created) / 86400000);
  })();
  const unitLimitActive = daysSinceCreated >= UNIT_LIMIT_ACTIVATES_DAY;

  const handleLessonNodeTap = (lesson: LessonWithStatus, unit: UnitWithStatus) => {
    // Only gate non-completed lessons (don't block reviewing done lessons)
    if (unitLimitActive && lesson.status !== "completed") {
      const startedToday = getTodayStartedUnits();
      const isNewUnitToday = !startedToday.has(unit.id);
      if (isNewUnitToday && startedToday.size >= DAILY_UNIT_LIMIT) {
        setUnitLimitGate({ pendingLesson: lesson, pendingUnit: unit });
        return;
      }
      // Mark this unit as started today
      recordUnitStarted(unit.id);
    }
    setSelectedLesson(lesson);
    setSelectedLessonUnit(unit);
  };

  // ── Streak repair prompt ──
  const [streakRepairPrompt, setStreakRepairPrompt] = useState(false);
  useEffect(() => {
    if (!loaded) return;
    try {
      const prevStreakKey = "psyche-prev-streak";
      const prevStreak = parseInt(localStorage.getItem(prevStreakKey) ?? "0", 10);
      const currentStreak = gameStateRaw.streakCount ?? 0;
      // Store current for next check
      if (currentStreak > 0) localStorage.setItem(prevStreakKey, String(currentStreak));
      // Show repair if streak just broke (had streak yesterday, now 0)
      if (prevStreak > 0 && currentStreak === 0) {
        const repairShownKey = `psyche-repair-shown-${getDateKey()}`;
        if (!localStorage.getItem(repairShownKey)) {
          setStreakRepairPrompt(true);
          localStorage.setItem(repairShownKey, "1");
        }
      }
    } catch {}
  }, [loaded, gameStateRaw.streakCount]);

  // ── View state (hub / path / quiz) ──
  const [view, setView] = useState<"hub" | "path" | "quiz" | "lesson" | "reading">("path");
  const [bottomSheetNode, setBottomSheetNode] = useState<PathNodeConfig | null>(null);
  const [quizSourceNode, setQuizSourceNode] = useState<PathNodeConfig | null>(null);
  const [pendingQuizNode, setPendingQuizNode] = useState<PathNodeConfig | null>(null);

  // ── Legacy tab (kept for stats tab) ──
  const [activeTab, setActiveTab] = useState<"today" | "deep" | "stats">("today");

  // Warmup quiz state
  const [warmupStarted, setWarmupStarted] = useState(false);
  const [warmupQ, setWarmupQ] = useState(0);
  const [warmupSelected, setWarmupSelected] = useState<number | null>(null);
  const [warmupShowExp, setWarmupShowExp] = useState(false);
  const [warmupAnswers, setWarmupAnswers] = useState<boolean[]>([]);
  const [warmupDone, setWarmupDone] = useState(false);

  // Deep learning module state
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [moduleQ, setModuleQ] = useState(0);
  const [moduleSelected, setModuleSelected] = useState<number | null>(null);
  const [moduleShowExp, setModuleShowExp] = useState(false);
  const [moduleAnswers, setModuleAnswers] = useState<boolean[]>([]);
  const [moduleDone, setModuleDone] = useState(false);
  const [moduleStartTime, setModuleStartTime] = useState<number>(0);

  // Engagement
  const { confettiBurst, bigConfetti, emojiRain } = useRewards();

  const [correctStreak, setCorrectStreak] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [copied, setCopied] = useState(false);

  // Daily goal completion celebration
  const [showDailyGoalCelebration, setShowDailyGoalCelebration] = useState(false);
  const dailyGoalCelebratedRef = useRef(false);

  // Weekly challenge claim celebration
  const [showWeeklyCelebration, setShowWeeklyCelebration] = useState(false);

  // Pet level-up celebration
  const [petLevelUpCelebration, setPetLevelUpCelebration] = useState<{ name: string; level: number; petType: number } | null>(null);
  const prevCompanionLevelRef = useRef<number | null>(null);

  // Unit completion milestone celebration
  const [unitCelebration, setUnitCelebration] = useState<{ unitName: string; xp: number } | null>(null);

  // XP gain animation
  const [xpGainShow, setXpGainShow] = useState(false);
  const prevXP = useRef(0);

  // Spaced repetition stats (loaded once at mount, updated via saveQStat)
  const [qStats, setQStats] = useState<Record<string, QStat>>({});
  useEffect(() => { setQStats(loadQStats()); }, []);

  // Daily progress from localStorage
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyState>({ level: 1, correctAtLevel: 0, totalAtLevel: 0 });
  const [weeklyData, setWeeklyData] = useState<{ day: string; value: number }[]>([]);

  // Streak and XP from game state (authoritative source)
  const [gameStreak, setGameStreak] = useState<number>(0);
  const [gameXP, setGameXP] = useState<number>(0);

  // Streak freezes (from psyche-game-state)
  const [streakFreezes, setStreakFreezes] = useState<number>(0);

  // Pet widget, derived live from usePetState hook (always in sync)
  const petWidget = livePetState ? {
    name: livePetState.name,
    petType: livePetState.type,
    health: livePetState.health,
    hunger: livePetState.hunger,
    isAlive: livePetState.isAlive,
  } : null;

  // Daily Insight (static, from curated collection)
  const [dailyInsightData, setDailyInsightData] = useState<{ quote: string; author: string; reflection: string; category: string } | null>(null);

  const dateKey = getDateKey();
  const dayOfYear = getDayOfYear();
  const seed = getTodaySeed();

  // Read notification mute preference
  const [alertsMuted, setAlertsMuted] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("psyche-notification-prefs");
      if (raw) setAlertsMuted(!!JSON.parse(raw).muteAll);
    } catch {}
  }, []);

  // ── Daily Insight (static curated collection) ──
  const insightFallback = {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
    reflection: "Self-knowledge isn't a luxury, it's the foundation everything else is built on.",
    category: "philosophy",
  };
  useEffect(() => {
    if (!loaded) return;
    let cancelled = false;
    import("@/data/daily-insights-index").then(({ getTodayInsight }) => {
      if (cancelled) return;
      try {
        const insight = getTodayInsight();
        if (insight?.quote && insight?.author) {
          setDailyInsightData(insight);
        } else {
          setDailyInsightData(insightFallback);
        }
      } catch {
        setDailyInsightData(insightFallback);
      }
    }).catch(() => {
      if (!cancelled) setDailyInsightData(insightFallback);
    });
    return () => { cancelled = true; };
  }, [loaded]);

  // ── Load from localStorage ──
  useEffect(() => {
    if (!loaded) return;
    trackVisit();

    // Load daily progress
    try {
      const raw = localStorage.getItem(`psyche-daily-${dateKey}`);
      if (raw) {
        const parsed = JSON.parse(raw) as DailyProgress;
        setDailyProgress(parsed);
        if (parsed.warmupDone) setWarmupDone(true);
        setCorrectStreak(parsed.streakCorrect);
      }
    } catch {}

    // Load difficulty
    try {
      const raw = localStorage.getItem("psyche-difficulty");
      if (raw) setDifficulty(JSON.parse(raw));
    } catch {}

    // Load streak, XP, and streak freezes from game state (authoritative source)
    try {
      const raw = localStorage.getItem("psyche-game-state");
      if (raw) {
        const gs = JSON.parse(raw);
        setStreakFreezes(typeof gs.streakFreezes === "number" ? gs.streakFreezes : 0);
        setGameStreak(typeof gs.streakCount === "number" ? gs.streakCount : 0);
        setGameXP(typeof gs.xp === "number" ? gs.xp : 0);
      }
    } catch {}

    // Load weekly data
    const days: { day: string; value: number }[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      try {
        const raw = localStorage.getItem(`psyche-daily-${key}`);
        const data = raw ? (JSON.parse(raw) as DailyProgress) : null;
        days.push({ day: dayNames[d.getDay()], value: data?.questionsAnswered ?? 0 });
      } catch {
        days.push({ day: dayNames[d.getDay()], value: 0 });
      }
    }
    setWeeklyData(days);
  }, [loaded]);

  // ── Save progress helper ──
  const saveProgress = useCallback((updates: Partial<DailyProgress>) => {
    setDailyProgress(prev => {
      const updated: DailyProgress = {
        date: dateKey,
        questionsAnswered: prev?.questionsAnswered ?? 0,
        correctAnswers: prev?.correctAnswers ?? 0,
        xpEarned: prev?.xpEarned ?? 0,
        modulesCompleted: prev?.modulesCompleted ?? [],
        warmupDone: prev?.warmupDone ?? false,
        streakCorrect: prev?.streakCorrect ?? 0,
        bestStreak: prev?.bestStreak ?? 0,
        timeSpentMinutes: prev?.timeSpentMinutes ?? 0,
        moduleScores: prev?.moduleScores ?? {},
        nonQuizCompleted: prev?.nonQuizCompleted ?? [],
        ...updates,
      };
      try { localStorage.setItem(`psyche-daily-${dateKey}`, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, [dateKey]);

  const saveDifficulty = useCallback((d: DifficultyState) => {
    setDifficulty(d);
    try { localStorage.setItem("psyche-difficulty", JSON.stringify(d)); } catch {}
  }, []);

  // ── Check if completing a node finishes an entire unit ──
  const checkUnitCompletionRef = useRef<(completedModuleId: string, newModulesCompleted: string[], newNonQuizCompleted: string[], newWarmupDone: boolean) => void>(() => {});
  checkUnitCompletionRef.current = (completedModuleId: string, newModulesCompleted: string[], newNonQuizCompleted: string[], newWarmupDone: boolean) => {
    const isNodeDone = (id: string, moduleId: string | null) => {
      if (moduleId === "warmup") return newWarmupDone;
      if (moduleId) return newModulesCompleted.includes(moduleId);
      return newNonQuizCompleted.includes(id);
    };

    const units = buildEnneagramUnits();
    for (const unit of units) {
      const unitHasModule = unit.nodes.some(n => n.moduleId === completedModuleId);
      if (!unitHasModule) continue;
      const allDone = unit.nodes.every(n => isNodeDone(n.id, n.moduleId));
      if (allDone) {
        const unitXP = unit.nodes.reduce((sum, n) => sum + n.xp, 0);
        setUnitCelebration({ unitName: unit.name, xp: unitXP });
        setTimeout(() => setUnitCelebration(null), 5000);
      }
      break; // Found the unit containing this module; no need to check others
    }
  };

  // ── Check if first quiz of day (2x XP bonus) ──
  const isFirstQuizToday = !dailyProgress || dailyProgress.questionsAnswered === 0;

  // ── Profile data ──
  const enneagramType = profile.enneagramType ?? 5;
  const cognitiveType = profile.cognitiveType ?? "INTJ";
  // Read streak and XP from psyche-game-state (authoritative); fall back to profile for legacy users
  const streak = gameStreak > 0 ? gameStreak : (profile.streakCount ?? 0);
  const totalXP = gameXP > 0 ? gameXP : (profile.xp ?? 0);

  // XP gain animation effect
  useEffect(() => {
    if (totalXP > prevXP.current && prevXP.current > 0) {
      setXpGainShow(true);
      setTimeout(() => setXpGainShow(false), 1500);
    }
    prevXP.current = totalXP;
  }, [totalXP]);

  // ── Daily Goal Completion Celebration ──
  useEffect(() => {
    if (gameStateRaw?.dailyGoalMet && !dailyGoalCelebratedRef.current) {
      dailyGoalCelebratedRef.current = true;
      setShowDailyGoalCelebration(true);
      // Award companion XP for daily goal
      awardDailyGoalXP();
      setTimeout(() => setShowDailyGoalCelebration(false), 3000);
    }
  }, [gameStateRaw?.dailyGoalMet, awardDailyGoalXP]);

  // ── Pet Level-Up Celebration ──
  useEffect(() => {
    if (!livePetState) return;
    const currentLevel = livePetState.companionLevel;
    if (prevCompanionLevelRef.current !== null && currentLevel > prevCompanionLevelRef.current) {
      setPetLevelUpCelebration({
        name: livePetState.name,
        level: currentLevel,
        petType: livePetState.type,
      });
      setTimeout(() => setPetLevelUpCelebration(null), 4000);
    }
    prevCompanionLevelRef.current = currentLevel;
  }, [livePetState?.companionLevel, livePetState?.name, livePetState?.type]);

  // ── Milestones ──
  const milestones = [
    { xp: 0, label: "Beginner" },
    { xp: 100, label: "Curious Seeker" },
    { xp: 250, label: "Type Explorer" },
    { xp: 500, label: "Self-Knowledge Practitioner" },
    { xp: 1000, label: "Pattern Reader" },
    { xp: 2000, label: "Inner Work Adept" },
    { xp: 5000, label: "Depth Psychologist" },
    { xp: 10000, label: "Integration Master" },
  ];
  const currentMilestone = milestones.filter(m => totalXP >= m.xp).pop() ?? milestones[0];
  const nextMilestone = milestones.find(m => totalXP < m.xp);
  const progressToNext = nextMilestone ? Math.round(((totalXP - currentMilestone.xp) / (nextMilestone.xp - currentMilestone.xp)) * 100) : 100;

  // ── Today's content ──
  const insightIdx = dayOfYear % 7;
  const challengeIdx = (dayOfYear + 2) % 7;
  const todayInsight = profile.enneagramType ? typeInsights[profile.enneagramType]?.[insightIdx] : null;
  const todayChallenge = profile.enneagramType ? typeChallenges[profile.enneagramType]?.[challengeIdx] : null;

  // ── Question selection helpers ──
  const getQuestionsForModule = useCallback((moduleId: string, count: number): Question[] => {
    // Map user skill level (1-10) to max question tier (0-4).
    // Tiers 0 & 1 are reserved for future intro questions.
    // Currently the lowest available tier is 2 (recall), so new users start there.
    //   Level 1-5  → maxTier 2 (Recall: core fears, passions, integration arrows)
    //   Level 6-7  → maxTier 3 (Application: subtypes, harmonic/hornevian groups)
    //   Level 8-10 → maxTier 4 (Analysis: Naranjo fixations, Riso levels, countertypes)
    const maxTier: 2 | 3 | 4 =
      difficulty.level <= 5 ? 2 :
      difficulty.level <= 7 ? 3 :
      4;

    const resolvedModuleId = moduleId === "cross-bonus" ? "cross" : moduleId;
    let pool = QUESTION_BANK.filter(q => q.module === resolvedModuleId);

    // For type module, prefer questions specific to user's type
    if (moduleId === "type" && profile.enneagramType) {
      const typeQ = pool.filter(q => q.typeSpecific === profile.enneagramType);
      const generalQ = pool.filter(q => !q.typeSpecific || q.typeSpecific === 0);
      pool = [...typeQ, ...generalQ];
    }

    // Build eligible set: all questions at or below maxTier.
    // Graceful fallback: if the bank has no questions at/below maxTier (e.g. tier 0/1
    // slots not yet filled), surface the lowest available tier instead.
    let eligible = pool.filter(q => q.tier <= maxTier);
    if (eligible.length === 0) eligible = pool;

    const atMaxTier = eligible.filter(q => q.tier === maxTier);
    const belowMax  = eligible.filter(q => q.tier <  maxTier);

    // Mix: 60% at the frontier tier, 40% review from easier tiers
    const frontierCount = Math.ceil(count * 0.6);
    const reviewCount   = count - frontierCount;

    const shuffledFrontier = shuffleWithSeed(atMaxTier, seed + moduleId.length);
    const shuffledReview   = shuffleWithSeed(belowMax,  seed + moduleId.length + 1);

    const selected = [
      ...shuffledFrontier.slice(0, frontierCount),
      ...shuffledReview.slice(0, reviewCount),
    ];

    // If still short (sparse bank for this tier), fill from the full eligible pool
    if (selected.length < count) {
      const seen = new Set(selected.map(q => q.id));
      const remaining = shuffleWithSeed(eligible.filter(q => !seen.has(q.id)), seed + 99);
      selected.push(...remaining.slice(0, count - selected.length));
    }

    return shuffleWithSeed(selected, seed + moduleId.charCodeAt(0)).slice(0, count);
  }, [difficulty.level, seed, profile.enneagramType]);

  // Warmup questions, intro foundations for new users, then progressively harder
  const warmupQuestions = useMemo(() => {
    const hasStats = Object.keys(qStats).length > 0;
    // New users (level 1-2): prioritize tier 0-1 intro questions so they learn the systems
    if (difficulty.level <= 2) {
      const introPool = QUESTION_BANK.filter(q => q.tier <= 1);
      if (introPool.length > 0) {
        if (hasStats) return srSelectQuestions(introPool, 5, qStats);
        return shuffleWithSeed(introPool, seed).slice(0, 5);
      }
    }
    // Level 3-5: mix intro + recall (tier 0-2)
    // Level 6+: recall + application (tier 2-3)
    const warmupMaxTier: 0 | 1 | 2 | 3 = difficulty.level <= 2 ? 1 : difficulty.level <= 5 ? 2 : 3;
    const pool = QUESTION_BANK.filter(q => q.tier <= warmupMaxTier);
    const source = pool.length > 0 ? pool : QUESTION_BANK;
    if (hasStats || source.some(q => qStats[q.id])) {
      return srSelectQuestions(source, 5, qStats);
    }
    return shuffleWithSeed(source, seed).slice(0, 5);
  }, [seed, difficulty.level, qStats]);

  // Active module questions
  const moduleQuestions = useMemo(() => {
    if (!activeModule) return [];
    const config = MODULE_CONFIG.find(m => m.id === activeModule);
    return getQuestionsForModule(activeModule, config?.count ?? 15);
  }, [activeModule, getQuestionsForModule]);

  // ── XP calculation ──
  const calculateXP = (correct: boolean, moduleId: string, currentStreak: number): number => {
    const baseXP = moduleId === "cross" ? 20 : 10;
    if (!correct) return 0;
    let xp = baseXP;
    if (currentStreak >= 3) xp += 5; // streak bonus
    if (isFirstQuizToday) xp *= 2; // daily bonus
    return xp;
  };

  // ── Warmup handlers ──
  const handleWarmupAnswer = (idx: number) => {
    if (warmupSelected !== null) return;
    setWarmupSelected(idx);
    setWarmupShowExp(true);
    const correct = idx === warmupQuestions[warmupQ].ans;
    setWarmupAnswers(prev => [...prev, correct]);
    // Record for spaced repetition
    saveQStat(warmupQuestions[warmupQ].id, correct);
    if (correct) trackWeeklyEvent("quiz_correct");

    const newStreak = correct ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    const xpGained = correct ? (isFirstQuizToday ? 20 : 10) + (newStreak >= 3 ? 5 : 0) : 0;
    if (xpGained > 0) {
      gameEarnXP(xpGained, "daily-quiz");
      addXP(xpGained);
      setSessionXP(prev => prev + xpGained);
    }
    if (!correct) loseHeart();

    if (correct) confettiBurst();

    saveProgress({
      questionsAnswered: (dailyProgress?.questionsAnswered ?? 0) + 1,
      correctAnswers: (dailyProgress?.correctAnswers ?? 0) + (correct ? 1 : 0),
      xpEarned: (dailyProgress?.xpEarned ?? 0) + xpGained,
      streakCorrect: newStreak,
      bestStreak: Math.max(dailyProgress?.bestStreak ?? 0, newStreak),
    });
  };

  const nextWarmupQuestion = () => {
    if (warmupQ + 1 >= warmupQuestions.length) {
      setWarmupDone(true);
      bumpSessionCount();
      saveProgress({ warmupDone: true });
      trackWeeklyEvent("module_complete");

      // Perfect section bonus
      const allCorrect = warmupAnswers.length === warmupQuestions.length && warmupAnswers.every(Boolean);
      if (allCorrect) {
        gameEarnXP(25, "perfect-score-bonus");
        addXP(25);
        setSessionXP(prev => prev + 25);
        bigConfetti();
      }

      // Check if this completes an entire unit
      checkUnitCompletionRef.current(
        "warmup",
        dailyProgress?.modulesCompleted ?? [],
        dailyProgress?.nonQuizCompleted ?? [],
        true, // warmup is now done
      );
    } else {
      setWarmupQ(q => q + 1);
      setWarmupSelected(null);
      setWarmupShowExp(false);
    }
  };

  // ── Module handlers ──
  const startModule = (moduleId: string) => {
    setActiveModule(moduleId);
    setModuleQ(0);
    setModuleSelected(null);
    setModuleShowExp(false);
    setModuleAnswers([]);
    setModuleDone(false);
    setModuleStartTime(Date.now());
  };

  const handleModuleAnswer = (idx: number) => {
    if (moduleSelected !== null) return;
    setModuleSelected(idx);
    setModuleShowExp(true);
    const correct = idx === moduleQuestions[moduleQ].ans;
    setModuleAnswers(prev => [...prev, correct]);
    if (correct) trackWeeklyEvent("quiz_correct");

    const newStreak = correct ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    const xpGained = calculateXP(correct, activeModule!, newStreak);
    if (xpGained > 0) {
      gameEarnXP(xpGained, "daily-quiz");
      addXP(xpGained);
      setSessionXP(prev => prev + xpGained);
    }
    if (!correct) loseHeart();

    if (correct) confettiBurst();

    saveProgress({
      questionsAnswered: (dailyProgress?.questionsAnswered ?? 0) + 1,
      correctAnswers: (dailyProgress?.correctAnswers ?? 0) + (correct ? 1 : 0),
      xpEarned: (dailyProgress?.xpEarned ?? 0) + xpGained,
      streakCorrect: newStreak,
      bestStreak: Math.max(dailyProgress?.bestStreak ?? 0, newStreak),
    });

    // Update difficulty
    const newDiff = { ...difficulty };
    newDiff.totalAtLevel++;
    if (correct) newDiff.correctAtLevel++;
    if (newDiff.totalAtLevel >= 10) {
      if (newDiff.correctAtLevel >= 8 && newDiff.level < 10) {
        newDiff.level++;
        newDiff.correctAtLevel = 0;
        newDiff.totalAtLevel = 0;
      } else if (newDiff.correctAtLevel < 5 && newDiff.level > 1) {
        newDiff.level--;
        newDiff.correctAtLevel = 0;
        newDiff.totalAtLevel = 0;
      } else {
        newDiff.correctAtLevel = 0;
        newDiff.totalAtLevel = 0;
      }
    }
    saveDifficulty(newDiff);
  };

  const nextModuleQuestion = () => {
    if (moduleQ + 1 >= moduleQuestions.length) {
      setModuleDone(true);
      bumpSessionCount();
      trackWeeklyEvent("module_complete");
      const correctCount = moduleAnswers.filter(Boolean).length + (moduleSelected === moduleQuestions[moduleQ]?.ans ? 1 : 0);
      const totalCount = moduleAnswers.length + 1;
      const timeSpent = Math.round((Date.now() - moduleStartTime) / 60000);

      // Perfect section bonus
      if (correctCount === totalCount) {
        gameEarnXP(25, "perfect-score-bonus");
        addXP(25);
        setSessionXP(prev => prev + 25);
        bigConfetti();
      }

      const moduleScores = { ...(dailyProgress?.moduleScores ?? {}) };
      moduleScores[activeModule!] = { correct: correctCount, total: totalCount, xp: sessionXP };

      const newModulesCompleted = [...(dailyProgress?.modulesCompleted ?? []), activeModule!];
      saveProgress({
        modulesCompleted: newModulesCompleted,
        timeSpentMinutes: (dailyProgress?.timeSpentMinutes ?? 0) + timeSpent,
        moduleScores,
      });

      // Check if this completes an entire unit
      checkUnitCompletionRef.current(
        activeModule!,
        newModulesCompleted,
        dailyProgress?.nonQuizCompleted ?? [],
        dailyProgress?.warmupDone ?? false,
      );
    } else {
      setModuleQ(q => q + 1);
      setModuleSelected(null);
      setModuleShowExp(false);
    }
  };

  const shareScore = async () => {
    const correctCount = moduleAnswers.filter(Boolean).length;
    const totalCount = moduleAnswers.length;
    const config = MODULE_CONFIG.find(m => m.id === activeModule);
    const text = `Thyself Daily Practice - ${config?.title}\nScore: ${correctCount}/${totalCount} | Difficulty: Level ${difficulty.level}/10 | Streak: ${correctStreak}\nTrain your self-knowledge at archetype.app`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permission denied — fail silently
    }
  };

  // ── Computed stats ──
  const totalAnsweredToday = dailyProgress?.questionsAnswered ?? 0;
  const totalCorrectToday = dailyProgress?.correctAnswers ?? 0;
  const accuracyToday = totalAnsweredToday > 0 ? Math.round((totalCorrectToday / totalAnsweredToday) * 100) : 0;
  // Load all-time total once on mount — not recalculated on every answer
  const [totalAnsweredAllTime, setTotalAnsweredAllTime] = useState(0);
  useEffect(() => {
    if (!loaded || typeof window === "undefined") return;
    let total = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      try {
        const raw = localStorage.getItem(`psyche-daily-${key}`);
        if (raw) total += (JSON.parse(raw) as DailyProgress).questionsAnswered;
      } catch {}
    }
    setTotalAnsweredAllTime(total);
  }, [loaded]);

  const today = new Date();

  // ── Build path units with sequential (Duolingo-style) locking ──
  const applySequentialStatus = (
    rawNodes: Omit<PathNodeConfig, "status">[],
    isNodeDone: (nodeId: string, moduleId: string | null) => boolean
  ): PathNodeConfig[] => {
    let prevCompleted = true;
    return rawNodes.map((node) => {
      const done = isNodeDone(node.id, node.moduleId);
      let status: PathNodeConfig["status"];
      if (done) {
        status = "completed";
      } else if (prevCompleted) {
        status = "current";
      } else {
        status = "locked";
      }
      prevCompleted = done;
      return { ...node, status };
    });
  };

  const buildEnneagramUnits = (): PathUnit[] => {
    const wDone = dailyProgress?.warmupDone ?? false;
    const mDone = dailyProgress?.modulesCompleted ?? [];
    const nqDone = dailyProgress?.nonQuizCompleted ?? [];
    const isNodeDone = (id: string, moduleId: string | null) => {
      if (moduleId === "warmup") return wDone;
      if (moduleId) return mDone.includes(moduleId);
      return nqDone.includes(id); // reflection/challenge
    };

    const allRaw: Omit<PathNodeConfig, "status">[] = [
      { id: "warmup",         moduleId: "warmup",    nodeType: "quiz",       label: "Warm-Up",            sublabel: "5 quick questions",              xp: 50,  questionCount: 5,  unitName: "unit1", gradFrom: "#10b981", gradTo: "#6366f1" },
      { id: "type",           moduleId: "type",      nodeType: "quiz",       label: "Type Deep Dive",     sublabel: "Your Enneagram type",             xp: 100, questionCount: 20, unitName: "unit1", gradFrom: "#6366f1", gradTo: "#8b5cf6" },
      { id: "e-reflection-1", moduleId: null,        nodeType: "reflection", label: "Reflection",         sublabel: "Journal your type experience",    xp: 40,  questionCount: 0,  unitName: "unit1", gradFrom: "#8b5cf6", gradTo: "#a78bfa",
        prompt: "How did your Enneagram type show up in your thoughts and behaviors today? What patterns did you notice, and what might they be telling you about your core motivations?" },
      { id: "cognitive",      moduleId: "cognitive", nodeType: "quiz",       label: "Cognitive Functions",sublabel: "Your function stack",              xp: 75,  questionCount: 15, unitName: "unit2", gradFrom: "#6366f1", gradTo: "#8b5cf6" },
      { id: "cross",          moduleId: "cross",     nodeType: "quiz",       label: "Cross-System",       sublabel: "Where Enneagram meets Jung",      xp: 90,  questionCount: 12, unitName: "unit2", gradFrom: "#8b5cf6", gradTo: "#d946ef" },
      { id: "e-challenge-1",  moduleId: null,        nodeType: "challenge",  label: "Growth Challenge",   sublabel: "Apply your insight to real life",  xp: 50,  questionCount: 0,  unitName: "unit2", gradFrom: "#d946ef", gradTo: "#ec4899",
        prompt: "Describe a specific situation today where you can (or did) act from your growth direction rather than your stress direction. What would it look like to embody your integrated self right now?" },
      { id: "history",        moduleId: "history",   nodeType: "bonus",      label: "Bonus: History",     sublabel: "Origins & theory deep dive",      xp: 75,  questionCount: 12, unitName: "unit3", gradFrom: "#8b5cf6", gradTo: "#ec4899" },
    ];

    const nodes = applySequentialStatus(allRaw, isNodeDone);
    return [
      { id: "unit1", name: "Foundations",      gradFrom: "#10b981", gradTo: "#6366f1", nodes: nodes.filter(n => n.unitName === "unit1") },
      { id: "unit2", name: "Mind & Growth",    gradFrom: "#6366f1", gradTo: "#d946ef", nodes: nodes.filter(n => n.unitName === "unit2") },
      { id: "unit3", name: "History & Depth",  gradFrom: "#8b5cf6", gradTo: "#ec4899", nodes: nodes.filter(n => n.unitName === "unit3") },
    ];
  };

  const buildJungianUnits = (): PathUnit[] => {
    const wDone = dailyProgress?.warmupDone ?? false;
    const mDone = dailyProgress?.modulesCompleted ?? [];
    const nqDone = dailyProgress?.nonQuizCompleted ?? [];
    const isNodeDone = (id: string, moduleId: string | null) => {
      if (moduleId === "warmup") return wDone;
      if (moduleId) return mDone.includes(moduleId);
      return nqDone.includes(id);
    };

    const allRaw: Omit<PathNodeConfig, "status">[] = [
      { id: "j-warmup",       moduleId: "warmup",    nodeType: "quiz",       label: "Warm-Up",            sublabel: "5 quick questions",              xp: 50,  questionCount: 5,  unitName: "unit1", gradFrom: "#3b82f6", gradTo: "#6366f1" },
      { id: "j-cognitive",    moduleId: "cognitive", nodeType: "quiz",       label: "Cognitive Functions",sublabel: "Your Jung function stack",        xp: 75,  questionCount: 15, unitName: "unit1", gradFrom: "#6366f1", gradTo: "#8b5cf6" },
      { id: "j-reflection-1", moduleId: null,        nodeType: "reflection", label: "Reflection",         sublabel: "Journal your function stack",     xp: 40,  questionCount: 0,  unitName: "unit1", gradFrom: "#8b5cf6", gradTo: "#a78bfa",
        prompt: "How did your dominant cognitive function influence the way you processed information or made decisions today? Notice any tension between your dominant and inferior functions." },
      { id: "j-cross",        moduleId: "cross",     nodeType: "quiz",       label: "Cross-System",       sublabel: "Systems integration",             xp: 90,  questionCount: 12, unitName: "unit2", gradFrom: "#8b5cf6", gradTo: "#d946ef" },
      { id: "j-history",      moduleId: "history",   nodeType: "quiz",       label: "History & Theory",   sublabel: "Origins of Jungian thought",      xp: 75,  questionCount: 12, unitName: "unit2", gradFrom: "#8b5cf6", gradTo: "#ec4899" },
      { id: "j-challenge-1",  moduleId: null,        nodeType: "challenge",  label: "Shadow Work",        sublabel: "Engage your inferior function",   xp: 50,  questionCount: 0,  unitName: "unit2", gradFrom: "#ec4899", gradTo: "#f43f5e",
        prompt: "Describe a moment today when your inferior function created friction or discomfort. What triggered it? What would it look like to approach it with curiosity rather than avoidance?" },
      { id: "j-bonus",        moduleId: "cross-bonus", nodeType: "bonus",    label: "Bonus Round",        sublabel: "Extra cross-system challenge",     xp: 60,  questionCount: 12, unitName: "unit2", gradFrom: "#f43f5e", gradTo: "#8b5cf6" },
    ];

    const nodes = applySequentialStatus(allRaw, isNodeDone);
    return [
      { id: "jungian1", name: "Function Stack", gradFrom: "#3b82f6", gradTo: "#6366f1", nodes: nodes.filter(n => n.unitName === "unit1") },
      { id: "jungian2", name: "Integration",    gradFrom: "#6366f1", gradTo: "#f43f5e", nodes: nodes.filter(n => n.unitName === "unit2") },
    ];
  };

  const enneagramUnits = buildEnneagramUnits();
  const jungianUnits = buildJungianUnits();
  const currentUnits = enneagramUnits;
  const allPathNodes = currentUnits.flatMap(u => u.nodes);
  const miniPathNodes = allPathNodes.slice(0, 5);
  const nextNode = allPathNodes.find(n => n.status !== "completed") ?? null;
  // First non-warmup, non-completed node, used for "Keep Going" after warmup
  const postWarmupNode = allPathNodes.find(n => n.moduleId !== "warmup" && n.status !== "completed") ?? null;
  const completedTodayCount = allPathNodes.filter(n => n.status === "completed").length;

  // ── Actually begin the quiz for a node (after lesson is done/skipped) ──
  const beginQuizForNode = (node: PathNodeConfig) => {
    setQuizSourceNode(node);
    if (node.moduleId === "warmup") {
      // Reset local warmup state so "Practice Again" works correctly
      setWarmupDone(false);
      setWarmupStarted(true);
      setWarmupQ(0);
      setWarmupSelected(null);
      setWarmupShowExp(false);
      setWarmupAnswers([]);
      setSessionXP(0);
      setView("quiz");
      setActiveTab("today");
    } else if (node.moduleId) {
      setModuleDone(false);
      setSessionXP(0);
      startModule(node.moduleId);
      setView("quiz");
      setActiveTab("deep");
    }
  };

  // ── Start a node (from bottom sheet) — show lesson first ──
  const startNode = (node: PathNodeConfig) => {
    setBottomSheetNode(null);
    if (node.moduleId) {
      setPendingQuizNode(node);
      setView("lesson");
    }
  };

  // ── Complete a reflection/challenge node ──
  const completeNonQuizNode = (node: PathNodeConfig, text?: string) => {
    const existing = dailyProgress?.nonQuizCompleted ?? [];
    if (existing.includes(node.id)) return;
    saveProgress({ nonQuizCompleted: [...existing, node.id] });
    gameEarnXP(node.xp, "reflection");
    addXP(node.xp);
    setSessionXP(prev => prev + node.xp);
    // Persist reflection text to journal
    if (text?.trim()) {
      try {
        const journalKey = "psyche-reflections";
        const existing = JSON.parse(localStorage.getItem(journalKey) || "[]") as Array<{
          id: string; date: string; nodeId: string; nodeLabel: string; prompt: string; text: string;
        }>;
        existing.unshift({
          id: `${node.id}-${Date.now()}`,
          date: new Intl.DateTimeFormat("en-CA").format(new Date()),
          nodeId: node.id,
          nodeLabel: node.label,
          prompt: node.prompt ?? "",
          text: text.trim(),
        });
        localStorage.setItem(journalKey, JSON.stringify(existing.slice(0, 200)));
      } catch {}
    }
  };

  if (!loaded) return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0f0a1e" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl animate-pulse" style={{ background: "rgba(124,58,237,0.25)" }} />
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(167,139,250,0.5)", animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // QUIZ RENDERER (shared between warmup and modules)
  // ═══════════════════════════════════════════════════════════════════════
  const renderQuiz = (
    questions: Question[],
    currentIdx: number,
    selected: number | null,
    showExp: boolean,
    answers: boolean[],
    onAnswer: (idx: number) => void,
    onNext: () => void,
    done: boolean,
  ) => {
    if (done) return null;
    const q = questions[currentIdx];
    if (!q) return null;
    const isCorrect = selected === q.ans;
    const diffLabel = q.tier <= 2 ? "Recall" : q.tier === 3 ? "Application" : "Analysis";
    const diffColor = q.tier <= 2 ? "text-emerald-500" : q.tier === 3 ? "text-amber-500" : "text-rose-500";

    return (
      <div>
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-4">
          {questions.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < currentIdx ? (answers[i] ? "bg-emerald-400" : "bg-rose-300")
              : i === currentIdx ? "bg-indigo-400"
              : "bg-slate-100"
            }`} />
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${diffColor}`}>{diffLabel}</span>
            <span className="text-[10px] text-slate-300">|</span>
            <span className="text-[10px] text-slate-400">{currentIdx + 1} of {questions.length}</span>
          </div>
          {correctStreak > 0 && <StreakFlame count={correctStreak} />}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-slate-800 font-medium text-base leading-relaxed mb-5">{q.q}</p>

            <div className="space-y-2.5">
              {q.opts.map((opt, i) => {
                const isThisCorrect = i === q.ans;
                const isThisSelected = i === selected;
                const revealed = selected !== null;

                return (
                  <motion.button
                    key={i}
                    onClick={() => onAnswer(i)}
                    disabled={revealed}
                    whileHover={!revealed ? { scale: 1.01 } : {}}
                    whileTap={!revealed ? { scale: 0.99 } : {}}
                    animate={revealed && isThisSelected && !isThisCorrect ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm border-2 transition-all ${
                      !revealed
                        ? "border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer"
                        : isThisCorrect
                        ? "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-100"
                        : isThisSelected
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : "border-slate-100 bg-slate-50/50 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                        !revealed ? "bg-slate-100 text-slate-500"
                        : isThisCorrect ? "bg-emerald-400 text-white"
                        : isThisSelected ? "bg-rose-400 text-white"
                        : "bg-slate-100 text-slate-300"
                      }`}>
                        {revealed && isThisCorrect ? <CheckCircle className="w-4 h-4" /> :
                         revealed && isThisSelected ? <XCircle className="w-4 h-4" /> :
                         String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExp && (
                <motion.div
                  initial={{ opacity: 1, y: 0, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`mt-4 p-4 rounded-xl text-sm ${
                    isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    {isCorrect
                      ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                    <div>
                      <p className={`font-medium mb-1 ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                        {isCorrect ? "Correct!" : "Not quite."}
                      </p>
                      <p className="text-slate-600 leading-relaxed">{q.exp}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {showExp && (
              <motion.button
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                onClick={onNext}
                className="mt-4 w-full py-3.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl text-sm font-medium hover:from-slate-700 hover:to-slate-600 transition-all shadow-sm"
              >
                {currentIdx + 1 >= questions.length ? "See Results" : "Next Question"}
                {currentIdx + 1 < questions.length && <ChevronRight className="w-4 h-4 inline ml-1" />}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  // ── Hub view ──
  if (view === "hub") {
    return (
      <div className="min-h-screen">
        {/* Confetti handled by react-rewards anchors in layout */}
        <FirstVisitTooltip
          storageKey="psyche-visited-daily"
          message="Complete your daily goal to earn XP, tokens, and build your streak 🔥"
          icon="🎯"
        />
        <BeginnerBanner
          dismissKey="daily-hub"
          message="You made it to your Daily Path! Tap Continue Path to start your first lesson and begin building your streak."
          primaryLabel="Continue Path"
          primaryOnClick={() => setView("path")}
        />
        <HubView
          streak={streak}
          totalXP={totalXP}
          xpProgress={progressToNext}
          xpLabel={currentMilestone.label}
          xpToNext={nextMilestone ? nextMilestone.xp - totalXP : null}
          nextMilestoneLabel={nextMilestone?.label ?? null}
          enneagramType={profile.enneagramType ?? 0}
          enneagramTypeName={profile.enneagramType ? `Type ${profile.enneagramType}` : ""}
          jungianType={profile.cognitiveType ?? ""}
          completedToday={completedTodayCount}
          totalNodes={allPathNodes.length}
          petWidget={petWidget}
          insightData={dailyInsightData}
          onContinuePath={() => setView("path")}
          onNodeTap={(node) => setBottomSheetNode(node)}
          miniPathNodes={miniPathNodes}
          nextNode={nextNode}
          streakFreezes={streakFreezes}
          longestStreak={gameStateRaw.longestStreak}
          questionsAnsweredToday={dailyProgress?.questionsAnswered ?? 0}
          warmupDoneToday={dailyProgress?.warmupDone ?? false}
          dailyXPEarned={gameStateRaw.dailyXPEarned}
          readingDoneToday={gameStateRaw.dailyReadingDate === new Date().toISOString().split("T")[0]}
          onStartReading={() => setView("reading")}
          units={currentUnits}
          onViewFullPath={() => setView("path")}
          tokens={gameStateRaw.tokens ?? 0}
          instinct={profile.instinctualStacking}
          name={profile.displayName}
          weeklyChallenge={weeklyChallenge}
          onClaimWeeklyReward={() => { claimWeeklyReward(); setShowWeeklyCelebration(true); }}
        />
        <NodeBottomSheet
          node={bottomSheetNode}
          onClose={() => setBottomSheetNode(null)}
          onStart={startNode}
          onCompleteNonQuiz={completeNonQuizNode}
          isCompleted={(id) => {
            const nq = dailyProgress?.nonQuizCompleted ?? [];
            const m = dailyProgress?.modulesCompleted ?? [];
            const w = dailyProgress?.warmupDone ?? false;
            return nq.includes(id) || m.includes(id) || (id === "warmup" && w);
          }}
        />
        {/* Stats link */}
        <div className="fixed bottom-20 right-4 z-30">
          <button
            onClick={() => { setView("quiz"); setActiveTab("stats"); }}
            className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>

        {/* Streak Milestone Modal */}
        <MilestoneModal
          streakCount={streak}
          enneagramType={profile.enneagramType ?? null}
        />
      </div>
    );
  }

  // ── Path view ──
  if (view === "reading") {
    const today = new Date().toISOString().split("T")[0];
    const daysSinceJoin = gameStateRaw.accountCreated
      ? Math.floor((Date.now() - new Date(gameStateRaw.accountCreated).getTime()) / 86400000)
      : 0;
    const todayReading = getDailyReading(
      profile.enneagramType ?? null,
      daysSinceJoin,
      gameStateRaw.completedReadingIds ?? []
    );
    const alreadyRead = gameStateRaw.dailyReadingDate === today;

    if (!todayReading) return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-400">No reading available today.</p></div>;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <DailyReading
          reading={todayReading}
          alreadyCompleted={alreadyRead}
          onBack={() => setView("hub")}
          onComplete={(tokens, xp) => {
            completeReading(todayReading.id, tokens, xp);
            // Full Day bonus: all 4 quests done
            const qDone = (dailyProgress?.questionsAnswered ?? 0) >= 5;
            const wDone = dailyProgress?.warmupDone ?? false;
            const xpDone = (gameStateRaw.dailyXPEarned ?? 0) >= 50;
            if (qDone && wDone && xpDone) {
              completeReading("full-day-bonus", 20, 0);
            }
          }}
        />
      </div>
    );
  }

  if (view === "path") {
    return (
      <div className="min-h-screen" style={{ background: "#0f0a1e" }}>
        {/* Confetti handled by react-rewards anchors in layout */}

        {/* Unit completion milestone celebration */}
        <AnimatePresence>
          {unitCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] flex items-center justify-center px-6"
              style={{ background: "rgba(15,10,30,0.85)", backdropFilter: "blur(8px)" }}
              onClick={() => setUnitCelebration(null)}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 18, stiffness: 280 }}
                className="flex flex-col items-center text-center max-w-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  🏆
                </motion.div>
                <motion.h2
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl font-black text-white mb-2"
                >
                  You&apos;ve mastered {unitCelebration.unitName}!
                </motion.h2>
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full mb-6"
                  style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)" }}
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 font-bold text-sm">+{unitCelebration.xp} XP earned</span>
                </motion.div>
                <motion.button
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setUnitCelebration(null)}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-base flex items-center gap-2"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 4px 20px rgba(139,92,246,0.5)" }}
                >
                  Continue to next section <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Duolingo-style stat bar */}
        <div className="sticky top-0 z-20 px-4 py-2.5" style={{ background: "rgba(15,10,30,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Streak */}
            <div className="flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-orange-400" />
              <SlotCounter value={streak} sequentialAnimationMode charClassName="text-white font-bold text-sm" duration={0.6} />
            </div>
            {/* Hearts */}
            <div className="flex items-center gap-1.5">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <div className="flex flex-col items-start">
                <span className="text-white font-bold text-sm">{gameStateRaw.hearts ?? 5}</span>
                {(gameStateRaw.hearts ?? 5) < (gameStateRaw.maxHearts ?? 5) && gameStateRaw.heartsRefillTime && (
                  <span className="text-[8px] text-red-300/60">{formatRefillTime(gameStateRaw.heartsRefillTime)}</span>
                )}
              </div>
            </div>
            {/* XP */}
            <div className="flex items-center gap-1.5 relative">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <SlotCounter value={totalXP} sequentialAnimationMode charClassName="text-white font-bold text-sm" duration={0.6} />
              <AnimatePresence>
                {xpGainShow && (
                  <motion.span
                    className="absolute -top-4 left-1/2 text-yellow-300 text-xs font-bold"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -20, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                  >
                    +XP
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {/* Tokens */}
            <div className="flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-emerald-400" />
              <SlotCounter value={gameStateRaw.tokens ?? 0} sequentialAnimationMode charClassName="text-white font-bold text-sm" duration={0.6} />
            </div>
            {/* Progress */}
            <div className="flex items-center gap-1.5">
              <span className="text-violet-400/60 text-xs font-medium">{completedTodayCount}/{allPathNodes.length}</span>
            </div>
          </div>
          {/* XP progress bar */}
          <div className="max-w-md mx-auto mt-1.5">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.2)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(progressToNext, 100)}%`,
                  background: "linear-gradient(90deg, #8b5cf6, #a855f7)",
                }}
              />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[9px] text-violet-400/50 font-medium">{currentMilestone.label}</span>
              {nextMilestone && (
                <span className="text-[9px] text-violet-400/50 font-medium">{nextMilestone.xp - totalXP} XP to {nextMilestone.label}</span>
              )}
            </div>
          </div>
        </div>
        {/* ─── Quick Actions ───────────────────────────────────────────── */}
        <div className="max-w-md mx-auto px-4 pt-4 flex gap-3">
          <button
            onClick={() => { setView("quiz"); setActiveTab("today"); }}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 16px rgba(124,58,237,0.35)" }}
          >
            🔥 Today&apos;s Challenge
          </button>
          <button
            onClick={() => { setView("quiz"); setActiveTab("deep"); }}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#c4b5fd" }}
          >
            ⚡ Practice Quiz
          </button>
        </div>

        {/* Streak milestone celebration */}
        {[7, 14, 30, 60, 100].includes(streak) && (
          <motion.div
            className="mx-4 mt-2 p-3 rounded-2xl text-center"
            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.1))", border: "1px solid rgba(251,191,36,0.3)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <span className="text-yellow-400 text-lg">🏆</span>
            <span className="text-yellow-300 text-sm font-bold ml-2">{streak}-Day Streak!</span>
          </motion.div>
        )}
        {/* Streak at risk warning */}
        {completedTodayCount === 0 && new Date().getHours() >= 18 && streak > 0 && !alertsMuted && (
          <motion.div
            className="mx-4 mt-2 p-3 rounded-2xl flex items-center gap-2"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <Flame className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-red-300 text-sm font-medium flex-1">Your {streak}-day streak is at risk!</span>
            <Link href="/settings" className="text-[10px] text-red-400/50 underline whitespace-nowrap">Silence</Link>
          </motion.div>
        )}
        {/* Pet health warning banner — shows most urgent issue only */}
        {livePetState && !alertsMuted && (() => {
          const warn = !livePetState.isAlive
            ? { icon: <AlertTriangle className="w-4 h-4 text-red-300" />, text: "Your pet needs revival! Visit the avatar page.", bg: "rgba(127,29,29,0.15)", border: "rgba(239,68,68,0.4)", textColor: "text-red-300" }
            : livePetState.health < 20
            ? { icon: <Heart className="w-4 h-4 text-red-400" />, text: "Your pet is sick! Give medicine before it\u2019s too late!", bg: "rgba(239,68,68,0.1)", border: "rgba(248,113,113,0.4)", textColor: "text-red-300" }
            : livePetState.hunger < 30
            ? { icon: <AlertTriangle className="w-4 h-4 text-orange-400" />, text: "Your pet is getting hungry! Feed them today.", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.4)", textColor: "text-orange-300" }
            : livePetState.happiness < 30
            ? { icon: <Frown className="w-4 h-4 text-blue-400" />, text: "Your pet seems sad. Play with them!", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.4)", textColor: "text-blue-300" }
            : null;
          if (!warn) return null;
          return (
            <div className="max-w-md mx-auto px-4 pt-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl" style={{ background: warn.bg, border: `1px solid ${warn.border}` }}>
                <Link href="/avatar" className="flex items-center gap-2.5 flex-1 min-w-0">
                  <PetCompanion type={livePetState.type} size={28} />
                  {warn.icon}
                  <span className={`${warn.textColor} text-xs font-medium flex-1`}>{warn.text}</span>
                </Link>
                <Link href="/settings" className="text-[10px] opacity-40 underline whitespace-nowrap ml-1">Silence</Link>
              </div>
            </div>
          );
        })()}
        {/* Pet companion banner */}
        {livePetState && (
          <div className="max-w-md mx-auto px-4 pt-3">
            <Link href="/avatar" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
              <PetCompanion type={livePetState.type} size={36} />
              <div className="flex-1 min-w-0">
                <span className="text-violet-300 text-xs font-semibold">{livePetState.name || "Your Pet"}</span>
                <span className="text-violet-400/50 text-[10px] ml-2">
                  {livePetState.isAlive
                    ? livePetState.health > 80 ? "Thriving!" : livePetState.hunger < 30 ? "Hungry..." : "Happy"
                    : "Needs revival!"}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-violet-400/40" />
            </Link>
          </div>
        )}
        {/* ─── Curriculum Path ─────────────────────────────────────────── */}
        <div className="max-w-md mx-auto pt-4 pb-8">
          {unitsWithStatus.map((unit, i) => (
            <UnitSection
              key={unit.id}
              unit={unit}
              index={i}
              enneagramType={enneagramTypeForPet}
              instinct={profile.instinctualStacking ?? "sp"}
              onNodeTap={(lesson) => handleLessonNodeTap(lesson, unit)}
            />
          ))}
        </div>

        {/* ─── Lesson node bottom sheet ────────────────────────────────── */}
        <NodeSheet
          lesson={selectedLesson}
          unit={selectedLessonUnit}
          onClose={() => { setSelectedLesson(null); setSelectedLessonUnit(null); }}
        />
      </div>
    );
  }

  // ── Lesson view (shown before quiz begins) ──
  if (view === "lesson" && pendingQuizNode) {
    return (
      <LessonBriefOverlay
        moduleId={pendingQuizNode.moduleId ?? "warmup"}
        moduleName={pendingQuizNode.label}
        enneagramType={enneagramType}
        onBeginQuiz={() => {
          setView("quiz");
          beginQuizForNode(pendingQuizNode);
        }}
        onSkip={() => {
          setView("quiz");
          beginQuizForNode(pendingQuizNode);
        }}
      />
    );
  }

  // ── Quiz view (fullscreen overlay + fallback content) ──
  // Keep overlay visible after completion so the results screen shows
  const quizIsActive =
    (activeTab === "today" && warmupStarted) ||
    (activeTab === "deep" && !!activeModule);

  const quizCompleted =
    (activeTab === "today" && warmupDone) ||
    (activeTab === "deep" && moduleDone);

  const activeQuestions = activeTab === "today" ? warmupQuestions : moduleQuestions;
  const activeIdx = activeTab === "today" ? warmupQ : moduleQ;
  const activeSelected = activeTab === "today" ? warmupSelected : moduleSelected;
  const activeShowExp = activeTab === "today" ? warmupShowExp : moduleShowExp;
  const activeAnswers = activeTab === "today" ? warmupAnswers : moduleAnswers;
  const activeOnAnswer = activeTab === "today" ? handleWarmupAnswer : handleModuleAnswer;
  const activeOnNext = activeTab === "today" ? nextWarmupQuestion : nextModuleQuestion;
  const activeModuleName = activeTab === "today"
    ? "Quick Warm-Up"
    : MODULE_CONFIG.find(m => m.id === activeModule)?.title ?? "Deep Learning";

  return (
    <div className="min-h-screen pb-20">
      {/* Daily Goal Completion Celebration */}
      <AnimatePresence>
        {showDailyGoalCelebration && (
          <motion.div
            key="daily-goal-celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed inset-x-0 top-16 z-[60] flex justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-r from-amber-500/90 via-yellow-400/90 to-amber-500/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-amber-300/30 max-w-sm mx-4 text-center">
              <div className="text-2xl mb-1">{"\uD83C\uDF89"}</div>
              <div className="font-bold text-lg">Daily Goal Complete!</div>
              <div className="text-amber-100 text-sm mt-1">+15 tokens earned!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weekly Challenge Celebration */}
      <AnimatePresence>
        {showWeeklyCelebration && (
          <motion.div
            key="weekly-celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center px-6"
            style={{ background: "rgba(10,5,25,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setShowWeeklyCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col items-center text-center max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -5, 5, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {weeklyChallenge?.emoji ?? "🏆"}
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Challenge Complete!</h2>
              <p className="font-semibold mb-1" style={{ color: "#a78bfa" }}>
                {weeklyChallenge?.name}
              </p>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                You crushed this week&apos;s challenge.
              </p>
              <div className="flex gap-4 mb-8">
                <div className="px-5 py-3 rounded-2xl text-center" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}>
                  <p className="text-xl font-bold text-white">+{weeklyChallenge?.xpReward ?? 0}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>XP</p>
                </div>
                <div className="px-5 py-3 rounded-2xl text-center" style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.25)" }}>
                  <p className="text-xl font-bold" style={{ color: "#fbbf24" }}>+{weeklyChallenge?.tokenReward ?? 0}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Tokens</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowWeeklyCelebration(false)}
                className="w-full py-3.5 rounded-2xl text-white font-semibold text-base"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
              >
                Keep Going 🔥
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Daily Unit Limit Gate Modal ─────────────────────────────── */}
      <AnimatePresence>
        {unitLimitGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-8"
            style={{ background: "rgba(10,5,25,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setUnitLimitGate(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-sm rounded-3xl p-6 text-center"
              style={{ background: "rgba(22,12,48,0.98)", border: "1px solid rgba(139,92,246,0.25)" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-4xl mb-3">🔒</div>
              <h2 className="text-xl font-black text-white mb-1">Daily Limit Reached</h2>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                You&apos;ve started {DAILY_UNIT_LIMIT} units today. Come back tomorrow, or spend tokens to keep going.
              </p>
              <button
                onClick={() => {
                  if ((gameStateRaw.tokens ?? 0) < 1) return;
                  const { pendingLesson, pendingUnit } = unitLimitGate;
                  import("@/hooks/useGameState").then(() => {});
                  // spend 1 token
                  try {
                    const raw = localStorage.getItem("psyche-game-state");
                    if (raw) {
                      const gs = JSON.parse(raw);
                      if ((gs.tokens ?? 0) >= 1) {
                        gs.tokens -= 1;
                        localStorage.setItem("psyche-game-state", JSON.stringify(gs));
                      }
                    }
                  } catch {}
                  recordUnitStarted(pendingUnit.id);
                  setUnitLimitGate(null);
                  setSelectedLesson(pendingLesson);
                  setSelectedLessonUnit(pendingUnit);
                }}
                className="w-full py-3.5 rounded-2xl font-black text-white text-base mb-3 transition-all active:scale-95"
                style={{
                  background: (gameStateRaw.tokens ?? 0) >= 1
                    ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: (gameStateRaw.tokens ?? 0) >= 1 ? "0 4px 20px rgba(124,58,237,0.4)" : "none",
                  color: (gameStateRaw.tokens ?? 0) >= 1 ? "#fff" : "rgba(255,255,255,0.3)",
                }}
              >
                {(gameStateRaw.tokens ?? 0) >= 1
                  ? `⚡ Unlock with 1 Token (${gameStateRaw.tokens ?? 0} left)`
                  : "Not enough tokens"}
              </button>
              <button
                onClick={() => setUnitLimitGate(null)}
                className="w-full py-2.5 rounded-2xl text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Come back tomorrow
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Streak Repair Prompt ─────────────────────────────────────── */}
      <AnimatePresence>
        {streakRepairPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-8"
            style={{ background: "rgba(10,5,25,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setStreakRepairPrompt(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-sm rounded-3xl p-6 text-center"
              style={{ background: "rgba(22,12,48,0.98)", border: "1px solid rgba(239,68,68,0.3)" }}
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [-5, 5, -5, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl mb-3"
              >
                🔥
              </motion.div>
              <h2 className="text-xl font-black text-white mb-1">Your Streak Ended</h2>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                You missed yesterday. Spend 3 tokens to restore your streak — this offer expires at midnight.
              </p>
              <button
                onClick={() => {
                  if ((gameStateRaw.tokens ?? 0) < 3) return;
                  try {
                    const raw = localStorage.getItem("psyche-game-state");
                    if (raw) {
                      const gs = JSON.parse(raw);
                      if ((gs.tokens ?? 0) >= 3) {
                        gs.tokens -= 3;
                        gs.streakCount = parseInt(localStorage.getItem("psyche-prev-streak") ?? "1", 10);
                        gs.lastActivityDate = getDateKey();
                        localStorage.setItem("psyche-game-state", JSON.stringify(gs));
                        localStorage.removeItem("psyche-prev-streak");
                      }
                    }
                  } catch {}
                  setStreakRepairPrompt(false);
                  window.location.reload();
                }}
                className="w-full py-3.5 rounded-2xl font-black text-white text-base mb-3 transition-all active:scale-95"
                style={{
                  background: (gameStateRaw.tokens ?? 0) >= 3
                    ? "linear-gradient(135deg, #ef4444, #dc2626)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: (gameStateRaw.tokens ?? 0) >= 3 ? "0 4px 20px rgba(239,68,68,0.4)" : "none",
                  color: (gameStateRaw.tokens ?? 0) >= 3 ? "#fff" : "rgba(255,255,255,0.3)",
                }}
              >
                {(gameStateRaw.tokens ?? 0) >= 3
                  ? `🔥 Repair Streak — 3 Tokens (${gameStateRaw.tokens ?? 0} left)`
                  : `Not enough tokens (need 3, have ${gameStateRaw.tokens ?? 0})`}
              </button>
              <button
                onClick={() => setStreakRepairPrompt(false)}
                className="w-full py-2.5 rounded-2xl text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Start fresh
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet Level-Up Celebration */}
      <AnimatePresence>
        {petLevelUpCelebration && (
          <motion.div
            key="pet-levelup-celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed inset-x-0 top-16 z-[60] flex justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-r from-violet-600/90 via-purple-500/90 to-violet-600/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-violet-300/30 max-w-sm mx-4 text-center">
              <div className="flex justify-center mb-2">
                <PetCompanion type={petLevelUpCelebration.petType} size={80} state="happy" />
              </div>
              <div className="font-bold text-lg">{petLevelUpCelebration.name} reached Level {petLevelUpCelebration.level}! {"\uD83C\uDF89"}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen quiz overlay */}
      <AnimatePresence>
        {quizIsActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
          >
            <QuizFullscreen
              questions={activeQuestions}
              currentIdx={activeIdx}
              selected={activeSelected}
              showExp={activeShowExp}
              answers={activeAnswers}
              onAnswer={activeOnAnswer}
              onNext={activeOnNext}
              onQuit={() => {
                const dest = quizSourceNode ? "path" : "hub";
                setView(dest);
                setQuizSourceNode(null);
                setActiveModule(null);
                setModuleDone(false);
                setModuleAnswers([]);
                setModuleQ(0);
                setModuleSelected(null);
                setModuleShowExp(false);
                setWarmupStarted(false);
                setWarmupDone(false);
                setWarmupQ(0);
                setWarmupSelected(null);
                setWarmupShowExp(false);
                setWarmupAnswers([]);
                setSessionXP(0);
              }}
              moduleName={activeModuleName}
              sessionXP={sessionXP}
              completed={quizCompleted}
              hearts={gameStateRaw.hearts}
              maxHearts={gameStateRaw.maxHearts ?? 5}
              heartsRefillTime={gameStateRaw.heartsRefillTime}
              xpBonusLabel={xpGainAnimation?.source?.includes("BONUS") ? xpGainAnimation.source : null}
              longestStreak={gameStateRaw.longestStreak}
              currentStreak={streak}
              enneagramType={profile.enneagramType ?? 5}
              instinct={profile.instinctualStacking ?? "sp"}
              onBuyHearts={buyHearts}
              gameState={gameStateRaw}
              sessionsSinceTokenDrop={gameStateRaw.sessionsSinceTokenDrop ?? 0}
              onTokenDropClaimed={(amount) => recordTokenDrop(amount)}
              nextNode={postWarmupNode}
              onKeepGoing={() => {
                if (!postWarmupNode) return;
                // Reset quiz state then start the next node directly
                setWarmupStarted(false);
                setWarmupDone(false);
                setWarmupQ(0);
                setWarmupSelected(null);
                setWarmupShowExp(false);
                setWarmupAnswers([]);
                setSessionXP(0);
                startNode(postWarmupNode);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button
          onClick={() => {
            setView(quizSourceNode ? "path" : "hub");
            setActiveModule(null);
            setModuleDone(false);
            setModuleAnswers([]);
            setWarmupStarted(false);
          }}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition mb-6"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to path
        </button>

        {/* ═══════════════════════════════════════════════════════════════
           TAB 1: TODAY'S PRACTICE
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "today" && (
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="space-y-6">

            {/* Pet Health Widget */}
            {petWidget && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 shrink-0">
                    <PetCompanion type={petWidget.petType} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-800">
                        {petWidget.name}
                      </span>
                      {!petWidget.isAlive && (
                        <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                          Needs revival
                        </span>
                      )}
                    </div>
                    {petWidget.isAlive && (
                      <div className="space-y-1.5">
                        <div>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                            <span className="flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5" />
                              Health
                            </span>
                            <span>{petWidget.health}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                petWidget.health < 20
                                  ? "bg-red-400"
                                  : petWidget.health < 50
                                    ? "bg-orange-400"
                                    : "bg-emerald-400"
                              }`}
                              style={{ width: `${petWidget.health}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                            <span>Hunger</span>
                            <span>{petWidget.hunger}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                petWidget.hunger < 30 ? "bg-orange-400" : "bg-sky-400"
                              }`}
                              style={{ width: `${petWidget.hunger}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {(petWidget.hunger < 50 || !petWidget.isAlive) && (
                    <Link
                      href="/avatar"
                      className="shrink-0 px-3 py-1.5 rounded-xl bg-orange-100 text-orange-700 text-xs font-semibold hover:bg-orange-200 transition"
                    >
                      {petWidget.isAlive ? `Feed ${petWidget.name}` : "Help"}
                    </Link>
                  )}
                </div>
              </motion.div>
            )}

            {/* Daily Insight */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-sky-50 to-violet-50 border border-indigo-100/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-sm">
                      <Wand2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-indigo-600 tracking-wide">Today&apos;s Insight</div>
                      {dailyInsightData && (
                        <div className="text-[10px] text-slate-400 capitalize">
                          {dailyInsightData.category}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Daily insight content */}
                  {dailyInsightData ? (
                    <div>
                      <p className="text-slate-700 leading-relaxed font-serif text-[15px] italic mb-2">
                        &ldquo;{dailyInsightData.quote}&rdquo;
                      </p>
                      <p className="text-xs text-slate-400 mb-3">{dailyInsightData.author}</p>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {dailyInsightData.reflection}
                      </p>
                      {/* Tritype + instinctual stacking enrichment */}
                      {(() => {
                        const tritype = profile.tritype || (profile.tritypeFirst && profile.tritypeSecond && profile.tritypeThird ? `${profile.tritypeFirst}${profile.tritypeSecond}${profile.tritypeThird}` : null);
                        const stacking = profile.instinctualStacking;
                        const tritypeArchetype = tritype ? orderedTritypeThyselfs[tritype] : null;
                        const stackingData = stacking ? instinctualStackings.find(s => s.code === stacking.toLowerCase()) : null;
                        if (!tritype && !stacking) return null;
                        return (
                          <div className="mt-4 pt-4 border-t border-indigo-100/60 space-y-2">
                            {tritype && (
                              <div className="flex items-start gap-2">
                                <span className="mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-600 shrink-0 tracking-wide">
                                  {tritype}{tritypeArchetype ? ` · ${tritypeArchetype}` : ""}
                                </span>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  Today, notice how your {tritype[0]}-{tritype[1]}-{tritype[2]} combination shapes your response to this insight — which center pulls strongest right now?
                                </p>
                              </div>
                            )}
                            {stackingData && (
                              <div className="flex items-start gap-2">
                                <span className="mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-600 shrink-0 tracking-wide uppercase">
                                  {stacking}
                                </span>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  {stackingData.dominant} instinct growth edge: {stackingData.characteristics[stackingData.characteristics.length - 1].toLowerCase()}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  ) : todayInsight ? (
                    <p className="text-slate-700 leading-relaxed font-serif text-[15px]">{todayInsight}</p>
                  ) : (
                    <div className="space-y-2.5 animate-pulse">
                      <div className="h-4 bg-indigo-100 rounded-full w-full" />
                      <div className="h-4 bg-indigo-100 rounded-full w-5/6" />
                      <div className="h-4 bg-indigo-100 rounded-full w-4/6" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Cognitive Edge */}
            {profile.cognitiveType && cognitiveGrowthEdges[profile.cognitiveType] && (
              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-sky-600">Cognitive Edge</div>
                      <div className="text-[10px] text-slate-400">{cognitiveGrowthEdges[profile.cognitiveType].dominantFunction}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cognitiveGrowthEdges[profile.cognitiveType].dailyPractice}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Growth Challenge */}
            {todayChallenge && (
              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Target className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-600">Today&apos;s Challenge</div>
                      <div className="text-[10px] text-slate-400">A concrete growth edge for Type {profile.enneagramType}</div>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{todayChallenge}</p>
                </div>
              </motion.div>
            )}

            {/* Warmup Quiz */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Quick Warm-Up</div>
                    <div className="text-xs text-slate-400">5 questions to start your day {isFirstQuizToday && "-- 2x XP bonus!"}</div>
                  </div>
                  {isFirstQuizToday && (
                    <span className="ml-auto px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-100">
                      2X XP
                    </span>
                  )}
                </div>

                {!warmupStarted && !warmupDone && (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-500 mb-4">Test your knowledge across Enneagram, cognitive functions, and psychology.</p>
                    <button
                      onClick={() => setWarmupStarted(true)}
                      className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-indigo-200/50 transition-all"
                    >
                      Start Warm-Up
                    </button>
                  </div>
                )}

                {warmupStarted && !warmupDone && renderQuiz(
                  warmupQuestions, warmupQ, warmupSelected, warmupShowExp,
                  warmupAnswers, handleWarmupAnswer, nextWarmupQuestion, warmupDone
                )}

                {warmupDone && (
                  <motion.div initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                    <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                    <p className="font-semibold text-slate-800 text-lg mb-1">Warm-Up Complete!</p>
                    <p className="text-sm text-slate-500 mb-1">
                      {warmupAnswers.filter(Boolean).length} / {warmupAnswers.length} correct
                    </p>
                    <p className="text-xs text-slate-400">Ready for the deep learning modules?</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Continue to Deep Learning */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <button
                onClick={() => setActiveTab("deep")}
                className="w-full p-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-lg">Continue Learning</p>
                    <p className="text-indigo-100 text-sm mt-0.5">4 deep modules -- up to 1 hour of practice</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            {/* Quick nav */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Study Resources</p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/enneagram/learn" className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 transition group">
                  <Compass className="w-5 h-5 text-indigo-500 mb-2" />
                  <div className="text-sm font-medium text-slate-800">Enneagram</div>
                  <div className="text-xs text-slate-400 mt-0.5">Types, subtypes, tritypes</div>
                </Link>
                <Link href="/cognitive/learn" className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 transition group">
                  <Brain className="w-5 h-5 text-sky-500 mb-2" />
                  <div className="text-sm font-medium text-slate-800">Cognitive Functions</div>
                  <div className="text-xs text-slate-400 mt-0.5">Jung's 8-function model</div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
           TAB 2: DEEP LEARNING
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "deep" && (
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="space-y-6">

            {/* Difficulty indicator */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Difficulty Level {difficulty.level}/10</p>
                  <p className="text-xs text-slate-400">
                    {difficulty.level <= 5 ? "Recall" : difficulty.level <= 7 ? "Application" : "Analysis"} -- {difficulty.correctAtLevel}/{difficulty.totalAtLevel} at this level
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className={`w-2 h-6 rounded-full ${i < difficulty.level ? "bg-indigo-500" : "bg-slate-100"}`} />
                ))}
              </div>
            </div>

            {/* Module list or active module */}
            {!activeModule ? (
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Choose a Module</p>
                {MODULE_CONFIG.map((mod, idx) => {
                  const colors = colorMap[mod.color];
                  const completed = dailyProgress?.modulesCompleted?.includes(mod.id);
                  const score = dailyProgress?.moduleScores?.[mod.id];
                  const Icon = mod.icon;

                  return (
                    <motion.button
                      key={mod.id}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => startModule(mod.id)}
                      className="w-full p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-semibold text-slate-800">{mod.title}</p>
                            {completed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                          </div>
                          <p className="text-xs text-slate-400">{mod.description}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {mod.time}
                            </span>
                            <span className="text-[10px] text-slate-400">{mod.count} questions</span>
                            {mod.xpBonus > 0 && (
                              <span className="text-[10px] text-amber-500 font-medium">+{mod.xpBonus} bonus XP/question</span>
                            )}
                          </div>
                          {score && (
                            <div className="mt-1.5 text-xs text-emerald-600">
                              Last score: {score.correct}/{score.total} ({Math.round(score.correct / score.total * 100)}%)
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div>
                {/* Module header */}
                {!moduleDone && (
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => { setActiveModule(null); setModuleDone(false); setModuleAnswers([]); }}
                      className="text-sm text-slate-400 hover:text-slate-600 transition flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" /> Back to Modules
                    </button>
                    <span className="text-sm font-medium text-slate-600">
                      {MODULE_CONFIG.find(m => m.id === activeModule)?.title}
                    </span>
                  </div>
                )}

                {/* Quiz content */}
                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  {!moduleDone ? (
                    renderQuiz(
                      moduleQuestions, moduleQ, moduleSelected, moduleShowExp,
                      moduleAnswers, handleModuleAnswer, nextModuleQuestion, moduleDone
                    )
                  ) : (
                    <motion.div initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      >
                        <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-3" />
                      </motion.div>
                      <h3 className="text-xl font-serif font-bold text-slate-800 mb-1">Module Complete!</h3>
                      <p className="text-slate-500 text-sm mb-4">
                        {MODULE_CONFIG.find(m => m.id === activeModule)?.title}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-indigo-50">
                          <p className="text-2xl font-bold text-indigo-600">
                            {moduleAnswers.filter(Boolean).length}/{moduleAnswers.length}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">Correct</p>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50">
                          <p className="text-2xl font-bold text-amber-600">
                            {Math.round((Date.now() - moduleStartTime) / 60000)}m
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">Time</p>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50">
                          <p className="text-2xl font-bold text-emerald-600">Lv.{difficulty.level}</p>
                          <p className="text-[10px] text-slate-400 mt-1">Difficulty</p>
                        </div>
                      </div>

                      {moduleAnswers.filter(Boolean).length === moduleAnswers.length && (
                        <motion.div
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
                        >
                          <p className="text-amber-700 font-medium text-sm flex items-center justify-center gap-2">
                            <Crown className="w-4 h-4" /> Perfect Score! +25 bonus XP
                          </p>
                        </motion.div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={shareScore}
                          className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition flex items-center justify-center gap-2"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied ? "Copied!" : "Share Score"}
                        </button>
                        <button
                          onClick={() => { setActiveModule(null); setModuleDone(false); setModuleAnswers([]); }}
                          className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition"
                        >
                          Next Module
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
           TAB 3: MY STATS
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === "stats" && (
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="space-y-6">

            {/* Top stats row */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
                className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <p className="text-2xl font-bold text-indigo-600">{totalAnsweredToday}</p>
                <p className="text-[10px] text-slate-400 mt-1">Today</p>
              </motion.div>
              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <p className="text-2xl font-bold text-sky-600">{weeklyData.reduce((a, b) => a + b.value, 0)}</p>
                <p className="text-[10px] text-slate-400 mt-1">This Week</p>
              </motion.div>
              <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <p className="text-2xl font-bold text-violet-600">{totalAnsweredAllTime}</p>
                <p className="text-[10px] text-slate-400 mt-1">All Time</p>
              </motion.div>
            </div>

            {/* Accuracy ring */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Accuracy Rate</h3>
              <div className="flex items-center justify-center relative">
                <PercentageRing percent={accuracyToday} size={120} label="Today's Accuracy" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-emerald-600">{totalCorrectToday}</p>
                  <p className="text-[10px] text-slate-400">Correct</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-400">{totalAnsweredToday - totalCorrectToday}</p>
                  <p className="text-[10px] text-slate-400">Incorrect</p>
                </div>
              </div>
            </motion.div>

            {/* Current status */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Current Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm text-slate-600">Difficulty Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className={`w-1.5 h-4 rounded-full ${i < difficulty.level ? "bg-indigo-500" : "bg-slate-100"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{difficulty.level}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-slate-600">Day Streak</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-600">XP Earned Today</span>
                  </div>
                  <span className="text-sm font-bold text-amber-600">+{dailyProgress?.xpEarned ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-violet-500" />
                    <span className="text-sm text-slate-600">Best Streak Today</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{dailyProgress?.bestStreak ?? 0} in a row</span>
                </div>
              </div>
            </motion.div>

            {/* Streak Protections */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.175 }}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Streak Protections</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center">
                    <Snowflake className="w-4.5 h-4.5 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      You have {streakFreezes} streak freeze{streakFreezes !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-slate-400">Earn more by completing weekly goals</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: Math.max(3, streakFreezes) }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-5 rounded-sm ${i < streakFreezes ? "bg-sky-400" : "bg-slate-100"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Modules progress */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Module Progress</h3>
              <div className="space-y-3">
                {MODULE_CONFIG.map(mod => {
                  const completed = dailyProgress?.modulesCompleted?.includes(mod.id);
                  const score = dailyProgress?.moduleScores?.[mod.id];
                  const colors = colorMap[mod.color];
                  const Icon = mod.icon;
                  return (
                    <div key={mod.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 font-medium truncate">{mod.title}</p>
                        {score ? (
                          <p className="text-xs text-slate-400">{score.correct}/{score.total} correct</p>
                        ) : (
                          <p className="text-xs text-slate-400">Not attempted today</p>
                        )}
                      </div>
                      {completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Weekly activity chart */}
            <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">7-Day Activity</h3>
              {weeklyData.length > 0 ? (
                <WeeklyBarChart data={weeklyData} />
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">No data yet. Start answering questions!</p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Next Step Banner */}
        <NextStepBanner
          href="/game"
          label="Check your progress"
          sublabel="See your XP, streaks, badges, and how you rank"
          icon={<BarChart3 className="w-5 h-5" />}
          color="#10b981"
          dismissKey="daily-progress"
        />
      </div>
    </div>
  );
}
