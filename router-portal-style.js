// ==UserScript==
// @name         Router Style Change
// @namespace    https://github.com/jkbhu85
// @version      1.0.0
// @description  Change appearence of router admin portal
// @author       Jitendra Kumar
// @match        https://192.168.1.1/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.1
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const style = document.createElement('style');
  style.setAttribute("title", "jk-style");
  document.head.appendChild(style);
  style.innerHTML =
`
body {
  font-family: Roboto, 'sans-serif';
}
input, button, select, option {
  font-family: inherit;
}
`;
})();
