// ==UserScript==
// @name          Medium UI changes
// @namespace     https://github.com/optimsu29
// @author        Optimus Prime
// @version       1.0
// @website       https://github.com/optimus29
// @description   Hide navbar, notification at bottom of screen for more vertical space, change fonts
// @match         https://blog.angularindepth.com/*
// @match         https://medium.com/*
// ==/UserScript==

(function IIFE() {
  // normal font
  let sf = 'Open Sans';
  let sf2 = sf.split(' ').join('+');

  // mono font
  let mf = 'Fira Mono';
  let mf2 = mf.split(' ').join('+');

  let css =
    `
@import url('https://fonts.googleapis.com/css?family=${sf2}:400,400i,600');
@import url('https://fonts.googleapis.com/css?family=${mf2}');
body * {
  font-family: '${sf}','Fira Sans', 'Segoe UI' !important;
}
code, code *,
pre, pre * {
  font-family: '${mf}', consolas !important;
}
body.is-withMagicUnderlines .markup--anchor {
  background-image: none;
  color: #873333;
}
.metabar.js-metabar {
  display: none;
}
/* hiding get-updates bar at the bottom of the screen */
div.u-fixed.u-bottom0.u-sizeFullWidth.u-backgroundWhite.u-boxShadowTop.u-borderBox.u-paddingTop10.u-paddingBottom10.u-zIndexMetabar.u-xs-paddingLeft10.u-xs-paddingRight10.js-stickyFooter {
  display: none;
}
`;

  let style = document.createElement('style');
  style.innerHTML = css;

  document.head.appendChild(style);
})();
