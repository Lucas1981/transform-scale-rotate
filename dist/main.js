/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("(async function(document) {\r\n    'use strict'\r\n\r\n    const canvasHeight = 800;\r\n    const canvasWidth = 600;\r\n    const targetWidth = 320;\r\n    const targetHeight = 240;\r\n    const img = new Image();\r\n    img.src = 'cat.jpg';\r\n    await new Promise(resolve => img.onload = resolve);\r\n\r\n    const canvas = document.getElementById('canvas');\r\n    canvas.height = canvasHeight;\r\n    canvas.width = canvasWidth;\r\n    const ctx = canvas.getContext('2d');\r\n    const imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);\r\n    const sourceCanvas = document.createElement('canvas');\r\n    sourceCanvas.width = img.width;\r\n    sourceCanvas.height = img.height;\r\n    const sourceCtx = sourceCanvas.getContext('2d');\r\n    sourceCtx.drawImage(img, 0, 0);\r\n    const sourceImageData = sourceCtx.getImageData(0, 0, img.width, img.height);\r\n\r\n    const plotPixel = (x, y, { r, g, b }) => {\r\n        const base = (x * 4) + ((y * canvasWidth) * 4);\r\n        imgData.data[base + 0] = r;\r\n        imgData.data[base + 1] = g;\r\n        imgData.data[base + 2] = b;\r\n        imgData.data[base + 3] = 255; // Math.floor(Math.random() * 255);\r\n    }\r\n\r\n    const getColor = (x, y) => {\r\n        // Scale the coordinates down\r\n        const sx = Math.floor(canvas.width / sourceCanvas.width * x);\r\n        const sy = Math.floor(canvas.height / sourceCanvas.height * y);\r\n        const base = (sx * 4) + ((sy * sourceCanvas.width * 4));\r\n\r\n        return {\r\n            r: sourceImageData.data[base + 0],\r\n            g: sourceImageData.data[base + 1],\r\n            b: sourceImageData.data[base + 2],\r\n            a: sourceImageData.data[base + 3]\r\n        }\r\n    }\r\n\r\n    // let's draw a red square\r\n    for (let i = 0; i < targetWidth; i++) {\r\n        for (let j = 0; j < targetHeight; j++) {\r\n            const color = getColor(i, j);\r\n            plotPixel(i, j, color); // { r: 255, g: 0, b: 0 });\r\n        }\r\n    }\r\n\r\n    ctx.putImageData(imgData, 0, 0);\r\n})(document);\n\n//# sourceURL=webpack://scale-image/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;