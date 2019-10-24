// ==UserScript==
// @name         Torrent Filter
// @namespace    https://github.com/optimus29
// @version      1.2
// @description  Filter torrent search results on website family "1337x"
// @author       Optimus Prime
// @match        https://x1337x.ws/*
// @match        https://x1337x.eu/*
// @match        https://1337x.to/*
// @website      https://github.com/optimus29
// @grant        none
// ==/UserScript==
const FILTER_UI_HTML = `
<div id="jk-outer-wrapper">
	<div id="jk-wrapper-toggle"><span>F</span></div>
	<div id="jk-wrapper">
	<div class="jk-option-wrapper">
		<input type="checkbox" id="jk-checkbox-name" value="">
		<label for="jk-checkbox-name" class="jk-checkbox-label"><span><span></span></span>Name contains</label><br>
		<input type="text" id="jk-input-name">
		<br>
		<input type="radio" name="jkNamePos47" value="start" id="jk-radio-name-start" checked="checked" >
		<label for="jk-radio-name-start"><span><span></span></span>Start</label>

		<input type="radio" name="jkNamePos47" value="end" id="jk-radio-name-end">
		<label for="jk-radio-name-end"><span><span></span></span>End</label>

		<input type="radio" name="jkNamePos47" value="anywhere" id="jk-radio-name-anywhere">
		<label for="jk-radio-name-anywhere"><span><span></span></span>Anywhere</label>
	</div>
	<div class="jk-option-wrapper">
		<input type="checkbox" id="jk-checkbox-size" value="">
		<label for="jk-checkbox-size" class="jk-checkbox-label"><span><span></span></span>Size</label><br>
		<input type="text" id="jk-input-size">
		<br>
		<input type="radio" name="jkSizeCmp47" value="lessthan" id="jk-radio-file-lessthan" checked="checked" >
		<label for="jk-radio-file-lessthan"><span><span></span></span>Less than</label>

		<input type="radio" name="jkSizeCmp47" value="greaterthan" id="jk-radio-file-greaterthan">
		<label for="jk-radio-file-greaterthan"><span><span></span></span>Greater than</label>
	</div>
	<div class="jk-option-wrapper">
		<input type="checkbox" id="jk-checkbox-seed" value="">
		<label for="jk-checkbox-seed" class="jk-checkbox-label"><span><span></span></span>Exclude zero seed </label>
	</div>
	<div class="jk-option-wrapper">
		<input type="button" class="button" value="Apply" id="button-apply">
		<input type="button" class="button" value="Clear" id="button-remove">
	</div>
	</div>
</div>
`;


const FILTER_UI_STYLE = `
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed');
#jk-outer-wrapper{ display:inline-block; font-size:14px; font-family:'Ubuntu Condensed',sans-serif; position:fixed; top:0px; right:0px; }
#jk-wrapper{ z-index: 1000; padding:20px; border-radius:2px; background:#fff; box-shadow:0 0 15px #666; display:none; }
.jk-option-wrapper{ margin-left:2em; }
.jk-option-wrapper + .jk-option-wrapper { padding-top:15px; }
#jk-input-name,#jk-input-size{ width:200px; padding:0; border:0; background: transparent; border-bottom:2px solid #da3a04; font-family: inherit; }
input[type=checkbox]:not(old),
input[type=radio]:not(old) { width: 2em; margin: 0; padding: 0; font-size: 1em; opacity: 0; }

input[type=checkbox]:not(old)+label{ display: inline-block; margin-left: -4em; margin-right: 0.5em; line-height: 1.5em; }
input[type=radio]:not(old)+label { display: inline-block; margin-left: -2.5em; margin-right: 0.5em; line-height: 1.5em; }
input[type=checkbox]:not(old)+label>span { display: inline-block; margin: 0.25em 0.5em 0.25em 0.25em; border: 0.09em solid #da3a04; border-radius: 10%; background: #fff; vertical-align: middle; }

input[type=radio]:not(old)+label>span { display: inline-block; margin: 0.25em 0.5em 0.25em 0.25em; border: 0.09em solid #da3a04; border-radius: 100%; background: #fff; vertical-align: middle; }
input[type=checkbox]:not(old):checked+label>span>span{ display: block; width: 0.6em; height: 0.6em; margin:2px; border-radius: 10%; background: #da3a04; }
input[type=radio]:not(old):checked+label>span>span { display: block; width: 0.6em; height: 0.6em; margin:2px; border-radius: 100%; background: #da3a04; }
input[type=checkbox]:not(old)+label>span>span,
input[type=radio]:not(old)+label>span>span { display: block; width: 0.6em; height: 0.6em; margin:2px; border-radius: 100%; background: #fff; }
input.button{ -ms-appearance: none; -webkit-appearance: none; -moz-appearance: none; appearance:none; padding:9px 25px; border:0; background:#da3a04; text-transform:uppercase; font-size:0.8em; font-weight:600; color:white; border-radius:2px; cursor: pointer; }
.jk-checkbox-label { font-size:1.2em; }
#jk-wrapper-toggle{ position: absolute; top:1em; left:-3em; width:3em; height:3em; text-align: center; line-height: 3em; display:inline-block; border-radius:3px; border-top-right-radius: 0; border-bottom-right-radius: 0; background:#fff; box-shadow:0 0 10px #666; cursor: pointer; z-index: 1; }
#jk-wrapper-toggle span { font-size:1.2em; font-weight: bold; }
`;


// sequence of array
// container class name / id name
// row class name / id pattern / tag name
// name column class name
// size column class name
// seeds column class name
(function() {
    'use strict';
    'allow pasting';
    // constants related to file name
    const TEXT_POS_AT_START = 'start';
    const TEXT_POS_AT_END = 'end';
    const TEXT_POS_AT_ANYWHERE = 'anywhere';
    // constants related to file size
    const FILE_SIZE_LESS_THAN = 'lessthan';
    const FILE_SIZE_GREATER_THAN = 'greaterthan';
    const FILE_SIZE_NO_COMPARISON = 'nocomparison';
    const SESSION_KEY = 'EKtagrwzXJGFKSncJxFsgvurYIyIaAzF';
    const UI_INIT_VALUE = {
        nameFilterActive: false,
        nameFilterValue: '',
        nameFilterPos: TEXT_POS_AT_ANYWHERE,
        sizeFilterActive: false,
        sizeFilterValue: '',
        sizeFilterCompare: FILE_SIZE_LESS_THAN,
        seedFilterActive: false,
        showUi: false
    };

    var _g = {
        rowSet: [], // all result rows
        web: {
            '1337x': {
                siteName: 'https://1337x',
                containerSel: '.table-list',
                rowSel: 'tr',
                nameColSel: '.coll-1 a:nth-of-type(2)',
                sizeColSel: '.coll-4',
                seedColSel: '.coll-2'
            },
            'x1337x': {
                siteName: 'https://x1337x',
                containerSel: '.table-list',
                rowSel: 'tr',
                nameColSel: '.coll-1 a:nth-of-type(2)',
                sizeColSel: '.coll-4',
                seedColSel: '.coll-2'
            }
        },
        ui: {
            nameCb: null,
            sizeCb: null,
            seedCb: null,
            nameInput: null,
            sizeInput: null,
            buttonToggle: null,
            uiDisplayStatus: false,
            uiWrapper: null,
            state: JSON.parse(JSON.stringify(UI_INIT_VALUE)),

            isInvalidPage: function() {
                var pageData = _g.util.getPageData();
                return (!pageData);
            },

            saveState: function() {
                this.populateState();
                const stateStr = JSON.stringify(_g.ui.state);
                sessionStorage.setItem(SESSION_KEY, stateStr);
            },

            restoreState: function() {
                const stateStr = sessionStorage.getItem(SESSION_KEY);

                if (!stateStr) {
                    console.info('No saved state found.');
                    return;
                }

                _g.ui.state = JSON.parse(stateStr);
            },

            populateState: function() {
                _g.ui.state.nameFilterActive = this.nameCb.checked;
                _g.ui.state.nameFilterPos = document.querySelector('input[name=jkNamePos47]:checked').value;
                _g.ui.state.nameFilterValue = this.nameInput.value;

                _g.ui.state.sizeFilterActive = this.sizeCb.checked;
                _g.ui.state.sizeFilterCompare = document.querySelector('input[name=jkSizeCmp47]:checked').value;
                _g.ui.state.sizeFilterValue = this.sizeInput.value;

                _g.ui.state.seedFilterActive = this.seedCb.checked;
            },

            resetState: function() {
                _g.ui.state = JSON.parse(JSON.stringify(UI_INIT_VALUE));
            },

            applyState: function() {
                // set state to UI
                this.nameCb.checked = _g.ui.state.nameFilterActive;
                document.querySelector('input[name=jkNamePos47][value=' + _g.ui.state.nameFilterPos + ']').checked = true;
                this.nameInput.value = _g.ui.state.nameFilterValue;

                this.sizeCb.checked = _g.ui.state.sizeFilterActive;
                document.querySelector('input[name=jkSizeCmp47][value=' + _g.ui.state.sizeFilterCompare + ']').checked = true;
                this.sizeInput.value = _g.ui.state.sizeFilterValue;

                this.seedCb.checked = _g.ui.state.seedFilterActive;
            },

            createUI: function() {
                if (_g.ui.isInvalidPage()) return;

                let head = document.getElementsByTagName("head")[0];
                let body = document.getElementsByTagName("body")[0];

                let uiStyle = document.createElement("style");
                uiStyle.innerHTML = FILTER_UI_STYLE;

                body.innerHTML += FILTER_UI_HTML;

                head.appendChild(uiStyle);

                this.nameCb = document.getElementById("jk-checkbox-name");
                this.sizeCb = document.getElementById("jk-checkbox-size");
                this.seedCb = document.getElementById("jk-checkbox-seed");

                this.nameInput = document.getElementById("jk-input-name");
                this.sizeInput = document.getElementById("jk-input-size");
                this.buttonToggle = document.getElementById("jk-wrapper-toggle");
                this.uiWrapper = document.getElementById("jk-wrapper");

                let that = this;

                this.buttonToggle.addEventListener("click", function(e) {
                    if (that.state.showUi) that.hideUI();
                    else that.showUI();

                    e.stopPropagation();
                    e.preventDefault();
                }, false);

                let buttonApply = document.getElementById("button-apply");
                let buttonRemove = document.getElementById("button-remove");


                buttonApply.addEventListener("click", function() {
                    _g.filter.applyFilters();
                }, false);

                buttonRemove.addEventListener("click", function() {
                    _g.filter.removeAllFilters();
                }, false);

                this.restoreState();
                this.applyState();
                if (this.state.showUi) this.showUI();
                _g.filter.applyFilters();
            },


            showUI: function() {
                this.uiWrapper.style.display = "block";
                this.state.showUi = true;
                this.saveState();
            },

            hideUI: function() {
                this.uiWrapper.style.display = "";
                this.state.showUi = false;
                this.saveState();
            },

            nameSelected: function() {
                return (this.nameCb != null) ? this.nameCb.checked : false;
            },
            sizeSelected: function() {
                return (this.sizeCb != null) ? this.sizeCb.checked : false;
            },
            seedSelected: function() {
                return (this.seedCb != null) ? this.seedCb.checked : false;
            },
            getNameString: function() {
                return (this.nameInput === null) ? null : this.nameInput.value;
            },
            getNamePos: function() {
                let radios = document.querySelectorAll('input[name="jkNamePos47"]');
                let val = null,
                    i;

                for (i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        val = radios[i].value;
                        break;
                    }
                }

                switch (val) {
                    case 'start':
                        return TEXT_POS_AT_START;
                    case 'end':
                        return TEXT_POS_AT_END;
                    default:
                        return TEXT_POS_AT_ANYWHERE;
                }
            },
            getSizeString: function() {
                return (this.sizeInput === null) ? null : this.sizeInput.value;
            },
            getSizeComparison: function() {
                let radios = document.querySelectorAll('input[name="jkSizeCmp47"]');
                let val = null;
                let i;

                for (i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        val = radios[i].value;
                        break;
                    }
                }

                if (val) {
                    return (val === 'lessthan') ? FILE_SIZE_LESS_THAN : FILE_SIZE_GREATER_THAN;
                } else {
                    return FILE_SIZE_NO_COMPARISON;
                }
            }
        },
        filter: {
            applyFilterName: function(colSelector, str, position) {
                let i;
                let rowSet = _g.rowSet;

                console.log('search key: ' + str + '  position: ' + position + "  sel: " + colSelector);
                for (i = 0; i < rowSet.length; i++) {
                    let node = rowSet[i].querySelector(colSelector);

                    if (!node) continue;

                    let name = node.textContent.toUpperCase();
                    let flag = false;
                    str = str.toUpperCase();

                    switch (position) {
                        case TEXT_POS_AT_START:
                            flag = name.startsWith(str);
                            break;
                        case TEXT_POS_AT_END:
                            flag = name.endsWith(str);
                            break;
                        default:
                            flag = (name.indexOf(str) != -1);
                    }

                    if (!flag) this.hideRow(rowSet[i]);
                }
            },

            applyFilterSize: function(colSelector, sizeStr, comparison) {
                let i;
                let sizeLimit = _g.util.parseSizeStr(sizeStr);
                let rowSet = _g.rowSet;

                if (sizeLimit === -1 || comparison === FILE_SIZE_NO_COMPARISON) return;

                //console.log("TorrentFilter::size filter:: sizeLimit: " + sizeLimit + "  op: " + comparison);
                for (i = 0; i < rowSet.length; i++) {
                    let rowSizeStr = rowSet[i].querySelector(colSelector).childNodes[0].nodeValue || '';
                    let flag = false;
                    let fileSize = _g.util.parseSizeStr(rowSizeStr);

                    if (fileSize == -1) {
                        console.log("TorrentFilter::Error in parsing file size: " + rowSizeStr);
                    }

                    if (comparison === FILE_SIZE_LESS_THAN) {
                        flag = (fileSize > sizeLimit);
                    } else {
                        flag = (fileSize < sizeLimit);
                    }

                    //console.log("row idx: " + i + "  rowSize: " + rowSizeStr + "  fileSize: " + fileSize + "  flag: " + flag);

                    if (flag) this.hideRow(rowSet[i]);
                }
            },

            applyFilterSeed: function(colSelector, minSeed) {
                let i;
                let rowSet = _g.rowSet;

                console.log("--applying filter seed");

                if (minSeed === undefined) minSeed = 1;

                for (i = 0; i < rowSet.length; i++) {
                    let seedCount = parseInt(rowSet[i].querySelector(colSelector).textContent);

                    //console.log('row  idx: ' + i + '  seedCount: ' + seedCount);

                    if (seedCount < minSeed) this.hideRow(rowSet[i]);
                }
            },

            removeAllFilters: function() {
                let i;
                let rowSet = _g.rowSet;

                console.log("Removing all filters");

                for (i = 0; i < rowSet.length; i++) {
                    this.displayRow(rowSet[i]);
                }
                _g.ui.resetState();
                _g.ui.saveState();
            },
            applyFilters: function() {
                console.log("Applying filters");
                // get rquired names
                var pageData = _g.util.getPageData();
                if (pageData === null) return;

                try {
                    // may throw SYNTAX_ERR exception
                    _g.rowSet = document.querySelectorAll(pageData.containerSel + ' ' + pageData.rowSel);
                } catch (e) {
                    console.log(e);
                    return;
                }

                if (_g.rowSet.length === 0) {
                    console.log('No rows found.');
                    return;
                } else {
                    console.log('Number of result rows: ' + _g.rowSet.length);
                }

                // first remove any previous filtering
                this.removeAllFilters();

                // applying filters
                let ui = _g.ui;

                if (ui.nameSelected()) {
                    console.log("Applying name filter");

                    this.applyFilterName(pageData.nameColSel, ui.getNameString(), ui.getNamePos());
                }

                if (ui.sizeSelected()) {
                    console.log("Applying name filter");

                    this.applyFilterSize(pageData.sizeColSel, ui.getSizeString(), ui.getSizeComparison());
                }

                if (ui.seedSelected()) {
                    console.log("Applying name filter");

                    this.applyFilterSeed(pageData.seedColSel);
                }

                _g.ui.saveState();
                console.log("All filter applied");
            },

            hideRow: function(row) {
                // check whether element is already hidden by some other filter
                if (row.hasAttribute("data-jk-style")) return;

                let dispStyle = row.style.display;

                if (!dispStyle) dispStyle = "";

                // save display style if any set by website script
                row.setAttribute("data-jk-style", dispStyle);
                // hide row
                row.style.display = "none";
            },

            displayRow: function(row) {
                let dispStyle = row.getAttribute("data-jk-style");

                if (!dispStyle) dispStyle = "";

                row.removeAttribute("data-jk-style");
                row.style.display = dispStyle;
            }
        },
        util: {
            parseSizeStr: function(sizeStr) {
                let units = ['BYTES', 'KB', 'MB', 'GB', 'TB', 'EB', 'PB'];
                if (typeof(sizeStr) === 'string' || sizeStr instanceof String) {
                    let parts = sizeStr.split(' ');
                    let i;
                    parts[0] = parts[0].replace(/[,]/g, '');

                    // length of parts is other than 2 or the first element is not a number
                    if (parts.length == 0 || isNaN(parts[0])) return -1;

                    let unitPart = (parts.length === 1) ? units[2] : parts[1].toUpperCase();

                    // find index of unit which is in sizeStr
                    let unitIdx = -1;

                    for (i = 0; i < units.length; i++) {
                        if (units[i] === unitPart) {
                            unitIdx = i;
                            break;
                        }
                    }

                    // unitPart is not in array of units
                    if (unitIdx === -1) return -1;

                    // calculating size in bytes
                    let size = parseFloat(parts[0], 10) * Math.pow(1024, unitIdx);

                    return size;
                }

                return -1;
            },

            getPageData: function() {
                let pageData = null;
                let pageUrl = window.location.href;

                for (var p in _g.web) {
                    if (pageUrl.indexOf(_g.web[p].siteName) === 0) {
                        pageData = _g.web[p];
                        break;
                    }
                }
                return pageData;
            }
        }
    };


    var init = function() {
        try {
            console.log("Creating UI of filter.");
            _g.ui.createUI();
            console.log("UI of filter created.");
        } catch (e) {
            console.log(e);
        }
    };

    init();
})();
