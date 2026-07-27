"use client";

import { cn } from "@/lib/utils";

interface PoolEnergyThermalCoverVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Pool Energy & Thermal Cover [VIZ].
 * Pump kWh + evaporation heat demand → cover cuts thermal load → heating ÷ COP
 * → daily / monthly / annual cost & savings.
 * Sample: 1.5 kW · 8 h · $0.14/kWh · COP 5 · 40% cover → $1.88/day · $341/yr saved.
 */
export function PoolEnergyThermalCoverViz({
  className,
}: PoolEnergyThermalCoverVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--pool-energy-thermal-cover", className)}
      aria-label="Pool energy and thermal cover visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">
          Pool Energy Cost &amp; Thermal Cover Savings
        </h3>
        <p className="tool-viz__subtitle">
          Pump schedules set circulation energy; evaporation drives heater
          demand. A thermal cover blocks surface heat loss so the heat pump
          runs less — cutting daily spend and annual operating cost.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg pool-energy-thermal-cover-viz"
          role="img"
          aria-labelledby="petc-viz-title petc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="petc-viz-title">
            Pool energy and thermal cover animated flow diagram
          </title>
          <desc id="petc-viz-desc">
            Pool pump power and run hours produce daily pump kilowatt-hours.
            Evaporation heat demand feeds a heater path. A thermal cover reduces
            that demand before COP converts heat into grid energy. Sample: 1.5
            kilowatt pump, 8 hours per day, 14 cents per kilowatt-hour, COP 5,
            and a 40 percent cover yield about 1 dollar 88 cents per day with
            roughly 341 dollars total annual savings versus open water and
            resistance heat.
          </desc>

          <defs>
            <pattern
              id="petc-viz-grid"
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
              id="petc-viz-arrow"
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
              id="petc-viz-pulse"
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
              id="petc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="petc-viz-water"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient
              id="petc-viz-heat-up"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#petc-viz-grid)"
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
            THERMAL · COVER PATH
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

          {/* —— INPUT: Pump —— */}
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
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POOL PUMP
            </text>
            <text
              x="56"
              y="134"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.5 kW
            </text>
            <text
              x="56"
              y="158"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate draw
            </text>
          </g>

          {/* —— INPUT: Hours —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RUN HOURS
            </text>
            <text
              x="56"
              y="250"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 hrs/day
            </text>
            <text
              x="56"
              y="274"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              filtration schedule
            </text>
          </g>

          {/* —— INPUT: Rate + COP + Cover —— */}
          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="330"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATE · HEAT · COVER
            </text>
            <text
              x="56"
              y="362"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="388"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              COP 5 · cover −40%
            </text>
            <text
              x="56"
              y="410"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              heat pump · idle cover
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            d="M 270 122 L 320 122"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#petc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#petc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#petc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 270 238 L 295 238 L 295 200 L 320 200"
            fill="none"
            stroke="url(#petc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 364 L 295 364 L 295 280 L 320 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#petc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 364 L 295 364 L 295 280 L 320 280"
            fill="none"
            stroke="url(#petc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— MID: Pump kWh —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="280"
              height="110"
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
              PUMP ENERGY
            </text>
            <text
              x="346"
              y="128"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              kW × hrs/day
            </text>
            <text
              x="346"
              y="162"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="petc-viz-pump-value"
            >
              12.0 kWh/day
            </text>
          </g>

          {/* —— MID: Pool + evaporation / cover —— */}
          <g>
            <rect
              x="330"
              y="200"
              width="280"
              height="210"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="226"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SURFACE HEAT BALANCE
            </text>

            {/* Pool basin glyph */}
            <g transform="translate(360, 248)">
              <rect
                className="petc-viz-pool"
                x="0"
                y="28"
                width="120"
                height="52"
                rx="3"
                fill="url(#petc-viz-water)"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                className="petc-viz-wave"
                d="M 8 44 Q 20 38 32 44 T 56 44 T 80 44 T 104 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.85"
              />
              <path
                className="petc-viz-wave petc-viz-wave--delay"
                d="M 8 56 Q 20 50 32 56 T 56 56 T 80 56 T 104 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.55"
              />
              {/* Evaporation rising */}
              <path
                className="petc-viz-vapor"
                d="M 30 24 Q 34 12 38 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                className="petc-viz-vapor"
                d="M 54 22 Q 58 8 62 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.7"
              />
              <path
                className="petc-viz-vapor"
                d="M 78 24 Q 82 12 86 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.45"
              />
              {/* Thermal cover sliding over */}
              <rect
                className="petc-viz-cover"
                x="4"
                y="22"
                width="112"
                height="8"
                rx="1"
                fill="currentColor"
                fillOpacity="0.35"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="60"
                y="98"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                cover on idle
              </text>
            </g>

            <text
              x="500"
              y="270"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              HEAT DEMAND
            </text>
            <text
              x="500"
              y="298"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 → 7.2 kWh
            </text>
            <text
              x="500"
              y="322"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              −40% evaporation
            </text>

            <rect
              x="500"
              y="340"
              width="90"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="petc-viz-loss-bar"
              x="502"
              y="342"
              width="54"
              height="6"
              rx="1"
              fill="url(#petc-viz-bar)"
            />

            <text
              x="346"
              y="390"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              heating grid = demand ÷ COP 5 → 1.44 kWh
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 610 127 L 680 127"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#petc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 610 127 L 680 127"
            fill="none"
            stroke="url(#petc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 610 305 L 645 305 L 645 220 L 680 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#petc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 610 305 L 645 305 L 645 220 L 680 220"
            fill="none"
            stroke="url(#petc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="352"
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
              DAILY COST
            </text>
            <text
              x="706"
              y="148"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="petc-viz-output-value"
            >
              $1.88
            </text>
            <text
              x="706"
              y="176"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              with cover · COP 5
            </text>

            <rect
              x="706"
              y="196"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="petc-viz-output-bar"
              x="708"
              y="198"
              width="150"
              height="8"
              rx="1"
              fill="url(#petc-viz-bar)"
            />

            <text
              x="706"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY SAVINGS
            </text>
            <text
              x="706"
              y="278"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="petc-viz-month-value"
            >
              $28.39
            </text>
            <text
              x="706"
              y="302"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cover + HP vs resistance
            </text>

            <text
              x="706"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL SAVINGS
            </text>
            <text
              x="706"
              y="378"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="petc-viz-year-value"
            >
              $341.38
            </text>
            <text
              x="706"
              y="404"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              open pool without cover: $2.02/day
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
              pump kWh + (heat demand × cover) ÷ COP → $ cost · savings
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
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1.5 kW · 8 h · $0.14 · COP 5 · −40% → $341/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
