"use client";

import { cn } from "@/lib/utils";

interface EscooterMaxSpeedVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Max Speed [VIZ] tab.
 * V × KV × 0.88 → RPM → wheel circumference → km/h.
 * Sample: 48 V · 15 KV · 200 mm → ~634 RPM · ~23.9 km/h.
 */
export function EscooterMaxSpeedViz({ className }: EscooterMaxSpeedVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-max-speed", className)}
      aria-label="E-scooter max speed visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">E-Scooter Max Speed</h3>
        <p className="tool-viz__subtitle">
          Pack voltage times motor KV sets wheel RPM; circumference converts
          spin into theoretical ground speed before load and firmware limits.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-max-speed-viz"
          role="img"
          aria-labelledby="esms-viz-title esms-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esms-viz-title">
            E-scooter max speed animated flow diagram
          </title>
          <desc id="esms-viz-desc">
            Battery voltage and motor KV produce motor RPM with a field-weakening
            factor, then wheel diameter converts RPM into linear ground speed.
            Sample: 48 volts times 15 RPM per volt on a 200 millimeter wheel
            yields about 634 RPM and 23.9 kilometers per hour theoretical.
          </desc>

          <defs>
            <pattern
              id="esms-viz-grid"
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
              id="esms-viz-arrow"
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
              id="esms-viz-pulse"
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
              id="esms-viz-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#esms-viz-grid)"
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
            RPM · GEOMETRY
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

          {/* —— INPUT: Voltage —— */}
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
              BATTERY VOLTAGE
            </text>
            <text
              x="56"
              y="140"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              x="56"
              y="172"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              nominal pack · full SOC
            </text>
          </g>

          {/* —— INPUT: Motor KV —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="230"
              height="120"
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
              MOTOR KV
            </text>
            <text
              x="56"
              y="286"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 RPM/V
            </text>
            <text
              x="56"
              y="316"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              stator / seller label
            </text>
          </g>

          {/* —— INPUT: Wheel —— */}
          <g>
            <rect
              x="40"
              y="358"
              width="230"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="386"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WHEEL DIAMETER
            </text>
            <text
              x="56"
              y="412"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              200 mm · ~8″
            </text>
          </g>

          {/* —— Flow: inputs → RPM —— */}
          <path
            d="M 270 137 L 320 137"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esms-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 137 L 320 137"
            fill="none"
            stroke="url(#esms-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 280 L 300 280 L 300 180 L 320 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esms-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 280 L 300 280 L 300 180 L 320 180"
            fill="none"
            stroke="url(#esms-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Motor RPM —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="160"
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
              MOTOR RPM
            </text>
            <text
              x="346"
              y="128"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              V × KV × 0.88
            </text>
            <text
              x="346"
              y="168"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="esms-viz-rpm-value"
            >
              634 RPM
            </text>
            <text
              x="346"
              y="198"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              48 × 15 × 0.88 = 633.6
            </text>

            {/* Spinning hub glyph */}
            <g transform="translate(560, 145)">
              <circle
                className="esms-viz-hub"
                cx="0"
                cy="0"
                r="36"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="none"
                stroke="#333333"
                strokeWidth="1"
              />
              <line
                className="esms-viz-spoke"
                x1="0"
                y1="-36"
                x2="0"
                y2="36"
                stroke="#a3e635"
                strokeWidth="1.25"
                opacity="0.85"
              />
              <line
                className="esms-viz-spoke"
                x1="-36"
                y1="0"
                x2="36"
                y2="0"
                stroke="#a3e635"
                strokeWidth="1.25"
                opacity="0.55"
              />
            </g>
          </g>

          {/* —— FLOW: Wheel geometry —— */}
          <g>
            <rect
              x="330"
              y="252"
              width="300"
              height="176"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WHEEL → GROUND
            </text>
            <text
              x="346"
              y="308"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              (RPM ÷ 60) × πd × 3.6
            </text>

            {/* Wheel + road */}
            <g transform="translate(370, 340)">
              <circle
                className="esms-viz-wheel"
                cx="48"
                cy="40"
                r="40"
                fill="none"
                stroke="#a3e635"
                strokeWidth="2"
              />
              <circle
                cx="48"
                cy="40"
                r="14"
                fill="none"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                className="esms-viz-spoke"
                x1="48"
                y1="0"
                x2="48"
                y2="80"
                stroke="#a3e635"
                strokeWidth="1"
                opacity="0.7"
              />
              <path
                className="esms-viz-road"
                d="M 0 84 L 200 84"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <path
                className="esms-viz-velocity"
                d="M 110 40 L 180 40"
                fill="none"
                stroke="#a3e635"
                strokeWidth="2"
                markerEnd="url(#esms-viz-arrow)"
              />
              <text
                x="145"
                y="30"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                v
              </text>
            </g>
            <text
              x="346"
              y="410"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              circ ≈ 0.628 m · direct drive
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 152 L 680 152"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esms-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 152 L 680 152"
            fill="none"
            stroke="url(#esms-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 340 L 655 340 L 655 240 L 680 240"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esms-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 340 L 655 340 L 655 240 L 680 240"
            fill="none"
            stroke="url(#esms-viz-pulse)"
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
              MAX SPEED
            </text>
            <text
              x="706"
              y="160"
              fill="#a3e635"
              fontSize="42"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="esms-viz-output-value"
            >
              23.9
            </text>
            <text
              x="706"
              y="192"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
            >
              km/h
            </text>
            <text
              x="706"
              y="222"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 14.8 mph
            </text>

            <rect
              x="706"
              y="248"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="esms-viz-speed-bar"
              x="708"
              y="250"
              width="150"
              height="8"
              rx="1"
              fill="url(#esms-viz-fill)"
            />

            <text
              x="706"
              y="300"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MOTOR RPM
            </text>
            <text
              x="706"
              y="332"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="esms-viz-rpm-value"
            >
              634 RPM
            </text>
            <text
              x="706"
              y="368"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              unloaded theoretical
            </text>
            <text
              x="706"
              y="400"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              expect less under load
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
              V × KV × 0.88 → RPM → (÷60) × πd × 3.6 → km/h
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
              48 V · 15 KV · 200 mm → 23.9 km/h
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
