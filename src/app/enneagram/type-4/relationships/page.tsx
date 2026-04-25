import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 4 in Relationships — The Individualist as a Partner | Thyself",
  description:
    "How Enneagram Type 4 shows up in relationships: their capacity for depth and emotional intensity, the idealize-devalue cycle, and what they need to stay present in love. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 4 in Relationships — The Individualist as a Partner",
    description:
      "The Type 4 brings extraordinary emotional depth and a hunger for authentic connection. The challenge is staying with what is — rather than longing for what is missing.",
    url: "https://thyself.app/enneagram/type-4/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-4/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 4 in Relationships — The Individualist as a Partner",
  description:
    "How the Enneagram Type 4 shows up in relationships: emotional depth, the idealize-devalue cycle, and what they need to stay present in love.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-4/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-4/relationships" },
};

export default function Type4Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 4</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Individualist in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 4s want more from relationships than most people ask for: real depth, authentic contact, a love that sees them fully and does not look away. They are capable of extraordinary emotional intimacy — and they are vulnerable to a pattern of longing for what is missing rather than inhabiting what is present.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 4 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 4s are among the most authentically intimate partners on the Enneagram. They are not interested in surface contact — they want to know and be known at a level of depth that most people keep protected. They bring emotional intelligence, aesthetic sensitivity, and a quality of attention that makes their partners feel genuinely seen. A Four who loves you is paying attention to the parts of you that you may not be paying attention to yourself.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Four&apos;s capacity for feeling is a gift to any relationship. They do not avoid emotion — they move toward it, explore it, use it as a medium of connection. In a culture that tends to suppress or manage emotion, a Type 4 partner creates space for the emotional reality of the relationship to be present rather than managed away. This can be profoundly liberating for partners who have learned to keep their feelings at a safe distance.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Fours also bring creativity, meaning-making, and a genuine attentiveness to what makes the relationship singular — what is unique and special about this particular love, this particular partnership. They resist the generic; they want the relationship to be authentically theirs.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "To be fully seen",
                  body: "The Four&apos;s most fundamental need in relationship is to be known — not the polished version, not the acceptable version, but the complete and complicated reality of who they are. A partner who can receive their depth, their darkness, their contradictions, and still choose them is offering the Four the deepest form of love.",
                },
                {
                  title: "Depth and authenticity",
                  body: "Fours cannot sustain relationships that operate primarily at the surface. They need regular contact with the depths — conversations that matter, emotional honesty, genuine engagement with the interior life of the relationship. Superficiality is not just boring to a Four; it feels like a kind of death.",
                },
                {
                  title: "Space for their emotional range",
                  body: "Fours experience emotion with an intensity that can be alarming to more emotionally restrained types. They need a partner who does not try to manage, minimize, or fix their feelings — who can sit with them in the dark without rushing them back to the light. Being told to \"cheer up\" or \"look on the bright side\" feels profoundly invalidating.",
                },
                {
                  title: "Reassurance of being lovable",
                  body: "Beneath the Four&apos;s search for a partner who sees them fully is a fear that once truly seen, they will be found deficient — fundamentally flawed or lacking in some essential way. They need regular, specific reassurance that what has been seen is not just acceptable but genuinely loved.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Idealize-Devalue Pattern</h2>
            <p className="leading-relaxed text-gray-700">
              The Four&apos;s most characteristic relational pattern is idealization followed by disappointment. At the beginning of a relationship, the Four often experiences something close to the feeling they have been waiting for — the sense of being truly seen, of having found the love that will finally be enough. They project onto the new partner a depth of understanding and an emotional resonance that may exceed what is actually there. The partner becomes, for a time, the embodiment of everything the Four has longed for.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Inevitably, reality asserts itself. The partner is ordinary in ways the Four did not anticipate. The depth the Four experienced was partly projection. The longing returns, and with it, the sense that something essential is still missing — and that this, perhaps, is not the relationship that will finally provide it. The Four&apos;s attention can begin to move toward what is absent rather than what is present, toward what the relationship lacks rather than what it contains.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This pattern — not inevitable, but common — requires conscious work. The Four&apos;s growth in relationship involves developing the capacity to be present with what is, rather than perpetually oriented toward what is not. The relationship that is actually here, in all its ordinary beauty, is often more than the Four realizes when they are focused on its incompleteness.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 4 who has learned to stay — who has developed equanimity with ordinary love rather than pining for perfect love — is one of the most profoundly intimate partners on the Enneagram. Their depth, their attunement, their capacity for real emotional contact create a relationship of uncommon richness. They make their partners feel truly known.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Four&apos;s growth edge is learning that the ordinary is not the enemy of the profound. Real intimacy is built in the accumulation of ordinary moments — not in the extraordinary peaks that the Four gravitates toward. Staying with the relationship through its mundane stretches, choosing presence over longing, is the work that brings the Four the depth they have always been searching for.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 4 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 4s often describe an experience of depth that they have not found elsewhere — of being seen and known at a level that is both extraordinary and occasionally overwhelming. The Four brings the relationship alive in ways that can feel very beautiful and very intense in equal measure.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving a Four requires a capacity to be present with emotion without being destabilized by it. When the Four is in the dark — which will happen, and not infrequently — the most loving response is not to fix or minimize but to stay. To say: "I am here. I am not going anywhere. Tell me what is happening." This presence is more valuable than any solution.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              It also requires the willingness to be seen imperfectly without taking it personally when the Four notices what is missing. The Four will notice. They are oriented toward what is absent. The partner who can hear this without collapsing — who can hold their own ground while also staying connected — gives the Four exactly what they need: someone stable enough to hold the weight of what the Four carries.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/4w3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4w3 — The Aristocrat</Link>
              <Link href="/enneagram/4w5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4w5 — The Bohemian</Link>
              <Link href="/enneagram/subtypes/sp-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 4</Link>
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
