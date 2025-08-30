// ==UserScript==
// @name         Vcentered YT Vid
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Vertically center a youtube video.
// @author       Jitendra Kumar
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function vcyv() {
  'use strict';

  const APP_NAME = "JK_VCENTER_VID";

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
  const err = function _err(str, obj) {
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
