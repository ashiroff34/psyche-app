import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 7;
const typeB = 9;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 7 and 9 Compatibility — The Enthusiast & The Peacemaker | Thyself",
  description:
    "Explore the Enneagram Type 7 and Type 9 compatibility. Both belong to the positive outlook triad — both redirect attention away from pain. Full analysis of their natural warmth, shared avoidance pattern, and how this pairing deepens.",
  openGraph: {
    title: "Enneagram 7 and 9 Compatibility — The Enthusiast & The Peacemaker",
    description: "Type 7 races toward pleasure; Type 9 settles into comfortable ease. Both avoid looking directly at difficulty — a naturally joyful pairing with a shared shadow around depth and commitment.",
    url: "https://thyself.app/compatibility/enneagram-7/enneagram-9",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-7/enneagram-9" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 7 and 9 Compatibility — The Enthusiast & The Peacemaker",
  description: "A full analysis of the Enneagram Type 7 and Type 9 relationship: shared positive outlook stance, natural warmth, the mutual avoidance pattern, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-7/enneagram-9",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-7/enneagram-9" },
};

export default function Enneagram7and9Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>7</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>9</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 7 &amp; Type 9</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              Both types belong to the positive outlook triad — both reframe difficulty rather than confronting it. The Seven runs toward pleasure and possibility; the Nine settles into comfortable ease and harmony. Together they create a naturally joyful, low-friction relationship. The shared shadow: neither wants to go deep into what&rsquo;s hard.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 7</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Sevens are driven by a desire for joy, freedom, and experience. They are enthusiastic, quick-minded, and gifted at generating possibilities and keeping life stimulating. They avoid pain and limitation by staying in motion and reframing difficulties as adventures. Their gift is a genuine capacity for joy. Their shadow is scattered energy, avoidance of depth, and difficulty with sustained commitment.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 9</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Nines seek inner peace and avoid conflict by merging with others. They are warm, accepting, and easy to be with — genuinely comfortable with the present moment in a way most types envy. Their gift is an encompassing acceptance. Their shadow is inertia, self-forgetting, and an avoidance of their own needs and desires in service of keeping things smooth.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Seven and Nine attract through a shared orientation toward the pleasant and a shared aversion to what is heavy or difficult. The Seven&rsquo;s enthusiasm is genuinely infectious, and the Nine is one of the few types who can simply enjoy it without feeling overwhelmed or obligated to match it. The Nine&rsquo;s receptivity and ease are exactly what the Seven&rsquo;s restless energy needs — someone who can be still without making the Seven feel guilty for moving.</p>
            <p className="leading-relaxed text-gray-700">The Nine is drawn to the Seven&rsquo;s energy and lightness — the Seven brings the world to the Nine, offering new experiences that the Nine might never seek out alone. The Seven finds in the Nine a grounding presence: someone who makes wherever they are feel like enough. This is rare for a Seven, who usually needs the next thing to feel satisfied.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Positive Outlook", body: "Both types are part of the positive outlook triad — both tend to emphasize the good, reframe the difficult, and maintain an optimistic surface. This creates a genuinely pleasant relational environment. Neither type is inclined to dwell, catastrophize, or burden the relationship with persistent negativity." },
                { title: "Complementary Energies", body: "The Seven generates momentum and ideas; the Nine provides the steady presence and receptivity that makes momentum sustainable. The Seven can expand the Nine&rsquo;s world; the Nine can provide the anchor that the Seven&rsquo;s scattered energy actually needs. Together they move through life with both enthusiasm and ease." },
                { title: "Low Conflict Baseline", body: "Neither type is naturally combative. The Seven moves past conflict quickly by reframing or moving on; the Nine avoids it through accommodation. The result is a relationship with remarkably few blow-ups and a consistently warm emotional temperature. Disagreements tend to dissolve quickly." },
                { title: "Shared Enjoyment", body: "Both types are genuinely good at enjoying life — the Seven through variety and stimulation, the Nine through comfortable presence and sensory ease. Together they can build a life rich in pleasure, experience, and quiet contentment. Vacations, shared hobbies, and good food all feel like natural language for this pairing." },
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
                { title: "Shared Avoidance", body: "The primary risk of this pairing is that both types&rsquo; avoidance strategies reinforce each other. The Seven escapes difficulty by moving toward what&rsquo;s next; the Nine escapes it by going numb to it. Together, they can successfully avoid confronting important problems — finances, resentments, unmet needs — for a very long time. The relationship can feel wonderful while running on fumes." },
                { title: "Seven&rsquo;s Pace vs. Nine&rsquo;s Inertia", body: "The Seven lives at high velocity — always planning the next experience, generating the next idea, moving on before things go stale. The Nine is pulled toward inertia — comfortable routines, the current thing, the steady state. The Seven may feel the Nine is dragging them down; the Nine may feel exhausted by the Seven&rsquo;s perpetual motion." },
                { title: "Depth and Commitment", body: "The Seven resists limitation and sustained depth; the Nine, once merged, resists change. In a relationship, the Seven may want to keep options open and explore; the Nine wants to settle in. Both can produce a relationship that is comfortable but never quite goes deep enough to feel truly intimate — pleasure without real vulnerability." },
                { title: "Nine&rsquo;s Invisible Resentment", body: "The Nine accommodates the Seven&rsquo;s agenda without complaint. Over time this produces quiet resentment the Nine rarely voices directly. When it finally surfaces — often after years — the Seven is blindsided, having received no signal that anything was wrong. The Seven&rsquo;s sensitivity to criticism then makes the Nine&rsquo;s rare expression of discontent feel disproportionately large." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 7 grows by</p>
                <ul className="space-y-3">
                  {["Staying with difficulty rather than reframing it — allowing the Nine&rsquo;s steadiness to model presence", "Slowing down enough to discover what the Nine actually wants, rather than assuming agreement", "Practicing depth in the relationship: returning to the same conversation, the same project, the same place — going deeper rather than broader", "Recognizing the Nine&rsquo;s quiet resentment as signal: silence is not agreement"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 9 grows by</p>
                <ul className="space-y-3">
                  {["Voicing preferences and resentments in real time rather than storing them until they overflow", "Using the Seven&rsquo;s enthusiasm as permission to want things — to bring their own desires into the relationship", "Practicing engagement with difficulty rather than numbing out when things get hard", "Asserting a distinct self rather than simply flowing along with the Seven&rsquo;s agenda"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 7 and SP 9 are both oriented toward comfort and security — but the Seven&rsquo;s version involves more acquisition and variety. This pairing can be very pleasant domestically, though the Seven&rsquo;s appetite for more may conflict with the Nine&rsquo;s contentment with enough." },
                { label: "Social", body: "Social 7 and social 9 are both community-oriented. The Seven brings energy and ideas; the Nine brings warmth and inclusion. This pairing shines in social settings — together they make a genuinely welcoming social environment. The risk is over-extending outward and under-investing in the dyad." },
                { label: "Sexual / One-to-One", body: "SX 7 brings intense fascination and desire for peak experiences; SX 9 merges completely with whoever they love. This can be a deeply bonded pairing — the Seven&rsquo;s enthusiasm meets the Nine&rsquo;s total receptivity. The challenge: the Seven may eventually want more intensity than the Nine can generate, and the Nine may lose themselves entirely in the Seven&rsquo;s world." },
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
            <p className="leading-relaxed text-gray-700">When both types are growing, the 7+9 pairing becomes one of the Enneagram&rsquo;s most genuinely joyful and grounded combinations. The Seven has learned to stay — to discover that depth and commitment reveal pleasures that perpetual motion cannot reach. The Nine has found their voice — bringing their own desires, pace, and needs into the relationship rather than simply flowing along. Together they build a life that moves without losing its center: enthusiastic enough to keep growing, settled enough to feel like home. Neither type is performing happiness — they&rsquo;ve found a way to actually live it.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Build in depth rituals", body: "Both types drift toward surface. Create intentional containers for depth: a weekly dinner with phones put away, a shared journaling practice, an annual retreat. The structure gives both permission to go somewhere they might not wander into naturally." },
                { num: "02", title: "Nine: name one want per day", body: "Make it a practice to voice one preference — any preference, however small — every day. What to eat, where to walk, what to watch. Each small act of preference-naming is a vote for your own existence in the relationship, and it keeps the Seven from unknowingly dominating the agenda." },
                { num: "03", title: "Seven: slow down for the check-in", body: "The Nine&rsquo;s resentment accumulates silently. Build in a standing, low-stakes check-in where the Nine can voice small discomforts before they become large ones. Make it safe by not immediately fixing or reframing what you hear — just receive it." },
                { num: "04", title: "Stay with one thing longer than feels comfortable", body: "Both types benefit from the practice of depth. Pick one shared project, conversation, or experience and return to it repeatedly. The Seven discovers what the Seven fears — that depth is more satisfying than variety. The Nine discovers what presence actually asks of them." },
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
              {[{ label: "Type 7 — The Enthusiast", href: "/enneagram/type-7" }, { label: "Type 9 — The Peacemaker", href: "/enneagram/type-9" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 9", href: "/compatibility/enneagram-4/enneagram-9" }, { label: "9 + 1", href: "/compatibility/enneagram-9/enneagram-1" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }].map((link) => (
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
