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

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),

/***/ "(api)/./firebaseConfig/firebaseAdmin.js":
/*!*****************************************!*\
  !*** ./firebaseConfig/firebaseAdmin.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar admin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\nconst serviceAccount = __webpack_require__(/*! ./serviceAccountKey.json */ \"(api)/./firebaseConfig/serviceAccountKey.json\");\nconst app = !admin.apps.length ? admin.initializeApp({\n    credential: admin.credential.cert(serviceAccount),\n    databaseURL: \"https://langtime-27547-default-rtdb.firebaseio.com\"\n}, \"langtime\") : admin.app(\"langtime\");\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9maXJlYmFzZUNvbmZpZy9maXJlYmFzZUFkbWluLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxRQUFRQyxtQkFBT0EsQ0FBQyxzQ0FBZ0I7QUFFcEMsTUFBTUMsaUJBQWlCRCxtQkFBT0EsQ0FBQywrRUFBMEI7QUFFekQsTUFBTUUsTUFBTSxDQUFDSCxNQUFNSSxJQUFJLENBQUNDLE1BQU0sR0FDMUJMLE1BQU1NLGFBQWEsQ0FBQztJQUNsQkMsWUFBWVAsTUFBTU8sVUFBVSxDQUFDQyxJQUFJLENBQUNOO0lBQ2xDTyxhQUFhO0FBQ2YsR0FBRyxjQUNIVCxNQUFNRyxHQUFHLENBQUMsV0FBVztBQUV6QixpRUFBZUEsR0FBR0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmd0aW1lLy4vZmlyZWJhc2VDb25maWcvZmlyZWJhc2VBZG1pbi5qcz85MTJiIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBhZG1pbiA9IHJlcXVpcmUoXCJmaXJlYmFzZS1hZG1pblwiKTtcblxuY29uc3Qgc2VydmljZUFjY291bnQgPSByZXF1aXJlKFwiLi9zZXJ2aWNlQWNjb3VudEtleS5qc29uXCIpO1xuXG5jb25zdCBhcHAgPSAhYWRtaW4uYXBwcy5sZW5ndGhcbiAgPyBhZG1pbi5pbml0aWFsaXplQXBwKHtcbiAgICAgIGNyZWRlbnRpYWw6IGFkbWluLmNyZWRlbnRpYWwuY2VydChzZXJ2aWNlQWNjb3VudCksXG4gICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2xhbmd0aW1lLTI3NTQ3LWRlZmF1bHQtcnRkYi5maXJlYmFzZWlvLmNvbVwiXG4gICAgfSwgXCJsYW5ndGltZVwiKVxuICA6IGFkbWluLmFwcChcImxhbmd0aW1lXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iXSwibmFtZXMiOlsiYWRtaW4iLCJyZXF1aXJlIiwic2VydmljZUFjY291bnQiLCJhcHAiLCJhcHBzIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0IiwiZGF0YWJhc2VVUkwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./firebaseConfig/firebaseAdmin.js\n");

/***/ }),

/***/ "(api)/./firebaseConfig/firebaseConfig.js":
/*!******************************************!*\
  !*** ./firebaseConfig/firebaseConfig.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _firebaseAdmin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebaseAdmin.js */ \"(api)/./firebaseConfig/firebaseAdmin.js\");\n\nconst db = _firebaseAdmin_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].database();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9maXJlYmFzZUNvbmZpZy9maXJlYmFzZUNvbmZpZy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFxQztBQUVyQyxNQUFNQyxLQUFLRCxrRUFBWTtBQUV2QixpRUFBZUMsRUFBRUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmd0aW1lLy4vZmlyZWJhc2VDb25maWcvZmlyZWJhc2VDb25maWcuanM/ODY1MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwIGZyb20gJy4vZmlyZWJhc2VBZG1pbi5qcyc7XG5cbmNvbnN0IGRiID0gYXBwLmRhdGFiYXNlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRiOyJdLCJuYW1lcyI6WyJhcHAiLCJkYiIsImRhdGFiYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./firebaseConfig/firebaseConfig.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/createSetup.js":
/*!**************************************!*\
  !*** ./src/pages/api/createSetup.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _firebaseConfig_firebaseConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../firebaseConfig/firebaseConfig.js */ \"(api)/./firebaseConfig/firebaseConfig.js\");\n\n// To save dictionary setup data in the database\nfunction handler(req, res) {\n    // Return the request body in JSON\n    // var langRef = db.ref(\"languages\");\n    console.log(JSON.parse(req.body));\n    try {\n        console.log(\"tried pushing new data to database\");\n        var uid = \"user1\";\n        var langData = {\n            description: \"testing1\",\n            dictionary_fields: \"das1, d2\",\n            name: \"test dict 1\",\n            uid: \"1\"\n        };\n        const newLangKey = _firebaseConfig_firebaseConfig_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ref().child(\"languages\").push().key;\n        const updates = {};\n        updates[\"/languages/\" + newLangKey] = langData;\n        updates[\"/users/\" + uid + \"/lid/\"] = newLangKey;\n        _firebaseConfig_firebaseConfig_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ref().update(updates);\n        console.log(\"Sent dictionary data to the database!\");\n        res.status(200).json(\"Sent dictionary data to the database!\");\n    } catch (err) {\n        res.status(500).json({\n            error: \"failed to load data\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NyZWF0ZVNldHVwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTJEO0FBRTNELGdEQUFnRDtBQUNqQyxTQUFTQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN4QyxrQ0FBa0M7SUFDbEMscUNBQXFDO0lBQ3JDQyxRQUFRQyxHQUFHLENBQUNDLEtBQUtDLEtBQUssQ0FBQ0wsSUFBSU0sSUFBSTtJQUMvQixJQUFJO1FBQ0ZKLFFBQVFDLEdBQUcsQ0FBQztRQUNaLElBQUlJLE1BQU07UUFDVixJQUFJQyxXQUFXO1lBQ2JDLGFBQWE7WUFDYkMsbUJBQW1CO1lBQ25CQyxNQUFNO1lBQ05KLEtBQUs7UUFDUDtRQUNBLE1BQU1LLGFBQWFkLDZFQUFNLEdBQUdnQixLQUFLLENBQUMsYUFBYUMsSUFBSSxHQUFHQyxHQUFHO1FBRXpELE1BQU1DLFVBQVUsQ0FBQztRQUNqQkEsT0FBTyxDQUFDLGdCQUFnQkwsV0FBVyxHQUFHSjtRQUN0Q1MsT0FBTyxDQUFDLFlBQVlWLE1BQU0sUUFBUSxHQUFHSztRQUVyQ2QsNkVBQU0sR0FBR29CLE1BQU0sQ0FBQ0Q7UUFFaEJmLFFBQVFDLEdBQUcsQ0FBQztRQUNaRixJQUFJa0IsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztJQUN2QixFQUFFLE9BQU9DLEtBQUs7UUFDWnBCLElBQUlrQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVFLE9BQU87UUFBc0I7SUFDdEQ7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZ3RpbWUvLi9zcmMvcGFnZXMvYXBpL2NyZWF0ZVNldHVwLmpzPzAzOWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRiIGZyb20gXCIuLi8uLi8uLi9maXJlYmFzZUNvbmZpZy9maXJlYmFzZUNvbmZpZy5qc1wiO1xuXG4vLyBUbyBzYXZlIGRpY3Rpb25hcnkgc2V0dXAgZGF0YSBpbiB0aGUgZGF0YWJhc2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgLy8gUmV0dXJuIHRoZSByZXF1ZXN0IGJvZHkgaW4gSlNPTlxuICAvLyB2YXIgbGFuZ1JlZiA9IGRiLnJlZihcImxhbmd1YWdlc1wiKTtcbiAgY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXEuYm9keSkpO1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKFwidHJpZWQgcHVzaGluZyBuZXcgZGF0YSB0byBkYXRhYmFzZVwiKTtcbiAgICB2YXIgdWlkID0gJ3VzZXIxJztcbiAgICB2YXIgbGFuZ0RhdGEgPSB7XG4gICAgICBkZXNjcmlwdGlvbjogXCJ0ZXN0aW5nMVwiLFxuICAgICAgZGljdGlvbmFyeV9maWVsZHM6IFwiZGFzMSwgZDJcIixcbiAgICAgIG5hbWU6IFwidGVzdCBkaWN0IDFcIixcbiAgICAgIHVpZDogXCIxXCIsXG4gICAgfVxuICAgIGNvbnN0IG5ld0xhbmdLZXkgPSBkYi5yZWYoKS5jaGlsZCgnbGFuZ3VhZ2VzJykucHVzaCgpLmtleTtcblxuICAgIGNvbnN0IHVwZGF0ZXMgPSB7fVxuICAgIHVwZGF0ZXNbJy9sYW5ndWFnZXMvJyArIG5ld0xhbmdLZXldID0gbGFuZ0RhdGE7XG4gICAgdXBkYXRlc1snL3VzZXJzLycgKyB1aWQgKyAnL2xpZC8nXSA9IG5ld0xhbmdLZXk7XG5cbiAgICBkYi5yZWYoKS51cGRhdGUodXBkYXRlcyk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlNlbnQgZGljdGlvbmFyeSBkYXRhIHRvIHRoZSBkYXRhYmFzZSFcIik7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oXCJTZW50IGRpY3Rpb25hcnkgZGF0YSB0byB0aGUgZGF0YWJhc2UhXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcImZhaWxlZCB0byBsb2FkIGRhdGFcIiB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImRiIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwicGFyc2UiLCJib2R5IiwidWlkIiwibGFuZ0RhdGEiLCJkZXNjcmlwdGlvbiIsImRpY3Rpb25hcnlfZmllbGRzIiwibmFtZSIsIm5ld0xhbmdLZXkiLCJyZWYiLCJjaGlsZCIsInB1c2giLCJrZXkiLCJ1cGRhdGVzIiwidXBkYXRlIiwic3RhdHVzIiwianNvbiIsImVyciIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/createSetup.js\n");

/***/ }),

/***/ "(api)/./firebaseConfig/serviceAccountKey.json":
/*!***********************************************!*\
  !*** ./firebaseConfig/serviceAccountKey.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"type":"service_account","project_id":"langtime-27547","private_key_id":"cbeb96ebda13aea72a5b98e51e110c0980763ae5","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBCIm9LxKOp5sf\\nxmOxMnJBONpmhfmqAJz/0nLQ4ZaNBkadKn0fXquJElegEY3bTWq51x/NsIlW3v1B\\nocM54ej41LUDRUMwb+iw/sHlk0jJS+TGC0AVxOIrpM40zL7Tob0fti60xmJZ/6ZN\\nNpPkpRuKbzlfE/AIJhq1loD7+WSJl2L3168Dqiur2kd6NPFO9lHdU9pOdoXNsick\\n/h4iCLpl0Fw9MfN27kqoeQGGeLtgxnaKGWVzcEOFKgnLlwprY1/ujAyyebdpYoxR\\nnVMr/RY5943fsF4KUzrl7IOluG/S6HK2iwKVTO43Gz4JPAu7mmb4M2IPFSGNJjzv\\nm8RwCJqJAgMBAAECggEAGKZveHI3a3Ip1A/wkSNBBeUttqPrMvNrGRwVv2jfYdjo\\nUY+odMYRH6rw96bmN5gWRe8bx5eAolBNhQEUPiMELipzhxxkLR5NV7Tgq+F4DQSd\\nDVFIeL8wpqQgFQwEXmAsF42bP0iKLLYB1aBfmHYhIzd62xJft5quFHxIsmSxmwQ5\\n8zY94X7hmzcOjdrIYcVpGnz9oFMig7/f9Y8HB6/+4TM9KpFUon7bM2IJTXIwvCiw\\ndG6QkpPdVzMAupHBZWmkGalOnUYLYFR7q//XocplVuasTMYU9AFTYsmidIejbCVf\\nL5H6Jo6M0wpcQVyYuuhX6TT9b797L/mExTSbYyOR0QKBgQD2TYhSgE1tHCZlMBBf\\n6S6nZAzY68p9b2N+QbBQeE04H7+kuVJcYKEhalYhfb1+SFLmXZtrcifhNsqduZ5b\\nnA8NqpGnvnk+griInyhmcfDAf1e3+g6CTPZlOxJe2bGHip0cXS8S2uV/SZAXCmQt\\nhu4522vXKJL67ONz5U8bPOADxQKBgQDIohs0RBSsY3NZGa3vr8/WR8gG0hWxOUCB\\ngan7GLV3KfNHaX2LxkPut+9H7jISWhUlgYd1hPSSiw0MRz4m1hajWRJ1oxLWIAXf\\nllRjo0Iq7QEScyArRMWe8Kfg4lqpZdmBVBfDDT+YPFXbaxo+VPEZVcUbOkteKW5p\\nw4E5td3z9QKBgD8pJroxWKmQPHBaYPiXbXVTfM/rt2NvOw5XfgVEtFieG6D8PRif\\nVvKguDGicwN9PHUCsCZfgcaJLHBB90/6twmEIhHoEGNtVjECz3Nl6J0UisQNBcd4\\nQP84pL9aB+KAM0Xgx3+ITq3TiXW/Hm1mWpTPpdno97gNI07HEQAlHjUZAoGBAJzO\\nfb6SuymkrKFlvZjIawMJpR8XkRarLWxKgCScwi85XUdh/lqBAdUQcvZgB0hqmX5v\\nxwQlftUN0ovXHo9R4e2XDyNb6bvq2UxPfPNGxM8x3xWhXvISVPYNFthfcQZWcPFw\\nXQX4U8zS0zOjeKZg0vK/I0dNf1w/u2j0AQquxqMFAoGBAKPayyXJFWuJlROw7I+y\\nLF74zaZJ03Q1OoOQjLX8Wy31v4vAZmNkDyRr0LJhyIDg7sDJZLOk+xnS7QHHVkbX\\n9LFFA/Sm0FOvo6T9kDHpmuoWHPbcROaboaO6sPYy1E5kGNDEwDShG5jXQF4YQHpj\\nBrJQgI8MJuNjWKFSeneaNoXa\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-pxrod@langtime-27547.iam.gserviceaccount.com","client_id":"115160969098029627833","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pxrod%40langtime-27547.iam.gserviceaccount.com"}');

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