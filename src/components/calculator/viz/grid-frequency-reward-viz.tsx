"use client";

import { cn } from "@/lib/utils";

interface GridFrequencyRewardVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Grid Frequency Response Reward [VIZ].
 * effectiveKw = kW × availability × (hrs/24); monthly $ = effectiveKw × $/kW-mo.
 * Sample: 5 kW · 18 h · 90% · $8/kW-mo → 3.38 kW · $27.00/mo · $324/yr.
 */
export function GridFrequencyRewardViz({
  className,
}: GridFrequencyRewardVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--grid-frequency-reward", className)}
      aria-label="Grid frequency response reward visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Frequency Response Reward</h3>
        <p className="tool-viz__subtitle">
          Committed kilowatts stand ready for Hz regulation — participation
          hours and availability scale capacity payments into monthly revenue.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg grid-frequency-reward-viz"
          role="img"
          aria-labelledby="gfr-viz-title gfr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="gfr-viz-title">
            Grid frequency response reward animated flow diagram
          </title>
          <desc id="gfr-viz-desc">
            Available grid-service capacity, participation hours, capacity
            reward rate, and availability determine monthly revenue. Sample: 5
            kilowatts at 18 hours per day with 90 percent availability and 8
            dollars per kilowatt-month yields 3.38 effective kilowatts and 27
            dollars monthly, or 324 dollars yearly.
          </desc>

          <defs>
            <pattern
              id="gfr-viz-grid"
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
              id="gfr-viz-arrow"
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
              id="gfr-viz-pulse"
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
              id="gfr-viz-bar"
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
            fill="url(#gfr-viz-grid)"
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

          {/* —— INPUT: Capacity —— */}
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
              GRID-SERVICE kW
            </text>
            <text
              className="gfr-viz-kw-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 kW
            </text>
            <text
              x="56"
              y="124"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              committed regulation capacity
            </text>
          </g>

          {/* —— INPUT: Hours —— */}
          <g>
            <rect
              x="40"
              y="156"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="182"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PARTICIPATION
            </text>
            <text
              className="gfr-viz-hrs-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              18 hrs/day
            </text>
            <text
              x="56"
              y="240"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hours factor 18÷24 = 0.75
            </text>
          </g>

          {/* —— INPUT: Rate + availability —— */}
          <g>
            <rect
              x="40"
              y="272"
              width="220"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATE · AVAILABILITY
            </text>
            <text
              className="gfr-viz-rate-value"
              x="56"
              y="334"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $8/kW-mo
            </text>
            <text
              className="gfr-viz-avail-value"
              x="56"
              y="362"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90% uptime
            </text>
            <text
              x="56"
              y="384"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              capacity compensation mode
            </text>
          </g>

          {/* Flow → frequency path */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#gfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="url(#gfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 337 L 290 337 L 290 210 L 310 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 337 L 290 337 L 290 210 L 310 210"
            fill="none"
            stroke="url(#gfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Frequency stabilization —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="362"
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
              FREQUENCY STABILIZATION PATH
            </text>

            {/* Hz waveform */}
            <g className="gfr-viz-wave" transform="translate(360, 96)">
              <line
                x1="0"
                y1="36"
                x2="260"
                y2="36"
                stroke="#333333"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <path
                className="gfr-viz-freq"
                d="M 0 36 Q 20 12 40 36 T 80 36 T 120 36 T 160 36 T 200 36 T 240 36 T 260 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="0"
                y="8"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                60 Hz target
              </text>
              <text
                x="200"
                y="68"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                FCR / FRR response
              </text>
            </g>

            {/* Battery / DER standby */}
            <g className="gfr-viz-der" transform="translate(380, 180)">
              <rect
                x="0"
                y="0"
                width="80"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="80"
                y="12"
                width="8"
                height="20"
                rx="1"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="40"
                y="27"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                5 kW
              </text>
              <text
                x="40"
                y="64"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                BESS / DER
              </text>
            </g>

            <path
              d="M 480 202 L 540 202"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#gfr-viz-arrow)"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 480 202 L 540 202"
              fill="none"
              stroke="url(#gfr-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g transform="translate(548, 180)">
              <rect
                x="0"
                y="0"
                width="88"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <text
                x="44"
                y="20"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                ISO / VPP
              </text>
              <text
                x="44"
                y="36"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                grid svc
              </text>
            </g>

            {/* Effective kW math */}
            <rect
              x="348"
              y="268"
              width="284"
              height="110"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="292"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              EFFECTIVE CAPACITY
            </text>
            <text
              className="gfr-viz-math-value"
              x="364"
              y="320"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 × 0.90 × 0.75 = 3.38 kW
            </text>
            <text
              className="gfr-viz-math-value"
              x="364"
              y="348"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.38 × $8 = $27.00 / mo
            </text>
            <text
              x="364"
              y="368"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              capacity ($/kW-month) mode
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 200 L 700 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#gfr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 200 L 700 200"
            fill="none"
            stroke="url(#gfr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Monthly —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="200"
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
              MONTHLY REVENUE
            </text>
            <text
              className="gfr-viz-output-value"
              x="726"
              y="118"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $27.00
            </text>
            <text
              x="726"
              y="146"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              capacity payout
            </text>
            <rect
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gfr-viz-rev-bar"
              x="726"
              y="166"
              width="120"
              height="12"
              rx="2"
              fill="url(#gfr-viz-bar)"
            />
            <text
              className="gfr-viz-detail-value"
              x="726"
              y="204"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              3.38 effective kW
            </text>
            <text
              x="726"
              y="224"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              gross · before wear
            </text>
          </g>

          {/* —— OUTPUT: Annual —— */}
          <g>
            <rect
              x="710"
              y="256"
              width="210"
              height="146"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL REVENUE
            </text>
            <text
              className="gfr-viz-year-value"
              x="726"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $324/yr
            </text>
            <text
              x="726"
              y="350"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $27 × 12 months
            </text>
            <rect
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="gfr-viz-year-bar"
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="url(#gfr-viz-bar)"
            />
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="428"
              width="880"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="454"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENROLLMENT → PAYOUT TIMELINE
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
              className="gfr-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="gfr-viz-tick"
              cx="280"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="gfr-viz-tick"
              cx="520"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="gfr-viz-tick gfr-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="gfr-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#gfr-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="502"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              enroll · commit kW
            </text>
            <text
              x="520"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              18 h standby · Hz calls
            </text>
            <text
              className="gfr-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              month end · $27.00
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
