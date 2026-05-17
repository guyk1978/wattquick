import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog/posts";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = getAllCalculatorMeta();
  const posts = getAllBlogPosts();
  const categories = Object.keys(CALCULATOR_CATEGORY_LABELS);

  const staticPages = [
    "",
    "/calculators",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...calculators.map((calc) => ({
      url: `${SITE_URL}${calc.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
