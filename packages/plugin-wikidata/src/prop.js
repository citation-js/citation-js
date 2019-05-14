/**
 * @module input/wikidata
 */

import { logger } from '@citation-js/core'
import { parse as parseNameString } from '@citation-js/name'
import { parse as parseDate } from '@citation-js/date'

/**
 * CSL mappings for Wikidata fields.
 * @constant propMap
 * @property {Object} props
 * @property {Object} ignoredProps - known common props without CSL mapping
 */
import { props, ignoredProps } from './props'

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
 * @access private
 * @param {String} name
 * @param {Object} qualifiers
 *
 * @return {Object} CSL name object
 */
const parseName = (name, qualifiers) => {
  return name
}

/**
 * Get the names of objects
 *
 * @access private
 * @param {Array<Object>} values
 * @param {Array<String>} names
 * @param {Array<Object>} fetched
 * @param {Array<String>} langs
 *
 * @return {Array<String>} Array with labels of each prop
 */
const parseNames = (values, langs) => {
  return values.map(({ value, qualifiers }) => {
    let [name] = getStatedAs(qualifiers)
    if (!name) {
      name = typeof value === 'string' ? value : getLabel(value, langs)
    }
    name = name ? parseNameString(name) : { literal: name }
    name._ordinal = getSeriesOrdinal(qualifiers)
    return name
  })
}

/**
 * Transform property and value from Wikidata format to CSL.
 *
 * Returns additional _ordinal property on authors.
 *
 * @access protected
 *
 * @param {String} prop
 * @param {Array} values
 * @param {Array<String>} langs
 *
 * @return {String|Array<Object>} CSL value
 */
export function parseProp (prop, values, langs) {
  const value = values[0].value

  switch (prop) {
    case 'P31':
      return parseType(value)

    case 'P50':
    case 'P57':
    case 'P86':
    case 'P98':
    case 'P110':
    case 'P655':
    case 'P2093':
      return parseNames(values, langs)

    case 'P577':
      return parseDate(value)

    case 'P123':
    case 'P136':
    case 'P291':
    case 'P1433':
      return getLabel(value, langs)

    default:
      return value
  }
}

/**
 * @access protected
 * @param {String} prop
 * @return {String} CSL prop
 */
export function parsePropName (prop) {
  if (prop in ignoredProps) {
    return undefined
  } else if (!props[prop]) {
    logger.unmapped('[plugin-wikidata]', 'property', prop)
    return undefined
  }

  return props[prop]
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

  const lang = langs.find(lang => entity.labels[lang])
  return entity.labels[lang]
}

export {
  parseProp as parse,
  parseProp as default
}
