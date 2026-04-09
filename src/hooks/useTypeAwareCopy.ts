"use client";

import { useProfile } from "@/hooks/useProfile";
import { getTypeAwareCopy } from "@/data/type-aware-copy";

/**
 * Returns a function that resolves a type-aware copy key to the variant
 * matching the current user's Enneagram type. Falls back to the default
 * variant if no type is set.
 *
 * Usage:
 *   const copy = useTypeAwareCopy();
 *   const headline = copy("hub.start.headline");
 */
export function useTypeAwareCopy() {
  const { profile } = useProfile();
  const type = profile.enneagramType ?? profile.enneagramCore ?? null;
  return (key: string) => getTypeAwareCopy(key, type);
}

/**
 * Direct resolver for non-hook contexts (e.g., inside a component that
 * already has the type). Use the hook in React components; this helper
 * is for data files or utility functions.
 */
export function resolveTypeAwareCopy(key: string, type: number | null | undefined): string {
  return getTypeAwareCopy(key, type);
}
