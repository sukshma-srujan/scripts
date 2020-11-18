// ==UserScript==
// @name         Text to Speech
// @namespace    https://github.com/optimus29
// @version      0.1
// @description  Read out webpages
// @author       Optimus Prime
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const PREFERENCE_IDENTIFIER = "tts-preferences";

	const html = `
<div class="jk-tts-ui">
    <button id="tts-toggle" type="button">TTS</button>
    <div class="tts-ui-inner">
        <div class="tts-group">
            <label for="ttsElemSelector">Element Selector</label>
            <input id="ttsElemSelector" value="article" />
        </div>
        <div class="tts-group">
            <label for="ttsLang">Language</label>
            <select id="ttsLang"></select>
        </div>
        <div class="tts-group">
            <label for="ttsSavePrefs"><input type="checkbox" id="ttsSavePrefs"/> Save Prefrences</label>
        </div>
        <hr/>
        <div class="tts-buttons">
            <button type="button" id="ttsBtnPlay">Play</button>
            <button type="button" id="ttsBtnStop">Stop</button>
        </div>
    </div>
</div>`;

	const css = `
.jk-tts-ui {
    position: fixed;
    right: 0;
    top: 4rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25);
	z-index: 100000;
}
.jk-tts-ui hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
#tts-toggle{
    position: absolute;
    background: #fff;
    padding: .5rem .5rem;
    border-radius: .25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    right: 100%;
    top: 1rem;
    letter-spacing: .06rem;
    border: 0;
    cursor: pointer;
}
.tts-ui-inner {
    background: #fff;
    padding: 1rem;
    border-radius: .25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.tts-ui-inner .tts-group {
    margin-bottom: 1rem;
}
.tts-ui-inner label {
    font-size: .8rem;
    display: block;
    margin-bottom: .25rem;
}
#ttsElemSelector,
#ttsLang {
    padding: .25rem .5rem;
    display: block;
    width: 100%;
}
.jk-alert {
    position: fixed;
    top: 3rem;
    left: 3rem;
    padding: 1rem;
    background: #f7f7f7;
    width: 12rem;
    box-shadow: 0 0 10px #888;
    font-size: 0.85rem;
    border-radius: .25rem;
}
.jk-alert-info {
    background: #DCEDC8;
    color: #33691E;
}
.jk-alert-error {
    background: #ffcdd2;
    color: #b71c1c;
}
.tts-buttons button {
    width: 7rem;
    padding: .25rem .5rem;
}`;

	const ttsConfig = {
		elementSelector: 'article',
		language: 'en-US',
		savePreferences: false
	};

	const elems = {
		divTtsUi: null,
		buttonUiToggle: null,
		inputElementSelector: null,
		selectLanguage: null,
		checkboxSavePrefs: null,
		btnPlay: null,
		btnPause: null,
		btnStop: null
	};

	const ttsState = {
		utterance: null
	};

    function removeUnwantedElements(elem) {
        for (let e of elem.querySelectorAll("script")) {
            e.remove();
        }
    }

	function main() {
		injectHtmlAndCss();
		loadPreferences();
		queryElements();
		initUiWithValues();
		setupListeners();
		elems.btnStop.disable();
		elems.buttonUiToggle.click();
	}

	function injectHtmlAndCss() {
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.appendChild(style);

		const uiWrapper = document.createElement("div");
		uiWrapper.innerHTML = html;
		document.body.appendChild(uiWrapper);
	}

	function onPlay() {
		const targetElem = document.querySelector(ttsConfig.elementSelector);
		if (!targetElem) {
			ttsNotify("Element selector does not point to a valid element.", true);
			return;
		}
        removeUnwantedElements(targetElem);
		ttsState.utterance = new SpeechSynthesisUtterance();
		ttsState.utterance.lang = ttsConfig.language;
		ttsState.utterance.text = targetElem.textContent;

		ttsState.utterance.onerror = onSpeakError;
		ttsState.utterance.onend = onSpeakEnd;

		setClickListenerOnPlayBtn("Pause", onPause);
		elems.btnStop.enable();
		speechSynthesis.speak(ttsState.utterance);
	}

	function onSpeakError(event) {
		onStop();
		ttsNotify("Error occurred while reading the text.");
		console.log("Error occurred while reading the text", event);
	}

	function onSpeakEnd() {
		onStop();
	}

	function onPause() {
		speechSynthesis.pause();
		setClickListenerOnPlayBtn("Resume", onResume);
	}

	function onResume() {
		speechSynthesis.resume();
		setClickListenerOnPlayBtn("Pause", onPause);
	}

	function onStop() {
		speechSynthesis.cancel();
		elems.btnStop.disable();
		setClickListenerOnPlayBtn("Play", onPlay);
	}

	function setClickListenerOnPlayBtn(btnLabel, func) {
		for (let f of [onPlay, onPause, onResume]) {
			elems.btnPlay.removeEventListener("click", f);
		}
		elems.btnPlay.innerHTML = btnLabel;
		elems.btnPlay.addEventListener("click", func);
	}

	function queryElements() {
		elems.divTtsUi = document.querySelector("div.tts-ui-inner");
		elems.buttonUiToggle = document.querySelector("#tts-toggle");
		elems.inputElementSelector = document.querySelector("#ttsElemSelector");
		elems.selectLanguage = document.querySelector("#ttsLang");
		elems.checkboxSavePrefs = document.querySelector("#ttsSavePrefs");
		elems.btnPlay = document.querySelector("#ttsBtnPlay");
		elems.btnStop = document.querySelector("#ttsBtnStop");
		addMethodsToButton(elems.btnPlay);
		addMethodsToButton(elems.btnStop);
		addOptionsToLanguageSelect();
	}

	function addMethodsToButton(button) {
		button.disable = function () {
			this.setAttribute("disabled", "disabled");
		}
		button.enable = function () {
			this.removeAttribute("disabled");
		}
	}

	function setupListeners() {
		elems.buttonUiToggle.addEventListener("click", toggleTtsUi);
		elems.inputElementSelector.addEventListener("change", function (event) {
			ttsConfig.elementSelector = event.target.value.trim();
			storeOrRemovePreferences();
		});
		elems.selectLanguage.addEventListener("change", function (event) {
			ttsConfig.language = event.target.value;
			storeOrRemovePreferences();
		});
		elems.checkboxSavePrefs.addEventListener("change", function (event) {
			ttsConfig.savePreferences = event.target.checked;
			storeOrRemovePreferences();
		});
		elems.btnPlay.addEventListener("click", onPlay);
		elems.btnStop.addEventListener("click", onStop);
	}

	function initUiWithValues() {
		elems.inputElementSelector.value = ttsConfig.elementSelector;
		elems.selectLanguage.value = ttsConfig.language;
		elems.checkboxSavePrefs.checked = ttsConfig.savePreferences;
	}

	function addOptionsToLanguageSelect() {
		const langs = getSupportedLanguages();
		if (langs.length == 0) {
			ttsNotify("Languages for speech not found.", true);
			return;
		}
		const sel = elems.selectLanguage;
		for (let langItem of langs) {
			const option = document.createElement("option");
			option.setAttribute("value", langItem.language);
			option.innerHTML = langItem.name;
			sel.appendChild(option);
		}
	}

	function getSupportedLanguages() {
		const langMap = new Map();
		for (let voice of speechSynthesis.getVoices()) {
			langMap.set(voice.lang, 1);
		}
		const langs = [];
		for (let lang of langMap.keys()) {
			langs.push({ language: lang, name: lang });
		}
		return langs;
	}

	function loadPreferences() {
		const savedPrefrences = localStorage.getItem(PREFERENCE_IDENTIFIER);
		if (savedPrefrences) {
			Object.assign(ttsConfig, JSON.parse(savedPrefrences));
		}
	}

	function storeOrRemovePreferences() {
		if (ttsConfig.savePreferences) {
			localStorage.setItem(PREFERENCE_IDENTIFIER, JSON.stringify(ttsConfig))
		} else {
			localStorage.removeItem(PREFERENCE_IDENTIFIER);
		}
	}

	function toggleTtsUi() {
		const computedStyle = window.getComputedStyle(elems.divTtsUi);
		if (computedStyle.display !== 'none') {
			elems.divTtsUi.style.display = 'none';
		} else {
			elems.divTtsUi.style.display = 'block';
		}
	}

	function ttsNotify(text, isError) {
		const noti = document.createElement("div");
		noti.innerHTML = text;
		noti.classList.add("jk-alert");
		if (isError) {
			noti.classList.add("jk-alert-error");
		} else {
			noti.classList.add("jk-alert-info");
		}
		document.body.appendChild(noti);
		setTimeout(() => {
			noti.remove();
		}, 3000);
	}

	setTimeout(main, 3000);
})();
