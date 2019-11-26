(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AddressAutofill"] = factory();
	else
		root["AddressAutofill"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/addressAutofill.js":
/*!********************************!*\
  !*** ./src/addressAutofill.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GoogleAutocomplete; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Modules default configuration.
 */
var defaultOptions = {
  autoConstruct: false,
  // if set to true the module will autoconstruct and attach to window object as "addressAutofill"
  enableInputFillIn: true,
  // Fills out form with configured selectors on selection of google address
  inputSelector: '[data-autocomplete]',
  googleScriptParams: {
    key: 'AIzaSyBDTdKd1_rCVcZhGzSaAMqYY7LDy9YaLl8',
    callback: 'initAutocomplete',
    language: 'de'
  },
  googlePlacesConfig: {
    types: ['address'],
    componentRestrictions: {
      country: 'de'
    }
  },
  mapResult: {
    streetName: {
      use: 'long_name',
      resultType: 'route',
      targetSelector: '[name="streetName"]'
    },
    streetNumber: {
      use: 'short_name',
      // Use from Api result 'short_name' | 'long_name'
      resultType: 'street_number',
      // Name of the type from Api result
      targetSelector: '[name="streetNumber"]' // Target element that should be filled with this information

    },
    city: {
      use: 'long_name',
      resultType: 'locality',
      targetSelector: '[name="city"]'
    },
    country: {
      use: 'long_name',
      resultType: 'country',
      targetSelector: '[name="country"]'
    },
    postalCode: {
      use: 'short_name',
      resultType: 'postal_code',
      targetSelector: '[name="postalCode"]'
    },
    lat: {
      use: 'geo',
      resultType: 'lat',
      targetSelector: '[name="lat"]'
    },
    lng: {
      use: 'geo',
      resultType: 'lng',
      targetSelector: '[name="lng"]'
    }
  }
}; // Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.

var GoogleAutocomplete =
/*#__PURE__*/
function () {
  function GoogleAutocomplete(context) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GoogleAutocomplete);

    this.options = _objectSpread({}, defaultOptions, {}, options);
    this.inputElement = document.querySelector('[data-autocomplete]');
    this.autocomplete = null;
    this.result = null;

    window.initAutocomplete = function () {
      // Create the autocomplete instance with custom options
      _this.autocomplete = new google.maps.places.Autocomplete(_this.inputElement, _this.options.googlePlacesConfig);

      _this.geolocate(); // When the user selects an address from the dropdown, populate the address fields in the form.


      _this.autocomplete.addListener('place_changed', function () {
        return _this.setAddress();
      });
    };

    injectMapsScript(this.options.googleScriptParams); // Injects Google Api Script

    console.log('INIT:', this);
    return this;
  }

  _createClass(GoogleAutocomplete, [{
    key: "setAddress",
    value: function setAddress() {
      var _this2 = this;

      this.result = {};
      var resultMap = this.options.mapResult;
      var place = this.autocomplete.getPlace();
      console.log('Place', place); // Map the result data

      var _loop = function _loop(itemName) {
        var itemValue = null;

        switch (resultMap[itemName].resultType) {
          case 'lat':
            itemValue = place.geometry.location.lat();
            break;

          case 'lng':
            itemValue = place.geometry.location.lng();
            break;

          default:
            itemValue = place.address_components.filter(function (component) {
              // TODO: Fix error on empty entries like street number, etc...
              return component.types.includes(resultMap[itemName].resultType);
            })[0][resultMap[itemName].use];
        } // Optional: Fill out the form


        if (_this2.options.enableInputFillIn) {
          var element = document.querySelector(resultMap[itemName].targetSelector);

          if (!element) {
            console.warn("GoogleAutocomplete: Could not find in element ".concat(resultMap[itemName].targetSelector, " in DOM, please check your config!"));
          } else {
            _this2.result[itemName] = itemValue;
            element.value = itemValue;
          }
        }
      };

      for (var itemName in resultMap) {
        _loop(itemName);
      }

      console.log('Result', this.result);
    }
  }, {
    key: "geolocate",
    value: function geolocate() {
      var _this3 = this;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          console.log('I found your location!', geolocation, circle);

          _this3.autocomplete.setBounds(circle.getBounds());
        });
      }
    }
  }]);

  return GoogleAutocomplete;
}();
/**
 * Injects Google Maps Api script to dom using params from config.
 * @param {object} params 
 */




function injectMapsScript() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (_typeof(params) !== 'object') {
    return console.error('"googleScriptParams" are required for GoogleAutocomplete configuration!');
  }

  if (!params.key) {
    return console.error('Please add a valid API key for "googleScriptParams.key" to run GoogleAutocomplete!');
  }

  var mapsUrl = "https://maps.googleapis.com/maps/api/js?libraries=places";
  var mapsScript = document.createElement("script");

  for (var key in params) {
    mapsUrl += "&".concat(key, "=").concat(params[key]);
  }

  mapsScript.src = mapsUrl;
  document.body.appendChild(mapsScript);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _addressAutofill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addressAutofill */ "./src/addressAutofill.js");

module.exports = {
  run: function run(context) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new _addressAutofill__WEBPACK_IMPORTED_MODULE_0__["default"](context, options);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

/******/ });
});
//# sourceMappingURL=addressAutofill.js.map