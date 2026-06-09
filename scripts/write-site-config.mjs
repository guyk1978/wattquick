import { writeFileSync } from "node:fs";
import { join } from "node:path";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

const config = {
  gaMeasurementId,
};

const json = `${JSON.stringify(config, null, 2)}\n`;

writeFileSync(join("public", "site-config.json"), json, "utf8");

if (gaMeasurementId) {
  console.log(`[site-config] GA measurement ID embedded for build.`);
} else {
  console.warn(
    "[site-config] NEXT_PUBLIC_GA_ID is not set — analytics will not load until it is configured in the build environment."
  );
}
