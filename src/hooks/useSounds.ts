/**
 * useSounds, Web Audio API tones, no sound files required.
 * Generates Duolingo-style correct/wrong/streak/levelup chimes in the browser.
 */

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  volume = 0.18,
  type: OscillatorType = "sine"
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  // Quick attack, smooth release
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

export function useSounds() {
  // [OK] Correct answer, bright ascending two-note chime (C5 → E5)
  function playCorrect() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 523.25, t,        0.15, 0.16); // C5
    playTone(ctx, 659.25, t + 0.1,  0.22, 0.20); // E5
  }

  // [X] Wrong answer, low descending thud (A3 → F3)
  function playWrong() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 220, t,       0.12, 0.14, "sawtooth"); // A3
    playTone(ctx, 174.61, t + 0.08, 0.18, 0.10, "sawtooth"); // F3
  }

  // [streak] Streak milestone, three ascending notes (C5 → E5 → G5)
  function playStreak() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 523.25, t,        0.12, 0.18); // C5
    playTone(ctx, 659.25, t + 0.09, 0.12, 0.20); // E5
    playTone(ctx, 783.99, t + 0.18, 0.22, 0.22); // G5
  }

  // ⬆️ Level up, triumphant four-note fanfare (C5→E5→G5→C6)
  function playLevelUp() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 523.25,  t,        0.15, 0.18); // C5
    playTone(ctx, 659.25,  t + 0.12, 0.15, 0.20); // E5
    playTone(ctx, 783.99,  t + 0.24, 0.15, 0.22); // G5
    playTone(ctx, 1046.50, t + 0.36, 0.35, 0.24); // C6
  }

  // [hint] Hint used, soft single chime
  function playHint() {
    const ctx = getAudioContext();
    if (!ctx) return;
    playTone(ctx, 440, ctx.currentTime, 0.18, 0.10); // A4
  }

  return { playCorrect, playWrong, playStreak, playLevelUp, playHint };
}
