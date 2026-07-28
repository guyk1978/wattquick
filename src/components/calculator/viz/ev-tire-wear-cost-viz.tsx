"use client";

import { cn } from "@/lib/utils";

interface EvTireWearCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Tire Wear Cost [VIZ].
 * EV life = ICE life ÷ (1 + wear%); annual $ = (km ÷ life) × set cost.
 * Sample: 15,000 km/yr · $800 · 50,000 km ICE · +25% → $300/yr · $0.020/km.
 */
export function EvTireWearCostViz({ className }: EvTireWearCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-tire-wear-cost", className)}
      aria-label="EV tire wear cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Tread Life · EV Wear Premium</h3>
        <p className="tool-viz__subtitle">
          Mass and instant torque shorten EV tire life versus ICE — fewer
          kilometers per set means more replacement cycles and higher $/yr.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-tire-wear-cost-viz"
          role="img"
          aria-labelledby="etwc-viz-title etwc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="etwc-viz-title">
            EV tire wear cost and ICE comparison diagram
          </title>
          <desc id="etwc-viz-desc">
            Annual distance, tire set cost, ICE tire life, and EV wear
            acceleration determine annual tire depreciation. Sample: 15,000
            kilometers per year with an 800 dollar set, 50,000 kilometer ICE
            life, and 25 percent faster EV wear costs 300 dollars per year at
            0.02 dollars per kilometer with a 40,000 kilometer EV tire life.
          </desc>

          <defs>
            <pattern
              id="etwc-viz-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#262626"
                strokeWidth="0.75"
              />
            </pattern>
            <marker
              id="etwc-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient
              id="etwc-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="etwc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="etwc-viz-ice"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#etwc-viz-grid)"
            opacity="0.55"
          />
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

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="36"
              y="36"
              width="200"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="60"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL DISTANCE
            </text>
            <text
              className="etwc-viz-km-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15,000 km
            </text>

            <rect
              x="36"
              y="136"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="160"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TIRE SET COST
            </text>
            <text
              className="etwc-viz-cost-value"
              x="52"
              y="194"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $800
            </text>

            <rect
              x="36"
              y="226"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="250"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ICE TIRE LIFE
            </text>
            <text
              className="etwc-viz-ice-value"
              x="52"
              y="284"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50,000 km
            </text>

            <rect
              x="36"
              y="316"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV WEAR ACCEL.
            </text>
            <text
              className="etwc-viz-wear-value"
              x="52"
              y="374"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +25%
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 80 L 300 80 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#etwc-viz-arrow)"
            />
            <path
              className="etwc-viz-timeline-pulse"
              d="M 236 80 L 300 80 L 300 140"
              fill="none"
              stroke="url(#etwc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 174 L 280 174 L 280 170 L 300 170"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="etwc-viz-wear-pulse"
              d="M 236 174 L 280 174 L 280 170 L 300 170"
              fill="none"
              stroke="url(#etwc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 236 264 L 280 264 L 280 220 L 300 220"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="etwc-viz-wear-pulse"
              d="M 236 264 L 280 264 L 280 220 L 300 220"
              fill="none"
              stroke="url(#etwc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.4s" }}
            />
            <path
              d="M 236 354 L 288 354 L 288 280 L 300 280"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#etwc-viz-arrow)"
            />
            <path
              className="etwc-viz-wear-pulse"
              d="M 236 354 L 288 354 L 288 280 L 300 280"
              fill="none"
              stroke="url(#etwc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.6s" }}
            />
          </g>

          {/* —— CENTER: WEAR PATH —— */}
          <g>
            <rect
              x="300"
              y="48"
              width="340"
              height="360"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="320"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WEAR-RATE · COST PATH
            </text>

            {/* Tire line art */}
            <g className="etwc-viz-tire-node">
              <circle
                cx="360"
                cy="128"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="360"
                cy="128"
                r="18"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <path
                d="M 360 92 L 360 104 M 360 152 L 360 164 M 324 128 L 336 128 M 384 128 L 396 128"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <text
                x="360"
                y="182"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                EV TREAD
              </text>
            </g>

            <g className="etwc-viz-factor-node">
              <rect
                x="420"
                y="100"
                width="200"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="520"
                y="122"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                WEAR FACTOR
              </text>
              <text
                className="etwc-viz-factor-chip"
                x="520"
                y="144"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ×1.25 · torque + mass
              </text>
            </g>

            {/* Life compare bars */}
            <text
              x="320"
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ICE LIFE · 50,000 km
            </text>
            <rect
              x="320"
              y="224"
              width="300"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="etwc-viz-ice-bar"
              x="320"
              y="224"
              width="300"
              height="12"
              rx="2"
              fill="url(#etwc-viz-ice)"
            />

            <text
              x="320"
              y="260"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              EV LIFE · 50k ÷ 1.25 = 40,000 km
            </text>
            <rect
              x="320"
              y="270"
              width="300"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="etwc-viz-ev-bar"
              x="320"
              y="270"
              width="240"
              height="12"
              rx="2"
              fill="url(#etwc-viz-bar)"
            />

            <rect
              x="320"
              y="302"
              width="140"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="etwc-viz-ice-chip"
              x="390"
              y="325"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ICE $240/yr
            </text>
            <rect
              x="480"
              y="302"
              width="140"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="etwc-viz-ev-chip"
              x="550"
              y="325"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              EV $300/yr
            </text>

            {/* Sets per year */}
            <text
              x="320"
              y="366"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              REPLACEMENT CYCLES
            </text>
            <text
              className="etwc-viz-sets-chip"
              x="480"
              y="388"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ICE 0.30 · EV 0.38 sets/yr
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#etwc-viz-arrow)"
            />
            <path
              className="etwc-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#etwc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="110"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="696"
              y="74"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL EV DEPRECIATION
            </text>
            <text
              className="etwc-viz-output-value"
              x="696"
              y="118"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $300
            </text>
            <text
              x="696"
              y="140"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /yr · +$60 vs ICE
            </text>

            <rect
              x="680"
              y="174"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="200"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COST PER KILOMETER
            </text>
            <text
              className="etwc-viz-cpk-out"
              x="696"
              y="228"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.020/km
            </text>

            <rect
              x="680"
              y="262"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="288"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV TIRE LIFE
            </text>
            <text
              className="etwc-viz-life-out"
              x="696"
              y="316"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40,000 km
            </text>

            <rect
              x="680"
              y="350"
              width="244"
              height="58"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="etwc-viz-timeline-out"
              x="802"
              y="376"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Replace ~every 2.7 yr
            </text>
            <text
              x="802"
              y="394"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ICE ~every 3.3 yr
            </text>
          </g>

          {/* —— MATH STRIP —— */}
          <g>
            <rect
              x="36"
              y="420"
              width="888"
              height="52"
              rx="4"
              fill="#0d0d0d"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="etwc-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              (15,000 ÷ 40,000) × $800 → $300/yr · ICE (15k ÷ 50k) × $800 = $240
            </text>
          </g>

          <path
            className="etwc-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#etwc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="56"
            y="528"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            PSI + rotation cut cupping · regen bias wears fronts unevenly
          </text>
          <text
            className="etwc-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            −20% life vs ICE
          </text>
        </svg>
      </div>
    </section>
  );
}
