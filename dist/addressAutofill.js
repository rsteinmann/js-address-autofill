var AddressAutofill =
/******/ (function(modules) { // webpackBootstrap
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

/***/ "./src/addressAutofill.js":
/*!********************************!*\
  !*** ./src/addressAutofill.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddressAutofill; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  useBrowserGeolocation: true,
  // Uses the browser's geolocation API to ask the user for her current location (makes predictions more precise)
  inputSelector: '[data-autocomplete]',
  googleScriptParams: {
    // This configuration will be passed to Google Places API as urlParams
    key: 'YOUR_KEY_IS_REQUIRED_HERE' // This is required!

  },
  googlePlacesConfig: {},
  // This configuration will be passed to Google Places API
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
};
/**
 * Stores all instances of AddressAutofill
 */

var instances = [];

var AddressAutofill =
/*#__PURE__*/
function () {
  function AddressAutofill(context) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AddressAutofill);

    if (_typeof(context) !== 'object' || !(context instanceof HTMLElement) && !(context instanceof HTMLDocument)) {
      console.error('Please choose a valid context for AddressAutofill! Given:', context);
      return null;
    }

    this.context = context;
    this.inputElement = this.context.querySelector('[data-autocomplete]');

    if (!(this.inputElement instanceof HTMLInputElement)) {
      console.error('Please choose a valid input field for AddressAutofill! Given:', this.inputElement);
      return null;
    }

    this.options = _objectSpread({}, defaultOptions, {}, options);
    this.autocomplete = null;
    this.result = null;
    this.instance = instances.push(this) - 1; // Check for configs

    if (this.inputElement.getAttribute('data-autocomplete') !== null) {
      this.options.googleScriptParams.key = this.inputElement.getAttribute('data-autocomplete');
    } // Check if the script is already injected


    if (!window.hasGoogleAutocomplete) {
      if (typeof window.initAutocomplete !== 'function') {
        // Creates new instance of autocomplete for each already existing AddressAutofill instance
        window.initAutocomplete = function () {
          return instances.forEach(function (instance) {
            return initAutocomplete(instance);
          });
        };
      }

      injectMapsScript(this.options.googleScriptParams);
    } else {
      initAutocomplete(this);
    } // Capture Enter Press


    this.inputElement.addEventListener('keydown', function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    return this;
  }
  /**
   * Sets the address found by the Places API to the configured fields.
   */


  _createClass(AddressAutofill, [{
    key: "setAddress",
    value: function setAddress() {
      var _this = this;

      this.result = {};
      var resultMap = this.options.mapResult;
      var place = this.autocomplete.getPlace(); // Map the result data

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
            var address_component = place.address_components.filter(function (component) {
              return component.types.includes(resultMap[itemName].resultType);
            });

            if (address_component.length > 0) {
              itemValue = address_component[0][resultMap[itemName].use];
            }

        } // Optional: Fill out the form


        if (_this.options.enableInputFillIn) {
          var element = _this.context.querySelector(resultMap[itemName].targetSelector);

          if (!element) {
            console.warn("AddressAutofill: Could not find in element ".concat(resultMap[itemName].targetSelector, " in DOM, please check your config!"));
          } else {
            _this.result[itemName] = itemValue;
            element.value = itemValue;
          }
        }
      };

      for (var itemName in resultMap) {
        _loop(itemName);
      }
    }
  }]);

  return AddressAutofill;
}();
/**
 * Injects Google Maps Api script to dom using params from config.
 * @param {object} params 
 */




function injectMapsScript() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (_typeof(params) !== 'object') {
    return console.error('"googleScriptParams" are required for AddressAutofill configuration!');
  }

  if (!params.key) {
    return console.error('Please add a valid API key for "AddressAutofill" to run AddressAutofill!');
  }

  var mapsUrl = "https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete";
  var mapsScript = document.createElement("script");

  for (var key in params) {
    mapsUrl += "&".concat(key, "=").concat(params[key]);
  }

  mapsScript.src = mapsUrl;
  document.body.appendChild(mapsScript);
  window.hasGoogleAutocomplete = true;
}
/**
 * Instanciates a new google autocomplete object and binds it to the given AddressAutofill instance.
 * @param {AddressAutofill} instance - Any instance of the AddressAutofill module.
 */


function initAutocomplete(instance) {
  // Create the autocomplete instance with custom options
  instance.autocomplete = new google.maps.places.Autocomplete(instance.inputElement, instance.options.googlePlacesConfig);

  if (instance.options.useBrowserGeolocation) {
    geolocate(instance.autocomplete);
  } // When the user selects an address from the dropdown, populate the address fields in the form.


  instance.autocomplete.addListener('place_changed', function () {
    return instance.setAddress();
  });
}
/**
 * Tries to get the user's geolocation using the browser's Geolocation API.
 */


function geolocate(reference) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: location,
        radius: position.coords.accuracy
      });
      reference.setBounds(circle.getBounds());
    });
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _addressAutofill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addressAutofill */ "./src/addressAutofill.js");

var init = function init(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new _addressAutofill__WEBPACK_IMPORTED_MODULE_0__["default"](context, options);
};

/***/ })

/******/ });
//# sourceMappingURL=addressAutofill.js.map