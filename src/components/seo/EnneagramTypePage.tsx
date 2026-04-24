/**
 * Shared server component — renders a full dark-themed SEO article page for
 * any of the 9 Enneagram types. Used by the static /enneagram/type-N routes.
 *
 * All content comes from enneagramTypes data (enneagram.ts) + subtypes data
 * for the instinctual variants section.
 */

import Link from "next/link";
import { enneagramTypes, TYPE_COLORS } from "@/data/enneagram";
import { getSubtypesByType, INSTINCT_LABELS } from "@/data/seo-entities/enneagram-subtypes";

// ─── Style helpers ─────────────────────────────────────────────────────────────

function hex(color: string, alpha: number) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const bg = "#0f0a1e";
const textPrimary = "rgba(255,255,255,0.95)";
const textBody = "rgba(255,255,255,0.75)";
const textMuted = "rgba(255,255,255,0.45)";
const cardBg = "rgba(255,255,255,0.03)";
const cardBorder = "rgba(255,255,255,0.08)";

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 700, color: textPrimary, marginBottom: "0.85rem", marginTop: 0 }}>
      {title}
    </h2>
  );
}

function Card({ children, color, border }: { children: React.ReactNode; color?: string; border?: string }) {
  return (
    <div style={{
      background: color ?? cardBg,
      border: `1px solid ${border ?? cardBorder}`,
      borderRadius: "12px",
      padding: "1.1rem 1.25rem",
    }}>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EnneagramTypePage({ typeNum }: { typeNum: number }) {
  const typeData = enneagramTypes.find((t) => t.number === typeNum);
  if (!typeData) return null;

  const color = TYPE_COLORS[typeNum] ?? "#8b5cf6";
  const subtypes = getSubtypesByType(typeNum);

  const wingLeft = typeNum === 1 ? 9 : typeNum - 1;
  const wingRight = typeNum === 9 ? 1 : typeNum + 1;

  return (
    <div style={{ background: bg, minHeight: "100vh", color: textBody }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        {/* ── Hero ── */}
        <section
          style={{
            margin: "0 -1.25rem 3rem",
            padding: "4rem 2.5rem 3rem",
            background: `linear-gradient(160deg, ${hex(color, 0.22)} 0%, ${hex(color, 0.04)} 100%)`,
            borderBottom: `1px solid ${hex(color, 0.2)}`,
          }}
        >
          <nav
            style={{ fontSize: "0.72rem", color: textMuted, marginBottom: "1.5rem", display: "flex", gap: "0.4rem" }}
            aria-label="Breadcrumb"
          >
            <Link href="/enneagram" style={{ color: textMuted, textDecoration: "none" }}>Enneagram</Link>
            <span>/</span>
            <span style={{ color: textPrimary }}>Type {typeNum}</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.25rem 0.75rem", borderRadius: "999px",
              background: hex(color, 0.18), border: `1px solid ${hex(color, 0.35)}`, color,
            }}>
              Type {typeNum}
            </span>
          </div>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 6vw, 2.75rem)",
            fontWeight: 700,
            color: textPrimary,
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}>
            {typeData.name}
            <span style={{ display: "block", color: hex(color, 0.85), fontSize: "0.55em", fontWeight: 400, marginTop: "0.25em" }}>
              {typeData.alias}
            </span>
          </h1>

          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: "600px" }}>
            {typeData.brief}
          </p>
        </section>

        {/* ── Core motivation / fear / desire ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title="Core Profile" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.7rem" }}>
            {[
              { label: "Core Motivation", text: typeData.coreMotivation },
              { label: "Core Fear", text: typeData.coreFear },
              { label: "Core Desire", text: typeData.coreDesire },
            ].map(({ label, text }) => (
              <Card key={label}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: "0.4rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{text}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Full description ── */}
        {typeData.fullDescription && (
          <section style={{ marginBottom: "2.75rem" }}>
            <SectionHeader title={`What Makes Type ${typeNum} Tick`} />
            <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "1.5rem" }}>
              {typeData.fullDescription.split("\n\n").map((para, i) => (
                <p key={i} style={{ lineHeight: 1.8, marginBottom: i < typeData.fullDescription!.split("\n\n").length - 1 ? "1rem" : 0, margin: i < typeData.fullDescription!.split("\n\n").length - 1 ? "0 0 1rem" : 0 }}>
                  {para.trim()}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── Ichazo-Naranjo theoretical structure ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title="Theoretical Structure" />
          <p style={{ fontSize: "0.8rem", color: textMuted, marginBottom: "1rem", lineHeight: 1.5 }}>
            Grounded in Ichazo (Arica Institute, c. 1970) and Claudio Naranjo&apos;s Character &amp; Neurosis.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Passion (Ichazo)", text: typeData.passion },
              { label: "Fixation (Ichazo / Naranjo)", text: typeData.fixation },
              { label: "Holy Idea (Ichazo)", text: typeData.holyIdea },
              { label: "Virtue", text: typeData.virtue },
              { label: "Defense Mechanism", text: typeData.defenseM },
            ].map(({ label, text }) => (
              <div key={label} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, marginBottom: "0.35rem" }}>
                  {label}
                </p>
                <p style={{ lineHeight: 1.7, fontSize: "0.9rem", margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key traits ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title="Key Traits" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.7rem" }}>
            {[
              { label: "Healthy", traits: typeData.healthyTraits, border: "rgba(16,185,129,0.25)", labelColor: "#6ee7b7" },
              { label: "Average", traits: typeData.averageTraits, border: cardBorder, labelColor: textMuted },
              { label: "Unhealthy", traits: typeData.unhealthyTraits, border: "rgba(239,68,68,0.25)", labelColor: "#fca5a5" },
            ].map(({ label, traits, border, labelColor }) => (
              <div key={label} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: "12px", padding: "1rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: labelColor, marginBottom: "0.6rem" }}>
                  {label}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {traits.map((trait) => (
                    <li key={trait} style={{ fontSize: "0.82rem", lineHeight: 1.4, display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, marginTop: "0.45em", flexShrink: 0 }} />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Levels of development ── */}
        {typeData.levels && (
          <section style={{ marginBottom: "2.75rem" }}>
            <SectionHeader title="Levels of Development" />
            <p style={{ fontSize: "0.8rem", color: textMuted, marginBottom: "1rem" }}>
              Based on Riso-Hudson&apos;s nine levels across three health bands.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[...typeData.levels.healthy, ...typeData.levels.average, ...typeData.levels.unhealthy].map((lvl, i) => {
                const isHealthy = i < typeData.levels!.healthy.length;
                const isUnhealthy = i >= typeData.levels!.healthy.length + typeData.levels!.average.length;
                const bandColor = isHealthy ? "rgba(16,185,129,0.15)" : isUnhealthy ? "rgba(239,68,68,0.1)" : cardBg;
                const bandBorder = isHealthy ? "rgba(16,185,129,0.2)" : isUnhealthy ? "rgba(239,68,68,0.2)" : cardBorder;
                return (
                  <div key={lvl.level} style={{ background: bandColor, border: `1px solid ${bandBorder}`, borderRadius: "10px", padding: "0.85rem 1rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: color, color: "#fff", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: "0.05rem" }}>
                      {lvl.level}
                    </span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem", color: textPrimary, marginBottom: "0.2rem" }}>{lvl.title}</p>
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>{lvl.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Wings ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title="Wings" />
          <p style={{ fontSize: "0.82rem", color: textMuted, marginBottom: "1rem", lineHeight: 1.5 }}>
            Every type is flanked by two adjacent types. One or both wings may color how the core type expresses itself.
          </p>
          {typeData.wingDescriptions ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
              {[typeData.wingDescriptions.left, typeData.wingDescriptions.right].map((wing) => (
                <Card key={wing.name}>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color, marginBottom: "0.5rem" }}>{wing.name}</p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>{wing.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
              {[wingLeft, wingRight].map((w) => (
                <Link key={w} href={`/enneagram/type-${w}`} style={{ textDecoration: "none" }}>
                  <Card>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color, marginBottom: "0.25rem" }}>
                      {typeNum}w{w}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: textMuted, margin: 0 }}>Wing {w} influence</p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Integration / stress lines ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title="Integration and Stress Lines" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "12px", padding: "1.1rem 1.25rem" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6ee7b7", marginBottom: "0.4rem" }}>
                Growth — integrates toward Type {typeData.integrationLine}
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
                At their healthiest, Type {typeNum}s begin to access the positive qualities of Type {typeData.integrationLine} — a natural expansion toward the strengths associated with that line.
              </p>
            </div>
            <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "1.1rem 1.25rem" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fca5a5", marginBottom: "0.4rem" }}>
                Stress — disintegrates toward Type {typeData.disintegrationLine}
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
                Under significant stress, Type {typeNum}s may take on the lower expressions of Type {typeData.disintegrationLine} — a contraction into less healthy patterns along the stress line.
              </p>
            </div>
          </div>
        </section>

        {/* ── Instinctual variants — link to subtype pages ── */}
        {subtypes.length === 3 && (
          <section style={{ marginBottom: "2.75rem" }}>
            <SectionHeader title="Instinctual Variants" />
            <p style={{ fontSize: "0.82rem", color: textMuted, marginBottom: "1rem", lineHeight: 1.5 }}>
              Ichazo and Naranjo identified three instinctual stackings that color how {typeData.name.replace("The ", "").toLowerCase()} energy — the Type {typeNum} passion — expresses itself in daily life.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {subtypes.map((s) => (
                <Link key={s.slug} href={`/enneagram/subtypes/${s.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: hex(color, 0.06), border: `1px solid ${hex(color, 0.2)}`, borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color }}>
                          {INSTINCT_LABELS[s.instinct]}
                        </span>
                        {s.isCountertype && (
                          <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "#eab308" }}>countertype</span>
                        )}
                      </div>
                      <p style={{ fontWeight: 600, fontSize: "0.95rem", color: textPrimary, marginBottom: "0.2rem" }}>{s.modernLabel}</p>
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.55, margin: 0, color: textBody }}>
                        {s.ichazoKeyword !== s.modernLabel ? `Ichazo: "${s.ichazoKeyword}". ` : ""}
                        {s.intro.slice(0, 120)}…
                      </p>
                    </div>
                    <span style={{ color: textMuted, fontSize: "0.9rem", marginLeft: "0.75rem", flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Dropdown sections (additional content) ── */}
        {typeData.dropdownSections && typeData.dropdownSections.length > 0 && (
          <section style={{ marginBottom: "2.75rem" }}>
            <SectionHeader title="Deeper Dives" />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {typeData.dropdownSections.map((section) => (
                <div key={section.title}>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 600, color, marginBottom: "0.5rem", marginTop: 0 }}>
                    {section.title}
                  </h3>
                  <p style={{ lineHeight: 1.75, margin: 0 }}>{section.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Growth tips ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title={`Growth Path for Type ${typeNum}`} />
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {typeData.growthTips.map((tip, i) => (
              <li key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                <span style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: color, color: "#fff", fontSize: "0.78rem", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem",
                }}>
                  {i + 1}
                </span>
                <p style={{ lineHeight: 1.7, margin: 0 }}>{tip}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Related types nav ── */}
        <section style={{ marginBottom: "2.75rem" }}>
          <SectionHeader title="Explore Other Types" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9]
              .filter((n) => n !== typeNum)
              .map((n) => (
                <Link
                  key={n}
                  href={`/enneagram/type-${n}`}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "999px",
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    color: textBody,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Type {n}
                </Link>
              ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: hex(color, 0.1),
          border: `1px solid ${hex(color, 0.25)}`,
          borderRadius: "16px",
          padding: "2rem",
          textAlign: "center",
        }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textPrimary, marginBottom: "0.5rem" }}>
            Discover your Enneagram type
          </h2>
          <p style={{ fontSize: "0.9rem", color: textBody, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            Take the free Thyself assessment. 175 scored items, grounded in Ichazo, Naranjo, and Riso-Hudson.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/assessments"
              style={{
                display: "inline-block", padding: "0.75rem 1.5rem", borderRadius: "999px",
                background: color, color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
              }}
            >
              Start the assessment
            </Link>
            <Link
              href="/enneagram"
              style={{
                display: "inline-block", padding: "0.75rem 1.5rem", borderRadius: "999px",
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                color: textPrimary, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
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
