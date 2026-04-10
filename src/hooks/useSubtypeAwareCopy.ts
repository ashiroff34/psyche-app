"use client";

import { useProfile } from "@/hooks/useProfile";
import { getSubtypeAwareCopy, type Instinct } from "@/data/subtype-aware-copy";

/**
 * Resolves subtype-aware copy for the current user. The returned function
 * takes a key and an optional fallback string.
 *
 * Falls back to type-level copy, then to the key's default, then to the
 * supplied fallback.
 *
 * Usage:
 *   const copy = useSubtypeAwareCopy();
 *   const prompt = copy("daily.growth.prompt");
 */
export function useSubtypeAwareCopy() {
  const { profile } = useProfile();
  const type = profile.enneagramType ?? profile.enneagramCore ?? null;

  // Instinct is stored either as "sp"/"sx"/"so" (enneagramSubtype) or as a
  // stacking code like "sp/sx" (instinctualStacking). The dominant is the
  // first two characters in both cases.
  const raw =
    profile.enneagramSubtype ||
    (profile.instinctualStacking ? profile.instinctualStacking.slice(0, 2) : null);
  const instinct = (raw === "sp" || raw === "sx" || raw === "so" ? raw : null) as Instinct | null;

  return (key: string, fallback = "") => getSubtypeAwareCopy(key, type, instinct, fallback);
}
