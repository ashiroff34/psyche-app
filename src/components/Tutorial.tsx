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
  const [expanded, setExpanded] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const slide = SLIDES[idx];
  const isFirst = idx === 0;
  const isLast = idx === SLIDES.length - 1;

  const next = () => {
    if (isLast) onClose();
    else { setDir(1); setIdx(i => i + 1); setExpanded(false); }
  };
  const prev = () => {
    if (!isFirst) { setDir(-1); setIdx(i => i - 1); setExpanded(false); }
  };

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
    <>
      {/* Dim backdrop */}
      <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

      {/* Bottom sheet */}
      <motion.div
        className="fixed bottom-0 inset-x-0 z-[9999] bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
              <OuroborosLogo size={13} />
            </div>
            <span className="text-sm font-bold text-slate-800">App Tour</span>
            <span className="text-xs text-slate-400">{idx + 1} / {SLIDES.length}</span>
          </div>
          <button onClick={onClose} aria-label="Close tour" className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Slide visual + info ── */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="flex flex-col items-center px-5 pt-2"
          >
            {/* Phone mockup or chibi for no-screenshot slides */}
            {slide.screenshot ? (
              <div
                className="relative rounded-[18px] overflow-hidden border-[4px] border-slate-800 shadow-2xl bg-white mx-auto mb-4"
                style={{ width: 160, height: 215 }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-800 rounded-b-xl z-10" />
                <Image
                  src={slide.screenshot}
                  alt={slide.title}
                  width={160}
                  height={346}
                  className="w-full object-top"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  unoptimized
                  priority
                />
              </div>
            ) : (
              <div className="flex items-center justify-center mb-4" style={{ height: 130 }}>
                <Image
                  src={slide.chibi}
                  alt="Guide"
                  width={110}
                  height={110}
                  className="object-contain drop-shadow-lg"
                  unoptimized
                />
              </div>
            )}

            {/* Chibi + title row */}
            <div className="flex items-center gap-3 w-full mb-1">
              <div className="w-9 h-9 rounded-full bg-white border-2 border-indigo-100 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image src={slide.chibi} alt="" width={26} height={26} className="object-contain" unoptimized />
              </div>
              <p className="text-[15px] font-bold text-slate-900 leading-tight flex-1">{slide.title}</p>
            </div>

            {/* Expandable details */}
            <div className="w-full">
              <button
                onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 py-1.5 hover:text-indigo-700 transition-colors"
              >
                <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.span>
                {expanded ? "Less info" : "See details"}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-2 space-y-2">
                      <p className="text-[13px] text-slate-500 leading-relaxed">{slide.what}</p>
                      {slide.howToGet && (
                        <div className="flex items-start gap-1.5 bg-indigo-50 rounded-xl px-3 py-2">
                          <Hand className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <p className="text-[12px] text-indigo-600 leading-snug">{slide.howToGet}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 pt-2 pb-2 flex-shrink-0">
          {SLIDES.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${
              i === idx ? "w-5 h-1.5 bg-indigo-500" : i < idx ? "w-1.5 h-1.5 bg-indigo-300" : "w-1.5 h-1.5 bg-slate-200"
            }`} />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between px-5 pb-8 pt-1 flex-shrink-0">
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
            {isLast ? <><Sparkles className="w-4 h-4" /> Let's go!</> : <>Next <ChevronRight className="w-4 h-4" /></>}
          </button>
        </div>

        {/* Skip toast */}
        {skipToast && (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-center">
            <div className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-medium shadow-lg">
              Replay anytime from ··· Explore menu
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export function TutorialReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all">
      <RotateCcw className="w-4 h-4" /> Replay Tutorial
    </button>
  );
}
