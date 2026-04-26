import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const BASE = "https://thyself.app";

export const metadata: Metadata = {
  title: "Personality Type Combinations — MBTI x Enneagram Guide | Thyself",
  description:
    "Explore all 144 combinations of cognitive personality type and Enneagram. Discover how your cognitive function stack and Enneagram type interact to shape motivation, behavior, and growth. Grounded in Jungian and Enneagram theory.",
  alternates: { canonical: `${BASE}/personality` },
  openGraph: {
    title: "MBTI x Enneagram — All 144 Type Combinations",
    description:
      "How do cognitive type and Enneagram type interact? Explore all 144 combinations: INFJ Enneagram 4, INTJ Enneagram 5, ENFP Enneagram 7, and every other pairing. Grounded in Jungian and Enneagram theory.",
    url: `${BASE}/personality`,
    type: "website",
    siteName: "Thyself",
  },
};

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

type MBTIType = (typeof MBTI_TYPES)[number];

const ENNEAGRAM_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const MBTI_NAMES: Record<MBTIType, string> = {
  INTJ: "The Architect",
  INTP: "The Logician",
  ENTJ: "The Commander",
  ENTP: "The Debater",
  INFJ: "The Counselor",
  INFP: "The Mediator",
  ENFJ: "The Protagonist",
  ENFP: "The Campaigner",
  ISTJ: "The Inspector",
  ISFJ: "The Defender",
  ESTJ: "The Executive",
  ESFJ: "The Consul",
  ISTP: "The Virtuoso",
  ISFP: "The Adventurer",
  ESTP: "The Entrepreneur",
  ESFP: "The Entertainer",
};

const MBTI_COLORS: Record<MBTIType, string> = {
  INTJ: "#1a1a2e",
  INTP: "#16213e",
  ENTJ: "#0f3460",
  ENTP: "#1b4f72",
  INFJ: "#4a235a",
  INFP: "#6c3483",
  ENFJ: "#7d3c98",
  ENFP: "#9b59b6",
  ISTJ: "#1b2631",
  ISFJ: "#154360",
  ESTJ: "#1a5276",
  ESFJ: "#1f618d",
  ISTP: "#145a32",
  ISFP: "#1e8449",
  ESTP: "#784212",
  ESFP: "#935116",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Personality Type Combinations — MBTI x Enneagram Guide",
  description:
    "All 144 combinations of cognitive personality type and Enneagram. Grounded in Jungian and Enneagram theory.",
  url: `${BASE}/personality`,
  publisher: { "@type": "Organization", name: "Thyself", url: BASE },
};

export default function PersonalityIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen" style={{ backgroundColor: "#0f0a1e", color: "rgba(255,255,255,0.92)" }}>

        {/* Hero */}
        <section
          className="px-6 py-16"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #4a235a 100%)" }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cognitive Type x Enneagram
            </p>
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl" style={{ color: "rgba(255,255,255,0.95)" }}>
              144 Personality Type Combinations
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Every combination of 16-type cognitive system and 9-type Enneagram — explored through the lens of
              cognitive function stacks, core motivation, and the specific way each framework shapes the other.
              Choose your cognitive type below to see all 9 Enneagram combinations.
            </p>
          </div>
        </section>

        {/* Grid of MBTI types */}
        <div className="mx-auto max-w-5xl space-y-12 px-6 py-14">
          {MBTI_TYPES.map((mbti) => (
            <section key={mbti}>
              {/* MBTI header */}
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: MBTI_COLORS[mbti] ?? "#1a1a2e" }}
                >
                  {mbti}
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
                    {mbti}
                  </h2>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {MBTI_NAMES[mbti]}
                  </p>
                </div>
              </div>

              {/* 9 Enneagram type links */}
              <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-9">
                {ENNEAGRAM_TYPES.map((ennType) => {
                  const ennColor = TYPE_COLORS[ennType];
                  const ennName = TYPE_NAMES[ennType];
                  const slug = `${mbti.toLowerCase()}-enneagram-${ennType}`;
                  return (
                    <Link
                      key={ennType}
                      href={`/personality/${slug}`}
                      className="group rounded-xl p-3 text-center transition-all hover:scale-105"
                      style={{
                        backgroundColor: `${ennColor}15`,
                        border: `1px solid ${ennColor}30`,
                      }}
                    >
                      <div
                        className="mb-1 text-lg font-bold"
                        style={{ color: ennColor }}
                      >
                        {ennType}
                      </div>
                      <div
                        className="text-xs leading-tight"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {ennName.replace("The ", "")}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* About section */}
        <section
          className="px-6 py-14"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Why combine these two frameworks?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              The 16-type cognitive system (rooted in Carl Jung&apos;s <em>Psychological Types</em>, 1921)
              describes how a person characteristically processes information and makes decisions — through
              the lens of eight cognitive functions arranged in a stack. The Enneagram describes why: the
              core motivation, core fear, and ego structure that organize a person&apos;s psychological life
              beneath the level of behavior.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Neither framework alone is sufficient. Knowing someone is INFJ tells you about their
              cognitive architecture — how they process — but not what they are most fundamentally oriented
              toward. Knowing someone is a Type 4 tells you about their motivation structure, but not how
              that motivation is enacted through their cognitive style. Together, the two frameworks produce
              a more complete picture of both the inner driver and the outer expression.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              These pages explore each combination through the interaction of both systems, grounded in the
              work of Carl Jung, Isabel Briggs Myers, Oscar Ichazo, Claudio Naranjo, and Don Riso and Russ
              Hudson. They are meant as frameworks for self-inquiry, not fixed categories.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div
            className="mx-auto max-w-2xl rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(123,90,173,0.2) 0%, rgba(41,128,185,0.2) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2 className="mb-2 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Find your combination
            </h2>
            <p className="mb-6 text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
              Take the Thyself Enneagram Assessment or the 16-type Cognitive Assessment
              to discover your own type combination.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#7B5AAD" }}
            >
              Take the Assessment
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
