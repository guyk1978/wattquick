"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  CalculatorPageShellContext,
  useCalculatorPageSlots,
} from "@/components/calculator/calculator-page-shell-context";
import { CalculatorSidebarDashboard } from "@/components/calculator/calculator-sidebar-dashboard";
import { cn } from "@/lib/utils";

interface CalculatorCommandShellProps {
  className?: string;
  children: ReactNode;
}

function isCalculatorCommandSplit(
  child: ReactNode
): child is ReactElement<CalculatorCommandSplitProps> {
  if (!isValidElement(child)) return false;
  const type = child.type as { displayName?: string };
  return type.displayName === "CalculatorCommandSplit";
}

export function CalculatorCommandShell({
  className,
  children,
}: CalculatorCommandShellProps) {
  const items = Children.toArray(children);
  const splitIndex = items.findIndex(isCalculatorCommandSplit);
  const splitChild =
    splitIndex >= 0 && isCalculatorCommandSplit(items[splitIndex])
      ? items[splitIndex]
      : null;
  const shellFooter =
    splitIndex >= 0 ? items.slice(splitIndex + 1) : items.slice(1);
  const leading = splitIndex > 0 ? items.slice(0, splitIndex) : [];

  let dashboard: ReactNode = splitChild;
  if (splitChild !== null && shellFooter.length > 0) {
    dashboard = cloneElement(splitChild, {
      shellFooter: <>{shellFooter}</>,
    });
  }

  const inPageShell = useContext(CalculatorPageShellContext) !== null;

  if (inPageShell) {
    return (
      <div className={cn("calculator-route-registrar", className)} aria-hidden>
        {leading}
        {dashboard ?? items}
      </div>
    );
  }

  return (
    <div className={cn("calculator-embed-shell", className)}>
      {leading}
      {dashboard ?? items}
    </div>
  );
}

export interface CalculatorCommandSplitProps {
  inputs: ReactNode;
  results: ReactNode;
  footer?: ReactNode;
  shellFooter?: ReactNode;
  className?: string;
}

function CalculatorCommandSplitPage({
  inputs,
  results,
  footer,
}: CalculatorCommandSplitProps) {
  useCalculatorPageSlots({
    sidebar: inputs,
    main: results,
    footer,
  });
  return null;
}

function CalculatorCommandSplitInline({
  inputs,
  results,
  footer,
  className,
}: CalculatorCommandSplitProps) {
  return (
    <CalculatorSidebarDashboard
      inputs={inputs}
      results={results}
      footer={footer}
      className={className}
    />
  );
}

export function CalculatorCommandSplit(props: CalculatorCommandSplitProps) {
  const pageShell = useContext(CalculatorPageShellContext);
  const combinedFooter =
    props.footer || props.shellFooter ? (
      <>
        {props.footer}
        {props.shellFooter}
      </>
    ) : null;

  const splitProps = { ...props, footer: combinedFooter };

  if (pageShell) {
    return <CalculatorCommandSplitPage {...splitProps} />;
  }

  return <CalculatorCommandSplitInline {...splitProps} />;
}

CalculatorCommandSplit.displayName = "CalculatorCommandSplit";
