"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/setup",{

/***/ "./src/pages/setup.js":
/*!****************************!*\
  !*** ./src/pages/setup.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ setup; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/input/index.js\");\n/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons */ \"./node_modules/@ant-design/icons/es/icons/UploadOutlined.js\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/message/index.js\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/upload/index.js\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/button/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/layout/index.js\");\n/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons */ \"./node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js\");\n/* harmony import */ var _app_dictionary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app/dictionary */ \"./src/app/dictionary.tsx\");\n// import 'antd/dist/antd.css';\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst { Header , Footer , Sider , Content  } = antd__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n//icons\n\n\nconst { TextArea  } = antd__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n// Implement file upload later\nconst props = {\n    name: \"file\",\n    action: \"https://www.mocky.io/v2/5cc8019d300000980a055e76\",\n    headers: {\n        authorization: \"authorization-text\"\n    },\n    onChange (info) {\n        if (info.file.status !== \"uploading\") {\n            console.log(info.file, info.fileList);\n        }\n        if (info.file.status === \"done\") {\n            antd__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(\"\".concat(info.file.name, \" file uploaded successfully\"));\n        } else if (info.file.status === \"error\") {\n            antd__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"\".concat(info.file.name, \" file upload failed.\"));\n        }\n    }\n};\nfunction setup() {\n    _s();\n    const [langName, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [langDesc, setDesc] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Sider, {\n                    style: {\n                        padding: \"0 20px\",\n                        background: \"white\"\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                lineNumber: 49,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Your Details\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                lineNumber: 50,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Dictionary Setup\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                lineNumber: 51,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Dictionary Setup\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                lineNumber: 52,\n                                columnNumber: 17\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                        lineNumber: 48,\n                        columnNumber: 15\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                    lineNumber: 47,\n                    columnNumber: 13\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Content, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            children: \"Dictionary Setup\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                            lineNumber: 56,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            id: \"first-page-setup\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: \"Name Your Language\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 58,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                    id: \"langNameID\",\n                                    placeholder: \"Name Your Language\",\n                                    onChange: (e)=>{\n                                        setValue(e.currentTarget.value);\n                                    }\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 59,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: \"Description of Language\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 60,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TextArea, {\n                                        id: \"langDescID\",\n                                        rows: 4,\n                                        placeholder: \"Description of Language\",\n                                        onChange: (e)=>{\n                                            setDesc(e.currentTarget.value);\n                                        },\n                                        maxLength: 6\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                        lineNumber: 62,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: \"Upload Custom Font\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 65,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                    ...props,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, void 0, void 0),\n                                        children: \"Click to Upload\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                        lineNumber: 67,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 66,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: \"Upload Cover Image\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 70,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                    ...props,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, void 0, void 0),\n                                        children: \"Click to Upload\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                        lineNumber: 72,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 71,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                            lineNumber: 57,\n                            columnNumber: 15\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            id: \"continue-button\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 77,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                    type: \"primary\",\n                                    onClick: ()=>(0,_app_dictionary__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n                                            langName,\n                                            langDesc\n                                        }),\n                                    children: \"Continue\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                                    lineNumber: 78,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                            lineNumber: 76,\n                            columnNumber: 15\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n                    lineNumber: 55,\n                    columnNumber: 13\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n            lineNumber: 46,\n            columnNumber: 11\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\andre\\\\Documents\\\\Conlang-Suite-Capstone\\\\Conlang-Suite-Capstone\\\\src\\\\pages\\\\setup.js\",\n        lineNumber: 45,\n        columnNumber: 7\n    }, this);\n}\n_s(setup, \"hJ10m1lH+EiH90FUDHbv7UmVY0c=\");\n\n\n;\r\n    // Wrapped in an IIFE to avoid polluting the global scope\r\n    ;\r\n    (function () {\r\n        var _a, _b;\r\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\r\n        // to extract CSS. For backwards compatibility, we need to check we're in a\r\n        // browser context before continuing.\r\n        if (typeof self !== 'undefined' &&\r\n            // AMP / No-JS mode does not inject these helpers:\r\n            '$RefreshHelpers$' in self) {\r\n            // @ts-ignore __webpack_module__ is global\r\n            var currentExports = module.exports;\r\n            // @ts-ignore __webpack_module__ is global\r\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\r\n            // This cannot happen in MainTemplate because the exports mismatch between\r\n            // templating and execution.\r\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\r\n            // A module can be accepted automatically based on its exports, e.g. when\r\n            // it is a Refresh Boundary.\r\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\r\n                // Save the previous exports on update so we can compare the boundary\r\n                // signatures.\r\n                module.hot.dispose(function (data) {\r\n                    data.prevExports = currentExports;\r\n                });\r\n                // Unconditionally accept an update to this module, we'll check if it's\r\n                // still a Refresh Boundary later.\r\n                // @ts-ignore importMeta is replaced in the loader\r\n                module.hot.accept();\r\n                // This field is set when the previous version of this module was a\r\n                // Refresh Boundary, letting us know we need to check for invalidation or\r\n                // enqueue an update.\r\n                if (prevExports !== null) {\r\n                    // A boundary can become ineligible if its exports are incompatible\r\n                    // with the previous exports.\r\n                    //\r\n                    // For example, if you add/remove/change exports, we'll want to\r\n                    // re-execute the importing modules, and force those components to\r\n                    // re-render. Similarly, if you convert a class component to a\r\n                    // function, we want to invalidate the boundary.\r\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\r\n                        module.hot.invalidate();\r\n                    }\r\n                    else {\r\n                        self.$RefreshHelpers$.scheduleUpdate();\r\n                    }\r\n                }\r\n            }\r\n            else {\r\n                // Since we just executed the code for the module, it's possible that the\r\n                // new exports made it ineligible for being a boundary.\r\n                // We only care about the case when we were _previously_ a boundary,\r\n                // because we already accepted this update (accidental side effect).\r\n                var isNoLongerABoundary = prevExports !== null;\r\n                if (isNoLongerABoundary) {\r\n                    module.hot.invalidate();\r\n                }\r\n            }\r\n        }\r\n    })();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OENBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTTNGLENBQUM7R0E3Q3VCSCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvc2V0dXAuanM/NjIzZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcyc7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IFVwbG9hZE91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgeyBCdXR0b24sIG1lc3NhZ2UsIFVwbG9hZCB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICdhbnRkJztcclxuY29uc3QgeyBIZWFkZXIsIEZvb3RlciwgU2lkZXIsIENvbnRlbnQgfSA9IExheW91dDtcclxuXHJcbi8vaWNvbnNcclxuaW1wb3J0IHsgQ2hlY2tDaXJjbGVPdXRsaW5lZCwgU3RhckZpbGxlZCwgU3RhclR3b1RvbmUgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcblxyXG5pbXBvcnQgc2F2ZVVzZXJJbmZvIGZyb20gXCIuLi9hcHAvZGljdGlvbmFyeVwiXHJcblxyXG5cclxuY29uc3QgeyBUZXh0QXJlYSB9ID0gSW5wdXQ7XHJcblxyXG5cclxuXHJcbi8vIEltcGxlbWVudCBmaWxlIHVwbG9hZCBsYXRlclxyXG5jb25zdCBwcm9wcyA9IHtcclxuICBuYW1lOiAnZmlsZScsXHJcbiAgYWN0aW9uOiAnaHR0cHM6Ly93d3cubW9ja3kuaW8vdjIvNWNjODAxOWQzMDAwMDA5ODBhMDU1ZTc2JyxcclxuICBoZWFkZXJzOiB7XHJcbiAgICBhdXRob3JpemF0aW9uOiAnYXV0aG9yaXphdGlvbi10ZXh0JyxcclxuICB9LFxyXG4gIG9uQ2hhbmdlKGluZm8pIHtcclxuICAgIGlmIChpbmZvLmZpbGUuc3RhdHVzICE9PSAndXBsb2FkaW5nJykge1xyXG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmZpbGUsIGluZm8uZmlsZUxpc3QpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZm8uZmlsZS5zdGF0dXMgPT09ICdkb25lJykge1xyXG4gICAgICBtZXNzYWdlLnN1Y2Nlc3MoYCR7aW5mby5maWxlLm5hbWV9IGZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5YCk7XHJcbiAgICB9IGVsc2UgaWYgKGluZm8uZmlsZS5zdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgbWVzc2FnZS5lcnJvcihgJHtpbmZvLmZpbGUubmFtZX0gZmlsZSB1cGxvYWQgZmFpbGVkLmApO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgY29uc3QgW2xhbmdOYW1lLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2xhbmdEZXNjLCBzZXREZXNjXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8TGF5b3V0PlxyXG4gICAgICAgICAgICA8U2lkZXIgc3R5bGU9e3sgcGFkZGluZzogJzAgMjBweCcsIGJhY2tncm91bmQ6ICd3aGl0ZSd9fT5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlT3V0bGluZWQgLz5cclxuICAgICAgICAgICAgICAgIDxwPllvdXIgRGV0YWlsczwvcD5cclxuICAgICAgICAgICAgICAgIDxwPkRpY3Rpb25hcnkgU2V0dXA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5EaWN0aW9uYXJ5IFNldHVwPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L1NpZGVyPlxyXG4gICAgICAgICAgICA8Q29udGVudD5cclxuICAgICAgICAgICAgICA8aDE+RGljdGlvbmFyeSBTZXR1cDwvaDE+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cImZpcnN0LXBhZ2Utc2V0dXBcIj5cclxuICAgICAgICAgICAgICAgIDxwPk5hbWUgWW91ciBMYW5ndWFnZTwvcD5cclxuICAgICAgICAgICAgICAgIDxJbnB1dCBpZD1cImxhbmdOYW1lSURcIiBwbGFjZWhvbGRlcj1cIk5hbWUgWW91ciBMYW5ndWFnZVwiIG9uQ2hhbmdlPXtlID0+IHsgc2V0VmFsdWUoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTsgfX0vPlxyXG4gICAgICAgICAgICAgICAgPHA+RGVzY3JpcHRpb24gb2YgTGFuZ3VhZ2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICA8VGV4dEFyZWEgaWQ9XCJsYW5nRGVzY0lEXCIgcm93cz17NH0gcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvbiBvZiBMYW5ndWFnZVwiIG9uQ2hhbmdlPXtlID0+IHsgc2V0RGVzYyhlLmN1cnJlbnRUYXJnZXQudmFsdWUpOyB9fSBtYXhMZW5ndGg9ezZ9IC8+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuXHJcbiAgICAgICAgICAgICAgICA8cD5VcGxvYWQgQ3VzdG9tIEZvbnQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8VXBsb2FkIHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWNvbj17PFVwbG9hZE91dGxpbmVkIC8+fT5DbGljayB0byBVcGxvYWQ8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvVXBsb2FkPlxyXG5cclxuICAgICAgICAgICAgICAgIDxwPlVwbG9hZCBDb3ZlciBJbWFnZTwvcD5cclxuICAgICAgICAgICAgICAgIDxVcGxvYWQgey4uLnByb3BzfT5cclxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpY29uPXs8VXBsb2FkT3V0bGluZWQgLz59PkNsaWNrIHRvIFVwbG9hZDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9VcGxvYWQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250aW51ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgIDxicj48L2JyPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHNhdmVVc2VySW5mbyh7bGFuZ05hbWUsIGxhbmdEZXNjfSl9ID5Db250aW51ZTwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L0NvbnRlbnQ+XHJcbiAgICAgICAgICA8L0xheW91dD5cclxuICAgICAgPC9kaXY+XHJcbiAgKTtcclxufSJdLCJuYW1lcyI6WyJJbnB1dCIsIlVwbG9hZE91dGxpbmVkIiwiQnV0dG9uIiwibWVzc2FnZSIsIlVwbG9hZCIsIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJMYXlvdXQiLCJIZWFkZXIiLCJGb290ZXIiLCJTaWRlciIsIkNvbnRlbnQiLCJDaGVja0NpcmNsZU91dGxpbmVkIiwiU3RhckZpbGxlZCIsIlN0YXJUd29Ub25lIiwic2F2ZVVzZXJJbmZvIiwiVGV4dEFyZWEiLCJwcm9wcyIsIm5hbWUiLCJhY3Rpb24iLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsIm9uQ2hhbmdlIiwiaW5mbyIsImZpbGUiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiZmlsZUxpc3QiLCJzdWNjZXNzIiwiZXJyb3IiLCJzZXR1cCIsImxhbmdOYW1lIiwic2V0VmFsdWUiLCJsYW5nRGVzYyIsInNldERlc2MiLCJkaXYiLCJzdHlsZSIsInBhZGRpbmciLCJiYWNrZ3JvdW5kIiwicCIsImgxIiwiaWQiLCJwbGFjZWhvbGRlciIsImUiLCJjdXJyZW50VGFyZ2V0IiwidmFsdWUiLCJyb3dzIiwibWF4TGVuZ3RoIiwiaWNvbiIsImJyIiwidHlwZSIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/setup.js\n"));

/***/ })

});