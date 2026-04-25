import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 7;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Enneagram 7 and 7 Compatibility — Two Enthusiasts in Relationship | Thyself",
  description:
    "How two Enneagram Type 7s work as a couple: the adventure and shared joy, the absence of any anchor to difficulty, and what two Enthusiasts need to build a relationship with genuine depth. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 7 and 7 Compatibility — Two Enthusiasts",
    description:
      "Two Type 7s make their relationship feel endlessly alive — and must work to ensure that the aliveness includes depth, not just stimulation.",
    url: "https://thyself.app/compatibility/enneagram-7/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-7/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 7 and 7 Compatibility — Two Enthusiasts in Relationship",
  description: "How two Enneagram Type 7s relate: shared joy, adventure, avoidance patterns, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-7/enneagram-7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-7/enneagram-7" },
};

export default function Compatibility7and7Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>7</span>
              <span className="text-2xl font-light opacity-60">+</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Two {typeName}s</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two Sevens create one of the most joyful and adventure-filled pairings on the Enneagram. Their shared life is full — of experiences, of people, of ideas, of plans. The question is whether &quot;full&quot; can become &quot;deep&quot; — whether the relationship that is always moving can learn to stay, and whether the two people having this wonderful time have actually found each other.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Sevens Attract</h2>
            <p className="leading-relaxed text-gray-700">
              Two Sevens recognize each other immediately — the energy, the enthusiasm, the appetite for experience, the quick and associative mind. With another Seven, there is no need to manage one&apos;s excitement, no partner pulling toward caution or stability when the next adventure is calling. The world opens up rather than closes down in the other&apos;s presence.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The mutual understanding of how each other operates is also significant. The Seven knows from personal experience what it is to need variety, to be energized by novelty, and to find long stretches of the same thing genuinely depleting. With another Seven, this does not require justification. It is simply the shared reality of both of them.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                { title: "Shared joy and appetite for experience", body: "Two Sevens together bring out the best of each other&apos;s enthusiasm. Their shared life is genuinely fun — full of plans, adventures, experiences, and the particular pleasure of being with someone who is as excited about the possibilities as you are. Neither dampens the other&apos;s enthusiasm; both amplify it." },
                { title: "Mutual freedom and non-possessiveness", body: "Neither Seven is inclined to constrain the other. Both value freedom too highly to try to limit the other&apos;s. The relationship has a quality of openness and spaciousness that allows both to pursue their interests without the guilt or resentment that can accumulate in relationships with more constrained dynamics." },
                { title: "Intellectual and creative synergy", body: "Two Sevens in conversation can generate an extraordinary quality of creative and intellectual energy — ideas bouncing off ideas, connections being made across domains, the particular pleasure of a mind that keeps up with yours. They stimulate each other in ways that feel genuinely productive." },
                { title: "Optimism that sustains the relationship through difficulty", body: "When the relationship hits a hard stretch, two Sevens have enormous reserves of optimism and forward orientation to draw on. Neither is inclined to catastrophize, and both are naturally oriented toward what is possible rather than what has gone wrong. This can be genuinely sustaining when the difficulty is real." },
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
                { title: "No one holds the darkness", body: "In most relationships, when one partner is struggling, the other can provide steadiness and presence. In a two-Seven relationship, when difficulty arrives, both partners are inclined to reframe, redirect, or simply move on to something more pleasant. The difficult thing may not get held by either partner — and over time, this can produce a relationship that looks very good from the outside but is haunted by things that have never been sat with." },
                { title: "Avoidance from both sides", body: "Both Sevens avoid the painful and the difficult. In a relationship, this means that difficult conversations get deferred, problems get reframed rather than addressed, and the hard work of working through something genuinely hard may never happen. The relationship may feel very smooth — because both partners are consistently going around the rough terrain rather than through it." },
                { title: "Practical recklessness", body: "Two Sevens together may make financial, logistical, or practical decisions with less caution than each would separately — each amplifying the other&apos;s appetite for the next experience without providing the brake that a more grounded partner might supply. The result can be a shared life that is genuinely wonderful and somewhat chaotic." },
                { title: "Depth versus stimulation", body: "The Seven&apos;s appetite is for experience, and two Sevens can keep each other perpetually stimulated — always the next thing, always the next plan — without either stopping long enough to go deep. The relationship may have enormous breadth and limited depth, which eventually produces a subtle but real emptiness beneath the fullness." },
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
                  Two Sevens who have each developed genuine presence — who have learned to stay through the difficult as well as the joyful — create a relationship that combines real depth with real joy. Their shared life is genuinely full: full of experience, full of meaning, full of the particular pleasure of being truly known by someone who can also keep up with you. The joy becomes more authentic because it has survived difficulty.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">The growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both Sevens must develop the willingness to stay — to be present with what is difficult, what is painful, what is not moving toward something better. One Seven who develops this capacity gives the other permission to do the same. The relationship that learns to sit with the hard things discovers that the joy it was already experiencing becomes richer for it: it is no longer the avoidance of pain, but the genuine presence in a life that includes everything.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Compatibility Pages</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/type-7/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 in Relationships</Link>
              <Link href="/compatibility/enneagram-6/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6 + 7 Compatibility</Link>
              <Link href="/compatibility/enneagram-7/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7 + 8 Compatibility</Link>
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
