"use client";

import { cn } from "@/lib/utils";

interface EbikeRangePerformanceVizProps {
  className?: string;
}

/**
 * Friendly ride-scene visualization for E-Bike Range & Performance [VIZ].
 * Shows how far you can go on one charge across PAS modes — bike travels a
 * path while the battery drains, with ECO / Standard / Throttle mile markers.
 * Sample: 48V 15Ah · mixed hills · urban tires ≈ 72 km real range.
 */
export function EbikeRangePerformanceViz({
  className,
}: EbikeRangePerformanceVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-range-performance", className)}
      aria-label="E-bike range and performance visual ride overview"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — RIDE MAP</p>
        <h3 className="tool-viz__title">How Far Will You Get?</h3>
        <p className="tool-viz__subtitle">
          Watch the e-bike travel your estimated range. Eco mode goes farthest;
          full throttle burns the pack sooner.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-range-performance-viz"
          role="img"
          aria-labelledby="erp-viz-title erp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="erp-viz-title">
            E-bike range ride map with PAS mode markers
          </title>
          <desc id="erp-viz-desc">
            An animated e-bike rides a rolling path while a battery gauge
            drains. Markers show approximate range for throttle-only at 49
            kilometers, standard assist at 72 kilometers, and eco mode at 110
            kilometers on a sample 48 volt 15 amp-hour pack.
          </desc>

          <defs>
            <linearGradient id="erp-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141018" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="erp-hill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1c1c22" />
              <stop offset="100%" stopColor="#111114" />
            </linearGradient>
            <linearGradient id="erp-road" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2a2a2e" />
              <stop offset="100%" stopColor="#1a1a1e" />
            </linearGradient>
            <linearGradient
              id="erp-battery-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
            </linearGradient>
            <path
              id="erp-ride-path"
              d="M 70 410 C 180 410, 220 360, 300 355 S 420 400, 500 390 S 620 320, 720 330 S 820 380, 900 370"
            />
          </defs>

          <rect width="960" height="560" fill="url(#erp-sky)" />
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

          {/* Soft hills */}
          <path
            d="M 0 360 Q 120 280 240 330 T 480 300 T 720 280 T 960 310 L 960 560 L 0 560 Z"
            fill="url(#erp-hill)"
            opacity="0.9"
          />
          <path
            d="M 0 420 Q 160 360 320 400 T 640 370 T 960 400 L 960 560 L 0 560 Z"
            fill="#0f0f12"
            opacity="0.85"
          />

          {/* Sample setup chips */}
          <g>
            <rect
              x="36"
              y="36"
              width="118"
              height="52"
              rx="6"
              fill="#111111"
              stroke="#333333"
            />
            <text x="48" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">
              BATTERY
            </text>
            <text x="48" y="76" fill="#ededed" fontSize="15" fontWeight="700">
              48V · 15Ah
            </text>

            <rect
              x="166"
              y="36"
              width="110"
              height="52"
              rx="6"
              fill="#111111"
              stroke="#333333"
            />
            <text x="178" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">
              MOTOR
            </text>
            <text x="178" y="76" fill="#ededed" fontSize="15" fontWeight="700">
              500W
            </text>

            <rect
              x="288"
              y="36"
              width="130"
              height="52"
              rx="6"
              fill="#111111"
              stroke="#333333"
            />
            <text x="300" y="56" fill="#888888" fontSize="10" letterSpacing="0.08em">
              TERRAIN
            </text>
            <text x="300" y="76" fill="#ededed" fontSize="15" fontWeight="700">
              Mixed hills
            </text>
          </g>

          {/* Battery HUD */}
          <g transform="translate(760, 36)">
            <rect
              x="0"
              y="0"
              width="164"
              height="72"
              rx="6"
              fill="#111111"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1.25"
            />
            <text
              x="14"
              y="22"
              fill="#888888"
              fontSize="10"
              letterSpacing="0.1em"
            >
              BATTERY LEFT
            </text>
            <rect
              x="14"
              y="34"
              width="120"
              height="22"
              rx="4"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              x="134"
              y="40"
              width="6"
              height="10"
              rx="1"
              fill="#333333"
            />
            <rect
              className="erp-viz-battery-fill"
              x="16"
              y="36"
              width="116"
              height="18"
              rx="3"
              fill="url(#erp-battery-fill)"
            />
          </g>

          {/* Road path */}
          <use
            href="#erp-ride-path"
            fill="none"
            stroke="url(#erp-road)"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <use
            href="#erp-ride-path"
            fill="none"
            stroke="#3a3a40"
            strokeWidth="2"
            strokeDasharray="14 16"
            strokeLinecap="round"
            className="erp-viz-dashes"
          />

          {/* Range markers along the path */}
          <g>
            {/* Throttle ~49 km ≈ 45% along path */}
            <g transform="translate(390, 318)">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-36"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              <rect
                x="-42"
                y="-68"
                width="84"
                height="34"
                rx="4"
                fill="#15120c"
                stroke="#f59e0b"
                strokeOpacity="0.55"
              />
              <text
                x="0"
                y="-52"
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="10"
                fontWeight="600"
              >
                Throttle
              </text>
              <text
                x="0"
                y="-38"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontWeight="700"
              >
                ~49 km
              </text>
            </g>

            {/* Standard ~72 km */}
            <g transform="translate(560, 352)">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-36"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <circle cx="0" cy="0" r="5" fill="currentColor" />
              <rect
                x="-46"
                y="-68"
                width="92"
                height="34"
                rx="4"
                fill="#111111"
                stroke="currentColor"
                strokeOpacity="0.55"
              />
              <text
                x="0"
                y="-52"
                textAnchor="middle"
                fill="currentColor"
                fontSize="10"
                fontWeight="600"
              >
                Standard
              </text>
              <text
                x="0"
                y="-38"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontWeight="700"
              >
                ~72 km
              </text>
            </g>

            {/* Eco ~110 km */}
            <g transform="translate(860, 348)">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-36"
                stroke="#4ade80"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <circle cx="0" cy="0" r="5" fill="#4ade80" />
              <rect
                x="-38"
                y="-68"
                width="76"
                height="34"
                rx="4"
                fill="#0c1510"
                stroke="#4ade80"
                strokeOpacity="0.55"
              />
              <text
                x="0"
                y="-52"
                textAnchor="middle"
                fill="#4ade80"
                fontSize="10"
                fontWeight="600"
              >
                ECO
              </text>
              <text
                x="0"
                y="-38"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontWeight="700"
              >
                ~110 km
              </text>
            </g>
          </g>

          {/* Animated bike along path */}
          <g className="erp-viz-bike-rider">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              rotate="auto"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.4 0 0.2 1"
            >
              <mpath href="#erp-ride-path" />
            </animateMotion>
            <g transform="translate(-36, -42)">
              <g
                fill="none"
                stroke="#ededed"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  className="erp-viz-wheel"
                  cx="14"
                  cy="42"
                  r="11"
                />
                <circle
                  className="erp-viz-wheel"
                  cx="58"
                  cy="42"
                  r="11"
                />
                <path d="M14 42 L30 20 H46 L58 42" />
                <path d="M30 20 L26 42" />
                <path d="M34 20 V10 H46" />
                <circle cx="14" cy="42" r="2.2" fill="currentColor" stroke="none" />
                <circle cx="58" cy="42" r="2.2" fill="currentColor" stroke="none" />
                {/* Soft glow under bike */}
                <ellipse
                  className="erp-viz-glow"
                  cx="36"
                  cy="52"
                  rx="28"
                  ry="4"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.25"
                />
              </g>
            </g>
          </g>

          {/* Start label */}
          <g transform="translate(56, 430)">
            <text fill="#888888" fontSize="11" letterSpacing="0.08em">
              FULL CHARGE
            </text>
            <text y="18" fill="#ededed" fontSize="13" fontWeight="600">
              Start ride
            </text>
          </g>

          {/* Primary result callout */}
          <g transform="translate(36, 470)">
            <rect
              x="0"
              y="0"
              width="888"
              height="58"
              rx="6"
              fill="#111111"
              stroke="currentColor"
              strokeOpacity="0.45"
            />
            <text
              x="20"
              y="24"
              fill="#888888"
              fontSize="11"
              letterSpacing="0.1em"
            >
              YOUR REAL RANGE (MIXED STYLE)
            </text>
            <text
              className="erp-viz-range-value"
              x="20"
              y="46"
              fill="#ededed"
              fontSize="22"
              fontWeight="700"
            >
              ~72 km on one charge
            </text>
            <text
              x="868"
              y="36"
              textAnchor="end"
              fill="#888888"
              fontSize="12"
            >
              Pedal more → go farther
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
