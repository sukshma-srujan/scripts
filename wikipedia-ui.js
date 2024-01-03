// ==UserScript==
// @name         Wikipedia UI
// @namespace    https://github.com/jkbhu85
// @homepage     https://github.com/jkbhu85/scripts/blob/main/wikipedia-ui.js
// @version      1.2.0
// @description  Change font, font size and appearance of top of page.
// @author       Jitendra Kumar
// @match        https://*.wikipedia.org/*
// @grant        none
// ==/UserScript==

(function _iife_() {
  'use strict';
  const log = function _log(s) {
    console.log("JK Wiki --", s);
  }

  const sf = 'Raleway';
  const mf = 'JetBrains Mono';

  const css =
`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Raleway:ital,wght@0,400;0,700;1,400&display=swap');
:root {
  --font-size-medium: 1.5rem;
  --jk-ff: "${sf}", sans-serif;
  --jk-mf: "${mf}", monospace;
}
body {
  font-family: var(--jk-ff);
  font-size: 1.25rem;
}
pre,
code,
tt,
kbd,
samp,
.mw-code {
  font-family: var(--jk-mf);
}
code {
  font-weight: 400;
}
body table:first-of-type tr td:last-of-type {
  width: 100%;
  padding-left: 1rem;
}
.jk-infobox {
  float: none;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 3rem;
}
.jk-monospace {
  font-family: var(--jk-mf);
  font-size: .9em;
}
`;

  const style = document.createElement('style');
  style.innerHTML = css;
  document.body.appendChild(style);

  Array.from(document.querySelectorAll('table.infobox')).forEach(e => e.classList.add("jk-infobox"));

  const findHead = function _findHead(tbl) {
    if (!tbl || !tbl.children) return null;
    console.log(tbl.children);
    for (let c of tbl.children) {
      console.log(c.tagName);
      if (c.tagName === 'THEAD') return c;
    }
    return null;
  }

  const findBody = function _findBody(tbl) {
    if (!tbl || !tbl.children) return null;
    for (let c of tbl.children) {
      if (c.tagName === 'TBODY') return c;
    }
    return null;
  }

  const findFirstTrWithTd = function _findFirstTrWithTd(tbody) {
    if (!tbody || !tbody.children) return null;
    for (let tr of tbody.children) {
      if (tr.tagName === 'TR' && tr.children) {
        return tr;
      }
    }
    return null;
  }

  const findFirstTrWithSortableTh = function _findFirstTrWithSortableTh(thead) {
    if (!thead || !thead.children) return null;
    for (let tr of thead.children) {
      if (tr.tagName === 'TR' && tr.children) {
        for (let th of tr.children) {
          if (th.tagName === 'TH') {
            return tr;
          }
        }
      }
    }
    return null;
  }

  const f0 = function _f0(tbl) {
    const tbody = findBody(tbl);
    if (!tbody) return;

    const idx = [];
    const trWithTh = findFirstTrWithSortableTh(tbody);
    if (!trWithTh) return;

    const max = trWithTh.children.length;
    log("max column count: " + max);
    for (let i = 0; i < max; i++) {
      const cn = `col${i+1}right`;
      if (tbl.classList.contains(cn)) {
        idx.push(i);
      }
    }
    log("indexes with number content: " + idx);

    for (let tr of tbody.children) {
      if (tr == trWithTh) continue;
      if (tr.tagName != 'TR' && !tr.children) continue;
      for (let i = 0; i < idx.length; i++) {
        const td = tr.children[idx[i]];
        if (!td) continue;
        td.classList.add('jk-monospace');
      }
    }
  }
  Array.from(document.querySelectorAll("table.sortable")).forEach((table) => f0(table));
})();
