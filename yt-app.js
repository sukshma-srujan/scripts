// ==UserScript==
// @name         JK YT App
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Add native app like capability to have YouTube video play while browsing the page.
// @author       You
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const APP_NAME = "JK_YT_APP";

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
    .jk-ytd-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      border: 1px solid rgba(255,0,0,.2);
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
      const wrapperStyle = {
        position: "fixed",
        top: "1rem",
        right: "0",
        bottom: "0",
        left: "0",
        display: "none",
        background: "black",
        zIndex: 10000,
        boxSizing: "border-box",
        paddingTop: "1rem"
      };
      const iframeStyle = {
        width: "100%",
        height: "100%"
      };

      applyStyle(ytApp.iframe, iframeStyle);
      applyStyle(ytApp.wrapper, wrapperStyle);
      ytApp.wrapper.appendChild(ytApp.iframe);
      document.body.appendChild(ytApp.wrapper);

      const closeBtnStyle = {
        position: "absolute",
        right: 0,
        top: 0,
        border: 0,
        margin: 0,
        padding: "1rem",
        lineHeight: 1,
        borderRadius: "100%",
        background: "rgba(255,255,255,0.3)"
      };
      const closeBtn = document.createElement("button");
      closeBtn.setAttribute("type", "button");
      closeBtn.addEventListener("click", () => ytApp.hide());
      closeBtn.innerHTML = "x";
      applyStyle(closeBtn, closeBtnStyle);

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
ytd-rich-item-renderer {
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
    const overlay = document.createElement('div');
    overlay.classList.add('jk-ytd-overlay');
    overlay.setAttribute('data-overlay', "jk-overlay");
    overlay.onclick = window.enableYtApp;
    elem.appendChild(overlay);
    elem.setAttribute("data-jk-yt-app", "ready");
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
      .querySelectorAll("ytd-rich-item-renderer")
      .forEach((e) => prepareYoutubeVideo(e));
    detectNewVideos();
    addMyStyles();
    log("the game has begun. enjoy!");
  };

  letTheGameBegin();
})();
