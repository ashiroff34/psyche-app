import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 8 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 2 and 8 relationship. How the Helper and the Challenger attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 2 and 8 Compatibility",
    description:
      "Two of the most intensely relational types on the Enneagram — one who leads with giving, one who leads with strength. When they work, it is a fortress. When they don't, it is a power struggle.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 8 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 2 and Type 8 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-8",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-8" },
};

export default function Compatibility2and8Page() {
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
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">Type 2 and Type 8</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the most intensely relational types on the Enneagram — one who expresses love through giving, one who expresses it through protection. When they find their rhythm, the result is a relationship of rare strength and warmth.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 2 — The Helper</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Twos are driven by the need to be loved and needed. They give generously — often at the expense of their own needs — and derive their sense of worth from being indispensable to others. Their core fear is being unwanted or unlovable. They tend toward warmth, attunement, and relational intelligence, often knowing what others need before those others do.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 8 — The Challenger</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Eights are driven by the need to protect themselves and those they love from a world that rewards strength and punishes vulnerability. They lead with power, directness, and intensity. Their core fear is being controlled or betrayed. They tend toward decisiveness and protective loyalty — the people they choose to care for are genuinely sheltered by that care.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 2–8 pairing has a quality of immediate recognition — not of similarity, but of complementarity. The Eight is drawn to the Two&apos;s warmth, genuine care, and social intelligence. In a world the Eight experiences as competitive and guarded, the Two&apos;s open-hearted giving feels both surprising and deeply attractive. The Two embodies something the Eight has armored against in themselves: the willingness to be soft, to serve, to let someone&apos;s needs come before your own.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Two is drawn to the Eight&apos;s strength, directness, and protectiveness. In a world the Two often navigates through indirection and emotional management, the Eight&apos;s clarity feels like a relief. The Eight says what they mean, protects what they love, and does not require the Two to guess or manage. The Two, who often feels responsible for managing everyone else&apos;s feelings, finds in the Eight someone who takes charge — who actually protects in return.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a deeper resonance between these types. Both Two and Eight are highly relational — they care intensely, if differently. Both operate through a kind of power: the Two through relational influence and giving, the Eight through direct force and leadership. Both have strong opinions about loyalty and tend to be fiercely devoted to the people they love. These shared qualities give the relationship a sense of mutual recognition that runs below the surface differences.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Complementary strengths",
                  body: "The Eight leads externally — taking charge in the world, protecting the relationship from outside threat, making decisions with confidence. The Two leads internally — managing the emotional life of the relationship, creating warmth and connection, ensuring that people feel seen and cared for. These domains do not compete; they complete each other.",
                },
                {
                  title: "Mutual loyalty",
                  body: "Both types, when they have chosen someone, are deeply loyal. The Eight's protective loyalty is fierce and physical; the Two's relational loyalty is attentive and sustained. Together, this creates a relationship in which both partners feel genuinely backed.",
                },
                {
                  title: "The Eight softens; the Two gains ground",
                  body: "The Eight's growth involves accessing the vulnerability and care that their armor has protected against. In the presence of the Two's genuine warmth — which the Eight senses is real, not manipulative — the Eight can begin to soften. The Two's growth involves learning to ask directly for what they need. In the presence of the Eight's preference for directness over indirection, the Two can learn to stop giving in order to receive.",
                },
                {
                  title: "High relational intensity",
                  body: "Neither type is mild or easygoing. Both bring enormous energy to their relationships. While this can produce friction, it also means the relationship is never absent or sleepwalking — both partners are genuinely present, genuinely invested, and genuinely felt.",
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
              The 2–8 relationship&apos;s central friction lives in the collision between the Two&apos;s indirection and the Eight&apos;s hatred of any form of manipulation. When the Two gives with strings — expecting gratitude, reciprocity, or emotional debt — the Eight, who has a finely tuned radar for being controlled, reacts with rejection or aggression. And when the Eight&apos;s force becomes domination, the Two — who needs to feel needed and central — begins to feel erased.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Indirection vs. directness",
                  body: "Twos often communicate needs through giving and hinting rather than direct statement. Eights operate on an entirely different frequency: they respect directness and are suspicious of anything that looks like emotional maneuvering. When a Two gives in order to receive, the Eight senses it — and the Eight's response to feeling manipulated is rarely gentle.",
                },
                {
                  title: "Neediness vs. autonomy",
                  body: "Twos, at less healthy levels, can become preoccupied with being needed — checking whether the other person still wants them, giving more to reassert their indispensability. Eights have a powerful drive toward autonomy and tend to reject dependence of any kind. The Two's need to be needed can collide directly with the Eight's need to be free.",
                },
                {
                  title: "Control through giving vs. control through dominance",
                  body: "Both types can be controlling — but through entirely different mechanisms. The Two controls through emotional management: shaping the relationship's emotional tone through giving, withholding, or making others feel obligated. The Eight controls through direct assertion of will. When both patterns are in play simultaneously, the relationship can become a covert power struggle that neither partner fully acknowledges.",
                },
                {
                  title: "Vulnerability",
                  body: "Both types have significant defenses around vulnerability. The Two's vulnerability is hidden beneath generosity and helpfulness. The Eight's vulnerability is hidden beneath aggression and control. When stress rises, both types tend to reach for their armor rather than toward each other — the Two gives more and gets more resentful, the Eight pushes harder and gets more isolated.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Two</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Two&apos;s growth in this relationship involves learning to ask for what they need directly — not through giving more, not through creating emotional obligation, but through simple, clear statement of their own desires and needs. With an Eight, indirection doesn&apos;t work; the Eight&apos;s directness is actually a gift that invites the Two to stop the relational management and show up plainly. The Two also needs to examine the giving: is it freely given, or is it a down payment on something expected in return? The Eight will feel the difference.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Eight</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth involves learning to receive the Two&apos;s care without immediately deflecting or dismissing it. The Eight, who has learned to distrust anything that looks like a soft offer, may reflexively reject the Two&apos;s warmth as weakness or manipulation. But the Two&apos;s giving, when it is genuinely unconditional, is something the Eight rarely encounters: actual care offered without a power agenda. Learning to let that in — to allow someone to take care of the Eight — is transformative work. The Eight also needs to moderate the force of their directness: with the Two, bluntness without warmth reads as dominance rather than honesty.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 2–8 Pairing</h2>
            <div className="space-y-4">
              {[
                {
                  label: "sx/2 + sx/8",
                  body: "This is the most intensely bonded — and potentially the most volatile — version of this pairing. The sexual-instinct Two is aggressive, seductive, and passionate; the sexual-instinct Eight is the most power-focused and physically intense of the Eight subtypes. Together, they can create a relationship of extraordinary magnetic force and equally extraordinary collision. The chemistry is undeniable; the need for mutual growth is significant.",
                },
                {
                  label: "sp/2 + sp/8",
                  body: "The self-preservation Two is warmer and more practically nurturing; the self-preservation Eight (the countertype) is the most introverted and least obviously powerful Eight. This pairing can be the most quietly harmonious version: the sp/2's practical care meets the sp/8's genuine need for a trusted domestic partner. Less dramatic than the sx versions, and often more sustainable.",
                },
                {
                  label: "so/2 + so/8",
                  body: "Both social-instinct types care about community and their role within it. The so/2 uses giving and relational warmth to build social influence; the so/8 leads and protects the community. Together, they can form a powerful leadership couple — though the so/2's need for recognition and the so/8's need for respect can sometimes compete for the same room.",
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
                When the Two and Eight are both growing, this pairing becomes what it was always trying to be: a fortress of loyalty and warmth. The Eight, who has spent a lifetime guarding against vulnerability, discovers that the Two&apos;s care is safe — that softening does not mean losing power. The Two, who has spent a lifetime earning love through giving, discovers that they are wanted for who they are, not only for what they provide.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Together at their best, they protect and nourish simultaneously. The Eight provides safety from the external world; the Two creates warmth and connection within it. Both bring enormous energy, loyalty, and commitment to the relationship. They challenge each other — the Eight&apos;s directness keeps the Two honest; the Two&apos;s warmth keeps the Eight human — and what emerges is a relationship of unusual strength and care.
              </p>
            </div>
          </section>

          {/* Practical tips */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {[
                "Twos: practice stating needs directly. With an Eight, 'I need more time together' lands far better than extra giving that carries the unspoken expectation of reciprocity.",
                "Eights: practice softening your directness with warmth. 'I love you and I disagree with this' is not a contradiction — it is what the Two needs to hear alongside the Eight's challenge.",
                "Both: make room for the Eight's vulnerability when it appears, without amplifying it. Eights rarely show their soft side; when they do, the Two's warmth should meet it gently rather than enthusiastically (which can feel overwhelming to the Eight).",
                "Both: name the power dynamic explicitly rather than letting it run covertly. This pairing can fall into patterns of control and counter-control that are easier to address once they've been said aloud.",
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
              <Link href="/enneagram/type-2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 2 — The Helper</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 5</Link>
              <Link href="/compatibility/enneagram-9/enneagram-1" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 + Type 1</Link>
              <Link href="/compatibility/enneagram-4/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 9</Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Know your type before exploring compatibility</h2>
            <p className="mb-6 text-base opacity-90">
              Compatibility insights are most useful when both people know their actual type. Take the free Thyself Enneagram Assessment.
            </p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color: colorA }}>
              Start the assessment
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
