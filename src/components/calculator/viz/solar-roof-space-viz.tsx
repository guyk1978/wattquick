"use client";

import { cn } from "@/lib/utils";

interface SolarRoofSpaceVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Roof Space [VIZ].
 * Max panels = floor((roof × usable%) ÷ footprint); kW = panels × W ÷ 1000.
 * Sample: 800 sq ft · 80% · 20 sq ft · 400 W → 32 panels · 12.8 kW.
 */
export function SolarRoofSpaceViz({ className }: SolarRoofSpaceVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-roof-space", className)}
      aria-label="Solar roof space visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Roof Space</h3>
        <p className="tool-viz__subtitle">
          Usable roof area divided by each panel&apos;s footprint yields how
          many modules fit — then rating watts scale that count into system kW.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-roof-space-viz"
          role="img"
          aria-labelledby="srs-viz-title srs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="srs-viz-title">
            Solar roof space animated layout diagram
          </title>
          <desc id="srs-viz-desc">
            Usable roof area divided by panel footprint yields maximum panel
            count and system kilowatts. Sample: 800 square feet at 80 percent
            usable with 20 square foot 400 watt panels fits 32 panels for 12.8
            kilowatts.
          </desc>

          <defs>
            <pattern
              id="srs-viz-grid"
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
              id="srs-viz-arrow"
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
              id="srs-viz-pulse"
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
              id="srs-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="srs-viz-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#srs-viz-grid)"
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
            x="340"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            AREA ÷ FOOTPRINT
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

          {/* —— INPUT: Roof area —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              USABLE ROOF AREA
            </text>
            <text
              className="srs-viz-area-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              800
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              sq ft · 80% usable
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              → 640 sq ft effective
            </text>
          </g>

          {/* —— INPUT: Panel footprint —— */}
          <g>
            <rect
              x="40"
              y="242"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PANEL FOOTPRINT
            </text>
            <text
              className="srs-viz-panel-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              sq ft · 400 W each
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~350–450 W modules
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#srs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#srs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#srs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#srs-viz-arrow)"
          />

          {/* —— CENTER: Roof layout —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="340"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ROOF LAYOUT
            </text>

            {/* Roof outline */}
            <rect
              className="srs-viz-roof"
              x="360"
              y="118"
              width="260"
              height="160"
              rx="2"
              fill="#0a0a0a"
              stroke="#444444"
              strokeWidth="1.5"
            />
            {/* Usable zone fill */}
            <rect
              className="srs-viz-usable"
              x="372"
              y="128"
              width="236"
              height="128"
              rx="1"
              fill="url(#srs-viz-fill)"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 3"
            />

            {/* Panel grid — 4×4 of 8 shown as tiles */}
            <g className="srs-viz-tiles" stroke="currentColor" strokeWidth="1">
              <rect x="384" y="140" width="48" height="24" fill="none" />
              <rect x="440" y="140" width="48" height="24" fill="none" />
              <rect x="496" y="140" width="48" height="24" fill="none" />
              <rect x="552" y="140" width="48" height="24" fill="none" />
              <rect x="384" y="172" width="48" height="24" fill="none" />
              <rect x="440" y="172" width="48" height="24" fill="none" />
              <rect x="496" y="172" width="48" height="24" fill="none" />
              <rect x="552" y="172" width="48" height="24" fill="none" />
              <rect x="384" y="204" width="48" height="24" fill="none" />
              <rect x="440" y="204" width="48" height="24" fill="none" />
              <rect x="496" y="204" width="48" height="24" fill="none" />
              <rect x="552" y="204" width="48" height="24" fill="none" />
              <rect x="384" y="236" width="48" height="24" fill="none" />
              <rect x="440" y="236" width="48" height="24" fill="none" />
              <rect x="496" y="236" width="48" height="24" fill="none" />
              <rect
                className="srs-viz-tile-active"
                x="552"
                y="236"
                width="48"
                height="24"
                fill="none"
                strokeWidth="1.5"
              />
            </g>

            <text
              x="490"
              y="300"
              textAnchor="middle"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              640 ÷ 20 = 32 modules
            </text>

            <text
              className="srs-viz-math-value"
              x="340"
              y="338"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              32 × 400 W = 12.8 kW
            </text>
            <rect
              x="340"
              y="352"
              width="280"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="srs-viz-scale-bar"
              x="342"
              y="354"
              width="230"
              height="6"
              rx="1"
              fill="url(#srs-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#srs-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#srs-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="720"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MAX SYSTEM SIZE
            </text>
            <text
              className="srs-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12.8
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              kW
            </text>

            <rect
              x="720"
              y="202"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="srs-viz-output-bar"
              x="722"
              y="204"
              width="150"
              height="8"
              rx="1"
              fill="url(#srs-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PANEL COUNT
            </text>
            <text
              className="srs-viz-count-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              32 panels
            </text>
            <text
              className="srs-viz-detail-value"
              x="720"
              y="310"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              640 of 800 sq ft
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              setbacks · vents
            </text>
          </g>

          {/* —— Legend —— */}
          <g transform="translate(40, 448)">
            <rect
              x="0"
              y="0"
              width="880"
              height="80"
              rx="4"
              fill="#0f0f0f"
              stroke="#262626"
              strokeWidth="1"
            />
            <text
              x="20"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PATH
            </text>
            <text
              x="20"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              panels = ⌊(area × %) ÷ footprint⌋
            </text>
            <text
              x="480"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="480"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              800 sq ft · 20 sq ft → 32 · 12.8 kW
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
