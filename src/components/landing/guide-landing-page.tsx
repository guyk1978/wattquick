import Link from "next/link";
import type { GuideLandingDefinition } from "@/lib/calculators/landing-types";
import { GuideLandingArticle } from "./guide-landing-article";

interface GuideLandingPageProps {
  landing: GuideLandingDefinition;
}

/** Article-only guide page — no calculator UI. */
export function GuideLandingPage({ landing }: GuideLandingPageProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="space-y-4 border-b border-border/50 pb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {landing.title}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          {landing.description}
        </p>
        <Link
          href={landing.toolHref}
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Open the calculator →
        </Link>
      </header>

      <div className="mt-10">
        <GuideLandingArticle landing={landing} />
      </div>
    </div>
  );
}
