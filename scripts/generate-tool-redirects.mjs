/**
 * Appends legacy flat tool URL redirects to public/_redirects for Cloudflare Pages.
 * Run during prebuild so /{tool-slug}/ → /tools/{category}/{tool-slug}/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REDIRECTS_PATH = path.join(ROOT, "public/_redirects");
const MARKER = "# tool-legacy-redirects";

function readCalculatorRedirects() {
  const result = spawnSync(
    "npx",
    ["tsx", path.join(__dirname, "tool-redirects.ts")],
    { cwd: ROOT, encoding: "utf8", shell: true }
  );

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    throw new Error("Failed to generate tool redirects");
  }

  return result.stdout.trim();
}

function main() {
  const generated = readCalculatorRedirects();
  let existing = "";

  if (fs.existsSync(REDIRECTS_PATH)) {
    existing = fs.readFileSync(REDIRECTS_PATH, "utf8");
    const markerIndex = existing.indexOf(MARKER);
    if (markerIndex !== -1) {
      existing = existing.slice(0, markerIndex).trimEnd();
    } else {
      existing = existing.trimEnd();
    }
    // Remove stale flat-tool redirects superseded by generated block
    existing = existing
      .split("\n")
      .filter((line) => !/^\/mah-to-wh\s/.test(line.trim()))
      .join("\n")
      .trimEnd();
  }

  const mahRedirect = "/mah-to-wh /tools/unit-conversion/ah-to-wh/ 301";
  const body = [existing, "", MARKER, mahRedirect, generated, ""]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(REDIRECTS_PATH, `${body}\n`);
  console.log(`[redirects] Wrote tool legacy redirects to public/_redirects`);
}

main();
