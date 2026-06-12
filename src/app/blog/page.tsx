import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { PageShell } from "@/components/page-shell";
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
    <PageShell className="blog-hub-page max-w-[80rem]">
      <header className="blog-hub-page__header">
        <p className="blog-hub-page__eyebrow">Publication</p>
        <h1 className="blog-hub-page__title">Blog</h1>
        <p className="blog-hub-page__description">
          Expert guides on EV charging, solar, batteries, and home energy—each
          paired with interactive WattQuick tools.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No articles yet.</p>
      ) : (
        <BlogIndex posts={posts} />
      )}
    </PageShell>
  );
}
