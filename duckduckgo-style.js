// ==UserScript==
// @name         DuckDuckGo Style
// @namespace    https://github.com/jkbhu85
// @homepage     https://github.com/jkbhu85/scripts/blob/main/duckduckgo-style.js
// @version      0.0.1
// @description  Change appearance of DuckDuckGo website.
// @author       Jitendra Kumar
// @match        https://duckduckgo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=duckduckgo.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600&display=swap');
html,body {
  font-family: "Nunito Sans";
  font-size: 1rem;
}
select, option, input, button {
  font-family: inherit;
}
`;
  const style = document.createElement('style');
  style.innerHTML = css;
  style.title = 'jk-ddg-style';
  document.body.appendChild(style);
})();
