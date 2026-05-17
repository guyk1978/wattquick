import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <PageShell narrow>
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to blog
      </Link>
      <article>
        <header className="mb-10 space-y-4">
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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
        </header>
        <div className="space-y-8">
          {post.content.map((section, i) => (
            <section key={i} className="space-y-3">
              {section.heading ? (
                <h2 className="text-lg font-semibold text-foreground">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
