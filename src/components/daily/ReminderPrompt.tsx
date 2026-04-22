"use client";

// Reminder Prompt (shows on 2nd+ visit if no reminder set)
//
// Instead of asking during onboarding (which feels like too many steps),
// this card appears on the HubView the day AFTER first signup. More
// natural: the user has experienced the app and now is asked when they
// want to come back.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, X } from "lucide-react";
import { posthog } from "@/lib/posthog";

function friendlyLabel(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function ReminderPrompt() {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("09:00");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only show if: onboarding is complete AND no intention set yet AND at least 1 day old
    const complete = localStorage.getItem("psyche-onboarding-complete") === "true";
    const intentSet = !!localStorage.getItem("psyche-implementation-intention");
    const dismissed = localStorage.getItem("psyche-reminder-prompt-dismissed");
    const completeDate = localStorage.getItem("psyche-onboarding-complete-date");
    if (!complete || intentSet || dismissed) return;

    // Check if at least 1 day has passed since onboarding
    if (completeDate) {
      const daysSince = Math.floor((Date.now() - new Date(completeDate).getTime()) / 86400000);
      if (daysSince < 1) return;
    }
    setShow(true);
  }, []);

  function save() {
    const label = friendlyLabel(time);
    try {
      localStorage.setItem(
        "psyche-implementation-intention",
        JSON.stringify({ id: "time-picker", label: `at ${label}`, key: "time-picker", timeHint: time, capturedAt: new Date().toISOString() })
      );
    } catch {}
    try { posthog.capture("reminder_set_from_hub", { time }); } catch {}
    setSaved(true);
    setTimeout(() => setShow(false), 1200);
  }

  function dismiss() {
    try { localStorage.setItem("psyche-reminder-prompt-dismissed", "1"); } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 rounded-2xl relative"
      style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}
    >
      <button onClick={dismiss} className="absolute top-3 right-3 opacity-40 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2 mb-2">
        <Bell className="w-4 h-4 text-violet-400" />
        <p className="text-xs uppercase tracking-widest text-violet-300 font-bold">Set a daily reminder</p>
      </div>
      <p className="text-sm opacity-70 mb-3 pr-6 leading-relaxed">
        You came back. That matters. Pick a time and we'll remind you tomorrow.
      </p>
      <div className="flex items-center gap-3">
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          disabled={saved}
          aria-label="Daily reminder time"
          className="flex-1 text-lg font-bold py-2 px-3 rounded-xl text-center"
          style={{
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.25)",
            color: "white",
            colorScheme: "dark",
          }}
        />
        <button
          onClick={save}
          disabled={saved}
          className="py-2 px-5 rounded-xl font-semibold text-sm text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#8b5cf6,#d946ef)" }}
        >
          {saved ? "Set" : "Save"}
        </button>
      </div>
    </motion.div>
  );
}
