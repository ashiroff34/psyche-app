import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enneagram Holy Ideas: The 9 Objective Perceptions of Reality | Thyself",
  description:
    "The Holy Ideas are Ichazo's nine objective perceptions of reality — the undistorted views that each type loses contact with when the ego fixation crystallizes. Expanded by Almaas in Facets of Unity.",
  keywords: [
    "enneagram holy ideas",
    "ichazo holy ideas",
    "facets of unity almaas",
    "holy perfection type 1",
    "holy origin type 4",
    "enneagram objective reality",
    "ego fixation holy idea",
  ],
  openGraph: {
    title: "Enneagram Holy Ideas: All 9 Explained | Thyself",
    description: "Ichazo's nine Holy Ideas — the objective views of reality that the ego distorts into fixation. Expanded by Almaas in Facets of Unity.",
    type: "article",
    url: "https://thyself.app/enneagram/holy-ideas",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://thyself.app/enneagram/holy-ideas" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Holy Ideas: The 9 Objective Perceptions of Reality",
  description: "All 9 Holy Ideas from Ichazo's Protoanalysis with Almaas's expansions from Facets of Unity.",
  url: "https://thyself.app/enneagram/holy-ideas",
  author: { "@type": "Organization", name: "Thyself" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
    { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
    { "@type": "ListItem", position: 3, name: "Holy Ideas", item: "https://thyself.app/enneagram/holy-ideas" },
  ],
};

const HOLY_IDEAS = [
  {
    type: 1,
    name: "Holy Perfection",
    fixation: "Resentment",
    color: "#B85C38",
    ichazo: "The perception that reality, as it is, already participates in a divine perfection — that the universe is complete and functioning according to its own inherent order, not requiring the ego's correction. Perfection is not imposed from without but is inherent to the unfolding of reality.",
    almaas: "Holy Perfection is the direct perception that everything is, in every moment, perfect in the sense that it is exactly what it is — that every phenomenon is the precise expression of its own nature. This is not moral perfectionism but ontological perfection: the recognition that Being is always fully and completely what it is. When this is lost, the Type 1 ego constructs a world of imperfection that requires correction — substituting an ideal of how things should be for the direct perception of how things already are.",
    loss: "Without Holy Perfection, the Type 1 experiences the world as perpetually falling short of a standard it ought to meet — generating resentment and an unrelenting drive to correct.",
  },
  {
    type: 2,
    name: "Holy Freedom / Holy Will",
    fixation: "Flattery",
    color: "#C4607A",
    ichazo: "The perception that the soul is inherently free — that its existence and worth are not contingent on what it provides to others, and that the will of Being supports each individual existence unconditionally.",
    almaas: "Holy Freedom is the recognition that the soul's nature includes an inherent freedom — a capacity to simply be without the requirement of earning or justifying its existence through service. Holy Will is the recognition that the will of Being — the fundamental tendency of reality — supports each form of existence from within. The ego's management of love through pride and service is a substitution for trust in this support.",
    loss: "Without Holy Freedom, the Type 2 operates on the premise that love must be earned — that the self must be useful to be acceptable, generating pride and the compulsion to give.",
  },
  {
    type: 3,
    name: "Holy Harmony / Holy Hope",
    fixation: "Vanity",
    color: "#C9921A",
    ichazo: "The perception that there is already a divine order, harmony, or law governing the unfolding of reality — that the self does not need to create value or impose order but can participate in what is already real and already harmonious.",
    almaas: "Holy Law is the perception that reality functions according to its own inherent nature — that things are what they are and function as they function without requiring the ego's management or performance. Holy Harmony is the recognition that reality already flows smoothly as an expression of its inherent nature. The loss of this produces the Type 3's belief that the self must make itself happen — that without constant achievement and image management, the self would not be real or valuable.",
    loss: "Without Holy Harmony, the Type 3 believes the self must be actively constructed — that identity left unperformed will not exist or be valued.",
  },
  {
    type: 4,
    name: "Holy Origin",
    fixation: "Melancholy",
    color: "#7B5AAD",
    ichazo: "The perception that the self already has a source — that identity arises from and is rooted in Being itself, and is not something to be created or discovered through searching and suffering.",
    almaas: "Holy Origin is the recognition that the soul has a genuine ground — that it emerges from and remains rooted in the fundamental nature of Being, not as an isolated fragment but as an expression of the whole. The loss of this perception produces the Type 4's sense of being fundamentally separate from the source that others seem to possess naturally, and the resulting preoccupation with constructing and maintaining a unique identity as a substitute for the genuine ground that has been lost to perception.",
    loss: "Without Holy Origin, the Type 4 experiences themselves as fundamentally lacking a source others have naturally — generating envy and a searching quality in identity formation.",
  },
  {
    type: 5,
    name: "Holy Omniscience / Holy Transparency",
    fixation: "Retention",
    color: "#2980B9",
    ichazo: "The perception that reality is already knowable — that knowledge is not acquired through distance and accumulation but through participation and presence.",
    almaas: "Holy Omniscience is the perception that consciousness and reality are not fundamentally separate — that to know is not to stand outside but to participate in. Holy Transparency is the recognition that reality is already open and available to direct perception without the mediation of accumulated knowledge structures. The loss of these perceptions produces the Type 5's belief that consciousness must be isolated to be safe, that the world must be observed rather than inhabited, and that knowledge must be accumulated before engagement is possible.",
    loss: "Without Holy Omniscience, the Type 5 believes knowledge requires distance — that engagement depletes rather than opens, generating avarice and the observer position.",
  },
  {
    type: 6,
    name: "Holy Faith / Holy Strength",
    fixation: "Cowardice",
    color: "#27AE60",
    ichazo: "The perception that reality is fundamentally trustworthy — that the ground of Being provides genuine support, and that the self's inherent capacity is real and sufficient.",
    almaas: "Holy Strength is the direct perception of the soul's inherent capacity — not the ego's competence but an ontological strength that is simply part of what the soul is. Holy Faith is the recognition that this strength is trustworthy — that reality's fundamental nature is supportive rather than threatening. The loss of these perceptions produces the Type 6's pervasive doubt: doubt in the self's capacity, doubt in reality's trustworthiness, and the resulting vigilance and alliance-seeking as substitutes for genuine internal grounding.",
    loss: "Without Holy Faith, the Type 6 experiences inner capacity as insufficient and reality as fundamentally unsafe — generating fear, doubt, and scanning for threats.",
  },
  {
    type: 7,
    name: "Holy Wisdom / Holy Plan",
    fixation: "Planning",
    color: "#1ABC9C",
    ichazo: "The perception that reality unfolds in each present moment as the optimal experience, and that genuine satisfaction arises from conscious engagement with what is actually present rather than anticipation of what is imagined.",
    almaas: "Holy Wisdom is the awareness that reality exists as a succession of present moments, and that it is only by being in the present — not in imagined futures — that the unfolding of the cosmos can actually be experienced. The Type 7's entire strategy of planning and future-inflation is based on the premise that the present is insufficient; Holy Wisdom reveals that the present is itself the site of the fullness being sought. Holy Work is the recognition that sustained engagement with what is actually present — including when it is difficult — is the source of genuine depth and satisfaction.",
    loss: "Without Holy Wisdom, the Type 7 believes the present is insufficient — that fulfillment lies in the next experience, generating gluttony and the flight from limitation.",
  },
  {
    type: 8,
    name: "Holy Truth",
    fixation: "Vengeance",
    color: "#9B2C2C",
    ichazo: "The perception that reality is already real — that truth does not need to be forced into the open but is simply there, available to direct perception without the application of power.",
    almaas: "Holy Truth is the recognition that reality is inherently truthful — that the nature of things is not hidden and does not require force to reveal. The Type 8's belief that truth must be seized, that the world will cover itself in pretense unless confronted with power, is a distortion of this direct perception. When Holy Truth is recovered, the Type 8's capacity for directness and genuine encounter is freed from its armoring in aggression and dominance.",
    loss: "Without Holy Truth, the Type 8 believes reality conceals itself and must be forced into the open — generating lust and the use of power as the primary mode of encounter.",
  },
  {
    type: 9,
    name: "Holy Love",
    fixation: "Indolence",
    color: "#8B7355",
    ichazo: "The perception that love — in the fundamental sense of the inherent value and regard of Being for each particular existence — is the basic nature of reality, and that the self is already held within this love.",
    almaas: "Holy Love is the recognition that reality itself is intrinsically loving — not sentimental or conditional, but a basic fact about the nature of Being: it is supportive, accepting, and unconditionally sustaining of each particular form of existence. The Type 9's ego has organized around the absence of this recognition — around the experience of not being loved enough for one's own existence to matter, and the resulting minimization of the self as a strategy for making peace with this absence. Holy Love contradicts the premise: the self's existence is already of consequence, already held, already real in the fabric of Being.",
    loss: "Without Holy Love, the Type 9 experiences their own existence as inconsequential — generating sloth and the self-forgetting that comes from not believing one's presence matters.",
  },
];

const TYPE_NAMES: Record<number, string> = {
  1: "The Reformer", 2: "The Helper", 3: "The Achiever",
  4: "The Individualist", 5: "The Investigator", 6: "The Loyalist",
  7: "The Enthusiast", 8: "The Challenger", 9: "The Peacemaker",
};

export default function HolyIdeasPage() {
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
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Holy Ideas</span>
        </nav>

        <header style={{ padding: "3rem 1.5rem 2rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", fontSize: "0.75rem", color: "#fbbf24", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            ICHAZO / ALMAAS
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
            The Nine Holy Ideas
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            Ichazo coined the Holy Ideas as the objective perceptions of reality — not aspirations or ideals, but descriptions of how things actually are when consciousness is not filtered through ego distortion. The loss of each Holy Idea is the cognitive event that allows the corresponding fixation to crystallize.
          </p>
        </header>

        {/* Intro context */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: "16px", padding: "1.75rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>What the Holy Ideas Are — and Are Not</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              The Holy Ideas are not positive beliefs the type should adopt, nor are they goals to strive toward. They are descriptions of how reality actually presents itself when the ego&apos;s distortion is absent. Each represents a specific facet of a unified, undistorted perception of existence.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1rem" }}>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>A.H. Almaas</strong> expanded Ichazo&apos;s original formulations in <em>Facets of Unity</em> (1998), treating each Holy Idea as a specific facet of the overall recognition of reality&apos;s unity, aliveness, and supportiveness. Together, the nine Holy Ideas constitute a comprehensive map of objective reality as experienced in undistorted consciousness.
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.65 }}>
              Sources: Oscar Ichazo, Arica School (1970 onward); A.H. Almaas, <em>Facets of Unity: The Enneagram of Holy Ideas</em> (1998).
            </p>
          </div>
        </section>

        {/* The 9 Holy Ideas */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <div style={{ display: "grid", gap: "2rem" }}>
            {HOLY_IDEAS.map((hi) => (
              <div
                key={hi.type}
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${hi.color}33`, borderRadius: "18px", padding: "2rem" }}
              >
                {/* Header */}
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                  <div>
                    <a href={`/enneagram/type-${hi.type}`} style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                        <span style={{ background: `${hi.color}22`, border: `1px solid ${hi.color}44`, borderRadius: "6px", padding: "0.2rem 0.55rem", fontSize: "0.75rem", fontWeight: 700, color: hi.color }}>Type {hi.type}</span>
                        <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>{TYPE_NAMES[hi.type]}</span>
                      </div>
                    </a>
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: hi.color }}>{hi.name}</h2>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>Fixation: {hi.fixation}</p>
                  </div>
                </div>

                {/* Ichazo */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>ICHAZO</p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>{hi.ichazo}</p>
                </div>

                {/* Almaas */}
                <div style={{ marginBottom: "1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "1rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>ALMAAS (Facets of Unity)</p>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{hi.almaas}</p>
                </div>

                {/* Loss */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: `${hi.color}99`, letterSpacing: "0.06em", marginBottom: "0.4rem" }}>WHEN LOST</p>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.65 }}>{hi.loss}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: "440px", margin: "0 auto 5rem", padding: "0 1.5rem", textAlign: "center" }}>
          <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "20px", padding: "2rem 1.75rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Discover your type and its Holy Idea</h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              Understanding your Holy Idea is the beginning of genuine growth work — knowing what the ego lost contact with.
            </p>
            <a href="/assessments" style={{ display: "inline-block", background: "linear-gradient(135deg, #d97706, #fbbf24)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "12px", textDecoration: "none" }}>
              Start Free Assessment
            </a>
          </div>
        </section>

        <nav style={{ maxWidth: "760px", margin: "0 auto 4rem", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Explore more</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { href: "/enneagram/centers", label: "Centers of Intelligence" },
              { href: "/enneagram/wings", label: "Wing Theory" },
              { href: "/enneagram/instinctual-stacking", label: "Instinctual Stacking" },
              { href: "/enneagram/subtypes/type-4-sp", label: "27 Subtypes" },
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
