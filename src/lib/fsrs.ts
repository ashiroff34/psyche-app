/**
 * FSRS v6 spaced repetition wrapper for Thyself.
 * Wraps ts-fsrs to provide a simple interface for quiz question scheduling.
 */
import { createEmptyCard, fsrs, Rating, type Card } from "ts-fsrs";

export type { Card };
export { Rating };

const scheduler = fsrs();

/** Persistent card state stored in localStorage per question ID */
export interface FSRSCard {
  due: string;           // ISO string — when the card is next due
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number; // required by ts-fsrs v6 Card type
  reps: number;
  lapses: number;
  state: number;          // 0=New 1=Learning 2=Review 3=Relearning
  last_review: string;    // ISO string
}

/** Convert a stored FSRSCard back to a ts-fsrs Card object */
function hydrateCard(stored: FSRSCard): Card {
  return {
    due: new Date(stored.due),
    stability: stored.stability,
    difficulty: stored.difficulty,
    elapsed_days: stored.elapsed_days,
    scheduled_days: stored.scheduled_days,
    learning_steps: stored.learning_steps ?? 0,
    reps: stored.reps,
    lapses: stored.lapses,
    state: stored.state as Card["state"],
    last_review: new Date(stored.last_review),
  };
}

/** Convert a ts-fsrs Card to storable FSRSCard */
function dehydrateCard(card: Card): FSRSCard {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    learning_steps: card.learning_steps ?? 0,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as number,
    last_review: card.last_review instanceof Date
      ? card.last_review.toISOString()
      : new Date().toISOString(),
  };
}

/** Create an empty FSRS card (for first-time questions) */
export function createFSRSCard(): FSRSCard {
  const card = createEmptyCard(new Date());
  return dehydrateCard(card);
}

/**
 * Rate a card after answering a question.
 * @param stored - Current card state (null for brand new questions)
 * @param correct - Whether the user answered correctly
 * @param fast    - If the user answered very quickly and confidently (easy)
 * @returns Updated FSRSCard to persist
 */
export function rateCard(
  stored: FSRSCard | null,
  correct: boolean,
  fast = false
): FSRSCard {
  const card = stored ? hydrateCard(stored) : createEmptyCard(new Date());
  const now = new Date();

  let rating: Rating;
  if (!correct) {
    rating = Rating.Again;
  } else if (fast) {
    rating = Rating.Easy;
  } else {
    rating = Rating.Good;
  }

  const result = scheduler.next(card, now, rating);
  return dehydrateCard(result.card);
}

/**
 * Check if a card is due for review (due date is in the past or today).
 */
export function isCardDue(stored: FSRSCard | null): boolean {
  if (!stored) return true; // never seen = always due
  return new Date(stored.due) <= new Date();
}

/**
 * Get a priority weight for selecting questions (lower = higher priority).
 * Due cards get much lower numbers (higher priority).
 */
export function getCardPriority(stored: FSRSCard | null): number {
  if (!stored) return 0;               // never seen = highest priority
  const dueMs = new Date(stored.due).getTime();
  const nowMs = Date.now();
  if (dueMs <= nowMs) return 1;        // overdue
  const daysUntilDue = (dueMs - nowMs) / 86_400_000;
  return 2 + daysUntilDue;            // further away = higher number = lower priority
}
