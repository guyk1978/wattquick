import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/blog-post-card";
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
  const [featured, ...rest] = posts;

  return (
    <PageShell className="max-w-6xl">
      <PageHeader
        title="Blog"
        description="Expert guides on EV charging, solar, batteries, and home energy—each paired with interactive WattQuick tools."
      />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No articles yet.</p>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {featured ? (
            <section aria-labelledby="featured-post-heading">
              <h2 id="featured-post-heading" className="sr-only">
                Featured article
              </h2>
              <BlogPostCard post={featured} featured />
            </section>
          ) : null}

          {rest.length > 0 ? (
            <section aria-labelledby="all-posts-heading">
              <h2
                id="all-posts-heading"
                className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
              >
                All articles
              </h2>
              <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug} className="min-h-0">
                    <BlogPostCard post={post} className="h-full" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </PageShell>
  );
}
