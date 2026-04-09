"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Mail, X, Check } from "lucide-react";
import { getDailyObservation, getObservationSet } from "@/data/daily-observations";

// ── Helpers ────────────────────────────────────────────────────────────────────

function getDateKey(): string {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

function formatDate(): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date());
}

const TIMES = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];

const TYPE_COLORS: Record<number, string> = {
  1: "#E74C3C", 2: "#E91E8C", 3: "#F39C12", 4: "#9B59B6",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#E67E22", 9: "#95A5A6",
};

// ── Storage keys ────────────────────────────────────────────────────────────────
const FIRST_VISIT_KEY = "psyche-first-visit-date";
const ACKED_KEY = (date: string) => `psyche-observation-acked-${date}`;
const REFLECTION_TIME_KEY = "psyche-reflection-time";
const REFLECTION_EMAIL_KEY = "psyche-reflection-email";

// ── Props ───────────────────────────────────────────────────────────────────────
interface Props {
  enneagramType: number;
  typeName: string;
}

// ── Component ───────────────────────────────────────────────────────────────────
export default function DailyObservationCard({ enneagramType, typeName }: Props) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"reading" | "schedule" | "done">("reading");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [savedTime, setSavedTime] = useState<string | null>(null);

  // ── Determine visibility ────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const today = getDateKey();

    // Record first visit date if not already set
    if (!localStorage.getItem(FIRST_VISIT_KEY)) {
      localStorage.setItem(FIRST_VISIT_KEY, today);
    }

    const firstVisit = localStorage.getItem(FIRST_VISIT_KEY)!;
    const isFirstDay = firstVisit === today;
    const alreadyAcked = !!localStorage.getItem(ACKED_KEY(today));

    if (!isFirstDay && !alreadyAcked) {
      setVisible(true);
    }

    // Restore saved time/email
    const t = localStorage.getItem(REFLECTION_TIME_KEY);
    const e = localStorage.getItem(REFLECTION_EMAIL_KEY);
    if (t) setSavedTime(t);
    if (e) setSavedEmail(e);
    if (t) setSelectedTime(t);
    if (e) setEmail(e);
  }, []);

  const observationSet = getObservationSet(enneagramType);
  const obs = getDailyObservation(enneagramType);
  if (!observationSet || !obs || !visible) return null;
  const typeColor = TYPE_COLORS[enneagramType] ?? "#8b5cf6";

  // ── Handlers ────────────────────────────────────────────────────────────────
  function acknowledge(response: "seen" | "skip") {
    localStorage.setItem(ACKED_KEY(getDateKey()), response);
    if (response === "skip") {
      setVisible(false);
    } else {
      setPhase("schedule");
    }
  }

  function saveSchedule() {
    if (selectedTime) localStorage.setItem(REFLECTION_TIME_KEY, selectedTime);
    if (email.trim()) localStorage.setItem(REFLECTION_EMAIL_KEY, email.trim());
    localStorage.setItem(ACKED_KEY(getDateKey()), "scheduled");
    setSavedTime(selectedTime);
    setSavedEmail(email.trim() || null);
    setPhase("done");
    setTimeout(() => setVisible(false), 2200);
  }

  function skipSchedule() {
    localStorage.setItem(ACKED_KEY(getDateKey()), "seen");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-6 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: `1px solid ${typeColor}30`,
            boxShadow: `0 4px 24px ${typeColor}18`,
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-4 pt-4 pb-3"
            style={{ borderBottom: `1px solid ${typeColor}18` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
                style={{ background: `${typeColor}22`, color: typeColor }}
              >
                Type {enneagramType} · {typeName}
              </span>
              <span className="text-[10px] text-white/30">{formatDate()}</span>
            </div>
            <button
              onClick={() => { localStorage.setItem(ACKED_KEY(getDateKey()), "dismissed"); setVisible(false); }}
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <AnimatePresence mode="wait">

            {/* ── Phase: Reading ── */}
            {phase === "reading" && (
              <motion.div
                key="reading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 py-4"
              >
                <p className="text-white/75 text-[14px] leading-relaxed italic mb-5">
                  &ldquo;{obs.text}&rdquo;
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => acknowledge("seen")}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all active:scale-95"
                    style={{ background: `linear-gradient(135deg, ${typeColor}cc, ${typeColor}88)` }}
                  >
                    I see this in myself
                  </button>
                  <button
                    onClick={() => acknowledge("skip")}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/40 hover:text-white/60 transition-colors"
                  >
                    Not today
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Phase: Schedule ── */}
            {phase === "schedule" && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-4 py-4"
              >
                <p className="text-white/60 text-[12px] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: typeColor }} />
                  Schedule your evening reflection
                </p>
                <p className="text-white/35 text-[11px] mb-4 leading-relaxed">
                  We&apos;ll send you this observation again with a reflection prompt at your chosen time.
                </p>

                {/* Time picker */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all active:scale-95"
                      style={
                        selectedTime === t
                          ? { background: typeColor, color: "#fff" }
                          : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Email input */}
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-3.5 h-3.5 text-white/30 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-[13px] text-white/70 placeholder-white/20 outline-none border-b border-white/10 pb-1 focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveSchedule}
                    disabled={!selectedTime}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all active:scale-95 disabled:opacity-30"
                    style={{ background: selectedTime ? `linear-gradient(135deg, ${typeColor}cc, ${typeColor}88)` : "rgba(255,255,255,0.08)" }}
                  >
                    Set reminder
                  </button>
                  <button
                    onClick={skipSchedule}
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/30 hover:text-white/50 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Phase: Done ── */}
            {phase === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-5 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${typeColor}33` }}
                >
                  <Check className="w-4 h-4" style={{ color: typeColor }} />
                </div>
                <div>
                  <p className="text-white/70 text-[13px] font-medium">
                    Reminder set for {savedTime}
                  </p>
                  {savedEmail && (
                    <p className="text-white/30 text-[11px] mt-0.5">{savedEmail}</p>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
