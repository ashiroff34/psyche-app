import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 5;
const typeB = 7;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Fives: practice saying yes to one spontaneous invitation per week. You do not have to enjoy every moment of it — but showing up for the Seven's world, even briefly, signals investment in a language they understand.",
  "Sevens: practice staying with one topic, one project, or one difficulty long enough to reach real depth. The Five will be far more engaged when they can sense your commitment to finishing the thought.",
  "Both: use intellectual projects as a form of intimacy. The Five's depth and the Seven's breadth become genuinely complementary when aimed at the same subject — reading together, building something, researching a shared interest.",
  "Both: name the integration dynamic explicitly. The Five grows toward Eight (action, engagement); the Seven grows toward Five (depth, focus). When each partner consciously embodies their growth direction, they model something real for the other.",
];

export const metadata: Metadata = {
  title: "Enneagram 5 and 7 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 5 and 7 relationship. How the Investigator and the Enthusiast attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 5 and 7 Compatibility",
    description:
      "Two head-center types with opposite strategies: one dives deep into one thing, one samples widely across many things. Their intellectual chemistry is immediate — the challenge is whether either can meet the other where they actually live.",
    url: "https://thyself.app/compatibility/enneagram-5/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-5/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5 and 7 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 5 and Type 7 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-5/enneagram-7",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-5/enneagram-7" },
};

export default function Compatibility5and7Page() {
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
              Type 5 and Type 7
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the most mentally active types on the Enneagram: both quick, both curious, both drawn to the life of the mind. One drills down; one fans out. Their intellectual chemistry arrives instantly — the question is whether their very different rhythms can find a shared tempo.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 5 — The Investigator</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Fives are driven by the need to understand — deeply, comprehensively, and on their own terms. They retreat from the world to build interior models of how everything works, preferring to master one domain thoroughly before moving to the next. They manage anxiety by withdrawing and becoming self-sufficient; engagement with others costs them energy, and they guard that resource carefully. They are attracted to ideas that reward sustained, patient attention.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 7 — The Enthusiast</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sevens are driven by a hunger for experience, stimulation, and the freedom to pursue whatever is interesting right now. They manage anxiety by moving toward what is positive and possible — filling the future with enough options that no single failure can close them in. They are quick, generous, and genuinely delightful company. They resist anything that feels like a limitation, including the commitment required to stay with one thing long enough to reach its bottom.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 5–7 attraction is a meeting of minds. Both types are quick, curious, and genuinely excited by ideas. A Five and a Seven in conversation can cover astonishing intellectual ground together — the Seven bringing breadth and associative leaps, the Five bringing depth and conceptual precision. Each makes the other sharper. There is an immediate recognition of a fellow traveler of the mind, someone who will not tire of the interesting.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Seven is drawn to the Five&apos;s depth and focused mastery. Here is someone who has actually read everything in one domain rather than sampling across fifty — and who can pull out genuine insight rather than just interesting surface. The Seven, who often suspects their own breadth is a kind of avoidance, finds in the Five a compelling model of what it might mean to really know something. The Five is drawn to the Seven&apos;s enthusiasm and spontaneity — here is someone who makes the world seem larger and more interesting than the Five&apos;s careful management of it usually permits.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also a profound structural connection between these two types: in the Enneagram, Five is the integration point of Seven (Sevens move toward Five in growth, developing focus, depth, and stillness) and Seven is part of the integration arc for Five (Fives move toward Eight in growth, but the head triad is shared). In a conscious pairing, each partner models something the other is actively reaching toward. The Seven shows the Five what vitality and engagement look like; the Five shows the Seven what depth and commitment produce.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Intellectual chemistry",
                  body: "Few pairings on the Enneagram produce faster or more enjoyable thinking together. The Five's depth and the Seven's breadth are genuinely complementary when both partners are curious about the same thing. Their conversations range widely, follow unexpected paths, and often arrive somewhere neither would have reached alone.",
                },
                {
                  title: "Mutual non-neediness",
                  body: "Neither type particularly wants a partner who needs constant emotional attention. The Five needs a great deal of solitude; the Seven needs freedom and external stimulation. Paradoxically, this means each partner can pursue their own world without the other experiencing it as abandonment. They tend to give each other space because they each genuinely need it.",
                },
                {
                  title: "The Seven pulls the Five out",
                  body: "Fives have a tendency to contract — to stay in the fortress, manage their energy, and pass on experiences that seem like too much engagement. The Seven's enthusiasm and warmth create a genuine pull outward. The Five who stays with a Seven will likely have more experience, more social connection, and more aliveness than they would have managed alone.",
                },
                {
                  title: "The Five grounds the Seven",
                  body: "Sevens have a tendency to scatter — to move from one thing to the next before any of them reaches real depth. The Five's focused attention models a different way. In a healthy pairing, the Seven is gently anchored by the Five's depth of engagement — they slow down, stay longer, and discover that commitment to one thing is not the limitation they feared.",
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
              The 5–7 pairing&apos;s central challenge is the collision between two very different rhythms: the Five&apos;s preference for depth, stillness, and sustained focus, and the Seven&apos;s preference for breadth, movement, and stimulation. These rhythms do not naturally synchronize without deliberate effort.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Depth vs. breadth",
                  body: "The Five wants to go deep on one thing at a time, following a thread until it is actually understood. The Seven wants to move across many things, collecting experiences and ideas before any of them demands serious commitment. The Five may experience the Seven as scattered and superficial; the Seven may experience the Five as narrow and slow. Both are partially right about the other.",
                },
                {
                  title: "Solitude vs. stimulation",
                  body: "Fives recharge alone. Sevens recharge through engagement with the world. This means their default modes for handling a difficult week are directly opposed. When the Five needs to retreat and recover, the Seven may want to go out and shake off the heaviness. The compromise — staying together at home with neither partner's need met — can become a chronic source of low-level tension.",
                },
                {
                  title: "The Seven's scattered enthusiasm vs. the Five's withdrawn focus",
                  body: "To the Five, the Seven's rapid switching of topics and projects can feel chaotic and exhausting. The Five has limited bandwidth for stimulation, and the Seven's pace of engagement can quickly exceed it. The Seven, whose enthusiasm is genuine and not a deficit, may experience the Five's low-bandwidth responses as a dampening of their natural vitality.",
                },
                {
                  title: "Emotional avoidance by different routes",
                  body: "Both types avoid emotional pain, but through opposite strategies: the Five by withdrawing into analysis, the Seven by moving into planning and positive reframing. When the relationship encounters genuine difficulty — grief, conflict, fear — neither partner naturally moves toward sitting with it. They can end up intellectualizing (Five) or escaping into future scenarios (Seven) rather than actually processing together.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Five</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Five&apos;s growth in this relationship involves learning to move toward experience rather than managing it from a careful distance. The Seven&apos;s world — full of spontaneity, new stimulation, and social richness — will sometimes be too much for the Five. The work is to join it anyway, occasionally and by choice, rather than always declining from the fortress. The Five who ventures out with the Seven and survives the overstimulation discovers that they are more resilient than their protective contraction assumes.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Seven</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Seven&apos;s growth — and their integration direction — is toward the Five: depth, focus, stillness, and the willingness to stay with one thing past the point where it feels comfortable. In this relationship, the Five is not just a partner but a living model of the Seven&apos;s growth edge. The Seven who can tolerate the Five&apos;s pace, who can resist the urge to scatter when the Five withdraws, and who can commit to genuine depth in this particular relationship discovers that focus is not a limitation but a different kind of freedom.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 5–7 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/5 + sx/7",
                  body: "The sexual Five is the most emotionally present and intensity-seeking of the Five subtypes; the sexual Seven brings a focused, almost magnetic one-on-one energy that is less scattered than the other Seven variants. This is the version of the pairing most likely to sustain deep connection — the sx/Five can actually meet the sx/Seven's desire for intensity, and the sx/Seven's focus keeps them present with the Five rather than flying to the next thing.",
                },
                {
                  label: "sp/5 + sp/7",
                  body: "Both self-preservation subtypes are oriented toward comfort, security, and carefully managing their resources. The sp/Seven, focused on having enough and maintaining a comfortable life, is less socially scattered than other Sevens. This combination can create a stable, contented shared life — though neither partner is particularly drawn toward emotional depth or difficulty, and both may use their respective strategies (withdrawal and positive reframing) to avoid what needs to be faced.",
                },
                {
                  label: "so/5 + so/7",
                  body: "The social Five engages with the world through intellectual contribution to communities. The social Seven engages broadly, enthusiastically, and with enormous appetite for collective experience. Together they can be genuinely productive in shared intellectual or creative communities — but the social Seven's energy and social appetite may still feel overwhelming to the social Five over time.",
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
                When the Five and Seven are both growing, they produce one of the most intellectually and experientially rich relationships the Enneagram offers. The Seven develops the depth, focus, and commitment they have always been reaching toward; the Five develops the aliveness, engagement, and presence they have always been guarding against needing. Each partner models the other&apos;s growth direction, making the relationship itself a vehicle for development rather than just a comfortable arrangement.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, the Five and Seven build a shared life that is both intellectually serious and genuinely joyful — a rare combination. They think well together, experience richly together, and teach each other that depth and breadth are not opposites but two dimensions of the same fully lived life.
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
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-5/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 6</Link>
              <Link href="/compatibility/enneagram-7/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 + Type 9</Link>
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
