import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_COLORS, TYPE_NAMES } from "@/data/enneagram";

const typeNum = 5;
const color = TYPE_COLORS[typeNum];
const typeName = TYPE_NAMES[typeNum];
const canonical = "https://thyself.app/enneagram/type-5/friendship";

export const metadata: Metadata = {
  title:
    "Enneagram Type 5 in Friendship — The Investigator as a Friend | Thyself",
  description:
    "How the Enneagram Type 5 shows up in friendship: what they bring, the patterns they fall into, and what helps a friendship with a Five thrive.",
  alternates: { canonical },
  openGraph: {
    title: "Enneagram Type 5 in Friendship — The Investigator as a Friend",
    description:
      "How the Five shows up as a friend, the gifts they bring, the challenges, and what helps these friendships flourish.",
    url: canonical,
    type: "article",
  },
};

const traits = [
  {
    title: "Intellectual richness",
    body: "Conversations with a Five friend go further than with almost anyone else.",
  },
  {
    title: "Genuine and unpretentious",
    body: "What you see is what there is.",
  },
  {
    title: "Reliable when committed",
    body: "They follow through without fanfare.",
  },
  {
    title: "Deep loyalty to the few they let in",
    body: "When a Five chooses you as a real friend, that loyalty is uncommonly durable.",
  },
];

const challenges = [
  {
    title: "Extended absences without explanation",
    body: "The silence is about them, not the friendship, but it doesn't feel that way.",
  },
  {
    title: "Initiates less than friends would like",
    body: "The relationship requires more effort from the other side than feels equitable.",
  },
  {
    title: "Difficulty with social maintenance",
    body: "Regular check-ins, group events, the ordinary texture of sustained connection.",
  },
];

export default function Type5FriendshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Enneagram Type 5 in Friendship — The Investigator as a Friend",
    description:
      "How the Enneagram Type 5 shows up in friendship, the gifts and challenges they bring, and what helps these friendships thrive.",
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
    author: { "@type": "Organization", name: "Thyself" },
    publisher: {
      "@type": "Organization",
      name: "Thyself",
      url: "https://thyself.app",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <section
          className="px-6 py-16 sm:py-20"
          style={{ backgroundColor: color }}
        >
          <div className="mx-auto max-w-3xl text-white">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {typeNum}
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Type {typeNum} in Friendship
            </h1>
            <p className="mt-2 text-xl text-white/90">{typeName}</p>
            <p className="mt-6 text-lg leading-relaxed text-white/95">
              The Five is a quietly loyal, intellectually rich, and deeply
              genuine friend. Friendship with a Five is rare and valued — they
              do not give it lightly, and when they do, it means something.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              What Type {typeNum} Brings to Friendship
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Fives bring intellectual depth and genuine curiosity to
                friendship — conversations with them can go places other
                friendships don&apos;t reach, and their unique angle on almost
                any question makes them valuable company for anyone who thinks
                seriously. They are also among the most reliable friends in the
                world when they have committed — they do not flake, they do not
                perform, and they are exactly who they appear to be.
              </p>
              <p>
                The limitation is that Five friendship asks patience. They may
                be slow to reach out, slow to initiate, and prone to long
                periods of absence that are about their own need for solitude
                rather than any diminishment of the relationship. Friends who
                interpret this as rejection will find Five friendship
                consistently disappointing.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              As a Friend, Type {typeNum}...
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {traits.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <h3
                    className="text-lg font-semibold"
                    style={{ color }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Friendship Challenges
            </h2>
            <div className="mt-8 space-y-5">
              {challenges.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-gray-700">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Friendship Growth
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3
                  className="text-lg font-semibold"
                  style={{ color }}
                >
                  At their best
                </h3>
                <p className="mt-3 text-gray-700">
                  The Five who has developed their capacity for initiation
                  becomes one of the most distinctive and sustaining friends
                  available — someone who knows you in depth and stays.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  What helps
                </h3>
                <p className="mt-3 text-gray-700">
                  Explicit friendship structures (regular plans, rather than
                  relying on spontaneous contact) and direct reassurance that
                  the connection means something.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Keep exploring</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link
                href={`/enneagram/type-${typeNum}`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Type overview</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum}: {typeName}
                </div>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/relationships`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Relationships</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum} in Relationships
                </div>
              </Link>
              <Link
                href={`/enneagram/type-${typeNum}/communication`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">Communication</div>
                <div className="mt-1 font-semibold text-gray-900">
                  Type {typeNum} Communication Style
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <div
              className="rounded-3xl p-8 text-center text-white sm:p-12"
              style={{ backgroundColor: color }}
            >
              <h2 className="text-3xl font-bold">
                Not sure if you&apos;re a Type {typeNum}?
              </h2>
              <p className="mt-3 text-lg text-white/95">
                Take the Thyself Enneagram Assessment to find your type.
              </p>
              <Link
                href="/assessments"
                className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold transition hover:bg-white/90"
                style={{ color }}
              >
                Take the assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
