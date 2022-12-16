// ==UserScript==
// @name         Image Only
// @namespace    https://github.com/optimus29
// @version      1.1.2
// @description  Detect image and show only the image.
// @author       Optimus Prime
// @match        http://*/*
// @match        https://*/*
// ==/UserScript==

(function () {
    "use strict";
    const APP_NAME = "Image Only";
    function log(...args) {
        console.log.apply(null, [APP_NAME, new Date().toISOString(), "--", ...args]);
    }

    function isThisScriptAlreadyRunning() {
        if (window.varabcdef8e234dhfjf) {
            window.varabcdef8e234dhfjf = "running";
            return true;
        }
        return false;
    }

    function isCurrentUrlAnImage() {
        return /\.(jpe?g|png)$/i.test(window.location.href) &&
            document.body.children.length == 1 &&
            document.body.children[0].tagName == 'IMG';
    }

    let abortExeuction = false;
    let abortMessage = "";
    if (isThisScriptAlreadyRunning()) {
        abortMessage = "Script is already running.";
        abortExeuction = true;
    }
    if (isCurrentUrlAnImage()) {
        abortMessage = "Current URL is already an image.";
        abortExeuction = true;
    }

    if (abortExeuction) {
        log(abortMessage);
        return;
    }

    /**
   * Executes a task for the given number times with a specified interval.
   * Delay for the first execution can be specified with `startAfter` parameters.
   * Default value of `startAfter` is 0. Scheduling of the task stops if the task
   * function returns a **truthy** value.
   *
   * @param {function} taskFn task to execute
   * @param {number} times number of times task should be executed
   * @param {number} interval interval in millis between two subsequent task execution
   * @param {number} startAfter delay in millis before first execution
   */
    function retry(taskFn, times, interval, startAfter) {
        const idfCompletedTries = "image_only_completed_tries";
        sessionStorage.setItem(idfCompletedTries, 0);

        function start() {
            const completedTries = +sessionStorage.getItem(idfCompletedTries);
            if (completedTries >= times) {
                sessionStorage.removeItem(idfCompletedTries);
                return;
            }
            sessionStorage.setItem(idfCompletedTries, completedTries + 1);
            if (!taskFn()) {
                setTimeout(start, interval);
            }
        }
        setTimeout(start, startAfter);
    }

    function showImage() {
        function getImageElement() {
            const IMAGE_SELECTORS = [
                "#image-viewer-container > img",
                "a > img.centred_resized",
                "img#soDaBug",
                "#container > #image_details + img",
                "center img#myImg",
                "a > img.pic.img.img-responsive"
            ];

            let imageElement;
            for (let imgSelector of IMAGE_SELECTORS) {
                imageElement = document.querySelector(imgSelector);

                if (imageElement && imageElement.src) {
                    break;
                }
            }
            if (imageElement) {
                log("Actual image element found.");
            }
            return imageElement;
        }

        function getFullSizeImageUrl(url) {
            const pat = /^.+\.((sm|md)\.(jpe?g|png))$/;
            let newUrl = url;
            if (pat.test(url)) {
                console.log("Medium or small size image detected.");
                const arr = pat.exec(url);
                newUrl = url.replace(arr[1], arr[3]);
            }
            return newUrl;
        }

        if (typeof window.wuLu === "function") {
            console.log("Function to display image found.");
            window.wuLu();
            return true;
        }

        const imageElement = getImageElement();

        if (imageElement) {
            window.location.href = getFullSizeImageUrl(imageElement.src);
            return true;
        }
        return false;
    }

    retry(showImage, 60, 1000, 0);
})();
