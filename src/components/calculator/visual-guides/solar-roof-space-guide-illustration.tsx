"use client";

import { cn } from "@/lib/utils";

interface SolarRoofSpaceGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: roof area + panel spec + usable % → panels & kW.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarRoofSpaceGuideIllustration({
  className,
}: SolarRoofSpaceGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-roof-space-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="srs-guide-title srs-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="srs-guide-title">Solar roof space flow diagram</title>
      <desc id="srs-guide-desc">
        Inputs: usable roof area in square feet, panel footprint, panel watt
        rating, and percent of roof usable for PV after setbacks and obstructions.
        Process: effective area equals roof times usable percent, maximum panels
        equals floor of effective area divided by panel footprint, system
        kilowatts equals panel count times watts divided by one thousand.
        Output: how many panels fit and maximum system size in kW.
      </desc>

      <defs>
        <pattern
          id="bp-srs-grid-minor"
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
          id="bp-srs-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-srs-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-srs-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-srs-grid-major)"
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
        FIG. 1 — ROOF SPACE &amp; SYSTEM kW
      </text>
      <path
        d="M 34 52 H 380"
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
        filter="url(#bp-srs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 176 Q 182 88 184 94 V 300 Q 182 306 176 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          usable roof area
        </text>
        <text x="48" y="122" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          800 sq ft
        </text>

        {/* Roof plan sketch */}
        <path d="M 48 136 L 120 136 L 136 152 L 136 200 L 48 200 Z" strokeWidth="0.9" />
        <rect x="100" y="160" width="12" height="12" strokeWidth="0.6" opacity="0.5" />
        <text x="102" y="170" fill="currentColor" fontSize="5" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          vent
        </text>
        <path d="M 56 148 H 88 V 168 H 72 V 192 H 56 Z" strokeWidth="0.5" opacity="0.45" strokeDasharray="2 2" />

        <text x="48" y="218" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          panel footprint
        </text>
        <text x="48" y="236" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          20 sq ft · 400 W
        </text>

        <text x="48" y="256" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          roof usable for PV
        </text>
        <text x="48" y="274" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          80%
        </text>
        <text x="48" y="288" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          setbacks · walkways · shade
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 194 190 H 218" strokeLinecap="round" />
        <path d="M 214 186 L 222 190 L 214 194" strokeLinejoin="round" />
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
        filter="url(#bp-srs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
          strokeWidth="1.2"
        />

        <text x="238" y="112" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1. Effective area
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          area = roof × usable%
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          800 × 0.80 = 640 sq ft
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Panel count
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          panels = floor(area ÷ footprint)
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          floor(640 ÷ 20) = 32 panels
        </text>

        {/* Grid of panels */}
        <g opacity="0.55">
          <rect x="256" y="232" width="10" height="8" strokeWidth="0.5" />
          <rect x="268" y="232" width="10" height="8" strokeWidth="0.5" />
          <rect x="280" y="232" width="10" height="8" strokeWidth="0.5" />
          <rect x="292" y="232" width="10" height="8" strokeWidth="0.5" />
          <rect x="256" y="242" width="10" height="8" strokeWidth="0.5" />
          <rect x="268" y="242" width="10" height="8" strokeWidth="0.5" />
          <text x="308" y="242" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
            ×32
          </text>
        </g>

        <path d="M 238 262 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="282" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. System kW
        </text>
        <text x="256" y="300" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          kW = panels × W ÷ 1,000
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 190 H 518" strokeLinecap="round" />
        <path d="M 514 186 L 522 190 L 514 194" strokeLinejoin="round" />
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
        filter="url(#bp-srs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="548" y="108" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          max system size
        </text>

        <text x="616" y="148" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          12.8 kW
        </text>
        <text x="616" y="172" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          32 × 400 W ÷ 1,000
        </text>

        <text x="616" y="208" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          32 panels
        </text>
        <text x="616" y="228" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          640 sq ft of 640 usable
        </text>

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          updates live as inputs change
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          pair with solar panel size for load match
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-srs-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          leave fire setbacks &amp; maintenance walkways — not every sq ft is PV
        </text>
        <text x="48" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ~20 sq ft per modern 350–450 W residential module
        </text>
      </g>
    </svg>
  );
}
