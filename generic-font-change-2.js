// ==UserScript==
// @name         Generic Font Change 2
// @namespace    optimus29
// @version      1.4
// @description  Change fonts of websites
// @author       Optimus Prime
// @match        https://www.bing.com/*
// @match        https://xerox-jira.atlassian.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let ff = 'Roboto Condensed';
    let ff2 = ff.split(' ').join('+');
    
    let mf = 'Roboto Mono';
    let mf2 = mf.split(' ').join('+');

    let css = 
`
@import url('https://fonts.googleapis.com/css?family=${ff2}:400,400i,500,500i');
@import url('https://fonts.googleapis.com/css?family=${mf}:400,700');
* {
  font-family: '${ff}', Ubuntu, 'Segoe UI', sans-serif !important;
}
code,code *, pre,pre *{
  font-family: '${mf}', Consolas, Courier, monospace !important;
}
h1, h2, h3, h4, h5, h6,
b, strong,
th {
  font-weight: 500 !important;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
