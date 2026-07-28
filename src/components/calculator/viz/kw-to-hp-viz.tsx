"use client";

import { cn } from "@/lib/utils";

interface KwToHpVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for kW to HP Converter [VIZ].
 * HP = kW ÷ 0.7457 ≈ kW × 1.34102 (mechanical horsepower).
 * Sample: 75 kW → 100.58 HP.
 */
export function KwToHpViz({ className }: KwToHpVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--kw-to-hp", className)}
      aria-label="Kilowatts to horsepower conversion visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">kW → Mechanical HP</h3>
        <p className="tool-viz__subtitle">
          Electrical kilowatts scale by the mechanical horsepower factor —
          1 kW ≈ 1.341 HP — to rate motors, generators, and EV drivetrains.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg kw-to-hp-viz"
          role="img"
          aria-labelledby="kth-viz-title kth-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="kth-viz-title">
            Kilowatts to mechanical horsepower animated conversion diagram
          </title>
          <desc id="kth-viz-desc">
            Electrical power in kilowatts divided by 0.7457, or multiplied by
            about 1.341, yields mechanical horsepower. Sample: 75 kilowatts
            equals approximately 100.58 horsepower.
          </desc>

          <defs>
            <pattern
              id="kth-viz-grid"
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
              id="kth-viz-arrow"
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
              id="kth-viz-pulse"
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
              id="kth-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="kth-viz-shaft"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.75" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#kth-viz-grid)"
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

          {/* —— INPUT: kW —— */}
          <g>
            <rect
              x="40"
              y="80"
              width="220"
              height="240"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="106"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRICAL POWER
            </text>
            <text
              className="kth-viz-kw-value"
              x="56"
              y="168"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75 kW
            </text>
            <text
              x="56"
              y="200"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              SI electrical rating
            </text>
            <text
              x="56"
              y="230"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              EV motor · generator · drive
            </text>
            <text
              x="56"
              y="252"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              nameplate kilowatts
            </text>

            {/* Mini electrical symbol */}
            <rect
              className="kth-viz-e-block"
              x="56"
              y="274"
              width="72"
              height="28"
              rx="2"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <text
              x="92"
              y="293"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              kW
            </text>
          </g>

          {/* Flow → conversion */}
          <path
            d="M 260 200 L 310 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#kth-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 200 L 310 200"
            fill="none"
            stroke="url(#kth-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Conversion bridge —— */}
          <g>
            <rect
              x="320"
              y="80"
              width="340"
              height="240"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="106"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SCALE FACTOR · MECHANICAL HP
            </text>

            {/* Scale track */}
            <text
              x="348"
              y="148"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0 kW
            </text>
            <rect
              x="348"
              y="160"
              width="284"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="kth-viz-scale-bar"
              x="348"
              y="160"
              width="213"
              height="14"
              rx="2"
              fill="url(#kth-viz-bar)"
            />
            <text
              x="640"
              y="148"
              textAnchor="end"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              100 kW
            </text>
            <text
              className="kth-viz-scale-chip"
              x="561"
              y="171"
              textAnchor="middle"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              75
            </text>

            {/* Factor chip + shaft metaphor */}
            <rect
              x="380"
              y="196"
              width="220"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="kth-viz-math-value"
              x="490"
              y="218"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              × 1.34102
            </text>
            <text
              x="490"
              y="236"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              or ÷ 0.7457 kW/HP
            </text>

            {/* Animated shaft line electrical → mechanical */}
            <line
              className="kth-viz-shaft"
              x1="360"
              y1="270"
              x2="620"
              y2="270"
              stroke="url(#kth-viz-shaft)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              className="kth-viz-gear"
              cx="360"
              cy="270"
              r="10"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              className="kth-viz-gear"
              cx="620"
              cy="270"
              r="10"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              className="kth-viz-shaft-pulse"
              d="M 370 270 L 610 270"
              fill="none"
              stroke="url(#kth-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="490"
              y="300"
              textAnchor="middle"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              electrical → mechanical shaft
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 200 L 700 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#kth-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 200 L 700 200"
            fill="none"
            stroke="url(#kth-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: HP —— */}
          <g>
            <rect
              x="710"
              y="80"
              width="210"
              height="240"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="106"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MECHANICAL HP
            </text>
            <text
              className="kth-viz-output-value"
              x="726"
              y="168"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100.58
            </text>
            <text
              className="kth-viz-output-unit"
              x="726"
              y="196"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              HP
            </text>
            <text
              x="726"
              y="228"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ compact gas-car class
            </text>
            <rect
              x="726"
              y="248"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="kth-viz-output-bar"
              x="726"
              y="248"
              width="148"
              height="12"
              rx="2"
              fill="url(#kth-viz-bar)"
            />
            <text
              className="kth-viz-detail-value"
              x="726"
              y="288"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              75 ÷ 0.7457
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="348"
              width="880"
              height="172"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="376"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              kW ↔ HP MAP · MECHANICAL HORSEPOWER (NOT METRIC PS)
            </text>

            {/* Dual scale comparison */}
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              kW
            </text>
            <rect
              x="96"
              y="406"
              width="640"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="kth-viz-kw-bar"
              x="96"
              y="406"
              width="480"
              height="12"
              rx="2"
              fill="url(#kth-viz-bar)"
            />
            <text
              className="kth-viz-kw-chip"
              x="576"
              y="416"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              75
            </text>
            <text
              x="760"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              100 kW
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              HP
            </text>
            <rect
              x="96"
              y="442"
              width="640"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="kth-viz-hp-bar"
              x="96"
              y="442"
              width="480"
              height="12"
              rx="2"
              fill="url(#kth-viz-bar)"
            />
            <text
              className="kth-viz-hp-chip"
              x="576"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              100.58
            </text>
            <text
              x="760"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ~134 HP
            </text>

            <path
              className="kth-viz-timeline-pulse"
              d="M 56 488 L 880 488"
              fill="none"
              stroke="url(#kth-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="512"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              1 kW ≈ 1.341 HP · metric PS uses 0.7355 kW
            </text>
            <text
              className="kth-viz-detail-value"
              x="880"
              y="512"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              75 kW → 100.58 HP
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
