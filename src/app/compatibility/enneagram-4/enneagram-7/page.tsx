import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 4;
const typeB = 7;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 4 and 7 Compatibility — The Individualist & The Enthusiast | Thyself",
  description: "Explore the Enneagram Type 4 and Type 7 compatibility. The Individualist craves depth and meaning; the Enthusiast craves joy and possibility. A classic melancholy-meets-joy pairing — full analysis of their magnetic pull, the depth vs. breadth tension, and how both grow.",
  openGraph: {
    title: "Enneagram 4 and 7 Compatibility — The Individualist & The Enthusiast",
    description: "Type 4 mines pain for meaning; Type 7 escapes pain through possibility. Opposites in orientation — explore their magnetic creative pairing and where longing meets joy.",
    url: "https://thyself.app/compatibility/enneagram-4/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-4/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4 and 7 Compatibility — The Individualist & The Enthusiast",
  description: "A full analysis of the Enneagram Type 4 and Type 7 relationship: the melancholy-joy polarity, depth vs. breadth, what draws them together, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-4/enneagram-7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-4/enneagram-7" },
};

export default function Enneagram4and7Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>4</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 4 &amp; Type 7</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">One of the Enneagram&rsquo;s most magnetically opposite pairings. The Four mines emotion for depth and meaning; the Seven escapes emotion through possibility and joy. Each has something the other privately yearns for — and each represents, in pure form, what the other most resists. The initial attraction is often intense. The sustained challenge is just as real.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 4</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Fours live in the interior world — in longing, in meaning, in a felt sense of what is missing and what is intensely present. They are creative, emotionally deep, and hunger for a love that is chosen and particular. Their shadow: they can become attached to their own suffering as proof of depth and authenticity.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 7</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sevens live in the exterior world — in possibility, in adventure, in the next experience that will be even better. They are creative, enthusiastic, and gifted at finding joy everywhere. Their shadow: they avoid depth and limitation as threats, keeping the full emotional register of life at a stimulating surface.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Four is drawn to the Seven&rsquo;s joy, aliveness, and apparent ease with the world. The Seven moves through life with a lightness the Four finds beautiful — and secretly longs for. The Seven doesn&rsquo;t seem haunted; the Seven doesn&rsquo;t dwell; the Seven finds delight rather than longing. For the Four, who knows the richness of the interior world but not always its lightness, the Seven is illuminating.</p>
            <p className="leading-relaxed text-gray-700">The Seven is drawn to the Four&rsquo;s depth, authenticity, and emotional richness. The Seven, whose life is full of experiences but sometimes thin on meaning, senses in the Four an access to genuine interiority that their own style doesn&rsquo;t easily produce. The Four is interesting — not just entertaining. Both types are often creative and aesthetically alive, and this shared creative sensibility creates an early, charged connection that feels genuinely rare.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Creative Power", body: "Both types are among the Enneagram&rsquo;s most creative. The Four brings depth, emotional authenticity, and the capacity to give form to what is felt. The Seven brings range, improvisation, and the capacity to connect across domains. Together they can produce creative work that is both emotionally resonant and genuinely original — the Four provides the depth; the Seven provides the range." },
                { title: "Seven Lifts the Four", body: "The Four&rsquo;s relationship to their own emotional world can become self-enclosed — longing becomes the primary orientation, and joy feels earned only through depth. The Seven&rsquo;s effortless access to delight and possibility models something genuinely useful for the Four: that joy doesn&rsquo;t require earning. The Seven&rsquo;s lightness can lift the Four without dismissing what the Four most values." },
                { title: "Four Grounds the Seven", body: "The Seven&rsquo;s life at high stimulation can lack the interiority that makes experience meaningful. The Four&rsquo;s invitation into depth — into what something actually means, into what is genuinely felt — grounds the Seven in a way that enriches rather than limits. The Four helps the Seven stay long enough to find out what was actually there." },
                { title: "Aesthetic Resonance", body: "Both types tend to be strongly aesthetic and drawn to creative expression. They share a sense that beauty matters and that experience has a quality that is worth attending to. This creates genuine companionship in aesthetic domains — art, music, literature, film — and a shared language that neither always finds with other types." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Depth vs. Breadth", body: "The Four wants to go deep — to stay with what is felt, to explore the full emotional texture of an experience or a conversation. The Seven wants to go wide — to the next experience, the next idea, the next adventure. The Four may feel the Seven is always on the way somewhere else. The Seven may feel the Four keeps pulling back toward intensity when the world is so full of possibility." },
                { title: "Pain as Meaning vs. Pain as Problem", body: "For the Four, emotional pain is not simply to be escaped — it is lived, explored, and often experienced as evidence of depth and authenticity. For the Seven, pain is a problem to be solved and moved past as quickly as possible. When the Four moves into a period of sadness or longing, the Seven&rsquo;s instinct is to fix, reframe, or redirect. The Four experiences this as abandonment of what is real." },
                { title: "Commitment and Freedom", body: "The Four orients toward a singular, chosen, deepening bond. The Seven resists any constraint on freedom — including the expectations of a committed relationship. The Four may feel the Seven is never fully in; the Seven may feel the Four is pulling toward a depth of obligation that forecloses options. Over time this gap between what the Four needs and what the Seven naturally provides becomes the pairing&rsquo;s central challenge." },
                { title: "Being Seen vs. Being Stimulated", body: "The Four&rsquo;s deepest need is to be truly seen — to have their particularity recognized and valued. The Seven is genuinely interested but keeps moving; their attention is wide rather than sustained. The Four may feel the Seven&rsquo;s enthusiasm is real but not deep — that the Seven lights up for everything and therefore the Four isn&rsquo;t really special. The Seven, genuinely confused, doesn&rsquo;t understand why enthusiasm isn&rsquo;t enough." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-red-100 bg-red-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 4 grows by</p>
                <ul className="space-y-3">
                  {["Releasing the equation of depth with suffering — joy is not shallowness; the Seven&rsquo;s lightness is genuine, not avoidant", "Receiving the Seven&rsquo;s enthusiasm as real appreciation rather than generalizing it into &ldquo;you like everything, so it doesn&rsquo;t mean anything&rdquo;", "Trusting that the Seven&rsquo;s return — choosing to come back — is the form of commitment the Seven can actually give", "Letting the Seven&rsquo;s aliveness expand the Four&rsquo;s world rather than measuring it against the Four&rsquo;s interior standard"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 7 grows by</p>
                <ul className="space-y-3">
                  {["Staying with the Four&rsquo;s emotional depth without immediately reframing, fixing, or redirecting — presence in darkness is a form of love", "Practicing sustained, particular attention — not enthusiasm for everything, but lingering attention for this person in this moment", "Resisting the impulse to escape the relationship&rsquo;s weight into new experiences; the Four needs to feel chosen over novelty", "Letting the Four&rsquo;s interiority deepen the Seven&rsquo;s experience rather than experiencing it as a limitation on freedom"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 4 and SP 7 are both concerned with personal well-being but in very different registers — the Four through emotional sustenance and meaning, the Seven through sensory pleasure and comfort. They can build a life with both depth and pleasure if they negotiate whose register leads when. The SP versions are the least dramatically charged; the dynamic is livable with less volatility." },
                { label: "Social", body: "Social 4 and social 7 are both community-oriented — the Four through art, culture, and unique contribution; the Seven through vision, energy, and inspiring groups. This is a natural creative power pairing for building something cultural or social. They energize different aspects of a community and can be genuinely complementary in shared projects." },
                { label: "Sexual / One-to-One", body: "SX 4 brings passionate, idealizing focus to the beloved; SX 7 brings intense fascination and appetite. This is the most magnetically charged version — and the most volatile. The SX 4&rsquo;s need to be the singular object of depth meets the SX 7&rsquo;s appetite for peak experience and novelty. At their best, this combination produces something genuinely extraordinary. At their worst, the Four&rsquo;s idealization collapses into abandonment fury when the Seven inevitably seeks the next peak." },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">{card.label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <p className="leading-relaxed text-gray-700">When both are growing, the 4+7 pairing becomes one of the Enneagram&rsquo;s most creatively alive and emotionally rich combinations. The Four has learned to let the Seven&rsquo;s joy in — not as a threat to depth but as its complement. The Seven has learned to stay — to sit with what is heavy, to attend to what is particular, to choose this person over the horizon. The Four is less melancholy; the Seven is more present. Together they build a life that has both depth and delight, both meaning and joy. Neither quality cancels the other. Both are richer for the presence of what the other brought.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Seven: stay in the hard conversation", body: "When the Four moves into emotional depth or sadness, resist the impulse to reframe or redirect. Practice staying: &ldquo;I&rsquo;m here. Tell me more.&rdquo; The Four doesn&rsquo;t need the problem solved — they need to feel that you can handle what is real. Your willingness to stay in discomfort is the most powerful thing you can offer." },
                { num: "02", title: "Four: let the Seven bring you joy without analyzing it", body: "When the Seven is enthusiastic, delighted, or planning something exciting, practice joining rather than measuring. Notice when you&rsquo;re calculating whether their enthusiasm is deep enough to be real. The Seven&rsquo;s joy is genuine — it just moves fast. You can receive it without requiring it to slow down." },
                { num: "03", title: "Build a creative practice together", body: "Both types are at their best when creating something. Find a shared creative project — a playlist, a trip planned with genuine aesthetic attention, a creative collaboration. This is the natural meeting ground: the Four provides the depth and emotional truth; the Seven provides the range and the energy. Together the output is better than either alone." },
                { num: "04", title: "Name the orientation difference, not the person", body: "When the tension between depth and breadth surfaces, frame it as a difference in orientation rather than a failing: &ldquo;I go deep; you go wide — let&rsquo;s figure out how to do both.&rdquo; This removes blame and makes the pattern something to navigate together rather than a verdict about who is broken." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 rounded-2xl border border-gray-100 p-6">
                  <span className="shrink-0 text-2xl font-bold text-gray-200">{item.num}</span>
                  <div><h3 className="mb-1 font-bold text-gray-900">{item.title}</h3><p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: item.body }} /></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore These Types</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "Type 4 — The Individualist", href: "/enneagram/type-4" }, { label: "Type 7 — The Enthusiast", href: "/enneagram/type-7" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Understand your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment. 15 minutes, no email required. Grounded in Ichazo and Naranjo&rsquo;s original framework.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color: colorA }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
