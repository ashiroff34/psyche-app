// ─────────────────────────────────────────────────────────────────────────────
// Lesson Units, Master Index
// Defines all 21 units with metadata. Lesson arrays will be populated by
// dedicated data files created by other agents.
// ─────────────────────────────────────────────────────────────────────────────

import type { Unit, Lesson, Exercise, ExerciseContent } from "@/types/lessons";
import { enneagramTypes } from "@/data/enneagram";
import { cognitiveFunctions, mbtiTypes } from "@/data/cognitive-functions";
import type { PsycheProfile } from "@/hooks/useProfile";
import { unit01Lessons } from "@/data/lessons/unit-01-what-is-enneagram";
import { unit02Lessons } from "@/data/lessons/unit-02-your-type";
import { unit12Lessons } from "@/data/lessons/unit-12-your-mind";
import { unit13Lessons } from "@/data/lessons/unit-13-what-are-cognitive-functions";
import { type1Lessons } from "@/data/lessons/unit-03-type1";
import { type2Lessons } from "@/data/lessons/unit-04-type2";
import { type3Lessons } from "@/data/lessons/unit-05-type3";
import { type4Lessons } from "@/data/lessons/unit-06-type4";
import { unit07Lessons } from "@/data/lessons/unit-07-type5";
import { unit08Lessons } from "@/data/lessons/unit-08-type6";
import { unit09Lessons } from "@/data/lessons/unit-09-type7";
import { unit10Lessons } from "@/data/lessons/unit-10-type8";
import { unit11Lessons } from "@/data/lessons/unit-11-type9";
import { fiLessons } from "@/data/lessons/unit-14-fi";
import { feLessons } from "@/data/lessons/unit-15-fe";
import { tiLessons } from "@/data/lessons/unit-16-ti";
import { teLessons } from "@/data/lessons/unit-17-te";
import { unit18Lessons } from "@/data/lessons/unit-18-ni";
import { unit19Lessons } from "@/data/lessons/unit-19-ne";
import { unit20Lessons } from "@/data/lessons/unit-20-si";
import { unit21Lessons } from "@/data/lessons/unit-21-se";
import { unit22Lessons } from "@/data/lessons/unit-22-am-i-typed-correctly";
import { unit23Lessons } from "@/data/lessons/unit-23-the-observer";
import { unit24Lessons } from "@/data/lessons/unit-24-your-core-question";
import { unit25Lessons } from "@/data/lessons/unit-25-identity-in-motion";
import { unit26Lessons } from "@/data/lessons/unit-26-philosophical-self-inquiry";
import { unit27Lessons } from "@/data/lessons/unit-27-living-as-yourself";
import { unit28Lessons } from "@/data/lessons/unit-28-the-looker";
import { unit29Lessons } from "@/data/lessons/unit-29-is-there-a-self";
import { unit30Lessons } from "@/data/lessons/unit-30-holding-both";
import { unit31Lessons } from "@/data/lessons/unit-31-holy-ideas";

// ── Unit Metadata ───────────────────────────────────────────────────────────

export const LESSON_UNITS: Unit[] = [
  // ─ Enneagram Intro ─────────────────────────────────────────────────────
  {
    id: "what-is-enneagram",
    order: 1,
    title: "What Is the Enneagram?",
    subtitle: "Origins, structure, and the nine types at a glance",
    icon: "BookOpen",
    category: "enneagram-intro",
    lessons: unit01Lessons,
  },
  {
    id: "your-type",
    order: 2,
    title: "Your Type",
    subtitle: "Deep dive into your core motivations, fears, and desires",
    icon: "Target",
    category: "enneagram-intro",
    lessons: unit02Lessons,
    requiresUnit: "what-is-enneagram",
  },

  // ─ Enneagram Type Deep Dives ───────────────────────────────────────────
  {
    id: "type-1",
    order: 3,
    title: "Type 1, The Reformer",
    subtitle: "Principled, purposeful, self-controlled",
    icon: "Scale",
    category: "enneagram-type",
    lessons: type1Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-2",
    order: 4,
    title: "Type 2, The Helper",
    subtitle: "Generous, demonstrative, people-pleasing",
    icon: "Heart",
    category: "enneagram-type",
    lessons: type2Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-3",
    order: 5,
    title: "Type 3, The Achiever",
    subtitle: "Adaptable, excelling, driven",
    icon: "Star",
    category: "enneagram-type",
    lessons: type3Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-4",
    order: 6,
    title: "Type 4, The Individualist",
    subtitle: "Expressive, dramatic, self-aware",
    icon: "Pencil",
    category: "enneagram-type",
    lessons: type4Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-5",
    order: 7,
    title: "Type 5, The Investigator",
    subtitle: "Perceptive, innovative, cerebral",
    icon: "Search",
    category: "enneagram-type",
    lessons: unit07Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-6",
    order: 8,
    title: "Type 6, The Loyalist",
    subtitle: "Engaging, responsible, vigilant",
    icon: "Shield",
    category: "enneagram-type",
    lessons: unit08Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-7",
    order: 9,
    title: "Type 7, The Enthusiast",
    subtitle: "Spontaneous, versatile, adventurous",
    icon: "Sparkles",
    category: "enneagram-type",
    lessons: unit09Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-8",
    order: 10,
    title: "Type 8, The Challenger",
    subtitle: "Self-confident, decisive, protective",
    icon: "Flame",
    category: "enneagram-type",
    lessons: unit10Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "type-9",
    order: 11,
    title: "Type 9, The Peacemaker",
    subtitle: "Receptive, reassuring, harmonious",
    icon: "Wind",
    category: "enneagram-type",
    lessons: unit11Lessons,
    requiresUnit: "your-type",
  },

  // ─ Cognitive Intro ─────────────────────────────────────────────────────
  {
    id: "your-mind",
    order: 12,
    title: "Your Mind",
    subtitle: "How your cognitive type shapes your thinking",
    icon: "Brain",
    category: "cognitive-intro",
    lessons: unit12Lessons,
    requiresUnit: "your-type",
  },
  {
    id: "what-are-cognitive-functions",
    order: 13,
    title: "What Are Cognitive Functions?",
    subtitle: "Jung's framework for how we perceive and decide",
    icon: "Lightbulb",
    category: "cognitive-intro",
    lessons: unit13Lessons,
    requiresUnit: "your-mind",
  },

  // ─ Cognitive Function Deep Dives ───────────────────────────────────────
  {
    id: "fi",
    order: 14,
    title: "Introverted Feeling (Fi)",
    subtitle: "Inner values, authenticity, personal ethics",
    icon: "Compass",
    category: "cognitive-function",
    lessons: fiLessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "fe",
    order: 15,
    title: "Extraverted Feeling (Fe)",
    subtitle: "Social harmony, group values, emotional attunement",
    icon: "Users",
    category: "cognitive-function",
    lessons: feLessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "ti",
    order: 16,
    title: "Introverted Thinking (Ti)",
    subtitle: "Internal logic, frameworks, precision",
    icon: "Layers",
    category: "cognitive-function",
    lessons: tiLessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "te",
    order: 17,
    title: "Extraverted Thinking (Te)",
    subtitle: "External logic, efficiency, organization",
    icon: "BarChart2",
    category: "cognitive-function",
    lessons: teLessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "ni",
    order: 18,
    title: "Introverted Intuition (Ni)",
    subtitle: "Patterns, foresight, convergent insight",
    icon: "Eye",
    category: "cognitive-function",
    lessons: unit18Lessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "ne",
    order: 19,
    title: "Extraverted Intuition (Ne)",
    subtitle: "Possibilities, connections, divergent thinking",
    icon: "Shuffle",
    category: "cognitive-function",
    lessons: unit19Lessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "si",
    order: 20,
    title: "Introverted Sensing (Si)",
    subtitle: "Memory, tradition, detailed recall",
    icon: "BookMarked",
    category: "cognitive-function",
    lessons: unit20Lessons,
    requiresUnit: "what-are-cognitive-functions",
  },
  {
    id: "se",
    order: 21,
    title: "Extraverted Sensing (Se)",
    subtitle: "Present moment, action, sensory experience",
    icon: "Zap",
    category: "cognitive-function",
    lessons: unit21Lessons,
    requiresUnit: "what-are-cognitive-functions",
  },

  // ─ Exploration ────────────────────────────────────────────────────────
  {
    id: "am-i-typed-correctly",
    order: 22,
    title: "Am I Typed Correctly?",
    subtitle: "Open-ended exploration, no right or wrong answers",
    icon: "HelpCircle",
    category: "exploration",
    lessons: unit22Lessons,
    requiresUnit: "your-type", // available early, only needs type knowledge
  },

  // ─ Philosophy ────────────────────────────────────────────────────────
  {
    id: "the-observer",
    order: 23,
    title: "The Observer",
    subtitle: "Learning to watch your patterns without being controlled by them",
    icon: "Eye",
    category: "philosophy",
    lessons: unit23Lessons,
    requiresUnit: "am-i-typed-correctly",
  },
  {
    id: "your-core-question",
    order: 24,
    title: "Your Core Question",
    subtitle: "The philosophical question your type is wrestling with",
    icon: "Compass",
    category: "philosophy",
    lessons: unit24Lessons,
    requiresUnit: "the-observer",
  },
  {
    id: "identity-in-motion",
    order: 25,
    title: "Identity in Motion",
    subtitle: "Your type stays. Your relationship to it changes.",
    icon: "RefreshCw",
    category: "philosophy",
    lessons: unit25Lessons,
    requiresUnit: "your-core-question",
  },
  {
    id: "philosophical-self-inquiry",
    order: 26,
    title: "The Examined Life",
    subtitle: "Philosophical self-inquiry as a daily practice",
    icon: "Sparkles",
    category: "philosophy",
    lessons: unit26Lessons,
    requiresUnit: "identity-in-motion",
  },
  {
    id: "living-as-yourself",
    order: 27,
    title: "Living as Yourself",
    subtitle: "Acting from values, not from fear",
    icon: "Sun",
    category: "philosophy",
    lessons: unit27Lessons,
    requiresUnit: "philosophical-self-inquiry",
  },
  {
    id: "the-looker",
    order: 28,
    title: "The Looker",
    subtitle: "Look for the one who is looking",
    icon: "Eye",
    category: "philosophy",
    lessons: unit28Lessons,
    requiresUnit: "living-as-yourself",
  },
  {
    id: "is-there-a-self",
    order: 29,
    title: "What If There Is No Fixed Self?",
    subtitle: "An investigation, not a belief",
    icon: "CircleDot",
    category: "philosophy",
    lessons: unit29Lessons,
    requiresUnit: "the-looker",
  },
  {
    id: "holding-both",
    order: 30,
    title: "Holding Both",
    subtitle: "You are a type. You are the space in which the type happens.",
    icon: "Infinity",
    category: "philosophy",
    lessons: unit30Lessons,
    requiresUnit: "is-there-a-self",
  },
  {
    id: "holy-ideas",
    order: 31,
    title: "Your Type's Hidden Gift",
    subtitle: "What becomes available when the pattern relaxes",
    icon: "Gem",
    category: "philosophy",
    lessons: unit31Lessons,
    requiresUnit: "holding-both",
  },
];

// ── Lookup Helpers ──────────────────────────────────────────────────────────

export function getUnit(unitId: string): Unit | undefined {
  return LESSON_UNITS.find((u) => u.id === unitId);
}

export function getLesson(
  unitId: string,
  lessonId: string
): Lesson | undefined {
  const unit = getUnit(unitId);
  if (!unit) return undefined;
  return unit.lessons.find((l) => l.id === lessonId);
}

export function getAllLessons(): Lesson[] {
  return LESSON_UNITS.flatMap((u) => u.lessons);
}

// ── Personalization ─────────────────────────────────────────────────────────
// Replaces template tokens in exercise content with actual profile data.
// Tokens: {{typeName}}, {{coreFear}}, {{coreDesire}}, {{coreMotivation}},
// {{typeAlias}}, {{typeNumber}}, {{cognitiveType}}, {{dominantFunction}},
// {{dominantFunctionName}}, {{auxiliaryFunction}}, {{auxiliaryFunctionName}},
// {{tertiaryFunction}}, {{tertiaryFunctionName}}, {{inferiorFunction}},
// {{inferiorFunctionName}}

function replaceTokens(text: string, replacements: Record<string, string>): string {
  let result = text;
  for (const [token, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{\\{${token}\\}\\}`, "g"), value);
  }
  return result;
}

function replaceInContent(
  content: Exercise["content"],
  replacements: Record<string, string>
): Exercise["content"] {
  // Deep-clone to avoid mutating source data
  const clone = JSON.parse(JSON.stringify(content));

  const replaceFields = (obj: Record<string, unknown>) => {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (typeof val === "string") {
        obj[key] = replaceTokens(val, replacements);
      } else if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          if (typeof val[i] === "string") {
            val[i] = replaceTokens(val[i], replacements);
          } else if (typeof val[i] === "object" && val[i] !== null) {
            replaceFields(val[i] as Record<string, unknown>);
          }
        }
      } else if (typeof val === "object" && val !== null) {
        replaceFields(val as Record<string, unknown>);
      }
    }
  };

  replaceFields(clone as Record<string, unknown>);
  return clone;
}

export function personalizeExercises(
  exercises: Exercise[],
  profile: PsycheProfile
): Exercise[] {
  const replacements: Record<string, string> = {};

  // Enneagram data
  if (profile.enneagramType) {
    const typeData = enneagramTypes.find(
      (t) => t.number === profile.enneagramType
    );
    if (typeData) {
      replacements.typeName = typeData.name;
      replacements.typeAlias = typeData.alias;
      replacements.typeNumber = String(typeData.number);
      replacements.coreFear = typeData.coreFear;
      replacements.coreDesire = typeData.coreDesire;
      replacements.coreMotivation = typeData.coreMotivation;
    }
  }

  // Cognitive data
  if (profile.cognitiveType) {
    replacements.cognitiveType = profile.cognitiveType;
  }
  if (profile.dominantFunction) {
    replacements.dominantFunction = profile.dominantFunction;
    const funcData = cognitiveFunctions.find(
      (f) => f.code === profile.dominantFunction
    );
    if (funcData) {
      replacements.dominantFunctionName = funcData.name;
    }
  }

  // Derive auxiliary, tertiary, and inferior from the MBTI type's stack
  if (profile.cognitiveType) {
    const typeData = mbtiTypes.find((t) => t.code === profile.cognitiveType);
    if (typeData && typeData.stack.length >= 4) {
      const stackPositions = ["dominant", "auxiliary", "tertiary", "inferior"] as const;
      for (let i = 1; i < 4; i++) {
        const posName = stackPositions[i];
        const code = typeData.stack[i];
        replacements[`${posName}Function`] = code;
        const fd = cognitiveFunctions.find((f) => f.code === code);
        if (fd) {
          replacements[`${posName}FunctionName`] = fd.name;
        }
      }
    }
  }

  // If no replacements needed, return original
  if (Object.keys(replacements).length === 0) return exercises;

  return exercises.map((ex) => ({
    ...ex,
    content: replaceInContent(ex.content, replacements),
  }));
}
