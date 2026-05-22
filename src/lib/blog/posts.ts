import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { estimateReadMinutes } from "@/lib/blog/parse-content";

export type BlogCategory =
  | "EV Charging"
  | "Solar"
  | "Battery"
  | "Appliances"
  | "Guides"
  | "Tips"
  | "Commercial EV"
  | "RV & Marine"
  | "Utility Tariffs"
  | "Green Home";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  category: BlogCategory;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function readMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      const slug = String(data.slug ?? file.replace(/\.md$/, ""));
      const title = String(data.title ?? slug);
      const description = String(data.description ?? "");
      const category = String(data.category ?? "Guides") as BlogCategory;
      const publishedAt = String(data.date ?? data.publishedAt ?? "2026-01-01");

      return {
        slug,
        title,
        description,
        category,
        publishedAt,
        content: content.trim(),
        readMinutes: estimateReadMinutes(content),
      };
    });
}

const markdownPosts = readMarkdownPosts();

export function getBlogPost(slug: string): BlogPost | undefined {
  return markdownPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...markdownPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.category === category);
}
