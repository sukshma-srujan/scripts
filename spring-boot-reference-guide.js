// ==UserScript==
// @name         Spring Boot Reference Guide
// @namespace    https://github.com/optimus29
// @version      1.15
// @description  Change appearance
// @author       Optimus Prime
// @match        https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/
// @match        https://docs.spring.io/spring-security/site/docs/5.0.4.RELEASE/reference/htmlsingle/
// @match        https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html
// ==/UserScript==

(function iife(){
  
    'use strict';
    let ff = 'Fira Sans';
    let ff2 = ff.split(' ').join('+');
    
    let mf = 'Fira Mono';
    let mf2 = mf.split(' ').join('+');

    let css = 
`@import url('https://fonts.googleapis.com/css?family=Fira+Sans:300,400,400i,500,500i');
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700');
* {
  font-family: 'Fira Sans', Ubuntu, 'Segoe UI', sans-serif !important;
}/**/
html {
  background-color: #e7e7e4;
}
body {
  min-width: 700px;
  width: 65%;
  padding: 3rem 3rem;
  margin: 3rem auto;
  box-shadow: 0 0 10px #ccc;
  font-size: 16px;
  background-color: #fffffa;
  color: #332;
  /*! padding-top: 20px; */
}
a {
  color: #4a7d28;
}
div.toc > dl > dt,
div.toc > dl > dd > dl > dt,
div.toc > dl > dd > dl > dd > dl > dt,
p.releaseinfo {
  font-weight: 500;
}
.title > a {
  color: #443;
}
code, code *, pre, pre *
{
  font-family: 'Fira Mono', Consolas, Courier, monospace !important;
}
.informaltable, .note {
  width: 100%;
  overflow-x: auto;
}
div.important code, div.note code, div.tip code, div.warning code,
code {
  border: 0 !important;
  background: #f0f0f0;
}
div.important code, div.note code, div.tip code, div.warning code,
code, code * {
  color: #321 !important;
  white-space: normal !important;
  overflow-wrap: break-word;
  word-wrap: break-word;

  /*
   * Code for hypheing long words was taken from source below:
   * https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/ 
   */
  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
pre {
  padding: 1.5rem !important;
  margin: 1.5rem -1.5rem;
  border: 0 !important;
  background: #ececea;
}
.sidebar {
  border: 0;
  padding: 0.45rem 1.5rem;
  background: #ffffd4;
  margin: 1.5rem -1.5rem;
}
.hl-keyword {
  font-weight: 400;
  color: #466010;
}
h1, h2, h3, h4, h5, h6 {
  color: #030300 !important;
  font-weight: 300;
  word-break: break-all;
}
b, strong, .strong {
  color: #443 !important;
  font-weight: 500;
}
h1 {
  margin-top: 0;
  padding-top: 0;
}
div.table {
  margin: 1.5rem 0;
}
div.table .table-contents {
  width: 100%;
  overflow-x: auto;
}
div.important, div.note, div.tip, div.warning {
  margin: 1.5rem 0 !important;
  width: 100%;
  overflow-x: auto;
}
div.calloutlist > table > tbody > tr > td {
  padding-left: 0 !important;
  vertical-align: baseline;
}
div.calloutlist > table > tbody > tr > td:first-of-type > p > a {
  display: block;
}
div.calloutlist > table > tbody > tr > td > p {
  word-break: break-all;
}
h6 {
  font-size: 1.15rem;
}
h5 {
  font-size: 1.32rem;
}
h4 {
  font-size: 1.52rem;
}
h3 {
  font-size: 1.75rem;
}
h2 {
  font-size: 2rem;
}
h1 {
  font-size: 2.31rem;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    var pres = document.getElementsByTagName('pre');
    for (var p of pres) {
        p.innerHTML = p.innerHTML.replace(/\t/g, '   ');
    }
})();
