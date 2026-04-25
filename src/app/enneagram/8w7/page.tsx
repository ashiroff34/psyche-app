import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 8;
const wingNum = 7;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 8w7 — The Maverick: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 8w7 — 'The Maverick.' How the Seven wing shapes the Challenger: more expansive, visionary, and energetically outward — power in service of adventure and possibility. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 8w7 — The Maverick",
    description:
      "The 8w7 combines the Eight's strength and directness with the Seven's enthusiasm and expansive vision. More outgoing, adventurous, and visionary than the 8w9 — the Maverick wants impact at scale.",
    url: "https://thyself.app/enneagram/8w7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/8w7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 8w7 — The Maverick: Traits, Growth & Identity",
  description: "How the Seven wing shapes Enneagram Type 8: more expansive, visionary, and energetically outward in their drive for impact and autonomy.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/8w7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/8w7" },
};

export default function Page8w7() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>8</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Maverick</h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 8w7 brings the Eight&apos;s force and directness outward with the Seven&apos;s vision, enthusiasm, and appetite for experience. More expansive and socially engaging than the 8w9, the Maverick wants to make a large impact — and they have the energy and boldness to do it.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Seven Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">The Seven wing gives the Eight&apos;s power an expansive, outward-facing quality. Where the 8w9 may be more contained, steady, and focused on their domain, the 8w7 is oriented toward the horizon — new opportunities, new challenges, new frontiers. They are energized by possibility and bored by limitation. The Eight&apos;s force is deployed in service of an ever-expanding vision.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Seven wing also introduces genuine enthusiasm and sociability. The 8w7 tends to be more outwardly engaging and interpersonally warm than the 8w9. They enjoy people, enjoy competition, enjoy the energy of a crowd or a team. Their social presence is large and often charismatic — combining the Eight&apos;s authority and the Seven&apos;s infectious enthusiasm into something that draws people in.</p>
            <p className="mt-4 leading-relaxed text-gray-700">The Seven wing also makes the 8w7 quicker, more adaptable, and more comfortable with rapid change than the 8w9. They do not need stability — they thrive in motion. This gives them enormous effectiveness in fast-moving environments and a tendency toward restlessness in more static ones.</p>
          </section>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 8w7</h2>
            <div className="space-y:4">
              {[
                { title: "Visionary and expansive", body: "The 8w7 thinks big and moves toward big things. The Seven wing gives the Eight&apos;s power a directional quality — toward what is possible, not just what is controlled. They are natural entrepreneurs, leaders, and builders of things at scale." },
                { title: "Energetically outward", body: "The 8w7 is one of the most externally engaged subtypes on the Enneagram. They put a lot of energy into the world — in conversation, in projects, in relationships. They are not comfortable with inaction." },
                { title: "Charismatic and direct", body: "The combination of Eight&apos;s authority and Seven&apos;s enthusiasm produces genuine charisma. The 8w7 commands attention without necessarily seeking it — they simply have a presence that is hard to ignore." },
                { title: "Impatient with constraints", body: "The 8w7 resists being limited more intensely than any other Eight subtype. Both the Eight&apos;s refusal to be controlled and the Seven&apos;s need for freedom combine into someone who finds most constraints genuinely intolerable." },
                { title: "Risk of excess", body: "The 8w7 can pursue experience and impact with an intensity that becomes destabilizing — taking on too much, moving too fast, burning out allies and resources in service of a vision that is always expanding before the current project is complete." },
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
                <p className="text-sm leading-relaxed text-gray-700">The 8w7 is one of the most energetically powerful and impactful subtypes on the Enneagram. They build things — organizations, movements, companies, communities — with a combination of force, vision, and personal charisma that few can match. At their best, they are genuinely transformative.</p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">The 8w7&apos;s combination of the Eight&apos;s avoidance of vulnerability and the Seven&apos;s avoidance of pain produces someone who can be exceptionally difficult to slow down long enough to genuinely feel. Their energy and momentum serve as an escape from the inner work that would make them more whole. Growth involves stopping — sitting with what is, rather than always moving toward what could be.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/8w9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8w9 — The Bear</Link>
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
