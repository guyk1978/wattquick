"use client";

import { cn } from "@/lib/utils";

interface BatteryDodEnergyYieldVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery DoD to Energy Yield [VIZ].
 * Usable kWh = nominal × (DoD ÷ 100).
 * Sample: 10 kWh · 80% DoD → 8 kWh · 8,000 Wh · 2 kWh reserve.
 */
export function BatteryDodEnergyYieldViz({
  className,
}: BatteryDodEnergyYieldVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-dod-energy-yield", className)}
      aria-label="Battery depth of discharge to energy yield visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DoD → Usable Energy Yield</h3>
        <p className="tool-viz__subtitle">
          Nominal bank capacity scaled by max safe depth of discharge sets the
          usable kWh you can pull before the reserve floor.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-dod-energy-yield-viz"
          role="img"
          aria-labelledby="bdey-viz-title bdey-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bdey-viz-title">
            Battery DoD to energy yield animated capacity diagram
          </title>
          <desc id="bdey-viz-desc">
            Nominal capacity in kilowatt-hours multiplied by depth of discharge
            percent yields usable energy. Sample: a 10 kilowatt-hour bank at 80
            percent DoD delivers 8 kilowatt-hours or 8,000 watt-hours usable,
            with 2 kilowatt-hours reserved.
          </desc>

          <defs>
            <pattern
              id="bdey-viz-grid"
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
              id="bdey-viz-arrow"
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
              id="bdey-viz-pulse"
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
              id="bdey-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bdey-viz-usable"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="bdey-viz-reserve"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#555555" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#333333" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bdey-viz-grid)"
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

          {/* —— INPUT: Nominal —— */}
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
              NOMINAL CAPACITY
            </text>
            <text
              className="bdey-viz-nom-value"
              x="56"
              y="114"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 kWh
            </text>
            <text
              x="56"
              y="142"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate bank energy
            </text>
            <text
              x="56"
              y="164"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              LiFePO₄ · AGM · NMC
            </text>
            <text
              x="56"
              y="182"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              gross storage before DoD
            </text>
          </g>

          {/* —— INPUT: DoD —— */}
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
              DEPTH OF DISCHARGE
            </text>
            <text
              className="bdey-viz-dod-value"
              x="56"
              y="292"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80%
            </text>
            <text
              x="56"
              y="320"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              max safe cycle depth
            </text>
            <text
              x="56"
              y="342"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              Li often 80–90% · Pb ~50%
            </text>
          </g>

          {/* Flow → pack */}
          <path
            d="M 260 120 L 310 120"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bdey-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 120 L 310 120"
            fill="none"
            stroke="url(#bdey-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 200 L 310 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bdey-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 290 L 290 290 L 290 200 L 310 200"
            fill="none"
            stroke="url(#bdey-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Capacity pack —— */}
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
              CAPACITY DEPLETION PATH
            </text>

            {/* Battery outline */}
            <rect
              className="bdey-viz-pack"
              x="400"
              y="88"
              width="180"
              height="200"
              rx="6"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Terminal */}
            <rect
              x="460"
              y="76"
              width="60"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#444444"
            />

            {/* Usable zone — top 80% of pack fill height (~160px of 184 inner) */}
            <rect
              className="bdey-viz-usable-fill"
              x="412"
              y="100"
              width="156"
              height="148"
              rx="3"
              fill="url(#bdey-viz-usable)"
            />
            {/* Reserve floor — bottom 20% */}
            <rect
              className="bdey-viz-reserve-fill"
              x="412"
              y="248"
              width="156"
              height="28"
              rx="3"
              fill="url(#bdey-viz-reserve)"
            />

            {/* DoD limit line */}
            <line
              className="bdey-viz-dod-line"
              x1="400"
              y1="248"
              x2="580"
              y2="248"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x="590"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              DoD floor
            </text>
            <text
              className="bdey-viz-usable-chip"
              x="490"
              y="172"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 kWh usable
            </text>
            <text
              className="bdey-viz-reserve-chip"
              x="490"
              y="268"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              2 kWh reserve
            </text>

            {/* Formula chip */}
            <rect
              x="348"
              y="308"
              width="284"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="bdey-viz-math-value"
              x="362"
              y="332"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 × (80 ÷ 100) = 8 kWh
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bdey-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#bdey-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bdey-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#bdey-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Usable kWh —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
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
              USABLE ENERGY
            </text>
            <text
              className="bdey-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 kWh
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              deliverable to loads
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
              className="bdey-viz-yield-bar"
              x="726"
              y="160"
              width="130"
              height="12"
              rx="2"
              fill="url(#bdey-viz-bar)"
            />
            <text
              className="bdey-viz-detail-value"
              x="726"
              y="196"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              80% of nameplate
            </text>
          </g>

          {/* —— OUTPUT: Wh + runtime cue —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EQUIVALENT YIELD
            </text>
            <text
              className="bdey-viz-wh-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8,000 Wh
            </text>
            <rect
              x="726"
              y="324"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bdey-viz-wh-bar"
              x="726"
              y="324"
              width="130"
              height="10"
              rx="2"
              fill="url(#bdey-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              runtime budget · critical loads
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
              DoD LIMITS AVAILABLE YIELD · RESERVE STAYS BELOW THE FLOOR
            </text>

            {/* DoD scale */}
            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              DoD 10%
            </text>
            <rect
              x="128"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bdey-viz-dod-bar"
              x="128"
              y="442"
              width="400"
              height="14"
              rx="2"
              fill="url(#bdey-viz-bar)"
            />
            <text
              x="500"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              80%
            </text>
            <text
              x="660"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              DoD 100%
            </text>

            <path
              className="bdey-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#bdey-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              deeper DoD → more yield · less reserve
            </text>
            <text
              className="bdey-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              8 kWh · 8,000 Wh · 2 kWh reserve
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
