"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Flame, Zap, Star, CheckCircle, XCircle, Trophy, Lightbulb,
  Target, ChevronRight, Brain, Compass, Clock,
  BarChart3, Sparkles, ArrowRight, Copy, Check,
  Layers, History,
  GraduationCap, Dumbbell, Crown, Snowflake, Heart, Wand2
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useGameState } from "@/hooks/useGameState";
import PetSprite from "@/components/PetSprite";
import NextStepBanner from "@/components/NextStepBanner";
import HubView from "@/components/daily/HubView";
import PathView, { type PathUnit } from "@/components/daily/PathView";
import NodeBottomSheet, { type PathNodeConfig } from "@/components/daily/NodeBottomSheet";
import QuizFullscreen from "@/components/daily/QuizFullscreen";

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
  return new Date().toISOString().split("T")[0];
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
  difficulty: 1 | 2 | 3;
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
   DAILY INSIGHTS (per type, 7 each — rotated by day)
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
   MASSIVE QUESTION BANK (~200+ questions)
   Each tagged with module, difficulty, type/cognitive specificity
   ═══════════════════════════════════════════════════════════════════════════ */

// Helper to build question IDs
let _qid = 0;
const qid = () => `qb_${++_qid}`;

const QUESTION_BANK: Question[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 1: TYPE-SPECIFIC QUIZ (per enneagram type)
  // ═══════════════════════════════════════════════════════════════════════

  // --- Type 1 ---
  { id: qid(), q: "What is the core fear of Type 1?", opts: ["Being unloved", "Being corrupt or defective", "Being worthless", "Being abandoned"], ans: 1, exp: "Type 1's core fear is being corrupt, evil, or defective. This drives their compulsive need for integrity and correctness.", difficulty: 1, module: "type", typeSpecific: 1, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 1?", opts: ["Pride", "Anger", "Envy", "Sloth"], ans: 1, exp: "Type 1's passion is Anger -- specifically, a chronic resentment that arises from comparing reality to an ideal standard.", difficulty: 1, module: "type", typeSpecific: 1, tags: ["passion"] },
  { id: qid(), q: "Type 1 integrates (grows) toward which type?", opts: ["Type 4", "Type 7", "Type 2", "Type 9"], ans: 1, exp: "Type 1 integrates to Type 7, becoming more spontaneous, joyful, and accepting of imperfection.", difficulty: 1, module: "type", typeSpecific: 1, tags: ["integration"] },
  { id: qid(), q: "Type 1 disintegrates (under stress) toward which type?", opts: ["Type 4", "Type 7", "Type 2", "Type 8"], ans: 0, exp: "Under stress, Type 1 moves to Type 4, becoming moody, irrational, and feeling misunderstood.", difficulty: 1, module: "type", typeSpecific: 1, tags: ["disintegration"] },
  { id: qid(), q: "What is the Holy Idea of Type 1 according to Ichazo?", opts: ["Holy Perfection", "Holy Will", "Holy Love", "Holy Origin"], ans: 0, exp: "Type 1's Holy Idea is Holy Perfection -- the realization that reality IS already perfect as it is, without needing correction.", difficulty: 2, module: "type", typeSpecific: 1, tags: ["holy-idea"] },
  { id: qid(), q: "How does the Sexual (sx) Type 1 differ from the Self-Preservation (sp) Type 1?", opts: ["Sx 1 is more perfectionistic about systems; sp 1 focuses on relationships", "Sx 1 focuses on reforming their partner and close relationships; sp 1 focuses on worry and personal correctness", "Sx 1 is more withdrawn; sp 1 is more assertive", "There is no meaningful difference between subtypes"], ans: 1, exp: "Sexual 1s channel their reforming energy into close relationships (wanting to perfect the partner), while Self-Preservation 1s focus on personal anxiety and maintaining their own correctness.", difficulty: 2, module: "type", typeSpecific: 1, tags: ["subtypes"] },
  { id: qid(), q: "In the Hornevian groups, Type 1 belongs to which group?", opts: ["Assertive", "Compliant", "Withdrawn", "Reactive"], ans: 1, exp: "Type 1 is in the Compliant group (1, 2, 6) -- they move toward people and try to earn belonging by meeting perceived standards.", difficulty: 2, module: "type", typeSpecific: 1, tags: ["hornevian"] },
  { id: qid(), q: "What is Naranjo's character description for the Social Type 1?", opts: ["Non-Adaptability", "Inadaptability (Rigidity)", "Jealousy", "Zeal"], ans: 1, exp: "Naranjo describes the Social 1 as characterized by 'Inadaptability' or rigidity -- they become the teacher/reformer of society, holding firm to their ideals.", difficulty: 3, module: "type", typeSpecific: 1, tags: ["naranjo", "subtypes"] },
  { id: qid(), q: "According to Riso-Hudson, what are the Levels of Development for Type 1 at their healthiest (Level 1)?", opts: ["The Wise Realist who accepts imperfection", "The Principled Teacher who corrects others gently", "The Rational Idealist who channels anger productively", "The Wise Realist -- accepting, hopeful, and discovering objective rightness beyond personal judgment"], ans: 3, exp: "At Level 1, Riso-Hudson describe the Type 1 as a Wise Realist who transcends personal judgment to discover genuinely objective moral truths, becoming accepting and hopeful.", difficulty: 3, module: "type", typeSpecific: 1, tags: ["riso-hudson", "levels"] },
  { id: qid(), q: "What is the specific fixation of Type 1 according to Naranjo?", opts: ["Perfectionism", "Resentment", "Judging/Comparing", "Over-control"], ans: 2, exp: "Naranjo identifies the fixation of Type 1 as continuous judging and comparing -- a mental habit of measuring everything against an internal ideal standard.", difficulty: 3, module: "type", typeSpecific: 1, tags: ["naranjo", "fixation"] },
  { id: qid(), q: "Which Enneagram type is the countertype of the Social 1?", opts: ["The Social 1 IS the countertype", "The Sexual 1 is the countertype", "The Self-Preservation 1 is the countertype", "None -- Type 1 has no countertype"], ans: 0, exp: "According to Chestnut (following Naranjo), the Social 1 is the countertype -- they look least like a typical 1 because their anger is channeled into social reform rather than personal rigidity.", difficulty: 3, module: "type", typeSpecific: 1, tags: ["countertype", "chestnut"] },

  // --- Type 2 ---
  { id: qid(), q: "What is the core fear of Type 2?", opts: ["Being incompetent", "Being unwanted or unworthy of love", "Being without support", "Being controlled"], ans: 1, exp: "Type 2's core fear is being unwanted, unworthy of being loved -- driving their compulsive giving to earn love.", difficulty: 1, module: "type", typeSpecific: 2, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 2?", opts: ["Vanity", "Pride", "Envy", "Gluttony"], ans: 1, exp: "Type 2's passion is Pride -- the inflated self-image of being the one who gives, coupled with denial of their own needs.", difficulty: 1, module: "type", typeSpecific: 2, tags: ["passion"] },
  { id: qid(), q: "Type 2 integrates toward which type?", opts: ["Type 4", "Type 8", "Type 1", "Type 6"], ans: 0, exp: "Type 2 integrates to Type 4, developing self-awareness, emotional honesty, and the ability to identify their own needs and feelings.", difficulty: 1, module: "type", typeSpecific: 2, tags: ["integration"] },
  { id: qid(), q: "Type 2 disintegrates toward which type?", opts: ["Type 4", "Type 8", "Type 1", "Type 6"], ans: 1, exp: "Under stress, Type 2 moves to Type 8, becoming aggressive, domineering, and openly demanding recognition for their sacrifices.", difficulty: 1, module: "type", typeSpecific: 2, tags: ["disintegration"] },
  { id: qid(), q: "How does the Sexual (sx) Type 2 differ from the Social (so) Type 2?", opts: ["Sx 2 is more withdrawn; So 2 is more aggressive", "Sx 2 focuses on seducing specific individuals; So 2 seeks influence in groups", "Sx 2 is more generous; So 2 is more selfish", "They are functionally identical"], ans: 1, exp: "Sexual 2 (Seduction/Aggression) focuses on winning over specific individuals through charm, while Social 2 (Ambition) seeks power and influence through serving the group or powerful people.", difficulty: 2, module: "type", typeSpecific: 2, tags: ["subtypes"] },
  { id: qid(), q: "According to Naranjo, what is the fixation of Type 2?", opts: ["Flattery", "Ingratiation", "Martyrdom", "Both flattery and ingratiation"], ans: 0, exp: "Naranjo identifies Type 2's fixation as Flattery -- the cognitive habit of making themselves appealing and focusing on others' positive qualities to build connection.", difficulty: 2, module: "type", typeSpecific: 2, tags: ["naranjo", "fixation"] },
  { id: qid(), q: "What is the virtue that counterbalances Type 2's passion of Pride?", opts: ["Humility", "Innocence", "Courage", "Sobriety"], ans: 0, exp: "The virtue of Type 2 is Humility -- a genuine recognition of their own needs, limitations, and equal humanity rather than the inflated helper identity.", difficulty: 2, module: "type", typeSpecific: 2, tags: ["virtue"] },
  { id: qid(), q: "Which Type 2 subtype is considered the countertype?", opts: ["Self-Preservation 2", "Social 2", "Sexual 2", "None of them"], ans: 0, exp: "The Self-Preservation 2 is the countertype -- they look least like a typical 2 because they express love through being childlike and cute rather than overtly giving.", difficulty: 3, module: "type", typeSpecific: 2, tags: ["countertype", "chestnut"] },
  { id: qid(), q: "In Riso-Hudson's system, what is the key difference between a healthy Type 2 and an average Type 2?", opts: ["Healthy 2s give without strings; average 2s give with hidden expectations", "Healthy 2s give more; average 2s give less", "There is no meaningful difference", "Healthy 2s focus on self; average 2s focus on others"], ans: 0, exp: "Healthy 2s give from genuine love without expectations, while average 2s give with invisible strings attached, unconsciously expecting reciprocation and recognition.", difficulty: 3, module: "type", typeSpecific: 2, tags: ["riso-hudson", "levels"] },

  // --- Type 3 ---
  { id: qid(), q: "What is the core desire of Type 3?", opts: ["To be admired", "To feel valuable and worthwhile", "To be the best", "To be loved unconditionally"], ans: 1, exp: "Type 3's core desire is to feel valuable and worthwhile. They pursue achievement because they believe their worth comes from what they accomplish.", difficulty: 1, module: "type", typeSpecific: 3, tags: ["core-desire"] },
  { id: qid(), q: "What is the passion (vice) of Type 3?", opts: ["Vanity (Deceit)", "Pride", "Envy", "Avarice"], ans: 0, exp: "Type 3's passion is Vanity or Deceit -- not lying to others, but self-deception: losing contact with authentic feelings in constant adaptation to what succeeds.", difficulty: 1, module: "type", typeSpecific: 3, tags: ["passion"] },
  { id: qid(), q: "Type 3 integrates toward which type?", opts: ["Type 9", "Type 6", "Type 1", "Type 7"], ans: 1, exp: "Type 3 integrates to Type 6 -- in growth, developing genuine loyalty, cooperation, and commitment beyond self-promotion.", difficulty: 1, module: "type", typeSpecific: 3, tags: ["integration"] },
  { id: qid(), q: "What Harmonic group does Type 3 belong to?", opts: ["Positive Outlook", "Competency", "Reactive", "Assertive"], ans: 1, exp: "Type 3 is in the Competency group (1, 3, 5) -- they manage feelings by focusing on tasks, logic, and effective problem-solving.", difficulty: 2, module: "type", typeSpecific: 3, tags: ["harmonic"] },
  { id: qid(), q: "How does Social Type 3 differ from Sexual Type 3?", opts: ["So 3 seeks fame; sx 3 seeks intimate approval", "So 3 adapts image for social success and status; sx 3 focuses on being attractive to a specific person", "They are the same", "So 3 is more competitive; sx 3 is more cooperative"], ans: 1, exp: "Social 3 ('Prestige') adapts their image for professional/social status, while Sexual 3 promotes themselves through attractiveness and supporting a partner's success.", difficulty: 2, module: "type", typeSpecific: 3, tags: ["subtypes"] },
  { id: qid(), q: "According to Chestnut, which Type 3 subtype is the countertype?", opts: ["Self-Preservation 3", "Social 3", "Sexual 3", "All equally represent 3"], ans: 0, exp: "Self-Preservation 3 is the countertype -- they try to be good and efficient rather than flashy, often looking like a Type 1 or 6, working hard without seeking the spotlight.", difficulty: 3, module: "type", typeSpecific: 3, tags: ["countertype", "chestnut"] },

  // --- Type 4 ---
  { id: qid(), q: "What is the core fear of Type 4?", opts: ["Being abandoned", "Having no identity or personal significance", "Being ordinary", "Being unloved"], ans: 1, exp: "Type 4's core fear is having no identity or personal significance -- being without a distinct, authentic self.", difficulty: 1, module: "type", typeSpecific: 4, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 4?", opts: ["Melancholy", "Envy", "Avarice", "Pride"], ans: 1, exp: "Type 4's passion is Envy -- the chronic sense that others have something essential that the 4 lacks, creating a feeling of deficiency.", difficulty: 1, module: "type", typeSpecific: 4, tags: ["passion"] },
  { id: qid(), q: "Type 4 integrates toward which type?", opts: ["Type 1", "Type 2", "Type 7", "Type 5"], ans: 0, exp: "Type 4 integrates to Type 1 -- in growth, developing principled discipline, objectivity, and the ability to act on values rather than moods.", difficulty: 1, module: "type", typeSpecific: 4, tags: ["integration"] },
  { id: qid(), q: "Which Enneagram center does Type 4 belong to?", opts: ["Head Center", "Heart Center", "Gut Center", "Instinctual Center"], ans: 1, exp: "Type 4 is in the Heart Center (2, 3, 4), which processes experience through feelings and identity. 4s have issues around identity and shame.", difficulty: 1, module: "type", typeSpecific: 4, tags: ["centers"] },
  { id: qid(), q: "How does Self-Preservation Type 4 differ from Social Type 4?", opts: ["Sp 4 is more dramatic; So 4 is more internal", "Sp 4 internalizes suffering (tenacity/endurance); So 4 compares themselves to others and feels shame", "Sp 4 is extraverted; So 4 is introverted", "They are functionally identical"], ans: 1, exp: "Self-Preservation 4 (Tenacity) internalizes pain and endures without complaining, while Social 4 (Shame) compares themselves to others and feels they fall short.", difficulty: 2, module: "type", typeSpecific: 4, tags: ["subtypes"] },
  { id: qid(), q: "According to Naranjo, what is the fixation of Type 4?", opts: ["Melancholy", "Fantasizing", "Self-absorption", "Comparison"], ans: 0, exp: "Naranjo identifies Melancholy as the fixation -- a cognitive habit of dwelling on loss, longing, and what's missing or unavailable.", difficulty: 2, module: "type", typeSpecific: 4, tags: ["naranjo", "fixation"] },
  { id: qid(), q: "Which Type 4 subtype is considered the countertype and often mistyped?", opts: ["Self-Preservation 4", "Social 4", "Sexual 4", "None"], ans: 2, exp: "Sexual 4 (Competition) is the countertype -- they externalize their envy as competition and demands rather than withdrawing, and can look like Type 3 or 8.", difficulty: 3, module: "type", typeSpecific: 4, tags: ["countertype", "chestnut"] },

  // --- Type 5 ---
  { id: qid(), q: "What is the core fear of Type 5?", opts: ["Being helpless, useless, or overwhelmed", "Being without support", "Being controlled", "Being abandoned"], ans: 0, exp: "Type 5's core fear is being helpless, useless, incapable, or overwhelmed by the demands of the world.", difficulty: 1, module: "type", typeSpecific: 5, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 5?", opts: ["Envy", "Fear", "Avarice", "Sloth"], ans: 2, exp: "Type 5's passion is Avarice -- hoarding of inner resources, energy, time, and knowledge as a way to feel safe in a demanding world.", difficulty: 1, module: "type", typeSpecific: 5, tags: ["passion"] },
  { id: qid(), q: "Type 5 integrates toward which type?", opts: ["Type 7", "Type 8", "Type 4", "Type 1"], ans: 1, exp: "Type 5 integrates to Type 8 -- in growth, becoming more decisive, action-oriented, confident, and willing to engage physically with the world.", difficulty: 1, module: "type", typeSpecific: 5, tags: ["integration"] },
  { id: qid(), q: "Type 5 disintegrates toward which type?", opts: ["Type 8", "Type 4", "Type 7", "Type 6"], ans: 2, exp: "Under stress, Type 5 moves to Type 7, becoming scattered, hyperactive, impulsive, and seeking stimulation to avoid inner emptiness.", difficulty: 1, module: "type", typeSpecific: 5, tags: ["disintegration"] },
  { id: qid(), q: "How does a Sexual (sx) Type 5 differ from a Self-Preservation (sp) Type 5 in relationships?", opts: ["Sx 5 avoids all relationships; sp 5 seeks them", "Sx 5 seeks intense one-on-one connection with an idealized person; sp 5 withdraws into physical boundaries and minimal needs", "They are functionally identical in relationships", "Sx 5 is more social; sp 5 is more sexual"], ans: 1, exp: "Sexual 5 (Confidence/Totem) seeks deep, intense connection with one idealized person as their bridge to the world, while Self-Preservation 5 (Castle) builds physical walls and minimizes needs.", difficulty: 2, module: "type", typeSpecific: 5, tags: ["subtypes"] },
  { id: qid(), q: "What is the Holy Idea of Type 5?", opts: ["Holy Omniscience", "Holy Transparency", "Holy Will", "Holy Perfection"], ans: 0, exp: "The Holy Idea of Type 5 is Holy Omniscience -- the recognition that true knowing comes through being, not through accumulation of information.", difficulty: 2, module: "type", typeSpecific: 5, tags: ["holy-idea"] },
  { id: qid(), q: "According to Naranjo, what is the specific fixation of Type 5, and how does it manifest in the countertype (Social 5)?", opts: ["Detachment; Social 5 detaches through intellectual systems and group belonging (Totem)", "Retraction; Social 5 overconnects to compensate", "Isolation; Social 5 becomes a social butterfly", "Withholding; Social 5 gives excessively"], ans: 0, exp: "The fixation is Detachment. The Social 5 (Totem) is the countertype -- they connect through shared knowledge, ideals, or group identity, looking less withdrawn than other 5s.", difficulty: 3, module: "type", typeSpecific: 5, tags: ["naranjo", "countertype", "fixation"] },
  { id: qid(), q: "In Riso-Hudson's Levels of Development, what characterizes a Type 5 at Level 7 (unhealthy)?", opts: ["Pioneering visionary", "Isolated nihilist cutting off from all relationships", "Eccentric provocateur detached from reality", "Hyperactive researcher"], ans: 2, exp: "At Level 7, Riso-Hudson describe the 5 as an eccentric, provocative figure increasingly cut off from reality, antagonizing others while retreating into bizarre inner worlds.", difficulty: 3, module: "type", typeSpecific: 5, tags: ["riso-hudson", "levels"] },

  // --- Type 6 ---
  { id: qid(), q: "What is the core fear of Type 6?", opts: ["Being corrupt", "Being without support and guidance", "Being worthless", "Being trapped"], ans: 1, exp: "Type 6's core fear is being without support, guidance, or security -- driving vigilance, loyalty-seeking, and anxiety.", difficulty: 1, module: "type", typeSpecific: 6, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 6?", opts: ["Anger", "Envy", "Fear (Anxiety/Cowardice)", "Sloth"], ans: 2, exp: "Type 6's passion is Fear -- the constant scanning for danger and worst-case scenarios that keeps them in a state of vigilance.", difficulty: 1, module: "type", typeSpecific: 6, tags: ["passion"] },
  { id: qid(), q: "Type 6 integrates toward which type?", opts: ["Type 3", "Type 9", "Type 1", "Type 7"], ans: 1, exp: "Type 6 integrates to Type 9 -- in growth, becoming more relaxed, trusting, peaceful, and able to rest in not-knowing.", difficulty: 1, module: "type", typeSpecific: 6, tags: ["integration"] },
  { id: qid(), q: "What distinguishes a phobic 6 from a counterphobic 6?", opts: ["Phobic 6s are afraid; counterphobic 6s are not", "Phobic 6s move away from fear; counterphobic 6s move toward it", "Phobic 6s are introverts; counterphobic 6s are extraverts", "There is no real distinction"], ans: 1, exp: "Both phobic and counterphobic 6s experience the same core fear. Phobic 6s tend to avoid and seek safety, while counterphobic 6s charge toward what they fear to prove it can't hurt them.", difficulty: 2, module: "type", typeSpecific: 6, tags: ["subtypes"] },
  { id: qid(), q: "According to Naranjo, which Type 6 subtype is the countertype?", opts: ["Self-Preservation 6", "Social 6", "Sexual 6 (Strength/Beauty)", "All of them equally"], ans: 2, exp: "Sexual 6 (Strength/Beauty) is the countertype -- they mask fear through intimidation and physical strength, often looking like Type 8.", difficulty: 3, module: "type", typeSpecific: 6, tags: ["countertype", "naranjo"] },

  // --- Type 7 ---
  { id: qid(), q: "What is the core fear of Type 7?", opts: ["Being controlled", "Being deprived, trapped in pain", "Being abandoned", "Being corrupt"], ans: 1, exp: "Type 7's core fear is being deprived, trapped in emotional pain, or limited in their freedom and options.", difficulty: 1, module: "type", typeSpecific: 7, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 7?", opts: ["Lust", "Gluttony", "Avarice", "Pride"], ans: 1, exp: "Type 7's passion is Gluttony -- not just for food but for experiences, ideas, stimulation, and plans. The mind's insistence that more will bring satisfaction.", difficulty: 1, module: "type", typeSpecific: 7, tags: ["passion"] },
  { id: qid(), q: "Type 7 integrates toward which type?", opts: ["Type 1", "Type 5", "Type 8", "Type 4"], ans: 1, exp: "Type 7 integrates to Type 5 -- in growth, developing depth, focus, and the ability to stay with one thing instead of scanning for the next.", difficulty: 1, module: "type", typeSpecific: 7, tags: ["integration"] },
  { id: qid(), q: "Which Type 7 subtype is the countertype according to Chestnut?", opts: ["Self-Preservation 7", "Social 7 (Sacrifice)", "Sexual 7", "None"], ans: 1, exp: "Social 7 (Sacrifice) is the countertype -- they look least like typical 7s because they postpone their own pleasure for the group, appearing more like Type 2.", difficulty: 2, module: "type", typeSpecific: 7, tags: ["countertype", "chestnut"] },
  { id: qid(), q: "What is Naranjo's term for the Self-Preservation 7?", opts: ["Sacrifice", "Suggestibility", "Family/Defender", "Glutton"], ans: 2, exp: "Naranjo describes the Self-Preservation 7 as 'Family' or 'Keeper of the Castle' -- they create networks of allies and like-minded people as a web of support.", difficulty: 3, module: "type", typeSpecific: 7, tags: ["naranjo", "subtypes"] },

  // --- Type 8 ---
  { id: qid(), q: "What is the core fear of Type 8?", opts: ["Being harmed or controlled by others", "Being abandoned", "Being worthless", "Being incompetent"], ans: 0, exp: "Type 8's core fear is being harmed, controlled, or violated by others -- driving their need for autonomy, strength, and power.", difficulty: 1, module: "type", typeSpecific: 8, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 8?", opts: ["Anger", "Lust (Excess)", "Gluttony", "Pride"], ans: 1, exp: "Type 8's passion is Lust -- not just sexual but an excess of intensity, wanting to feel fully alive through power, action, and sensory engagement.", difficulty: 1, module: "type", typeSpecific: 8, tags: ["passion"] },
  { id: qid(), q: "Type 8 integrates toward which type?", opts: ["Type 5", "Type 2", "Type 4", "Type 9"], ans: 1, exp: "Type 8 integrates to Type 2 -- in growth, becoming more caring, open-hearted, and willing to show vulnerability and tenderness.", difficulty: 1, module: "type", typeSpecific: 8, tags: ["integration"] },
  { id: qid(), q: "Which Type 8 subtype is the countertype and can look like a Type 2?", opts: ["Self-Preservation 8", "Social 8 (Solidarity)", "Sexual 8", "None"], ans: 1, exp: "Social 8 (Solidarity/Friendship) is the countertype -- they channel their power into protecting the weak and can appear more like a helper.", difficulty: 2, module: "type", typeSpecific: 8, tags: ["countertype", "chestnut"] },
  { id: qid(), q: "According to Naranjo, what is the character style of Self-Preservation 8?", opts: ["Solidarity", "Possession/Surrender", "Satisfaction", "Revenge"], ans: 2, exp: "Naranjo describes Self-Preservation 8 as 'Satisfaction' -- they are the most grounded and least confrontational 8, focused on getting their material needs met.", difficulty: 3, module: "type", typeSpecific: 8, tags: ["naranjo", "subtypes"] },

  // --- Type 9 ---
  { id: qid(), q: "What is the core fear of Type 9?", opts: ["Being abandoned", "Loss of connection, fragmentation, separation", "Being controlled", "Being defective"], ans: 1, exp: "Type 9's core fear is loss and separation -- the fear of being fragmented, disconnected from others, or losing inner stability.", difficulty: 1, module: "type", typeSpecific: 9, tags: ["core-fear"] },
  { id: qid(), q: "What is the passion (vice) of Type 9?", opts: ["Fear", "Anger", "Sloth (Acedia)", "Envy"], ans: 2, exp: "Type 9's passion is Sloth (Acedia) -- not physical laziness but psycho-spiritual laziness: the forgetting of one's own priorities, desires, and self.", difficulty: 1, module: "type", typeSpecific: 9, tags: ["passion"] },
  { id: qid(), q: "Type 9 integrates toward which type?", opts: ["Type 6", "Type 3", "Type 1", "Type 7"], ans: 1, exp: "Type 9 integrates to Type 3 -- in growth, becoming more self-developing, energized, productive, and willing to pursue their own goals.", difficulty: 1, module: "type", typeSpecific: 9, tags: ["integration"] },
  { id: qid(), q: "Which Enneagram center does Type 9 belong to, and what is their relationship to its core emotion?", opts: ["Heart Center; they repress shame", "Head Center; they repress fear", "Gut Center; they repress/fall asleep to anger", "They are at the center of all three"], ans: 2, exp: "Type 9 is in the Gut/Body Center (8, 9, 1). While 8s externalize anger and 1s internalize it, 9s fall asleep to their anger entirely.", difficulty: 2, module: "type", typeSpecific: 9, tags: ["centers"] },
  { id: qid(), q: "According to Chestnut, which Type 9 subtype is the countertype?", opts: ["Self-Preservation 9 (Appetite)", "Social 9 (Participation)", "Sexual 9 (Fusion)", "None"], ans: 1, exp: "Social 9 (Participation) is the countertype -- they look least like a 9 because they merge with groups and activities rather than withdrawing, appearing more energetic.", difficulty: 3, module: "type", typeSpecific: 9, tags: ["countertype", "chestnut"] },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 2: COGNITIVE FUNCTION DEEP DIVE
  // ═══════════════════════════════════════════════════════════════════════

  // Beginner Cognitive
  { id: qid(), q: "How many cognitive functions did Jung describe?", opts: ["4", "6", "8", "16"], ans: 2, exp: "Jung described 8 cognitive functions: 4 function types (Thinking, Feeling, Sensing, Intuition), each with an introverted and extraverted orientation.", difficulty: 1, module: "cognitive", tags: ["basics"] },
  { id: qid(), q: "What does 'Ni' stand for?", opts: ["Neurological Intuition", "Introverted Intuition", "Internal Navigation", "Natural Insight"], ans: 1, exp: "Ni = Introverted Intuition. It synthesizes information into singular insights, convergent future visions, and deep pattern recognition.", difficulty: 1, module: "cognitive", tags: ["basics"] },
  { id: qid(), q: "What does 'Te' stand for?", opts: ["Thinking Extraverted", "Tertiary Expression", "Type Evaluation", "Transpersonal Ego"], ans: 0, exp: "Te = Extraverted Thinking. It organizes the external world through logic, efficiency, measurable results, and objective systems.", difficulty: 1, module: "cognitive", tags: ["basics"] },
  { id: qid(), q: "In the MBTI/cognitive function model, the dominant function of an INTJ is:", opts: ["Te (Extraverted Thinking)", "Ni (Introverted Intuition)", "Fi (Introverted Feeling)", "Se (Extraverted Sensing)"], ans: 1, exp: "INTJ leads with Ni (Introverted Intuition) -- convergent future-oriented pattern recognition is their primary mode.", difficulty: 1, module: "cognitive", tags: ["stacks"] },
  { id: qid(), q: "What is the auxiliary (2nd) function of an ENFP?", opts: ["Ne", "Fi", "Te", "Si"], ans: 1, exp: "ENFP's stack is Ne-Fi-Te-Si. The auxiliary function is Fi (Introverted Feeling) -- personal values and emotional authenticity.", difficulty: 1, module: "cognitive", tags: ["stacks"] },
  { id: qid(), q: "Which cognitive function focuses on external sensory experience in the present moment?", opts: ["Si", "Se", "Ne", "Ni"], ans: 1, exp: "Se (Extraverted Sensing) engages with the present sensory world -- physical experience, action, aesthetics, and real-time observation.", difficulty: 1, module: "cognitive", tags: ["basics"] },
  { id: qid(), q: "What is Si (Introverted Sensing)?", opts: ["Present-moment sensory awareness", "Stored sensory impressions, memory, and comparison to past experience", "External pattern recognition", "Bodily kinesthetic awareness"], ans: 1, exp: "Si stores detailed sensory impressions and compares present experience to past. It values tradition, routine, and what has been proven.", difficulty: 1, module: "cognitive", tags: ["basics"] },
  { id: qid(), q: "What is the dominant function of an INFP?", opts: ["Ne", "Fi", "Fe", "Ni"], ans: 1, exp: "INFP leads with Fi (Introverted Feeling) -- a deep inner value system and personal emotional authenticity.", difficulty: 1, module: "cognitive", tags: ["stacks"] },
  { id: qid(), q: "The function stack of an ESTP is:", opts: ["Se-Ti-Fe-Ni", "Te-Si-Ne-Fi", "Se-Fi-Te-Ni", "Ti-Se-Ni-Fe"], ans: 0, exp: "ESTP's function stack is Se-Ti-Fe-Ni: dominant Se (present-moment action), auxiliary Ti (internal logic), tertiary Fe, inferior Ni.", difficulty: 1, module: "cognitive", tags: ["stacks"] },

  // Intermediate Cognitive
  { id: qid(), q: "What is a cognitive 'loop' in function theory?", opts: ["All four functions working together harmoniously", "The dominant function connecting to the tertiary, bypassing the auxiliary", "The inferior function taking over the personality", "Shadow functions becoming conscious"], ans: 1, exp: "A loop occurs when the dominant function connects directly to the tertiary (same attitude), bypassing the auxiliary -- creating a closed, self-reinforcing unhealthy pattern.", difficulty: 2, module: "cognitive", tags: ["loops"] },
  { id: qid(), q: "In a Ti-Si loop (INTP), what happens?", opts: ["The person becomes more socially engaged", "They get stuck in internal analysis reinforced by past data, disconnecting from external input", "They become action-oriented", "Their intuition becomes dominant"], ans: 1, exp: "In a Ti-Si loop, the INTP's internal logic (Ti) feeds on past experiences (Si) in a closed system, disconnecting from Ne's explorative external input.", difficulty: 2, module: "cognitive", tags: ["loops"] },
  { id: qid(), q: "What is the 'Grip' experience in cognitive function theory?", opts: ["The dominant function at peak performance", "The inferior (4th) function taking over under extreme stress", "Learning to use shadow functions", "The auxiliary function becoming dominant"], ans: 1, exp: "The Grip: the inferior function takes over under extreme stress, producing out-of-character, compulsive, and often primitive behavior.", difficulty: 2, module: "cognitive", tags: ["grip"] },
  { id: qid(), q: "An INTJ in the grip of inferior Se might:", opts: ["Become obsessed with sensory indulgence -- overeating, overexercising, or binge-watching", "Become extremely organized", "Start exploring many new ideas at once", "Become highly empathetic and people-focused"], ans: 0, exp: "When inferior Se grips an INTJ, they lose their typical restraint and become compulsively focused on sensory experiences -- food, physical sensation, or material excess.", difficulty: 2, module: "cognitive", tags: ["grip"] },
  { id: qid(), q: "What is the difference between Fe and Fi?", opts: ["Fe is genuine; Fi is fake", "Fe orients to external emotional harmony and group values; Fi orients to internal personal values and authenticity", "Fe is about thinking; Fi is about feeling", "No meaningful difference"], ans: 1, exp: "Fe (Extraverted Feeling) reads and maintains group emotional harmony and shared values. Fi (Introverted Feeling) evaluates through a deep personal value system and individual authenticity.", difficulty: 2, module: "cognitive", tags: ["functions"] },
  { id: qid(), q: "In Beebe's 8-function model, what archetype is assigned to the 5th function?", opts: ["Trickster", "Opposing Personality (Nemesis)", "Demon", "Senex/Witch"], ans: 1, exp: "The 5th function is the Opposing Personality (Nemesis) -- it's the shadow of the dominant and can be used defensively when the ego is threatened.", difficulty: 2, module: "cognitive", tags: ["beebe"] },
  { id: qid(), q: "What archetype does Beebe assign to the 7th function?", opts: ["Hero", "Trickster", "Demon", "Nemesis"], ans: 1, exp: "The 7th function is the Trickster (or Deceiver) -- it can trick the ego into blind spots and is often the source of embarrassing mistakes.", difficulty: 2, module: "cognitive", tags: ["beebe"] },
  { id: qid(), q: "Which function is in the 'Child' (3rd / Puer/Puella) position for an ENFJ?", opts: ["Fe", "Ni", "Se", "Ti"], ans: 2, exp: "ENFJ's stack is Fe-Ni-Se-Ti. The 3rd position (Child/Puer) is Se -- it's a source of playfulness and relief but also vulnerability.", difficulty: 2, module: "cognitive", tags: ["beebe", "stacks"] },

  // Advanced Cognitive
  { id: qid(), q: "How does Se manifest differently as a Hero (dominant) function versus as a Demon (8th) function?", opts: ["No difference", "As Hero: confident engagement with physical reality; as Demon: destructive sensory overwhelm or dangerous impulsivity", "As Hero: passive observation; as Demon: active engagement", "As Hero: introverted; as Demon: extraverted"], ans: 1, exp: "Se as Hero (ESTP/ESFP) is confident, skillful engagement with the physical world. As Demon (INTJ/INFJ), it manifests as destructive overwhelm -- reckless physicality or feeling attacked by sensory reality.", difficulty: 3, module: "cognitive", tags: ["beebe", "shadow"] },
  { id: qid(), q: "According to Beebe, what is the Anima/Animus (4th/inferior) function's role in individuation?", opts: ["It should be repressed", "It serves as the gateway to the unconscious and to psychological wholeness", "It replaces the dominant function over time", "It has no role in individuation"], ans: 1, exp: "Beebe, following Jung, sees the inferior function as the gateway to the unconscious. Engaging it consciously is central to individuation and psychological wholeness.", difficulty: 3, module: "cognitive", tags: ["beebe", "jung"] },
  { id: qid(), q: "In an INFJ's 8-function Beebe stack, what is the 6th function (Witch/Senex)?", opts: ["Ni", "Fe", "Te", "Se"], ans: 2, exp: "INFJ's full 8-function stack: Ni-Fe-Ti-Se-Ne-Fi-Te-Si. The 6th (Witch/Senex) is Fi -- it can manifest as critical judgments of others' values.", difficulty: 3, module: "cognitive", tags: ["beebe", "stacks"] },
  { id: qid(), q: "What is the Demon (8th) function for an ENTP, and how might it manifest?", opts: ["Si -- catastrophic attachment to negative past experiences and physical health anxiety", "Fe -- emotional manipulation", "Ni -- paranoid visions of doom", "Te -- rigid external control"], ans: 0, exp: "ENTP's stack ends with Si as the Demon (8th). It manifests as overwhelming nostalgia, health anxiety, or being haunted by past failures in a way that feels alien to the ENTP.", difficulty: 3, module: "cognitive", tags: ["beebe", "shadow"] },
  { id: qid(), q: "How does Jung's concept of the transcendent function relate to the 8-function model?", opts: ["It is the 9th function", "It arises from the tension between conscious and unconscious functions, enabling psychological growth", "It replaces all other functions", "It is the same as the dominant function"], ans: 1, exp: "The transcendent function is not a cognitive function but a process: it arises from holding the tension between conscious attitudes and unconscious compensations, producing new synthesis.", difficulty: 3, module: "cognitive", tags: ["jung", "theory"] },
  { id: qid(), q: "You're stressed and suddenly become obsessed with sensory overindulgence (overeating, reckless spending). If your dominant function is Ni, which function is likely in grip?", opts: ["Ne", "Fe", "Se", "Ti"], ans: 2, exp: "For Ni-dominants (INTJ/INFJ), the inferior function is Se. In the grip, Se manifests as compulsive sensory indulgence -- overeating, overspending, or physical recklessness.", difficulty: 2, module: "cognitive", tags: ["grip", "scenario"] },
  { id: qid(), q: "An ISFJ is acting extremely critical and nitpicking logical inconsistencies in everyone's arguments. Which function is likely in the grip?", opts: ["Fe", "Ne", "Ti", "Se"], ans: 2, exp: "ISFJ's inferior function is Ne, but this behavior -- hypercritical logical nitpicking -- points to the Ti in a loop with Si, or potentially Ne manifesting as seeing all the ways things could go wrong.", difficulty: 3, module: "cognitive", tags: ["grip", "scenario"] },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 3: CROSS-SYSTEM CHALLENGE
  // ═══════════════════════════════════════════════════════════════════════
  { id: qid(), q: "INTJs are most commonly which Enneagram type?", opts: ["Type 1", "Type 5", "Type 8", "Type 3"], ans: 1, exp: "INTJs most commonly type as Enneagram 5 -- Ni's drive for deep understanding aligns with 5's desire for competence and knowledge.", difficulty: 1, module: "cross", tags: ["correlations"] },
  { id: qid(), q: "ENFPs are most commonly which Enneagram type?", opts: ["Type 7", "Type 4", "Type 2", "Type 9"], ans: 0, exp: "ENFPs most commonly type as Enneagram 7 -- Ne's drive for new possibilities aligns with 7's desire for stimulation and options.", difficulty: 1, module: "cross", tags: ["correlations"] },
  { id: qid(), q: "INFPs are most commonly which Enneagram type?", opts: ["Type 9", "Type 4", "Type 2", "Type 5"], ans: 1, exp: "INFPs most commonly type as Enneagram 4 -- Fi's drive for authenticity and personal meaning aligns with 4's identity fixation and depth.", difficulty: 1, module: "cross", tags: ["correlations"] },
  { id: qid(), q: "How might Ni-dom interact with the Type 5 passion of avarice?", opts: ["Ni would counteract avarice", "Ni could intensify 5's retreat into internal pattern-making, hoarding insights rather than sharing them", "Ni has no interaction with Enneagram passions", "Ni would make a 5 more social"], ans: 1, exp: "Ni-dominant 5s risk becoming deeply absorbed in internal pattern recognition, intensifying the avarice by hoarding ever-deeper insights without testing them in the real world.", difficulty: 2, module: "cross", tags: ["integration"] },
  { id: qid(), q: "An ESFP Type 7 would likely struggle most with:", opts: ["Not enough sensory input", "Staying with emotional pain -- both Se and 7 move toward stimulation and away from discomfort", "Being too introverted", "Overthinking decisions"], ans: 1, exp: "Se (dominant) + Type 7 gluttony creates a powerful drive toward positive sensory experience. The growth edge for both systems points the same direction: learning to stay with discomfort.", difficulty: 2, module: "cross", tags: ["integration"] },
  { id: qid(), q: "What growth path does integration to Type 8 suggest for a Type 5 who uses inferior Se?", opts: ["They should avoid Se entirely", "Integration to 8 and development of inferior Se both point toward embodied action and confident physical engagement", "These are contradictory growth paths", "8 integration means becoming aggressive"], ans: 1, exp: "Both paths converge: 5->8 integration means becoming more decisive, embodied, and action-oriented. Developing inferior Se means engaging with physical reality. They reinforce each other.", difficulty: 2, module: "cross", tags: ["integration", "growth"] },
  { id: qid(), q: "An INFJ Type 4 experiencing disintegration to Type 2 might look like:", opts: ["Becoming more withdrawn", "Using Fe (auxiliary) to manipulate others into caring for them while Ni creates a narrative of being uniquely unappreciated", "Becoming highly logical", "Losing all emotional capacity"], ans: 1, exp: "INFJ 4s disintegrating to 2 could weaponize their naturally strong Fe -- seeking validation and care through emotional manipulation while Ni constructs an elaborate internal story.", difficulty: 3, module: "cross", tags: ["disintegration", "scenario"] },
  { id: qid(), q: "How does the Ti-Fe axis in an INTP relate to the Enneagram 5's growth line to 8?", opts: ["No relationship", "Ti's detachment reinforces 5's withdrawal; Fe development and 5->8 integration both require external engagement with others", "Ti is the same as Type 5", "Fe prevents 5->8 integration"], ans: 1, exp: "INTP's Ti reinforces 5's cerebral withdrawal. Both Fe (auxiliary development) and 5->8 integration require moving outward -- engaging with people and taking action in the world.", difficulty: 3, module: "cross", tags: ["integration", "axes"] },
  { id: qid(), q: "Why might an ENTJ Type 8 be particularly susceptible to the 8's disintegration to Type 5?", opts: ["Te-dominant 8s never disintegrate", "Under stress, the ENTJ retreats from Te's external control into Ni (introverted), and 8->5 reinforces this withdrawal into isolation and hoarding", "They aren't susceptible at all", "Te makes them immune to stress"], ans: 1, exp: "ENTJ 8s under stress move toward 5's isolation. Their Ni (auxiliary) can become a trap -- retreating from Te's external engagement into Ni's internal world, amplified by 5's avarice.", difficulty: 3, module: "cross", tags: ["disintegration", "scenario"] },
  { id: qid(), q: "An ISFP Type 9 might struggle with which specific developmental challenge?", opts: ["Both Fi (dominant) and 9's sloth encourage internal withdrawal from conflict and self-assertion", "They would be too assertive", "Fi would override 9's patterns completely", "No particular challenge exists"], ans: 0, exp: "Fi-dominant 9s face a doubled challenge: Fi naturally turns inward, and 9's sloth forgets one's own agenda. The growth path for both (Fe development + 9->3 integration) requires external self-assertion.", difficulty: 2, module: "cross", tags: ["integration", "growth"] },
  { id: qid(), q: "How might an ESTJ Type 1 experience their inner critic differently from an INFP Type 1?", opts: ["They wouldn't -- the inner critic is the same for all Type 1s", "ESTJ 1 externalizes criticism through Te (correcting systems and others); INFP 1 internalizes through Fi (harsh self-judgment against personal values)", "ESTJ 1 has no inner critic", "INFP 1 has no inner critic"], ans: 1, exp: "The Type 1 inner critic manifests through the cognitive stack: Te-dominant 1s direct their reforming energy outward (fixing systems), while Fi-dominant 1s turn it inward (ruthless self-evaluation).", difficulty: 3, module: "cross", tags: ["type-interaction"] },
  { id: qid(), q: "What shared growth direction do INFJ and Type 1 integration (to Type 7) suggest?", opts: ["Becoming more rigid", "Both point toward lightness, spontaneity, and engaging with Se/sensory joy", "Becoming more analytical", "Withdrawing further"], ans: 1, exp: "INFJ's inferior Se development means engaging with sensory experience and spontaneity. Type 1's integration to 7 means embracing joy and play. Both paths converge on present-moment engagement.", difficulty: 2, module: "cross", tags: ["integration", "growth"] },

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE 4: HISTORY & THEORY
  // ═══════════════════════════════════════════════════════════════════════
  { id: qid(), q: "Who introduced the concept of the 27 subtypes (instinctual variants for each type)?", opts: ["Don Riso", "Oscar Ichazo", "Claudio Naranjo", "George Gurdjieff"], ans: 2, exp: "Claudio Naranjo developed the 27 subtypes by applying the three instinctual variants (SP, SX, SO) to each of the 9 types, based on Ichazo's original framework.", difficulty: 1, module: "history", tags: ["history"] },
  { id: qid(), q: "What year did Jung publish Psychological Types?", opts: ["1912", "1921", "1935", "1943"], ans: 1, exp: "Jung published Psychological Types (Psychologische Typen) in 1921, introducing the concepts of introversion/extraversion and the four function types.", difficulty: 1, module: "history", tags: ["history", "jung"] },
  { id: qid(), q: "Who created the MBTI based on Jung's theory?", opts: ["Carl Jung himself", "Katharine Briggs and Isabel Briggs Myers", "John Beebe", "David Keirsey"], ans: 1, exp: "Katharine Cook Briggs and her daughter Isabel Briggs Myers developed the MBTI in the 1940s-60s, operationalizing Jung's type theory into a practical assessment.", difficulty: 1, module: "history", tags: ["history", "mbti"] },
  { id: qid(), q: "Oscar Ichazo is known for what contribution to the Enneagram?", opts: ["He invented the Enneagram symbol", "He connected the 9 types to ego fixations, Holy Ideas, passions, and virtues", "He wrote The Wisdom of the Enneagram", "He created the 27 subtypes"], ans: 1, exp: "Ichazo developed the Enneagrammatic map connecting each type to a specific ego fixation, Holy Idea, passion, and virtue -- the theoretical backbone of the system.", difficulty: 1, module: "history", tags: ["history", "ichazo"] },
  { id: qid(), q: "What is the Enneagram symbol's geometric shape?", opts: ["A circle with a triangle and hexad (6-pointed figure)", "A simple circle with 9 points", "A star of David", "A pentagram"], ans: 0, exp: "The Enneagram symbol is a circle containing a triangle (3-6-9) and a hexad (1-4-2-8-5-7), representing the Law of Three and the Law of Seven from Gurdjieff's teaching.", difficulty: 1, module: "history", tags: ["history", "symbol"] },
  { id: qid(), q: "What is the difference between Ichazo's Holy Ideas and Naranjo's passions?", opts: ["They are the same thing", "Holy Ideas are the higher truth each type forgets; passions are the emotional reactions to that forgetting", "Holy Ideas are for healthy types; passions are for unhealthy types", "Ichazo focused on emotions; Naranjo focused on ideals"], ans: 1, exp: "Holy Ideas represent the objective spiritual truth each type loses contact with. Passions are the emotional/instinctual compensations that arise from that loss.", difficulty: 2, module: "history", tags: ["theory", "ichazo", "naranjo"] },
  { id: qid(), q: "How does Beebe's model extend Jung's original 4-function model?", opts: ["It adds 4 more types", "It assigns archetypal roles (Hero, Parent, Child, Anima, Nemesis, Witch, Trickster, Demon) to all 8 functions", "It removes two functions", "It adds a 9th function"], ans: 1, exp: "Beebe extended Jung's theory by mapping all 8 cognitive functions (4 conscious + 4 shadow) to Jungian archetypes, creating a model of psychological development and shadow integration.", difficulty: 2, module: "history", tags: ["beebe", "theory"] },
  { id: qid(), q: "Don Riso and Russ Hudson are known for developing which key Enneagram framework?", opts: ["The 27 subtypes", "The Levels of Development (9 levels from healthy to unhealthy for each type)", "The Hornevian groups", "The cognitive function stacks"], ans: 1, exp: "Riso and Hudson developed the Levels of Development -- 9 levels (3 healthy, 3 average, 3 unhealthy) showing how each type manifests at different degrees of psychological health.", difficulty: 2, module: "history", tags: ["history", "riso-hudson"] },
  { id: qid(), q: "What is the original source of the Enneagram symbol?", opts: ["Ancient Sufi tradition", "G.I. Gurdjieff introduced the symbol to the West, claiming ancient origins", "Carl Jung", "Oscar Ichazo invented it from scratch"], ans: 1, exp: "Gurdjieff introduced the Enneagram symbol in the early 20th century, using it to teach the Laws of Three and Seven. Its exact historical origins remain debated.", difficulty: 2, module: "history", tags: ["history", "gurdjieff"] },
  { id: qid(), q: "Who developed the Tritype theory?", opts: ["Claudio Naranjo", "Katherine Chernick Fauvre", "Helen Palmer", "Don Riso"], ans: 1, exp: "Katherine Chernick Fauvre developed Tritype theory -- the idea that each person uses one type from each center (Head, Heart, Gut) as a dominant strategy.", difficulty: 2, module: "history", tags: ["history", "tritype"] },
  { id: qid(), q: "What are the three Hornevian groups and who conceptualized them?", opts: ["Assertive/Compliant/Withdrawn -- based on Karen Horney's work, applied to the Enneagram", "Active/Passive/Neutral -- from Gurdjieff", "Thinking/Feeling/Doing -- from Naranjo", "Inner/Outer/Balanced -- from Ichazo"], ans: 0, exp: "The Hornevian groups (Assertive: 3,7,8 / Compliant: 1,2,6 / Withdrawn: 4,5,9) are based on Karen Horney's concept of neurotic trends, applied to the Enneagram by various teachers.", difficulty: 2, module: "history", tags: ["hornevian", "theory"] },
  { id: qid(), q: "Beatrice Chestnut's primary contribution to the Enneagram field is:", opts: ["Creating the Enneagram symbol", "Detailed descriptions of all 27 subtypes and identification of countertypes", "Developing the MBTI", "Creating the Levels of Development"], ans: 1, exp: "Chestnut synthesized Naranjo's subtype teachings into comprehensive descriptions of all 27 subtypes and clearly identified which subtype is the 'countertype' for each type.", difficulty: 2, module: "history", tags: ["history", "chestnut"] },
  { id: qid(), q: "What is the Harmonic Groups framework in the Enneagram?", opts: ["How each type sings", "Three groups showing how types cope with conflict: Positive Outlook (2,7,9), Competency (1,3,5), Reactive (4,6,8)", "The musical tones associated with each type", "A framework for tritype interactions"], ans: 1, exp: "The Harmonic Groups describe conflict resolution styles: Positive Outlook types reframe positively, Competency types manage through objectivity, and Reactive types respond with emotional intensity.", difficulty: 2, module: "history", tags: ["harmonic", "theory"] },
  { id: qid(), q: "In what decade did Naranjo first teach the Enneagram personality types in the US?", opts: ["1950s", "1960s", "1970s", "1980s"], ans: 2, exp: "Naranjo began teaching the Enneagram of personality in the early 1970s at the Esalen Institute and at UC Berkeley's SAT groups, bringing Ichazo's framework to the US.", difficulty: 3, module: "history", tags: ["history", "naranjo"] },
  { id: qid(), q: "What is the relationship between Gurdjieff's use of the Enneagram and the personality types we know today?", opts: ["Gurdjieff taught the 9 personality types", "Gurdjieff used the symbol for cosmological/process work, not personality; the personality application came from Ichazo and Naranjo", "They are identical systems", "Gurdjieff rejected the Enneagram symbol"], ans: 1, exp: "Gurdjieff used the Enneagram as a process diagram (food octave, etc.), not for personality typing. Ichazo connected the 9 points to ego fixations, and Naranjo developed the personality descriptions.", difficulty: 3, module: "history", tags: ["history", "gurdjieff", "ichazo"] },
  { id: qid(), q: "What is the difference between Jung's original concept of 'types' and the modern MBTI interpretation?", opts: ["No difference", "Jung saw types as fluid tendencies with an unconscious compensatory function; MBTI treats them as more fixed categories with letter preferences", "MBTI is deeper than Jung", "Jung only described 2 types"], ans: 1, exp: "Jung viewed type as a dynamic interplay between conscious and unconscious functions. The MBTI operationalized this into more fixed letter-based categories, losing some of Jung's nuance about the unconscious.", difficulty: 3, module: "history", tags: ["jung", "mbti", "theory"] },
  { id: qid(), q: "Helen Palmer is known for which approach to teaching the Enneagram?", opts: ["The Narrative Tradition -- using panel interviews and first-person accounts", "The scientific measurement approach", "The Levels of Development", "The subtype system"], ans: 0, exp: "Helen Palmer pioneered the Narrative Tradition, using panel interviews where people of each type share their lived experience, emphasizing phenomenology over theory.", difficulty: 3, module: "history", tags: ["history", "palmer"] },
  { id: qid(), q: "What did Jung mean by 'individuation' and how does it relate to the 8-function model?", opts: ["Becoming more individual and unique", "The lifelong process of integrating all 8 functions -- conscious and shadow -- into a more complete personality", "Choosing which type you are", "Rejecting your inferior function"], ans: 1, exp: "Individuation is Jung's term for the lifelong process of becoming whole by integrating unconscious contents. In the 8-function model, this means developing a conscious relationship with all 8 functions, including the shadow.", difficulty: 3, module: "history", tags: ["jung", "individuation", "theory"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CONFETTI PARTICLE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
function ConfettiParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#6366f1", "#f59e0b", "#10b981", "#f43f5e", "#8b5cf6", "#06b6d4"][i % 6],
      delay: Math.random() * 0.3,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, y: "50vh", x: `${p.x}vw`, rotate: 0, scale: 1 }}
          animate={{ opacity: 0, y: "-20vh", x: `${p.x + (Math.random() - 0.5) * 30}vw`, rotate: p.rotation + 720, scale: 0.5 }}
          transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
          style={{ width: p.size, height: p.size, backgroundColor: p.color, borderRadius: p.size > 7 ? "50%" : "1px", position: "absolute" }}
        />
      ))}
    </div>
  );
}

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
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function DailyPage() {
  const { profile, loaded, trackVisit, markQuizComplete, addXP } = useProfile();
  const { state: gameStateRaw, earnXP: gameEarnXP } = useGameState();

  // ── View state (hub / path / quiz) ──
  const [view, setView] = useState<"hub" | "path" | "quiz">("hub");
  const [activePathTab, setActivePathTab] = useState<"enneagram" | "jungian">("enneagram");
  const [bottomSheetNode, setBottomSheetNode] = useState<PathNodeConfig | null>(null);
  const [quizSourceNode, setQuizSourceNode] = useState<PathNodeConfig | null>(null);

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [copied, setCopied] = useState(false);

  // Daily progress from localStorage
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyState>({ level: 1, correctAtLevel: 0, totalAtLevel: 0 });
  const [weeklyData, setWeeklyData] = useState<{ day: string; value: number }[]>([]);

  // Streak and XP from game state (authoritative source)
  const [gameStreak, setGameStreak] = useState<number>(0);
  const [gameXP, setGameXP] = useState<number>(0);

  // Streak freezes (from psyche-game-state)
  const [streakFreezes, setStreakFreezes] = useState<number>(0);

  // Pet state (from psyche-pet-state)
  const [petWidget, setPetWidget] = useState<{
    name: string;
    petType: number; // for PetSprite
    health: number;
    hunger: number;
    isAlive: boolean;
  } | null>(null);

  // Daily Insight (static, from curated collection)
  const [dailyInsightData, setDailyInsightData] = useState<{ quote: string; author: string; reflection: string; category: string } | null>(null);

  const dateKey = getDateKey();
  const dayOfYear = getDayOfYear();
  const seed = getTodaySeed();

  // ── Daily Insight (static curated collection) ──
  useEffect(() => {
    if (!loaded) return;
    import("@/data/daily-insights-index").then(({ getTodayInsight }) => {
      const insight = getTodayInsight();
      setDailyInsightData(insight);
    }).catch(() => {
      // Fallback if insights haven't loaded yet
      setDailyInsightData({
        quote: "The unexamined life is not worth living.",
        author: "Socrates",
        reflection: "Self-knowledge isn't a luxury — it's the foundation everything else is built on.",
        category: "philosophy",
      });
    });
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

    // Load pet state for widget
    try {
      const raw = localStorage.getItem("psyche-pet-state");
      if (raw) {
        const ps = JSON.parse(raw);
        const petType = typeof ps.type === "number" ? ps.type : 1;
        setPetWidget({
          name: typeof ps.name === "string" ? ps.name : "Your pet",
          petType,
          health: typeof ps.health === "number" ? ps.health : 100,
          hunger: typeof ps.hunger === "number" ? ps.hunger : 100,
          isAlive: ps.isAlive !== false,
        });
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

  // ── Check if first quiz of day (2x XP bonus) ──
  const isFirstQuizToday = !dailyProgress || dailyProgress.questionsAnswered === 0;

  // ── Profile data ──
  const enneagramType = profile.enneagramType ?? 5;
  const cognitiveType = profile.cognitiveType ?? "INTJ";
  // Read streak and XP from psyche-game-state (authoritative); fall back to profile for legacy users
  const streak = gameStreak > 0 ? gameStreak : (profile.streakCount ?? 0);
  const totalXP = gameXP > 0 ? gameXP : (profile.xp ?? 0);

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
  const currentMilestone = milestones.filter(m => totalXP >= m.xp).pop()!;
  const nextMilestone = milestones.find(m => totalXP < m.xp);
  const progressToNext = nextMilestone ? Math.round(((totalXP - currentMilestone.xp) / (nextMilestone.xp - currentMilestone.xp)) * 100) : 100;

  // ── Today's content ──
  const insightIdx = dayOfYear % 7;
  const challengeIdx = (dayOfYear + 2) % 7;
  const todayInsight = profile.enneagramType ? typeInsights[profile.enneagramType]?.[insightIdx] : null;
  const todayChallenge = profile.enneagramType ? typeChallenges[profile.enneagramType]?.[challengeIdx] : null;

  // ── Question selection helpers ──
  const getQuestionsForModule = useCallback((moduleId: string, count: number): Question[] => {
    // Map difficulty level (1-10) to question difficulty tiers
    const tier: 1 | 2 | 3 = difficulty.level <= 3 ? 1 : difficulty.level <= 6 ? 2 : 3;

    // "cross-bonus" is an alias for the cross module (different node ID for completion tracking)
    const resolvedModuleId = moduleId === "cross-bonus" ? "cross" : moduleId;
    let pool = QUESTION_BANK.filter(q => q.module === resolvedModuleId);

    // For type module, prefer questions specific to user's type
    if (moduleId === "type" && profile.enneagramType) {
      const typeQ = pool.filter(q => q.typeSpecific === profile.enneagramType);
      const generalQ = pool.filter(q => !q.typeSpecific || q.typeSpecific === 0);
      // Prioritize type-specific, fill with general
      pool = [...typeQ, ...generalQ];
    }

    // Filter by difficulty tier (include current tier and one below for variety)
    const tierQ = pool.filter(q => q.difficulty <= tier);
    const hardQ = pool.filter(q => q.difficulty === tier);

    // Mix: 60% at current tier, 40% from lower
    const shuffledHard = shuffleWithSeed(hardQ, seed + moduleId.length);
    const shuffledEasy = shuffleWithSeed(tierQ.filter(q => q.difficulty < tier), seed + moduleId.length + 1);

    const hardCount = Math.ceil(count * 0.6);
    const easyCount = count - hardCount;

    const selected = [
      ...shuffledHard.slice(0, hardCount),
      ...shuffledEasy.slice(0, easyCount),
    ];

    // If we don't have enough, fill from the whole pool
    if (selected.length < count) {
      const remaining = shuffleWithSeed(pool.filter(q => !selected.includes(q)), seed + 99);
      selected.push(...remaining.slice(0, count - selected.length));
    }

    return shuffleWithSeed(selected, seed + moduleId.charCodeAt(0)).slice(0, count);
  }, [difficulty.level, seed, profile.enneagramType]);

  // Warmup questions (5 from mixed modules)
  const warmupQuestions = useMemo(() => {
    const all = shuffleWithSeed(
      QUESTION_BANK.filter(q => q.difficulty <= (difficulty.level <= 3 ? 1 : 2)),
      seed
    );
    return all.slice(0, 5);
  }, [seed, difficulty.level]);

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

    const newStreak = correct ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    const xpGained = correct ? (isFirstQuizToday ? 20 : 10) + (newStreak >= 3 ? 5 : 0) : 0;
    if (xpGained > 0) {
      gameEarnXP(xpGained, "daily-quiz");
      addXP(xpGained);
      setSessionXP(prev => prev + xpGained);
    }

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }

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
      saveProgress({ warmupDone: true });

      // Perfect section bonus
      const allCorrect = [...warmupAnswers].every(Boolean) && warmupAnswers.length === warmupQuestions.length - 1 && warmupSelected === warmupQuestions[warmupQ].ans;
      if (allCorrect) {
        gameEarnXP(25, "perfect-score-bonus");
        addXP(25);
        setSessionXP(prev => prev + 25);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
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

    const newStreak = correct ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    const xpGained = calculateXP(correct, activeModule!, newStreak);
    if (xpGained > 0) {
      gameEarnXP(xpGained, "daily-quiz");
      addXP(xpGained);
      setSessionXP(prev => prev + xpGained);
    }

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }

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
      const correctCount = moduleAnswers.filter(Boolean).length + (moduleSelected === moduleQuestions[moduleQ].ans ? 1 : 0);
      const totalCount = moduleAnswers.length + 1;
      const timeSpent = Math.round((Date.now() - moduleStartTime) / 60000);

      // Perfect section bonus
      if (correctCount === totalCount) {
        gameEarnXP(25, "perfect-score-bonus");
        addXP(25);
        setSessionXP(prev => prev + 25);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }

      const moduleScores = { ...(dailyProgress?.moduleScores ?? {}) };
      moduleScores[activeModule!] = { correct: correctCount, total: totalCount, xp: sessionXP };

      saveProgress({
        modulesCompleted: [...(dailyProgress?.modulesCompleted ?? []), activeModule!],
        timeSpentMinutes: (dailyProgress?.timeSpentMinutes ?? 0) + timeSpent,
        moduleScores,
      });
    } else {
      setModuleQ(q => q + 1);
      setModuleSelected(null);
      setModuleShowExp(false);
    }
  };

  const shareScore = () => {
    const correctCount = moduleAnswers.filter(Boolean).length;
    const totalCount = moduleAnswers.length;
    const config = MODULE_CONFIG.find(m => m.id === activeModule);
    const text = `Thyself Daily Practice - ${config?.title}\nScore: ${correctCount}/${totalCount} | Difficulty: Level ${difficulty.level}/10 | Streak: ${correctStreak}\nTrain your self-knowledge at archetype.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Computed stats ──
  const totalAnsweredToday = dailyProgress?.questionsAnswered ?? 0;
  const totalCorrectToday = dailyProgress?.correctAnswers ?? 0;
  const accuracyToday = totalAnsweredToday > 0 ? Math.round((totalCorrectToday / totalAnsweredToday) * 100) : 0;
  const totalAnsweredAllTime = useMemo(() => {
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
    return total;
  }, [loaded, dailyProgress?.questionsAnswered]);

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
  const currentUnits = activePathTab === "enneagram" ? enneagramUnits : jungianUnits;
  const allPathNodes = currentUnits.flatMap(u => u.nodes);
  const miniPathNodes = allPathNodes.slice(0, 5);
  const nextNode = allPathNodes.find(n => n.status !== "completed") ?? null;
  const completedTodayCount = allPathNodes.filter(n => n.status === "completed").length;

  // ── Start a node (from bottom sheet) ──
  const startNode = (node: PathNodeConfig) => {
    setBottomSheetNode(null);
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

  // ── Complete a reflection/challenge node ──
  const completeNonQuizNode = (node: PathNodeConfig) => {
    const existing = dailyProgress?.nonQuizCompleted ?? [];
    if (existing.includes(node.id)) return;
    saveProgress({ nonQuizCompleted: [...existing, node.id] });
    gameEarnXP(node.xp, "reflection");
    addXP(node.xp);
    setSessionXP(prev => prev + node.xp);
  };

  if (!loaded) return null;

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
    const diffLabel = q.difficulty === 1 ? "Beginner" : q.difficulty === 2 ? "Intermediate" : "Advanced";
    const diffColor = q.difficulty === 1 ? "text-emerald-500" : q.difficulty === 2 ? "text-amber-500" : "text-rose-500";

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
        {showConfetti && <ConfettiParticles />}
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
          activePathTab={activePathTab}
          onPathTabChange={setActivePathTab}
          onContinuePath={() => setView("path")}
          onNodeTap={(node) => setBottomSheetNode(node)}
          miniPathNodes={miniPathNodes}
          nextNode={nextNode}
          streakFreezes={streakFreezes}
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
      </div>
    );
  }

  // ── Path view ──
  if (view === "path") {
    return (
      <div className="min-h-screen bg-white">
        {showConfetti && <ConfettiParticles />}
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-slate-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setView("hub")}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <ChevronRight className="w-4 h-4 text-slate-500 rotate-180" />
          </button>
          <h2 className="font-bold text-slate-800 text-base">Your Path</h2>
          <div className="ml-auto text-sm text-slate-400">{completedTodayCount}/{allPathNodes.length} done</div>
        </div>
        <div className="max-w-md mx-auto px-4 pt-4">
          <PathView
            units={currentUnits}
            onNodeTap={(node) => setBottomSheetNode(node)}
            activeTab={activePathTab}
            onTabChange={setActivePathTab}
          />
        </div>
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
      </div>
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
      {showConfetti && <ConfettiParticles />}

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
                    <PetSprite type={petWidget.petType} size={48} />
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
                      <p className="text-xs text-slate-400 mb-3">— {dailyInsightData.author}</p>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {dailyInsightData.reflection}
                      </p>
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
                    {difficulty.level <= 3 ? "Beginner" : difficulty.level <= 6 ? "Intermediate" : "Advanced"} -- {difficulty.correctAtLevel}/{difficulty.totalAtLevel} at this level
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
