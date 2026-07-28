"use client";

import { cn } from "@/lib/utils";

interface EscooterConnectorLossVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Connector Power Loss [VIZ].
 * lossW = I² × (R_mΩ / 1000); lossWh = lossW × min / 60.
 * Sample: 30 A · XT60 0.8 mΩ · 30 min → 0.72 W · 0.36 Wh.
 */
export function EscooterConnectorLossViz({
  className,
}: EscooterConnectorLossVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-connector-loss", className)}
      aria-label="E-scooter connector power loss visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">I²R Contact · Heat Waste</h3>
        <p className="tool-viz__subtitle">
          Ride current through plug contacts dissipates as thermal watts — session
          minutes turn that heating into watt-hours lost at the connector.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-connector-loss-viz"
          role="img"
          aria-labelledby="escl-viz-title escl-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="escl-viz-title">
            E-scooter connector power loss I-squared-R diagram
          </title>
          <desc id="escl-viz-desc">
            Current draw through connector contact resistance produces thermal
            power loss equal to current squared times resistance. Sample: 30
            amps through an XT60 at 0.8 milliohm over a 30 minute session yields
            0.72 watts of heat and 0.36 watt-hours of energy waste.
          </desc>

          <defs>
            <pattern
              id="escl-viz-grid"
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
              id="escl-viz-arrow"
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
              id="escl-viz-pulse"
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
              id="escl-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient
              id="escl-viz-loss"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="escl-viz-energy"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#escl-viz-grid)"
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

          {/* —— INPUT: Current draw —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="200"
              height="108"
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
              CURRENT DRAW
            </text>
            <text
              className="escl-viz-a-value"
              x="56"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 A
            </text>
            <text
              x="56"
              y="132"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ride / charge amps
            </text>
          </g>

          {/* —— INPUT: Connector type —— */}
          <g>
            <rect
              x="260"
              y="40"
              width="200"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="276"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONNECTOR TYPE
            </text>
            <text
              className="escl-viz-conn-value"
              x="276"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              XT60
            </text>
            <text
              x="276"
              y="132"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~0.8 mΩ contact
            </text>
          </g>

          {/* —— INPUT: Session duration —— */}
          <g>
            <rect
              x="480"
              y="40"
              width="200"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="496"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SESSION DURATION
            </text>
            <text
              className="escl-viz-min-value"
              x="496"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 min
            </text>
            <text
              x="496"
              y="132"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              runtime window
            </text>
          </g>

          {/* Flow: inputs → path */}
          <path
            d="M 140 148 L 140 176 L 480 176"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 140 148 L 140 176 L 480 176"
            fill="none"
            stroke="url(#escl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 360 148 L 360 176"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 360 148 L 360 176"
            fill="none"
            stroke="url(#escl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 580 148 L 580 176 L 480 176"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay-2"
            d="M 580 148 L 580 176 L 480 176"
            fill="none"
            stroke="url(#escl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— CENTER: I²R path schematic —— */}
          <g>
            <rect
              x="40"
              y="196"
              width="640"
              height="200"
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
              CONTACT PATH · P = I² × R
            </text>

            {/* Pack side */}
            <g className="escl-viz-pack" transform="translate(64, 260)">
              <rect
                x="0"
                y="0"
                width="72"
                height="88"
                rx="3"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <rect
                x="18"
                y="-8"
                width="14"
                height="8"
                fill="none"
                stroke="#444444"
                strokeWidth="1.25"
              />
              <rect
                x="40"
                y="-8"
                width="14"
                height="8"
                fill="none"
                stroke="#444444"
                strokeWidth="1.25"
              />
              <text
                x="36"
                y="48"
                textAnchor="middle"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                PACK
              </text>
            </g>

            {/* Current flow to connector */}
            <path
              d="M 150 304 L 230 304"
              fill="none"
              stroke="#444444"
              strokeWidth="2"
              markerEnd="url(#escl-viz-arrow)"
            />
            <path
              className="escl-viz-current-flow"
              d="M 150 304 L 230 304"
              fill="none"
              stroke="url(#escl-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              className="escl-viz-a-chip"
              x="190"
              y="290"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 A
            </text>

            {/* XT60 plug pair */}
            <g className="escl-viz-plug" transform="translate(246, 268)">
              <rect
                x="0"
                y="0"
                width="48"
                height="36"
                rx="2"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <rect
                x="56"
                y="0"
                width="48"
                height="36"
                rx="2"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <circle className="escl-viz-pin" cx="16" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle className="escl-viz-pin" cx="32" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle className="escl-viz-pin" cx="72" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle className="escl-viz-pin" cx="88" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Mating gap / contact */}
              <line
                className="escl-viz-contact"
                x1="48"
                y1="8"
                x2="56"
                y2="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                className="escl-viz-contact"
                x1="48"
                y1="28"
                x2="56"
                y2="28"
                stroke="currentColor"
                strokeWidth="2"
              />
              <text
                x="52"
                y="58"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                XT60 · 0.8 mΩ
              </text>
            </g>

            {/* Heat rising from contact */}
            <g className="escl-viz-heat" transform="translate(286, 232)">
              <path
                d="M 0 28 Q -6 14 0 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 12 28 Q 18 14 12 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M 24 28 Q 18 14 24 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                opacity="0.55"
              />
              <text
                x="12"
                y="-8"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                heat
              </text>
            </g>

            {/* Flow to load */}
            <path
              d="M 366 304 L 446 304"
              fill="none"
              stroke="#444444"
              strokeWidth="2"
              markerEnd="url(#escl-viz-arrow)"
            />
            <path
              className="escl-viz-current-flow escl-viz-current-flow--delay"
              d="M 366 304 L 446 304"
              fill="none"
              stroke="url(#escl-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Controller / motor load */}
            <g className="escl-viz-load" transform="translate(460, 268)">
              <rect
                x="0"
                y="0"
                width="88"
                height="72"
                rx="3"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <circle cx="28" cy="36" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M 28 26 L 28 46 M 21 36 L 35 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="62"
                y="40"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                ESC
              </text>
            </g>

            {/* Formula + compare chips */}
            <rect
              x="56"
              y="352"
              width="220"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="escl-viz-math-value"
              x="166"
              y="373"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30² × 0.0008 = 0.72 W
            </text>

            <rect
              x="292"
              y="352"
              width="220"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="escl-viz-compare-value"
              x="402"
              y="373"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              XT30 @ 30 A → 1.35 W
            </text>

            <text
              x="540"
              y="373"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              larger plug · cooler contact
            </text>
          </g>

          {/* Flow: center → outputs */}
          <path
            d="M 680 260 L 700 260"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 260 L 700 260"
            fill="none"
            stroke="url(#escl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#escl-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#escl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Power loss —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONNECTOR LOSS
            </text>
            <text
              className="escl-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.72 W
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              I²R thermal dissipation
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="escl-viz-loss-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#escl-viz-loss)"
            />
            <text
              className="escl-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              fine for XT60 · watch XT30
            </text>
          </g>

          {/* —— OUTPUT: Session waste —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SESSION WASTE
            </text>
            <text
              className="escl-viz-energy-out"
              x="716"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.36 Wh
            </text>
            <rect
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="escl-viz-energy-bar"
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="url(#escl-viz-energy)"
            />
            <text
              className="escl-viz-detail-value"
              x="716"
              y="378"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              0.72 W × 30 min ÷ 60
            </text>
          </g>

          {/* —— Footer: plug size ladder —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PLUG LADDER @ 30 A · LOWER R → COOLER CONTACT
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
              className="escl-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="escl-viz-tick"
              cx="360"
              cy="478"
              r="5"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="escl-viz-tick escl-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="escl-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#escl-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              XT30 · 1.5 mΩ · 1.35 W
            </text>
            <text
              x="360"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              XT60 · 0.8 mΩ · 0.72 W
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              XT90 · 0.5 mΩ · 0.45 W
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
