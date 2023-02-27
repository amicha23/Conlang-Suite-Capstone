"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/createSetup";
exports.ids = ["pages/api/createSetup"];
exports.modules = {

/***/ "(api)/./src/pages/api/createSetup.js":
/*!**************************************!*\
  !*** ./src/pages/api/createSetup.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nfunction handler(req, res) {\n    // Return the request body in JSON\n    console.log(JSON.parse(req.body));\n    try {\n        res.status(200).json(\"Sent dictionary data to the database!\");\n    } catch (err) {\n        res.status(500).json({\n            error: \"failed to load data\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NyZWF0ZVNldHVwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxTQUFTQSxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN4QyxrQ0FBa0M7SUFDbENDLFFBQVFDLEdBQUcsQ0FBQ0MsS0FBS0MsS0FBSyxDQUFDTCxJQUFJTSxJQUFJO0lBQy9CLElBQUk7UUFDRkwsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztJQUN2QixFQUFFLE9BQU9DLEtBQUs7UUFDWlIsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRSxPQUFPO1FBQXNCO0lBQ3REO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmd0aW1lLy4vc3JjL3BhZ2VzL2FwaS9jcmVhdGVTZXR1cC5qcz8wMzlmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICAvLyBSZXR1cm4gdGhlIHJlcXVlc3QgYm9keSBpbiBKU09OXHJcbiAgY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXEuYm9keSkpXHJcbiAgdHJ5IHtcclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKCdTZW50IGRpY3Rpb25hcnkgZGF0YSB0byB0aGUgZGF0YWJhc2UhJylcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdmYWlsZWQgdG8gbG9hZCBkYXRhJyB9KVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJwYXJzZSIsImJvZHkiLCJzdGF0dXMiLCJqc29uIiwiZXJyIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/createSetup.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/createSetup.js"));
module.exports = __webpack_exports__;

})();