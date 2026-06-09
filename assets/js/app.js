/**
 * WattQuick client bootstrap — injects command palette trigger into the header.
 */
(function () {
  "use strict";

  var searchInstance = null;

  function mountSearchTrigger() {
    var header = document.querySelector("header");
    if (!header || header.querySelector(".wq-search-trigger")) return;

    var searchSlot = header.querySelector("[data-header-search]");
    if (!searchSlot) return;

    if (typeof window.WattQuickSiteSearch === "undefined") return;

    var trigger = window.WattQuickSiteSearch.createTrigger();

    searchInstance = new window.WattQuickSiteSearch();
    searchInstance.init().catch(function (err) {
      console.warn("[WattQuick] Site search failed to initialize:", err);
    });

    trigger.addEventListener("click", function () {
      if (searchInstance) searchInstance.open();
    });

    searchSlot.appendChild(trigger);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountSearchTrigger);
  } else {
    mountSearchTrigger();
  }
})();
