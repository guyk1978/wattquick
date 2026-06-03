import type { Metadata } from "next";
import { BlogPostGrid } from "@/components/blog/blog-post-grid";
import { PageHeader, PageShell } from "@/components/page-shell";
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

  return (
    <PageShell className="max-w-6xl">
      <PageHeader
        title="Blog"
        description="Expert guides on EV charging, solar, batteries, and home energy—each paired with interactive WattQuick tools."
      />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No articles yet.</p>
      ) : (
        <BlogPostGrid posts={posts} />
      )}
    </PageShell>
  );
}
