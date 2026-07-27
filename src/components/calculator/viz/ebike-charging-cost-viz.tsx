"use client";

import { cn } from "@/lib/utils";

interface EbikeChargingCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Full Charge Cost [VIZ] tab.
 * Battery Wh → kWh × utility rate → cost per full charge.
 */
export function EbikeChargingCostViz({ className }: EbikeChargingCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-charging-cost", className)}
      aria-label="E-bike full charge cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Full Charge Cost</h3>
        <p className="tool-viz__subtitle">
          Pack energy converts to kilowatt-hours, then multiplies by your local
          electricity rate for the cost of one full charge.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-charging-cost-viz"
          role="img"
          aria-labelledby="ebike-cost-viz-title ebike-cost-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebike-cost-viz-title">
            E-bike full charge cost animated flow diagram
          </title>
          <desc id="ebike-cost-viz-desc">
            Battery capacity in watt-hours converts to kilowatt-hours and
            multiplies by the electricity rate in dollars per kilowatt-hour to
            produce the total cost of a full charge.
          </desc>

          <defs>
            <pattern
              id="ebike-cost-viz-grid"
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
              id="ebike-cost-viz-arrow"
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
              id="ebike-cost-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebike-cost-viz-grid)"
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
            rx="2"
          />

          {/* Column labels */}
          <text
            x="48"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            INPUTS
          </text>
          <text
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            CONVERSION
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>

          {/* —— INPUT: Battery Wh —— */}
          <g className="ebike-cost-viz-node">
            <rect
              x="40"
              y="88"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="116"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY CAPACITY
            </text>

            <g transform="translate(56, 136)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="32" height="48" rx="2" strokeWidth="1.3" />
              <rect
                x="8"
                y="3"
                width="16"
                height="6"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="ebike-viz-battery-fill"
                x="4"
                y="24"
                width="24"
                height="28"
                rx="1"
                fill="currentColor"
                fillOpacity="0.88"
                stroke="none"
              />
            </g>

            <text
              x="106"
              y="162"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 Wh
            </text>
            <text
              x="106"
              y="188"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack nameplate energy
            </text>
            <text
              x="106"
              y="210"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ÷ 1000 → kilowatt-hours
            </text>
          </g>

          {/* —— INPUT: Electricity rate —— */}
          <g className="ebike-cost-viz-node">
            <rect
              x="40"
              y="268"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRICITY RATE
            </text>

            {/* Plug / meter glyph */}
            <g
              transform="translate(56, 318)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <rect x="4" y="10" width="28" height="36" rx="2" />
              <path d="M12 10 V2 M24 10 V2" />
              <circle
                className="ebike-cost-viz-meter-dot"
                cx="18"
                cy="28"
                r="4"
                fill="currentColor"
                fillOpacity="0.45"
              />
            </g>

            <text
              x="106"
              y="348"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14
            </text>
            <text
              x="106"
              y="374"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              per kWh · home utility
            </text>
            <text
              x="106"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              check your bill rate
            </text>
          </g>

          {/* Flow: inputs → conversion */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path d="M 280 162 H 340 V 200 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ebike-cost-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 162 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 342 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: conversion / multiply —— */}
          <g className="ebike-cost-viz-node ebike-cost-viz-node--process">
            <rect
              x="360"
              y="88"
              width="260"
              height="328"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="118"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY × RATE
            </text>

            {/* Step 1: Wh → kWh */}
            <rect
              x="376"
              y="138"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="160"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              1. CONVERT TO kWh
            </text>
            <text
              x="388"
              y="186"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              500 Wh ÷ 1000
            </text>
            <text
              x="580"
              y="186"
              textAnchor="end"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.50 kWh
            </text>

            {/* Multiply glyph */}
            <g transform="translate(470, 224)">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeOpacity="0.55"
              />
              <text
                className="ebike-cost-viz-multiply"
                x="20"
                y="26"
                textAnchor="middle"
                fill="#ededed"
                fontSize="20"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ×
              </text>
            </g>

            {/* Step 2: rate */}
            <rect
              x="376"
              y="274"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              2. APPLY UTILITY RATE
            </text>
            <text
              x="388"
              y="322"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              0.50 × $0.14
            </text>
            <text
              x="580"
              y="322"
              textAnchor="end"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $/kWh
            </text>

            <text
              x="376"
              y="380"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              grid energy drawn × price per unit
            </text>
            <text
              x="376"
              y="398"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              charger losses not included
            </text>
          </g>

          {/* Process → output */}
          <path
            d="M 620 252 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebike-cost-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 620 252 H 700"
            fill="none"
            stroke="url(#ebike-cost-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
          />

          {/* —— OUTPUT —— */}
          <g className="ebike-cost-viz-node ebike-cost-viz-node--output">
            <rect
              x="700"
              y="88"
              width="220"
              height="328"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeOpacity="0.65"
            />
            <text
              x="810"
              y="120"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.12em"
            >
              FULL CHARGE COST
            </text>

            {/* Coin / dollar glyph */}
            <g
              transform="translate(786, 140)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="24" cy="24" r="22" />
              <text
                x="24"
                y="30"
                textAnchor="middle"
                fill="#ededed"
                stroke="none"
                fontSize="20"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $
              </text>
            </g>

            <text
              className="ebike-viz-output-value"
              x="810"
              y="240"
              textAnchor="middle"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.07
            </text>
            <text
              x="810"
              y="268"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              per full charge
            </text>

            <line
              x1="724"
              y1="288"
              x2="896"
              y2="288"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="810"
              y="318"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY USED
            </text>
            <text
              x="810"
              y="346"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              0.50 kWh
            </text>
            <text
              x="810"
              y="374"
              textAnchor="middle"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              500 Wh from the wall
            </text>
          </g>

          {/* Footnote */}
          <rect
            x="40"
            y="460"
            width="880"
            height="72"
            rx="4"
            fill="#0f0f0f"
            stroke="#262626"
            strokeWidth="1"
          />
          <text
            x="56"
            y="488"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.08em"
          >
            FLOW
          </text>
          <text
            x="56"
            y="512"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            Cost ($) = (Wh ÷ 1000) × rate $/kWh · actual bills may include
            charger / tier losses
          </text>
        </svg>
      </div>
    </section>
  );
}
