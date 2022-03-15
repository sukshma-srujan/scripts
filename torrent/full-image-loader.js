// ==UserScript==
// @name         Full Image Loader
// @namespace    https://github.com/optimus29
// @version      1.4.0
// @description  Load full images from thumbnails on torrent description page.
// @author       Optimus Prime
// @include      /^https?:\/\/(www.)?x?1337x.*/torrent/.*$/
// @include      /^https:\/\/(www.)?.*rarbg.*/torrent/.*$/
// ==/UserScript==

(function() {
    "use strict";

    const APP_NAME = "FULL_IMG_LOADER";

    const log = function _log(msg) {
        console.log(APP_NAME, msg);
    }

    const imageStyle = {
        display: "block",
        borderRadius: ".5rem",
        minWidth: "90%",
        maxWidth: "100%",
        boxShadow: "rgba(70, 70, 70, 0.75) 0px 0px 0.2rem",
        margin: "0 auto"
    };

    const IMAGE_SELECTORS = "img[data-original], img.img-responsive.descrimg, #description > a > img";
    const SPEC = [
        {
            attemptName: "remove-th",
            pattern: /.th(\.jpe?g|\.png)$/i,
            replacements: ['$1']
        },
        {
            attemptName: "dot-th",
            pattern: /th(\.jpe?g|\.png)$/i,
            replacements: ['md$1', 'lg$1']
        },
        {
            attemptName: "partial-th",
            pattern: /(.+)\/(sm|th)\/(.+)/i,
            replacements: ["$1/big/$3"]
        },
        {
            attemptName: "partial-small-1",
            pattern: /^(.+)\/small\/small_(.+)$/i,
            replacements: ["$1/big/$2"]
        },
        {
            attemptName: "partial-small-2",
            pattern: /^(.+)\/small\/([a-z1-9]+)(\/small\-)(.+)$/i,
            replacements: ["$1/big/$2/$4"]
        },
        {
            attemptName: "partial-small-3",
            pattern: /^(.+)\/small\/(.+)$/i,
            replacements: ["$1/big/$2"]
        },
        {
            attemptName: "partial-os",
            pattern: /^(.+)\/os\/(.+)$/i,
            replacements: ["$1/o/$2"]
        },
        {
            attemptName: "partial-s",
            pattern: /^(.+)\/s\/(.+)$/i,
            replacements: ["$1/i/$2"]
        }
    ];

    const PATTERNS = [/.+\/big\/.+/i];

    const ATTR_ATTEMP_IDX = "data-attempt-index";
    const ATTR_REPLACEMENT_IDX = "data-replacement-index";
    const ATTR_ORIG_URL = "data-orig-url";

    /**
     * Returns a new HTML image element after adding in the DOM before
     * the specified image. The new image has same data attributes and src
     * as the spacified image. The specified image is removed from the DOM.
     *
     * @param {HTMLImageElement} oldImage image to replace with new a image
     * @returns HTMLImageElement
     */
    function getNewImage(oldImage, attemptName) {
        const newImage = document.createElement("img");
        const originalUrl = oldImage.getAttribute("data-original");

        // set data and src same as old image
        newImage.setAttribute(ATTR_ORIG_URL, originalUrl);
        newImage.src = originalUrl;
        newImage.style.display = "block";

        if (attemptName) {
            newImage.setAttribute(ATTR_ATTEMP_IDX, attemptName);
            newImage.setAttribute(ATTR_REPLACEMENT_IDX, "0");
        }

        // add new image and remove old image
        oldImage.before(newImage);
        oldImage.remove();

        return newImage;
    }

    function findImages() {
        const images = document.querySelectorAll(IMAGE_SELECTORS);
        const selectedImages = [];

        if (!images) {
            // return if no images of the specified type are found.
            log("No images found.");
            return;
        }
        preserveImgSrc(images);

        for (const image of images) {
            const origSrc = image.getAttribute("data-original");

            for (let spec of SPEC) {
                if (origSrc.match(spec.pattern)) {
                    const newImage = getNewImage(image, spec.attemptName);
                    selectedImages.push(newImage);
                    break;
                }
            }
        }

        log("Number of images found: " + selectedImages.length);

        return selectedImages;
    }

    function handleImgLoadAttempsExhausted(image) {
        removeListeners(image);
        const originalUrl = image.getAttribute(ATTR_ORIG_URL);
        image.src = originalUrl;
        log("Image loading from thumbnail failed for src: " + originalUrl);
    }

    function handleLoadFailure(event) {
        log("Image loading failed with src: " + event.target.src);
        loadImage(event.target);
    }

    function styleImage(image) {
        applyStyle(image, imageStyle);
    }

    function applyStyle(element, cssStyle) {
        for (let cssProperty in cssStyle) {
            element.style[cssProperty] = cssStyle[cssProperty];
        }
    }

    function modifyImageParent(image) {
        const parent = image.parentNode;
        applyStyle(parent, {
            display: "block",
            margin: "1rem 0"
        });

        if (parent.tagName !== "A") return;

        const href = parent.href;
        parent.removeAttribute("href");
        parent.onclick = function() { return false; };

        const hrefWrapper = document.createElement("a");
        const hrefStyle = {
            color: "#d63600",
            fontSize: ".75rem",
            padding: ".5rem 0",
            textAlign: "center",
            display: "block",
            fontFamily: "inherit",
            textDecoration: "none"
        };

        hrefWrapper.href = href;
        hrefWrapper.innerHTML = href;
        hrefWrapper.setAttribute("target", "_blank");
        applyStyle(hrefWrapper, hrefStyle);
        image.after(hrefWrapper);
    }

    function afterImageLoad(image) {
        styleImage(image);
        modifyImageParent(image);
    }

    function handleLoadSuccess(event) {
        const image = event.target;
        removeListeners(image);
        afterImageLoad(image);
    }

    function findSpec(attemptName) {
        for (const spec of SPEC) {
            if (spec.attemptName === attemptName) {
                return spec;
            }
        }

        return null;
    }

    function loadImage(image) {
        let attemptName = image.getAttribute(ATTR_ATTEMP_IDX);
        let replacementIndex = parseInt(image.getAttribute(ATTR_REPLACEMENT_IDX));

        const spec = findSpec(attemptName);
        if (!spec || replacementIndex >= spec.replacements.length) {
            handleImgLoadAttempsExhausted(image);
            return;
        }

        const pattern = spec.pattern;
        const replacement = spec.replacements[replacementIndex];
        const imageSrc = image.getAttribute(ATTR_ORIG_URL);
        let imageNewSrc = imageSrc;

        log("trying " + spec.attemptName + " with replacement [" + replacement + "] for src " + imageSrc);

        imageNewSrc = imageSrc.replace(pattern, replacement);

        if (imageSrc !== imageNewSrc) image.src = imageNewSrc;
        else handleImgLoadAttempsExhausted(image);

        image.setAttribute(ATTR_REPLACEMENT_IDX, replacementIndex + 1);
    }

    function loadImages(imgArr) {
        if (!imgArr) return;

        for (const img of imgArr) {
            prepareImage(img);
            loadImage(img);
        }
    }

    function removeListeners(img) {
        img.onload = null;
        img.onerror = null;
    }

    function prepareImage(img) {
        img.onload = handleLoadSuccess;
        img.onerror = handleLoadFailure;
    }

    function preserveImgSrc(images) {
        for (let image of images) {
            if (!image.getAttribute("data-original")) {
                image.setAttribute("data-original", image.src);
            }
        }
    }

    function loadFullImages() {
        const images = document.querySelectorAll(IMAGE_SELECTORS);

        if (!images) return;

        preserveImgSrc(images);

        for (const image of images) {
            const origSrc = image.getAttribute("data-original");
            let imageMatched = false;

            for (const pat of PATTERNS) {
                if (origSrc.match(pat)) {
                    const newImage = getNewImage(image);
                    afterImageLoad(newImage);
                    imageMatched = true;
                    break;
                }
            }

            if (!imageMatched) {
                afterImageLoad(image);
            }
        }
    }

    function main() {
        log("Full Image Loader has started...");
        const imgArr = findImages();
        loadImages(imgArr);
        // This should execute after loadImages() has been called.
        loadFullImages();
    }

    setTimeout(main, 3000);
})();
