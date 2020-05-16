(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/ngx-object-diff/fesm2015/ngx-object-diff.js":
/*!**********************************************************************************************!*\
  !*** /Users/saurabh/Documents/ng-workspace/dist/ngx-object-diff/fesm2015/ngx-object-diff.js ***!
  \**********************************************************************************************/
/*! exports provided: NgxObjectDiffComponent, NgxObjectDiffModule, NgxObjectDiffService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxObjectDiffComponent", function() { return NgxObjectDiffComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxObjectDiffModule", function() { return NgxObjectDiffModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxObjectDiffService", function() { return NgxObjectDiffService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-object-diff.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxObjectDiffService {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.openChar = '{';
        this.closeChar = '}';
    }
    /* service methods */
    /**
     * @param {?} char
     * @return {?}
     */
    setOpenChar(char) {
        this.openChar = char;
    }
    /**
     * @param {?} char
     * @return {?}
     */
    setCloseChar(char) {
        this.closeChar = char;
    }
    /**
     * diff between object a and b
     * @param {?} a
     * @param {?} b
     * @param {?=} shallow
     * @param {?=} isOwn
     * @return {?}
     */
    diff(a, b, shallow, isOwn) {
        if (a === b) {
            return this.equalObj(a);
        }
        /** @type {?} */
        let diffValue = {};
        /** @type {?} */
        let equal = true;
        for (let key in a) {
            if ((!isOwn && key in b) || (isOwn && typeof b != 'undefined' && b.hasOwnProperty(key))) {
                if (a[key] === b[key]) {
                    diffValue[key] = this.equalObj(a[key]);
                }
                else {
                    if (!shallow && this.isValidAttr(a[key], b[key])) {
                        /** @type {?} */
                        let valueDiff = this.diff(a[key], b[key], shallow, isOwn);
                        if (valueDiff.changed == 'equal') {
                            diffValue[key] = this.equalObj(a[key]);
                        }
                        else {
                            equal = false;
                            diffValue[key] = valueDiff;
                        }
                    }
                    else {
                        equal = false;
                        diffValue[key] = {
                            changed: 'primitive change',
                            removed: a[key],
                            added: b[key]
                        };
                    }
                }
            }
            else {
                equal = false;
                diffValue[key] = {
                    changed: 'removed',
                    value: a[key]
                };
            }
        }
        for (let key in b) {
            if ((!isOwn && !(key in a)) || (isOwn && typeof a != 'undefined' && !a.hasOwnProperty(key))) {
                equal = false;
                diffValue[key] = {
                    changed: 'added',
                    value: b[key]
                };
            }
        }
        if (equal) {
            return this.equalObj(a);
        }
        else {
            return {
                changed: 'object change',
                value: diffValue
            };
        }
    }
    /**
     * compare and build the difference of two objects taking only its own properties into account
     * @param {?} a
     * @param {?} b
     * @param {?=} shallow
     * @return {?}
     */
    diffOwnProperties(a, b, shallow) {
        return this.diff(a, b, shallow, true);
    }
    /**
     * Convert to a readable xml/html Json structure
     * @param {?} changes
     * @param {?=} shallow
     * @return {?}
     */
    toJsonView(changes, shallow) {
        return this.formatToJsonXMLString(changes, shallow);
    }
    /**
     * Convert to a readable xml/html Json structure
     * @param {?} object
     * @param {?=} shallow
     * @return {?}
     */
    objToJsonView(object, shallow) {
        return this.formatObjToJsonXMLString(object, shallow);
    }
    /**
     * Convert to a readable xml/html Json structure
     * @param {?} changes
     * @param {?=} shallow
     * @return {?}
     */
    toJsonDiffView(changes, shallow) {
        return this.formatChangesToXMLString(changes, shallow);
    }
    /**
     * Convert to a readable xml/html Json structure
     * Convert to a readable xml/html Json structure
     * @private
     * @param {?} obj
     * @param {?} shallow
     * @return {?}
     */
    formatObjToJsonXMLString(obj, shallow) {
        return this.sanitizer.bypassSecurityTrustHtml(this.inspect(obj, shallow));
    }
    /**
     * Convert to a readable xml/html Json structure
     * @private
     * @param {?} changes
     * @param {?=} shallow
     * @return {?}
     */
    formatToJsonXMLString(changes, shallow) {
        /** @type {?} */
        let properties = [];
        /** @type {?} */
        let diff = changes.value;
        if (changes.changed == 'equal') {
            return this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.sanitizer.bypassSecurityTrustHtml(this.inspect(diff, shallow)));
        }
        for (let key in diff) {
            properties.push(this.formatChange(key, diff[key], shallow));
        }
        return this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.sanitizer.bypassSecurityTrustHtml('<span>' + this.openChar + '</span>\n<div class="diff-level">' + properties.join('<span>,</span>\n') + '\n</div><span>' + this.closeChar + '</span>'));
    }
    /**
     * @private
     * @param {?} changes
     * @param {?=} shallow
     * @return {?}
     */
    formatChangesToXMLString(changes, shallow) {
        /** @type {?} */
        var properties = [];
        if (changes.changed == 'equal') {
            return '';
        }
        /** @type {?} */
        var diff = changes.value;
        for (var key in diff) {
            /** @type {?} */
            var changed = diff[key].changed;
            if (changed !== 'equal')
                properties.push(this.formatChange(key, diff[key], shallow, true));
        }
        return this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.sanitizer.bypassSecurityTrustHtml('<span>' + this.openChar + '</span>\n<div class="diff-level">' + properties.join('<span>,</span>\n') + '\n</div><span>' + this.closeChar + '</span>'));
    }
    /**
     * @private
     * @param {?} key
     * @param {?} diffItem
     * @param {?} shallow
     * @param {?=} diffOnly
     * @return {?}
     */
    formatChange(key, diffItem, shallow, diffOnly) {
        /** @type {?} */
        var changed = diffItem.changed;
        /** @type {?} */
        var property;
        switch (changed) {
            case 'equal':
                property = (this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>' + this.inspect(diffItem.value));
                break;
            case 'removed':
                property = ('<del class="diff">' + this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>' + this.inspect(diffItem.value) + '</del>');
                break;
            case 'added':
                property = ('<ins class="diff">' + this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>' + this.inspect(diffItem.value) + '</ins>');
                break;
            case 'primitive change':
                /** @type {?} */
                var prefix = this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>';
                property = ('<del class="diff diff-key">' + prefix + this.inspect(diffItem.removed) + '</del><span>,</span>\n' +
                    '<ins class="diff diff-key">' + prefix + this.inspect(diffItem.added) + '</ins>');
                break;
            case 'object change':
                property = shallow ? '' : (this.stringifyObjectKey(key) + '<span>: </span>' + (diffOnly ? this.formatChangesToXMLString(diffItem) : this.formatToJsonXMLString(diffItem)));
                break;
        }
        return property;
    }
    /**
     * @private
     * @param {?} obj
     * @param {?=} shallow
     * @return {?}
     */
    inspect(obj, shallow) {
        return this._inspect('', obj, shallow);
    }
    /**
     * @see http://jsperf.com/continuation-passing-style/3
     * @private
     * @param {?} accumulator
     * @param {?} obj
     * @param {?=} shallow
     * @return {?}
     */
    _inspect(accumulator, obj, shallow) {
        switch (typeof obj) {
            case 'object':
                if (!obj) {
                    accumulator += 'null';
                    break;
                }
                if (shallow) {
                    accumulator += '[object]';
                    break;
                }
                /** @type {?} */
                let keys = Object.keys(obj);
                /** @type {?} */
                let length = keys.length;
                if (length === 0) {
                    accumulator += '<span>' + this.openChar + this.closeChar + '</span>';
                }
                else {
                    accumulator += '<span>' + this.openChar + '</span>\n<div class="diff-level">';
                    for (let i = 0; i < length; i++) {
                        /** @type {?} */
                        let key = keys[i];
                        accumulator = this._inspect(accumulator + this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>', obj[key]);
                        if (i < length - 1) {
                            accumulator += '<span>,</span>\n';
                        }
                    }
                    accumulator += '\n</div><span>' + this.closeChar + '</span>';
                }
                break;
            case 'string':
                accumulator += JSON.stringify(this.escapeHTML(obj));
                break;
            case 'undefined':
                accumulator += 'undefined';
                break;
            default:
                accumulator += this.escapeHTML(String(obj));
                break;
        }
        return accumulator;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    stringifyObjectKey(key) {
        return /^[a-z0-9_$]*$/i.test(key) ?
            key :
            JSON.stringify(key);
    }
    /**
     * @private
     * @param {?} string
     * @return {?}
     */
    escapeHTML(string) {
        return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    equalObj(obj) {
        return {
            changed: 'equal',
            value: obj
        };
    }
    /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    isValidAttr(a, b) {
        /** @type {?} */
        let typeA = typeof a;
        /** @type {?} */
        let typeB = typeof b;
        return (a && b && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function'));
    }
}
NgxObjectDiffService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxObjectDiffService.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"] }
];
/** @nocollapse */ NgxObjectDiffService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function NgxObjectDiffService_Factory() { return new NgxObjectDiffService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"])); }, token: NgxObjectDiffService, providedIn: "root" });
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-object-diff.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxObjectDiffComponent {
}
NgxObjectDiffComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'ngx-object-diff',
                template: `
    <pre [innerHTML]="obj"></pre>
  `,
                styles: [`
    pre{
      display: block;
      padding: 9.5px;
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.428571429;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    :host >>> .diff {
        display: inline-block;
    }
    :host >>> .diff-level {
        margin-left: 1.6em;
    }
    :host >>> .diff-holder {
        color: #666;
        margin: 0;
    }
    :host >>> .diff-holder span {
        color: #AAA;
    }
    :host >>> del.diff {
        text-decoration: none;
        color: #b30000;
        background: #fadad7;
    }
    :host >>> ins.diff {
        background: #eaf2c2;
        color: #406619;
        text-decoration: none;
    }
    :host >>> del.diff-key {
        border: 1px solid #f8a4a4;
    }
    :host >>> ins.diff-key {
        border: 1px solid #a3ce4c;
        margin-top: -1px;
        position: relative;
    }
    :host >>> ins.diff span {
        color: #AABF40;
    }
    :host >>> del.diff span {
        color: #EE8177;
    }
  `]
            }] }
];
NgxObjectDiffComponent.propDecorators = {
    obj: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
};
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-object-diff.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxObjectDiffModule {
}
NgxObjectDiffModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [NgxObjectDiffComponent],
                imports: [],
                providers: [NgxObjectDiffService],
                exports: [NgxObjectDiffComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-object-diff.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-object-diff.js.map


/***/ }),

/***/ "../../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************************************************!*\
  !*** /Users/saurabh/Documents/ng-workspace/node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<style>\n  :host {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin: 8px 0;\n  }\n\n  p {\n    margin: 0;\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .toolbar {\n    height: 60px;\n    margin: -8px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar img {\n    margin: 0 16px;\n  }\n\n  .toolbar #twitter-logo {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar #twitter-logo:hover {\n    opacity: 0.8;\n  }\n\n  .content {\n    display: flex;\n    margin: 16px auto;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card svg.material-icons path {\n    fill: #888;\n  }\n\n  .card-container {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card {\n    margin: 0 8px 16px;\n    padding: 10px;\n    min-width: 20vw;\n    min-height: 300px;\n    transition: all 0.2s ease-in-out;\n  }\n\n  .card-container .card:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card-container .card:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container .card:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(black, 0.35);\n  }\n\n  .card-container .card:not(.highlight-card):hover .material-icons path {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card {\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n  }\n\n  .card.card.highlight-card span {\n    margin-left: 60px;\n  }\n\n\n  a,\n  a:visited,\n  a:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a:hover {\n    color: #125699;\n  }\n\n  .terminal {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal::before {\n    content: \"\\2022 \\2022 \\2022\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal pre {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer a {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;\n  }\n\n  .github-star-badge:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge .material-icons {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n\n  /* Responsive Styles */\n  @media screen and (max-width: 767px) {\n\n    .card-container > *:not(.circle-link) ,\n    .terminal {\n      width: 100%;\n    }\n\n    .card:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card span {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke {\n      display: none;\n      visibility: hidden;\n    }\n  }\n</style>\n\n<!-- Toolbar -->\n<div class=\"toolbar\" role=\"banner\">\n  <img\n    width=\"40\"\n    alt=\"Angular Logo\"\n    src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\"\n  />\n  <span>Ngx Object Diff</span>\n    <div class=\"spacer\"></div>\n  <a aria-label=\"Angular on twitter\" target=\"_blank\" rel=\"noopener\" href=\"https://twitter.com/saurabh9049\" title=\"Twitter\">\n\n    <svg id=\"twitter-logo\" height=\"24\" data-name=\"Logo — FIXED\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 400\">\n      <defs>\n        <style>\n          .cls-1 {\n            fill: none;\n          }\n\n          .cls-2 {\n            fill: #ffffff;\n          }\n        </style>\n      </defs>\n      <rect class=\"cls-1\" width=\"400\" height=\"400\" />\n      <path class=\"cls-2\" d=\"M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23\"\n      />\n    </svg>\n\n  </a>\n</div>\n\n<div class=\"content\" role=\"main\">\n  <div class=\"card-container\">\n    <div class=\"card\">\n      <h3>Object 1</h3><br>\n      <ngx-object-diff  [obj]=\"object1View\"></ngx-object-diff>\n    </div>\n    <div class=\"card\">\n      <h3>Object 2</h3><br>\n      <ngx-object-diff [obj]=\"object2View\"></ngx-object-diff>\n    </div>\n    <div class=\"card\">\n      <h3>Full Diff</h3><br>\n      <ngx-object-diff [obj]=\"diffView\"></ngx-object-diff>\n    </div>\n\n    <!--  <pre *ngIf=\"object1View\" [innerHTML]=\"object1View\" ></pre>-->\n    <!--  <pre *ngIf=\"object2View\" [innerHTML]=\"object1View\" ></pre>-->\n    <!--  <pre *ngIf=\"diffView\" [innerHTML]=\"diffView\" ></pre>-->\n  </div>\n\n\n\n\n  <!-- Footer -->\n  <footer>\n      Love Ngx-object-diff?&nbsp;\n      <a href=\"https://github.com/saurabh47/ngx-object-diff\" target=\"_blank\" rel=\"noopener\"> Give our repo a star.\n        <div class=\"github-star-badge\">\n            <svg class=\"material-icons\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>\n          Star\n        </div>\n      </a>\n      <a href=\"https://github.com/saurabh47/ngx-object-diff\" target=\"_blank\" rel=\"noopener\">\n        <svg class=\"material-icons\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\" fill=\"#1976d2\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>\n      </a>\n  </footer>\n\n  <svg id=\"clouds\" alt=\"Gray Clouds Background\" xmlns=\"http://www.w3.org/2000/svg\" width=\"2611.084\" height=\"485.677\" viewBox=\"0 0 2611.084 485.677\">\n    <path id=\"Path_39\" data-name=\"Path 39\" d=\"M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z\" transform=\"translate(142.69 -634.312)\" fill=\"#eee\"/>\n  </svg>\n\n</div>\n\n\n\n");

/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.js":
/*!*****************************************************************************!*\
  !*** /Users/saurabh/Documents/ng-workspace/node_modules/tslib/tslib.es6.js ***!
  \*****************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../ngx-object-diff/src/lib/ngx-object-diff.component.ts":
/*!***************************************************************!*\
  !*** ../ngx-object-diff/src/lib/ngx-object-diff.component.ts ***!
  \***************************************************************/
/*! exports provided: NgxObjectDiffComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxObjectDiffComponent", function() { return NgxObjectDiffComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");


let NgxObjectDiffComponent = class NgxObjectDiffComponent {
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], NgxObjectDiffComponent.prototype, "obj", void 0);
NgxObjectDiffComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'ngx-object-diff',
        template: `
    <pre [innerHTML]="obj"></pre>
  `,
        styles: ["\n    pre{\n      display: block;\n      padding: 9.5px;\n      margin: 0 0 10px;\n      font-size: 13px;\n      line-height: 1.428571429;\n      color: #333;\n      word-break: break-all;\n      word-wrap: break-word;\n      background-color: #f5f5f5;\n      border: 1px solid #ccc;\n      border-radius: 4px;\n    }\n    :host >>> .diff {\n        display: inline-block;\n    }\n    :host >>> .diff-level {\n        margin-left: 1.6em;\n    }\n    :host >>> .diff-holder {\n        color: #666;\n        margin: 0;\n    }\n    :host >>> .diff-holder span {\n        color: #AAA;\n    }\n    :host >>> del.diff {\n        text-decoration: none;\n        color: #b30000;\n        background: #fadad7;\n    }\n    :host >>> ins.diff {\n        background: #eaf2c2;\n        color: #406619;\n        text-decoration: none;\n    }\n    :host >>> del.diff-key {\n        border: 1px solid #f8a4a4;\n    }\n    :host >>> ins.diff-key {\n        border: 1px solid #a3ce4c;\n        margin-top: -1px;\n        position: relative;\n    }\n    :host >>> ins.diff span {\n        color: #AABF40;\n    }\n    :host >>> del.diff span {\n        color: #EE8177;\n    }\n  "]
    })
], NgxObjectDiffComponent);



/***/ }),

/***/ "../ngx-object-diff/src/lib/ngx-object-diff.module.ts":
/*!************************************************************!*\
  !*** ../ngx-object-diff/src/lib/ngx-object-diff.module.ts ***!
  \************************************************************/
/*! exports provided: NgxObjectDiffModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxObjectDiffModule", function() { return NgxObjectDiffModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ngx_object_diff_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngx-object-diff.component */ "../ngx-object-diff/src/lib/ngx-object-diff.component.ts");
/* harmony import */ var _ngx_object_diff_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ngx-object-diff.service */ "../ngx-object-diff/src/lib/ngx-object-diff.service.ts");




let NgxObjectDiffModule = class NgxObjectDiffModule {
};
NgxObjectDiffModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_ngx_object_diff_component__WEBPACK_IMPORTED_MODULE_2__["NgxObjectDiffComponent"]],
        imports: [],
        providers: [_ngx_object_diff_service__WEBPACK_IMPORTED_MODULE_3__["NgxObjectDiffService"]],
        exports: [_ngx_object_diff_component__WEBPACK_IMPORTED_MODULE_2__["NgxObjectDiffComponent"]]
    })
], NgxObjectDiffModule);



/***/ }),

/***/ "../ngx-object-diff/src/lib/ngx-object-diff.service.ts":
/*!*************************************************************!*\
  !*** ../ngx-object-diff/src/lib/ngx-object-diff.service.ts ***!
  \*************************************************************/
/*! exports provided: NgxObjectDiffService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxObjectDiffService", function() { return NgxObjectDiffService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let NgxObjectDiffService = class NgxObjectDiffService {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.openChar = '{';
        this.closeChar = '}';
    }
    /* service methods */
    /**
     * @param char
     */
    setOpenChar(char) {
        this.openChar = char;
    }
    /**
     * @param char
     */
    setCloseChar(char) {
        this.closeChar = char;
    }
    /**
     * diff between object a and b
     * @param a
     * @param b
     * @param shallow
     * @param isOwn
     * @return
     */
    diff(a, b, shallow, isOwn) {
        if (a === b) {
            return this.equalObj(a);
        }
        let diffValue = {};
        let equal = true;
        for (let key in a) {
            if ((!isOwn && key in b) || (isOwn && typeof b != 'undefined' && b.hasOwnProperty(key))) {
                if (a[key] === b[key]) {
                    diffValue[key] = this.equalObj(a[key]);
                }
                else {
                    if (!shallow && this.isValidAttr(a[key], b[key])) {
                        let valueDiff = this.diff(a[key], b[key], shallow, isOwn);
                        if (valueDiff.changed == 'equal') {
                            diffValue[key] = this.equalObj(a[key]);
                        }
                        else {
                            equal = false;
                            diffValue[key] = valueDiff;
                        }
                    }
                    else {
                        equal = false;
                        diffValue[key] = {
                            changed: 'primitive change',
                            removed: a[key],
                            added: b[key]
                        };
                    }
                }
            }
            else {
                equal = false;
                diffValue[key] = {
                    changed: 'removed',
                    value: a[key]
                };
            }
        }
        for (let key in b) {
            if ((!isOwn && !(key in a)) || (isOwn && typeof a != 'undefined' && !a.hasOwnProperty(key))) {
                equal = false;
                diffValue[key] = {
                    changed: 'added',
                    value: b[key]
                };
            }
        }
        if (equal) {
            return this.equalObj(a);
        }
        else {
            return {
                changed: 'object change',
                value: diffValue
            };
        }
    }
    /**
     * compare and build the difference of two objects taking only its own properties into account
     * @param a
     * @param b
     * @param shallow
     */
    diffOwnProperties(a, b, shallow) {
        return this.diff(a, b, shallow, true);
    }
    /**
     * Convert to a readable xml/html Json structure
     * @param changes
     * @return
     * @param shallow
     */
    toJsonView(changes, shallow) {
        return this.formatToJsonXMLString(changes, shallow);
    }
    /**
     * Convert to a readable xml/html Json structure
     * @return
     * @param obj
     * @param shallow
     */
    objToJsonView(object, shallow) {
        return this.formatObjToJsonXMLString(object, shallow);
    }
    /**
     * Convert to a readable xml/html Json structure
     * @param changes
     * @return
     * @param shallow
     */
    toJsonDiffView(changes, shallow) {
        return this.formatChangesToXMLString(changes, shallow);
    }
    /**
     * Convert to a readable xml/html Json structure
     * Convert to a readable xml/html Json structure
     * @return
     * @param obj
     * @param shallow
     */
    formatObjToJsonXMLString(obj, shallow) {
        return this.sanitizer.bypassSecurityTrustHtml(this.inspect(obj, shallow));
    }
    /**
     * Convert to a readable xml/html Json structure
     * @param changes
     * @return
     * @param shallow
     */
    formatToJsonXMLString(changes, shallow) {
        let properties = [];
        let diff = changes.value;
        if (changes.changed == 'equal') {
            return this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SecurityContext"].HTML, this.sanitizer.bypassSecurityTrustHtml(this.inspect(diff, shallow)));
        }
        for (let key in diff) {
            properties.push(this.formatChange(key, diff[key], shallow));
        }
        return this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SecurityContext"].HTML, this.sanitizer.bypassSecurityTrustHtml('<span>' + this.openChar + '</span>\n<div class="diff-level">' + properties.join('<span>,</span>\n') + '\n</div><span>' + this.closeChar + '</span>'));
    }
    formatChangesToXMLString(changes, shallow) {
        var properties = [];
        if (changes.changed == 'equal') {
            return '';
        }
        var diff = changes.value;
        for (var key in diff) {
            var changed = diff[key].changed;
            if (changed !== 'equal')
                properties.push(this.formatChange(key, diff[key], shallow, true));
        }
        return this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SecurityContext"].HTML, this.sanitizer.bypassSecurityTrustHtml('<span>' + this.openChar + '</span>\n<div class="diff-level">' + properties.join('<span>,</span>\n') + '\n</div><span>' + this.closeChar + '</span>'));
    }
    /**
     * @param key
     * @param diffItem
     * @returns
     * @param shallow
     * @param diffOnly
     */
    formatChange(key, diffItem, shallow, diffOnly) {
        var changed = diffItem.changed;
        var property;
        switch (changed) {
            case 'equal':
                property = (this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>' + this.inspect(diffItem.value));
                break;
            case 'removed':
                property = ('<del class="diff">' + this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>' + this.inspect(diffItem.value) + '</del>');
                break;
            case 'added':
                property = ('<ins class="diff">' + this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>' + this.inspect(diffItem.value) + '</ins>');
                break;
            case 'primitive change':
                var prefix = this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>';
                property = ('<del class="diff diff-key">' + prefix + this.inspect(diffItem.removed) + '</del><span>,</span>\n' +
                    '<ins class="diff diff-key">' + prefix + this.inspect(diffItem.added) + '</ins>');
                break;
            case 'object change':
                property = shallow ? '' : (this.stringifyObjectKey(key) + '<span>: </span>' + (diffOnly ? this.formatChangesToXMLString(diffItem) : this.formatToJsonXMLString(diffItem)));
                break;
        }
        return property;
    }
    /**
     * @param obj
     * @return
     * @param shallow
     */
    inspect(obj, shallow) {
        return this._inspect('', obj, shallow);
    }
    /**
     * @param accumulator
     * @param obj
     * @see http://jsperf.com/continuation-passing-style/3
     * @return
     * @param shallow
     */
    _inspect(accumulator, obj, shallow) {
        switch (typeof obj) {
            case 'object':
                if (!obj) {
                    accumulator += 'null';
                    break;
                }
                if (shallow) {
                    accumulator += '[object]';
                    break;
                }
                let keys = Object.keys(obj);
                let length = keys.length;
                if (length === 0) {
                    accumulator += '<span>' + this.openChar + this.closeChar + '</span>';
                }
                else {
                    accumulator += '<span>' + this.openChar + '</span>\n<div class="diff-level">';
                    for (let i = 0; i < length; i++) {
                        let key = keys[i];
                        accumulator = this._inspect(accumulator + this.stringifyObjectKey(this.escapeHTML(key)) + '<span>: </span>', obj[key]);
                        if (i < length - 1) {
                            accumulator += '<span>,</span>\n';
                        }
                    }
                    accumulator += '\n</div><span>' + this.closeChar + '</span>';
                }
                break;
            case 'string':
                accumulator += JSON.stringify(this.escapeHTML(obj));
                break;
            case 'undefined':
                accumulator += 'undefined';
                break;
            default:
                accumulator += this.escapeHTML(String(obj));
                break;
        }
        return accumulator;
    }
    /**
     * @param key
     * @return
     */
    stringifyObjectKey(key) {
        return /^[a-z0-9_$]*$/i.test(key) ?
            key :
            JSON.stringify(key);
    }
    /**
     * @param string
     * @return
     */
    escapeHTML(string) {
        return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    /**
     * @param obj
     * @returns
     */
    equalObj(obj) {
        return {
            changed: 'equal',
            value: obj
        };
    }
    /**
     * @param a
     * @param b
     * @returns
     */
    isValidAttr(a, b) {
        let typeA = typeof a;
        let typeB = typeof b;
        return (a && b && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function'));
    }
};
NgxObjectDiffService.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
];
NgxObjectDiffService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], NgxObjectDiffService);



/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9uZ3gtb2JqZWN0LWRpZmYtc2hvd2Nhc2Uvc3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_object_diff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-object-diff */ "../../dist/ngx-object-diff/fesm2015/ngx-object-diff.js");



let AppComponent = class AppComponent {
    constructor(objectDiff) {
        this.objectDiff = objectDiff;
        this.title = 'ngx-object-diff-showcase';
        this.object1 = {
            a: {
                b: 1,
                c: [1, 2]
            },
            "2b": {
                foo: 'bar'
            }
        };
        this.object2 = {
            a: {
                b: 2,
                c: [1, 2, 3]
            },
            x: 1
        };
    }
    ngOnInit() {
        this.object1View = this.objectDiff.objToJsonView(this.object1);
        this.object2View = this.objectDiff.objToJsonView(this.object2);
        let diff = this.objectDiff.diff(this.object1, this.object2);
        this.diffView = this.objectDiff.toJsonView(diff);
    }
};
AppComponent.ctorParameters = () => [
    { type: ngx_object_diff__WEBPACK_IMPORTED_MODULE_2__["NgxObjectDiffService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ngx_object_diff_src_lib_ngx_object_diff_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ngx-object-diff/src/lib/ngx-object-diff.module */ "../ngx-object-diff/src/lib/ngx-object-diff.module.ts");





let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _ngx_object_diff_src_lib_ngx_object_diff_module__WEBPACK_IMPORTED_MODULE_4__["NgxObjectDiffModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/saurabh/Documents/ng-workspace/projects/ngx-object-diff-showcase/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map