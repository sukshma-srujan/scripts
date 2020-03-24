// ==UserScript==
// @name         JavaDoc Theme for Java 7 and 8
// @namespace    https://github.com/optimus29
// @version      1.4
// @description  Change JavaDoc appearance
// @author       Optimus Prime
// @match        https://docs.oracle.com/javase/8/*
// @match        https://docs.oracle.com/javase/7/*
// @match        https://docs.spring.io/spring-framework/docs/current/javadoc-api/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // sans-serif font
    const sf = 'Fira Sans';
    const sf2 = sf.split(' ').join('+');

    // monospace font
    const mf = 'Fira Mono';
    const mf2 = mf.split(' ').join('+');

    const css =
`@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Fira+Mono:400,700");

html {
    background-color: #f7f7f7;
}
body {
    font-family: 'Fira Sans', Ubuntu, 'Segoe UI', Arial, sans-serif !important;
    font-size: 1rem;
    margin: 0 auto;
    width: 80%;
    box-shadow: 0 0 0.3rem #666;
    padding: 0 0rem;
    background-color: #ffffff;
    color: #333;
}
*{
    font-family: inherit !important;
    box-sizing: border-box;
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
h3, h4, h5, h6 {
    font-weight: 300;
}
.header, .contentContainer {
  margin: 0 2rem;
}
.title {
  font-weight: normal;
}
.legalCopy{
    margin-bottom: 0;
    padding-bottom: 1.5rem;
}

/* theme */
a, a:link, a:visited {
    color: #ad1457;
}
a:hover {
    color: #00aa66 !important;
}
a:link {
    font-weight: normal !important;
}
th.colFirst, th.colLast, th.colOne, .constantsSummary th {
  background: #ddddd0;
}
.memberSummary caption span {
    height: auto;
}
.rowColor {
    background-color:#FFF0E0;
}
.subTitle {
  color: #777;
}
`;

    const style = document.createElement('style');
    style.innerHTML = css;

    document.head.appendChild(style);
})();
