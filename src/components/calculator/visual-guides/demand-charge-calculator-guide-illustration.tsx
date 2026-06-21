"use client";

import { cn } from "@/lib/utils";

interface DemandChargeCalculatorGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: peak kW + $/kW → demand charge → monthly penalty.
 * Modal only (not embedded in page DOM by default).
 */
export function DemandChargeCalculatorGuideIllustration({
  className,
}: DemandChargeCalculatorGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "demand-charge-calculator-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="dcharge-guide-title dcharge-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="dcharge-guide-title">Commercial demand charge flow diagram</title>
      <desc id="dcharge-guide-desc">
        Inputs: peak demand in kilowatts and demand charge rate in dollars per
        kilowatt. Process: multiply peak kW by the tariff rate. Output:
        estimated monthly demand charge and annual total.
      </desc>

      <defs>
        <pattern
          id="bp-dcharge-grid-minor"
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
          id="bp-dcharge-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-dcharge-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter
          id="bp-dcharge-pencil"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
        >
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
        fill="url(#bp-dcharge-grid-major)"
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
        FIG. 1 — DEMAND CHARGE
      </text>
      <path
        d="M 34 52 H 260"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUT */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUT
      </text>

      <g
        filter="url(#bp-dcharge-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 86 44 86 H 196 Q 202 86 204 92 V 268 Q 202 274 196 274 H 44 Q 38 274 36 268 Z"
          strokeWidth="1.1"
        />

        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          billing peak demand
        </text>
        <text
          x="48"
          y="132"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          85 kW
        </text>
        <text
          x="48"
          y="152"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          highest 15-min interval
        </text>

        <path d="M 48 164 H 188" strokeWidth="0.6" opacity="0.35" />

        <text
          x="48"
          y="180"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          demand charge rate
        </text>
        <text
          x="48"
          y="204"
          fill="currentColor"
          fontSize="22"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="700"
        >
          $12/kW
        </text>
        <text
          x="48"
          y="224"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          utility tariff adder
        </text>

        {/* Peak spike sketch */}
        <path d="M 120 248 L 132 248 L 138 232 L 144 248 L 168 248" strokeWidth="0.9" />
        <path d="M 138 232 L 138 256" strokeWidth="0.6" strokeDasharray="2 2" />
        <text
          x="144"
          y="270"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          peak kW spike
        </text>
      </g>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 214 180 H 244" strokeLinecap="round" />
        <path d="M 240 176 L 248 180 L 240 184" strokeLinejoin="round" />
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
        filter="url(#bp-dcharge-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 248 92 Q 250 86 258 86 H 468 Q 476 86 478 94 V 268 Q 476 276 468 276 H 258 Q 250 276 248 268 Z"
          strokeWidth="1.2"
        />

        <text
          x="268"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Power-based billing
        </text>
        <text
          x="268"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Charge = peak kW × $/kW
        </text>
        <text
          x="268"
          y="162"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          85 × 12
        </text>
        <text
          x="268"
          y="188"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          separate from energy kWh charges
        </text>

        {/* Flow blocks */}
        <rect x="360" y="204" width="40" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="380"
          y="220"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          kW
        </text>
        <text
          x="408"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          ×
        </text>
        <rect x="420" y="208" width="40" height="16" strokeWidth="0.8" rx="1" />
        <text
          x="440"
          y="220"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          $/kW
        </text>
        <text
          x="468"
          y="212"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          =
        </text>
        <rect x="480" y="204" width="36" height="24" strokeWidth="0.9" rx="1" />
        <text
          x="498"
          y="220"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $
        </text>

        <text
          x="268"
          y="252"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          one spike can set the whole month
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 180 H 518" strokeLinecap="round" />
        <path d="M 514 176 L 522 180 L 514 184" strokeLinejoin="round" />
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
        filter="url(#bp-dcharge-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 268 Q 692 276 684 276 H 538 Q 530 276 528 268 Z"
          strokeWidth="1.3"
        />

        <circle cx="611" cy="148" r="28" strokeWidth="1.2" />
        <text
          x="611"
          y="154"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $
        </text>

        <text
          x="611"
          y="208"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          $1,020
        </text>
        <text
          x="611"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.75"
        >
          monthly demand charge
        </text>

        <rect x="558" y="244" width="106" height="28" strokeWidth="0.9" rx="1" />
        <text
          x="611"
          y="262"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $12,240/yr
        </text>
      </g>

      {/* Footer */}
      <g
        filter="url(#bp-dcharge-pencil)"
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
          peak shaving lowers kW — batteries and load staging target this line item
        </text>
        <text
          x="72"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          85 × $12 =
        </text>
        <text
          x="140"
          y="388"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          $1,020/mo penalty
        </text>
      </g>
    </svg>
  );
}
