// ==UserScript==
// @name         Delete wishlist items in one click on Flipkart
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Delete wishlist items in one click on Flipkart
// @author       Jitendra
// @match        https://www.flipkart.com/wishlist*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flipkart.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function deleteWishlisItemInOneClick() {
        function deleteOnClickHandler() {
            const btn = document.querySelector('button._2KpZ6l._3S58wp');
            if (btn) {
                btn.click();
            } else {
                console.warn('button to delete not found.');
            }
        }

        function onDelete() {
            console.log('delete clicked');
            setTimeout(() => deleteOnClickHandler(), 170);
        }
        document.querySelectorAll('.Bv11UC._2GI1Le.Bh0FCW').forEach((elem) => elem.addEventListener("click", onDelete, true));
    }

    function executeUntil(logic, predicate, interval) {
        if (predicate()) {
           logic();
        } else {
           setTimeout(() => executeUntil(logic, predicate, interval), interval);
        }
    }
    executeUntil(
        () => deleteWishlisItemInOneClick(),
        () => document.querySelectorAll('._1M-Ete').length > 0,
        1000
    );
})();
