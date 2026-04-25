import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeA = 5;
const typeB = 6;
const colorA = TYPE_COLORS[typeA];
const colorB = TYPE_COLORS[typeB];
const nameA = TYPE_NAMES[typeA];
const nameB = TYPE_NAMES[typeB];

const tips = [
  "Fives: build in a small, consistent check-in ritual — not because the Six demands it, but because predictable presence is the language the Six actually trusts. A brief daily connection costs the Five little and gives the Six a great deal.",
  "Sixes: practice naming your fear directly rather than acting it out through testing or doubt. Telling the Five 'I'm anxious and need a little reassurance' is far more effective than pulling away and waiting to see if they notice.",
  "Both: establish a rule against joint catastrophizing sessions. When both partners start building worst-case scenarios together, flag it and redirect — take a walk, change the subject, bring in some grounding evidence.",
  "Both: celebrate what is already working. Both types have a bias toward scanning for problems. Actively naming what is solid and trustworthy in the relationship counteracts the fear center's default toward vigilance.",
];

export const metadata: Metadata = {
  title: "Enneagram 5 and 6 Compatibility — Relationship Dynamics & Growth | Thyself",
  description:
    "A deep guide to the Enneagram 5 and 6 relationship. How the Investigator and the Loyalist attract, where they clash, what each needs to grow, and what this pairing looks like at its best. Grounded in Naranjo and Riso-Hudson.",
  openGraph: {
    title: "Enneagram 5 and 6 Compatibility",
    description:
      "Two head-center types who manage fear through knowledge and vigilance — one by withdrawing into competence, one by building alliances. Their shared seriousness is their foundation; their differing fear strategies are their test.",
    url: "https://thyself.app/compatibility/enneagram-5/enneagram-6",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/compatibility/enneagram-5/enneagram-6" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram 5 and 6 Compatibility — Relationship Dynamics & Growth",
  description:
    "How Enneagram Type 5 and Type 6 relate: attraction, synergies, tensions, growth edges, and what this pairing looks like at its best.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/compatibility/enneagram-5/enneagram-6",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/compatibility/enneagram-5/enneagram-6" },
};

export default function Compatibility5and6Page() {
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
              Type 5 and Type 6
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Both live in the head triad — managing an underlying anxiety through thought, preparation, and careful assessment of the world. One builds inward fortresses of knowledge; one builds outward alliances and loyalty networks. Their meeting is a union of two careful, serious minds.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">

          {/* Type snapshot */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">The Two Types at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorA }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 5 — The Investigator</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Fives manage their underlying fear by withdrawing into competence. If they can understand enough, know enough, and need little enough from others, they will be safe. They are careful with their energy and attention — both finite resources that must be protected. They observe before engaging, prefer depth to breadth, and prize autonomy and self-sufficiency above nearly all else in their relationships.
                </p>
              </div>
              <div className="rounded-xl border-l-4 bg-gray-50 p-5" style={{ borderColor: colorB }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Type 6 — The Loyalist</p>
                <p className="leading-relaxed text-gray-700 text-sm">
                  Sixes manage their underlying fear by seeking reliable alliances and anticipating what could go wrong before it does. They are loyal, conscientious, and highly attuned to questions of trustworthiness. They think through scenarios carefully and often doubt their own certainty. When they have found people and commitments they can trust, they are among the most devoted and reliable partners the Enneagram offers.
                </p>
              </div>
            </div>
          </section>

          {/* Why they attract */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Why These Types Attract</h2>
            <p className="leading-relaxed text-gray-700">
              The 5–6 pairing is built on a foundation of shared seriousness. Both types think carefully, take ideas seriously, and are skeptical of the superficial. They are drawn to each other because they recognize in the other someone who will not demand that life be flattened into easy reassurance. The Six is attracted to the Five&apos;s competence and knowledge — here is someone who actually knows things, who is not pretending, who can be trusted to be accurate. The Five is attracted to the Six&apos;s loyalty and commitment — here is someone who, once they have decided you are trustworthy, will not abandon you.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              There is a complementary quality in their strategies. The Five&apos;s self-sufficiency can feel like the solid ground the Six desperately needs: someone who does not need to be rescued, who is not going to pull the Six into an emotional emergency, who brings calm competence to problems. The Six&apos;s loyalty and warmth can feel like the safe connection the Five privately longs for without knowing how to ask for it: someone who will stay, who will keep showing up, who will not withdraw their presence at the first sign of difficulty.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Both types also share a certain dry, careful wit — and a willingness to think seriously about serious things. Their conversations tend to be substantive, their mutual respect genuine, and their bond, once established, unusually durable.
            </p>
          </section>

          {/* Natural synergies */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Natural Synergies</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Shared head-center seriousness",
                  body: "Both types take information, analysis, and careful thinking seriously. They are unlikely to be dismissive of each other's concerns, unlikely to demand the other be more spontaneous or relaxed, and likely to genuinely engage with the intellectual and practical content of problems. This is a pairing where the other person actually thinks with you.",
                },
                {
                  title: "The Five's competence grounds the Six's anxiety",
                  body: "Sixes are often looking for something reliable in a world that feels unstable. The Five's quiet competence — their genuine knowledge, their non-reactivity, their ability to analyze and assess clearly — provides a kind of anchor. When the Six's catastrophizing mind spins up, the Five often brings a useful corrective: here is what the evidence actually shows.",
                },
                {
                  title: "The Six's loyalty secures the Five's investment",
                  body: "Fives invest in relationships slowly and carefully. They cannot afford many close bonds — their inner resources are finite. The Six's loyalty means that investment will not be wasted: the Six will not suddenly leave, will not prove untrustworthy, will not demand more than was agreed. This allows the Five to go deeper in the relationship than they might with a less predictably committed partner.",
                },
                {
                  title: "Mutual respect for due diligence",
                  body: "Neither type rushes. Both test trust before extending it. Both do their research before committing. This can make the early stages of the relationship slow, but the bond that eventually forms is unusually solid — both partners have genuinely assessed whether this is worth it before deciding it is.",
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
              The 5–6 pairing&apos;s deepest challenge is that both types carry a fear-based worldview — and under stress, they can amplify rather than calm each other&apos;s anxiety. Two careful minds in a dark room can generate more darkness together than either would alone.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Withdrawal vs. reassurance-seeking",
                  body: "When a Six is anxious, they typically reach for connection — they want to talk it through, to be told it will be okay, to feel the presence of someone reliable. When a Five is anxious, they typically retreat — they need to process alone, to think, to recover their interior resources. These responses are directly opposed. The Six who reaches for the Five at their most difficult moment may find the Five physically or emotionally absent — not from cruelty, but from their own self-protective withdrawal.",
                },
                {
                  title: "The Six's need for reassurance vs. the Five's self-sufficiency ethic",
                  body: "Fives are deeply committed to not needing too much from others. The Six's periodic need for reassurance — for the Five to say 'I'm here, we're okay, you can trust me' — can feel to the Five like a demand they are not equipped to meet with the regularity the Six requires. The Five may intellectually understand the Six's need without being able to emotionally satisfy it consistently.",
                },
                {
                  title: "Co-reinforcing catastrophizing",
                  body: "Both types are skilled at imagining what could go wrong. Under stress, rather than one partner providing perspective, they can end up building each other's doomsday scenarios together — a shared darkness where each person's fear validates the other's. Without external anchors or deliberate growth practices, this dynamic can trap both partners in a mutual anxiety loop.",
                },
                {
                  title: "Testing and doubt",
                  body: "Sixes often have an ambivalent relationship with authority figures and trusted others: they seek reliability but also test it, sometimes unconsciously provoking to see if the person will hold. Fives, who have their own distrust of demands on their presence, may not reliably pass these tests — not because they are untrustworthy, but because they simply cannot be as consistently available as the Six's testing requires.",
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorA }}>For the Five</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Five&apos;s growth in this relationship involves learning to offer presence proactively — not just responding to the Six&apos;s requests, but initiating small gestures of connection that let the Six know the bond is real and stable. The Five does not need to become emotionally expressive; small, consistent acts of availability — a check-in, a shared meal, a direct statement of commitment — go a long way. The deeper work is at the Five&apos;s integration direction (toward Eight): developing the capacity to act and engage rather than only observe and analyze.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: colorB }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: colorB }}>For the Six</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Six&apos;s growth involves learning to trust their own assessment of the Five rather than continuously needing external confirmation. The Five&apos;s reliability is real — it simply expresses differently than the Six&apos;s anxiety expects. The work is to distinguish the Five&apos;s structural unavailability (a feature, not a flaw) from actual untrustworthiness. The Six who can develop their own inner authority — trusting their own perception rather than perpetually doubting it — places far less demand on the Five and far more faith in what is actually there.
                </p>
              </div>
            </div>
          </section>

          {/* Instinctual variants */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Instinctual Variants in the 5–6 Pairing</h2>
            <p className="mb-4 text-sm text-gray-500">
              The three instinctual subtypes (self-preservation, sexual, and social) significantly shape how each type expresses in relationship.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "sx/5 + sx/6",
                  body: "The sexual Five is the most emotionally available of the Five subtypes — more direct, more interested in one-on-one intensity, more willing to merge. The sexual Six is the most countrophobic subtype, leaning into danger rather than away from it. Together these two can have genuine chemistry and depth, though the sx/6's testing behavior may still push the sx/5 toward their limits.",
                },
                {
                  label: "sp/5 + sp/6",
                  body: "Both self-preservation subtypes are oriented toward security, practicality, and managing resources carefully. This can create a very compatible shared life with clear agreements and mutual respect for each other's need for predictability. The risk is that both partners' inward turn leaves the relationship somewhat airless — there is security but not always aliveness.",
                },
                {
                  label: "so/5 + so/6",
                  body: "The social Five — Naranjo's countertype, who channels the Five's withdrawal into service and intellectual generosity — meets a Six whose fear is most focused on belonging and loyalty within groups. Both are serious about their communities and their obligations. This pairing can be intellectually rich and genuinely productive, though the Six may still find the social Five more interested in ideas than in the relational texture of the bond itself.",
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
                When the Five and Six are both growing, this pairing produces a bond of unusual durability and intellectual richness. The Five becomes warmer and more present, learning to express their commitment in ways the Six can actually receive. The Six becomes more internally grounded, relying on their own solid assessment of the Five rather than perpetually testing it. Together they stop amplifying each other&apos;s fear and begin genuinely counterbalancing it.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                At their best, the Five and Six create a relationship where two careful, honest, serious people have found in each other the anchor they separately needed. The Five trusts that the Six will stay and that they can afford to invest. The Six trusts that the Five is reliable and that they do not need to keep proving it. The shared intelligence and loyalty between them becomes something formidable — a partnership that thinks well together and holds together under pressure.
              </p>
            </div>
          </section>

          {/* Practical suggestions */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Practical Suggestions for This Pairing</h2>
            <ul className="space-y-4">
              {tips.map((tip) => (
                <li key={tip.slice(0, 30)} className="flex gap-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: colorA }}
                  >
                    {tips.indexOf(tip) + 1}
                  </span>
                  <p className="leading-relaxed text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Related types */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore the Individual Types</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-5" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 — The Investigator</Link>
              <Link href="/enneagram/type-6" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 — The Loyalist</Link>
            </div>
          </section>

          {/* Other compatibility pairs */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">More Compatibility Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compatibility/enneagram-5/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 5 + Type 9</Link>
              <Link href="/compatibility/enneagram-6/enneagram-7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 + Type 7</Link>
              <Link href="/compatibility/enneagram-6/enneagram-9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 6 + Type 9</Link>
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
