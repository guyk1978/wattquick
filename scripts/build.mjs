import { execSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";

const apiDir = "src/app/api";
const backupDir = ".api-route-backup";
const enableApiRoutes = process.env.ENABLE_API_ROUTES === "1";

function hideApiRoutes() {
  if (existsSync(apiDir) && !existsSync(backupDir)) {
    cpSync(apiDir, backupDir, { recursive: true });
    rmSync(apiDir, { recursive: true, force: true });
  }
}

function restoreApiRoutes() {
  if (existsSync(backupDir) && !existsSync(apiDir)) {
    cpSync(backupDir, apiDir, { recursive: true });
    rmSync(backupDir, { recursive: true, force: true });
  }
}

if (!enableApiRoutes) {
  hideApiRoutes();
}

try {
  execSync("next build", { stdio: "inherit", env: process.env });

  // Static export (wattquick.com) writes HTML to out/.
  // Server/API deploy (joinmypdf.com) must run the Cloudflare adapter so
  // /api/* routes become Workers functions in .vercel/output/.
  if (enableApiRoutes) {
    execSync("npx @cloudflare/next-on-pages", { stdio: "inherit", env: process.env });
  }
} finally {
  if (!enableApiRoutes) {
    restoreApiRoutes();
  }
}
