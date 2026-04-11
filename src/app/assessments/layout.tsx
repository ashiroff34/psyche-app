import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assessments | Thyself",
  description: "8 validated assessments: Enneagram, cognitive functions, Big Five Aspects, attachment, Schwartz values, regulatory focus, and decentering index.",
};

export default function AssessmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
