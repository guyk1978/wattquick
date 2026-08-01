"use client";

import Link from "next/link";
import { ArrowUpRight, PinOff } from "lucide-react";
import { useGridPinnedCalculator } from "@/components/grid-modal/grid-pinned-calculator-context";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { categoryThemeStyle } from "@/lib/category-theme";

function PinnedToolCard({
  id,
  onUnpin,
}: {
  id: CalculatorId;
  onUnpin: (id: CalculatorId) => void;
}) {
  const meta = getCalculatorMeta(id);
  const Icon = meta.icon;

  return (
    <li
      className="grid-pinned-calc__item"
      style={categoryThemeStyle(meta.category)}
      data-calculator-id={id}
    >
      <div className="grid-pinned-calc__card">
        <span className="grid-pinned-calc__icon" aria-hidden>
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <div className="grid-pinned-calc__titles">
          <p className="grid-pinned-calc__title">{meta.title}</p>
        </div>
        <div className="grid-pinned-calc__actions">
          <Link
            href={meta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid-pinned-calc__open"
            aria-label={`Open ${meta.title}`}
            title="Open calculator"
          >
            <span className="grid-pinned-calc__open-text">Open</span>
            <ArrowUpRight className="size-3.5" strokeWidth={2.25} aria-hidden />
          </Link>
          <button
            type="button"
            className="grid-pinned-calc__unpin"
            onClick={() => onUnpin(id)}
            aria-label={`Unpin ${meta.title}`}
            title="Unpin"
          >
            <PinOff className="size-3.5" strokeWidth={2} aria-hidden />
            <span className="grid-pinned-calc__unpin-text">Unpin</span>
          </button>
        </div>
      </div>
    </li>
  );
}

/**
 * Stacked pinned-tool dock beneath the fixed grid nav.
 * Cards use the same 2-column width rules as `.wq-tool-grid`.
 */
export function GridPinnedCalculatorBar() {
  const { pinnedIds, unpin, unpinAll } = useGridPinnedCalculator();
  if (pinnedIds.length === 0) return null;

  const countLabel =
    pinnedIds.length === 1 ? "1 pinned tool" : `${pinnedIds.length} pinned tools`;

  return (
    <div className="grid-pinned-calc" aria-label="Pinned tools">
      <div className="grid-pinned-calc__rail">
        <div className="grid-pinned-calc__header">
          <p className="grid-pinned-calc__eyebrow">{countLabel}</p>
          {pinnedIds.length > 1 ? (
            <button
              type="button"
              className="grid-pinned-calc__unpin-all"
              onClick={unpinAll}
            >
              Unpin all
            </button>
          ) : null}
        </div>

        <ul className="grid-pinned-calc__grid" role="list">
          {pinnedIds.map((id) => (
            <PinnedToolCard key={id} id={id} onUnpin={unpin} />
          ))}
        </ul>
      </div>
    </div>
  );
}
