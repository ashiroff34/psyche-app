import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram 5 and 5 Compatibility — Two Investigators in Relationship | Thyself",
  description:
    "How two Enneagram Type 5s work as a couple: deep intellectual resonance, the parallel-rather-than-convergent dynamic, and what two Investigators need to build a shared life rather than two parallel ones. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 5 and 5 Compatibility — Two Investigators",
    description:
      "Two Type 5s understand each other&apos;s need for space and depth — and must work to ensure they are actually sharing a life rather than running parallel lives in respectful proximity.",
    url: "https://thyself.app/compatibility/enneagram-5/enneagram-5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-5/enneagram-5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5 and 5 Compatibility — Two Investigators in Relationship",
  description: "How two Enneagram Type 5s relate: intellectual resonance, parallel dynamics, emotional distance patterns, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-5/enneagram-5",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-5/enneagram-5" },
};

export default function Compatibility5and5Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>5</span>
              <span className="text-2xl font-light opacity-60">+</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>5</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Two {typeName}s</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two Fives create a partnership of extraordinary intellectual resonance and mutual respect for autonomy. Each partner honors the other&apos;s need for space, solitude, and independent engagement with their areas of expertise. The risk is a relationship that operates more like two parallel lives than a shared one — each Five deeply engaged in their own world, deeply respectful of the other&apos;s, and neither quite bridging the gap between them.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Fives Attract</h2>
            <p className="leading-relaxed text-gray-700">
              Two Fives are drawn together first through the mind. Their initial connection is often intellectual — a conversation that goes somewhere genuinely interesting, an exchange of ideas that reveals a shared depth and range of engagement that is rare. For a type that often finds social engagement depleting, finding someone whose intellectual presence is energizing rather than draining is significant.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The mutual respect for autonomy is also an immediate, powerful draw. Each Five recognizes in the other a genuine independence — an absence of the clinging, demanding, emotionally saturated needs that exhaust them in relationships with other types. A relationship with another Five promises space, which is one of the things the Five values most.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                { title: "Deep intellectual engagement", body: "The intellectual life of a two-Five relationship can be extraordinary. Both partners bring depth, both bring genuine curiosity, and both are willing to follow an idea wherever it leads. Their conversations can reach a level of precision and exploration that energizes rather than depletes — which is the rarest thing for a Five." },
                { title: "Mutual respect for autonomy and solitude", body: "Neither Five will be affronted by the other&apos;s need for space. Both understand that solitude is not rejection — it is the necessary condition for showing up as a full person when they are together. The relationship breathes, and both partners are genuinely comfortable within the spaciousness." },
                { title: "Low emotional demand and high practical reliability", body: "Two Fives create a relationship with a low emotional overhead — neither is generating dramatic, demanding emotional situations that exhaust the other. At the same time, both are reliable in the practical sense: they do what they say, they follow through, and they are genuinely present when they are present." },
                { title: "Shared acceptance of unconventional arrangements", body: "Two Fives are often comfortable with arrangements that other couples would find unusual — separate interests, separate social lives, extended periods of independent engagement with their work. Neither requires the other to be more socially integrated than they naturally are." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="space-y-4">
              {[
                { title: "Parallel rather than shared lives", body: "The two-Five relationship&apos;s greatest risk is that the mutual respect for autonomy quietly becomes mutual isolation. Each Five is absorbed in their own domain, their own projects, their own interior world — and the relationship becomes two people in respectful proximity who have gradually stopped actually engaging with each other. The space that is the relationship&apos;s gift can become the relationship&apos;s absence." },
                { title: "Neither initiates emotional contact", body: "Both Fives are accustomed to waiting for the emotional situation to become safe before engaging with it. In a relationship with a more emotionally initiating partner, the Five eventually gets drawn in. With another Five, both may be waiting for the other to make it safe — and neither does, so the emotional dimension of the relationship remains underdeveloped." },
                { title: "Practical intimacy and daily life", body: "The domains of ordinary shared life — household management, social obligations, the logistics of a shared existence — can create friction between two Fives who are both more comfortable with the abstract than the practical. Neither is naturally inclined to attend to the ordinary work of keeping a shared life running, and both may find it depleting." },
                { title: "Difficulty with repair after conflict", body: "When two Fives have a significant conflict, both may withdraw — into their separate areas, their separate projects, their separate processing. This withdrawal, while necessary, can become extended in the absence of a partner who will initiate the re-engagement. The gap can widen while both are waiting for the other to bridge it." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>At their best</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Two Fives who have each developed the willingness to initiate connection — to move toward the other rather than waiting for the other to make it safe — create a relationship of remarkable depth and genuine partnership. Their intellectual life is rich, their mutual understanding is real, and their shared life has a quality of unhurried depth that is genuinely rare.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both Fives must develop the practice of reaching toward the other — not waiting for it to feel safe, not waiting until they have enough energy, but making the intentional move across the gap. One Five who has learned to initiate contact gives the other permission to do the same. The relationship that seemed to require no maintenance turns out to require the most deliberate kind: showing up even when withdrawal is easier.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Compatibility Pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/type-5/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 in Relationships</Link>
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">4 + 5 Compatibility</Link>
              <Link href="/compatibility/enneagram-5/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">5 + 6 Compatibility</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Understand your type in relationship</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — discover what drives you and how you connect.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
