// ─────────────────────────────────────────────────────────────────────────────
// Lesson System Types
// Duolingo-style progressive lesson framework for psychology education
// ─────────────────────────────────────────────────────────────────────────────

// ── Exercise Types ──────────────────────────────────────────────────────────

export type ExerciseType =
  | "concept-intro"      // Read-only teaching card
  | "multiple-choice"    // 4 options, one correct
  | "matching-pairs"     // Tap to match pairs
  | "fill-in-blank"      // Sentence with blank + word bank
  | "scenario"           // Situational question with longer context
  | "sorting"            // Order/categorize items
  | "free-recall"        // Feynman technique: type your own explanation
  | "socratic-prompt"    // Reflection question before a concept reveal
  | "interleaving"       // Mixed-type discrimination practice
  | "story-scene";       // Narrative multiple-choice: character scene + question

// ── Discriminated Union for Exercise Content ────────────────────────────────

export interface ConceptIntroContent {
  type: "concept-intro";
  title: string;
  body: string;          // The teaching text (keep SHORT - 2-3 sentences max)
  highlight?: string;    // Key term to visually emphasize
}

export interface MultipleChoiceContent {
  type: "multiple-choice";
  question: string;
  options: string[];     // 4 options
  correctIndex: number;  // 0-3
  explanation: string;   // Shown after answering
}

export interface MatchingPairsContent {
  type: "matching-pairs";
  instruction: string;
  pairs: Array<{ left: string; right: string }>;  // 4-6 pairs
}

export interface FillInBlankContent {
  type: "fill-in-blank";
  sentence: string;      // Use "___" for the blank
  options: string[];     // 3-4 word choices
  correctIndex: number;
  explanation: string;
}

export interface ScenarioContent {
  type: "scenario";
  scenario: string;      // The longer context/story
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SortingContent {
  type: "sorting";
  instruction: string;
  categories: string[];                    // 2-3 category labels
  items: Array<{ text: string; categoryIndex: number }>;  // Items to sort
}

export interface FreeRecallContent {
  type: "free-recall";
  prompt: string;           // e.g. "In your own words, describe what drives a Type 5"
  keyTerms: string[];       // terms that count as a "good" answer if mentioned
  minWords: number;         // minimum word count (e.g. 15)
  modelAnswer: string;      // shown after submission. the ideal answer
}

export interface SocraticPromptContent {
  type: "socratic-prompt";
  question: string;         // The question asked before the concept
  reflection: string;       // Brief "think about it" framing
  revealLabel: string;      // Button label: "See the insight" / "Reveal answer"
  conceptTitle: string;     // Shown after reveal
  conceptBody: string;      // The actual teaching content revealed
  highlight?: string;
}

export interface InterleavingExerciseContent {
  type: "interleaving";
  title: string;
  typeNumbers: number[];    // The types being mixed (e.g. [1, 4, 6])
  items: Array<{
    statement: string;
    correctType: number;
    explanation: string;
  }>;
}

export interface StorySceneContent {
  type: "story-scene";
  character: string;        // e.g., "Maya"
  scene: string;            // 2-3 sentence narrative
  question: string;         // e.g., "What is Maya experiencing?"
  options: string[];        // 4 options
  correctIndex: number;
  explanation: string;
  typeHint?: number;        // Enneagram type the character exemplifies
}

export type ExerciseContent =
  | ConceptIntroContent
  | MultipleChoiceContent
  | MatchingPairsContent
  | FillInBlankContent
  | ScenarioContent
  | SortingContent
  | FreeRecallContent
  | SocraticPromptContent
  | InterleavingExerciseContent
  | StorySceneContent;

// ── Exercise & Lesson Structures ────────────────────────────────────────────

export interface Exercise {
  id: string;
  difficulty: 1 | 2 | 3;  // 1=recognition, 2=guided production, 3=free recall
  content: ExerciseContent;
}

export type ScaffoldStep = 1 | 2 | 3 | 4;
export const SCAFFOLD_LABELS: Record<ScaffoldStep, { label: string; color: string }> = {
  1: { label: "Portrait",    color: "#6366f1" }, // indigo. external view
  2: { label: "Core",        color: "#a855f7" }, // purple. internal structure
  3: { label: "Distinguish", color: "#f59e0b" }, // amber. discrimination
  4: { label: "Apply",       color: "#22c55e" }, // green. growth/application
};

export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  subtitle: string;
  exercises: Exercise[];
  xpReward: number;
  personalized?: boolean;
  personalizeFor?: "enneagramType" | "cognitiveType";
  scaffoldStep?: ScaffoldStep;
}

export interface Unit {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  category: "enneagram-intro" | "enneagram-type" | "cognitive-intro" | "cognitive-function" | "exploration" | "philosophy";
  lessons: Lesson[];
  requiresUnit?: string;  // ID of prerequisite unit
  tipCard?: {
    title: string;
    bullets: string[];  // 3-4 bullet points
  };
}

// ── Progress Tracking ───────────────────────────────────────────────────────

export interface LessonResult {
  completedAt: string;
  score: number;
  xpEarned: number;
  perfectRun: boolean;
  completionCount: number;  // tracks how many times lesson has been completed (crown levels)
}

export interface LessonInProgress {
  unitId: string;
  lessonId: string;
  exerciseIndex: number;
  answers: boolean[];
  recycleQueue: number[];
}

export interface LessonProgressState {
  completedLessons: Record<string, LessonResult>;
  currentLesson?: LessonInProgress;
}
