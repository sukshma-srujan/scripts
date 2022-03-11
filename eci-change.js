// ==UserScript==
// @name         ECI Style Change
// @namespace    https://github.com/optimus29
// @version      1.5.0
// @description  Change appearance of ECI websites
// @author       Optimus Prime
// @match        https://results.eci.gov.in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ff = `"Fira Sans"`;
    const mf = `"Fira Mono"`;
    const css =
`
body {
  font-family: ${ff} !important;
}
* {
  font-family: inherit !important;
}
select {
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-sizing: border-box;
  height: auto !important;
  background: #fff;
  border: 1px solid #888;
}
table {
  border-collapse: collapse;
}
h3, h3 u {
  font-weight: 300 !important;
  font-size: 1.25rem;
  text-decoration: none;
}
.wrap-sec {
  margin-bottom: 2rem;
}
.refresh {
  position: static;
}
div.disclmr {
  display: none;
}
div.gap-between {
  margin-top: 0rem;
}
.ctl00_Menu1_1 {
  border-radius: .25rem;
}
.round-s a {
  border-radius: .25rem;
  color: #e91e63;
  border-color: #e91e63;
}
.refresh-rgt {
  margin-right: 1.5rem;
}
div.aclink.refresh-lft button {
  border-radius: .25rem;
}
#divChart {
  border: 0;
}
table.tabc::after {
  content: "";
  display: block;
  margin-bottom: 2rem;
}
.partywise-state-selector {
  border: 0;
}
.partywise-state-selector {
  width: 75%;
  margin: 1rem auto;
}
.partywise-state-selector > tbody > tr:first-of-type > td {
  font-weight: bold;
  font-size: 1rem;
}
.partywise-state-selector > tbody > tr:nth-of-type(2) > td > b {
  display: none;
}
.partywise-state-selector > tbody > tr:nth-of-type(2) > td > select {
  width: 50%;
}
.partywise-trends-container {
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 2.5rem;
  border-radius: .25rem;
  box-shadow: 0 0 .5rem #ccc;
}
.partywise-trends {
  width: 100%;
  padding: 1rem;
}
table.partywise-trends > tbody > tr > th,
table.partywise-trends > tbody > tr > td {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.05rem solid #ccc;
}
table.partywise-trends > tbody > tr:first-of-type > td {
  border-bottom: .125rem solid #ccc;
  text-align: center;
  font-weight: 500;
  padding-top: 0;
  font-size: 1rem;
}
table.partywise-trends > tbody > tr:nth-of-type(2) > td {
  border-bottom: .125rem solid #ccc;
  text-align: center;
}
table.partywise-trends > tbody > tr:last-of-type > td {
  border-top: .125rem solid #ccc;
  border-bottom: .125rem solid #ccc;
}
table.partywise-trends > tbody > tr:nth-of-type(2) > td > b {
  font-weight: normal;
}
table.partywise-trends > tbody > tr:nth-of-type(3) > th {
  text-align: right;
}
table.partywise-trends > tbody > tr:nth-of-type(3) > th:first-of-type {
  text-align: left;
}
table.partywise-trends > tbody > tr:last-of-type > td {
  font-weight: bold;
}

table .header {
  font-size: 1.25rem;
  padding-bottom: 1rem;
}
.cnstty-selector {
  width: 80%;
  margin: 2rem auto;
}
.cnstty-wise-result-container {
  margin: 2rem -2.5rem 0;
  padding: 2.5rem;
  box-shadow: 0 0 .25rem #ccc;
  border-radius: .25rem;
}
.cnstty-wise-result {
  width: 100%;
}
.cnstty-wise-result > tbody > tr > td,
.cnstty-wise-result > tbody > tr > th {
  padding-top: .75rem;
  padding-bottom: .75rem;
  padding-right: .25rem;
  border-bottom: .04rem solid #ccc;
}
.cnstty-wise-result > tbody > tr:first-of-type > td {
  border-bottom: .125rem solid #ccc;
  padding-top: 0;
  text-align: center;
  font-size: 1.25rem;
}
.cnstty-wise-result > tbody > tr:nth-of-type(2) {
  display: none;
}
.cnstty-wise-result > tbody > tr:nth-of-type(3) > th {
  border-bottom: .125rem solid #ccc;
  text-align: right;
}
.cnstty-wise-result > tbody > tr:nth-of-type(3) > th:nth-of-type(1),
.cnstty-wise-result > tbody > tr:nth-of-type(3) > th:nth-of-type(2),
.cnstty-wise-result > tbody > tr:nth-of-type(3) > th:nth-of-type(3) {
  text-align: left;
}
.cnstty-wise-result > tbody > tr:last-of-type > td {
  border-top: .125rem solid #ccc;
  border-bottom: .125rem solid #ccc;
  font-weight: bold;
}


.tabcontent {
  background: #fff;
  box-shadow: 0 0 .25rem #ccc;
  padding: 2.5rem;
  margin: 2rem -2.5rem;
  border-radius: .25rem;
}
table.round-tbl {
  font-weight: normal;
  border: 0;
}
table.round-tbl > thead > tr > th,
table.round-tbl > tbody > tr > td {
  padding: .75rem .5rem;
  text-align: left;
}
table.round-tbl > thead > tr > th:nth-of-type(3),
table.round-tbl > thead > tr > th:nth-of-type(4),
table.round-tbl > thead > tr > th:nth-of-type(5),
table.round-tbl > tbody > tr > td:nth-of-type(3),
table.round-tbl > tbody > tr > td:nth-of-type(4),
table.round-tbl > tbody > tr > td:nth-of-type(5) {
  text-align: right;
}
table.round-tbl > thead > tr:nth-of-type(1) > th,
table.round-tbl > thead > tr:nth-of-type(2) > th {
  text-align: center;
}
table.round-tbl > thead > tr {
  background: none;
  border: 0;
  color: inherit;
}
table.round-tbl > thead > tr {
  border-bottom: .125rem solid #ccc;
}
table.round-tbl > thead > tr:first-of-type > th {
  padding: 0 0 .5rem;
  font-size: 1.25rem;
}
table.round-tbl > tbody > tr {
  border-bottom: .05rem solid #ccc;
}
table.round-tbl > tbody > tr:last-of-type {
  border-top: .125rem solid #ccc;
  border-bottom: .125rem solid #ccc;
  font-weight: bold;
}
table.round-tbl > tbody > tr > td:nth-of-type(3),
table.round-tbl > tbody > tr > td:nth-of-type(4),
table.round-tbl > tbody > tr > td:nth-of-type(5) {
  font-family: ${mf} !important;
}


.tab::before {
  content: "Rounds";
  display: block;
  text-align: center;
  font-size: 1.25rem;
  padding-bottom: .75rem;
}
.nextpv {
  display: none;
}
ul#image_slider {
  display: block;
  float: none;
  width: initial !important;
  max-width: initial;
  height: initial;
  margin: 0;
}
ul#image_slider > li {
  margin-bottom: .25rem;
  display: inline-block;
  float: none;
}
ul#image_slider > li + li {
  margin-left: .25rem;
}
`;


    const css1 =
`
#div1 table tr td:nth-of-type(2),
#div1 table tr td:nth-of-type(3),
#div1 table tr td:nth-of-type(4)
{
  font-family: ${mf} !important;
  text-align: right;
}`;
    const css2 =
`
#div1 table tr td:nth-of-type(4),
#div1 table tr td:nth-of-type(5),
#div1 table tr td:nth-of-type(6),
#div1 table tr td:nth-of-type(7)
{
  font-family: ${mf} !important;
  text-align: right;
}`;

    const style = document.createElement("style");
    let pageCss = css;
    // Constituencywise-All Candidates
    if (/\/.+\/partywiseresult.+/.test(window.location.pathname)) {
        pageCss += css1;
    }
    else if (/\/.+\/Constituencywise.+/.test(window.location.pathname)) {
        pageCss += css2;
        const table = document.querySelector("#div1 table");
        if (table) {
            sortCandidateTable(table);
        }
    }
    else {
        // do nothing
    }

    function sortCandidateTable(table) {
        const trArray = [];
        for (let i = 0; i < table.children[0].children.length; i++) {
            trArray[i] = table.children[0].children[i];
        }
        const memberArray = trArray.slice(3, trArray.length - 1)
        .sort((tr1, tr2) => {
            return parseInt(tr2.children[5].textContent) - parseInt(tr1.children[5].textContent);
        });
        const newTrArray = trArray.slice(0, 3)
        .concat(memberArray)
        .concat(trArray.slice(trArray.length - 1));
        const newTbody = document.createElement("tbody");
        newTrArray.forEach(e => newTbody.appendChild(e));

        table.children[0].remove();
        table.appendChild(newTbody);
    }

    style.innerHTML = pageCss;
    document.head.appendChild(style);

    function applyStyleToParent() {
        const elems = document.querySelectorAll("#piecharts26");
        for (let e of elems) {
            e.parentNode.style.border = "0";
        }
    }
    function stylizeClickLinksBelow() {
        const elem = document.querySelector(".tabc > tbody > tr:nth-of-type(2) > td:first-of-type > div:first-of-type");
        if (elem && elem.textContent.indexOf("links below") > -1) {
            elem.style.fontWeight = 400;
            elem.style.color = "#444";
        }
    }
    applyStyleToParent();
    stylizeClickLinksBelow();

    function removeStyleRec(elem) {
        ["style", "align"].forEach(a => elem.removeAttribute(a));
        for (let child of elem.children) {
            removeStyleRec(child);
        }
    }
    function removeTableAttributes(table) {
        ["cellspacing", "cellpadding", "border"].forEach(a => table.removeAttribute(a));
    }
    function lowerCaseText(elem) {
        if (elem) return elem.textContent.toLowerCase();
        return "";
    }

    function isTextContainsWords(text, words) {
        for (let word of words) {
            if (text.indexOf(word) < 0) {
                return false;
            }
        }
        return true;
    }

    function findTable(tableSel, elemSel, wordsToSearch) {
        const ts = document.querySelectorAll(tableSel);
        for (let t of ts) {
            const elem = t.querySelector(elemSel);
            const lct = lowerCaseText(elem);
            if (elem && isTextContainsWords(lct, wordsToSearch)) {
                return t;
            }
        }
        return null;
    }


    function stylizePartyWiseResultPage() {
        if (location.href.indexOf("partywiseresult") < 0) return;

        const stateSelectTable = findTable(
            ".tabc > tbody > tr > td > table > tbody > tr > td > table",
            "tbody > tr:first-of-type > td:first-of-type",
            ["partywise", "trends", "result"]
        );

        if (stateSelectTable) {
            removeStyleRec(stateSelectTable);
            removeTableAttributes(stateSelectTable);
            stateSelectTable.classList.add("partywise-state-selector");
        }

        const partyTrendsTable = findTable(
            ".tabc > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-of-type(2) > td > div > table",
            "tbody > tr:nth-of-type(2) > td > b > div",
            ["status", "known"]
        );

        if (partyTrendsTable) {
            removeStyleRec(partyTrendsTable.parentNode);
            removeTableAttributes(partyTrendsTable);
            partyTrendsTable.parentNode.classList.add("partywise-trends-container");
            partyTrendsTable.classList.add("partywise-trends");
            if (partyTrendsTable.parentNode.children[0].tagName === "BR") {
                partyTrendsTable.parentNode.children[0].remove();
            }
        }
    }

    function stylizeConstituencyWisePage() {
        if (location.href.indexOf("Constituencywise") < 0) return;

        const cwt = findTable(
            "table.tabc #div1 > table",
            "tbody > tr:nth-of-type(2) > td",
            ["result", "status"]
        );

        if (cwt) {
            removeStyleRec(cwt.parentNode);
            removeTableAttributes(cwt);
            cwt.parentNode.classList.add("cnstty-wise-result-container");
            cwt.classList.add("cnstty-wise-result");
        }

        const cst = findTable(
            "table.tabc > tbody > tr > td > table",
            "tbody > tr:nth-of-type(2) > td:first-of-type",
            ["select", "state", "constituency"]
        );
        if (cst) {
            removeStyleRec(cst);
            removeTableAttributes(cst);
            cst.classList.add("cnstty-selector");
            cst.querySelector("tbody > tr:first-of-type > td").classList.add("header");
        }
    }

    function styleizeRoundwisePage() {
        if (location.href.indexOf("Roundwise") < 0) return;

        const cst = findTable(
            "table.tabc > tbody > tr > td > table",
            "tbody > tr:first-of-type > td:first-of-type",
            ["select", "state", "constituency"]
        );
        if (cst) {
            removeStyleRec(cst);
            removeTableAttributes(cst);
            cst.classList.add("cnstty-selector");
        }

        const roundwise = document.querySelector("div.all-tabs");
        if (roundwise) {
            roundwise.classList.add("roundwise");
        }

        const roundwiseTables = document.querySelectorAll("table.round-tbl");
        for (let tbl of roundwiseTables) {
            removeStyleRec(tbl);
            removeTableAttributes(tbl);
        }

        const imageSlider = document.querySelector("ul#image_slider");
        if (imageSlider) {
            imageSlider.removeAttribute("style");
            const lis = [];
            Array.from(imageSlider.children).forEach(li => {if (li.children.length === 0) lis.push(li); });
            lis.forEach(li => li.remove());
        }
    }

    stylizePartyWiseResultPage();
    stylizeConstituencyWisePage();
    styleizeRoundwisePage();
})();
