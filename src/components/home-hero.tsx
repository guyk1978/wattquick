import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HomeHeroProps {
  calculatorCount: number;
  className?: string;
}

export function HomeHero({ calculatorCount, className }: HomeHeroProps) {
  return (
    <section className={cn("home-hero relative z-[1]", className)}>
      <div className="home-hero-banner w-full border-b border-border">
        <Image
          src="/heder-light.png"
          alt=""
          width={1982}
          height={544}
          priority
          className="block h-auto w-full dark:hidden"
          sizes="100vw"
        />
        <Image
          src="/heder-dark.png"
          alt=""
          width={1984}
          height={544}
          priority
          className="hidden h-auto w-full dark:block"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 pb-10 pt-8 text-center sm:px-6 sm:pb-12 lg:pb-14">
        <h1 className="text-4xl font-black leading-none tracking-tight text-foreground md:text-6xl">
          Instant answers for batteries, solar &amp; EV
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
          <span className="font-semibold text-foreground">
            {calculatorCount} free calculators.
          </span>{" "}
          No sign-up, no submit buttons—type and get results in milliseconds.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="#calculators"
            className="flat-inline-action inline-flex h-11 items-center px-5 text-sm font-semibold"
          >
            Search calculators ↓
          </Link>
          <Link
            href="/calculators/"
            className="inline-flex h-11 items-center rounded-none border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-[var(--matte-hover-border)] hover:bg-[var(--matte-btn-hover)]"
          >
            View all {calculatorCount}
          </Link>
        </div>
      </div>
    </section>
  );
}
