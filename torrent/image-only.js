// ==UserScript==
// @name         Image Only
// @namespace    https://github.com/optimus29
// @version      1.0.2
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
        const pat = /^.+\.((sm|md)\.(jpe?g|png))$/;
        if (pat.test(url)) {
            console.log("Medium or small size image detecting.");
            const arr = pat.exec(url);
            const newUrl = url.replace(arr[1], arr[3]);
            console.log("Redirecting to new url: " + newUrl);
            window.location.href = newUrl;
        }
        return;
    }

    if (typeof window.varabcdef8e234dhfjf !== "undefined") {
        console.log("Image only is already running");
        return;
    }
    else {
        console.log("Image only is starting...");
        window.varabcdef8e234dhfjf = "running";
        window.maxRetries = 60;
    }

    if (window.retries) window.retries += 1;
    else window.retries = 0;

    function loadImageWithRetires() {
        const SELECTORS = [
            "#image-viewer-container > img",
            "a > img.centred_resized",
            "img#soDaBug",
            "#container > #image_details + img"
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
            if (window.maxRetries > window.retries) setTimeout(loadImageWithRetires, 1000);
            else console.log("Image only is exiting.");
        }

        if (typeof wuLu === "function") {
            console.log("Image url found");
            wuLu();
        }
        console.log("No image found to show in full page.");
    }

    loadImageWithRetires();
})();
