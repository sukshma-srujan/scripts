// ==UserScript==
// @name         Piratebay Torrent Page Utilities
// @namespace    http://tampermonkey.net/optimus-prime
// @version      1.3.0
// @description  Various utilities for torrent description page on thepiratebay and its proxies
// @author       Optimus Prime
// @match        *://thepiratebay.org/description.php?id=*
// @match        *://pirateproxy.surf/description.php?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thepiratebay.org
// @grant        none
// ==/UserScript==

(function ptpu() {
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
    const arr = [];
    for (const link of links) {
      const a = document.createElement("a");
      a.href = link;
      a.innerHTML = link;
      a.classList.add("jk-link", "jk-link-desc");
      a.setAttribute("target", "_blank");
      linkWrapper.appendChild(a);
      arr.push(a);
    }
    if (arr.length > 1) {
      const btnOpenAll = document.createElement("a");
      btnOpenAll.href = "#";
      btnOpenAll.addEventListener("click", (e) => arr.forEach(a => a.click()));
      btnOpenAll.innerHTML = "Open All Links";
      btnOpenAll.classList.add("jk-link", "jk-link-desc");
      linkWrapper.appendChild(btnOpenAll);
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

  function createTorrentDownloadLinks() {
    // check if hash value is present
    const hashElem = document.querySelector(`#metadata label#ih`);
    if (!hashElem) {
      console.log("hash element not found");
      return;
    }
    const hash = hashElem.innerText;
    const hashPat = /[a-zA-Z0-9]+/
    if (!hashPat.test(hash)) {
      console.log("hash is not valid");
      return;
    }

    // check if magnet link found
    const magElem = document.querySelector(`.links #d a[href^="magnet"]`);
    if (!magElem) {
      console.log("magnet element not found");
      return;
    }
    const links = magElem.parentNode;

    // genereate download links
    const torLinkData = [
      {title:"iTorrent", url:`http://itorrents.org/torrent/${hash}.torrent`},
      {title:"Torrage", url:`http://torrage.info/torrent.php?h=${hash}`},
      {title:"BtCache", url:`http://btcache.me/torrent/${hash}`}
    ];

    // create anchors for download links
    const anchorWrapper = document.createElement("div");
    anchorWrapper.classList.add('jk-tor-anchor-wrapper');
    const aStyle = document.createElement("style");
    aStyle.innerHTML = `
.jk-tor-anchor-wrapper {
  margin-top: 1rem;
}
.jk-tor-anchor::before {
  content: "\\21E9";
  padding-right: 5px;
}
	`;
    anchorWrapper.appendChild(aStyle);
    links.appendChild(anchorWrapper);

    for (let tLinkData of torLinkData) {
      const a = document.createElement('a');
      a.href = tLinkData.url;
      a.innerHTML = tLinkData.title;
      a.setAttribute("target", "_blank");
      a.classList.add("jk-tor-anchor");
      anchorWrapper.appendChild(a);
    }
  }

  createTorrentDownloadLinks();
  makeLinks();
  addStyle();
})();
