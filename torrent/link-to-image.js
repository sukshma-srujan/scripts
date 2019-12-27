// ==UserScript==
// @name         Link to Image
// @namespace    https://github.com/optimus29
// @version      1.0
// @description  Link to image
// @author       Optimus Prime
// @include      /^https?:\/\/x?1337x\...\/torrent/.*$/
// ==/UserScript==

(function() {
    'use strict';

    function styleImage(image) {
        const imageStyle = {
            display: "block",
            borderRadius: ".5rem",
            minWidth: "80%",
            maxWidth: "100%",
            boxShadow: "rgba(70, 70, 70, 0.75) 0px 0px 0.2rem",
            margin: "0 auto"
        };

        applyStyle(image, imageStyle);
    }

    function applyStyle(element, cssStyle) {
        for (const cssProperty in cssStyle) {
            element.style[cssProperty] = cssStyle[cssProperty];
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

        console.log("convertLinkIntoImage - anchor", anchor, "link", link);

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
    }

    const specs = [
        {
            name: "jpeg.html",
            pattern: /^(.*)\/(ia|ib|y)-([a-z])\/(.*.jpe?g)(.html)$/i,
            replacement: "$1/$3/$4"
        },
        {
            name: "jpeg.html",
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
        }
    ];

    function containsImageChild(parent) {
        if (!parent.children || parent.children.length == 0) return false;

        for (let child of parent.children) if (child.tagName === "IMG") return true;

        return false;
    }

    function linkToImage() {
        console.log("Image to Link is starting...");
        const anchors = document.querySelectorAll("a.js-modal-url");
        let count = 0;
        if (!anchors) return;

        for (let anchor of anchors) {
            if (!anchor.href || containsImageChild(anchor)) {
                console.log("Anchor contains img element or does not have href. Skipping. href: " + anchor.href);
                continue;
            }

            //console.log("Testing anchor for converting into image: anchor.href" + anchor.href);

            for (let spec of specs) {
                let newUrl;

                if (spec.pattern && anchor.href.match(spec.pattern)) {
                    newUrl = anchor.href.replace(spec.pattern, spec.replacement);
                }
                else if (spec.condition && spec.condition(anchor.href)) {
                    newUrl = spec.getImageUrl(anchor.href);
                }

                if (newUrl) {
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