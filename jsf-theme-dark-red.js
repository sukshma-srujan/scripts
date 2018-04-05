// ==UserScript==
// @name         JSF Dark-Red Theme
// @namespace    optimus29
// @version      1.0
// @description  Dark-Red theme for JSF Oracle Documentation
// @author       Optimus Prime
// @match        https://docs.oracle.com/javaee/5/javaserverfaces/1.2/*
// @match        https://docs.oracle.com/javaee/7/javaserver-faces-2-2/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let css = 
`@import url("https://fonts.googleapis.com/css?family=Fira+Mono|Fira+Sans:400,400i,700");
hr, table {
    border: 0
}

* {
    box-sizing: border-box
}

body {
    font-family: "Fira Sans", sans-serif;
    font-size: 16px;
    margin: 0 auto 1em;
    max-width: 900px;
    color: #eee;
    background: #222;
}

p {
    font-family: inherit;
    font-size: inherit;
}

code, pre {
    font-family: "Fira Mono", consolas, monospace;
    font-size: 14px
}

pre {
    width: 100%;
    white-space: normal;
    padding: 20px;
    background: #000;
    border: 0
}

hr {
    height: 0;
    border-top: 1px solid #666;
}

table {
    border-collapse: collapse
}

table td, table tr {
    padding: 10px;
    border-color: #666;
    background: inherit;
}

.TableRowColor {
    background: inherit;
}

.TableHeadingColor {
    background: #333;
}

.TableHeadingColor b {
    font-weight: 300;
}

a:link, a:visited, a:active {
    text-decoration: none;
    font-weight: 400;
    color: #D92231;
}

a[name] {
    color: inherit;
}

.NavBarCell1Rev {
    background: #D92231;
}

.NavBarCell2 {
    background: #444;
}

.NavBarCell2 b {
    font-size: 12px
}

.NavBarCell1 {
    background: #444;
    font-family: inherit;
}

.NavBarCell1, .NavBarCell1Rev, .NavBarCell2, .NavBarFont1, .NavBarFont1Rev {
    font-family: inherit;
    color: #eee;
}

ul {
    list-style: square
}`;

    var style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
