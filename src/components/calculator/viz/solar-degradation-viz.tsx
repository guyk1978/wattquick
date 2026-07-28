"use client";

import { cn } from "@/lib/utils";

interface SolarDegradationVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Panel Degradation [VIZ].
 * Current = year-1 × (1 − d)^age.
 * Sample: 12,000 kWh/yr · 10 yr · 0.5%/yr → 11,413 kWh · 95.1% · −587 kWh.
 */
export function SolarDegradationViz({ className }: SolarDegradationVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-degradation", className)}
      aria-label="Solar panel degradation visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">PV Yield · Compound Fade</h3>
        <p className="tool-viz__subtitle">
          Year-1 production compounds down by the annual degradation rate —
          each operating year shaves a little more off the baseline yield.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-degradation-viz"
          role="img"
          aria-labelledby="spd-viz-title spd-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="spd-viz-title">
            Solar panel degradation animated yield curve diagram
          </title>
          <desc id="spd-viz-desc">
            Year-1 production multiplied by one minus the annual degradation
            rate raised to system age yields current annual output. Sample:
            12,000 kilowatt-hours per year at 0.5 percent per year for 10 years
            remains 11,413 kilowatt-hours, or 95.1 percent of year-1 capacity,
            a loss of 587 kilowatt-hours.
          </desc>

          <defs>
            <pattern
              id="spd-viz-grid"
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
              id="spd-viz-arrow"
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
              id="spd-viz-pulse"
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
              id="spd-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="spd-viz-fade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#spd-viz-grid)"
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
              x="40"
              y="40"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              YEAR-1 PRODUCTION
            </text>
            <text
              className="spd-viz-y1-value"
              x="56"
              y="110"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12,000
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh/yr baseline
            </text>

            <rect
              x="40"
              y="152"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM AGE
            </text>
            <text
              className="spd-viz-age-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 years
            </text>

            <rect
              x="40"
              y="252"
              width="220"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL DEGRADATION
            </text>
            <text
              className="spd-viz-rate-value"
              x="56"
              y="320"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.5%/yr
            </text>
            <text
              x="56"
              y="344"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              Tier-1 typical rate
            </text>
          </g>

          {/* Flow → curve */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#spd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 196 L 290 196 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 196 L 290 196 L 290 140 L 310 140"
            fill="none"
            stroke="url(#spd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="url(#spd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Degradation curve —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TIME-SERIES DEGRADATION PATH
            </text>

            <text
              className="spd-viz-math-value"
              x="336"
              y="96"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12,000 × (0.995)^10 = 11,413
            </text>

            {/* Axes */}
            <line
              x1="360"
              y1="280"
              x2="640"
              y2="280"
              stroke="#333333"
              strokeWidth="1"
            />
            <line
              x1="360"
              y1="280"
              x2="360"
              y2="130"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="360"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 0
            </text>
            <text
              x="500"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 10
            </text>
            <text
              x="620"
              y="296"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 25
            </text>
            <text
              x="336"
              y="140"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              kWh
            </text>

            {/* Baseline year-1 dashed */}
            <line
              className="spd-viz-baseline"
              x1="360"
              y1="150"
              x2="640"
              y2="150"
              stroke="#555555"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x="640"
              y="146"
              textAnchor="end"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              12k
            </text>

            {/* Fade curve: 100% at yr0 → 95.1% at yr10 → ~88% at yr25 */}
            <path
              className="spd-viz-curve"
              d="M 360 150 C 420 152, 460 156, 500 162 C 560 172, 600 188, 640 210"
              fill="none"
              stroke="url(#spd-viz-fade)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className="spd-viz-curve-pulse"
              d="M 360 150 C 420 152, 460 156, 500 162 C 560 172, 600 188, 640 210"
              fill="none"
              stroke="url(#spd-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              className="spd-viz-op-point"
              cx="500"
              cy="162"
              r="6"
              fill="currentColor"
            />
            <text
              className="spd-viz-op-chip"
              x="510"
              y="154"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              95.1%
            </text>

            {/* Panel icon */}
            <rect
              className="spd-viz-panel"
              x="380"
              y="220"
              width="56"
              height="36"
              rx="2"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M 394 220 L 394 256 M 408 220 L 408 256 M 422 220 L 422 256 M 380 232 L 436 232 M 380 244 L 436 244"
              fill="none"
              stroke="#333333"
              strokeWidth="1"
            />

            <rect
              x="348"
              y="312"
              width="284"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="spd-viz-loss-chip"
              x="362"
              y="332"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              −4.9% cumulative · −587 kWh/yr
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#spd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#spd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Current —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CURRENT OUTPUT
            </text>
            <text
              className="spd-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              11,413
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh/yr now
            </text>
            <rect
              x="726"
              y="160"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="spd-viz-out-bar"
              x="726"
              y="160"
              width="154"
              height="12"
              rx="2"
              fill="url(#spd-viz-bar)"
            />
            <text
              className="spd-viz-detail-value"
              x="726"
              y="196"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              95.1% of year-1
            </text>
          </g>

          {/* —— OUTPUT: Degradation —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CUMULATIVE LOSS
            </text>
            <text
              className="spd-viz-loss-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4.9%
            </text>
            <rect
              x="726"
              y="324"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="spd-viz-loss-bar"
              x="726"
              y="324"
              width="32"
              height="10"
              rx="2"
              fill="#555555"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              −587 kWh vs new
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HIGHER %/YR OR MORE YEARS · STEEPER COMPOUND FADE
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              100%
            </text>
            <rect
              x="120"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="spd-viz-cap-bar"
              x="120"
              y="442"
              width="494"
              height="14"
              rx="2"
              fill="url(#spd-viz-bar)"
            />
            <text
              x="560"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              95.1%
            </text>
            <text
              x="660"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ~80% @ 25 yr
            </text>

            <path
              className="spd-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#spd-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              warranty often ~80–90% at 25 years
            </text>
            <text
              className="spd-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              11,413 kWh · 95.1% · −4.9%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
