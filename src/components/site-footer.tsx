"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { getAllCalculatorMeta } from "@/lib/calculators";
import {
  getDynamicCalculatorCategoryResources,
  getToolFooterLinksForPath,
} from "@/lib/footerResources";
import { FOOTER_NETWORK_PARTNERS } from "@/lib/partners";
import { FOOTER_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const FOOTER_DISCLAIMER =
  "© 2026 WattQuick. All calculators are estimates—for planning only, not professional engineering advice.";

export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  const resourceLinks = getToolFooterLinksForPath(pathname);
  const count = getAllCalculatorMeta().length;
  const [open, setOpen] = useState(false);

  return (
    <footer className={cn("site-footer relative z-[1] mt-auto", open && "site-footer--open")}>
      <div
        id="site-footer-drawer"
        className="site-footer__drawer"
        hidden={!open}
      >
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
                {getDynamicCalculatorCategoryResources().map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="site-footer__link">
                      {link.label}
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

            {resourceLinks.length > 0 ? (
              <div className="site-footer__column">
                <h2 className="site-footer__heading">Resources</h2>
                <ul className="site-footer__links">
                  {resourceLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="site-footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

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
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <p className="site-footer__disclaimer">{FOOTER_DISCLAIMER}</p>
        <button
          type="button"
          className="site-footer__toggle"
          aria-expanded={open}
          aria-controls="site-footer-drawer"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Hide footer links" : "Show footer links"}</span>
          <ChevronUp
            className={cn("site-footer__toggle-icon", !open && "site-footer__toggle-icon--closed")}
            strokeWidth={2.25}
            aria-hidden
          />
        </button>
      </div>
    </footer>
  );
}
