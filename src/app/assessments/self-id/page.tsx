"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp, Check, BookOpen } from "lucide-react";
import { enneagramTypes } from "@/data/enneagram";
import { useProfile } from "@/hooks/useProfile";

// ── Aurora background blobs ───────────────────────────────────────────────────
function AuroraBlobs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

// ── Intro screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "0 20px 120px",
        paddingTop: 100,
      }}
    >
      <div
        style={{
          borderRadius: 28,
          padding: "32px 28px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(79,70,229,0.4))",
            border: "1px solid rgba(167,139,250,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <BookOpen size={26} color="rgba(167,139,250,0.9)" />
        </div>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(255,255,255,0.93)",
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          Find yourself in the text
        </h2>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            marginBottom: 24,
          }}
        >
          Professional typologists agree: the most accurate way to find your Enneagram type is to read
          all nine descriptions and recognize yourself from the inside. Behavior alone won&apos;t reveal
          your type. two people can act identically but be completely different types.
        </p>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            marginBottom: 28,
          }}
        >
          Look for the one that describes your <em style={{ color: "rgba(167,139,250,0.85)", fontStyle: "italic" }}>inner world</em>. your
          fears, your motivations. not just what you do.
        </p>

        {/* Recommended by */}
        <div
          style={{
            borderRadius: 14,
            padding: "12px 16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 28,
          }}
        >
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Recommended by
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", lineHeight: 1.5 }}>
            Helen Palmer · Russ Hudson · Beatrice Chestnut
          </p>
        </div>

        <button
          onClick={onBegin}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 18,
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
            border: "none",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(124,58,237,0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(124,58,237,0.45)";
          }}
        >
          Begin Reading
        </button>
      </div>
    </motion.div>
  );
}

// ── Confirmation overlay ──────────────────────────────────────────────────────
interface ConfirmOverlayProps {
  typeNumber: number;
  typeName: string;
  typeColor: string;
  typeIcon: string;
  confidence: number;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmOverlay({
  typeNumber,
  typeName,
  typeColor,
  typeIcon,
  confidence,
  onConfirm,
  onCancel,
}: ConfirmOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10,6,25,0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 28,
          padding: "32px 28px",
          background: "rgba(20,14,40,0.96)",
          border: `1.5px solid ${typeColor}55`,
          boxShadow: `0 0 60px ${typeColor}22, 0 24px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Type badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `${typeColor}22`,
              border: `1.5px solid ${typeColor}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            {typeIcon}
          </div>
          <div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>
              You identified as
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 20,
                fontWeight: 700,
                color: typeColor,
                lineHeight: 1.2,
              }}
            >
              Type {typeNumber}. {typeName}
            </div>
          </div>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.62)", marginBottom: 8 }}>
          This will be recorded with <span style={{ color: "rgba(167,139,250,0.9)", fontWeight: 600 }}>+{confidence}% confidence</span>.
          You can always retake this assessment or explore other types.
        </p>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 28, lineHeight: 1.5 }}>
          Self-identification is the gold standard in Enneagram typology. Trust your inner recognition.
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 14,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Keep Reading
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1.4,
              padding: "12px 0",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${typeColor}cc, ${typeColor}88)`,
              border: `1px solid ${typeColor}66`,
              boxShadow: `0 6px 20px ${typeColor}44`,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Type card ─────────────────────────────────────────────────────────────────
interface TypeCardProps {
  typeData: (typeof enneagramTypes)[0];
  isExpanded: boolean;
  isRead: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onMarkRead: () => void;
  onSelectThis: () => void;
}

function TypeCard({
  typeData,
  isExpanded,
  isRead,
  isSelected,
  onToggleExpand,
  onMarkRead,
  onSelectThis,
}: TypeCardProps) {
  const color = typeData.color;

  const cardBorder = isSelected
    ? `1.5px solid ${color}88`
    : isRead
    ? "1px solid rgba(52,211,153,0.28)"
    : "1px solid rgba(255,255,255,0.09)";

  const cardGlow = isSelected
    ? `0 0 28px ${color}28, 0 4px 24px rgba(0,0,0,0.3)`
    : isRead
    ? "0 0 16px rgba(52,211,153,0.10), 0 2px 12px rgba(0,0,0,0.25)"
    : "0 2px 12px rgba(0,0,0,0.2)";

  return (
    <motion.div
      layout
      style={{
        borderRadius: 24,
        background: isSelected
          ? `linear-gradient(135deg, ${color}12, rgba(255,255,255,0.04))`
          : "rgba(255,255,255,0.04)",
        border: cardBorder,
        boxShadow: cardGlow,
        overflow: "hidden",
        transition: "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Card header. always visible */}
      <button
        onClick={onToggleExpand}
        style={{
          width: "100%",
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Number + icon */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 38 }}>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 26,
              fontWeight: 800,
              color: color,
              lineHeight: 1,
            }}
          >
            {typeData.number}
          </span>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{typeData.icon}</span>
        </div>

        {/* Name + alias + brief */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 16,
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {typeData.name}
            </span>
            {isRead && (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(52,211,153,0.2)",
                  border: "1px solid rgba(52,211,153,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check size={10} color="rgba(52,211,153,0.9)" strokeWidth={3} />
              </span>
            )}
            {isSelected && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: color,
                  background: `${color}22`,
                  border: `1px solid ${color}44`,
                  borderRadius: 20,
                  padding: "2px 8px",
                  letterSpacing: "0.04em",
                }}
              >
                YOU
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 5 }}>
            {typeData.alias}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.56)", lineHeight: 1.5 }}>
            {typeData.brief}
          </div>
        </div>

        {/* Expand chevron */}
        <div style={{ flexShrink: 0, color: "rgba(255,255,255,0.3)" }}>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 22px 24px",
                borderTop: `1px solid ${color}22`,
                marginTop: 0,
              }}
            >
              {/* Divider line */}
              <div
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, ${color}44, transparent)`,
                  marginBottom: 20,
                  marginTop: 0,
                }}
              />

              {/* Full description */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.72)",
                  marginBottom: 22,
                }}
              >
                {typeData.description}
              </p>

              {/* Core triad: Fear, Desire, Motivation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                <CorePill
                  label="Core Fear"
                  text={typeData.coreFear}
                  color="#e05a5a"
                  bg="rgba(224,90,90,0.10)"
                  borderColor="rgba(224,90,90,0.22)"
                />
                <CorePill
                  label="Core Desire"
                  text={typeData.coreDesire}
                  color="#5ab8e0"
                  bg="rgba(90,184,224,0.10)"
                  borderColor="rgba(90,184,224,0.22)"
                />
                <CorePill
                  label="Core Motivation"
                  text={typeData.coreMotivation}
                  color={color}
                  bg={`${color}15`}
                  borderColor={`${color}33`}
                />
              </div>

              {/* Key traits */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {typeData.keyTraits.map((trait) => (
                  <span
                    key={trait}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.60)",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 20,
                      padding: "5px 12px",
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                {/* Mark as read */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead();
                  }}
                  style={{
                    flex: 1,
                    padding: "11px 0",
                    borderRadius: 14,
                    background: isRead ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.07)",
                    border: isRead ? "1px solid rgba(52,211,153,0.35)" : "1px solid rgba(255,255,255,0.12)",
                    color: isRead ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.65)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    transition: "all 0.2s",
                  }}
                >
                  {isRead ? (
                    <>
                      <Check size={14} strokeWidth={2.5} />
                      Read
                    </>
                  ) : (
                    "Mark as read"
                  )}
                </button>

                {/* This is me */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectThis();
                  }}
                  style={{
                    flex: 1.4,
                    padding: "11px 0",
                    borderRadius: 14,
                    background: isSelected
                      ? `linear-gradient(135deg, ${color}cc, ${color}88)`
                      : `linear-gradient(135deg, ${color}44, ${color}28)`,
                    border: `1px solid ${color}${isSelected ? "88" : "44"}`,
                    boxShadow: isSelected ? `0 4px 16px ${color}44` : "none",
                    color: isSelected ? "#fff" : `${color}dd`,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {isSelected ? "This is me ✓" : "This is me"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Core pill subcomponent ────────────────────────────────────────────────────
function CorePill({
  label,
  text,
  color,
  bg,
  borderColor,
}: {
  label: string;
  text: string;
  color: string;
  bg: string;
  borderColor: string;
}) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: "10px 14px",
        background: bg,
        border: `1px solid ${borderColor}`,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: color,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 3,
          opacity: 0.85,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.70)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SelfIdPage() {
  const router = useRouter();
  const { recordAssessment, addXP } = useProfile();

  const [phase, setPhase] = useState<"intro" | "reading">("intro");
  const [expandedType, setExpandedType] = useState<number | null>(null);
  const [readTypes, setReadTypes] = useState<Set<number>>(new Set());
  const [pendingConfirm, setPendingConfirm] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Auto-expand first type when reading starts
  useEffect(() => {
    if (phase === "reading" && expandedType === null) {
      setExpandedType(enneagramTypes[0].number);
    }
  }, [phase, expandedType]);

  const handleToggleExpand = (num: number) => {
    setExpandedType((prev) => (prev === num ? null : num));
  };

  const handleMarkRead = (num: number) => {
    setReadTypes((prev) => {
      const next = new Set(prev);
      next.add(num);
      return next;
    });
    // Auto-expand next unread type
    const currentIdx = enneagramTypes.findIndex((t) => t.number === num);
    const nextUnread = enneagramTypes.slice(currentIdx + 1).find((t) => !readTypes.has(t.number));
    if (nextUnread) {
      setExpandedType(nextUnread.number);
      // Scroll to next card after a brief delay
      setTimeout(() => {
        const el = cardRefs.current[nextUnread.number];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } else {
      setExpandedType(null);
    }
  };

  const handleSelectType = (num: number) => {
    setPendingConfirm(num);
  };

  const handleConfirm = () => {
    if (pendingConfirm === null) return;
    const typeNum = pendingConfirm;
    setSelectedType(typeNum);
    setPendingConfirm(null);

    recordAssessment("self-id", 70, typeNum);
    addXP(75, "self-id-complete");

    const params = new URLSearchParams({
      type: String(typeNum),
      confidence: "70",
      assessmentLength: "self-id",
      showTwo: "false",
      secondType: String(typeNum),
      instinct: "SP",
      instinctScores: JSON.stringify([]),
    });
    router.push(`/enneagram/results?${params.toString()}`);
  };

  const readCount = readTypes.size;
  const allRead = readCount === 9;

  const pendingTypeData = pendingConfirm !== null
    ? enneagramTypes.find((t) => t.number === pendingConfirm)
    : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0a1e", position: "relative" }}>
      <AuroraBlobs />

      {/* ── Fixed header ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(15,10,30,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => router.push("/assessments")}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={17} color="rgba(255,255,255,0.75)" />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.2,
            }}
          >
            Self-Identification
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 1 }}>
            Read each type · Find yourself
          </div>
        </div>

        {/* Progress pill */}
        {phase === "reading" && (
          <div
            style={{
              flexShrink: 0,
              borderRadius: 20,
              padding: "5px 12px",
              background: allRead
                ? "rgba(52,211,153,0.15)"
                : "rgba(255,255,255,0.07)",
              border: allRead
                ? "1px solid rgba(52,211,153,0.35)"
                : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: allRead ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.55)",
              }}
            >
              {readCount} / 9
            </span>
          </div>
        )}
      </div>

      {/* ── Page content ──────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: 64 }}>
        <AnimatePresence mode="wait">
          {phase === "intro" ? (
            <IntroScreen key="intro" onBegin={() => setPhase("reading")} />
          ) : (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                maxWidth: 560,
                margin: "0 auto",
                padding: "24px 16px 160px",
              }}
            >
              {/* Section heading */}
              <div style={{ marginBottom: 20, paddingLeft: 4 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.40)",
                    lineHeight: 1.6,
                  }}
                >
                  Read each type fully. Mark it as read when done. Tap &ldquo;This is me&rdquo; when one resonates from the inside.
                </p>
              </div>

              {/* Type cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {enneagramTypes.map((typeData) => (
                  <div
                    key={typeData.number}
                    ref={(el) => { cardRefs.current[typeData.number] = el; }}
                    style={{ scrollMarginTop: 80 }}
                  >
                    <TypeCard
                      typeData={typeData}
                      isExpanded={expandedType === typeData.number}
                      isRead={readTypes.has(typeData.number)}
                      isSelected={selectedType === typeData.number}
                      onToggleExpand={() => handleToggleExpand(typeData.number)}
                      onMarkRead={() => handleMarkRead(typeData.number)}
                      onSelectThis={() => handleSelectType(typeData.number)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom sticky bar (after 3+ types read) ───────────────────────── */}
      <AnimatePresence>
        {phase === "reading" && readCount >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              padding: "14px 20px 28px",
              background: "rgba(15,10,30,0.92)",
              backdropFilter: "blur(16px)",
              borderTop: allRead
                ? "1px solid rgba(52,211,153,0.22)"
                : "1px solid rgba(255,255,255,0.07)",
              boxShadow: allRead
                ? "0 -8px 40px rgba(52,211,153,0.10)"
                : "0 -4px 20px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            {allRead ? (
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "rgba(52,211,153,0.92)",
                    marginBottom: 4,
                  }}
                >
                  All 9 types read!
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                  Which one is you? Tap &ldquo;This is me&rdquo; on the type that resonates deepest.
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                <span style={{ color: "rgba(255,255,255,0.70)", fontWeight: 600 }}>
                  {readCount} of 9
                </span>{" "}
                types read. keep reading for best accuracy
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Confirmation overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {pendingConfirm !== null && pendingTypeData && (
          <ConfirmOverlay
            key="confirm-overlay"
            typeNumber={pendingTypeData.number}
            typeName={pendingTypeData.name}
            typeColor={pendingTypeData.color}
            typeIcon={pendingTypeData.icon}
            confidence={70}
            onConfirm={handleConfirm}
            onCancel={() => setPendingConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
