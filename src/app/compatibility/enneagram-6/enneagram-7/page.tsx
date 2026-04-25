import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 6;
const typeB = 7;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Sixes: practice naming your anxiety to the Seven directly rather than pulling away and waiting to see if they notice. The Seven responds far better to 'I'm feeling insecure about us' than to the withdrawal that follows unspoken fear.",
  "Sevens: practice staying when the Six brings up something difficult rather than pivoting to optimism or distraction. The Six needs the Seven to sit in the hard conversation without escaping — that presence is the reassurance.",
  "Both: name the pattern when it shows up. When the Six starts catastrophizing and the Seven starts reframing too fast, both partners can learn to call it: 'I think we're in the spiral. Let's slow down.'",
  "Both: build in regular, low-stakes rituals of connection. The Six needs to feel the Seven's consistent presence; the Seven needs to feel they are not trapped by obligation. Weekly rituals that are genuinely enjoyable to both satisfy both needs at once.",
];

export const metadata: Metadata = {
  title: "Enneagram 6 and 7 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 6 and 7 relationship. How the Loyalist and the Enthusiast attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 6 and 7 Compatibility",
    description:
      "Two head-center types who handle fear with opposite strategies — one prepares for danger, one escapes into possibility. Their warmth and relational ease draws them together; their different relationships to anxiety are what they must navigate.",
    url: "https://thyself.app/compatibility/enneagram-6/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-6/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 6 and 7 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 6 and Type 7 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-6/enneagram-7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-6/enneagram-7" },
};

export default function Compatibility6and7Page() {
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
              Type 6 and Type 7
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Both live in the head triad and both carry an underlying anxiety — but their strategies for managing it are completely different. The Six moves toward danger to prepare; the Seven moves away from it by accelerating toward pleasure. Their warmth and wit bring them together; their different relationships to fear are what they have to work through.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 6 — The Loyalist</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sixes manage fear by seeking alliances, testing trustworthiness, and anticipating threats before they materialize. They are loyal, responsible, and reliable — when they commit to a person or a cause, they commit fully and do not abandon easily. Their anxiety shows up as doubt, preparation, and a tendency to imagine worst-case scenarios. They value security and consistent, proven relationships above almost everything else.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 7 — The Enthusiast</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sevens manage fear by moving toward what is stimulating, positive, and possible — filling the future with enough options that no single difficulty can close them in. They are optimistic, quick, generous, and often genuinely delightful company. They resist limitation and constraint, including the constraint of sitting with something painful. Their challenge in relationship is learning to stay — with one person, with difficulty, with commitment — rather than perpetually orbiting toward the next thing.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 6–7 pairing is one of the most common neighbor-type combinations on the Enneagram, and the attraction is easy to understand. Both types are warm, relationally oriented, and good with people. They enjoy each other&apos;s company: the Six appreciates the Seven&apos;s humor, lightness, and sense of adventure; the Seven appreciates the Six&apos;s loyalty, warmth, and genuine commitment. In social settings, they can be a genuinely magnetic pair.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a deep complementarity in what each partner offers the other&apos;s fear. The Seven&apos;s lightness and optimism can lift the Six&apos;s anxiety — in the Seven&apos;s company, the future seems less threatening, the problem less catastrophic, the darkness less inevitable. The Six&apos;s loyalty and consistency give the Seven something they secretly need: a secure base from which to adventure. The Seven, who often resists commitment as a form of limitation, discovers that the Six&apos;s steadiness is not a cage but a foundation.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              This is a pairing where both people feel genuinely useful to the other — not in a service-oriented way, but in the sense that each partner&apos;s natural expression addresses something real in the other&apos;s life. The Six stops the Seven from floating away; the Seven stops the Six from sinking.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared warmth and relational investment",
                  body: "Both types genuinely care about the people in their lives. Neither is cold, neither is fundamentally avoidant, and both bring real investment to their relationships. Their bond tends to feel lively, warm, and full of genuine interest in each other.",
                },
                {
                  title: "The Seven lifts the Six's anxiety",
                  body: "In the Seven's company, the Six's catastrophizing mind often quiets. The Seven's humor, reframing ability, and forward energy interrupt the Six's tendency to spiral. A Seven who can do this without dismissing the Six's concerns — who can be light without being trivializing — is of enormous value to the Six.",
                },
                {
                  title: "The Six gives the Seven a secure base",
                  body: "The Seven's restlessness often masks a deeper longing for something they can come home to. The Six's loyalty and consistent presence provides exactly this: a reliable anchor that does not vanish when the Seven's attention wanders. The Seven who has a Six partner often finds, over time, that the commitment they once feared was actually what they needed to go deeper into their own life.",
                },
                {
                  title: "Humor and playfulness",
                  body: "Both types have a well-developed sense of humor — the Six often wry and self-aware, the Seven quick and associative. Their shared wit can be one of the most enjoyable aspects of this pairing, creating a texture of lightness that carries them through harder stretches.",
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
              The 6–7 pairing&apos;s central tension lives in the collision between two strategies for handling the same underlying fear. The Six moves toward it; the Seven moves away from it. When anxiety rises in the relationship, these strategies directly conflict.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Catastrophizing vs. positive reframing",
                  body: "When something difficult happens, the Six tends to spiral through worst-case scenarios while the Seven tends to reframe toward what is still good and possible. These are both fear-management strategies — neither is the simple truth — but they feel like opposites in the moment. The Six may experience the Seven's optimism as denial or trivializing of real problems. The Seven may experience the Six's catastrophizing as exhausting and self-defeating.",
                },
                {
                  title: "The Six's need for reassurance vs. the Seven's need for freedom",
                  body: "Sixes need consistent, demonstrated reliability — they need to know the Seven is actually there, not just nominally available. Sevens need freedom and resist the feeling of being checked-in on or monitored for commitment. The Six's periodic need for reassurance can feel to the Seven like surveillance; the Seven's resistance to being checked can feel to the Six like confirmation that they cannot be trusted.",
                },
                {
                  title: "Commitment and the fear of constraint",
                  body: "The Seven is one of the Enneagram types most resistant to feeling constrained. Long-term commitment, while desired on some level, can trigger the Seven's anxiety about limitation. The Six's loyal investment in the relationship can paradoxically intensify the Seven's claustrophobia: the more the Six needs, the more the Seven feels closed in.",
                },
                {
                  title: "Presence and distraction",
                  body: "The Six needs genuine presence — not just physical proximity but actual emotional attention. The Seven's mind moves quickly, generating new associations and plans, and can be present in body while absent in focus. The Six, attuned to this gap, may feel the Seven is never fully there — that there is always a part of them orbiting toward the next thing.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Six</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Six&apos;s growth in this relationship involves developing internal authority — trusting their own assessment of the Seven rather than perpetually seeking external confirmation. The Seven who has chosen to stay, who keeps showing up, who has demonstrated their commitment through actual behavior, can be trusted. The Six who can receive this evidence without needing the Seven to prove it again and again gives both partners significant relief. The deeper work is distinguishing the Seven&apos;s natural restlessness from untrustworthiness: these are genuinely different things.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Seven</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Seven&apos;s growth — their integration direction toward Five — involves developing depth, focus, and the capacity to be genuinely present with difficulty rather than escaping it. In this relationship, this means sitting with the Six&apos;s fear without pivoting to optimism, being fully there when the conversation is hard, and trusting that staying does not mean being trapped. The Seven who can develop real presence gives the Six something no amount of reassurance can replace: the actual experience of being fully met.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 6–7 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/6 + sx/7",
                  body: "The sexual Six is the most counterphobic of the Six subtypes — leaning into intensity rather than withdrawing from it, which can look more like an Eight than the typical Six. The sexual Seven brings focused, magnetic one-on-one energy. This combination has more volatility than other versions of the pairing — the sx/6's confrontational energy meets the sx/7's own intensity, creating real spark but also real friction when the fear-based patterns collide.",
                },
                {
                  label: "sp/6 + sp/7",
                  body: "The self-preservation Six is focused on security and reliable systems; the self-preservation Seven is focused on having enough and maintaining a comfortable life. Both subtypes are relatively grounded and practical. This can be a very stable, comfortable pairing — but the sp/7's focus on their own pleasure and security may not satisfy the sp/6's need for consistent relational reassurance.",
                },
                {
                  label: "so/6 + so/7",
                  body: "Both social subtypes are oriented toward group belonging and contribution. The social Six is loyal to their community and vigilant about its integrity; the social Seven brings enthusiasm and connection to the group. Together they can be a warmly relational, socially engaged pair — though the so/7's energetic social range may still feel like a dispersal of attention the so/6 needs focused on the relationship itself.",
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
                When the Six and Seven are both growing, they become each other&apos;s most effective antidote. The Six has found a way to trust the Seven&apos;s commitment without needing it to be proven constantly. The Seven has found a way to be genuinely present — to stay, to sit with difficulty, to experience that loyalty is not a trap but a different kind of freedom. Together they are warm, funny, genuinely relational, and capable of real depth.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, this pairing balances anxiety and possibility in a way neither type could manage alone. The Six stops sinking; the Seven stops floating. What they have built together — reliable, lively, warm, and honest — is the kind of relationship that looks ordinary from the outside and is quietly extraordinary to the people inside it.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {tips.map((tip) => (
                <li key={tip.slice(0, 30)} className="flex gap-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: colorA }}
                  >
                    {tips.indexOf(tip) + 1}
                  </span>
                  <p className="leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore the Individual Types</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-5/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 6</Link>
              <Link href="/compatibility/enneagram-6/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 + Type 9</Link>
              <Link href="/compatibility/enneagram-7/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 + Type 9</Link>
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
