// ==UserScript==
// @name         ECI Style Change
// @namespace    https://github.com/optimus29
// @version      1.4.0
// @description  Change appearance of ECI websites
// @author       Optimus Prime
// @match        https://results.eci.gov.in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css =
`
body {
  font-family: "Fira Sans" !important;
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
`;
    const css1 =
`
#div1 table tr td:nth-of-type(2),
#div1 table tr td:nth-of-type(3),
#div1 table tr td:nth-of-type(4)
{
  font-family: 'Fira Mono' !important;
  text-align: right;
}`;
    const css2 =
`
#div1 table tr td:nth-of-type(4),
#div1 table tr td:nth-of-type(5),
#div1 table tr td:nth-of-type(6),
#div1 table tr td:nth-of-type(7)
{
  font-family: 'Fira Mono' !important;
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

    function removeStyleRecursively(elem) {
        ["style", "align"].forEach(a => elem.removeAttribute(a));
        for (let child of elem.children) {
            removeStyleRecursively(child);
        }
    }
    function removeTableAttributes(table) {
        ["cellspacing", "cellpadding", "border"].forEach(a => table.removeAttribute(a));
    }


    function stylizePartyWiseResultPage() {
        if (location.href.indexOf("partywiseresult") < 0) return;

        const stateSelectTable = (function findStateSelectElem() {
            const tables = document.querySelectorAll(".tabc > tbody > tr > td > table > tbody > tr > td > table");
            for (let table of tables) {
                const td = table.querySelector("tbody > tr:first-of-type > td:first-of-type");
                if (td) {
                    const lcText = td.textContent.toLowerCase();
                    if (lcText.indexOf("partywise") > -1 && lcText.indexOf("trends") > -1 && lcText.indexOf("result") > -1) {
                        return table;
                    }
                }
            }
            return null;
        })();

        if (stateSelectTable) {
            removeStyleRecursively(stateSelectTable);
            removeTableAttributes(stateSelectTable);
            stateSelectTable.classList.add("partywise-state-selector");
        }

        const partyTrendsTable = (function findPartyTrendsTable() {
            const tables = document.querySelectorAll(".tabc > tbody > tr > td > table > tbody > tr > td > table");
            for (let table of tables) {
                const ct = table.querySelector("tbody > tr:nth-of-type(2) > td > div > table");
                if (ct) {
                    const td = ct.querySelector("tbody > tr:nth-of-type(2) > td > b > div");
                    if (td && td.textContent.toLowerCase().indexOf("status") > -1
                        && td.textContent.toLowerCase().indexOf("known") > -1) {
                        return ct;
                    }
                }
            }
            return null;
        })();

        if (partyTrendsTable) {
            removeStyleRecursively(partyTrendsTable.parentNode);
            removeTableAttributes(partyTrendsTable);
            partyTrendsTable.parentNode.classList.add("partywise-trends-container");
            partyTrendsTable.classList.add("partywise-trends");
            if (partyTrendsTable.parentNode.children[0].tagName === "BR") {
                partyTrendsTable.parentNode.children[0].remove();
            }
        }
    }
    stylizePartyWiseResultPage();
})();
