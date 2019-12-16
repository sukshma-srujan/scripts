// ==UserScript==
// @name         Image Only
// @namespace    https://github.com/optimus29
// @version      1.0
// @description  Detect image and show only the image.
// @author       Optimus Prime
// @match        http://*/*
// @match        https://*/*
// ==/UserScript==


(function() {
    'use strict';

    const url = window.location.href;
    if (/\.(jpe?g|png)$/i.test(url)) {
        console.log("Window already has an image opened.");
        return;
    }

    if (typeof window.varabcdef8e234dhfjf !== "undefined") {
        console.log("Image only is already running");
        return;
    }
    else {
        console.log("Image only is starting...");
        window.varabcdef8e234dhfjf = "running";
    }

    function loadImageWithRetires() {
        const SELECTORS = [
            "#image-viewer > #image-viewer-container > img",
            "img#soDaBug"
        ];

        let img;
        for (let imgSelector of SELECTORS) {
            img = document.querySelector(imgSelector);

            if (img && img.src) break;
            else img = null;
        }

        if (img && /^https?:\/\/.*/.test(img.src)) {
                window.location.href = img.src;
                return;
        }
        else {
            setTimeout(loadImageWithRetires, 1000);
        }

        if (typeof wuLu === "function") {
            console.log("Image url found");
            wuLu();
        }
        console.log("No image found to show in full page.");
    }

    loadImageWithRetires();
})();