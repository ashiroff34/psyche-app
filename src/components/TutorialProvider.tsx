"use client";

import { useEffect, useState } from "react";
import TutorialOverlay, { useTutorial } from "./Tutorial";

/**
 * Only handles REPLAY from the Explore menu.
 * First-time tutorial is triggered from the onboarding page directly.
 */
export default function TutorialProvider() {
  const { isActive, startTutorial, endTutorial } = useTutorial();
  const [shouldShow, setShouldShow] = useState(false);

  // Listen for replay event from Explore menu
  useEffect(() => {
    const handler = () => {
      startTutorial();
      setShouldShow(true);
    };
    window.addEventListener("psyche-replay-tutorial", handler);
    return () => window.removeEventListener("psyche-replay-tutorial", handler);
  }, [startTutorial]);

  useEffect(() => {
    if (isActive) setShouldShow(true);
  }, [isActive]);

  if (!shouldShow) return null;

  return (
    <TutorialOverlay
      onClose={() => {
        endTutorial();
        setShouldShow(false);
      }}
    />
  );
}
