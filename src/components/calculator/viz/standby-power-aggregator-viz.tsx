"use client";

import { cn } from "@/lib/utils";

interface StandbyPowerAggregatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Standby Power Aggregator [VIZ].
 * Σ (W × qty) × 24 × 365 ÷ 1000 → kWh; × $/kWh → annual cost.
 * Sample: TV 25 W + console 20 W + 5×4 W chargers = 65 W → 569 kWh · $79.72/yr.
 */
export function StandbyPowerAggregatorViz({
  className,
}: StandbyPowerAggregatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--standby-power-aggregator", className)}
      aria-label="Standby power aggregator visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Device Rows · Vampire Sum</h3>
        <p className="tool-viz__subtitle">
          Every always-on row stacks into continuous watts — then 8,760 hours
          turn the phantom load into yearly kilowatt-hours and bill drag.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg standby-power-aggregator-viz"
          role="img"
          aria-labelledby="spagg-viz-title spagg-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="spagg-viz-title">
            Standby power aggregator multi-device vampire cost diagram
          </title>
          <desc id="spagg-viz-desc">
            Multiple standby devices with watts and quantities sum to total
            continuous load, then twenty-four hours times three hundred sixty-five
            days yields annual energy and cost. Sample: television at 25 watts,
            gaming console at 20 watts, and five chargers at 4 watts each total
            65 watts, about 569 kilowatt-hours and 79 dollars 72 cents per year
            at 14 cents per kilowatt-hour.
          </desc>

          <defs>
            <pattern
              id="spagg-viz-grid"
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
              id="spagg-viz-arrow"
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
              id="spagg-viz-pulse"
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
              id="spagg-viz-drain"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="spagg-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="spagg-viz-cost"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#spagg-viz-grid)"
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

          {/* —— INPUT: Device rows —— */}
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
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ROW · TELEVISION
            </text>
            <text
              className="spagg-viz-tv-value"
              x="56"
              y="100"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25 W × 1
            </text>
          </g>

          <g>
            <rect
              x="280"
              y="40"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="296"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ROW · CONSOLE
            </text>
            <text
              className="spagg-viz-con-value"
              x="296"
              y="100"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20 W × 1
            </text>
          </g>

          <g>
            <rect
              x="520"
              y="40"
              width="160"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="536"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ROW · CHARGERS
            </text>
            <text
              className="spagg-viz-chg-value"
              x="536"
              y="100"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4 W × 5
            </text>
          </g>

          {/* Flow → aggregate */}
          <path
            d="M 150 140 L 150 168 L 390 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spagg-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 150 140 L 150 168 L 390 168"
            fill="none"
            stroke="url(#spagg-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 390 140 L 390 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 390 140 L 390 168"
            fill="none"
            stroke="url(#spagg-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 600 140 L 600 168 L 390 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: Multi-device wall + sum —— */}
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
              DEVICE AGGREGATION · 24 × 365 = 8,760 H · $0.14/KWH
            </text>

            {/* Device icons row */}
            <g className="spagg-viz-devices" transform="translate(56, 236)">
              {/* TV */}
              <g transform="translate(0, 0)">
                <rect
                  x="0"
                  y="0"
                  width="56"
                  height="40"
                  rx="2"
                  fill="none"
                  stroke="#444444"
                  strokeWidth="1.5"
                />
                <circle
                  className="spagg-viz-led"
                  cx="28"
                  cy="20"
                  r="4"
                  fill="currentColor"
                />
                <text
                  x="28"
                  y="56"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                >
                  TV 25
                </text>
              </g>
              {/* Console */}
              <g transform="translate(80, 0)">
                <rect
                  x="0"
                  y="8"
                  width="56"
                  height="24"
                  rx="2"
                  fill="none"
                  stroke="#444444"
                  strokeWidth="1.5"
                />
                <circle
                  className="spagg-viz-led"
                  cx="14"
                  cy="20"
                  r="3"
                  fill="currentColor"
                />
                <circle
                  className="spagg-viz-led"
                  cx="42"
                  cy="20"
                  r="3"
                  fill="currentColor"
                />
                <text
                  x="28"
                  y="56"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                >
                  CON 20
                </text>
              </g>
              {/* Chargers ×5 */}
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(${176 + i * 36}, 0)`}>
                  <rect
                    x="0"
                    y="4"
                    width="28"
                    height="32"
                    rx="2"
                    fill="none"
                    stroke="#444444"
                    strokeWidth="1.25"
                  />
                  <circle
                    className="spagg-viz-led"
                    cx="14"
                    cy="14"
                    r="3"
                    fill="currentColor"
                  />
                  <line
                    x1="8"
                    y1="24"
                    x2="20"
                    y2="24"
                    stroke="#333333"
                    strokeWidth="1"
                  />
                </g>
              ))}
              <text
                x="266"
                y="56"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                5 × 4 W chargers
              </text>
            </g>

            {/* Drain arrows */}
            <g className="spagg-viz-leak" transform="translate(56, 308)">
              {[28, 108, 190, 226, 262, 298, 334].map((x) => (
                <path
                  key={x}
                  d={`M ${x} 0 L ${x} 16`}
                  fill="none"
                  stroke="url(#spagg-viz-drain)"
                  strokeWidth="1.5"
                  markerEnd="url(#spagg-viz-arrow)"
                />
              ))}
            </g>

            {/* Sum chip */}
            <g transform="translate(420, 248)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                CONTINUOUS SUM
              </text>
              <text
                className="spagg-viz-total-w"
                x="0"
                y="36"
                fill="#ededed"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                65 W
              </text>
              <text
                x="0"
                y="58"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                25 + 20 + 20
              </text>
              <rect
                x="0"
                y="72"
                width="200"
                height="40"
                rx="3"
                fill="#0a0a0a"
                stroke="#2a2a2a"
              />
              <text
                className="spagg-viz-math-value"
                x="100"
                y="97"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                (65 × 24 × 365) ÷ 1,000
              </text>
            </g>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spagg-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#spagg-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spagg-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#spagg-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Annual cost —— */}
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
              ANNUAL VAMPIRE COST
            </text>
            <text
              className="spagg-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $79.72
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              569 kWh × $0.14
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
              className="spagg-viz-cost-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#spagg-viz-cost)"
            />
            <text
              className="spagg-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $6.64 / month
            </text>
          </g>

          {/* —— OUTPUT: Energy + watts —— */}
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
              ENERGY · STANDBY W
            </text>
            <text
              className="spagg-viz-kwh-out"
              x="716"
              y="314"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              569 kWh/yr
            </text>
            <rect
              x="716"
              y="328"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="spagg-viz-kwh-bar"
              x="716"
              y="328"
              width="172"
              height="10"
              rx="2"
              fill="url(#spagg-viz-bar)"
            />
            <text
              className="spagg-viz-detail-value"
              x="716"
              y="368"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              65 W always on · 3 rows
            </text>
          </g>

          {/* —— Footer —— */}
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
              YEARLY BUILD-UP · TV + CONSOLE + 5 CHARGERS
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
              className="spagg-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="spagg-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="spagg-viz-tick"
              cx="560"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="spagg-viz-tick spagg-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="spagg-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#spagg-viz-pulse)"
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
              day · 65 W idle
            </text>
            <text
              x="320"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Q1 · ~142 kWh
            </text>
            <text
              x="560"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              mid-year · ~285 kWh
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              yr · 569 kWh · $79.72
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
