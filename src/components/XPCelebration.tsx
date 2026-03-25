"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star } from "lucide-react";
import { useGameState } from "@/hooks/useGameState";

export default function XPCelebration() {
  const { xpGainAnimation } = useGameState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState<{ amount: number; source: string } | null>(null);

  useEffect(() => {
    if (xpGainAnimation) {
      setData(xpGainAnimation);
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [xpGainAnimation]);

  const isBonus = data?.source?.includes("BONUS") || false;

  return (
    <AnimatePresence>
      {show && data && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] pointer-events-none"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl ${
            isBonus
              ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-200/60"
              : "bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sky-200/60"
          }`}>
            <motion.div
              animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            >
              {isBonus ? (
                <Star className="w-6 h-6 text-white" />
              ) : (
                <Zap className="w-6 h-6 text-white" />
              )}
            </motion.div>
            <div>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.1 }}
                className="text-xl font-bold text-white"
              >
                +{data.amount} XP
              </motion.div>
              <div className="text-[10px] text-white/70 font-medium">
                {data.source}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
