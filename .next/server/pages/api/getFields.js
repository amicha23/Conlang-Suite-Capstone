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
exports.id = "pages/api/getFields";
exports.ids = ["pages/api/getFields"];
exports.modules = {

/***/ "(api)/./src/pages/api/getFields.js":
/*!************************************!*\
  !*** ./src/pages/api/getFields.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n//Retrieve request for all dictionary setup form fields\nfunction handler(req, res) {\n    console.log(JSON.parse(req.body).data);\n    res.status(200).json({\n        response: \"successfully sent form fields to server\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2dldEZpZWxkcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsdURBQXVEO0FBRXhDLFNBQVNBLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ3hDQyxRQUFRQyxHQUFHLENBQUNDLEtBQUtDLEtBQUssQ0FBQ0wsSUFBSU0sSUFBSSxFQUFFQyxJQUFJO0lBQ3JDTixJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQUVDLFVBQVU7SUFBMEM7QUFDN0UsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmd0aW1lLy4vc3JjL3BhZ2VzL2FwaS9nZXRGaWVsZHMuanM/ODMyMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1JldHJpZXZlIHJlcXVlc3QgZm9yIGFsbCBkaWN0aW9uYXJ5IHNldHVwIGZvcm0gZmllbGRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXEuYm9keSkuZGF0YSlcclxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHJlc3BvbnNlOiAnc3VjY2Vzc2Z1bGx5IHNlbnQgZm9ybSBmaWVsZHMgdG8gc2VydmVyJyB9KVxyXG59Il0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInBhcnNlIiwiYm9keSIsImRhdGEiLCJzdGF0dXMiLCJqc29uIiwicmVzcG9uc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/getFields.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/getFields.js"));
module.exports = __webpack_exports__;

})();