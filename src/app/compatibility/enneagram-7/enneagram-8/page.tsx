import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 7;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Sevens: practice staying in the difficult conversation rather than deflecting with humor or pivoting to what is exciting. The Eight needs to know you can be present for hard things — that is what they mean by trustworthy.",
  "Eights: practice giving the Seven explicit freedom rather than implicitly demanding their orbit. The Seven's restlessness and need for options is not disloyalty — it is their nature. Naming it as acceptable removes a major source of friction.",
  "Both: channel the shared energy into something real. The 7–8 pair at its best produces remarkable things together. A shared project, a shared goal, a shared adventure — something that requires both partners' energy and gives it direction.",
  "Both: build in a regular check-in on what each person needs. Both types are action-oriented and can avoid direct emotional conversations by staying in motion. A brief, honest check-in prevents the accumulation of unspoken resentment.",
];

export const metadata: Metadata = {
  title: "Enneagram 7 and 8 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 7 and 8 relationship. How the Enthusiast and the Challenger attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 7 and 8 Compatibility",
    description:
      "Two assertive, action-oriented types with enormous appetites for experience and impact. Their shared boldness is electric — their very different relationships to freedom and control are what they have to work through.",
    url: "https://thyself.app/compatibility/enneagram-7/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-7/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 7 and 8 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 7 and Type 8 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-7/enneagram-8",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-7/enneagram-8" },
};

export default function Compatibility7and8Page() {
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
              Type 7 and Type 8
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Two of the Enneagram&apos;s boldest, most action-oriented types: both assertive, both direct, both driven by enormous appetites for experience and impact. The chemistry between them is immediate. The tension lives in the gap between the Seven&apos;s need for freedom and the Eight&apos;s need for control.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 7 — The Enthusiast</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sevens are driven by a hunger for experience, stimulation, and freedom. They manage anxiety by moving toward what is exciting and possible — filling the future with enough options that no single difficulty can close them in. They are quick, generous, and live with an infectious appetite for what life has to offer. Their core fear is being trapped, limited, or forced to stay with something painful. They prefer to move faster than their own anxiety can catch them.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 8 — The Challenger</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Eights are driven by the need to be strong, self-reliant, and in control of their domain. They engage the world with force, directness, and a fierce protective instinct toward what and whom they love. Their core fear is being controlled or betrayed. They do not shy from intensity — they move toward conflict and difficulty rather than away from it. They value people who are genuine, who can match their energy, and who do not pretend to be something they are not.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 7–8 attraction is kinetic and immediate. Both types are in what some Enneagram schools call the assertive stance — they push against the world rather than withdrawing from it or deferring to it. They recognize in each other someone with real energy, real boldness, and a refusal to be ordinary or small. The Seven is drawn to the Eight&apos;s power and directness — here is someone who does not hedge or qualify, who is actually as strong as they appear, who will not collapse under the Seven&apos;s own considerable energy. The Eight is drawn to the Seven&apos;s vitality and range — here is someone who is genuinely alive, who can keep up, who brings enthusiasm and possibility rather than heaviness and demand.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is also an appetite overlap that creates real chemistry. Both types are drawn toward experience, impact, and the feeling of being fully engaged in life. They are both bored by safety, by moderation, by the careful management of risk. Together, they tend to create a relationship that is visibly alive — full of plans, projects, adventures, and the shared sense that things are happening.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Both types also share an avoidance of sitting with pain — the Seven by accelerating past it, the Eight by pushing through it. This means neither partner is particularly interested in dwelling on difficulty, which creates an environment of forward momentum that suits both. The challenge is that this same quality can lead them to avoid the genuine emotional processing that every relationship eventually requires.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared boldness and action orientation",
                  body: "Both types are movers. They do not wait for permission, do not spend excessive time deliberating, and are not particularly afraid of making a large decision. Together they can create a remarkable amount of momentum — in shared projects, in building a life, in taking on challenges that would paralyze more cautious types.",
                },
                {
                  title: "Directness and honesty",
                  body: "Both types say what they mean. The Seven&apos;s directness comes from enthusiasm and transparency; the Eight&apos;s comes from a refusal to be anything less than completely real. Neither type is particularly interested in social management or careful impression control. Their bond tends to be honest in a way that both partners find deeply refreshing.",
                },
                {
                  title: "Appetite for experience",
                  body: "The Seven&apos;s hunger for experience and the Eight&apos;s hunger for impact and intensity combine into a relationship that tends to be genuinely eventful. They take trips, pursue ambitious goals, and push each other toward larger versions of their own lives. Neither partner allows the other to shrink.",
                },
                {
                  title: "Neither demands emotional management",
                  body: "Neither type needs the other to be careful with them in a highly managed, emotionally cautious way. The Seven does not require the Eight to soften their edge; the Eight does not require the Seven to slow down. Both can handle the other&apos;s full-strength presence, which removes a significant source of friction that these types often encounter with more sensitive partners.",
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
              The 7–8 pairing&apos;s central tension lives in the collision between freedom and control. The Seven fears being trapped; the Eight fears being weak or losing their grip on what matters to them. In a relationship, these fears can put them directly at odds.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Freedom vs. possession",
                  body: "The Seven needs to feel free — free to change direction, free to pursue new interests, free to not be defined entirely by the relationship. The Eight tends to be possessive of what they love: they want to know their person is theirs, not orbiting loosely in the open air. The Eight&apos;s possessiveness can feel exactly like the constraint the Seven most fears; the Seven&apos;s need for freedom can feel like a refusal of full commitment that triggers the Eight&apos;s fear of betrayal.",
                },
                {
                  title: "The light touch vs. the full weight",
                  body: "Sevens prefer to move lightly through the world — handling difficulty quickly, staying optimistic, keeping their options open. Eights move with their full weight — direct, committed, and willing to sit in the intensity of something until it resolves. The Seven may experience the Eight&apos;s full-weight presence as heavy and constraining; the Eight may experience the Seven&apos;s light touch as evasive, even as a form of dishonesty.",
                },
                {
                  title: "Deflection vs. confrontation",
                  body: "When something difficult needs to be addressed, the Seven&apos;s instinct is often to deflect — with humor, with reframing, with the suggestion that there is something better to focus on. The Eight&apos;s instinct is to confront it directly and forcefully. The Seven&apos;s deflection can feel like avoidance and even cowardice to the Eight; the Eight&apos;s confrontation can feel like the constraint and heaviness the Seven most wants to escape.",
                },
                {
                  title: "Depth of commitment",
                  body: "Eights commit fully and expect the same in return. Sevens commit — but they hold some part of themselves in reserve, maintain a felt sense of freedom, never quite close the door on the exit. The Eight who loves a Seven may eventually ask for a kind of all-in commitment the Seven experiences as terrifying, not because they do not love the Eight, but because full closure violates something deep in their architecture.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Seven</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Seven&apos;s growth in this relationship — and their integration direction toward Five — involves developing the capacity to stay with difficulty, to be fully present without escaping into enthusiasm or planning. The Eight needs the Seven to be genuinely there when things are hard. The Seven who can sit with something painful without pivoting away from it discovers that staying does not mean being trapped. It means being trustworthy — which is, at depth, what the Seven has always wanted to be capable of offering.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Eight</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth involves learning that freedom is not the opposite of commitment — that giving the Seven genuine space does not mean losing them, and that loosening their grip is not weakness. The Eight who can trust the Seven&apos;s loyalty without needing to hold them in place discovers a more sustainable form of security than possession provides. The deeper work is at the Eight&apos;s integration point (toward Two): developing genuine tenderness and openness, allowing the Seven&apos;s lightness and care to actually reach them rather than armoring against it.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 7–8 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/7 + sx/8",
                  body: "The sexual Seven brings focused, intense one-on-one energy and a genuine appetite for merger and depth that is atypical for the Seven type. The sexual Eight brings possession, conquest, and all-in intensity. Together these two subtypes can create extraordinary chemistry — but also the most volatility in the pairing. The sx/7&apos;s need for freedom still conflicts with the sx/8&apos;s possessiveness, just at a much higher energy level.",
                },
                {
                  label: "sp/7 + sp/8",
                  body: "The self-preservation Seven is focused on comfort, security, and having enough; the self-preservation Eight is focused on their domain and managing their resources and territory. Both are more internally directed than the other subtypes. Together they can create a stable, comfortable, and mutually non-intrusive life — though neither subtype is particularly drawn toward emotional depth or direct vulnerability.",
                },
                {
                  label: "so/7 + so/8",
                  body: "The social Seven is enthusiastic about contributing to communities and connecting broadly; the social Eight wants to be the community&apos;s protector and power center. Together they can be a very effective and visible force in their shared social world — though they may struggle over whose vision and whose energy defines the group&apos;s direction.",
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
                When the Seven and Eight are both growing, this pairing creates one of the most energetically alive and impactful combinations the Enneagram offers. The Seven has found the depth and presence they were always capable of; the Eight has found the lightness and openness they usually armour against. The Seven models for the Eight what it looks like to live without rigidity; the Eight models for the Seven what it looks like to commit fully and mean it.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, the Seven and Eight build a life that is genuinely, visibly large — full of experience, impact, honesty, and a kind of shared adventurousness that neither would have created alone. The Seven stops running; the Eight stops gripping. What remains is a bond between two people who are fully, unapologetically themselves — and who have chosen each other precisely because of that.
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
              <Link href="/enneagram/type-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 7 — The Enthusiast</Link>
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-5/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 7</Link>
              <Link href="/compatibility/enneagram-4/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 8</Link>
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
