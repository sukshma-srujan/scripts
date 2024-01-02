// ==UserScript==
// @name         Github Style
// @namespace    https://github.com/jkbhu85
// @homepage     https://github.com/jkbhu85/scripts/blob/main/github-style.js
// @version      1.2.0
// @description  Github Style
// @author       Jitendra Kumar
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function iipe() {
  'use strict';

  const osDetector = {
    isWindows: function() {
      return navigator.userAgent.indexOf("Windows") > -1;
    },
    isMac: function() {
      return navigator.userAgent.indexOf("Mac") > -1;
    },
    isLinux: function() {
      return navigator.userAgent.indexOf("Linux") > -1;
    }
  };

  const cssFontStyleWindows = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,200;0,400;0,600;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
:root {
  --jk-ff: "Roboto", sans-serif;
  --jk-mff: "Jetbrains Mono", ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
}
`.trim();

  const cssFontStyleMac = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,200;0,400;0,600;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
:root {
  --jk-ff: "IBM Plex Sans", sans-serif;
  --jk-mff: "Jetbrains Mono", ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
}
`.trim();

  const cssFontImport = (function fontStyleSelector() {
    if (osDetector.isWindows()) {
      return cssFontStyleWindows;
    }
    return cssFontStyleMac;
  })();

  const css =
`
${cssFontImport}
body {
  font-family: var(--jk-ff);
}
.markdown-body {
  font-family: var(--jk-ff);
}
pre,
.commit-ref,
.blob-code-inner,
.text-mono,
.react-code-text {
  font-family: var(--jk-mff) !important;
}
`.trim();
    const style = document.createElement('style');
    style.innerHTML = css;
    style.setAttribute("title", "jk_github_style");
    document.head.appendChild(style);
})();
