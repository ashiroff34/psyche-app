"use client";

import { useRouter } from "next/navigation";

/**
 * Smart back navigation — consistent with Navigation.tsx's page-history tracking.
 *
 * Priority order:
 * 1. Read psyche-page-history (same mechanism Navigation uses) → router.push(prev)
 * 2. Same-origin document.referrer → router.back()
 * 3. Hardcoded fallback URL
 *
 * Usage:
 *   const goBack = useSmartBack("/daily");
 *   <button onClick={goBack}>← Back</button>
 */
export function useSmartBack(fallback = "/daily"): () => void {
  const router = useRouter();

  return () => {
    if (typeof window === "undefined") {
      router.push(fallback);
      return;
    }

    // 1. Use Navigation's page-history if available
    try {
      const history: string[] = JSON.parse(
        localStorage.getItem("psyche-page-history") || "[]"
      );
      if (history.length > 1) {
        history.pop(); // remove current page
        const prev = history[history.length - 1];
        localStorage.setItem("psyche-page-history", JSON.stringify(history));
        router.push(prev);
        return;
      }
    } catch {}

    // 2. Same-origin referrer
    try {
      const ref = document.referrer;
      if (ref && new URL(ref).origin === window.location.origin) {
        router.back();
        return;
      }
    } catch {}

    // 3. Safe fallback
    router.push(fallback);
  };
}
