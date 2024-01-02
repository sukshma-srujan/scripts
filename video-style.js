// ==UserScript==
// @name         Video Style
// @namespace    https://github.com/jkbhu85
// @homepage     https://github.com/jkbhu85/scripts/blob/main/video-style.js
// @version      1.0.0
// @description  Video style
// @author       Jitendra Kumar
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  if (atob('d3d3Lnh2aWRlb3MuY29t') != location.hostname) {
    return;
  }

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
:root {
  --jk-radius-1: .25rem;
  --jk-radius-2: .5rem;
  --jk-radius-3: .75rem;
  --button-dim: 1.5rem;
  --button-x-sep: .75rem;
  --button-y-sep: .55rem;
}
body {
  font-family: Inter, sans-serif;
  color: #d7d7d7;
}
.mozaique {
  margin-left: -.25rem;
  margin-right: -.25rem;
}
.thumb-block {
  text-align: left;
  padding-left: .25rem;
  padding-right: .25rem;
}
.thumb-block .thumb-inside {
  border-radius: var(--jk-radius-2);
}
.thumb-block .thumb-under p.title {
  font-size: .85rem;
  padding-top: .5rem;
  line-height: 1.25;
  max-height: 3.25rem;
}
.thumb-block .thumb-under p.metadata a .name {
  text-decoration: none;
}
#main .page-title {
  font-weight: lighter;
}
#page .ordered-label-list .btn {
  border-radius: var(--jk-radius-1);
  background: #272727;
  color: #d7d7d7;
}
#page .ordered-label-list .btn.label {
  background: #2a2a2a;
  color: #d7d7d7;
}
#page .ordered-label-list .btn .user-subscribe.sub-checked {
  background: rgba(255,255,255, .1);
  color: #d7d7d7;
  margin-left: 2px;
}
#page .ordered-label-list .main-uploader .btn.label {
  background: #de2600;
}
#page .ordered-label-list .main-uploader .btn.label .name {
  border-radius: var(--jk-radius-1);
}
#page .ordered-label-list .btn.main .user-subscribe.sub-checked {
  background: #ea745c;
  border-color: #ea745c;
  color: #000000df;
}
#page.video-page #main .page-title .duration,
#page.video-page #main .page-title .video-hd-mark {
  background: #2a2a2a;
  color: #ffffffaf;
  font-weight: normal;
}
#page.video-page #main .page-title .duration {
  margin-left: 0;
}
.jk-linebreak {
  display: block;
}
.buttons-bar .settings-btn img {
  height: var(--button-dim) !important;
  width: var(--button-dim) !important;
  top: var(--button-y-sep) !important;
  left: var(--button-y-sep) !important;
}
.buttons-bar .settings-btn,
.buttons-bar >img {
  height: var(--button-dim) !important;
  width: var(--button-dim) !important;
  padding-left: var(--button-x-sep) !important;
  padding-right: var(--button-x-sep) !important;
  padding-top: var(--button-y-sep) !important;
  padding-bottom: var(--button-y-sep) !important;
}
.progress-bar-container {
  bottom: calc(var(--button-dim) + 2 * var(--button-y-sep)) !important;
}
#html5video #hlsplayer .big-button img,
#html5video #hlsplayer .video-title {
  border-radius: var(--jk-radius-1);
}
#video-player-bg {
  border-radius: var(--jk-radius-3);
}
`;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.body.appendChild(style);

  const e1 = document.querySelector("#page.video-page #main .page-title .duration");
  if (e1) {
    const lb = document.createElement("span");
    lb.classList.add('jk-linebreak');
    e1.parentNode.insertBefore(lb, e1);
  }
})();
