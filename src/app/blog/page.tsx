import type { Metadata } from "next";
import Link from "next/link";
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
    <PageShell className="max-w-3xl">
      <PageHeader
        title="Blog"
        description="Expert guides on EV charging, solar, batteries, and home energy—each paired with interactive WattQuick tools."
      />
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="group rounded-2xl border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/25 hover:bg-card/70">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="rounded-full bg-muted/50 px-2.5 py-0.5">
                  {post.category}
                </span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readMinutes} min read</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                Read article →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
