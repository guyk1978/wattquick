"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  SITE_SEARCH_CATEGORY_ORDER,
  SITE_SEARCH_INDEX_URL,
  type SiteSearchIndex,
  type SiteSearchItem,
} from "@/lib/site-search-types";
import { cn } from "@/lib/utils";

type SearchEngine = {
  search: (query: string) => Array<{ item: SiteSearchItem }>;
};

function isMacPlatform() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function shortcutLabel() {
  return isMacPlatform() ? "⌘K" : "Ctrl+K";
}

function badgeForItem(item: SiteSearchItem) {
  if (item.type === "blog") {
    return { label: "Article", className: "wq-search-item__badge--article" };
  }
  if (item.type === "page") {
    return { label: "Page", className: "wq-search-item__badge--tool" };
  }
  return { label: "Tool", className: "wq-search-item__badge--tool" };
}

function groupResults(items: SiteSearchItem[]) {
  const groups = new Map<string, SiteSearchItem[]>();

  for (const item of items) {
    const category = item.category || "Other";
    const list = groups.get(category) ?? [];
    list.push(item);
    groups.set(category, list);
  }

  return SITE_SEARCH_CATEGORY_ORDER.filter((category) => groups.has(category)).map(
    (category) => ({
      label: category,
      items: groups.get(category) ?? [],
    })
  );
}

export function SiteHeaderSearch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<SiteSearchIndex | null>(null);
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loadError, setLoadError] = useState(false);
  const [shouldLoadIndex, setShouldLoadIndex] = useState(false);
  const indexRequestedRef = useRef(false);

  const requestIndex = useCallback(() => {
    if (indexRequestedRef.current) return;
    indexRequestedRef.current = true;
    setShouldLoadIndex(true);
  }, []);

  useEffect(() => {
    if (!shouldLoadIndex) return;

    let cancelled = false;

    void (async () => {
      try {
        const [{ createSiteSearchEngine }, res] = await Promise.all([
          import("@/lib/site-search-engine"),
          fetch(SITE_SEARCH_INDEX_URL),
        ]);
        if (!res.ok) throw new Error("Search index failed to load");
        const data = (await res.json()) as SiteSearchIndex;
        if (cancelled) return;
        setIndex(data);
        setEngine(createSiteSearchEngine(data.items ?? []) as SearchEngine);
      } catch {
        if (!cancelled) setLoadError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shouldLoadIndex]);

  const flatResults = useMemo(() => {
    if (!index) return [];
    const q = query.trim();
    if (!q) return index.popular.slice(0, 4);
    if (engine) {
      return engine.search(q).map((result) => result.item);
    }
    const lower = q.toLowerCase();
    return index.items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower)
    );
  }, [engine, index, query]);

  const groupedResults = useMemo(() => groupResults(flatResults), [flatResults]);

  const indexedGroups = useMemo(() => {
    let index = 0;
    return groupedResults.map((group) => ({
      ...group,
      items: group.items.map((item) => {
        const current = index;
        index += 1;
        return { item, index: current };
      }),
    }));
  }, [groupedResults]);

  const open = useCallback(() => {
    requestIndex();
    setIsOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [requestIndex]);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    setActiveIndex(flatResults.length ? 0 : -1);
  }, [flatResults]);

  useEffect(() => {
    const onGlobalKeydown = (event: KeyboardEvent) => {
      const mod = isMacPlatform() ? event.metaKey : event.ctrlKey;
      if (mod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) {
          inputRef.current?.focus();
        } else {
          open();
        }
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        close();
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", onGlobalKeydown);
    return () => document.removeEventListener("keydown", onGlobalKeydown);
  }, [close, isOpen, open]);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", onOutsideClick);
    }

    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [close, isOpen]);

  const onInputKeydown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!flatResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, flatResults.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const item = flatResults[activeIndex];
      if (item) window.location.href = item.href;
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("wq-header-search wq-header-search--pinned", isOpen && "is-open")}
      id="wq-site-search"
    >
      <div className="wq-header-search__input-wrap">
        <Search className="wq-header-search__leading-icon" strokeWidth={2} aria-hidden />
        <input
          ref={inputRef}
          className="wq-header-search__input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            requestIndex();
            setIsOpen(true);
          }}
          onKeyDown={onInputKeydown}
          placeholder="Search tools, articles, pages…"
          aria-label="Search WattQuick"
          aria-expanded={isOpen}
          aria-controls="wq-header-search-results"
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="wq-search-kbd wq-header-search__kbd" aria-hidden>
          {shortcutLabel()}
        </span>
      </div>

      {isOpen ? (
        <div className="wq-header-search__dropdown">
          <div
            id="wq-header-search-results"
            className="wq-header-search__results"
            role="listbox"
            aria-label="Search results"
          >
            {loadError ? (
              <div className="wq-search-empty">
                <p className="wq-search-empty__title">Search unavailable</p>
                <p>Could not load the search index. Try refreshing the page.</p>
              </div>
            ) : !index ? (
              <div className="wq-search-empty">
                <p className="wq-search-empty__title">Loading search…</p>
              </div>
            ) : query.trim() && flatResults.length === 0 ? (
              <div className="wq-search-empty">
                <p className="wq-search-empty__title">No results</p>
                <p>Try another keyword — tool name, topic, or article title.</p>
              </div>
            ) : !query.trim() && flatResults.length === 0 ? (
              <div className="wq-search-empty">
                <p className="wq-search-empty__title">Search WattQuick</p>
                <p>Type to find calculators, blog posts, and site pages.</p>
              </div>
            ) : (
              indexedGroups.map((group) => (
                <div key={group.label} className="wq-search-group">
                  <p className="wq-search-group__label">
                    {query.trim() ? group.label : "Popular tools"}
                  </p>
                  {group.items.map(({ item, index: indexForItem }) => {
                    const badge = badgeForItem(item);

                    return (
                      <Link
                        key={`${item.type}-${item.id}`}
                        href={item.href}
                        className={cn(
                          "wq-search-item",
                          indexForItem === activeIndex && "is-active"
                        )}
                        role="option"
                        aria-selected={indexForItem === activeIndex}
                        onMouseEnter={() => setActiveIndex(indexForItem)}
                        onClick={close}
                      >
                        <span
                          className={cn("wq-search-item__badge", badge.className)}
                        >
                          {badge.label}
                        </span>
                        <span className="wq-search-item__body">
                          <span className="wq-search-item__title">{item.title}</span>
                          <span className="wq-search-item__desc">{item.description}</span>
                          {item.group ? (
                            <span className="wq-search-item__meta">{item.group}</span>
                          ) : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
