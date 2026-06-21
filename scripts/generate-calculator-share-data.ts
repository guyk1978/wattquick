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

const shareDir = path.join(process.cwd(), "public/images/share");
const files = fs
  .readdirSync(shareDir)
  .filter((file) => file.endsWith(".webp"))
  .sort();

const entries: string[] = [];
const skipped: string[] = [];

for (const file of files) {
  const id = file.replace(/\.webp$/, "");
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
 * Generated from public/images/share/*.webp via scripts/generate-calculator-share-data.ts
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
