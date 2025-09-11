// ==UserScript==
// @name         Hindi YT name and country
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Change youtube brand name and country name to Hindi
// @author       Jitendra Kumar
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function hytbrand() {
  'use strict';

  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('jk_hytbrand_policy', {
      createHTML: (string, sink) => string
    });
  }

  const APP_NAME = "[JK_YT_HINDI]";

  /* Utility methods */
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
  const applyStyle = function _applyStyle(elem, style) {
    for (let prop in style) {
      elem.style[prop] = style[prop];
    }
  };

  const changeName = function _changeName() {
    let elem;
    if ((elem = by("#logo #country-code"))) {
      elem.innerHTML = 'भारत';
    } else {
      log('Could not set the name of the country');
    }

    const svgArr = document.querySelectorAll('#logo svg');
    log("Number of app name svg elements: " + svgArr.length);
    for(let svg of svgArr) {
      const enNameElem = svg.querySelector("g:last-child");
      if (enNameElem) {
        log("Setting Hindi app name in element with id: " + enNameElem.id);
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

  const setCountryCode = function _setCountryCode() {
    log('Will change youtube brand name and country code');
    changeName();
    setTimeout(() => changeName(), 5000);
  }

  try {
    setCountryCode();
  } catch (e) {
    err(e);
  }
})();
