"use client";

import { cn } from "@/lib/utils";

interface EvFastChargingTimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV DC Fast Charging (10–80%) [VIZ].
 * Full power to 80% (~8% loss) · taper above 80%.
 * Sample: 75 kWh · 150 kW · 10%→80% ≈ 23m.
 */
export function EvFastChargingTimeViz({ className }: EvFastChargingTimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-fast-charging-time", className)}
      aria-label="EV DC fast charging time visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DC Fast Charge · 10–80%</h3>
        <p className="tool-viz__subtitle">
          Peak DC power fills the pack quickly through the 10–80% window, then
          tapers as chemical resistance and thermal limits rise toward full SoC.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-fast-charging-time-viz"
          role="img"
          aria-labelledby="efc-viz-title efc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="efc-viz-title">
            EV DC fast charging curve animated flow diagram
          </title>
          <desc id="efc-viz-desc">
            Battery capacity and target state of charge feed a DC fast-charge
            curve that runs near peak power from 10 to 80 percent then tapers.
            Sample: a 75 kilowatt-hour pack on a 150 kilowatt charger takes
            about 23 minutes from 10 to 80 percent.
          </desc>

          <defs>
            <pattern
              id="efc-viz-grid"
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
              id="efc-viz-arrow"
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
              id="efc-viz-pulse"
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
              id="efc-viz-power"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#a3e635" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="efc-viz-soc"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#efc-viz-grid)"
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
            CHARGE CURVE · TAPER
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

          {/* —— INPUT: Pack —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
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
              BATTERY CAPACITY
            </text>
            <g transform="translate(56, 112)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="28" height="40" rx="2" strokeWidth="1.3" />
              <rect
                x="7"
                y="3"
                width="14"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="efc-viz-battery-fill"
                x="4"
                y="28"
                width="20"
                height="16"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.7"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75 kWh
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              traction pack size
            </text>
          </g>

          {/* —— INPUT: Target SoC —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="230"
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
              TARGET SoC
            </text>
            <text
              x="56"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80%
            </text>
            <text
              x="130"
              y="276"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              from ~10%
            </text>
            <text
              x="56"
              y="300"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              typical road-trip window
            </text>
          </g>

          {/* —— INPUT: Charger —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="230"
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
              DC CHARGER PEAK
            </text>
            <g
              transform="translate(56, 380)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <rect x="0" y="4" width="30" height="30" rx="2" />
              <path
                d="M20 8 L11 24 H17 L13 36 L26 18 H20 Z"
                className="efc-viz-bolt"
                fill="#a3e635"
                fillOpacity="0.5"
                strokeLinejoin="round"
              />
            </g>
            <text
              x="104"
              y="410"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              150 kW
            </text>
            <text
              x="104"
              y="434"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DCFC peak · station rating
            </text>
          </g>

          {/* Flow → curve */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#efc-viz-arrow)"
          >
            <path d="M 270 131 H 310 V 170 H 330" />
            <path d="M 270 265 H 310 V 230 H 330" />
            <path d="M 270 399 H 310 V 340 H 330" />
          </g>
          <g
            fill="none"
            stroke="url(#efc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 270 131 H 310 V 170 H 330"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 270 265 H 310 V 230 H 330"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.65s" }}
              d="M 270 399 H 310 V 340 H 330"
              pathLength="100"
            />
          </g>

          {/* —— CURVE PANEL —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="290"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="346"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER vs SoC
            </text>

            {/* Chart frame */}
            <rect
              x="352"
              y="120"
              width="246"
              height="160"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            {/* Axes */}
            <path
              d="M 372 260 H 578 M 372 260 V 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1"
            />
            {/* Peak power plateau then taper */}
            <path
              d="M 372 168 H 520 L 578 240"
              fill="none"
              stroke="#404040"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              className="efc-viz-curve"
              d="M 372 168 H 520 L 578 240"
              fill="none"
              stroke="url(#efc-viz-power)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              pathLength="100"
            />
            {/* Dot traveling on curve */}
            <circle
              className="efc-viz-cursor"
              cx="446"
              cy="168"
              r="4"
              fill="#a3e635"
            />
            <text
              x="378"
              y="156"
              fill="#a3e635"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              ~138 kW eff
            </text>
            <text
              x="528"
              y="228"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              taper
            </text>
            <text
              x="372"
              y="278"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              10%
            </text>
            <text
              x="500"
              y="278"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              80%
            </text>
            <text
              x="566"
              y="278"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              100%
            </text>

            <rect
              x="352"
              y="296"
              width="246"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="316"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · TO 80% @ 92% PEAK
            </text>
            <text
              x="364"
              y="334"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              52.5 kWh ÷ 138 kW
            </text>

            <rect
              x="352"
              y="356"
              width="246"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="376"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ABOVE 80% · REDUCED kW
            </text>
            <text
              x="364"
              y="394"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              not used for 10→80% stop
            </text>

            {/* SoC fill bar */}
            <text
              x="352"
              y="428"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SoC WINDOW
            </text>
            <rect
              x="352"
              y="436"
              width="246"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="efc-viz-soc-bar"
              x="377"
              y="438"
              width="172"
              height="6"
              rx="1"
              fill="url(#efc-viz-soc)"
            />
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#efc-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#efc-viz-pulse)"
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
              EST. CHARGE TIME
            </text>

            <g
              transform="translate(786, 196)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.4"
            >
              <circle cx="24" cy="24" r="22" />
              <g className="efc-viz-clock-hand">
                <line
                  x1="24"
                  y1="24"
                  x2="24"
                  y2="10"
                  stroke="#a3e635"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <line x1="24" y1="24" x2="34" y2="28" strokeLinecap="round" />
            </g>

            <text
              x="810"
              y="280"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="efc-viz-output-value"
            >
              23m
            </text>
            <text
              x="810"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              10% → 80% SoC
            </text>
            <text
              x="810"
              y="342"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              75 kWh · 150 kW peak
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              cold / busy stalls add time
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            To 80%: kWh × ΔSoC ÷ (peak kW × 0.92) · above 80% uses reduced power model
          </text>
        </svg>
      </div>
    </section>
  );
}
