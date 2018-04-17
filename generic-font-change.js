// ==UserScript==
// @name         Generic Font Change
// @namespace    https://github.com/optimus29
// @version      1.6
// @description  Change fonts of websites
// @author       Optimus Prime
// @match        https://stackoverflow.com/*
// @match        https://dzone.com/*
// @match        https://www.tutorialspoint.com/*
// @match        https://angular.io/*
// @match        https://superuser.com/*
// @match        https://www.w3schools.com/*
// @match        http://www.learningtelugu.org/*
// @website      https://github.com/optimus29
// @grant        none
// ==/UserScript==
/**
* In order to change font on angular.io, the font must be installed
* on user's system.
*/
(function() {
    'use strict';
    let ff = 'Fira Sans';
    let ff2 = ff.split(' ').join('+');
    
    let mf = 'Fira Mono';
    let mf2 = mf.split(' ').join('+');

    let css = 
`
@import url('https://fonts.googleapis.com/css?family=${ff2}:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=${mf2}:400,700');
* {
  font-family: '${ff}', Ubuntu, 'Segoe UI', sans-serif !important;
}
code, code *, pre, pre *,
.w3-code, .w3-code * /* w3schools specific */
{
  font-family: '${mf}', Consolas, Courier, monospace !important;
}
/* angular.io specfic */
.material-icons, .material-icons span {
  font-family: 'Material Icons' !important;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
