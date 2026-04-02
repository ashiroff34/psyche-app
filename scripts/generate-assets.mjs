import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SHOP_DIR = path.join(ROOT, 'public/shop');
const PETS_DIR = path.join(ROOT, 'public/pets');

// Pollinations.ai — free, no key required
// Gemini API key available for when quota resets: AIzaSyCWiI5Z5i_tcU1X_GiNHKcJ_74L9lh5N0E

fs.mkdirSync(SHOP_DIR, { recursive: true });
fs.mkdirSync(PETS_DIR, { recursive: true });

// Shared style guides — tuned for Pollinations flux model
const ICON_STYLE = 'kawaii cute chibi cartoon, anime illustration style, clean crisp lines, vibrant pastel colors, pure solid white background, no gradients in background, centered object only, no text, no shadow, no border';
const PET_STYLE = 'kawaii chibi baby animal sticker, anime illustration, big shiny eyes, rosy blush cheeks, full body standing, soft pastel colors, clean linework, pure white background, no shadow, no text';

const SHOP_ITEMS = [
  { file: 'hat-pirate',       prompt: `${ICON_STYLE}, black pirate tricorn hat with white skull and crossbones emblem, red ribbon` },
  { file: 'hat-tophat',       prompt: `${ICON_STYLE}, elegant black magician top hat with red satin ribbon band` },
  { file: 'hat-party',        prompt: `${ICON_STYLE}, colorful birthday party cone hat with polka dots, pink and gold` },
  { file: 'hat-cowboy',       prompt: `${ICON_STYLE}, tan cowboy hat with gold star badge and brown band` },
  { file: 'hat-witch',        prompt: `${ICON_STYLE}, tall pointed witch hat, black with purple stars and a buckle` },
  { file: 'hat-halo',         prompt: `${ICON_STYLE}, glowing golden angel halo ring, sparkly divine light` },
  { file: 'hat-devilhorns',   prompt: `${ICON_STYLE}, small red devil horns headband with pink inner ears` },
  { file: 'hat-bow',          prompt: `${ICON_STYLE}, large pink satin ribbon bow hair clip with sparkle` },
  { file: 'hat-graduation',   prompt: `${ICON_STYLE}, black graduation mortarboard cap with gold tassel` },
  { file: 'hat-chef',         prompt: `${ICON_STYLE}, tall white chef toque hat with soft folds` },
  { file: 'hat-viking',       prompt: `${ICON_STYLE}, silver viking helmet with two curved horns, metal rivets` },
  { file: 'hat-bunnyears',    prompt: `${ICON_STYLE}, fluffy white bunny ear headband with pink inner ears` },
  { file: 'hat-crown-silver', prompt: `${ICON_STYLE}, elegant silver crown with blue sapphire gems and points` },
  { file: 'hat-sunhat',       prompt: `${ICON_STYLE}, wide brim straw sun hat with pink ribbon and small flower` },
  { file: 'hat-beret',        prompt: `${ICON_STYLE}, classic red french beret hat tilted slightly` },
  { file: 'acc-sunglasses',   prompt: `${ICON_STYLE}, heart-shaped pink sunglasses with shiny lenses` },
  { file: 'acc-scarf',        prompt: `${ICON_STYLE}, cozy red and white striped knit scarf, looped and fluffy` },
  { file: 'acc-wand',         prompt: `${ICON_STYLE}, magic wand with glowing gold star tip and sparkle trail` },
  { file: 'acc-wings',        prompt: `${ICON_STYLE}, delicate pastel fairy wings, rainbow iridescent, translucent` },
  { file: 'acc-backpack',     prompt: `${ICON_STYLE}, tiny pastel blue backpack with gold star patch, cute face` },
];

const NEW_PETS = [
  { file: 'pet-alt-wolf',     prompt: `${PET_STYLE}, gray and white wolf pup, holding a glowing crescent moon` },
  { file: 'pet-alt-deer',     prompt: `${PET_STYLE}, tan fawn with white spots, tiny antler nubs, holding a pink flower` },
  { file: 'pet-alt-penguin',  prompt: `${PET_STYLE}, black and white penguin in a tuxedo, yellow beak, holding a tiny fish` },
  { file: 'pet-alt-bear',     prompt: `${PET_STYLE}, fluffy white polar bear cub, holding a little honey jar` },
  { file: 'pet-alt-phoenix',  prompt: `${PET_STYLE}, golden orange phoenix chick with glowing feathers and warm aura` },
  { file: 'pet-alt-unicorn',  prompt: `${PET_STYLE}, white unicorn foal with pastel rainbow mane and golden horn` },
  { file: 'pet-alt-turtle',   prompt: `${PET_STYLE}, teal sea turtle with a patterned shell, tiny fins, happy smile` },
  { file: 'pet-alt-panda',    prompt: `${PET_STYLE}, chubby black and white panda sitting, holding bamboo stick` },
  { file: 'pet-alt-axolotl',  prompt: `${PET_STYLE}, pink axolotl with fluffy feathery external gills, happy smile` },
  { file: 'pet-alt-capybara', prompt: `${PET_STYLE}, tan capybara sitting calmly, colorful flowers on its head` },
];

async function fetchImage(prompt, seed, retries = 4) {
  const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&model=flux&seed=${seed}&nologo=true`;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const wait = attempt * 15000; // 15s, 30s, 45s, 60s
      process.stdout.write(`(retry ${attempt}, waiting ${wait/1000}s) `);
      await new Promise(r => setTimeout(r, wait));
    }
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
      if (res.status === 429) { continue; } // retry on rate limit
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      if (attempt === retries) throw e;
    }
  }
  throw new Error('Max retries exceeded');
}

async function removeWhiteBg(inputBuf) {
  const { data, info } = await sharp(inputBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const buf = Buffer.from(data);
  const visited = new Uint8Array(width * height);
  const queue = [];
  const T = 30;

  const isWhite = idx => buf[idx] > 255 - T && buf[idx + 1] > 255 - T && buf[idx + 2] > 255 - T;

  [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]].forEach(([x, y]) => {
    const px = y * width + x;
    if (!visited[px] && isWhite(px * channels)) queue.push(px);
  });

  while (queue.length) {
    const px = queue.pop();
    if (visited[px]) continue;
    visited[px] = 1;
    const idx = px * channels;
    if (!isWhite(idx)) continue;
    buf[idx + 3] = 0;
    const x = px % width, y = Math.floor(px / width);
    if (x > 0) queue.push(px - 1);
    if (x < width - 1) queue.push(px + 1);
    if (y > 0) queue.push(px - width);
    if (y < height - 1) queue.push(px + width);
  }

  return sharp(buf, { raw: { width, height, channels } }).png().toBuffer();
}

async function generate(items, dir, seed0) {
  for (let i = 0; i < items.length; i++) {
    const { file, prompt } = items[i];
    const out = path.join(dir, `${file}.png`);
    if (fs.existsSync(out)) { console.log(`⏭  ${file}.png exists`); continue; }
    try {
      process.stdout.write(`🎨 ${file}... `);
      const raw = await fetchImage(prompt, seed0 + i * 13);
      const png = await removeWhiteBg(raw);
      fs.writeFileSync(out, png);
      console.log(`✓ ${Math.round(png.length / 1024)}KB`);
      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
    }
  }
}

console.log('\n🛍  Generating shop items...\n');
await generate(SHOP_ITEMS, SHOP_DIR, 420);

console.log('\n🐾 Generating pet skins...\n');
await generate(NEW_PETS, PETS_DIR, 840);

console.log('\n✅ All done!\n');
