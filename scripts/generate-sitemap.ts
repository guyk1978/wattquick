/**
 * Writes public/sitemap.xml from live registry data (same source as app/sitemap.ts).
 * Run: npm run generate:sitemap
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildSitemapEntries } from "../src/lib/sitemap-entries";

const entries = buildSitemapEntries();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((entry) => {
    const lastmod =
      entry.lastModified instanceof Date
        ? entry.lastModified.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
    const changefreq = entry.changeFrequency ?? "weekly";
    const priority =
      typeof entry.priority === "number" ? entry.priority.toFixed(1) : "0.5";

    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const outPath = join(process.cwd(), "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");

console.log(`✅ Sitemap generated (${entries.length} URLs) → public/sitemap.xml`);
