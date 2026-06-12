import type { Metadata } from "next";
import { Suspense } from "react";
import { FavoritesDirectory } from "@/components/favorites-directory";
import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Favorite Calculators",
  description:
    "Your starred WattQuick calculators—saved in this browser for quick access to the tools you use most.",
  path: "/favorites",
});

export default function FavoritesPage() {
  return (
    <PageShell className="calculators-hub-page max-w-[80rem]">
      <header className="calculators-hub-page__header">
        <p className="calculators-hub-page__eyebrow">Personal dashboard</p>
        <h1 className="calculators-hub-page__title">Favorite calculators</h1>
        <p className="calculators-hub-page__description">
          Your curated collection of power tools—ready to open in one click.
        </p>
      </header>

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading favorites…</p>
        }
      >
        <FavoritesDirectory />
      </Suspense>
    </PageShell>
  );
}
