import fs from "fs";
import path from "path";
import { CALCULATOR_SLUGS } from "../src/data/calculators";

const ratings = Object.fromEntries(
  CALCULATOR_SLUGS.map((slug) => [slug, { sum: 0, count: 0 }])
);

const outDir = path.join(process.cwd(), "public/data");
fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "calculator-ratings.json");
fs.writeFileSync(outPath, `${JSON.stringify(ratings, null, 2)}\n`);

console.log(
  `✅ Calculator ratings seed written (${CALCULATOR_SLUGS.length} tools) → ${outPath}`
);
