/**
 * WattQuick client bootstrap — injects command palette trigger into the header.
 */
(function () {
  "use strict";

  var searchInstance = null;

  function mountSearchTrigger() {
    var header = document.querySelector("header");
    if (!header || header.querySelector(".wq-search-trigger")) return;

    var row =
      header.querySelector(":scope > div") ||
      header.querySelector(".mx-auto") ||
      header.firstElementChild;
    if (!row) return;

    var actions =
      row.querySelector("[data-header-actions]") || row.lastElementChild;
    var trigger = window.WattQuickSiteSearch.createTrigger();

    if (typeof window.WattQuickSiteSearch === "undefined") return;

    searchInstance = new window.WattQuickSiteSearch();
    searchInstance.init().catch(function (err) {
      console.warn("[WattQuick] Site search failed to initialize:", err);
    });

    trigger.addEventListener("click", function () {
      if (searchInstance) searchInstance.open();
    });

    if (actions) {
      actions.insertBefore(trigger, actions.firstChild);
    } else {
      row.appendChild(trigger);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountSearchTrigger);
  } else {
    mountSearchTrigger();
  }
})();
