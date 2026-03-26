"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, RotateCcw, X, Hand, Home, Flame, Cat, Coins, Trophy, UserCircle, MoreHorizontal } from "lucide-react";
import OuroborosLogo from "@/components/OuroborosLogo";
import Image from "next/image";

import { assetPath } from "@/lib/assetPath";

const CB = assetPath("/sprites/chibi");
const SS = assetPath("/tutorial");

/* ═══════════════════════════════════════════════════════════════════════════
   SLIDE DATA — each slide matches its screenshot exactly
   ═══════════════════════════════════════════════════════════════════════════ */

interface Slide {
  title: string;
  what: string;
  howToGet: string;
  screenshot: string;
  chibi: string;
  /** Which bottom tab to highlight (0-4), or "explore" for the top-right menu */
  highlightTab?: number | "explore";
}

const SLIDES: Slide[] = [
  {
    title: "Let's take a quick tour",
    what: "Before you dive in, let me show you around the app. This only takes about 2 minutes and will help you get the most out of Thyself.",
    howToGet: "Just tap Continue to walk through each feature. You can replay this anytime from the Explore menu.",
    screenshot: "",
    chibi: `${CB}/5-so5.png`,
  },
  {
    title: "Ready to know yourself?",
    what: "Thyself combines the Enneagram and Jungian Cognitive Functions into one app — with quizzes, a virtual pet, and daily growth challenges. Think Duolingo, but for personality.",
    howToGet: "This is the welcome screen — the first thing new users see. Tap 'I'm new here' to start your journey!",
    screenshot: `${SS}/welcome.jpg`,
    chibi: `${CB}/5-so5.png`,
  },
  {
    title: "This is your HQ",
    what: "Once you've set up, this becomes your home. Type badges, streak, tokens, XP, learning path, and daily practice — all in one glance.",
    howToGet: "Bottom bar → first icon on the left (house). You'll land here every time you open the app.",
    screenshot: `${SS}/home.jpg`,
    chibi: `${CB}/5-so5.png`,
    highlightTab: 0,
  },
  {
    title: "Your daily workout — for your mind",
    what: "Fresh quiz questions every day, matched to your level. Get them right? They get harder. Build a streak and watch your XP climb. Can you hit 7 days?",
    howToGet: "Bottom bar → second icon (flame). Or tap the purple 'Start Practice' card on your home screen.",
    screenshot: `${SS}/daily.jpg`,
    chibi: `${CB}/4-so4.png`,
    highlightTab: 1,
  },
  {
    title: "Say hi to your pet!",
    what: "Health, hunger, happiness — three bars to manage. Neglect it and it faints! Feed (10 tokens), play (5), or medicine (25). What will you name yours?",
    howToGet: "Bottom bar → middle icon (cat face). Your pet also peeks out on the Daily page.",
    screenshot: `${SS}/pet.jpg`,
    chibi: `${CB}/2-sp2.png`,
    highlightTab: 2,
  },
  {
    title: "Treat yourself (and your pet)",
    what: "Outfits, streak freezes, and cosmetics. You start with 50 free tokens — what will you buy first?",
    howToGet: "Bottom bar → fourth icon (coin with orange glow). Tokens come from quizzes, leveling up, and milestones.",
    screenshot: `${SS}/store.jpg`,
    chibi: `${CB}/3-sx3.png`,
    highlightTab: 3,
  },
  {
    title: "Your personality fingerprint",
    what: "Enneagram + cognitive stack + instinctual stacking = a combination unique to you. This page shows it all with personalized insights and links to go deeper.",
    howToGet: "Tap the Profile icon (person) — last icon on the right in the bottom bar. Auto-updates when you complete assessments.",
    screenshot: `${SS}/profile.jpg`,
    chibi: `${CB}/8-so8.png`,
    highlightTab: 4,
  },
  {
    title: "See how far you've come",
    what: "XP level, league rank (Bronze → Diamond), daily goal ring, and 26 collectible badges. Which one will you unlock first?",
    howToGet: "Tap ··· Explore → 'Progress & Badges'. Scroll down for your full badge collection and learning path.",
    screenshot: `${SS}/progress.jpg`,
    chibi: `${CB}/7-so7.png`,
    highlightTab: "explore",
  },
  {
    title: "What's your Enneagram type?",
    what: "There are 9 types — each driven by a different core fear and desire. Don't know yours yet? Pick a format and find out! The deep analysis is the most accurate.",
    howToGet: "Tap ··· Explore (top-right corner of any page) → tap 'Enneagram' → tap 'Take Assessment'. The home screen 'Your Path' also links here.",
    screenshot: `${SS}/assess-enneagram.jpg`,
    chibi: `${CB}/1-sp1.png`,
    highlightTab: "explore",
  },
  {
    title: "How does your mind actually work?",
    what: "Jung identified 8 cognitive functions — mental tools we all use in a specific order. This assessment finds YOUR order. Are you an Ni-dom? Ti-dom? Let's find out.",
    howToGet: "Tap ··· Explore → 'Cognitive Functions' → 'Take Assessment'. Best done after you know your Enneagram type.",
    screenshot: `${SS}/assess-cognitive.jpg`,
    chibi: `${CB}/6-so6.png`,
    highlightTab: "explore",
  },
  {
    title: "Go as deep as you want",
    what: "Every type has expandable sections — tap to reveal core fears, subtypes, growth paths, myth vs reality, and clinical frameworks. The more you explore, the more XP you earn.",
    howToGet: "Tap ··· Explore → 'Learn Enneagram' or 'Learn Cognitive'. Home screen cards like 'Explore your type in depth' also link here.",
    screenshot: `${SS}/learn.jpg`,
    chibi: `${CB}/6-so6.png`,
    highlightTab: "explore",
  },
  {
    title: "Where real growth happens",
    what: "Four powerful tools: Shadow Work, Dynamics Simulation, AI-powered Reframing, and Pattern Tracking. Ever wondered what your shadow functions look like? Find out here.",
    howToGet: "Tap ··· Explore → 'Inner Work'. The home screen 'Journal prompt waiting' card also takes you directly here.",
    screenshot: `${SS}/journal.jpg`,
    chibi: `${CB}/4-sx4.png`,
    highlightTab: "explore",
  },
  {
    title: "Understand any relationship",
    what: "Pick your type and someone else's — see communication patterns, friction points, and growth tips. This is for self-understanding only — it doesn't determine what you should or shouldn't do in relationships.",
    howToGet: "Tap ··· Explore → 'Compare Types'. Great for partners, friends, coworkers, or family.",
    screenshot: `${SS}/compare.jpg`,
    chibi: `${CB}/9-sp9.png`,
    highlightTab: "explore",
  },
  {
    title: "Your journey starts now!",
    what: "Step 1: Take an assessment. Step 2: Come back tomorrow for your first daily practice. Step 3: Don't forget to feed your pet! Ready?",
    howToGet: "Want to see this tour again? Tap ··· Explore → scroll down → 'Replay Tutorial'. Now go discover your type!",
    screenshot: "",
    chibi: `${CB}/5-so5.png`,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HOOK
   ═══════════════════════════════════════════════════════════════════════════ */

const SK = "psyche-tutorial-complete";
const AK = "psyche-tutorial-active";

export function useTutorial() {
  const [isActive, setIsActive] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(true);
  useEffect(() => {
    const completed = localStorage.getItem(SK) === "true";
    setHasCompleted(completed);
    // Only restore active state if tutorial wasn't already completed
    if (!completed && localStorage.getItem(AK) === "true") setIsActive(true);
    // Clean up stale active flag if tutorial is already complete
    if (completed) localStorage.removeItem(AK);
  }, []);
  const startTutorial = useCallback(() => { setIsActive(true); localStorage.setItem(AK, "true"); }, []);
  const endTutorial = useCallback(() => { setIsActive(false); setHasCompleted(true); localStorage.setItem(SK, "true"); localStorage.removeItem(AK); }, []);
  return { isActive, hasCompleted, startTutorial, endTutorial };
}

/* ═══════════════════════════════════════════════════════════════════════════
   OVERLAY
   ═══════════════════════════════════════════════════════════════════════════ */

export default function TutorialOverlay({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [skipToast, setSkipToast] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const slide = SLIDES[idx];
  const isFirst = idx === 0;
  const isLast = idx === SLIDES.length - 1;

  const next = () => { if (isLast) onClose(); else { setDir(1); setIdx(i => i + 1); } };
  const prev = () => { if (!isFirst) { setDir(-1); setIdx(i => i - 1); } };

  const handleSkip = () => {
    setSkipToast(true);
    setTimeout(() => {
      setSkipToast(false);
      onClose();
    }, 1800);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else prev();
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 overflow-hidden">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <OuroborosLogo size={14} />
          </div>
          <span className="text-white font-semibold text-sm">App Tour</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSkip} className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-all">Skip Tutorial</button>
          <span className="text-white/50 text-[11px]">{idx + 1} / {SLIDES.length}</span>
          <button onClick={onClose} className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/20 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Skip toast ── */}
      {skipToast && (
        <div className="absolute top-16 left-4 right-4 z-[10000] flex items-center justify-center">
          <div className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-medium shadow-lg">
            You can replay the tutorial anytime from the Explore menu
          </div>
        </div>
      )}

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="px-4 py-4 flex flex-col items-center gap-3"
          >
            {/* Title */}
            <h2 className="text-xl font-serif font-bold text-slate-900 text-center">{slide.title}</h2>

            {/* Phone mockup OR large chibi for final slide */}
            <div className="relative flex-shrink-0">
              {slide.screenshot ? (
                <div className="relative w-[190px] rounded-[1.4rem] overflow-hidden border-[5px] border-slate-800 shadow-xl shadow-slate-300/50 bg-white mx-auto">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-slate-800 rounded-b-xl z-10" />
                  <Image
                    src={slide.screenshot}
                    alt={slide.title}
                    width={190}
                    height={411}
                    className="w-full h-auto"
                    unoptimized
                    priority
                  />
                </div>
              ) : (
                <div className="w-[160px] h-[160px] mx-auto flex items-center justify-center">
                  <Image
                    src={slide.chibi}
                    alt="Guide"
                    width={140}
                    height={140}
                    className="object-contain drop-shadow-lg"
                    unoptimized
                  />
                </div>
              )}

              {/* No arrows — tab bar mockup shown below phone instead */}
            </div>

            {/* ── Navigation mockup — matches the real app exactly ── */}
            {slide.highlightTab !== undefined && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-[300px] space-y-1.5"
              >
                {/* Top bar: Ψ Thyself ... Explore */}
                <div className="flex items-center justify-between py-1.5 px-3 bg-white/90 backdrop-blur rounded-xl border border-slate-200 shadow-sm">
                  <div className={`flex items-center gap-1.5 ${slide.highlightTab !== "explore" ? "opacity-50" : ""}`}>
                    <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
                      <OuroborosLogo size={10} />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Thyself</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${
                    slide.highlightTab === "explore"
                      ? "bg-indigo-100 ring-2 ring-indigo-400 text-indigo-600 font-bold scale-105"
                      : "text-slate-400 opacity-50"
                  }`}>
                    <MoreHorizontal className="w-3 h-3" />
                    <span>Explore</span>
                  </div>
                </div>

                {/* Bottom tab bar */}
                <div className="flex items-center justify-around py-1.5 px-2 bg-white/95 backdrop-blur rounded-xl border border-slate-200 shadow-sm">
                  {([
                    { Icon: Home, label: "Home" },
                    { Icon: Flame, label: "Daily" },
                    { Icon: Cat, label: "Pet" },
                    { Icon: Coins, label: "Store" },
                    { Icon: UserCircle, label: "Profile" },
                  ] as const).map((tab, i) => {
                    const active = slide.highlightTab === i;
                    const TabIcon = tab.Icon;
                    return (
                      <div key={i} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
                        active ? "bg-indigo-50 ring-2 ring-indigo-400 scale-110" : "opacity-35"
                      }`}>
                        <TabIcon className={`w-4 h-4 ${active ? "text-indigo-600" : "text-slate-400"}`} />
                        <span className={`text-[8px] font-semibold ${active ? "text-indigo-600" : "text-slate-400"}`}>{tab.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Chibi guide — contextual message */}
            <div className="flex items-center gap-2 w-full max-w-sm">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-200 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image src={slide.chibi} alt="" width={28} height={28} className="object-contain" unoptimized />
              </div>
              <div className="flex-1 bg-indigo-50 rounded-2xl rounded-bl-sm px-3 py-2">
                <p className="text-[11px] text-indigo-600 font-medium leading-snug">
                  {slide.highlightTab === "explore"
                    ? `This is the ${slide.title} page — find it in the ··· Explore menu!`
                    : slide.highlightTab !== undefined
                    ? `Tap the highlighted tab below to get here!`
                    : `Let me show you around!`
                  }
                </p>
              </div>
            </div>

            {/* ── Info blurbs ── */}
            <div className="w-full max-w-sm space-y-2">
              {/* What is this */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">What is this?</p>
                <p className="text-[13px] text-slate-600 leading-relaxed">{slide.what}</p>
              </div>

              {/* How to get there — with hand/pointer icon */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/60">
                <div className="flex items-center gap-1.5 mb-1">
                  <Hand className="w-3.5 h-3.5 text-sky-500" />
                  <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">How to get here</p>
                </div>
                <p className="text-[13px] text-slate-700 leading-relaxed">{slide.howToGet}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom nav ── */}
      <div className="flex-shrink-0 px-5 pb-5 pt-2 bg-white/80 backdrop-blur-sm border-t border-slate-100">
        <div className="flex justify-center gap-1 mb-3">
          {SLIDES.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${
              i === idx ? "w-5 h-1.5 bg-indigo-500" : i < idx ? "w-1.5 h-1.5 bg-indigo-300" : "w-1.5 h-1.5 bg-slate-200"
            }`} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          {!isFirst ? (
            <button onClick={prev} className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all active:scale-95">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-500 transition-all">
              Skip
            </button>
          )}
          <button
            onClick={next}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg shadow-indigo-200/50 hover:shadow-xl transition-all active:scale-95"
          >
            {isLast ? <><Sparkles className="w-4 h-4" /> Get Started</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TutorialReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all">
      <RotateCcw className="w-4 h-4" /> Replay Tutorial
    </button>
  );
}
