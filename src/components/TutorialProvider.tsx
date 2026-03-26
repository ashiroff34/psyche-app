"use client";

import { useEffect, useState } from "react";
import TutorialOverlay, { useTutorial } from "./Tutorial";

/**
 * Handles first-time tutorial (fired from results page after assessment)
 * and replay from the Explore menu.
 */
export default function TutorialProvider() {
  const { isActive, startTutorial, endTutorial } = useTutorial();
  const [shouldShow, setShouldShow] = useState(false);

  // Listen for first-time and replay tutorial events
  useEffect(() => {
    const handler = () => {
      startTutorial();
      setShouldShow(true);
    };
    window.addEventListener("psyche-replay-tutorial", handler);
    window.addEventListener("psyche-start-tutorial", handler);
    return () => {
      window.removeEventListener("psyche-replay-tutorial", handler);
      window.removeEventListener("psyche-start-tutorial", handler);
    };
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
