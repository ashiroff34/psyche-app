"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  /** Unique key stored in localStorage so it only shows once */
  storageKey: string;
  /** The one-line message to show */
  message: string;
  /** Optional emoji icon prefix */
  icon?: string;
  /** Auto-dismiss after ms (default 5000) */
  duration?: number;
}

export default function FirstVisitTooltip({
  storageKey,
  message,
  icon = "»",
  duration = 5000,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(storageKey)) return;
    // Small delay so the page renders first
    const show = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(storageKey, "1");
    }, 600);
    return () => clearTimeout(show);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(hide);
  }, [visible, duration]);

  const dismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          className="mx-4 mb-3 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white shadow-xl"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
        >
          <span className="text-base flex-shrink-0">{icon}</span>
          <p className="flex-1 text-sm font-medium leading-snug">{message}</p>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex-shrink-0 p-0.5 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
