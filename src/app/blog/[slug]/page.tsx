import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogBackLink } from "@/components/blog/blog-back-link";
import { BlogContent } from "@/components/blog/blog-content";
import { CalculatorSpotlight } from "@/components/blog/calculator-spotlight";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const dynamic = "force-static";

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

  const primaryCalculator = post.calculatorSlugs[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 lg:px-6">
      <div className="mx-auto max-w-3xl">
        <BlogBackLink />
        <BlogArticleHeader post={post} />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,48rem)_minmax(260px,1fr)] lg:items-start lg:gap-12 lg:justify-center">
        <article className="mx-auto min-w-0 max-w-3xl">
          <BlogContent content={post.content} />
        </article>

        {primaryCalculator ? (
          <aside className="mx-auto hidden w-full max-w-sm lg:mx-0 lg:block">
            <div className="sticky top-24">
              <CalculatorSpotlight slug={primaryCalculator} compact />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
