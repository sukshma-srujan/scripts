// ==UserScript==
// @name         Mulitsite Style Change
// @namespace    https://github.com/jkbhu85
// @version      1.0.0
// @description  Change style of mulitple sites.
// @author       Jitendra Kumar
// @match        https://docs.liquibase.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ff = `"Fira Sans", sans-serif`;
    const mf = `"Fira Mono", monospace`;

    const webStyles = [{
        url: "https://docs.liquibase.com",
        css:`
body {
  font-family: ${ff};
}
        `
    }];

    function findWebStyleForCurrentPage() {
        const currentHref = window.location.href;
        for (let ws of webStyles) {
            if (currentHref.indexOf(ws.url) === 0) {
                return ws;
            }
        }
        return null;
    }

    function applyWebStyle(webStyle) {
        const style = document.createElement("style");
        style.innerHTML = webStyle.css;
        document.body.appendChild(style);
    }

    const webStyle = findWebStyleForCurrentPage();
    if (webStyle) {
        applyWebStyle(webStyle);
        console.log("WebStyle applied successfully.");
    } else {
        console.log("No suitable webstyle found for current page.");
    }
})();
