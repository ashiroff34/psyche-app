import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 5;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Fives: practice naming what you are thinking and feeling with your partner, even briefly. The Nine's warmth and patience make them an unusually safe person to practice presence with — use it.",
  "Nines: practice holding your own perspective in conversations with the Five. When you dissolve into agreement, the Five loses the distinct other person they need. Your opinions are not a burden; they are what makes genuine exchange possible.",
  "Both: build in shared activities that require mild engagement from both partners — a walk, a shared meal, a movie. These low-demand rituals create consistent connection without overwhelming the Five's energy budget.",
  "Both: watch for the pattern where both partners retreat at the same time. Agree on a signal — a gentle check-in — that brings you back into contact before the separation becomes the default.",
];

export const metadata: Metadata = {
  title: "Enneagram 5 and 9 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 5 and 9 relationship. How the Investigator and the Peacemaker attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 5 and 9 Compatibility",
    description:
      "Two of the Enneagram's most self-contained types: both withdrawn, both non-demanding, both deeply interior. Their comfort together is immediate — the risk is mutual avoidance dressed as harmony.",
    url: "https://thyself.app/compatibility/enneagram-5/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-5/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5 and 9 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 5 and Type 9 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-5/enneagram-9",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-5/enneagram-9" },
};

export default function Compatibility5and9Page() {
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
              Type 5 and Type 9
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the most withdrawn and self-contained types on the Enneagram. Their shared comfort with silence and non-demanding presence creates immediate ease — and their shared tendency to disappear inward is the thing they must watch most carefully.
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
                  Fives withdraw to protect their inner resources — their energy, attention, and time are finite, and they guard them carefully. They engage the world through careful observation and building comprehensive internal understanding before acting. They are often deeply knowledgeable, quietly opinionated, and self-sufficient in a way that can read as aloofness. In relationship, they prefer quality of connection over frequency, and depth over the demands of daily emotional attunement.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 9 — The Peacemaker</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Nines withdraw to avoid conflict and maintain an inner peace that feels threatened by strong demands, disagreements, or the pressure to assert their own needs. They are warm, accepting, and extraordinarily patient — they create an atmosphere of ease that people feel drawn toward. In relationship, their challenge is holding their own perspective rather than merging into the other person&apos;s orbit. They feel present and supportive; they can be hard to actually reach.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 5–9 pairing rests on mutual non-intrusiveness. Both types have experienced most relationships as requiring too much — too much performance, too much emotional availability, too many demands on their interior world. When they find each other, the relief is immediate: here is someone who does not push. The Five can be in the same room as the Nine without having to perform engagement. The Nine can be with the Five without managing anyone&apos;s expectations or mediating conflict.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is genuine complementarity here as well. The Nine&apos;s warm, grounded presence softens the Five&apos;s sharp withdrawal — the Nine creates an atmosphere in which the Five gradually, slowly, feels safe enough to actually be present. The Five&apos;s competence and intellectual focus gives the Nine a clear figure to organize their own diffuse attention around — someone who knows what they think and says it, which the Nine often finds quietly clarifying and grounding.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Both are also part of Naranjo&apos;s withdrawn triad (along with the Four): types whose primary strategy involves pulling back from the world rather than pushing against it or moving toward others. This shared orientation creates a mutual recognition that is difficult to find elsewhere on the Enneagram — neither partner needs the other to be more present, more engaged, or more emotionally available than they naturally are.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared comfort with silence",
                  body: "Both types can be in each other's presence without filling it. Their shared silence does not feel like distance — it feels like two people comfortable enough not to need noise. This is genuinely rare, and both partners typically find it deeply restful.",
                },
                {
                  title: "Non-demanding presence",
                  body: "Neither type imposes themselves on the other. The Five does not demand emotional reciprocity; the Nine does not demand engagement or attention. The result is a low-pressure relationship that both partners can sustain without exhaustion.",
                },
                {
                  title: "The Nine's warmth grounds the Five",
                  body: "Fives often feel that their interior world is a private fortress that others experience as cold or inaccessible. The Nine's warmth and patient acceptance create a rare exception: someone who feels genuinely comfortable with the Five as they are. This allows the Five to relax into presence rather than managing from behind the glass.",
                },
                {
                  title: "The Five's clarity anchors the Nine",
                  body: "Nines often struggle with their own vagueness — they have opinions but hold them lightly, feel pulled in multiple directions, and find it difficult to commit to a clear position. The Five's sharp, definite perspective provides a useful anchor: here is someone who knows what they think, who does not waffle, and whose clarity can help the Nine locate their own.",
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
              The central risk in the 5–9 pairing is not conflict but its opposite: two people retreating so thoroughly into their own inner worlds that the relationship becomes a comfortable arrangement for mutual avoidance rather than genuine contact.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Double withdrawal",
                  body: "When the Five retreats to conserve energy and the Nine retreats to avoid conflict, the space between them can grow very large very gradually — each partner disappearing into their own world, neither one pushing toward the other. The relationship may feel peaceful while both partners are actually quite lonely.",
                },
                {
                  title: "The Five's avarice meets the Nine's accommodation",
                  body: "Fives are characterized by Naranjo as defined by a kind of avarice — a hoarding of inner resources, including presence and engagement. Nines are characterized by an almost infinite capacity to accommodate — to adapt to what the other person needs, to dissolve their own preferences into the relationship's requirements. Together, these patterns can create a dynamic where the Five takes up all the relational space and the Nine simply disappears into agreement.",
                },
                {
                  title: "Opinions and the absence of conflict",
                  body: "Fives are often quietly quite opinionated; Nines tend to dissolve their opinions to maintain harmony. The Five may hold strong views that the Nine never actually challenges, creating a false sense of agreement that masks the Nine's actual perspective. Over time, the Nine may accumulate unexpressed wants and resentments that neither partner can see coming because the surface has always looked so peaceful.",
                },
                {
                  title: "Avoidant intimacy",
                  body: "Both types can maintain a relationship that looks stable while avoiding the genuine vulnerability that makes it alive. The Five intellectualizes; the Nine merges and accommodates. Neither strategy involves the kind of direct, present, emotionally real contact that sustains a relationship over years. Their comfort with each other can become a comfortable avoidance of what genuine closeness requires.",
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
                  The Five&apos;s growth in this relationship involves learning to offer presence rather than just allowing it when required. The Nine will not demand engagement — which means the Five must develop the initiative to extend themselves toward the Nine without being pulled. The Five who can occasionally put down their book, their project, their internal analysis, and genuinely attend to the Nine — asking questions, following up, noticing and naming — gives the Nine something they would never ask for but deeply need.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Nine</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Nine&apos;s growth involves staying present as a distinct person — with their own opinions, preferences, and desires — rather than merging into the Five&apos;s world. The Nine who can say &ldquo;I actually think something different&rdquo; or &ldquo;I want something that isn&apos;t on your list&rdquo; gives the Five a real other person to be in relationship with. Without this, the Five is essentially alone with a very warm mirror. The Nine&apos;s growth direction (toward Three) involves developing initiative, presence, and the willingness to assert their own reality in the world.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 5–9 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/5 + sx/9",
                  body: "The sexual Five brings an unusual one-on-one intensity for the Five type; the sexual Nine is the most merged and bonded of the Nine subtypes. This combination can create genuine depth of connection — the sx/Five's openness to intensity meeting the sx/Nine's total investment in the bond. The risk is that the Nine's merger pattern amplifies the Five's natural tendency toward isolation: together they form a sealed world that neither reaches out from.",
                },
                {
                  label: "sp/5 + sp/9",
                  body: "Both self-preservation subtypes are oriented toward personal comfort and security. Together they can create an extraordinarily stable and self-sufficient domestic world — quiet, predictable, and internally rich. The risk of double withdrawal is highest here: both partners can disappear into their own domains of comfort and gradually lose contact with each other entirely.",
                },
                {
                  label: "so/5 + so/9",
                  body: "The social Five engages with the world through intellectual contribution; the social Nine engages through supporting and harmonizing the group. Both care about their communities and their obligations to them. This pairing can be the most outwardly engaged version of 5–9, though the Nine may still struggle to stay present as a distinct person when the Five&apos;s intellectual confidence fills the room.",
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
                When the Five and Nine are both growing, they build a relationship that is genuinely restful and genuinely alive at the same time. The Five has learned to extend themselves toward the Nine with real curiosity and warmth. The Nine has learned to stay present as a distinct, opinionated person rather than dissolving into the Five&apos;s world. The silence between them is still comfortable — but it is full silence now, not empty silence. Both people are actually there.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, this pairing produces something rare: a deep, low-drama, mutually respectful bond between two people who are genuinely interested in each other. The Five finds in the Nine the patient, accepting presence they always quietly wanted without knowing how to ask for it. The Nine finds in the Five a clarity and solidity they can actually orient themselves by. Together, they build a world that is quiet, rich, and real.
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
              <Link href="/enneagram/type-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 9 — The Peacemaker</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 5</Link>
              <Link href="/compatibility/enneagram-5/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 8</Link>
              <Link href="/compatibility/enneagram-8/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 + Type 9</Link>
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
