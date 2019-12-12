import * as gMaps from './gMaps'
import AddressAutofill from './addressAutofill'

export const injectMaps = (mapsParams) => gMaps.injectMapsScript(mapsParams)


export const init = (context, options = {}) => {
  return new AddressAutofill(context, options)
}


/**
 * IIFE defines window.initAutocomplete callback and maps it to gMaps
 */
(() => {
  console.log('iife fired')
  if (typeof window.initAutocomplete === 'undefined') {
    window.initAutocomplete = () => gMaps.initAutocomplete()
  }
})()