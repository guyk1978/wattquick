import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogQuickLaunchWidget } from "@/components/blog/blog-quick-launch-widget";
import { GridShell } from "@/components/grid-modal/grid-shell";
import { createArticlePostMetadata } from "@/lib/articles/metadata";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog/posts";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return createArticlePostMetadata(post);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <GridShell
      breadcrumbs={[
        { label: "Articles", href: "/articles/" },
        { label: post.title },
      ]}
    >
      <div className="articles-page articles-page--article">
        <Link href="/articles/" className="articles-page__back">
          ← Back to articles
        </Link>

        <BlogArticleHeader post={post} className="blog-article-header--matte" />

        <article className="blog-article-body blog-article-body--matte min-w-0">
          <BlogContent content={post.content} articleSlug={post.slug} />
        </article>

        <div className="blog-article-tool mt-6">
          <BlogQuickLaunchWidget
            calculatorId={post.relatedToolId}
            articleSlug={post.slug}
            placement="footer"
          />
        </div>
      </div>
    </GridShell>
  );
}
