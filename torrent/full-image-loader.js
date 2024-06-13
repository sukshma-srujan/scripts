// ==UserScript==
// @name         Full Image Loader
// @namespace    https://github.com/sukshma-srujan
// @version      1.14.0
// @description  Load full images from thumbnails or small images on torrent description page.
// @author       Optimus Prime
// @match        *://*.1337x.to/torrent/*
// @match        *://*.1337x.so/torrent/*
// @match        *://*.1337x.st/torrent/*
// @match        *://*.1337x.ws/torrent/*
// @match        *://*.x1337x.ws/torrent/*
// @match        *://*.1337x.eu/torrent/*
// @match        *://*.1337x.se/torrent/*
// @match        *://*.1337x.is/torrent/*
// @match        *://*.1337x.gd/torrent/*
// @match        *://l337xdarkkaqfwzntnfk5bmoaroivtl6xsbatabvlb52umg6v3ch44yd.onion/torrent/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1337x.to
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const APP_NAME = "FULL_IMG_LOADER";
  const debugging = true;

  const log = function _log(msg) {
    console.log(APP_NAME, msg);
  }
  const debug = function _debug(msg) {
    if (!debugging) {
      return;
    }
    console.log(APP_NAME, 'DEBUG', msg);
  }

  const imageStyle = {
    display: "block",
    borderRadius: ".5rem",
    maxWidth: "100%",
    minWidth: '50%',
    boxShadow: "rgba(70, 70, 70, 0.75) 0px 0px 0.2rem",
    margin: "0 auto"
  };

  const imageLinkStyle = {
    color: "#d63600",
    fontSize: ".75rem",
    padding: ".5rem 0",
    textAlign: "center",
    display: "block",
    fontFamily: "inherit",
    textDecoration: "none"
  };


  const PATTERNS = [/.+\/big\/.+/i];

  const ATTR_ATTEMP_IDX = "data-attempt-index";
  const ATTR_REPLACEMENT_IDX = "data-replacement-index";
  const ATTR_ORIG_URL = "data-orig-url";

  const IMAGE_SELECTORS = "img[data-original], img.img-responsive.descrimg, #description > a > img";
  const SPEC = [
    {
      attemptName: "img-link-in-parent-anchor",
      pattern: /https:\/\/i.ibb.co\/[a-zA-Z0-9]{7}\/thumb\-[a-z0-9]{32}.jpg$/i,
      maxReplacementCount: 1,
      getImageUrl: function(image, replacementIndex) {
        const pe = image.parentNode;
        if (pe.tagName != 'A') {
          return -1;
        }
        return pe.href;
      }
    },
    {
      attemptName: 'imagehaha',
      pattern: /^https?:\/\/img\d\d\.imagehaha.com\/th\/\d{5}\/[a-zA-Z0-9]+\.(jpg|jpeg|png)$/,
      maxReplacementCount: 1,
      getImageUrl: function(image, replacementIndex) {
        if (replacementIndex > 0) {
          log('imghaha replacementIndex > 0');
          return -1;
        }
        const imgParent = image.parentNode;
        if (imgParent.tagName !== 'A') {
          log('imghaha parent tagName != A');
          return image.src;
        }
        const parentHref = imgParent.href;
        if (parentHref === '' || parentHref.indexOf('/') < 0) {
          log('imghaha parent href is either empty or does not contain slash');
          return image.src;
        }
        const imageName = parentHref.substring(parentHref.lastIndexOf('/') + 1);
        const origUrl = image.getAttribute(ATTR_ORIG_URL);
        const newUrl = origUrl + '/' + imageName;
        return newUrl.replace('/th/', '/i/');
      }
    },
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
      exclusion: /https?:\/\/s\d\d.+/,
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
    },
    {
      attemptName: "partial-alphanumeric-s",
      pattern: /^(.+)\/([0-9a-z])s\/(\d{4}\/\d{2})\/(.+)$/i,
      replacements: ["$1/$2/$3/$4"]
    },
    {
      attemptName: "t-to-o",
      pattern: /^(.+)\/thumbs2(.+)\/(.+)\/(.+)_t(\..+)$/i,
      replacements: ["$1/images2$2/$3/$4_o$5"]
    }
  ];

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
    newImage.classList.add('full-image-loader');

    if (attemptName) {
      newImage.setAttribute(ATTR_ATTEMP_IDX, attemptName);
      newImage.setAttribute(ATTR_REPLACEMENT_IDX, "0");
    }

    // add new image and remove old image
    oldImage.before(newImage);
    oldImage.remove();

    return newImage;
  }

  function isMatch(spec, image) {
    const origSrc = image.getAttribute("data-original");
    if (origSrc.match(spec.pattern)) {
      if (spec.exclusion && spec.exclusion.test(origSrc)) {
        return false;
      }
      return true;
    }
    return false;
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
        if (isMatch(spec, image)) {
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
    if (image.classList.contains('full-image-loader')) {
      applyStyle(image, imageStyle);
    }
  }

  function applyStyle(element, cssStyle) {
    for (let cssProperty in cssStyle) {
      element.style[cssProperty] = cssStyle[cssProperty];
    }
  }

  function modifyImageParent(image) {
    if (image.parentNode.tagName !== "A") return;

    const parent = document.createElement('div');
    image.parentNode.after(parent);
    parent.classList.add('full-image-loader');

    applyStyle(parent, {
      display: "block",
      margin: "1rem 0"
    });

    const href = image.parentNode.href;
    const imgAnchor = document.createElement("a");

    imgAnchor.href = href;
    imgAnchor.innerHTML = href;
    imgAnchor.setAttribute("target", "_blank");
    imgAnchor.classList.add("full-image-loader_link");
    applyStyle(imgAnchor, imageLinkStyle);
    parent.appendChild(imgAnchor);
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
    if (
      !spec ||
      (spec.replacements && replacementIndex >= spec.replacements.length) ||
      (spec.getImageUrl && replacementIndex > spec.maxReplacementCount)
    ) {
      handleImgLoadAttempsExhausted(image);
      return;
    }

    const imageSrc = image.getAttribute(ATTR_ORIG_URL);
    let imageNewSrc = imageSrc;

    if (spec.replacements) {
      const pattern = spec.pattern;
      const replacement = spec.replacements[replacementIndex];
      log("trying " + spec.attemptName + " with replacement [" + replacement + "] for src " + imageSrc);
      imageNewSrc = imageSrc.replace(pattern, replacement);
    } else {
      imageNewSrc = spec.getImageUrl(image, replacementIndex);
    }


    if (imageSrc === imageNewSrc || imageNewSrc === -1) {
      handleImgLoadAttempsExhausted(image);
    } else {
      image.src = imageNewSrc;
    }

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
    log("Started...");
    const imgArr = findImages();
    loadImages(imgArr);
    loadFullImages();
  }

  setTimeout(main, 3000);
})();
