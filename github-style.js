// ==UserScript==
// @name         Github Style
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Github Style
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,200;0,400;0,600;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
:root {
  --jk-ff: "IBM Plex Sans", sans-serif;
  --jk-mff: "Jetbrains Mono", ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
}
body {
  font-family: var(--jk-ff);
}
.markdown-body {
  font-family: var(--jk-ff);
}
pre {
  font-family: var(--jk-mff);
}
.commit-ref {
  font-family: var(--jk-mff);
}
.blob-code-inner {
  font-family: var(--jk-mff);
}`;
    const style = document.createElement('style');
    style.innerHTML = css;
    style.setAttribute("title", "jk_github_style");
    document.body.appendChild(style);
})();
