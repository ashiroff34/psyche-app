import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS } from "@/data/enneagram";

const typeNum = 3;
const color = TYPE_COLORS[typeNum];

export const metadata: Metadata = {
  title: "Enneagram Type 3 at Work — The Achiever in the Workplace | Thyself",
  description:
    "How Enneagram Type 3 operates professionally: their drive for results and visibility, the pattern of identity-merging with success, leadership style, and ideal work environments. Grounded in Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 3 at Work — The Achiever in the Workplace",
    description:
      "The Type 3 excels at getting results and making things look good. The professional challenge is knowing who they are underneath the accomplishments — and building a career that reflects genuine values, not just impressive outcomes.",
    url: "https://thyself.app/enneagram/type-3/work",
    type: "article",
    siteName: "Thyself",
  },
  alternates: { canonical: "https://thyself.app/enneagram/type-3/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 3 at Work — The Achiever in the Workplace",
  description: "How the Enneagram Type 3 operates professionally: results drive, image management, leadership style, and ideal work environments.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-3/work",
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-3/work" },
};

export default function Type3Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-16 text-white" style={{ backgroundColor: color }}>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">Enneagram Type 3</p>
            <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">The Achiever at Work</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Type 3s are built for professional success. They identify what success looks like in any given environment and move efficiently toward it. They outperform, out-present, and outmaneuver. Their professional challenge is ensuring that the success they are chasing reflects something they genuinely value — not just the image of success in whatever field they happen to be in.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-16">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">The Type 3 as a Professional</h2>
            <p className="leading-relaxed text-gray-700">
              Type 3s are among the most effective professional performers on the Enneagram. They are goal-oriented, energetic, and highly attuned to what is valued in their environment — which allows them to direct their effort with unusual efficiency. They do not waste time on work that does not advance the objective. They know how to present their work compellingly. And they tend to find the path to visible results with a speed that leaves more methodical types behind.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The Three&apos;s social intelligence is also a real professional asset. They read audiences, adjust their presentation, and know instinctively what will land with whom. In sales, client-facing roles, presentations, and organizational navigation, this gives them an edge that is difficult to train and genuinely rare. They do not just get results — they make the results look good in ways that create confidence and buy-in from stakeholders.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              The risk is that the Three&apos;s orientation toward what success looks like can drift into image management at the expense of substance. They may optimize for the appearance of results rather than the underlying reality, or pursue recognition in fields that do not actually align with their genuine interests and values. The professional Three who has lost touch with what they actually care about can achieve impressive things that leave them feeling strangely empty.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Professional Traits</h2>
            <div className="space-y-4">
              {[
                { title: "Highly goal-oriented", body: "The Three moves toward objectives with unusual focus and energy. They break complex goals into achievable steps, track progress systematically, and are not easily deflected by difficulty or uncertainty. Their efficiency at accomplishing stated goals is among the highest of any type." },
                { title: "Compelling presenter and communicator", body: "Type 3s understand how to package and present information in ways that create the desired impression. They are naturally persuasive, know how to read a room, and adjust their communication style fluidly to match their audience. This makes them effective in any role that requires selling, presenting, or persuading." },
                { title: "Competitive and motivated by recognition", body: "Threes are energized by competition and recognition. They want to know how they rank, what the metric is, and how to perform at the top of it. This competitive orientation is a fuel source — but it can also lead to prioritizing visible metrics over deeper forms of value that are harder to measure." },
                { title: "Risk of cutting corners", body: "When the pressure to perform is high, the Three may optimize for the appearance of results at the expense of substance. They may shade the truth about progress, present incomplete work as finished, or prioritize what looks good over what is actually right. This risk is real and worth the Three&apos;s ongoing attention." },
                { title: "Efficient and action-oriented", body: "Threes are not committees — they make decisions, move forward, and get things done. This action orientation is enormously valuable in environments that need momentum. It can become a liability when the situation requires more deliberation, more process, or more consultation than the Three is naturally inclined to provide." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="mb-2 font-semibold" style={{ color }}>{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Leadership Style and Work Environment</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: color }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color }}>As a leader</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 3 leaders are highly effective at driving results and communicating vision. They inspire confidence and create momentum. The challenge is developing genuine depth of relationship with their team — moving past the image of good leadership to the real work of knowing and developing the people they lead. Teams of high-functioning Threes often feel energized and results-driven, but also slightly disconnected — as if everyone is performing rather than actually working together.
                </p>
              </div>
              <div className="rounded-xl border-t-4 bg-gray-50 p-6" style={{ borderColor: "#888" }}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">Ideal environment</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Type 3s thrive in results-oriented environments where excellence is recognized and rewarded. They need clear metrics, a path to visible achievement, and an audience that can appreciate what they accomplish. They struggle in environments that are bureaucratic, slow-moving, or where performance is not differentiated — where doing more than average produces no visible return. Purpose alignment is also increasingly important for mature Threes: they need to believe in what they are achieving, not just in the achievement itself.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Professions</h2>
            <p className="leading-relaxed text-gray-700">
              Type 3s are found across most professional fields but concentrate in environments where performance is visible and rewarded: sales and business development, entrepreneurship and startups, law, marketing and PR, executive leadership, politics, entertainment and media, consulting, and finance. Many Threes build successful careers in multiple fields sequentially, adapting to each environment&apos;s definition of success with unusual agility.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Explore Further</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/enneagram/type-3" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 — The Achiever</Link>
              <Link href="/enneagram/type-3/relationships" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">Type 3 in Relationships</Link>
              <Link href="/enneagram/3w2" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">3w2 — The Charmer</Link>
              <Link href="/enneagram/3w4" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400">3w4 — The Professional</Link>
            </div>
          </section>

          <section className="rounded-2xl px-8 py-10 text-white text-center" style={{ backgroundColor: color }}>
            <h2 className="mb-3 text-2xl font-bold">Find out your Enneagram type</h2>
            <p className="mb-6 text-base opacity-90">Take the free Thyself Enneagram Assessment — understand what drives you at work and everywhere else.</p>
            <Link href="/assessments" className="inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90" style={{ color }}>Start the assessment</Link>
          </section>
        </div>
      </main>
    </>
  );
}
