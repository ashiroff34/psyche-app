import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 4;
const typeB = 5;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 4 and 5 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 4 and 5 relationship. How the Individualist and the Investigator attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 4 and 5 Compatibility",
    description:
      "Two withdrawn, depth-seeking types who understand each other's need for meaning — and who must navigate the gap between emotional expressiveness and intellectual reserve.",
    url: "https://thyself.app/compatibility/enneagram-4/enneagram-5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-4/enneagram-5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4 and 5 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 4 and Type 5 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-4/enneagram-5",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-4/enneagram-5" },
};

export default function Compatibility4and5Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16 text-white" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: colorA }}>
                <p className="text-3xl font-bold">{typeA}</p>
                <p className="text-sm opacity-90">{nameA}</p>
              </div>
              <span className="text-3xl font-light opacity-60">+</span>
              <div className="rounded-2xl px-5 py-3 text-white text-center" style={{ backgroundColor: colorB }}>
                <p className="text-3xl font-bold">{typeB}</p>
                <p className="text-sm opacity-90">{nameB}</p>
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
              Type 4 and Type 5
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the Enneagram&apos;s most inward-facing types: one who seeks the feeling of depth, one who seeks its understanding. When they find each other, the recognition is immediate — and the work is profound.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 4 — The Individualist</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Fours are driven by a deep longing to be fully known and to find their unique identity. They experience the world through a heightened emotional lens, perceiving meaning, beauty, and loss with unusual intensity. Their core fear is being ordinary or without significance. They seek authentic connection — relationships that honor their complexity rather than demanding they simplify it.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 5 — The Investigator</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Fives are driven by the need to understand and to preserve their inner resources from depletion. They observe the world carefully, building comprehensive internal models of how things work before engaging. Their core fear is being overwhelmed or incompetent. They seek partners who respect their need for space and do not demand more presence than they can sustainably give.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 4–5 pairing rests on a foundation of mutual recognition: both types feel fundamentally different from the ordinary social world, and in each other they find someone who does not require them to perform normalcy. The Four is drawn to the Five&apos;s depth of knowledge and quiet intensity — here is someone who has thought about things that actually matter, who will not be bored or disturbed by complexity. The Five is drawn to the Four&apos;s authenticity and emotional richness — here is someone who lives in the interesting interior terrain that the Five observes from a safe distance.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Both types tend to feel misunderstood by the mainstream. The Four feels their emotional depth is too much; the Five feels their need for solitude and intellectual focus is antisocial. When they meet, the pressure to be simpler drops away. They can share a silence that feels full rather than empty. They can pursue a topic to its real depth without the other growing restless. They can honor each other&apos;s need to retreat without interpreting it as abandonment.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a complementary quality in what each brings. The Four brings feeling-tone to the Five&apos;s intellectual world: they name the emotional undercurrent of things, give aesthetic shape to what the Five might describe abstractly. The Five brings conceptual framework to the Four&apos;s emotional world: they provide the structure and understanding that help the Four&apos;s experience become something more than overwhelming sensation. Together, they can produce thinking-and-feeling work of unusual power.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared respect for depth",
                  body: "Neither type is interested in surface conversation. Both read widely, think carefully, and want to understand the real structure of things. Their conversations tend to go somewhere — following a thread until it reaches an actual insight rather than stopping at the socially acceptable depth.",
                },
                {
                  title: "Mutual need for solitude",
                  body: "Both require significant time alone to recharge. This is a rare gift in a relationship: the ability to disappear without the other taking it personally. The Four and Five can create a shared life that respects both partners' genuine need for interior space.",
                },
                {
                  title: "Authenticity over performance",
                  body: "Neither type has much interest in social performance for its own sake. They share a preference for genuine exchange over impressive display, which makes their connection feel unusually real and low-stakes relative to their other relationships.",
                },
                {
                  title: "Creative and intellectual companionship",
                  body: "This pairing often produces remarkable creative work — in shared projects, in the intellectual life of the relationship itself, or in the mutual influence each has on the other's thinking and making. Art, writing, music, research: the 4–5 pairing tends toward the made object as a form of love.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color: colorA }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core tensions */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The 4–5 relationship&apos;s central challenge lives in the gap between the Four&apos;s need to be emotionally met and the Five&apos;s withdrawal from emotional intensity. This is not a small gap — it is the fundamental difference between a type oriented toward feeling and a type oriented toward understanding.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Emotional expression vs. emotional compartmentalization",
                  body: "Fours experience emotion as something that needs to be shared and witnessed — kept inside, it becomes unbearable. Fives experience strong emotion as something that needs to be processed privately — expressed immediately, it becomes overwhelming. This means the moment the Four most needs connection is often the moment the Five most needs space. The Four may interpret Five's retreat as rejection; the Five may interpret Four's intensity as an invasion.",
                },
                {
                  title: "Wanting to be seen vs. wanting to observe",
                  body: "The Four's core longing is to be fully known. The Five's characteristic mode is to know without being known. These are not merely different preferences — they are oriented in opposite directions. The Four reaches toward the Five; the Five tends to step back and observe. This asymmetry can create a chronic sense in the Four that the Five is withholding, and a chronic sense in the Five that the Four is demanding.",
                },
                {
                  title: "Romanticism vs. realism",
                  body: "Fours often idealize: relationships, people, and especially the imagined future of what the relationship could be. Fives tend toward accuracy and realistic assessment. The Four may experience the Five's realism as a deflation of something beautiful; the Five may experience the Four's romanticism as a departure from what is actually true.",
                },
                {
                  title: "Merging vs. compartmentalization",
                  body: "In love, Fours tend to want some degree of merging — a sense that the other person is genuinely present and woven into their emotional world. Fives are famously compartmentalizing: they tend to keep different areas of life separate, including their intimate relationship. The Five who loves you may not introduce you to their intellectual life, their friends, or their creative work — not because they don&apos;t love you, but because that is how they manage their inner resources.",
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
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorA }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Four</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Four&apos;s growth in this relationship involves learning to read the Five&apos;s love language, which is rarely emotional expressiveness. When a Five chooses to be with you — when they carve out space for you in their carefully protected inner world, when they share their knowledge and thinking with you — that is love. It may not feel like the emotionally saturated connection the Four most longs for, but it is genuine and often quite deep. The work for the Four is to tolerate the quieter register of the Five&apos;s affection without interpreting it as absence, and to develop some capacity to process feeling internally rather than always requiring another person to witness it.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Five</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Five&apos;s growth involves learning that emotional expression, while uncomfortable, is not dangerous — and that the Four&apos;s emotional world is an invitation to real contact, not a demand for performance. The Five who can occasionally step out from behind their observational stance and let themselves be moved, who can say &ldquo;I feel this&rdquo; rather than only &ldquo;I think this,&rdquo; gives the Four something irreplaceable. The work for the Five is also to practice sharing their inner life more actively — not just responding to the Four&apos;s questions but occasionally offering something unprompted. The Four needs to feel sought, not merely accommodated.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 4–5 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship. Naranjo identified specific variants that create distinct relationship dynamics.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/4 + sx/5",
                  body: "This is the most intensely bonded version of this pairing. The sexual-instinct Four brings idealization and deep one-on-one focus; the sexual-instinct Five — the most emotionally available of the Three Five subtypes — can actually meet the Four in a charged, intellectually and emotionally intimate space. This combination can produce extraordinary creative partnership but also the most volatility, as the sx/4's longing for merger meets even the sx/5's limits.",
                },
                {
                  label: "sp/4 + sp/5",
                  body: "Both self-preservation subtypes, these two can create a remarkably comfortable and self-sufficient &lsquo;fortress of two&rsquo; — a shared domestic world that is richly interior and largely self-contained. The risk is isolation: neither pushes the other toward the wider world, and the relationship can gradually contract into a private enclosure.",
                },
                {
                  label: "so/4 + so/5",
                  body: "The social Four brings a desire to influence and be recognized within a community; the social Five (the countertype, who channels the Five's withdrawal into sacrifice and intellectual service) is the most engaged-with-community of the Five subtypes. This can be a dynamic and productive pairing with shared idealistic commitments, though the Four may still find the Five emotionally elusive.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color: colorA }}>{label}</p>
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
                When the Four and Five are both growing, this pairing becomes one of the most intellectually and creatively rich combinations on the Enneagram. The Four teaches the Five that feeling is information — that emotion is not chaos to be controlled but a genuine source of knowledge about what matters. The Five teaches the Four that understanding is also a form of love — that being truly known is not only about being emotionally witnessed, but about being genuinely comprehended. Their relationship tends to have an unusual quality of mutual respect: neither type flatters or performs for the other, and so what appreciation they express carries real weight.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, they build a shared inner world of extraordinary depth — full of ideas, aesthetics, and a kind of companionship that both had perhaps given up on finding. The Four stops feeling like their depth is too much; the Five stops feeling like their need for solitude is a failure. Together, they discover that it is possible to be genuinely, quietly, sustainably known.
              </p>
            </div>
          </section>

          {/* Practical growth tips */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {[
                "Fours: practice naming what you need directly rather than intensifying feeling to signal it. Fives respond to clear, calm requests far better than to emotional escalation.",
                "Fives: practice offering something unprompted — a thought, an appreciation, a moment of genuine presence — rather than waiting to be drawn out. The Four needs to feel sought.",
                "Both: agree on explicit rituals for reconnecting after alone time — a shared meal, a walk, a brief exchange — so that the return from separate worlds is predictable and warmly framed.",
                "Both: use shared creative or intellectual projects as a form of intimacy. This is where the 4–5 pairing often does its best relational work — the made thing becomes a love letter.",
              ].map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: colorA }}>{i + 1}</span>
                  <p className="leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore the Individual Types</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 — The Individualist</Link>
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-2/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 + Type 8</Link>
              <Link href="/compatibility/enneagram-9/enneagram-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 + Type 1</Link>
              <Link href="/compatibility/enneagram-4/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 9</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before exploring compatibility</h2>
            <p className="mb-6 text-base opacity-90">
              Compatibility insights are most useful when both people know their actual type — not just their favorite number. Take the free Thyself Enneagram Assessment.
            </p>
            <Link
              href="/assessments"
              className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: colorA }}
            >
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
