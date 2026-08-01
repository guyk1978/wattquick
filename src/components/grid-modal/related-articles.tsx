import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { RelatedArticleForModal } from "@/lib/calculators/related-articles";
import { cn } from "@/lib/utils";

type RelatedArticlesProps = {
  articles: RelatedArticleForModal[];
  className?: string;
};

/** Further Reading cards for calculator Documentation — links to article pages. */
export function RelatedArticles({ articles, className }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section
      className={cn("related-articles", className)}
      aria-label="Further reading"
    >
      <header className="related-articles__header">
        <BookOpen className="related-articles__icon" aria-hidden />
        <h4 className="related-articles__title">Further Reading</h4>
      </header>

      <ul className="related-articles__grid" role="list">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}/`}
              className="related-articles__card"
            >
              <span className="related-articles__card-title">{article.title}</span>
              <span className="related-articles__card-excerpt">
                {article.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
