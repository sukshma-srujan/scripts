// ==UserScript==
// @name         Torrent Filter
// @namespace    https://github.com/optimus29
// @version      2.4.1
// @description  Filter torrent data tables in websites
// @author       Optimus Prime
// @include      /^https?:\/\/x?1337x\...\/.*$/
// @match        https://www.torrentfunk.com/*
// @grant        none
// @website      https://github.com/optimus29
// ==/UserScript==

(function () {
  "use strict";

  const FILTER_UI_HTML = `
<div id="jk-outer-wrapper" style="z-index: 100000;">
<div id="jk-wrapper-toggle"><span>F</span></div>
<div id="jk-wrapper">
<div class="jk-option-wrapper">
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
#jk-outer-wrapper {
    display: inline-block;
    font-size: 14px;
    position: fixed;
    top: 3rem;
    right: 0px;
}
#jk-outer-wrapper,
#jk-outer-wrapper * {
    font-family: "Ubuntu", sans-serif;
}
#jk-wrapper {
    z-index: 1000;
    padding: 20px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 0 15px #666;
    display: none;
}
#jk-wrapper label {
    font-size: .75rem;
}
.jk-option-wrapper {
    margin-left: 0em;
}
.jk-option-wrapper + .jk-option-wrapper {
    padding-top: 15px;
}
#jk-input-name,
#jk-input-size {
    width: 250px;
    padding: 0;
    border: 0;
    background: transparent;
    border-bottom: 2px solid #da3a04;
    font-family: inherit;
}
#jk-wrapper input[type="checkbox"]:not(old),
#jk-wrapper input[type="radio"]:not(old) {
    width: 2em;
    margin: 0;
    padding: 0;
    font-size: 1em;
    opacity: 0;
}

#jk-wrapper input[type="checkbox"]:not(old) + label {
    display: inline-block;
    margin-left: -2.5em;
    margin-right: 0.5em;
    line-height: 1.5em;
}
#jk-wrapper input[type="radio"]:not(old) + label {
    display: inline-block;
    margin-left: -2.5em;
    margin-right: 0.5em;
    line-height: 1.5em;
}
#jk-wrapper input[type="checkbox"]:not(old) + label > span {
    display: inline-block;
    margin: 0.25em 0.5em 0.25em 0.25em;
    border: 0.09em solid #da3a04;
    border-radius: 10%;
    background: #fff;
    vertical-align: middle;
}

#jk-wrapper input[type="radio"]:not(old) + label > span {
    display: inline-block;
    margin: 0.25em 0.5em 0.25em 0.25em;
    border: 0.09em solid #da3a04;
    border-radius: 100%;
    background: #fff;
    vertical-align: middle;
}
#jk-wrapper input[type="checkbox"]:not(old):checked + label > span > span {
    display: block;
    width: 0.6em;
    height: 0.6em;
    margin: 2px;
    border-radius: 10%;
    background: #da3a04;
}
#jk-wrapper input[type="radio"]:not(old):checked + label > span > span {
    display: block;
    width: 0.6em;
    height: 0.6em;
    margin: 2px;
    border-radius: 100%;
    background: #da3a04;
}
#jk-wrapper input[type="checkbox"]:not(old) + label > span > span,
#jk-wrapper input[type="radio"]:not(old) + label > span > span {
    display: block;
    width: 0.6em;
    height: 0.6em;
    margin: 2px;
    border-radius: 100%;
    background: #fff;
}
#jk-wrapper input.button {
    -ms-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 9px 35px;
    border: 0;
    background: #da3a04;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 600;
    color: white;
    border-radius: 2px;
    cursor: pointer;
}
#jk-wrapper input.button + input.button {
    margin-left: 1em;
}
#jk-wrapper .jk-checkbox-label {
    font-size: 1em;
    line-height: 125%;
}
#jk-wrapper-toggle {
    position: absolute;
    top: 1em;
    left: -3em;
    width: 3em;
    height: 3em;
    text-align: center;
    line-height: 3em;
    display: inline-block;
    border-radius: 3px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: #fff;
    box-shadow: 0 0 10px #666;
    cursor: pointer;
    z-index: 1;
}
#jk-wrapper-toggle span {
    font-size: 1.2em;
    font-weight: bold;
}
`;

  const LOG_LEVEL_DEBUG = 10;
  const LOG_LEVEL_INFO = 20;
  const LOG_LEVEL_WARNING = 30;
  const LOG_LEVEL_ERROR = 40;

  const LOGGING_LEVEL = LOG_LEVEL_DEBUG;

  var log = {};

  const APP_NAME = "TF";

  function getArgs(logLevel, argumentArr) {
    return [new Date().toISOString(), APP_NAME, logLevel, ...argumentArr];
  }

  log.debug = function () {
    if (LOG_LEVEL_DEBUG >= LOGGING_LEVEL) {
      console.debug.apply(null, getArgs("DEBUG", arguments));
    }
  };

  log.info = function () {
    if (LOG_LEVEL_INFO >= LOGGING_LEVEL) {
      console.log.apply(null, getArgs("INFO", arguments));
    }
  };

  log.warn = function () {
    if (LOG_LEVEL_WARNING >= LOGGING_LEVEL) {
      console.warn.apply(null, getArgs("WARN", arguments));
    }
  };

  log.error = function () {
    if (LOG_LEVEL_ERROR >= LOGGING_LEVEL) {
      console.error.apply(null, getArgs("ERROR", arguments));
    }
  };

  const SIZE_UNITS = ["BYTES", "KB", "MB", "GB", "TB", "EB", "PB"];
  const SIZE_UNITS_MULTIPLIER = [
    Math.pow(1024, 0), // BYTES
    Math.pow(1024, 1), // KB
    Math.pow(1024, 2), // MB
    Math.pow(1024, 3), // GB
    Math.pow(1024, 4), // TB
    Math.pow(1024, 5), // EB
    Math.pow(1024, 6), // PB
  ];

  const TEXT_POS_AT_START = "start";
  const TEXT_POS_AT_END = "end";
  const TEXT_POS_AT_ANYWHERE = "anywhere";

  const FILE_SIZE_LESS_THAN = "lessthan";
  const FILE_SIZE_GREATER_THAN = "greaterthan";

  const SESSION_KEY = "EKtagrwzXJGFKSncJxFsgvurYIyIaAzF";

  const UI_DEFALUT_CONFIG = {
    nameFilterValue: "",
    nameFilterPos: TEXT_POS_AT_ANYWHERE,
    sizeFilterValue: "",
    sizeFilterCompare: FILE_SIZE_LESS_THAN,
    seedFilterActive: false,
    showUi: false,
  };

  const DATA_SPECS = [
    {
      siteNames: [/^https?:\/\/x?1337x.*/],
      containerSel: ".table-list",
      rowSel: "tbody > tr",
      nameColSel: ".coll-1 a:nth-of-type(2)",
      sizeColSel: ".coll-4",
      seedColSel: ".coll-2",
    },
    {
      siteNames: [/^https:\/\/www\.torrentfunk.*/],
      containerSel: ".tmain",
      rowSel: "tbody > tr + tr",
      nameColSel: "td:first-of-type > div > a",
      sizeColSel: "td:nth-of-type(3)",
      seedColSel: ".tul",
    },
  ];

  var util = {};

  util.getDataSpec = function () {
    const url = window.location.href;

    for (var dataSpec of DATA_SPECS) {
      for (let siteName of dataSpec.siteNames) {
        if (siteName.test(url)) return dataSpec;
      }
    }

    return null;
  };

  util.getBytes = function (sizeStr, unit) {
    if (!sizeStr) return 0;

    sizeStr = sizeStr.trim().toUpperCase();
    if (!unit) {
      // check if sizeStr is in two parts
      const parts = sizeStr.split(" ");
      if (parts.length > 2) return 0;
      else if (parts.length === 2) {
        sizeStr = parts[0];

        for (let i = 0; i < SIZE_UNITS.length; i++) {
          if (parts[1] === SIZE_UNITS[i]) {
            unit = i;
            break;
          }
        }
      } else {
        for (let i = 0; i < SIZE_UNITS.length; i++) {
          if (sizeStr.endsWith(SIZE_UNITS[i])) {
            unit = i;
            break;
          }
        }
      }
    }

    return parseFloat(sizeStr) * SIZE_UNITS_MULTIPLIER[unit];
  };

  var uiState = {};
  uiState.currentState = {};

  uiState.getDefaultState = function () {
    return JSON.parse(JSON.stringify(UI_DEFALUT_CONFIG));
  };

  uiState.resetState = function () {
    this.currentState = this.getDefaultState();
    this.saveState();
  };

  uiState.saveState = function () {
    const currentStateJson = JSON.stringify(this.currentState);
    localStorage.setItem(SESSION_KEY, currentStateJson);
  };

  uiState.restoreState = function () {
    const savedStateJson = localStorage.getItem(SESSION_KEY);
    if (savedStateJson) {
      this.currentState = JSON.parse(savedStateJson);
    } else {
      this.currentState = this.getDefaultState();
    }
  };

  util.getTextFromHtmlNode = function (htmlNode) {
    if (!htmlNode) return "";

    for (let child of htmlNode.childNodes) {
      if (child instanceof HTMLElement) continue;

      return child.textContent;
    }

    return "";
  };

  function RowData(rowHtml, dataSpec) {
    this.name = util
      .getTextFromHtmlNode(rowHtml.querySelector(dataSpec.nameColSel))
      .replace("⭐", "")
      .trim()
      .toUpperCase();
    this.seedCount = parseInt(rowHtml.querySelector(dataSpec.seedColSel).textContent);
    this.size = util.getBytes(util.getTextFromHtmlNode(rowHtml.querySelector(dataSpec.sizeColSel)));
    this.html = rowHtml;
  }

  var ui = {
    nameInput: null,
    sizeInput: null,
    exclueZeroCb: null,
    buttonApply: null,
    buttonReset: null,
    buttonToggleUi: null,
    tableData: null,
  };

  ui.setupButtons = function () {
    this.buttonToggleUi.addEventListener("click", function () {
      uiState.currentState.showUi = !uiState.currentState.showUi;
      ui.showHideUi();
      uiState.saveState();
    });

    this.buttonApply.addEventListener("click", function () {
      ui.applyFilters();
    });

    this.buttonReset.addEventListener("click", function () {
      ui.resetFilters();
    });
  };

  ui.showHideUi = function () {
    var display = uiState.currentState.showUi ? "block" : "none";
    document.querySelector("#jk-wrapper").style.display = display;
  };

  ui.createUi = function () {
    let head = document.getElementsByTagName("head")[0];
    let body = document.getElementsByTagName("body")[0];

    let uiStyle = document.createElement("style");
    uiStyle.innerHTML = FILTER_UI_STYLE;
    head.appendChild(uiStyle);

    var htmlWrapper = document.createElement("div");
    htmlWrapper.innerHTML = FILTER_UI_HTML;
    body.appendChild(htmlWrapper);
  };

  ui.setupInputs = function () {
    function enterKeyHandler(event) {
      if (event.keyCode === 13) ui.applyFilters();
    }

    this.nameInput.addEventListener("keyup", enterKeyHandler);
    this.sizeInput.addEventListener("keyup", enterKeyHandler);

    log.debug("Input setup complete.");
  };

  ui.onFilterCanNotBeUsed = function () {
    this.buttonToggleUi.style.background = "#fa9";
    this.buttonToggleUi.style.cursor = "not-allowed";
  };

  ui.init = function () {
    uiState.restoreState();
    ui.createUi();

    // get HTML widgets
    this.nameInput = document.getElementById("jk-input-name");
    this.sizeInput = document.getElementById("jk-input-size");
    this.buttonApply = document.getElementById("button-apply");
    this.buttonReset = document.getElementById("button-remove");
    this.exclueZeroCb = document.getElementById("jk-checkbox-seed");
    this.buttonToggleUi = document.getElementById("jk-wrapper-toggle");

    // get HTML data
    const dataSpec = util.getDataSpec();
    if (!dataSpec) {
      log.warn("No data spec found for this page.");
      ui.onFilterCanNotBeUsed();
      return;
    }

    ui.tableData = [];
    const containers = document.querySelectorAll(dataSpec.containerSel);

    for (let container of containers) {
      const contents = container.querySelectorAll(dataSpec.rowSel);
      const rowDataArr = [];

      for (let htmlData of contents) {
        const rowData = new RowData(htmlData, dataSpec);
        rowDataArr.push(rowData);
      }

      ui.tableData.push(rowDataArr);
    }

    if (ui.tableData.length === 0) {
      ui.onFilterCanNotBeUsed();
      return;
    }

    ui.setupButtons();
    ui.setupInputs();
    ui.applyStateToUi();
    ui.applyFilters();
    ui.showHideUi();
  };

  ui.getNameValue = function () {
    return this.nameInput.value;
  };

  ui.setNameValue = function (val) {
    this.nameInput.value = val;
  };

  ui.getNamePosValue = function () {
    return document.querySelector("input[name=jkNamePos47]:checked").value;
  };

  ui.setNamePosValue = function (val) {
    document.querySelector("input[name=jkNamePos47][value=" + val + "]").checked = true;
  };

  ui.getSizeValue = function () {
    return this.sizeInput.value;
  };

  ui.setSizeValue = function (val) {
    this.sizeInput.value = val;
  };

  ui.getSizeCmpValue = function () {
    return document.querySelector("input[name=jkSizeCmp47]:checked").value;
  };

  ui.setSizeCmpValue = function (val) {
    document.querySelector("input[name=jkSizeCmp47][value=" + val + "]").checked = true;
  };

  ui.getExcludeZeroSeed = function () {
    return this.exclueZeroCb.checked;
  };

  ui.setExcludeZeroSeed = function (val) {
    this.exclueZeroCb.checked = val;
  };

  ui.applyFilters = function () {
    ui.beforeApplyFilters();
    let rowCount = 0;
    let totalRowCount = 0;

    for (let rowDataArr of ui.tableData) {
      totalRowCount += rowDataArr.length;
      for (let rowData of rowDataArr) {
        if (ui.canShowRow(rowData)) {
          rowData.html.style.display = "";
          rowCount++;
        } else {
          rowData.html.style.display = "none";
        }
      }
    }

    ui.afterApplyFilters();

    log.info("Filters applied successfully. Showing " + rowCount + " of " + totalRowCount);
  };

  ui.beforeApplyFilters = function () {
    ui.populateStateFromUi();
    uiState.saveState();

    this.sizeThreshold = util.getBytes(uiState.currentState.sizeFilterValue);
    log.debug("Size threshold", this.sizeThreshold);
  };

  ui.afterApplyFilters = function () {};

  ui.sizeThreshold = 0;
  ui.canShowRow = function (rowData) {
    if (rowData.seedCount === 0 && uiState.currentState.seedFilterActive) return false;

    if (uiState.currentState.sizeFilterValue) {
      const dataSize = rowData.size;

      if (
        uiState.currentState.sizeFilterCompare === FILE_SIZE_GREATER_THAN &&
        dataSize <= this.sizeThreshold
      ) {
        return false;
      }

      if (
        uiState.currentState.sizeFilterCompare === FILE_SIZE_LESS_THAN &&
        dataSize >= this.sizeThreshold
      ) {
        return false;
      }
    }

    if (uiState.currentState.nameFilterValue) {
      const str = uiState.currentState.nameFilterValue.toUpperCase();
      const name = rowData.name;

      switch (uiState.currentState.nameFilterPos) {
        case TEXT_POS_AT_START:
          if (!name.startsWith(str)) return false;
          break;
        case TEXT_POS_AT_END:
          if (!name.endsWith(str)) return false;
          break;
        default:
          if (name.indexOf(str) === -1) return false;
      }
    }

    return true;
  };

  ui.resetFilters = function () {
    uiState.resetState();
      // resetState makes the variable showUi falsy
      // however, state is reset while UI is still visible
      // this causes a discrepency in the filter UI visible
      // state in the data and actual visibility of the UI.
    uiState.currentState.showUi = true;
    ui.applyStateToUi();
    ui.applyFilters();

    log.info("Filters resetted successfully.");
  };

  ui.populateStateFromUi = function () {
    uiState.currentState.nameFilterValue = ui.getNameValue();
    uiState.currentState.nameFilterPos = ui.getNamePosValue();
    uiState.currentState.sizeFilterValue = ui.getSizeValue();
    uiState.currentState.sizeFilterCompare = ui.getSizeCmpValue();
    uiState.currentState.seedFilterActive = ui.getExcludeZeroSeed();

    log.info("Populated state from UI.");
    log.debug("State: ", uiState.currentState);
  };

  ui.applyStateToUi = function () {
    ui.setNameValue(uiState.currentState.nameFilterValue);
    ui.setNamePosValue(uiState.currentState.nameFilterPos);
    ui.setSizeValue(uiState.currentState.sizeFilterValue);
    ui.setSizeCmpValue(uiState.currentState.sizeFilterCompare);
    ui.setExcludeZeroSeed(uiState.currentState.seedFilterActive);
  };

  ui.init();
})();
