"use client";

import { cn } from "@/lib/utils";

interface PortablePowerStationRechargeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Portable Power Station Recharge [VIZ].
 * Hours = Wh ÷ (input W × charge η). Compare wall / car / solar.
 * Sample: 1,000 Wh · 90% · 600 / 120 / 200 W → 1h 51m / 9h 16m / 5h 34m.
 */
export function PortablePowerStationRechargeViz({
  className,
}: PortablePowerStationRechargeVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--portable-power-station-recharge",
        className
      )}
      aria-label="Portable power station recharge visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Portable Power Station Recharge</h3>
        <p className="tool-viz__subtitle">
          Capacity divided by effective charge watts (input × efficiency) gives
          refill time — wall AC usually wins over car socket or small solar.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg portable-power-station-recharge-viz"
          role="img"
          aria-labelledby="pps-viz-title pps-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="pps-viz-title">
            Portable power station recharge animated flow diagram
          </title>
          <desc id="pps-viz-desc">
            Battery capacity in watt-hours is divided by each charging source
            wattage times charge efficiency to estimate refill time. Sample: a
            1000 watt-hour station at 90 percent efficiency recharges in about
            1 hour 51 minutes from 600 watt wall AC, 9 hours 16 minutes from a
            120 watt car socket, and 5 hours 34 minutes from 200 watt solar.
          </desc>

          <defs>
            <pattern
              id="pps-viz-grid"
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
              id="pps-viz-arrow"
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
              id="pps-viz-pulse"
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
              id="pps-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="pps-viz-bar"
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
            fill="url(#pps-viz-grid)"
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
            CHARGE PATH
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

          {/* —— INPUT: Capacity —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="120"
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
              CAPACITY
            </text>
            <text
              x="56"
              y="140"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,000 Wh
            </text>
            <text
              x="56"
              y="170"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              η charge 90%
            </text>
          </g>

          {/* —— INPUT: Sources —— */}
          <g>
            <rect
              x="40"
              y="210"
              width="230"
              height="218"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="236"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INPUT SOURCES
            </text>

            <text
              x="56"
              y="272"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              Wall AC
            </text>
            <text
              x="180"
              y="272"
              fill="#a3e635"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="end"
            >
              600 W
            </text>

            <text
              x="56"
              y="312"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              Car 12V
            </text>
            <text
              x="180"
              y="312"
              fill="#a3e635"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="end"
            >
              120 W
            </text>

            <text
              x="56"
              y="352"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              Solar MPPT
            </text>
            <text
              x="180"
              y="352"
              fill="#a3e635"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="end"
            >
              200 W
            </text>

            <g className="pps-viz-sources" transform="translate(56, 378)">
              <rect
                x="0"
                y="0"
                width="22"
                height="22"
                rx="2"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.25"
              />
              <path d="M 7 6 L 15 11 L 7 16 Z" fill="#a3e635" />
              <circle
                cx="48"
                cy="11"
                r="10"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <rect
                x="72"
                y="2"
                width="28"
                height="18"
                rx="1"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <line x1="81" y1="2" x2="81" y2="20" stroke="#333333" />
              <line x1="91" y1="2" x2="91" y2="20" stroke="#333333" />
            </g>
          </g>

          {/* —— Flow: capacity → station —— */}
          <path
            d="M 270 132 L 320 132"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#pps-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 132 L 320 132"
            fill="none"
            stroke="url(#pps-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 319 L 300 319 L 300 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#pps-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 319 L 300 319 L 300 200 L 320 200"
            fill="none"
            stroke="url(#pps-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Effective watts —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="140"
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
              EFFECTIVE CHARGE W
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              input W × 0.90
            </text>
            <text
              x="346"
              y="160"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="pps-viz-eff-value"
            >
              540 W wall
            </text>
            <text
              x="346"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              car 108 W · solar 180 W
            </text>
          </g>

          {/* —— FLOW: Station filling —— */}
          <g>
            <rect
              x="330"
              y="230"
              width="300"
              height="198"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              Wh ÷ (W × η)
            </text>

            {/* Power station body */}
            <g transform="translate(380, 280)">
              <rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="4"
                fill="#0a0a0a"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <rect
                className="pps-viz-station-fill"
                x="8"
                y="10"
                width="104"
                height="48"
                rx="2"
                fill="url(#pps-viz-fill)"
              />
              <text
                x="60"
                y="72"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                PACK
              </text>
              {/* AC inlet spark */}
              <path
                className="pps-viz-inlet"
                d="M -24 40 L -4 40"
                fill="none"
                stroke="#a3e635"
                strokeWidth="2"
                markerEnd="url(#pps-viz-arrow)"
              />
            </g>

            <text
              x="346"
              y="400"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,000 ÷ 540 = 1.85 h
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 142 L 680 142"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#pps-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 142 L 680 142"
            fill="none"
            stroke="url(#pps-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 329 L 655 329 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#pps-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 329 L 655 329 L 655 230 L 680 230"
            fill="none"
            stroke="url(#pps-viz-pulse)"
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
              FASTEST · WALL AC
            </text>
            <text
              x="706"
              y="152"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="pps-viz-output-value"
            >
              1h 51m
            </text>
            <text
              x="706"
              y="182"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              1.85 hours
            </text>

            <rect
              x="706"
              y="200"
              width="198"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="pps-viz-wall-bar"
              x="708"
              y="202"
              width="40"
              height="6"
              rx="1"
              fill="url(#pps-viz-bar)"
            />

            <text
              x="706"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COMPARE
            </text>

            <text
              x="706"
              y="280"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              Solar
            </text>
            <text
              x="888"
              y="280"
              textAnchor="end"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5h 34m
            </text>
            <rect
              x="706"
              y="290"
              width="198"
              height="8"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="pps-viz-solar-bar"
              x="708"
              y="292"
              width="110"
              height="4"
              rx="1"
              fill="#555555"
            />

            <text
              x="706"
              y="334"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              Car 12V
            </text>
            <text
              x="888"
              y="334"
              textAnchor="end"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              9h 16m
            </text>
            <rect
              x="706"
              y="344"
              width="198"
              height="8"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="pps-viz-car-bar"
              x="708"
              y="346"
              width="176"
              height="4"
              rx="1"
              fill="#444444"
            />

            <text
              x="706"
              y="400"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              hours = Wh ÷ (W × η)
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
              Wh ÷ (input W × η) → wall / car / solar hours
            </text>
            <text
              x="500"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="500"
              y="52"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1,000 Wh · 600 W wall · 90% → 1h 51m
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
