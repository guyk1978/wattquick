import fs from "fs";
import path from "path";

const SITE_URL = "https://wattquick.com";

// כאן תעדכן לפי ה־pages שלך ב־Next.js
const staticRoutes = [
  "",
  "tools",
  "blog",
  "privacy"
];

// אם יש לך דפי tools דינמיים — תוסיף פה ידנית או תרחיב בעתיד
const toolRoutes = [
  "tools/solar-calculator",
  "tools/battery-runtime-calculator"
];

const allRoutes = [...staticRoutes, ...toolRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    return `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.7"}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap);

console.log("✅ Sitemap generated");