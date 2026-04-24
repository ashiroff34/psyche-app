import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 8: The Challenger — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 8 — the core motivation, lust, power, wings (8w7 and 8w9), integration toward Type 2, stress toward Type 5, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 8: The Challenger",
    description: "The Challengers A deep guide to Enneagram Type 8 — the core motivation, lust, power, wings (8w7 ...",
    url: "https://thyself.app/enneagram/type-8",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-8.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 8: The Challenger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 8: The Challenger | Thyself",
    description: "A deep guide to Enneagram Type 8 — the core motivation, lust, power, wings (8w7 and 8w9), integration toward Type 2, str...",
    images: ["https://thyself.app/og/enneagram-type-8.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 8: The Challenger — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 8 — the core motivation, lust, power, wings (8w7 and 8w9), integration toward Type 2, stress toward Type 5, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-8",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-8" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 8: The Challenger", item: "https://thyself.app/enneagram/type-8" },
    ],
  },
};

export default function EnneagramType8Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={8} />
    </>
  );
}
