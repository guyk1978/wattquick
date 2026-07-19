"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCarouselIllustration } from "@/components/calculators/category-carousel-illustration";
import { CALCULATOR_CATEGORY_LABELS } from "@/data/calculator-types";
import { CATEGORY_DISPLAY_ORDER } from "@/lib/calculator-category-icons";
import { getCategoryPageHref } from "@/lib/category-routes";
import { categoryThemeStyle } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

interface CategoryCarouselProps {
  className?: string;
  variant?: "default" | "hero";
}

export function CategoryCarousel({
  className,
  variant = "default",
}: CategoryCarouselProps) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    slides: ".category-carousel__slide",
  });

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollState();
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className={cn(
        "category-carousel category-carousel--matte",
        variant === "hero" && "category-carousel--hero",
        className
      )}
      aria-labelledby={variant === "hero" ? undefined : "category-carousel-heading"}
      aria-label={variant === "hero" ? "Browse calculator categories" : undefined}
    >
      {variant === "default" ? (
        <div className="category-carousel__header">
          <h2 id="category-carousel-heading" className="category-carousel__title">
            Browse by category
          </h2>
          <p className="category-carousel__subtitle">
            {CATEGORY_DISPLAY_ORDER.length} categories — swipe or use arrows to explore
          </p>
        </div>
      ) : null}

      <div className="category-carousel__viewport-wrap">
        <button
          type="button"
          className={cn(
            "category-carousel__nav category-carousel__nav--prev",
            !canScrollPrev && "category-carousel__nav--disabled"
          )}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous categories"
        >
          <ChevronLeft className="size-4" strokeWidth={2.25} />
        </button>

        <div className="category-carousel__viewport" ref={emblaRef}>
          <ul className="category-carousel__track">
            {CATEGORY_DISPLAY_ORDER.map((category) => {
              const name = CALCULATOR_CATEGORY_LABELS[category];
              const link = getCategoryPageHref(category);

              return (
                <li
                  key={category}
                  className="category-carousel__slide"
                  style={categoryThemeStyle(category)}
                >
                  <Link href={link} className="category-carousel__card" aria-label={name}>
                    <span className="category-carousel__icon-wrap" aria-hidden="true">
                      <CategoryCarouselIllustration category={category} />
                    </span>
                    <span className="category-carousel__card-name" aria-hidden="true">
                      {name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className={cn(
            "category-carousel__nav category-carousel__nav--next",
            !canScrollNext && "category-carousel__nav--disabled"
          )}
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next categories"
        >
          <ChevronRight className="size-4" strokeWidth={2.25} />
        </button>
      </div>
    </section>
  );
}
