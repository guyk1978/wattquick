"use client";

import { useState, type FormEvent } from "react";
import { ExternalLink, MessageSquareText } from "lucide-react";
import { StarRating } from "@/components/calculator/star-rating";
import { useCalculatorReviews } from "@/hooks/use-calculator-reviews";
import {
  averageReviewRating,
  formatReviewTimestamp,
  websiteDisplayHost,
} from "@/lib/calculator-reviews";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getCategoryColor } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

type ToolModalReviewsProps = {
  id: CalculatorId;
  className?: string;
};

/**
 * [REVIEWS] tab: Industrial Matte community feedback form + feed,
 * with optional website backlink promotion per review.
 */
export function ToolModalReviews({ id, className }: ToolModalReviewsProps) {
  const meta = getCalculatorMeta(id);
  const accent = getCategoryColor(meta.category);
  const { reviews, hydrated, submit } = useCalculatorReviews(id);

  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const avg = averageReviewRating(reviews);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const result = submit({
        author,
        rating,
        comment,
        websiteUrl,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setAuthor("");
      setRating(0);
      setComment("");
      setWebsiteUrl("");
      setSuccess("Review published. Thanks for helping the community.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className={cn("tool-reviews", className)}
      aria-label={`Community reviews for ${meta.title}`}
    >
      <header className="tool-reviews__header">
        <p className="tool-reviews__eyebrow">FIG. REVIEWS — COMMUNITY</p>
        <h3 className="tool-reviews__title">Feedback &amp; Website Links</h3>
        <p className="tool-reviews__subtitle">
          Rate this tool, share how you use it, and optionally promote your
          site with a nofollow outbound link.
        </p>
        {hydrated && reviews.length > 0 ? (
          <p className="tool-reviews__summary">
            <span className="tool-reviews__summary-avg">
              {avg != null ? avg.toFixed(1) : "—"}
            </span>
            <span className="tool-reviews__summary-meta">
              / 5 · {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </span>
          </p>
        ) : null}
      </header>

      <div className="tool-reviews__layout">
        <form className="tool-reviews__form" onSubmit={onSubmit} noValidate>
          <p className="tool-reviews__form-label">SUBMIT REVIEW</p>

          <label className="tool-reviews__field">
            <span className="tool-reviews__field-label">Name / Handle</span>
            <input
              type="text"
              name="author"
              autoComplete="nickname"
              maxLength={48}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="tool-reviews__input"
              placeholder="e.g. solar_ops"
              required
            />
          </label>

          <div className="tool-reviews__field">
            <span className="tool-reviews__field-label" id={`${id}-rating-label`}>
              Rating
            </span>
            <StarRating
              value={rating}
              onChange={setRating}
              size="lg"
              color={accent}
              label="Review star rating"
              className="tool-reviews__stars"
            />
          </div>

          <label className="tool-reviews__field">
            <span className="tool-reviews__field-label">Comment / Review</span>
            <textarea
              name="comment"
              rows={4}
              maxLength={1200}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="tool-reviews__textarea"
              placeholder="What worked? What would you improve?"
              required
            />
          </label>

          <label className="tool-reviews__field">
            <span className="tool-reviews__field-label">
              Your Website URL{" "}
              <span className="tool-reviews__optional">(optional)</span>
            </span>
            <input
              type="url"
              name="websiteUrl"
              inputMode="url"
              autoComplete="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="tool-reviews__input"
              placeholder="https://yoursite.example"
            />
            <span className="tool-reviews__hint">
              Published with rel=&quot;nofollow noopener noreferrer&quot;.
            </span>
          </label>

          {error ? (
            <p className="tool-reviews__alert tool-reviews__alert--error" role="alert">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="tool-reviews__alert tool-reviews__alert--ok" role="status">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            className="tool-reviews__submit"
            disabled={submitting}
          >
            {submitting ? "Publishing…" : "Publish review"}
          </button>
        </form>

        <div className="tool-reviews__feed" aria-live="polite">
          <p className="tool-reviews__form-label">COMMUNITY FEED</p>

          {!hydrated ? (
            <p className="tool-reviews__empty">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <div className="tool-reviews__empty-card">
              <MessageSquareText
                className="tool-reviews__empty-icon"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="tool-reviews__empty">
                No reviews yet. Be the first to rate {meta.title}.
              </p>
            </div>
          ) : (
            <ul className="tool-reviews__list">
              {reviews.map((review) => (
                <li key={review.id} className="tool-reviews__item">
                  <div className="tool-reviews__item-head">
                    <div className="tool-reviews__item-identity">
                      <span className="tool-reviews__author">{review.author}</span>
                      <time
                        className="tool-reviews__time"
                        dateTime={review.createdAt}
                      >
                        {formatReviewTimestamp(review.createdAt)}
                      </time>
                    </div>
                    <StarRating
                      value={review.rating}
                      readOnly
                      size="sm"
                      color={accent}
                      label={`${review.rating} out of 5 stars`}
                    />
                  </div>
                  <p className="tool-reviews__comment">{review.comment}</p>
                  {review.websiteUrl ? (
                    <a
                      className="tool-reviews__site"
                      href={review.websiteUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <ExternalLink
                        className="tool-reviews__site-icon"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{websiteDisplayHost(review.websiteUrl)}</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
