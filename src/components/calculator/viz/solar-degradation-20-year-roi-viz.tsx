"use client";

import { cn } from "@/lib/utils";

interface SolarDegradation20YearRoiVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Degradation & 20-Year ROI [VIZ].
 * Year-1 kWh fades by (1−d)^n; savings escalate with rate inflation → CapEx cross.
 * Sample: 8 kWp · 1,400 kWh/kWp · 0.6%/yr · $18k · $0.14 · 3% →
 * 211,680 kWh · break-even 10.3 yr · $39,582 / 20 yr · 89.2% @ yr 20.
 */
export function SolarDegradation20YearRoiViz({
  className,
}: SolarDegradation20YearRoiVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--solar-degradation-20-year-roi",
        className
      )}
      aria-label="Solar system degradation and 20-year ROI visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">20-Yr Yield · Break-Even Path</h3>
        <p className="tool-viz__subtitle">
          Annual kWh softens with panel fade while escalating bill savings climb
          until they repay CapEx — then compound beyond payback.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-degradation-20-year-roi-viz"
          role="img"
          aria-labelledby="sdroi-viz-title sdroi-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sdroi-viz-title">
            Solar degradation and 20-year ROI animated cashflow diagram
          </title>
          <desc id="sdroi-viz-desc">
            Nominal system size, site yield, degradation rate, install cost,
            electricity rate, and energy inflation model twenty years of
            declining production and rising cumulative savings. Sample: 8
            kilowatts peak at 1,400 kilowatt-hours per kilowatt-peak, 0.6
            percent degradation, 18,000 dollar install, 0.14 dollars per
            kilowatt-hour and 3 percent inflation yields 211,680 kilowatt-hours,
            break-even at 10.3 years, and 39,582 dollars total savings with 89.2
            percent of year-1 capacity remaining in year 20.
          </desc>

          <defs>
            <pattern
              id="sdroi-viz-grid"
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
              id="sdroi-viz-arrow"
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
              id="sdroi-viz-pulse"
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
              id="sdroi-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#sdroi-viz-grid)"
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
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="58"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM SIZE
            </text>
            <text
              className="sdroi-viz-kwp-value"
              x="52"
              y="92"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 kWp
            </text>

            <rect
              x="36"
              y="126"
              width="200"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="148"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SITE YIELD
            </text>
            <text
              className="sdroi-viz-yield-value"
              x="52"
              y="176"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,400 kWh/kWp
            </text>

            <rect
              x="36"
              y="208"
              width="200"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="230"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INSTALL COST
            </text>
            <text
              className="sdroi-viz-cost-value"
              x="52"
              y="258"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $18,000
            </text>

            <rect
              x="36"
              y="290"
              width="200"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="312"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DEG · RATE · INFL
            </text>
            <text
              className="sdroi-viz-params-value"
              x="52"
              y="340"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.6% · $0.14 · 3%
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 75 L 300 75 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#sdroi-viz-arrow)"
            />
            <path
              className="sdroi-viz-timeline-pulse"
              d="M 236 75 L 300 75 L 300 140"
              fill="none"
              stroke="url(#sdroi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 243 L 280 243 L 280 200 L 300 200"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="sdroi-viz-cash-pulse"
              d="M 236 243 L 280 243 L 280 200 L 300 200"
              fill="none"
              stroke="url(#sdroi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.35s" }}
            />
          </g>

          {/* —— CENTER: 20-YR SIM —— */}
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
              20-YEAR SIMULATION PATH
            </text>

            {/* Axes */}
            <path
              d="M 330 140 L 330 350 L 620 350"
              fill="none"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="330"
              y="132"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              $ / kWh
            </text>
            <text
              x="620"
              y="368"
              textAnchor="end"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 20
            </text>
            <text
              x="330"
              y="368"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yr 1
            </text>

            {/* CapEx line @ $18k → y≈252 */}
            <path
              className="sdroi-viz-capex-line"
              d="M 330 252 L 620 252"
              fill="none"
              stroke="#555555"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="624"
              y="256"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              CapEx
            </text>

            {/* Yield fade curve (subtle decline) */}
            <path
              className="sdroi-viz-yield-curve"
              d="M 340 155 L 395 162 L 463 170 L 531 178 L 600 186"
              fill="none"
              stroke="#666666"
              strokeWidth="1.5"
            />
            <path
              className="sdroi-viz-curve-pulse"
              d="M 340 155 L 395 162 L 463 170 L 531 178 L 600 186"
              fill="none"
              stroke="url(#sdroi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="340"
              y="148"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              yield fade
            </text>

            {/* Cumulative savings curve */}
            <path
              className="sdroi-viz-save-curve"
              d="M 340 351 L 395 311 L 463 255 L 531 193 L 600 123"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="sdroi-viz-cash-pulse"
              d="M 340 351 L 395 311 L 463 255 L 531 193 L 600 123"
              fill="none"
              stroke="url(#sdroi-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Break-even point @ 10.3 yr */}
            <circle
              className="sdroi-viz-be-point"
              cx="467"
              cy="252"
              r="6"
              fill="currentColor"
            />
            <rect
              x="430"
              y="218"
              width="74"
              height="22"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="sdroi-viz-be-chip"
              x="467"
              y="233"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              BE 10.3 yr
            </text>

            <rect
              x="320"
              y="380"
              width="100"
              height="18"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="sdroi-viz-y1-chip"
              x="370"
              y="393"
              textAnchor="middle"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Y1 11,200 kWh
            </text>
            <rect
              x="430"
              y="380"
              width="100"
              height="18"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="sdroi-viz-y20-chip"
              x="480"
              y="393"
              textAnchor="middle"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Y20 9,990 kWh
            </text>
            <rect
              x="540"
              y="380"
              width="80"
              height="18"
              rx="2"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="sdroi-viz-cap-chip"
              x="580"
              y="393"
              textAnchor="middle"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              89.2%
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#sdroi-viz-arrow)"
            />
            <path
              className="sdroi-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#sdroi-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="100"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="696"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              20-YR TOTAL YIELD
            </text>
            <text
              className="sdroi-viz-output-value"
              x="696"
              y="112"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              211,680
            </text>
            <text
              x="696"
              y="132"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              kWh cumulative
            </text>

            <rect
              x="680"
              y="164"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="190"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BREAK-EVEN (ROI)
            </text>
            <text
              className="sdroi-viz-be-out"
              x="696"
              y="218"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10.3 years
            </text>

            <rect
              x="680"
              y="252"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TOTAL 20-YR SAVINGS
            </text>
            <text
              className="sdroi-viz-save-out"
              x="696"
              y="306"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $39,582
            </text>

            <rect
              x="680"
              y="340"
              width="244"
              height="68"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              NET AFTER CAPEX
            </text>
            <text
              className="sdroi-viz-net-out"
              x="696"
              y="390"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +$21,582 · 89.2% @ Y20
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
              className="sdroi-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Σ [11,200×(0.994)^(n−1) × $0.14×(1.03)^(n−1)] → $39,582 · BE @
              CapEx
            </text>
          </g>

          <path
            className="sdroi-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#sdroi-viz-pulse)"
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
            degradation shrinks kWh · inflation lifts $/kWh · crossover =
            payback
          </text>
          <text
            className="sdroi-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            −10.8% yield @ Y20
          </text>
        </svg>
      </div>
    </section>
  );
}
