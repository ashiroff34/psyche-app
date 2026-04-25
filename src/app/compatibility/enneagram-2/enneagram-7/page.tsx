import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 2;
const typeB = 7;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 2 and 7 Compatibility — The Helper & The Enthusiast | Thyself",
  description: "Explore the Enneagram Type 2 and Type 7 compatibility. Both belong to the positive outlook triad — both are warm, optimistic, and avoid looking directly at pain. Full analysis of their joyful dynamic, the neediness and independence tension, and how both grow.",
  openGraph: {
    title: "Enneagram 2 and 7 Compatibility — The Helper & The Enthusiast",
    description: "Type 2 gives care; Type 7 chases joy. Both positive outlook types — explore their warm dynamic, where neediness meets self-sufficiency, and what genuine freedom looks like between them.",
    url: "https://thyself.app/compatibility/enneagram-2/enneagram-7",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-2/enneagram-7" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 2 and 7 Compatibility — The Helper & The Enthusiast",
  description: "A full analysis of the Enneagram Type 2 and Type 7 relationship: shared positive outlook stance, neediness vs. independence, the joy-giving tension, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-2/enneagram-7",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-2/enneagram-7" },
};

export default function Enneagram2and7Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>2</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>7</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 2 &amp; Type 7</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Both types belong to the positive outlook triad — both reframe difficulty and lead with warmth and generosity. The Two gives love; the Seven gives joy. Together they create a naturally exuberant, warm, and socially alive relationship. The friction arrives when the Two needs to be needed and the Seven doesn&rsquo;t need much at all.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 2</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Twos give love generously and need to feel needed in return. They are warm, perceptive, and oriented toward relationship as the primary meaning-making domain. Their shadow: when their giving goes unacknowledged or the relationship feels one-sided, they can become indirectly manipulative.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 7</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Sevens pursue joy, freedom, and possibility. They are enthusiastic, self-sufficient, and gifted at generating excitement and keeping life stimulating. Their shadow: they avoid limitation, depth, and commitment in ways that can leave meaningful relationships undersustained.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Two is drawn to the Seven&rsquo;s enthusiasm, warmth, and the sense that life with a Seven will be full of experience and joy. The Seven&rsquo;s positivity is infectious, and the Two finds a lightness in the Seven&rsquo;s company that their giving orientation doesn&rsquo;t always access on its own. The Seven makes the Two feel excited rather than needed — a refreshing change.</p>
            <p className="leading-relaxed text-gray-700">The Seven is drawn to the Two&rsquo;s warmth, attentiveness, and genuine care. The Two&rsquo;s giving creates an environment where the Seven feels supported and attended to without having to slow down enough to receive it consciously. Both types are in the positive outlook triad — both lead with warmth, both avoid dwelling on pain, and both have a natural social ease that makes early connection feel effortless.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Shared Positive Outlook", body: "Both types reframe difficulty and maintain an optimistic, forward-moving stance. They share a warmth and social ease that makes their relationship feel genuinely joyful rather than effortful. Neither type dwells, catastrophizes, or brings persistent heaviness to the relational atmosphere." },
                { title: "Warmth and Joy", body: "The Two provides care, attentiveness, and emotional warmth; the Seven provides enthusiasm, adventure, and delight. Together they create a relationship with both relational depth (from the Two&rsquo;s investment) and genuine joy (from the Seven&rsquo;s energy). This is a naturally high-vitality pairing." },
                { title: "Seven Helps Two Access Joy for Its Own Sake", body: "The Two&rsquo;s giving is often motivated by a need to be needed — joy as a means to feeling loved. The Seven experiences joy as an end in itself, freely and without agenda. The Seven models a relationship to pleasure and aliveness that the Two, with their giving orientation, can access through the Seven rather than having to earn." },
                { title: "Social Vitality", body: "Both types are socially skilled and relationally attuned. Together they are a naturally warm, socially alive pair — people are drawn to them, energized by them, and remember being around them. In social settings this pairing is consistently enjoyable for everyone involved." },
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
                { title: "Needed vs. Self-Sufficient", body: "The Two&rsquo;s sense of worth is tied to being needed. The Seven is constitutionally self-sufficient — they generate their own joy, plan their own adventures, and don&rsquo;t require caregiving. The Two may feel superfluous with a Seven who doesn&rsquo;t need them, and may start giving in ways designed to create dependency." },
                { title: "Depth vs. Breadth", body: "The Two orients toward relational depth — sustained intimacy, emotional honesty, meaningful history. The Seven orients toward breadth — variety, stimulation, new experiences. The Two may feel the Seven keeps the relationship stimulating but never quite deep. The Seven may feel the Two is pulling toward a density they find restrictive." },
                { title: "Giving and Receiving", body: "The Two gives and needs to receive acknowledgment. The Seven receives warmly but moves on quickly — they don&rsquo;t linger in appreciation. The Two&rsquo;s care may not register as significant to the Seven who is already planning the next thing. The Two&rsquo;s resentment builds; the Seven is genuinely surprised when it surfaces." },
                { title: "Commitment and Freedom", body: "The Two orients toward committed, deepening relationships. The Seven resists anything that feels like a limitation on freedom. Over time the Two may feel the Seven is not fully in; the Seven may feel the Two is pulling toward a depth of commitment that forecloses options. Both need to grow toward the other&rsquo;s orientation." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 2 grows by</p>
                <ul className="space-y-3">
                  {["Developing their own relationship to joy for its own sake — not as something earned through giving but as a birthright the Seven models", "Releasing the need for the Seven to need them — loving the Seven&rsquo;s self-sufficiency rather than working around it", "Asking for what they need explicitly rather than waiting for the Seven to intuit it", "Allowing the Seven&rsquo;s freedom to expand rather than contract — trusting that the Seven&rsquo;s enthusiasm for life includes enthusiasm for the relationship"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 7 grows by</p>
                <ul className="space-y-3">
                  {["Noticing and naming the Two&rsquo;s giving explicitly — pausing to acknowledge what the Two contributes rather than flowing through it", "Practicing sustained depth in the relationship — returning to the same conversation, staying present when things get heavy", "Using the Two&rsquo;s attentiveness as an invitation toward genuine intimacy rather than comfortable support", "Practicing commitment rather than keeping options open — the Two needs to feel chosen, not just convenient"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 2 and SP 7 are both oriented toward comfort, but in different registers. The SP 2 creates domestic comfort through giving; the SP 7 seeks variety and sensory stimulation. This can work well or create persistent low-level friction about how to spend time and resources." },
                { label: "Social", body: "Social 2 and social 7 are both community-oriented — the Two through service and belonging, the Seven through vision and inspiration. This is a natural power pairing for community building and social engagement. The Two warms; the Seven energizes. Together they mobilize groups effectively." },
                { label: "Sexual / One-to-One", body: "SX 2 brings passionate, focused giving to the beloved; SX 7 brings intense fascination and appetite for peak experience. This can be a deeply bonded and genuinely exciting combination. The SX 7&rsquo;s desire for depth meets the SX 2&rsquo;s capacity for total relational investment. The risk: the Seven&rsquo;s restlessness eventually exceeds what even the Two&rsquo;s giving can satisfy." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 2+7 pairing becomes one of the Enneagram&rsquo;s most joyfully generous combinations. The Two has learned to receive joy rather than always giving it — to let the Seven&rsquo;s enthusiasm be nourishing rather than threatening in its self-sufficiency. The Seven has learned to pause, to appreciate, to let the Two&rsquo;s warmth actually land rather than flowing through on the way to the next experience. The Two is less needy; the Seven is more present. Together they build a relationship that is warm, alive, and genuinely fun — and underneath the joy, a real bond.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Seven: pause and appreciate", body: "Build in a deliberate appreciation pause after the Two does something significant. Not a performance — but a genuine receipt: &ldquo;I want to acknowledge what you did. It mattered.&rdquo; The Two runs on appreciation; the Seven can provide it with a small but genuine effort that transforms the dynamic." },
                { num: "02", title: "Two: love the Seven&rsquo;s self-sufficiency", body: "The Seven&rsquo;s ability to generate their own joy is not rejection of the Two&rsquo;s giving — it&rsquo;s a feature of who they are. Practice appreciating it rather than working around it. A self-sufficient Seven who chooses to be with the Two is actually expressing deep preference." },
                { num: "03", title: "Find adventures together", body: "The Seven is energized by new experience; the Two is energized by shared experiences with someone they love. Shared adventures accomplish both. Plan them together and let the Two have genuine input on what they&rsquo;d actually enjoy — the Seven&rsquo;s enthusiasm shouldn&rsquo;t always set the agenda." },
                { num: "04", title: "Two: ask directly for depth", body: "When the Two wants a more sustained, intimate conversation rather than joyful surface, ask directly: &ldquo;Can we slow down tonight? I want to actually talk.&rdquo; The Seven responds to clear requests; they can&rsquo;t manage what hasn&rsquo;t been said." },
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
              {[{ label: "Type 2 — The Helper", href: "/enneagram/type-2" }, { label: "Type 7 — The Enthusiast", href: "/enneagram/type-7" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }, { label: "7 + 9", href: "/compatibility/enneagram-7/enneagram-9" }].map((link) => (
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
