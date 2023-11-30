// ==UserScript==
// @name         Linkedin Firefox Android Fix
// @namespace    https://github.com/jkbhu85
// @version      1.0.0
// @description  Fix the issue that causes a semi-transparent overlay on screen and stops user from interacting with the website.
// @author       Jitendra Kumar
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  const css = `body { overflow: auto !important; } #promo-upsell { display: none; }`;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.body.appendChild(style);
});
