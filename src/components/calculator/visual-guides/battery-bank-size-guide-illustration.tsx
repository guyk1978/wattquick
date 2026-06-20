"use client";

import { cn } from "@/lib/utils";

interface BatteryBankSizeGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: load W, runtime h, voltage V → Wh → Ah bank size.
 * Modal only (not embedded in page DOM by default).
 */
export function BatteryBankSizeGuideIllustration({
  className,
}: BatteryBankSizeGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-bank-size-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="battery-bank-guide-title battery-bank-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="battery-bank-guide-title">Battery bank sizing flow diagram</title>
      <desc id="battery-bank-guide-desc">
        Inputs: load power in watts, required runtime in hours, and system
        voltage. Process: multiply watts by hours for watt-hours needed, then
        divide by voltage for required amp-hour bank capacity. Output: battery
        bank size in amp-hours.
      </desc>

      <defs>
        <pattern
          id="bp-bank-grid-minor"
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
          id="bp-bank-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bank-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bank-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bank-grid-major)"
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
        FIG. 1 — BATTERY BANK SIZE (Ah)
      </text>
      <path
        d="M 34 52 H 300"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      <g
        filter="url(#bp-bank-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Load power W */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 128 Q 174 134 168 134 H 44 Q 38 134 36 128 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="110" r="10" strokeWidth="1" />
        <path d="M 72 100 V 120 M 62 110 H 82" strokeWidth="1" />
        <text
          x="92"
          y="114"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          500 W
        </text>
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          load
        </text>

        {/* Runtime hours */}
        <path
          d="M 36 144 Q 38 140 44 140 H 168 Q 174 140 176 146 V 180 Q 174 186 168 186 H 44 Q 38 186 36 180 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="162" r="14" strokeWidth="1" />
        <line x1="72" y1="162" x2="72" y2="150" strokeWidth="1.2" />
        <line x1="72" y1="162" x2="82" y2="168" strokeWidth="1" />
        <text
          x="96"
          y="166"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          8 h
        </text>
        <text
          x="48"
          y="156"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          runtime
        </text>

        {/* System voltage */}
        <path
          d="M 36 196 Q 38 192 44 192 H 168 Q 174 192 176 198 V 232 Q 174 238 168 238 H 44 Q 38 238 36 232 Z"
          strokeWidth="1.1"
        />
        <path d="M 56 214 L 68 226 L 96 202" strokeWidth="1.2" />
        <text
          x="104"
          y="218"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          12 V
        </text>
        <text
          x="48"
          y="208"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          bus V
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 112 H 218" strokeLinecap="round" />
        <path d="M 214 108 L 222 112 L 214 116" strokeLinejoin="round" />
        <path d="M 186 164 H 218" strokeLinecap="round" />
        <path d="M 214 160 L 222 164 L 214 168" />
        <path d="M 186 214 H 218" strokeLinecap="round" />
        <path d="M 214 210 L 222 214 L 214 218" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-bank-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 298 Q 476 306 468 306 H 228 Q 220 306 218 298 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1. Energy needed (Wh)
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh = W × hours
        </text>
        <text
          x="256"
          y="158"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          500 × 8 = 4,000 Wh
        </text>

        <path d="M 238 172 H 450" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="192"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2. Convert to amp-hours
        </text>
        <text
          x="256"
          y="216"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Ah = Wh ÷ V
        </text>
        <text
          x="256"
          y="238"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          4,000 ÷ 12 ≈ 333 Ah
        </text>

        <text
          x="256"
          y="272"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          add margin for inverter loss & aging
        </text>
        <text
          x="256"
          y="288"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          (×1.2–1.5 for field installs)
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 200 H 518" strokeLinecap="round" />
        <path d="M 514 196 L 522 200 L 514 204" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-bank-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 298 Q 692 306 684 306 H 538 Q 530 306 528 298 Z"
          strokeWidth="1.3"
        />

        {/* Battery bank — parallel blocks */}
        <rect x="560" y="128" width="36" height="52" strokeWidth="1.1" />
        <rect x="602" y="128" width="36" height="52" strokeWidth="1.1" />
        <rect x="644" y="128" width="36" height="52" strokeWidth="1.1" />
        <line x1="556" y1="152" x2="560" y2="152" strokeWidth="1" />
        <line x1="680" y1="152" x2="688" y2="152" strokeWidth="1" />
        <text
          x="611"
          y="200"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          12 V bank
        </text>

        <text
          x="611"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          333 Ah
        </text>
        <text
          x="611"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          required bank capacity
        </text>
      </g>

      {/* Bottom: W × h energy bar */}
      <g
        filter="url(#bp-bank-pencil)"
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
          energy budget: load × runtime = Wh → ÷ V = Ah
        </text>
        <rect x="72" y="376" width="400" height="12" strokeWidth="0.8" rx="1" />
        <rect
          x="72"
          y="376"
          width="400"
          height="12"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.12"
          rx="1"
        />
        <text x="72" y="372" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          0 Wh
        </text>
        <text x="448" y="372" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          4,000 Wh
        </text>
      </g>
    </svg>
  );
}
