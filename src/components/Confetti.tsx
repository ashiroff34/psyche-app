"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: "square" | "circle" | "strip";
}

const DEFAULT_COLORS = [
  "#6366f1", "#0ea5e9", "#f59e0b", "#ec4899", "#10b981",
  "#8b5cf6", "#f97316", "#14b8a6", "#e11d48", "#3b82f6",
];

export default function Confetti({
  active,
  duration = 2000,
  particleCount = 60,
  colors,
}: {
  active: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const startTime = useRef<number>(0);

  const createParticles = useCallback(() => {
    const p: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const shapes: Particle["shape"][] = ["square", "circle", "strip"];
      p.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 8 + 4,
        color: (colors ?? DEFAULT_COLORS)[Math.floor(Math.random() * (colors ?? DEFAULT_COLORS).length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * 3)],
      });
    }
    return p;
  }, [particleCount, colors]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.current = createParticles();
    startTime.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fadeStart = duration * 0.6;
      const globalFade = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (duration - fadeStart) : 1;

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.vy += 0.1; // gravity
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity = globalFade;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "square") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 4, -p.size, p.size / 2, p.size * 2);
        }

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [active, duration, createParticles, colors]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
