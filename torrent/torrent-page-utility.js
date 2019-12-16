// ==UserScript==
// @name         Torrent Page Utility
// @namespace    https://github.com/optimus29
// @version      1.0
// @description  Utilities for pages of a torrent website
// @author       Optimus Prime
// @include      /^https?:\/\/x?1337x\...\/.*$/
// ==/UserScript==

(function() {
    'use strict';

    const page = {};

    page.linkCleaner = function linkCleaner() {
      const EXCLUDE_LIST = ['tab'];
      const links = document.querySelectorAll("a");
      let linkCleanCount = 0;

      for (let link of links) {
        const toggle = link.getAttribute("data-toggle");

        if (!EXCLUDE_LIST.includes(toggle)) {
          link.removeAttribute("data-toggle");
          link.removeAttribute("data-target");

          linkCleanCount++;
        }
      }

      console.log("Cleaned [" + linkCleanCount + "] links.");
    }

    page.linkCleaner();
})();
