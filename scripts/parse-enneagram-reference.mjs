/**
 * One-time dev script — parses Enneagram_Complete_Reference.docx into
 * structured TypeScript data files used by the Thyself app.
 *
 * Run: node scripts/parse-enneagram-reference.mjs
 * Requires: ANTHROPIC_API_KEY in environment (or .env.local)
 * Output:   src/data/enneagram-reference.ts
 *
 * This is a BUILD-TIME tool. It is NEVER called at runtime by the app.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Load env ────────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const [k, ...v] = line.split("=");
      if (k && v.length && !process.env[k.trim()]) {
        process.env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
      }
    }
  }
}
loadEnv();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY in .env.local");
  process.exit(1);
}

// ── Read the extracted document text ────────────────────────────────────────
const DOC_TEXT = readFileSync("/tmp/enneagram_full.txt", "utf8");

// ── Claude helper ────────────────────────────────────────────────────────────
async function claude(prompt, systemPrompt = "") {
  const body = {
    model: "claude-opus-4-5",
    max_tokens: 4096,
    system: systemPrompt || "You are a precise data extractor. Return only valid JSON, no markdown fences, no commentary.",
    messages: [{ role: "user", content: prompt }],
  };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

// ── Extract a type's section from the full document ─────────────────────────
function extractTypeSection(typeNum) {
  const start = DOC_TEXT.indexOf(`TYPE ${typeNum} —`);
  const nextTypeNum = typeNum === 9 ? null : typeNum + 1;
  const end = nextTypeNum ? DOC_TEXT.indexOf(`TYPE ${nextTypeNum} —`) : DOC_TEXT.indexOf("PART IV:");
  if (start === -1) return "";
  return DOC_TEXT.slice(start, end === -1 ? start + 15000 : end);
}

function extractSection(startMarker, endMarker) {
  const start = DOC_TEXT.indexOf(startMarker);
  const end = endMarker ? DOC_TEXT.indexOf(endMarker) : start + 20000;
  if (start === -1) return "";
  return DOC_TEXT.slice(start, end === -1 ? start + 20000 : end);
}

// ── Parse one type ───────────────────────────────────────────────────────────
async function parseType(typeNum) {
  console.log(`  Parsing Type ${typeNum}...`);
  const section = extractTypeSection(typeNum);
  if (!section) throw new Error(`Could not find Type ${typeNum} section`);

  const prompt = `
Extract structured data from this Enneagram Type ${typeNum} reference section.
Return a single JSON object with EXACTLY this shape (all strings, no nulls):

{
  "type": ${typeNum},
  "egoName": "string — Ichazo's ego name e.g. Ego-Resent",
  "fixation": "string — the cognitive fixation",
  "passion": "string — the ruling passion/vice",
  "virtue": "string — the virtue that emerges when passion subsides",
  "holyIdea": "string — the holy idea/objective perception",
  "trap": "string — what keeps the fixation running",
  "zone": "string — Historical/Image/Adaptation Ego",
  "instinctZone": "string — Conservation/Self-Preservation OR Relation/Social OR Adaptation/Sexual",
  "defenseMechanism": "string — Naranjo's defense mechanism",
  "dsmCorrelation": "string — DSM personality disorder correlation",
  "horneyTrend": "string — Horney moving toward/against/away",
  "integration": number — type number integrated toward,
  "disintegration": number — type number disintegrated toward,
  "ichazoCoreDescription": "string — 2-4 paragraphs describing the Ichazo arc: passion, fixation, trap, holy idea. Preserve the theoretical depth.",
  "naraCharacterStructure": "string — 2-4 paragraphs on Naranjo's character structure. Include trait cluster, DSM, Horney, Reich if present.",
  "subtypes": {
    "sp": {
      "name": "string — the subtype name/label from Naranjo e.g. Anxiety",
      "isCountertype": false,
      "description": "string — 1-3 paragraphs describing this instinctual variant"
    },
    "so": {
      "name": "string",
      "isCountertype": false,
      "description": "string"
    },
    "sx": {
      "name": "string",
      "isCountertype": true or false,
      "description": "string"
    }
  },
  "keyTraits": ["array of 5-8 key character traits as short strings"],
  "healthyTraits": ["3-5 healthy expression traits"],
  "averageTraits": ["3-5 average expression traits"],
  "unhealthyTraits": ["3-5 unhealthy expression traits"],
  "growthEdge": "string — 1-2 sentences on the core growth direction for this type",
  "coreWound": "string — 1-2 sentences on the underlying wound/loss of essence"
}

SOURCE SECTION:
${section.slice(0, 12000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    // Try to extract JSON from response
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`Failed to parse JSON for Type ${typeNum}: ${raw.slice(0, 200)}`);
  }
}

// ── Parse wings ──────────────────────────────────────────────────────────────
async function parseWings() {
  console.log("  Parsing wings...");
  const section = extractSection("PART IV: WINGS", "PART V:");
  if (!section) return {};

  const prompt = `
From this Enneagram wings reference section, extract wing descriptions for all 9 types.
Return a JSON object keyed by type number (as string) like:
{
  "1": {
    "wing9": { "name": "string e.g. The Idealist", "description": "string — 2-3 sentences" },
    "wing2": { "name": "string e.g. The Advocate", "description": "string — 2-3 sentences" }
  },
  "2": { ... },
  ...
}

SOURCE:
${section.slice(0, 10000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse tritypes ───────────────────────────────────────────────────────────
async function parseTritypes() {
  console.log("  Parsing tritypes...");
  const section = extractSection("PART V: TRITYPES", "PART VI:");
  if (!section) return {};

  const prompt = `
From this Enneagram tritypes reference section, extract the core description of the tritype system.
Return a JSON object:
{
  "systemDescription": "string — 2-3 paragraphs explaining what tritypes are and how they work (from Katherine Fauvre's research)",
  "centersExplanation": "string — how gut/heart/head centers work in tritype",
  "notablePatterns": ["string array of 3-5 notable tritype combination patterns mentioned"]
}

SOURCE:
${section.slice(0, 8000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse instinctual stacking ────────────────────────────────────────────────
async function parseInstinctualStacking() {
  console.log("  Parsing instinctual stacking...");
  const section = extractSection("PART VI: INSTINCTUAL STACKING", "PART VII:");
  if (!section) return {};

  const prompt = `
From this Enneagram instinctual stacking reference section, extract structured data.
Return a JSON object:
{
  "systemDescription": "string — 2-3 paragraphs on what stacking is and how it works",
  "stackings": {
    "sp_so": "string — 1-2 sentences on sp/so stacking character",
    "sp_sx": "string — 1-2 sentences",
    "so_sp": "string",
    "so_sx": "string",
    "sx_sp": "string",
    "sx_so": "string"
  },
  "blindSpot": "string — explanation of the blind spot instinct concept"
}

SOURCE:
${section.slice(0, 6000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse centers ─────────────────────────────────────────────────────────────
async function parseCenters() {
  console.log("  Parsing centers of intelligence...");
  const section = extractSection("PART VII: CENTERS OF INTELLIGENCE", "PART VIII:");
  if (!section) return {};

  const prompt = `
From this Enneagram centers reference section, extract structured data.
Return a JSON object:
{
  "gut": {
    "types": [8, 9, 1],
    "description": "string — 2-3 sentences on the gut/body center",
    "coreEmotion": "Anger",
    "repressedType": number,
    "overexpressedType": number,
    "underexpressedType": number
  },
  "heart": {
    "types": [2, 3, 4],
    "description": "string — 2-3 sentences",
    "coreEmotion": "Shame",
    "repressedType": number,
    "overexpressedType": number,
    "underexpressedType": number
  },
  "head": {
    "types": [5, 6, 7],
    "description": "string — 2-3 sentences",
    "coreEmotion": "Fear",
    "repressedType": number,
    "overexpressedType": number,
    "underexpressedType": number
  }
}

SOURCE:
${section.slice(0, 6000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse holy ideas ──────────────────────────────────────────────────────────
async function parseHolyIdeas() {
  console.log("  Parsing holy ideas...");
  const section = extractSection("PART X: THE HOLY IDEAS", "PART XI:");
  if (!section) return {};

  const prompt = `
From this holy ideas reference section, extract for all 9 types.
Return a JSON object keyed by type number (as string):
{
  "1": {
    "holyIdea": "Holy Perfection",
    "description": "string — 2-3 sentences on this holy idea from Ichazo/Almaas"
  },
  "2": { ... },
  ...
}

SOURCE:
${section.slice(0, 10000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse cross-system correlations ──────────────────────────────────────────
async function parseCrossSystem() {
  console.log("  Parsing cross-system correlations...");
  const section = extractSection("PART IX: TYPE CORRELATIONS", "PART X:");
  if (!section) return {};

  const prompt = `
From this cross-system correlation reference section, extract correlations per type.
Return a JSON object keyed by type number (as string):
{
  "1": {
    "bigFive": "string — Big Five personality trait correlations",
    "jungian": "string — Jungian/MBTI correlations if mentioned",
    "reich": "string — Reichian character type if mentioned",
    "other": "string — any other noted correlations"
  },
  "2": { ... },
  ...
}

SOURCE:
${section.slice(0, 10000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse lines of connection ─────────────────────────────────────────────────
async function parseLines() {
  console.log("  Parsing lines of connection...");
  const section = extractSection("PART VIII: THE LINES OF CONNECTION", "PART IX:");
  if (!section) return {};

  const prompt = `
From this lines of connection reference section, extract integration/disintegration descriptions per type.
Return a JSON object keyed by type number (as string):
{
  "1": {
    "integrationTo": 7,
    "integrationDescription": "string — 1-2 sentences on what happens when type 1 integrates toward 7",
    "disintegrationTo": 4,
    "disintegrationDescription": "string — 1-2 sentences on what happens when type 1 disintegrates toward 4"
  },
  "2": { ... },
  ...
}

SOURCE:
${section.slice(0, 8000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Parse sources section ─────────────────────────────────────────────────────
async function parseSources() {
  console.log("  Parsing sources/foundations...");
  const section = extractSection("PART I: HISTORICAL AND THEORETICAL FOUNDATIONS", "PART II:");

  const prompt = `
From this historical foundations section, extract key information about the primary sources.
Return a JSON object:
{
  "ichazo": {
    "fullName": "Oscar Ichazo",
    "years": "1931–2020",
    "keyContributions": ["array of 3-5 key contributions"],
    "primaryWorks": ["list of primary works mentioned"],
    "bio": "string — 2-3 sentence bio"
  },
  "naranjo": {
    "fullName": "Claudio Naranjo",
    "keyContributions": ["array of 3-5 key contributions"],
    "primaryWorks": ["list of primary works mentioned"],
    "bio": "string — 2-3 sentence bio"
  },
  "risoHudson": {
    "fullName": "Don Riso and Russ Hudson",
    "keyContributions": ["array"],
    "primaryWorks": ["list"],
    "bio": "string"
  },
  "almaas": {
    "fullName": "A.H. Almaas",
    "keyContributions": ["array"],
    "primaryWorks": ["list"],
    "bio": "string"
  },
  "fauvre": {
    "fullName": "Katherine Fauvre",
    "keyContributions": ["array"],
    "primaryWorks": ["list"],
    "bio": "string"
  },
  "chestnut": {
    "fullName": "Beatrice Chestnut",
    "keyContributions": ["array"],
    "primaryWorks": ["list"],
    "bio": "string"
  }
}

SOURCE:
${section.slice(0, 8000)}
`;

  const raw = await claude(prompt);
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return {};
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🔍 Parsing Enneagram_Complete_Reference.docx...\n");

  const knowledge = {
    _meta: {
      source: "Enneagram_Complete_Reference.docx",
      parsedAt: new Date().toISOString(),
      description: "Structured Enneagram knowledge base parsed from primary sources (Ichazo, Naranjo, Riso-Hudson, Almaas, Fauvre, Chestnut). Used as static reference data — no runtime AI calls.",
    },
    types: {},
    wings: {},
    tritypes: {},
    instinctualStacking: {},
    centers: {},
    holyIdeas: {},
    linesOfConnection: {},
    crossSystemCorrelations: {},
    sources: {},
  };

  // Parse all 9 types
  console.log("Parsing types 1-9:");
  for (let t = 1; t <= 9; t++) {
    try {
      knowledge.types[t] = await parseType(t);
    } catch (err) {
      console.error(`  ❌ Type ${t} failed:`, err.message);
      knowledge.types[t] = { type: t, error: err.message };
    }
    // Rate limit pause
    await new Promise(r => setTimeout(r, 800));
  }

  // Parse supporting sections
  console.log("\nParsing supporting sections:");
  try { knowledge.wings = await parseWings(); } catch (e) { console.error("Wings:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.tritypes = await parseTritypes(); } catch (e) { console.error("Tritypes:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.instinctualStacking = await parseInstinctualStacking(); } catch (e) { console.error("Stacking:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.centers = await parseCenters(); } catch (e) { console.error("Centers:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.holyIdeas = await parseHolyIdeas(); } catch (e) { console.error("Holy ideas:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.linesOfConnection = await parseLines(); } catch (e) { console.error("Lines:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.crossSystemCorrelations = await parseCrossSystem(); } catch (e) { console.error("Cross-system:", e.message); }
  await new Promise(r => setTimeout(r, 600));

  try { knowledge.sources = await parseSources(); } catch (e) { console.error("Sources:", e.message); }

  // Write output
  const outputPath = path.join(ROOT, "src/data/enneagram-reference.ts");
  const outputContent = `/**
 * Enneagram Knowledge Base
 *
 * Parsed from: Enneagram_Complete_Reference.docx
 * Primary sources: Ichazo, Naranjo, Riso-Hudson, Almaas, Fauvre, Chestnut
 * Generated: ${new Date().toISOString()}
 *
 * This is STATIC DATA — never regenerated at runtime. No API calls in production.
 * To regenerate: node scripts/parse-enneagram-reference.mjs
 */

export const ENNEAGRAM_REFERENCE = ${JSON.stringify(knowledge, null, 2)} as const;

export type EnneagramTypeNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** Get the full reference data for a specific type */
export function getTypeReference(type: EnneagramTypeNum) {
  return ENNEAGRAM_REFERENCE.types[type as unknown as keyof typeof ENNEAGRAM_REFERENCE.types];
}

/** Get wing descriptions for a specific type */
export function getWingReference(type: EnneagramTypeNum) {
  return ENNEAGRAM_REFERENCE.wings[type as unknown as keyof typeof ENNEAGRAM_REFERENCE.wings];
}

/** Get holy idea for a specific type */
export function getHolyIdea(type: EnneagramTypeNum) {
  return ENNEAGRAM_REFERENCE.holyIdeas[type as unknown as keyof typeof ENNEAGRAM_REFERENCE.holyIdeas];
}

/** Get integration/disintegration lines for a specific type */
export function getLines(type: EnneagramTypeNum) {
  return ENNEAGRAM_REFERENCE.linesOfConnection[type as unknown as keyof typeof ENNEAGRAM_REFERENCE.linesOfConnection];
}

/** Get cross-system correlations for a specific type */
export function getCrossSystem(type: EnneagramTypeNum) {
  return ENNEAGRAM_REFERENCE.crossSystemCorrelations[type as unknown as keyof typeof ENNEAGRAM_REFERENCE.crossSystemCorrelations];
}
`;

  writeFileSync(outputPath, outputContent, "utf8");
  console.log(`\n✅ Written to ${outputPath}`);
  console.log(`   ${outputContent.length.toLocaleString()} chars`);
  console.log("\nTypes parsed:");
  for (let t = 1; t <= 9; t++) {
    const d = knowledge.types[t];
    if (d?.error) console.log(`  Type ${t}: ❌ ${d.error}`);
    else console.log(`  Type ${t}: ✅ ${d?.egoName ?? "?"} | ${d?.subtypes ? "subtypes ok" : "no subtypes"}`);
  }
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
