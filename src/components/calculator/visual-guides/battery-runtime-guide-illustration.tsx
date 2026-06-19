"use client";

import { cn } from "@/lib/utils";

interface BatteryRuntimeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: inputs (mAh, V, W) → Wh ÷ W → runtime.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryRuntimeGuideIllustration({
  className,
}: BatteryRuntimeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-runtime-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="battery-rt-guide-title battery-rt-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="battery-rt-guide-title">Battery runtime flow diagram</title>
      <desc id="battery-rt-guide-desc">
        Inputs: battery capacity in milliamp-hours, nominal voltage, and load
        power in watts. Process: convert to watt-hours then divide by power
        draw. Output: estimated battery runtime in hours and minutes.
      </desc>

      <defs>
        <pattern
          id="bp-rt-grid-minor"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            opacity="0.12"
          />
        </pattern>
        <pattern
          id="bp-rt-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-rt-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-rt-pencil" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
            in="noise"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      <rect
        width="720"
        height="420"
        fill="url(#bp-rt-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="396"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.35"
        rx="1"
      />

      <text
        x="36"
        y="44"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
        opacity="0.55"
      >
        FIG. 1 — BATTERY RUNTIME
      </text>
      <path
        d="M 34 52 H 228"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="40"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      {/* mAh */}
      <g
        filter="url(#bp-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 92 44 92 H 100 Q 106 92 108 98 V 132 Q 106 138 100 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <rect
          x="42"
          y="108"
          width="60"
          height="22"
          strokeWidth="0.9"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <text
          x="52"
          y="122"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          mAh
        </text>
      </g>
      <text
        x="36"
        y="154"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Capacity (mAh)
      </text>

      {/* Voltage */}
      <g
        filter="url(#bp-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 166 Q 38 162 44 162 H 100 Q 106 162 108 168 V 202 Q 106 208 100 208 H 44 Q 38 208 36 202 Z"
          strokeWidth="1.1"
        />
        <text
          x="58"
          y="190"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          stroke="none"
        >
          V
        </text>
        <path d="M 48 176 L 56 184 L 88 172" strokeWidth="1" />
      </g>
      <text
        x="36"
        y="224"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Nominal voltage (V)
      </text>

      {/* Power draw */}
      <g
        filter="url(#bp-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 236 Q 38 232 44 232 H 100 Q 106 232 108 238 V 272 Q 106 278 100 278 H 44 Q 38 278 36 272 Z"
          strokeWidth="1.1"
        />
        <circle cx="58" cy="254" r="8" strokeWidth="1" />
        <path d="M 58 246 V 262 M 50 254 H 66" strokeWidth="1" />
        <text
          x="72"
          y="258"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          W
        </text>
      </g>
      <text
        x="36"
        y="294"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Power draw (W)
      </text>

      <text
        x="36"
        y="318"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        e.g. 5,000 mAh · 3.7 V · 10 W
      </text>

      {/* Arrows */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 118 118 H 198" strokeLinecap="round" />
        <path d="M 194 114 L 202 118 L 194 122" strokeLinejoin="round" />
        <path d="M 118 188 H 198" strokeLinecap="round" />
        <path d="M 194 184 L 202 188 L 194 192" />
        <path d="M 118 254 H 198" strokeLinecap="round" />
        <path d="M 194 250 L 202 254 L 194 258" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 96 Q 220 90 228 90 H 452 Q 460 90 462 98 V 318 Q 460 326 452 326 H 228 Q 220 326 218 318 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="118"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1. mAh → Wh (energy)
        </text>
        <text
          x="256"
          y="142"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh = (mAh × V) ÷ 1,000
        </text>
        <text
          x="256"
          y="166"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          5,000 × 3.7 ÷ 1,000 = 18.5 Wh
        </text>

        <path d="M 238 182 H 430" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="204"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2. Wh ÷ load watts
        </text>
        <text
          x="256"
          y="228"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          runtime (h) = Wh ÷ W
        </text>
        <text
          x="256"
          y="252"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          18.5 ÷ 10 = 1.85 h
        </text>

        <text
          x="256"
          y="286"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          lower W → longer runtime
        </text>
        <text
          x="256"
          y="304"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          mAh alone needs voltage for energy
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 472 210 H 518" strokeLinecap="round" />
        <path d="M 514 206 L 522 210 L 514 214" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Clock sketch */}
        <circle cx="611" cy="178" r="42" strokeWidth="1.2" />
        <line x1="611" y1="178" x2="611" y2="148" strokeWidth="1.3" />
        <line x1="611" y1="178" x2="638" y2="192" strokeWidth="1.1" />
        <circle cx="611" cy="178" r="3" fill="currentColor" stroke="none" />

        <text
          x="611"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          1h 51m
        </text>
        <text
          x="611"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          estimated runtime
        </text>
        <text
          x="611"
          y="298"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          (1.85 hours)
        </text>
      </g>

      {/* Energy depletion timeline */}
      <g
        filter="url(#bp-rt-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text
          x="48"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          100%
        </text>
        <line x1="72" y1="376" x2="640" y2="376" strokeWidth="0.8" />
        <rect
          x="72"
          y="370"
          width="280"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <line x1="352" y1="364" x2="352" y2="388" strokeWidth="1" />
        <text
          x="356"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          empty @ ~1.85 h
        </text>
        <path d="M 640 376 L 648 372 L 648 380 Z" fill="currentColor" stroke="none" opacity="0.5" />
        <text
          x="600"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          time →
        </text>
      </g>
    </svg>
  );
}
