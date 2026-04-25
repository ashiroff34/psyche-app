import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enneagram Wings: All 18 Wing Combinations Explained | Thyself",
  description:
    "Understand Enneagram wings — how the two types adjacent to your core type flavor and modify your personality. Full descriptions of all 18 wing combinations from 1w9 to 9w8, sourced from Riso-Hudson and Naranjo.",
  keywords: [
    "enneagram wings",
    "enneagram wing theory",
    "1w9 idealist",
    "1w2 advocate",
    "4w3 aristocrat",
    "4w5 bohemian",
    "enneagram wing combinations",
    "riso hudson wings",
  ],
  openGraph: {
    title: "Enneagram Wings: All 18 Wing Combinations | Thyself",
    description:
      "How adjacent types flavor and modify your core Enneagram type. Full descriptions of all 18 wing combinations with sources.",
    type: "article",
    url: "https://thyself.app/enneagram/wings",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://thyself.app/enneagram/wings" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Wings: All 18 Wing Combinations Explained",
  description:
    "Complete guide to Enneagram wing theory — how the two adjacent types modify your core type's expression.",
  url: "https://thyself.app/enneagram/wings",
  author: { "@type": "Organization", name: "Thyself" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
    { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
    { "@type": "ListItem", position: 3, name: "Wings", item: "https://thyself.app/enneagram/wings" },
  ],
};

const WINGS: { type: number; wings: { code: string; name: string; description: string }[] }[] = [
  {
    type: 1,
    wings: [
      {
        code: "1w9",
        name: "The Idealist",
        description:
          "The 9 wing adds a more detached, philosophical, and internally focused quality to the One. This One is quieter and more contemplative, their perfectionism more inwardly directed and less interpersonally expressed. Profoundly principled but less visibly righteous. There is a quality of measured wisdom and principle without the heat of the more overtly reformist expressions.",
      },
      {
        code: "1w2",
        name: "The Advocate",
        description:
          "The 2 wing adds warmth, interpersonal orientation, and genuine care for others to the One's principled structure. This One is more outwardly engaged, directing their reform energy through relationship and helping. They can be both more compassionate and more morally demanding of others, with a quality of devoted service to an ethical vision.",
      },
    ],
  },
  {
    type: 2,
    wings: [
      {
        code: "2w1",
        name: "The Servant",
        description:
          "The 1 wing adds moral structure, self-discipline, and principled criteria to the Two's service orientation. This Two tends to be more restrained and formal, giving according to clear principles of what is genuinely good for the other rather than purely in response to emotional impulse. They can be more critical and less unconditionally affirming.",
      },
      {
        code: "2w3",
        name: "The Host",
        description:
          "The 3 wing adds social ambition, image consciousness, and achievement orientation to the Two's relational focus. This Two is more socially prominent, more explicitly concerned with being seen as helpful and good, and often moves in public-facing roles where their giving is visible. They can be more driven, competitive, and image-aware.",
      },
    ],
  },
  {
    type: 3,
    wings: [
      {
        code: "3w2",
        name: "The Charmer",
        description:
          "The 2 wing adds interpersonal warmth, relational investment, and genuine care for specific others to the Three's achievement drive. This Three is more personally engaging, more emotionally present in relationships, and tends to achieve in contexts that involve direct human connection and support of others.",
      },
      {
        code: "3w4",
        name: "The Professional",
        description:
          "The 4 wing adds depth, self-awareness, and aesthetic sensibility to the Three's performance orientation. This Three has more access to genuine feeling, more capacity for creative expression, and a tendency to be concerned with the quality and authenticity of their work, not just its reception. They can be more introspective and less straightforwardly adaptable.",
      },
    ],
  },
  {
    type: 4,
    wings: [
      {
        code: "4w3",
        name: "The Aristocrat",
        description:
          "The 3 wing adds achievement orientation, social engagement, and image consciousness to the Four's emotional depth. This Four is more publicly visible, more concerned with how their uniqueness is expressed and recognized in the world, and more capable of sustained action in service of their creative vision.",
      },
      {
        code: "4w5",
        name: "The Bohemian",
        description:
          "The 5 wing adds intellectual depth, withdrawal, and a rich interior life that goes beyond emotion to the Four's characteristic intensity. This Four tends to be quieter, more privately organized, more eccentric, and more oriented toward esoteric knowledge and private creative work. They can be among the most intellectually original of the types.",
      },
    ],
  },
  {
    type: 5,
    wings: [
      {
        code: "5w4",
        name: "The Iconoclast",
        description:
          "The 4 wing adds emotional depth, aesthetic sensitivity, and a quality of romanticism and personal expression to the Five's intellectual orientation. This Five tends to be more creative, more invested in the communication of their inner experience, and more emotionally present — though still fundamentally withdrawn compared to most types.",
      },
      {
        code: "5w6",
        name: "The Problem Solver",
        description:
          "The 6 wing adds loyalty, system-orientation, and a quality of collaborative contribution to the Five's knowledge accumulation. This Five is more oriented toward practical application of knowledge, more socially embedded in specific trusted communities, and less purely individualistic than the 5w4.",
      },
    ],
  },
  {
    type: 6,
    wings: [
      {
        code: "6w5",
        name: "The Defender",
        description:
          "The 5 wing adds intellectual depth, analytical precision, and a withdrawn quality to the Six's vigilance. This Six tends to be more self-reliant, more analytically capable, and more comfortable in solitary research and problem-solving. They are less interpersonally warm than the 6w7 but more capable of independent judgment.",
      },
      {
        code: "6w7",
        name: "The Buddy",
        description:
          "The 7 wing adds warmth, spontaneity, and social engagement to the Six's loyalty and vigilance. This Six is more openly friendly and engaged, more capable of humor and lightness, and often more overtly likeable. They can be more impulsive and less systematically analytical than the 6w5.",
      },
    ],
  },
  {
    type: 7,
    wings: [
      {
        code: "7w6",
        name: "The Entertainer",
        description:
          "The 6 wing adds loyalty, commitment, and a quality of genuine relational investment to the Seven's enthusiasm. This Seven is somewhat more grounded, more likely to sustain engagement with specific people and projects over time, and more aware of systemic risks and dangers. They can be more anxious than the 7w8.",
      },
      {
        code: "7w8",
        name: "The Realist",
        description:
          "The 8 wing adds force, directness, and pragmatic worldliness to the Seven's idealism and enthusiasm. This Seven is more confident, more action-oriented, more willing to pursue pleasure through direct assertion rather than charm and planning. They can be more overtly aggressive and less concerned with maintaining the good opinion of others.",
      },
    ],
  },
  {
    type: 8,
    wings: [
      {
        code: "8w7",
        name: "The Maverick",
        description:
          "The 7 wing adds expansiveness, vision, and an entrepreneurial quality to the Eight's power orientation. This Eight tends toward big ideas, wide domains of influence, and a quality of enthusiasm for new ventures. They are often the most extroverted of the Eights and the most capable of genuine pleasure and play.",
      },
      {
        code: "8w9",
        name: "The Bear",
        description:
          "The 9 wing adds groundedness, patience, and a quality of steady, immovable presence to the Eight's forcefulness. This Eight tends to be quieter and less overtly combative, but can be more deeply stubborn and implacable. They often have a quality of deeply reliable protectiveness that makes them trusted by those close to them.",
      },
    ],
  },
  {
    type: 9,
    wings: [
      {
        code: "9w8",
        name: "The Referee",
        description:
          "The 8 wing adds assertiveness, physical presence, and a capacity for direct action and conflict to the Nine's accommodation. This Nine is more capable of standing their ground and asserting their position when necessary, and tends to be more physically oriented and less primarily mental.",
      },
      {
        code: "9w1",
        name: "The Dreamer",
        description:
          "The 1 wing adds idealism, internal principle, and a quality of philosophical contemplation to the Nine's easy-going nature. This Nine tends to be more conscientious, more concerned with right action, and more likely to have a developed inner life of moral and philosophical reflection. They can be more quietly self-critical than the 9w8.",
      },
    ],
  },
];

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer", 2: "The Helper", 3: "The Achiever",
  4: "The Individualist", 5: "The Investigator", 6: "The Loyalist",
  7: "The Enthusiast", 8: "The Challenger", 9: "The Peacemaker",
};

const TYPE_COLORS: Record<number, string> = {
  1: "#B85C38", 2: "#C4607A", 3: "#C9921A", 4: "#7B5AAD",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#9B2C2C", 9: "#8B7355",
};

export default function WingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div style={{ background: "#0f0a1e", minHeight: "100vh", color: "rgba(255,255,255,0.92)", fontFamily: "system-ui, sans-serif" }}>

        {/* Breadcrumb */}
        <nav style={{ padding: "1.25rem 1.5rem 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 0.4rem" }}>/</span>
          <a href="/enneagram" style={{ color: "inherit", textDecoration: "none" }}>Enneagram</a>
          <span style={{ margin: "0 0.4rem" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Wings</span>
        </nav>

        {/* Hero */}
        <header style={{ padding: "3rem 1.5rem 2rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(123,90,173,0.15)", border: "1px solid rgba(123,90,173,0.3)", borderRadius: "999px", padding: "0.35rem 1rem", fontSize: "0.75rem", color: "#a78bfa", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            WING THEORY
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
            Enneagram Wings: All 18 Combinations
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            Your core type is modified by one or both adjacent types on the Enneagram circle — these are your wings. Understanding yours reveals why two people of the same type can feel so different.
          </p>
        </header>

        {/* Theory section */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.75rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>What Wing Theory Says</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              Wing theory holds that an individual&apos;s core type is modified by one or both of the two adjacent types on the Enneagram circle. A Type 4, for instance, has Types 3 and 5 as potential wings; a Type 9 has Types 8 and 1. Most theorists hold that one wing is dominant, though there is genuine debate about whether wing dominance is fixed from early development or can shift over a lifetime.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Naranjo</strong> observed that a person &quot;can easily see&quot; their primary type as being between its adjacent wings — that the wing modifies and flavors the core type without replacing it.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Riso and Hudson</strong> developed wing theory most extensively, arguing that wing dominance is generally stable and that each of the 18 wing-type combinations has a distinct character profile. They also argued that accessing the non-dominant wing is part of healthy development.
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontSize: "0.9rem" }}>
              Note: Empirical research (Anthony Edwards) did not confirm wing dominance as a consistent phenomenon. Wing theory is best held as a useful interpretive frame rather than a rigorously validated structural feature.
            </p>
          </div>
        </section>

        {/* 18 Wing Combinations */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem", textAlign: "center" }}>The 18 Wing Combinations</h2>

          {WINGS.map(({ type, wings }) => (
            <div key={type} style={{ marginBottom: "2.5rem" }}>
              <a href={`/enneagram/type-${type}`} style={{ textDecoration: "none" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: TYPE_COLORS[type], marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ background: `${TYPE_COLORS[type]}22`, border: `1px solid ${TYPE_COLORS[type]}44`, borderRadius: "6px", padding: "0.2rem 0.6rem", fontSize: "0.8rem" }}>Type {type}</span>
                  {TYPE_NAMES[type]}
                </h3>
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {wings.map((w) => (
                  <div
                    key={w.code}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${TYPE_COLORS[type]}33`,
                      borderRadius: "14px",
                      padding: "1.25rem",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: TYPE_COLORS[type], marginBottom: "0.25rem" }}>{w.code}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", marginBottom: "0.75rem" }}>{w.name}</div>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{w.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section style={{ maxWidth: "440px", margin: "0 auto 5rem", padding: "0 1.5rem", textAlign: "center" }}>
          <div style={{ background: "rgba(123,90,173,0.12)", border: "1px solid rgba(123,90,173,0.25)", borderRadius: "20px", padding: "2rem 1.75rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Discover your wing</h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              Take the Thyself Enneagram assessment to find your core type and dominant wing.
            </p>
            <a
              href="/assessments"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7B5AAD, #a78bfa)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.85rem 2rem",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Start Free Assessment
            </a>
          </div>
        </section>

        {/* Related nav */}
        <nav style={{ maxWidth: "760px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Explore more</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { href: "/enneagram/centers", label: "Centers of Intelligence" },
              { href: "/enneagram/instinctual-stacking", label: "Instinctual Stacking" },
              { href: "/enneagram/holy-ideas", label: "Holy Ideas" },
              { href: "/enneagram/subtypes/type-4-sp", label: "Instinctual Subtypes" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
