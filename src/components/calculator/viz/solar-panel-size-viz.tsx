"use client";

import { cn } from "@/lib/utils";

interface SolarPanelSizeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Panel Size [VIZ] tab.
 * Daily Wh ÷ (peak sun hrs × efficiency) → minimum array watts.
 * Sample: 2400 ÷ (5 × 0.80) = 600 W = 0.6 kW.
 */
export function SolarPanelSizeViz({ className }: SolarPanelSizeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-panel-size", className)}
      aria-label="Solar panel size visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Panel Size</h3>
        <p className="tool-viz__subtitle">
          Daily energy need divided by peak sun hours and system efficiency
          sets the minimum photovoltaic array wattage.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-panel-size-viz"
          role="img"
          aria-labelledby="sps-viz-title sps-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sps-viz-title">Solar panel size animated flow diagram</title>
          <desc id="sps-viz-desc">
            Daily energy need in watt-hours per day divided by peak sun hours
            and system efficiency yields minimum panel array size. Sample: 2400
            watt-hours per day with 5 peak sun hours at 80 percent efficiency
            requires 600 watts or 0.6 kilowatts.
          </desc>

          <defs>
            <pattern
              id="sps-viz-grid"
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
              id="sps-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="sps-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="sps-viz-sun"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#sps-viz-grid)"
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
            x="370"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            SUN → ARRAY
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

          {/* —— INPUT: Daily energy —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="240"
              height="118"
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
              DAILY ENERGY NEED
            </text>
            <g transform="translate(56, 112)" fill="none" stroke="#ededed">
              <rect x="0" y="6" width="28" height="36" rx="2" strokeWidth="1.3" />
              <path
                d="M18 10 L10 26 H16 L12 40 L24 20 H18 Z"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="sps-viz-bolt"
                fill="#a3e635"
                fillOpacity="0.35"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#a3e635"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2400 Wh
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              per day · loads + buffer
            </text>
          </g>

          {/* —— INPUT: Peak sun —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="240"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="232"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK SUN HOURS
            </text>
            <g
              transform="translate(56, 248)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle
                className="sps-viz-sun"
                cx="16"
                cy="22"
                r="12"
                fill="#a3e635"
                fillOpacity="0.25"
              />
              <path
                d="M16 4 V0 M16 40 V44 M4 22 H0 M32 22 H36 M6 12 L3 9 M26 12 L29 9 M6 32 L3 35 M26 32 L29 35"
                strokeLinecap="round"
                className="sps-viz-sun-rays"
              />
            </g>
            <text
              x="100"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 hrs
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              full-sun equivalent / day
            </text>
          </g>

          {/* —— INPUT: Efficiency —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="240"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="366"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM EFFICIENCY
            </text>
            <text
              x="56"
              y="410"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80%
            </text>
            <text
              x="140"
              y="410"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              inverter · wiring · dirt
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#sps-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#sps-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 131 H 330 V 180 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 265 H 330 V 230 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.7s" }}
              d="M 280 399 H 330 V 320 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="360"
              y="72"
              width="260"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              Wh ÷ (SUN × EFF)
            </text>

            {/* Sun → panel glyph */}
            <g transform="translate(400, 118)">
              <circle
                className="sps-viz-sun"
                cx="28"
                cy="24"
                r="14"
                fill="url(#sps-viz-sun)"
                stroke="#a3e635"
                strokeWidth="1.2"
              />
              <path
                className="sps-viz-sun-rays"
                d="M28 2 V-4 M28 46 V52 M6 24 H0 M50 24 H56 M10 10 L5 5 M46 10 L51 5 M10 38 L5 43 M46 38 L51 43"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 48 24 H 72"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 48 24 H 72"
                fill="none"
                stroke="url(#sps-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              {/* Panel array */}
              <g fill="none" stroke="#ededed" strokeWidth="1.2">
                <rect x="72" y="4" width="72" height="40" rx="2" />
                <line x1="96" y1="4" x2="96" y2="44" />
                <line x1="120" y1="4" x2="120" y2="44" />
                <line x1="72" y1="24" x2="144" y2="24" />
              </g>
              <rect
                className="sps-viz-panel-glow"
                x="74"
                y="6"
                width="68"
                height="36"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.12"
                stroke="none"
              />
            </g>

            <rect
              x="376"
              y="190"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="212"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · EFFECTIVE SUN
            </text>
            <text
              x="388"
              y="238"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              5 h × 0.80 ={" "}
              <tspan fill="#a3e635">4.0 h</tspan>
            </text>

            <rect
              x="376"
              y="268"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="290"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · ARRAY WATTS
            </text>
            <text
              x="388"
              y="316"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              2400 Wh ÷ 4.0 h
            </text>

            <text
              x="376"
              y="362"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ARRAY BUILD
            </text>
            <rect
              x="376"
              y="374"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="sps-viz-array-bar"
              x="378"
              y="376"
              width="224"
              height="12"
              rx="1"
              fill="url(#sps-viz-sun)"
            />

            <text
              x="490"
              y="420"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              W = Wh/day ÷ (sun × eff)
            </text>
            <text
              x="490"
              y="442"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              add 20–30% for cloudy days
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#sps-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#sps-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 265 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="250"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MIN. PANEL SIZE
            </text>

            <g
              transform="translate(762, 196)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <rect x="0" y="0" width="96" height="52" rx="2" />
              <line x1="32" y1="0" x2="32" y2="52" />
              <line x1="64" y1="0" x2="64" y2="52" />
              <line x1="0" y1="26" x2="96" y2="26" />
              <rect
                className="sps-viz-panel-glow"
                x="2"
                y="2"
                width="92"
                height="48"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.15"
                stroke="none"
              />
            </g>

            <text
              x="810"
              y="290"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="sps-viz-output-value"
            >
              600 W
            </text>
            <text
              x="810"
              y="318"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              = 0.6 kW
            </text>
            <text
              x="810"
              y="350"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              2400 Wh · 5 h · 80%
            </text>
            <text
              x="810"
              y="370"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              starting-point array size
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Panel W ≈ daily Wh ÷ (peak sun hours × efficiency) · typical PSH 3–6
            h by location
          </text>
        </svg>
      </div>
    </section>
  );
}
