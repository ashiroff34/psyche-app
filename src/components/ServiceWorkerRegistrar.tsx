"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {});

    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      toast("✦ App updated — refreshing…", {
        duration: 1800,
        style: {
          background: "#1a0f2e",
          border: "1px solid rgba(139,92,246,0.35)",
          color: "rgba(255,255,255,0.88)",
          borderRadius: "12px",
          fontSize: "14px",
          padding: "12px 18px",
        },
      });
      setTimeout(() => window.location.reload(), 1900);
    });
  }, []);

  return null;
}
