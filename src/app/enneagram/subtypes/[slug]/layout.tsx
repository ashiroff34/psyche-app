import type { Metadata } from "next";
import { ENNEAGRAM_SUBTYPES, INSTINCT_LABELS } from "@/data/seo-entities/enneagram-subtypes";

// ─── Static params (all 27 subtypes) ─────────────────────────────────────────

export function generateStaticParams() {
  return ENNEAGRAM_SUBTYPES.map((s) => ({ slug: s.slug }));
}

// ─── Per-subtype SEO metadata ─────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subtype = ENNEAGRAM_SUBTYPES.find((s) => s.slug === slug);

  if (!subtype) {
    return {
      title: "Enneagram Instinctual Subtype | Thyself",
      description: "Explore the 27 instinctual subtypes of the Enneagram with Thyself.",
    };
  }

  const instinctLabel = INSTINCT_LABELS[subtype.instinct];
  const title = `Enneagram Type ${subtype.type} ${instinctLabel}: ${subtype.modernLabel} | Thyself`;
  const url = `https://thyself.app/enneagram/subtypes/${subtype.slug}`;

  return {
    title,
    description: subtype.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description: subtype.metaDescription,
      siteName: "Thyself",
      images: [
        {
          url: `https://thyself.app/og/enneagram-type-${subtype.type}.png`,
          width: 1200,
          height: 630,
          alt: `Enneagram Type ${subtype.type} ${instinctLabel}: ${subtype.modernLabel}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: subtype.metaDescription,
      images: [`https://thyself.app/og/enneagram-type-${subtype.type}.png`],
    },
  };
}

// ─── Layout with JSON-LD structured data ─────────────────────────────────────

export default async function SubtypeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subtype = ENNEAGRAM_SUBTYPES.find((s) => s.slug === slug);

  const jsonLd = subtype
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `Enneagram Type ${subtype.type} ${INSTINCT_LABELS[subtype.instinct]}: ${subtype.modernLabel}`,
        description: subtype.metaDescription,
        url: `https://thyself.app/enneagram/subtypes/${subtype.slug}`,
        author: {
          "@type": "Organization",
          name: "Thyself",
          url: "https://thyself.app",
        },
        publisher: {
          "@type": "Organization",
          name: "Thyself",
          url: "https://thyself.app",
          logo: {
            "@type": "ImageObject",
            url: "https://thyself.app/icon.png",
          },
        },
        about: [
          {
            "@type": "Thing",
            name: `Enneagram Type ${subtype.type}: ${subtype.typeName}`,
            url: `https://thyself.app/enneagram/${subtype.type}`,
          },
          {
            "@type": "Thing",
            name: "Instinctual Subtypes",
            sameAs: "https://en.wikipedia.org/wiki/Enneagram_of_Personality",
          },
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://thyself.app/enneagram/subtypes/${subtype.slug}`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://thyself.app",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Enneagram",
              item: "https://thyself.app/enneagram",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Instinctual Subtypes",
              item: "https://thyself.app/enneagram/subtypes",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: `Type ${subtype.type} ${subtype.instinct}: ${subtype.modernLabel}`,
              item: `https://thyself.app/enneagram/subtypes/${subtype.slug}`,
            },
          ],
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
