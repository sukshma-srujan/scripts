// ==UserScript==
// @name         Spring Boot Reference Guide
// @namespace    https://github.com/optimus29
// @version      1.1
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
`
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700');
* {
  font-family: 'Fira Sans', Ubuntu, 'Segoe UI', sans-serif !important;
}
body {
  width: 65%;
  padding: 0 40px;
  margin: 0 auto;
  box-shadow: 0 0 10px #aaa;
  font-size: 16px;
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
pre {
  padding: 20px !important;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.sidebar {
  border: 0;
  padding:1px 20px;
  background: #f7f7f0;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
