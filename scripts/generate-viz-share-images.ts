/**
 * Generate OG/Twitter share images from each tool's [VIZ] Data Flow schematic.
 *
 * Usage:
 *   npm run generate:share-images
 *   npm run generate:share-images -- --only=battery-percentage
 *   SHARE_PREVIEW_BASE_URL=http://127.0.0.1:3000 npm run generate:share-images
 *
 * Starts a temporary `next dev` server when SHARE_PREVIEW_BASE_URL is unset,
 * screenshots `/share-preview/{slug}/` at 1200×630, writes WebP to
 * `public/images/share/{slug}.webp`, then regenerates calculatorShareData.
 */
import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser } from "playwright";
import sharp from "sharp";
import { CALCULATOR_VIZ_ID_LIST } from "../src/lib/calculator-viz-ids";
import type { CalculatorId } from "../src/lib/calculators";

const SHARE_DIR = path.join(process.cwd(), "public/images/share");
const WIDTH = 1200;
const HEIGHT = 630;
const DEFAULT_PORT = 3456;
const DEFAULT_BASE = `http://127.0.0.1:${DEFAULT_PORT}`;

function parseOnlyArg(argv: string[]): Set<string> | null {
  const only = argv.find((arg) => arg.startsWith("--only="));
  if (!only) return null;
  const value = only.slice("--only=".length).trim();
  if (!value) return null;
  return new Set(
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

async function waitForServer(url: string, timeoutMs = 180_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok || res.status === 404) return;
    } catch {
      // still booting
    }
    await new Promise((r) => setTimeout(r, 750));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startDevServer(port: number): ChildProcess {
  const child = spawn(
    "npx next dev -p " + String(port) + " -H 127.0.0.1",
    {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
      env: {
        ...process.env,
        BROWSER: "none",
      },
    }
  );

  child.stdout?.on("data", (buf: Buffer) => {
    const text = buf.toString();
    if (/ready|started|Local:/i.test(text)) {
      process.stdout.write(`[next] ${text}`);
    }
  });
  child.stderr?.on("data", (buf: Buffer) => {
    const text = buf.toString();
    if (!/warn/i.test(text)) {
      process.stderr.write(`[next] ${text}`);
    }
  });

  return child;
}

async function stopProcess(child: ChildProcess | null): Promise<void> {
  if (!child || child.killed) return;
  child.kill("SIGTERM");
  await new Promise((r) => setTimeout(r, 500));
  if (!child.killed) {
    try {
      child.kill("SIGKILL");
    } catch {
      // ignore
    }
  }
}

async function captureOne(
  browser: Browser,
  baseUrl: string,
  id: CalculatorId
): Promise<void> {
  const page = await browser.newPage({
    viewport: { width: WIDTH + 40, height: HEIGHT + 40 },
    deviceScaleFactor: 1,
    colorScheme: "dark",
    reducedMotion: "reduce",
  });

  // Skip cookie-consent gate so the VIZ frame is unobstructed.
  await page.addInitScript(() => {
    try {
      localStorage.setItem("wq_cookie_consent", "granted");
    } catch {
      // ignore
    }
  });

  const url = `${baseUrl.replace(/\/$/, "")}/share-preview/${id}/`;
  // Avoid networkidle — next/dev HMR websockets keep the connection open.
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120_000 });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });

  const frame = page.locator("[data-share-capture='true']");
  await frame.waitFor({ state: "visible", timeout: 90_000 });
  await page.locator(".tool-viz__svg").first().waitFor({
    state: "visible",
    timeout: 90_000,
  });

  // Hide Next.js / React DevTools chrome that can leak into screenshots.
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-nextjs-toast],
      [data-nextjs-dialog-overlay],
      [data-next-mark-loading],
      #__next-build-watcher {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
        opacity: 0 !important;
      }
    `,
  });

  // Settle paints after reduced-motion CSS applies.
  await new Promise((r) => setTimeout(r, 400));

  const png = await frame.screenshot({ type: "png" });
  await page.close();

  const outPath = path.join(SHARE_DIR, `${id}.webp`);
  await sharp(png)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
    .webp({ quality: 86 })
    .toFile(outPath);
}

async function main(): Promise<void> {
  const only = parseOnlyArg(process.argv.slice(2));
  const ids = CALCULATOR_VIZ_ID_LIST.filter((id) =>
    only ? only.has(id) : true
  ) as CalculatorId[];

  if (only) {
    const missing = [...only].filter(
      (id) => !CALCULATOR_VIZ_ID_LIST.includes(id as CalculatorId)
    );
    if (missing.length) {
      console.warn("Unknown / no-VIZ ids skipped:", missing.join(", "));
    }
  }

  if (!ids.length) {
    console.error("No calculator VIZ ids to capture.");
    process.exit(1);
  }

  fs.mkdirSync(SHARE_DIR, { recursive: true });

  const externalBase = process.env.SHARE_PREVIEW_BASE_URL?.trim();
  let child: ChildProcess | null = null;
  const baseUrl = externalBase || DEFAULT_BASE;

  try {
    if (!externalBase) {
      console.log(`Starting next dev on ${DEFAULT_BASE} …`);
      child = startDevServer(DEFAULT_PORT);
      await waitForServer(DEFAULT_BASE);
      console.log("Dev server ready.");
    } else {
      console.log(`Using SHARE_PREVIEW_BASE_URL=${externalBase}`);
      await waitForServer(externalBase, 30_000);
    }

    const browser = await chromium.launch({ headless: true });
    let ok = 0;
    let failed = 0;

    try {
      // Serial captures keep next/dev memory stable on Windows.
      for (const id of ids) {
        process.stdout.write(`Capturing ${id} … `);
        try {
          await captureOne(browser, baseUrl, id);
          ok += 1;
          console.log("ok");
        } catch (err) {
          failed += 1;
          console.log("FAIL");
          console.error(err);
        }
      }
    } finally {
      await browser.close();
    }

    console.log(`\nCaptured ${ok}/${ids.length} VIZ share images.`);
    if (failed) {
      process.exitCode = 1;
    }

    // Refresh calculatorShareData from the share directory.
    const { spawnSync } = await import("node:child_process");
    const regen = spawnSync("npx tsx scripts/generate-calculator-share-data.ts", {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: true,
    });
    if (regen.status !== 0) {
      process.exitCode = 1;
    }
  } finally {
    await stopProcess(child);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
