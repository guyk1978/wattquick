"use client";

import { BookOpen } from "lucide-react";
import { useArticlePortal } from "@/components/article-portal/article-portal-provider";
import type { RelatedArticleForModal } from "@/lib/calculators/related-articles";
import { cn } from "@/lib/utils";

type RelatedArticlesProps = {
  articles: RelatedArticleForModal[];
  className?: string;
};

/**
 * Further Reading cards for calculator Documentation.
 * Opens the site-wide Article Portal — no route navigation.
 */
export function RelatedArticles({ articles, className }: RelatedArticlesProps) {
  const { openArticle } = useArticlePortal();

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
            <button
              type="button"
              className="related-articles__card"
              onClick={() => openArticle(article.slug)}
            >
              <span className="related-articles__card-title">{article.title}</span>
              <span className="related-articles__card-excerpt">
                {article.description}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
