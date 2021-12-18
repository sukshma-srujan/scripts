// ==UserScript==
// @name         RARBG Appearance
// @namespace    https://github.com/jkbhu85
// @version      1.0.0
// @description  Change appearance of rarbg webiste.
// @author       Optimus Prime
// @match        https://proxyrarbg.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`
body {
  font-family: 'Fira Sans';
  font-size: 9pt;
}
button, input, select, option {
  font-family: 'Fira Sans';
}
td.lista {
  font-size: inherit;
}
a {
  text-decoration: none;
}
.lista2t {
  border-collapse: collapse;
  border: 0 !important;
  background: none !important;
}
.lista2t > tbody > tr {
  border: 0 !important;
  background: none !important;
}
.lista2t > tbody > tr + tr {
  border-top: 1px solid #eee !important;
}
.lista2t > tbody > tr > td {
  border: 0 !important;
  background: none !important;
}
.lista2t > tbody > tr > td {
  padding: .5rem;
  vertical-align: top;
}
.lista2t > tbody > tr > td:nth-child(2) > a {
  font-size: 1rem;
  font-weight: 500;
  color: #1A237E;
}
td.header6.header40 {
  vertical-align: middle !important;
}
td.header6.header40,
td.header6.header40 a {
  background: #f7f7f7 !important;
  color: #333 !important;
  font-size: .8rem !important;
  font-weight: 500 !important;
}
.lista2t > tbody > tr:first-child > td:first-child {
  border-top-left-radius: .25rem;
}
.lista2t > tbody > tr:first-child > td:last-child {
  border-top-right-radius: .25rem;
}
td.header5,
td.header3 {
  background: #283593;
}
.btn-primary {
  background-color: #283593 !important;
  border: 0 !important;
}
#pager_links a,
#pager_links b {
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  padding: .5rem;
  line-height: 1rem;
}`;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);

    function linkInNewTab() {
        const table = document.querySelector('.lista2t');
        if (table) {
            const links = table.querySelectorAll('a');
            for (let link of links) {
                link.setAttribute('target', '_blank');
            }
        }
    }
    linkInNewTab();
})();
