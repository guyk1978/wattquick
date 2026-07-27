"use client";

import { cn } from "@/lib/utils";

interface BatteryEnergyVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Energy [VIZ] tab.
 * Capacity Ah × Voltage V → stored energy Wh (and kWh).
 * Sample: 100 Ah × 12 V = 1,200 Wh = 1.2 kWh.
 */
export function BatteryEnergyViz({ className }: BatteryEnergyVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-energy", className)}
      aria-label="Battery energy visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Energy Calculator</h3>
        <p className="tool-viz__subtitle">
          Amp-hours multiply by nominal voltage to express total stored energy
          in watt-hours — the fair metric across pack voltages.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-energy-viz"
          role="img"
          aria-labelledby="be-viz-title be-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="be-viz-title">Battery energy animated flow diagram</title>
          <desc id="be-viz-desc">
            Battery capacity in amp-hours multiplies by nominal voltage to
            produce stored energy in watt-hours and kilowatt-hours. Sample:
            100 amp-hours at 12 volts equals 1,200 watt-hours or 1.2
            kilowatt-hours.
          </desc>

          <defs>
            <pattern
              id="be-viz-grid"
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
              id="be-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="be-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="be-viz-energy"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#be-viz-grid)"
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
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            MULTIPLY
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

          {/* —— INPUT: Capacity Ah —— */}
          <g>
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
              CAPACITY
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
                className="be-viz-battery-fill"
                x="4"
                y="16"
                width="24"
                height="36"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.85"
                stroke="none"
              />
            </g>
            <text
              x="106"
              y="162"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 Ah
            </text>
            <text
              x="106"
              y="188"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              amp-hour rating
            </text>
            <text
              x="106"
              y="210"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              charge throughput at 1C
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
          <g>
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
              NOMINAL VOLTAGE
            </text>
            <g
              transform="translate(56, 318)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="16" cy="24" r="18" />
              <text
                x="16"
                y="29"
                fill="#a3e635"
                stroke="none"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="be-viz-v-pulse"
              >
                V
              </text>
            </g>
            <text
              x="106"
              y="348"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="106"
              y="374"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack / bank nominal
            </text>
            <text
              x="106"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              e.g. 12 · 24 · 48 V systems
            </text>
          </g>

          {/* Flow → multiply */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#be-viz-arrow)"
          >
            <path d="M 280 162 H 340 V 200 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#be-viz-pulse)"
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

          {/* —— PROCESS: Ah × V —— */}
          <g>
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
              Ah × V → Wh
            </text>

            {/* Formula card */}
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
              x="490"
              y="168"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              <tspan fill="#a3e635">100 Ah</tspan>
              <tspan fill="#888888"> × </tspan>
              <tspan fill="#a3e635">12 V</tspan>
            </text>
            <text
              x="490"
              y="194"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              className="be-viz-multiply"
            >
              × energy product
            </text>

            {/* Visual product bars */}
            <text
              x="376"
              y="240"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CAPACITY SCALE
            </text>
            <rect
              x="376"
              y="250"
              width="228"
              height="10"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="be-viz-ah-bar"
              x="378"
              y="252"
              width="180"
              height="6"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.7"
            />

            <text
              x="376"
              y="290"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              VOLTAGE SCALE
            </text>
            <rect
              x="376"
              y="300"
              width="228"
              height="10"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="be-viz-v-bar"
              x="378"
              y="302"
              width="96"
              height="6"
              rx="1"
              fill="#a3e635"
              fillOpacity="0.7"
            />

            {/* Energy reservoir */}
            <text
              x="376"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STORED ENERGY TANK
            </text>
            <rect
              x="376"
              y="350"
              width="228"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="be-viz-energy-fill"
              x="378"
              y="352"
              width="224"
              height="44"
              rx="2"
              fill="url(#be-viz-energy)"
            />
            <text
              x="490"
              y="380"
              fill="#0a0a0a"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
            >
              1,200 Wh
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#be-viz-arrow)"
          >
            <path d="M 620 252 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#be-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 252 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="240"
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
              STORED ENERGY
            </text>

            <text
              x="810"
              y="230"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="be-viz-output-value"
            >
              1,200 Wh
            </text>
            <text
              x="810"
              y="262"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              = 1.2 kWh
            </text>
            <text
              x="810"
              y="300"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              100 Ah × 12 V
            </text>
            <text
              x="810"
              y="332"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              nameplate energy (gross)
            </text>
            <text
              x="810"
              y="352"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              usable Wh depends on DoD
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Wh = Ah × V · divide by 1000 for kWh · compare packs by Wh, not Ah alone
          </text>
        </svg>
      </div>
    </section>
  );
}
