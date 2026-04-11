import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three Mirrors | Thyself",
  description: "Triangulate your self-knowledge across three independent lenses: Enneagram motivation, Big Five Aspects traits, and Schwartz values. The interesting insight lives where they disagree.",
};

export default function MirrorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
