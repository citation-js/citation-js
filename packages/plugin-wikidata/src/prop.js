/**
 * @module input/wikidata
 */

import { logger } from '@citation-js/core'
import { parse as parseNameString } from '@citation-js/name'
import { parse as parseDate } from '@citation-js/date'

import config from './config'

/**
 * CSL mappings for Wikidata instances.
 * @constant types
 */
import types from './types'

/**
 * Get series ordinal from qualifiers object
 *
 * @access private
 * @param {Object} qualifiers - qualifiers
 * @return {Number} series ordinal or -1
 */
const getSeriesOrdinal = ({ P1545 }) => P1545 ? parseInt(P1545[0]) : -1

/**
 * Some name fields have, in addition to a Wikidata ID, a qualifier stating
 * how the name is actually represented. That's what we want to cite.
 *
 * @access private
 * @param {Object} qualifiers
 * @return {Array<String>} names
 */
const getStatedAs = qualifiers => [].concat(...[
  qualifiers.P1932,
  qualifiers.P1810
].filter(Boolean))

/**
 * Get a single name
 *
 * @access private
 * @param {Object} claim - name claim
 * @return {Object} Name object
 */
const parseName = ({ value, qualifiers }) => {
  let [name] = getStatedAs(qualifiers)
  if (!name) {
    name = typeof value === 'string' ? value : getLabel(value)
  }
  name = name ? parseNameString(name) : { literal: name }
  name._ordinal = getSeriesOrdinal(qualifiers)
  return name
}

/**
 * Get names
 *
 * @access private
 * @param {Array<Object>} values
 *
 * @return {Array<Object>} Array with name objects
 */
const parseNames = (values) => {
  return values
    .map(parseName)
    .sort((a, b) => a._ordinal - b._ordinal)
}

/**
 * Transform property and value from Wikidata format to CSL.
 *
 * Returns additional _ordinal property on authors.
 *
 * @access protected
 *
 * @param {String} prop
 * @param {Array|String} values
 * @param {Object} entity
 *
 * @return {String|Array<Object>} CSL value
 */
export function parseProp (prop, value, entity) {
  switch (prop) {
    case 'type':
      return parseType(value)

    case 'author':
    case 'director':
    case 'composer':
    case 'editor':
    case 'illustrator':
    case 'translator':
      return parseNames(value)

    case 'issued':
      return parseDate(value)

    case 'container-title':
    case 'genre':
    case 'publisher':
    case 'publisher-place':
      return getLabel(value)

    default:
      return value
  }
}

/**
 * @access protected
 * @param {String} type - P31 Wikidata ID value
 * @return {String} CSL type
 */
export function parseType (type) {
  if (!types[type]) {
    logger.unmapped('[plugin-wikidata]', 'publication type', type)
    return 'book'
  }

  return types[type]
}

/**
 * Get the labels of objects
 *
 * @param {Object} entity - Wikidata API response
 * @param {Array<String>} langs
 *
 * @return {String} label
 */
export function getLabel (entity, langs) {
  if (!entity) {
    return undefined
  }

  const lang = config.langs.find(lang => entity.labels[lang])
  return entity.labels[lang]
}

export {
  parseProp as parse,
  parseProp as default
}
