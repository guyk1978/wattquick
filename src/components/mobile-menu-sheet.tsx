"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Library, X } from "lucide-react";
import { SiteHeaderSearch } from "@/components/site-header-search";
import { getHeaderNavShortLabel } from "@/lib/header-nav-labels";
import { isMainNavActive } from "@/lib/nav-active";
import { MAIN_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

type MobileMenuSheetProps = {
  open: boolean;
  onClose: () => void;
  /** Optional library shortcut (GridNav). */
  onOpenLibrary?: () => void;
  /** Extra footer actions (theme toggle, share, etc.). */
  footer?: ReactNode;
  /** Id for aria-controls on the hamburger trigger. */
  id?: string;
  className?: string;
};

/**
 * Full-screen mobile navigation sheet: search, main links, library shortcut.
 * Opened from the hamburger control in GridNav / SiteHeaderBar.
 */
export function MobileMenuSheet({
  open,
  onClose,
  onOpenLibrary,
  footer,
  id,
  className,
}: MobileMenuSheetProps) {
  const pathname = usePathname();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      id={id}
      className={cn("mobile-menu-sheet", className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="mobile-menu-sheet__backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div className="mobile-menu-sheet__panel">
        <header className="mobile-menu-sheet__header">
          <p id={titleId} className="mobile-menu-sheet__title">
            Menu
          </p>
          <button
            ref={closeRef}
            type="button"
            className="mobile-menu-sheet__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>
        </header>

        <div className="mobile-menu-sheet__search">
          <SiteHeaderSearch />
        </div>

        <nav className="mobile-menu-sheet__nav" aria-label="Mobile navigation">
          <ul className="mobile-menu-sheet__list">
            {MAIN_NAV.map((item) => {
              const active = isMainNavActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "mobile-menu-sheet__link",
                      active && "mobile-menu-sheet__link--active"
                    )}
                  >
                    {getHeaderNavShortLabel(item.href) || item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/wizard/"
                onClick={onClose}
                aria-current={
                  isMainNavActive("/wizard", pathname) ? "page" : undefined
                }
                className={cn(
                  "mobile-menu-sheet__link",
                  isMainNavActive("/wizard", pathname) &&
                    "mobile-menu-sheet__link--active"
                )}
              >
                Wizard
              </Link>
            </li>
            {onOpenLibrary ? (
              <li>
                <button
                  type="button"
                  className="mobile-menu-sheet__link mobile-menu-sheet__link--action"
                  onClick={() => {
                    onClose();
                    onOpenLibrary();
                  }}
                >
                  <Library className="size-4" aria-hidden />
                  Library
                </button>
              </li>
            ) : null}
          </ul>
        </nav>

        {footer ? (
          <div className="mobile-menu-sheet__footer">{footer}</div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
