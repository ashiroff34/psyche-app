"use client";

/**
 * PostHogProvider
 *
 * Wraps the app and:
 * 1. Initialises PostHog on first mount
 * 2. Fires a $pageview on every route change (Next.js App Router)
 * 3. Identifies the user with their device UUID from localStorage
 *
 * Drop into layout.tsx:
 *   <PostHogProvider>{children}</PostHogProvider>
 */

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog, EVENTS } from "@/lib/posthog";

function getOrCreateDeviceId(): string {
  try {
    const KEY = "psyche-device-id";
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/**
 * Renders nothing — lives purely for side effects.
 * Wrap in <Suspense> in layout.tsx because useSearchParams() needs it.
 */
export default function PostHogProvider() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  // Identify user on first mount
  useEffect(() => {
    const deviceId = getOrCreateDeviceId();
    try {
      const raw = localStorage.getItem("psyche-profile");
      const profile = raw ? JSON.parse(raw) : {};
      posthog.identify(deviceId, {
        enneagramType:  profile.enneagramType,
        cognitiveType:  profile.cognitiveType,
        instinct:       profile.enneagramSubtype ?? profile.instinctualStacking,
      });
    } catch {
      posthog.identify(deviceId);
    }
  }, []);

  // Fire pageview on every navigation
  useEffect(() => {
    if (pathname) {
      const url = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      posthog.pageview(url);
    }
  }, [pathname, searchParams]);

  void EVENTS; // keep import alive for tree-shaking

  return null;
}
