/**
 * @module input/wikidata
 */

/**
 * Object containing a list of Wikidata Instances and it's corresponding name as specified by the docs
 *
 * @access private
 * @constant varWikidataTypes
 * @default
 */
import types from './types'

/**
 * Get CSL type from Wikidata type (P31)
 *
 * @access protected
 * @method fetchWikidataType
 *
 * @param {String} value - Input P31 Wikidata ID
 *
 * @return {String} Output CSL type
 */
const fetchWikidataType = value => types[value]

export {
  fetchWikidataType as parse,
  fetchWikidataType as default
}
