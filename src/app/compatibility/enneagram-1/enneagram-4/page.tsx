import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 4;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 4 Compatibility — The Reformer & The Individualist | Thyself",
  description:
    "Explore the Enneagram Type 1 and Type 4 compatibility. The Reformer and the Individualist share idealism and self-criticism — but directed differently. Full analysis of their emotional depth, the judgment vs. sensitivity tension, and the growth each awakens in the other.",
  openGraph: {
    title: "Enneagram 1 and 4 Compatibility — The Reformer & The Individualist",
    description:
      "Both Type 1 and Type 4 carry an inner image of how things should be — one directed at the world, one at the self. A pairing of shared idealism, a complex stress-line connection, and real depth.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-4",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-4" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 4 Compatibility — The Reformer & The Individualist",
  description:
    "A full analysis of the Enneagram Type 1 and Type 4 relationship: shared idealism, the stress-line dynamic, the judgment vs. sensitivity tension, and how both types grow in this pairing.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-4",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-4" },
};

export default function Enneagram1and4Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>1</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>4</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 1 &amp; Type 4</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both the One and the Four carry an ideal image of how things should be — the One directs it outward toward the world, the Four directs it inward toward the self and the relationship. Shared idealism, shared self-criticism, and a connection through the Enneagram&rsquo;s stress line that makes this pairing unusually revealing.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 1</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Ones are driven by a need to do what is right and to improve the world around them. They are principled, organized, and self-disciplined, with a relentless inner critic that holds them to a standard that is rarely quite met. Their gift is integrity and follow-through. Under stress they move toward Type 4: becoming moody, self-critical, and emotionally withdrawn in ways that can surprise those around them.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 4</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Fours are driven by a search for identity and authentic feeling. They live in the emotional interior, are drawn toward what is meaningful or melancholic, and carry a sense of being fundamentally different or flawed. Their gift is emotional depth and the ability to create beauty from pain. Under stress they move toward Type 2: becoming clingy, people-pleasing, and emotionally demanding.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The One and Four share a quality of idealism and dissatisfaction that creates immediate recognition. Both carry an internal image of how things should be — a standard the world rarely meets. The One applies this to ethics and external reality; the Four applies it to emotional authenticity and the relationship itself. They recognize in each other the burden of caring deeply in a world that often doesn&rsquo;t.</p>
            <p className="leading-relaxed text-gray-700">The Four is drawn to the One&rsquo;s integrity and moral clarity — the Four respects the One&rsquo;s refusal to compromise their values. The One is drawn to the Four&rsquo;s emotional depth and aesthetic sensibility — the One often suppresses their own emotional life under the demands of the inner critic, and the Four models what it looks like to actually feel things fully. There is a stress-line connection between these types (the One disintegrates toward Four), which means the One already has an unconscious familiarity with the Four&rsquo;s emotional territory.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Idealism and Depth", body: "Both types refuse to accept a shallow or mediocre version of life. They want things to be real, meaningful, and excellent. This shared orientation creates a relationship with high standards — both for the connection itself and for how they engage with work, art, and the world. They push each other toward better." },
                { title: "Aesthetic and Ethical Alignment", body: "Fours have strong aesthetic sensibilities; Ones care about doing things with integrity. Together these combine into a way of living that is both beautiful and principled. This pairing tends toward homes, creative projects, and relationships that are thoughtfully made rather than casually assembled." },
                { title: "Emotional Range", body: "The One&rsquo;s suppressed emotional life finds a safe container in the Four&rsquo;s acceptance of emotional complexity. The Four doesn&rsquo;t judge the One for their darker feelings — the Four has been there too. This allows Ones to access and express an emotional range they often keep tightly controlled elsewhere." },
                { title: "Integrity as Common Ground", body: "Both types have strong inner standards about being genuine. Neither is comfortable with pretense, social performance, or dishonesty. Their shared commitment to authenticity — expressed differently — gives the relationship a quality of real truth-telling that both find rare and valuable." },
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
                { title: "Judgment vs. Sensitivity", body: "The One&rsquo;s corrective impulse — genuinely well-intentioned — can land catastrophically with a Four. The Four is exquisitely sensitive to criticism and particularly to anything that implies they are fundamentally wrong or flawed. The One may experience the Four as thin-skinned; the Four may experience the One as relentlessly critical. Both are right about what they&rsquo;re perceiving." },
                { title: "Emotional Flooding vs. Emotional Control", body: "The One controls and suppresses difficult emotions — particularly anger and sadness — in service of functioning. The Four is prone to being flooded by their inner life. The One may find the Four&rsquo;s emotional intensity destabilizing or indulgent. The Four may experience the One&rsquo;s emotional containment as cold or unavailable." },
                { title: "The Stress-Line Dynamic", body: "Because the One&rsquo;s stress direction is Type 4, a stressed One can suddenly exhibit Four-like behavior: moody, self-critical, withdrawn, and melancholic. For the Four, living with a stressed One can feel like being with two different people. The behaviors the One shows under stress are the Four&rsquo;s everyday normal — which creates an unusual and sometimes uncanny recognition." },
                { title: "Order vs. Feeling", body: "Ones tend toward structure, routine, and organization. Fours tend toward following the emotional tide of the moment — productive when inspired, withdrawn when melancholy. The One may experience the Four as unreliable or self-indulgent; the Four may experience the One&rsquo;s structure as stifling and joyless." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 1 grows by</p>
                <ul className="space-y-3">
                  {["Recognizing that the Four&rsquo;s emotional intensity is not drama but genuine experience that deserves full presence", "Softening the inner critic&rsquo;s outward projection — ask before advising; distinguish helpful from compulsive correcting", "Using the Four&rsquo;s emotional world as a model for accessing their own suppressed feelings", "Recognizing the stress-line pattern: when they become moody and self-critical, they&rsquo;re in Four-like territory — not their worst self, but their growing edge"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 4 grows by</p>
                <ul className="space-y-3">
                  {["Distinguishing the One&rsquo;s feedback from rejection — the One critiques what they care about", "Practicing the One&rsquo;s gift: acting even when the feeling isn&rsquo;t quite right, showing up even on the gray days", "Anchoring their identity in something beyond the present emotional state — the Four&rsquo;s sense of self doesn&rsquo;t need to be reinvented every morning", "Expressing needs directly rather than through emotional tone shifts that leave the One guessing"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <p className="mb-6 text-sm text-gray-500">The instinctual subtype significantly changes how Type 1 and Type 4 experience each other in practice.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 1 holds tight routines and standards; SP 4 suffers quietly and often sublimates their emotional needs. This pairing can be contained and functional, but emotionally underworked. The SP 4&rsquo;s unexpressed suffering may not register with the practically-focused SP 1." },
                { label: "Social", body: "Social 1 cares about justice and the larger community; social 4 cares about meaning and contribution through culture and creative life. This can be a powerfully aligned pairing — both are working toward something beyond themselves, and the Four&rsquo;s aesthetic vision meets the One&rsquo;s capacity to execute." },
                { label: "Sexual / One-to-One", body: "SX 1 brings passionate idealism and a desire for perfection in the relationship; SX 4 brings intense emotional hunger and a need for deep authentic contact. This is one of the most electrically charged subtypes combinations — both want something transcendent from the relationship. The risk: both can feel perpetually disappointed by an ideal that keeps receding." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 1+4 pairing produces a relationship of unusual richness and integrity. The One has found in the Four a companion who models emotional life without apology — and slowly the One&rsquo;s own inner world becomes accessible rather than controlled. The Four has found in the One a partner who shows up, follows through, and holds the structure that allows the Four&rsquo;s creative and emotional life to actually go somewhere. Neither is content with less than what&rsquo;s real. Both bring high standards and genuine depth. The result is a relationship that is both rigorous and beautiful — a rare combination that neither could build alone.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "One: ask before offering feedback", body: "The Four is particularly sensitive to unsolicited correction. Before pointing out what could be better, ask: &ldquo;Can I share something I noticed?&rdquo; This small shift transforms the same content from criticism to offering — and the Four&rsquo;s nervous system responds very differently." },
                { num: "02", title: "Four: name needs instead of expressing them atmospherically", body: "When the Four withdraws or shifts emotionally, the One often doesn&rsquo;t know why and may respond with correction rather than comfort. Naming what&rsquo;s happening directly — &ldquo;I&rsquo;m feeling hurt about earlier and I need reassurance&rdquo; — gives the One clear direction and prevents the guessing-game loop." },
                { num: "03", title: "Explore the stress-line together", body: "Both types are served by understanding that the One moves toward Four under stress. Naming it when it happens — &ldquo;I notice I&rsquo;m in Four-land today&rdquo; — removes the confusion and creates a shared language. For the Four, recognizing this pattern dissolves the impression that the One is suddenly a different person." },
                { num: "04", title: "Create shared aesthetic projects", body: "Both types are energized by meaningful creative work. Build something together — a home, a project, a practice — where the One&rsquo;s organizing intelligence and the Four&rsquo;s aesthetic sensibility both have genuine input. The creative collaboration often becomes the primary intimacy for this pairing." },
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
              {[{ label: "Type 1 — The Reformer", href: "/enneagram/type-1" }, { label: "Type 4 — The Individualist", href: "/enneagram/type-4" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }, { label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" }].map((link) => (
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
