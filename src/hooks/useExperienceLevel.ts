"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

const STORAGE_KEY = "psyche-experience-level";

export function useExperienceLevel() {
  const [level, setLevel] = useState<ExperienceLevel>("beginner");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ["beginner", "intermediate", "advanced"].includes(stored)) {
        setLevel(stored as ExperienceLevel);
      }
    } catch {}
    setLoaded(true);

    // Listen for cross-instance level changes
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ExperienceLevel>).detail;
      if (detail && ["beginner", "intermediate", "advanced"].includes(detail)) {
        setLevel(detail);
      }
    };
    window.addEventListener("psyche-level-change", handler);
    return () => window.removeEventListener("psyche-level-change", handler);
  }, []);

  const setExperienceLevel = useCallback((newLevel: ExperienceLevel) => {
    setLevel(newLevel);
    try {
      localStorage.setItem(STORAGE_KEY, newLevel);
      window.dispatchEvent(new CustomEvent("psyche-level-change", { detail: newLevel }));
    } catch {}
  }, []);

  return { level, setExperienceLevel, loaded };
}

// Tooltip definitions for common terms
export const TERM_GLOSSARY: Record<string, { short: string; full: string }> = {
  // Enneagram terms
  "Core Type": {
    short: "Your main Enneagram number (1-9)",
    full: "The Enneagram identifies 9 core personality types, each driven by a specific core motivation, fear, and desire. Your core type is the primary lens through which you see the world.",
  },
  "Wing": {
    short: "The adjacent type that flavors your core",
    full: "Your wing is one of the two types adjacent to your core type on the Enneagram circle. It adds a secondary flavor to your personality. For example, a 5w4 (Five with a Four wing) has the Five's analytical depth colored by the Four's emotional intensity.",
  },
  "Instinctual Stacking": {
    short: "Your ordering of the 3 survival drives",
    full: "The three instinctual drives are Self-Preservation (sp), Sexual/One-to-One (sx), and Social (so). Everyone uses all three, but in a specific order. Your dominant instinct shapes how your core type expresses itself. Your blind spot (the third) is the instinct you most neglect.",
  },
  "Tritype": {
    short: "Your type from each of the 3 centers",
    full: "The tritype identifies which type you use in each of the three intelligence centers: Head (5, 6, 7 — thinking), Heart (2, 3, 4 — feeling), and Gut (8, 9, 1 — instinct). Your tritype shows your full three-center strategy.",
  },
  "Subtype": {
    short: "Your core type + dominant instinct",
    full: "Subtypes combine your core Enneagram type with your dominant instinctual drive. There are 27 subtypes total (9 types × 3 instincts). Each subtype has a unique character structure described by Beatrice Chestnut. The 'countertype' of each type often looks different from the typical description.",
  },
  "Levels of Development": {
    short: "9 levels from healthy to unhealthy",
    full: "Developed by Riso and Hudson, the 9 Levels of Development describe the full spectrum of each type from their healthiest expression (Level 1) to their most destructive (Level 9). Most people operate between Levels 3-7. Growth means moving toward lower numbers.",
  },
  "Integration Line": {
    short: "The type you move toward in growth",
    full: "When growing and healthy, each type takes on the positive qualities of another specific type. This is called the integration or growth line. For example, Type 5 integrates to Type 8, becoming more decisive and action-oriented.",
  },
  "Disintegration Line": {
    short: "The type you move toward in stress",
    full: "Under stress, each type takes on the unhealthy qualities of another specific type. This is the disintegration or stress line. For example, Type 5 disintegrates to Type 7, becoming scattered and escapist.",
  },
  "Passion": {
    short: "Your type's emotional vice (Naranjo)",
    full: "In Claudio Naranjo's framework, each type has a core emotional 'passion' — an automatic emotional habit that drives behavior. For example, Type 5's passion is Avarice (hoarding of energy and resources), and Type 2's passion is Pride (belief that you don't have needs).",
  },
  "Fixation": {
    short: "Your type's cognitive distortion",
    full: "The fixation is the mental habit that supports the passion. It's how your type's mind characteristically distorts reality. For example, Type 5's fixation is Stinginess (mental withdrawal and over-compartmentalizing).",
  },
  "Virtue": {
    short: "Your type's healthy emotional quality",
    full: "The virtue is the healthy emotional quality that naturally emerges when the passion is transcended. For Type 5, the virtue is Non-Attachment — generous presence without needing to hoard.",
  },
  // Cognitive function terms
  "Cognitive Functions": {
    short: "8 mental processes from Jung's theory",
    full: "Carl Jung identified 8 cognitive functions: 4 perceiving functions (Ni, Ne, Si, Se) for taking in information, and 4 judging functions (Ti, Te, Fi, Fe) for making decisions. Each person uses all 8, but in a specific order of preference.",
  },
  "Function Stack": {
    short: "Your personal ordering of the 8 functions",
    full: "Each of the 16 types has a specific ordering of cognitive functions. The top 4 form the ego stack (Dominant, Auxiliary, Tertiary, Inferior), and the bottom 4 form the shadow stack (based on John Beebe's model).",
  },
  "Dominant Function": {
    short: "Your strongest, most natural function",
    full: "The dominant function is your most developed and relied-upon cognitive process. It forms the core of your personality and is the lens through which you primarily engage with the world. For an INTJ, this is Ni (Introverted Intuition).",
  },
  "Auxiliary Function": {
    short: "Your supporting function",
    full: "The auxiliary function balances your dominant. If your dominant is a perceiving function, your auxiliary is a judging function (and vice versa). It develops primarily in adolescence and young adulthood.",
  },
  "Inferior Function": {
    short: "Your least developed function",
    full: "The inferior function is the opposite of your dominant on the same axis. It's your growth edge and can be a source of both aspiration and stress. Under extreme stress, it can 'grip' you, causing uncharacteristic behavior.",
  },
  "Shadow Functions": {
    short: "Your 4 unconscious functions (Beebe)",
    full: "John Beebe's model adds 4 shadow functions to Jung's original 4-function model. These occupy archetypal positions (Nemesis, Critical Parent, Trickster, Demon) and represent largely unconscious aspects of your psyche.",
  },
  "Function Axis": {
    short: "A pair of opposing functions",
    full: "Functions come in opposing pairs on axes: Ni-Se, Ne-Si, Ti-Fe, Te-Fi. You always use both sides of an axis. If Ni is your dominant, Se is your inferior. These axes represent a fundamental tension in how you process information.",
  },
  "Loop": {
    short: "When you bypass your auxiliary function",
    full: "A cognitive loop happens when the dominant and tertiary functions 'team up' while bypassing the auxiliary. For an INTJ, a Ni-Fi loop means retreating into internal visions and personal values while neglecting Te's grounding in external reality.",
  },
  "Grip": {
    short: "When your inferior function erupts under stress",
    full: "The grip is an extreme stress response where your least developed function suddenly takes control. For an INTJ in Se grip, this might manifest as sensory overindulgence, impulsive behavior, or obsessing over physical details.",
  },
};
