
const defaultOptions = {
  enableInputFillIn: true, // Fills out form with configured selectors on selection of google address
  inputSelector: '[data-autocomplete]',
  googleScriptParams: {
    key: 'AIzaSyBDTdKd1_rCVcZhGzSaAMqYY7LDy9YaLl8',
    callback: 'initAutocomplete',
    language: 'de'
  },
  googlePlacesConfig: {
    types: ['address'],
    componentRestrictions: {country: 'de'}
  },
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


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.

export default class GoogleAutocomplete {
  constructor (options = {}) {
    this.options = {...defaultOptions, ...options}
    this.inputElement = document.querySelector('[data-autocomplete]')
    this.autocomplete = null
    this.result = null
    window.initAutocomplete = () => {
      // Create the autocomplete instance with custom options
      this.autocomplete = new google.maps.places.Autocomplete(this.inputElement, this.options.googlePlacesConfig)
      this.geolocate()
      // When the user selects an address from the dropdown, populate the address fields in the form.
      this.autocomplete.addListener('place_changed', () => this.setAddress())
    }
    injectMapsScript(this.options.googleScriptParams) // Injects Google Api Script
    return this
  }


  setAddress() {
    this.result = {}
    const resultMap = this.options.mapResult
    const place = this.autocomplete.getPlace()
    console.log('Place', place)

    // Map the result data
    for (const itemName in resultMap) {
      const itemValue = null
      switch(resultMap[itemName].resultType) {
        case 'lat':
          itemValue = place.geometry.location.lat()
          break
        case 'lng':
          itemValue = place.geometry.location.lng()
          break
        default:
          itemValue = place.address_components.filter(component => {
            // TODO: Fix error on empty entries like street number, etc...
            return component.types.includes(resultMap[itemName].resultType)
          })[0][resultMap[itemName].use]
      }
      // Optional: Fill out the form
      if (this.options.enableInputFillIn) {
        const element = document.querySelector(resultMap[itemName].targetSelector)
        if (!element) {
          console.warn(`GoogleAutocomplete: Could not find in element ${resultMap[itemName].targetSelector} in DOM, please check your config!`)
        } else {
          this.result[itemName] = itemValue
          element.value = itemValue
        }
      }
    }
    console.log ('Result', this.result)
    
  }


  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        })
        console.log('I found your location!', geolocation, circle)
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }
}


/**
 * Injects Google Maps Api script to dom using params from config.
 * @param {object} params 
 */
function injectMapsScript (params = null) {
  if (typeof params !== 'object') {
    return console.error('"googleScriptParams" are required for GoogleAutocomplete configuration!')
  }
  if (!params.key) {
    return console.error('Please add a valid API key for "googleScriptParams.key" to run GoogleAutocomplete!')
  }
  let mapsUrl = "https://maps.googleapis.com/maps/api/js?libraries=places"
  let mapsScript = document.createElement("script")
  for (const key in params) {
    mapsUrl += `&${key}=${params[key]}`
  }
  mapsScript.src = mapsUrl
  document.body.appendChild(mapsScript)
}