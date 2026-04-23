"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Droplets, Smile, ShoppingBag, Shirt } from "lucide-react";
import Image from "next/image";
import ChibiSprite from "@/components/ChibiSprite";
import { assetPath } from "@/lib/assetPath";
import { usePetState, OUTFIT_ITEMS, type OutfitCategory } from "@/hooks/usePetState";
import { useGameState } from "@/hooks/useGameState";
import { useProfile } from "@/hooks/useProfile";
import { TYPE_COLORS } from "@/data/enneagram";

const PET_NAMES: Record<number, string> = {
  1: "Athena", 2: "Clover", 3: "Blaze", 4: "Luna",
  5: "Corvus", 6: "Scout", 7: "Zippy", 8: "Ember", 9: "Mochi",
};

const CATEGORY_LABELS: Record<OutfitCategory, string> = {
  hat: "Hats",
  outfit: "Frames",
  accessory: "Effects",
  background: "Backgrounds",
};

const CATEGORY_ORDER: OutfitCategory[] = ["hat", "outfit", "accessory", "background"];

const HAT_FILE: Record<string, string> = {
  "crown":        "hat-crown",
  "wizard-hat":   "hat-wizard",
  "flower-crown": "hat-flower",
  "santa-hat":    "hat-santa",
  "cat-ears":     "hat-catears",
};

function StatBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.round((value / max) * 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

export default function PetPage() {
  const { profile } = useProfile();
  const { state: gameState, spendTokens } = useGameState();
  const enneagramType = profile.enneagramType ?? profile.enneagramCore ?? 5;
  const { petState, feedPet, playWithPet, buyItem, equipItem, unequipItem } = usePetState(enneagramType);

  const [mainTab, setMainTab] = useState<"care" | "wardrobe">("care");
  const [wardrobeCategory, setWardrobeCategory] = useState<OutfitCategory>("hat");
  const [fed, setFed] = useState(false);
  const [played, setPlayed] = useState(false);
  const [buyFeedback, setBuyFeedback] = useState<string | null>(null);

  const instinct = profile.instinctualStacking?.split("/")?.[0] ?? "sp";
  const color = TYPE_COLORS[enneagramType] ?? "#8b5cf6";
  const petName = petState?.name ?? PET_NAMES[enneagramType] ?? "your companion";

  const health = petState?.health ?? 80;
  const hunger = petState?.hunger ?? 60;
  const happiness = petState?.happiness ?? 70;
  const isAlive = petState?.isAlive !== false;
  const equippedItems = petState?.equippedItems ?? {};
  const ownedItems = petState?.ownedItems ?? [];
  const tokens = gameState.tokens ?? 0;

  const mood = !isAlive ? "dead"
    : health < 20 ? "sick"
    : happiness < 30 ? "sad"
    : hunger < 30 ? "hungry"
    : health > 80 && happiness > 80 && hunger > 80 ? "thriving"
    : "happy";

  const chibiState = (fed || played) ? "happy"
    : (mood === "sick" || mood === "dead") ? "hurt"
    : "idle";

  const hatFile = equippedItems.hat ? HAT_FILE[equippedItems.hat] : null;
  const hatSrc = hatFile ? assetPath(`/shop/${hatFile}.png`) : null;

  // Feed/play are free from the pet page (no token cost)
  const freeSpend = () => true;

  function handleFeed() {
    if (fed || !isAlive) return;
    feedPet(freeSpend);
    setFed(true);
    setTimeout(() => setFed(false), 4000);
  }

  function handlePlay() {
    if (played || !isAlive) return;
    playWithPet(freeSpend);
    setPlayed(true);
    setTimeout(() => setPlayed(false), 4000);
  }

  function handleBuy(itemId: string, cost: number) {
    const ok = buyItem(itemId, spendTokens);
    if (ok) {
      setBuyFeedback("Got it!");
    } else if (tokens < cost) {
      setBuyFeedback("Not enough tokens");
    } else {
      setBuyFeedback("Already owned");
    }
    setTimeout(() => setBuyFeedback(null), 2000);
  }

  function handleEquip(itemId: string) {
    equipItem(itemId);
  }

  function handleUnequip(slot: OutfitCategory) {
    unequipItem(slot);
  }

  const categoryItems = OUTFIT_ITEMS.filter(i => i.category === wardrobeCategory);

  // Derive background gradient from equipped background item
  const bgItem = equippedItems.background
    ? OUTFIT_ITEMS.find(i => i.id === equippedItems.background)
    : null;
  const sceneGradient = bgItem?.gradient
    ? `linear-gradient(135deg, ${bgItem.gradient.replace(/from-|via-|to-/g, "").split(" ").map(c => `var(--tw-${c}, #1a1a2e)`).join(", ")})`
    : `radial-gradient(ellipse at center, ${color}22 0%, transparent 70%)`;

  return (
    <div className="min-h-screen pb-32 pt-16" style={{ background: "#0f0a1e" }}>
      <div className="max-w-md mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-2 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: `${color}99` }}>
            Type {enneagramType} Companion
          </p>
          <h1 className="text-2xl font-serif font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
            {petName}
          </h1>
          {/* Token balance */}
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            {tokens.toLocaleString()} tokens
          </p>
        </div>

        {/* Pet scene */}
        <div
          className="flex flex-col items-center py-8 rounded-3xl mb-5 relative overflow-hidden"
          style={{ background: `radial-gradient(ellipse at center, ${color}18 0%, rgba(15,10,30,0.6) 70%)` }}
        >
          {bgItem && (
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{ background: `linear-gradient(135deg, #${bgItem.cssClass})` }}
            />
          )}

          <div className="relative inline-block">
            <ChibiSprite
              type={enneagramType}
              instinct={instinct}
              size={140}
              state={chibiState}
            />
            {hatSrc && (
              <Image
                src={hatSrc}
                alt="hat"
                width={140}
                height={140}
                style={{
                  position: "absolute",
                  top: "-4.5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "68%",
                  height: "68%",
                  objectFit: "contain",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* Shadow */}
          <div
            className="w-20 h-3 rounded-full -mt-2"
            style={{ background: `radial-gradient(ellipse, ${color}40, transparent)` }}
          />

          {/* Speech bubble */}
          <AnimatePresence>
            {(fed || played || buyFeedback) && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.9 }}
                className="mt-4 px-4 py-2 rounded-2xl text-sm font-semibold"
                style={{ background: `${color}22`, border: `1px solid ${color}44`, color: "rgba(255,255,255,0.85)" }}
              >
                {buyFeedback ?? (fed ? "(^_^) thank you!" : "(o^_^o) yay!")}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-4 mb-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Health</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{health}/100</span>
              </div>
              <StatBar value={health} color="linear-gradient(90deg, #f43f5e, #fb7185)" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Hunger</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{hunger}/100</span>
              </div>
              <StatBar value={hunger} color="linear-gradient(90deg, #3b82f6, #60a5fa)" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Happiness</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{happiness}/100</span>
              </div>
              <StatBar value={happiness} color="linear-gradient(90deg, #f59e0b, #fbbf24)" />
            </div>
          </div>
        </div>

        {/* Main tabs */}
        <div className="flex gap-1 mb-4 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
          {(["care", "wardrobe"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMainTab(tab)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: mainTab === tab ? "rgba(139,92,246,0.25)" : "transparent",
                color: mainTab === tab ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                border: mainTab === tab ? "1px solid rgba(139,92,246,0.3)" : "1px solid transparent",
              }}
            >
              {tab === "care" ? <Heart className="w-3.5 h-3.5" /> : <Shirt className="w-3.5 h-3.5" />}
              {tab === "care" ? "Care" : "Wardrobe"}
            </button>
          ))}
        </div>

        {/* Care tab */}
        {mainTab === "care" && (
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handleFeed}
              disabled={fed || !isAlive}
              className="py-3.5 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-40"
              style={{ background: fed ? "rgba(255,255,255,0.06)" : `linear-gradient(135deg, ${color}cc, ${color}88)` }}
            >
              {fed ? "(-_-) full" : "Feed"}
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handlePlay}
              disabled={played || !isAlive}
              className="py-3.5 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-40"
              style={{ background: played ? "rgba(255,255,255,0.06)" : "rgba(139,92,246,0.3)" }}
            >
              {played ? "(-_-) tired" : "Play"}
            </motion.button>
          </div>
        )}

        {/* Wardrobe tab */}
        {mainTab === "wardrobe" && (
          <div>
            {/* Currently equipped */}
            {Object.entries(equippedItems).length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Currently equipped
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(equippedItems) as [OutfitCategory, string][]).map(([slot, itemId]) => {
                    const item = OUTFIT_ITEMS.find(i => i.id === itemId);
                    if (!item) return null;
                    return (
                      <div
                        key={slot}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
                      >
                        <span className="text-sm">{item.emoji}</span>
                        <span className="text-xs font-semibold" style={{ color: "#c4b5fd" }}>{item.name}</span>
                        <button
                          type="button"
                          onClick={() => handleUnequip(slot)}
                          className="text-[10px] ml-1 opacity-50 hover:opacity-100"
                          style={{ color: "#c4b5fd" }}
                          aria-label={`Unequip ${item.name}`}
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category tabs */}
            <div className="flex gap-1 mb-4 overflow-x-auto">
              {CATEGORY_ORDER.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setWardrobeCategory(cat)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: wardrobeCategory === cat ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.05)",
                    color: wardrobeCategory === cat ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                    border: wardrobeCategory === cat ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 gap-3">
              {categoryItems.map((item) => {
                const owned = ownedItems.includes(item.id);
                const equipped = equippedItems[item.category] === item.id;
                const canAfford = tokens >= item.cost;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl p-3"
                    style={{
                      background: equipped ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.04)",
                      border: equipped ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate" style={{ color: equipped ? "#c4b5fd" : "rgba(255,255,255,0.85)" }}>
                          {item.name}
                        </p>
                        <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {owned ? (
                      <button
                        type="button"
                        onClick={() => equipped ? handleUnequip(item.category) : handleEquip(item.id)}
                        className="w-full py-1.5 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: equipped ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.08)",
                          color: equipped ? "#c4b5fd" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {equipped ? "Unequip" : "Equip"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleBuy(item.id, item.cost)}
                        disabled={!canAfford}
                        className="w-full py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-35"
                        style={{
                          background: canAfford ? `linear-gradient(135deg, ${color}99, ${color}55)` : "rgba(255,255,255,0.06)",
                          color: canAfford ? "white" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        <ShoppingBag className="w-3 h-3 inline mr-1" />
                        {item.cost} tokens
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {ownedItems.length === 0 && (
              <p className="text-xs text-center mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
                Complete daily practice to earn tokens, then come back to dress up {petName}.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
