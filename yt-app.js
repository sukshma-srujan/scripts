// ==UserScript==
// @name         JK YT App
// @homepage     https://github.com/jkbhu85/scripts/blob/main/yt-app.js
// @namespace    https://github.com/jkbhu85
// @version      0.5.8
// @description  Add native app like capability to have YouTube video play while browsing the page.
// @author       Jitendra Kumar
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/?app=desktop
// @match        https://www.youtube.com/@*
// @match        https://www.youtube.com/watch*
// @match        https://www.youtube.com/shorts/*
// @match        https://www.youtube.com/results*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const APP_NAME = "JK_YT_APP";
  const VIDEO_ELEMENTS = "ytd-video-renderer,ytd-grid-video-renderer,ytd-rich-item-renderer,ytd-reel-item-renderer";
  window.ytAppData = {};

  /* Utility methods */
  const by = function _by(selector) {
    if (!selector) return null;
    return document.querySelector(selector);
  }
  const byAll = function _byAll(selector) {
    if (!selector) return null;
    return document.querySelectorAll(selector);
  }
  const byId = function _byId(selector) {
    if (!selector) return null;
    return by(`#${selector}`);
  }
  const log = function _log(str, obj) {
    if (obj) {
      console.log(APP_NAME, str, obj);
    } else {
      console.log(APP_NAME, str);
    }
  };
  const err = function _log(str, obj) {
    if (obj) {
      console.error(APP_NAME, str, obj);
    } else {
      console.error(APP_NAME, str);
    }
  };
  const applyStyle = function _applyStyle(elem, style) {
    for (let prop in style) {
      elem.style[prop] = style[prop];
    }
  };
  const preventEventAction = function _preventEventAction(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  const addMyStyles = function _addMyStyles() {
    const css = `
    .jk-yt-video {
      border: 0px solid rgba(255,255,255,0.07);
      border-radius: 1rem;
      box-sizing: border-box;
      position: relative;
    }
    .jk-yt-video-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      cursor: pointer;
      background: transparent;
      border: 1px solid rgb(255, 167, 38,.5);
      border-radius: 12px; /*there is no standard css variable in youtube CSS*/
    }
    .jk-yt-video-overlay-btn {
      position: absolute;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1rem;
      font-weight: bold;
      font-family: inherit;
      text-transform: uppercase;
      background: rgba(255,255,255,0.5);
      color: black;
      cursor: pointer;
      text-decoration: none;
      border-radius: 100%;
    }
    .jk-yt-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: none;
      background: black;
      z-index: 10000;
      box-sizing: border-box;
      box-shadow: 0 0 .5rem rgba(255, 255, 255, 0.25);
      border-radius: 0;
    }
    .jk-yt-wrapper-sm {
      top: initial;
      left: initial;
      width: 640px;
      height: 360px;
    }
    .jk-yt-btn-bar {
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .jk-yt-btn {
      border: 0px;
      margin: 0px;
      padding: .75rem;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.6);
      font-size: 1rem;
      line-height: 1;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      float: left;
      line-height: 1;
      text-transform: uppercase;
      box-sizing: content-box;
      width: 1rem;
      height: 1rem;
    }
    .jk-yt-btn + .jk-yt-btn {
      margin-left: .25rem;
    }
    .jk-yt-btn:hover {
      background: rgba(255, 255, 255, 0.7);
    }
    .jk-yt-hide {
      display: none;
    }
    .jk-yt-iframe {
      --iframe-spacing: .75rem;
      width: calc(100% - 2*var(--iframe-spacing));
      height: calc(100% - 2*var(--iframe-spacing));
      box-sizing: border-box;
      border: 1px solid #ffffff1a;
      left: var(--iframe-spacing);
      right: var(--iframe-spacing);
      top: var(--iframe-spacing);
      bottom: var(--iframe-spacing);
      position: fixed;
      border-radius: .5rem;
    }
    .jk-shrink-video {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10000;
    }
    `;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);
  }

  const ytApp = {
    wrapper: document.createElement("div"),
    iframe: document.createElement("iframe"),
    btns: [],
    init: function () {
      ytApp.iframe.classList.add("jk-yt-iframe");
      ytApp.wrapper.appendChild(ytApp.iframe);
      ytApp.wrapper.classList.add("jk-yt-wrapper");
      document.body.appendChild(ytApp.wrapper);

      const shrinkBtn = document.createElement("button");
      shrinkBtn.classList.add("jk-yt-btn", "jk-yt-shrink-btn", "jk-yt-hide");
      shrinkBtn.setAttribute("type", "button");
      shrinkBtn.addEventListener("click", () => ytApp.shrink());
      shrinkBtn.innerHTML = "S";
      ytApp.btns.push(shrinkBtn);

      const expandBtn = document.createElement("button");
      expandBtn.classList.add("jk-yt-btn", "jk-yt-expand-btn", "jk-yt-hide");
      expandBtn.setAttribute("type", "button");
      expandBtn.addEventListener("click", () => ytApp.expand());
      expandBtn.innerHTML = "E";
      ytApp.btns.push(expandBtn);

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("jk-yt-btn", "jk-yt-close-btn");
      closeBtn.setAttribute("type", "button");
      closeBtn.addEventListener("click", () => ytApp.hide());
      closeBtn.innerHTML = "X";
      ytApp.btns.push(closeBtn);

      const btnBar = document.createElement("div");
      btnBar.classList.add("jk-yt-btn-bar");

      ytApp.btns.forEach(btn => btnBar.appendChild(btn));
      ytApp.wrapper.appendChild(btnBar);
    },
    show: function (url) {
      ytApp.iframe.src = url;
      ytApp.wrapper.style.display = "block";
      log("showing yt app, url: ", url);
      document.body.style.overflow = "hidden";
    },
    hide: function () {
      ytApp.wrapper.style.display = "none";
      ytApp.iframe.src = "";
      document.body.style.overflow = "";
      log("hiding yt app");
    },
    shrink: function () {},
    expand: function () {},
  };

  const enableNewVideoInsertionDetection = function _enableNewVideoInsertionDetection() {
    const css = `
/* to get notified when new elements are created on the page  */
@keyframes nodeInserted {
  from { opacity: 0.8; }
  to { opacity: 1; }
}
${VIDEO_ELEMENTS}{
  animation-duration: 0.25s;
  animation-name: nodeInserted;
  position: relative;
}
`;

    const style = document.createElement("style");
    style.innerHTML = css;
    document.body.appendChild(style);
  };

  const extractVideoUrl = function _extractVideoUrl(elem) {
    let a = elem.querySelector("ytd-thumbnail a#thumbnail");
    if (!a && elem.tagName === 'A' && elem.getAttribute("id") === 'thumbnail') {
      a = elem;
    }
    return a === null ? null : a.href;
  };

  window.enableYtApp = function _enableYtApp(event) {
    if (!event.target.classList.contains("jk-yt-video-overlay")) {
      return;
    }
    preventEventAction(event);
    const videoUrl = extractVideoUrl(event.target.parentNode);
    if (videoUrl === null) {
      log("The element has no video url.");
      return;
    }
    ytApp.show(videoUrl);
  }

  const prepareYoutubeVideo = function _prepareYoutubeVideo(video) {
    if (video.getAttribute("data-jk-yt-app") || video.classList.contains('ytd-rich-shelf-renderer')) {
      return;
    }
    const videoUrl = extractVideoUrl(video);
    const thumbnail = (function _findThumbnail() {
      let t = video.querySelector("#thumbnail");
      if (t == null) {
        t = video.querySelector('ytd-thumbnail');
      }
      return t || video;
    })();
    if (videoUrl && thumbnail) {
      const overlay = document.createElement('div');
      overlay.classList.add('jk-yt-video-overlay');
      overlay.setAttribute('data-overlay', "jk-overlay");
      overlay.onclick = window.enableYtApp;

      const anchor = document.createElement("a");
      anchor.href = videoUrl;
      anchor.setAttribute("target", "_blank");
      anchor.classList.add("jk-yt-video-overlay-btn");
      anchor.innerHTML = "N";

      overlay.appendChild(anchor);

      thumbnail.appendChild(overlay);
      thumbnail.setAttribute("data-jk-yt-app", "ready");
      thumbnail.classList.add("jk-yt-video");
    } else {
      const isFirstTime = !video.classList.contains("jk-no-video");
      if (!isFirstTime) {
        log("could not set on video", video);
      }
    }
  };

  const nodeInsertListener = function (event) {
    if (event.animationName === "nodeInserted") {
      try {
        prepareYoutubeVideo(event.target);
      } catch (err) {
        err('Error while preparing video', event.target);
      }
    }
  };

  const letTheGameBegin = function () {
    document.addEventListener("animationstart", nodeInsertListener, false);
    ytApp.init();

    document
      .querySelectorAll(VIDEO_ELEMENTS)
      .forEach((e) => prepareYoutubeVideo(e));
    enableNewVideoInsertionDetection();
    addMyStyles();
    window.onmessage = function(e) {
      if(e.data === 'YT_APP_CLOSE') {
        ytApp.hide();
      }
    }
    log("the game has begun. enjoy!");
  };

  const enableEscapeInIframe = function() {
    window.addEventListener("keyup", (e) => {
      if (e.key === 'Escape') {
        if (window.fullScreen) {
          preventEventAction(e);
        }
        window.top.postMessage('YT_APP_CLOSE', '*');
      }
    }, true);
  }
  const enableShrinkExpand = function() {
    const max = document.createElement("button");
    const min = document.createElement("button");
    const b = [max, min];

    const btnBar = document.createElement("div");
    applyStyle(btnBar, {
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      zIndex: "100000",
      borderTop: "1px solid #ffffff22",
      background: "#ffffff22"
    });
    for (let btn of b) {
      btnBar.appendChild(btn);
      btn.setAttribute("type", "button");
      applyStyle(btn, {
        margin: "1rem",
      });
    }
    max.innerHTML = "Max";
    min.innerHTML = "Min";
    document.body.appendChild(btnBar);
    const style = document.createElement("style");
    style.innerHTML = `
    .max-video {
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
    }
    `;
    document.body.appendChild(style);
    max.addEventListener("click", (e) => {
      log("Max clicked");
      const a = document.querySelector("video.video-stream.html5-main-video");
      a.classList.add("max-video");
    });
    min.addEventListener("click", (e) => {
      log("Min clicked");
      const a = document.querySelector("video.video-stream.html5-main-video");
      a.classList.remove("max-video");
    });
  }
  const setCountryCode = function _setCountryCode() {
    log('setting country code');

    function changeName() {
      let elem;
      if ((elem = by("#logo #country-code"))) {
        elem.innerHTML = 'भारत';
      }

      const svg = document.querySelector("#logo svg svg");
      if (svg) {
        const enNameElem = svg.querySelector("g:last-child");
        if (enNameElem) {
          enNameElem.style.display = "none";

          const hiNameGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
          const hiNameText = document.createElementNS("http://www.w3.org/2000/svg", "text");
          hiNameGroup.appendChild(hiNameText);
          hiNameText.innerHTML = 'विड्योमंच';
          applyStyle(hiNameText, {
            fontFamily: "inherit",
            fontSize: "1.45rem",
            fontWeight: "bold"
          });
          hiNameText.setAttribute("x", 32);
          hiNameText.setAttribute("y", 16);
          svg.appendChild(hiNameGroup);
        }
      }
    }
    changeName();
    setTimeout(() => changeName(), 3000);
  }

  if (window.self === window.parent) {
    letTheGameBegin();
  }
  if (window.self != window.parent) {
    log("Escape to close the popup window.");
    enableEscapeInIframe();
    //enableShrinkExpand();
  }
  try {
    setCountryCode();
  } catch (e) {
    console.err(e);
  }

  const maxVerticalCenterVideoAttemp = 12;
  let verticalCenterVideoAttemptCounter = maxVerticalCenterVideoAttemp;
  const verticallyCenterVideo = function _verticallyCenterVideo() {
    if (location.pathname != "/watch") {
      log("verticallyCenterVideo not on video watch page");
      return;
    }
    verticalCenterVideoAttemptCounter--;

    const masthead = byId("masthead-container");
    let mastheadHeight = 0;
    if (masthead) {
      mastheadHeight = masthead.clientHeight;
      if (window.self != window.parent) {
        log("verticallyCenterVideo in iframe");
        masthead.style.display = "none";
        const pm = byId("page-manager");
        if (pm) {
          pm.style.marginTop = "0px";
        }
        mastheadHeight = 0;
      }
    }

    const video = byId("player");
    const primary = byId('primary');

    if (video && primary) {
      const spacerBottom = (function _findOrCreateBottomSpacer() {
        const id = 'jk-vid-spacer-bottom';
        const aboveTheFold = document.querySelector("#above-the-fold");
        if (!aboveTheFold) {
          return null;
        }
        let e0 = byId(id);
        if (!e0) {
          e0 = document.createElement("div");
          e0.id = id;
          aboveTheFold.before(e0);
          log("new bottom spacer inserted");
        }
        e0.style.marginTop = "0px";
        return e0;
      })();
      const spacer = (function _findOrCreateTopSpacer() {
        const id = "jk-vid-spacer";
        let e0 = byId(id);
        if (e0 && e0.nextElementSibing != video) {
          log("spacer next element sibling is not video", e0.nextElementSibling);
          e0.remove();
          e0 = undefined;
        }
        if (!e0) {
          e0 = document.createElement("div");
          e0.id = id;
          video.before(e0);
          log("new spacer inserted");
        }
        e0.style.marginTop = "0px";
        return e0;
      })();

      const mth = mastheadHeight;
      const vch = video.clientHeight;
      const vct = video.clientTop;
      const r = window.innerHeight - vch;
      const pstyle = getComputedStyle(primary);
      const pdt = pstyle.paddingTop.replace('px', '');
      const mt = r / 2 - vct - mth - pdt;
      spacer.style.marginTop = mt + "px";
      //log("verticallyCenterVideo applied, mt: " + mt + ", vch: " + vch + ", vct: " + vct + ", mth: " + mth + ", pdt: " + pdt);
      log("verticallyCenterVideo applied, mt: " + mt);
      if (spacerBottom) {
        const marginBottom = window.innerHeight / 2;
        spacerBottom.style.marginTop = marginBottom + 'px';
        log("verticallyCenterVideo applied, marginBottom: " + marginBottom);
      }
      return;
    } else {
      if (verticalCenterVideoAttemptCounter > 0) {
        setTimeout(() => verticallyCenterVideo(), 1000);
      }
    }
  }

  setTimeout(() => verticallyCenterVideo(), 3000);

  const _gcenter0 = {tHandle: null};
  window.addEventListener('resize', () => {
    if (_gcenter0.tHandle) {
      window.clearTimeout(_gcenter0.tHandle);
      _gcenter0.tHandle = null;
    }
    verticalCenterVideoAttemptCounter = maxVerticalCenterVideoAttemp;
    _gcenter0.tHandle = setTimeout(() => verticallyCenterVideo(), 350);
  });
})();
