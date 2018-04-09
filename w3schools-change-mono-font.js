// ==UserScript==
// @name         W3Schools: Change Mono Font
// @namespace    https://github.com/optimus29
// @version      1.1
// @description  Change mono font
// @author       Optimus Prime
// @match        https://www.w3schools.com/*
// @website      https://github.com/optimus29
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    function applyStyle() {
        let mf = "Fira Mono";
        let mf2 = mf.split(' ').join('+');
        let css = `
@import url('https://fonts.googleapis.com/css?family=${mf2}');
.w3-code, .w3-code * {
  font-family: '${mf}', consolas, monospace !important;
}
`;

        let style = document.createElement("style");
        style.innerHTML = css;

        document.head.appendChild(style);
    };

    window.setTimeout(applyStyle, 1000);
})();
