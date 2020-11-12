// ==UserScript==
// @name         ECI Font Change
// @namespace    https://github.com/optimus29
// @version      1.1.0
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
#div1 table tbody tr {
  font-size: 1rem !important;
}
#div1 table tbody tr td {
  font-weight: normal !important;
}
h3 u {
  font-weight: 300 !important;
  font-size: 2rem;
  text-decoration: none;
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
})();
