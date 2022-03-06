// ==UserScript==
// @name         GoF Patterns
// @namespace    https://github.com/jkbhu85
// @version      1.0
// @description  Change appearance of GofPatterns website.
// @author       Jitendra Kumar
// @match        https://www.gofpatterns.com/*
// @icon         https://www.google.com/s2/favicons?domain=gofpatterns.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll("style").forEach(e => e.remove());

    const css =
`body {
  font-family: Roboto, "Fira Sans", sans-serif;
  background-color: #f7f7f7;
  font-size: 1rem;
}
* {
  box-sizing: border-box;
}
kbd, pre, code, samp {
  font-family: "Fira Mono";
}
pre {
  padding: 1.5rem;
  background: #f7f7f7;
  border-radius: 2px;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}
h1 {
  font-size: 2.25rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.7rem;
}
h2 {
  border-bottom: 1px solid #ddd;
  padding-bottom: .25em;
}
a {
  text-decoration: none;
}
a > strong {
  font-weight: normal;
}

#wrapper > section {
  max-width: 45rem;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 2px #ccc;
  border-radius: 4px;
  padding: 4rem;
}
.breadcrumb {
  margin: 0 -1rem;
  padding: 0;
  list-style: none;
  margin-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
}
.breadcrumb > li {
  float: left;
  padding: .5rem 1rem;
  border: 0px dashed;
  white-space: pre;
}
#lesson {
  font-size: 1.5rem;
  font-weight: 300;
}
.ezoic-adpicker-ad {
  display: none;
}
.social-bar {
  margin-top: 2rem;
}
.social-bar amp-social-share {
  border-radius: 2px;
  width: 2rem !important;
  height: 2rem !important;
}
.social-bar amp-social-share + amp-social-share {
  margin-left: 1rem;
}
header {
  text-align: center;
  margin: 2rem 0 .5rem;
}
footer {
  margin: .5rem 0 2rem;
  text-align: center;
}
header + * + button {
  display: none;
}

#logo {
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
  background-color: #fff;
  padding: 1rem 0;
  color: #000;
  box-shadow: 0 0 4px #aaa;
  font-family: "Playfair Display", times, serif;
}
#logo a {
  color: inherit;
}
#sitemap ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  display: flex;
  justify-content: right;
}
#sitemap li {
  padding: 0 1rem;
}
#menu, .search {
  width: 70%;
  margin: 0 calc(15% - 1rem);
}
#menu {
  display: flex;
}
#menu > div {
  padding: 0 1rem;
}
.search {
  padding: 0 1rem;
}
#localnav {
  width: 70%;
  margin: 0 auto;
}
#localnav ul {
  padding: 0 1rem;
  margin: 0 -1.5rem 2rem;
  list-style: none;
}
#localnav ul {
  display: flex;
  flex-wrap: wrap;
}
#localnav ul li {
  margin: .5rem;
}
#localnav ul li a {
  padding: .75rem 1.5rem;
  display: block;
  border-radius: .25rem;
  color: #fff;
  box-shadow: 0 0 2px #ef9a9a;
  background: #B71C1C;
}
#data_table {
  border-collapse: collapse;
  border: 0;
}
#data_table > tbody > tr > td {
  border: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
}
#data_table > tbody > tr:first-of-type > td {
  border-top: 2px solid #ddd;
}
#data_table > tbody > tr:last-of-type > td {
  border-bottom: 2px solid #ddd;
}
figure img {
  width: 100%;
}
figcaption {
  text-align: center;
  font-style: italic;
  padding-top: 1rem;
}
.par-spacing {
  height: 1rem;
}`;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    function insertDivAfterParagraph() {
        const brs = document.querySelectorAll("#wrapper > section > div > br");
        for (let br of brs) {
            const div = document.createElement("div");
            div.classList.add('par-spacing');
            br.parentNode.insertBefore(div, br.nextSibling);
        }
    }
    insertDivAfterParagraph();
})();
