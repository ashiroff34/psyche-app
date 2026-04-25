import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 9;
const wingNum = 8;
const color = TYPE_COLORS[typeNum];
const wingColor = TYPE_COLORS[wingNum];

export const metadata: Metadata = {
  title: "Enneagram 9w8 — The Referee: Traits, Growth & Identity | Thyself",
  description:
    "A complete guide to the Enneagram 9w8 — 'The Referee.' How the Eight wing shapes the Peacemaker: more assertive, direct, and comfortable with power — without losing the Nine's essential desire for harmony and peace. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram 9w8 — The Referee",
    description:
      "The 9w8 combines the Nine's desire for inner and outer peace with the Eight's strength and directness. More grounded and comfortable with conflict than the 9w1, the Referee can hold their ground without losing their calm.",
    url: "https://thyself.app/enneagram/9w8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/9w8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 9w8 — The Referee: Traits, Growth & Identity",
  description:
    "How the Eight wing shapes Enneagram Type 9: more assertive, grounded, and comfortable with conflict, while still oriented toward peace and connection.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/9w8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/9w8" },
};

export default function Page9w8() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Wing Subtype</p>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: color }}>9</span>
              <span className="text-xl font-light opacity-60">w</span>
              <span className="rounded-2xl px-5 py-2 text-white font-bold text-2xl" style={{ backgroundColor: wingColor }}>8</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              The Referee
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              The 9w8 combines Type Nine&apos;s deep desire for peace and harmony with Type Eight&apos;s strength, directness, and comfort with power. The result is a Nine who can actually hold their ground — someone whose calm is backed by real force, not just accommodation.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* What the wing adds */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Eight Wing Adds</h2>
            <p className="leading-relaxed text-gray-700">
              The Eight wing gives the Nine access to something they often struggle to find: their own force. The 9w8 is not the typical doormat Nine who disappears into others&apos; agendas. They have a physical and psychological groundedness — a sense of taking up space — that is distinctly Eight. They can push back. They can say no. They can hold a position without immediately dissolving into the other person&apos;s perspective.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight wing also brings a comfort with the physical world that other Nine subtypes may lack. The 9w8 tends to be more embodied, more comfortable with directness and confrontation, and more willing to engage conflict when it genuinely matters to them. They do not go looking for fights — the Nine&apos;s peacefulness is primary — but they do not flee from them either. When pushed, the 9w8 can surprise people with how firm they become.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This wing also adds stubbornness. The 9w8 can be remarkably immovable once they have settled into a position. The Eight&apos;s resistance to being controlled combines with the Nine&apos;s inertia to create someone who simply refuses to be moved — not loudly, not dramatically, but completely.
            </p>
          </section>

          {/* Core traits */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Traits of the 9w8</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Grounded and physically present",
                  body: "The 9w8 tends to have a substantial physical presence — not necessarily in size, but in the quality of attention they bring to a room. They are not scattered or easily flustered. Their calm feels backed by something solid.",
                },
                {
                  title: "Comfortable with direct communication",
                  body: "Unlike the 9w1, who often communicates indirectly and avoids confrontation carefully, the 9w8 is more likely to say what they mean. They can be blunt without being unkind. The Eight wing gives them access to directness that feels natural rather than awkward.",
                },
                {
                  title: "Protective",
                  body: "The combination of the Nine&apos;s care for others and the Eight&apos;s protective instinct produces someone who is a genuine guardian of the people and values they love. They are not aggressive, but they are formidable when what they care about is threatened.",
                },
                {
                  title: "Stubborn under pressure",
                  body: "The 9w8 does not easily change their mind when pushed. The Nine&apos;s inertia and the Eight&apos;s resistance to being controlled create a formidable combination. They can look placid while being completely unmoved.",
                },
                {
                  title: "Can disconnect anger from awareness",
                  body: "Like all Nines, the 9w8 can have difficulty recognizing their own anger in real time. The Eight wing makes the anger more visible when it does surface — it can come out with Eight-level intensity after long suppression. Learning to notice and address anger earlier is one of the 9w8&apos;s core growth tasks.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Growth */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>Strength</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 9w8 is often an exceptionally effective mediator, leader, or anchor for a group — someone whose calm is genuine, whose strength is real, and who can hold space for conflict without being destabilized by it. They bring the Nine&apos;s gift for seeing all sides with enough Eight-force to actually navigate the terrain.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: wingColor }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: wingColor }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The 9w8&apos;s stubbornness can become intractability. When the Nine&apos;s inertia and the Eight&apos;s resistance combine under stress, the 9w8 can become immovable in ways that prevent necessary change. Their capacity to disconnect from their own anger means it can build silently and emerge as a sudden, Eight-style force that surprises even themselves.
                </p>
              </div>
            </div>
          </section>

          {/* How to identify */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How to Identify a 9w8</h2>
            <p className="leading-relaxed text-gray-700">
              The 9w8 is sometimes mistaken for an Eight, particularly when their stubborn or protective side is most visible. The distinction is in their fundamental orientation: the Eight is comfortable in conflict and seeks control; the 9w8 seeks peace and finds conflict genuinely draining. They use their Eight force selectively, in service of harmony and protection, not as a default mode of engaging the world.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              They are also sometimes mistaken for a relaxed, sturdy Seven. The key difference is the Nine&apos;s essential inwardness and the way they naturally slow their environment down rather than accelerating it. The 9w8 brings calm; the Seven brings energy.
            </p>
          </section>

          {/* Navigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/9w1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">9w1 — The Dreamer</Link>
              <Link href="/compatibility/enneagram-8/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 + Type 9 Compatibility</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Discover your Enneagram type and wing</h2>
            <p className="mb-6 text-base opacity-90">
              Wing subtypes are most meaningful when you know your core type with confidence. Take the free Thyself Enneagram Assessment to find out where you actually land.
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
