import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enneagram Centers of Intelligence: Gut, Heart, Head | Thyself",
  description:
    "The three centers of intelligence in the Enneagram — Gut (Body), Heart (Feeling), and Head (Thinking) — reveal how each type processes reality and manages emotion. Plus: Hornevian groups and Harmonic groups explained.",
  keywords: [
    "enneagram centers of intelligence",
    "enneagram gut heart head",
    "body center enneagram",
    "heart center enneagram",
    "head center enneagram",
    "hornevian groups",
    "harmonic groups enneagram",
    "enneagram triads",
  ],
  openGraph: {
    title: "Enneagram Centers of Intelligence: Gut, Heart, Head | Thyself",
    description: "How the three centers structure the nine types — body, heart, and head, plus Hornevian and Harmonic groupings.",
    type: "article",
    url: "https://thyself.app/enneagram/centers",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://thyself.app/enneagram/centers" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Centers of Intelligence: Gut, Heart, and Head",
  description: "Complete guide to the three Enneagram triads — body, heart, and head centers — plus Hornevian and Harmonic groups.",
  url: "https://thyself.app/enneagram/centers",
  author: { "@type": "Organization", name: "Thyself" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
    { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
    { "@type": "ListItem", position: 3, name: "Centers of Intelligence", item: "https://thyself.app/enneagram/centers" },
  ],
};

const CENTERS = [
  {
    name: "Gut / Body / Instinctual Center",
    types: [8, 9, 1],
    color: "#C94040",
    emotion: "Anger",
    ichazoZone: "Historical Ego",
    description:
      "The three types of the gut center share a primary orientation to the world through bodily intelligence, instinctual response, and the domain of autonomy and will. The underlying emotion driving this center is anger — though each type relates to anger differently.",
    typeRelations: [
      { type: 8, relation: "Type 8 expresses anger overtly and powerfully — directly, as a force of nature." },
      { type: 9, relation: "Type 9 suppresses and diffuses anger through merging, withdrawal, and self-forgetting." },
      { type: 1, relation: "Type 1 converts anger into resentment and principled action through reaction formation." },
    ],
    capacity:
      "The gut center's essential capacity is embodied knowing — direct response to environment and the assertion of presence and boundary. When underutilized, the person is cut off from instinctual wisdom. When overutilized, there is excessive reactivity and difficulty moving from automatic response to reflective choice.",
  },
  {
    name: "Heart / Feeling / Emotional Center",
    types: [2, 3, 4],
    color: "#C4607A",
    emotion: "Shame",
    ichazoZone: "Image Ego",
    description:
      "The three types of the heart center share a primary orientation to the world through feeling, relationship, and the domain of identity and image. The underlying emotion is shame — a deep concern about worth, lovability, and identity.",
    typeRelations: [
      { type: 2, relation: "Type 2 manages shame through pride and the performance of lovability — becoming indispensable to others." },
      { type: 3, relation: "Type 3 manages shame through achievement and the replacement of genuine identity with a successful image." },
      { type: 4, relation: "Type 4 manages shame through cultivating a special, unique identity that distinguishes them from the ordinary." },
    ],
    capacity:
      "The heart center's essential capacity is genuine emotional intelligence — feeling what one feels, empathizing accurately with others, and relating from genuine care rather than from strategy. When distorted by shame, emotional experience becomes organized around whether the self is acceptable, valuable, or lovable.",
  },
  {
    name: "Head / Thinking / Mental Center",
    types: [5, 6, 7],
    color: "#2980B9",
    emotion: "Fear",
    ichazoZone: "Adaptation Ego",
    description:
      "The three types of the head center share a primary orientation to the world through thought, strategy, and the domain of security and certainty. The underlying emotion is fear — anxiety about one's capacity to cope with the world and to find safety within it.",
    typeRelations: [
      { type: 5, relation: "Type 5 manages fear through withdrawal, accumulation of knowledge, and the observer position." },
      { type: 6, relation: "Type 6 manages fear through vigilance, alliances, and ongoing scanning for threat." },
      { type: 7, relation: "Type 7 manages fear through forward movement, planning, and the inflation of possibilities." },
    ],
    capacity:
      "The head center's essential capacity is genuine mental clarity — perceiving reality directly, thinking creatively without the distortion of anxiety, and orienting in time and space with genuine intelligence. When fear distorts this center, thinking becomes defensive rather than exploratory.",
  },
];

const HORNEVIAN = [
  {
    name: "Compliant Group (Moving Toward)",
    types: [1, 2, 6],
    color: "#27AE60",
    description:
      "These types seek security and support through compliance — with internal rules (1), with others' needs (2), or with established structures and authorities (6). They tend to subordinate their own needs to relational or structural demands.",
  },
  {
    name: "Assertive Group (Moving Against)",
    types: [3, 7, 8],
    color: "#C9921A",
    description:
      "These types seek security through taking charge of their situation, asserting their will, and moving toward goals. They tend to trust themselves and resist dependency.",
  },
  {
    name: "Withdrawn Group (Moving Away)",
    types: [4, 5, 9],
    color: "#7B5AAD",
    description:
      "These types seek security through withdrawal from full engagement with the outer world, moving into inner space and away from the demands of direct engagement.",
  },
];

const HARMONIC = [
  {
    name: "Positive Outlook Group",
    types: [2, 7, 9],
    color: "#1ABC9C",
    description:
      "These types respond to difficulty by maintaining a positive frame, minimizing the negative, and focusing on what is hopeful, pleasant, or manageable. They resist being drawn into conflict or suffering.",
  },
  {
    name: "Competency Group",
    types: [1, 3, 5],
    color: "#B85C38",
    description:
      "These types respond to difficulty by relying on their competence, solving the problem, and maintaining functional efficiency. They resist acknowledging the emotional dimension of difficulty and focus on objective problem-solving.",
  },
  {
    name: "Reactive Group",
    types: [4, 6, 8],
    color: "#9B2C2C",
    description:
      "These types respond to difficulty by reacting intensely and expressing their emotional response. They need to be met in their feeling before they can move to problem-solving. They resist minimizing or bypassing the emotional reality.",
  },
];

const TYPE_COLORS: Record<number, string> = {
  1: "#B85C38", 2: "#C4607A", 3: "#C9921A", 4: "#7B5AAD",
  5: "#2980B9", 6: "#27AE60", 7: "#1ABC9C", 8: "#9B2C2C", 9: "#8B7355",
};

export default function CentersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div style={{ background: "#0f0a1e", minHeight: "100vh", color: "rgba(255,255,255,0.92)", fontFamily: "system-ui, sans-serif" }}>

        <nav style={{ padding: "1.25rem 1.5rem 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <span style={{ margin: "0 0.4rem" }}>/</span>
          <a href="/enneagram" style={{ color: "inherit", textDecoration: "none" }}>Enneagram</a>
          <span style={{ margin: "0 0.4rem" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Centers of Intelligence</span>
        </nav>

        <header style={{ padding: "3rem 1.5rem 2rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(41,128,185,0.15)", border: "1px solid rgba(41,128,185,0.3)", borderRadius: "999px", padding: "0.35rem 1rem", fontSize: "0.75rem", color: "#60a5fa", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            TRIADS
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
            Centers of Intelligence
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            Ichazo organized the nine ego types into three zones of three — gut, heart, and head — each governed by a distinct emotion and a different way of knowing the world.
          </p>
        </header>

        {/* Three Centers */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          {CENTERS.map((center) => (
            <div key={center.name} style={{ marginBottom: "2.5rem", background: "rgba(255,255,255,0.03)", border: `1px solid ${center.color}33`, borderRadius: "18px", padding: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: center.color, marginBottom: "0.3rem" }}>{center.name}</h2>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.78rem", background: `${center.color}22`, border: `1px solid ${center.color}44`, borderRadius: "6px", padding: "0.2rem 0.6rem", color: center.color }}>
                      Core emotion: {center.emotion}
                    </span>
                    <span style={{ fontSize: "0.78rem", background: "rgba(255,255,255,0.06)", borderRadius: "6px", padding: "0.2rem 0.6rem", color: "rgba(255,255,255,0.5)" }}>
                      Ichazo: {center.ichazoZone}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.35rem", marginLeft: "auto" }}>
                  {center.types.map((t) => (
                    <a key={t} href={`/enneagram/type-${t}`} style={{ background: `${TYPE_COLORS[t]}22`, border: `1px solid ${TYPE_COLORS[t]}44`, borderRadius: "8px", padding: "0.3rem 0.65rem", fontSize: "0.8rem", fontWeight: 700, color: TYPE_COLORS[t], textDecoration: "none" }}>
                      {t}
                    </a>
                  ))}
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1.25rem" }}>{center.description}</p>

              <div style={{ display: "grid", gap: "0.6rem", marginBottom: "1.25rem" }}>
                {center.typeRelations.map(({ type, relation }) => (
                  <div key={type} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ background: `${TYPE_COLORS[type]}22`, border: `1px solid ${TYPE_COLORS[type]}44`, borderRadius: "6px", padding: "0.15rem 0.5rem", fontSize: "0.78rem", fontWeight: 700, color: TYPE_COLORS[type], flexShrink: 0, marginTop: "0.1rem" }}>
                      Type {type}
                    </span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{relation}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                <strong style={{ color: "rgba(255,255,255,0.7)" }}>Essential capacity: </strong>{center.capacity}
              </p>
            </div>
          ))}
        </section>

        {/* Hornevian Groups */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>Hornevian Groups (Riso-Hudson)</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.75rem" }}>
            Drawing on Karen Horney&apos;s three neurotic trends, Riso and Hudson organized the nine types into groups based on their characteristic social strategy. Naranjo also drew on Horney&apos;s framework in his clinical descriptions.
          </p>
          <div style={{ display: "grid", gap: "1rem" }}>
            {HORNEVIAN.map((g) => (
              <div key={g.name} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${g.color}33`, borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: g.color }}>{g.name}</h3>
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    {g.types.map((t) => (
                      <a key={t} href={`/enneagram/type-${t}`} style={{ background: `${TYPE_COLORS[t]}22`, border: `1px solid ${TYPE_COLORS[t]}44`, borderRadius: "6px", padding: "0.15rem 0.5rem", fontSize: "0.78rem", fontWeight: 700, color: TYPE_COLORS[t], textDecoration: "none" }}>
                        {t}
                      </a>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.65 }}>{g.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Harmonic Groups */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>Harmonic Groups (Riso-Hudson)</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.75rem" }}>
            The Harmonic Groups describe how each type characteristically responds to conflict, difficulty, and the frustration of their desires.
          </p>
          <div style={{ display: "grid", gap: "1rem" }}>
            {HARMONIC.map((g) => (
              <div key={g.name} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${g.color}33`, borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: g.color }}>{g.name}</h3>
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    {g.types.map((t) => (
                      <a key={t} href={`/enneagram/type-${t}`} style={{ background: `${TYPE_COLORS[t]}22`, border: `1px solid ${TYPE_COLORS[t]}44`, borderRadius: "6px", padding: "0.15rem 0.5rem", fontSize: "0.78rem", fontWeight: 700, color: TYPE_COLORS[t], textDecoration: "none" }}>
                        {t}
                      </a>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.65 }}>{g.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: "440px", margin: "0 auto 5rem", padding: "0 1.5rem", textAlign: "center" }}>
          <div style={{ background: "rgba(41,128,185,0.12)", border: "1px solid rgba(41,128,185,0.25)", borderRadius: "20px", padding: "2rem 1.75rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Which center are you in?</h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              Take the Thyself Enneagram assessment to discover your core type and which center of intelligence shapes your experience.
            </p>
            <a href="/assessments" style={{ display: "inline-block", background: "linear-gradient(135deg, #2980B9, #60a5fa)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "12px", textDecoration: "none" }}>
              Start Free Assessment
            </a>
          </div>
        </section>

        <nav style={{ maxWidth: "760px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Explore more</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { href: "/enneagram/wings", label: "Wing Theory" },
              { href: "/enneagram/instinctual-stacking", label: "Instinctual Stacking" },
              { href: "/enneagram/holy-ideas", label: "Holy Ideas" },
              { href: "/enneagram/subtypes/type-4-sp", label: "Subtypes" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.4rem 0.9rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
