"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function EnneagramAssessRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/assessments"); }, [router]);
  return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-400">Redirecting to assessments...</p></div>;
}
