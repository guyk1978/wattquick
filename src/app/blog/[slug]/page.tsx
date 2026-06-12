import { notFound } from "next/navigation";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogArticleLayout } from "@/components/blog/blog-article-layout";
import { BlogBackLink } from "@/components/blog/blog-back-link";
import { BlogContent } from "@/components/blog/blog-content";
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
    <div className="blog-article-page mx-auto max-w-6xl px-4 pt-8 pb-16 lg:px-6">
      <div className="mx-auto max-w-3xl">
        <BlogBackLink />
        <BlogArticleHeader post={post} />
      </div>

      <BlogArticleLayout post={post}>
        <article className="mx-auto min-w-0 max-w-3xl lg:mx-0">
          <BlogContent content={post.content} articleSlug={post.slug} />
        </article>
      </BlogArticleLayout>
    </div>
  );
}
