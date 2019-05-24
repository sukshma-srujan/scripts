// ==UserScript==
// @name         Generic Font Change
// @namespace    https://github.com/optimus29
// @version      1.20
// @description  Change fonts of websites
// @author       Optimus Prime
// @match        https://stackoverflow.com/*
// @match        https://www.google.com/*
// @match        https://www.google.co.in/*
// @match        https://meta.stackexchange.com/*
// @match        https://dzone.com/*
// @match        https://www.tutorialspoint.com/*
// @match        https://angular.io/*
// @match        https://superuser.com/*
// @match        https://www.w3schools.com/*
// @match        http://www.learningtelugu.org/*
// @match        https://docs.oracle.com/*
// @match        http://www.coreservlets.com/*
// @match        https://docs.spring.io/spring/docs/*
// @match        https://xerox-jira.atlassian.net/*
// @match        https://*.stackexchange.com/*
// @match        https://results.eci.gov.in/*
// @match        http://results.eci.gov.in/*
// @website      https://github.com/optimus29
// @grant        none
// ==/UserScript==
/**
* In order to change font on angular.io, the font must be installed
* on user's system.
*/
(function() {
    'use strict';
    let normalFontEn = 'Fira Sans';
    let normalFontEnCode = normalFontEn.split(' ').join('+');
    let normalFontHi = 'Noto Sans';
    let normalFontHiCode = normalFontHi.split(' ').join('+');
    
    let monoFontEn = 'Fira Mono';
    let monoFontEnCode = monoFontEn.split(' ').join('+');

    let css = 
`
@import url('https://fonts.googleapis.com/css?family=${normalFontEnCode}:300,300i,400,400i,500,500i,700,700i');
@import url('https://fonts.googleapis.com/css?family=${normalFontHiCode}:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=${monoFontEnCode}:400,500,700');
* {
  font-family: '${normalFontEn}', '${normalFontHi}', Ubuntu, 'Segoe UI', sans-serif !important;
}
code, code *, pre, pre *,
tt, tt *,
.w3-code, .w3-code * /* w3schools specific */
{
  font-family: '${monoFontEn}', Consolas, Courier, monospace !important;
}
/* angular.io specfic */
.material-icons, .material-icons span {
  font-family: 'Material Icons' !important;
}
/* websites that use font awesome */
.fa {
  font-family: 'FontAwesome' !important;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
