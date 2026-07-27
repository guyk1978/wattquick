"use client";

import { cn } from "@/lib/utils";

interface HeatLossInsulationVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Building Heat Loss & Insulation [VIZ].
 * Q (BTU/hr) = (Area × ΔT) ÷ R.
 * Sample: 2,000 sq ft · 40 °F · R-20 → 4,000 BTU/hr · ~1.17 kW.
 */
export function HeatLossInsulationViz({
  className,
}: HeatLossInsulationVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--heat-loss-insulation", className)}
      aria-label="Building heat loss and insulation visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">
          Building Heat Loss &amp; Insulation
        </h3>
        <p className="tool-viz__subtitle">
          Envelope area and indoor–outdoor ΔT drive conduction. Raising R-value
          increases thermal resistance so fewer BTUs leak through the wall each
          hour.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg heat-loss-insulation-viz"
          role="img"
          aria-labelledby="hli-viz-title hli-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="hli-viz-title">
            Building heat loss and insulation animated flow diagram
          </title>
          <desc id="hli-viz-desc">
            Envelope area and temperature difference push heat across a wall.
            R-value resists that flow. Heat loss equals area times delta T
            divided by R. Sample: 2000 square feet, 40 degrees Fahrenheit
            difference, and R-20 yield 4000 BTU per hour, about 1172 watts or
            1.17 kilowatts of steady loss.
          </desc>

          <defs>
            <pattern
              id="hli-viz-grid"
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
              id="hli-viz-arrow"
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
              id="hli-viz-pulse"
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
              id="hli-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="hli-viz-heat"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#hli-viz-grid)"
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
            CONDUCTION PATH
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

          {/* —— INPUT: Area —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="100"
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
              ENVELOPE AREA
            </text>
            <text
              x="56"
              y="134"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,000 sq ft
            </text>
            <text
              x="56"
              y="158"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              wall / roof segment
            </text>
          </g>

          {/* —— INPUT: ΔT —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="100"
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
              ΔT (INDOOR − OUT)
            </text>
            <text
              x="56"
              y="250"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40 °F
            </text>
            <text
              x="56"
              y="274"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              design temperature gap
            </text>
          </g>

          {/* —— INPUT: R-value —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="330"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WALL R-VALUE
            </text>
            <text
              x="56"
              y="366"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              R-20
            </text>
            <text
              x="56"
              y="390"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              thermal resistance
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            d="M 270 122 L 320 122"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hli-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#hli-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hli-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="url(#hli-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hli-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 354 L 295 354 L 295 280 L 320 280"
            fill="none"
            stroke="url(#hli-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— MID: Product A×ΔT —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="280"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DRIVING FORCE
            </text>
            <text
              x="346"
              y="128"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Area × ΔT
            </text>
            <text
              x="346"
              y="162"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="hli-viz-drive-value"
            >
              80,000
            </text>
            <text
              x="470"
              y="162"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              sq ft·°F
            </text>
          </g>

          {/* —— MID: Wall section / conduction —— */}
          <g>
            <rect
              x="330"
              y="200"
              width="280"
              height="210"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="226"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENVELOPE BARRIER
            </text>

            {/* Indoor warm side */}
            <text
              x="360"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              IN 70°F
            </text>
            {/* Wall layers */}
            <g transform="translate(360, 272)">
              <rect
                x="0"
                y="0"
                width="28"
                height="88"
                fill="#0a0a0a"
                stroke="#444444"
                strokeWidth="1"
              />
              <rect
                className="hli-viz-insulation"
                x="28"
                y="0"
                width="64"
                height="88"
                fill="url(#hli-viz-heat)"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Insulation hatch */}
              <path
                d="M 32 8 L 88 64 M 32 28 L 72 68 M 32 48 L 56 72 M 48 8 L 88 48 M 68 8 L 88 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.55"
              />
              <rect
                x="92"
                y="0"
                width="28"
                height="88"
                fill="#0a0a0a"
                stroke="#444444"
                strokeWidth="1"
              />
              {/* Heat flow arrows through wall */}
              <path
                className="tool-viz-flow__pulse"
                d="M -16 44 L 0 44"
                fill="none"
                stroke="url(#hli-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#hli-viz-arrow)"
              />
              <path
                className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
                d="M 120 44 L 148 44"
                fill="none"
                stroke="url(#hli-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#hli-viz-arrow)"
              />
            </g>
            <text
              x="520"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              OUT 30°F
            </text>

            <text
              x="346"
              y="390"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ÷ R-20 slows conduction
            </text>
            <rect
              x="500"
              y="372"
              width="90"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="hli-viz-r-bar"
              x="502"
              y="374"
              width="70"
              height="6"
              rx="1"
              fill="url(#hli-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 610 127 L 680 127"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hli-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 610 127 L 680 127"
            fill="none"
            stroke="url(#hli-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 610 305 L 645 305 L 645 220 L 680 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hli-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 610 305 L 645 305 L 645 220 L 680 220"
            fill="none"
            stroke="url(#hli-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="352"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HEAT LOSS RATE
            </text>
            <text
              x="706"
              y="152"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="hli-viz-output-value"
            >
              4,000
            </text>
            <text
              x="706"
              y="182"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              BTU/hr
            </text>

            <rect
              x="706"
              y="204"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="hli-viz-output-bar"
              x="708"
              y="206"
              width="160"
              height="8"
              rx="1"
              fill="url(#hli-viz-bar)"
            />

            <text
              x="706"
              y="252"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRIC EQUIVALENT
            </text>
            <text
              x="706"
              y="286"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="hli-viz-kw-value"
            >
              1.17 kW
            </text>
            <text
              x="706"
              y="312"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,172 W steady
            </text>

            <text
              x="706"
              y="352"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              (A × ΔT) ÷ R = Q
            </text>
            <text
              x="706"
              y="376"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              80,000 ÷ 20 = 4,000
            </text>
            <text
              x="706"
              y="400"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              raise R to cut BTU/hr
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
              (Area × ΔT) ÷ R → BTU/hr · W · kW
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
              2,000 sq ft · 40 °F · R-20 → 4,000 BTU/hr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
