// ==UserScript==
// @name         Learn Telugu UI
// @namespace    https://github.com/optimus29
// @version      1.2
// @description  Transform the website
// @author       Optimus Prime
// @match        http://www.learningtelugu.org/cp-brown/*
// @website      https://github.com/optimus29
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function formatNum(num) {
        return num > 10 ? '' + num : '0' + num;
    }
    
    let leftUrl = '#';
    let rightUrl = '#';
    
    let lessonCounts = [47];
    let digitPos = window.location.href.search(/\d\d-\d\d/);
    
    if (digitPos < 0) return;
    
    let digits = window.location.href.substr(digitPos, 5).split('-');
    let lessonNum = +digits[0];
    let exerciseNum = +digits[1];
    
    if (true) {
        let ln, en;
        
        if (lessonNum === 1 && exerciseNum > 1) {
            ln = formatNum(lessonNum);
            en = formatNum(exerciseNum - 1);
        } else if (lessonNum > 1) {
            if (exerciseNum > 1) {
                ln = formatNum(lessonNum);
                en = formatNum(exerciseNum - 1);
            } else {
                let maxCount = lessonCounts[lessonNum - 2];
                ln = formatNum(lessonNum - 1);
                en = formatNum(maxCount);
            }
        }
        
        if (ln && en ) {
            leftUrl = `http://www.learningtelugu.org/cp-brown/vakyanirmanam-lesson-${ln}-${en}.html`;
        }
    }
    
    if (lessonNum === lessonCounts.length) {
        let maxCount = lessonCounts[lessonCounts.length - 1];
        if (exerciseNum < maxCount) {
            let ln = formatNum(lessonNum);
            let en = formatNum(exerciseNum + 1);
            
            rightUrl = `http://www.learningtelugu.org/cp-brown/vakyanirmanam-lesson-${ln}-${en}.html`;
        }
    } else {
        let maxCount = lessonCounts[lessonNum - 1];
        let ln, en;
        
        if (exerciseNum === maxCount) {
            ln = formatNum(lessonNum+1);
            en = '01';
        } else {
            ln = formatNum(lessonNum);
            en = formatNum(exerciseNum+1);
        }
        
        rightUrl = `http://www.learningtelugu.org/cp-brown/vakyanirmanam-lesson-${ln}-${en}.html`;
    }
    
    
    let html = 
`
<div class="button-bar">
  <div class="btn-left">
    <a href="${leftUrl}">&lt; Previous</a>
  </div>
  <div class="btn-right">
    <a href="${rightUrl}">Next &gt;</a>
  </div>
</div>
`;
    
    let css = 
`
#main {
  font-size: 1rem;
}
body,
#page,
#page-inner,
#header,
#content{
  width: 100%;
  margin-top: 0;
  margin-left: 0;
  margin-bottom: 0;
  margin-right: 0;
  font-family: 'Fira Sans';
}
#page {
  background: #fff;
}
#header {
  background-color: #000;
  background-size: 100% 100%;

}
#navbar-inner {
  width: auto;
  position: absolute;
  right: 0;
  top: 0;
}
#sidebar-left {
  width: 30% !important;
  float: left !important;
  margin: 0 !important;
}
#content {
  float: right !important;
  width: 70% !important;
  margin: 0 !important;
}
.content > img {
  width: 100%;
  height: auto;
}
#attachments {
  border-collapse: collapse;
  background-color: transparent;
  margin: 2rem 0;
}
#attachments thead tr th, #attachments tbody tr td {
  background-color: transparent;
}
tr.odd, tr.even {
  background-color: transparent;
  border: 0;
}
#attachments thead tr th {
  padding: 15px 25px;
  background: #e7e7a0;
}
#attachments tbody tr td {
  padding: 12px 25px;
  background-color: #f7f7e0;
}
#attachments tbody tr + tr td {
  border-top: 1px solid #e7e7d0;
}
.content audio {
  margin: 2rem 0;
}
.button-bar {
  margin: 2rem 0;
}
.button-bar:after {
  content: " ";
  display: block;
  float: none;
  clear: both;
}
.button-bar .btn-left {
  float: left;
}
.button-bar .btn-right {
  float: right;
}
.button-bar a {
  background-color: #ff6027;
  color: #ffffff;
  display: block;
  font-weight: bold;
  min-width: 120px;
  text-align: center;
  font-size: 1rem;
  line-height: 2.2;
}

#footer {
  background: none;
  font-size: 1rem !important;
}
`;
  
    if (lessonNum <= lessonCounts.length) {
        let aud = document.getElementsByTagName('audio')[0];
        aud.insertAdjacentHTML('afterend',html);
    }
    
    let style = document.createElement('style');
    style.innerHTML = css;
    
    document.head.appendChild(style);
    
})();
