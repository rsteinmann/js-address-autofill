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

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./src/addressAutofill.js":
/*!********************************!*\
  !*** ./src/addressAutofill.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddressAutofill; });
/* harmony import */ var _gMaps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gMaps */ "./src/gMaps.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_1__);
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
  baseLocation: {
    lat: 51.1642292,
    lng: 10.4541194
  },
  // Sets the starting location where adresses should be searched from (default: mid of germany)
  googlePlacesConfig: {},
  // This configuration will be passed to Google Places API
  mapResult: [{
    use: 'long_name',
    resultType: 'route',
    targetSelector: '[name="streetName"]'
  }, {
    use: 'short_name',
    // Use from Api result 'short_name' | 'long_name'
    resultType: 'street_number',
    // Name of the type from Api result
    targetSelector: '[name="streetNumber"]',
    // Target element that should be filled with this information
    bindValue: true // If set to true the user input will be backwritten to maps input

  }, {
    use: 'long_name',
    resultType: 'locality',
    targetSelector: '[name="city"]'
  }, {
    use: 'long_name',
    resultType: 'country',
    targetSelector: '[name="country"]'
  }, {
    use: 'short_name',
    resultType: 'postal_code',
    targetSelector: '[name="postalCode"]'
  }, {
    use: 'geo',
    resultType: 'lat',
    targetSelector: '[name="lat"]'
  }, {
    use: 'geo',
    resultType: 'lng',
    targetSelector: '[name="lng"]'
  }]
};

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

    this.options = deepmerge__WEBPACK_IMPORTED_MODULE_1__(defaultOptions, options);
    this.hasInstantiated = false;
    this.result = null;
    this.services = {}; // Override Api Key Config

    if (this.inputElement.getAttribute('data-autocomplete')) {
      this.options.googleScriptParams.key = this.inputElement.getAttribute('data-autocomplete');
    } // Add instance to gMaps


    _gMaps__WEBPACK_IMPORTED_MODULE_0__["addInstance"](this);
    return this;
  }
  /**
   * Initializes the Module.
   * Gets fired as callback when google maps has finished loading.
   */


  _createClass(AddressAutofill, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.hasInstantiated) {
        return false;
      }

      console.log('init', this); // eslint-disable-next-line no-undef

      this.autocomplete = new google.maps.places.Autocomplete(this.inputElement, this.options.googlePlacesConfig);

      if (this.options.useBrowserGeolocation) {
        _gMaps__WEBPACK_IMPORTED_MODULE_0__["geolocate"](this.autocomplete);
      }

      _gMaps__WEBPACK_IMPORTED_MODULE_0__["initPlacesServices"](this); // Capture Enter Press

      this.inputElement.addEventListener('keydown', function (event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          event.stopPropagation();
        }
      }); // When the user selects an address from the dropdown, fire callback

      this.autocomplete.addListener('place_changed', function () {
        return _this.placeChanged();
      });
      bindInputs(this.options.mapResult, this.context, function () {
        return _this.getAddress();
      });
      this.hasInstantiated = true;
      return this.hasInstantiated;
    }
    /**
     * Callback that gets fired when a new place has been selected.
     */

  }, {
    key: "placeChanged",
    value: function placeChanged(place) {
      place = place || this.autocomplete.getPlace();
      this.result = getMappedResults(this.options.mapResult, place);

      if (this.options.enableInputFillIn) {
        this.setAddress();
      }
    }
    /**
     * Collects the form data and sends it to google autocomplete service to get back a place.
     */

  }, {
    key: "getAddress",
    value: function getAddress() {
      var _this2 = this;

      var searchObject = _objectSpread({}, {
        input: this.getFormValues(true),
        // eslint-disable-next-line no-undef
        sessionToken: new google.maps.places.AutocompleteSessionToken()
      }, {}, this.options.googlePlacesConfig);

      this.services.autocomplete.getPlacePredictions(searchObject, function (predictions) {
        _this2.services.places.getDetails({
          placeId: predictions[0].place_id,
          fields: ['geometry', 'address_component']
        }, function (place, status) {
          // eslint-disable-next-line no-undef
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            _this2.placeChanged(place);
          }
        });
      });
    }
    /**
     * Sets the address found by the Places API to the configured fields.
     */

  }, {
    key: "setAddress",
    value: function setAddress() {
      var _this3 = this;

      this.result.forEach(function (resultItem) {
        var element = _this3.context.querySelector(resultItem.target);

        if (!element) {
          console.warn("AddressAutofill: Could not find in element ".concat(resultItem.target, " in DOM, please check your config!"));
        } else {
          element.value = resultItem.value;
        }
      });
    }
    /**
     * Gets all values from form and transforms them into object or string.
     * @param {boolean} asString - if set to true it returns as string
     * @return {object|string}
     */

  }, {
    key: "getFormValues",
    value: function getFormValues() {
      var _this4 = this;

      var asString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var formValues = {
        route: '',
        street_number: '',
        postal_code: '',
        locality: '',
        country: ''
      };
      this.options.mapResult.forEach(function (mapping) {
        var value = _this4.context.querySelector(mapping.targetSelector).value;

        formValues[mapping.resultType] = value;
      });

      if (!asString) {
        return formValues;
      } else {
        return "".concat(formValues.route, " ").concat(formValues.street_number, ", ").concat(formValues.postal_code, " ").concat(formValues.locality, ", ").concat(formValues.country).trim();
      }
    }
  }]);

  return AddressAutofill;
}();
/**
 * Maps the Google places results to a given structure.
 * @param {Array} mappings - An Array that contains objects with use, resultsType, targetSelector properties
 * @param {Object} place - The GooglePlaces result place object.
 */




function getMappedResults(mappings, place) {
  var results = []; // Map the result data

  mappings.forEach(function (mapItem) {
    var itemValue;

    if (mapItem.resultType === 'lat') {
      itemValue = place.geometry.location.lat();
    } else if (mapItem.resultType === 'lng') {
      itemValue = place.geometry.location.lng();
    } else {
      var address_component = place.address_components.filter(function (component) {
        return component.types.includes(mapItem.resultType);
      });

      if (address_component.length > 0) {
        itemValue = address_component[0][mapItem.use];
      } else {
        itemValue = '';
      }
    }

    results.push({
      target: mapItem.targetSelector,
      value: itemValue
    });
  });
  return results;
}
/**
 * Binds to all input fields that are configured in mappings.
 * @param {Array} mappings - An Array that contains objects with use, resultsType, targetSelector properties
 * @param {HTMLElement} context - Context in which the input fields are searched
 * @param {Function} callback - Callback that gets fired
 */


function bindInputs(mappings, context, callback) {
  mappings.forEach(function (mapping) {
    if (mapping.bindValue && mapping.bindValue === true) {
      context.querySelector(mapping.targetSelector).addEventListener('keyup', function (event) {
        return callback(event);
      });
    }
  });
}

/***/ }),

/***/ "./src/gMaps.js":
/*!**********************!*\
  !*** ./src/gMaps.js ***!
  \**********************/
/*! exports provided: addInstance, getMapsUrl, injectMapsScript, injectMapContainer, initAutocomplete, initPlacesServices, geolocate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addInstance", function() { return addInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMapsUrl", function() { return getMapsUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectMapsScript", function() { return injectMapsScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectMapContainer", function() { return injectMapContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAutocomplete", function() { return initAutocomplete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPlacesServices", function() { return initPlacesServices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geolocate", function() { return geolocate; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 *  This configuration will be passed to Google Places API as urlParams.
 */
var defaultMapsParams = {
  v: '3.39',
  // Sets google maps to a specific version
  key: 'YOUR_KEY_IS_REQUIRED_HERE' // Sets the google places api key

};
/**
 * A state that tells if the Google Maps Api Script has been injected to dom already.
 */

var isMapsScriptInjected = false;
/**
 * A state that tells if the Google Maps Api Script has been loaded already.
 */

var isMapsScriptLoaded = false;
/**
 * 
 */

var addressAutofillInstances = [];
/**
 * Adds a new instance to storage.
 * @param {AddressAutocomplete} instance - An instance of AddressAutocomplete.
 */

function addInstance(instance) {
  if (isMapsScriptLoaded) {
    instance.init();
  } else {
    addressAutofillInstances.push(instance);
  }
}
/**
 * Generates a valid Google Places Api Url to fetch the script from.
 * @param {Object} mapsParams - Url-params stored as an object.
 */

function getMapsUrl(mapsParams) {
  if (_typeof(mapsParams) !== 'object') {
    return console.error('injectMapsScript: "params" should be passed as object!');
  }

  if (!mapsParams.key) {
    return console.error('Please add a valid API key for Google Places to use the service!');
  }

  mapsParams = _objectSpread({}, defaultMapsParams, {}, mapsParams);
  console.log('mapsParams', mapsParams);
  var mapsUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete';

  for (var key in mapsParams) {
    mapsUrl += "&".concat(key, "=").concat(mapsParams[key]);
  }

  return mapsUrl;
}
/**
 * Injects Google Maps Api script to dom once.
 * @param {String} mapsUrl - Url-params stored as an object.
 */

function injectMapsScript(mapsParams) {
  if (isMapsScriptInjected) {
    return false;
  }

  var mapsScript = document.createElement('script');
  mapsScript.src = getMapsUrl(mapsParams);
  document.body.appendChild(mapsScript);
  isMapsScriptInjected = true;
}
/**
 * Creates and injects an invisible google maps container to passed context.
 * @param {HTMLElement} context - The context in which the container is injected
 */

function injectMapContainer() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
  var mapsContainer = document.createElement('div');
  mapsContainer.id = 'mapsContainer';
  mapsContainer.style.display = 'none';
  context.appendChild(mapsContainer);
  return mapsContainer;
}
/**
 * Callback that creates an autocomplete instance to each stored instance.
 */

function initAutocomplete() {
  console.log('initAutocomplete => fired!', 'addressAutofillInstances', addressAutofillInstances);
  isMapsScriptLoaded = true;
  addressAutofillInstances.forEach(function (instance) {
    instance.init();
  });
}
/**
 * Instantitates several google api services required to request addresses programatically.
 * @param {AddressAutofill} instance - Any instance of AddressAutofill
 */

function initPlacesServices(instance) {
  var mapsContainer = injectMapContainer(instance.context); // eslint-disable-next-line no-undef

  var baseLocation = new google.maps.LatLng(instance.options.baseLocation.lat, instance.options.baseLocation.lng); // eslint-disable-next-line no-undef

  instance.services.autocomplete = new google.maps.places.AutocompleteService(); // eslint-disable-next-line no-undef

  instance.services.maps = new google.maps.Map(mapsContainer, {
    center: baseLocation,
    zoom: 15
  }); // eslint-disable-next-line no-undef

  instance.services.places = new google.maps.places.PlacesService(instance.services.maps);
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
      }; // eslint-disable-next-line no-undef

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
/*! exports provided: instances, injectMaps, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instances", function() { return instances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectMaps", function() { return injectMaps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _gMaps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gMaps */ "./src/gMaps.js");
/* harmony import */ var _addressAutofill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addressAutofill */ "./src/addressAutofill.js");


var instances = [];
var injectMaps = function injectMaps(mapsParams) {
  return _gMaps__WEBPACK_IMPORTED_MODULE_0__["injectMapsScript"](mapsParams);
};
var init = function init(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var instance = new _addressAutofill__WEBPACK_IMPORTED_MODULE_1__["default"](context, options);
  instances.push(instance);
  return instance;
};
/**
 * IIFE defines window.initAutocomplete callback and maps it to gMaps
 */

(function () {
  if (typeof window.initAutocomplete === 'undefined') {
    window.initAutocomplete = function () {
      return _gMaps__WEBPACK_IMPORTED_MODULE_0__["initAutocomplete"]();
    };
  }
})();

/***/ })

/******/ });
//# sourceMappingURL=addressAutofill.js.map