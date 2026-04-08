"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Trophy, Share2, ChevronRight, Star } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12",
  4: "#9B59B6", 5: "#2980B9", 6: "#27AE60",
  7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer", 2: "The Helper", 3: "The Achiever",
  4: "The Individualist", 5: "The Investigator", 6: "The Loyalist",
  7: "The Enthusiast", 8: "The Challenger", 9: "The Peacemaker",
};

const TYPE_TAGLINES: Record<number, string> = {
  1: "Principled. Purposeful. Self-controlled.",
  2: "Caring. Interpersonal. Generous.",
  3: "Success-oriented. Adaptable. Driven.",
  4: "Expressive. Dramatic. Self-absorbed.",
  5: "Perceptive. Innovative. Secretive.",
  6: "Engaging. Responsible. Anxious.",
  7: "Spontaneous. Versatile. Scattered.",
  8: "Self-confident. Decisive. Willful.",
  9: "Receptive. Reassuring. Agreeable.",
};

const SLIDE_ACCENT_COLORS = [
  "#7C3AED", // slide 1. purple
  "#E74C3C", // slide 2. type (overridden dynamically)
  "#F39C12", // slide 3. amber
  "#27AE60", // slide 4. green
  "#2980B9", // slide 5. blue
  "#1ABC9C", // slide 6. teal
];

const UPCOMING_ARC = {
  title: "The 9→3 Arc",
  subtitle: "From Peace to Purpose",
  teaser: "The 9's capacity for harmony meets the 3's drive for achievement. Discover that being seen is its own serenity.",
  theme: { from: "#95A5A6", to: "#F39C12" },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArcProgress {
  arcId: string;
  startDate: string;
  completedDays: number[];
  currentDay: number;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedAt?: string;
}

interface WrappedData {
  displayName: string;
  enneagramType: number;
  instinctualStacking: string;
  totalTokensEarned: number;
  streakCount: number;
  assessmentCount: number;
  shareCount: number;
  arcProgress: ArcProgress | null;
  badges: Badge[];
  monthLabel: string;
}

// ─── Data Loading ─────────────────────────────────────────────────────────────

function loadWrappedData(): WrappedData {
  const now = new Date();
  const monthLabel = now.toLocaleString("default", { month: "long", year: "numeric" });

  let displayName = "Explorer";
  let enneagramType = 0;
  let instinctualStacking = "";
  let assessmentCount = 0;

  try {
    const profileRaw = localStorage.getItem("psyche-profile");
    if (profileRaw) {
      const profile = JSON.parse(profileRaw);
      if (profile.displayName) displayName = profile.displayName;
      if (profile.enneagramType) enneagramType = profile.enneagramType;
      if (profile.instinctualStacking) instinctualStacking = profile.instinctualStacking;
      if (Array.isArray(profile.assessmentHistory)) {
        assessmentCount = profile.assessmentHistory.length;
      }
    }
  } catch {}

  let totalTokensEarned = 0;
  let streakCount = 0;
  let badges: Badge[] = [];

  try {
    const gameRaw = localStorage.getItem("psyche-game-state");
    if (gameRaw) {
      const game = JSON.parse(gameRaw);
      totalTokensEarned = game.totalTokensEarned ?? game.tokens ?? 0;
      streakCount = game.streakCount ?? 0;
      if (Array.isArray(game.badges)) {
        badges = game.badges.slice(0, 6); // cap display at 6
      }
    }
  } catch {}

  let arcProgress: ArcProgress | null = null;
  try {
    const arcRaw = localStorage.getItem("psyche-arc-progress");
    if (arcRaw) arcProgress = JSON.parse(arcRaw) as ArcProgress;
  } catch {}

  let shareCount = 0;
  try {
    shareCount = parseInt(localStorage.getItem("psyche-referral-share-count") ?? "0", 10);
  } catch {}

  return {
    displayName,
    enneagramType,
    instinctualStacking,
    totalTokensEarned,
    streakCount,
    assessmentCount,
    shareCount,
    arcProgress,
    badges,
    monthLabel,
  };
}

// ─── Slide Components ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.55, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

// Slide 1. Welcome Back
function SlideWelcome({ data }: { data: WrappedData }) {
  const typeColor = data.enneagramType ? TYPE_COLORS[data.enneagramType] : "#7C3AED";
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-6">
      <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show">
        <div
          className="text-xs font-semibold uppercase tracking-[0.25em] mb-2"
          style={{ color: typeColor }}
        >
          thyself
        </div>
        <h1 className="text-4xl font-extrabold text-white leading-tight">
          Your {data.monthLabel}
          <br />
          <span style={{ color: typeColor }}>in Thyself</span>
        </h1>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
        <p className="text-white/60 text-lg">
          Hey, <span className="text-white font-semibold">{data.displayName}</span>.
        </p>
        <p className="text-white/40 text-sm mt-1">Here&apos;s how you showed up this month.</p>
      </motion.div>

      {data.enneagramType > 0 && (
        <motion.div variants={scaleIn} initial="hidden" animate="show" className="mt-2">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center font-black text-6xl"
            style={{
              background: `radial-gradient(circle at 40% 35%, ${typeColor}44, ${typeColor}22)`,
              border: `2px solid ${typeColor}66`,
              color: typeColor,
              boxShadow: `0 0 48px ${typeColor}55`,
            }}
          >
            {data.enneagramType}
          </div>
        </motion.div>
      )}

      <motion.div
        variants={fadeUp}
        custom={3}
        initial="hidden"
        animate="show"
        className="text-white/30 text-sm flex items-center gap-1"
      >
        Tap anywhere to continue <ChevronRight size={14} />
      </motion.div>
    </div>
  );
}

// Slide 2. Your Type
function SlideType({ data }: { data: WrappedData }) {
  const type = data.enneagramType || 4;
  const typeColor = TYPE_COLORS[type];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-5">
      <motion.p
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="text-white/40 text-sm uppercase tracking-widest"
      >
        This is you.
      </motion.p>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="show"
        style={{
          color: typeColor,
          textShadow: `0 0 60px ${typeColor}99, 0 0 120px ${typeColor}55`,
          fontSize: "clamp(5rem, 25vw, 9rem)",
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {type}
      </motion.div>

      <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
        <div className="text-2xl font-bold text-white">{TYPE_NAMES[type]}</div>
        <div className="text-white/50 text-sm mt-1">{TYPE_TAGLINES[type]}</div>
        {data.instinctualStacking && (
          <div
            className="text-xs mt-2 px-3 py-1 rounded-full inline-block font-mono"
            style={{ background: `${typeColor}22`, color: typeColor }}
          >
            {data.instinctualStacking}
          </div>
        )}
      </motion.div>

      {!imgError ? (
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="w-28 h-28"
        >
          <img
            src={assetPath(`/sprites/chibi/${type}-sp${type}.png`)}
            alt={`Type ${type} chibi`}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        </motion.div>
      ) : (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-black"
          style={{
            background: `${typeColor}22`,
            border: `2px solid ${typeColor}55`,
            color: typeColor,
          }}
        >
          {type}
        </motion.div>
      )}
    </div>
  );
}

// Slide 3. Your Numbers
function SlideNumbers({ data }: { data: WrappedData }) {
  const stats = [
    { icon: <Flame size={22} />, label: "Day streak", value: data.streakCount, color: "#F39C12" },
    { icon: <Zap size={22} />, label: "Tokens earned", value: data.totalTokensEarned, color: "#1ABC9C" },
    { icon: <Star size={22} />, label: "Assessments taken", value: data.assessmentCount, color: "#9B59B6" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-6">
      <motion.h2
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="text-3xl font-extrabold text-white"
      >
        Your Numbers
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={0.5}
        initial="hidden"
        animate="show"
        className="text-white/40 text-sm -mt-3"
      >
        Every session adds up.
      </motion.p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={i + 1}
            initial="hidden"
            animate="show"
            className="flex items-center justify-between px-5 py-4 rounded-2xl"
            style={{
              background: `${stat.color}18`,
              border: `1px solid ${stat.color}44`,
            }}
          >
            <div className="flex items-center gap-3" style={{ color: stat.color }}>
              {stat.icon}
              <span className="text-white/70 text-sm font-medium">{stat.label}</span>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i + 1.5) * 0.18, type: "spring", stiffness: 300 }}
              className="text-2xl font-black"
              style={{ color: stat.color }}
            >
              {stat.value.toLocaleString()}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Slide 4. Your Growth
function SlideGrowth({ data }: { data: WrappedData }) {
  const arc = data.arcProgress;
  const daysCompleted = arc ? arc.completedDays.length : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-6">
      <motion.h2
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="text-3xl font-extrabold text-white"
      >
        Your Growth
      </motion.h2>

      {arc ? (
        <>
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="w-full max-w-xs"
          >
            <div
              className="rounded-2xl px-6 py-5"
              style={{
                background: "linear-gradient(135deg, #27AE6022, #1ABC9C22)",
                border: "1px solid #27AE6044",
              }}
            >
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Active Arc</div>
              <div className="text-white font-bold text-lg">{arc.arcId.replace(/-/g, " ").replace(/arc/i, "Arc")}</div>
              <div className="text-white/50 text-sm mt-1">{daysCompleted} / 30 days completed</div>

              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #27AE60, #1ABC9C)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round((daysCompleted / 30) * 100)}%` }}
                  transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                />
              </div>
              <div className="text-right text-xs text-white/30 mt-1">
                {Math.round((daysCompleted / 30) * 100)}%
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
          className="w-full max-w-xs"
        >
          <div
            className="rounded-2xl px-6 py-5 text-center"
            style={{
              background: "#27AE6011",
              border: "1px dashed #27AE6044",
            }}
          >
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-white font-semibold">No active arc yet</div>
            <div className="text-white/40 text-sm mt-1">
              Start a 30-day arc to build intentional growth habits.
            </div>
          </div>
        </motion.div>
      )}

      {data.badges.length > 0 && (
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="w-full max-w-xs"
        >
          <div className="text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
            <Trophy size={12} className="text-amber-400" /> Badges Earned
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {data.badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                style={{ background: "#F39C1222", border: "1px solid #F39C1244" }}
              >
                <span>{badge.icon}</span>
                <span className="text-white/70 text-xs">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {data.badges.length === 0 && (
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="text-white/30 text-sm"
        >
          Complete more sessions to earn badges.
        </motion.div>
      )}
    </div>
  );
}

// Slide 5. Your Shares
function SlideShares({ data }: { data: WrappedData }) {
  const count = data.shareCount;
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-6">
      <motion.div variants={scaleIn} initial="hidden" animate="show" className="text-6xl">
        {count > 0 ? "💌" : "🌐"}
      </motion.div>

      {count > 0 ? (
        <>
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
          >
            <div
              className="text-7xl font-black"
              style={{
                color: "#2980B9",
                textShadow: "0 0 60px #2980B966",
              }}
            >
              {count}
            </div>
            <div className="text-white/50 text-sm mt-1 uppercase tracking-widest">shares</div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="text-white/70 text-lg font-medium max-w-xs"
          >
            You helped{" "}
            <span className="text-white font-bold">{count} {count === 1 ? "person" : "people"}</span>{" "}
            discover themselves.
          </motion.p>
        </>
      ) : (
        <>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="text-2xl font-extrabold text-white"
          >
            Share your type
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="text-white/50 text-base max-w-xs"
          >
            Help others find theirs. Share Thyself and earn tokens when they sign up.
          </motion.p>
        </>
      )}
    </div>
  );
}

// Slide 6. What&apos;s Ahead
function SlideAhead({ data, onKeepExploring }: { data: WrappedData; onKeepExploring: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-6">
      <motion.p
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="text-white/40 text-xs uppercase tracking-widest"
      >
        What&apos;s ahead
      </motion.p>

      <motion.h2
        variants={fadeUp}
        custom={0.5}
        initial="hidden"
        animate="show"
        className="text-3xl font-extrabold text-white"
      >
        Next Month
      </motion.h2>

      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        animate="show"
        className="w-full max-w-xs rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${UPCOMING_ARC.theme.from}33, ${UPCOMING_ARC.theme.to}33)`,
          border: `1px solid ${UPCOMING_ARC.theme.to}44`,
        }}
      >
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${UPCOMING_ARC.theme.from}, ${UPCOMING_ARC.theme.to})`,
          }}
        />
        <div className="px-5 py-4 text-left">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: UPCOMING_ARC.theme.to }}
          >
            Coming Soon
          </div>
          <div className="text-white font-bold text-lg">{UPCOMING_ARC.title}</div>
          <div className="text-white/50 text-sm">{UPCOMING_ARC.subtitle}</div>
          <div className="text-white/40 text-xs mt-2 leading-relaxed">{UPCOMING_ARC.teaser}</div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={2}
        initial="hidden"
        animate="show"
        className="text-white/40 text-sm"
      >
        Your next unlock is just a few sessions away.
      </motion.div>

      <motion.button
        variants={fadeUp}
        custom={3}
        initial="hidden"
        animate="show"
        onClick={(e) => { e.stopPropagation(); onKeepExploring(); }}
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-base"
        style={{
          background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
          boxShadow: "0 0 32px #7C3AED55",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Keep exploring <ChevronRight size={18} />
      </motion.button>
    </div>
  );
}

// ─── Share Card ───────────────────────────────────────────────────────────────

function ShareCard({
  data,
  cardRef,
}: {
  data: WrappedData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const type = data.enneagramType || 4;
  const typeColor = TYPE_COLORS[type];

  return (
    <div
      ref={cardRef}
      style={{
        width: 400,
        background: "#0f0a1e",
        borderRadius: 24,
        padding: "32px 28px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        border: `1px solid ${typeColor}55`,
        boxShadow: `0 0 80px ${typeColor}33`,
        position: "absolute",
        left: -9999,
        top: -9999,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: `${typeColor}22`,
            border: `2px solid ${typeColor}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 900,
            color: typeColor,
          }}
        >
          {type}
        </div>
        <div>
          <div style={{ color: typeColor, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {data.monthLabel}
          </div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
            {data.displayName}&apos;s Thyself Wrapped
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Type", value: `${type} · ${TYPE_NAMES[type]}`, color: typeColor },
          { label: "Streak", value: `${data.streakCount} days`, color: "#F39C12" },
          { label: "Tokens Earned", value: data.totalTokensEarned.toLocaleString(), color: "#1ABC9C" },
          { label: "Assessments", value: String(data.assessmentCount), color: "#9B59B6" },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              borderRadius: 12,
              background: `${row.color}14`,
              border: `1px solid ${row.color}33`,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{row.label}</span>
            <span style={{ color: row.color, fontWeight: 700, fontSize: 15 }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        thyself.app
      </div>
    </div>
  );
}

// ─── Progress Dots ────────────────────────────────────────────────────────────

function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 20 : 6,
            opacity: i === current ? 1 : i < current ? 0.5 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          className="h-1.5 rounded-full bg-white"
          style={{ minWidth: 6 }}
        />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TOTAL_SLIDES = 6;

export default function WrappedPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState<WrappedData | null>(null);
  const [sharing, setSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareTokenToast, setShareTokenToast] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setData(loadWrappedData());
  }, []);

  const goNext = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  }, [currentSlide]);

  const handleContainerClick = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) goNext();
  }, [currentSlide, goNext]);

  const handleShare = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data || sharing) return;
    setSharing(true);

    try {
      const { toPng } = await import("html-to-image");
      if (cardRef.current) {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "thyself-wrapped.png", { type: "image/png" });

        const shareData: ShareData = {
          title: `My ${data.monthLabel} Thyself Wrapped`,
          text: `Type ${data.enneagramType} · ${data.streakCount}-day streak · ${data.totalTokensEarned} tokens. Discover your type at thyself.app`,
          files: [file],
        };

        let shared = false;
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          shared = true;
        } else if (navigator.share) {
          await navigator.share({ title: shareData.title, text: shareData.text });
          shared = true;
        } else {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "thyself-wrapped.png";
          a.click();
        }

        if (shared) {
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 2500);
          // Award tokens — verified by navigator.share() resolution
          try {
            const key = "psyche-share-verified-wrapped";
            const prev = localStorage.getItem(key);
            const eligible = !prev || Date.now() - JSON.parse(prev).lastAwardedAt > 24 * 60 * 60 * 1000;
            if (eligible) {
              const gs = JSON.parse(localStorage.getItem("psyche-game-state") || "{}");
              gs.tokens = (gs.tokens ?? 0) + 30;
              localStorage.setItem("psyche-game-state", JSON.stringify(gs));
              localStorage.setItem(key, JSON.stringify({ lastAwardedAt: Date.now() }));
              window.dispatchEvent(new CustomEvent("psyche-profile-change"));
              setShareTokenToast(30);
              setTimeout(() => setShareTokenToast(0), 2800);
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      const isAbort = err instanceof Error && (err.name === "AbortError" || err.message?.includes("cancel"));
      if (!isAbort) console.warn("Share failed:", err);
      // AbortError = user cancelled, no tokens
    } finally {
      setSharing(false);
    }
  }, [data, sharing]);

  if (!data) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "#0f0a1e" }}
      >
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-white/40 text-sm tracking-widest uppercase"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const typeColor = data.enneagramType ? TYPE_COLORS[data.enneagramType] : "#7C3AED";
  const slideAccent = currentSlide === 1 ? typeColor : SLIDE_ACCENT_COLORS[currentSlide];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const slideContent = [
    <SlideWelcome key="welcome" data={data} />,
    <SlideType key="type" data={data} />,
    <SlideNumbers key="numbers" data={data} />,
    <SlideGrowth key="growth" data={data} />,
    <SlideShares key="shares" data={data} />,
    <SlideAhead key="ahead" data={data} onKeepExploring={() => router.push("/daily")} />,
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col overflow-hidden select-none"
      style={{ background: "#0f0a1e" }}
      onClick={handleContainerClick}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${slideAccent}22 0%, transparent 65%)`,
        }}
      />

      {/* Header bar */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-12 pb-2">
        <button
          onClick={goPrev}
          className={`text-white/40 hover:text-white/70 transition-opacity ${currentSlide === 0 ? "opacity-0 pointer-events-none" : ""}`}
          aria-label="Previous slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <ProgressDots total={TOTAL_SLIDES} current={currentSlide} />
        <button
          onClick={(e) => { e.stopPropagation(); router.back(); }}
          className="text-white/30 hover:text-white/60 transition text-xs"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Slide area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {slideContent[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar. share button on last slide */}
      <div className="relative z-20 pb-10 px-6 flex flex-col items-center gap-2">
        {currentSlide === TOTAL_SLIDES - 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleShare}
              disabled={sharing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{
                background: shareSuccess
                  ? "linear-gradient(135deg, #27AE60, #1ABC9C)"
                  : "linear-gradient(135deg, #7C3AED88, #4F46E588)",
                border: "1px solid rgba(255,255,255,0.12)",
                opacity: sharing ? 0.7 : 1,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Share2 size={16} />
              {shareSuccess ? "Shared!" : sharing ? "Generating..." : (
                <span className="flex items-center gap-2">
                  Share your Wrapped
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24" }}>+30t</span>
                </span>
              )}
            </motion.button>
            <AnimatePresence>
              {shareTokenToast > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-bold text-amber-300 flex items-center gap-1"
                >
                  <Zap size={12} className="text-amber-400" />
                  +{shareTokenToast} tokens earned for sharing!
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Hidden share card rendered off-screen for html-to-image */}
      <ShareCard data={data} cardRef={cardRef} />
    </div>
  );
}
