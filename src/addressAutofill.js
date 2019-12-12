import * as gMaps from './gMaps'
import * as deepmerge from 'deepmerge'

/**
 * The Modules default configuration.
 */
const defaultOptions = {
  autoConstruct: false, // if set to true the module will autoconstruct and attach to window object as "addressAutofill"
  enableInputFillIn: true, // Fills out form with configured selectors on selection of google address
  useBrowserGeolocation: true, // Uses the browser's geolocation API to ask the user for her current location (makes predictions more precise)
  inputSelector: '[data-autocomplete]',
  googlePlacesConfig: {}, // This configuration will be passed to Google Places API
  mapResult: [
    {
      use: 'long_name',
      resultType: 'route',
      targetSelector: '[name="streetName"]'
    },
    {
      use: 'short_name',                        // Use from Api result 'short_name' | 'long_name'
      resultType: 'street_number',              // Name of the type from Api result
      targetSelector: '[name="streetNumber"]'   // Target element that should be filled with this information
    },
    {
      use: 'long_name',
      resultType: 'locality',
      targetSelector: '[name="city"]'
    },
    {
      use: 'long_name',
      resultType: 'country',
      targetSelector: '[name="country"]'
    },
    {
      use: 'short_name',
      resultType: 'postal_code',
      targetSelector: '[name="postalCode"]'
    },
    {
      use: 'geo',
      resultType: 'lat',
      targetSelector: '[name="lat"]'
    },
    {
      use: 'geo',
      resultType: 'lng',
      targetSelector: '[name="lng"]'
    }
  ]
}


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
    this.options = deepmerge(defaultOptions, options)
    this.result = null
    this.hasInstantiated = false
    // Override Api Key Config
    if (this.inputElement.getAttribute('data-autocomplete')) {
      this.options.googleScriptParams.key = this.inputElement.getAttribute('data-autocomplete')
    }
    // Add instance to gMaps
    gMaps.addInstance(this)

    return this
  }


  init () {
    if (this.hasInstantiated) {
      return false
    }
    console.log('init', this)
    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(this.inputElement, this.options.googlePlacesConfig)
    if (this.options.useBrowserGeolocation) {
      gMaps.geolocate(this.autocomplete)
    }
    // Capture Enter Press
    this.inputElement.addEventListener('keydown', event => {
      if (event.keyCode == 13) {
        event.preventDefault()
        event.stopPropagation()
      }
    })
    // When the user selects an address from the dropdown, fire callback
    this.autocomplete.addListener('place_changed', () => this.placeChanged())
    this.hasInstantiated = true
    return this.hasInstantiated
  }


  placeChanged () {
    this.result = getMappedResults(this.options.mapResult, this.autocomplete.getPlace())
    console.log('place has changed', this.result)
    if (this.options.enableInputFillIn) {
      this.setAddress()
    }
  }


  /**
   * Sets the address found by the Places API to the configured fields.
   */
  setAddress() {
    this.result.forEach(resultItem => {
      const element = this.context.querySelector(resultItem.target)
      if (!element) {
        console.warn(`AddressAutofill: Could not find in element ${resultItem.target} in DOM, please check your config!`)
      } else {
        element.value = resultItem.value
      }
    })
  }
}


/**
 * Maps the Google places results to a given structure.
 * @param {Array} mappings - An Array that contains objects with use, resultsType, targetSelector properties
 * @param {Object} place - The GooglePlaces result place object.
 */
function getMappedResults(mappings, place) {
  console.log('place', place)
  let results = []
  // Map the result data
  mappings.forEach(mapItem => {
    let itemValue

    if (mapItem.resultType === 'lat') {
      itemValue = place.geometry.location.lat()
    }
    else if (mapItem.resultType === 'lng') {
      itemValue = place.geometry.location.lng()
    }
    else {
      var address_component = place.address_components.filter(component => component.types.includes(mapItem.resultType))
      console.log('resultType', mapItem.resultType, address_component)
      if (address_component.length > 0) {
        itemValue = address_component[0][mapItem.use]
      } else {
        itemValue = ''
      }
    }
    results.push({
      target: mapItem.targetSelector,
      value: itemValue
    })
  })
  return results
}
