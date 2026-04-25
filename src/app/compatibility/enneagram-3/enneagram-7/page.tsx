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
  title: "Enneagram 3 and 7 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 3 and 7 relationship. How the Achiever and the Enthusiast attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 3 and 7 Compatibility",
    description:
      "Two of the Enneagram's most energetically alive types: both positive, both future-oriented, both in motion. The pairing that is most fun and also most at risk of never slowing down enough to be real.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 7 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 3 and Type 7 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-7" },
};

export default function Compatibility3and7Page() {
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
              Type 3 and Type 7
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two types from the positive outlook triad: both naturally energetic, both future-focused, both capable of reframing difficulty into forward motion. This is the Enneagram&apos;s most outwardly alive pairing — and its central shadow is the shared tendency to keep everything moving fast enough that nothing deep ever gets examined.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 3 — The Achiever</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Threes are driven by a need to succeed and to be admired for their achievements. They are highly effective, adaptable, and socially fluent — able to read a room and deliver what it wants. Their core fear is being worthless or failing. In relationship, they offer energy, drive, and the capacity to make things happen — but can struggle with knowing what they actually want beneath the performance and with stopping long enough for real intimacy.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 7 — The Enthusiast</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sevens are driven by a need for stimulation, freedom, and the avoidance of pain and limitation. They are naturally optimistic, generative, and alive to possibility — able to find the interesting angle on almost any situation. Their core fear is being trapped in pain or deprivation. In relationship, they offer fun, creativity, and genuine joie de vivre — but can struggle with commitment, follow-through, and the willingness to stay with difficulty long enough for it to resolve.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              Both types are in the Harmonic group Riso-Hudson calls the Positive Outlook triad — along with Type 2, these types respond to difficulty by reframing it positively, emphasizing what is good, and moving forward rather than dwelling. The Three and Seven share this orientation instinctively. When they meet, they recognize in each other someone who is not bogged down, who is moving toward something good, who will not drag the energy down.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three is drawn to the Seven&apos;s enthusiasm, creativity, and genuine joy. The Three, who is oriented toward achievement and sometimes loses track of what is actually pleasurable, finds the Seven&apos;s capacity for delight refreshing. The Seven does not just accomplish things — they enjoy the process. The Seven&apos;s energy is generative rather than strategic, which offers the Three a different relationship to activity than their own.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Seven is drawn to the Three&apos;s effectiveness and focus. The Seven, who generates many ideas and possibilities but can struggle to execute, finds the Three&apos;s capacity to close the gap between idea and outcome genuinely valuable. The Three picks a goal and achieves it, which the Seven — who often scatters attention across many interesting options — both admires and needs. Together they can do things at a pace and quality that neither achieves alone.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared energy and forward momentum",
                  body: "Both types are in motion. Both are oriented toward what is next rather than what has gone wrong. Their shared pace creates a relationship that feels alive and engaging — there is always something happening, always a next thing being planned or built. For two types who find slowness and stagnation aversive, this shared momentum is intrinsically pleasurable.",
                },
                {
                  title: "Mutual social effectiveness",
                  body: "Both types are genuinely good with people — the Three through strategic social intelligence, the Seven through natural warmth and genuine delight in others. Together they make a socially formidable pair: likable, engaging, and able to move through contexts with ease. Others are drawn to them as a couple, which both types find reinforcing.",
                },
                {
                  title: "Seven's creativity + Three's execution",
                  body: "The Seven generates — ideas, possibilities, angles, connections between things that did not seem connected. The Three executes — focuses, strategizes, and drives toward a result. In collaboration, the Seven expands the possibility space and the Three contracts it to the viable and achievable. This is a genuinely complementary dynamic that can produce creative and effective work.",
                },
                {
                  title: "Shared optimism and reframing capacity",
                  body: "Both types naturally reframe difficulty. Neither dwells in what went wrong for longer than seems useful. In a world where problems are inevitable, this shared capacity to keep moving after setbacks is practically valuable. Neither partner drags the other into rumination; both return to forward motion relatively quickly.",
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
              The 3–7 pairing&apos;s central shadow is shared: both types avoid depth, pain, and genuine stillness. The Three avoids by achieving; the Seven avoids by stimulating. Together they can keep themselves very busy in ways that feel good but that systematically prevent either person from encountering what is actually difficult in themselves or the relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Shared avoidance of depth and pain",
                  body: "Both types belong to the positive outlook triad precisely because they have well-developed mechanisms for not experiencing negative emotion directly. The Three converts pain into drive; the Seven converts pain into plans for something better. In a relationship where both people are doing this simultaneously, genuine emotional contact becomes very difficult. The things that need to be addressed keep getting reframed and moved past.",
                },
                {
                  title: "Focus vs. scatter",
                  body: "The Three achieves by narrowing — identifying the goal and eliminating what is not relevant to it. The Seven achieves by expanding — keeping options open and following what is interesting. These orientations are structurally opposite. The Three finds the Seven's scatter frustrating; the Seven finds the Three's tunnel-focus limiting. In shared projects, this can be productive — or it can create genuine conflict about direction.",
                },
                {
                  title: "Achievement vs. freedom",
                  body: "The Three is identity-invested in success — their sense of worth is tied to accomplishment. The Seven's sense of worth is tied to freedom and the avoidance of constraint. The Three&apos;s commitment to a goal can feel to the Seven like a trap; the Seven's reluctance to commit can feel to the Three like a lack of seriousness. The Three presses for commitment; the Seven chafes at the pressure.",
                },
                {
                  title: "Performance vs. spontaneity",
                  body: "The Three manages impression — they know how to present themselves and their relationship favorably. The Seven is relatively unconcerned with impression and prefers spontaneous authenticity. The Three may want to present the relationship as more polished or stable than it is; the Seven's instinct to say whatever is true in the moment can undermine the narrative the Three is managing.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Three</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Three&apos;s growth in this relationship involves learning to value the Seven&apos;s creative generativity without immediately assessing it for strategic potential. The Seven&apos;s capacity to be interested in something purely for its own sake — without any achievement attached — is something the Three needs to encounter. The Three&apos;s integration direction is toward Type 6: toward genuine loyalty and the willingness to stop achieving long enough to be genuinely present to another person. The Seven&apos;s natural spontaneity and honesty, if received without defensiveness, can help the Three discover what they actually feel beneath the performance.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Seven</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Seven&apos;s growth involves learning to commit — to the Three, to shared goals, to the discipline that turns interesting ideas into actual results. The Three&apos;s focused execution is the Seven&apos;s integration path in action: the Seven who can see through the Three&apos;s achievement-drive to the genuine satisfaction of completing something real discovers that focus is not a trap but a form of depth. The Seven also benefits from the Three&apos;s push toward substance: the Seven who can stay with one thing long enough to actually master it produces something more valuable than the Seven who has touched everything lightly.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 3–7 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/3 + sx/7",
                  body: "The sexual-instinct Three is intensely focused on being the most desirable and impressive person in the eyes of those who matter to them. The sexual-instinct Seven is intensely focused on stimulation, connection, and the experience of aliveness. Together this can be a highly charged and exciting combination — but also the version of the pairing most likely to burn hot and run out of oxygen if neither person develops more depth and commitment.",
                },
                {
                  label: "sp/3 + sp/7",
                  body: "Both self-preservation subtypes are more private and less socially flashy than their counterparts. The sp/3 is anxious about security and material success; the sp/7 is anxious about having enough options and resources. Both can be surprisingly domestic and practical. This version of the pairing has more stability than others — both types are oriented toward building something — but can still avoid depth in favor of building more.",
                },
                {
                  label: "so/3 + so/7",
                  body: "Both social subtypes are community-oriented — the social Three through status and leadership, the social Seven through bringing people together and generating group joy. Together they are a natural social magnet: the Three's effectiveness and the Seven's warmth and creativity make them a couple that groups want to be around. The risk is a relationship that exists primarily in public and lacks private depth.",
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
                When the Three and Seven are both growing, this pairing becomes one of the most genuinely joyful and effective combinations on the Enneagram. The Three has stopped performing and found genuine pleasure — has let the Seven&apos;s capacity for delight infect their relationship to their own achievements, so that success actually feels good rather than just proving something. The Seven has found focus — has let the Three&apos;s commitment model show them what it means to stay with something long enough for it to become excellent.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, they are energetically alive together in a way that is both productive and genuinely pleasurable. They build things that are both excellent and fun to build. They make others around them feel energized rather than just impressed. And crucially, they have developed the capacity to slow down — to have the difficult conversations, to sit with discomfort, to be genuinely present to each other in the quieter moments that are necessary for love to be real.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {[
                {
                  key: "both-slow",
                  tip: "Both: build deliberate slow time into your shared life. Neither type will do this naturally. A standing practice of being together without a goal — a slow morning, an unscheduled weekend afternoon — gives both types access to the emotional terrain that fast movement systematically avoids.",
                },
                {
                  key: "threes-commitment",
                  tip: "Threes: name what you actually want from the Seven — not what sounds right or impressive, but what you genuinely desire from the relationship. The Three's integration toward Type 6 requires developing this capacity for honest self-disclosure. The Seven can only be faithful to what the Three actually communicates.",
                },
                {
                  key: "sevens-followthrough",
                  tip: "Sevens: practice finishing things. When you commit to something with the Three, see it through even when something more interesting appears. The Three's respect for you deepens with every time you deliver on what you said you would do. Follow-through is the Seven's most powerful form of love for the Three.",
                },
                {
                  key: "both-depth",
                  tip: "Both: notice when you are avoiding something difficult by moving faster or reframing positively. Name it when you see it happening. 'I think we're both doing the thing where we make this lighter than it is — can we stay with it for a minute?' This one practice can transform the depth available to this pairing.",
                },
              ].map(({ key, tip }) => (
                <li key={key} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: colorA }}>•</span>
                  <p className="leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore the Individual Types</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
            </div>
          </section>

          {/* More compatibility guides */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-7/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 + Type 9</Link>
              <Link href="/compatibility/enneagram-3/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 6</Link>
              <Link href="/compatibility/enneagram-1/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 1 + Type 7</Link>
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
