"use client";

import { cn } from "@/lib/utils";

interface GeneratorFuelConsumptionVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Generator Fuel Consumption [VIZ].
 * burn = ratedGal/hr × max(loadKw, 0.25); runtime = tank ÷ burn.
 * Sample: 3500 W · 0.75 gal/hr · 5 gal → 2.63 gal/hr · 1.9 h · 63.1 gal/day.
 */
export function GeneratorFuelConsumptionViz({
  className,
}: GeneratorFuelConsumptionVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--generator-fuel-consumption",
        className
      )}
      aria-label="Generator fuel consumption visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Load Factor · Fuel Burn</h3>
        <p className="tool-viz__subtitle">
          Electrical demand scales rated gallons-per-hour — tank volume then
          divides by burn rate to estimate how long the set will run.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg generator-fuel-consumption-viz"
          role="img"
          aria-labelledby="gfc-viz-title gfc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="gfc-viz-title">
            Generator fuel consumption load and runtime diagram
          </title>
          <desc id="gfc-viz-desc">
            Generator load in watts converts to kilowatts and scales rated fuel
            consumption to an adjusted burn rate; tank gallons divided by burn
            rate yields runtime. Sample: 3500 watts at 0.75 gallons per hour
            rated with a 5 gallon tank burns 2.63 gallons per hour for about
            1.9 hours of runtime, or roughly 63.1 gallons per day if run
            continuously.
          </desc>

          <defs>
            <pattern
              id="gfc-viz-grid"
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
              id="gfc-viz-arrow"
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
              id="gfc-viz-pulse"
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
              id="gfc-viz-fuel"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="gfc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="gfc-viz-burn"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#gfc-viz-grid)"
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

          {/* —— INPUT: Load —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="200"
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
              LOAD ON GENERATOR
            </text>
            <text
              className="gfc-viz-load-value"
              x="56"
              y="108"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3500 W
            </text>
            <text
              x="170"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              3.5 kW
            </text>
          </g>

          {/* —— INPUT: Rated fuel —— */}
          <g>
            <rect
              x="260"
              y="40"
              width="200"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="276"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATED FUEL USE
            </text>
            <text
              className="gfc-viz-rated-value"
              x="276"
              y="108"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.75
            </text>
            <text
              x="360"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              gal/hr
            </text>
          </g>

          {/* —— INPUT: Tank —— */}
          <g>
            <rect
              x="480"
              y="40"
              width="200"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="496"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              FUEL TANK SIZE
            </text>
            <text
              className="gfc-viz-tank-value"
              x="496"
              y="108"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 gal
            </text>
            <text
              x="590"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              capacity
            </text>
          </g>

          {/* Flow: inputs → engine path */}
          <path
            d="M 140 140 L 140 168 L 480 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 140 140 L 140 168 L 480 168"
            fill="none"
            stroke="url(#gfc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 360 140 L 360 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 360 140 L 360 168"
            fill="none"
            stroke="url(#gfc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 580 140 L 580 168 L 480 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay-2"
            d="M 580 140 L 580 168 L 480 168"
            fill="none"
            stroke="url(#gfc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— CENTER: Gen + fuel path —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="640"
              height="208"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOAD-FACTOR BURN · gal/hr × max(kW, 0.25)
            </text>

            {/* Generator housing */}
            <g className="gfc-viz-gen" transform="translate(64, 248)">
              <rect
                x="0"
                y="8"
                width="120"
                height="72"
                rx="3"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <rect
                x="12"
                y="20"
                width="56"
                height="48"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                className="gfc-viz-fan"
                cx="96"
                cy="44"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <path
                className="gfc-viz-fan"
                d="M 96 44 L 96 30 M 96 44 L 108 50 M 96 44 L 84 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x="60"
                y="100"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                genset · 3.5 kW load
              </text>
            </g>

            {/* Fuel flow to engine */}
            <path
              d="M 200 284 L 280 284"
              fill="none"
              stroke="#444444"
              strokeWidth="2"
              markerEnd="url(#gfc-viz-arrow)"
            />
            <path
              className="gfc-viz-fuel-flow"
              d="M 200 284 L 280 284"
              fill="none"
              stroke="url(#gfc-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Tank with fuel level */}
            <g className="gfc-viz-tank" transform="translate(292, 248)">
              <rect
                x="0"
                y="0"
                width="64"
                height="88"
                rx="3"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <rect
                className="gfc-viz-fuel-fill"
                x="6"
                y="28"
                width="52"
                height="54"
                rx="2"
                fill="url(#gfc-viz-fuel)"
                opacity="0.85"
              />
              <text
                x="32"
                y="108"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                5 gal tank
              </text>
            </g>

            {/* Scale chip + burn math */}
            <g transform="translate(400, 248)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                LOAD FACTOR
              </text>
              <text
                className="gfc-viz-factor-chip"
                x="0"
                y="28"
                fill="#ededed"
                fontSize="18"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                × 3.5 kW
              </text>
              <text
                x="0"
                y="50"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                min floor 0.25×
              </text>

              <rect
                x="0"
                y="68"
                width="220"
                height="36"
                rx="3"
                fill="#0a0a0a"
                stroke="#2a2a2a"
              />
              <text
                className="gfc-viz-math-value"
                x="110"
                y="91"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                0.75 × 3.5 = 2.63 gal/hr
              </text>
            </g>

            {/* Exhaust / power out hint */}
            <g className="gfc-viz-exhaust" transform="translate(160, 236)">
              <path
                d="M 0 20 Q -8 8 0 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 12 20 Q 20 8 12 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>
          </g>

          {/* Flow: center → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#gfc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 330 L 690 330 L 690 310 L 700 310"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 330 L 690 330 L 690 310 L 700 310"
            fill="none"
            stroke="url(#gfc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Runtime —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ESTIMATED RUNTIME
            </text>
            <text
              className="gfc-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.9 h
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              5 gal ÷ 2.63 gal/hr
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gfc-viz-runtime-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#gfc-viz-bar)"
            />
            <text
              className="gfc-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              endurance at this load
            </text>
          </g>

          {/* —— OUTPUT: Burn + daily —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURLY BURN RATE
            </text>
            <text
              className="gfc-viz-burn-out"
              x="716"
              y="318"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2.63 gal/hr
            </text>
            <rect
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gfc-viz-burn-bar"
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="url(#gfc-viz-burn)"
            />
            <text
              className="gfc-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~63.1 gal/day if 24 h
            </text>
          </g>

          {/* —— Footer: fuel drain timeline —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TANK DRAIN AT A GLANCE · 2.63 GAL/HR
            </text>

            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="gfc-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="gfc-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="gfc-viz-tick"
              cx="580"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="gfc-viz-tick gfc-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="gfc-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#gfc-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              t=0 · full 5.0 gal
            </text>
            <text
              x="320"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~1 h · 2.4 gal left
            </text>
            <text
              x="580"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~1.5 h · low fuel
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              1.9 h · empty
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
