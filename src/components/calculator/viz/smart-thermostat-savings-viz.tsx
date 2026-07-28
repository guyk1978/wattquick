"use client";

import { cn } from "@/lib/utils";

interface SmartThermostatSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Smart Thermostat Savings [VIZ].
 * savedKwh = monthlyKwh × setback%; $ = savedKwh × rate.
 * Sample: 650 kWh/mo · 12% · $0.14/kWh → 78 kWh · $10.92/mo · ~$131/yr.
 */
export function SmartThermostatSavingsViz({
  className,
}: SmartThermostatSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--smart-thermostat-savings", className)}
      aria-label="Smart thermostat savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Smart Thermostat Savings</h3>
        <p className="tool-viz__subtitle">
          Scheduled setbacks trim HVAC kilowatt-hours — the savings percent
          scales monthly heating and cooling load into lower utility spend.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg smart-thermostat-savings-viz"
          role="img"
          aria-labelledby="sts-viz-title sts-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sts-viz-title">
            Smart thermostat savings animated flow diagram
          </title>
          <desc id="sts-viz-desc">
            Monthly heating and cooling kilowatt-hours, estimated setback
            savings percent, and electricity rate determine monthly energy and
            cost savings. Sample: 650 kilowatt-hours per month at 12 percent
            savings and 14 cents per kilowatt-hour saves 78 kilowatt-hours and
            10 dollars and 92 cents monthly, about 131 dollars per year.
          </desc>

          <defs>
            <pattern
              id="sts-viz-grid"
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
              id="sts-viz-arrow"
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
              id="sts-viz-pulse"
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
              id="sts-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="sts-viz-temp"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#sts-viz-grid)"
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

          {/* —— INPUT: Monthly kWh —— */}
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
              HVAC kWh / MO
            </text>
            <text
              className="sts-viz-kwh-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              650 kWh
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              heating + cooling
            </text>
          </g>

          {/* —— INPUT: Savings % —— */}
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
              EST. SAVINGS
            </text>
            <text
              className="sts-viz-pct-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12%
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              setback schedule (EPA ~8–15%)
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
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
              RATE · ADVANCED
            </text>
            <text
              className="sts-viz-rate-value"
              x="56"
              y="348"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="372"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              local utility tariff
            </text>
            <text
              x="56"
              y="390"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              electric HVAC only
            </text>
          </g>

          {/* Flow → setback path */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sts-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#sts-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sts-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="url(#sts-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sts-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="url(#sts-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Temperature setback path —— */}
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
              SETBACK · LOAD REDUCTION
            </text>

            {/* Thermostat dial */}
            <g className="sts-viz-thermo" transform="translate(372, 96)">
              <circle
                cx="48"
                cy="48"
                r="44"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="48"
                cy="48"
                r="28"
                fill="none"
                stroke="#333333"
                strokeWidth="1"
              />
              <line
                className="sts-viz-needle"
                x1="48"
                y1="48"
                x2="48"
                y2="18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="48" cy="48" r="4" fill="currentColor" />
              <text
                x="48"
                y="108"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                smart schedule
              </text>
            </g>

            {/* Temp setback curve */}
            <g transform="translate(500, 100)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                SETPOINT PROFILE
              </text>
              {/* Comfort baseline */}
              <line
                x1="0"
                y1="28"
                x2="120"
                y2="28"
                stroke="#444444"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x="124"
                y="31"
                fill="#666666"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                comfort
              </text>
              {/* Setback dip */}
              <path
                className="sts-viz-setback"
                d="M 0 28 L 24 28 L 40 56 L 88 56 L 104 28 L 120 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="64"
                y="76"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                night / away setback
              </text>
            </g>

            {/* Load bars: before vs after */}
            <g transform="translate(348, 220)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                MONTHLY LOAD
              </text>
              <text
                x="0"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                before
              </text>
              <rect
                x="56"
                y="18"
                width="220"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="sts-viz-before-bar"
                x="56"
                y="18"
                width="220"
                height="12"
                rx="2"
                fill="url(#sts-viz-bar)"
                opacity="0.55"
              />
              <text
                x="0"
                y="56"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                after
              </text>
              <rect
                x="56"
                y="46"
                width="220"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="sts-viz-after-bar"
                x="56"
                y="46"
                width="194"
                height="12"
                rx="2"
                fill="url(#sts-viz-temp)"
              />
              <text
                x="258"
                y="56"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                −12%
              </text>
            </g>

            {/* Formula */}
            <rect
              x="348"
              y="308"
              width="284"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="332"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              SAVED kWh
            </text>
            <text
              className="sts-viz-math-value"
              x="364"
              y="360"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              650 × 12% = 78 kWh/mo
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 200 L 700 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#sts-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 200 L 700 200"
            fill="none"
            stroke="url(#sts-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Monthly $ —— */}
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
              MONTHLY SAVINGS
            </text>
            <text
              className="sts-viz-output-value"
              x="726"
              y="118"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $10.92
            </text>
            <text
              x="726"
              y="146"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              78 kWh × $0.14
            </text>
            <rect
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="sts-viz-cost-bar"
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="url(#sts-viz-bar)"
            />
            <text
              className="sts-viz-detail-value"
              x="726"
              y="204"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              78 kWh saved / mo
            </text>
            <text
              x="726"
              y="224"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              learning schedules help
            </text>
          </g>

          {/* —— OUTPUT: Annual —— */}
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
              ANNUAL SAVINGS
            </text>
            <text
              className="sts-viz-year-value"
              x="726"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $131/yr
            </text>
            <text
              x="726"
              y="350"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $10.92 × 12
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
              className="sts-viz-year-bar"
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="url(#sts-viz-bar)"
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
              SETBACK DAY CYCLE
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
              className="sts-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="sts-viz-tick"
              cx="280"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="sts-viz-tick"
              cx="520"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="sts-viz-tick"
              cx="720"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="sts-viz-tick sts-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="sts-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#sts-viz-pulse)"
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
              morning comfort
            </text>
            <text
              x="520"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              away / night setback
            </text>
            <text
              className="sts-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              −12% HVAC · $10.92/mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
