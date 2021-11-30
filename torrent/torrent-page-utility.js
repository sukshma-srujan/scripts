// ==UserScript==
// @name         Torrent Page Utility
// @namespace    https://github.com/optimus29
// @version      1.3.0
// @description  Utilities for pages of a torrent website
// @author       Optimus Prime
// @include      /^https?:\/\/x?1337x\...\/.*$/
// ==/UserScript==

(function() {
    'use strict';

    const page = {};

    page.linkCleaner = function _linkCleaner() {
        const EXCLUDE_LIST = ['tab'];
        const links = document.querySelectorAll("a");
        let linkCleanCount = 0;

        for (let link of links) {
            const toggle = link.getAttribute("data-toggle");

            if (!EXCLUDE_LIST.includes(toggle)) {
                link.removeAttribute("data-toggle");
                link.removeAttribute("data-target");

                linkCleanCount++;
            }
        }
        console.log("Cleaned [" + linkCleanCount + "] links.");
    }

    page.directImageLoader = function _directImageLoader() {
        const imgs = document.querySelectorAll("img[data-original]");
        if (imgs.length) {
            for (let img of imgs) {
                replaceImage(img);
            }
            console.log(`Direct image loader:: Directly loaded images: ${imgs.length}`);
        } else {
            console.log("Direct image loader:: No image found to be loaded directly.");
        }
    }

    function replaceImage(imageElem) {
        const newImageElem = document.createElement("img");
        newImageElem.src = imageElem.getAttribute("data-original");

        const attrs = ["data-original", "style", "class"];
        for (let attr of attrs) {
            newImageElem.setAttribute(attr, imageElem.getAttribute(attr));
        }
        imageElem.after(newImageElem);
        imageElem.remove();
    }

    function linkInNewTab() {
      for (let link of document.querySelectorAll('.table-list a')) {
          link.setAttribute('target', '_blank');
      }
    }

    function changeStyle() {
        const css = `.table-list td { font-size: 14px; }`;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.body.appendChild(style);
    }

    page.linkCleaner();
    page.directImageLoader();
    linkInNewTab();
    changeStyle();
})();
