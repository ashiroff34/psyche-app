import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enneagram | Thyself",
  description: "Explore the 9 Enneagram types, 27 instinctual subtypes, integration and disintegration lines, and type-specific growth paths. Grounded in Ichazo, Naranjo, and Riso-Hudson.",
};

export default function EnneagramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
