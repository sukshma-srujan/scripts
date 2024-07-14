// ==UserScript==
// @name         The Pirate Bay Style
// @namespace    https://github.com/jkbhu85
// @version      1.8.0
// @description  Tweak appearance of the pirate bay website.
// @author       Jitendra Kumar
// @match        https://thepiratebay.org/*
// @icon         https://www.google.com/s2/favicons?domain=thepiratebay.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`@import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merienda:wght@400;600&display=swap');
:root {
  --border-radius-1: .25rem;
  --border-radius-2: .5rem;
}
body {
  font-family: 'Merienda', 'Fira Sans', sans-serif;
  font-size: .85rem;
  background-color: #D7CCC8;
}
#home > header > nav > section > img {
  opacity: .5;
  border-radius: var(--border-radius-2);
  box-shadow: 0 0 .5rem rgba(255,255,255,1);
}
.browse .col-center {
  padding: 0;
}
#logo {
  opacity: .75;
}
#search {
  background-color: rgba(255, 255, 255, .5);
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: var(--border-radius-1);
}
#browse h1 {
  font-weight: 550 !important;
  background: transparent !important;
  border-bottom: 1px solid rgba(0,0,0,.2) !important;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 0rem;
  padding-bottom: .5rem;
}
/* the results table*/
#torrents {
  margin-top: 1rem;
  border-radius: var(--border-radius-2);
  overflow: hidden;
}
/* table header */
.list-header {}
#torrents span.list-header {
  border: 0;
}
.list-header .list-item {
  padding: .75rem 1rem !important;
  text-align: left !important;
  font-weight: 500;
}
/* a result */
.list-entry {}
.list-entry > * {
  padding: .75rem 1rem !important;
}
#torrents li.list-entry {
  background-color: #ffffff80;
}
#torrents li.list-entry.alt {
  background-color: #ffffff80;
}
#torrents li.list-entry > * {
  border-bottom: 1px solid #EFEBE9;
}
#torrents span.item-title {
  display: table-cell;
}
#torrents.view-single li.list-entry span.item-icons {
  width: initial;
  display: table-cell;
}
/* Torrent description page */
#description_container {
  border-radius: var(--border-radius-2);
  padding: 1rem;
  background: #ffffff80;
}
#description_container > h2:first-of-type {
  font-weight: 300;
  margin: -1rem;
  margin-bottom: .5rem;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-2);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
#description_container .text-box {
  font: 1.25em "Syne Mono";
  background: #ffffff40;
  border-radius: .25rem;
  padding: 1.5rem;
}
#description_container #filelist ol li {
  padding: .25rem 0;
  font-size: .8rem;
  color: #373737f0;
}
#description_container #filelist ol li + li {
  border-top: 1px solid #00000010;
}
#description_container #filelist ol li.alt {
  background-color: transparent;
}`;
    const style = document.createElement('style');
    style.innerHTML = css;
    style.setAttribute('title', 'jk-the-pirate-bay-style');
    document.body.appendChild(style);
})();
