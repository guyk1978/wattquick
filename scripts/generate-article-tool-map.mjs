/**
 * Builds src/data/article-tool-map.ts from blog frontmatter (no fs in client bundle).
 * Run: node scripts/generate-article-tool-map.mjs
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const OUT = path.join(process.cwd(), "src/data/article-tool-map.ts");
const EMBED_RE = /<CalculatorEmbed\s+slug=["']([^"']+)["']\s*\/>/;

const map = {};

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const toolId = data.relatedToolId ?? data.relatedTool ?? content.match(EMBED_RE)?.[1];
  if (!toolId || map[toolId]) continue;
  map[toolId] = {
    articleSlug: String(data.slug ?? file.replace(/\.md$/, "")),
    articleTitle: String(data.title ?? toolId),
  };
}

const body = `/** Auto-generated — node scripts/generate-article-tool-map.mjs */
import type { CalculatorId } from "@/lib/calculators";

export interface ArticleToolLink {
  articleSlug: string;
  articleTitle: string;
}

export const ARTICLE_BY_TOOL: Partial<Record<CalculatorId, ArticleToolLink>> = ${JSON.stringify(map, null, 2)} as Partial<Record<CalculatorId, ArticleToolLink>>;

export function getRelatedArticleForTool(
  toolId: CalculatorId
): ArticleToolLink | undefined {
  return ARTICLE_BY_TOOL[toolId];
}
`;

fs.writeFileSync(OUT, body);
console.log(`Wrote ${OUT} (${Object.keys(map).length} links)`);
