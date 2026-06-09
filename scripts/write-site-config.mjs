import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const configPath = join("public", "site-config.json");

let gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

if (!gaMeasurementId && existsSync(configPath)) {
  try {
    const existing = JSON.parse(readFileSync(configPath, "utf8"));
    gaMeasurementId = existing.gaMeasurementId?.trim() ?? "";
  } catch {
    // keep empty
  }
}

const config = {
  gaMeasurementId,
};

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

if (gaMeasurementId) {
  console.log(`[site-config] GA measurement ID: ${gaMeasurementId}`);
} else {
  console.warn(
    "[site-config] No GA measurement ID — set NEXT_PUBLIC_GA_ID or commit public/site-config.json."
  );
}
