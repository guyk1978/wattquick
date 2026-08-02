"use client";

import { cn } from "@/lib/utils";

interface EscooterRangePerformanceVizProps {
  className?: string;
}

/**
 * Friendly ride-map visualization for E-Scooter Range & Performance [VIZ].
 * Scooter travels a city path while battery drains; markers for Eco / Mixed / Sport.
 * Sample: 52V 20Ah · dual 1000W · urban hills ≈ 45 km real range.
 */
export function EscooterRangePerformanceViz({
  className,
}: EscooterRangePerformanceVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-range-performance", className)}
      aria-label="E-scooter range and performance visual ride overview"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — RIDE MAP</p>
        <h3 className="tool-viz__title">How Far Will Your Scooter Go?</h3>
        <p className="tool-viz__subtitle">
          Watch the scooter cover your estimated range. Eco mode stretches the
          pack; sport dual-throttle burns it sooner.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-range-performance-viz"
          role="img"
          aria-labelledby="esr-viz-title esr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esr-viz-title">
            E-scooter range ride map with riding-style markers
          </title>
          <desc id="esr-viz-desc">
            An animated e-scooter rides a rolling urban path while a battery
            gauge drains. Markers show approximate range for sport mode at 32
            kilometers, mixed at 45 kilometers, and eco at 68 kilometers on a
            sample 52 volt 20 amp-hour pack.
          </desc>

          <defs>
            <linearGradient id="esr-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#160f18" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="esr-hill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1522" />
              <stop offset="100%" stopColor="#111114" />
            </linearGradient>
            <linearGradient id="esr-road" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2e2a32" />
              <stop offset="100%" stopColor="#1a1a1e" />
            </linearGradient>
            <linearGradient
              id="esr-battery-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0.55" />
            </linearGradient>
            <path
              id="esr-ride-path"
              d="M 70 415 C 170 415, 210 365, 295 360 S 410 405, 500 395 S 615 325, 715 335 S 820 385, 900 375"
            />
          </defs>

          <rect width="960" height="560" fill="url(#esr-sky)" />
          <rect
            x="12"
            y="12"
            width="936"
            height="536"
            fill="none"
            stroke="#262626"
            strokeWidth="1"
            rx="4"
          />

          <path
            d="M 0 365 Q 130 290 250 335 T 500 305 T 740 285 T 960 315 L 960 560 L 0 560 Z"
            fill="url(#esr-hill)"
            opacity="0.9"
          />
          <path
            d="M 0 425 Q 170 365 330 405 T 650 375 T 960 405 L 960 560 L 0 560 Z"
            fill="#0f0f12"
            opacity="0.85"
          />

          <g>
            <rect x="36" y="36" width="118" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="48" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">BATTERY</text>
            <text x="48" y="76" fill="#ededed" fontSize="15" fontWeight="700">52V · 20Ah</text>

            <rect x="166" y="36" width="128" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="178" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">MOTORS</text>
            <text x="178" y="76" fill="#ededed" fontSize="15" fontWeight="700">Dual 1000W</text>

            <rect x="306" y="36" width="130" height="52" rx="6" fill="#111111" stroke="#333333" />
            <text x="318" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">TERRAIN</text>
            <text x="318" y="76" fill="#ededed" fontSize="15" fontWeight="700">Urban hills</text>
          </g>

          <g transform="translate(760, 36)">
            <rect
              x="0"
              y="0"
              width="164"
              height="72"
              rx="6"
              fill="#111111"
              stroke="#e879f9"
              strokeOpacity="0.55"
              strokeWidth="1.25"
            />
            <text x="14" y="22" fill="#888888" fontSize="10" letterSpacing="0.1em">
              BATTERY LEFT
            </text>
            <rect x="14" y="34" width="120" height="22" rx="4" fill="#0a0a0a" stroke="#333333" />
            <rect x="134" y="40" width="6" height="10" rx="1" fill="#333333" />
            <rect
              className="esr-viz-battery-fill"
              x="16"
              y="36"
              width="116"
              height="18"
              rx="3"
              fill="url(#esr-battery-fill)"
            />
          </g>

          <use href="#esr-ride-path" fill="none" stroke="url(#esr-road)" strokeWidth="28" strokeLinecap="round" />
          <use
            href="#esr-ride-path"
            fill="none"
            stroke="#4a3f52"
            strokeWidth="2"
            strokeDasharray="14 16"
            strokeLinecap="round"
            className="esr-viz-dashes"
          />

          <g>
            <g transform="translate(360, 328)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              <rect x="-40" y="-68" width="80" height="34" rx="4" fill="#15120c" stroke="#f59e0b" strokeOpacity="0.55" />
              <text x="0" y="-52" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="600">Sport</text>
              <text x="0" y="-38" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">~32 km</text>
            </g>

            <g transform="translate(545, 360)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="0" cy="0" r="5" fill="currentColor" />
              <rect x="-42" y="-68" width="84" height="34" rx="4" fill="#111111" stroke="currentColor" strokeOpacity="0.55" />
              <text x="0" y="-52" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600">Mixed</text>
              <text x="0" y="-38" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">~45 km</text>
            </g>

            <g transform="translate(850, 352)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#4ade80" strokeWidth="1.5" strokeOpacity="0.7" />
              <circle cx="0" cy="0" r="5" fill="#4ade80" />
              <rect x="-36" y="-68" width="72" height="34" rx="4" fill="#0c1510" stroke="#4ade80" strokeOpacity="0.55" />
              <text x="0" y="-52" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="600">ECO</text>
              <text x="0" y="-38" textAnchor="middle" fill="#ededed" fontSize="12" fontWeight="700">~68 km</text>
            </g>
          </g>

          <g className="esr-viz-scooter-rider">
            <animateMotion dur="7.5s" repeatCount="indefinite" rotate="auto" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1">
              <mpath href="#esr-ride-path" />
            </animateMotion>
            <g transform="translate(-28, -46)" fill="none" stroke="#ededed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle className="esr-viz-wheel" cx="12" cy="40" r="10" />
              <circle className="esr-viz-wheel" cx="48" cy="40" r="10" />
              <path d="M12 40 L22 18 H40 L48 40" />
              <path d="M22 18 V8 H34" />
              <path d="M26 18 L26 40" />
              <circle cx="12" cy="40" r="2" fill="#e879f9" stroke="none" />
              <circle cx="48" cy="40" r="2" fill="#e879f9" stroke="none" />
              <ellipse className="esr-viz-glow" cx="30" cy="50" rx="26" ry="4" fill="#e879f9" stroke="none" opacity="0.28" />
            </g>
          </g>

          <g transform="translate(56, 435)">
            <text fill="#888888" fontSize="11" letterSpacing="0.08em">FULL CHARGE</text>
            <text y="18" fill="#ededed" fontSize="13" fontWeight="600">Start ride</text>
          </g>

          <g transform="translate(36, 470)">
            <rect x="0" y="0" width="888" height="58" rx="6" fill="#111111" stroke="#e879f9" strokeOpacity="0.4" />
            <text x="20" y="24" fill="#888888" fontSize="11" letterSpacing="0.1em">
              YOUR REAL RANGE (MIXED STYLE)
            </text>
            <text className="esr-viz-range-value" x="20" y="46" fill="#ededed" fontSize="22" fontWeight="700">
              ~45 km · ~28 mi on one charge
            </text>
            <text x="868" y="36" textAnchor="end" fill="#888888" fontSize="12">
              Ease off throttle → go farther
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
