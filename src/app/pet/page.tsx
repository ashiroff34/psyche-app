"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PetRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/assessments"); }, [router]);
  return null;
}
