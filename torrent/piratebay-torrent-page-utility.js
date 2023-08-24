// ==UserScript==
// @name         Piratebay Torrent Page Utilities
// @namespace    http://tampermonkey.net/optimus-prime
// @version      1.1.0
// @description  Various utilities for torrent description page on thepiratebay and its proxies
// @author       Optimus Prime
// @match        *://thepiratebay.org/description.php?id=*
// @match        *://pirateproxy.surf/description.php?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thepiratebay.org
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const _g = {
    urlPattern: /(?<domain>https?:\/\/[a-zA-Z0-9\-\.\_]+\.[a-zA-Z]+)(\/[a-zA-Z0-9\:\-\%\$\#\.]+)*/gm
  }
  const descElem = document.querySelector("#description_text");
  const descTextElem = document.querySelector("#description_text > label");

  function findLinks(text) {
    if (!text) return [];
    return text.match(_g.urlPattern);
  }

  function makeLinks() {
    const text = descTextElem.innerText;
    const links = findLinks(text);

    if (links.length == 0) return;

    const linkWrapper = document.createElement("div");
    linkWrapper.classList.add("jk-section");
    linkWrapper.id = "linkSection";
    for (const link of links) {
      const a = document.createElement("a");
      a.href = link;
      a.innerHTML = link;
      a.classList.add("jk-link", "jk-link-desc");
      a.setAttribute("target", "_blank");
      linkWrapper.appendChild(a);
    }
    descElem.appendChild(linkWrapper);
  }
  function addStyle() {
     const css =
           `.jk-section {
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0 0 2px rgba(0,0,0,.2);
  border-radius: .25rem;
}
.jk-link-desc {
  display: block;
  text-decoration: none;
  border-bottom: 0 !important;
}
.jk-link-desc + .jk-link-desc {
  margin-top: .5rem;
}`;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.body.appendChild(style);
  }
  makeLinks();
  addStyle();
})();
