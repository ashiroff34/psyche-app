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
  | "sorting";           // Order/categorize items

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

export type ExerciseContent =
  | ConceptIntroContent
  | MultipleChoiceContent
  | MatchingPairsContent
  | FillInBlankContent
  | ScenarioContent
  | SortingContent;

// ── Exercise & Lesson Structures ────────────────────────────────────────────

export interface Exercise {
  id: string;
  difficulty: 1 | 2 | 3;  // 1=recognition, 2=guided production, 3=free recall
  content: ExerciseContent;
}

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
}

export interface Unit {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  category: "enneagram-intro" | "enneagram-type" | "cognitive-intro" | "cognitive-function";
  lessons: Lesson[];
  requiresUnit?: string;  // ID of prerequisite unit
}

// ── Progress Tracking ───────────────────────────────────────────────────────

export interface LessonResult {
  completedAt: string;
  score: number;
  xpEarned: number;
  perfectRun: boolean;
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
