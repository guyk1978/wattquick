"use client";

import { cn } from "@/lib/utils";

interface BatteryCRateGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: Ah + discharge A → C-rate + runtime.
 * Black & white, thin pencil lines — modal only (not embedded in page DOM by default).
 */
export function BatteryCRateGuideIllustration({
  className,
}: BatteryCRateGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "battery-c-rate-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="bcr-guide-title bcr-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="bcr-guide-title">Battery C-rate flow diagram</title>
      <desc id="bcr-guide-desc">
        Inputs: battery capacity in amp-hours and discharge current in amps.
        Process: C-rate equals discharge current divided by capacity; runtime
        hours equals capacity divided by discharge current. Output: discharge
        C-rate and estimated time to empty at constant current.
      </desc>

      <defs>
        <pattern
          id="bp-bcr-grid-minor"
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
          id="bp-bcr-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-bcr-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-bcr-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-bcr-grid-major)"
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
        FIG. 1 — BATTERY C-RATE
      </text>
      <path
        d="M 34 52 H 260"
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

      {/* Capacity Ah */}
      <g
        filter="url(#bp-bcr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 96 Q 38 92 44 92 H 108 Q 114 92 116 98 V 148 Q 114 154 108 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <rect x="42" y="104" width="32" height="36" strokeWidth="0.9" rx="2" />
        <path d="M 50 112 H 66 M 50 120 H 66 M 50 128 H 66" strokeWidth="0.5" opacity="0.6" />
        <text
          x="82"
          y="128"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          100 Ah
        </text>
      </g>
      <text
        x="36"
        y="170"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Battery capacity (Ah)
      </text>

      {/* Discharge current */}
      <g
        filter="url(#bp-bcr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path
          d="M 36 184 Q 38 180 44 180 H 108 Q 114 180 116 186 V 236 Q 114 242 108 242 H 44 Q 38 242 36 236 Z"
          strokeWidth="1.1"
        />
        <path d="M 48 200 L 94 200" strokeWidth="1.2" />
        <path d="M 78 192 L 94 200 L 78 208" strokeWidth="1" />
        <text
          x="48"
          y="228"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          50 A load
        </text>
      </g>
      <text
        x="36"
        y="258"
        fill="currentColor"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        opacity="0.75"
      >
        Discharge current (A)
      </text>
      <text
        x="36"
        y="274"
        fill="currentColor"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        opacity="0.6"
        stroke="none"
      >
        e.g. 100 Ah pack · 50 A draw
      </text>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 126 124 H 198" strokeLinecap="round" />
        <path d="M 194 120 L 202 124 L 194 128" strokeLinejoin="round" />
        <path d="M 126 212 H 198" strokeLinecap="round" />
        <path d="M 194 208 L 202 212 L 194 216" />
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
        filter="url(#bp-bcr-pencil)"
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
          1. C-rate (discharge intensity)
        </text>
        <text
          x="256"
          y="142"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          C = I ÷ Ah
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
          50 ÷ 100 = 0.5 C
        </text>
        <text
          x="256"
          y="184"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          1C = full capacity in 1 hour
        </text>

        <path d="M 238 198 H 430" strokeWidth="0.6" opacity="0.45" />

        <text
          x="238"
          y="220"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2. Runtime at constant I
        </text>
        <text
          x="256"
          y="244"
          fill="currentColor"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          t (h) = Ah ÷ I
        </text>
        <text
          x="256"
          y="268"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          100 ÷ 50 = 2.0 h
        </text>
        <text
          x="256"
          y="296"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          higher C → shorter runtime · more heat
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
        filter="url(#bp-bcr-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 96 Q 530 90 538 90 H 684 Q 692 90 694 98 V 318 Q 692 326 684 326 H 538 Q 530 326 528 318 Z"
          strokeWidth="1.3"
        />

        {/* Gauge */}
        <path
          d="M 556 200 A 60 60 0 0 1 676 200"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 556 200 A 60 60 0 0 1 616 140"
          strokeWidth="1.4"
          fill="none"
        />
        <line x1="616" y1="200" x2="616" y2="188" strokeWidth="1.3" />
        <circle cx="616" cy="200" r="3" fill="currentColor" stroke="none" />

        <text
          x="616"
          y="168"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          0.5 C
        </text>
        <text
          x="616"
          y="188"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          discharge C-rate
        </text>

        <text
          x="616"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="18"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          stroke="none"
        >
          2.0 h
        </text>
        <text
          x="616"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          (120 min) to empty
        </text>
        <text
          x="616"
          y="282"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          ideal · check max continuous C
        </text>
      </g>

      {/* C-rate reference scale */}
      <g
        filter="url(#bp-bcr-pencil)"
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
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          C-rate scale (100 Ah pack)
        </text>
        <line x1="48" y1="382" x2="640" y2="382" strokeWidth="0.8" />
        <line x1="48" y1="376" x2="48" y2="388" strokeWidth="0.8" />
        <text x="44" y="374" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">0C</text>
        <line x1="196" y1="376" x2="196" y2="388" strokeWidth="0.8" />
        <text x="196" y="374" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">0.5C·50A</text>
        <line x1="344" y1="376" x2="344" y2="388" strokeWidth="0.8" />
        <text x="344" y="374" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">1C·100A</text>
        <line x1="492" y1="376" x2="492" y2="388" strokeWidth="0.8" />
        <text x="492" y="374" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">2C·200A</text>
        <line x1="640" y1="376" x2="640" y2="388" strokeWidth="0.8" />
        <text x="640" y="374" textAnchor="end" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">↑C</text>
        <text x="48" y="396" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          t = 1/C hours at constant current
        </text>
      </g>
    </svg>
  );
}
