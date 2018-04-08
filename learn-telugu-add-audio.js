// ==UserScript==
// @name         Learn Telugu Add Audio
// @namespace    https://github.com/optimus29
// @version      1.0
// @description  Add an audio element to listen to the audio without downloading it.
// @author       Optimus Prime
// @match        http://www.learningtelugu.org/cp-brown/*
// @website      https://github.com/optimus29
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let t = document.getElementById('attachments');
    let audioAnchor = document.querySelector('#attachments .odd a');
    console.log(audioAnchor);
    
    if (!audioAnchor) return;
    
    let audioUrl = audioAnchor.href;
    let audioElm = document.createElement('audio');
    
    audioElm.src = audioUrl;
    audioElm.setAttribute('controls','');
    audioElm.style.width = '100%';
    
    t.insertAdjacentElement("afterend", audioElm);
})();
