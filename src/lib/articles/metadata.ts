import type { Metadata } from "next";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import type { BlogPost } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo";

/** Open Graph + Twitter metadata for dedicated `/articles/[slug]` pages. */
export function createArticlePostMetadata(post: BlogPost): Metadata {
  const tool = post.relatedToolId
    ? getCalculatorMeta(post.relatedToolId)
    : null;

  const socialDescription = tool
    ? `${post.description} Includes the free ${tool.title} — run your own numbers instantly, no sign-up.`
    : post.description;

  const ogTitle = tool
    ? `${post.title} · ${tool.tag} calculator`
    : post.title;

  const base = createPageMetadata({
    title: post.title,
    description: socialDescription,
    path: `/articles/${post.slug}`,
    ogImage: post.ogImage,
    openGraphType: "article",
    articlePublishedTime: post.publishedAt,
    ogTitle,
  });

  return {
    ...base,
    other: tool
      ? {
          "wattquick:related-tool": tool.id,
          "wattquick:related-tool-title": tool.title,
        }
      : undefined,
  };
}
