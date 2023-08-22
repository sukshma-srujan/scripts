// ==UserScript==
// @name         Image Series Loader
// @namespace    http://tampermonkey.net/
// @version      1.6.0
// @description  Load images on the page that are in a series.
// @author       Optimus Prime
// @match        *://*.1337x.to/*
// @match        *://*.1337x.so/*
// @match        *://*.1337x.st/*
// @match        *://*.1337x.ws/*
// @match        *://*.x1337x.ws/*
// @match        *://*.1337x.eu/*
// @match        *://*.1337x.se/*
// @match        *://*.1337x.is/*
// @match        *://*.1337x.gd/*
// @match        *://l337xdarkkaqfwzntnfk5bmoaroivtl6xsbatabvlb52umg6v3ch44yd.onion/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1337x.to
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Requires below scripts to be executed before this script is executed:
    // 1. https://github.com/jkbhu85/scripts/blob/main/torrent/full-image-loader.js
    // 2. https://github.com/jkbhu85/scripts/blob/main/torrent/link-to-image.js

    const APP_NAME = "IMAGE_SERIES";
    const log = function _log(msg) {
        console.log(APP_NAME, msg);
    }

    const imageStyle = {
        display: "block",
        borderRadius: ".5rem",
        maxWidth: '100%',
        boxShadow: "rgba(70, 70, 70, 0.75) 0px 0px 0.2rem",
        margin: "0 auto"
    };

    const specs = [{
        name: 'series-1',
        firstImageSelector: '.torrent-tabs .tab-content #description img.full-image-loader:first-of-type',
        imgUrlPattern: /^https?:\/\/.+\/.+\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/[a-zA-Z0-9\-\.']+\.mp4(.[0-9]{4}\.)jpg$/,
        linkElemSelector: '.torrent-tabs .tab-content #description a.js-modal-url',
        linkUrlPattern: /^https?:\/\/.+\/image\/[a-zA-Z0-9]{5}$/
    }];

    const _g = {
        maxCount: 32,
        currentCount: 0,
        lastSeriesStr: ''
    };

    function nextInSeries(seriesStr) {
        const digits = [];
        for (let i = 0; i < seriesStr.length; i++) {
            digits.push(+seriesStr.charAt(i));
        }
        return addOneToDigits(digits);
    }

    function findSpecByName(specName) {
        for (let spec of specs) {
            if (spec.name == specName) {
                return spec;
            }
        }
        return null;
    }

    function onImageLoadFailedHandler(e) {
        if (_g.currentCount >= _g.maxCount) {
            return;
        }
        _g.currentCount++;
        const img = e.target;
        const baseUrl = img.src;
        const specName = img.getAttribute('data-spec-name');
        const spec = findSpecByName(specName);
        if (!spec) {
            log('spec not found. name: ' + specName);
            return;
        }
        const seriesPart = spec.imgUrlPattern.exec(baseUrl)[1];
        let seriesNumStr = seriesPart.replaceAll('.', '');
        let nextSeriesNum = nextInSeries(_g.lastSeriesStr);
        const nextSeriesPart = `.${nextSeriesNum}.`;
        img.src = baseUrl.replace(seriesPart, nextSeriesPart);
        log('retrying to load image with url: ' + img.src);
        _g.lastSeriesStr = nextSeriesNum;
    }

    function addOneToDigits(digitArray) {
        let k = 1;
        for (let i = digitArray.length - 1; i > -1; i--) {
            let n = digitArray[i] + k;
            if (n > 9) {
                n = 0;
                k = 1;
            } else {
                k = 0;
            }
            digitArray[i] = n;
        }
        return digitArray.join('');
    }

    function applyStyle(element, cssStyle) {
        for (let cssProperty in cssStyle) {
            element.style[cssProperty] = cssStyle[cssProperty];
        }
    }

    function addImageNearLink(linkElem, imgSrc, specName) {
        let img;
        if (linkElem.previousElementSibling && linkElem.previousElementSibling.tagName == 'IMG') {
            img = linkElem.previousElementSibling;
        } else {
            img = document.createElement('img');
            linkElem.parentNode.insertBefore(img, linkElem);
        }
        img.classList.add('image-series');
        img.setAttribute('data-spec-name', specName);
        applyStyle(img, imageStyle);
        img.src = imgSrc;
        img.onerror = onImageLoadFailedHandler;
    }

    function processSpec(spec) {
        log('processing spec: ' + spec.name);
        const img = document.querySelector(spec.firstImageSelector);
        if (!img || !img.src) {
            log('no valid image found for spec name: ' + spec.name);
            return;
        }

        if (!spec.imgUrlPattern.test(img.src)) {
            log('image src does not match with the pattern for spec name: ' + spec.name);
            return;
        }

        const linkElems = document.querySelectorAll(spec.linkElemSelector);
        if (linkElems.length == 0) {
            log('no link elements found for spec name: ' + spec.name);
            return;
        }

        const validLinkElems = [];
        for (let le of linkElems) {
            if (spec.linkUrlPattern.test(le.href)) {
                validLinkElems.push(le);
            }
        }

        if (!validLinkElems || validLinkElems.length == 0) {
            log('no valid link elements found for spec name: ' + spec.name);
            return;
        }

        const baseUrl = img.src;
        // series part contains one dot as prefix and one dot as suffix
        const seriesPart = spec.imgUrlPattern.exec(baseUrl)[1];
        let seriesNumStr = seriesPart.replaceAll('.', '');
        _g.offset = validLinkElems.length;
        for (let elem of validLinkElems) {
            const nextSeriesPart = `.${seriesNumStr}.`;
            const nextImageSrc = baseUrl.replace(seriesPart, nextSeriesPart);
            addImageNearLink(elem, nextImageSrc, spec.name);
            _g.lastSeriesStr = seriesNumStr;
            seriesNumStr = nextInSeries(seriesNumStr);
        }
    }

    function perform() {
        for (let spec of specs) {
            try {
                processSpec(spec);
            } catch (err) {
                console.error('error occurred while processing spec name: ' + spec.name, err);
            }
        }
    }

    setTimeout(perform, 4000);
})();
