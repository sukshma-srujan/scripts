// ==UserScript==
// @name         Spring Boot Reference Guide
// @namespace    https://github.com/optimus29
// @version      1.6
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
@import url('https://fonts.googleapis.com/css?family=${ff2}:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=${mf2}:400,700');
* {
  font-family: '${ff}', Ubuntu, 'Segoe UI', sans-serif !important;
}
body {
  width: 65%;
  padding: 0 40px;
  margin: 0 auto;
  box-shadow: 0 0 10px #aaa;
}
code, code *, pre, pre *
{
  font-family: '${mf}', Consolas, Courier, monospace !important;
}
.informaltable {
  width: 100%;
  overflow: scroll;
}
`;
    
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
})();
