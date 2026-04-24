import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 5;
const typeB = 8;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

export const metadata: Metadata = {
  title: "Enneagram 5 and 8 Compatibility — The Investigator & The Challenger | Thyself",
  description:
    "Explore the Enneagram Type 5 and Type 8 compatibility. Both types are fiercely independent, private, and unwilling to be dominated. Full analysis of their intellectual chemistry, the minimalism vs. intensity clash, and how this pairing deepens over time.",
  openGraph: {
    title: "Enneagram 5 and 8 Compatibility — The Investigator & The Challenger",
    description:
      "Type 5&rsquo;s quiet depth meets Type 8&rsquo;s forceful presence. Both value autonomy above nearly everything — explore what draws them together and how they navigate a relationship between two people who don&rsquo;t easily yield.",
    url: "https://thyself.app/compatibility/enneagram-5/enneagram-8",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-5/enneagram-8" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5 and 8 Compatibility — The Investigator & The Challenger",
  description:
    "A full analysis of the Enneagram Type 5 and Type 8 relationship: mutual respect for autonomy, intellectual depth, the intensity vs. minimalism tension, and how both grow in this pairing.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-5/enneagram-8",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-5/enneagram-8" },
};

export default function Enneagram5and8Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16" style={{ backgroundColor: colorA }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white opacity-80">Enneagram Compatibility</p>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>5</span>
              <span className="text-2xl font-light text-white opacity-60">+</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ backgroundColor: colorB }}>8</span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">Type 5 &amp; Type 8</h1>
            <p className="text-xl font-semibold text-white opacity-90">{nameA} &amp; {nameB}</p>
            <p className="mt-4 text-base leading-relaxed text-white opacity-80">
              The Five withdraws to observe; the Eight advances to impact. Both are intensely private about what truly matters to them, both refuse to be dominated, and both respect competence above nearly everything. When they meet, the chemistry is often immediate and surprisingly deep.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-14">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Who Are They?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorA }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 5</p>
                <p className="mb-3 text-xl font-bold">{nameA}</p>
                <p className="text-sm leading-relaxed opacity-90">Fives protect their inner world by minimizing engagement and need. They are perceptive, analytical, and deeply curious — gifted at seeing systems and patterns others miss. They fear being overwhelmed and depleted by the world, so they observe more than they participate. Their gift is an objectivity and depth of understanding that is genuinely rare.</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: colorB }}>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-70">Type 8</p>
                <p className="mb-3 text-xl font-bold">{nameB}</p>
                <p className="text-sm leading-relaxed opacity-90">Eights protect themselves by asserting strength and maintaining control. They are direct, powerful, and deeply loyal to those who earn their trust. They fear being controlled or betrayed, so they project strength before vulnerability can be used against them. Their gift is a fearless courage and an ability to protect and champion those they love.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why They Attract</h2>
            <p className="mb-4 leading-relaxed text-gray-700">The Five and Eight attract through mutual respect for autonomy and a shared refusal to perform. The Eight reads people quickly — they can tell who is genuine and who is not. The Five&rsquo;s lack of performance and social pretense registers as authenticity. The Eight is fascinated by the Five&rsquo;s depth and the sense that something real is being withheld: Eights are drawn to what resists them.</p>
            <p className="leading-relaxed text-gray-700">The Five, meanwhile, is one of the few types who isn&rsquo;t rattled by the Eight&rsquo;s directness. The Five&rsquo;s observational distance means the Eight&rsquo;s intensity doesn&rsquo;t land as domination — it lands as energy. The Five finds the Eight&rsquo;s candor refreshing in a world of social management. Both are selective about who gets close. Being chosen by the other means something real.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Mutual Respect for Independence", body: "Both types fiercely value their autonomy and will not be dominated. This creates a relationship of genuine equals — neither is trying to manage, fix, or absorb the other. They respect each other&rsquo;s separateness in a way that feels like trust rather than distance." },
                { title: "Honesty Without Performance", body: "The Eight is constitutionally direct; the Five avoids social pretense. Both value truth over comfort. Their conversations tend to be unusually candid — neither wastes the other&rsquo;s time with small talk when substance is possible. This intellectual honesty becomes a primary intimacy for this pairing." },
                { title: "Complementary Strengths", body: "The Five sees what others miss; the Eight acts where others hesitate. Together they form a formidably capable pair — the Five provides analysis, foresight, and strategic depth; the Eight provides will, energy, and execution. Projects this pair undertakes tend to be both well-conceived and fully realized." },
                { title: "Privacy as Shared Language", body: "Both types are intensely private about their inner world. What they share with each other is genuinely earned and genuinely meant. This creates a relationship where trust is built slowly but is extraordinarily durable — both know that what the other shares is real." },
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
                { title: "Energy and Presence", body: "The Eight fills a room with presence, energy, and demand. The Five conserves energy and finds sustained engagement depleting. Over time the Eight may experience the Five as absent or withholding; the Five may experience the Eight as relentlessly demanding of engagement they can&rsquo;t sustain without depletion." },
                { title: "Expansion vs. Minimalism", body: "Eights tend toward expansion — more impact, more control, more territory. Fives tend toward minimalism — fewer obligations, fewer demands, smaller footprint. This plays out in lifestyle decisions, social commitments, and how the relationship grows. The Eight wants more; the Five is conserving." },
                { title: "Vulnerability and Control", body: "Both types have elaborate defenses around vulnerability — the Five by retreating into the mind, the Eight by projecting strength. Getting emotionally close requires both to lower defenses they&rsquo;ve spent years building. This can take considerable time and feels threatening to both. Emotional intimacy in this pairing is earned slowly." },
                { title: "Intensity Mismatch", body: "The Eight experiences life at high volume; the Five experiences life at careful, observed distance. Conflict, passion, and even celebration can feel overwhelming to the Five and insufficiently felt to the Eight. Each may secretly wonder if the other is really there." },
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>Type 5 grows by</p>
                <ul className="space-y-3">
                  {["Using the Eight&rsquo;s directness as permission to engage rather than a pressure to resist", "Practicing presence and engagement even when energy feels limited — trust that it replenishes", "Letting the Eight in on the inner world rather than only showing the analytic surface", "Recognizing that the Eight&rsquo;s intensity is protection and passion, not domination"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorA }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>Type 8 grows by</p>
                <ul className="space-y-3">
                  {["Respecting the Five&rsquo;s energy budget — backing off and trusting the Five will return", "Using the Five&rsquo;s depth and analytical distance as a model for slowing down before acting", "Letting the Five&rsquo;s quiet presence be enough — not interpreting stillness as absence or rejection", "Practicing vulnerability with the Five: allowing the Five&rsquo;s non-threatening presence to be a safe place for softness"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colorB }} /><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Subtypes Shape the Dynamic</h2>
            <p className="mb-6 text-sm text-gray-500">The instinctual subtype significantly changes how Type 5 and Type 8 experience each other in relationship.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Self-Preservation", body: "SP 5 and SP 8 are both highly territorial about their physical space and personal resources. This can produce a relationship of two people who coexist well but remain quite separate — self-contained, competent, respectful. Real intimacy takes longer to build." },
                { label: "Social", body: "Social 5 and social 8 are both oriented toward impact and influence in the world, though very differently — the Five through knowledge, the Eight through power. This pairing can produce impressive collaboration on shared causes, building institutions or communities where the Five&rsquo;s vision and the Eight&rsquo;s force complement each other." },
                { label: "Sexual / One-to-One", body: "SX 5 and SX 8 is one of the most charged pairings on the Enneagram. The SX 5 is looking for a deep, total connection; the SX 8 brings intensity and passion to one-to-one bonds. Both want real contact. The friction: the Five pulls back when overwhelmed; the Eight interprets withdrawal as rejection and escalates." },
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
            <p className="leading-relaxed text-gray-700">When both are growing, the 5+8 pairing becomes one of the Enneagram&rsquo;s most formidable and quietly devoted bonds. The Eight has found in the Five a genuine equal — someone who cannot be intimidated, who offers depth the Eight rarely slows down for, and who sees through the armor to the person inside. The Five has found in the Eight a companion who makes the world feel navigable — someone who handles the external demands that drain the Five, who protects what the Five values, and who wants to know what the Five actually thinks. Both have been chosen by someone who doesn&rsquo;t settle. That matters to both of them more than either would easily admit.</p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Negotiate energy clearly", body: "The Five needs to name their energy limits explicitly — &ldquo;I need two hours alone after this&rdquo; — rather than retreating without explanation. The Eight can honor this if it&rsquo;s stated directly. Ambiguous withdrawal reads as rejection to an Eight. Explicit withdrawal reads as trustworthy self-knowledge." },
                { num: "02", title: "Eight: ask questions, don&rsquo;t push", body: "The Five opens slowly. The Eight&rsquo;s instinct is to push toward what they want. With a Five, curiosity works better than pressure — genuine questions, patient waiting, and not filling silence. The Five will share more when not cornered." },
                { num: "03", title: "Find shared intellectual terrain", body: "Both types are energized by substance. Build rituals around shared intellectual engagement — books, problems, projects, films you discuss seriously. This is often where the deepest intimacy develops for this pairing, and it plays to both types&rsquo; natural strengths." },
                { num: "04", title: "Make vulnerability explicit", body: "Both types hide vulnerability so effectively that the other may not know when they&rsquo;re in it. Agree to a signal — a word, a tone, a gesture — that means &ldquo;I&rsquo;m struggling and I need something from you.&rdquo; This bypasses both types&rsquo; armor and creates a direct line when it matters most." },
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
              {[{ label: "Type 5 — The Investigator", href: "/enneagram/type-5" }, { label: "Type 8 — The Challenger", href: "/enneagram/type-8" }].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900">{link.label}</Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Pairings</h2>
            <div className="flex flex-wrap gap-3">
              {[{ label: "4 + 5", href: "/compatibility/enneagram-4/enneagram-5" }, { label: "2 + 8", href: "/compatibility/enneagram-2/enneagram-8" }, { label: "1 + 7", href: "/compatibility/enneagram-1/enneagram-7" }].map((link) => (
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
