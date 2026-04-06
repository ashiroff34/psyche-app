/**
 * Shuffles multiple-choice options with true uniform randomness.
 * Returns shuffled options AND the new index of the correct answer.
 * Uses Fisher-Yates shuffle for unbiased results.
 */
export function shuffleOptions<T>(
  options: T[],
  correctIndex: number
): { shuffled: T[]; newCorrectIndex: number } {
  const arr = [...options];
  const indexMap = arr.map((_, i) => i); // track original positions

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    [indexMap[i], indexMap[j]] = [indexMap[j], indexMap[i]];
  }

  const newCorrectIndex = indexMap.indexOf(correctIndex);
  return { shuffled: arr, newCorrectIndex };
}

/**
 * Stable shuffle — same question always shuffles the same way
 * (so re-renders don't re-shuffle). Uses a string seed (e.g. exercise ID).
 * Uses a seeded LCG (linear congruential generator).
 */
export function stableShuffleOptions<T>(
  options: T[],
  correctIndex: number,
  seed: string
): { shuffled: T[]; newCorrectIndex: number } {
  // Derive a numeric hash from the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }

  const seededRandom = () => {
    hash = (hash * 1664525 + 1013904223) & 0xffffffff;
    return (hash >>> 0) / 0xffffffff;
  };

  const arr = [...options];
  const indexMap = arr.map((_, i) => i);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    [indexMap[i], indexMap[j]] = [indexMap[j], indexMap[i]];
  }

  const newCorrectIndex = indexMap.indexOf(correctIndex);
  return { shuffled: arr, newCorrectIndex };
}
