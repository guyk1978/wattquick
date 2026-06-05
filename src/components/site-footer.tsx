import Link from "next/link";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
import { FOOTER_NETWORK_PARTNERS } from "@/lib/partners";
import { FOOTER_CALCULATOR_CATEGORIES, FOOTER_LINKS } from "@/lib/site";

export function SiteFooter() {
  const count = getAllCalculatorMeta().length;

  return (
    <footer className="site-footer relative z-[1] mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="site-header-logo inline-block text-xl leading-none tracking-tight"
            >
              <span className="font-black text-white">Watt</span>
              <span className="font-light text-neutral-400">Quick</span>
            </Link>
            <p className="footer-muted max-w-xs text-sm leading-relaxed">
              {count} free micro-calculators for batteries, solar, EV charging,
              and home power. Instant answers—no account required.
            </p>
          </div>

          <div>
            <h2 className="footer-heading text-xs font-semibold uppercase tracking-widest">
              Categories
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_CALCULATOR_CATEGORIES.map(({ category, href }) => (
                <li key={category}>
                  <Link href={href} className="footer-nav-link text-sm">
                    {CALCULATOR_CATEGORY_LABELS[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading text-xs font-semibold uppercase tracking-widest">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading text-xs font-semibold uppercase tracking-widest">
              Legal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-divider mt-10 border-t pt-8">
          <h2 className="footer-heading text-center text-xs font-semibold uppercase tracking-widest">
            Network partners
          </h2>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {FOOTER_NETWORK_PARTNERS.map((partner) => (
              <li key={partner.href}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="footer-nav-link text-sm font-medium"
                >
                  {partner.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="footer-muted mt-8 text-center text-xs">
          © {new Date().getFullYear()} WattQuick. All calculators are estimates—for
          planning only, not professional engineering advice.
        </p>
      </div>
    </footer>
  );
}
