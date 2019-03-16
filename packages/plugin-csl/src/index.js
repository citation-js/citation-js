/**
 * @module output/csl
 */

/**
 * @callback module:output/csl~retrieveItem
 * @param {String} id - Citation id
 * @return {CSL} CSL Citation object
 */

/**
 * @callback module:output/csl~retrieveLocale
 * @param {String} lang - Language code
 * @return {String} CSL Locale
 */

import { plugins } from '@citation-js/core'

import { locales } from './locales'
import { templates } from './styles'
import engine from './engines'

import bibliography from './bibliography'
import citation from './citation'

plugins.add('@csl', {
  output: {
    bibliography,
    citation
  },
  config: {
    engine,
    locales,
    templates
  }
})
