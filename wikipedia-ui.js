// ==UserScript==
// @name         Wikipedia UI
// @namespace    optimus29
// @version      1.1.0
// @description  Change font, font size and appearance of top of page.
// @author       Optimus Prime
// @match        https://*.wikipedia.org/*
// @grant        none
// ==/UserScript==

(function IIFE() {
  'use strict';

  const sf = 'Fira Sans';
  const sf2 = sf.split(' ').join('+');

  const mf = 'Fira Mono';
  const mf2 = mf.split(' ').join('+');

  const css =
`
@import url('https://fonts.googleapis.com/css2?family=${mf2}&family=${sf2}:ital,wght@0,400;0,700;1,400&display=swap');
:root {
  --font-size-medium: 1.5rem;
}
body {
  font-family: "${sf}", sans-serif;
}
pre,
code,
tt,
kbd,
samp,
.mw-code {
  font-family: "${mf}", consolas, monospace;
}
code {
  font-weight: 400;
}
body table:first-of-type tr td:last-of-type {
  width: 100%;
  padding-left: 1rem;
}
.jk-infobox {
  float: none;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 3rem;
}
`;


  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);


  Array.from(document.querySelectorAll('body table.infobox')).forEach(e => e.classList.add("jk-infobox"));
})();
