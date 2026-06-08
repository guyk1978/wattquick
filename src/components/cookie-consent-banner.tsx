"use client";

import Link from "next/link";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const { showBanner, accept, decline } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[200]",
        "border-t border-white/5 bg-neutral-900/90 backdrop-blur-xl",
        "px-4 py-4 sm:px-6 sm:py-5"
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p
            id="cookie-consent-title"
            className="text-sm font-semibold tracking-tight text-neutral-100"
          >
            Cookie preferences
          </p>
          <p
            id="cookie-consent-description"
            className="text-sm leading-relaxed text-neutral-400"
          >
            We use optional analytics cookies to understand aggregate site usage.
            Accept to enable Google Analytics. Decline to browse without tracking.{" "}
            <Link
              href="/privacy/"
              className="font-medium text-neutral-200 underline-offset-4 hover:underline"
            >
              Privacy policy
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={decline}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-none px-4 text-sm font-medium",
              "border border-white/10 bg-white/5 text-neutral-300",
              "transition-colors hover:bg-white/10 hover:text-neutral-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            )}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-none px-4 text-sm font-semibold",
              "border border-white/15 bg-white/10 text-neutral-100",
              "transition-colors hover:bg-white/15",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            )}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
