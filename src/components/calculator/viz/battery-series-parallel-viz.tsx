"use client";

import { cn } from "@/lib/utils";

interface BatterySeriesParallelVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Series & Parallel [VIZ].
 * V_pack = S × V_cell · Ah_pack = P × Ah_cell · Wh = V × Ah.
 * Sample: 4S2P · 3.2 V · 100 Ah → 12.8 V · 200 Ah · 2,560 Wh.
 */
export function BatterySeriesParallelViz({
  className,
}: BatterySeriesParallelVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-series-parallel", className)}
      aria-label="Battery series and parallel pack visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Series & Parallel</h3>
        <p className="tool-viz__subtitle">
          Series strings raise pack voltage; parallel strings raise amp-hour
          capacity — together they set total watt-hours for the bank.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-series-parallel-viz"
          role="img"
          aria-labelledby="bsp-viz-title bsp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bsp-viz-title">
            Battery series and parallel animated topology diagram
          </title>
          <desc id="bsp-viz-desc">
            Cells in series multiply voltage; strings in parallel multiply
            amp-hours. Pack energy is total voltage times total capacity.
            Sample: a 4S2P pack of 3.2 volt 100 amp-hour cells yields 12.8
            volts, 200 amp-hours, and 2,560 watt-hours.
          </desc>

          <defs>
            <pattern
              id="bsp-viz-grid"
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
              id="bsp-viz-arrow"
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
              id="bsp-viz-pulse"
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
              id="bsp-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bsp-viz-cell"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.75" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bsp-viz-grid)"
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
            S × P MATRIX
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

          {/* —— INPUT: S / P —— */}
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
              y="96"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONFIG
            </text>
            <text
              className="bsp-viz-config-value"
              x="56"
              y="136"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4S2P
            </text>
            <text
              x="56"
              y="160"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              series · parallel strings
            </text>
          </g>

          {/* —— INPUT: Cell V —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="95"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="212"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CELL VOLTAGE
            </text>
            <text
              className="bsp-viz-v-value"
              x="56"
              y="250"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.2 V
            </text>
            <text
              x="56"
              y="272"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              LiFePO₄ nominal
            </text>
          </g>

          {/* —— INPUT: Cell Ah —— */}
          <g>
            <rect
              x="40"
              y="299"
              width="230"
              height="95"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="323"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CELL CAPACITY
            </text>
            <text
              className="bsp-viz-ah-value"
              x="56"
              y="361"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 Ah
            </text>
            <text
              x="56"
              y="383"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              matched cells
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#bsp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bsp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 235 L 320 235"
            fill="none"
            stroke="url(#bsp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bsp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 346 L 320 346"
            fill="none"
            stroke="url(#bsp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bsp-viz-arrow)"
          />

          {/* —— CENTER: 4S2P matrix —— */}
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
              TOPOLOGY · 4S × 2P
            </text>

            {/* Two parallel strings of 4 series cells */}
            <g transform="translate(360, 120)">
              {/* String 1 */}
              {[0, 1, 2, 3].map((i) => (
                <g key={`s1-${i}`} transform={`translate(${i * 48}, 0)`}>
                  <rect
                    className="bsp-viz-cell"
                    x="0"
                    y="0"
                    width="36"
                    height="48"
                    rx="2"
                    fill="url(#bsp-viz-cell)"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <rect
                    x="12"
                    y="-6"
                    width="12"
                    height="6"
                    rx="1"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </g>
              ))}
              {/* Series bus */}
              <path
                className="bsp-viz-series-bus"
                d="M 0 24 L 180 24"
                fill="none"
                stroke="url(#bsp-viz-pulse)"
                strokeWidth="1.5"
              />
              <text
                x="190"
                y="18"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                S↑V
              </text>

              {/* String 2 */}
              {[0, 1, 2, 3].map((i) => (
                <g key={`s2-${i}`} transform={`translate(${i * 48}, 70)`}>
                  <rect
                    className="bsp-viz-cell"
                    x="0"
                    y="0"
                    width="36"
                    height="48"
                    rx="2"
                    fill="url(#bsp-viz-cell)"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <rect
                    x="12"
                    y="-6"
                    width="12"
                    height="6"
                    rx="1"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </g>
              ))}
              <path
                className="bsp-viz-series-bus"
                d="M 0 94 L 180 94"
                fill="none"
                stroke="url(#bsp-viz-pulse)"
                strokeWidth="1.5"
              />

              {/* Parallel links */}
              <path
                className="bsp-viz-parallel-bus"
                d="M -12 24 L -12 94"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                className="bsp-viz-parallel-bus"
                d="M 192 24 L 192 94"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="200"
                y="70"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                P↑Ah
              </text>
            </g>

            <text
              x="340"
              y="290"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SCALE
            </text>
            <text
              className="bsp-viz-math-value"
              x="340"
              y="318"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4×3.2 V · 2×100 Ah
            </text>
            <rect
              x="340"
              y="336"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bsp-viz-scale-bar"
              x="342"
              y="338"
              width="220"
              height="8"
              rx="1"
              fill="url(#bsp-viz-bar)"
            />
            <text
              x="340"
              y="372"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              8 cells · matched · BMS for 4S
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#bsp-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#bsp-viz-arrow)"
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
              PACK ENERGY
            </text>
            <text
              className="bsp-viz-output-value"
              x="720"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,560
            </text>
            <text
              x="720"
              y="174"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              Wh
            </text>

            <rect
              x="720"
              y="194"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="bsp-viz-output-bar"
              x="722"
              y="196"
              width="155"
              height="8"
              rx="1"
              fill="url(#bsp-viz-bar)"
            />

            <text
              x="720"
              y="240"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VOLTAGE
            </text>
            <text
              className="bsp-viz-pack-v"
              x="720"
              y="266"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12.8 V
            </text>
            <text
              x="720"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CAPACITY
            </text>
            <text
              className="bsp-viz-pack-ah"
              x="720"
              y="322"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              200 Ah
            </text>
            <text
              x="720"
              y="360"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              4S2P · V × Ah
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
              V = S×V_cell · Ah = P×Ah_cell · Wh = V×Ah
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
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              4S2P · 3.2 V · 100 Ah → 2,560 Wh
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
