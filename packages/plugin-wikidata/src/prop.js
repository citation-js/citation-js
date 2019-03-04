/**
 * @module input/wikidata
 */

import {simplify} from 'wikidata-sdk'
import {util} from '@citation-js/core'
import {parse as parseNameString} from '@citation-js/name'
import {parse as parseDate} from '@citation-js/date'

import getUrls from './list'

/**
 * CSL mappings for Wikidata fields.
 * @constant propMap
 * @property {Object} props
 * @property {Object} ignoredProps - known common props without CSL mapping
 */
import {props, ignoredProps} from './props'

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
const getSeriesOrdinal = ({P1545}) => P1545 ? parseInt(P1545[0]) : -1

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
 * Get the labels of objects
 *
 * @access private
 * @param {Object} entity - Wikidata API response
 * @param {String} lang - Language
 *
 * @return {String} label
 */
const getLabel = ({labels}, lang) => labels[lang]

/**
 * @access private
 * @param {String} name
 * @param {Object} qualifiers
 *
 * @return {Object} CSL name object
 */
const parseName = (name, qualifiers) => {
  name = parseNameString(name)
  name._ordinal = getSeriesOrdinal(qualifiers)
  return name
}

/**
 * Get the names of objects
 *
 * @access private
 * @param {Object} values
 * @param {String} lang
 *
 * @return {Array<String>} Array with labels of each prop
 */
const getNameUrls = (values, lang) => {
  const toFetch = values
    .filter(({qualifiers}) => !getStatedAs(qualifiers).length)
    .map(({value}) => value)
  return getUrls(toFetch, lang)
}

/**
 * Get the names of objects
 *
 * @access private
 * @param {Array<Object>} values
 * @param {Array<String>} names
 * @param {Array<Object>} fetched
 * @param {String} lang
 *
 * @return {Array<String>} Array with labels of each prop
 */
const parseNames = (values, fetched, lang) => {
  return values.map(({value, qualifiers}) => {
    const [name] = getStatedAs(qualifiers)
    return parseName(name || getLabel(fetched[value], lang), qualifiers)
  })
}

/**
 * @access private
 * @param {Array<Object>} responses
 * @return {Object} single response
 */
const mergeApi = responses => Object.assign({}, ...responses)

/**
 * @access private
 * @param {Array<String>} urls
 * @return {Object} response
 */
const fetchApi = urls => mergeApi(urls.map(url =>
  simplify.entities(JSON.parse(util.fetchFile(url)).entities)
))

/**
 * @access private
 * @param {Array<String>} urls
 * @return {Object} response
 */
const fetchApiAsync = async urls => mergeApi(Promise.all(urls.map(async url =>
  simplify.entities(JSON.parse(await util.fetchFileAsync(url)).entities)
)))

/**
 * Transform property and value from Wikidata format to CSL.
 *
 * Returns additional _ordinal property on authors.
 *
 * @access protected
 *
 * @param {String} prop
 * @param {Array} values
 * @param {String} [lang]
 *
 * @return {String|Array<Object>} CSL value
 */
export function parseProp (prop, values, lang) {
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
      return parseNames(values, fetchApi(getNameUrls(values, lang)), lang)

    case 'P2093':
      return values.map(({value, qualifiers}) => parseName(value, qualifiers))

    case 'P577':
      return parseDate(value)

    case 'P123':
    case 'P136':
    case 'P291':
    case 'P1433':
      return getLabel(fetchApi(getUrls(value))[value], lang)

    default:
      return value
  }
}

/**
 * Transform property and value from Wikidata format to CSL (async).
 *
 * Returns additional _ordinal property on authors.
 *
 * @access protected
 *
 * @param {String} prop
 * @param {Array} values
 * @param {String} [lang]
 *
 * @return {Promise<String|Array<Object>>} Array with new prop and value
 */
export async function parsePropAsync (prop, values, lang) {
  const value = values[0].value

  switch (prop) {
    case 'P50':
    case 'P57':
    case 'P86':
    case 'P98':
    case 'P110':
    case 'P655':
      return parseNames(values, await fetchApiAsync(getNameUrls(values, lang)), lang)

    case 'P123':
    case 'P136':
    case 'P291':
    case 'P1433':
      return getLabel(await fetchApiAsync(getUrls(values, lang))[value], lang)

    default:
      return parseProp(prop, value, lang)
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
    logger.info('[plugin-wikidata]', `Unmapped property: ${prop}`)
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
    logger.warn('[plugin-wikidata]', `Unmapped entry type: ${type}`)
    return 'book'
  }

  return types[type]
}

export {
  parseProp as parse,
  parsePropAsync as parseAsync,
  parseProp as default
}
