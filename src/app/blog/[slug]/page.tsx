import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogArticleBlueprintLayout } from "@/components/blog/blog-article-blueprint-layout";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogQuickLaunchWidget } from "@/components/blog/blog-quick-launch-widget";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { createBlogPostMetadata } from "@/lib/blog/metadata";
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

  return createBlogPostMetadata(post);
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <BlogArticleBlueprintLayout post={post}>
      <Link
        href="/blog/"
        className="calculator-page-header__back mb-1 inline-flex text-muted-foreground hover:text-foreground"
      >
        ← Back to blog
      </Link>

      <BlogArticleHeader post={post} className="blog-article-header--blueprint" />

      <CalculatorAdSlots />

      <article className="blog-article-body blog-article-body--blueprint min-w-0">
        <BlogContent content={post.content} articleSlug={post.slug} />
      </article>

      <div className="blog-article-tool mt-3">
        <BlogQuickLaunchWidget
          calculatorId={post.relatedToolId}
          articleSlug={post.slug}
          placement="footer"
        />
      </div>
    </BlogArticleBlueprintLayout>
  );
}
