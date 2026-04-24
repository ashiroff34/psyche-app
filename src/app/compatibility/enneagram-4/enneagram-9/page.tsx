import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 4;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 4 and 9 Compatibility — The Individualist & The Peacemaker | Thyself",
  description:
    "Explore the Enneagram Type 4 and Type 9 compatibility. The Individualist and the Peacemaker share the withdrawn stance — both turn inward, both carry a deep longing for something that feels just out of reach. Full analysis of their emotional connection, tensions, and growth path.",
  openGraph: {
    title: "Enneagram 4 and 9 Compatibility — The Individualist & The Peacemaker",
    description:
      "Type 4&rsquo;s longing for depth meets Type 9&rsquo;s gift for merging. Both withdrawn types — explore what draws them together and where their shared inward pull becomes a trap.",
    url: "https://thyself.app/compatibility/enneagram-4/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-4/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 4 and 9 Compatibility — The Individualist & The Peacemaker",
  description:
    "A full analysis of the Enneagram Type 4 and Type 9 relationship: the withdrawn triad bond, emotional depth vs. emotional peace, where they nourish each other, and where their avoidance reinforces itself.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-4/enneagram-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-4/enneagram-9" },
};

export default function Enneagram4and9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>4</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 4 &amp; Type 9</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both types belong to the withdrawn stance — they turn inward rather than outward when under stress. The Four brings emotional intensity and longing; the Nine brings acceptance and stillness. When it works, it&rsquo;s a sanctuary. When it doesn&rsquo;t, two people retreat in parallel.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">

          {/* Type Snapshots */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 4</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">
                  Fours are defined by a search for identity and authentic feeling. They live in the emotional interior, drawn toward what is meaningful, melancholic, or beautifully flawed. They long to be deeply known and fear being ordinary. Their gift is depth — an unmatched ability to sit with complexity and create beauty from pain.
                </p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">
                  Nines seek harmony and inner peace. They merge with others rather than asserting a separate agenda. Their emotional life is vast but often quiet — they feel deeply but rarely surface those feelings unless the environment makes it safe. Their gift is an encompassing acceptance that can hold even the Four&rsquo;s most turbulent inner weather.
                </p>
              </div>
            </div>
          </section>

          {/* Why They Attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              The Four and Nine share the withdrawn stance — both instinctively move inward rather than toward others (like Two and Three) or against them (like Eight). This creates an immediate recognition: they&rsquo;re both people who understand what it means to live in a rich interior life that others sometimes can&rsquo;t access or appreciate.
            </p>
            <p className="leading-relaxed text-gray-700">
              The Four is specifically drawn to the Nine&rsquo;s quality of non-judgmental presence. The Nine doesn&rsquo;t flinch at the Four&rsquo;s emotional intensity — they absorb it without alarm or withdrawal. For the Four, who fears being too much for others, this is a rare and healing experience. The Nine, in turn, is drawn to the Four&rsquo;s emotional courage and depth. The Four models a willingness to feel and name what is real that the Nine often longs for but suppresses. The Four makes the Nine feel it&rsquo;s okay to have wants and feelings of their own.
            </p>
          </section>

          {/* Natural Synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Shared Withdrawn Stance",
                  body: "Both types orient inward under stress rather than seeking external stimulation or confrontation. This creates a relationship that has room for solitude, interiority, and quiet — neither partner is constantly demanding external engagement. They can exist in comfortable parallel, which feels nourishing rather than alienating.",
                },
                {
                  title: "Emotional Safety",
                  body: "The Nine&rsquo;s deep non-judgmental acceptance creates exactly the emotional safety the Four needs to express their full inner life. The Four doesn&rsquo;t need to perform health or suppress the difficult emotions — the Nine stays present. Meanwhile, the Four&rsquo;s depth and sincerity signal to the Nine that real emotional honesty is safe here.",
                },
                {
                  title: "Aesthetic and Meaning Sensitivity",
                  body: "Both types are drawn to what is meaningful over what is merely efficient. Nines often have latent aesthetic sensibilities that remain undeveloped; Fours draw that out. They can build a shared world rich in beauty, creative projects, meaningful conversation, and a refusal to reduce life to utility.",
                },
                {
                  title: "Low Drama Potential at Health",
                  body: "When both are growing, the Four&rsquo;s emotional expression is grounded rather than amplified, and the Nine&rsquo;s acceptance is present rather than numb. The pairing becomes one of remarkable equanimity — the Four is less volatile in the presence of genuine acceptance; the Nine is more awake and engaged in the presence of emotional depth.",
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
                  title: "Longing vs. Acceptance",
                  body: "The Four&rsquo;s core orientation is longing — for what&rsquo;s missing, for the ideal, for deeper connection. The Nine&rsquo;s orientation is acceptance of what is. At their worst, the Four experiences the Nine as spiritually asleep — incapable of the longing that makes life feel real. The Nine experiences the Four as never satisfied — always reaching for something that keeps the present moment from being enough.",
                },
                {
                  title: "Emotional Flooding vs. Emotional Numbing",
                  body: "Fours are prone to emotional flooding — getting consumed by the intensity of their inner life. Nines are prone to emotional numbing — going to sleep on their own needs and feelings. When the Four floods, the Nine can go even more numb to cope. When the Nine goes numb, the Four may escalate emotionally to try to create contact. Each response reinforces the other&rsquo;s strategy.",
                },
                {
                  title: "The Disappearing Act",
                  body: "Both types can disappear — the Four into melancholy and self-absorption, the Nine into routines, distractions, and comfortable inertia. When both withdraw simultaneously, the relationship can stagnate into a quiet, unspoken disconnection that neither knows how to break and both are reluctant to name.",
                },
                {
                  title: "Agenda and Identity",
                  body: "Nines can unconsciously subordinate their own preferences, tastes, and goals to whoever they&rsquo;re with. In a 4+9 pairing, the Nine may adopt the Four&rsquo;s aesthetic identity, interests, and worldview so thoroughly that their own self becomes hard to locate. Over time this creates resentment — or a relationship that works only as long as the Four sets the agenda.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 4 grows by</p>
                <ul className="space-y-3">
                  {[
                    "Recognizing the Nine&rsquo;s presence and acceptance as a real form of love — not just neutral passivity",
                    "Resisting the impulse to interpret the Nine&rsquo;s calm as lack of depth or caring",
                    "Practicing the Nine&rsquo;s gift: allowing what is present to be enough without searching for what&rsquo;s missing",
                    "Making space for the Nine&rsquo;s preferences, opinions, and desires — actively drawing them out rather than assuming agreement",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {[
                    "Developing and asserting their own aesthetic preferences, values, and desires rather than reflexively adopting the Four&rsquo;s",
                    "Practicing emotional honesty even when it introduces tension — naming what they feel before resentment accumulates",
                    "Using the Four&rsquo;s emotional courage as a model: feelings named are not a threat to harmony",
                    "Distinguishing genuine acceptance from numbness or avoidance — presence requires being awake to what&rsquo;s actually happening",
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
            <p className="mb-6 text-sm text-gray-500">The instinctual subtype (self-preservation, social, or sexual/one-to-one) significantly changes how Type 4 and Type 9 experience each other. Same types, very different relational textures.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Self-Preservation",
                  body: "SP 4 and SP 9 are both relatively introverted and self-contained. They can build a rich private world together — but both may under-reach for connection, leading to a relationship of parallel lives. Emotional depth remains unlocked because neither is inclined to push through surface comfort.",
                },
                {
                  label: "Social",
                  body: "Social 4 cares about cultural participation and being recognized for unique contribution; social 9 cares about group harmony and belonging. This can produce genuine creative collaboration — the Four brings vision, the Nine brings diplomatic presence. The friction emerges when the Four&rsquo;s need for distinction clashes with the Nine&rsquo;s preference to blend.",
                },
                {
                  label: "Sexual / One-to-One",
                  body: "SX 4 and SX 9 is one of the most intense pairings possible. The SX 4 craves deep merger and authentic contact; the SX 9 merges so completely that they can lose themselves. Initially this feels transcendent — finally someone who truly meets them. Over time the Nine may lose their own self entirely, and the Four may discover they&rsquo;ve merged with someone who is no longer a distinct other.",
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
              When both types are growing, the 4+9 pairing becomes a sanctuary of authentic emotional life. The Four is less tormented because genuine acceptance softens the longing — the Nine&rsquo;s presence is so complete that the absent ideal loses its grip. The Nine is more alive because the Four&rsquo;s depth keeps drawing out their own feelings, preferences, and desires. They build a shared world that is rich, unhurried, and aesthetically alive — full of meaningful conversation, creative work, and the particular comfort of two people who have seen each other&rsquo;s inner lives and stayed. Neither needs to perform. Both finally feel at home.
            </p>
          </section>

          {/* Practical Suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Name the withdrawal before it compounds",
                  body: "Both types retreat — the Four into melancholy, the Nine into inertia. When you notice both of you going quiet or distant, name it gently: &ldquo;I think we&rsquo;re both in our own worlds right now. Want to reconnect?&rdquo; A small naming breaks a pattern that can otherwise run for days.",
                },
                {
                  num: "02",
                  title: "Nine: practice having preferences out loud",
                  body: "Make it a practice to have and voice opinions — even small ones. What restaurant, what film, what color for the wall. The Four genuinely wants to know; they&rsquo;re not asking to be polite. Each preference the Nine articulates is an act of self-presence that strengthens the relationship.",
                },
                {
                  num: "03",
                  title: "Four: receive the Nine&rsquo;s presence as love",
                  body: "The Nine shows love through attention, steadiness, and staying. This may not look like the emotionally demonstrative contact the Four craves — but it is love. Practicing gratitude for the specific way the Nine loves (rather than grieving the way they don&rsquo;t) fundamentally shifts the relational atmosphere.",
                },
                {
                  num: "04",
                  title: "Create structure for depth",
                  body: "Left to their own devices, both types may let meaningful conversation get perpetually deferred. Build it in: a weekly dinner with phones away, a shared journaling practice, a standing creative project. The structure is not bureaucratic — it&rsquo;s permission. It makes depth feel less like an intrusion and more like an expected pleasure.",
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
                { label: "Type 4 — The Individualist", href: "/enneagram/type-4" },
                { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" },
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
                { label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" },
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
