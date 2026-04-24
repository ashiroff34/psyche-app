import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 8;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 8 and 9 Compatibility — The Challenger & The Peacemaker | Thyself",
  description:
    "Explore the Enneagram Type 8 and Type 9 compatibility. Wing neighbors in the body triad — the Eight&rsquo;s force meets the Nine&rsquo;s ease. Full analysis of this classic complementary pairing, the conflict-avoidance tension, and how both types grow.",
  openGraph: {
    title: "Enneagram 8 and 9 Compatibility — The Challenger & The Peacemaker",
    description: "Type 8 and Type 9 are wing neighbors in the body triad — the Eight advances, the Nine flows. One of the Enneagram&rsquo;s most naturally complementary pairings, with a defining tension around conflict and expression.",
    url: "https://thyself.app/compatibility/enneagram-8/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-8/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 8 and 9 Compatibility — The Challenger & The Peacemaker",
  description: "A full analysis of the Enneagram Type 8 and Type 9 relationship: body triad wing connection, force and ease dynamics, conflict-avoidance tension, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-8/enneagram-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-8/enneagram-9" },
};

export default function Enneagram8and9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>8</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 8 &amp; Type 9</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Wing neighbors in the body triad — both are instinctual, both are grounded, and both carry a complex relationship with anger. The Eight charges forward; the Nine flows. One of the Enneagram&rsquo;s classic complementary pairings — and one with a defining tension that asks everything of both types.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 8</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Eights protect themselves through strength and control. They are direct, powerful, and deeply loyal to those who earn their trust. They move toward rather than away from confrontation — treating it as clarifying rather than threatening. Their gift is a fearless courage and passionate protection of those they love. Their shadow: they can bulldoze others&rsquo; boundaries and confuse control with safety.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Nines protect themselves through merging and accommodation. They are warm, accepting, and genuinely comfortable with the present. They move away from confrontation — treating it as a threat to peace. Their gift is an encompassing acceptance that can hold even the Eight&rsquo;s most intense energy without collapsing. Their shadow: they can go to sleep on their own needs and disappear into others&rsquo; agendas.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Eight is drawn to the Nine&rsquo;s steadiness and genuine warmth — two things the Eight rarely allows themselves to simply receive. The Nine isn&rsquo;t destabilized by the Eight&rsquo;s intensity or trying to outmaneuver them. For the Eight, who is always waiting for the next challenge to their power, the Nine&rsquo;s ease is profoundly restful. There is nothing to fight here.</p>
            <p className="leading-relaxed text-gray-700">The Nine is drawn to the Eight&rsquo;s strength, protection, and decisive presence. The Eight handles the world in a way that lets the Nine relax — someone else is managing the threats, making the decisions, and moving things forward. The Nine can simply be in the Eight&rsquo;s orbit and feel grounded rather than responsible for everything. Wing neighbors on the Enneagram, they share an instinctual depth and a body-based knowing that makes the connection feel visceral and real.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Body Triad Kinship", body: "Both types belong to the body triad — both are instinctual, grounded, and operate from gut-level knowing. They share a visceral, present-tense quality of experience that creates deep mutual recognition. Neither needs to explain themselves to the other in the way they might with head or heart triad types." },
                { title: "Force and Ease", body: "The Eight provides direction, energy, and momentum; the Nine provides steadiness, acceptance, and ease. Together they form a genuinely balanced pair — the Eight moves things forward, the Nine makes wherever they arrive feel like home. Neither has to sacrifice their core orientation to make the relationship work at its best." },
                { title: "Mutual Protection", body: "The Eight protects through strength and confrontation; the Nine protects through acceptance and emotional safety. Both types are fiercely protective of those they love — just in different registers. Together they surround each other and those around them with complementary forms of care." },
                { title: "The Nine Grounds the Eight", body: "The Eight&rsquo;s intensity can scatter everyone around them. The Nine&rsquo;s steadiness and genuine non-reactivity is one of the few things that actually grounds the Eight. The Eight can be full intensity around the Nine and not destroy anything — which is a rare and genuinely needed experience for the Eight." },
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
                { title: "Confrontation vs. Avoidance", body: "The Eight moves toward conflict as a natural mode of engagement — testing people, clearing the air, asserting reality. The Nine avoids conflict with everything they have, going silent, accommodating, or simply agreeing to stop the discomfort. The Eight interprets the Nine&rsquo;s silence as agreement or weakness. The Nine builds quiet resentment. When it finally surfaces — often explosively — the Eight is genuinely surprised." },
                { title: "Nine&rsquo;s Vanishing Act", body: "The Nine merges with whoever they love — and in an Eight-led relationship, this can mean the Nine disappears into the Eight&rsquo;s agenda, priorities, and social world entirely. The Nine loses themselves so gradually that neither partner notices until the Nine is either numb or resentful. The Eight may then discover they&rsquo;ve been in relationship with an echo, not a person." },
                { title: "Domination and Agency", body: "The Eight&rsquo;s natural mode is to lead, direct, and control. The Nine&rsquo;s natural mode is to accommodate. Without conscious attention, the Eight dominate by default and the Nine yields by default — creating a structural inequality that eventually exhausts the Nine and hollows out the relationship for the Eight, who needs a genuine equal to respect." },
                { title: "Anger in Two Registers", body: "Both types carry anger — the Eight expresses it immediately and fully; the Nine suppresses it until it has nowhere to go but out. These incompatible anger styles create a confusing dynamic: the Eight is direct and moves on; the Nine absorbs and explodes later. Both are bewildered by the other&rsquo;s timing." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 8 grows by</p>
                <ul className="space-y-3">
                  {["Recognizing that the Nine&rsquo;s silence is not agreement — actively creating space for the Nine to disagree safely", "Tempering confrontation style: the Eight&rsquo;s directness that feels normal to them lands as domination to the Nine", "Using the Nine&rsquo;s ease as a model for receiving rather than always driving — resting in what is rather than pushing for what&rsquo;s next", "Genuinely inviting the Nine&rsquo;s perspective before acting — not as performance but as real curiosity about a distinct other"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {["Voicing disagreement in real time rather than accumulating resentment until it becomes a crisis", "Maintaining a distinct self — developing their own agenda, preferences, and social world not subsumed by the Eight&rsquo;s", "Using the Eight&rsquo;s directness as a model: conflict voiced early is easier than conflict swallowed for months", "Recognizing that the Eight cannot see what the Nine won&rsquo;t say — the Eight cannot manage what they can&rsquo;t perceive"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 8 is more contained and territorial; SP 9 is more comfort-oriented and private. This can be a quietly powerful pairing — both protecting their own domains. The tension: SP 8 can still dominate without realizing it, and SP 9&rsquo;s inertia can frustrate the Eight&rsquo;s need for movement." },
                { label: "Social", body: "Social 8 uses power in service of groups and causes; social 9 cares deeply about group belonging and harmony. This combination can produce genuine community leadership — the Eight provides force and vision, the Nine provides inclusion and warmth. A natural team." },
                { label: "Sexual / One-to-One", body: "SX 8 brings passionate, all-or-nothing intensity; SX 9 merges completely with the beloved. This is one of the most bonded pairings possible — and one of the most at-risk for domination. The SX 8&rsquo;s intensity can overwhelm the SX 9&rsquo;s capacity to maintain a self. Both need to watch this dynamic consciously." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 8+9 pairing becomes one of the Enneagram&rsquo;s most grounded and genuinely powerful bonds. The Eight has found the one person who holds their intensity without flinching and doesn&rsquo;t need to compete or manage them — a profound rest. The Nine has found someone who makes them feel safe enough to find and voice their own desires, who actively wants to know what the Nine thinks and will actually listen. The Eight is softer — able to receive the Nine&rsquo;s warmth without armor. The Nine is more present — able to stay in contact rather than merging away. Together they move through the world with force and ease: the Eight&rsquo;s power directed by the Nine&rsquo;s wisdom, the Nine&rsquo;s peace activated by the Eight&rsquo;s courage.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Eight: create safe disagreement", body: "Tell the Nine explicitly: &ldquo;I want to know when you disagree with me. I won&rsquo;t take it personally. Push back.&rdquo; Then actually receive it without counter-attacking. The Eight&rsquo;s credibility on this grows through behavior over time — not one statement. The Nine needs evidence before they&rsquo;ll risk it." },
                { num: "02", title: "Nine: voice the small discomforts early", body: "The Nine&rsquo;s pattern is to let small resentments accumulate into something the Eight can&rsquo;t possibly anticipate. Practice naming discomfort when it&rsquo;s small: &ldquo;I&rsquo;d actually prefer something different.&rdquo; Small expressions prevent the large eruption neither partner wants." },
                { num: "03", title: "Explore the body triad anger together", body: "Both types carry anger — the Eight expresses it openly, the Nine suppresses it. Name this dynamic explicitly and build shared language for it. This is a case where the theory can do real practical work: both can recognize their own pattern and the other&rsquo;s, and neither has to be the &lsquo;angry one.&rsquo;" },
                { num: "04", title: "Build the Nine&rsquo;s independent life", body: "The Nine needs a domain of life that isn&rsquo;t organized around the Eight — friends, interests, projects. The Eight should actively encourage this rather than filling every space. A Nine with a distinct life is a Nine who can be a genuine other — and that is what the Eight actually needs to respect." },
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
              {[{ label: "Type 8 — The Challenger", href: "/enneagram/type-8" }, { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "5 + 8", href: "/compatibility/enneagram-5/enneagram-8" }, { label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" }].map((link) => (
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
