// ==UserScript==
// @name         Generic Font Change
// @namespace    https://github.com/optimus29
// @version      1.14
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
// @match        https://docs.spring.io/spring/docs/4.0.x/*
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
@import url('https://fonts.googleapis.com/css?family=${ff2}:300,300i,400,400i,500,500i,700,700i');
@import url('https://fonts.googleapis.com/css?family=${mf2}:400,500,700');
* {
  font-family: '${ff}', Ubuntu, 'Segoe UI', sans-serif !important;
}
code, code *, pre, pre *,
tt, tt *,
.w3-code, .w3-code * /* w3schools specific */
{
  font-family: '${mf}', Consolas, Courier, monospace !important;
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
