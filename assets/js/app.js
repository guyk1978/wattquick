/**
 * WattQuick client bootstrap — injects header search into the site header.
 */
(function () {
  "use strict";

  var searchInstance = null;

  function mountHeaderSearch() {
    var header = document.querySelector("header");
    if (!header || header.querySelector(".wq-header-search")) return;

    var searchSlot = header.querySelector("[data-header-search]");
    if (!searchSlot) return;

    if (typeof window.WattQuickSiteSearch === "undefined") return;

    searchInstance = new window.WattQuickSiteSearch();
    searchInstance.mount(searchSlot).catch(function (err) {
      console.warn("[WattQuick] Site search failed to initialize:", err);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountHeaderSearch);
  } else {
    mountHeaderSearch();
  }
})();
