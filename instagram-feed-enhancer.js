// ==UserScript==
// @name         Instagram Video Options
// @namespace    https://github.com/jkbhu85
// @homepage     https://github.com/jkbhu85/scripts/blob/main/instagram-feed-enhancer.js
// @version      1.0.0
// @description  Add more options to instagram videos in the feed.
// @author       Jitendra Kumar
// @match        https://www.instagram.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

(function iipe0() {
  'use strict';
  const log = function _log(s) {
    console.log("JK_APP", new Date().toISOString(), s);
  }

  const FEED_ITEM_SELECTOR = ".x1ypdohk.x78zum5.xdt5ytf.x5yr21d.xa1mljc.xh8yej3.x1bs97v6.x1q0q8m5.xso031l.x11aubdm.xnc8uc2";
  const FEED_VIDEO_SELECTOR = "video.x1lliihq.x5yr21d.xh8yej3";
  const BTN_BAR_SELECTOR = ".x6s0dn4.xrvj5dj.x1o61qjw.x12nagc.x1gslohp .x78zum5";
  const BTN_CLASS = "_abl-";
  const BTN_INNER_CLASSES = ["_abm0", "_abl_"];
  const BTN_INNER_FADED_CLASSES = ["_abm0", "_abm1"];
  const BTN_ICON_FADED_CLASSES = ["x1lliihq", "x1n2onr6", "x1roi4f4"];
  const BTN_ICON_CLASSES = ["x1lliihq", "x1n2onr6", "x5n08af"];
  const REPLAY_ICON_SVG = `<svg width="24" height="24" viewBox="2 2 24 24" fill="currentColor">
  <g transform="scale(1.16)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
</svg>`;

  const createInstaButton = function _createInstaButton(iconHtml) {
    const btnInnerFaded = document.createElement("div");
    btnInnerFaded.classList.add(...BTN_INNER_FADED_CLASSES);
    btnInnerFaded.innerHTML = iconHtml;
    if (btnInnerFaded.children) {
      btnInnerFaded.children[0].classList.add(...BTN_ICON_FADED_CLASSES);
    }

    const btnInner = document.createElement("div");
    btnInner.classList.add(...BTN_INNER_CLASSES);
    btnInner.innerHTML = iconHtml;
    if (btnInner.children) {
      btnInner.children[0].classList.add(...BTN_ICON_CLASSES);
    }
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("jk-insta-btn", BTN_CLASS);
    btn.appendChild(btnInnerFaded);
    btn.appendChild(btnInner);
    return btn;
  }

  const isFeedItemVideo = function _isFeedItemVideo(feedItem) {
    return feedItem.querySelector(FEED_VIDEO_SELECTOR) != null;
  }

  const enhanceFeedItem = function _enhanceFeedItem(feedItem) {
    if (!isFeedItemVideo(feedItem)) return;
    if (feedItem.classList.contains("jk-video-feed-item")) return;

    const btnBar = feedItem.querySelector(BTN_BAR_SELECTOR);
    const addAfterBtn = btnBar.querySelector(`button.${BTN_CLASS}`);
    if (!addAfterBtn) {
      console.warn("after button not found");
      return;
    }
    const repeatBtn = createInstaButton(REPLAY_ICON_SVG);
    repeatBtn.addEventListener("click", (e) => { feedItem.querySelector(FEED_VIDEO_SELECTOR).currentTime = 0; });
    addAfterBtn.after(repeatBtn);
    feedItem.classList.add("jk-video-feed-item");
  }

  const detectNewFeedItems = function _detectNewFeedItems() {
    const css = `
    @keyframes nodeInserted {
      from { opacity: 0.8; }
      to { opacity: 1; }
    }
    ${FEED_ITEM_SELECTOR}{
      animation-duration: 0.25s;
      animation-name: nodeInserted;
    }`;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.body.appendChild(style);

    document.addEventListener("animationstart", (event) => {
      if (event.animationName === "nodeInserted") {
        //log("new feed item creation detected");
        enhanceFeedItem(event.target);
      }
    }, false);
  }

  const letTheGameBegin = function _letTheGameBegin() {
    detectNewFeedItems();
    Array.from(document.querySelectorAll(FEED_ITEM_SELECTOR)).forEach(e => enhanceFeedItem(e));
    log("game has begun");
  }
  letTheGameBegin();
})();
