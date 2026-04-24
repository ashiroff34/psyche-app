import type { Metadata } from "next";
import EnneagramTypePage from "@/components/seo/EnneagramTypePage";

export const metadata: Metadata = {
  title: "Enneagram Type 7: The Enthusiast — Traits, Growth & Psychology | Thyself",
  description: "A deep guide to Enneagram Type 7 — the core motivation, gluttony, future-orientation, wings (7w6 and 7w8), integration toward Type 5, stress toward Type 1, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  openGraph: {
    title: "Enneagram Type 7: The Enthusiast",
    description: "The Enthusiasts A deep guide to Enneagram Type 7 — the core motivation, gluttony, future-orienta...",
    url: "https://thyself.app/enneagram/type-7",
    type: "article",
    siteName: "Thyself",
    images: [
      {
        url: "https://thyself.app/og/enneagram-type-7.png",
        width: 1200,
        height: 630,
        alt: "Enneagram Type 7: The Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Type 7: The Enthusiast | Thyself",
    description: "A deep guide to Enneagram Type 7 — the core motivation, gluttony, future-orientation, wings (7w6 and 7w8), integration t...",
    images: ["https://thyself.app/og/enneagram-type-7.png"],
  },
  alternates: {
    canonical: "https://thyself.app/enneagram/type-7",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enneagram Type 7: The Enthusiast — Traits, Growth & Psychology",
  description: "A deep guide to Enneagram Type 7 — the core motivation, gluttony, future-orientation, wings (7w6 and 7w8), integration toward Type 5, stress toward Type 1, and the authentic growth path. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
  author: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  publisher: { "@type": "Organization", name: "Thyself", url: "https://thyself.app" },
  url: "https://thyself.app/enneagram/type-7",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thyself.app/enneagram/type-7" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thyself.app" },
      { "@type": "ListItem", position: 2, name: "Enneagram", item: "https://thyself.app/enneagram" },
      { "@type": "ListItem", position: 3, name: "Type 7: The Enthusiast", item: "https://thyself.app/enneagram/type-7" },
    ],
  },
};

export default function EnneagramType7Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnneagramTypePage typeNum={7} />
    </>
  );
}
