// ==UserScript==
// @name         Java 6 Docs Theme
// @namespace    https://github.com/optimus29
// @website      https://github.com/optimus29
// @version      1.1
// @description  Java 6 Docs Theme
// @author       Optimus Prime
// @match        https://docs.oracle.com/javaee/6/api/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`
body {
  width: 70%;
  margin: 0 auto;
}
h1, h2, h3, h4, h5, h6,
b, strong {
  color: #333;
}
.NavBarFont1Rev b{
  color: #fff !important;
}
a, a:link {
  color: #004D40 !important;
  text-decoration: none !important;
}
a:visited {
  color: #880E4F !important;
}
hr {
  height: 0 !important;
  border: 0 !important;
  border-top: 0.07rem solid rgba(0, 77, 64, 0.15) !important;
}
table {
  border-collapse: collapse;
  border-color: #aaa;
}
th, td {
  padding: 10px;
}
tr > td:nth-of-type(2) {
  padding-left: 0 !important;
}
th {
  border-color: #aaa;
}
td {
  border-color: #ccc;
  border-left: 0;
  border-right: 0;
}
.TableSubHeadingColor,
.TableHeadingColor {
  background: transparent;
  border-color: #aaa;
}
`;

    const style = document.createElement('style');
    style.innerHTML = css;

    document.head.appendChild(style);
})();
