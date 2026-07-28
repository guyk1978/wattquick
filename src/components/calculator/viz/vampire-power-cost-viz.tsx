"use client";

import { cn } from "@/lib/utils";

interface VampirePowerCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Vampire Power Cost [VIZ].
 * Annual kWh = (W × qty × 24 × 365) ÷ 1000; cost = kWh × $/kWh.
 * Sample: 10 devices · 5 W · $0.14/kWh → 50 W · 438 kWh/yr · $61.32/yr · $5.11/mo.
 */
export function VampirePowerCostViz({ className }: VampirePowerCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--vampire-power-cost", className)}
      aria-label="Vampire power cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Vampire / Standby Power Cost</h3>
        <p className="tool-viz__subtitle">
          Idle plugs keep drawing watts 24/7 — quantity times standby draw
          stacks into yearly kilowatt-hours and a quiet phantom bill.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg vampire-power-cost-viz"
          role="img"
          aria-labelledby="vpc-viz-title vpc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="vpc-viz-title">
            Vampire power cost animated flow diagram
          </title>
          <desc id="vpc-viz-desc">
            Standby devices, wattage per device, quantity, and electricity rate
            determine annual wasted kilowatt-hours and cost. Sample: ten devices
            at 5 watts each and 14 cents per kilowatt-hour total 50 watts
            standby, 438 kilowatt-hours per year, 61 dollars and 32 cents
            annually, or about 5 dollars and 11 cents per month.
          </desc>

          <defs>
            <pattern
              id="vpc-viz-grid"
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
              id="vpc-viz-arrow"
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
              id="vpc-viz-pulse"
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
              id="vpc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="vpc-viz-leak"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#vpc-viz-grid)"
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

          {/* —— INPUT: Devices / types —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="120"
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
              STANDBY DEVICES
            </text>
            <text
              className="vpc-viz-qty-value"
              x="56"
              y="104"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 × qty
            </text>
            <text
              x="56"
              y="128"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              TVs · chargers · boxes
            </text>
            <text
              x="56"
              y="146"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              mixed device types
            </text>
          </g>

          {/* —— INPUT: Standby W —— */}
          <g>
            <rect
              x="40"
              y="176"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="202"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              STANDBY WATTAGE
            </text>
            <text
              className="vpc-viz-w-value"
              x="56"
              y="238"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 W each
            </text>
            <text
              x="56"
              y="260"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              phantom idle draw
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
          <g>
            <rect
              x="40"
              y="292"
              width="220"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="318"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRICITY RATE
            </text>
            <text
              className="vpc-viz-rate-value"
              x="56"
              y="354"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="378"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 24 h × 365 d
            </text>
          </g>

          {/* Flow → cumulative path */}
          <path
            d="M 260 100 L 310 100"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 100 L 310 100"
            fill="none"
            stroke="url(#vpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 226 L 290 226 L 290 160 L 310 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 226 L 290 226 L 290 160 L 310 160"
            fill="none"
            stroke="url(#vpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 347 L 290 347 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 347 L 290 347 L 290 220 L 310 220"
            fill="none"
            stroke="url(#vpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Cumulative standby path —— */}
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
              CUMULATIVE STANDBY LOAD
            </text>

            {/* Device row icons */}
            <g className="vpc-viz-devices" transform="translate(348, 88)">
              {/* TV */}
              <g>
                <rect
                  x="0"
                  y="0"
                  width="48"
                  height="32"
                  rx="2"
                  fill="#0a0a0a"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <line
                  x1="16"
                  y1="36"
                  x2="32"
                  y2="36"
                  stroke="#555555"
                  strokeWidth="1.5"
                />
                <text
                  x="24"
                  y="56"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                >
                  TV
                </text>
              </g>
              {/* Charger */}
              <g transform="translate(64, 0)">
                <rect
                  x="8"
                  y="4"
                  width="28"
                  height="24"
                  rx="2"
                  fill="#0a0a0a"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <line
                  x1="22"
                  y1="28"
                  x2="22"
                  y2="40"
                  stroke="#555555"
                  strokeWidth="1.5"
                />
                <text
                  x="22"
                  y="56"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                >
                  CHG
                </text>
              </g>
              {/* Cable box */}
              <g transform="translate(128, 0)">
                <rect
                  x="0"
                  y="8"
                  width="48"
                  height="24"
                  rx="2"
                  fill="#0a0a0a"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <circle
                  className="vpc-viz-led"
                  cx="12"
                  cy="20"
                  r="3"
                  fill="currentColor"
                />
                <text
                  x="24"
                  y="56"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                >
                  BOX
                </text>
              </g>
              {/* Router */}
              <g transform="translate(192, 0)">
                <rect
                  x="4"
                  y="10"
                  width="40"
                  height="20"
                  rx="2"
                  fill="#0a0a0a"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <line
                  x1="14"
                  y1="6"
                  x2="14"
                  y2="10"
                  stroke="#555555"
                  strokeWidth="1"
                />
                <line
                  x1="34"
                  y1="6"
                  x2="34"
                  y2="10"
                  stroke="#555555"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="56"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                >
                  WIFI
                </text>
              </g>
            </g>

            {/* Leak arrows into bus */}
            <g className="vpc-viz-leak">
              <path
                d="M 372 152 L 372 180"
                fill="none"
                stroke="url(#vpc-viz-leak)"
                strokeWidth="1.5"
                markerEnd="url(#vpc-viz-arrow)"
              />
              <path
                d="M 434 152 L 434 180"
                fill="none"
                stroke="url(#vpc-viz-leak)"
                strokeWidth="1.5"
                markerEnd="url(#vpc-viz-arrow)"
              />
              <path
                d="M 496 152 L 496 180"
                fill="none"
                stroke="url(#vpc-viz-leak)"
                strokeWidth="1.5"
                markerEnd="url(#vpc-viz-arrow)"
              />
              <path
                d="M 558 152 L 558 180"
                fill="none"
                stroke="url(#vpc-viz-leak)"
                strokeWidth="1.5"
                markerEnd="url(#vpc-viz-arrow)"
              />
            </g>

            {/* Standby bus */}
            <rect
              x="348"
              y="188"
              width="284"
              height="52"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="210"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              TOTAL STANDBY
            </text>
            <text
              className="vpc-viz-total-w"
              x="364"
              y="230"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 × 5 W = 50 W always on
            </text>

            {/* Formula */}
            <rect
              x="348"
              y="256"
              width="284"
              height="68"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="280"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              ANNUAL kWh
            </text>
            <text
              className="vpc-viz-math-value"
              x="364"
              y="304"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              (50 × 24 × 365) ÷ 1000 = 438
            </text>

            {/* Year bar */}
            <text
              x="364"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              YEAR-LONG DRIP
            </text>
            <rect
              x="364"
              y="358"
              width="252"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="vpc-viz-year-bar"
              x="364"
              y="358"
              width="252"
              height="10"
              rx="2"
              fill="url(#vpc-viz-bar)"
            />
            <text
              className="vpc-viz-kwh-value"
              x="364"
              y="388"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              438 kWh / yr wasted
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 214 L 700 214"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vpc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 214 L 700 214"
            fill="none"
            stroke="url(#vpc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Annual —— */}
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
              ANNUAL COST
            </text>
            <text
              className="vpc-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $61.32
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              438 kWh × $0.14
            </text>
            <rect
              x="726"
              y="158"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="vpc-viz-cost-bar"
              x="726"
              y="158"
              width="162"
              height="12"
              rx="2"
              fill="url(#vpc-viz-bar)"
            />
            <text
              className="vpc-viz-detail-value"
              x="726"
              y="196"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /yr for nothing useful
            </text>
          </g>

          {/* —— OUTPUT: Monthly —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="166"
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
              MONTHLY COST
            </text>
            <text
              className="vpc-viz-month-value"
              x="726"
              y="308"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $5.11
            </text>
            <text
              x="726"
              y="334"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $61.32 ÷ 12
            </text>
            <rect
              x="726"
              y="352"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="vpc-viz-month-bar"
              x="726"
              y="352"
              width="100"
              height="10"
              rx="2"
              fill="url(#vpc-viz-bar)"
            />
            <text
              className="vpc-viz-detail-value"
              x="726"
              y="384"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              smart strips cut this
            </text>
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
              24/7 PHANTOM DRIP TIMELINE
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
              className="vpc-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="vpc-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="vpc-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="vpc-viz-tick vpc-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="vpc-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#vpc-viz-pulse)"
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
              plugged in · idle
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              50 W × 8,760 hours
            </text>
            <text
              className="vpc-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              yr end · 438 kWh · $61.32
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
