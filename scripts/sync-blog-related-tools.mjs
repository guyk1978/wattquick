/**
 * Ensures every blog post frontmatter includes relatedToolId (from first CalculatorEmbed).
 * Run: node scripts/sync-blog-related-tools.mjs
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const EMBED_RE = /<CalculatorEmbed\s+slug=["']([^"']+)["']\s*\/>/;

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (data.relatedToolId || data.relatedTool) continue;

  const match = content.match(EMBED_RE);
  if (!match) {
    console.warn(`[skip] ${file}: no relatedToolId and no CalculatorEmbed`);
    skipped++;
    continue;
  }

  data.relatedToolId = match[1];
  const next = matter.stringify(content, data);
  fs.writeFileSync(filePath, next);
  updated++;
}

console.log(`Done: ${updated} updated, ${skipped} skipped.`);
