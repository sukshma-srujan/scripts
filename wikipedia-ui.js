// ==UserScript==
// @name         Wikipedia UI
// @namespace    optimus29
// @version      1.0
// @description  Change font, font size and appearance of top of page.
// @author       Optimus Prime
// @match        https://*.wikipedia.org/*
// @grant        none
// ==/UserScript==

(function IIFE() {
    'use strict';
    
    let sf = 'Fira Sans';
    let sf2 = sf.split(' ').join('+');
    
    let mf = 'Fira Mono';
    let mf2 = mf.split(' ').join('+');
    
    let css = 
`
@import url('https://fonts.googleapis.com/css?family=${sf2}:400,400i,600');
@import url('https://fonts.googleapis.com/css?family=${mf2}:400,700');
body{font-family: '${sf}', sans-serif;font-size: 24px;}
pre, code, tt, kbd, samp, .mw-code{font-family:'${mf}', consolas, monospace;}
code{font-weight: 400;}
body table:first-of-type tr td:last-of-type{width: 100%;padding-left: 16px;}
`;
    
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    
    var tbls = document.querySelectorAll('body table');
    var tbl, i;
    
    for (i = 0; tbls && i < tbls.length; i++) {
        if ( tbls[i].classList.contains('infobox') ) {
            tbl = tbls[i];
            break;
        }
    }
    
    if ( tbl ) {
        tbl.style.float = 'none';
        tbl.style.width = '100%';
        tbl.style.marginLeft = '0';
        tbl.style.marginRight = '0';
        tbl.style.marginBottom = '3em';
    } else {
        console.error("Table not found.");
    }
})();
