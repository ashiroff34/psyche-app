"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Square, Volume2, VolumeX, Settings, X } from "lucide-react";
import { getAudioReflection } from "@/data/audio-reflections";
import { posthog } from "@/lib/posthog";

interface Props {
  type: number;
  onClose?: () => void;
}

// Web Speech API wrapper, reads text aloud using browser's built-in TTS.
// Falls back gracefully if speech synthesis isn't supported.

export default function AudioReflection({ type, onClose }: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [supported, setSupported] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [rate, setRate] = useState(0.92);  // slightly slower than default
  const [pitch, setPitch] = useState(1.0);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ambient, setAmbient] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const ambientRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  const reflection = getAudioReflection(type);

  // Check TTS support + load voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      // Prefer English voices, female voices if available (softer for reflection)
      const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
      setAvailableVoices(englishVoices.length > 0 ? englishVoices : voices);
      // Pick a default: prefer "Samantha" (iOS), "Google UK English Female", etc.
      const preferred =
        englishVoices.find((v) => /samantha|karen|serena|moira/i.test(v.name)) ??
        englishVoices.find((v) => v.name.toLowerCase().includes("female")) ??
        englishVoices[0] ??
        voices[0];
      if (preferred) setVoice(preferred);
    }

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  // Ambient music via tone.js (lazy load)
  async function toggleAmbient() {
    if (!ambient) {
      try {
        const Tone = await import("tone");
        await Tone.start();
        // Gentle pad chord (Cmaj7-ish) with reverb
        const reverb = new Tone.Reverb({ decay: 8, wet: 0.7 }).toDestination();
        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sine" },
          envelope: { attack: 2, decay: 1, sustain: 0.8, release: 4 },
          volume: -24,
        }).connect(reverb);
        const notes = ["C3", "E3", "G3", "B3"];
        const play = () => synth.triggerAttackRelease(notes, "4n");
        play();
        const interval = setInterval(play, 4000);

        ambientRef.current = {
          start: () => {},
          stop: () => {
            clearInterval(interval);
            synth.releaseAll();
            synth.dispose();
            reverb.dispose();
          },
        };
        setAmbient(true);
      } catch (e) {
        console.error("Failed to start ambient audio:", e);
      }
    } else {
      if (ambientRef.current) {
        ambientRef.current.stop();
        ambientRef.current = null;
      }
      setAmbient(false);
    }
  }

  function handlePlay() {
    if (!supported || !reflection) return;
    const synth = window.speechSynthesis;

    // Cancel any existing utterance
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(reflection.script);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;
    if (voice) utterance.voice = voice;

    setTotalChars(reflection.script.length);
    setProgress(0);

    utterance.onboundary = (event) => {
      if (event.charIndex) setProgress(event.charIndex);
    };
    utterance.onend = () => {
      setPlaying(false);
      setProgress(0);
      if (ambient && ambientRef.current) {
        ambientRef.current.stop();
        ambientRef.current = null;
        setAmbient(false);
      }
    };
    utterance.onerror = () => {
      setPlaying(false);
      setProgress(0);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
    setPlaying(true);

    try { posthog.capture("audio_reflection_started", { enneagramType: type, ambient }); } catch {}
  }

  function handlePause() {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.pause();
      setPlaying(false);
    } else {
      window.speechSynthesis.resume();
      setPlaying(true);
    }
  }

  function handleStop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setProgress(0);
    if (ambient && ambientRef.current) {
      ambientRef.current.stop();
      ambientRef.current = null;
      setAmbient(false);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (ambientRef.current) {
        ambientRef.current.stop();
      }
    };
  }, []);

  if (!reflection) return null;

  if (!supported) {
    return (
      <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Your browser doesn&apos;t support voice playback, but here&apos;s the reflection in text:
        </p>
        <p className="text-sm font-serif italic mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
          {reflection.script}
        </p>
      </div>
    );
  }

  const progressPct = totalChars > 0 ? (progress / totalChars) * 100 : 0;

  return (
    <div
      className="p-5 rounded-3xl"
      style={{
        background: "linear-gradient(145deg, rgba(139,92,246,0.08), rgba(217,70,239,0.04))",
        border: "1px solid rgba(139,92,246,0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(167,139,250,0.75)" }}>
            Audio reflection · {reflection.duration}
          </p>
          <h3 className="text-base font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
            {reflection.title}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={playing ? handlePause : handlePlay}
          disabled={!supported}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
            boxShadow: "0 4px 24px rgba(139,92,246,0.4)",
          }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-0.5" />
          )}
        </button>

        <button
          onClick={handleStop}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Stop"
        >
          <Square className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>

        <button
          onClick={toggleAmbient}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{
            background: ambient ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)",
            border: ambient ? "1px solid rgba(167,139,250,0.4)" : "1px solid rgba(255,255,255,0.1)",
            color: ambient ? "#c4b5fd" : "rgba(255,255,255,0.6)",
          }}
        >
          {ambient ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          Ambient
        </button>

        <button
          onClick={() => setShowSettings((v) => !v)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Settings"
        >
          <Settings className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>
      </div>

      {/* Settings drawer */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-3 mt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <label htmlFor="audio-speed-range" className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Speed: {rate.toFixed(2)}x
                </label>
                <input
                  id="audio-speed-range"
                  type="range"
                  min={0.6}
                  max={1.4}
                  step={0.02}
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="audio-pitch-range" className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Pitch: {pitch.toFixed(2)}
                </label>
                <input
                  id="audio-pitch-range"
                  type="range"
                  min={0.6}
                  max={1.4}
                  step={0.02}
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              {availableVoices.length > 0 && (
                <div>
                  <label htmlFor="audio-reflection-voice" className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Voice
                  </label>
                  <select
                    id="audio-reflection-voice"
                    value={voice?.name ?? ""}
                    onChange={(e) => {
                      const v = availableVoices.find((x) => x.name === e.target.value);
                      if (v) setVoice(v);
                    }}
                    className="w-full px-2 py-1.5 rounded-lg text-xs"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}
                  >
                    {availableVoices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Script transcript */}
      <details className="mt-4">
        <summary className="text-[11px] font-semibold cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>
          Read the transcript
        </summary>
        <p className="text-xs font-serif italic leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          {reflection.script}
        </p>
      </details>
    </div>
  );
}
