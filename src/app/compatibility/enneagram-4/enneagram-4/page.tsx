import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 4;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];

export const metadata: Metadata = {
  title: "Two Enneagram 4s in Relationship — The Depth Amplification | Thyself",
  description:
    "What happens when two Individualists pair up. Mutual depth and authenticity, the idealize-devalue cycle doubled, competitive suffering, and the work of holding ordinary reality together. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 4 + 4 Compatibility",
    description:
      "Two Individualists in relationship: extraordinary emotional depth on one side, the amplified idealize-devalue cycle and risk of mutual withdrawal on the other.",
    url: "https://thyself.app/compatibility/enneagram-4/enneagram-4",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-4/enneagram-4" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Two Enneagram 4s in Relationship — The Depth Amplification",
  description:
    "How two Type 4 Individualists relate: attraction, synergies, tensions, growth edges, and what this same-type pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-4/enneagram-4",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-4/enneagram-4" },
};

export default function Compatibility4and4Page() {
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
              Two Type 4s — The Depth Amplification
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two people who want extraordinary depth and have finally found someone capable of going there — and who must learn together that the ordinary is what holds the extraordinary in place.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Type 4 at a Glance</h2>
            <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: color }}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 4 — The Individualist</p>
              <p className="leading-relaxed text-gray-700 text-sm">
                Fours are driven by a deep longing to be fully known and to find their unique identity. They experience the world through a heightened emotional lens, perceiving meaning, beauty, and loss with unusual intensity. Their core fear is being ordinary or without significance. They tend toward melancholy, idealization, and a chronic sense that something essential is missing — that the real life, the real love, the real self is always somewhere other than here.
              </p>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Two Fours Attract</h2>
            <p className="leading-relaxed text-gray-700">
              When two Fours meet, the recognition is often electric. Here, finally, is someone who does not flinch from emotional intensity, who takes interior life seriously as a form of reality, who would rather feel something difficult than feel nothing. Most relationships ask the Four to dampen their depth, to be less dramatic, to not take everything so personally. With another Four, that pressure drops away entirely. They both inhabit the same emotional weather, and they both consider it the real weather.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a profound sense of aesthetic resonance. Two Fours often share a way of seeing — the same eye for what is beautiful or melancholy or significant, the same response to a particular kind of music or light or texture. The relationship can become a shared aesthetic project: a home, a way of living, a sensibility that both partners are co-authoring.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              And there is the experience of being seen as singular. Each Four longs to be recognized as truly different from everyone else, and another Four can offer that recognition with unusual sincerity. Each becomes the audience the other has been waiting for. The early stages of a 4+4 relationship can feel like the love story both partners have always believed they deserved.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Emotional depth",
                  body: "Both partners take emotion seriously as a primary form of knowing. Neither asks the other to simplify, to be less, to stop feeling so much. The relationship operates at a register of intensity that most other pairings cannot sustain.",
                },
                {
                  title: "Shared tolerance for intensity",
                  body: "Difficult feelings — grief, longing, despair, jealousy — do not frighten either partner. Both have spent their lives getting to know these states from the inside. They can hold each other through emotional weather that other types would flee from.",
                },
                {
                  title: "Authentic expression",
                  body: "Neither Four wants to perform happiness or pretend that things are simpler than they are. Both insist on being real, even when real is painful. The relationship runs on a shared commitment to the truth of what is actually being felt.",
                },
                {
                  title: "Aesthetic resonance",
                  body: "Two Fours often share a refined sensibility about beauty, art, music, language, and the texture of daily life. The shared aesthetic becomes a form of intimacy — making things together, curating a shared world, finding meaning in the same particular moments.",
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
              The 4+4 relationship&apos;s central risk is amplification: every quality that makes the type emotionally vivid is now doubled, with no one in the room operating from a different gear. The idealize-devalue cycle that one Four runs internally is now happening across two people in real time, and there is no neutral ground to fall back to.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Competitive suffering",
                  body: "Both partners have a subtle attachment to their own pain as a marker of depth. With another Four, this can turn into an unspoken contest about who feels more, who has suffered more authentically, whose interior life is more profound. Pain becomes a kind of currency, and neither wants to let the other have more of it.",
                },
                {
                  title: "The idealize-devalue cycle, doubled",
                  body: "Fours characteristically swing between idealizing the absent and devaluing the present. With another Four, both partners are doing this, often about each other. The relationship can oscillate between extraordinary highs (when each is being idealized) and brutal lows (when each is being devalued), with little stable middle ground.",
                },
                {
                  title: "No anchor to the ordinary",
                  body: "Neither partner is naturally oriented toward the practical, the routine, the quietly functional. The shared life can become all weather and no architecture — full of feeling but missing the structure that holds feeling in place. Bills go unpaid, plans go unmade, the daily texture of life gets neglected in favor of the dramatic interior.",
                },
                {
                  title: "Mutual withdrawal",
                  body: "Both Fours, when wounded, tend to withdraw — to retreat into a private interior of self-justification, longing, and felt abandonment. With another Four, both partners can withdraw simultaneously, and the relationship can lose contact with itself for long stretches, neither willing to be the first to come back.",
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
                  When two Fours commit to using their shared depth as a foundation rather than a vortex, this pairing becomes a place of unusual mutual recognition. The same emotional intelligence that fuels the drama can fuel a profound capacity to actually meet each other. Few partners can match a healthy Four&apos;s ability to genuinely see another person as singular and irreplaceable.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "#888" }}>Challenge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Both partners must develop the stability to hold ordinary reality together — the practical structures, the boring routines, the unglamorous consistency — rather than disappearing into mutual intensity. The growth ask is not less depth; it is depth grounded in something that does not move. Without that ground, two Fours can spiral together for years.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in Two Fours</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) shape how each Type 4 expresses in relationship. Same-type pairings amplify whatever variant each partner carries.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sp/4 + sp/4",
                  body: "Two self-preservation Fours (the &lsquo;tenacity&rsquo; countertype, the most stoic and least overtly melancholic variant) build a quietly enduring shared life around suffering-without-complaint. The risk is that neither partner names the pain they are carrying, and the relationship becomes two people privately enduring in parallel.",
                },
                {
                  label: "sx/4 + sx/4",
                  body: "Two sexual Fours (the &lsquo;competition&rsquo; subtype, the most intense and outwardly emotional variant) build the most volatile version of this pairing. Mutual idealization, dramatic ruptures, charged reconciliations — the relationship can be remarkable and exhausting. The risk is competitive suffering and a chronic instability that exhausts both partners.",
                },
                {
                  label: "so/4 + so/4",
                  body: "Two social Fours (the &lsquo;shame&rsquo; subtype, the most inwardly suffering and least defended variant) often build a relationship around shared experience of not-belonging. They become each other&apos;s sanctuary from a world that does not quite welcome them. The risk is mutual reinforcement of the outsider position rather than helping each other find belonging.",
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
                When both Fours are doing their inner work — when each has begun to develop equanimity alongside their depth, when both have committed to staying in contact with the ordinary — the 4+4 pairing becomes a place of remarkable mutual recognition. Both have learned that being known does not require being in pain, that love is not measured by intensity, that the present partner is enough. The same emotional intelligence that once fueled the drama now fuels a capacity for genuine, sustained intimacy.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, two Fours build a life of unusual aesthetic and emotional richness — full of meaning, beauty, and the kind of recognition that both have spent their lives waiting for. The relationship becomes the place where both finally discover that the ordinary, shared with the right person, is the extraordinary they were looking for all along.
              </p>
            </div>
          </section>

          {/* Practical growth tips */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for Two Fours</h2>
            <ul className="space-y-4">
              {[
                "Build practical structures that hold the relationship in place — shared rituals, regular practical conversations, division of household labor — even when neither of you finds these interesting. The structure is what makes the depth sustainable.",
                "Notice when you are devaluing the present partner because you are idealizing an absent alternative — a former lover, a future possibility, a more interesting life. Name it. The other Four does it too.",
                "Refuse the competition over who feels more or who has suffered more authentically. There is no winning. Practice celebrating each other&apos;s ordinary moments alongside the intense ones.",
                "When both of you have withdrawn, agree in advance that the first one to come back is doing the work of the relationship rather than losing a contest. Reward the return.",
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Type 4</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/type-4/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 in Relationships</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-1/enneagram-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 4</Link>
              <Link href="/compatibility/enneagram-2/enneagram-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 4</Link>
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 5</Link>
              <Link href="/compatibility/enneagram-4/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 9</Link>
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
