// ==UserScript==
// @name         JK YT App
// @namespace    http://tampermonkey.net/
// @version      0.0.6
// @description  Add native app like capability to have YouTube video play while browsing the page.
// @author       Jitendra Kumar
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/@*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const APP_NAME = "JK_YT_APP";
  const VIDEO_ELEMENTS = "ytd-video-renderer,ytd-grid-video-renderer,ytd-rich-item-renderer,ytd-reel-item-renderer";

  /* Utility methods */
  const log = function (str) {
    console.log(APP_NAME, str);
  };
  const applyStyle = function (elem, style) {
    for (let prop in style) {
      elem.style[prop] = style[prop];
    }
  };

  const addMyStyles = function() {
    const css = `
    .jk-yt-video {
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 1rem;
      box-sizing: border-box;
    }
    .jk-yt-video-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
    }
    .jk-yt-wrapper {
      position: fixed;
      top: 1rem;
      right: 1rem;
      bottom: 1rem;
      left: 1rem;
      display: none;
      background: black;
      z-index: 10000;
      box-sizing: border-box;
      box-shadow: 0 0 .5rem rgba(255, 255, 255, 0.25);
      border-radius: .5rem;
    }
    .jk-yt-close-btn {
      position: absolute;
      right: 0px;
      top: 0px;
      border: 0px;
      margin: 0px;
      padding: 1rem;
      line-height: 1;
      border-radius: .5rem;
      background: rgba(255, 255, 255, 0.3);
      width: 1rem;
      height: 1rem;
      box-sizing: content-box;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
    .jk-yt-close-btn:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    `;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);
  }

  const ytApp = {
    wrapper: document.createElement("div"),
    iframe: document.createElement("iframe"),
    init: function () {
      const iframeStyle = {
        width: "100%",
        height: "100%"
      };

      applyStyle(ytApp.iframe, iframeStyle);
      ytApp.wrapper.appendChild(ytApp.iframe);
      ytApp.wrapper.classList.add("jk-yt-wrapper");
      document.body.appendChild(ytApp.wrapper);

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("jk-yt-close-btn");
      closeBtn.setAttribute("type", "button");
      closeBtn.addEventListener("click", () => ytApp.hide());
      closeBtn.innerHTML = "X";

      ytApp.wrapper.appendChild(closeBtn);
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

  const detectNewVideos = function () {
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

  const extractVideoUrl = function (
    elem /* an ytd-rich-item-renderer element*/
  ) {
    const a = elem.querySelector("ytd-thumbnail a");
    return a === null ? null : a.href;
  };

  window.enableYtApp = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const videoUrl = extractVideoUrl(event.target.parentNode);
    if (videoUrl === null) {
      log("The element has no video url.");
      return;
    }
    ytApp.show(videoUrl);
  }

  const prepareYoutubeVideo = function (
    elem /* an ytd-rich-item-renderer element*/
  ) {
    if (elem.getAttribute("data-jk-yt-app")) {
      return;
    }
    const overlay = document.createElement('div');
    overlay.classList.add('jk-yt-video-overlay');
    overlay.setAttribute('data-overlay', "jk-overlay");
    overlay.onclick = window.enableYtApp;
    elem.appendChild(overlay);
    elem.setAttribute("data-jk-yt-app", "ready");
    elem.classList.add("jk-yt-video");
  };

  const nodeInsertListener = function (event) {
    if (event.animationName === "nodeInserted") {
      prepareYoutubeVideo(event.target);
    }
  };

  const letTheGameBegin = function () {
    document.addEventListener("animationstart", nodeInsertListener, false);
    ytApp.init();

    document
      .querySelectorAll(VIDEO_ELEMENTS)
      .forEach((e) => prepareYoutubeVideo(e));
    detectNewVideos();
    addMyStyles();
    log("the game has begun. enjoy!");
  };

  letTheGameBegin();
})();
