import type { Metadata } from "next";
import { ArticlesHubPage } from "@/components/articles/articles-hub-page";
import { getAllBlogPosts } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Articles",
  description:
    "Guides and tips on batteries, solar sizing, EV charging, and home energy from WattQuick.",
  path: "/articles",
});

/** Legacy `/blog` hub — same dedicated articles experience as `/articles`. */
export default function BlogPage() {
  const posts = getAllBlogPosts();

  return <ArticlesHubPage posts={posts} />;
}
