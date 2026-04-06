"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CognitivePremiumGate from "@/components/CognitivePremiumGate";

function CognitiveAssessRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/assessments"); }, [router]);
  return <div className="min-h-screen flex items-center justify-center"><p style={{ color: "rgba(255,255,255,0.4)" }}>Redirecting to assessments...</p></div>;
}

export default function CognitiveAssessPage() {
  return (
    <CognitivePremiumGate>
      <CognitiveAssessRedirect />
    </CognitivePremiumGate>
  );
}
