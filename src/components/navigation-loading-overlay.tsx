"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const CIRCLE_SIZE = 88;
const STROKE_WIDTH = 3;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const TRICKLE_INTERVAL_MS = 300;
const TRICKLE_CAP = 78;
const MIN_LOAD_MS = 1000;
const HIDE_DELAY_MS = 380;

const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function isInternalNavigationLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return false;
  if (anchor.target === "_blank" || anchor.download) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return href.startsWith("/");
  }
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/**
 * Centered industrial loading overlay — appears on navigation, completes after render.
 */
export function NavigationLoadingOverlay() {
  const pathname = usePathname() ?? "/";
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const trickleRef = useRef<number | null>(null);
  const completeRef = useRef<number | null>(null);
  const navigatingRef = useRef(false);
  const startedAtRef = useRef(0);
  const displayPercent = Math.min(100, Math.max(0, Math.round(progress)));

  const clearTimers = useCallback(() => {
    if (trickleRef.current !== null) {
      window.clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
    if (completeRef.current !== null) {
      window.clearTimeout(completeRef.current);
      completeRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimers();
    navigatingRef.current = true;
    startedAtRef.current = Date.now();
    setVisible(true);
    setProgress(4);

    trickleRef.current = window.setInterval(() => {
      setProgress((value) => {
        if (value >= TRICKLE_CAP) return value;
        return value + Math.random() * 2.2 + 0.4;
      });
    }, TRICKLE_INTERVAL_MS);
  }, [clearTimers]);

  const finish = useCallback(async () => {
    if (!navigatingRef.current) return;

    clearTimers();

    const elapsed = Date.now() - startedAtRef.current;
    await delay(Math.max(0, MIN_LOAD_MS - elapsed));

    setProgress(88);
    await delay(220);
    setProgress(96);
    await waitForPaint();
    await delay(200);
    setProgress(100);

    completeRef.current = window.setTimeout(() => {
      navigatingRef.current = false;
      setVisible(false);
      setProgress(0);
    }, HIDE_DELAY_MS);
  }, [clearTimers]);

  useEffect(() => {
    if (navigatingRef.current) {
      void finish();
    }
  }, [pathname, finish]);

  useEffect(() => {
    const onNavigateIntent = () => start();

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigationLink(anchor)) return;

      const href = anchor.getAttribute("href") ?? "";
      const nextPath = new URL(href, window.location.origin).pathname;
      if (nextPath === pathname) return;

      onNavigateIntent();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onNavigateIntent);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onNavigateIntent);
    };
  }, [pathname, start]);

  useEffect(() => clearTimers, [clearTimers]);

  if (!visible) return null;

  const strokeOffset = CIRCUMFERENCE - (displayPercent / 100) * CIRCUMFERENCE;

  return (
    <div
      className="nav-loading-overlay nav-loading-overlay--visible"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={displayPercent}
      aria-label="Loading page"
    >
      <div className="nav-loading-overlay__panel">
        <div className="nav-loading-overlay__ring-wrap">
          <svg
            className="nav-loading-overlay__ring"
            width={CIRCLE_SIZE}
            height={CIRCLE_SIZE}
            viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
            aria-hidden
          >
            <circle
              className="nav-loading-overlay__track"
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
            />
            <circle
              className="nav-loading-overlay__indicator"
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
            />
          </svg>

          <div className="nav-loading-overlay__label">
            <span className="nav-loading-overlay__percent" aria-hidden>
              {displayPercent}
            </span>
            <span className="nav-loading-overlay__suffix" aria-hidden>
              %
            </span>
          </div>
        </div>

        <p className="nav-loading-overlay__status">Loading</p>
      </div>
    </div>
  );
}
