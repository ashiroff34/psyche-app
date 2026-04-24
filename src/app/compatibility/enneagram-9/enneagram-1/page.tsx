import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 9;
const typeB = 1;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 9 and 1 Compatibility — The Peacemaker & The Reformer | Thyself",
  description:
    "Explore the Enneagram Type 9 and Type 1 compatibility. The Peacemaker and the Reformer share a rare instinctual depth — both live in the body triad, both carry unexpressed anger differently, and together they balance acceptance with integrity. Full analysis of strengths, tensions, and growth.",
  openGraph: {
    title: "Enneagram 9 and 1 Compatibility — The Peacemaker & The Reformer",
    description:
      "Type 9's capacity for deep acceptance meets Type 1's drive for improvement. A natural pairing from the body triad — explore what draws them together and where the friction lives.",
    url: "https://thyself.app/compatibility/enneagram-9/enneagram-1",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-9/enneagram-1" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 9 and 1 Compatibility — The Peacemaker & The Reformer",
  description:
    "A full analysis of the Enneagram Type 9 and Type 1 relationship: shared body triad dynamics, how acceptance meets integrity, where tensions arise, and how this pairing grows together.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-9/enneagram-1",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-9/enneagram-1" },
};

export default function Enneagram9and1Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>9</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>1</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 9 &amp; Type 1</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both live in the body triad — both carry a complex, often unacknowledged relationship with anger. The Nine finds peace by merging; the One finds peace by improving. Together they form one of the Enneagram&rsquo;s most quietly powerful pairs.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">

          {/* Type Snapshots */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">
                  Nines seek inner peace and harmony. Their core strategy is to merge with others and their environment — to become agreeable, accommodating, and slow to assert their own needs. Anger is numbed, not felt. Their gift is a profound acceptance of people as they are.
                </p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 1</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">
                  Ones are driven by a need for correctness and integrity. They hold themselves — and eventually the world — to high standards. Anger is controlled and channeled into improvement. Their gift is a genuine commitment to ethics and doing what&rsquo;s right.
                </p>
              </div>
            </div>
          </section>

          {/* Why They Attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Type 9 and Type 1 are wing neighbors on the Enneagram circle — meaning they share an instinctual proximity and often recognize something familiar in each other. Many Nines have a strong 1-wing, and many Ones carry 9-wing qualities, so the pairing often feels surprisingly natural.
            </p>
            <p className="leading-relaxed text-gray-700">
              The One is drawn to the Nine&rsquo;s ease, warmth, and genuine lack of judgment. Being around a Nine lets the One relax the inner critic — the Nine accepts them before they&rsquo;ve earned it, which is a profound relief. The Nine, in turn, is drawn to the One&rsquo;s clarity of purpose and moral grounding. The One models the kind of purposeful engagement the Nine often struggles to inhabit. They hold different answers to the same underlying question: how do we live with what&rsquo;s imperfect?
            </p>
          </section>

          {/* Natural Synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Shared Body Triad Depth",
                  body: "Both types belong to the body (instinctual) triad and share a visceral, embodied quality of experience. They operate from gut-level knowing rather than pure analysis. This gives the relationship a grounded, real-world quality — they understand each other&rsquo;s need to feel settled before acting.",
                },
                {
                  title: "Complementary Relationship to Anger",
                  body: "Nines suppress anger to maintain peace; Ones control and redirect it toward improvement. Neither type is explosive or reactive at baseline. This shared anger-management style creates a relatively calm relational atmosphere — both prefer to work through tension quietly rather than combust.",
                },
                {
                  title: "Ethical Compatibility",
                  body: "Nines may be non-judgmental, but they are not ethically indifferent — they have a quiet moral compass. Ones care deeply about doing right. Both types want to live with integrity, just expressed differently: the Nine as fairness and acceptance, the One as correctness and improvement.",
                },
                {
                  title: "Stability and Steadiness",
                  body: "Neither type tends toward drama. The Nine provides warmth and equanimity; the One provides structure and follow-through. Together they build environments and routines that feel both reliable and caring — homes, projects, and partnerships that work.",
                },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          {/* Core Tensions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Tensions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Acceptance vs. Improvement",
                  body: "The Nine&rsquo;s deepest stance is that people and things are okay as they are. The One&rsquo;s deepest stance is that things can and should be better. In daily life this creates friction: the Nine experiences the One&rsquo;s constant correcting as exhausting and implicitly critical; the One experiences the Nine&rsquo;s easy acceptance as complacency or avoidance.",
                },
                {
                  title: "Inertia vs. Action",
                  body: "Nines struggle with inertia — the pull toward comfort, routine, and not rocking the boat. Ones have strong energy for reform and movement. The One may become frustrated by the Nine&rsquo;s slow pace of change; the Nine may experience the One&rsquo;s urgency as relentless and draining.",
                },
                {
                  title: "Conflict Avoidance vs. Confrontation",
                  body: "When the One is displeased, they tend to express it — crisply, clearly, sometimes sharply. When the Nine is displeased, they tend not to express it at all, going along until resentment quietly accumulates. This mismatch means conflict rarely gets fully resolved: the One thinks it was discussed; the Nine never voiced the real objection.",
                },
                {
                  title: "Critical Voice",
                  body: "Ones carry a highly active inner critic — and sometimes that voice turns outward. The Nine, who is particularly sensitive to disapproval and needs to feel accepted, can be deeply wounded by the One&rsquo;s corrective impulse, even when the One intends it as helpful feedback rather than rejection.",
                },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-red-100 bg-red-50 p-6">
                  <h3 className="mb-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: card.body }} />
                </div>
              ))}
            </div>
          </section>

          {/* Growth Edges */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth Edges</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {[
                    "Learning to express preferences and displeasure in real time rather than letting resentment silently accumulate",
                    "Using the One&rsquo;s clarity and directness as a model — practicing asserting needs without over-accommodating",
                    "Developing their own sense of purpose independent of the relationship, so they don&rsquo;t simply merge with the One&rsquo;s agenda",
                    "Recognizing that healthy conflict strengthens rather than destroys connection",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 1 grows by</p>
                <ul className="space-y-3">
                  {[
                    "Learning to receive the Nine&rsquo;s easy acceptance without converting it into an opportunity to self-criticize",
                    "Tempering the critical voice — distinguishing between helpful feedback and a relentless standard the Nine can&rsquo;t meet",
                    "Practicing the Nine&rsquo;s gift: allowing things to be good enough without requiring further improvement",
                    "Recognizing that the Nine&rsquo;s pace is not laziness but a different relationship to time and urgency",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Instinctual Variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <p className="mb-6 text-sm text-gray-500">The instinctual subtype (self-preservation, social, or sexual/one-to-one) profoundly shapes how Type 9 and Type 1 show up in relationship. Same types, different subtypes — very different experience.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Self-Preservation",
                  body: "SP 9 and SP 1 are both oriented toward routines, structure, and physical security. This pairing can build a deeply stable domestic life — but both may over-focus on practical concerns while emotional depth gets delayed or avoided. The relationship may feel comfortable but emotionally underworked.",
                },
                {
                  label: "Social",
                  body: "Social 9 values group harmony; social 1 cares about doing right by a community or cause. This is a highly functional pairing for shared projects and social commitments — both feel responsible to something larger. The risk is over-extending outward and under-attending to the dyad itself.",
                },
                {
                  label: "Sexual / One-to-One",
                  body: "SX 9 merges intensely with whoever they love; SX 1 brings passionate conviction and idealism to close relationships. This combination can be electric — but the One&rsquo;s high standards meet the Nine&rsquo;s deep need to feel fully accepted, creating a volatile loop if the One criticizes and the Nine retreats.",
                },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">{card.label}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* At Their Best */}
          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">At Their Best</h2>
            <p className="leading-relaxed text-gray-700">
              When both types are growing, the 9+1 pairing becomes a study in graceful complementarity. The Nine teaches the One how to rest in the goodness of what already is — that not everything needs fixing, that presence itself is a form of love. The One teaches the Nine how to stand for something, to let discomfort catalyze action rather than numbing it. Together they build lives and relationships that are both principled and peaceful: structured enough to function, warm enough to feel like home. The body triad dynamic means they understand each other&rsquo;s quiet wisdom without needing to explain it.
            </p>
          </section>

          {/* Practical Suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Create safe containers for disagreement",
                  body: "The Nine needs to know that expressing disagreement won&rsquo;t create rupture; the One needs feedback from the Nine to avoid assuming silence means agreement. Establish a low-stakes ritual (a weekly check-in, a walk) where expressing minor grievances is expected and celebrated rather than avoided.",
                },
                {
                  num: "02",
                  title: "Distinguish feedback from criticism",
                  body: "Ones are often genuinely helpful when they point out errors — but impact doesn&rsquo;t equal intent. Practice framing improvements as invitations rather than corrections. Ask before advising: &ldquo;Can I share something I noticed?&rdquo; gives the Nine agency to receive it.",
                },
                {
                  num: "03",
                  title: "Honor the Nine&rsquo;s pace without eliminating momentum",
                  body: "Nines need time to wake up to priorities — rushing them produces paralysis, not speed. Ones can help by breaking large goals into smaller steps and celebrating movement, not just completion. The Nine&rsquo;s steadiness, once engaged, becomes a genuine asset.",
                },
                {
                  num: "04",
                  title: "Explore your shared body-triad anger",
                  body: "Both types have a complex relationship with anger: the Nine numbs it, the One controls it. Naming this shared dynamic — together, with curiosity rather than blame — can be profoundly releasing for both. Neither needs to be the &lsquo;angry one&rsquo;; both can learn to feel and express frustration before it either implodes or erupts.",
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 rounded-2xl border border-gray-100 p-6">
                  <span className="shrink-0 text-2xl font-bold text-gray-200">{item.num}</span>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: item.body }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore These Types</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" },
                { label: "Type 1 — The Reformer", href: "/enneagram/type-1" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          {/* More Compatibility */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" },
                { label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" },
                { label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: colorA }}>
            <h2 className="mb-3 text-2xl font-bold">Understand your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment. 15 minutes, no email required. Grounded in Ichazo and Naranjo&rsquo;s original framework — not pop-psychology quizzes.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color: colorA }}>Start the assessment</Link>
          </section>

        </div>
      </main>
    </>
  );
}
