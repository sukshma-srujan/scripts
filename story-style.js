// ==UserScript==
// @name         Story Style
// @namespace    https://github.com/jkbhu85
// @homepage     https://github.com/jkbhu85/scripts/blob/main/story-style.js
// @version      1.0.0
// @description  Story style
// @author       Jitendra Kumar
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  if (location.host != atob('d3d3LmFudGFydmFzbmEzLmNvbQ==')) {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute("title", "jk-style");
  document.body.appendChild(style);
  style.innerHTML = ``;

  const sc = document.querySelector('.story-content');
  if (sc) {
    sc.innerHTML = sc.innerHTML.replaceAll(".", "।");
  }
})();
