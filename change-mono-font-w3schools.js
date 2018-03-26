// ==UserScript==
// @name         W3Schools: change mono font
// @namespace    optimus29
// @version      1.0
// @description  Change mono font
// @author       Optimus Prime
// @match        https://www.w3schools.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	try {
		var applyStyle = function() {
			var i;
			var fontStyle = document.createElement("style");
			var fontName = "Fira Mono";

			console.log("Name of the mono font: " + fontName);
			fontStyle.innerHTML = "@import url('https://fonts.googleapis.com/css?family=Fira+Mono');";

			var head = document.getElementsByTagName("head")[0];
			head.appendChild(fontStyle);

			var codeWrappers = document.getElementsByClassName("w3-code");

			console.log("Number of code wrappers: " + codeWrappers.length);

			for (i = 0; i < codeWrappers.length; i++) {
				console.log("code warpper: " + i);
				codeWrappers[i].style.fontFamily = fontName;
			}
		};
		
		window.setTimeout(applyStyle, 4000);
	} catch (e) {
		console.log(e);
	}
})();
