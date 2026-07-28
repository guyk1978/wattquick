"use client";

import { cn } from "@/lib/utils";

interface InverterLoadingCurveVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Inverter Loading Curve [VIZ].
 * Derated = nominal × (1 − (T−25)×0.01); shutdown from overload curve.
 * Sample: 2,000 W · 2,400 W load · 30°C · standard → 1,900 W derated ·
 * 126% · ~5 min to overload shutdown.
 */
export function InverterLoadingCurveViz({
  className,
}: InverterLoadingCurveVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--inverter-loading-curve", className)}
      aria-label="Inverter loading curve visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Loading Curve · Overload Window</h3>
        <p className="tool-viz__subtitle">
          Ambient derating shrinks continuous headroom; sustained load above
          that threshold starts a countdown to thermal overload shutdown.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg inverter-loading-curve-viz"
          role="img"
          aria-labelledby="ilcv-viz-title ilcv-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ilcv-viz-title">
            Inverter loading curve animated overload diagram
          </title>
          <desc id="ilcv-viz-desc">
            Nominal inverter power is thermally derated by ambient temperature,
            then compared to sustained AC load on the manufacturer overload
            curve to estimate time to shutdown. Sample: a 2,000 watt inverter
            at 30 degrees Celsius derates to 1,900 watts; a 2,400 watt load is
            126 percent of derated capacity with about 5 minutes to overload
            shutdown.
          </desc>

          <defs>
            <pattern
              id="ilcv-viz-grid"
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
              id="ilcv-viz-arrow"
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
              id="ilcv-viz-pulse"
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
              id="ilcv-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ilcv-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#555555" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ilcv-viz-grid)"
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
              NOMINAL POWER
            </text>
            <text
              className="ilcv-viz-nom-value"
              x="56"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,000 W
            </text>

            <rect
              x="40"
              y="152"
              width="220"
              height="100"
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
              CURRENT LOAD
            </text>
            <text
              className="ilcv-viz-load-value"
              x="56"
              y="220"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,400 W
            </text>

            <rect
              x="40"
              y="264"
              width="220"
              height="96"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="290"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AMBIENT · PROFILE
            </text>
            <text
              className="ilcv-viz-temp-value"
              x="56"
              y="326"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30°C · std
            </text>
            <text
              x="56"
              y="348"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              −1%/°C above 25°C
            </text>
          </g>

          {/* Flow → curve */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilcv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#ilcv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 200 L 290 200 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilcv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 200 L 290 200 L 290 140 L 310 140"
            fill="none"
            stroke="url(#ilcv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilcv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 310 L 290 310 L 290 220 L 310 220"
            fill="none"
            stroke="url(#ilcv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Curve / derate —— */}
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
              THERMAL / OVERLOAD PATH
            </text>

            {/* Derating chip */}
            <rect
              x="336"
              y="84"
              width="308"
              height="44"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="ilcv-viz-math-value"
              x="352"
              y="112"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,000 × 0.95 = 1,900 W derated
            </text>

            {/* Curve axes */}
            <line
              x1="360"
              y1="280"
              x2="640"
              y2="280"
              stroke="#333333"
              strokeWidth="1"
            />
            <line
              x1="360"
              y1="280"
              x2="360"
              y2="150"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="360"
              y="298"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              100%
            </text>
            <text
              x="500"
              y="298"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              120%
            </text>
            <text
              x="600"
              y="298"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              140%
            </text>
            <text
              x="336"
              y="160"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              time
            </text>

            {/* Overload curve: high time at 100%, falling to minutes */}
            <path
              className="ilcv-viz-curve"
              d="M 360 155 C 400 158, 440 170, 480 200 C 520 235, 560 255, 620 268"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className="ilcv-viz-curve-pulse"
              d="M 360 155 C 400 158, 440 170, 480 200 C 520 235, 560 255, 620 268"
              fill="none"
              stroke="url(#ilcv-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Operating point at ~126% */}
            <circle
              className="ilcv-viz-op-point"
              cx="520"
              cy="235"
              r="6"
              fill="currentColor"
            />
            <line
              className="ilcv-viz-op-drop"
              x1="520"
              y1="235"
              x2="520"
              y2="280"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              className="ilcv-viz-pct-chip"
              x="528"
              y="228"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              126%
            </text>

            {/* Heat / countdown */}
            <path
              className="ilcv-viz-heat"
              d="M 580 180 L 580 205 M 600 175 L 600 210 M 620 180 L 620 205"
              fill="none"
              stroke="url(#ilcv-viz-heat)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Threshold table chips */}
            <text
              x="336"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              100% cont · 110% ~60 min · 120% ~10 min
            </text>
            <text
              className="ilcv-viz-warn-chip"
              x="336"
              y="348"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              short overload window
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 160 L 700 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilcv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 160 L 700 160"
            fill="none"
            stroke="url(#ilcv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#ilcv-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#ilcv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Shutdown —— */}
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
              TIME TO SHUTDOWN
            </text>
            <text
              className="ilcv-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ~5 min
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              overload countdown
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
              className="ilcv-viz-timer-bar"
              x="726"
              y="168"
              width="54"
              height="12"
              rx="2"
              fill="url(#ilcv-viz-bar)"
            />
            <text
              className="ilcv-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              not continuous-safe
            </text>
          </g>

          {/* —— OUTPUT: Status —— */}
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
              LOAD vs DERATED
            </text>
            <text
              className="ilcv-viz-pct-out"
              x="726"
              y="304"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              126%
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
              className="ilcv-viz-pct-bar"
              x="726"
              y="324"
              width="148"
              height="10"
              rx="2"
              fill="url(#ilcv-viz-bar)"
            />
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              of 1,900 W continuous
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
              HIGHER % LOAD · SHORTER WINDOW BEFORE AUTO SHUTDOWN
            </text>

            {/* Countdown track */}
            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              60 min
            </text>
            <rect
              x="120"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="ilcv-viz-window-bar"
              x="120"
              y="442"
              width="43"
              height="14"
              rx="2"
              fill="url(#ilcv-viz-bar)"
            />
            <text
              x="145"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              ~5
            </text>
            <text
              x="652"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              0 · trip
            </text>

            <path
              className="ilcv-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#ilcv-viz-pulse)"
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
              shed load or upsize before sustained run
            </text>
            <text
              className="ilcv-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              1,900 W derated · 126% · ~5 min
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
