import Link from "next/link";
import { Zap } from "lucide-react";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
import { FOOTER_CALCULATOR_CATEGORIES, FOOTER_LINKS } from "@/lib/site";

export function SiteFooter() {
  const count = getAllCalculatorMeta().length;

  return (
    <footer className="mt-auto border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" strokeWidth={2.5} />
              </span>
              <span className="font-semibold tracking-tight">WattQuick</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {count} free micro-calculators for batteries, solar, EV charging,
              and home power. Instant answers—no account required.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Categories
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_CALCULATOR_CATEGORIES.map(({ category, href }) => (
                <li key={category}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {CALCULATOR_CATEGORY_LABELS[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Legal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border/40 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} WattQuick. All calculators are estimates—for
          planning only, not professional engineering advice.
        </p>
      </div>
    </footer>
  );
}
