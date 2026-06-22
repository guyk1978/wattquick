import fs from "node:fs";
import path from "node:path";
import { getCalculatorMeta } from "../src/lib/calculators/registry";
import { isCalculatorId } from "../src/lib/calculators/utils";
import type { CalculatorId } from "../src/lib/calculators";

const CUSTOM_DESCRIPTIONS: Partial<Record<CalculatorId, string>> = {
  "battery-percentage": "Easily calculate your remaining battery life.",
};

function shareTitle(registryTitle: string): string {
  return /calculator/i.test(registryTitle)
    ? registryTitle
    : `${registryTitle} Calculator`;
}

const SHARE_IMAGE_PATTERN = /\.(webp|jpe?g)$/i;
const EXT_PRIORITY: Record<string, number> = { webp: 0, jpg: 1, jpeg: 2 };

function shareImageSlug(filename: string): string | null {
  const match = filename.match(/^(.+)\.(webp|jpe?g)$/i);
  return match ? match[1] : null;
}

const shareDir = path.join(process.cwd(), "public/images/share");
const files = fs
  .readdirSync(shareDir)
  .filter((file) => SHARE_IMAGE_PATTERN.test(file));

/** One image per slug — prefer .webp over .jpg */
const fileBySlug = new Map<string, string>();
for (const file of files) {
  const slug = shareImageSlug(file);
  if (!slug) continue;

  const ext = file.match(/\.(webp|jpe?g)$/i)?.[1].toLowerCase() ?? "";
  const existing = fileBySlug.get(slug);
  if (!existing) {
    fileBySlug.set(slug, file);
    continue;
  }

  const existingExt =
    existing.match(/\.(webp|jpe?g)$/i)?.[1].toLowerCase() ?? "";
  if ((EXT_PRIORITY[ext] ?? 99) < (EXT_PRIORITY[existingExt] ?? 99)) {
    fileBySlug.set(slug, file);
  }
}

const sortedSlugs = [...fileBySlug.keys()].sort();

const entries: string[] = [];
const skipped: string[] = [];

for (const id of sortedSlugs) {
  const file = fileBySlug.get(id)!;
  if (!isCalculatorId(id)) {
    skipped.push(id);
    continue;
  }

  const meta = getCalculatorMeta(id);
  const title = shareTitle(meta.title);
  const description = CUSTOM_DESCRIPTIONS[id] ?? meta.description;
  const imageUrl = `/images/share/${file}`;

  entries.push(
    `  "${id}": {\n` +
      `    title: ${JSON.stringify(title)},\n` +
      `    description: ${JSON.stringify(description)},\n` +
      `    imageUrl: ${JSON.stringify(imageUrl)},\n` +
      `  },`
  );
}

const output = `import type { CalculatorId } from "@/lib/calculators";

export type CalculatorShareEntry = {
  title: string;
  description: string;
  /** Path under /public, e.g. /images/share/battery-percentage.webp */
  imageUrl: string;
};

/**
 * Per-calculator share copy and OG preview image.
 * Add a key + image file only — ShareButtons and metadata pick it up automatically.
 * Generated from public/images/share/*.{webp,jpg,jpeg} via scripts/generate-calculator-share-data.ts
 */
export const calculatorShareData: Partial<
  Record<CalculatorId, CalculatorShareEntry>
> = {
${entries.join("\n")}
};
`;

const outPath = path.join(process.cwd(), "src/constants/calculatorShareData.ts");
fs.writeFileSync(outPath, output, "utf8");

console.log(`Wrote ${entries.length} entries to ${outPath}`);
if (skipped.length) {
  console.warn("Skipped (no matching calculator slug):", skipped.join(", "));
}
