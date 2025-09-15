"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/country-flag-icons";
exports.ids = ["vendor-chunks/country-flag-icons"];
exports.modules = {

/***/ "(ssr)/./node_modules/country-flag-icons/modules/unicode.js":
/*!************************************************************!*\
  !*** ./node_modules/country-flag-icons/modules/unicode.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getCountryFlag)\n/* harmony export */ });\n/**\r\n * Creates Unicode flag from a two-letter ISO country code.\r\n * https://stackoverflow.com/questions/24050671/how-to-put-japan-flag-character-in-a-string\r\n * @param  {string} country — A two-letter ISO country code (case-insensitive).\r\n * @return {string}\r\n */\nfunction getCountryFlag(country) {\n  return getRegionalIndicatorSymbol(country[0]) + getRegionalIndicatorSymbol(country[1]);\n}\n/**\r\n * Converts a letter to a Regional Indicator Symbol.\r\n * @param  {string} letter\r\n * @return {string}\r\n */\n\nfunction getRegionalIndicatorSymbol(letter) {\n  return String.fromCodePoint(0x1F1E6 - 65 + letter.toUpperCase().charCodeAt(0));\n}\n//# sourceMappingURL=unicode.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY291bnRyeS1mbGFnLWljb25zL21vZHVsZXMvdW5pY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVk7QUFDWjtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvemV5bmVwYmFzL0RvY3VtZW50cy9HaXRIdWIvSGl6bWV0S2FwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy9jb3VudHJ5LWZsYWctaWNvbnMvbW9kdWxlcy91bmljb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVzIFVuaWNvZGUgZmxhZyBmcm9tIGEgdHdvLWxldHRlciBJU08gY291bnRyeSBjb2RlLlxyXG4gKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDA1MDY3MS9ob3ctdG8tcHV0LWphcGFuLWZsYWctY2hhcmFjdGVyLWluLWEtc3RyaW5nXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gY291bnRyeSDigJQgQSB0d28tbGV0dGVyIElTTyBjb3VudHJ5IGNvZGUgKGNhc2UtaW5zZW5zaXRpdmUpLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q291bnRyeUZsYWcoY291bnRyeSkge1xuICByZXR1cm4gZ2V0UmVnaW9uYWxJbmRpY2F0b3JTeW1ib2woY291bnRyeVswXSkgKyBnZXRSZWdpb25hbEluZGljYXRvclN5bWJvbChjb3VudHJ5WzFdKTtcbn1cbi8qKlxyXG4gKiBDb252ZXJ0cyBhIGxldHRlciB0byBhIFJlZ2lvbmFsIEluZGljYXRvciBTeW1ib2wuXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gbGV0dGVyXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXG5cbmZ1bmN0aW9uIGdldFJlZ2lvbmFsSW5kaWNhdG9yU3ltYm9sKGxldHRlcikge1xuICByZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQoMHgxRjFFNiAtIDY1ICsgbGV0dGVyLnRvVXBwZXJDYXNlKCkuY2hhckNvZGVBdCgwKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmljb2RlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/country-flag-icons/modules/unicode.js\n");

/***/ })

};
;