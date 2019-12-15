import * as gMaps from './gMaps'

/**
 * The Modules default configuration.
 */
const defaultOptions = {
  autoConstruct: false, // if set to true the module will autoconstruct and attach to window object as "addressAutofill"
  enableInputFillIn: true, // Fills out form with configured selectors on selection of google address
  useBrowserGeolocation: true, // Uses the browser's geolocation API to ask the user for her current location (makes predictions more precise)
  inputSelector: '[data-autocomplete]',
  baseLocation: { lat: 51.1642292, lng: 10.4541194 }, // Sets the starting location where adresses should be searched from (default: mid of germany)
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
      targetSelector: '[name="streetNumber"]',  // Target element that should be filled with this information
      bindValue: true                           // If set to true the user input will be backwritten to maps input
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
    this.options = {...defaultOptions, ...options}
    this.hasInstantiated = false
    this.result = null
    this.services = {}
    // Add instance to gMaps
    gMaps.addInstance(this)

    return this
  }


  /**
   * Initializes the Module.
   * Gets fired as callback when google maps has finished loading.
   */
  init () {
    if (this.hasInstantiated) {
      return false
    }
    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(this.inputElement, this.options.googlePlacesConfig)
    if (this.options.useBrowserGeolocation) {
      gMaps.geolocate(this.autocomplete)
    }
    gMaps.initPlacesServices(this)
    // Capture Enter Press
    this.inputElement.addEventListener('keydown', event => {
      if (event.keyCode == 13) {
        event.preventDefault()
        event.stopPropagation()
      }
    })
    // When the user selects an address from the dropdown, fire callback
    this.autocomplete.addListener('place_changed', () => this.placeChanged())
    bindInputs (this.options.mapResult, this.context, () => this.getAddress() )
    this.hasInstantiated = true
    return this.hasInstantiated
  }


  /**
   * Callback that gets fired when a new place has been selected.
   */
  placeChanged (place) {
    place = place || this.autocomplete.getPlace()
    this.result = getMappedResults(this.options.mapResult, place)
    if (this.options.enableInputFillIn) {
      this.setAddress()
    }
  }


  /**
   * Collects the form data and sends it to google autocomplete service to get back a place.
   */
  getAddress() {
    const searchObject = { 
      ...{
        input: this.getFormValues(true),
        // eslint-disable-next-line no-undef
        sessionToken: new google.maps.places.AutocompleteSessionToken()
      }, 
      ...this.options.googlePlacesConfig
    }
    this.services.autocomplete.getPlacePredictions(searchObject,
      (predictions)=> {
        this.services.places.getDetails({ 
          placeId: predictions[0].place_id, 
          fields: ['geometry', 'address_component']
        },
        (place, status) => {
          // eslint-disable-next-line no-undef
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.placeChanged(place)
          }
        })
      })
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


  /**
   * Gets all values from form and transforms them into object or string.
   * @param {boolean} asString - if set to true it returns as string
   * @return {object|string}
   */
  getFormValues (asString = false) {
    let formValues = {
      route: '',
      street_number: '',
      postal_code: '',
      locality: '',
      country: ''
    }
    this.options.mapResult.forEach(mapping => {
      const value = this.context.querySelector(mapping.targetSelector).value
      formValues[mapping.resultType] = value
    })
    if (!asString) {
      return formValues
    } else {
      return `${formValues.route} ${formValues.street_number}, ${formValues.postal_code} ${formValues.locality}, ${formValues.country}`.trim()
    }
  }
}


/**
 * Maps the Google places results to a given structure.
 * @param {Array} mappings - An Array that contains objects with use, resultsType, targetSelector properties
 * @param {Object} place - The GooglePlaces result place object.
 */
function getMappedResults(mappings, place) {
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


/**
 * Binds to all input fields that are configured in mappings.
 * @param {Array} mappings - An Array that contains objects with use, resultsType, targetSelector properties
 * @param {HTMLElement} context - Context in which the input fields are searched
 * @param {Function} callback - Callback that gets fired
 */
function bindInputs (mappings, context, callback) {
  mappings.forEach(mapping => {
    if (mapping.bindValue && mapping.bindValue === true) {
      context
        .querySelector(mapping.targetSelector)
        .addEventListener('keyup', event => callback(event))
    }
  })
}
