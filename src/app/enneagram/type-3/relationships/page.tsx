import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 3 in Relationships — The Achiever as a Partner | Thyself",
  description:
    "How Enneagram Type 3 shows up in relationships: their drive and image-consciousness, the pattern of substituting performance for presence, and what they need to move from success to intimacy. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 3 in Relationships — The Achiever as a Partner",
    description:
      "The Type 3 is charming, competent, and intensely focused — but in relationships, they often lead with image rather than self. The question is whether they can slow down enough to be truly known.",
    url: "https://thyself.app/enneagram/type-3/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-3/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 3 in Relationships — The Achiever as a Partner",
  description:
    "How the Enneagram Type 3 shows up in relationships: image-consciousness, the substitution of performance for presence, and what they need to move from success to intimacy.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-3/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-3/relationships" },
};

export default function Type3Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 3</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Achiever in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 3s bring energy, competence, and genuine warmth to their relationships. They make things happen, they solve problems, and they are extraordinarily good at presenting the best version of themselves. The deeper challenge is that relationships require being seen — not presented — and the Three&apos;s identity is built around performance rather than presence.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 3 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 3s are devoted, capable, and deeply attentive to the people they love. They are natural problem-solvers who take the relationship seriously and work hard at it. When a Three commits to a relationship, they commit with the same focused energy they bring to everything else — which can be a tremendous gift. They are engaged, responsive, and often genuinely delightful to be around.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three&apos;s social intelligence is also an asset. They read people well, know how to make others feel good, and can navigate social complexity with ease. In a relationship, this translates into attentiveness to their partner&apos;s public presentation and comfort — they want their partner to shine, and they know how to help that happen.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Threes also bring a quality of forward motion that keeps the relationship from stagnating. They are builders — of lives, of experiences, of plans. A relationship with a Three often has a quality of momentum and shared direction that can be very attractive and enlivening.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Admiration and recognition",
                  body: "Type 3s need to feel seen and valued — both for what they accomplish and for who they are. They are drawn to partners who appreciate their efforts, acknowledge their competence, and reflect genuine admiration. Without this, the Three may quietly escalate their performance in search of the recognition that is not arriving.",
                },
                {
                  title: "To be loved without performing",
                  body: "The Three&apos;s deepest fear is being worthless without their achievements. In a relationship, they need a partner who loves them when they fail, when they are tired, when they have nothing to show — who loves the person behind the accomplishments. This kind of unconditional acceptance is the Three&apos;s most important developmental need.",
                },
                {
                  title: "Space to slow down",
                  body: "Most Threes are in motion most of the time. They need a relationship that creates genuine pockets of stillness — not as escape from the busyness, but as a place where the busyness is not required. Partners who can be with the Three quietly, without agenda or expectation, are offering them something rare and restorative.",
                },
                {
                  title: "A partner who can keep up",
                  body: "Threes respect competence and capability. They are energized by partners who have their own ambitions, their own lives, their own clarity of direction. A partner who is passive or dependent can inadvertently trigger the Three&apos;s impatience and the sense that they need to manage everything themselves.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Performance-Presence Gap</h2>
            <p className="leading-relaxed text-gray-700">
              The most consistent relational challenge for Type 3s is the substitution of performance for presence. Because the Three&apos;s sense of worth is so thoroughly tied to what they accomplish, their impulse when the relationship needs attention is often to do something — to plan something, to fix something, to make something happen — rather than simply to be present with what is. This can leave partners feeling that they are being managed rather than loved.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Threes are also highly skilled at presenting a particular image of the relationship, both to themselves and to others. They can be genuinely surprised when their partner experiences the relationship very differently from how the Three has been narrating it — because the Three has been so focused on its external presentation that they missed what was happening internally for both of them.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three&apos;s capacity for self-deception in this area is significant: they can convince themselves — and often others — that the relationship is fine because the surface looks fine. Growing past this requires developing the willingness to sit with what is actually happening emotionally, even when that is not comfortable, not productive, and not fixable.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 3 who has developed genuine self-knowledge — who can be present rather than performing, who has learned that love does not require constant achievement — is a remarkable partner. Their energy, attentiveness, and care, grounded in authentic presence, create a relationship that is both dynamic and deeply real. Their growth toward intimacy is often one of the most moving transformations on the Enneagram.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Three&apos;s growth edge is learning that relationships are not projects to be optimized. Intimacy is not an achievement. The partner does not need to be managed, the relationship does not need to be curated, and failure does not mean the relationship is a failure. Slowing down enough to feel — to be genuinely affected by the other person — is the door to the depth the Three most needs.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 3 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 3s often describe feeling swept along by someone who makes things happen — energetic, capable, often charming. The challenge is creating enough stillness in the relationship for real intimacy to develop. This requires the partner to actively hold space for the conversations that are not productive, the moments that do not advance any goal, the vulnerability that is not useful.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Three well means reflecting their value back to them in ways that are not contingent on achievement. When a Three fails — at work, at a project, at something they cared about — the partner who can say "you are still valuable to me, exactly as you are right now" is giving them something they cannot manufacture themselves.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              It also means gently challenging the Three when they go into management mode — when they start treating the relationship as a problem to be solved rather than a reality to be inhabited. Not critically, but with a kind of grounded presence that says: "I am here. You do not have to fix this. Just be here with me."
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/3w2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">3w2 — The Charmer</Link>
              <Link href="/enneagram/3w4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">3w4 — The Professional</Link>
              <Link href="/enneagram/subtypes/sp-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 3</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — understand the patterns that shape how you love.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
