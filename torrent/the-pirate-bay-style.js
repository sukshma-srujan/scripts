// ==UserScript==
// @name         The Pirate Bay Search Result Style
// @namespace    https://github.com/jkbhu85
// @version      1.1.0
// @description  Tweak appearance of the pirate bay website.
// @author       Jitendra Kumar
// @match        https://thepiratebay.org/search.php*
// @icon         https://www.google.com/s2/favicons?domain=thepiratebay.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`
@import url('https://fonts.googleapis.com/css2?family=Merienda:wght@400;600&display=swap');
body {
  font-family: 'Merienda', 'Fira Sans', sans-serif;
  font-size: .85rem;
}
.browse .col-center {
  padding: 0;
}
#browse h1 {
  font-weight: normal;
  padding: 0rem;
  padding-bottom: .5rem;
  border-bottom: .125rem solid #EFEBE9;
  background: #fff;
  margin-bottom: 1rem;
}
/* the results table*/
#torrents {
  margin-top: 5px;
}
/* table header */
.list-header {}
#torrents span.list-header {
  border: 0;
}
.list-header .list-item {
  padding: .5rem .5rem !important;
  text-align: left !important;
}
/* a result */
.list-entry {}
.list-entry > * {
  padding: .75rem .5rem !important;
}
#torrents li.list-entry {
  background-color: rgb(239, 235, 233,.25);
  background-color: #ffffff;
}
#torrents li.list-entry.alt {
  background-color: rgb(215, 204, 200, .25);
  background-color: #ffffff;
}
#torrents li.list-entry > * {
  border-bottom: 1px solid #EFEBE9;
}
#torrents.view-single li.list-entry span.item-icons {
  width: initial;
  display: table-cell;
}
`;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);
})();
