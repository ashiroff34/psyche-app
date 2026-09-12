"use client";

import { useEffect, useState } from "react";

const PRO_UNLOCK_KEY = "psyche-pro-unlocked";

/**
 * Whether this device holds an active Pro subscription, for hiding upsells.
 *
 * Starts `true` so a subscriber never sees a trial pitch flash in before
 * localStorage is read; the effect corrects it on mount. Use this for inline
 * upsells only. /pricing deliberately starts `false` instead, because that page
 * is the offer and withholding it from a prospect is the worse failure there.
 */
export function useProUnlocked(): boolean {
  const [proUnlocked, setProUnlocked] = useState(true);

  useEffect(() => {
    try {
      setProUnlocked(localStorage.getItem(PRO_UNLOCK_KEY) === "true");
    } catch {
      setProUnlocked(false);
    }
  }, []);

  return proUnlocked;
}
