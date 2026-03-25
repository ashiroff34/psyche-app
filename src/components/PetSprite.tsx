"use client";

import { motion } from "framer-motion";

// ─── Shared animation wrapper ─────────────────────────────────────────────────

function FloatWrapper({
  children,
  className,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  size: number;
}) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" as const }}
    >
      {children}
    </motion.div>
  );
}

// ─── Shared SVG constants ─────────────────────────────────────────────────────

const STROKE = "#1e1b4b";
const STROKE_W = 1.8;
const STROKE_ROUND: React.CSSProperties = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// ─── Type 1: Owl ──────────────────────────────────────────────────────────────

export function PetType1({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <ellipse cx="60" cy="82" rx="22" ry="26" fill="#f1f5f9" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Wings */}
        <path d="M38 80 Q28 72 30 60 Q34 68 38 72 Z" fill="#e2e8f0" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M82 80 Q92 72 90 60 Q86 68 82 72 Z" fill="#e2e8f0" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Head */}
        <circle cx="60" cy="50" r="24" fill="#f8fafc" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Ear tufts */}
        <path d="M46 30 L43 22 L50 27 Z" fill="#e2e8f0" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M74 30 L77 22 L70 27 Z" fill="#e2e8f0" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Left eye circle */}
        <circle cx="50" cy="50" r="9" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="50" cy="50" r="5" fill={STROKE} />
        <circle cx="52" cy="48" r="1.5" fill="white" />
        {/* Right eye circle */}
        <circle cx="70" cy="50" r="9" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="70" cy="50" r="5" fill={STROKE} />
        <circle cx="72" cy="48" r="1.5" fill="white" />
        {/* Beak */}
        <path d="M57 56 L60 62 L63 56 Z" fill="#fcd34d" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Chest pattern */}
        <path d="M48 75 Q60 70 72 75" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} opacity="0.5" />
        <path d="M50 80 Q60 76 70 80" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} opacity="0.5" />
        {/* Small scroll */}
        <rect x="52" y="95" width="16" height="10" rx="2" fill="#fef9c3" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="55" y1="99" x2="65" y2="99" stroke={STROKE} strokeWidth={1} />
        <line x1="55" y1="102" x2="62" y2="102" stroke={STROKE} strokeWidth={1} />
        {/* Feet */}
        <path d="M50 106 L46 110 M50 106 L50 111 M50 106 L54 110" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M70 106 L66 110 M70 106 L70 111 M70 106 L74 110" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 2: Bunny ────────────────────────────────────────────────────────────

export function PetType2({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ears */}
        <ellipse cx="44" cy="28" rx="8" ry="20" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <ellipse cx="44" cy="28" rx="4" ry="14" fill="#fce7f3" stroke="none" />
        <ellipse cx="76" cy="28" rx="8" ry="20" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <ellipse cx="76" cy="28" rx="4" ry="14" fill="#fce7f3" stroke="none" />
        {/* Head */}
        <circle cx="60" cy="56" r="26" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Eyes */}
        <circle cx="50" cy="54" r="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="50" cy="54" r="3.5" fill={STROKE} />
        <circle cx="51.5" cy="52.5" r="1.2" fill="white" />
        <circle cx="70" cy="54" r="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="70" cy="54" r="3.5" fill={STROKE} />
        <circle cx="71.5" cy="52.5" r="1.2" fill="white" />
        {/* Rosy cheeks */}
        <circle cx="44" cy="60" r="5" fill="#fda4af" opacity="0.4" />
        <circle cx="76" cy="60" r="5" fill="#fda4af" opacity="0.4" />
        {/* Nose */}
        <ellipse cx="60" cy="62" rx="2.5" ry="1.5" fill="#fb7185" />
        {/* Mouth */}
        <path d="M57 64 Q60 68 63 64" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} />
        {/* Whiskers */}
        <line x1="34" y1="61" x2="50" y2="63" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="34" y1="65" x2="50" y2="65" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="86" y1="61" x2="70" y2="63" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="86" y1="65" x2="70" y2="65" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        {/* Body */}
        <ellipse cx="60" cy="92" rx="22" ry="20" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Heart on chest */}
        <path d="M55 88 C55 85 58 83 60 85 C62 83 65 85 65 88 C65 92 60 96 60 96 C60 96 55 92 55 88 Z" fill="#fb7185" stroke={STROKE} strokeWidth={1} />
        {/* Arms */}
        <ellipse cx="38" cy="90" rx="8" ry="6" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} transform="rotate(-20 38 90)" />
        <ellipse cx="82" cy="90" rx="8" ry="6" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} transform="rotate(20 82 90)" />
        {/* Feet */}
        <ellipse cx="50" cy="108" rx="10" ry="6" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="70" cy="108" rx="10" ry="6" fill="#fdf2f8" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Tail */}
        <circle cx="82" cy="100" r="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 3: Fox ──────────────────────────────────────────────────────────────

export function PetType3({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail */}
        <path d="M82 95 Q105 88 108 105 Q96 110 82 105 Z" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M94 104 Q108 105 106 108 Q98 110 94 104 Z" fill="white" stroke="none" />
        {/* Body */}
        <ellipse cx="56" cy="88" rx="20" ry="22" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Chest */}
        <ellipse cx="56" cy="92" rx="12" ry="14" fill="#fff7ed" stroke={STROKE} strokeWidth={1} opacity="0.8" />
        {/* Ears */}
        <path d="M40 38 L34 18 L50 30 Z" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M41 36 L37 22 L48 31 Z" fill="#fca5a5" stroke="none" />
        <path d="M76 38 L82 18 L66 30 Z" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M75 36 L79 22 L67 31 Z" fill="#fca5a5" stroke="none" />
        {/* Head */}
        <ellipse cx="58" cy="52" rx="26" ry="24" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Muzzle */}
        <ellipse cx="58" cy="62" rx="14" ry="10" fill="#fff7ed" stroke={STROKE} strokeWidth={1.2} />
        {/* Eyes */}
        <ellipse cx="46" cy="48" rx="5" ry="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="46" cy="49" rx="3" ry="4" fill={STROKE} />
        <circle cx="47.5" cy="47.5" r="1.2" fill="white" />
        <ellipse cx="70" cy="48" rx="5" ry="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="70" cy="49" rx="3" ry="4" fill={STROKE} />
        <circle cx="71.5" cy="47.5" r="1.2" fill="white" />
        {/* Nose */}
        <ellipse cx="58" cy="60" rx="3" ry="2" fill={STROKE} />
        {/* Mouth */}
        <path d="M55 63 Q58 67 61 63" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} />
        {/* Star on forehead */}
        <path d="M58 32 L59.5 37 L64 37 L60.5 40 L62 45 L58 42 L54 45 L55.5 40 L52 37 L56.5 37 Z" fill="#fcd34d" stroke={STROKE} strokeWidth={1} />
        {/* Whiskers */}
        <line x1="34" y1="60" x2="46" y2="62" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="34" y1="64" x2="46" y2="64" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="82" y1="60" x2="70" y2="62" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="82" y1="64" x2="70" y2="64" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        {/* Confident stance - arms out */}
        <path d="M36 82 Q28 80 26 74" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M76 82 Q84 80 86 74" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Feet */}
        <ellipse cx="47" cy="107" rx="10" ry="6" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="65" cy="107" rx="10" ry="6" fill="#fed7aa" stroke={STROKE} strokeWidth={STROKE_W} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 4: Moth ────────────────────────────────────────────────────────────

export function PetType4({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper wings */}
        <path d="M60 58 Q38 35 20 40 Q22 58 44 65 Z" fill="#ede9fe" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M22 41 Q30 48 38 55" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M25 47 Q32 52 40 58" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M60 58 Q82 35 100 40 Q98 58 76 65 Z" fill="#ede9fe" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M98 41 Q90 48 82 55" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M95 47 Q88 52 80 58" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        {/* Lower wings */}
        <path d="M60 72 Q40 70 30 88 Q44 95 58 80 Z" fill="#ddd6fe" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M60 72 Q80 70 90 88 Q76 95 62 80 Z" fill="#ddd6fe" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Crescent moon patterns on wings */}
        <path d="M30 50 Q26 44 30 38 Q24 40 24 48 Q24 54 30 50 Z" fill="#c4b5fd" opacity="0.5" />
        <path d="M90 50 Q94 44 90 38 Q96 40 96 48 Q96 54 90 50 Z" fill="#c4b5fd" opacity="0.5" />
        {/* Body */}
        <ellipse cx="60" cy="72" rx="8" ry="18" fill="#f5f3ff" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Body segments */}
        <line x1="52" y1="68" x2="68" y2="68" stroke={STROKE} strokeWidth={1} opacity="0.4" />
        <line x1="52" y1="73" x2="68" y2="73" stroke={STROKE} strokeWidth={1} opacity="0.4" />
        <line x1="52" y1="78" x2="68" y2="78" stroke={STROKE} strokeWidth={1} opacity="0.4" />
        {/* Head */}
        <circle cx="60" cy="50" r="14" fill="#f5f3ff" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Antennae */}
        <path d="M55 38 Q50 28 44 24" stroke={STROKE} strokeWidth={1.5} style={STROKE_ROUND} />
        <circle cx="44" cy="24" r="2.5" fill={STROKE} />
        <path d="M65 38 Q70 28 76 24" stroke={STROKE} strokeWidth={1.5} style={STROKE_ROUND} />
        <circle cx="76" cy="24" r="2.5" fill={STROKE} />
        {/* Eyes - melancholy, slightly downcast */}
        <ellipse cx="54" cy="51" rx="5" ry="5.5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="54" cy="52" rx="3" ry="3.5" fill={STROKE} />
        <circle cx="55.2" cy="50.5" r="1" fill="white" />
        <ellipse cx="66" cy="51" rx="5" ry="5.5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="66" cy="52" rx="3" ry="3.5" fill={STROKE} />
        <circle cx="67.2" cy="50.5" r="1" fill="white" />
        {/* Small frown */}
        <path d="M57 58 Q60 56 63 58" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} />
        {/* Crescent moon accent */}
        <path d="M58 42 Q54 38 58 34 Q52 36 52 40 Q52 44 58 42 Z" fill="#c4b5fd" opacity="0.7" />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 5: Raven ────────────────────────────────────────────────────────────

export function PetType5({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stack of books */}
        <rect x="34" y="96" width="30" height="8" rx="1.5" fill="#bfdbfe" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="36" y="89" width="26" height="8" rx="1.5" fill="#a5f3fc" stroke={STROKE} strokeWidth={STROKE_W} />
        <rect x="32" y="82" width="32" height="8" rx="1.5" fill="#c7d2fe" stroke={STROKE} strokeWidth={STROKE_W} />
        <line x1="34" y1="96" x2="34" y2="104" stroke={STROKE} strokeWidth={1} />
        <line x1="36" y1="89" x2="36" y2="97" stroke={STROKE} strokeWidth={1} />
        <line x1="32" y1="82" x2="32" y2="90" stroke={STROKE} strokeWidth={1} />
        {/* Tail */}
        <path d="M80 90 Q90 95 92 108 L80 105 Z" fill="#1e1b4b" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Body */}
        <ellipse cx="72" cy="84" rx="18" ry="20" fill="#312e81" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Wing detail */}
        <path d="M54 78 Q58 70 72 70 Q72 78 62 84 Z" fill="#3730a3" stroke={STROKE} strokeWidth={1} style={STROKE_ROUND} />
        {/* Head */}
        <circle cx="72" cy="54" r="22" fill="#312e81" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Left eye - bigger, intense */}
        <circle cx="62" cy="52" r="9" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="62" cy="52" r="5.5" fill="#1e1b4b" />
        <circle cx="64" cy="50" r="1.8" fill="white" />
        {/* Right eye - smaller */}
        <circle cx="78" cy="52" r="6" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="78" cy="52" r="3.5" fill="#1e1b4b" />
        <circle cx="79.5" cy="50.5" r="1.2" fill="white" />
        {/* Beak */}
        <path d="M68 60 L74 65 L68 68 Z" fill="#fcd34d" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Feather crest */}
        <path d="M66 34 Q68 28 72 26 Q70 32 72 34" stroke={STROKE} strokeWidth={1.5} style={STROKE_ROUND} />
        <path d="M72 32 Q74 26 78 24 Q76 30 78 32" stroke={STROKE} strokeWidth={1.5} style={STROKE_ROUND} />
        {/* Perch feet */}
        <path d="M63 100 L58 106 M63 100 L63 108 M63 100 L68 106" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M81 100 L76 106 M81 100 L81 108 M81 100 L86 106" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 6: Shiba Inu ────────────────────────────────────────────────────────

export function PetType6({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail curled up */}
        <path d="M80 82 Q98 70 96 56 Q92 52 88 58 Q90 70 78 78 Z" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Body */}
        <ellipse cx="58" cy="88" rx="22" ry="20" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Belly */}
        <ellipse cx="58" cy="92" rx="14" ry="12" fill="#fef3c7" stroke={STROKE} strokeWidth={1} opacity="0.9" />
        {/* Ears - alert, pointed up */}
        <path d="M38 44 L32 26 L48 36 Z" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M39 42 L35 28 L46 37 Z" fill="#fca5a5" stroke="none" opacity="0.7" />
        <path d="M78 44 L84 26 L68 36 Z" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M77 42 L81 28 L70 37 Z" fill="#fca5a5" stroke="none" opacity="0.7" />
        {/* Head */}
        <ellipse cx="58" cy="54" rx="26" ry="24" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Muzzle area */}
        <ellipse cx="58" cy="64" rx="14" ry="10" fill="#fef3c7" stroke={STROKE} strokeWidth={1.2} opacity="0.9" />
        {/* Eyes - loyal alert expression */}
        <ellipse cx="46" cy="50" rx="6" ry="6.5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="46" cy="51" r="4" fill={STROKE} />
        <circle cx="47.5" cy="49.5" r="1.3" fill="white" />
        <ellipse cx="70" cy="50" rx="6" ry="6.5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="70" cy="51" r="4" fill={STROKE} />
        <circle cx="71.5" cy="49.5" r="1.3" fill="white" />
        {/* Nose */}
        <ellipse cx="58" cy="60" rx="4" ry="3" fill={STROKE} />
        <ellipse cx="57" cy="59" rx="1.5" ry="1" fill="white" opacity="0.5" />
        {/* Mouth */}
        <path d="M55 64 Q58 68 61 64" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} />
        {/* Rosy cheeks */}
        <circle cx="40" cy="58" r="5" fill="#fca5a5" opacity="0.35" />
        <circle cx="76" cy="58" r="5" fill="#fca5a5" opacity="0.35" />
        {/* Shield on chest */}
        <path d="M49 85 L49 78 L58 76 L67 78 L67 85 Q67 91 58 94 Q49 91 49 85 Z" fill="#bfdbfe" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M58 80 L60 84 L64 82 L62 87 L58 85 L54 87 L52 82 L56 84 Z" fill={STROKE} opacity="0.3" />
        {/* Front legs */}
        <path d="M42 100 Q38 106 38 112 L46 112 Q46 106 46 100 Z" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M70 100 Q74 106 74 112 L66 112 Q66 106 66 100 Z" fill="#fbbf24" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 7: Hummingbird ──────────────────────────────────────────────────────

export function PetType7({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rainbow trail */}
        <path d="M86 60 Q95 50 108 48" stroke="#f87171" strokeWidth={2} opacity="0.5" style={STROKE_ROUND} />
        <path d="M88 64 Q97 56 110 56" stroke="#fb923c" strokeWidth={2} opacity="0.5" style={STROKE_ROUND} />
        <path d="M88 68 Q97 62 110 62" stroke="#fbbf24" strokeWidth={2} opacity="0.5" style={STROKE_ROUND} />
        <path d="M86 72 Q95 70 108 72" stroke="#4ade80" strokeWidth={2} opacity="0.5" style={STROKE_ROUND} />
        <path d="M84 76 Q93 78 106 80" stroke="#60a5fa" strokeWidth={2} opacity="0.5" style={STROKE_ROUND} />
        {/* Wings - blurred/multiple for motion effect */}
        <ellipse cx="52" cy="52" rx="28" ry="12" fill="#a5f3fc" stroke={STROKE} strokeWidth={1} opacity="0.3" transform="rotate(-25 52 52)" />
        <ellipse cx="52" cy="52" rx="28" ry="10" fill="#a5f3fc" stroke={STROKE} strokeWidth={1.2} opacity="0.5" transform="rotate(-15 52 52)" />
        <ellipse cx="52" cy="52" rx="26" ry="9" fill="#bae6fd" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(-8 52 52)" />
        {/* Lower wings */}
        <ellipse cx="52" cy="72" rx="22" ry="8" fill="#a5f3fc" stroke={STROKE} strokeWidth={1} opacity="0.3" transform="rotate(20 52 72)" />
        <ellipse cx="52" cy="72" rx="20" ry="7" fill="#bae6fd" stroke={STROKE} strokeWidth={STROKE_W} transform="rotate(15 52 72)" />
        {/* Body */}
        <ellipse cx="62" cy="65" rx="12" ry="20" fill="#34d399" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} transform="rotate(15 62 65)" />
        {/* Belly shimmer */}
        <ellipse cx="59" cy="68" rx="7" ry="12" fill="#6ee7b7" stroke="none" opacity="0.6" transform="rotate(15 59 68)" />
        {/* Head */}
        <circle cx="58" cy="44" r="16" fill="#10b981" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Iridescent head shimmer */}
        <circle cx="58" cy="42" r="10" fill="#34d399" opacity="0.4" />
        {/* Eyes */}
        <circle cx="52" cy="42" r="5.5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="52" cy="42" r="3" fill={STROKE} />
        <circle cx="53" cy="41" r="1" fill="white" />
        <circle cx="64" cy="42" r="5.5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        <circle cx="64" cy="42" r="3" fill={STROKE} />
        <circle cx="65" cy="41" r="1" fill="white" />
        {/* Long beak - mid-flight */}
        <path d="M44 47 L20 52 L44 52 Z" fill="#1e1b4b" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Feet */}
        <path d="M60 84 L56 92 L60 90 L64 92 L60 84" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 8: Dragon ──────────────────────────────────────────────────────────

export function PetType8({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail with spikes */}
        <path d="M82 95 Q100 90 108 100 Q98 108 82 103 Z" fill="#f87171" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M88 91 L92 84 L90 94 Z" fill="#fca5a5" stroke={STROKE} strokeWidth={1} />
        <path d="M96 94 L102 88 L100 97 Z" fill="#fca5a5" stroke={STROKE} strokeWidth={1} />
        {/* Wings */}
        <path d="M40 72 Q20 55 18 38 Q30 40 40 55 Q44 62 44 70 Z" fill="#fecaca" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M26 42 Q24 50 28 56" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M30 40 Q28 48 32 54" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M76 72 Q96 55 98 38 Q86 40 76 55 Q72 62 72 70 Z" fill="#fecaca" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M90 42 Q92 50 88 56" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M86 40 Q88 48 84 54" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        {/* Body */}
        <ellipse cx="58" cy="88" rx="22" ry="20" fill="#ef4444" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Belly scales */}
        <ellipse cx="58" cy="92" rx="14" ry="12" fill="#fca5a5" stroke={STROKE} strokeWidth={1} opacity="0.7" />
        <path d="M44 90 Q58 86 72 90" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        <path d="M44 94 Q58 91 72 94" stroke={STROKE} strokeWidth={1} opacity="0.4" style={STROKE_ROUND} />
        {/* Spine spikes on back */}
        <path d="M50 70 L47 60 L53 68 Z" fill="#dc2626" stroke={STROKE} strokeWidth={1} />
        <path d="M58 68 L55 57 L61 66 Z" fill="#dc2626" stroke={STROKE} strokeWidth={1} />
        <path d="M66 70 L63 60 L69 68 Z" fill="#dc2626" stroke={STROKE} strokeWidth={1} />
        {/* Head */}
        <ellipse cx="58" cy="52" rx="24" ry="22" fill="#ef4444" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Horns */}
        <path d="M44 36 L38 22 L48 32 Z" fill="#dc2626" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M72 36 L78 22 L68 32 Z" fill="#dc2626" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Eyes - fierce */}
        <ellipse cx="46" cy="50" rx="7" ry="6" fill="#fef2f2" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="46" cy="50" rx="4" ry="5" fill={STROKE} />
        <circle cx="47.5" cy="48.5" r="1.5" fill="white" />
        {/* Slit pupil for fierceness */}
        <ellipse cx="70" cy="50" rx="7" ry="6" fill="#fef2f2" stroke={STROKE} strokeWidth={STROKE_W} />
        <ellipse cx="70" cy="50" rx="4" ry="5" fill={STROKE} />
        <circle cx="71.5" cy="48.5" r="1.5" fill="white" />
        {/* Fierce brow lines */}
        <path d="M40 44 L52 46" stroke={STROKE} strokeWidth={1.5} style={STROKE_ROUND} />
        <path d="M76 44 L64 46" stroke={STROKE} strokeWidth={1.5} style={STROKE_ROUND} />
        {/* Snout */}
        <ellipse cx="58" cy="62" rx="12" ry="8" fill="#dc2626" stroke={STROKE} strokeWidth={1.2} />
        <ellipse cx="54" cy="63" rx="2" ry="1.5" fill={STROKE} opacity="0.7" />
        <ellipse cx="62" cy="63" rx="2" ry="1.5" fill={STROKE} opacity="0.7" />
        {/* Small fire breath */}
        <path d="M58 70 Q54 76 52 82 Q58 78 60 82 Q62 76 66 82 Q64 76 58 70 Z" fill="#fcd34d" stroke="#f97316" strokeWidth={1} opacity="0.8" />
        {/* Feet */}
        <path d="M42 104 L38 110 M42 104 L42 112 M42 104 L48 110" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M74 104 L70 110 M74 104 L74 112 M74 104 L80 110" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
      </svg>
    </FloatWrapper>
  );
}

// ─── Type 9: Cat ──────────────────────────────────────────────────────────────

export function PetType9({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <FloatWrapper size={size} className={className}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cloud above head */}
        <circle cx="60" cy="22" r="9" fill="white" stroke={STROKE} strokeWidth={1.2} opacity="0.9" />
        <circle cx="50" cy="26" r="7" fill="white" stroke={STROKE} strokeWidth={1.2} opacity="0.9" />
        <circle cx="70" cy="26" r="7" fill="white" stroke={STROKE} strokeWidth={1.2} opacity="0.9" />
        <circle cx="45" cy="32" r="6" fill="white" stroke={STROKE} strokeWidth={1.2} opacity="0.9" />
        <circle cx="75" cy="32" r="6" fill="white" stroke={STROKE} strokeWidth={1.2} opacity="0.9" />
        {/* Zzz sleep indicators */}
        <text x="65" y="18" fontSize="7" fill={STROKE} opacity="0.5" fontStyle="italic">z</text>
        <text x="70" y="12" fontSize="9" fill={STROKE} opacity="0.4" fontStyle="italic">z</text>
        {/* Tail curled around */}
        <path d="M84 90 Q104 80 104 65 Q104 52 92 52 Q82 52 80 60 Q78 68 84 72 Q90 76 86 84 Z" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Body - curled up position */}
        <ellipse cx="58" cy="90" rx="28" ry="20" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Belly */}
        <ellipse cx="55" cy="94" rx="18" ry="12" fill="#e2e8f0" stroke={STROKE} strokeWidth={1} opacity="0.8" />
        {/* Paws tucked under */}
        <ellipse cx="40" cy="102" rx="10" ry="6" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <ellipse cx="62" cy="105" rx="10" ry="5" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        {/* Paw beans */}
        <circle cx="36" cy="103" r="2" fill="#cbd5e1" stroke={STROKE} strokeWidth={0.8} />
        <circle cx="40" cy="105" r="2" fill="#cbd5e1" stroke={STROKE} strokeWidth={0.8} />
        <circle cx="44" cy="103" r="2" fill="#cbd5e1" stroke={STROKE} strokeWidth={0.8} />
        {/* Ears */}
        <path d="M34 62 L28 46 L44 56 Z" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M35 60 L30 48 L42 57 Z" fill="#fda4af" stroke="none" opacity="0.7" />
        <path d="M76 62 L82 46 L66 56 Z" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} style={STROKE_ROUND} />
        <path d="M75 60 L80 48 L68 57 Z" fill="#fda4af" stroke="none" opacity="0.7" />
        {/* Head */}
        <circle cx="55" cy="68" r="22" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Eyes - sleepy, half-closed */}
        <ellipse cx="44" cy="66" rx="8" ry="5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Half-closed eyelid */}
        <path d="M36 64 Q44 60 52 64" fill="#94a3b8" />
        <ellipse cx="44" cy="67" rx="5" ry="3" fill={STROKE} />
        <circle cx="45.5" cy="66" r="1" fill="white" />
        <ellipse cx="66" cy="66" rx="8" ry="5" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
        {/* Half-closed eyelid */}
        <path d="M58 64 Q66 60 74 64" fill="#94a3b8" />
        <ellipse cx="66" cy="67" rx="5" ry="3" fill={STROKE} />
        <circle cx="67.5" cy="66" r="1" fill="white" />
        {/* Nose */}
        <path d="M52 73 L55 76 L58 73" fill="#fda4af" stroke={STROKE} strokeWidth={1} style={STROKE_ROUND} />
        {/* Mouth - content sleepy smile */}
        <path d="M52 77 Q55 80 58 77" stroke={STROKE} strokeWidth={1.2} style={STROKE_ROUND} />
        {/* Whiskers */}
        <line x1="25" y1="70" x2="44" y2="72" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="25" y1="74" x2="44" y2="74" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="85" y1="70" x2="66" y2="72" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        <line x1="85" y1="74" x2="66" y2="74" stroke={STROKE} strokeWidth={1} opacity="0.5" />
        {/* Rosy cheeks */}
        <circle cx="36" cy="72" r="5" fill="#fda4af" opacity="0.3" />
        <circle cx="74" cy="72" r="5" fill="#fda4af" opacity="0.3" />
      </svg>
    </FloatWrapper>
  );
}

// ─── Mapping ──────────────────────────────────────────────────────────────────

export const PET_SVG_MAP: Record<number, React.FC<{ className?: string; size?: number }>> = {
  1: PetType1,
  2: PetType2,
  3: PetType3,
  4: PetType4,
  5: PetType5,
  6: PetType6,
  7: PetType7,
  8: PetType8,
  9: PetType9,
};

// ─── PetSprite ────────────────────────────────────────────────────────────────

interface PetSpriteProps {
  type: number;
  size?: number;
  className?: string;
}

export default function PetSprite({ type, size = 100, className }: PetSpriteProps) {
  const Component = PET_SVG_MAP[type];
  if (!Component) {
    // Fallback placeholder
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 ${className ?? ""}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return <Component size={size} className={className} />;
}
