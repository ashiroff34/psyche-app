import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tritypes, type Tritype } from "@/data/tritypes";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

// All 27 tritype codes for static generation
const ALL_CODES = tritypes.map((t) => t.code);

export function generateStaticParams() {
  return ALL_CODES.map((code) => ({ code }));
}

function getTritype(code: string): Tritype | undefined {
  return tritypes.find((t) => t.code === code);
}

// Center label for a type number
function centerOf(n: number): string {
  if (n === 8 || n === 9 || n === 1) return "Gut";
  if (n === 2 || n === 3 || n === 4) return "Heart";
  return "Head";
}

// Short description for what each center contributes
const CENTER_CONTRIBUTION: Record<string, string> = {
  Gut: "instinct, autonomy, and relationship to anger and boundaries",
  Heart: "identity, image, and emotional connection",
  Head: "thinking, fear-management, and strategic planning",
};

// Type motivations — what each single type seeks
const TYPE_MOTIVATION: Record<number, string> = {
  1: "to be good, correct, and to improve the world",
  2: "to be loved and needed by giving generously to others",
  3: "to be successful, admired, and to avoid failure",
  4: "to find authentic identity and to be deeply known",
  5: "to understand, to master knowledge, and to protect inner resources",
  6: "to find security, certainty, and trustworthy guidance",
  7: "to experience life fully and to escape pain through positive possibility",
  8: "to be powerful, self-reliant, and to protect the vulnerable",
  9: "to maintain inner peace and avoid conflict by merging with others",
};

// Type core fears
const TYPE_FEAR: Record<number, string> = {
  1: "being corrupt, wrong, or fundamentally flawed",
  2: "being unwanted or unloved without giving something first",
  3: "being worthless, a failure, or without value apart from achievements",
  4: "having no identity, no significance, or being ordinary",
  5: "being incompetent, overwhelmed, or depleted by the world",
  6: "being without support, guidance, or certainty in a dangerous world",
  7: "being trapped in pain, deprivation, or limitation",
  8: "being controlled, harmed, or rendered vulnerable by others",
  9: "loss and separation — conflict that destroys connection and inner peace",
};

// Integration lines (where each type moves toward health)
const TYPE_INTEGRATION: Record<number, number> = {
  1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const tritype = getTritype(code);
  if (!tritype) return { title: "Tritype Not Found | Thyself" };

  const types = code.split("").map(Number);
  const displayCode = types.join("-");
  const title = `Enneagram Tritype ${displayCode} — ${tritype.archetype} | Thyself`;
  const description = `A deep guide to Enneagram Tritype ${displayCode}, ${tritype.archetype}. Core motivation, fear, strengths, blind spots, and growth edge for this three-center combination. Grounded in Katherine Fauvre's tritype research.`;

  return {
    title,
    description,
    openGraph: {
      title: `Enneagram Tritype ${displayCode} — ${tritype.archetype}`,
      description,
      url: `https://thyself.app/enneagram/tritype/${code}`,
      type: "article",
      siteName: "Thyself",
    },
    twitter: {
      card: "summary_large_image",
      title: `Enneagram Tritype ${displayCode} — ${tritype.archetype} | Thyself`,
      description,
    },
    alternates: {
      canonical: `https://thyself.app/enneagram/tritype/${code}`,
    },
  };
}

export default async function TritypePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const tritype = getTritype(code);
  if (!tritype) notFound();

  const types = code.split("").map(Number);
  const [typeA, typeB, typeC] = types;
  const displayCode = types.join("-");
  const primaryColor = TYPE_COLORS[typeA];
  const integrationTargets = types.map((t) => TYPE_INTEGRATION[t]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Enneagram Tritype ${displayCode} — ${tritype.archetype}`,
    description: `A deep guide to Enneagram Tritype ${displayCode}, ${tritype.archetype}. Core motivation, fear, strengths, blind spots, and growth edge.`,
    author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
    publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
    url: `https://thyself.app/enneagram/tritype/${code}`,
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thyself.app/enneagram/tritype/${code}`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
        { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
        { "@type": "ListItem", position: 3, name: "Tritypes", item: "https://thyself.app/enneagram/tritype" },
        {
          "@type": "ListItem",
          position: 4,
          name: `Tritype ${displayCode} — ${tritype.archetype}`,
          item: `https://thyself.app/enneagram/tritype/${code}`,
        },
      ],
    },
  };

  // Related tritypes: other codes that share at least one type with this tritype
  const relatedCodes = ALL_CODES
    .filter((c) => c !== code)
    .filter((c) => {
      const otherTypes = c.split("").map(Number);
      return types.some((t) => otherTypes.includes(t));
    })
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ minHeight: "100vh", backgroundColor: "#0f0a1e", color: "rgba(255,255,255,0.92)" }}>

        {/* Hero */}
        <section style={{ backgroundColor: primaryColor, padding: "64px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>
              Enneagram Tritype
            </p>
            {/* Center badges */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {types.map((t) => (
                <div
                  key={t}
                  style={{
                    backgroundColor: TYPE_COLORS[t],
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: 12,
                    padding: "10px 18px",
                    textAlign: "center",
                    minWidth: 64,
                  }}
                >
                  <p style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{t}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{centerOf(t)}</p>
                </div>
              ))}
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 12, color: "#fff" }}>
              Tritype {displayCode}
            </h1>
            <p style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 16 }}>
              {tritype.archetype}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", maxWidth: 640 }}>
              {tritype.description}
            </p>
          </div>
        </section>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

          {/* What tritype means */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.95)" }}>
              What Is a Tritype?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.78)" }}>
              Katherine Fauvre&rsquo;s tritype theory holds that each person uses one dominant type from each of the three Enneagram centers — Gut (8, 9, 1), Heart (2, 3, 4), and Head (5, 6, 7). The result is a three-type combination that colors personality in a more nuanced way than a single type can. Within your tritype, your core Enneagram type remains primary; the other two types add secondary flavors and strategies. Tritype {displayCode} means this person draws their instinctive strategy from Type {typeA} first, then Type {typeB}, then Type {typeC}.
            </p>
          </section>

          {/* What each type contributes */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "rgba(255,255,255,0.95)" }}>
              What Each Type Brings
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {types.map((t, i) => {
                const label = i === 0 ? "Dominant" : i === 1 ? "Second" : "Third";
                const centerName = centerOf(t);
                return (
                  <div
                    key={t}
                    style={{
                      borderLeft: `4px solid ${TYPE_COLORS[t]}`,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "0 12px 12px 0",
                      padding: "20px 24px",
                    }}
                  >
                    <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: TYPE_COLORS[t], marginBottom: 6 }}>
                      {label} — Type {t} ({centerName} Center)
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 8 }}>
                      {TYPE_NAMES[t]}
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
                      From the {centerName} center — the domain of {CENTER_CONTRIBUTION[centerName]} — Type {t} contributes its drive {TYPE_MOTIVATION[t]}. In this tritype, this energy {i === 0 ? "leads and defines the overall character" : i === 1 ? "adds a significant secondary layer of motivation and strategy" : "provides a quieter but persistent background influence on perception and response"}.
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Core motivation */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.95)" }}>
              Core Motivation
            </h2>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "24px 28px" }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)" }}>
                The {tritype.archetype} moves through life seeking to integrate the deepest drives of all three types: the desire of Type {typeA} {TYPE_MOTIVATION[typeA]}, refined by the secondary drive of Type {typeB} {TYPE_MOTIVATION[typeB]}, and further shaped by the tertiary pull of Type {typeC} {TYPE_MOTIVATION[typeC]}. This creates a personality that is simultaneously reaching toward multiple goals — which can generate both unusual range and internal complexity.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginTop: 16 }}>
                At the center of this tritype is a persistent need for the world to work in a specific way — a way that satisfies not one but three core appetites. When life cooperates with all three, the {tritype.archetype} is at their most effective and alive. When one is frustrated, the others compensate, creating patterns of behavior that can be hard to trace to any single source.
              </p>
            </div>
          </section>

          {/* Core fear */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.95)" }}>
              Core Fear
            </h2>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "24px 28px" }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)" }}>
                What this tritype most fears is a layering of the three constituent types&rsquo; anxieties. Type {typeA} fears {TYPE_FEAR[typeA]}. Type {typeB} fears {TYPE_FEAR[typeB]}. Type {typeC} fears {TYPE_FEAR[typeC]}. Together, these create a complex threat landscape that this personality type is perpetually — often unconsciously — scanning for.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginTop: 16 }}>
                The {tritype.archetype} may find that what triggers their defenses is not easily explained by a single type&rsquo;s logic. Often, it is the convergence of several of these fears at once — a situation that threatens the core concern of two or three centers simultaneously — that produces the most significant reactivity.
              </p>
            </div>
          </section>

          {/* Strengths */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "rgba(255,255,255,0.95)" }}>
              Strengths
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tritype.strengths.map((strength) => (
                <div
                  key={strength}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 12,
                    padding: "16px 20px",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: primaryColor,
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.82)" }}>{strength}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Blind spots / challenges */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "rgba(255,255,255,0.95)" }}>
              Blind Spots
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tritype.challenges.map((challenge) => (
                <div
                  key={challenge}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 12,
                    padding: "16px 20px",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.4)",
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth edge */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.95)" }}>
              Growth Edge
            </h2>
            <div
              style={{
                borderTop: `3px solid ${primaryColor}`,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "0 0 16px 16px",
                padding: "24px 28px",
              }}
            >
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)" }}>
                Integration for the {tritype.archetype} means following the growth direction of each center simultaneously. Type {typeA} grows toward Type {integrationTargets[0]} — toward {TYPE_NAMES[integrationTargets[0]]}&rsquo;s qualities. Type {typeB} grows toward Type {integrationTargets[1]}. Type {typeC} grows toward Type {integrationTargets[2]}.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginTop: 16 }}>
                In practice, this tritype grows by learning to hold the tension between its three centers without collapsing into the dominant one. When the Gut, Heart, and Head are all genuinely online and in dialogue — rather than one center taking over and suppressing the others — the {tritype.archetype} operates with a rare completeness. The goal is not to transcend any of the three types, but to integrate their gifts while releasing their compulsive grip.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginTop: 16 }}>
                Notice which center you habitually drop first under stress. For this tritype, the doorway to growth is often through whichever center feels most foreign or uncomfortable — because that is precisely where the richest undeveloped capacity waits.
              </p>
            </div>
          </section>

          {/* Individual type links */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.95)" }}>
              Explore the Individual Types
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {types.map((t) => (
                <Link
                  key={t}
                  href={`/enneagram/type-${t}`}
                  style={{
                    borderRadius: 10,
                    border: `1px solid ${TYPE_COLORS[t]}`,
                    padding: "10px 18px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: TYPE_COLORS[t],
                    textDecoration: "none",
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                >
                  Type {t} — {TYPE_NAMES[t]}
                </Link>
              ))}
            </div>
          </section>

          {/* Related tritypes */}
          {relatedCodes.length > 0 && (
            <section style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.95)" }}>
                Related Tritypes
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {relatedCodes.map((c) => {
                  const rt = getTritype(c);
                  const cTypes = c.split("").map(Number);
                  return (
                    <Link
                      key={c}
                      href={`/enneagram/tritype/${c}`}
                      style={{
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "10px 18px",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      {cTypes.join("-")} — {rt?.archetype}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Back to all tritypes */}
          <section style={{ marginBottom: 56 }}>
            <Link
              href="/enneagram/tritype"
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: 2,
              }}
            >
              View all 27 tritypes
            </Link>
          </section>

          {/* CTA */}
          <section
            style={{
              backgroundColor: primaryColor,
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Discover your tritype
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.88)", marginBottom: 28, lineHeight: 1.7 }}>
              Tritype insights are most meaningful when grounded in a verified core type. Take the free Thyself Enneagram Assessment to find your type first.
            </p>
            <Link
              href="/assessments"
              style={{
                display: "inline-block",
                backgroundColor: "#fff",
                color: primaryColor,
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
