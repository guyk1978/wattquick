"use client";

import { cn } from "@/lib/utils";

interface GeneratorRuntimeSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Generator Run-Time Savings [VIZ].
 * Hybrid offset kWh vs gen kWh → hours saved × $/hr → annual maint savings.
 * Sample: 6 hrs/day · 4.5 kW · 15 kWh · 5 PSH · $2.50/hr →
 * 6 h/day saved · $5,475/yr · life +96.7 yr.
 */
export function GeneratorRuntimeSavingsViz({
  className,
}: GeneratorRuntimeSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--generator-runtime-savings", className)}
      aria-label="Generator run-time savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">PV Hours · Offset Genset Runtime</h3>
        <p className="tool-viz__subtitle">
          Solar and battery kWh replace fossil generator energy — fewer engine
          hours cut wear, fuel burn, and recurring maintenance cost.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg generator-runtime-savings-viz"
          role="img"
          aria-labelledby="grs-viz-title grs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="grs-viz-title">
            Generator run-time savings animated offset diagram
          </title>
          <desc id="grs-viz-desc">
            Generator hours today compared with solar array and battery offset
            capacity. Sample: 6 hours per day with a 4.5 kilowatt array, 15
            kilowatt-hour battery, and 5 peak sun hours at 2.50 dollars per
            engine hour saves 6 hours per day and about 5,475 dollars per year
            in maintenance, extending generator life by 96.7 years.
          </desc>

          <defs>
            <pattern
              id="grs-viz-grid"
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
              id="grs-viz-arrow"
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
              id="grs-viz-pulse"
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
              id="grs-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="grs-viz-gen-bar"
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
            fill="url(#grs-viz-grid)"
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
              height="92"
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
              GEN HOURS TODAY
            </text>
            <text
              className="grs-viz-hrs-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6
            </text>
            <text
              x="88"
              y="98"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              hrs/day
            </text>

            <rect
              x="36"
              y="140"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="164"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SOLAR ARRAY
            </text>
            <text
              className="grs-viz-kw-value"
              x="52"
              y="198"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4.5 kW
            </text>

            <rect
              x="36"
              y="230"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="254"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY · PEAK SUN
            </text>
            <text
              className="grs-viz-batt-value"
              x="52"
              y="288"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 kWh · 5 PSH
            </text>

            <rect
              x="36"
              y="320"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="344"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MAINT COST / HOUR
            </text>
            <text
              className="grs-viz-rate-value"
              x="52"
              y="378"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $2.50/hr
            </text>
          </g>

          {/* —— FLOW PATHS —— */}
          <g>
            <path
              d="M 236 82 L 300 82"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#grs-viz-arrow)"
            />
            <path
              className="grs-viz-timeline-pulse"
              d="M 236 82 L 300 82"
              fill="none"
              stroke="url(#grs-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 178 L 280 178 L 280 220 L 300 220"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#grs-viz-arrow)"
            />
            <path
              className="grs-viz-offset-pulse"
              d="M 236 178 L 280 178 L 280 220 L 300 220"
              fill="none"
              stroke="url(#grs-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 268 L 280 268 L 280 240 L 300 240"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="grs-viz-offset-pulse"
              d="M 236 268 L 280 268 L 280 240 L 300 240"
              fill="none"
              stroke="url(#grs-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.4s" }}
            />
          </g>

          {/* —— CENTER: OFFSET COMPARE —— */}
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
              y="74"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RESOURCE OFFSET PATH
            </text>

            {/* Gen node */}
            <g className="grs-viz-gen-node">
              <rect
                x="320"
                y="92"
                width="120"
                height="64"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="380"
                y="114"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                GENSET LOAD
              </text>
              <text
                className="grs-viz-gen-kwh"
                x="380"
                y="140"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                21 kWh/d
              </text>
            </g>

            {/* Hybrid node */}
            <g className="grs-viz-hyb-node">
              <rect
                x="500"
                y="92"
                width="120"
                height="64"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="560"
                y="114"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                PV + BATTERY
              </text>
              <text
                className="grs-viz-hyb-kwh"
                x="560"
                y="140"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                29.6 kWh/d
              </text>
            </g>

            <path
              d="M 440 124 L 500 124"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#grs-viz-arrow)"
            />
            <path
              className="grs-viz-timeline-pulse"
              d="M 440 124 L 500 124"
              fill="none"
              stroke="url(#grs-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <text
              x="320"
              y="186"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SOLAR DAILY · 16.9 kWh
            </text>
            <rect
              x="320"
              y="196"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="grs-viz-solar-bar"
              x="320"
              y="196"
              width="172"
              height="10"
              rx="2"
              fill="url(#grs-viz-bar)"
            />

            <text
              x="320"
              y="232"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BATTERY USABLE · 12.8 kWh
            </text>
            <rect
              x="320"
              y="242"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="grs-viz-batt-bar"
              x="320"
              y="242"
              width="130"
              height="10"
              rx="2"
              fill="url(#grs-viz-bar)"
            />

            <text
              x="320"
              y="286"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RUNTIME · BEFORE → AFTER
            </text>
            <text
              x="320"
              y="310"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              BEFORE 6.0 h
            </text>
            <rect
              x="400"
              y="300"
              width="220"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="grs-viz-before-bar"
              x="400"
              y="300"
              width="220"
              height="12"
              rx="2"
              fill="url(#grs-viz-gen-bar)"
            />

            <text
              x="320"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              AFTER 0.0 h
            </text>
            <rect
              x="400"
              y="330"
              width="220"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            {/* After = 0 hours — empty track with pulse marker */}
            <circle
              className="grs-viz-after-dot"
              cx="406"
              cy="336"
              r="4"
              fill="currentColor"
            />

            <rect
              x="320"
              y="360"
              width="140"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="grs-viz-offset-chip"
              x="390"
              y="381"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100% OFFSET
            </text>

            <rect
              x="472"
              y="360"
              width="148"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="grs-viz-saved-chip"
              x="546"
              y="381"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −6.0 h/day
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#grs-viz-arrow)"
            />
            <path
              className="grs-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#grs-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="120"
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
              ANNUAL MAINT SAVINGS
            </text>
            <text
              className="grs-viz-output-value"
              x="696"
              y="122"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $5,475
            </text>
            <text
              x="696"
              y="148"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /yr · oil · filters · wear
            </text>

            <rect
              x="680"
              y="184"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="210"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY EQUIVALENT
            </text>
            <text
              className="grs-viz-mo-value"
              x="696"
              y="238"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $456/mo
            </text>

            <rect
              x="680"
              y="272"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURS SAVED
            </text>
            <text
              className="grs-viz-hrs-out"
              x="696"
              y="326"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6.0 h/day
            </text>

            <rect
              x="680"
              y="360"
              width="244"
              height="48"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="grs-viz-life-value"
              x="802"
              y="390"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              LIFE +96.7 yr @ 5k h rating
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
              className="grs-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              min(1, 29.6 / 21) × 6 h × $2.50 × 365 → $5,475/yr
            </text>
          </g>

          <path
            className="grs-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#grs-viz-pulse)"
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
            daytime PV + overnight battery displace engine hours
          </text>
          <text
            className="grs-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            −2,190 eng-h / yr
          </text>
        </svg>
      </div>
    </section>
  );
}
