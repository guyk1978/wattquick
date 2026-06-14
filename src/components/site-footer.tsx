import Link from "next/link";
import {
  CALCULATOR_CATEGORY_LABELS,
  getAllCalculatorMeta,
} from "@/lib/calculators";
import { FOOTER_NETWORK_PARTNERS } from "@/lib/partners";
import {
  FOOTER_CALCULATOR_CATEGORIES,
  FOOTER_LINKS,
} from "@/lib/site";

export function SiteFooter() {
  const count = getAllCalculatorMeta().length;

  return (
    <footer className="site-footer relative z-[1] mt-auto">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo">
              <span className="site-footer__logo-watt">Watt</span>
              <span className="site-footer__logo-quick">Quick</span>
            </Link>
            <p className="site-footer__tagline">
              {count} free micro-calculators for batteries, solar, EV charging,
              and home power. Instant answers — no account required.
            </p>
          </div>

          <div className="site-footer__column">
            <h2 className="site-footer__heading">Categories</h2>
            <ul className="site-footer__links">
              {FOOTER_CALCULATOR_CATEGORIES.map(({ category, href }) => (
                <li key={category}>
                  <Link href={href} className="site-footer__link">
                    {CALCULATOR_CATEGORY_LABELS[category]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/calculators/" className="site-footer__link site-footer__link--accent">
                  See all tools
                </Link>
              </li>
            </ul>
          </div>

          <div className="site-footer__column">
            <h2 className="site-footer__heading">Company</h2>
            <ul className="site-footer__links">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h2 className="site-footer__heading">Legal</h2>
            <ul className="site-footer__links">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__partners">
          <h2 className="site-footer__partners-heading">Network partners</h2>
          <ul className="site-footer__partners-links">
            {FOOTER_NETWORK_PARTNERS.map((partner) => (
              <li key={partner.href}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="site-footer__partners-link"
                >
                  {partner.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="site-footer__disclaimer">
            © 2026 WattQuick. All calculators are estimates—for planning only,
            not professional engineering advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
