import Link from "next/link";
import { notFound } from "next/navigation";
import { ENNEAGRAM_SUBTYPES, INSTINCT_LABELS, getSubtypeBySlug } from "@/data/seo-entities/enneagram-subtypes";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hex(color: string, alpha: number) {
  // convert hex + alpha → rgba for inline styles
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SubtypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subtype = getSubtypeBySlug(slug);
  if (!subtype) notFound();

  const { typeColor } = subtype;
  const instinctLabel = INSTINCT_LABELS[subtype.instinct];

  // Resolve related subtype entities (filter out any stale slug refs)
  const related = subtype.relatedSlugs
    .map((s) => ENNEAGRAM_SUBTYPES.find((e) => e.slug === s))
    .filter(Boolean);

  // ── Shared style tokens ──────────────────────────────────────────────────
  const bg = "#0f0a1e";
  const cardBg = "rgba(255,255,255,0.03)";
  const cardBorder = "rgba(255,255,255,0.08)";
  const textPrimary = "rgba(255,255,255,0.95)";
  const textBody = "rgba(255,255,255,0.75)";
  const textMuted = "rgba(255,255,255,0.45)";
  const accentBg = hex(typeColor, 0.12);
  const accentBorder = hex(typeColor, 0.3);

  return (
    <div style={{ background: bg, minHeight: "100vh", color: textBody }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          style={{ fontSize: "0.75rem", color: textMuted, marginBottom: "2rem", display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <Link href="/enneagram" style={{ color: textMuted, textDecoration: "none" }}>Enneagram</Link>
          <span>/</span>
          <Link href="/enneagram/subtypes" style={{ color: textMuted, textDecoration: "none" }}>Subtypes</Link>
          <span>/</span>
          <span style={{ color: textPrimary }}>Type {subtype.type} {subtype.instinct}</span>
        </nav>

        {/* ── Hero ── */}
        <header style={{ marginBottom: "3rem" }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.25rem 0.65rem",
                borderRadius: "999px",
                background: accentBg,
                border: `1px solid ${accentBorder}`,
                color: typeColor,
              }}
            >
              {instinctLabel}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.25rem 0.65rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: textMuted,
              }}
            >
              Type {subtype.type} &mdash; {subtype.typeName}
            </span>
            {subtype.isCountertype && (
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "999px",
                  background: "rgba(234,179,8,0.12)",
                  border: "1px solid rgba(234,179,8,0.3)",
                  color: "#eab308",
                }}
              >
                Countertype
              </span>
            )}
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 700,
              color: textPrimary,
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            Enneagram Type {subtype.type} {instinctLabel}:{" "}
            <span style={{ color: typeColor }}>{subtype.modernLabel}</span>
          </h1>

          {/* Ichazo keyword */}
          <p style={{ fontSize: "0.8rem", color: textMuted, marginBottom: "1.25rem", fontStyle: "italic" }}>
            Ichazo keyword: &ldquo;{subtype.ichazoKeyword}&rdquo;
          </p>

          {/* Intro */}
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.85)",
              borderLeft: `3px solid ${typeColor}`,
              paddingLeft: "1.25rem",
              margin: 0,
            }}
          >
            {subtype.intro}
          </p>
        </header>

        {/* ── Core Mechanism ── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
            Core Mechanism
          </h2>
          <p style={{ lineHeight: 1.75, marginBottom: "1.5rem" }}>{subtype.mechanism}</p>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              { label: "Passion", value: subtype.passion },
              { label: "Fixation", value: subtype.fixation },
              { label: "Holy Idea", value: subtype.holyIdea },
              { label: "Virtue", value: subtype.virtue },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: "10px",
                  padding: "0.85rem 1rem",
                }}
              >
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: textMuted, marginBottom: "0.35rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: textPrimary, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Psychological Profile ── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
            Psychological Profile
          </h2>
          <div
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <p style={{ lineHeight: 1.8, margin: 0 }}>{subtype.profile}</p>
          </div>
        </section>

        {/* ── Somatic Presentation ── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
            Physical Expression
          </h2>
          <p style={{ lineHeight: 1.75 }}>{subtype.somatic}</p>
        </section>

        {/* ── Healthy vs. Unhealthy ── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
            Levels of Health
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {/* Healthy */}
            <div
              style={{
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6ee7b7", marginBottom: "0.5rem" }}>
                Integrated
              </p>
              <p style={{ lineHeight: 1.7, fontSize: "0.9rem", margin: 0 }}>{subtype.healthy}</p>
            </div>
            {/* Unhealthy */}
            <div
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fca5a5", marginBottom: "0.5rem" }}>
                Disintegrated
              </p>
              <p style={{ lineHeight: 1.7, fontSize: "0.9rem", margin: 0 }}>{subtype.unhealthy}</p>
            </div>
          </div>
        </section>

        {/* ── Common Mistypes ── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
            Common Mistypes
          </h2>
          <div
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
            }}
          >
            <p style={{ lineHeight: 1.75, margin: 0 }}>{subtype.primaryMistype}</p>
          </div>
        </section>

        {/* ── Countertype explanation (conditional) ── */}
        {subtype.isCountertype && subtype.countertypeReason && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
              Why This Is a Countertype
            </h2>
            <div
              style={{
                background: "rgba(234,179,8,0.06)",
                border: "1px solid rgba(234,179,8,0.2)",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p style={{ lineHeight: 1.75, margin: 0 }}>{subtype.countertypeReason}</p>
            </div>
          </section>
        )}

        {/* ── Growth Path ── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.75rem" }}>
            The Path Forward
          </h2>
          <p
            style={{
              lineHeight: 1.75,
              borderLeft: `3px solid ${hex(typeColor, 0.5)}`,
              paddingLeft: "1.25rem",
            }}
          >
            {subtype.growth}
          </p>
        </section>

        {/* ── Related Subtypes ── */}
        {related.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "1rem" }}>
              Related Subtypes
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.65rem" }}>
              {related.map((r) => {
                if (!r) return null;
                const rAccentBg = hex(r.typeColor, 0.1);
                const rAccentBorder = hex(r.typeColor, 0.25);
                return (
                  <Link
                    key={r.slug}
                    href={`/enneagram/subtypes/${r.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: rAccentBg,
                        border: `1px solid ${rAccentBorder}`,
                        borderRadius: "10px",
                        padding: "0.85rem 1rem",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: r.typeColor,
                          marginBottom: "0.25rem",
                        }}
                      >
                        Type {r.type} {r.instinct}
                      </p>
                      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: textPrimary, margin: 0 }}>
                        {r.modernLabel}
                      </p>
                      {r.isCountertype && (
                        <p style={{ fontSize: "0.65rem", color: "#eab308", marginTop: "0.2rem", margin: "0.2rem 0 0" }}>
                          countertype
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section
          style={{
            background: accentBg,
            border: `1px solid ${accentBorder}`,
            borderRadius: "16px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: textPrimary,
              marginBottom: "0.5rem",
            }}
          >
            Identify your instinctual subtype
          </h2>
          <p style={{ fontSize: "0.9rem", color: textBody, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            The Thyself assessment identifies your core Enneagram type, dominant instinct, and likely subtype
            based on {175} scored items.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/enneagram/assess"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                background: typeColor,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Take the free assessment
            </Link>
            <Link
              href="/enneagram"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: textPrimary,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Browse all 9 types
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
