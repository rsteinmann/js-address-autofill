const merge = require('deepmerge')

/**
 * The Modules default configuration.
 */
const defaultOptions = {
  autoConstruct: false, // if set to true the module will autoconstruct and attach to window object as "addressAutofill"
  enableInputFillIn: true, // Fills out form with configured selectors on selection of google address
  useBrowserGeolocation: true, // Uses the browser's geolocation API to ask the user for her current location (makes predictions more precise)
  inputSelector: '[data-autocomplete]',
  googleScriptParams: { // This configuration will be passed to Google Places API as urlParams
    v: '3.39', // Sets google maps to a specific version
    key: 'YOUR_KEY_IS_REQUIRED_HERE', // Sets the google places api key
  },
  googlePlacesConfig: {}, // This configuration will be passed to Google Places API
  mapResult: {
    streetName: {
      use: 'long_name',
      resultType: 'route',
      targetSelector: '[name="streetName"]'
    },
    streetNumber: { 
      use: 'short_name',                    // Use from Api result 'short_name' | 'long_name'
      resultType: 'street_number',          // Name of the type from Api result
      targetSelector: '[name="streetNumber"]'  // Target element that should be filled with this information
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
}


/**
 * Stores all instances of AddressAutofill
 */
let instances = []


export default class AddressAutofill {
  constructor (context, options = {}) {
    if (typeof context !== 'object' || (!(context instanceof HTMLElement) && !(context instanceof HTMLDocument))) {
      console.error('Please choose a valid context for AddressAutofill! Given:', context)
      return null
    }
    this.context = context
    this.inputElement = this.context.querySelector('[data-autocomplete]')
    if (!(this.inputElement instanceof HTMLInputElement)) {
      console.error('Please choose a valid input field for AddressAutofill! Given:', this.inputElement)
      return null
    }
    this.options = merge(defaultOptions, options)
    this.autocomplete = null
    this.result = null
    this.instance = instances.push(this) - 1

    // Check for configs
    if (this.inputElement.getAttribute('data-autocomplete')) {
      this.options.googleScriptParams.key = this.inputElement.getAttribute('data-autocomplete')
    }

    // Check if the script is already injected
    if (!window.hasGoogleAutocomplete) {
      if (typeof window.initAutocomplete !== 'function') {
        // Creates new instance of autocomplete for each already existing AddressAutofill instance
        window.initAutocomplete = () => instances.forEach(instance => initAutocomplete(instance))
      }
      injectMapsScript(this.options.googleScriptParams)
    } else {
      initAutocomplete(this)
    }

    // Capture Enter Press
    this.inputElement.addEventListener('keydown', event => {
      if (event.keyCode == 13) {
        event.preventDefault()
        event.stopPropagation()
      }
    })

    return this
  }


  /**
   * Sets the address found by the Places API to the configured fields.
   */
  setAddress() {
    this.result = {}
    const resultMap = this.options.mapResult
    const place = this.autocomplete.getPlace()
    // Map the result data
    for (const itemName in resultMap) {
      let itemValue = null
      switch(resultMap[itemName].resultType) {
      case 'lat':
        itemValue = place.geometry.location.lat()
        break
      case 'lng':
        itemValue = place.geometry.location.lng()
        break
      default:
        var address_component = place.address_components.filter(component => component.types.includes(resultMap[itemName].resultType))
        if (address_component.length > 0) {
          itemValue = address_component[0][resultMap[itemName].use]
        }
      }
      // Optional: Fill out the form
      if (this.options.enableInputFillIn) {
        const element = this.context.querySelector(resultMap[itemName].targetSelector)
        if (!element) {
          console.warn(`AddressAutofill: Could not find in element ${resultMap[itemName].targetSelector} in DOM, please check your config!`)
        } else {
          this.result[itemName] = itemValue
          element.value = itemValue
        }
      }
    }
  }
}


/**
 * Injects Google Maps Api script to dom using params from config.
 * @param {object} params 
 */
function injectMapsScript (params = null) {
  if (typeof params !== 'object') {
    return console.error('"googleScriptParams" are required for AddressAutofill configuration!')
  }
  if (!params.key) {
    return console.error('Please add a valid API key for "AddressAutofill" to run AddressAutofill!')
  }
  let mapsUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete'
  let mapsScript = document.createElement('script')
  for (const key in params) {
    mapsUrl += `&${key}=${params[key]}`
  }
  mapsScript.src = mapsUrl
  document.body.appendChild(mapsScript)
  window.hasGoogleAutocomplete = true
}


/**
 * Instanciates a new google autocomplete object and binds it to the given AddressAutofill instance.
 * @param {AddressAutofill} instance - Any instance of the AddressAutofill module.
 */
function initAutocomplete (instance) {
  // Create the autocomplete instance with custom options
  // eslint-disable-next-line no-undef
  instance.autocomplete = new google.maps.places.Autocomplete(instance.inputElement, instance.options.googlePlacesConfig)
  // console.log('Maps Version', google.maps.version)
  if (instance.options.useBrowserGeolocation) {
    geolocate(instance.autocomplete)
  }
  // When the user selects an address from the dropdown, populate the address fields in the form.
  instance.autocomplete.addListener('place_changed', () => instance.setAddress())
}


/**
 * Tries to get the user's geolocation using the browser's Geolocation API.
 */
function geolocate(reference) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      // eslint-disable-next-line no-undef
      const circle = new google.maps.Circle({
        center: location,
        radius: position.coords.accuracy
      })
      reference.setBounds(circle.getBounds())
    })
  }
}