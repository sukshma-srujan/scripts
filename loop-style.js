// ==UserScript==
// @name         Loop Font Style
// @namespace    https://github.com/jkbhu85
// @version      0.0.1
// @description  Change fonts on Microsoft Loop
// @author       Jitendra Kumar
// @match        https://loop.cloud.microsoft/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cloud.microsoft
// @grant        none
// ==/UserScript==

(function iipeMain() {
  'use strict';
  const css = `* {
  --fontFamilyBase: "Roboto";
  --fontFamilyMonospace: "monospace";
}`;
  const style = document.createElement('style');
  style.setAttribute('title', 'jk-style');
  style.innerHTML = css;
  document.body.appendChild(style);
})();
