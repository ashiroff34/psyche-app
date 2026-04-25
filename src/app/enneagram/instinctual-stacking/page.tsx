import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enneagram Instinctual Stacking: SP, SO, SX Orders Explained | Thyself",
  description:
    "Beyond dominant instinct: how the ordering of all three instincts (SP, SO, SX) creates six distinct stacking profiles. Includes the blind instinct and its shadow function. Based on Ichazo and Naranjo.",
  keywords: [
    "enneagram instinctual stacking",
    "sp so sx stacking",
    "blind instinct enneagram",
    "self-preservation social sexual enneagram",
    "instinctual stack order",
    "enneagram three instincts",
  ],
  openGraph: {
    title: "Enneagram Instinctual Stacking: SP, SO, SX | Thyself",
    description: "The six instinctual stacking orders — how the ranking of SP, SO, and SX creates distinct personality profiles beyond dominant instinct alone.",
    type: "article",
    url: "https://thyself.app/enneagram/instinctual-stacking",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://thyself.app/enneagram/instinctual-stacking" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Instinctual Stacking: The Six SP/SO/SX Orderings",
  description: "How the three instincts rank to create six distinct stacking profiles, plus the blind instinct and its shadow function.",
  url: "https://thyself.app/enneagram/instinctual-stacking",
  author: { "@type": "Organization", name: "Thyself" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
    { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
    { "@type": "ListItem", position: 3, name: "Instinctual Stacking", item: "https://thyself.app/enneagram/instinctual-stacking" },
  ],
};

const INSTINCTS = [
  {
    code: "SP",
    name: "Self-Preservation",
    color: "#C9921A",
    question: "Am I safe? Do I have what I need? Is my environment secure and comfortable?",
    description:
      "The self-preservation instinct governs concerns about physical survival, security, comfort, health, and resource management. People with a dominant SP instinct are preoccupied with practical matters: finances, health, housing, food, comfort, and the material conditions for a secure life. They are often pragmatic, grounded, and attentive to the concrete details of daily existence.",
    blind:
      "When SP is repressed (blind), the person tends to be neglectful of their own material needs, health, and basic security. They may ignore bodily signals, neglect finances, or be chronically uncomfortable in their physical environment without attending to it.",
  },
  {
    code: "SO",
    name: "Social",
    color: "#27AE60",
    question: "Do I belong? What is my role in the group? Am I accepted and valued by my community?",
    description:
      "The social instinct governs concerns about belonging, position within groups, social role, status, and the navigation of collective dynamics. People with a dominant SO instinct are preoccupied with how they fit into the social fabric: who is in their group, what their role is, what norms and expectations govern their collective, and what their standing is.",
    blind:
      "When SO is repressed, the person tends to be relationally isolated, unaware of their social impact or position, and often struggling with a sense of not belonging that they cannot easily articulate. They may be socially clumsy without being aware of it.",
  },
  {
    code: "SX",
    name: "Sexual / One-to-One",
    color: "#9B2C2C",
    question: "Am I fully alive? Is there genuine connection and intensity in my life? Am I truly known and seen by those closest to me?",
    description:
      "The sexual or one-to-one instinct governs concerns about intense intimate connection, attraction, and the drive for deep merging with another person (or, when sublimated, with an idea, cause, or creative work). People with a dominant SX instinct are preoccupied with the quality and depth of their most important connections and with what is exciting, compelling, and vivid in their experience.",
    blind:
      "When SX is repressed, the person tends to be emotionally flat, less passionate about both people and ideas, and often unaware of what genuinely moves them or of the intensity of what others feel for them. They may be reliable and functional but lacking in the spark of genuine engagement.",
  },
];

const STACKS = [
  {
    order: "SP/SO",
    color: "#C9921A",
    description:
      "Practical and grounded with secondary social investment. The most conventional and stable stacking: focused on material security and reliable group participation. Less likely to seek intensity or drama. Often highly functional, reliable, and steady.",
    keywords: ["Grounded", "Conventional", "Reliable", "Security-focused"],
  },
  {
    order: "SP/SX",
    color: "#7B5AAD",
    description:
      "Practical and private, with intense selectivity in close connection. Self-sufficient on the surface with a strong one-to-one depth in specific chosen relationships. Can appear very independent and reserved while being privately deeply invested in a small number of people. Often creative, inward, and intense in private.",
    keywords: ["Independent", "Selective", "Private intensity", "Creative"],
  },
  {
    order: "SO/SP",
    color: "#27AE60",
    description:
      "Group-oriented with a strong practical foundation. Concerned with their role and status in communities while maintaining material security. Often more conventionally social and socially competent than SO/SX. The most 'mainstream' stacking in many respects.",
    keywords: ["Social", "Practical", "Community-oriented", "Mainstream"],
  },
  {
    order: "SO/SX",
    color: "#1ABC9C",
    description:
      "Group-oriented with strong one-to-one intensity. Often the most charismatic and publicly engaging stacking — socially invested and emotionally intense. Can be powerful cultural figures, activists, or community leaders. The SO and SX instincts reinforce each other's extroverted, relational quality.",
    keywords: ["Charismatic", "Influential", "Activist", "Emotionally intense"],
  },
  {
    order: "SX/SP",
    color: "#9B2C2C",
    description:
      "Intensely one-to-one with a strong private foundation. The castle goes up except for the chosen few. Deeply intimate with specific others, fiercely private and self-sufficient otherwise. Often creative and interior, with a strong need for both intense connection and equally intense solitude.",
    keywords: ["Intense", "Private", "Selective intimacy", "Creative depth"],
  },
  {
    order: "SX/SO",
    color: "#C4607A",
    description:
      "Intensely relational and socially engaged, with the one-to-one intensity coloring the entire social presence. Often magnetic and culturally influential. The most outwardly energized stacking — both the social and sexual instincts are directed outward, toward people, toward communities, toward the engagement of the world.",
    keywords: ["Magnetic", "Culturally influential", "Outwardly energized", "Charismatic"],
  },
];

export default function InstinctualStackingPage() {
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
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Instinctual Stacking</span>
        </nav>

        <header style={{ padding: "3rem 1.5rem 2rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(201,146,26,0.15)", border: "1px solid rgba(201,146,26,0.3)", borderRadius: "999px", padding: "0.35rem 1rem", fontSize: "0.75rem", color: "#fbbf24", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            INSTINCTUAL STACKING
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
            The Six Instinctual Stacking Orders
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            Each person exercises all three instincts (SP, SO, SX) — but not equally. The ordering from most dominant to most repressed is the instinctual stack, and it modifies your core type in ways that go beyond dominant instinct alone.
          </p>
        </header>

        {/* Foundation */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.25rem" }}>The Three Instincts</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {INSTINCTS.map((inst) => (
              <div key={inst.code} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${inst.color}33`, borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontWeight: 800, fontSize: "1rem", color: inst.color, background: `${inst.color}22`, border: `1px solid ${inst.color}44`, borderRadius: "8px", padding: "0.25rem 0.65rem" }}>{inst.code}</span>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>{inst.name}</span>
                </div>
                <p style={{ fontSize: "0.82rem", color: inst.color, fontStyle: "italic", marginBottom: "0.75rem", opacity: 0.9 }}>&ldquo;{inst.question}&rdquo;</p>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{inst.description}</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
                    <strong style={{ color: "rgba(255,255,255,0.55)" }}>When blind (repressed): </strong>{inst.blind}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Six Stacking Orders */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>The Six Stacking Orders</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.75rem" }}>
            The three instincts can be ordered in six ways, each producing a recognizably different character modification on top of the core type.
          </p>
          <div style={{ display: "grid", gap: "1rem" }}>
            {STACKS.map((s) => (
              <div key={s.order} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}33`, borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", color: s.color }}>{s.order}</span>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    {s.keywords.map((k) => (
                      <span key={k} style={{ fontSize: "0.72rem", background: `${s.color}15`, border: `1px solid ${s.color}33`, borderRadius: "6px", padding: "0.15rem 0.5rem", color: s.color }}>{k}</span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blind Instinct */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <div style={{ background: "rgba(155,44,44,0.08)", border: "1px solid rgba(155,44,44,0.25)", borderRadius: "16px", padding: "1.75rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem", color: "#f87171" }}>The Blind Instinct and Its Shadow</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              The repressed or blind instinct (the third in the stack) is not simply absent — it operates as a shadow, influencing the person in ways they are not fully conscious of. The domain of the blind instinct is experienced with a quality of anxiety, awkwardness, or projection that is distinctive.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              What the person cannot do well for themselves in the domain of the blind instinct, they often are highly attuned to in others:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: "grid", gap: "0.6rem" }}>
              {[
                "The SO-blind person often feels acutely the isolation or non-belonging of others while remaining unaware of their own social disconnection.",
                "The SX-blind person may be particularly sensitive to others' lack of aliveness or passion while being genuinely unaware of their own flatness.",
                "The SP-blind person often notices and worries about others' physical wellbeing while neglecting their own material needs and security.",
              ].map((item, i) => (
                <li key={i} style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: "440px", margin: "0 auto 5rem", padding: "0 1.5rem", textAlign: "center" }}>
          <div style={{ background: "rgba(201,146,26,0.1)", border: "1px solid rgba(201,146,26,0.25)", borderRadius: "20px", padding: "2rem 1.75rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Find your instinctual stack</h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              The Thyself assessment includes your dominant instinct. Understanding your full stack goes deeper.
            </p>
            <a href="/assessments" style={{ display: "inline-block", background: "linear-gradient(135deg, #C9921A, #fbbf24)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "12px", textDecoration: "none" }}>
              Start Free Assessment
            </a>
          </div>
        </section>

        <nav style={{ maxWidth: "760px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Explore more</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { href: "/enneagram/subtypes/type-4-sp", label: "27 Subtypes" },
              { href: "/enneagram/centers", label: "Centers of Intelligence" },
              { href: "/enneagram/wings", label: "Wing Theory" },
              { href: "/enneagram/holy-ideas", label: "Holy Ideas" },
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
