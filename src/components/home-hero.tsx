import { cn } from "@/lib/utils";

interface HomeHeroProps {
  calculatorCount: number;
  categoryCount: number;
  className?: string;
}

export function HomeHero({
  calculatorCount,
  categoryCount,
  className,
}: HomeHeroProps) {
  return (
    <section className={cn("home-hub-hero", className)} aria-labelledby="home-hub-title">
      <div className="home-hub-hero__inner">
        <p className="home-hub-hero__eyebrow">WattQuick Tool Suite</p>

        <h1 id="home-hub-title" className="home-hub-hero__title">
          Professional power calculators for batteries, solar &amp; EV
        </h1>

        <p className="home-hub-hero__subtitle">
          Instant engineering-grade results with minimal inputs. No sign-up, no
          submit buttons — type and get answers in milliseconds.
        </p>

        <dl className="home-hub-hero__stats">
          <div className="home-hub-hero__stat">
            <dt className="home-hub-hero__stat-label">Tools</dt>
            <dd className="home-hub-hero__stat-value">{calculatorCount}</dd>
          </div>
          <div className="home-hub-hero__stat">
            <dt className="home-hub-hero__stat-label">Categories</dt>
            <dd className="home-hub-hero__stat-value">{categoryCount}</dd>
          </div>
          <div className="home-hub-hero__stat">
            <dt className="home-hub-hero__stat-label">Latency</dt>
            <dd className="home-hub-hero__stat-value">&lt;50ms</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
