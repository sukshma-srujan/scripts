// ==UserScript==
// @name         Spring Boot Reference Guide
// @namespace    https://github.com/optimus29
// @version      1.4
// @description  Change appearance
// @author       Optimus Prime
// @match        https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/
// ==/UserScript==

(function iife(){
  
    'use strict';
    let ff = 'Fira Sans';
    let ff2 = ff.split(' ').join('+');
    
    let mf = 'Fira Mono';
    let mf2 = mf.split(' ').join('+');

    let css = 
`@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700');
* {
  font-family: 'Fira Sans', Ubuntu, 'Segoe UI', sans-serif !important;
}
html {
  background-color: #171717;
}
body {
  width: 65%;
  padding: 0 3rem;
  margin: 0 auto;
  box-shadow: 0 0 10px #ccc;
  font-size: 16px;
  background-color: #fffffa;
}
code, code *, pre, pre *
{
  font-family: 'Fira Mono', Consolas, Courier, monospace !important;
}
.informaltable {
  width: 100%;
  overflow: scroll;
}
div.important code, div.note code, div.tip code, div.warning code,
code, pre {
  border: 0 !important;
  background: #f0f0f0;
}
div.important code, div.note code, div.tip code, div.warning code,
code, code * {
  color: #321 !important;
}
pre {
  padding: 1.5rem !important;
  margin: 1.5rem -1.5rem;
}
.sidebar {
  border: 0;
  padding:1px 1.5rem;
  background: #fffff4;
  margin: 1.5rem -1.5rem;
}
.hl-keyword {
  font-weight: 400;
  color: #466010;
}
h1, h2, h3, h4, h5, h6 {
  color: #444 !important;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
