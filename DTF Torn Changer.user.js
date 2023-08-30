// ==UserScript==
// @name         DTF Torn Changer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  
// @author       PhoenixG
// @match        https://dtf.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dtf.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const title = document.querySelector('.content-title');
    const titleTexts = document.querySelectorAll('.l-island-a');
    const quotes = document.querySelectorAll('.comment-quote__content');
    const comments = document.querySelectorAll('.comment__text');
    handleElement(title);
    handleElementCollections(titleTexts);
    handleElementCollections(quotes);
    handleElementCollections(comments);
    addListenersToBtns();

    function addListenersToBtns(){
        const loadMoreBtns = document.querySelectorAll('.comment__load-more');
        loadMoreBtns.forEach(btn => {
            btn.addEventListener('click', handleComments);
        });

        function handleComments(){
            setTimeout(() => {
                const quotes = document.querySelectorAll('.comment-quote__content');
                const comments = document.querySelectorAll('.comment__text');
                handleElementCollections(quotes);
                handleElementCollections(comments);
                loadMoreBtns.forEach(btn => {
                    btn.removeEventListener('click', handleComments);
                });
                addListenersToBtns();
            }, 2000);
        }
    }

    function handleElementCollections(collection){
        collection.forEach(el => {
            if(el.outerText !== "" && el.classList.length === 1) {
                handleElement(el);
            }
        });
    }

    function handleElement(el) {
        const reg = /порвался|я порвался|ты порвался/ig;
        if(reg.test(el.outerText)){
            const str = ucFirst(el.outerText.replace(reg, "я долбаёб"));
            el.textContent = str;
            if (!el.classList.contains('content-title')) {
                el.outerHTML = `<div class="l-island-a"><p>${str}</p></div>`;
            }
        }
    }

    function ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }
})();