// ==UserScript==
// @name         JK YT App
// @homepage     https://github.com/jkbhu85/scripts/blob/main/yt-app.js
// @namespace    https://github.com/jkbhu85
// @version      0.5.4
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
  const log = function _log(str) {
    console.log(APP_NAME, str);
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

  const addMyStyles = function() {
    const css = `
    .jk-yt-video {
      border: 0px solid rgba(255,255,255,0.07);
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
    .jk-yt-video-overlay-btn {
      position: absolute;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      bottom: 0;
      right: 0;
      width: 2.5vw;
      height: 2.5vw;
      font-size: 1vw;
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
    const a = elem.querySelector("ytd-thumbnail a#thumbnail");
    return a === null ? null : a.href;
  };

  window.enableYtApp = function(event) {
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

  const prepareYoutubeVideo = function (video) {
    if (video.getAttribute("data-jk-yt-app")) {
      return;
    }
    const overlay = document.createElement('div');
    overlay.classList.add('jk-yt-video-overlay');
    overlay.setAttribute('data-overlay', "jk-overlay");
    overlay.onclick = window.enableYtApp;
    const videoUrl = extractVideoUrl(video);
    if (videoUrl) {
      const anchor = document.createElement("a");
      anchor.href = videoUrl;
      anchor.setAttribute("target", "_blank");
      anchor.classList.add("jk-yt-video-overlay-btn");
      anchor.innerHTML = "N";
      overlay.appendChild(anchor);
    }

    video.appendChild(overlay);
    video.setAttribute("data-jk-yt-app", "ready");
    video.classList.add("jk-yt-video");
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

  // enable video info visibility toggle
  const jkYtVideoInfoHide = function _jkYtVideoInfoHide() {
    if (location.pathname != "/watch") {
      return true;
    }
    const aboveTheFold = document.querySelector("#above-the-fold");
    if (!aboveTheFold) {
      return false;
    }
    const jkdiv = document.createElement("div");
    jkdiv.innerHTML = `
  <style>
  #videoInfoToggleContainer {
  display: flex;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  flex-direction: row;
  -moz-box-align: center;
  align-items: center;
  margin-top: 1rem;
  opacity: .5;
  }
  .jk-yt-hide-video-info {
  visibility: hidden !important;
  }
  </style>
  <div id="videoInfoToggleContainer" class="style-scope ytd-toggle-item-renderer">
  <div id="caption" class="style-scope ytd-toggle-item-renderer">
    Video info hidden
  </div>
  <tp-yt-paper-toggle-button
    noink=""
    class="style-scope ytd-toggle-item-renderer"
    role="button"
    aria-pressed="false"
    tabindex="0"
    toggles=""
    aria-disabled="false"
    style="touch-action: pan-y"
    id="videoInfoToggleButton"
    checked=""
    >
    <div class="toggle-container style-scope tp-yt-paper-toggle-button"></div>
  </tp-yt-paper-toggle-button>
  </div>`;
    const jkmeta = aboveTheFold.parentElement;
    jkmeta.appendChild(jkdiv);

    const setVideoInfoHidden = function _setVideoInfoHidden(hidden) {
      const hideClassName = "jk-yt-hide-video-info";
      if (hidden) aboveTheFold.classList.add(hideClassName);
      else aboveTheFold.classList.remove(hideClassName);
    };

    const toggleBtn = document.querySelector("#videoInfoToggleButton");
    const handleVideoInfoHideClick = function _handleVideoInfoHideClick() {
      const checked = toggleBtn.getAttribute("checked");
      const isChecked = checked === "";
      log("video info hide checked" + isChecked);
      setVideoInfoHidden(isChecked);
    }

    toggleBtn.addEventListener("click", (e) => handleVideoInfoHideClick());
    handleVideoInfoHideClick();
    log("Video info show/hide applied");
    return true;
  };
  let jkVideoInfoHideRetryCount = 12;
  const jkVideoInfoHideRetry = function _jkVideoInfoHideRetry() {
    if(!jkVideoInfoHideRetryCount) {
      log('Could not setup video info hide');
      return;
    }
    jkVideoInfoHideRetryCount--;
    if (jkYtVideoInfoHide()) {
      return;
    }
    setTimeout(() => jkVideoInfoHideRetry(), 1000);
  }

  jkVideoInfoHideRetry();

  const maxVerticalCenterVideoAttemp = 12;
  let verticalCenterVideoAttemptCounter = maxVerticalCenterVideoAttemp;
  const verticallyCenterVideo = function _verticallyCenterVideo() {
    if (location.pathname != "/watch") {
      log("verticallyCenterVideo not on video watch page");
      return;
    }

    const masthead = byId("masthead-container");

    if (masthead) {
      if (window.self != window.parent) {
        log("verticallyCenterVideo in iframe");
        masthead.style.display = "none";
        const pm = byId("page-manager");
        if (pm) {
          pm.style.marginTop = "0px";
        }
      }
    }

    const video = byId("player");
    const primaryInner = byId("primary-inner");

    if (video && primaryInner) {
      const spacer = (function() {
        const id = "jk-vid-spacer";
        let e0 = byId(id);
        if (!e0) {
          e0 = document.createElement("div");
          e0.id = id;
          primaryInner.insertBefore(e0, video);
          log("new spacer inserted");
        }
        e0.style.marginTop = "0px";
        return e0;
      })();

      const r = window.innerHeight - video.clientHeight;
      const rect = video.getBoundingClientRect();
      const marginTop = r / 2 - rect.top;
      spacer.style.marginTop = marginTop + "px";
      log("verticallyCenterVideo applied, marginTop: " + marginTop);
      return;
    } else {
      if (verticalCenterVideoAttemptCounter > 0) {
        setTimeout(() => verticallyCenterVideo(), 1000);
      }
    }
    verticalCenterVideoAttemptCounter--;
  }

  setTimeout(() => verticallyCenterVideo(), 1200);

  const _gcenter0 = {tHandle: null};
  window.addEventListener('resize', () => {
    if (_gcenter0.tHandle) {
      window.clearTimeout(_gcenter0.tHandle);
      _gcenter0.tHandle = null;
    }
    verticalCenterVideoAttemptCounter = maxVerticalCenterVideoAttemp;
    _gcenter0.tHandle = setTimeout(() => verticallyCenterVideo(), 350);
  });

  const cssFutureUse =
`
/* hide video title */
#title {
  visibility: hidden !important;
}

/* hide channel info */
#owner.ytd-watch-metadata {
  visibility: hidden !important;
}

/* hide buttons */
#actions.ytd-watch-metadata {
  visibility: hidden !important;
}

/* hide video description */
#description.ytd-watch-metadata {
  visibility: hidden !important;
}
`;
})();
