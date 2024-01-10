// ==UserScript==
// @name         Link to Image
// @namespace    https://github.com/jkbhu85
// @version      1.15.0
// @description  Link to image
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
// ==/UserScript==

(function() {
  'use strict';
  const loadingFailedImageStyle = {
    display: "block",
    borderRadius: ".5rem",
    boxShadow: "",
    margin: "0 auto"
  };
  const loadedImageStyle = {
    display: "block",
    borderRadius: ".5rem",
    maxWidth: '100%',
    boxShadow: "rgba(70, 70, 70, 0.75) 0px 0px 0.2rem",
    margin: "0 auto"
  };

  function unstyleImage(image) {
    applyStyle(image, loadingFailedImageStyle);
  }

  function styleImage(image) {
    applyStyle(image, loadedImageStyle);
  }

  function applyStyle(element, cssStyle) {
    for (const cssProperty in cssStyle) {
      element.style[cssProperty] = cssStyle[cssProperty];
    }
  }

  function onImageLoadFailedHandler(e) {
    const img = e.target;
    if (/(\.md\.png)$/.test(img.src)) {
      const newSrc = img.src.replace(/(\.md)\.png$/, '$1.jpg');
      img.src = newSrc;
    } else {
      unstyleImage(img);
    }
  }

  function convertLinkIntoImage(anchor, link) {
    const wrapper = document.createElement("div");
    const img = document.createElement("img");
    img.src = link;

    wrapper.appendChild(img);
    if (anchor.nextElementSibling) {
      const nextSibling = anchor.nextElementSibling;
      anchor.remove();
      nextSibling.before(wrapper);
    }
    else {
      const parent = anchor.parentNode;
      anchor.remove();
      parent.appendChild(wrapper);
    }

    //console.log("convertLinkIntoImage - anchor", anchor, "link", link);

    styleImage(img);
    wrapper.appendChild(anchor);
    applyStyle(anchor, {
      fontWeight: "400",
      textDecoration: "none",
      color: "#987",
      paddingTop: "5px",
      display: "block"
    });
    applyStyle(wrapper, {
      textAlign: "center"
    });
    img.onerror = onImageLoadFailedHandler;
  }

  const specs = [
    {
      name: "jpeg.html",
      pattern: /^(.*)\/(i?[a-zA-Z])-([a-z0-9])\/(.*.jpe?g)(.html)$/i,
      replacement: "$1/$3/$4"
    },
    {
      name: "digit.html",
      pattern: /^(.+\/\d{4}\/\d{1,2}\/\d{1,2}\/\d{1,2}\/\d{1,2}\.)html$/,
      replacement: "$1jpg"
    },
    {
      name: "jpeg.html-2",
      condition: function (link) {
        let result = window.location.href.match(/\d{2}-\d{2}-\d{2}\/?$/) && link.match(/\/img-/);

        return (result ? true : false);
      },
      getImageUrl: function(url) {
        let date = window.location.href.match(/\d{2}-\d{2}-\d{2}\/?$/)[0];
        let dateParts = date.split("-");
        let urlPart = "20" + (dateParts[2].endsWith("/") ? dateParts[2] : dateParts[2] + "/") + dateParts[0] + "/" + dateParts[1];
        let newUrl = url.replace(/\/img-(.+).html/, "/upload/big/" + urlPart + "/$1.jpeg");
        console.log("LinkToImage - newUrl: " + newUrl);

        return newUrl;
      }
    },
    {
      name: "image-infer-date",
      condition: function(link) {
        if (/^(http.+)\/(image)\/(.+)$/.test(link) && link.indexOf("imgpinga.ga") === -1) {
          const dateUploadElem = document.querySelector('.box-info-heading + div > div > ul:nth-of-type(3) > li:nth-of-type(3)');
          if (dateUploadElem) {
            const dateUploadLabel = dateUploadElem.querySelector('strong');
            if (dateUploadLabel && dateUploadLabel.textContent.toLowerCase().indexOf('date uploaded') > -1) {
              const dateValue = dateUploadElem.querySelector('span');
              // if date value contains hours or days
              if (dateValue && (dateValue.textContent.indexOf('hours') > -1 || dateValue.textContent.indexOf('day') > -1)) {
                return true;
              }
            }
          }
        }

        return false;
      },
      getImageUrl: function(url) {
        const periodString = document.querySelector('.box-info-heading + div > div > ul:nth-of-type(3) > li:nth-of-type(3) > span').textContent;
        const date = new Date();

        if (periodString.indexOf('day') > -1) {
          const days = +periodString.substring(0, periodString.indexOf(' '));
          console.log('link to image:: days', days);
          date.setDate(date.getDate() - days);
        }
        else {
          const hours = +periodString.substring(0, periodString.indexOf(' '));
          console.log('link to image:: hours', hours);
          date.setHours(date.getHours() - hours);
        }

        date.setMinutes(date.getMinutes() - 30);
        date.setHours(date.getHours() - 5);

        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let year = date.getFullYear() + '';

        console.log('link to image:: ', year, mm, dd);

        dd = (dd < 10) ? ('0' + dd.toString()) : ('' + dd.toString());
        mm = (mm < 10) ? ('0' + mm.toString()) : ('' + mm.toString());

        const urlParts = url.match(/^(http.+)\/(image)\/(.+)$/);
        var newUrl = urlParts[1] + '/' + urlParts[2] + 's/' + year + '/' + mm + '/' + dd + '/' + urlParts[3] + '.md.png';

        return newUrl;
      }
    },
    {
      name: "jpeg.html-3",
      pattern: /^(http:\/\/)(.+)\/imgt-u\/(.*)(.*.jpe?g)(.html)$/i,
      replacement: "https://$2/u/$3$4"
    }
  ];

  function containsImageChild(parent) {
    if (!parent.children || parent.children.length == 0) return false;

    for (let child of parent.children) if (child.tagName === "IMG") return true;

    return false;
  }

  function linkToImage() {
    console.log("Link to image started...");
    const anchors = document.querySelectorAll("a.js-modal-url");
    let count = 0;
    if (!anchors) return;

    for (let anchor of anchors) {
      if (!anchor.href || containsImageChild(anchor)) {
        console.log("Anchor contains img element or does not have href. Skipping. href: " + anchor.href);
        continue;
      }

      //console.log("Testing anchor for converting into image", anchor.href);

      for (let spec of specs) {
        let newUrl;

        if (spec.pattern && anchor.href.match(spec.pattern)) {
          newUrl = anchor.href.replace(spec.pattern, spec.replacement);
        }
        else if (spec.condition && spec.condition(anchor.href)) {
          newUrl = spec.getImageUrl(anchor.href);
          console.log("link to image:: new url", newUrl);
        }

        if (newUrl) {
          anchor.setAttribute("target", "_blank");
          anchor.classList.add("link-to-image_link");
          convertLinkIntoImage(anchor, newUrl);
          count++;
          break;
        }
      }
    }

    console.log("Converted [" + count + "] links into images.");
  }

  linkToImage();
})();
