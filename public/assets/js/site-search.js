/**
 * WattQuick command palette site search (Ctrl+K / ⌘+K).
 * Requires Fuse global from assets/js/vendor/fuse.min.js.
 */
(function (global) {
  "use strict";

  var INDEX_URL = "/data/search-index.json";
  var CATEGORY_ORDER = ["Calculators", "Blog Articles"];

  var SEARCH_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';

  function isMac() {
    return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
  }

  function shortcutLabel() {
    return isMac() ? "⌘K" : "Ctrl+K";
  }

  function shortcutParts() {
    return isMac() ? ["⌘", "K"] : ["Ctrl", "K"];
  }

  function normalizeHref(href) {
    if (!href) return "/";
    return href.endsWith("/") ? href : href + "/";
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Resolve Fuse constructor from IIFE global (may be { default: Fuse }). */
  function resolveFuseConstructor() {
    var root =
      typeof global !== "undefined"
        ? global
        : typeof window !== "undefined"
          ? window
          : null;
    if (!root || root.Fuse === undefined) return null;

    var fuseRef = root.Fuse;
    if (typeof fuseRef === "function") return fuseRef;
    if (fuseRef && typeof fuseRef.default === "function") return fuseRef.default;
    return null;
  }

  function SiteSearch(options) {
    this.options = options || {};
    this.index = null;
    this.fuse = null;
    this.isOpen = false;
    this.activeIndex = -1;
    this.flatResults = [];
    this.overlay = null;
    this.input = null;
    this.resultsEl = null;
    this._boundKeydown = this.onGlobalKeydown.bind(this);
  }

  SiteSearch.prototype.init = function () {
    var self = this;
    this.buildModal();
    document.addEventListener("keydown", this._boundKeydown);
    return this.loadIndex().then(function () {
      self.setupFuse();
      return self;
    });
  };

  SiteSearch.prototype.loadIndex = function () {
    var self = this;
    return fetch(INDEX_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("Search index failed to load");
        return res.json();
      })
      .then(function (data) {
        self.index = data;
      });
  };

  SiteSearch.prototype.setupFuse = function () {
    if (!this.index || !Array.isArray(this.index.items)) {
      console.warn("[WattQuick] Search index is missing or has no items");
      return;
    }

    var FuseCtor = resolveFuseConstructor();
    if (typeof FuseCtor !== "function") {
      console.error("[WattQuick] Fuse is not loaded properly");
      return;
    }

    try {
      this.fuse = new FuseCtor(this.index.items, {
        keys: [
          { name: "title", weight: 0.45 },
          { name: "description", weight: 0.25 },
          { name: "keywords", weight: 0.15 },
          { name: "tag", weight: 0.08 },
          { name: "group", weight: 0.07 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        includeScore: true,
        minMatchCharLength: 2,
      });
    } catch (err) {
      console.error("[WattQuick] Failed to initialize Fuse search", err);
      this.fuse = null;
    }
  };

  SiteSearch.prototype.buildModal = function () {
    var parts = shortcutParts();
    var footerKeys = isMac()
      ? "<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span>"
      : "<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span>";

    var overlay = document.createElement("div");
    overlay.className = "wq-search-overlay";
    overlay.id = "wq-site-search";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Search WattQuick");
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="wq-search-modal">' +
      '  <div class="wq-search-input-wrap">' +
      SEARCH_ICON +
      '    <input class="wq-search-input" type="search" autocomplete="off" spellcheck="false" placeholder="Search calculators and articles…" aria-label="Search" />' +
      '    <span class="wq-search-hint wq-search-kbd wq-search-kbd--desktop" aria-hidden="true">' +
      escapeHtml(parts[0]) +
      "+" +
      escapeHtml(parts[1]) +
      "</span>" +
      "  </div>" +
      '  <div class="wq-search-results" role="listbox" aria-label="Search results"></div>' +
      '  <div class="wq-search-footer">' +
      footerKeys +
      "  </div>" +
      "</div>";

    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.input = overlay.querySelector(".wq-search-input");
    this.resultsEl = overlay.querySelector(".wq-search-results");

    var self = this;
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) self.close();
    });
    this.input.addEventListener("input", function () {
      self.activeIndex = -1;
      self.renderResults(self.input.value);
    });
    this.input.addEventListener("keydown", function (e) {
      self.onInputKeydown(e);
    });
  };

  SiteSearch.prototype.open = function () {
    if (!this.overlay || this.isOpen) return;
    this.isOpen = true;
    this.overlay.hidden = false;
    this.overlay.classList.add("is-open");
    document.body.classList.add("wq-search-open");
    this.input.value = "";
    this.activeIndex = -1;
    this.renderResults("");
    var self = this;
    requestAnimationFrame(function () {
      self.input.focus();
    });
  };

  SiteSearch.prototype.close = function () {
    if (!this.overlay || !this.isOpen) return;
    this.isOpen = false;
    this.overlay.classList.remove("is-open");
    this.overlay.hidden = true;
    document.body.classList.remove("wq-search-open");
    this.activeIndex = -1;
    this.flatResults = [];
  };

  SiteSearch.prototype.toggle = function () {
    if (this.isOpen) this.close();
    else this.open();
  };

  SiteSearch.prototype.onGlobalKeydown = function (e) {
    var mod = isMac() ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      this.toggle();
      return;
    }
    if (e.key === "Escape" && this.isOpen) {
      e.preventDefault();
      this.close();
    }
  };

  SiteSearch.prototype.onInputKeydown = function (e) {
    if (!this.flatResults.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, this.flatResults.length - 1);
      this.highlightActive();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this.highlightActive();
    } else if (e.key === "Enter" && this.activeIndex >= 0) {
      e.preventDefault();
      var item = this.flatResults[this.activeIndex];
      if (item) window.location.href = normalizeHref(item.href);
    }
  };

  SiteSearch.prototype.highlightActive = function () {
    if (!this.resultsEl) return;
    var nodes = this.resultsEl.querySelectorAll(".wq-search-item");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.toggle("is-active", i === this.activeIndex);
      if (i === this.activeIndex) {
        nodes[i].scrollIntoView({ block: "nearest" });
      }
    }
  };

  SiteSearch.prototype.search = function (query) {
    var q = (query || "").trim();
    if (!q) return [];
    if (!this.fuse) {
      var lower = q.toLowerCase();
      return (this.index.items || []).filter(function (item) {
        return (
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower)
        );
      });
    }
    return this.fuse.search(q).map(function (r) {
      return r.item;
    });
  };

  SiteSearch.prototype.groupResults = function (items) {
    var groups = {};
    items.forEach(function (item) {
      var cat = item.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return CATEGORY_ORDER.filter(function (cat) {
      return groups[cat] && groups[cat].length;
    }).map(function (cat) {
      return { label: cat, items: groups[cat] };
    });
  };

  SiteSearch.prototype.renderEmptyState = function () {
    var popular = (this.index && this.index.popular) || [];
    var slice = popular.slice(0, 3);
    if (!slice.length) {
      return (
        '<div class="wq-search-empty">' +
        '<p class="wq-search-empty__title">Search WattQuick</p>' +
        "<p>Type to find calculators and blog articles.</p>" +
        "</div>"
      );
    }

    var html =
      '<div class="wq-search-empty">' +
      '<p class="wq-search-empty__title">Popular calculators</p>' +
      "<p>Jump in with a quick pick, or start typing.</p>" +
      "</div>";

    html += this.renderItemList(
      [{ label: "Calculators", items: slice }],
      0
    );
    return html;
  };

  SiteSearch.prototype.renderItem = function (item, flatIndex) {
    var badgeClass =
      item.type === "blog"
        ? "wq-search-item__badge--blog"
        : "wq-search-item__badge--calc";
    var badgeLabel = item.type === "blog" ? "Blog" : "Tool";
    var href = normalizeHref(item.href);

    return (
      '<a class="wq-search-item" role="option" href="' +
      escapeHtml(href) +
      '" data-index="' +
      flatIndex +
      '">' +
      '<span class="wq-search-item__badge ' +
      badgeClass +
      '">' +
      escapeHtml(badgeLabel) +
      "</span>" +
      '<span class="wq-search-item__body">' +
      '<span class="wq-search-item__title">' +
      escapeHtml(item.title) +
      "</span>" +
      '<span class="wq-search-item__desc">' +
      escapeHtml(item.description) +
      "</span>" +
      (item.group
        ? '<span class="wq-search-item__meta">' + escapeHtml(item.group) + "</span>"
        : "") +
      "</span></a>"
    );
  };

  SiteSearch.prototype.renderItemList = function (groups, startIndex) {
    var html = "";
    var idx = startIndex;
    var self = this;

    groups.forEach(function (group) {
      html += '<div class="wq-search-group">';
      html += '<p class="wq-search-group__label">' + escapeHtml(group.label) + "</p>";
      group.items.forEach(function (item) {
        html += self.renderItem(item, idx);
        idx += 1;
      });
      html += "</div>";
    });

    return html;
  };

  SiteSearch.prototype.renderResults = function (query) {
    if (!this.resultsEl) return;

    var q = (query || "").trim();
    var items;
    var html = "";

    if (!q) {
      html = this.renderEmptyState();
      this.flatResults = ((this.index && this.index.popular) || []).slice(0, 3);
    } else {
      items = this.search(q);
      this.flatResults = items;
      if (!items.length) {
        html =
          '<div class="wq-search-empty"><p class="wq-search-empty__title">No results</p>' +
          "<p>Try another keyword — calculator name, topic, or blog title.</p></div>";
      } else {
        var groups = this.groupResults(items);
        html = this.renderItemList(groups, 0);
      }
    }

    this.resultsEl.innerHTML = html;
    this.activeIndex = this.flatResults.length ? 0 : -1;

    var self = this;
    this.resultsEl.querySelectorAll(".wq-search-item").forEach(function (node, i) {
      node.addEventListener("mouseenter", function () {
        self.activeIndex = i;
        self.highlightActive();
      });
      if (i === 0 && self.flatResults.length) {
        node.classList.add("is-active");
      }
    });
  };

  SiteSearch.createTrigger = function () {
    var parts = shortcutParts();
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wq-search-trigger";
    btn.setAttribute("aria-label", "Search tools (" + shortcutLabel() + ")");
    btn.innerHTML =
      SEARCH_ICON +
      '<span class="wq-search-trigger__label">Search tools...</span>' +
      '<span class="wq-search-kbd wq-search-kbd--integrated" aria-hidden="true">' +
      "<span>" +
      escapeHtml(parts[0]) +
      "</span><span>+</span><span>" +
      escapeHtml(parts[1]) +
      "</span></span>";
    return btn;
  };

  global.WattQuickSiteSearch = SiteSearch;
})(typeof window !== "undefined" ? window : globalThis);
