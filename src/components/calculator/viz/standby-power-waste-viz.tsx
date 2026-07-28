"use client";

import { cn } from "@/lib/utils";

interface StandbyPowerWasteVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Standby Power Waste [VIZ].
 * annualKwh = (W × count × 24 × 365) / 1000; cost = kWh × $/kWh.
 * Sample: 5 W · 12 devices · $0.14/kWh → 60 W · 526 kWh/yr · $73.58/yr.
 */
export function StandbyPowerWasteViz({ className }: StandbyPowerWasteVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--standby-power-waste", className)}
      aria-label="Standby power waste visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Phantom Load · Annual Waste</h3>
        <p className="tool-viz__subtitle">
          Idle watts across every always-plugged device run 8,760 hours a year —
          stacking into kilowatt-hours and a quiet standby bill.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg standby-power-waste-viz"
          role="img"
          aria-labelledby="spw-viz-title spw-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="spw-viz-title">
            Standby power waste phantom load annual cost diagram
          </title>
          <desc id="spw-viz-desc">
            Standby watts per device times device count times twenty-four hours
            times three hundred sixty-five days yields annual kilowatt-hours,
            then multiplied by electricity rate for yearly cost. Sample: twelve
            devices at five watts each and fourteen cents per kilowatt-hour
            total sixty watts standby, five hundred twenty-six kilowatt-hours
            per year, and seventy-three dollars fifty-eight cents annually.
          </desc>

          <defs>
            <pattern
              id="spw-viz-grid"
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
              id="spw-viz-arrow"
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
              id="spw-viz-pulse"
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
              id="spw-viz-drain"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="spw-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="spw-viz-cost"
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
            fill="url(#spw-viz-grid)"
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

          {/* —— INPUT: Standby per device —— */}
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
              STANDBY / DEVICE
            </text>
            <text
              className="spw-viz-w-value"
              x="56"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 W
            </text>
            <text
              x="130"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              idle draw
            </text>
          </g>

          {/* —— INPUT: Device count —— */}
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
              DEVICE COUNT
            </text>
            <text
              className="spw-viz-n-value"
              x="276"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12
            </text>
            <text
              x="330"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              always plugged
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
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
              ELECTRICITY RATE
            </text>
            <text
              className="spw-viz-rate-value"
              x="496"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14
            </text>
            <text
              x="600"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              /kWh
            </text>
          </g>

          {/* Flow: inputs → aggregation */}
          <path
            d="M 140 140 L 140 168 L 480 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 140 140 L 140 168 L 480 168"
            fill="none"
            stroke="url(#spw-viz-pulse)"
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
            stroke="url(#spw-viz-pulse)"
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
            stroke="url(#spw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— CENTER: Device wall + 24/7/365 path —— */}
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
              PHANTOM AGGREGATION · 24 × 365 = 8,760 H
            </text>

            {/* Device strip line art */}
            <g className="spw-viz-devices" transform="translate(56, 240)">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i} transform={`translate(${i * 48}, 0)`}>
                  <rect
                    x="0"
                    y="0"
                    width="36"
                    height="48"
                    rx="2"
                    fill="none"
                    stroke="#444444"
                    strokeWidth="1.5"
                  />
                  <circle
                    className="spw-viz-led"
                    cx="18"
                    cy="14"
                    r="3.5"
                    fill="currentColor"
                  />
                  <line
                    x1="8"
                    y1="28"
                    x2="28"
                    y2="28"
                    stroke="#333333"
                    strokeWidth="1.25"
                  />
                  <line
                    x1="8"
                    y1="36"
                    x2="28"
                    y2="36"
                    stroke="#333333"
                    strokeWidth="1.25"
                  />
                </g>
              ))}
              <text
                x="144"
                y="68"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                ×12 devices · 5 W each
              </text>
            </g>

            {/* Continuous drain arrows */}
            <g className="spw-viz-leak" transform="translate(56, 322)">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M ${18 + i * 48} 0 L ${18 + i * 48} 18`}
                  fill="none"
                  stroke="url(#spw-viz-drain)"
                  strokeWidth="1.75"
                  markerEnd="url(#spw-viz-arrow)"
                />
              ))}
            </g>

            {/* Total W + formula */}
            <g transform="translate(360, 248)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                TOTAL STANDBY
              </text>
              <text
                className="spw-viz-total-w"
                x="0"
                y="36"
                fill="#ededed"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                60 W
              </text>
              <text
                x="0"
                y="58"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                5 × 12 continuous
              </text>

              <rect
                x="0"
                y="78"
                width="260"
                height="36"
                rx="3"
                fill="#0a0a0a"
                stroke="#2a2a2a"
              />
              <text
                className="spw-viz-math-value"
                x="130"
                y="101"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                (60 × 24 × 365) ÷ 1,000
              </text>
            </g>

            {/* Year clock glyph */}
            <g className="spw-viz-clock" transform="translate(560, 248)">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <circle cx="40" cy="40" r="3" fill="currentColor" />
              <line
                className="spw-viz-hand"
                x1="40"
                y1="40"
                x2="40"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="40"
                y1="40"
                x2="58"
                y2="48"
                stroke="#888888"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x="40"
                y="96"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                24/7/365
              </text>
            </g>
          </g>

          {/* Flow: center → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#spw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 330 L 690 330 L 690 310 L 700 310"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#spw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 330 L 690 330 L 690 310 L 700 310"
            fill="none"
            stroke="url(#spw-viz-pulse)"
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
              ANNUAL STANDBY COST
            </text>
            <text
              className="spw-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $73.58
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              526 kWh × $0.14/kWh
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
              className="spw-viz-cost-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#spw-viz-cost)"
            />
            <text
              className="spw-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $6.13 / month
            </text>
          </g>

          {/* —— OUTPUT: Energy waste —— */}
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
              ENERGY WASTE
            </text>
            <text
              className="spw-viz-kwh-out"
              x="716"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              526 kWh
            </text>
            <rect
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="spw-viz-kwh-bar"
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="url(#spw-viz-bar)"
            />
            <text
              className="spw-viz-detail-value"
              x="716"
              y="378"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              / year · never switched off
            </text>
          </g>

          {/* —— Footer: year accumulation —— */}
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
              YEARLY ACCUMULATION AT A GLANCE
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
              className="spw-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="spw-viz-tick"
              cx="280"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="spw-viz-tick"
              cx="520"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="spw-viz-tick spw-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="spw-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#spw-viz-pulse)"
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
              day 1 · 60 W idle
            </text>
            <text
              x="280"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Q1 · ~131 kWh
            </text>
            <text
              x="520"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              mid-year · ~263 kWh
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              yr end · 526 kWh · $73.58
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
