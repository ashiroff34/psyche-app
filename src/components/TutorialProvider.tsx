"use client";
// Tutorial overlay was removed (replaced with contextual tooltips).
// This provider handles the legacy psyche-tutorial-complete flag so the
// retention system (RetentionBanner, ComebackModal, EngagementNudge) activates
// for all users. new and existing.
import { useEffect } from "react";

export default function TutorialProvider() {
  useEffect(() => {
    try {
      if (localStorage.getItem("psyche-tutorial-complete") === "true") return;

      const onboardingDone = localStorage.getItem("psyche-onboarding-complete") === "true";
      const profileRaw = localStorage.getItem("psyche-profile");
      const profile = profileRaw ? JSON.parse(profileRaw) : null;
      const hasType = profile?.enneagramType || profile?.cognitiveType || profile?.mbtiType;

      if (onboardingDone || hasType) {
        localStorage.setItem("psyche-tutorial-complete", "true");
      }
    } catch {}
  }, []);

  return null;
}
