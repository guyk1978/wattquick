import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCarousel } from "@/components/calculators/category-carousel";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  calculatorCount: number;
  className?: string;
}

export function HeroSection({
  calculatorCount,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn("landing-hero", className)}
      aria-labelledby="hero-section-title"
    >
      <div className="landing-hero__inner landing-hero__inner--with-carousel">
        <div className="landing-hero__copy">
          <p className="landing-hero__eyebrow">WattQuick Tool Suite</p>

          <h1 id="hero-section-title" className="landing-hero__title">
            Professional power calculators for batteries, solar &amp; EV
          </h1>

          <p className="landing-hero__subtitle">
            Engineering-grade results with minimal inputs. No sign-up, no submit
            buttons — open a tool, type, and get answers in milliseconds.
          </p>

          <div className="landing-hero__actions">
            <Link href="/calculators/" className="landing-hero__cta">
              Browse all {calculatorCount} tools
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <CategoryCarousel variant="hero" className="landing-hero__carousel" />
      </div>
    </section>
  );
}
