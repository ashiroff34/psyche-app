import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 6;
const wingNum = 7;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 6w7 — The Buddy: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 6w7 — 'The Buddy.' How the Seven wing shapes the Loyalist: warmer, more outgoing, and forward-looking — managing anxiety through social connection, humor, and enthusiastic engagement with life. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 6w7 — The Buddy",
    description:
      "The 6w7 combines the Six's loyalty and commitment with the Seven's warmth and forward-looking energy. More outgoing and socially engaged than the 6w5, the Buddy manages anxiety through connection and enthusiasm.",
    url: "https://thyself.app/enneagram/6w7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/6w7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 6w7 — The Buddy: Traits, Growth & Identity",
  description: "How the Seven wing shapes Enneagram Type 6: warmer, more outgoing, and forward-looking in managing anxiety and building security.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/6w7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/6w7" },
};

export default function Page6w7() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>6</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Buddy</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 6w7 brings the Six&apos;s loyalty and commitment into the world with the Seven&apos;s warmth, humor, and forward-looking energy. More outgoing and socially engaging than the 6w5, the Buddy manages anxiety through connection — building the alliances and friendships that make the world feel safe.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Seven Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Seven wing gives the Six access to an outward-facing, forward-looking energy that helps counteract the Six&apos;s natural anxiety. The 6w7 does not sit with their fear the way the 6w5 might — they move, they plan, they connect. The Seven wing provides momentum that keeps the anxiety from becoming paralyzing.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Seven wing also introduces genuine warmth and sociability. The 6w7 is often the most outwardly likable Six subtype — they have the Six&apos;s loyalty and commitment paired with the Seven&apos;s humor, enthusiasm, and genuine enjoyment of people. They can move through social environments easily, building the network of allies that the Six&apos;s security strategy depends on.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Seven wing brings a degree of optimism to the Six&apos;s otherwise vigilant worldview. The 6w7 can hold anxiety and enthusiasm simultaneously — worrying about things while also genuinely believing that good outcomes are possible. This gives them more resilience than the more narrowly anxious 6w5 can sometimes access.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 6w7</h2>
            <div className="space-y-4">
              {[
                { title: "Warm and socially engaging", body: "The 6w7 is often the most naturally likable Six subtype. Their combination of Six&apos;s loyal warmth and Seven&apos;s genuine enthusiasm makes them easy to be around — people feel comfortable with them quickly." },
                { title: "Uses humor as a tool", body: "The Seven wing brings a playful, often self-deprecating humor to the Six&apos;s anxiety management toolkit. The 6w7 can make light of their worries in ways that are genuinely funny, not just deflective." },
                { title: "Forward-looking despite anxiety", body: "The 6w7 is more future-oriented than the 6w5. They plan enthusiastically for good outcomes while simultaneously preparing for bad ones. The Seven wing helps them stay engaged with what is possible rather than what is threatening." },
                { title: "Needs connection for security", body: "The 6w7 builds security through relationships more than through knowledge. They want to know that there are people they can count on — and they build those relationships actively, through genuine warmth and loyalty." },
                { title: "Risk of scattered anxiety", body: "The Seven wing can make the 6w7&apos;s anxiety more energetic and outward-facing — which is useful, but can also mean their worry spreads to more domains rather than being contained. The 6w7 may have more simultaneous concerns than the more focused 6w5." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">The 6w7 creates genuine community and loyalty networks that serve both their own security and the people around them. Their warmth is real, their commitment is real, and their forward-looking energy keeps them moving even under anxiety. They often become the person others count on most.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 6w7 can use the Seven wing&apos;s optimism and activity to avoid sitting with their anxiety directly. Using busyness, planning, and social engagement as escape from the underlying fear does not resolve it — it just keeps it moving. Growth involves being able to feel the anxiety without immediately acting to reduce it.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/6w5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">6w5 — The Defender</Link>
            </div>
          </section>
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your Enneagram type and wing</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment to find out where you actually land.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
