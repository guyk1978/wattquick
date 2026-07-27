"use client";

import { cn } from "@/lib/utils";

interface RvSolarCalculatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for RV Solar & House Battery [VIZ] tab.
 * Yield Wh = panel W × sun h × η%; balance vs daily load → surplus / bank Ah.
 * Sample: 400 W · 5 h · 80% · 1,500 Wh load · 12 V → 1,600 Wh/day · +100 Wh.
 */
export function RvSolarCalculatorViz({ className }: RvSolarCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--rv-solar-calculator", className)}
      aria-label="RV solar and house battery visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">RV Solar & House Battery</h3>
        <p className="tool-viz__subtitle">
          Rooftop array yield balances against daily 12 V / 24 V house loads —
          surplus tops the bank; shortfall shows Ah headroom you still need.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg rv-solar-calculator-viz"
          role="img"
          aria-labelledby="rvs-viz-title rvs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="rvs-viz-title">
            RV solar and house battery animated flow diagram
          </title>
          <desc id="rvs-viz-desc">
            Panel watts multiplied by peak sun hours and system efficiency
            produce daily solar yield, which is balanced against daily house
            load. Sample: 400 watts times 5 peak sun hours at 80 percent
            efficiency yields 1600 watt-hours per day against a 1500 watt-hour
            load on a 12 volt bank — 100 watt-hours surplus, load covered.
          </desc>

          <defs>
            <pattern
              id="rvs-viz-grid"
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
              id="rvs-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="rvs-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="rvs-viz-sun"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="rvs-viz-energy"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="rvs-viz-bank"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#rvs-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            ENERGY BALANCE
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

          {/* —— INPUT: Panels —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="130"
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
              PANEL WATTS
            </text>
            <text
              x="56"
              y="136"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              400 W
            </text>
            {/* Mini roof array glyph */}
            <g transform="translate(56, 152)">
              <rect
                className="rvs-viz-panel"
                x="0"
                y="0"
                width="52"
                height="28"
                rx="2"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.25"
              />
              <line x1="17" y1="0" x2="17" y2="28" stroke="#333333" strokeWidth="1" />
              <line x1="35" y1="0" x2="35" y2="28" stroke="#333333" strokeWidth="1" />
              <line x1="0" y1="14" x2="52" y2="14" stroke="#333333" strokeWidth="1" />
              <text
                x="64"
                y="18"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                rooftop array
              </text>
            </g>
          </g>

          {/* —— INPUT: Sun hours —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK SUN HOURS
            </text>
            <text
              x="56"
              y="286"
              fill="#a3e635"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5.0 hrs
            </text>
            <circle
              className="rvs-viz-sun"
              cx="210"
              cy="278"
              r="14"
              fill="url(#rvs-viz-sun)"
              stroke="#a3e635"
              strokeWidth="1"
            />
          </g>

          {/* —— INPUT: Load —— */}
          <g>
            <rect
              x="40"
              y="338"
              width="230"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY LOAD · η · V
            </text>
            <text
              x="56"
              y="396"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,500 Wh · 80% · 12 V
            </text>
          </g>

          {/* —— Flow: inputs → balance —— */}
          <path
            d="M 270 137 L 320 137"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rvs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 137 L 320 137"
            fill="none"
            stroke="url(#rvs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 270 L 300 270 L 300 175 L 320 175"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rvs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 270 L 300 270 L 300 175 L 320 175"
            fill="none"
            stroke="url(#rvs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 383 L 300 383 L 300 300 L 320 300"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rvs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 383 L 300 383 L 300 300 L 320 300"
            fill="none"
            stroke="url(#rvs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Yield —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="150"
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
              DAILY YIELD
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              W × hrs × η
            </text>
            <text
              x="346"
              y="164"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="rvs-viz-yield-value"
            >
              1,600 Wh
            </text>
            <text
              x="346"
              y="192"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              400 × 5 × 0.80 = 1.6 kWh/day
            </text>
          </g>

          {/* —— FLOW: Balance bars —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="300"
              height="188"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              YIELD vs LOAD
            </text>

            <text
              x="346"
              y="298"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              solar in
            </text>
            <rect
              x="346"
              y="308"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="rvs-viz-yield-bar"
              x="348"
              y="310"
              width="210"
              height="8"
              rx="1"
              fill="url(#rvs-viz-energy)"
            />

            <text
              x="346"
              y="350"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              house out
            </text>
            <rect
              x="346"
              y="360"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="rvs-viz-load-bar"
              x="348"
              y="362"
              width="196"
              height="8"
              rx="1"
              fill="#555555"
            />

            {/* House battery glyph */}
            <g transform="translate(346, 390)">
              <rect
                x="0"
                y="0"
                width="48"
                height="28"
                rx="2"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <rect x="48" y="8" width="5" height="12" rx="1" fill="#a3e635" />
              <rect
                className="rvs-viz-bank-fill"
                x="4"
                y="4"
                width="36"
                height="20"
                rx="1"
                fill="url(#rvs-viz-bank)"
              />
              <text
                x="64"
                y="18"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                12 V house bank
              </text>
            </g>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rvs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 147 L 680 147"
            fill="none"
            stroke="url(#rvs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#rvs-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="url(#rvs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
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
              DAILY SOLAR YIELD
            </text>
            <text
              x="706"
              y="152"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="rvs-viz-output-value"
            >
              1,600
            </text>
            <text
              x="706"
              y="182"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              Wh/day
            </text>
            <text
              x="706"
              y="210"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 1.6 kWh/day
            </text>

            <rect
              x="706"
              y="228"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="rvs-viz-output-bar"
              x="708"
              y="230"
              width="176"
              height="8"
              rx="1"
              fill="url(#rvs-viz-energy)"
            />

            <text
              x="706"
              y="280"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AUTONOMY STATUS
            </text>
            <text
              x="706"
              y="318"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="rvs-viz-output-value"
            >
              COVERED
            </text>
            <text
              x="706"
              y="348"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              +100 Wh surplus
            </text>
            <text
              x="706"
              y="378"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              bank Ah needed: 0
            </text>
            <text
              x="706"
              y="404"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              load 1,500 Wh ≤ yield
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
              W × sun h × η → Wh/day − load → surplus / Ah shortfall
            </text>
            <text
              x="520"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="520"
              y="52"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              400 W · 5 h · 80% → 1,600 Wh · COVERED
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
