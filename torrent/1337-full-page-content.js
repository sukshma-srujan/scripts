// ==UserScript==
// @name         1337x Full Page Content
// @namespace    https://github.com/optimus29
// @version      1.0.2
// @description  Make main content show in full width of page
// @author       Optimus Prime
// @match        https://1337x.to/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const keyName = "fcui-qziuka";
    const html = `
<div class="full-content-ui">
  <div>
    <label for="fullContentUiCb">
		<input type="checkbox" id="fullContentUiCb">Full Content UI
	</label>
  </div>
</div>
`;

    var css = `
.full-content-ui {
  background: #171717;
  border-top: .06rem solid #373737;
}
.full-content-ui label {
  color: white;
  display: block;
  padding: 1rem;
}
`;

    var rightElemClasses = "";
    var left = document.querySelector("main.container .row aside");
    var right = document.querySelector("main.container .row .page-content");

    var uiWrapper = document.createElement("div");
    document.body.appendChild(uiWrapper);
    uiWrapper.innerHTML = html;


    var style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    function makeContentFullPage() {
        left.style.display = "none";
        rightElemClasses = right.getAttribute("class");
        right.setAttribute("class", ".col-12 .page-content");
    }

    function restoreUi() {
        left.style.display = "block";
        right.setAttribute("class", rightElemClasses);
    }

    var cb = document.querySelector("#fullContentUiCb");
    cb.addEventListener("change", function() {
        if (document.querySelector("#fullContentUiCb").checked) {
            makeContentFullPage();
            localStorage.setItem(keyName, "1");
        } else {
            localStorage.setItem(keyName, "0");
            restoreUi();
        }
    });

    if (localStorage.getItem(keyName) === "1") {
        makeContentFullPage();
        document.querySelector("#fullContentUiCb").checked = true;
    }
})();
