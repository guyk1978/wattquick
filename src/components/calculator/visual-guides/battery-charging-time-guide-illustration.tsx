"use client";

import { cn } from "@/lib/utils";

interface BatteryChargingTimeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: mAh + charge mA + η → charge hours.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryChargingTimeGuideIllustration({
  className,
}: BatteryChargingTimeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-charging-time-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bct-guide-title bct-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bct-guide-title">Battery charging time flow diagram</title>
      <desc id="bct-guide-desc">
        Inputs: battery capacity in milliamp-hours, charger current in milliamps,
        and charge efficiency. Process: base time equals capacity divided by
        charge current, adjusted for heat loss and taper. Output: estimated
        charge time in hours and minutes.
      </desc>

      <defs>
        <pattern
          id="bp-bct-grid-minor"
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
          id="bp-bct-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bct-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bct-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bct-grid-major)"
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
        FIG. 1 — BATTERY CHARGING TIME
      </text>
      <path
        d="M 34 52 H 320"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="36"
        y="84"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      {/* Capacity mAh */}
      <g
        filter="url(#bp-bct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 92 44 92 H 108 Q 114 92 116 98 V 132 Q 114 138 108 138 H 44 Q 38 138 36 132 Z"
          strokeWidth="1.1"
        />
        <rect
          x="42"
          y="104"
          width="28"
          height="24"
          strokeWidth="0.9"
          rx="2"
        />
        <path d="M 50 110 H 62 M 50 116 H 62 M 50 122 H 62" strokeWidth="0.5" opacity="0.6" />
        <text
          x="78"
          y="122"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          5,000
        </text>
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          pack
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

      {/* Charger current mA */}
      <g
        filter="url(#bp-bct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 166 Q 38 162 44 162 H 108 Q 114 162 116 168 V 202 Q 114 208 108 208 H 44 Q 38 208 36 202 Z"
          strokeWidth="1.1"
        />
        <rect x="48" y="174" width="24" height="18" strokeWidth="0.8" rx="1" />
        <path d="M 54 183 H 66 M 60 177 V 189" strokeWidth="0.6" />
        <path d="M 78 176 L 86 188 L 94 176" strokeWidth="1" />
        <text
          x="78"
          y="198"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2,000 mA
        </text>
      </g>
      <text
        x="36"
        y="224"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Charger current (mA)
      </text>

      {/* Charge efficiency */}
      <g
        filter="url(#bp-bct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 236 Q 38 232 44 232 H 108 Q 114 232 116 238 V 272 Q 114 278 108 278 H 44 Q 38 278 36 272 Z"
          strokeWidth="1.1"
        />
        <path d="M 48 252 H 100" strokeWidth="0.8" />
        <path d="M 48 252 H 88" strokeWidth="1.2" />
        <text
          x="48"
          y="246"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          charge η
        </text>
        <text
          x="48"
          y="268"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          90%
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
        Charge efficiency (%)
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
        e.g. 5,000 mAh · 2 A · 90%
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 126 118 H 198" strokeLinecap="round" />
        <path d="M 194 114 L 202 118 L 194 122" strokeLinejoin="round" />
        <path d="M 126 188 H 198" strokeLinecap="round" />
        <path d="M 194 184 L 202 188 L 194 192" />
        <path d="M 126 254 H 198" strokeLinecap="round" />
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
        filter="url(#bp-bct-pencil)"
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
          1. Base charge rate
        </text>
        <text
          x="256"
          y="142"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          t = mAh ÷ mA
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
          5,000 ÷ 2,000 = 2.5 h
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
          2. Adjust for losses
        </text>
        <text
          x="256"
          y="228"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          t ÷ (η ÷ 100)
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
          2.5 ÷ 0.90 = 2.78 h
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
          lower η → longer wall time
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
          taper above ~80% SOC adds time
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
        filter="url(#bp-bct-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Charger → battery flow */}
        <rect x="548" y="108" width="24" height="18" strokeWidth="0.8" rx="1" />
        <path d="M 554 117 H 566 M 560 111 V 123" strokeWidth="0.6" />
        <path d="M 572 117 H 596 M 596 117 L 592 113 M 596 117 L 592 121" strokeWidth="0.7" />
        <rect x="604" y="104" width="28" height="24" strokeWidth="0.9" rx="2" />
        <path d="M 612 110 H 624 M 612 116 H 624 M 612 122 H 624" strokeWidth="0.5" opacity="0.5" />

        <text
          x="611"
          y="168"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          2h 47m
        </text>
        <text
          x="611"
          y="192"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          estimated charge time
        </text>
        <text
          x="611"
          y="214"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          (2.78 hours)
        </text>

        <text
          x="611"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          @ 2,000 mA
        </text>
        <text
          x="611"
          y="268"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          90% efficiency · heat + taper
        </text>
      </g>

      {/* Charge fill timeline */}
      <g
        filter="url(#bp-bct-pencil)"
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
          0%
        </text>
        <line x1="72" y1="376" x2="640" y2="376" strokeWidth="0.8" />
        <rect
          x="72"
          y="370"
          width="420"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <line x1="492" y1="364" x2="492" y2="388" strokeWidth="1" />
        <text
          x="496"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          full @ ~2.78 h
        </text>
        <path
          d="M 640 376 L 648 372 L 648 380 Z"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
        <text
          x="580"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          time →
        </text>
        <text
          x="72"
          y="392"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          mAh ÷ mA = base h · ÷ η = actual wall time
        </text>
      </g>
    </svg>
  );
}
