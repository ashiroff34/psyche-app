import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 7;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 7 Compatibility — The Achiever & The Enthusiast | Thyself",
  description: "Explore the Enneagram Type 3 and Type 7 compatibility. Both are energetic, optimistic, and forward-facing — the Three through achievement, the Seven through experience. Full analysis of their high-velocity pairing, the depth and authenticity risk, and how both grow.",
  openGraph: {
    title: "Enneagram 3 and 7 Compatibility — The Achiever & The Enthusiast",
    description: "Type 3 chases success; Type 7 chases joy. Both optimistic and forward-moving — explore their energetic pairing and where achievement meets possibility.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 7 Compatibility — The Achiever & The Enthusiast",
  description: "A full analysis of the Enneagram Type 3 and Type 7 relationship: shared optimism and forward momentum, the depth and authenticity risk, commitment and freedom, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-7" },
};

export default function Enneagram3and7Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>3</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 3 &amp; Type 7</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types are forward-facing, optimistic, and high-energy. The Three moves toward success; the Seven moves toward joy. Both avoid dwelling, catastrophizing, or sitting with failure. Together they create a genuinely exciting, fast-moving, socially alive pairing. The shadow question: two people who both avoid depth and difficulty — who helps them grow toward what they resist?</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 3</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Threes pursue excellence, success, and admiration. They are adaptive, energetic, and gifted at knowing what a situation demands and delivering it impressively. Their shadow: they avoid failure and authentic self-disclosure, keeping the relationship in the register of what is working rather than what is real.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 7</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sevens pursue joy, freedom, and possibility. They are enthusiastic, creative, and gifted at generating excitement and keeping life stimulating. Their shadow: they avoid limitation, pain, and depth — keeping life moving fast enough that what is heavy never quite lands.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types are magnetic, fun, and socially skilled — and they recognize that quality in each other immediately. The Three is drawn to the Seven&rsquo;s infectious joy, breadth of interest, and the way life with a Seven feels full and stimulating. The Seven doesn&rsquo;t slow down to worry; the Seven doesn&rsquo;t dwell; the Seven makes things feel possible rather than heavy. The Three finds this energizing.</p>
            <p className="leading-relaxed text-gray-700">The Seven is drawn to the Three&rsquo;s drive, capability, and the sense that things will actually get done. The Seven has ideas; the Three converts ideas into results. The Seven&rsquo;s enthusiasm is amplified by the Three&rsquo;s capacity to make things real. Both types are also positive-facing and forward-moving — neither type needs to convince the other that things can work out. This creates an early, almost frictionless connection.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Optimism and Energy", body: "Both types bring an optimistic, forward-moving energy to the relationship. Neither is prone to catastrophizing, dwelling, or dragging the relational atmosphere down. Together they create a genuine sense of momentum and possibility — life with the 3+7 pairing is consistently stimulating, often exciting, and rarely heavy." },
                { title: "Social Vitality", body: "Both types are socially skilled and genuinely enjoyable to be around. The Three impresses and delivers; the Seven delights and inspires. Together they are a naturally compelling couple in social contexts — people are drawn to them, energized by their combination, and remember being around them. This social effectiveness is genuine rather than performed." },
                { title: "Seven Brings Joy; Three Brings Results", body: "The Seven&rsquo;s enthusiasm generates ideas, experiences, and the energy for new initiatives. The Three&rsquo;s effectiveness converts enthusiasm into actual results. Together they accomplish more than either alone — the Seven keeps the vision alive and exciting; the Three makes it real. This complementary capability creates a genuinely productive partnership." },
                { title: "Mutual Independence", body: "Both types are self-sufficient and comfortable with each other&rsquo;s independence. Neither needs constant emotional maintenance or explicit relational investment. The Three&rsquo;s professional focus and the Seven&rsquo;s adventure-seeking are both understood by the other as natural and legitimate rather than threatening. This creates a relationship with less possessiveness and more freedom than either type often finds." },
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
                { title: "Neither Slows Down", body: "Both types avoid depth and difficulty by staying in motion — the Three through achievement, the Seven through stimulation. Together they can maintain a very fast relational pace that is genuinely exciting but never quite pauses long enough for genuine intimacy to form. The relationship is full of shared experiences and accomplishments; the relationship is thin on genuine self-disclosure and emotional depth." },
                { title: "Commitment and Freedom", body: "The Three orients toward committed, goal-directed partnership. The Seven resists anything that forecloses options. Over time the Three may feel the Seven isn&rsquo;t fully committed to the relationship as a project they are building together. The Seven may feel the Three&rsquo;s achievement orientation is pulling toward a seriousness that limits the lightness and freedom they need." },
                { title: "Authenticity and Performance", body: "The Three performs competence; the Seven performs possibility. Together they risk a relationship that is extremely compelling from the outside and relatively shallow on the inside — two skilled performers who have never quite gotten behind each other&rsquo;s presentations. Neither type naturally invites authentic self-disclosure; both avoid showing what isn&rsquo;t working." },
                { title: "Depth Avoidance", body: "When difficulty arises — in the relationship, in their lives, in their respective inner worlds — both types reach for what they do best to avoid sitting with it. The Three fixes, achieves, moves on; the Seven reframes, plans something exciting, moves on. Together they can navigate around a significant issue for years without ever addressing it directly." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 3 grows by</p>
                <ul className="space-y-3">
                  {["Sharing what is failing and uncertain rather than only what is succeeding — the Seven&rsquo;s enthusiasm for possibilities can help the Three sit with what isn&rsquo;t working", "Receiving the Seven&rsquo;s freedom-seeking as a feature of who they are rather than a threat to the partnership the Three is building", "Slowing down enough to genuinely enjoy what has been built rather than moving immediately to the next goal", "Asking the Seven directly what they need from the relationship — the Seven&rsquo;s needs are real even if they don&rsquo;t demand them"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 7 grows by</p>
                <ul className="space-y-3">
                  {["Staying with the Three when things aren&rsquo;t working — the Three needs a witness to difficulty, not a reframe of it", "Practicing commitment as a form of freedom rather than a limitation on it — the Three needs to feel chosen over novelty", "Acknowledging the Three&rsquo;s achievements explicitly rather than flowing through them on the way to the next thing", "Sitting with what is heavy in the relationship rather than redirecting toward something more stimulating — depth is not the enemy of joy"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 3 and SP 7 are both relatively private and practical. This is a functional, independent pairing — both manage their own domains, both are self-sufficient. The risk: neither invests heavily in explicit relational connection, and the relationship can become two parallel productive lives with limited genuine intersection." },
                { label: "Social", body: "Social 3 and social 7 are both community-focused — the Three through leadership and influence, the Seven through vision and inspiration. Together they are a naturally compelling public pair — the Three delivers results; the Seven generates excitement. The risk: the social investment crowds out the private intimacy both types need but neither naturally seeks." },
                { label: "Sexual / One-to-One", body: "SX 3 brings passionate focus on the beloved as singular; SX 7 brings intense enthusiasm and appetite for peak experience. This is the most magnetically charged version — and the most potentially unstable. The SX 3&rsquo;s need for singular significance meets the SX 7&rsquo;s perpetual orientation toward the next peak. At their best: genuine excitement and depth. At their worst: the Three&rsquo;s need for commitment and the Seven&rsquo;s appetite for freedom create a sustained collision." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 3+7 pairing becomes genuinely alive and genuinely real — not just impressive from the outside but actually connected inside. The Three has found in the Seven&rsquo;s joy a reminder that life is worth enjoying, not just achieving — and has learned to share what is hard rather than only showing what works. The Seven has found in the Three&rsquo;s commitment a demonstration that choosing to stay is its own form of freedom — and has learned to be present with what is heavy rather than redirecting toward the next experience. Together they build a life that is both genuinely joyful and genuinely grounded. The energy is real. The connection is real. Both.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Build a regular &ldquo;what&rsquo;s actually going on&rdquo; check-in", body: "Once a week, create a context for genuine self-disclosure — not updates, not plans, but what is actually happening internally. Both types will avoid this without structure. Build the structure. Ask: &ldquo;What&rsquo;s hard right now that we haven&rsquo;t talked about?&rdquo; This is the practice that prevents the depth-avoidance loop from taking over." },
                { num: "02", title: "Seven: stay with the Three&rsquo;s setback", body: "When the Three encounters a failure or obstacle, resist the impulse to reframe it positively or plan around it. Stay with them: &ldquo;That sounds genuinely hard. Tell me more.&rdquo; The Three doesn&rsquo;t need a solution — they need a witness. Your staying is more valuable than your planning." },
                { num: "03", title: "Three: appreciate the Seven&rsquo;s freedom", body: "The Seven&rsquo;s independence and orientation toward possibility is not a threat to the partnership — it is a feature of who they are. Practice genuinely appreciating the Seven&rsquo;s enthusiasm for the next thing rather than reading it as commitment-evasion. A Seven who is free to be themselves is more committed, not less." },
                { num: "04", title: "Celebrate what you&rsquo;ve built together", body: "Both types move forward so readily that they rarely pause to acknowledge what they have actually created together. Build a ritual of looking back — an annual reflection on what you have made, sustained, and become as a pair. This is the acknowledgment both types need and neither naturally provides." },
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
              {[{ label: "Type 3 — The Achiever", href: "/enneagram/type-3" }, { label: "Type 7 — The Enthusiast", href: "/enneagram/type-7" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "2 + 7", href: "/compatibility/enneagram-2/enneagram-7" }, { label: "7 + 9", href: "/compatibility/enneagram-7/enneagram-9" }, { label: "3 + 4", href: "/compatibility/enneagram-3/enneagram-4" }].map((link) => (
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
