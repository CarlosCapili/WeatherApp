/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fetchData.js":
/*!**************************!*\
  !*** ./src/fetchData.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertToCelsius\": () => (/* binding */ convertToCelsius),\n/* harmony export */   \"convertToFahrenheit\": () => (/* binding */ convertToFahrenheit),\n/* harmony export */   \"fetchWeather\": () => (/* binding */ fetchWeather),\n/* harmony export */   \"kelvinToCel\": () => (/* binding */ kelvinToCel),\n/* harmony export */   \"kelvinToF\": () => (/* binding */ kelvinToF)\n/* harmony export */ });\nasync function fetchWeather(city) {\n    try {\n        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e5382e7ac8f9de055adb99830e13c3f5`, {mode:\"cors\"});\n        const data = await response.json();\n        console.log(data);\n        return {\n            city: `${data.name}, ${data.sys.country}`,\n            temp: data.main.temp,\n            high: data.main.temp_max,\n            low: data.main.temp_min,\n            feelsLike: data.main.feels_like,\n            humidity: data.main.humidity,\n            desc: data.weather[\"0\"].description\n        };\n    } catch (e) {\n        console.log(\"Failed to fetch data from API\");\n    }\n}\n\nfunction kelvinToCel(kelvin) {\n    return (kelvin - 273.15);\n}\n\nfunction kelvinToF(kelvin) {\n    return ((9/5)*(kelvin - 273.15) + 32);\n}\n\nfunction convertToCelsius(f) {\n    return ((f-32)/1.8);\n}\n\nfunction convertToFahrenheit(c) {\n    return ((c*1.8)+32)\n}\n\n\n\n\n//# sourceURL=webpack://WeatherApp/./src/fetchData.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fetchData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchData */ \"./src/fetchData.js\");\n\n\nconst search_bar_text = document.getElementById(\"search-bar-text\");\nconst search_bar_btn = document.getElementById(\"search-bar-btn\");\n\n//Display divs\nconst displayCity = document.getElementById(\"city\");\nconst displayTemp = document.getElementById(\"temp\");\nconst displayHigh = document.getElementById(\"high\");\nconst displayLow = document.getElementById(\"low\");\nconst displayFeelsLike = document.getElementById(\"feelsLike\");\nconst displayHumidity = document.getElementById(\"humidity\");\nconst displayDesc = document.getElementById(\"desc\");\nconst convertDiv = document.getElementById(\"convert\");\n\n//Toggle deg C or F, where true = C\nlet toggleDeg = true;\n\n//Search when button or enter key is pressed\nsearch_bar_btn.addEventListener(\"click\", () => {\n    getWeather();\n}); \n\n//Enables user to press enter on keyboard rather than click button\nsearch_bar_text.addEventListener(\"keypress\", (e) => {\n    if (e.key === \"Enter\") {\n        e.preventDefault();\n        search_bar_btn.click();\n    }\n});\n\n// Set default weather to Toronto on first display\n(function defaultWeather() {\n    search_bar_text.value = \"Toronto\";\n    search_bar_btn.click();\n})();\n\n//When the degree converter is clicked switch the active class to the opposite deg\nconvertDiv.addEventListener(\"click\", () => {\n    const degPara = document.getElementsByClassName(\"convert\");\n\n    if (degPara[0].classList.contains(\"active\")) {\n        //Convert to F\n        toggleDeg = false;\n        degPara[1].classList.add(\"active\");\n        degPara[0].classList.remove(\"active\");\n        //console.log(displayTemp.textContent.slice(0,-1));\n\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToFahrenheit(displayTemp.textContent.slice(0,-1))), displayTemp);\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToFahrenheit(displayHigh.textContent.slice(3,-1))), displayHigh);\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToFahrenheit(displayLow.textContent.slice(3,-1))), displayLow);\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToFahrenheit(displayFeelsLike.textContent.slice(12,-1))), displayFeelsLike);\n        \n    } else {\n        //Convert to C\n        toggleDeg = true;\n        degPara[0].classList.add(\"active\");\n        degPara[1].classList.remove(\"active\");\n        //console.log(displayTemp.textContent.slice(0,-1));\n\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToCelsius(displayTemp.textContent.slice(0,-1))), displayTemp);\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToCelsius(displayHigh.textContent.slice(3,-1))), displayHigh);\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToCelsius(displayLow.textContent.slice(3,-1))), displayLow);\n        displayData(Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.convertToCelsius(displayFeelsLike.textContent.slice(12,-1))), displayFeelsLike);\n    }\n});\n\n\n//Get the data and place them in vars\nasync function getWeather() {\n    try {\n        const data = await _fetchData__WEBPACK_IMPORTED_MODULE_0__.fetchWeather(search_bar_text.value);\n        //console.log(data);\n        const city = data.city;\n        let temp;\n        let high;\n        let low;\n        let feelsLike;\n\n        //If toggleDeg is true then it means Celsius\n        if (toggleDeg) {\n            temp = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToCel(data.temp));\n            high = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToCel(data.high));\n            low = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToCel(data.low));\n            feelsLike = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToCel(data.feelsLike));\n        } else {\n            temp = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToF(data.temp));\n            high = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToF(data.high));\n            low = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToF(data.low));\n            feelsLike = Math.round(_fetchData__WEBPACK_IMPORTED_MODULE_0__.kelvinToF(data.feelsLike));\n        }\n\n        const humidity = data.humidity;\n        const desc = data.desc;\n        \n        console.log(city);\n        console.log(temp);\n        console.log(high);\n        console.log(low);\n        console.log(feelsLike);\n        console.log(humidity);\n        console.log(desc);\n       \n        displayData(city, displayCity);\n        displayData(temp, displayTemp);\n        displayData(high, displayHigh);\n        displayData(low, displayLow);\n        displayData(feelsLike, displayFeelsLike);\n        displayData(humidity, displayHumidity);\n        displayData(desc, displayDesc);\n    } catch (e) {\n        console.log(\"Data failed to fetch from fetchData.js\");\n    }\n}\n\n//Display functions\nfunction displayData(data, displayDiv) {\n    const degreeList = [\"temp\", \"high\", \"low\", \"feelsLike\"];\n    if (degreeList.includes(displayDiv.id)) {\n        let text = \"\";\n\n        if (displayDiv.id === \"high\") {\n            text += \"H: \";\n        }\n        if (displayDiv.id === \"low\") {\n            text += \"L: \";\n        }\n        if (displayDiv.id === \"feelsLike\") {\n            text += \"Feels Like: \"; \n        } \n\n        // if (toggleDeg) {\n        //     text += `${data}℃`;\n        // } else {\n        //     text += `${data}℉`;\n        // }\n\n        text += data + \"\\u00B0\";\n        \n        displayDiv.textContent = text;\n\n    } else if (displayDiv.id === \"humidity\") {\n        displayDiv.textContent = `Humidity: ${data}%`;\n    } else {\n        displayDiv.textContent = data;\n    }\n}\n\n\n\n\n\n//# sourceURL=webpack://WeatherApp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;