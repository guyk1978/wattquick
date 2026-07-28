"use client";

import { cn } from "@/lib/utils";

interface BatteryVoltageDropVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Voltage Drop [VIZ].
 * Auto AWG from ampacity; drop % from round-trip DC resistance.
 * Sample: 40 A · 15 ft one-way · 12 V → 8 AWG · 2.45 V (20.4%) · 9.55 V at load.
 */
export function BatteryVoltageDropViz({
  className,
}: BatteryVoltageDropVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-voltage-drop", className)}
      aria-label="Battery voltage drop visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DC Run · Voltage at Load</h3>
        <p className="tool-viz__subtitle">
          Current through copper round-trip resistance steals volts along the
          cable — what remains is the voltage your load actually sees.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-voltage-drop-viz"
          role="img"
          aria-labelledby="bvd-viz-title bvd-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bvd-viz-title">
            Battery voltage drop animated DC cable diagram
          </title>
          <desc id="bvd-viz-desc">
            Load current, one-way wire length, and system voltage determine
            recommended AWG and round-trip voltage drop. Sample: 40 amps over
            15 feet one-way on a 12 volt system recommends 8 AWG, drops 2.45
            volts or 20.4 percent, leaving 9.55 volts at the load.
          </desc>

          <defs>
            <pattern
              id="bvd-viz-grid"
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
              id="bvd-viz-arrow"
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
              id="bvd-viz-pulse"
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
              id="bvd-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bvd-viz-conductor"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="70%" stopColor="currentColor" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bvd-viz-grid)"
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
              width="220"
              height="100"
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
              LOAD CURRENT
            </text>
            <text
              className="bvd-viz-amps-value"
              x="56"
              y="110"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40 A
            </text>

            <rect
              x="40"
              y="152"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ONE-WAY LENGTH
            </text>
            <text
              className="bvd-viz-len-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 ft
            </text>

            <rect
              x="40"
              y="252"
              width="220"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM VOLTAGE
            </text>
            <text
              className="bvd-viz-v-value"
              x="56"
              y="320"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="56"
              y="344"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              copper · round-trip math
            </text>
          </g>

          {/* Flow → cable */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bvd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#bvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 196 L 290 196 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bvd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 196 L 290 196 L 290 140 L 310 140"
            fill="none"
            stroke="url(#bvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bvd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="url(#bvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Resistive path —— */}
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
              RESISTIVE-LOSS PATH
            </text>

            {/* Battery terminal */}
            <rect
              className="bvd-viz-battery"
              x="348"
              y="100"
              width="56"
              height="80"
              rx="4"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <text
              x="376"
              y="136"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="376"
              y="158"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              BAT
            </text>

            {/* Outbound conductor */}
            <line
              className="bvd-viz-wire"
              x1="404"
              y1="120"
              x2="580"
              y2="120"
              stroke="url(#bvd-viz-conductor)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              className="bvd-viz-current-flow"
              d="M 410 120 L 570 120"
              fill="none"
              stroke="url(#bvd-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              className="bvd-viz-length-dot"
              cx="492"
              cy="120"
              r="4"
              fill="currentColor"
            />
            <text
              x="492"
              y="108"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              15 ft · 8 AWG
            </text>

            {/* Load box */}
            <rect
              className="bvd-viz-load"
              x="580"
              y="100"
              width="56"
              height="80"
              rx="4"
              fill="#0a0a0a"
              stroke="#555555"
              strokeWidth="1.75"
            />
            <text
              className="bvd-viz-load-chip"
              x="608"
              y="136"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              9.55 V
            </text>
            <text
              x="608"
              y="158"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              LOAD
            </text>

            {/* Return conductor */}
            <line
              className="bvd-viz-wire"
              x1="580"
              y1="160"
              x2="404"
              y2="160"
              stroke="#444444"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              className="bvd-viz-current-flow bvd-viz-current-flow--return"
              d="M 570 160 L 410 160"
              fill="none"
              stroke="url(#bvd-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Drop callout */}
            <path
              className="bvd-viz-drop-mark"
              d="M 492 128 L 492 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="3 3"
            />
            <text
              className="bvd-viz-drop-chip"
              x="492"
              y="218"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −2.45 V
            </text>
            <text
              x="492"
              y="236"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              20.4% drop · I²R heat
            </text>

            {/* Gauge chip */}
            <rect
              x="348"
              y="268"
              width="288"
              height="68"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="294"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              AMPACITY → GAUGE
            </text>
            <text
              className="bvd-viz-math-value"
              x="364"
              y="320"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40 A → 8 AWG recommended
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 140 L 700 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bvd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 140 L 700 140"
            fill="none"
            stroke="url(#bvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 220 L 680 220 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bvd-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 220 L 680 220 L 680 280 L 700 280"
            fill="none"
            stroke="url(#bvd-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: V at load —— */}
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
              VOLTAGE AT LOAD
            </text>
            <text
              className="bvd-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              9.55 V
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              of 12.00 V source
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bvd-viz-vload-bar"
              x="726"
              y="168"
              width="129"
              height="12"
              rx="2"
              fill="url(#bvd-viz-bar)"
            />
            <text
              className="bvd-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              aim ≤3% on critical runs
            </text>
          </g>

          {/* —— OUTPUT: Drop —— */}
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
              TOTAL DROP
            </text>
            <text
              className="bvd-viz-drop-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2.45 V
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
              className="bvd-viz-drop-bar"
              x="726"
              y="324"
              width="132"
              height="10"
              rx="2"
              fill="#555555"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              20.4% · upsize gauge / shorten
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
              LONGER RUN · HIGHER A · THINNER WIRE → MORE SAG AT THE LOAD
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0%
            </text>
            <rect
              x="100"
              y="442"
              width="560"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            {/* 3% mark */}
            <line
              x1="117"
              y1="438"
              x2="117"
              y2="460"
              stroke="#666666"
              strokeWidth="1"
            />
            <text
              x="117"
              y="434"
              textAnchor="middle"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              3%
            </text>
            <rect
              className="bvd-viz-pct-bar"
              x="100"
              y="442"
              width="458"
              height="14"
              rx="2"
              fill="url(#bvd-viz-bar)"
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
              20.4%
            </text>
            <text
              x="680"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              excessive
            </text>

            <path
              className="bvd-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#bvd-viz-pulse)"
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
              one-way length · round-trip resistance
            </text>
            <text
              className="bvd-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              9.55 V · −2.45 V · 8 AWG
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
