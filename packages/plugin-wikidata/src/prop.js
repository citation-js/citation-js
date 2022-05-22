import { logger } from '@citation-js/core'
import { parse as parseNameString } from '@citation-js/name'
import { parse as parseDate } from '@citation-js/date'

import config from './config.json'

/**
 * CSL mappings for Wikidata instances.
 * @access private
 * @constant types
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 */
import types from './types.json'

/**
 * Get series ordinal from qualifiers object
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Object} qualifiers
 * @return {Number} series ordinal or -1
 */
function getSeriesOrdinal ({ P1545 }) {
  return P1545 ? parseInt(P1545[0]) : null
}

/**
 * Some name fields have, in addition to a Wikidata ID, a qualifier stating
 * how the name is actually represented. That's what we want to cite.
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Object} qualifiers
 * @return {Array<String>} names
 */
function getStatedAs (qualifiers) {
  return [].concat(...[
    qualifiers.P1932,
    qualifiers.P1810
  ].filter(Boolean))
}

/**
 * Get a single name
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Object} claim - name claim
 * @return {Object} Name object
 */
function parseName ({ value, qualifiers }) {
  let [name] = getStatedAs(qualifiers)
  if (!name) {
    name = typeof value === 'string' ? value : getLabel(value)
  }
  name = name ? parseNameString(name) : { literal: name }
  const ordinal = getSeriesOrdinal(qualifiers)
  if (ordinal !== null) {
    name._ordinal = ordinal
  }
  return name
}

/**
 * Get names
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Array<Object>} values
 * @return {Array<Object>} Array with name objects
 */
function parseNames (values) {
  return values
    .map(parseName)
    .sort((a, b) => a._ordinal - b._ordinal)
}

/**
 * Get place name from (publisher) entity.
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Object} value
 * @return {String} Place name + country
 */
function getPlace (value) {
  const country = value.claims.P17[0].value
  // only short names that are not an instance of (P31) emoji flag seqs. (Q28840786)
  const shortNames = country.claims.P1813.filter(({ qualifiers: { P31 } }) => !P31 || P31[0] !== 'Q28840786')
  return getLabel(value) + ', ' + (shortNames[0] || country.claims.P1448[0]).value
}

/**
 * Get title either from explicit statement or from label.
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Object} value
 * @return {String} Title
 */
function getTitle (value) {
  return value.claims.P1476
    ? value.claims.P1476[0].value
    : getLabel(value)
}

/**
 * Turn array of entities into comma-separated list of labels.
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Array<Object>} values
 * @return {String} Labels
 */
function parseKeywords (values) {
  return values
    .map(({ value }) => getLabel(value))
    .join(',')
}

/**
 * Get date parts from multiple statements.
 *
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Array<Object>} values
 * @return {Array<Array<Number>>} Array of date-parts
 */
function parseDateRange (dates) {
  return {
    'date-parts': dates
      .map(date => parseDate(date.value))
      .filter(date => date && date['date-parts'])
      .map(date => date['date-parts'][0])
  }
}

/**
 * Transform property and value from Wikidata format to CSL.
 *
 * Returns additional _ordinal property on authors.
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
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
    case 'chair':
    case 'curator':
    case 'container-author':
    case 'collection-editor':
    case 'composer':
    case 'director':
    case 'editor':
    case 'executive-producer':
    case 'guest':
    case 'host':
    case 'illustrator':
    case 'narrator':
    case 'organizer':
    case 'original-author':
    case 'performer':
    case 'producer':
    case 'recipient':
    case 'reviewed-author':
    case 'script-writer':
    case 'translator':
      return parseNames(value)

    case 'issued':
    case 'original-date':
      return parseDate(value)

    case 'event-date':
      return parseDateRange(value)

    case 'keyword':
      return parseKeywords(value)

    case 'container-title':
    case 'collection-title':
    case 'event-title':
    case 'medium':
    case 'publisher':
    case 'original-publisher':
      return getTitle(value)

    case 'event-place':
    case 'jurisdiction':
    case 'original-publisher-place':
    case 'publisher-place':
      return getPlace(value)

    case 'chapter-number':
    case 'collection-number':
      return getSeriesOrdinal(value[0].qualifiers)

    case 'number-of-volumes':
      return value.length

    default:
      return value
  }
}

/**
 * @access protected
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {String} type - P31 Wikidata ID value
 * @return {String} CSL type
 */
export function parseType (type) {
  if (!types[type]) {
    logger.unmapped('[plugin-wikidata]', 'publication type', type)
    return 'document'
  }

  return types[type]
}

/**
 * Get the labels of objects
 *
 * @access protected
 * @memberof module:@citation-js/plugin-wikidata.parsers.prop
 * @param {Object} entity - Wikidata API response
 * @return {String} label
 */
export function getLabel (entity) {
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
