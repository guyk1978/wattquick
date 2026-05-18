import fs from "fs";
import path from "path";

const order = [
  "ah-to-wh",
  "wh-to-ah",
  "kva-to-kw",
  "kw-to-hp",
  "watts-to-amps",
  "amps-to-watts",
  "battery-percentage",
  "battery-runtime",
  "battery-charging-time",
  "battery-bank-size",
  "solar-panel-size",
  "solar-daily-yield",
  "solar-battery-bank",
  "ev-charging-cost",
  "ev-charge-time",
  "appliance-daily-cost",
  "appliance-monthly-energy",
  "inverter-sizing",
  "battery-cost",
  "ups-runtime",
];

const keywordsMap = {
  "ah-to-wh": ["ah to wh", "amp hours to watt hours", "battery energy converter"],
  "wh-to-ah": ["wh to ah", "watt hours to amp hours", "battery capacity converter"],
  "battery-percentage": [
    "battery percentage",
    "state of charge",
    "battery level calculator",
  ],
  "battery-charging-time": [
    "battery charging time",
    "charge time calculator",
    "mAh charging",
  ],
  "battery-runtime": [
    "battery runtime",
    "battery life calculator",
    "how long battery lasts",
  ],
  "watts-to-amps": ["watts to amps", "power to current", "dc amps calculator"],
  "amps-to-watts": ["amps to watts", "current to power", "wattage calculator"],
  "solar-panel-size": ["solar panel size", "solar panel calculator", "pv sizing"],
  "solar-battery-bank": [
    "solar battery bank",
    "off grid battery size",
    "solar storage",
  ],
  "solar-daily-yield": [
    "solar daily yield",
    "solar output calculator",
    "panel output wh",
  ],
  "battery-cost": ["battery cost", "battery price calculator", "cost per wh"],
  "ups-runtime": ["ups runtime", "backup time calculator", "ups battery life"],
  "ev-charging-cost": [
    "ev charging cost",
    "electric car charging cost",
    "home ev charging",
  ],
  "ev-charge-time": [
    "ev charge time",
    "electric car charge time",
    "level 2 charging time",
  ],
  "appliance-daily-cost": [
    "appliance daily cost",
    "electricity cost per day",
    "power cost",
  ],
  "appliance-monthly-energy": [
    "appliance monthly kwh",
    "monthly energy use",
    "kwh per month",
  ],
  "kva-to-kw": ["kva to kw", "apparent power converter", "power factor calculator"],
  "kw-to-hp": ["kw to hp", "kilowatt to horsepower", "motor hp calculator"],
  "battery-bank-size": [
    "battery bank ah",
    "battery bank sizing",
    "amp hour bank",
  ],
  "inverter-sizing": [
    "inverter sizing",
    "inverter size calculator",
    "inverter watts",
  ],
};

const dir = "src/lib/calculators/definitions";
const iconImports = new Map();
const entries = [];

for (const slug of order) {
  const content = fs.readFileSync(path.join(dir, `${slug}.ts`), "utf8");

  const iconMatch = content.match(/import \{ ([^}]+) \} from "lucide-react"/);
  if (!iconMatch) {
    console.error("no icon import for", slug);
    process.exit(1);
  }
  const iconName = iconMatch[1].trim();
  iconImports.set(iconName, iconName);

  const objMatch = content.match(
    /export const \w+Definition: CalculatorDefinition = (\{[\s\S]*\n\});/
  );
  if (!objMatch) {
    console.error("no definition object for", slug);
    process.exit(1);
  }

  let obj = objMatch[1];
  obj = obj.replace(/^\s*id:\s*"[^"]+",\n/m, "");
  obj = obj.replace(/^\s*href:\s*"[^"]+",\n/m, "");

  const keywords = keywordsMap[slug]
    .map((k) => `"${k.replace(/"/g, '\\"')}"`)
    .join(", ");

  obj = obj.replace(
    /(description:\s*"[^"]*",)\n/,
    `$1\n    keywords: [${keywords}],\n`
  );

  entries.push(`  {\n    slug: "${slug}",\n    href: "/${slug}",\n${obj.slice(1)}`);
}

const icons = [...iconImports.keys()].sort().join(", ");
let out = `import {\n  ${icons},\n} from "lucide-react";\n`;
out += `import {\n  formatCurrency,\n  formatDuration,\n  formatNumber,\n  parsePositive,\n} from "@/lib/format";\n`;
out += `import type { CalculatorDataEntry } from "@/data/calculator-types";\n\n`;
out += `/**\n * Single source of truth for all calculator tools.\n * Add a new calculator by appending one object to this array.\n */\n`;
out += `export const calculators = [\n`;
out += entries.join(",\n");
out += `\n] as const satisfies readonly CalculatorDataEntry[];\n\n`;
out += `export type CalculatorSlug = (typeof calculators)[number]["slug"];\n`;
out += `export const CALCULATOR_SLUGS: CalculatorSlug[] = calculators.map((c) => c.slug);\n`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/calculators.ts", out);
console.log("wrote src/data/calculators.ts");
