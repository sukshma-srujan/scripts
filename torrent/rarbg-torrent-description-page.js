// ==UserScript==
// @name         RARBG Torrent Description Page
// @namespace    https://github.com/jkbhu85
// @version      1.1.0
// @description  Change appearance of the RARBG torrent description page.
// @author       You
// @match        https://proxyrarbg.org/torrent/*
// @match        https://www.rarbgprx.org/torrent/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`td.header2 {
  background: none;
}
.lista > tbody > tr > td {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}
.lista > tbody > tr:first-child > td:last-child > a:last-of-type {
  margin-left: 1rem;
  background: #4A148C;
  color: white;
  padding: .5rem 1.5rem;
  display: inline-block;
  border-radius: .25rem;
}
.lista > tbody > tr:first-child > td:last-child img {
  vertical-align: middle;
}
.lista > tbody > tr:first-child > td:last-child > a:last-of-type::after {
  content: "Magnet Link";
  padding-left: .5rem;
}`;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);
})();
