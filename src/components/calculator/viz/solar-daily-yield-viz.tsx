"use client";

import { cn } from "@/lib/utils";

interface SolarDailyYieldVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Daily Yield [VIZ] tab.
 * Panel W × peak sun hrs × efficiency → daily Wh.
 * Sample: 400 × 5 × 0.80 = 1,600 Wh/day = 1.6 kWh/day.
 */
export function SolarDailyYieldViz({ className }: SolarDailyYieldVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-daily-yield", className)}
      aria-label="Solar daily yield visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Daily Yield</h3>
        <p className="tool-viz__subtitle">
          Panel rating multiplied by peak sun hours and system efficiency
          estimates how much energy the array delivers each day.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-daily-yield-viz"
          role="img"
          aria-labelledby="sdy-viz-title sdy-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sdy-viz-title">Solar daily yield animated flow diagram</title>
          <desc id="sdy-viz-desc">
            Panel rating in watts multiplied by peak sun hours and system
            efficiency yields daily energy production. Sample: 400 watts times 5
            peak sun hours at 80 percent efficiency produces 1600 watt-hours or
            1.6 kilowatt-hours per day.
          </desc>

          <defs>
            <pattern
              id="sdy-viz-grid"
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
              id="sdy-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="sdy-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="sdy-viz-sun"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="sdy-viz-energy"
              x1="0%"
              y1="0%"
              x2="100%"
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
            fill="url(#sdy-viz-grid)"
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
            GENERATION
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

          {/* —— INPUT: Panel rating —— */}
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
              PANEL RATING
            </text>
            <g
              transform="translate(56, 112)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            >
              <rect x="0" y="4" width="36" height="28" rx="2" />
              <line x1="12" y1="4" x2="12" y2="32" />
              <line x1="24" y1="4" x2="24" y2="32" />
              <line x1="0" y1="18" x2="36" y2="18" />
              <rect
                className="sdy-viz-panel-glow"
                x="2"
                y="6"
                width="32"
                height="24"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.15"
                stroke="none"
              />
            </g>
            <text
              x="108"
              y="142"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              400 W
            </text>
            <text
              x="108"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              STC nameplate
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
                className="sdy-viz-sun"
                cx="16"
                cy="22"
                r="12"
                fill="#a3e635"
                fillOpacity="0.25"
              />
              <path
                className="sdy-viz-sun-rays"
                d="M16 4 V0 M16 40 V44 M4 22 H0 M32 22 H36 M6 12 L3 9 M26 12 L29 9 M6 32 L3 35 M26 32 L29 35"
                strokeLinecap="round"
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
              temp · inverter · dirt
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#sdy-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#sdy-viz-pulse)"
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
              W × SUN × EFF
            </text>

            {/* Sun hitting panel */}
            <g transform="translate(400, 118)">
              <circle
                className="sdy-viz-sun"
                cx="28"
                cy="24"
                r="14"
                fill="url(#sdy-viz-sun)"
                stroke="#a3e635"
                strokeWidth="1.2"
              />
              <path
                className="sdy-viz-sun-rays"
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
                stroke="url(#sdy-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              <g fill="none" stroke="#ededed" strokeWidth="1.2">
                <rect x="72" y="4" width="72" height="40" rx="2" />
                <line x1="96" y1="4" x2="96" y2="44" />
                <line x1="120" y1="4" x2="120" y2="44" />
                <line x1="72" y1="24" x2="144" y2="24" />
              </g>
              <rect
                className="sdy-viz-panel-glow"
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
              height="56"
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
              STEP 1 · IDEAL ENERGY
            </text>
            <text
              x="388"
              y="234"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              400 W × 5 h ={" "}
              <tspan fill="#a3e635">2,000 Wh</tspan>
            </text>

            <rect
              x="376"
              y="260"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="282"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · APPLY LOSSES
            </text>
            <text
              x="388"
              y="304"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              2,000 × 0.80
            </text>

            <text
              x="376"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DAILY YIELD FILL
            </text>
            <rect
              x="376"
              y="360"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="sdy-viz-yield-bar"
              x="378"
              y="362"
              width="224"
              height="12"
              rx="1"
              fill="url(#sdy-viz-energy)"
            />

            <text
              x="490"
              y="408"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              Wh/day = W × sun × (eff/100)
            </text>
            <text
              x="490"
              y="432"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              after inverter &amp; real-world loss
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#sdy-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#sdy-viz-pulse)"
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
              DAILY ENERGY YIELD
            </text>

            <text
              x="810"
              y="230"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="sdy-viz-output-value"
            >
              1,600 Wh
            </text>
            <text
              x="810"
              y="258"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              / day
            </text>
            <text
              x="810"
              y="292"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              = 1.6 kWh/day
            </text>
            <text
              x="810"
              y="330"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              400 W · 5 h · 80%
            </text>
            <text
              x="810"
              y="358"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              compare to daily load
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Daily Wh ≈ panel W × peak sun hours × (efficiency ÷ 100) · season
            changes PSH
          </text>
        </svg>
      </div>
    </section>
  );
}
