import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 3;
const typeB = 5;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 3 and 5 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 3 and 5 relationship. How the Achiever and the Investigator attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 3 and 5 Compatibility",
    description:
      "Two types who value competence above almost everything else — one who performs it, one who builds it. The story of shared mastery, diverging needs for visibility, and what happens when achievement meets withdrawal.",
    url: "https://thyself.app/compatibility/enneagram-3/enneagram-5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-3/enneagram-5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 3 and 5 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 3 and Type 5 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-3/enneagram-5",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-3/enneagram-5" },
};

export default function Compatibility3and5Page() {
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
              Type 3 and Type 5
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Both types are in the Enneagram&apos;s competence triad — both value mastery, expertise, and the ability to produce real results. One performs competence for an audience; one builds it in private. Their partnership has unusual intellectual and practical potential, and its central tension is between visibility and invisibility.
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
                  Threes are driven by a need to succeed and to be seen as successful. They are exceptionally good at reading what a situation requires and adapting to deliver it. Their core fear is being worthless or without value. In relationship, they offer energy, drive, and strategic effectiveness — but can struggle with knowing what they actually feel beneath the performance, and with slowing down enough to be genuinely intimate rather than just impressively present.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 5 — The Investigator</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Fives are driven by a need to understand and to protect their inner resources from depletion. They build comprehensive knowledge of their domains and engage the world only after careful preparation. Their core fear is being incompetent or overwhelmed. In relationship, they offer depth, precision, and genuine expertise — but can struggle with withdrawal, emotional under-investment, and keeping different domains of life in separate compartments.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 3–5 pairing begins with a shared value that runs very deep in both types: competence. Both types judge people and themselves primarily on the basis of capability and expertise. Neither is impressed by charm or status that is not backed by actual ability. In each other, they find the rare experience of being around someone whose competence is real.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three is drawn to the Five&apos;s genuine depth of knowledge. The Three, who is sometimes aware of the gap between their polished presentation and their actual understanding, finds the Five&apos;s real mastery deeply appealing. Here is someone who actually knows things — who has done the work, who does not need to perform expertise because they have the real thing. The Five&apos;s depth gives the Three access to substance they can present, and more privately, to a standard of knowledge they want to meet.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Five is drawn to the Three&apos;s social effectiveness and ability to navigate the world. The Five, who often has important things to offer but lacks the social and strategic capacity to deliver them to a wide audience, sees in the Three someone who can do exactly that. The Three opens doors, makes things happen, and presents ideas in ways that land. For a Five whose knowledge tends to accumulate in private, the Three&apos;s ability to make things visible and valued is genuinely attractive.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared valuing of competence and mastery",
                  body: "Both types respect genuine expertise above almost everything else. Neither is interested in performance without substance, and neither is satisfied with knowledge that cannot be applied. Their shared standard — real ability, real results — creates a relationship where both people are held to and meet a high bar. This mutual respect for actual competence is the bedrock of the pairing.",
                },
                {
                  title: "Five's depth + Three's delivery",
                  body: "In professional or creative partnership, this combination is unusually effective. The Five generates the depth — the research, the model, the genuine insight. The Three packages and presents it — strategically, effectively, in a form the intended audience can receive. Together they can build and communicate expertise in ways neither could achieve alone.",
                },
                {
                  title: "Three's social ease opens the Five's world",
                  body: "The Five can spend significant time in an interior world of ideas with limited social connection. The Three's natural social fluency and genuine enjoyment of people creates openings for the Five — introductions, collaborations, opportunities — that the Five could not have generated independently. The Three brings the world to the Five's door.",
                },
                {
                  title: "Five's privacy gives the Three space to not perform",
                  body: "The Three is often performing — reading the room, adapting, presenting the right version of themselves. The Five is not interested in performing and is not interested in watching the Three perform. The Five just wants to know what is actually true. This can create, over time, a rare space where the Three can drop the performance and simply be, without social consequence.",
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
              The 3–5 pairing&apos;s central challenge lives in the gap between the Three&apos;s need for visibility and the Five&apos;s need for invisibility. Both types are oriented toward competence — but one needs to be seen for it, and one actively avoids being seen.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Visibility vs. privacy",
                  body: "The Three needs an audience — recognition, admiration, and the sense that their achievements are being witnessed. The Five actively avoids being seen, preferring to do their best work in private and share it selectively. The Three's need for the spotlight can feel invasive to the Five; the Five's preference for invisibility can feel like abandonment to the Three who wants their partner there.",
                },
                {
                  title: "Performing competence vs. actually building it",
                  body: "The Three's instinct is to project competence effectively — to present knowledge and capability in ways that are received as impressive. The Five's instinct is to build actual knowledge before sharing any of it. The Five may see the Three's presentation as superficial; the Three may see the Five's preparation as a form of hoarding. The Five who knows something the Three is presenting incompletely will feel the gap acutely.",
                },
                {
                  title: "Three's integration vs. Five's hamster wheel",
                  body: "The Three's integration direction is toward Type 6 — toward genuine loyalty, commitment, and the willingness to stop running long enough to be really present. The Five's integration direction is toward Type 8 — toward decisive action and the willingness to engage the world directly rather than from behind glass. In a stressed version of this pairing, the Three accelerates and performs while the Five withdraws and analyzes: neither is moving toward their integration.",
                },
                {
                  title: "Emotional under-investment",
                  body: "Neither type naturally foregrounds emotional expression. The Three connects through achievement and presentation; the Five connects through knowledge and shared analysis. Both are capable of significant emotional depth, but neither initiates it easily. Without deliberate attention, the 3–5 relationship can become a highly functional professional-and-intellectual partnership that has insufficient emotional contact to sustain genuine intimacy.",
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
                  The Three&apos;s growth in this relationship involves learning to value the Five&apos;s depth on its own terms — not as a resource to be packaged and presented, but as genuine knowledge that deserves respect even when it is not visible to anyone else. The Three who can sit with the Five&apos;s interior world without immediately thinking about how to deploy it gains access to a quality of intellectual engagement they often miss. The Three also benefits from the Five&apos;s implicit invitation to drop the performance — to be actually interested in something rather than strategically interested in how it makes them look.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Five</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Five&apos;s growth involves recognizing that the Three&apos;s need for visibility is not vanity — it is a genuine emotional need that, unmet, leaves the Three feeling unseen and undervalued. The Five who can offer more active recognition — who can say &ldquo;I see what you built and it is genuinely impressive&rdquo; rather than just internally acknowledging it — gives the Three something essential. The Five also benefits from the Three&apos;s implicit push toward action: at some point the knowledge needs to be deployed, and the Three shows the Five that doing so effectively requires engaging the world on its own terms.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 3–5 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/3 + sx/5",
                  body: "The sexual-instinct Three is the most competitive and image-focused of the Three subtypes, deeply invested in the impression they make on the people who matter to them. The sexual-instinct Five is the most emotionally available and intensity-seeking of the Five subtypes. This can be a surprisingly charged combination — the sx/5's desire for genuine depth of contact meets the sx/3's desire for significance in the eyes of someone they admire.",
                },
                {
                  label: "sp/3 + sp/5",
                  body: "Both self-preservation subtypes are security-oriented and practical. The sp/3 is anxious about material success and practical security; the sp/5 is anxious about having enough resources to maintain their interior world. Both can create a comfortable, functional shared life with their own well-defined domains. The risk is a relationship that is very comfortable and very separate, with insufficient shared emotional terrain.",
                },
                {
                  label: "so/3 + so/5",
                  body: "The social Three is status-oriented within the group and a natural leader; the social Five — the countertype, who channels Five's withdrawal into idealistic service — is the most group-engaged of the Five subtypes. Together they can be a remarkably effective public-facing pair: the Five provides the intellectual substance, the Three provides the strategic delivery. This is the version of the pairing most likely to produce meaningful shared work.",
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
                When the Three and Five are both growing, this pairing becomes one of the most intellectually and practically effective combinations on the Enneagram. The Three has stopped performing for the Five and started being genuinely curious — finding, perhaps for the first time, what they actually think about things rather than what sounds impressive. The Five has stepped out from behind their observational stance and begun to share their knowledge actively, trusting the Three to receive and honor it rather than just deploy it.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, they build shared projects of real substance and real impact: the Five&apos;s genuine depth and the Three&apos;s genuine effectiveness, combined and aimed at something that matters to both of them. The Three stops feeling like a surface; the Five stops feeling like a library. Together, they discover that competence in the fullest sense is both built and shared — and that a relationship capable of honoring both is something neither expected to find.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {[
                {
                  key: "threes-recognition",
                  tip: "Threes: offer explicit recognition of the Five's knowledge and depth. The Five does not need applause — but they do need to feel that what they know is genuinely valued, not just useful. 'I find what you know about this genuinely impressive' lands differently than deploying their ideas in a presentation.",
                },
                {
                  key: "fives-visibility",
                  tip: "Fives: practice being present at the things that matter to the Three. The Three needs a witness. Showing up — not performing, just being there — for the Three's moments of achievement gives the Three something essential that the Five is uniquely positioned to provide because their presence is selective and therefore meaningful.",
                },
                {
                  key: "both-emotional",
                  tip: "Both: build deliberate emotional check-ins into your shared life. Neither type initiates emotional conversation naturally. A standing ritual — a weekly dinner where you name one thing that has been emotionally significant — provides the structure that prevents emotional drift.",
                },
                {
                  key: "both-projects",
                  tip: "Both: find shared projects that need both of what you bring. The Five generates and deepens; the Three packages and delivers. Working on something together where both functions are required is the natural crucible of this relationship — it gives both people a context in which their contribution is indispensable and visibly valued.",
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
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
            </div>
          </section>

          {/* More compatibility guides */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-3/enneagram-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 + Type 6</Link>
              <Link href="/compatibility/enneagram-4/enneagram-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 4 + Type 5</Link>
              <Link href="/compatibility/enneagram-5/enneagram-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 8</Link>
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
