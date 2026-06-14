import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingHeroProps {
  calculatorCount: number;
  categoryCount: number;
  className?: string;
}

export function LandingHero({
  calculatorCount,
  categoryCount,
  className,
}: LandingHeroProps) {
  return (
    <section
      className={cn("landing-hero", className)}
      aria-labelledby="landing-hero-title"
    >
      <div className="landing-hero__inner">
        <p className="landing-hero__eyebrow">WattQuick Tool Suite</p>

        <h1 id="landing-hero-title" className="landing-hero__title">
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

        <dl className="landing-hero__stats">
          <div className="landing-hero__stat">
            <dt className="landing-hero__stat-label">Tools</dt>
            <dd className="landing-hero__stat-value">{calculatorCount}</dd>
          </div>
          <div className="landing-hero__stat">
            <dt className="landing-hero__stat-label">Categories</dt>
            <dd className="landing-hero__stat-value">{categoryCount}</dd>
          </div>
          <div className="landing-hero__stat">
            <dt className="landing-hero__stat-label">Latency</dt>
            <dd className="landing-hero__stat-value">&lt;50ms</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
