"use client";

import { cn } from "@/lib/utils";

interface SmallWindTurbineYieldVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Small Wind Turbine Yield [VIZ].
 * P = ½ ρ A v³ η; mean ≈ P × 1.9 Rayleigh; annual = mean × 24 × 365 / 1000.
 * Sample: 3.5 m · 5.5 m/s · 35% → 343 W · 15.65 kWh/d · 5,711 kWh/yr.
 */
export function SmallWindTurbineYieldViz({
  className,
}: SmallWindTurbineYieldVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--small-wind-turbine-yield", className)}
      aria-label="Small wind turbine yield visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Rotor Area · v³ Power</h3>
        <p className="tool-viz__subtitle">
          Swept disk and cubic wind speed set instantaneous watts — Rayleigh
          uplift then stretches mean power into daily and annual kilowatt-hours.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg small-wind-turbine-yield-viz"
          role="img"
          aria-labelledby="swty-viz-title swty-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="swty-viz-title">
            Small wind turbine yield rotor and v-cubed power diagram
          </title>
          <desc id="swty-viz-desc">
            Blade diameter sets swept area; average wind speed cubed times air
            density and efficiency yields power at mean wind, then Rayleigh
            uplift for annual energy. Sample: 3.5 meter rotor at 5.5 meters per
            second and 35 percent efficiency produces about 343 watts at mean
            wind, 15.65 kilowatt-hours per day, and 5711 kilowatt-hours per year.
          </desc>

          <defs>
            <pattern
              id="swty-viz-grid"
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
              id="swty-viz-arrow"
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
              id="swty-viz-pulse"
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
              id="swty-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="swty-viz-year"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#swty-viz-grid)"
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

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="200"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BLADE DIAMETER
            </text>
            <text
              className="swty-viz-d-value"
              x="56"
              y="104"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.5 m
            </text>
          </g>

          <g>
            <rect
              x="260"
              y="40"
              width="200"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="276"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              AVG WIND SPEED
            </text>
            <text
              className="swty-viz-v-value"
              x="276"
              y="104"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5.5 m/s
            </text>
          </g>

          <g>
            <rect
              x="480"
              y="40"
              width="200"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="496"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SYSTEM EFFICIENCY
            </text>
            <text
              className="swty-viz-eta-value"
              x="496"
              y="104"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              35%
            </text>
          </g>

          {/* Flow → aero path */}
          <path
            d="M 140 132 L 140 160 L 380 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#swty-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 140 132 L 140 160 L 380 160"
            fill="none"
            stroke="url(#swty-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 360 132 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 360 132 L 360 160"
            fill="none"
            stroke="url(#swty-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 580 132 L 580 160 L 380 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: Turbine + power path —— */}
          <g>
            <rect
              x="40"
              y="180"
              width="640"
              height="216"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="206"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AERO POWER · ½ × 1.225 × A × v³ × η · CUT-IN 2.5 M/S
            </text>

            {/* Wind streaks */}
            <g className="swty-viz-wind" transform="translate(56, 248)">
              <path
                d="M 0 8 L 48 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M 8 24 L 64 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 40 L 52 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.55"
              />
              <text
                x="32"
                y="64"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                5.5 m/s
              </text>
            </g>

            {/* Turbine tower + rotor */}
            <g transform="translate(180, 230)">
              <line
                x1="60"
                y1="48"
                x2="60"
                y2="140"
                stroke="#444444"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g className="swty-viz-rotor" transform="translate(60, 48)">
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <g className="swty-viz-blades">
                  <path
                    d="M 0 -8 L 6 -52 L -6 -52 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 7 4 L 50 28 L 40 38 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M -7 4 L -50 28 L -40 38 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </g>
                <circle
                  className="swty-viz-hub"
                  cx="0"
                  cy="0"
                  r="4"
                  fill="currentColor"
                />
              </g>
              {/* Swept area ring */}
              <circle
                className="swty-viz-sweep"
                cx="60"
                cy="48"
                r="56"
                fill="none"
                stroke="#333333"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <text
                x="60"
                y="160"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                Ø 3.5 m · A 9.62 m²
              </text>
            </g>

            {/* Power chain chips */}
            <g transform="translate(360, 240)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                POWER CHAIN
              </text>
              <text
                className="swty-viz-p-chip"
                x="0"
                y="28"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                P @ mean = 343 W
              </text>
              <text
                className="swty-viz-mean-chip"
                x="0"
                y="52"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ×1.9 Rayleigh → 652 W
              </text>
              <rect
                x="0"
                y="68"
                width="260"
                height="40"
                rx="3"
                fill="#0a0a0a"
                stroke="#2a2a2a"
              />
              <text
                className="swty-viz-math-value"
                x="130"
                y="93"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ½ × 1.225 × 9.62 × 5.5³ × 0.35
              </text>
            </g>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#swty-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#swty-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#swty-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#swty-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Power —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER @ AVG WIND
            </text>
            <text
              className="swty-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              343 W
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              instantaneous @ 5.5 m/s
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="swty-viz-power-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#swty-viz-bar)"
            />
            <text
              className="swty-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              η 35% · below Betz 59%
            </text>
          </g>

          {/* —— OUTPUT: Annual —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL ENERGY
            </text>
            <text
              className="swty-viz-year-out"
              x="716"
              y="318"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5,711 kWh
            </text>
            <rect
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="swty-viz-year-bar"
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="url(#swty-viz-year)"
            />
            <text
              className="swty-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              15.65 kWh/day · mean 652 W
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              V³ SENSITIVITY AT A GLANCE · SAME ROTOR
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
              className="swty-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="swty-viz-tick"
              cx="360"
              cy="478"
              r="5"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="swty-viz-tick swty-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="swty-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#swty-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              2.5 m/s · cut-in
            </text>
            <text
              x="360"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              5.5 m/s · 343 W
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +1 m/s ≈ +v³ leap
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
