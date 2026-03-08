import { fal } from '@fal-ai/client';
import * as fs from 'fs';
import * as path from 'path';

// Load .env manually (no dotenv dependency needed)
const envPath = path.join(import.meta.dirname, '..', '.env');
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
}

fal.config({ credentials: process.env.FAL_KEY });

const BASE_IMAGE = '/Users/davidhoffman/Downloads/xxdsjlXEP9tWAFNo0z9FT_MNrN74hw (1).png';
const OUT_DIR = path.join(import.meta.dirname, '..', 'public', 'assets');

// ── Definitions ────────────────────────────────────────────────────────────────

const BODY_VARIANTS = [
  { id: 'blue',   prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to periwinkle blue. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
  { id: 'pink',   prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to soft pink. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
  { id: 'green',  prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to mint green. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
  { id: 'yellow', prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to sunny yellow. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
  { id: 'purple', prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to lavender purple. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
  { id: 'orange', prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to warm orange. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
  { id: 'red',    prompt: 'Remove the snowflake icon from the Fuzzy\'s belly. Leave the belly patch as a plain light-colored oval. Change the fur color to cherry red. Keep everything else identical — eye, antennas, mouth, arms, legs.' },
];

const TUMMY_VARIANTS = [
  { id: 'ice',      prompt: 'A cute snowflake icon, simple flat illustration style, pastel blue, centered on white background, children\'s storybook art, no text, no character' },
  { id: 'heart',    prompt: 'A cute heart icon, simple flat illustration style, pink and red, centered on white background, children\'s storybook art, no text, no character' },
  { id: 'hypno',    prompt: 'A cute spiral hypno swirl icon, simple flat illustration style, alternating purple and green spiral colors, centered on white background, children\'s storybook art, no text, no character' },
  { id: 'icecream', prompt: 'A cute ice cream cone icon with scoops, simple flat illustration style, pastel pink colors, centered on white background, children\'s storybook art, no text, no character, no shadow, no ground shadow, no circle behind it, clean edges' },
  { id: 'tv',       prompt: 'A cute retro television icon with antenna, simple flat illustration style, gray and blue, centered on white background, children\'s storybook art, no text, no character' },
  { id: 'rainbow',  prompt: 'A cute rainbow arc icon, simple flat illustration style, colorful rainbow stripes, centered on white background, children\'s storybook art, no text, no character' },
  { id: 'dragon',   prompt: 'A cute fire flame icon, simple flat illustration style, orange and yellow, centered on white background, children\'s storybook art, no text, no character' },
];

const HAT_VARIANTS = [
  { id: 'cap',        prompt: 'A cute baseball cap, simple flat illustration style, blue and white, front-facing angle, bottom opening not visible, centered on white background, children\'s storybook art, isolated accessory only, no character, no text' },
  { id: 'magic',      prompt: 'A cute tall pointed wizard hat with stars and moon, simple flat illustration style, purple and gold, front-facing angle, bottom opening not visible, centered on white background, children\'s storybook art, isolated accessory only, no character, no text' },
  { id: 'helicopter', prompt: 'A cute propeller beanie helicopter hat, simple flat illustration style, colorful stripes, front-facing angle, bottom opening not visible, centered on white background, children\'s storybook art, isolated accessory only, no character, no text' },
];

const WINGS_VARIANTS = [
  { id: 'dragon', prompt: 'A pair of cute cartoon dragon wings spread wide, symmetrical, simple flat illustration style, dark red and orange membrane, centered on white background, children\'s storybook art, no text, no character, no body, just the wings' },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Edit an existing image (used for body color variants) */
async function generateVariant(imageUrl: string, prompt: string): Promise<string> {
  const result = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
    input: {
      image_urls: [imageUrl],
      prompt,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        for (const log of update.logs ?? []) process.stdout.write('  ' + log.message + '\n');
      }
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = result.data as any;
  const url: string = data?.images?.[0]?.url ?? data?.image?.url ?? data?.output;
  if (!url) throw new Error('No image URL in response: ' + JSON.stringify(data));
  return url;
}

/** Generate a standalone image from text prompt (used for tummies & hats) */
async function generateImage(prompt: string): Promise<string> {
  const result = await fal.subscribe('fal-ai/flux/schnell', {
    input: {
      prompt,
      image_size: 'square',
      num_images: 1,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        for (const log of update.logs ?? []) process.stdout.write('  ' + log.message + '\n');
      }
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = result.data as any;
  const url: string = data?.images?.[0]?.url ?? data?.image?.url ?? data?.output;
  if (!url) throw new Error('No image URL in response: ' + JSON.stringify(data));
  return url;
}

/** Remove background using BiRefNet */
async function removeBackground(imageUrl: string): Promise<string> {
  console.log('  Removing background...');
  const result = await fal.subscribe('fal-ai/birefnet/v2', {
    input: {
      image_url: imageUrl,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        for (const log of update.logs ?? []) process.stdout.write('    ' + log.message + '\n');
      }
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = result.data as any;
  const url: string = data?.image?.url ?? data?.images?.[0]?.url ?? data?.output;
  if (!url) throw new Error('No image URL from birefnet: ' + JSON.stringify(data));
  return url;
}

async function downloadImage(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
  console.log(`  Saved → ${path.relative(process.cwd(), dest)}`);
}

async function uploadBaseImage(): Promise<string> {
  console.log('Uploading base image to fal storage...');
  const file = new File(
    [fs.readFileSync(BASE_IMAGE)],
    'fuzzy-base.png',
    { type: 'image/png' }
  );
  const url = await fal.storage.upload(file);
  console.log('  Uploaded:', url);
  return url;
}

// ── Main ───────────────────────────────────────────────────────────────────────

const SAMPLE_MODE = process.argv.includes('--sample');
const CLEAN_BODY_ONLY = process.argv.includes('--clean-body');
const TUMMIES_ONLY = process.argv.includes('--tummies');
const HATS_ONLY = process.argv.includes('--hats');
const WINGS_ONLY = process.argv.includes('--wings');

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const runAll = !CLEAN_BODY_ONLY && !TUMMIES_ONLY && !HATS_ONLY && !WINGS_ONLY;

  // ── Bodies (edit base image) ──────────────────────────────────────────────
  if (runAll || CLEAN_BODY_ONLY) {
    const baseUrl = await uploadBaseImage();
    const bodies = CLEAN_BODY_ONLY
      ? [BODY_VARIANTS[0]]  // just blue
      : SAMPLE_MODE
        ? BODY_VARIANTS.slice(0, 1)
        : BODY_VARIANTS;

    console.log(`\n--- Generating ${bodies.length} body variant(s) ---\n`);
    for (const v of bodies) {
      console.log(`Generating body-${v.id}...`);
      try {
        const genUrl = await generateVariant(baseUrl, v.prompt);
        const cleanUrl = await removeBackground(genUrl);
        await downloadImage(cleanUrl, path.join(OUT_DIR, `body-${v.id}.png`));
      } catch (err) {
        console.error(`  FAILED body-${v.id}:`, err);
      }
    }
  }

  // ── Tummy icons (text-to-image) ──────────────────────────────────────────
  if (runAll || TUMMIES_ONLY) {
    const tummies = SAMPLE_MODE ? TUMMY_VARIANTS.slice(0, 1) : TUMMY_VARIANTS;

    console.log(`\n--- Generating ${tummies.length} tummy icon(s) ---\n`);
    for (const t of tummies) {
      console.log(`Generating tummy-${t.id}...`);
      try {
        const genUrl = await generateImage(t.prompt);
        const cleanUrl = await removeBackground(genUrl);
        await downloadImage(cleanUrl, path.join(OUT_DIR, `tummy-${t.id}.png`));
      } catch (err) {
        console.error(`  FAILED tummy-${t.id}:`, err);
      }
    }
  }

  // ── Hat accessories (text-to-image) ──────────────────────────────────────
  if (runAll || HATS_ONLY) {
    const hats = SAMPLE_MODE ? HAT_VARIANTS.slice(0, 1) : HAT_VARIANTS;

    console.log(`\n--- Generating ${hats.length} hat accessory(ies) ---\n`);
    for (const h of hats) {
      console.log(`Generating hat-${h.id}...`);
      try {
        const genUrl = await generateImage(h.prompt);
        const cleanUrl = await removeBackground(genUrl);
        await downloadImage(cleanUrl, path.join(OUT_DIR, `hat-${h.id}.png`));
      } catch (err) {
        console.error(`  FAILED hat-${h.id}:`, err);
      }
    }
  }

  // ── Wings (text-to-image) ───────────────────────────────────────────────
  if (runAll || WINGS_ONLY) {
    console.log(`\n--- Generating ${WINGS_VARIANTS.length} wings variant(s) ---\n`);
    for (const w of WINGS_VARIANTS) {
      console.log(`Generating wings-${w.id}...`);
      try {
        const genUrl = await generateImage(w.prompt);
        const cleanUrl = await removeBackground(genUrl);
        await downloadImage(cleanUrl, path.join(OUT_DIR, `wings-${w.id}.png`));
      } catch (err) {
        console.error(`  FAILED wings-${w.id}:`, err);
      }
    }
  }

  console.log('\nDone!');
}

main().catch((err) => { console.error(err); process.exit(1); });
