// ==UserScript==
// @name         1337x Full Page Content
// @namespace    https://github.com/optimus29
// @version      1.3.0
// @description  Make main content show in full width of page
// @author       Optimus Prime
// @include      /^https?:\/\/(www.)?x?1337x.*$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const keyName = "fcui-qziuka";
    const html = `
<div class="full-content-ui">
   <div>
      <label class="checkbox" for="fullContentUiCb">
         <span class="checkbox__input">
            <input type="checkbox" id="fullContentUiCb">
            <span class="checkbox__control">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="none" stroke="currentColor" stroke-width="3" d="M1.73 12.91l6.37 6.37L22.79 4.59"></path>
               </svg>
            </span>
         </span>
         <span class="radio__label">Full Content UI</span>
      </label>
   </div>
</div>
`;

    var css = `
.full-content-ui {
  border-top: .06rem solid #373737;
  padding: 1rem;
}
.checkbox {
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  font-size: 1rem;
  display: block;
  color: white;
}
.checkbox__input input {
  opacity: 0;
  width: 1em;
  height: 1em;
  display: none;
}
.checkbox__control {
  display: inline-grid;
  width: 1em;
  height: 1em;
  border-radius: 0.25em;
  border: 0.1em solid currentColor;
}
.checkbox__input {
  grid-template-areas: "checkbox";
}
.radio__label {
  padding-left: .5rem;
  font-family: "Oswald Light";
}
.checkbox__control svg {
  transition: transform 0.1s ease-in 25ms;
  transform: scale(0);
  transform-origin: bottom left;
}
.checkbox__input input:checked + .checkbox__control svg {
  transform: scale(1);
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
        if (left) left.style.display = "none";
        rightElemClasses = right.getAttribute("class");
        right.setAttribute("class", ".col-12 .page-content");
    }

    function restoreUi() {
        if (left) left.style.display = "block";
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
