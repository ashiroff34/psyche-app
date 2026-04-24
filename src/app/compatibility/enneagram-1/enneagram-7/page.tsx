import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 7;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 7 Compatibility — The Reformer & The Enthusiast | Thyself",
  description:
    "Explore the Enneagram Type 1 and Type 7 compatibility. The Reformer and the Enthusiast are connected by integration arrows — they represent two different answers to the same underlying fear. Full analysis of their opposites-attract dynamic, tensions, and growth path.",
  openGraph: {
    title: "Enneagram 1 and 7 Compatibility — The Reformer & The Enthusiast",
    description:
      "Type 1&rsquo;s discipline meets Type 7&rsquo;s exuberance. Connected by the Enneagram&rsquo;s integration lines — explore why this pairing both attracts and frustrates, and what they awaken in each other.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 7 Compatibility — The Reformer & The Enthusiast",
  description:
    "A full analysis of the Enneagram Type 1 and Type 7 relationship: integration line connection, opposites-attract dynamics, core tensions, and how both types grow through this pairing.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-7",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-7" },
};

export default function Enneagram1and7Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 1 &amp; Type 7</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              The One and Seven are connected by the Enneagram&rsquo;s integration lines — the One moves toward Seven in growth, the Seven disintegrates toward One under stress. They each carry what the other secretly wants: the One wants the Seven&rsquo;s freedom; the Seven wants the One&rsquo;s depth and follow-through.
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
                <p className="text-sm leading-relaxed opacity-90">Ones are driven by a need to do what is right and good. They hold themselves and the world to high standards, are disciplined and principled, and carry a persistent inner critic. Their gift is integrity — they follow through, they improve things, and they live by their values. Their shadow is rigidity and suppressed anger channeled into resentment.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 7</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sevens are driven by a desire for freedom, stimulation, and keeping options open. They are enthusiastic, quick-minded, and gifted at seeing possibility everywhere. They resist limitation and avoid pain by staying in motion. Their gift is joy and a capacity to reframe difficulty. Their shadow is scattered energy and an avoidance of depth and commitment.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">On the Enneagram circle, Type 1&rsquo;s integration (growth) point is Type 7 — meaning that when a One is healthy and expanding, they start to access the Seven&rsquo;s qualities: spontaneity, lightness, and the ability to enjoy life without it needing to be perfect first. This creates a deep, unconscious pull toward the Seven as a symbol of what psychological freedom looks like.</p>
            <p className="leading-relaxed text-gray-700">The Seven is drawn to the One&rsquo;s depth, integrity, and follow-through — qualities the Seven admires because they struggle with them. The One keeps their word; the Seven finds this remarkable and grounding. The One, meanwhile, finds the Seven&rsquo;s enthusiasm infectious — a relief from the relentless weight of the inner critic. Together they make each other feel more complete.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Complementary Energy", body: "The One&rsquo;s focused discipline complements the Seven&rsquo;s expansive enthusiasm. Together they can execute in ways neither does alone — the Seven generates ideas and energy; the One grounds them in reality and sees them through. Projects this pair takes on tend to be both inspired and completed." },
                { title: "Integration Line Connection", body: "Because the One integrates to Seven, the Seven in the relationship actually models the One&rsquo;s growth direction. Being around a healthy Seven shows the One what it feels like to relax the inner critic and experience life directly. This is a deeply developmental dynamic when both are growing." },
                { title: "Shared Idealism", body: "Both types are idealistic, just oriented differently. The One has ideals about how the world should be; the Seven has ideals about what life could feel like. They share a forward-looking orientation and a genuine desire to make things better — this common ground provides real intellectual and emotional resonance." },
                { title: "Head Triad and Body Triad Depth", body: "The Seven belongs to the head triad (5, 6, 7) — fear-based types who respond to anxiety through planning and anticipation. The One belongs to the body triad — anger-based types who respond through control. This cross-triad pairing brings perspectives that genuinely expand each other&rsquo;s range." },
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
                { title: "Discipline vs. Spontaneity", body: "The One plans, schedules, and holds structure as a virtue. The Seven resists structure as a form of limitation. This clash plays out in small daily negotiations — dinner plans, deadlines, household routines — and in larger ones about how to live. The One experiences the Seven as irresponsible; the Seven experiences the One as joyless." },
                { title: "Criticism and Sensitivity", body: "The One&rsquo;s inner critic often turns outward as corrective feedback. The Seven, who deeply resists criticism and limitation, can experience the One&rsquo;s correcting as a constant low-grade diminishment of their enthusiasm. The Seven may respond by deflecting or escaping; the One may escalate, baffled that improvement isn&rsquo;t welcome." },
                { title: "Depth vs. Breadth", body: "Ones tend toward depth — finishing what they start, sitting with difficulty, taking things seriously. Sevens tend toward breadth — starting many things, skimming when content gets heavy, keeping life fast and stimulating. This creates friction in creative projects, in conflict resolution (the Seven wants to move past it; the One wants to process it), and in how they spend time together." },
                { title: "Stress Cascades", body: "When the Seven disintegrates under stress, they move toward unhealthy One qualities: becoming critical, rigid, and perfectionistic — the very traits that irritate the Seven most about the One. The One may not recognize this as stress-behavior and simply feel more criticized. Meanwhile the stressed One can become increasingly resentful and controlling, which activates the Seven&rsquo;s escape impulse." },
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
                  {["Using the Seven&rsquo;s enthusiasm as an invitation to relax the inner critic and experience joy directly", "Distinguishing helpful feedback from compulsive correcting — asking whether the Seven asked for input", "Practicing the Seven&rsquo;s gift: allowing things to be unfinished and imperfect without it being a moral failure", "Recognizing that the Seven&rsquo;s lightness is not irresponsibility but a different, equally valid relationship to life"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 7 grows by</p>
                <ul className="space-y-3">
                  {["Using the One&rsquo;s follow-through as a model for completing what they start — depth over breadth", "Staying present when things get difficult rather than escaping into planning or positive reframing", "Recognizing the One&rsquo;s feedback as care, not control — slowing down to receive it rather than deflecting", "Practicing sitting with pain and limitation rather than immediately converting them into future possibilities"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <p className="mb-6 text-sm text-gray-500">The instinctual subtype significantly changes how Type 1 and Type 7 experience each other in practice.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 1 and SP 7 are both oriented toward personal security and comfort — but in very different ways. The SP 1 holds strict routines and standards; the SP 7 seeks comfort through variety and sensory pleasure. Daily life can feel like constant negotiation between structure and flow." },
                { label: "Social", body: "Social 1 and social 7 both care about contributing to the larger world — the One through reform, the Seven through inspiration and vision. This is a powerfully productive pairing for shared causes and creative work. The One provides accountability; the Seven provides energy and reach." },
                { label: "Sexual / One-to-One", body: "SX 1 brings intense idealism and passionate conviction to close relationships; SX 7 brings fascination and an appetite for depth. This combination can be electric — both types are looking for something real and meaningful. The Seven&rsquo;s depth in the sx subtype meets the One&rsquo;s demand for authenticity in a way that other Seven subtypes may not." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 1+7 pairing becomes genuinely transformative. The One has accessed the Seven&rsquo;s gift — moving through life with spontaneity and joy, letting the present moment be enough without requiring it to be perfected first. The Seven has accessed the One&rsquo;s gift — staying with things, going deep, bringing their enormous energy into sustained commitment rather than perpetual possibility. Together they build a life that is both principled and joyful, both structured and alive. The One laughs more. The Seven finishes things. Neither was alone capable of both.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Separate feedback from criticism", body: "The One gives input as a form of care; the Seven receives it as a limitation. Before offering feedback, ask: &ldquo;Can I share something I noticed?&rdquo; This gives the Seven agency and shifts the energy from correcting to offering." },
                { num: "02", title: "Seven: finish one thing per week", body: "Pick one project, one conversation, one commitment and see it through to completion. Let this be your practice. The One notices follow-through above nearly everything else — and you&rsquo;ll discover your own satisfaction in depth that breadth can&rsquo;t provide." },
                { num: "03", title: "Schedule unstructured time", body: "Build planned spontaneity into the relationship. A designated &ldquo;no agenda Saturday&rdquo; gives the One permission to release control and the Seven enough of a container to actually show up for it. Neither too rigid nor too shapeless." },
                { num: "04", title: "Name the integration line", body: "When things are going well, the One becomes genuinely lighter — more like the Seven. Tell each other: &ldquo;I notice you&rsquo;re more free today&rdquo; / &ldquo;I notice you stayed with it today.&rdquo; Naming the growth as it happens reinforces it and makes the dynamic conscious." },
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
              {[{ label: "Type 1 — The Reformer", href: "/enneagram/type-1" }, { label: "Type 7 — The Enthusiast", href: "/enneagram/type-7" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" }, { label: "1 + 4", href: "/compatibility/enneagram-1/enneagram-4" }, { label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }].map((link) => (
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
