"use client";

import type { ReactNode } from "react";
import {
  CalculatorPageShellProvider,
} from "@/components/calculator/calculator-page-shell-context";
import { CalculatorPageShell } from "@/components/calculator/calculator-page-shell";
import type { CalculatorId } from "@/lib/calculators";

interface CalculatorPageLayoutProps {
  calculatorId: CalculatorId;
  pageHeader: ReactNode;
  bottomContent?: ReactNode;
  children: ReactNode;
}

/**
 * Client page chrome: mounts calculator children first (they register sidebar/main
 * slots), then renders the viewport-level shell.
 */
export function CalculatorPageLayout({
  calculatorId,
  pageHeader,
  bottomContent,
  children,
}: CalculatorPageLayoutProps) {
  return (
    <CalculatorPageShellProvider key={calculatorId}>
      {children}
      <CalculatorPageShell
        calculatorId={calculatorId}
        pageHeader={pageHeader}
        bottomContent={bottomContent}
      />
    </CalculatorPageShellProvider>
  );
}
