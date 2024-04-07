// ==UserScript==
// @name         YouTube Mobile
// @namespace    https://github.com/suksham-srujan
// @version      1.6.0
// @description  Open videos in a new tab in YouTube mobile.
// @author       Jitendra Kumar
// @match        https://m.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const LOG_MSG_PREFIX = "[JkYtMobile]";
  const log = function _log(msg) {
    console.log(LOG_MSG_PREFIX, msg);
  };
  const warn = function _warn(msg) {
    console.warn(LOG_MSG_PREFIX, msg);
  };

  const css = `
/* for opening videos in tab directly */
@keyframes nodeInserted {
    from { opacity: 0.99; }
    to { opacity: 1; }
}
ytm-media-item {
    animation-duration: 0.001s;
    animation-name: nodeInserted;
    position: relative;
}
ytm-media-item a.open-in-new-tab {
  box-sizing: border-box;
  border: 1px solid rgba(150, 100, 0, 0.5);
}
/* hide reels */
ytd-reel-shelf-renderer,
ytd-rich-shelf-renderer,
ytm-reel-shelf-renderer {
    display: none !important;
}
`;
  const attrViedoInNewTab = "data-video-in-new-tab";
  const videoAnchorSelector = "a.media-item-thumbnail-container";
  const mediaItemTagName = "ytm-media-item";
  const mediaItemSelector = mediaItemTagName;

  const style = document.createElement("style");
  style.innerHTML = css;
  document.body.appendChild(style);

  function findParent(elem) {
    if (elem == document.body) {
      return null;
    }
    const tg = elem.tagName.toLowerCase();
    if (tg === mediaItemTagName) {
      return elem;
    }
    return findParent(elem.parentNode);
  }

  window.openInNewTab = function (event) {
    let elem;
    if ((elem = findParent(event.target)) != null) {
      log("element found");
      event.preventDefault();
      event.stopPropagation();
      const a = elem.querySelector(videoAnchorSelector);
      if (a) {
        log("Opening in new tab. Link: " + a.href);
        window.open(a.href, "_blank");
      }
    } else {
      warn("parent not found.");
    }
  };

  const coverSetter = function _coverSetter(elem) {
    if (elem.getAttribute(attrViedoInNewTab) === "t") {
      return;
    }
    const a = elem.querySelector(videoAnchorSelector);
    if (a) {
      a.onclick = window.openInNewTab;
      a.classList.add("open-in-new-tab");
    } else {
      log("anchor in video not found");
    }
    elem.setAttribute(attrViedoInNewTab, "t");
  };

  const nodeInsertListener = function (event) {
    if (event.animationName == "nodeInserted") {
      coverSetter(event.target);
    }
  };

  function videoInNewTab() {
    document.addEventListener("animationstart", nodeInsertListener, false);
    log("Video in new tab set up for new items.");
  }

  function videoInNewTabExistingItems() {
    const items = document.querySelectorAll(mediaItemSelector);
    items.forEach((e) => coverSetter(e));
    log("Video in new tab set up for existing [" + items.length + "] items.");
  }

  videoInNewTab();
  videoInNewTabExistingItems();
})();
