import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 7;
const wingNum = 6;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 7w6 — The Entertainer: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 7w6 — 'The Entertainer.' How the Six wing shapes the Enthusiast: warmer, more loyal, and more relationally oriented — enthusiasm in service of connection and shared experience. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 7w6 — The Entertainer",
    description:
      "The 7w6 combines the Seven's enthusiasm and appetite for experience with the Six's warmth and relational loyalty. More people-focused and grounded than the 7w8, the Entertainer wants everyone along for the adventure.",
    url: "https://thyself.app/enneagram/7w6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/7w6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 7w6 — The Entertainer: Traits, Growth & Identity",
  description: "How the Six wing shapes Enneagram Type 7: warmer, more loyal, and more relationally oriented in their enthusiasm.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/7w6",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/7w6" },
};

export default function Page7w6() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>7</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>6</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Entertainer</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 7w6 brings the Seven&apos;s enthusiasm and appetite for experience into the relational world with the Six&apos;s loyalty and warmth. More people-oriented and grounded than the 7w8, the Entertainer wants everyone to be part of the adventure — and they genuinely care that the people in their life are okay.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Six Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Six wing gives the Seven&apos;s enthusiasm a relational and collaborative quality. The 7w6 is not just enjoying life for themselves — they want others along. They are natural social architects who create gatherings, build communities, and ensure that everyone around them is having a good time. The enthusiasm is real, and so is the genuine care for the people sharing the experience.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Six wing also introduces a degree of loyalty that the pure Seven sometimes lacks. The 7w6 does not just move from person to person in their social world — they build genuine relationships and return to them. They remember people, they follow up, they show up. The Six&apos;s commitment grounds the Seven&apos;s tendency to move on when things get complicated.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Six wing can also introduce anxiety into the Seven&apos;s normally forward-facing orientation. The 7w6 is more aware of what could go wrong than the 7w8 — they carry more background worry, and their enthusiasm can sometimes mask an undercurrent of concern that they are working hard not to feel. When the Six wing&apos;s anxiety surfaces, it can seem at odds with the Seven&apos;s bright presentation.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 7w6</h2>
            <div className="space-y-4">
              {[
                { title: "People-oriented and inclusive", body: "The 7w6 genuinely wants everyone involved. They are natural hosts and organizers — the person who makes sure everyone has been introduced, everyone has a drink, everyone feels welcome. Their enthusiasm is fundamentally social." },
                { title: "Warm and genuinely caring", body: "The Six wing gives the 7w6 more warmth and genuine relational depth than the 7w8 typically has. They remember what matters to people, check in on friends, and feel real concern for the people in their circle." },
                { title: "Loyal and relationship-building", body: "The 7w6 builds more durable relationships than the pure Seven tends to. The Six wing&apos;s investment in trust and commitment grounds the Seven&apos;s natural wandering and prevents the total freedom-seeking that can leave relationships behind." },
                { title: "Underlying anxiety", body: "The Six wing brings a background current of worry that the 7w6 often manages by staying in motion and staying connected. When the anxiety breaks through — when things slow down, when relationships feel uncertain, when the future feels less than bright — the 7w6 can be more distressed than their outward presentation suggests." },
                { title: "Self-deprecating humor", body: "The 7w6 often has a particularly accessible, self-aware humor that includes themselves as the target. The Six wing&apos;s self-doubt combines with the Seven&apos;s playfulness to produce someone who is funny about their own flaws in a way that draws people in." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 7w6 creates community with genuine warmth and inclusive energy. Their combination of Seven&apos;s enthusiasm and Six&apos;s loyalty means they build things that last — relationships, groups, cultures — not just fun moments that evaporate. They are often the social heart of the communities they inhabit.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 7w6 can use social activity as an escape from the anxiety the Six wing generates. The busier and more connected they are, the harder it is to feel the underlying worry. Growth involves being able to be still — alone, with the anxiety present — without needing to immediately fill the space with activity or connection.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/7w8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">7w8 — The Realist</Link>
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
