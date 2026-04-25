import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 1;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Two Enneagram 1s in Relationship — The Mirror Dynamic | Thyself",
  description:
    "What happens when two Reformers pair up. Shared standards, mutual integrity, the recursive inner critic, and the rare growth ask of receiving imperfection from the person most like you. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 1 + 1 Compatibility",
    description:
      "Two Reformers in relationship: aligned values and mutual respect on one side, the doubled inner critic and recursive correction on the other.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-1",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-1" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Two Enneagram 1s in Relationship — The Mirror Dynamic",
  description:
    "How two Type 1 Reformers relate: attraction, synergies, tensions, growth edges, and what this same-type pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-1",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-1" },
};

export default function Compatibility1and1Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Same-Type Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: color }}>
                <p className="text-3xl font-bold">{typeNum}</p>
                <p className="text-sm opacity-90">{typeName}</p>
              </div>
              <span className="text-3xl font-light opacity-60">+</span>
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: color }}>
                <p className="text-3xl font-bold">{typeNum}</p>
                <p className="text-sm opacity-90">{typeName}</p>
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Two Type 1s — The Mirror Dynamic
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two people whose inner critic is so recognizable in each other that it can feel like home — and whose shared standards can either become a lifelong project of mutual integrity or a recursive loop of correction.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Type 1 at a Glance</h2>
            <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: color }}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 1 — The Reformer</p>
              <p className="leading-relaxed text-gray-700 text-sm">
                Ones are driven by a deep need to be good and to act with integrity. They carry a strong inner critic — a relentless internal voice that judges what is right and wrong, what is acceptable and what falls short. Their core fear is being corrupt, defective, or wrong. They seek partners who share their commitment to doing things properly and who can be trusted to hold standards. Underneath the discipline lives an enormous reservoir of feeling — anger that the world is not as it should be, longing for a kind of rightness that is always just out of reach.
              </p>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Ones Attract</h2>
            <p className="leading-relaxed text-gray-700">
              When two Ones meet, the recognition is often immediate. Here is someone who actually cares about getting it right — who notices the same details, holds the same standards, takes the same kind of effort seriously. Most relationships ask the One to soften their standards, to be less particular, to relax in ways that feel like compromise. With another One, that pressure drops away. Their commitment to integrity is not a quirk to be tolerated; it is the air they both breathe.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a profound sense of validation. The One&apos;s inner critic is exhausting and isolating — most people have no idea how loud it is, or how much daily effort goes into meeting its demands. Another One understands. They have the same critic. They know what it costs. The early stages of a 1+1 relationship can feel like coming home to someone who finally sees the work.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              And there is the appeal of a shared project. Two Ones often build something together — a household, a business, a cause, a way of living — that aspires to a kind of rightness neither could quite achieve alone. The relationship itself becomes a vehicle for the integrity both types are devoted to.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Aligned values",
                  body: "Both partners care about the same things — fairness, honesty, doing things properly, holding to commitments. They rarely have to negotiate the basic ethical frame of the relationship; it is shared from the start. This frees enormous energy that other pairings spend on values disputes.",
                },
                {
                  title: "Shared commitment to integrity",
                  body: "Neither One needs to convince the other that effort matters, that promises should be kept, that the way you do things is who you are. They take each other&apos;s seriousness for granted in the best sense — as a baseline, not an achievement.",
                },
                {
                  title: "Mutual respect for effort",
                  body: "Ones see how hard the other One is working — internally, behind the scenes, in the small choices that no one else notices. This recognition of effort, given without flattery, can be deeply nourishing for a type that rarely feels they have done enough.",
                },
                {
                  title: "Honest communication",
                  body: "Both partners value telling the truth and find dishonesty intolerable. They can have direct, substantive conversations about what is and is not working without the evasions that other types often need. The relationship runs on a shared commitment to candor.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core tensions */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The 1+1 relationship&apos;s central challenge is structural: the inner critic that each One has been trying to manage internally now has an external partner. Standards that were already exacting can become doubled. The voice that says &ldquo;not good enough&rdquo; now lives in two people, and it can turn outward — onto each other.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Competition over who is more right",
                  body: "Both partners have a deep need to be on the correct side of any question. When they disagree, it is rarely a casual difference of opinion — it is a contest about who has the more accurate read of reality. Small disputes can take on enormous moral weight, and conceding can feel like admitting a flaw in oneself.",
                },
                {
                  title: "Accumulated resentment",
                  body: "Ones are often slow to voice irritation directly because anger feels unacceptable to them. With another One, two stockpiles of unspoken corrections build up in parallel. The eventual outburst — when it comes — is rarely about the immediate trigger; it is about months of restraint finally giving way.",
                },
                {
                  title: "Difficulty with shared relaxation",
                  body: "When neither partner gives themselves permission to fully exhale, the relationship can become all project and no rest. Vacations turn into improvement plans. Weekends become catch-up time. Spontaneity feels irresponsible. The relationship can lose the breathing room that makes intimacy possible.",
                },
                {
                  title: "Recursive self-criticism amplified",
                  body: "Each One sees the other&apos;s self-judgment from the outside and recognizes how unfair it is — and yet cannot extend the same compassion to themselves. The relationship can become a hall of mirrors in which two harsh internal voices reinforce each other rather than cancel out.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-900">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth edges */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  When two Ones consciously turn their commitment to integrity inward — toward each other&apos;s wellbeing rather than outward toward correction — they become unusually trustworthy partners. The same exacting standard that fuels their criticism can fuel their loyalty, their consistency, their willingness to actually do what they say. Few pairings can build something as durable as two healthy Ones working in alignment.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "#888" }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The core growth ask is the hardest one for this type: to receive imperfection from the person most like themselves. Each One must learn to extend toward their partner the compassion they cannot yet extend to themselves — and to receive that same compassion in return without deflecting it. This is the work of a lifetime, and the 1+1 relationship asks for it daily.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in Two Ones</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) shape how each Type 1 expresses in relationship. Same-type pairings amplify whatever variant each partner carries.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sp/1 + sp/1",
                  body: "Two self-preservation Ones (the &lsquo;worry&rsquo; subtype) build a meticulously ordered domestic life. The risk is that anxiety about getting things right at home becomes the central organizing principle, leaving little room for play, mess, or ordinary human inefficiency.",
                },
                {
                  label: "sx/1 + sx/1",
                  body: "Two sexual Ones (the &lsquo;zeal&rsquo; countertype, the most reformist and intense) channel the type&apos;s perfectionism into improving each other and the world. This pairing has fire and conviction, but also the highest risk of mutual reformation projects that no one asked for.",
                },
                {
                  label: "so/1 + so/1",
                  body: "Two social Ones (the &lsquo;non-adaptability&rsquo; subtype) often partner around a shared cause or moral project. They model the right way to be in public, but the risk is a relationship that performs rectitude rather than letting either partner be ordinary in private.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* At their best */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="leading-relaxed text-gray-700">
                When both Ones are doing their inner work, this pairing becomes a model of what aligned commitment can build. They hold each other accountable in ways that feel supportive rather than punitive. They share the load of running a life with unusual fairness. They take each other&apos;s standards seriously without making them weapons. And they offer each other something neither has often received: the experience of being deeply loved by someone who sees the relentless inner critic clearly and chooses, over and over, to refuse its terms.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, two Ones discover that the answer to perfectionism is not lower standards but a higher one — the standard of treating each other, and themselves, with the same care they bring to their work. The relationship becomes the place where both partners finally learn that being loved does not have to be earned.
              </p>
            </div>
          </section>

          {/* Practical growth tips */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for Two Ones</h2>
            <ul className="space-y-4">
              {[
                "Name corrections explicitly and early — small irritations should be aired in low-stakes moments rather than allowed to accumulate into a major rupture.",
                "Designate genuinely unstructured time together where neither partner is allowed to use the words &lsquo;should&rsquo; or &lsquo;ought.&rsquo; Build the muscle of being together without a project.",
                "When you disagree, ask: am I trying to be right, or am I trying to understand? If the goal is to win, slow down. With another One, the cost of being right is high.",
                "Practice receiving appreciation without immediately deflecting it or following it with an internal correction. The other One sees the effort. Let it land.",
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: color }}>{i + 1}</span>
                  <p className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: tip }} />
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 1</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 — The Reformer</Link>
              <Link href="/enneagram/type-1/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 in Relationships</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-1/enneagram-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 2</Link>
              <Link href="/compatibility/enneagram-1/enneagram-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 4</Link>
              <Link href="/compatibility/enneagram-1/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 7</Link>
              <Link href="/compatibility/enneagram-9/enneagram-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 + Type 1</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before exploring compatibility</h2>
            <p className="mb-6 text-base opacity-90">
              Compatibility insights are most useful when both people know their actual type — not just their favorite number. Take the free Thyself Enneagram Assessment.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
