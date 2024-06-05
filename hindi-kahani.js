// ==UserScript==
// @name         Hindi Kahani Style
// @namespace    https://github.com/sukshma-srujan
// @version      1.0.2
// @description  Improve Style of Hindi Kahani
// @author       Jitendra Kumar
// @match        https://hindikahani.hindi-kavita.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hindi-kavita.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const style = document.createElement('style');
  style.setAttribute('title', 'jk-style');
  document.body.appendChild(style);
  style.innerHTML =
`body {
  background: #fefaf6;
}
.section {
  background: transparent;
  width: 100%;
  float: left;
  margin-top: 0;
  padding: 0;
  border: 0;
}
.section h1 {
  color: #BF360C;
}
.section h2 {
  color: #40421e;
  font-weight: normal;
}
.section h1:last-of-type {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgb(0,0,0,.25);
  margin-bottom: 1.75rem;
}
.list {
  margin-bottom: 1rem;
}
.list p {
  color: #40421e;
  font-size: 1.25rem;
  line-height: 2;
}

@media screen and (min-width: 1200px) {
  .list {
    float: left;
    width: 852px;
    max-width: none;
  }
}`;
})();
