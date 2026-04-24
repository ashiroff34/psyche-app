import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 2: The Helper — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 2 — the core motivation, pride, relational strategy, wings (2w1 and 2w3), integration toward Type 4, stress toward Type 8, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 2: The Helper",
    description: "The Helpers A deep guide to Enneagram Type 2 — the core motivation, pride, relational strate...",
    url: "https://thyself.app/enneagram/type-2",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-2.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 2: The Helper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 2: The Helper | Thyself",
    description: "A deep guide to Enneagram Type 2 — the core motivation, pride, relational strategy, wings (2w1 and 2w3), integration tow...",
    images: ["https://thyself.app/og/enneagram-type-2.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-2",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 2: The Helper — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 2 — the core motivation, pride, relational strategy, wings (2w1 and 2w3), integration toward Type 4, stress toward Type 8, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-2",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-2" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 2: The Helper", item: "https://thyself.app/enneagram/type-2" },
    ],
  },
};

export default function EnneagramType2Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={2} />
    </>
  );
}
