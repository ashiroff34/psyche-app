import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 8;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 8 in Relationships — The Challenger as a Partner | Thyself",
  description:
    "How Enneagram Type 8 shows up in relationships: their fierce protectiveness and intensity, the armor against vulnerability, and what they need to allow themselves to be truly loved. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 8 in Relationships — The Challenger as a Partner",
    description:
      "The Type 8 is among the most fiercely loyal and protective partners on the Enneagram. The question is whether they can put down the armor long enough to be truly vulnerable — and truly loved.",
    url: "https://thyself.app/enneagram/type-8/relationships",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-8/relationships" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 8 in Relationships — The Challenger as a Partner",
  description:
    "How the Enneagram Type 8 shows up in relationships: fierce protectiveness, vulnerability armor, and what they need to be truly loved.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-8/relationships",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-8/relationships" },
};

export default function Type8Relationships() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 8</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Challenger in Relationships</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 8s love with a totality that few types can match. When they are in, they are completely in — protective, devoted, fiercely loyal, and willing to fight for the people and things they love. The challenge is the armor: the instinct to protect themselves by never showing the vulnerability that intimacy requires.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What the Type 8 Brings to Partnership</h2>
            <p className="leading-relaxed text-gray-700">
              At their best, Type 8s are among the most devoted and protective partners on the Enneagram. They show up with their full strength. They take their commitment seriously, they defend the people they love, and they bring a quality of presence and force that their partners can rely on when things get genuinely difficult. A Type 8 who has chosen you has placed something precious in your hands.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight&apos;s directness is also a gift, though it can take time to recognize it as such. They say what they think, they mean what they say, and they do not engage in the subtle social management that leaves their partners guessing. A relationship with an Eight has a quality of clarity and honesty that, once experienced, is difficult to give up. You always know where you stand.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Eights also tend to be generous — with their time, their resources, their protection, and their attention. When they love someone, they want to provide. They want to be useful, capable, the person their partner can count on. This protectiveness, when not distorted by control, is one of the most genuine and sustaining expressions of love available.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Needs in Relationship</h2>
            <div className="space-y-4">
              {[
                {
                  title: "A partner who can hold their own",
                  body: "Type 8s have no interest in dominating a partner who cannot push back. They need someone who is strong enough to meet them — who can disagree, set limits, and stay steady under the Eight&apos;s considerable force. A partner who collapses in the face of the Eight&apos;s directness, or who simply defers, will eventually lose the Eight&apos;s respect and interest.",
                },
                {
                  title: "Loyalty and honesty",
                  body: "Eights are acutely sensitive to betrayal. They need to trust that their partner is completely in their corner — not performing loyalty while maintaining secret reservations. And they need honesty: they can handle difficult truths far better than they can handle being managed or handled. Tell them what is real.",
                },
                {
                  title: "To not be controlled",
                  body: "The Eight&apos;s resistance to being controlled is one of the most fundamental features of their character. They need a partner who makes requests rather than demands, who influences rather than coerces, and who respects the Eight&apos;s autonomy even within the structure of a committed relationship. Attempts to control the Eight, however well-intentioned, will generate resistance that is entirely disproportionate to the attempt.",
                },
                {
                  title: "A safe place to be vulnerable",
                  body: "Beneath the Eight&apos;s strength is a tender interior that they have learned, often through painful experience, to protect very carefully. They need a partner who creates enough safety that the Eight can choose to put down the armor — who will not weaponize what the Eight reveals in vulnerable moments, and who responds to the Eight&apos;s softness with care rather than exploitation.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Armor Against Vulnerability</h2>
            <p className="leading-relaxed text-gray-700">
              The Eight&apos;s central relational challenge is the armor they have built against vulnerability. At some point — often early, often in response to real betrayal or powerlessness — the Eight learned that showing softness was dangerous. Vulnerability was something that got you hurt. So they armored. They developed force, they cultivated self-sufficiency, they learned to hit first and protect themselves with the full weight of their character.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              In relationship, this armor is both protective and isolating. The Eight who cannot be vulnerable cannot be truly known. Their partner is loving a version of them — the strong, capable, in-charge version — rather than the complete person. The intimacy available in the relationship is necessarily limited by how much of themselves the Eight will allow to be seen.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Eight&apos;s growth in relationship requires the discovery that vulnerability in this specific relationship, with this specific person, does not carry the risks that made the armor necessary in the first place. This is not cognitive — it is experiential, slow, and requires the Eight to risk being wrong about the danger. The partner who consistently responds to the Eight&apos;s moments of openness with care, rather than with judgment or exploitation, gradually makes that risk feel bearable.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Growth and Challenge</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>What they offer</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  A Type 8 who has learned to be vulnerable — who has found a partner worthy of their softness and allowed themselves to be known completely — is one of the most extraordinary partners on the Enneagram. Their strength, loyalty, and fierce love, combined with genuine openness, create a relationship of uncommon depth and security. They protect what they love with everything they have.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Growth edge</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  The Eight&apos;s growth edge is learning that the vulnerability they have protected against for so long is not a weakness — it is the condition of real intimacy. The strength they bring to every other domain of their life needs to be brought here too: the strength to be fully seen, to risk being hurt, and to choose connection over self-protection. That is the bravest thing an Eight can do.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Loving a Type 8 Looks Like</h2>
            <p className="leading-relaxed text-gray-700">
              Partners of Type 8s often describe the experience as exhilarating and occasionally overwhelming — the Eight&apos;s force, their directness, their sheer presence can fill a room and a relationship in ways that require the partner to maintain their own ground. The partner who is most successfully partnered with an Eight is one who neither collapses under the Eight&apos;s force nor is intimidated by it.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Loving an Eight well means giving them something to respect in you. It means being honest with them even when the truth is uncomfortable. It means standing your ground in disagreement rather than simply giving way. And it means being a safe place — consistently, patiently, over time — for the tender interior that the Eight is deciding whether to show you.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              When the Eight does show you their softness — a moment of uncertainty, a genuine fear, the need to be held — respond carefully. What you do in that moment will determine whether they choose to show you again. The Eight is always, quietly, watching to see whether they were right to take the risk.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 8 — The Challenger</Link>
              <Link href="/enneagram/8w7" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8w7 — The Maverick</Link>
              <Link href="/enneagram/8w9" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">8w9 — The Bear</Link>
              <Link href="/enneagram/subtypes/sx-8" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Subtypes of Type 8</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — understand the patterns that shape how you love.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
