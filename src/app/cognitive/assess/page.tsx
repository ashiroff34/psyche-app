"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Link from "next/link";

function CognitiveAssessRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/assessments"); }, [router]);
  return <div className="min-h-screen flex items-center justify-center"><p style={{ color: "rgba(255,255,255,0.4)" }}>Redirecting to assessments...</p></div>;
}

export default function CognitiveAssessPage() {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsUnlocked(localStorage.getItem("psyche-cognitive-unlocked") === "true");
  }, []);

  if (!mounted) return <div style={{ minHeight: "100vh", background: "#0f0a1e" }} />;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0f0a1e" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
          <Lock className="w-7 h-7" style={{ color: "#a78bfa" }} />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>Full Cognitive Path</h1>
        <p className="text-sm mb-8 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Unlock the Jungian function stack, your cognitive type, and deep-dive learning.</p>
        <Link href="/store" className="px-6 py-3 rounded-2xl font-bold text-white mb-4" style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
          Unlock in Store
        </Link>
        <Link href="/assessments" className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Back to Assessments</Link>
      </div>
    );
  }

  return <CognitiveAssessRedirect />;
}
