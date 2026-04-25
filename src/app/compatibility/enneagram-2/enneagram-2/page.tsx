import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 2;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Two Enneagram 2s in Relationship — The Giving Paradox | Thyself",
  description:
    "What happens when two Helpers pair up. Mutual attunement, the unmet self, the competition for the caretaker role, and the courage to receive directly. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 2 + 2 Compatibility",
    description:
      "Two Helpers in relationship: warmth and attunement on one side, the paradox of two givers and no one practiced at receiving on the other.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-2",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-2" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Two Enneagram 2s in Relationship — The Giving Paradox",
  description:
    "How two Type 2 Helpers relate: attraction, synergies, tensions, growth edges, and what this same-type pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-2",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-2" },
};

export default function Compatibility2and2Page() {
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
              Two Type 2s — The Giving Paradox
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two people whose love language is service to others — paired with someone who shows love the same way, and whose own needs are just as practiced at staying invisible.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Type 2 at a Glance</h2>
            <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: color }}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 2 — The Helper</p>
              <p className="leading-relaxed text-gray-700 text-sm">
                Twos are driven by a deep need to be loved and to be needed. They orient themselves toward other people&apos;s feelings, anticipating needs before they are spoken and offering care before it is requested. Their core fear is being unworthy of love on their own — without something to give, without a role to play in someone else&apos;s life. Beneath the warmth lives a quieter truth: their own needs were learned to be inconvenient, and so they remain mostly hidden, even from themselves.
              </p>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Twos Attract</h2>
            <p className="leading-relaxed text-gray-700">
              When two Twos meet, the warmth is immediate and mutual. Each finds in the other someone who actually notices — who sees the tired posture, the small disappointment, the unspoken preference. For a type that is used to doing all the noticing in their other relationships, being seen this way is unfamiliar and intoxicating. Most people do not pay attention the way another Two does.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a profound sense of shared mission. Both partners genuinely care about taking care of people, and they often build a life that extends outward — friends who become family, a household that is a place of refuge for others, a way of moving through the world that is organized around generosity. Two Twos can create something unusually warm.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              And there is the experience of being met without having to ask. In most relationships the Two does the emotional labor for both people, and quietly resents it. With another Two, the labor is shared. They bring each other tea before it is requested. They notice when the other is overextended. They take turns being attentive. The early stages of a 2+2 relationship can feel like the first time anyone has ever taken care of them in return.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Mutual emotional attunement",
                  body: "Both partners read the room with unusual sensitivity. They notice what the other is feeling before it is said, and they respond. This shared attentiveness creates a baseline of being-known that few other pairings can match.",
                },
                {
                  title: "Shared warmth",
                  body: "Both Twos bring affection, generosity, and emotional expressiveness to the relationship. There is rarely a deficit of tenderness. The relationship is warm even on its difficult days.",
                },
                {
                  title: "Nobody goes unnoticed",
                  body: "The chronic Two complaint — &lsquo;I do all the giving and no one notices me&rsquo; — has less of a foothold here. Both partners are practiced at noticing. Both offer the small acknowledgments that the other has spent a lifetime quietly waiting for.",
                },
                {
                  title: "Genuine care on both sides",
                  body: "Neither partner is performing care for credit. Both actually want the other to be okay, and both are willing to put the other&apos;s wellbeing ahead of their convenience. This shared sincerity gives the relationship real substance.",
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
              The 2+2 relationship&apos;s central paradox is structural: the type that loves by giving is now paired with the type that loves by giving. Both partners are practiced at offering care and unpracticed at asking for it. This means the relationship can be full of generosity and still leave both people quietly unmet.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Who takes care of whom",
                  body: "Both partners reach reflexively for the caretaker role. When both are exhausted, neither knows how to be the one who is taken care of. Each Two waits for the other to need them, and neither lets themselves be needy first. The result is two people quietly running on empty in parallel.",
                },
                {
                  title: "Competition for the caretaker role",
                  body: "More subtly, two Twos can compete over who gets to be the one helping. Being needed is a Two&apos;s primary source of self-worth, and when the partner steps into that role first, it can feel like being made redundant. Small skirmishes about who gets to do the dishes, plan the dinner, comfort the friend, are often about something deeper.",
                },
                {
                  title: "Needs going unmet",
                  body: "Because both partners&apos; attention is reflexively outward, the inward work of noticing one&apos;s own needs and naming them gets neglected. The relationship can be a place of beautiful giving in which neither partner actually feels deeply known in their own right — only known as a giver.",
                },
                {
                  title: "Resentment when giving is not reciprocated",
                  body: "Twos rarely ask directly. They give and wait to be appreciated in return. With another Two who is also waiting, the unspoken accounting can build up quietly. By the time it surfaces — usually as hurt rather than anger — it has often been brewing for months.",
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
                  When two Twos consciously commit to seeing each other&apos;s actual needs rather than only each other&apos;s offerings, the relationship becomes a rare place of being-loved-as-self. Both partners get the chance to discover that they are valued for who they are, not for what they provide. The same warmth that fuels their giving can fuel a love that does not require either of them to perform usefulness.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "#888" }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both partners must develop genuine self-care and the courage to ask for what they need directly — without earning it first by giving. This is the hardest growth ask of the type, and it is doubled in this pairing. Each Two must become someone who can say &ldquo;I am tired&rdquo; or &ldquo;I need you to take care of this&rdquo; without first justifying why they deserve it.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in Two Twos</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) shape how each Type 2 expresses in relationship. Same-type pairings amplify whatever variant each partner carries.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sp/2 + sp/2",
                  body: "Two self-preservation Twos (the &lsquo;privilege&rsquo; countertype, the most childlike and least overtly seductive variant) pair around a shared desire for warmth, comfort, and being delighted in. The risk is mutual indulgence and a quiet helplessness — neither wants to take responsibility for the unglamorous work of adulthood.",
                },
                {
                  label: "sx/2 + sx/2",
                  body: "Two sexual Twos (the &lsquo;aggression/seduction&rsquo; subtype, the most attention-seeking and intense) build a relationship around being chosen and being irreplaceable to one another. The risk is a charged jealousy and possessiveness — and exhaustion when both partners need to be the center of the other&apos;s gaze.",
                },
                {
                  label: "so/2 + so/2",
                  body: "Two social Twos (the &lsquo;ambition&rsquo; subtype, the most strategic and outward-facing) often partner around influence and shared service to a wider community. The risk is a relationship that performs warmth in public while neither partner gets the private, ordinary attention they actually need.",
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
                When both Twos are doing their inner work — when each has begun to develop a relationship with their own needs and to ask for what they want directly — the 2+2 pairing becomes a remarkable place of mutual generosity that does not deplete either partner. Both have learned that being loved does not depend on being useful. Both have learned to receive without immediately repaying. Both have learned that the highest form of care is sometimes letting yourself be the one taken care of, so that the other gets the gift of giving without strategy.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, two Twos build a home that is warm without being performative — a place where the giving flows in both directions and neither partner is keeping score. The relationship becomes the place where both finally discover that they are loved for who they are, not for what they provide.
              </p>
            </div>
          </section>

          {/* Practical growth tips */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for Two Twos</h2>
            <ul className="space-y-4">
              {[
                "Practice asking for what you need directly, in the smallest moments. &lsquo;Will you make me a tea?&rsquo; — without earning it first by offering theirs.",
                "Set explicit times when one of you is the one being taken care of. Switching the role on purpose breaks the reflex and builds the new muscle.",
                "When you feel hurt that the other is not noticing you, name it before it accumulates. The other Two cannot read minds when their own attention is reflexively outward.",
                "Talk regularly about your own needs — including the ones that feel selfish or inconvenient. The other Two needs to hear them in order to actually meet them.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 2</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/type-2/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 in Relationships</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-1/enneagram-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 2</Link>
              <Link href="/compatibility/enneagram-2/enneagram-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 4</Link>
              <Link href="/compatibility/enneagram-2/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 8</Link>
              <Link href="/compatibility/enneagram-2/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 9</Link>
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
