"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Coins,
  Heart,
  Smile,
  UtensilsCrossed,
  Gamepad2,
  Pill,
  RotateCcw,
  ShoppingBag,
  Lock,
  Crown,
  Sparkles,
  Star,
  Shirt,
  Palette,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Pencil,
  X,
  ArrowRight,
  Flame,
  BookOpen,
  Trophy,
  Gift,
  Zap,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useGameState } from "@/hooks/useGameState";
import {
  usePetState,
  SUBTYPE_DISPLAY_NAMES,
  PET_DEFINITIONS,
  OUTFIT_ITEMS,
  PET_ACTIONS,
  getPetStatusLabel,
  type OutfitCategory,
  type OutfitItem,
} from "@/hooks/usePetState";
import ChibiSprite from "@/components/ChibiSprite";
import PetSprite from "@/components/PetSprite";
import NextStepBanner from "@/components/NextStepBanner";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const petBounce = {
  animate: { y: [0, -8, 0] },
  transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const },
};

const deadPet = {
  animate: { rotate: [0, -5, 5, -5, 0], opacity: 0.4 },
  transition: { repeat: Infinity, duration: 4, ease: "easeInOut" as const },
};

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(99, 102, 241, 0.3)",
      "0 0 40px rgba(99, 102, 241, 0.6)",
      "0 0 20px rgba(99, 102, 241, 0.3)",
    ],
  },
  transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getChibiPath(type: number, instinct: string): string {
  const inst = instinct?.toLowerCase().slice(0, 2) || "sp";
  return `/sprites/chibi/${type}-${inst}${type}.png`;
}

function getDominantInstinct(stacking?: string): string {
  if (!stacking) return "sp";
  const parts = stacking.toLowerCase().split("/");
  return parts[0] || "sp";
}

function getSubtypeKey(type: number, instinct: string): string {
  return `${instinct}${type}`;
}

// ─── Stat Bar Component ──────────────────────────────────────────────────────

function StatBar({ label, value, max, color, icon }: { label: string; value: number; max: number; color: string; icon: React.ReactNode }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 flex justify-center">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-300 font-medium">{label}</span>
          <span className="text-slate-400">{value}/{max}</span>
        </div>
        <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Slot Component ──────────────────────────────────────────────────────────

function EquipmentSlot({ slot, equippedItemId, icon, label, onUnequip, onBrowse }: { slot: OutfitCategory; equippedItemId?: string; icon: React.ReactNode; label: string; onUnequip?: () => void; onBrowse?: () => void }) {
  const item = equippedItemId ? OUTFIT_ITEMS.find((i) => i.id === equippedItemId) : null;
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={item ? onUnequip : onBrowse}
        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all group relative ${
          item
            ? "border-indigo-400/60 bg-indigo-900/40 shadow-lg shadow-indigo-500/20 hover:border-rose-400/60 hover:bg-rose-900/30 cursor-pointer"
            : "border-slate-600/40 bg-slate-800/30 hover:border-amber-400/50 hover:bg-amber-900/20 cursor-pointer"
        }`}
        title={item ? `Remove ${item.name}` : `Browse ${label}`}
      >
        {item ? (
          <>
            <span className="group-hover:opacity-0 transition-opacity">{item.emoji}</span>
            <X className="w-4 h-4 text-rose-400 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <span className="text-slate-500">{icon}</span>
        )}
      </button>
      <span className="text-[10px] text-slate-400 font-medium">{item ? item.name : label}</span>
    </div>
  );
}

// ─── Shop Item Card ──────────────────────────────────────────────────────────

function ShopItemCard({
  item,
  owned,
  equipped,
  tokens,
  onBuy,
  onEquip,
}: {
  item: OutfitItem;
  owned: boolean;
  equipped: boolean;
  tokens: number;
  onBuy: () => void;
  onEquip: () => void;
}) {
  const canAfford = tokens >= item.cost;
  return (
    <motion.div
      className={`rounded-xl p-4 border transition-all ${
        equipped
          ? "border-indigo-400/60 bg-indigo-950/60 shadow-lg shadow-indigo-500/10"
          : owned
          ? "border-emerald-500/30 bg-slate-800/60"
          : "border-slate-700/40 bg-slate-800/40 hover:border-slate-600/60"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Preview */}
      <div className={`w-full aspect-square rounded-lg mb-3 flex items-center justify-center text-4xl ${
        item.gradient ? `bg-gradient-to-br ${item.gradient}` : "bg-slate-700/40"
      }`}>
        {item.emoji}
      </div>

      {/* Info */}
      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 min-h-[28px]">{item.description}</p>

      {/* Action */}
      <div className="mt-3">
        {equipped ? (
          <div className="flex items-center justify-center gap-1 text-xs font-semibold text-indigo-300 bg-indigo-500/20 rounded-lg py-2">
            <Check className="w-3.5 h-3.5" /> Equipped
          </div>
        ) : owned ? (
          <button
            onClick={onEquip}
            className="w-full text-xs font-semibold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg py-2 transition-colors"
          >
            Equip
          </button>
        ) : (
          <button
            onClick={onBuy}
            disabled={!canAfford}
            className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg py-2 transition-colors ${
              canAfford
                ? "text-amber-300 bg-amber-500/20 hover:bg-amber-500/30"
                : "text-slate-500 bg-slate-700/30 cursor-not-allowed"
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            {item.cost}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AvatarPage() {
  const { profile, loaded: profileLoaded } = useProfile();
  const { state: gameState, loaded: gameLoaded, spendTokens } = useGameState();
  const enneagramType = profile.enneagramType ?? profile.enneagramCore;
  const { petState, loaded: petLoaded, feedPet, playWithPet, giveMedicine, revivePet, renamePet, buyItem, equipItem, unequipItem } = usePetState(enneagramType);

  const [activeShopCategory, setActiveShopCategory] = useState<OutfitCategory | "all">("all");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const loaded = profileLoaded && gameLoaded && petLoaded;

  // Get user's dominant instinct
  const dominantInstinct = getDominantInstinct(profile.instinctualStacking);
  const subtypeKey = enneagramType ? getSubtypeKey(enneagramType, dominantInstinct) : null;
  const chibiPath = enneagramType ? getChibiPath(enneagramType, dominantInstinct) : null;
  const subtypeDisplayName = subtypeKey ? SUBTYPE_DISPLAY_NAMES[subtypeKey] : null;
  const petDef = enneagramType ? PET_DEFINITIONS.find((p) => p.type === enneagramType) : null;
  const petStatus = petState ? getPetStatusLabel(petState) : null;

  // Focus name input
  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editingName]);

  // Clear action feedback
  useEffect(() => {
    if (actionFeedback) {
      const t = setTimeout(() => setActionFeedback(null), 2000);
      return () => clearTimeout(t);
    }
  }, [actionFeedback]);

  useEffect(() => {
    if (purchaseFeedback) {
      const t = setTimeout(() => setPurchaseFeedback(null), 2000);
      return () => clearTimeout(t);
    }
  }, [purchaseFeedback]);

  // Shop items filtered
  const shopItems = activeShopCategory === "all"
    ? OUTFIT_ITEMS
    : OUTFIT_ITEMS.filter((i) => i.category === activeShopCategory);

  const shopCategories: { key: OutfitCategory | "all"; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: "hat", label: "Hats", icon: <Crown className="w-3.5 h-3.5" /> },
    { key: "outfit", label: "Frames", icon: <Shirt className="w-3.5 h-3.5" /> },
    { key: "accessory", label: "Accessories", icon: <Star className="w-3.5 h-3.5" /> },
    { key: "background", label: "Backgrounds", icon: <ImageIcon className="w-3.5 h-3.5" /> },
  ];

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleFeed = () => {
    if (!petState?.isAlive) return;
    const ok = feedPet(spendTokens);
    setActionFeedback(ok ? "+30 Hunger, +10 Happiness!" : "Not enough tokens!");
  };

  const handlePlay = () => {
    if (!petState?.isAlive) return;
    const ok = playWithPet(spendTokens);
    setActionFeedback(ok ? "+20 Happiness, +5 Health!" : "Not enough tokens!");
  };

  const handleMedicine = () => {
    if (!petState?.isAlive) return;
    const ok = giveMedicine(spendTokens);
    setActionFeedback(ok ? "+50 Health!" : "Not enough tokens!");
  };

  const handleReviveTokens = () => {
    const ok = revivePet("tokens", spendTokens);
    setActionFeedback(ok ? "Pet revived!" : "Not enough tokens!");
  };

  const handleReviveDaily = () => {
    revivePet("daily");
    setActionFeedback("Revival started! Come back daily for 7 days.");
  };

  const handleBuy = (itemId: string) => {
    const ok = buyItem(itemId, spendTokens);
    setPurchaseFeedback(ok ? "Purchased!" : "Not enough tokens!");
  };

  const handleEquip = (itemId: string) => {
    equipItem(itemId);
  };

  const handleNameSubmit = () => {
    if (nameInput.trim()) {
      renamePet(nameInput.trim());
    }
    setEditingName(false);
  };

  // ── Loading State ───────────────────────────────────────────────────────────

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full"
        />
      </div>
    );
  }

  // Background item for chibi display
  const bgItem = petState?.equippedItems.background
    ? OUTFIT_ITEMS.find((i) => i.id === petState.equippedItems.background)
    : null;
  const frameItem = petState?.equippedItems.outfit
    ? OUTFIT_ITEMS.find((i) => i.id === petState.equippedItems.outfit)
    : null;
  const hatItem = petState?.equippedItems.hat
    ? OUTFIT_ITEMS.find((i) => i.id === petState.equippedItems.hat)
    : null;
  const accItem = petState?.equippedItems.accessory
    ? OUTFIT_ITEMS.find((i) => i.id === petState.equippedItems.accessory)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 pb-24">
      {/* ── Token Balance Header ─────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-300">{gameState.tokens}</span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">tokens</span>
          </div>
          <Link
            href="/game"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            Earn more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-serif font-bold text-white mb-1">Your Avatar & Pet</h1>
          <p className="text-sm text-slate-400">Customize your chibi, care for your pet, and collect outfits.</p>
        </div>

        {/* ── Earn Tokens Banner ──────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp}
          className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/30 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-indigo-200 mb-2 flex items-center gap-2">
            <Gift className="w-4 h-4 text-indigo-400" />
            How to Earn Tokens
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: <Flame className="w-3.5 h-3.5" />, label: "Daily Goal", reward: "+15" },
              { icon: <Trophy className="w-3.5 h-3.5" />, label: "Level Up", reward: "+lvl×5" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "7-Day Streak", reward: "+25" },
              { icon: <BookOpen className="w-3.5 h-3.5" />, label: "Badge", reward: "+10" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-slate-800/40 rounded-lg px-2.5 py-2">
                <span className="text-indigo-400">{item.icon}</span>
                <div>
                  <div className="text-[11px] text-slate-300 font-medium">{item.label}</div>
                  <div className="text-[10px] text-amber-400 font-bold">{item.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── YOUR CHIBI SECTION ──────────────────────────────────────────────  */}
        {/* ══════════════════════════════════════════════════════════════════════ */}

        <motion.section {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Your Chibi
          </h2>

          {enneagramType && chibiPath ? (
            <div className="flex flex-col items-center">
              {/* Chibi Display with cosmetics */}
              <motion.div
                {...pulseGlow}
                className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl flex items-center justify-center overflow-hidden ${
                  bgItem?.gradient
                    ? `bg-gradient-to-br ${bgItem.gradient}`
                    : "bg-gradient-to-br from-indigo-900/60 to-purple-900/60"
                }`}
                style={frameItem?.gradient ? {
                  border: "3px solid transparent",
                  backgroundClip: "padding-box",
                } : {
                  border: "3px solid rgba(99, 102, 241, 0.3)",
                }}
              >
                {/* Frame overlay */}
                {frameItem && (
                  <div className={`absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-br ${frameItem.gradient} opacity-30 pointer-events-none`}
                    style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "xor", WebkitMaskComposite: "xor", padding: "4px" }}
                  />
                )}

                {/* Hat */}
                {hatItem && (
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 text-3xl z-10 drop-shadow-lg">
                    {hatItem.emoji}
                  </div>
                )}

                {/* Accessory sparkles */}
                {accItem && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="absolute top-4 right-4 text-xl">{accItem.emoji}</span>
                    <span className="absolute bottom-6 left-4 text-lg">{accItem.emoji}</span>
                    <span className="absolute top-10 left-6 text-sm">{accItem.emoji}</span>
                  </motion.div>
                )}

                {/* Chibi image */}
                <div className="relative z-[5]">
                  <ChibiSprite
                    type={enneagramType}
                    instinct={dominantInstinct}
                    size={300}
                    state="idle"
                    className="drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Subtype label */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-4 py-1.5">
                  <span className="text-sm font-bold text-indigo-200">
                    {dominantInstinct}{enneagramType}
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-sm text-indigo-300">{subtypeDisplayName ?? `Type ${enneagramType}`}</span>
                </div>
              </motion.div>

              {/* Equipment Slots */}
              <div className="mt-6 w-full max-w-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-300">Outfit Slots</h3>
                  <button
                    onClick={() => shopRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" /> Shop
                  </button>
                </div>
                <div className="flex justify-center gap-4">
                  <EquipmentSlot
                    slot="hat"
                    equippedItemId={petState?.equippedItems.hat}
                    icon={<Crown className="w-5 h-5" />}
                    label="Hat"
                    onUnequip={() => unequipItem("hat")}
                    onBrowse={() => { setActiveShopCategory("hat"); shopRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  />
                  <EquipmentSlot
                    slot="outfit"
                    equippedItemId={petState?.equippedItems.outfit}
                    icon={<Shirt className="w-5 h-5" />}
                    label="Outfit"
                    onUnequip={() => unequipItem("outfit")}
                    onBrowse={() => { setActiveShopCategory("outfit"); shopRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  />
                  <EquipmentSlot
                    slot="accessory"
                    equippedItemId={petState?.equippedItems.accessory}
                    icon={<Star className="w-5 h-5" />}
                    label="Accessory"
                    onUnequip={() => unequipItem("accessory")}
                    onBrowse={() => { setActiveShopCategory("accessory"); shopRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  />
                  <EquipmentSlot
                    slot="background"
                    equippedItemId={petState?.equippedItems.background}
                    icon={<ImageIcon className="w-5 h-5" />}
                    label="BG"
                    onUnequip={() => unequipItem("background")}
                    onBrowse={() => { setActiveShopCategory("background"); shopRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* ── Locked State ────────────────────────────────────────────────── */
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-2xl bg-slate-800/50 border-2 border-dashed border-slate-600/40 flex flex-col items-center justify-center gap-4">
                <Lock className="w-12 h-12 text-slate-500" />
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-slate-400">Discover your type to unlock your chibi!</p>
                </div>
              </div>
              <Link
                href="/enneagram"
                className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                Take the Enneagram Quiz <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── YOUR PET SECTION ────────────────────────────────────────────────  */}
        {/* ══════════════════════════════════════════════════════════════════════ */}

        <motion.section {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            Your Pet
          </h2>

          {petState && petDef ? (
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Pet Display */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-32 h-32 rounded-2xl flex items-center justify-center ${
                      petState.isAlive
                        ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20"
                        : "bg-slate-800/60 border border-slate-600/30 grayscale"
                    }`}
                    {...(petState.isAlive ? petBounce : deadPet)}
                  >
                    {petState.isAlive ? (
                      <PetSprite type={petDef.type} size={96} />
                    ) : (
                      <span className="text-5xl opacity-60">&#x1F480;</span>
                    )}
                  </motion.div>

                  {/* Pet Name (editable) */}
                  <div className="mt-3 flex items-center gap-1.5">
                    {editingName ? (
                      <div className="flex items-center gap-1">
                        <input
                          ref={nameInputRef}
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                          maxLength={20}
                          className="bg-slate-700/60 border border-indigo-500/40 rounded-lg px-2 py-1 text-sm text-white w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                        <button
                          onClick={handleNameSubmit}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingName(false)}
                          className="p-1 text-slate-400 hover:text-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-white">{petState.name}</span>
                        <button
                          onClick={() => { setNameInput(petState.name); setEditingName(true); }}
                          className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{petDef.description}</p>

                  {/* Status Badge */}
                  {petStatus && (
                    <div className={`mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      petStatus.status === "thriving" ? "bg-emerald-500/20 text-emerald-300" :
                      petStatus.status === "happy" ? "bg-green-500/20 text-green-300" :
                      petStatus.status === "okay" ? "bg-yellow-500/20 text-yellow-300" :
                      petStatus.status === "hungry" ? "bg-orange-500/20 text-orange-300" :
                      petStatus.status === "sad" ? "bg-blue-500/20 text-blue-300" :
                      petStatus.status === "sick" ? "bg-red-500/20 text-red-300" :
                      "bg-slate-600/30 text-slate-400"
                    }`}>
                      {petStatus.status === "thriving" && "\u2728"}
                      {petStatus.status === "happy" && "\u{1F60A}"}
                      {petStatus.status === "okay" && "\u{1F642}"}
                      {petStatus.status === "hungry" && "\u{1F37D}\uFE0F"}
                      {petStatus.status === "sad" && "\u{1F622}"}
                      {petStatus.status === "sick" && "\u{1F912}"}
                      {petStatus.status === "dead" && "\u{1F480}"}
                      {" "}{petStatus.label}
                    </div>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="flex-1 w-full space-y-5">
                  {/* Stat Bars */}
                  <div className="space-y-3">
                    <StatBar
                      label="Health"
                      value={petState.health}
                      max={100}
                      color={petState.health > 50 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : petState.health > 20 ? "bg-gradient-to-r from-yellow-500 to-orange-400" : "bg-gradient-to-r from-red-600 to-red-400"}
                      icon={<Heart className="w-4 h-4 text-red-400" />}
                    />
                    <StatBar
                      label="Happiness"
                      value={petState.happiness}
                      max={100}
                      color={petState.happiness > 50 ? "bg-gradient-to-r from-pink-500 to-pink-400" : "bg-gradient-to-r from-blue-500 to-blue-400"}
                      icon={<Smile className="w-4 h-4 text-pink-400" />}
                    />
                    <StatBar
                      label="Hunger"
                      value={petState.hunger}
                      max={100}
                      color={petState.hunger > 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" : petState.hunger > 20 ? "bg-gradient-to-r from-orange-500 to-orange-400" : "bg-gradient-to-r from-red-500 to-red-400"}
                      icon={<UtensilsCrossed className="w-4 h-4 text-amber-400" />}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {petState.isAlive ? (
                      <>
                        <button
                          onClick={handleFeed}
                          className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold transition-colors"
                        >
                          <UtensilsCrossed className="w-3.5 h-3.5" />
                          Feed ({PET_ACTIONS.feed.cost} <Coins className="w-3 h-3 inline" />)
                        </button>
                        <button
                          onClick={handlePlay}
                          className="flex items-center gap-1.5 px-3 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-300 rounded-xl text-xs font-semibold transition-colors"
                        >
                          <Gamepad2 className="w-3.5 h-3.5" />
                          Play ({PET_ACTIONS.play.cost} <Coins className="w-3 h-3 inline" />)
                        </button>
                        {petState.health < 50 && (
                          <button
                            onClick={handleMedicine}
                            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold transition-colors"
                          >
                            <Pill className="w-3.5 h-3.5" />
                            Medicine ({PET_ACTIONS.medicine.cost} <Coins className="w-3 h-3 inline" />)
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleReviveTokens}
                          className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-semibold transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Revive ({PET_ACTIONS.reviveTokens.cost} <Coins className="w-3 h-3 inline" />)
                        </button>
                        <button
                          onClick={handleReviveDaily}
                          className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-semibold transition-colors"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          Daily Revival (7 days)
                        </button>
                        {petState.revivalStartDate && (
                          <div className="w-full mt-2 bg-indigo-900/30 border border-indigo-700/30 rounded-xl px-3 py-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-indigo-300">Revival Progress</span>
                              <span className="text-indigo-200 font-bold">{petState.revivalDaysCompleted}/{PET_ACTIONS.reviveDays} days</span>
                            </div>
                            <div className="mt-1.5 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(petState.revivalDaysCompleted / PET_ACTIONS.reviveDays) * 100}%` }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Come back daily to revive your pet!</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Action Feedback */}
                  <AnimatePresence>
                    {actionFeedback && (
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                          actionFeedback.includes("Not enough")
                            ? "bg-red-500/20 text-red-300"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {actionFeedback}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decay Warning */}
              <div className="mt-4 bg-slate-900/40 border border-slate-700/30 rounded-xl p-3">
                <p className="text-[11px] text-slate-400 text-center">
                  Your pet loses hunger (20/day), happiness (15/day), and health (10/day) for each day you don&apos;t log in. Keep your streaks alive!
                </p>
              </div>
            </div>
          ) : (
            /* No pet yet */
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-8 flex flex-col items-center gap-4">
              <div className="opacity-60">
                {enneagramType ? (
                  <PetSprite type={enneagramType} size={80} />
                ) : (
                  <span className="text-5xl">&#x1F423;</span>
                )}
              </div>
              <p className="text-sm text-slate-400 text-center">
                {enneagramType
                  ? "Your pet is being prepared..."
                  : "Discover your Enneagram type to unlock your pet companion!"}
              </p>
              {!enneagramType && (
                <Link
                  href="/enneagram"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  Take the Quiz <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* ── OUTFIT SHOP SECTION ─────────────────────────────────────────────  */}
        {/* ══════════════════════════════════════════════════════════════════════ */}

        <motion.section
          ref={shopRef}
          {...fadeUp}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            Outfit Shop
          </h2>
          <p className="text-xs text-slate-400 mb-4">Customize your chibi with cute cosmetics!</p>

          {/* Category Tabs */}
          <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
            {shopCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveShopCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeShopCategory === cat.key
                    ? "bg-indigo-500/30 text-indigo-200 border border-indigo-500/40"
                    : "bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:text-slate-300"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Purchase Feedback */}
          <AnimatePresence>
            {purchaseFeedback && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-4 text-xs font-semibold px-3 py-1.5 rounded-lg text-center ${
                  purchaseFeedback.includes("Not enough")
                    ? "bg-red-500/20 text-red-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {purchaseFeedback}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Item Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {shopItems.map((item) => {
              const owned = petState?.ownedItems.includes(item.id) ?? false;
              const equipped = Object.values(petState?.equippedItems ?? {}).includes(item.id);
              return (
                <motion.div key={item.id} variants={fadeUp}>
                  <ShopItemCard
                    item={item}
                    owned={owned}
                    equipped={equipped}
                    tokens={gameState.tokens}
                    onBuy={() => handleBuy(item.id)}
                    onEquip={() => handleEquip(item.id)}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {shopItems.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No items in this category yet.
            </div>
          )}
        </motion.section>

        {/* Next Step */}
        <NextStepBanner
          href="/daily"
          label="Earn tokens with daily practice"
          sublabel="Complete quizzes and challenges to feed your pet and buy outfits"
          icon={<Flame className="w-5 h-5" />}
          color="#f59e0b"
        />

        <div className="h-8" />
      </div>
    </div>
  );
}
