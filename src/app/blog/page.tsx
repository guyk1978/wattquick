import type { Metadata } from "next";
import { BlogBlueprintPage } from "@/components/blog/blog-blueprint-page";
import { getAllBlogPosts } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Guides and tips on batteries, solar sizing, EV charging, and home energy from WattQuick.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return <BlogBlueprintPage posts={posts} />;
}
