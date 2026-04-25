import type { Metadata } from "next";
import Link from "next/link";
import { tritypes } from "@/data/tritypes";
import { TYPE_COLORS } from "@/data/enneagram";

export const metadata: Metadata = {
  title: "All 27 Enneagram Tritypes — Katherine Fauvre's System | Thyself",
  description:
    "Explore all 27 Enneagram tritypes based on Katherine Fauvre's research. Each tritype combines one type from the Gut, Heart, and Head centers into a unique three-center personality archetype.",
  openGraph: {
    title: "All 27 Enneagram Tritypes",
    description:
      "Katherine Fauvre's tritype system: 27 unique three-center combinations, each with its own archetype, motivation, and growth edge.",
    url: "https://thyself.app/enneagram/tritype",
    type: "website",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/tritype" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "All 27 Enneagram Tritypes — Katherine Fauvre's System",
  description:
    "Explore all 27 Enneagram tritypes based on Katherine Fauvre's research.",
  url: "https://thyself.app/enneagram/tritype",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
};

// Group tritypes by the first digit (dominant type)
const DOMINANT_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function getDominantType(code: string): number {
  // The first digit in the code is the lowest-sorted number, not the dominant type.
  // For grouping purposes we use the first digit of the code as stored.
  return parseInt(code[0], 10);
}

export default function TritypeIndexPage() {
  // Group by first digit of code
  const grouped = DOMINANT_TYPES.map((d) => ({
    dominant: d,
    items: tritypes.filter((t) => getDominantType(t.code) === d),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ minHeight: "100vh", backgroundColor: "#0f0a1e", color: "rgba(255,255,255,0.92)" }}>

        {/* Hero */}
        <section
          style={{
            padding: "64px 24px 48px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 16,
              }}
            >
              Enneagram
            </p>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 16,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              All 27 Enneagram Tritypes
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 640,
                marginBottom: 24,
              }}
            >
              Katherine Fauvre&rsquo;s tritype research holds that each person uses one dominant type from each of the three Enneagram centers — Gut (8, 9, 1), Heart (2, 3, 4), and Head (5, 6, 7). The combination of all three produces a distinct archetype that explains personality with more nuance than a single type alone.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
              There are 27 possible three-center combinations. Each has its own core motivation, fear profile, characteristic strengths, blind spots, and growth path. Select any tritype below to explore it in depth.
            </p>
          </div>
        </section>

        {/* Grid — grouped by first type in code */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
          {grouped.map(({ dominant, items }) => (
            <div key={dominant} style={{ marginBottom: 48 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: TYPE_COLORS[dominant],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  {dominant}
                </div>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Type {dominant} Combinations
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 12,
                }}
              >
                {items.map((tritype) => {
                  const codeTypes = tritype.code.split("").map(Number);
                  const displayCode = codeTypes.join("-");
                  return (
                    <Link
                      key={tritype.code}
                      href={`/enneagram/tritype/${tritype.code}`}
                      style={{
                        display: "block",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: `1px solid rgba(255,255,255,0.1)`,
                        borderTop: `3px solid ${TYPE_COLORS[dominant]}`,
                        borderRadius: 12,
                        padding: "16px 18px",
                        textDecoration: "none",
                        transition: "background-color 0.15s",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                        {codeTypes.map((t) => (
                          <span
                            key={t}
                            style={{
                              display: "inline-flex",
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: TYPE_COLORS[t],
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: TYPE_COLORS[dominant],
                          letterSpacing: "0.05em",
                          marginBottom: 4,
                        }}
                      >
                        {displayCode}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.88)",
                          marginBottom: 6,
                          lineHeight: 1.3,
                        }}
                      >
                        {tritype.archetype}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.55)",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {tritype.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <section
            style={{
              marginTop: 16,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
                marginBottom: 12,
              }}
            >
              Find your tritype
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.72)",
                marginBottom: 28,
                lineHeight: 1.7,
                maxWidth: 480,
                margin: "0 auto 28px",
              }}
            >
              Tritype works best when you already know your core Enneagram type. Take the free Thyself Enneagram Assessment first, then explore your tritype.
            </p>
            <Link
              href="/assessments"
              style={{
                display: "inline-block",
                backgroundColor: "#7B5AAD",
                color: "#fff",
                borderRadius: 12,
                padding: "14px 32px",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
