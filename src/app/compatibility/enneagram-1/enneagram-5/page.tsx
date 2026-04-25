import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 1;
const typeB = 5;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 1 and 5 Compatibility — The Reformer & The Investigator | Thyself",
  description: "Explore the Enneagram Type 1 and Type 5 compatibility. Both are self-disciplined, intellectual, and internally oriented — the One through moral standards, the Five through knowledge and detachment. Full analysis of their reserved pairing, the emotional distance risk, and how both grow.",
  openGraph: {
    title: "Enneagram 1 and 5 Compatibility — The Reformer & The Investigator",
    description: "Type 1 holds to principle; Type 5 holds to knowledge. Both reserved and inward-facing — explore their intellectually rich pairing and where the critic meets the observer.",
    url: "https://thyself.app/compatibility/enneagram-1/enneagram-5",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-1/enneagram-5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 1 and 5 Compatibility — The Reformer & The Investigator",
  description: "A full analysis of the Enneagram Type 1 and Type 5 relationship: shared intellectual seriousness, the emotional distance risk, principle meets detachment, and growth edges for both types.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-1/enneagram-5",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-1/enneagram-5" },
};

export default function Enneagram1and5Page() {
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>5</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 1 &amp; Type 5</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">Two of the Enneagram&rsquo;s most internally oriented types. The One lives by a rigorous inner moral standard; the Five lives by a rigorous inner intellectual standard. Both are disciplined, private, and deeply serious. They can build a relationship of unusual intellectual depth and mutual respect. The challenge: together they may produce too much distance and too little warmth to sustain real intimacy.</p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 1</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Ones are principled, disciplined, and driven by an internalized standard of right and wrong. They are reliable, honest, and quality-focused. Their shadow: the inner critic runs constantly and can turn outward as correction and judgment — including toward the people they love most.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 5</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Fives are observant, analytical, and protective of their inner world and energy. They engage deeply with ideas and are drawn to mastery and understanding. Their shadow: they can withhold engagement so thoroughly that real intimacy never forms — the relationship stays in the thinking register and never reaches genuine emotional contact.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Both types share a serious, internally-oriented quality that immediately recognizes itself in the other. The One is drawn to the Five&rsquo;s genuine intellectual depth and the precision with which the Five thinks. The Five doesn&rsquo;t perform expertise — they have it. This rigor resonates with the One&rsquo;s own high standard for quality and honesty. The Five seems to care about getting things right, which is the One&rsquo;s deepest value.</p>
            <p className="leading-relaxed text-gray-700">The Five is drawn to the One&rsquo;s principled reliability. The Five, acutely attuned to inconsistency and self-serving motivation, finds the One&rsquo;s ethical consistency genuinely trustworthy. The One does what they say. The One holds to principle even when it&rsquo;s costly. For a Five whose social world is often navigated with caution, the One feels safe — predictable in the best sense.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Intellectual Seriousness", body: "Both types value rigor, accuracy, and depth. Together they can build a relationship with an unusually rich intellectual dimension — ideas taken seriously, arguments pursued honestly, shared curiosity about how things actually work. Neither type is satisfied with superficiality, and together they find a natural level of engagement that both find genuinely stimulating." },
                { title: "Mutual Respect for Privacy", body: "Both types are private and self-contained. Neither demands excessive social engagement or emotional display. They give each other room — room to think, room to work, room to not perform constant connection. This mutual understanding of solitude creates a relationship with less pressure than either typically experiences." },
                { title: "Shared Quality Standard", body: "Both types hold high standards for their work and for what they produce. In shared projects, they complement each other — the One provides the ethical and quality framework; the Five provides the depth of analysis and knowledge. Together they produce work that is both rigorously thought through and rigorously done." },
                { title: "Five Offers the One Perspective", body: "The One&rsquo;s inner critic is relentless — their standard is never quite met. The Five&rsquo;s analytical detachment, applied to the One&rsquo;s self-criticism, can offer a different vantage point: is the standard actually calibrated correctly? Is the judgment warranted? The Five&rsquo;s capacity to step back and observe without emotional loading is genuinely useful to the self-critical One." },
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
                { title: "Two Critics, No Warmth", body: "The One has a relentless inner critic; the Five has a detached observer. Together they risk building a relationship that is highly analytical and internally rigorous but deficient in the warmth, playfulness, and emotional generosity that sustains long-term intimacy. Both types can be cold — the One through judgment, the Five through withdrawal — and together the coldness can compound." },
                { title: "Correction vs. Detachment", body: "The One&rsquo;s corrective impulse meets the Five&rsquo;s withdrawal response in an unproductive combination. When the One offers feedback or correction, the Five&rsquo;s response is often to disengage — not defensively, but because emotional pressure depletes their energy. The One experiences the withdrawal as dismissal; the Five experiences the One&rsquo;s persistence as intrusion. Neither reaches the other." },
                { title: "Action vs. Analysis", body: "The One acts on what they know to be right — decisively, often urgently. The Five analyzes before acting, and may continue analyzing long past the moment when action was needed. The One&rsquo;s impatience with the Five&rsquo;s deliberation can feel like contempt to the Five; the Five&rsquo;s endless analysis can feel like moral evasion to the One." },
                { title: "Emotional Under-investment", body: "Neither type naturally invests heavily in explicit emotional engagement. Both can go long periods without directly addressing the emotional state of the relationship. Without deliberate attention, the 1+5 pairing can drift into a cordial intellectual partnership that has lost its relational warmth entirely — without either person quite noticing until the distance is substantial." },
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
                  {["Offering curiosity before correction — the Five responds to questions, not verdicts", "Respecting the Five&rsquo;s energy budget and withdrawal needs without interpreting them as rejection", "Softening the inner critic enough to allow warmth and playfulness into the relationship — the Five needs an invitation, not a standard", "Naming appreciation explicitly rather than assuming the Five reads it from quality of engagement"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 5 grows by</p>
                <ul className="space-y-3">
                  {["Communicating withdrawal explicitly rather than simply disappearing — the One needs to know what is happening", "Practicing small acts of warmth and appreciation that the One can actually receive — not analysis, but genuine expression", "Allowing the One&rsquo;s corrective feedback as an act of care rather than contracting into further withdrawal", "Investing deliberately in the emotional dimension of the relationship, not just the intellectual — naming feelings, even briefly"].map((item, i) => (
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
                { label: "Self-Preservation", body: "SP 1 and SP 5 are both private, domestic, and security-oriented. This is the most functional version of this pairing — both are responsible, both manage their space, and neither demands excessive social engagement. The risk is also the highest here: without external social pressure, the relationship can drift into companionable silence with no genuine emotional contact." },
                { label: "Social", body: "Social 1 and social 5 are both invested in ideas and community at a systems level — the One through reform, the Five through knowledge contribution. They can build meaningful shared engagement around intellectual and ethical causes. This gives the relationship external substance that prevents it from becoming purely private and thin." },
                { label: "Sexual / One-to-One", body: "SX 1 brings intense idealism and close-range standards; SX 5 brings a rare capacity for one-to-one depth and vulnerability. This can be the most intimate version of this pairing — the SX 5&rsquo;s desire for genuine contact meets the SX 1&rsquo;s desire for a relationship that is truly principled and real. If both can tolerate the intensity, this is where the 1+5 pairing is most likely to become genuinely intimate." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 1+5 pairing achieves something genuinely unusual: a relationship of real depth, real honesty, and mutual intellectual respect that has also learned to be warm. The One has softened the corrective edge and found in the Five&rsquo;s analytical detachment a perspective that genuinely helps. The Five has learned to name feelings, stay present when the One needs emotional contact, and invest in the relational dimension with the same seriousness they bring to everything else. Both are more whole — the One less driven by the inner critic, the Five less defended against genuine contact. What they build is a relationship that is both rigorous and real.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Build deliberate warmth rituals", body: "Neither type will naturally express warmth frequently. Build it in structurally: a daily check-in, a weekly explicit appreciation. Not as performance — as practice. The Five will engage with warmth if it is structured and expected; the One will offer it if they understand it as a quality investment in the relationship." },
                { num: "02", title: "Five: name your withdrawal before it happens", body: "&ldquo;I need an hour to recover — I&rsquo;ll be back at 4.&rdquo; The One can wait; what they cannot navigate is unexplained absence. Explicit withdrawal reads as trustworthy self-knowledge. Unnamed withdrawal reads as rejection. One sentence changes the entire dynamic." },
                { num: "03", title: "One: offer curiosity, not correction", body: "Before pointing out what is wrong or substandard, ask what the Five was thinking. Often the Five has a reason the One hadn&rsquo;t considered. The curiosity question changes the relational dynamic from assessment to collaboration — and the Five opens where the One assesses." },
                { num: "04", title: "Find shared intellectual projects", body: "The 1+5 pairing is at its most naturally alive around ideas they both find important. Ethics, epistemology, history, craft — whatever both find genuinely interesting. Shared intellectual engagement is the natural currency of this pairing and keeps the relationship alive when emotional expression is thin." },
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
              {[{ label: "Type 1 — The Reformer", href: "/enneagram/type-1" }, { label: "Type 5 — The Investigator", href: "/enneagram/type-5" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "1 + 4", href: "/compatibility/enneagram-1/enneagram-4" }, { label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "2 + 5", href: "/compatibility/enneagram-2/enneagram-5" }].map((link) => (
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
