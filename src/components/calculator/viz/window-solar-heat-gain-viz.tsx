"use client";

import { cn } from "@/lib/utils";

interface WindowSolarHeatGainVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Window Solar Heat Gain (SHGC) [VIZ].
 * dailyBtu = area × (200 × SHGC) × (sunHrs / 6);
 * coolingKwh = dailyBtu / (3412 × COP).
 * Sample: 120 sq ft · 0.35 SHGC · 6 h · COP 3 → 8,400 BTU/day · 0.8 kWh/day · 0.16 kW peak.
 */
export function WindowSolarHeatGainViz({
  className,
}: WindowSolarHeatGainVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--window-solar-heat-gain", className)}
      aria-label="Window solar heat gain visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Window Solar Heat Gain</h3>
        <p className="tool-viz__subtitle">
          Glass area times SHGC admits solar radiation as indoor heat — sun
          hours scale the daily BTU load your AC must remove.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg window-solar-heat-gain-viz"
          role="img"
          aria-labelledby="shgc-viz-title shgc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="shgc-viz-title">
            Window solar heat gain animated flow diagram
          </title>
          <desc id="shgc-viz-desc">
            Glass area, solar heat gain coefficient, peak sun hours, and AC COP
            determine daily BTU gain and cooling energy. Sample: 120 square feet
            at 0.35 SHGC with 6 sun hours and COP 3 yields about 8400 BTU per
            day, 0.8 kilowatt-hours per day of cooling, and 0.16 kilowatts peak
            cooling.
          </desc>

          <defs>
            <pattern
              id="shgc-viz-grid"
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
              id="shgc-viz-arrow"
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
              id="shgc-viz-pulse"
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
              id="shgc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="shgc-viz-sun"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#shgc-viz-grid)"
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

          {/* —— INPUT: Glass area —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="110"
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
              GLASS AREA
            </text>
            <text
              className="shgc-viz-area-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 sq ft
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              glazing surface
            </text>
          </g>

          {/* —— INPUT: SHGC —— */}
          <g>
            <rect
              x="40"
              y="166"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="192"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SHGC
            </text>
            <text
              className="shgc-viz-shgc-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.35
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              solar transmittance (0–1)
            </text>
          </g>

          {/* —— INPUT: Sun / COP —— */}
          <g>
            <rect
              x="40"
              y="282"
              width="220"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SUN · AC COP
            </text>
            <text
              className="shgc-viz-sun-value"
              x="56"
              y="344"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 hrs · COP 3
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              peak sun · cooling efficiency
            </text>
            <text
              x="56"
              y="386"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              advanced intensity inputs
            </text>
          </g>

          {/* Flow → radiation path */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#shgc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#shgc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#shgc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="url(#shgc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#shgc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="url(#shgc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Thermal radiation path —— */}
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
              THERMAL RADIATION PATH
            </text>

            {/* Sun */}
            <g className="shgc-viz-sun" transform="translate(360, 96)">
              <circle
                cx="28"
                cy="28"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="28" cy="28" r="8" fill="url(#shgc-viz-sun)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 28 + Math.cos(rad) * 22;
                const y1 = 28 + Math.sin(rad) * 22;
                const x2 = 28 + Math.cos(rad) * 30;
                const y2 = 28 + Math.sin(rad) * 30;
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>

            {/* Rays into glass */}
            <g className="shgc-viz-rays">
              <path
                d="M 420 124 L 460 140"
                fill="none"
                stroke="url(#shgc-viz-sun)"
                strokeWidth="1.5"
                markerEnd="url(#shgc-viz-arrow)"
              />
              <path
                d="M 420 132 L 460 152"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.7"
                markerEnd="url(#shgc-viz-arrow)"
              />
              <path
                d="M 420 140 L 460 164"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.45"
                markerEnd="url(#shgc-viz-arrow)"
              />
            </g>

            {/* Window pane */}
            <g className="shgc-viz-glass" transform="translate(470, 100)">
              <rect
                x="0"
                y="0"
                width="72"
                height="96"
                rx="2"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="48"
                x2="72"
                y2="48"
                stroke="#333333"
                strokeWidth="1"
              />
              <line
                x1="36"
                y1="0"
                x2="36"
                y2="96"
                stroke="#333333"
                strokeWidth="1"
              />
              {/* SHGC pass-through band */}
              <rect
                className="shgc-viz-pass"
                x="4"
                y="8"
                width="28"
                height="80"
                rx="1"
                fill="url(#shgc-viz-sun)"
                opacity="0.35"
              />
              <text
                x="36"
                y="116"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                glass · SHGC 0.35
              </text>
            </g>

            {/* Indoor heat */}
            <g transform="translate(560, 120)">
              <path
                className="shgc-viz-heat"
                d="M 0 40 Q 20 20 40 40 Q 60 60 80 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                className="shgc-viz-heat"
                d="M 8 56 Q 28 40 48 56 Q 68 72 88 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.65"
                strokeLinecap="round"
              />
              <text
                x="44"
                y="88"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                indoor heat gain
              </text>
            </g>

            {/* Math chips */}
            <rect
              x="348"
              y="240"
              width="284"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              DAILY BTU GAIN
            </text>
            <text
              className="shgc-viz-math-value"
              x="364"
              y="284"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 × (200 × 0.35) × 1.0 = 8,400
            </text>

            <rect
              x="348"
              y="312"
              width="284"
              height="68"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="336"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              COOLING ENERGY
            </text>
            <text
              className="shgc-viz-math-value"
              x="364"
              y="360"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8,400 ÷ (3412 × 3) = 0.8 kWh/day
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 200 L 700 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#shgc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 200 L 700 200"
            fill="none"
            stroke="url(#shgc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Cooling load —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="200"
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
              ADDED COOLING
            </text>
            <text
              className="shgc-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.8 kWh
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              / day cooling energy
            </text>
            <rect
              x="726"
              y="160"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="shgc-viz-cool-bar"
              x="726"
              y="160"
              width="120"
              height="12"
              rx="2"
              fill="url(#shgc-viz-bar)"
            />
            <text
              className="shgc-viz-detail-value"
              x="726"
              y="198"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              ~0.16 kW peak
            </text>
            <text
              x="726"
              y="220"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              (kWh/day ÷ hrs) × 1.2
            </text>
          </g>

          {/* —— OUTPUT: BTU gain —— */}
          <g>
            <rect
              x="710"
              y="256"
              width="210"
              height="146"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SOLAR HEAT GAIN
            </text>
            <text
              className="shgc-viz-btu-value"
              x="726"
              y="324"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8,400 BTU
            </text>
            <text
              x="726"
              y="350"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              / day through glass
            </text>
            <rect
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="shgc-viz-btu-bar"
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="url(#shgc-viz-bar)"
            />
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
              SUN → GLASS → COOLING LOAD
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
              className="shgc-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="shgc-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="shgc-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="shgc-viz-tick shgc-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="shgc-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#shgc-viz-pulse)"
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
              solar irradiance
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              SHGC filters admitted heat
            </text>
            <text
              className="shgc-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              8,400 BTU · 0.8 kWh/day
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
