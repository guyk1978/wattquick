"use client";

import { cn } from "@/lib/utils";

interface EvVsIceMaintenanceVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV vs ICE Maintenance [VIZ] tab.
 * Dual-track service costs over 5 years for a family sedan @ ~12k mi/yr.
 * Sample: ICE $5,250 · EV $1,950 · net savings $3,300 (battery outside window).
 */
export function EvVsIceMaintenanceViz({ className }: EvVsIceMaintenanceVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-vs-ice-maintenance", className)}
      aria-label="EV versus ICE maintenance cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV vs ICE Maintenance</h3>
        <p className="tool-viz__subtitle">
          Mileage and vehicle class scale scheduled service stacks—oil, belts,
          and friction brakes on ICE versus leaner regenerative-brake EV upkeep—
          into a multi-year cost gap.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-vs-ice-maintenance-viz"
          role="img"
          aria-labelledby="eim-viz-title eim-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="eim-viz-title">
            EV versus ICE maintenance cost comparison diagram
          </title>
          <desc id="eim-viz-desc">
            Annual distance and vehicle type feed dual maintenance tracks for
            gas and electric powertrains over five years. Sample: family sedan
            at about twelve thousand miles per year costs five thousand two
            hundred fifty dollars for ICE service versus one thousand nine
            hundred fifty dollars for EV service, saving three thousand three
            hundred dollars when battery replacement falls outside the window.
          </desc>

          <defs>
            <pattern
              id="eim-viz-grid"
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
              id="eim-viz-arrow"
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
              id="eim-viz-pulse"
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
              id="eim-viz-ice-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient
              id="eim-viz-ev-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#eim-viz-grid)"
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
            x="320"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DUAL SERVICE TRACKS
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            5-YR OUTPUT
          </text>

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="220"
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
              ANNUAL DISTANCE
            </text>
            <g
              transform="translate(56, 114)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            >
              <path
                d="M4 18 H10 L16 8 H38 L44 18 H50"
                strokeLinejoin="round"
                className="eim-viz-car"
              />
              <circle cx="18" cy="22" r="3.5" />
              <circle cx="38" cy="22" r="3.5" />
              <path d="M0 30 H54" strokeDasharray="4 3" className="eim-viz-road" />
            </g>
            <text
              x="56"
              y="168"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              19,312 km/yr
            </text>
            <text
              x="56"
              y="188"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 12,000 mi · scales intervals
            </text>
          </g>

          <g>
            <rect
              x="40"
              y="218"
              width="220"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VEHICLE TYPE
            </text>
            <text
              x="56"
              y="278"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Family sedan
            </text>
            <text
              x="56"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              compact · 1.0× cost class
            </text>
          </g>

          <g>
            <rect
              x="40"
              y="344"
              width="220"
              height="114"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="370"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HORIZON · PACK RISK
            </text>
            <text
              x="56"
              y="404"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 years
            </text>
            <text
              x="56"
              y="428"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack life 12 yrs · outside window
            </text>
          </g>

          {/* Flow → dual tracks */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#eim-viz-arrow)"
          >
            <path d="M 260 137 H 300 V 160 H 320" />
            <path d="M 260 273 H 300 V 300 H 320" />
            <path d="M 260 401 H 300 V 380 H 320" />
          </g>
          <g
            fill="none"
            stroke="url(#eim-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 260 137 H 300 V 160 H 320"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 260 273 H 300 V 300 H 320"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.6s" }}
              d="M 260 401 H 300 V 380 H 320"
              pathLength="100"
            />
          </g>

          {/* —— DUAL TRACKS —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="300"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="336"
              y="100"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SCHEDULED SERVICE STACK
            </text>

            {/* ICE track */}
            <rect
              x="336"
              y="116"
              width="268"
              height="150"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="352"
              y="140"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ICE TRACK · GAS POWERTRAIN
            </text>
            <text
              x="352"
              y="164"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              oil · filters · plugs · belt
            </text>
            <text
              x="352"
              y="182"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              fluids · friction brakes
            </text>
            <text
              x="352"
              y="208"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1,050 /yr
            </text>
            <rect
              x="352"
              y="222"
              width="236"
              height="14"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="eim-viz-bar-ice"
              x="354"
              y="224"
              width="232"
              height="10"
              rx="1"
              fill="url(#eim-viz-ice-bar)"
            />
            <text
              x="352"
              y="254"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              5-yr stack → $5,250
            </text>

            {/* EV track */}
            <rect
              x="336"
              y="284"
              width="268"
              height="154"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            <text
              x="352"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV TRACK · FEWER MOVING PARTS
            </text>
            <text
              x="352"
              y="332"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              regen brakes · cabin filter
            </text>
            <text
              x="352"
              y="350"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              pack coolant · tires · inspect
            </text>
            <text
              x="352"
              y="376"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $390 /yr
            </text>
            <rect
              x="352"
              y="390"
              width="236"
              height="14"
              rx="2"
              fill="#111111"
              stroke="#333333"
            />
            <rect
              className="eim-viz-bar-ev"
              x="354"
              y="392"
              width="86"
              height="10"
              rx="1"
              fill="url(#eim-viz-ev-bar)"
            />
            <text
              x="352"
              y="422"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              5-yr stack → $1,950
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#eim-viz-arrow)"
          >
            <path d="M 620 191 H 680" />
            <path d="M 620 361 H 680" />
          </g>
          <g
            fill="none"
            stroke="url(#eim-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 620 191 H 680"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 361 H 680"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="680"
              y="100"
              width="240"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="128"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ICE CUMULATIVE
            </text>
            <text
              x="696"
              y="164"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eim-viz-output-ice"
            >
              $5,250
            </text>
            <text
              x="696"
              y="186"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              5 × $1,050 scheduled
            </text>
          </g>

          <g>
            <rect
              x="680"
              y="218"
              width="240"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV CUMULATIVE
            </text>
            <text
              x="696"
              y="282"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eim-viz-output-ev"
            >
              $1,950
            </text>
            <text
              x="696"
              y="304"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              pack swap not in period
            </text>
          </g>

          <g>
            <rect
              x="680"
              y="336"
              width="240"
              height="122"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="696"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              NET MAINTENANCE SAVINGS
            </text>
            <text
              x="696"
              y="404"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="eim-viz-output-save"
            >
              $3,300
            </text>
            <text
              x="696"
              y="432"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $660 /yr · sedan · 5 yrs
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Savings = ICE stack − EV stack · pack replacement only if life ≤ horizon
          </text>
        </svg>
      </div>
    </section>
  );
}
