"use client";

import { cn } from "@/lib/utils";

interface EvChargingTemperatureImpactVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Charging Temperature Impact [VIZ].
 * Cold/hot ambient → BMS heat/cool + power derate → added delay on 10–80% DC.
 * Sample: mid-size 75 kWh · 150 kW · −10 °C → 23m base + 25m delay = 48m.
 */
export function EvChargingTemperatureImpactViz({
  className,
}: EvChargingTemperatureImpactVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--ev-charging-temperature-impact",
        className
      )}
      aria-label="EV charging temperature impact visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Charging Temperature Impact</h3>
        <p className="tool-viz__subtitle">
          Outside the optimal pack window the BMS heats or cools and derates DC
          power—stretching the familiar 10–80% fast-charge session.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-charging-temperature-impact-viz"
          role="img"
          aria-labelledby="eti-viz-title eti-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="eti-viz-title">
            EV charging temperature impact animated flow diagram
          </title>
          <desc id="eti-viz-desc">
            Vehicle pack size, charger peak power, and ambient temperature feed
            a BMS thermal path that reduces effective kilowatts and adds
            preconditioning delay. Sample: a 75 kilowatt-hour mid-size EV on a
            150 kilowatt charger at minus 10 Celsius takes 48 minutes instead of
            a 23 minute ideal base, adding 25 minutes of delay.
          </desc>

          <defs>
            <pattern
              id="eti-viz-grid"
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
              id="eti-viz-arrow"
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
              id="eti-viz-pulse"
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
              id="eti-viz-thermo"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="eti-viz-power"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#eti-viz-grid)"
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
            BMS THERMAL PATH
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

          {/* —— INPUT: Vehicle —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="108"
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
              VEHICLE / BATTERY
            </text>
            <text
              x="56"
              y="128"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Mid-size EV
            </text>
            <text
              x="56"
              y="154"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~75 kWh usable pack
            </text>
          </g>

          {/* —— INPUT: Capacity + charger —— */}
          <g>
            <rect
              x="40"
              y="196"
              width="230"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="222"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PACK · CHARGER
            </text>
            <text
              x="56"
              y="256"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75 kWh
            </text>
            <text
              x="150"
              y="256"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              · 150 kW
            </text>
            <text
              x="56"
              y="286"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DC peak · 10→80% base
            </text>
          </g>

          {/* —— INPUT: Ambient —— */}
          <g>
            <rect
              x="40"
              y="330"
              width="230"
              height="128"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="356"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AMBIENT TEMP
            </text>
            {/* Thermometer glyph */}
            <g transform="translate(56, 368)" fill="none" stroke="#ededed">
              <rect x="8" y="0" width="10" height="36" rx="5" strokeWidth="1.3" />
              <circle cx="13" cy="42" r="10" strokeWidth="1.3" />
              <rect
                className="eti-viz-thermo-fill"
                x="10"
                y="18"
                width="6"
                height="24"
                rx="2"
                fill="url(#eti-viz-thermo)"
                stroke="none"
              />
            </g>
            <text
              x="90"
              y="400"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −10 °C
            </text>
            <text
              x="90"
              y="426"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              outside optimal 15–30 °C
            </text>
          </g>

          {/* Flow → BMS */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#eti-viz-arrow)"
          >
            <path d="M 270 126 H 310 V 160 H 330" />
            <path d="M 270 255 H 310 V 230 H 330" />
            <path d="M 270 394 H 310 V 340 H 330" />
          </g>
          <g
            fill="none"
            stroke="url(#eti-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 270 126 H 310 V 160 H 330"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 270 255 H 310 V 230 H 330"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.6s" }}
              d="M 270 394 H 310 V 340 H 330"
              pathLength="100"
            />
          </g>

          {/* —— BMS PATH —— */}
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
              THERMAL RESISTANCE PATH
            </text>

            {/* Thermal window band */}
            <rect
              x="352"
              y="116"
              width="246"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="136"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              OPTIMAL WINDOW
            </text>
            <rect
              x="364"
              y="146"
              width="222"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              x="430"
              y="148"
              width="90"
              height="6"
              rx="1"
              fill="currentColor"
              fillOpacity="0.55"
            />
            <circle
              className="eti-viz-temp-dot"
              cx="392"
              cy="151"
              r="4"
              fill="currentColor"
            />
            <text
              x="364"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              −10 °C · left of 15–30 °C band
            </text>

            <rect
              x="352"
              y="186"
              width="246"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="208"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BMS MODE · HEATING
            </text>
            <text
              x="364"
              y="230"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Heavy cell heating + DC throttle
            </text>
            <text
              x="364"
              y="248"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +13 min precondition overhead
            </text>

            <rect
              x="352"
              y="272"
              width="246"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="294"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              EFFECTIVE CHARGER kW
            </text>
            <text
              x="364"
              y="318"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              150 × 0.66 ={" "}
              <tspan fill="#ededed">98.6 kW</tspan>
            </text>
            <rect
              x="364"
              y="328"
              width="222"
              height="8"
              rx="1"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="eti-viz-power-bar"
              x="366"
              y="330"
              width="146"
              height="4"
              rx="1"
              fill="url(#eti-viz-power)"
            />

            <rect
              x="352"
              y="358"
              width="246"
              height="78"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="364"
              y="380"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SESSION MATH
            </text>
            <text
              x="364"
              y="402"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Ideal base @ 20 °C: 23m
            </text>
            <text
              x="364"
              y="422"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Derated session + heat: +25m
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#eti-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#eti-viz-pulse)"
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
              y="100"
              width="220"
              height="86"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="128"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BASE (IDEAL)
            </text>
            <text
              x="716"
              y="164"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eti-viz-output-base"
            >
              23m
            </text>
          </g>

          <g>
            <rect
              x="700"
              y="200"
              width="220"
              height="86"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="228"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              THERMAL DELAY
            </text>
            <text
              x="716"
              y="264"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eti-viz-output-delay"
            >
              +25m
            </text>
          </g>

          <g>
            <rect
              x="700"
              y="300"
              width="220"
              height="158"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EST. TOTAL TIME
            </text>
            <text
              x="810"
              y="380"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="eti-viz-output-total"
            >
              48m
            </text>
            <text
              x="810"
              y="412"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              suboptimal · heating
            </text>
            <text
              x="810"
              y="436"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              +109% vs ideal base
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Total ≈ ideal 10–80% + derated ΔkW + precondition · precondition en route cuts delay
          </text>
        </svg>
      </div>
    </section>
  );
}
