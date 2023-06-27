// ==UserScript==
// @name         Youtube Utilities
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Open a video in a new tab in mobile youtube.
// @author       Optimus Prime
// @match        https://m.youtube.com/*
// @match        https://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
/* for opening videos in tab directly */
@keyframes nodeInserted {
    from { opacity: 0.99; }
    to { opacity: 1; }
}
ytm-rich-item-renderer {
    animation-duration: 0.001s;
    animation-name: nodeInserted;
    position: relative;
}
ytm-rich-item-renderer > .video-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
/* hide reels */
ytm-reel-shelf-renderer {
    display: none !important;
}
`;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);

    const coverSetter = function setupCover(elem) {
        if (elem.getAttribute('data-cover-set') === 't') {
            return;
        }

        const a = elem.querySelector("a.media-item-thumbnail-container");
        if (a) {
            const cover = document.createElement("a");
            cover.classList.add('video-cover');
            cover.setAttribute("href", a.getAttribute("href"));
            cover.setAttribute("target", "_blank");
            elem.appendChild(cover);
            elem.setAttribute("data-cover-set", "t");
        }
    }

    const nodeInsertListener = function(event){
        if (event.animationName == "nodeInserted") {
            coverSetter(event.target);
        }
    }

    document.addEventListener("animationstart", nodeInsertListener, false);
    document.querySelectorAll("ytm-rich-item-renderer").forEach(e => coverSetter(e));
})();
