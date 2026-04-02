/**
 * useAmbientMusic — Tone.js generative ambient music.
 * Pentatonic arpeggio + reverb + slight delay. No files. No licensing.
 * Only starts after a user gesture (browser autoplay policy).
 */

import { useRef, useState, useCallback } from "react";

type ToneModule = typeof import("tone");

interface ToneRefs {
  synth: InstanceType<ToneModule["PolySynth"]> | null;
  reverb: InstanceType<ToneModule["Reverb"]> | null;
  delay: InstanceType<ToneModule["FeedbackDelay"]> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seq: any | null;
}

// Pentatonic scale across two octaves — always pleasant, never jarring
const PENTATONIC = [
  "C4", "D4", "E4", "G4", "A4",
  "C5", "D5", "E5", "G5", "A5",
  "C4", "G4", "E5", "A4", "D5", // weighted repeats for natural-feeling variation
];

function pickNote() {
  return PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
}

export function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const toneRef = useRef<ToneRefs>({ synth: null, reverb: null, delay: null, seq: null });
  const loadedRef = useRef(false);

  const start = useCallback(async () => {
    if (loadedRef.current) {
      // Already initialized — just restart transport
      const Tone = await import("tone");
      Tone.getTransport().start();
      setIsPlaying(true);
      return;
    }

    try {
      const Tone = await import("tone");
      await Tone.start(); // unlock AudioContext after user gesture

      // Effects chain: synth → delay → reverb → destination
      const reverb = new Tone.Reverb({ decay: 5, wet: 0.55, preDelay: 0.05 });
      await reverb.ready;
      reverb.toDestination();

      const delay = new Tone.FeedbackDelay({ delayTime: "8n", feedback: 0.22, wet: 0.18 });
      delay.connect(reverb);

      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.9, decay: 0.3, sustain: 0.4, release: 3 },
        volume: -22,
      });
      synth.connect(delay);

      // Sequence: plays one note every 2 beats, with rests mixed in
      let step = 0;
      const seq = new Tone.Sequence(
        (time) => {
          step++;
          // ~30% chance of rest
          if (Math.random() > 0.7) return;
          const note = pickNote();
          const vel = 0.15 + Math.random() * 0.2;
          const dur = Math.random() > 0.4 ? "4n" : "2n";
          synth.triggerAttackRelease(note, dur, time, vel);
        },
        [0, 1, 2, 3],
        "4n"
      );

      seq.start(0);
      Tone.getTransport().bpm.value = 72;
      Tone.getTransport().start();

      toneRef.current = { synth, reverb, delay, seq };
      loadedRef.current = true;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Ambient music failed to start:", e);
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      const Tone = await import("tone");
      Tone.getTransport().stop();
    } catch {}
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      await stop();
    } else {
      await start();
    }
  }, [isPlaying, start, stop]);

  const fadeAndStop = useCallback(async () => {
    if (!toneRef.current.synth) return;
    try {
      toneRef.current.synth.volume.rampTo(-60, 2);
      await new Promise(r => setTimeout(r, 2100));
      await stop();
      toneRef.current.synth.volume.value = -22;
    } catch {}
  }, [stop]);

  return { isPlaying, toggle, start, stop, fadeAndStop };
}
