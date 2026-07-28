"use client";

import { cn } from "@/lib/utils";

interface CarbonFootprintOffsetVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar & EV Carbon Offset [VIZ].
 * kg CO₂ avoided = cleanKwh × gridKgCo2PerKwh.
 * Sample: 900 kWh · 0.42 kg/kWh → 378 kg · 833 lbs · ~936 mi car-eq.
 */
export function CarbonFootprintOffsetViz({
  className,
}: CarbonFootprintOffsetVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--carbon-footprint-offset", className)}
      aria-label="Solar and EV carbon offset visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Clean Energy Carbon Offset</h3>
        <p className="tool-viz__subtitle">
          Every clean kilowatt-hour displaces a grid kilowatt-hour — multiply by
          regional intensity to see CO₂ avoided from solar or EV electricity.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg carbon-footprint-offset-viz"
          role="img"
          aria-labelledby="cfo-viz-title cfo-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="cfo-viz-title">
            Solar and EV carbon offset animated flow diagram
          </title>
          <desc id="cfo-viz-desc">
            Clean energy kilowatt-hours and grid carbon intensity determine
            avoided CO2. Sample: 900 clean kilowatt-hours at 0.42 kilograms CO2
            per kilowatt-hour avoid 378 kilograms of CO2, about 833 pounds, or
            roughly 936 car-equivalent miles.
          </desc>

          <defs>
            <pattern
              id="cfo-viz-grid"
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
              id="cfo-viz-arrow"
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
              id="cfo-viz-pulse"
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
              id="cfo-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="cfo-viz-clean"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#cfo-viz-grid)"
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

          {/* —— INPUT: Clean kWh —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="160"
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
              CLEAN ENERGY
            </text>
            <text
              className="cfo-viz-kwh-value"
              x="56"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              900 kWh
            </text>
            <text
              x="56"
              y="142"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              solar self-use · EV charge
            </text>
            <text
              x="56"
              y="164"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              displaces grid kWh
            </text>
            <text
              x="56"
              y="182"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              planning figure · not LCA
            </text>
          </g>

          {/* —— INPUT: Grid intensity —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="220"
              height="140"
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
              GRID INTENSITY
            </text>
            <text
              className="cfo-viz-grid-value"
              x="56"
              y="292"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.42 kg/kWh
            </text>
            <text
              x="56"
              y="320"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              EPA eGRID regional avg
            </text>
            <text
              x="56"
              y="342"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              fossil mix factor
            </text>
          </g>

          {/* Flow → offset path */}
          <path
            d="M 260 120 L 310 120"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfo-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 120 L 310 120"
            fill="none"
            stroke="url(#cfo-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 180 L 310 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfo-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 290 L 290 290 L 290 180 L 310 180"
            fill="none"
            stroke="url(#cfo-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Emissions offset path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
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
              EMISSIONS OFFSET PATH
            </text>

            {/* Clean sources */}
            <g className="cfo-viz-solar" transform="translate(360, 92)">
              <circle
                cx="28"
                cy="28"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="28" cy="28" r="6" fill="url(#cfo-viz-clean)" />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1={28 + Math.cos(rad) * 20}
                    y1={28 + Math.sin(rad) * 20}
                    x2={28 + Math.cos(rad) * 26}
                    y2={28 + Math.sin(rad) * 26}
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                );
              })}
              <text
                x="28"
                y="64"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                solar
              </text>
            </g>

            <g className="cfo-viz-ev" transform="translate(448, 100)">
              <rect
                x="0"
                y="8"
                width="56"
                height="28"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <circle cx="12" cy="42" r="7" fill="none" stroke="#555555" />
              <circle cx="44" cy="42" r="7" fill="none" stroke="#555555" />
              <text
                x="28"
                y="64"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                EV kWh
              </text>
            </g>

            {/* Displacement arrow */}
            <path
              d="M 520 120 L 580 120"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#cfo-viz-arrow)"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 520 120 L 580 120"
              fill="none"
              stroke="url(#cfo-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Grid plant crossed / displaced */}
            <g className="cfo-viz-grid-plant" transform="translate(588, 88)">
              <rect
                x="0"
                y="8"
                width="48"
                height="40"
                rx="2"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <path
                d="M 12 8 L 12 0 M 24 8 L 24 0 M 36 8 L 36 0"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <line
                className="cfo-viz-strike"
                x1="-4"
                y1="48"
                x2="52"
                y2="0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="24"
                y="72"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                grid fossil
              </text>
            </g>

            {/* Formula */}
            <rect
              x="348"
              y="188"
              width="284"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="212"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              OFFSET FORMULA
            </text>
            <text
              className="cfo-viz-math-value"
              x="364"
              y="240"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              900 × 0.42 = 378 kg CO₂
            </text>

            {/* Equivalents strip */}
            <rect
              x="348"
              y="276"
              width="284"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="300"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              EQUIVALENTS
            </text>
            <text
              className="cfo-viz-eq-value"
              x="364"
              y="324"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              833 lbs · ~936 mi car-eq
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 200 L 700 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cfo-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 200 L 700 200"
            fill="none"
            stroke="url(#cfo-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="320"
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
              CO₂ AVOIDED
            </text>
            <text
              className="cfo-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              378 kg
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              greenhouse gas offset
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="cfo-viz-co2-bar"
              x="726"
              y="168"
              width="162"
              height="14"
              rx="2"
              fill="url(#cfo-viz-bar)"
            />
            <text
              className="cfo-viz-detail-value"
              x="726"
              y="212"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              833 lbs CO₂
            </text>
            <text
              className="cfo-viz-detail-value"
              x="726"
              y="248"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              ~936 mi gasoline car
            </text>
            <text
              x="726"
              y="288"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              @ 0.404 kg/mi factor
            </text>
            <text
              x="726"
              y="320"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              clean kWh × grid factor
            </text>
            <text
              x="726"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              solar + EV both count
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DISPLACEMENT AT A GLANCE
            </text>

            {/* Before / after bars */}
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              grid kWh (no clean)
            </text>
            <rect
              x="200"
              y="438"
              width="400"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="cfo-viz-before-bar"
              x="200"
              y="438"
              width="400"
              height="12"
              rx="2"
              fill="url(#cfo-viz-bar)"
              opacity="0.45"
            />

            <text
              x="56"
              y="480"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              CO₂ avoided
            </text>
            <rect
              x="200"
              y="470"
              width="400"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="cfo-viz-after-bar"
              x="200"
              y="470"
              width="400"
              height="12"
              rx="2"
              fill="url(#cfo-viz-clean)"
            />
            <text
              x="612"
              y="480"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              dominantBaseline="middle"
            >
              900 kWh → 378 kg
            </text>

            <path
              className="cfo-viz-timeline-pulse"
              d="M 56 502 L 880 502"
              fill="none"
              stroke="url(#cfo-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              className="cfo-viz-detail-value"
              x="880"
              y="506"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
              dominantBaseline="middle"
            >
              378 kg CO₂ avoided
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
