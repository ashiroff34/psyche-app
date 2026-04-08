"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus, Send, X, MessageCircle, ChevronLeft } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C",
  2: "#E91E8C",
  3: "#F39C12",
  4: "#9B59B6",
  5: "#2980B9",
  6: "#27AE60",
  7: "#1ABC9C",
  8: "#E67E22",
  9: "#95A5A6",
};

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Investigator",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker",
};

const CONFESSIONS_KEY = "psyche-confessions";
const LAST_CONFESSION_DATE_KEY = "psyche-last-confession-date";
const GAME_STATE_KEY = "psyche-game-state";
const PROFILE_KEY = "psyche-profile";
const DEVICE_ID_KEY = "psyche-device-id";
const TOKEN_REWARD = 5;
const MAX_CHARS = 140;

// ─── Supabase availability check ──────────────────────────────────────────────

function isSupabaseConfigured(): boolean {
  return (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0
  );
}

// Lazy-load supabase so the app doesn't crash when env vars aren't set
let _supabase: import("@supabase/supabase-js").SupabaseClient | null = null;
async function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (_supabase) return _supabase;
  const { supabase } = await import("@/lib/supabase");
  _supabase = supabase;
  return _supabase;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Reaction {
  type: number;
  count: number;
}

interface Confession {
  id: string;
  text: string;
  authorType: number;
  timestamp: number;
  reactions: Reaction[];
}

// Shape returned from Supabase
interface SupabaseConfession {
  id: string;
  text: string;
  type_number: number;
  reactions: Record<string, number>; // { "1": 4, "2": 2, ... }
  created_at: string;
  device_id: string | null;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_CONFESSIONS: Confession[] = [
  {
    id: "seed-1",
    text: "I corrected a stranger's grammar in my head three times during a five-minute conversation.",
    authorType: 1,
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    reactions: [
      { type: 1, count: 14 },
      { type: 6, count: 3 },
      { type: 3, count: 2 },
    ],
  },
  {
    id: "seed-2",
    text: "I said yes to six things today I didn't want to do.",
    authorType: 2,
    timestamp: Date.now() - 1000 * 60 * 60 * 4,
    reactions: [
      { type: 2, count: 18 },
      { type: 9, count: 7 },
      { type: 4, count: 2 },
    ],
  },
  {
    id: "seed-3",
    text: "I rehearsed a 'casual' story three times before telling it at dinner.",
    authorType: 3,
    timestamp: Date.now() - 1000 * 60 * 60 * 6,
    reactions: [
      { type: 3, count: 11 },
      { type: 1, count: 4 },
      { type: 7, count: 3 },
    ],
  },
  {
    id: "seed-4",
    text: "I felt personally attacked by someone else's Spotify playlist.",
    authorType: 4,
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    reactions: [
      { type: 4, count: 21 },
      { type: 5, count: 5 },
      { type: 9, count: 2 },
    ],
  },
  {
    id: "seed-5",
    text: "I pretended to not be home when my neighbor knocked.",
    authorType: 5,
    timestamp: Date.now() - 1000 * 60 * 60 * 10,
    reactions: [
      { type: 5, count: 16 },
      { type: 4, count: 8 },
      { type: 9, count: 6 },
    ],
  },
  {
    id: "seed-6",
    text: "I googled the symptoms. Then I googled whether googling symptoms is a symptom.",
    authorType: 6,
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    reactions: [
      { type: 6, count: 24 },
      { type: 1, count: 5 },
      { type: 5, count: 4 },
    ],
  },
  {
    id: "seed-7",
    text: "I booked a trip mid-meeting because the agenda was boring.",
    authorType: 7,
    timestamp: Date.now() - 1000 * 60 * 60 * 14,
    reactions: [
      { type: 7, count: 13 },
      { type: 3, count: 6 },
      { type: 4, count: 3 },
    ],
  },
  {
    id: "seed-8",
    text: "Someone told me to calm down and I have never been less calm in my life.",
    authorType: 8,
    timestamp: Date.now() - 1000 * 60 * 60 * 16,
    reactions: [
      { type: 8, count: 19 },
      { type: 3, count: 4 },
      { type: 6, count: 2 },
    ],
  },
  {
    id: "seed-9",
    text: "I let someone else pick the restaurant again. I did have a preference.",
    authorType: 9,
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    reactions: [
      { type: 9, count: 22 },
      { type: 2, count: 9 },
      { type: 4, count: 4 },
    ],
  },
  {
    id: "seed-10",
    text: "I spent forty minutes making my to-do list more aesthetically organized instead of doing anything on it.",
    authorType: 1,
    timestamp: Date.now() - 1000 * 60 * 60 * 20,
    reactions: [
      { type: 1, count: 17 },
      { type: 3, count: 8 },
      { type: 5, count: 3 },
    ],
  },
  {
    id: "seed-11",
    text: "I know what everyone at this table needs right now and none of them have asked me.",
    authorType: 2,
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    reactions: [
      { type: 2, count: 15 },
      { type: 8, count: 3 },
      { type: 9, count: 5 },
    ],
  },
  {
    id: "seed-12",
    text: "I rewrote my bio four times today because I couldn't decide which version of me to present.",
    authorType: 3,
    timestamp: Date.now() - 1000 * 60 * 60 * 26,
    reactions: [
      { type: 3, count: 12 },
      { type: 4, count: 7 },
      { type: 1, count: 2 },
    ],
  },
  {
    id: "seed-13",
    text: "I have seventeen browser tabs open about one niche topic I will never act on.",
    authorType: 5,
    timestamp: Date.now() - 1000 * 60 * 60 * 30,
    reactions: [
      { type: 5, count: 20 },
      { type: 7, count: 6 },
      { type: 1, count: 4 },
    ],
  },
  {
    id: "seed-14",
    text: "I already have three backup plans for a situation I haven't been in yet.",
    authorType: 6,
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
    reactions: [
      { type: 6, count: 18 },
      { type: 1, count: 7 },
      { type: 5, count: 5 },
    ],
  },
  {
    id: "seed-15",
    text: "I felt a deep, profound connection with a stranger at the coffee shop. I will never speak to them.",
    authorType: 4,
    timestamp: Date.now() - 1000 * 60 * 60 * 42,
    reactions: [
      { type: 4, count: 25 },
      { type: 9, count: 10 },
      { type: 2, count: 6 },
    ],
  },
];

// ─── Data mapping helpers ─────────────────────────────────────────────────────

// Supabase stores reactions as { "1": 4, "2": 2 }, local uses Reaction[]
function reactionsFromSupabase(raw: Record<string, number> | null): Reaction[] {
  if (!raw) return [];
  return Object.entries(raw).map(([typeStr, count]) => ({
    type: Number(typeStr),
    count,
  }));
}

function reactionsToSupabase(reactions: Reaction[]): Record<string, number> {
  const obj: Record<string, number> = {};
  for (const r of reactions) {
    obj[String(r.type)] = r.count;
  }
  return obj;
}

function confessionFromSupabase(row: SupabaseConfession): Confession {
  return {
    id: row.id,
    text: row.text,
    authorType: row.type_number,
    timestamp: new Date(row.created_at).getTime(),
    reactions: reactionsFromSupabase(row.reactions),
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTimestamp(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function loadConfessionsFromStorage(): Confession[] {
  try {
    const stored = localStorage.getItem(CONFESSIONS_KEY);
    if (stored) return JSON.parse(stored) as Confession[];
  } catch {
    // ignore
  }
  // Seed on first load
  localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(SEED_CONFESSIONS));
  return SEED_CONFESSIONS;
}

function saveConfessionsToStorage(confessions: Confession[]): void {
  try {
    localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(confessions));
  } catch {
    // ignore
  }
}

function getUserType(): number | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const profile = JSON.parse(raw);
    const t = Number(profile.enneagramType);
    if (t >= 1 && t <= 9) return t;
  } catch {
    // ignore
  }
  return null;
}

function getOrCreateDeviceId(): string {
  try {
    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;
    const id =
      "device-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 9);
    localStorage.setItem(DEVICE_ID_KEY, id);
    return id;
  } catch {
    return "device-unknown";
  }
}

function todayDateString(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function awardTokens(): void {
  const lastDate = localStorage.getItem(LAST_CONFESSION_DATE_KEY);
  const today = todayDateString();
  if (lastDate === today) return;
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY);
    const gs = raw ? JSON.parse(raw) : {};
    gs.tokens = (typeof gs.tokens === "number" ? gs.tokens : 0) + TOKEN_REWARD;
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gs));
    localStorage.setItem(LAST_CONFESSION_DATE_KEY, today);
  } catch {
    // ignore
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeBadge({ type, size = "sm" }: { type: number; size?: "sm" | "lg" }) {
  const color = TYPE_COLORS[type] ?? "#888";
  const name = TYPE_NAMES[type] ?? "";
  return (
    <span
      style={{
        background: `${color}22`,
        border: `1px solid ${color}55`,
        color,
      }}
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        size === "lg" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"
      }`}
    >
      <span
        style={{ background: color }}
        className={`rounded-full ${size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"}`}
      />
      {size === "lg" ? `Type ${type} · ${name}` : `Type ${type}`}
    </span>
  );
}

interface ReactionBarProps {
  reactions: Reaction[];
  userType: number | null;
  onReact: (type: number) => void;
}

function ReactionBar({ reactions, userType, onReact }: ReactionBarProps) {
  const sorted = [...reactions].sort((a, b) => b.count - a.count);
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {sorted.map((r) => {
        const color = TYPE_COLORS[r.type] ?? "#888";
        const isMe = userType === r.type;
        return (
          <button
            key={r.type}
            onClick={() => onReact(r.type)}
            style={{
              background: isMe ? `${color}33` : `${color}11`,
              border: `1px solid ${isMe ? color : `${color}44`}`,
              color,
            }}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all active:scale-95"
          >
            <span className="font-bold">{r.type}</span>
            <span style={{ color: `${color}cc` }}>{r.count}</span>
          </button>
        );
      })}
      {userType && !reactions.find((r) => r.type === userType) && (
        <button
          onClick={() => onReact(userType)}
          style={{
            background: `${TYPE_COLORS[userType]}11`,
            border: `1px dashed ${TYPE_COLORS[userType]}44`,
            color: TYPE_COLORS[userType],
          }}
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all active:scale-95 opacity-60"
        >
          <span className="font-bold">{userType}</span>
          <span>+</span>
        </button>
      )}
    </div>
  );
}

interface ConfessionCardProps {
  confession: Confession;
  index: number;
  userType: number | null;
  onReact: (id: string, type: number) => void;
}

function ConfessionCard({ confession, index, userType, onReact }: ConfessionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }}
      className="rounded-2xl p-4"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <TypeBadge type={confession.authorType} />
        <span className="text-xs text-white/30 shrink-0 mt-0.5">
          {formatTimestamp(confession.timestamp)}
        </span>
      </div>
      <p className="text-white/80 text-sm leading-relaxed">{confession.text}</p>
      <ReactionBar
        reactions={confession.reactions}
        userType={userType}
        onReact={(type) => onReact(confession.id, type)}
      />
    </motion.div>
  );
}

// ─── Compose Modal ────────────────────────────────────────────────────────────

interface ComposeModalProps {
  userType: number | null;
  onClose: () => void;
  onPost: (text: string) => void;
}

function ComposeModal({ userType, onClose, onPost }: ComposeModalProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const remaining = MAX_CHARS - text.length;
  const canPost = text.trim().length > 0 && remaining >= 0;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!canPost) return;
    onPost(text.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        style={{
          background: "rgba(20,12,42,0.95)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(24px)",
        }}
        className="w-full max-w-lg rounded-3xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-violet-400" />
            <h2 className="text-white font-semibold">Type Confession</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <X size={16} className="text-white/60" />
          </button>
        </div>

        {/* Auto-detected type badge */}
        {userType ? (
          <div
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            className="rounded-xl px-3 py-2 mb-4 flex items-center gap-2"
          >
            <span className="text-xs text-white/40">Posting as</span>
            <TypeBadge type={userType} size="sm" />
            <span className="text-xs text-white/30 ml-auto">{TYPE_NAMES[userType]}</span>
          </div>
        ) : (
          <div
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            className="rounded-xl px-3 py-2 mb-4"
          >
            <span className="text-xs text-white/40">
              No type detected. Complete your Enneagram assessment to tag confessions.
            </span>
          </div>
        )}

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Confess something your type does..."
          rows={4}
          maxLength={MAX_CHARS + 10}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            outline: "none",
            resize: "none",
          }}
          className="w-full rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/25 mb-3 focus:border-violet-500/50 transition-colors"
        />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-mono ${
              remaining < 20
                ? remaining < 0
                  ? "text-red-400"
                  : "text-amber-400"
                : "text-white/30"
            }`}
          >
            {remaining}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">+{TOKEN_REWARD} tokens</span>
            <button
              onClick={handleSubmit}
              disabled={!canPost}
              style={{
                background: canPost
                  ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                  : "rgba(255,255,255,0.08)",
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              Post anonymously
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Token Toast ──────────────────────────────────────────────────────────────

function TokenToast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.92 }}
      transition={{ type: "spring", damping: 22, stiffness: 320 }}
      style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(168,85,247,0.9))",
        border: "1px solid rgba(196,132,252,0.4)",
        backdropFilter: "blur(16px)",
      }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl flex items-center gap-2 shadow-xl"
    >
      <span className="text-lg">⚡</span>
      <span className="text-white font-semibold text-sm">+{TOKEN_REWARD} tokens earned</span>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConfessionsPage() {
  const router = useRouter();
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [userType, setUserType] = useState<number | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [showTokenToast, setShowTokenToast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const deviceIdRef = useRef<string>("");

  // Load on mount — try Supabase first, fall back to localStorage
  useEffect(() => {
    setMounted(true);
    setUserType(getUserType());
    deviceIdRef.current = getOrCreateDeviceId();

    async function loadData() {
      const sb = await getSupabase();

      if (!sb) {
        // Supabase not configured — use localStorage
        setConfessions(loadConfessionsFromStorage());
        return;
      }

      const { data, error } = await sb
        .from("confessions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error || !data || data.length === 0) {
        // Supabase error or empty — fall back to localStorage seed
        setConfessions(loadConfessionsFromStorage());
        return;
      }

      setConfessions((data as SupabaseConfession[]).map(confessionFromSupabase));
    }

    loadData();
  }, []);

  // Realtime subscription for new confessions
  useEffect(() => {
    if (!mounted) return;

    let unsubscribe: (() => void) | null = null;

    async function subscribe() {
      const sb = await getSupabase();
      if (!sb) return;

      const channel = sb
        .channel("confessions-feed")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "confessions" },
          (payload) => {
            const newRow = payload.new as SupabaseConfession;
            const newConfession = confessionFromSupabase(newRow);
            setConfessions((prev) => {
              // Avoid duplicates (optimistic insert may already be in list)
              if (prev.some((c) => c.id === newConfession.id)) return prev;
              return [newConfession, ...prev];
            });
          }
        )
        .subscribe();

      unsubscribe = () => {
        sb.removeChannel(channel);
      };
    }

    subscribe();

    return () => {
      unsubscribe?.();
    };
  }, [mounted]);

  const handleReact = async (confessionId: string, type: number) => {
    // Optimistic local update
    let updatedReactions: Reaction[] = [];

    setConfessions((prev) => {
      const next = prev.map((c) => {
        if (c.id !== confessionId) return c;
        const existingIdx = c.reactions.findIndex((r) => r.type === type);
        let reactions: Reaction[];
        if (existingIdx >= 0) {
          reactions = c.reactions.map((r, i) =>
            i === existingIdx ? { ...r, count: r.count + 1 } : r
          );
        } else {
          reactions = [...c.reactions, { type, count: 1 }];
        }
        updatedReactions = reactions;
        return { ...c, reactions };
      });
      saveConfessionsToStorage(next);
      return next;
    });

    // Persist to Supabase (skip seed confessions)
    if (!confessionId.startsWith("seed-")) {
      const sb = await getSupabase();
      if (sb && updatedReactions.length > 0) {
        await sb
          .from("confessions")
          .update({ reactions: reactionsToSupabase(updatedReactions) })
          .eq("id", confessionId);
      }
    }
  };

  const handlePost = async (text: string) => {
    if (!userType) return;

    const tempId = `optimistic-${Date.now()}`;
    const optimistic: Confession = {
      id: tempId,
      text,
      authorType: userType,
      timestamp: Date.now(),
      reactions: [],
    };

    // Optimistic insert into local state
    setConfessions((prev) => {
      const next = [optimistic, ...prev];
      saveConfessionsToStorage(next);
      return next;
    });

    // Award tokens (once per day)
    const lastDate = localStorage.getItem(LAST_CONFESSION_DATE_KEY);
    const isFirstToday = lastDate !== todayDateString();
    awardTokens();
    if (isFirstToday) setShowTokenToast(true);

    setShowCompose(false);

    // Persist to Supabase
    const sb = await getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from("confessions")
        .insert({
          text,
          type_number: userType,
          reactions: {},
          device_id: deviceIdRef.current,
        })
        .select()
        .single();

      if (!error && data) {
        // Replace temp optimistic entry with real Supabase row
        const real = confessionFromSupabase(data as SupabaseConfession);
        setConfessions((prev) => {
          const next = prev.map((c) => (c.id === tempId ? real : c));
          saveConfessionsToStorage(next);
          return next;
        });
      }
    }
  };

  if (!mounted) {
    return (
      <div
        style={{ background: "#0f0a1e", minHeight: "100dvh" }}
        className="flex items-center justify-center"
      >
        <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      style={{ background: "#0f0a1e", minHeight: "100dvh" }}
      className="relative flex flex-col"
    >
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
      >
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 75%, rgba(168,85,247,0.1) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Header */}
      <div
        style={{
          background: "rgba(15,10,30,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
        }}
        className="sticky top-0 z-20 px-4 pt-safe-top"
      >
        <div className="flex items-center gap-3 h-14 max-w-lg mx-auto">
          <button
            onClick={() => router.push("/daily")}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <ChevronLeft size={20} className="text-white/70" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-semibold text-base leading-tight">Type Confessions</h1>
            <p className="text-white/35 text-xs">anonymous type truths</p>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={14} className="text-violet-400" />
            <span className="text-white/40 text-xs">{confessions.length}</span>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-28">
        <div className="max-w-lg mx-auto px-4 py-4 flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {confessions.map((confession, index) => (
              <ConfessionCard
                key={confession.id}
                confession={confession}
                index={Math.min(index, 10)} // cap stagger for large lists
                userType={userType}
                onReact={handleReact}
              />
            ))}
          </AnimatePresence>

          {confessions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-white/25 text-sm"
            >
              No confessions yet. Be the first.
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating new confession button */}
      <motion.button
        onClick={() => setShowCompose(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          boxShadow: "0 4px 24px rgba(124,58,237,0.5)",
        }}
        className="fixed bottom-8 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        aria-label="New confession"
      >
        <Plus size={24} className="text-white" />
      </motion.button>

      {/* Compose modal */}
      <AnimatePresence>
        {showCompose && (
          <ComposeModal
            userType={userType}
            onClose={() => setShowCompose(false)}
            onPost={handlePost}
          />
        )}
      </AnimatePresence>

      {/* Token toast */}
      <AnimatePresence>
        {showTokenToast && (
          <TokenToast onDone={() => setShowTokenToast(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
