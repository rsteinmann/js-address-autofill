/**
 *  This configuration will be passed to Google Places API as urlParams.
 */
const defaultMapsParams = {
  v: '3.39', // Sets google maps to a specific version
  key: 'YOUR_KEY_IS_REQUIRED_HERE', // Sets the google places api key
}


/**
 * A state that tells if the Google Maps Api Script has been injected to dom already.
 */
let isMapsScriptInjected = false


/**
 * A state that tells if the Google Maps Api Script has been loaded already.
 */
let isMapsScriptLoaded = false


/**
 * 
 */
let addressAutofillInstances = []


/**
 * Adds a new instance to storage.
 * @param {AddressAutocomplete} instance - An instance of AddressAutocomplete.
 */
export function addInstance (instance) {
  if (isMapsScriptLoaded) {
    instance.init()
  } else {
    addressAutofillInstances.push(instance)
  }
}


/**
 * Generates a valid Google Places Api Url to fetch the script from.
 * @param {Object} mapsParams - Url-params stored as an object.
 */
export function getMapsUrl(mapsParams) {
  if (typeof mapsParams !== 'object') {
    return console.error('injectMapsScript: "params" should be passed as object!')
  }
  if (!mapsParams.key) {
    return console.error('Please add a valid API key for Google Places to use the service!')
  }
  mapsParams = {...defaultMapsParams, ...mapsParams}
  console.log('mapsParams', mapsParams)
  let mapsUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete'
  for (const key in mapsParams) {
    mapsUrl += `&${key}=${mapsParams[key]}`
  }
  return mapsUrl
}


/**
 * Injects Google Maps Api script to dom once.
 * @param {String} mapsUrl - Url-params stored as an object.
 */
export function injectMapsScript (mapsParams) {
  if (isMapsScriptInjected) {
    return false
  }
  let mapsScript = document.createElement('script')
  mapsScript.src = getMapsUrl(mapsParams)
  document.body.appendChild(mapsScript)
  isMapsScriptInjected = true
}


/**
 * Creates and injects an invisible google maps container to passed context.
 * @param {HTMLElement} context - The context in which the container is injected
 */
export function injectMapContainer (context = document.body) {
  let mapsContainer = document.createElement('div')
  mapsContainer.id = 'mapsContainer'
  mapsContainer.style.display = 'none'
  context.appendChild(mapsContainer)
  return mapsContainer
}


/**
 * Callback that creates an autocomplete instance to each stored instance.
 */
export function initAutocomplete () {
  console.log('initAutocomplete => fired!', 'addressAutofillInstances', addressAutofillInstances)
  isMapsScriptLoaded = true
  addressAutofillInstances.forEach(instance => {
    instance.init()
  })
}


/**
 * Instantitates several google api services required to request addresses programatically.
 * @param {AddressAutofill} instance - Any instance of AddressAutofill
 */
export function initPlacesServices (instance) {
  let mapsContainer = injectMapContainer(instance.context)
  // eslint-disable-next-line no-undef
  const baseLocation = new google.maps.LatLng(instance.options.baseLocation.lat, instance.options.baseLocation.lng)
  // eslint-disable-next-line no-undef
  instance.services.autocomplete = new google.maps.places.AutocompleteService()
  // eslint-disable-next-line no-undef
  instance.services.maps = new google.maps.Map(mapsContainer, { center: baseLocation, zoom: 15 })
  // eslint-disable-next-line no-undef
  instance.services.places = new google.maps.places.PlacesService(instance.services.maps)
}


/**
 * Tries to get the user's geolocation using the browser's Geolocation API.
 */
export function geolocate(reference) {
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