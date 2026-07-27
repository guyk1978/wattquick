"use client";

import { cn } from "@/lib/utils";

interface EbikeMaxSpeedVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Max Speed [VIZ] tab.
 * Voltage × motor KV → RPM → wheel circumference → km/h.
 */
export function EbikeMaxSpeedViz({ className }: EbikeMaxSpeedVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-max-speed", className)}
      aria-label="E-bike max speed visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Bike Max Speed</h3>
        <p className="tool-viz__subtitle">
          Battery voltage and motor KV set unloaded RPM; wheel size converts
          rotation into theoretical top speed.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-max-speed-viz"
          role="img"
          aria-labelledby="ebike-speed-viz-title ebike-speed-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebike-speed-viz-title">
            E-bike max speed animated flow diagram
          </title>
          <desc id="ebike-speed-viz-desc">
            Battery voltage and motor KV rating multiply to unloaded RPM, then
            wheel circumference converts rotation to theoretical maximum speed
            in kilometers per hour.
          </desc>

          <defs>
            <pattern
              id="ebike-speed-viz-grid"
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
              id="ebike-speed-viz-arrow"
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
              id="ebike-speed-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebike-speed-viz-grid)"
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
            CONVERSION
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

          {/* Battery voltage */}
          <g className="ebike-speed-viz-node">
            <rect
              x="40"
              y="88"
              width="240"
              height="130"
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
              BATTERY VOLTAGE
            </text>
            <g transform="translate(56, 132)" stroke="#ededed" fill="none">
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
              <text
                x="16"
                y="36"
                textAnchor="middle"
                fill="#ededed"
                stroke="none"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                V
              </text>
            </g>
            <text
              x="106"
              y="158"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              x="106"
              y="182"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nominal pack voltage
            </text>
          </g>

          {/* Motor KV */}
          <g className="ebike-speed-viz-node">
            <rect
              x="40"
              y="248"
              width="240"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MOTOR KV
            </text>
            <g
              transform="translate(56, 296)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <circle cx="18" cy="22" r="16" />
              <path
                className="ebike-max-speed-viz-motor"
                d="M18 6 V22 M18 22 L28 32 M18 22 L8 32"
              />
              <circle cx="18" cy="22" r="3" fill="currentColor" stroke="none" />
            </g>
            <text
              x="106"
              y="318"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 RPM/V
            </text>
            <text
              x="106"
              y="358"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              no-load RPM per volt
            </text>
          </g>

          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path d="M 280 152 H 340 V 200 H 360" />
            <path d="M 280 308 H 340 V 260 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ebike-speed-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 152 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 308 H 340 V 260 H 360"
              pathLength="100"
            />
          </g>

          {/* Process */}
          <g className="ebike-speed-viz-node ebike-speed-viz-node--process">
            <rect
              x="360"
              y="72"
              width="260"
              height="376"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RPM → LINEAR SPEED
            </text>

            <rect
              x="376"
              y="118"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text x="388" y="140" fill="#888888" fontSize="10" fontFamily="ui-monospace, monospace">
              1. VOLTAGE × KV
            </text>
            <text
              x="388"
              y="162"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              48 × 8 × 0.92
            </text>
            <text
              x="580"
              y="162"
              textAnchor="end"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              353 RPM
            </text>

            <rect
              x="376"
              y="214"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text x="388" y="236" fill="#888888" fontSize="10" fontFamily="ui-monospace, monospace">
              2. WHEEL DIAMETER
            </text>
            <text
              x="388"
              y="258"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              700 mm · 27.5″
            </text>
            <text
              x="580"
              y="258"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              π × D → circumference
            </text>

            {/* Spinning wheel */}
            <g transform="translate(470, 318)">
              <circle
                cx="20"
                cy="20"
                r="22"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <g className="ebike-max-speed-viz-wheel">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="#ededed"
                  strokeWidth="1.4"
                />
                <line x1="20" y1="2" x2="20" y2="38" stroke="#333333" strokeWidth="1" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#333333" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
              </g>
            </g>

            <text
              x="376"
              y="392"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              LINEAR VELOCITY
            </text>
            <text
              x="376"
              y="418"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (RPM ÷ 60) × circumference × 3.6
            </text>
            <text
              x="376"
              y="438"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0.92 factor = loaded voltage estimate
            </text>
          </g>

          <path
            d="M 620 260 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ebike-speed-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 620 260 H 700"
            fill="none"
            stroke="url(#ebike-speed-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
          />

          {/* Output */}
          <g className="ebike-speed-viz-node ebike-speed-viz-node--output">
            <rect
              x="700"
              y="72"
              width="220"
              height="376"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeOpacity="0.65"
            />
            <text
              x="810"
              y="104"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.12em"
            >
              THEORETICAL MAX
            </text>

            <g
              transform="translate(786, 128)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <path d="M8 44 L32 44 M32 44 L40 36 M32 44 L40 52" />
              <path
                className="ebike-max-speed-viz-speed-arrow"
                d="M8 44 H28"
                stroke="currentColor"
                strokeWidth="2"
              />
            </g>

            <text
              className="ebike-viz-output-value"
              x="810"
              y="220"
              textAnchor="middle"
              fill="#ededed"
              fontSize="38"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              46.6 km/h
            </text>
            <text
              x="810"
              y="248"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              unloaded / theoretical
            </text>

            <line
              x1="724"
              y1="268"
              x2="896"
              y2="268"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="810"
              y="300"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              AT LOAD
            </text>
            <text
              x="810"
              y="328"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              ~353 RPM
            </text>
            <text
              x="810"
              y="358"
              textAnchor="middle"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              real top speed is lower
            </text>
            <text
              x="810"
              y="378"
              textAnchor="middle"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              wind · rolling · controller cap
            </text>
          </g>

          <rect
            x="40"
            y="460"
            width="880"
            height="72"
            rx="4"
            fill="#0f0f0f"
            stroke="#262626"
            strokeWidth="1"
          />
          <text
            x="56"
            y="488"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.08em"
          >
            FLOW
          </text>
          <text
            x="56"
            y="512"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            km/h = (V × KV × 0.92 ÷ 60) × wheel circumference (m) × 3.6
          </text>
        </svg>
      </div>
    </section>
  );
}
