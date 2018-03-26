// ==UserScript==
// @name         Generic Font Change
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Change fonts of a websites
// @author       Optimus Prime
// @match        https://stackoverflow.com/*
// @match        https://dzone.com/*
// @match        https://www.tutorialspoint.com/*
// @match        https://angular.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let ff = 'Fira Sans';
    let ff2 = ff.split(' ').join('+');
    
    let mf = 'Fira Mono';
    let mf2 = mf.split(' ').join('+');

    let css = 
`
@import url('https://fonts.googleapis.com/css?family=${ff2}:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=${mf}');
* {
  font-family: '${ff}', Ubuntu, 'Segoe UI', sans-serif !important;
}
code *, pre *{
  font-family: '${mf}', Consolas, Courier, monospace !important;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
