// ==UserScript==
// @name         Github Style
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Github Style
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`:root {
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
    document.body.appendChild(style);
})();
