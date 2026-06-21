"use client";

import { cn } from "@/lib/utils";

interface ConvertCalculatorsGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Ah/Wh, kVA/kW, and mechanical unit conversions.
 * Modal only (not embedded in page DOM by default).
 */
export function ConvertCalculatorsGuideIllustration({
  className,
}: ConvertCalculatorsGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 520"
      className={cn(
        "convert-calculators-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="conv-guide-title conv-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="conv-guide-title">Convert calculators flow diagram</title>
      <desc id="conv-guide-desc">
        Three conversion tracks: amp-hours and voltage to watt-hours, apparent
        power and power factor to real kilowatts, and kilowatts to mechanical
        horsepower. Each track shows input values, the conversion formula, and
        the computed output.
      </desc>

      <defs>
        <pattern
          id="bp-conv-grid-minor"
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
          id="bp-conv-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-conv-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-conv-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        height="520"
        fill="url(#bp-conv-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="496"
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
        FIG. 1 — UNIT CONVERSION HUB
      </text>
      <path
        d="M 34 52 H 280"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* Column headers */}
      <text
        x="36"
        y="78"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUT
      </text>
      <text
        x="268"
        y="78"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>
      <text
        x="538"
        y="78"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      {/* Track 1: Ah → Wh */}
      <g
        filter="url(#bp-conv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 90 44 90 H 196 Q 202 90 204 96 V 148 Q 202 154 196 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="112"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          battery energy
        </text>
        <text
          x="48"
          y="132"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          100 Ah
        </text>
        <text
          x="48"
          y="148"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          × 12 V
        </text>

        <path
          d="M 218 124 H 248"
          strokeWidth="1"
          opacity="0.65"
          markerEnd="none"
        />
        <path d="M 244 120 L 252 124 L 244 128" strokeWidth="1" opacity="0.65" />

        <path
          d="M 252 96 Q 254 90 262 90 H 492 Q 500 90 502 96 V 148 Q 500 154 492 154 H 262 Q 254 154 252 148 Z"
          strokeWidth="1.1"
        />
        <text
          x="268"
          y="112"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          Wh = Ah × V
        </text>
        <text
          x="268"
          y="132"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          100 × 12
        </text>
        <text
          x="268"
          y="148"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          charge × voltage
        </text>

        <path d="M 512 124 H 542" strokeWidth="1" opacity="0.65" />
        <path d="M 538 120 L 546 124 L 538 128" strokeWidth="1" opacity="0.65" />

        <path
          d="M 546 96 Q 548 90 556 90 H 684 Q 692 90 694 96 V 148 Q 692 154 684 154 H 556 Q 548 154 546 148 Z"
          strokeWidth="1.2"
        />
        <text
          x="562"
          y="112"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          stored energy
        </text>
        <text
          x="562"
          y="134"
          fill="currentColor"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          1,200 Wh
        </text>
      </g>

      {/* Track 2: kVA → kW */}
      <g
        filter="url(#bp-conv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 178 Q 38 172 44 172 H 196 Q 202 172 204 178 V 230 Q 202 236 196 236 H 44 Q 38 236 36 230 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="194"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          AC apparent power
        </text>
        <text
          x="48"
          y="214"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          10 kVA
        </text>
        <text
          x="48"
          y="230"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          PF 0.85
        </text>

        <path d="M 218 206 H 248" strokeWidth="1" opacity="0.65" />
        <path d="M 244 202 L 252 206 L 244 210" strokeWidth="1" opacity="0.65" />

        <path
          d="M 252 178 Q 254 172 262 172 H 492 Q 500 172 502 178 V 230 Q 500 236 492 236 H 262 Q 254 236 252 230 Z"
          strokeWidth="1.1"
        />
        <text
          x="268"
          y="194"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          kW = kVA × PF
        </text>
        <text
          x="268"
          y="214"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          10 × 0.85
        </text>
        <text
          x="268"
          y="230"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          real ÷ apparent
        </text>

        <path d="M 512 206 H 542" strokeWidth="1" opacity="0.65" />
        <path d="M 538 202 L 546 206 L 538 210" strokeWidth="1" opacity="0.65" />

        <path
          d="M 546 178 Q 548 172 556 172 H 684 Q 692 172 694 178 V 230 Q 692 236 684 236 H 556 Q 548 236 546 230 Z"
          strokeWidth="1.2"
        />
        <text
          x="562"
          y="194"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          real power
        </text>
        <text
          x="562"
          y="216"
          fill="currentColor"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          8.5 kW
        </text>
      </g>

      {/* Track 3: kW → HP */}
      <g
        filter="url(#bp-conv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 260 Q 38 254 44 254 H 196 Q 202 254 204 260 V 312 Q 202 318 196 318 H 44 Q 38 318 36 312 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="276"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          mechanical power
        </text>
        <text
          x="48"
          y="296"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          7.5 kW
        </text>
        <text
          x="48"
          y="312"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          motor rating
        </text>

        <path d="M 218 288 H 248" strokeWidth="1" opacity="0.65" />
        <path d="M 244 284 L 252 288 L 244 292" strokeWidth="1" opacity="0.65" />

        <path
          d="M 252 260 Q 254 254 262 254 H 492 Q 500 254 502 260 V 312 Q 500 318 492 318 H 262 Q 254 318 252 312 Z"
          strokeWidth="1.1"
        />
        <text
          x="268"
          y="276"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          HP = kW × 1.341
        </text>
        <text
          x="268"
          y="296"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          7.5 × 1.341
        </text>
        <text
          x="268"
          y="312"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          metric → imperial
        </text>

        <path d="M 512 288 H 542" strokeWidth="1" opacity="0.65" />
        <path d="M 538 284 L 546 288 L 538 292" strokeWidth="1" opacity="0.65" />

        <path
          d="M 546 260 Q 548 254 556 254 H 684 Q 692 254 694 260 V 312 Q 692 318 684 318 H 556 Q 548 318 546 312 Z"
          strokeWidth="1.2"
        />
        <text
          x="562"
          y="276"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          shaft horsepower
        </text>
        <text
          x="562"
          y="298"
          fill="currentColor"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          10.06 HP
        </text>
      </g>

      {/* Reverse conversion note */}
      <g
        filter="url(#bp-conv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 342 Q 38 336 44 336 H 684 Q 692 336 694 342 V 396 Q 692 402 684 402 H 44 Q 38 402 36 396 Z"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.85"
        />
        <text
          x="52"
          y="362"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
          letterSpacing="0.06em"
        >
          BIDIRECTIONAL
        </text>
        <text
          x="52"
          y="380"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.85"
        >
          Wh ÷ V → Ah · kW ÷ PF → kVA · HP ÷ 1.341 → kW — same formulas, reversed
        </text>
      </g>

      {/* Legend / scale bar */}
      <g stroke="currentColor" fill="none" opacity="0.5">
        <path d="M 36 432 H 120" strokeWidth="0.8" />
        <path d="M 36 428 V 436 M 120 428 V 436" strokeWidth="0.8" />
        <text
          x="128"
          y="436"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          conversion factor
        </text>
        <circle cx="360" cy="432" r="3" strokeWidth="0.8" />
        <text
          x="372"
          y="436"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          input quantity
        </text>
        <rect x="520" y="428" width="12" height="8" strokeWidth="0.8" />
        <text
          x="540"
          y="436"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          computed result
        </text>
      </g>

      <text
        x="36"
        y="472"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.45"
        letterSpacing="0.04em"
      >
        REV. A — CONVERT CALCULATORS · INPUT → FORMULA → OUTPUT · NOT TO SCALE
      </text>
    </svg>
  );
}
