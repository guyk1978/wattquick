import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogFeaturedImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Article hero (LCP) vs blog index card thumbnail */
  variant?: "article" | "card";
  /** Card thumbnail size on the blog index grid */
  cardSize?: "compact" | "featured";
  priority?: boolean;
}

/** Featured image for blog articles and index cards — Industrial Matte frame. */
export function BlogFeaturedImage({
  src,
  alt,
  className,
  variant = "article",
  cardSize = "compact",
  priority,
}: BlogFeaturedImageProps) {
  const isCard = variant === "card";

  if (isCard) {
    return (
      <figure
        className={cn(
          "blog-post-card__media",
          cardSize === "featured" && "blog-post-card__media--featured",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority ?? false}
          sizes={
            cardSize === "featured"
              ? "(max-width: 768px) 100vw, 720px"
              : "(max-width: 768px) 45vw, 220px"
          }
          className="blog-post-card__media-img"
        />
      </figure>
    );
  }

  return (
    <figure className={cn("blog-article-header__featured", className)}>
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        priority={priority ?? true}
        sizes="(max-width: 768px) 100vw, 768px"
        className="blog-article-header__featured-img"
      />
    </figure>
  );
}
