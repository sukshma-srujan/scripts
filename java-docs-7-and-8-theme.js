// ==UserScript==
// @name         Java Docs 8 Theme
// @namespace    optimus29
// @version      1.0
// @description  Change Java 8 Docs appearance
// @author       Optimus Prime
// @match        https://docs.oracle.com/javase/8/*
// @match        https://docs.oracle.com/javase/7/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // sans-serif font
    let sf = 'Fira Sans';
    let sf2 = sf.split(' ').join('+');
    
    // monospace font
    let mf = 'Fira Mono';
    let mf2 = mf.split(' ').join('+');

    let css = 
`@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Fira+Mono:400,700");

html {
    background-color: #f7f7f7;
}
body {
    font-family: 'Fira Sans', Ubuntu, 'Segoe UI', Arial, sans-serif !important;
    font-size: 16px;
    margin: 0 auto;
    width: 70%;
    box-shadow: 0 0 0.3rem #666;
    padding: 0 0rem;
    background-color: #ffffff;
    color: #333;
}
*{
    font-family: inherit !important;
}
pre, pre *,
code, code *{
    font-family: 'Fira Mono', 'Ubuntu Mono', consolas, monospace !important;
}
hr {
    height: 0;
    border: 0;
    border-top: 1px solid #ddc;
}
p, code, pre, li, a {
    font-size: 1rem;
}
h6{
    font-size: 1.1rem;
}
h5 {
    font-size: 1.2rem;
}
h4 {
    font-size: 1.4rem;
}
h3 {
    font-size: 1.6rem;
}
h2 {
    font-size: 1.9rem;
}
h1 {
    font-size: 2.2rem;
}
.legalCopy{
    margin-bottom: 0;
    padding-bottom: 1.5rem;
}

/* theme */
a, a:link, a:visited {
    color: #dd3300;
}
a:hover {
    color: #00aa66 !important;
}
.memberNameLink {
    font-weight: bold !important;
}
`;

    let style = document.createElement('style');
    style.innerHTML = css;

    document.head.appendChild(style);
})();
