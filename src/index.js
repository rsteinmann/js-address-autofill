import * as gMaps from './gMaps'
import AddressAutofill from './addressAutofill'

export const instances = []

export const injectMaps = (mapsParams) => gMaps.injectMapsScript(mapsParams)


export const init = (context, options = {}) => {
  const instance = new AddressAutofill(context, options)
  instances.push(instance)
  return instance
}


/**
 * IIFE defines window.initAutocomplete callback and maps it to gMaps
 */
(() => {
  if (typeof window.initAutocomplete === 'undefined') {
    window.initAutocomplete = () => gMaps.initAutocomplete()
  }
})()