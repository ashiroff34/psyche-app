"use client";

// Beta Landing Page
//
// Beautiful signup page with feature previews, social proof framing,
// and embedded Google Form link. This replaces sharing the raw Google
// Form link — share thyself.app/beta instead.

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, Brain, Heart, Zap, Shield, Star, Users, Clock } from "lucide-react";
import Link from "next/link";
import ChibiSprite from "@/components/ChibiSprite";

const FEATURES = [
  {
    icon: Brain,
    title: "Predicts your reactions",
    description: "Tell it what situation you're facing. It shows how your type will probably respond, and what the alternative looks like.",
    color: "#8b5cf6",
  },
  {
    icon: Eye,
    title: "Surfaces your blind spots",
    description: "Cross-references your behavioral data to find patterns your type is literally built not to notice.",
    color: "#d946ef",
  },
  {
    icon: Heart,
    title: "Shadow Dialogue",
    description: "A live conversation between your dominant type voice and your integration voice. You choose which to speak as.",
    color: "#ec4899",
  },
  {
    icon: Sparkles,
    title: "Living Mirror",
    description: "A letter from your future self, written in your own words, based on how your language has changed over time.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Personality Archaeology",
    description: "How your type actually formed. Not 'you're a 4 because you're sad.' The why underneath.",
    color: "#10b981",
  },
  {
    icon: Zap,
    title: "31 lesson units",
    description: "From 'know thyself' through philosophy to 'is there a thyself?' Grounded in Riso-Hudson, Chestnut, Fleeson, DeYoung.",
    color: "#6366f1",
  },
];

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSerCIG8vYXf4Po6L7wbxIYtuCa7BxQf5PPxeGo003IrKGI5lA/viewform";

export default function BetaPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-white overflow-y-auto" style={{ background: "#08031a" }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(139,92,246,0.2) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-lg mx-auto px-6 pt-16 pb-12 text-center">
          {/* Chibi row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-end gap-1 mb-8"
          >
            {[4, 7, 1, 5, 9].map((type, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <ChibiSprite type={type} size={i === 2 ? 90 : 65} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "#a78bfa" }}>
              Coming soon
            </p>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Know thyself.
              <br />
              <span style={{ color: "#a78bfa" }}>For real this time.</span>
            </h1>
            <p className="text-base opacity-70 leading-relaxed mb-8 max-w-sm mx-auto">
              A personality app built on actual research. Not a quiz. A curriculum that goes from understanding your type to questioning what a self even is. Beta launching soon.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #d946ef)",
              boxShadow: "0 8px 32px rgba(124,58,237,0.5)",
            }}
          >
            Get on the waitlist
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs opacity-40 mt-4"
          >
            Free. First 50 get permanent founding access when beta opens.
          </motion.p>
        </div>
      </div>

      {/* What makes it different */}
      <div className="max-w-lg mx-auto px-6 pb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-center mb-8"
          style={{ color: "#a78bfa" }}
        >
          Features that don't exist anywhere else
        </motion.p>

        <div className="space-y-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="p-4 rounded-2xl transition-all"
                style={{
                  background: hoveredFeature === i ? `${f.color}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredFeature === i ? `${f.color}35` : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${f.color}18`, color: f.color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5">{f.title}</p>
                    <p className="text-xs opacity-60 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats / social proof */}
      <div className="max-w-lg mx-auto px-6 pb-12">
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: "31", label: "lesson units", icon: Star },
            { num: "1,247", label: "exercises", icon: Zap },
            { num: "8", label: "assessments", icon: Brain },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl text-center"
                style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}
              >
                <Icon className="w-4 h-4 mx-auto mb-2 text-violet-400" />
                <p className="text-xl font-black">{stat.num}</p>
                <p className="text-[10px] opacity-50">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Research credibility */}
      <div className="max-w-lg mx-auto px-6 pb-12">
        <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">Built on real research</p>
          <div className="flex flex-wrap gap-2">
            {["Riso-Hudson", "Chestnut", "Fleeson", "DeYoung", "Schwartz", "Matz & Kosinski", "Kegan", "Fresco", "Damasio", "Pennebaker"].map(name => (
              <span key={name} className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#c4b5fd" }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What founding testers get */}
      <div className="max-w-lg mx-auto px-6 pb-12">
        <div className="p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(217,70,239,0.06))", border: "1px solid rgba(139,92,246,0.22)" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300 mb-4">What the first 50 get</p>
          <div className="space-y-3">
            {[
              { icon: Star, text: "Permanent early access to every feature, forever" },
              { icon: Users, text: "Direct input on the roadmap. You shape what gets built." },
              { icon: Zap, text: "All content unlocked. No paywalls during beta." },
              { icon: Clock, text: "Your name in the credits if you want it." },
            ].map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                  <p className="text-sm opacity-85">{perk.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-lg mx-auto px-6 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl font-bold mb-2">Be first.</p>
          <p className="text-sm opacity-60 mb-6">First 50 signups get founding member access when beta opens.</p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #d946ef)",
              boxShadow: "0 8px 32px rgba(124,58,237,0.5)",
            }}
          >
            Join the waitlist
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[10px] opacity-30 mt-6">
            All data stays on your device. We don't sell anything. Ever.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
