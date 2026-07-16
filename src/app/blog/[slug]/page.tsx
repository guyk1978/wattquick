import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogQuickLaunchWidget } from "@/components/blog/blog-quick-launch-widget";
import { BlogAdSlots } from "@/components/blog/blog-ad-slots";
import { GlobalPageLayout } from "@/components/layout/global-page-layout";
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
    <GlobalPageLayout
      breadcrumbs={[
        { label: "Blog", href: "/blog/" },
        { label: post.title },
      ]}
    >
      <Link href="/blog/" className="global-page-layout__back">
        ← Back to blog
      </Link>

      <BlogArticleHeader post={post} className="blog-article-header--matte" />

      <BlogAdSlots />

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
    </GlobalPageLayout>
  );
}
