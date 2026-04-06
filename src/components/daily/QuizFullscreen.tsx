"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Heart, Zap, Trophy, ArrowRight, Star, BookOpen, Timer } from "lucide-react";
import ChibiSprite from "@/components/ChibiSprite";
import type { ChibiState } from "@/components/ChibiSprite";
import KeepGoingCard from "@/components/daily/KeepGoingCard";
import { getBadgeProgress, type GameState, type BadgeProgress } from "@/hooks/useGameState";
import TokenDropOverlay, { rollTokenDrop, type TokenDrop } from "@/components/daily/TokenDropOverlay";
import { useRewards } from "@/components/Rewards";
import type { PathNodeConfig } from "@/components/daily/NodeBottomSheet";
import { stableShuffleOptions } from "@/lib/shuffleOptions";

interface Question {
  id: string;
  q: string;
  opts: string[];
  ans: number;
  exp: string;
  tier: 0 | 1 | 2 | 3 | 4;
  module: string;
  tags: string[];
}

interface Props {
  questions: Question[];
  currentIdx: number;
  selected: number | null;
  showExp: boolean;
  answers: boolean[];
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onQuit: () => void;
  moduleName: string;
  sessionXP: number;
  completed?: boolean;
  // Engagement features
  hearts?: number;          // real game-state hearts (0–5); falls back to session calc if omitted
  maxHearts?: number;       // default 5
  heartsRefillTime?: string | null; // ISO timestamp when refill timer started
  xpBonusLabel?: string | null; // e.g. "2x BONUS!" shown as a flash
  longestStreak?: number;   // personal best for self-competition screen
  currentStreak?: number;
  enneagramType?: number;   // for chibi sprite
  instinct?: string;        // e.g. "sp", "so", "sx"
  onBuyHearts?: () => void;
  gameState?: GameState; // for badge progress hints
  sessionsSinceTokenDrop?: number;
  onTokenDropClaimed?: (amount: number) => void;
  nextNode?: PathNodeConfig | null;  // for "keep going" after warmup
  onKeepGoing?: () => void;
}

export default function QuizFullscreen({
  questions,
  currentIdx,
  selected,
  showExp,
  answers,
  onAnswer,
  onNext,
  onQuit,
  moduleName,
  sessionXP,
  completed,
  hearts: realHearts,
  maxHearts = 5,
  heartsRefillTime,
  xpBonusLabel,
  longestStreak = 0,
  currentStreak = 0,
  enneagramType = 5,
  instinct = "sp",
  onBuyHearts,
  gameState,
  sessionsSinceTokenDrop = 0,
  onTokenDropClaimed,
  nextNode,
  onKeepGoing,
}: Props) {
  const router = useRouter();
  const q = questions[currentIdx];

  // Stable shuffle of options per question — correct answer position is randomized
  // but stable across re-renders. We build a shuffledToOriginal map so the parent's
  // correctness check (which uses original indices) still works.
  const { shuffledOpts, shuffledAns, shuffledToOriginal } = useMemo(() => {
    if (!q) return { shuffledOpts: [] as string[], shuffledAns: 0, shuffledToOriginal: [] as number[] };
    const arr = [...q.opts];
    const indexMap = arr.map((_, i) => i);
    // Derive hash from question id for stable seeding
    let hash = 0;
    for (let k = 0; k < q.id.length; k++) {
      hash = ((hash << 5) - hash) + q.id.charCodeAt(k);
      hash |= 0;
    }
    const seededRandom = () => {
      hash = (hash * 1664525 + 1013904223) & 0xffffffff;
      return (hash >>> 0) / 0xffffffff;
    };
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      [indexMap[i], indexMap[j]] = [indexMap[j], indexMap[i]];
    }
    const newCorrectIndex = indexMap.indexOf(q.ans);
    return { shuffledOpts: arr, shuffledAns: newCorrectIndex, shuffledToOriginal: indexMap };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);

  // Track session start time; capture duration once on completion
  const sessionStartRef = useRef(Date.now());
  const [sessionDurationSecs, setSessionDurationSecs] = useState(0);

  const [tokenDrop, setTokenDrop] = useState<TokenDrop | null | undefined>(undefined);
  const [tokenDropRolled, setTokenDropRolled] = useState(false);

  // ── Mid-session momentum toast ─────────────────────────────────────────────
  const [momentumToast, setMomentumToast] = useState<string | null>(null);

  // Compute consecutive correct answers at the tail of the answers array
  const correctStreak = (() => {
    let count = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i]) count++;
      else break;
    }
    return count;
  })();

  // Fire toast when streak crosses a milestone AND we just got one right
  useEffect(() => {
    if (!showExp) return;
    const isLastCorrect = answers[answers.length - 1] === true;
    if (!isLastCorrect) return;

    let msg: string | null = null;
    if (correctStreak === 3) msg = "★ On fire! 3 in a row!";
    else if (correctStreak === 5) msg = "+ UNSTOPPABLE! 5 in a row!";
    else if (correctStreak === 10) msg = "★ LEGENDARY! 10 correct!";

    if (msg) {
      setMomentumToast(msg);
      const t = setTimeout(() => setMomentumToast(null), 2200);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers.length, showExp]);

  // ── XP flash on correct answer ───────────────────────────────────────────
  useEffect(() => {
    if (!showExp) return;
    const isLastCorrect = answers[answers.length - 1] === true;
    if (!isLastCorrect) return;
    xpFlashKey.current += 1;
    setXpFlash(true);
    const t = setTimeout(() => setXpFlash(false), 900);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers.length, showExp]);

  // ── Celebration state ──────────────────────────────────────────────────────
  const { confettiBurst, bigConfetti } = useRewards();
  const [countActive, setCountActive] = useState(false);
  const [countedCorrect, setCountedCorrect] = useState(0);
  const [countedPct, setCountedPct] = useState(0);
  const [countedXP, setCountedXP] = useState(0);
  const [showBestBanner, setShowBestBanner] = useState(false);
  const [showStreakBurst, setShowStreakBurst] = useState(false);
  const [celebrationText, setCelebrationText] = useState<string | null>(null);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showPerfectFlash, setShowPerfectFlash] = useState(false);

  // ── Running score counter + XP flash ───────────────────────────────────────
  const [xpFlash, setXpFlash] = useState(false);
  const xpFlashKey = useRef(0);

  // ── Countdown to next heart ────────────────────────────────────────────────
  const [nextHeartSecs, setNextHeartSecs] = useState<number | null>(null);
  useEffect(() => {
    if (!heartsRefillTime || realHearts === undefined || realHearts >= maxHearts) {
      setNextHeartSecs(null);
      return;
    }
    const REFILL_MS = 10 * 60 * 1000;
    const refillStart = new Date(heartsRefillTime).getTime();
    const calcSecs = () => {
      const elapsed = Date.now() - refillStart;
      const msIntoInterval = elapsed % REFILL_MS;
      return Math.max(0, Math.ceil((REFILL_MS - msIntoInterval) / 1000));
    };
    setNextHeartSecs(calcSecs());
    const interval = setInterval(() => {
      const secs = calcSecs();
      setNextHeartSecs(secs);
    }, 1000);
    return () => clearInterval(interval);
  }, [heartsRefillTime, realHearts, maxHearts]);

  // ── Trigger celebration animations when quiz completes ─────────────────────
  useEffect(() => {
    if (!completed) return;
    // Count-up duration
    const DURATION = 700;
    const steps = 30;
    const interval = DURATION / steps;

    const correctFinal = answers.filter(Boolean).length;
    const totalCount = questions.length;
    const pctFinal = totalCount > 0 ? Math.round((correctFinal / totalCount) * 100) : 0;
    const isPerfectFinal = correctFinal === totalCount;
    const beatBest = currentStreak > 0 && longestStreak > 0 && currentStreak >= longestStreak;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountedCorrect(Math.round(eased * correctFinal));
      setCountedPct(Math.round(eased * pctFinal));
      setCountedXP(Math.round(eased * sessionXP));
      if (step >= steps) {
        clearInterval(timer);
        setCountedCorrect(correctFinal);
        setCountedPct(pctFinal);
        setCountedXP(sessionXP);
        setCountActive(true);
        if (isPerfectFinal) {
          setShowPerfectFlash(true);
          setTimeout(() => setShowPerfectFlash(false), 2000);
        }
        // Tiered celebration based on accuracy
        if (pctFinal >= 80 || beatBest) {
          if (pctFinal >= 90) {
            bigConfetti();
          } else {
            confettiBurst();
          }
        } else if (pctFinal >= 60) {
          setShowSparkle(true);
          setTimeout(() => setShowSparkle(false), 2500);
        }
        if (pctFinal >= 90) {
          setCelebrationText("Amazing!");
        } else if (pctFinal >= 80) {
          setCelebrationText("Great job!");
        } else if (pctFinal >= 60) {
          setCelebrationText("Nice work!");
        } else {
          setCelebrationText("Keep practicing!");
        }
        if (beatBest) {
          setShowBestBanner(true);
          setTimeout(() => setShowBestBanner(false), 3500);
        }
        const streakMilestones = [3, 7, 14, 30, 100];
        if (streakMilestones.includes(currentStreak)) {
          setShowStreakBurst(true);
          setTimeout(() => setShowStreakBurst(false), 3000);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  // ── Roll token drop + capture duration exactly once on completion ─────────
  useEffect(() => {
    if (!completed || tokenDropRolled) return;
    setSessionDurationSecs(Math.round((Date.now() - sessionStartRef.current) / 1000));
    setTokenDropRolled(true);
    const drop = rollTokenDrop(sessionsSinceTokenDrop);
    setTokenDrop(drop ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (completed) {
    const correctCount = answers.filter(Boolean).length;
    const totalCount = questions.length;
    const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const isPerfect = correctCount === totalCount;
    const beatPersonalBest = currentStreak > 0 && longestStreak > 0 && currentStreak >= longestStreak;
    const nearBadges: BadgeProgress[] = gameState ? getBadgeProgress(gameState) : [];

    const streakMilestones = [3, 7, 14, 30, 100];
    const isStreakMilestone = streakMilestones.includes(currentStreak);

    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
        style={{
          maxWidth: 640,
          margin: "0 auto",
          background: pct >= 90
            ? "linear-gradient(180deg, rgba(251,191,36,0.08) 0%, #0f0a1e 50%)"
            : pct >= 80
            ? "linear-gradient(180deg, rgba(139,92,246,0.12) 0%, #0f0a1e 50%)"
            : "#0f0a1e",
        }}
      >
        {/* Sparkle overlay for 60-79% accuracy */}
        <AnimatePresence>
          {showSparkle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0.8],
                    x: Math.cos((i / 12) * Math.PI * 2) * 120,
                    y: Math.sin((i / 12) * Math.PI * 2) * 120,
                  }}
                  transition={{ duration: 1.5, delay: i * 0.08, ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: i % 2 === 0 ? "#fbbf24" : "#8b5cf6" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Perfect flash overlay */}
        <AnimatePresence>
          {showPerfectFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none"
            >
              <div
                className="px-10 py-6 rounded-3xl text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.95), rgba(217,70,239,0.95))",
                  boxShadow: "0 0 80px rgba(139,92,246,0.6), 0 0 160px rgba(217,70,239,0.3)",
                }}
              >
                <div className="text-4xl mb-2">✦</div>
                <p className="text-white font-black text-3xl tracking-wide">PERFECT!</p>
                <p className="text-white/70 text-sm mt-1">100% correct</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEW BEST banner */}
        <AnimatePresence>
          {showBestBanner && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 300 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 rounded-2xl font-black text-white text-lg shadow-xl"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 8px 32px rgba(139,92,246,0.5)" }}
            >
              ★ NEW PERSONAL BEST! ★
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streak milestone burst */}
        <AnimatePresence>
          {showStreakBurst && isStreakMilestone && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 14, stiffness: 260 }}
              className="fixed inset-0 z-[65] flex items-center justify-center pointer-events-none"
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ rotate: [-8, 8, -8, 8, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="text-7xl"
                >
                  ★
                </motion.div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-black text-orange-500"
                  style={{ textShadow: "0 2px 16px rgba(245,158,11,0.5)" }}
                >
                  {currentStreak}-day streak!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base font-semibold text-orange-400"
                >
                  Keep the fire burning ★
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex flex-col items-center text-center w-full max-w-xs"
        >
          {/* Trophy */}
          <div className="relative mb-6">
            <motion.div
              animate={isPerfect ? {
                boxShadow: [
                  "0 0 0px rgba(251,191,36,0)",
                  "0 0 32px rgba(251,191,36,0.8)",
                  "0 0 16px rgba(251,191,36,0.4)",
                ],
              } : {}}
              transition={{ duration: 1.2, repeat: 2, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: pct >= 90 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : pct >= 80 ? "linear-gradient(135deg, #8b5cf6, #d946ef)" : pct >= 60 ? "linear-gradient(135deg, #6366f1, #818cf8)" : "linear-gradient(135deg, #94a3b8, #cbd5e1)" }}
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            {beatPersonalBest && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shadow-lg"
              >
                <Star className="w-5 h-5 text-white fill-white" />
              </motion.div>
            )}
          </div>

          <motion.h2
            animate={pct >= 80 ? { scale: [1, 1.08, 1] } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold mb-2"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            {celebrationText ?? "Complete!"}
          </motion.h2>
          <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>{moduleName}</p>

          {/* Score row — count-up numbers */}
          <div className="flex items-center gap-6 mb-5">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>
                {countActive ? correctCount : countedCorrect}
                <span className="text-2xl" style={{ color: "rgba(255,255,255,0.35)" }}>/{totalCount}</span>
              </span>
              <span className="text-xs mt-1 uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>Correct</span>
            </div>
            <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-400">
                {countActive ? pct : countedPct}<span className="text-2xl">%</span>
              </span>
              <span className="text-xs mt-1 uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>Accuracy</span>
            </div>
            {sessionXP > 0 && (
              <>
                <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.1)" }} />
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-violet-400">
                    +{countActive ? sessionXP : countedXP}
                  </span>
                  <span className="text-xs mt-1 uppercase tracking-wide flex items-center gap-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <Zap className="w-3 h-3" />XP
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Self-competition badge */}
          {longestStreak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full px-4 py-2.5 rounded-xl mb-5 flex items-center gap-2"
              style={beatPersonalBest ? { background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" } : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Star className={`w-4 h-4 shrink-0 ${beatPersonalBest ? "text-amber-400 fill-amber-400" : "text-white/20"}`} />
              <span className={`text-sm font-medium ${beatPersonalBest ? "text-amber-300" : "text-white/40"}`}>
                {beatPersonalBest
                  ? `New personal best! ${currentStreak}-day streak :)`
                  : `Personal best: ${longestStreak}-day streak. Keep going!`}
              </span>
            </motion.div>
          )}

          {/* Nearby badge progress hints */}
          {nearBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="w-full mb-5 px-4 py-3.5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col gap-3">
                {nearBadges.slice(0, 2).map((badge, i) => {
                  const remaining = badge.target - badge.current;
                  return (
                    <div key={badge.id} className="flex items-start gap-2.5">
                      <span className="text-lg shrink-0 mt-0.5">{badge.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-snug mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                          <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>{remaining}</span>
                          {" "}more {badge.label.includes("day") ? "days" : badge.label.includes("row") ? "in a row" : "correct answers"} for{" "}
                          <span className="font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>&lsquo;{badge.name}&rsquo;</span> badge {badge.icon}
                        </p>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${badge.pct}%` }}
                            transition={{ delay: 1.0 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Keep Going card — only after warmup, only if there's a next node */}
          {moduleName === "Warm-Up" && nextNode && onKeepGoing ? (
            <KeepGoingCard
              nextNode={nextNode}
              onKeepGoing={onKeepGoing}
              onSkip={onQuit}
              sessionDurationSecs={sessionDurationSecs}
              correctCount={answers.filter(Boolean).length}
              totalCount={questions.length}
            />
          ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onQuit}
            className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", boxShadow: "0 4px 20px rgba(139,92,246,0.4)" }}
          >
            Back to Path <ArrowRight className="w-5 h-5" />
          </motion.button>
          )}
        </motion.div>

        <TokenDropOverlay
          drop={tokenDrop ?? null}
          onClaim={(amount) => {
            setTokenDrop(null);
            onTokenDropClaimed?.(amount);
          }}
        />
      </div>
    );
  }

  if (!q) return null;

  const isCorrect = selected === q.ans;

  // Hearts: use real game-state hearts if provided, else cosmetic session hearts
  const displayHearts = realHearts !== undefined ? realHearts : Math.max(0, 3 - answers.filter(a => !a).length);
  const heartsTotal = realHearts !== undefined ? maxHearts : 3;

  const progress = Math.round(((currentIdx) / questions.length) * 100);
  const diffLabel = q.tier <= 2 ? "Recall" : q.tier === 3 ? "Application" : "Analysis";
  const optionLetters = ["A", "B", "C", "D"];

  // Chibi state based on last answer
  const chibiState: ChibiState = selected !== null ? (isCorrect ? "happy" : "hurt") : "idle";

  // ── Out of hearts screen ───────────────────────────────────────────────────
  if (realHearts === 0) {
    const fmtCountdown = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${String(s).padStart(2, "0")}`;
    };

    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6" style={{ maxWidth: 640, margin: "0 auto", background: "#0f0a1e" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="flex flex-col items-center text-center w-full max-w-xs"
        >
          {/* Hearts row */}
          <div className="flex gap-1.5 mb-4">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <Heart key={i} className="w-6 h-6 text-white/10 fill-white/10" />
            ))}
          </div>

          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(239,68,68,0.12)" }}>
            <Heart className="w-10 h-10 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.93)" }}>Out of Hearts</h2>

          {/* Countdown timer */}
          {nextHeartSecs !== null && (
            <div className="flex items-center gap-2 rounded-2xl px-5 py-3 mb-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
              <Timer className="w-4 h-4 text-rose-400 shrink-0" />
              <p className="text-sm font-semibold text-rose-300">
                Next heart in{" "}
                <span className="font-mono text-rose-200">{fmtCountdown(nextHeartSecs)}</span>
              </p>
            </div>
          )}

          <p className="text-sm mb-6 max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Hearts refill 1 every 10 minutes. You can browse your curriculum path while you wait — hearts refill in the background!
          </p>

          <div className="flex flex-col gap-3 w-full">
            {/* Go Read CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { onQuit(); router.push("/daily"); }}
              className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}
            >
              <BookOpen className="w-5 h-5" />
              Back to Learn
            </motion.button>

            {/* Buy with tokens */}
            {onBuyHearts && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onBuyHearts}
                className="w-full py-3.5 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition"
                style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#fcd34d" }}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Refill with 20 tokens
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onQuit}
              className="w-full py-3 rounded-2xl font-medium text-sm transition"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}
            >
              Come back later
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main quiz screen ───────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden" style={{ maxWidth: 640, margin: "0 auto", background: "#0f0a1e" }}>
      {/* ── Aurora glow orbs ── */}
      <motion.div className="absolute top-[-80px] left-[-60px] w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }} animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.06, 0.12] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[-60px] right-[-40px] w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

      {/* ── XP Bonus flash ── */}
      <AnimatePresence>
        {xpBonusLabel && (
          <motion.div
            key={xpBonusLabel}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-16 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-white font-bold text-sm shadow-lg shadow-amber-200 pointer-events-none"
          >
            <Zap className="w-4 h-4 fill-white" />
            {xpBonusLabel.replace("daily-quiz ", "")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar: X | progress | hearts ── */}
      <div className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3">
        <button
          onClick={onQuit}
          className="w-8 h-8 rounded-full flex items-center justify-center transition shrink-0"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <X className="w-4 h-4" style={{ color: "rgba(255,255,255,0.5)" }} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-y-0 w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          </motion.div>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: Math.min(heartsTotal, 5) }).map((_, i) => (
            <motion.div
              key={i}
              animate={i === displayHearts && selected !== null && !isCorrect ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${i < displayHearts ? "text-rose-400 fill-rose-400" : "text-white/15 fill-white/10"}`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Running score counter ── */}
      <div className="flex items-center justify-center gap-2 pb-1">
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{answers.filter(Boolean).length}</span>
          /{answers.length} correct
        </span>
        <AnimatePresence>
          {xpFlash && (
            <motion.span
              key={xpFlashKey.current}
              initial={{ opacity: 0, y: 4, scale: 0.8 }}
              animate={{ opacity: 1, y: -2, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xs font-bold text-amber-500 flex items-center gap-0.5"
            >
              <Zap className="w-3 h-3" />+XP
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-2">

        {/* Module + difficulty + XP */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)" }}>{moduleName}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className={`text-xs font-medium ${
            q.tier <= 2 ? "text-emerald-500" : q.tier === 3 ? "text-amber-500" : "text-rose-500"
          }`}>{diffLabel}</span>
          {sessionXP > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                <Zap className="w-3 h-3" />+{sessionXP}
              </span>
            </>
          )}
        </div>

        {/* Chibi + Question row */}
        <div className="flex items-start gap-3 mb-6">
          {/* Chibi sprite (small, left-aligned) */}
          <div className="shrink-0 mt-1">
            <ChibiSprite
              type={enneagramType}
              instinct={instinct}
              size={52}
              state={chibiState}
            />
          </div>

          {/* Question bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-base font-bold leading-snug" style={{ color: "rgba(255,255,255,0.93)" }}>
                {q.q}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Answer options */}
        <div className="space-y-3">
          {shuffledOpts.map((opt, i) => {
            // selected is the original index (passed back from parent); convert to visual position
            const visualSelected = selected !== null ? shuffledToOriginal.indexOf(selected) : null;
            const isThisSelected = i === visualSelected;
            const isThisCorrect = i === shuffledAns;
            const revealed = selected !== null;

            let optStyle: React.CSSProperties = { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.92)" };
            let letterStyle: React.CSSProperties = { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" };

            if (revealed) {
              if (isThisCorrect) {
                optStyle = { background: "rgba(16,185,129,0.12)", borderColor: "rgba(52,211,153,0.5)", color: "rgba(167,243,208,0.95)" };
                letterStyle = { background: "rgba(16,185,129,0.8)", color: "#fff" };
              } else if (isThisSelected && !isThisCorrect) {
                optStyle = { background: "rgba(239,68,68,0.1)", borderColor: "rgba(248,113,113,0.5)", color: "rgba(252,165,165,0.95)" };
                letterStyle = { background: "rgba(239,68,68,0.8)", color: "#fff" };
              }
            } else if (isThisSelected) {
              optStyle = { background: "rgba(139,92,246,0.15)", borderColor: "rgba(167,139,250,0.6)", color: "rgba(216,180,254,0.95)" };
              letterStyle = { background: "rgba(139,92,246,0.8)", color: "#fff" };
            }

            return (
              <motion.button
                key={i}
                whileTap={!revealed ? { scale: 0.98 } : {}}
                onClick={() => !revealed && onAnswer(shuffledToOriginal[i] ?? i)}
                disabled={revealed}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all"
                style={optStyle}
              >
                <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all" style={letterStyle}>
                  {optionLetters[i]}
                </span>
                <span className="text-sm font-medium leading-snug">{opt}</span>
                {revealed && isThisCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                )}
                {revealed && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Momentum toast ── */}
      <AnimatePresence>
        {momentumToast && (
          <motion.div
            key={momentumToast}
            initial={{ y: -60, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 14, stiffness: 280 }}
            className="fixed top-20 left-0 right-0 flex justify-center z-[70] pointer-events-none"
          >
            <div
              className="px-6 py-3 rounded-2xl font-black text-white text-lg shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                boxShadow: "0 0 40px rgba(245,158,11,0.6), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {momentumToast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom feedback sheet ── */}
      <AnimatePresence>
        {showExp && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="px-5 pt-5 pb-safe pb-8 border-t-2"
            style={isCorrect ? { background: "rgba(16,185,129,0.1)", borderColor: "rgba(52,211,153,0.3)" } : { background: "rgba(239,68,68,0.08)", borderColor: "rgba(248,113,113,0.3)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect
                ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                : <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              <span className={`font-bold text-base ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
                {isCorrect ? "Correct!" : "Not quite."}
              </span>
              {!isCorrect && displayHearts > 0 && (
                <span className="ml-auto text-xs text-rose-400 font-medium flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-400" />{displayHearts} left
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>{q.exp}</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base ${
                isCorrect
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-rose-500 hover:bg-rose-600"
              } transition-colors`}
            >
              {currentIdx + 1 >= questions.length ? "See Results" : "Continue"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
