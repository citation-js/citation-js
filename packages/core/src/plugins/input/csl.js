import { parse as parseName } from '@citation-js/name'

const NAME = 1
const NAME_LIST = 2
const DATE = 3

/**
 * Object containing type info on CSL-JSON fields.
 *
 * * string: primitive value type
 * * array: list of primitive value types
 * * number: special type
 *
 * Data from https://github.com/citation-style-language/schema/blob/master/csl-data.json
 *
 * @access private
 * @constant fieldTypes
 * @memberof module:@citation-js/core.plugins.input
 */
const fieldTypes = {
  author: NAME_LIST,
  'collection-editor': NAME_LIST,
  composer: NAME_LIST,
  'container-author': NAME_LIST,
  editor: NAME_LIST,
  'editorial-director': NAME_LIST,
  director: NAME_LIST,
  interviewer: NAME_LIST,
  illustrator: NAME_LIST,
  'original-author': NAME_LIST,
  'reviewed-author': NAME_LIST,
  recipient: NAME_LIST,
  translator: NAME_LIST,

  accessed: DATE,
  container: DATE,
  'event-date': DATE,
  issued: DATE,
  'original-date': DATE,
  submitted: DATE,

  categories: 'object', // TODO Array<String>

  id: ['string', 'number'],
  type: 'string',
  language: 'string',
  journalAbbreviation: 'string',
  shortTitle: 'string',
  abstract: 'string',
  annote: 'string',
  archive: 'string',
  archive_location: 'string',
  'archive-place': 'string',
  authority: 'string',
  'call-number': 'string',
  'chapter-number': 'string',
  'citation-number': 'string',
  'citation-label': 'string',
  'collection-number': 'string',
  'collection-title': 'string',
  'container-title': 'string',
  'container-title-short': 'string',
  dimensions: 'string',
  DOI: 'string',
  edition: ['string', 'number'],
  event: 'string',
  'event-place': 'string',
  'first-reference-note-number': 'string',
  genre: 'string',
  ISBN: 'string',
  ISSN: 'string',
  issue: ['string', 'number'],
  jurisdiction: 'string',
  keyword: 'string',
  locator: 'string',
  medium: 'string',
  note: 'string',
  number: ['string', 'number'],
  'number-of-pages': 'string',
  'number-of-volumes': ['string', 'number'],
  'original-publisher': 'string',
  'original-publisher-place': 'string',
  'original-title': 'string',
  page: 'string',
  'page-first': 'string',
  PMCID: 'string',
  PMID: 'string',
  publisher: 'string',
  'publisher-place': 'string',
  references: 'string',
  'reviewed-title': 'string',
  scale: 'string',
  section: 'string',
  source: 'string',
  status: 'string',
  title: 'string',
  'title-short': 'string',
  URL: 'string',
  version: 'string',
  volume: ['string', 'number'],
  'year-suffix': 'string'
}

/**
 * Correct a name.
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {*} name - name
 * @param {Boolean} bestGuessConversions - make some best guess conversions on type mismatch
 *
 * @return {Object} returns the (corrected) value if possible, otherwise undefined
 */
const correctName = function (name, bestGuessConversions) {
  if (typeof name === 'object' && name !== null && (name.literal || (name.given || name.family))) {
    return name
  } else if (!bestGuessConversions) {
    return undefined
  } else if (typeof name === 'string') {
    return parseName(name)
  }
}

/**
 * Correct a name field.
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {*} nameList - name list
 * @param {Boolean} bestGuessConversions - make some best guess conversions on type mismatch
 *
 * @return {Array<Object>|undefined} returns the (corrected) value if possible, otherwise undefined
 */
const correctNameList = function (nameList, bestGuessConversions) {
  if (nameList instanceof Array) {
    const names = nameList.map(name => correctName(name, bestGuessConversions)).filter(Boolean)
    return names.length ? names : undefined
  }
}

/**
 * Correct date parts
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {Array} dateParts
 * @param {Boolean} bestGuessConversions - make some best guess conversions on type mismatch
 *
 * @return {Array<Number>|undefined}
 */
const correctDateParts = function (dateParts, bestGuessConversions) {
  if (dateParts.every(part => typeof part === 'number')) {
    return dateParts
  } else if (!bestGuessConversions || dateParts.some(part => isNaN(parseInt(part)))) {
    return undefined
  } else {
    return dateParts.map(part => parseInt(part))
  }
}

/**
 * Correct a date field.
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {*} date - date
 * @param {Boolean} bestGuessConversions - make some best guess conversions on type mismatch
 *
 * @return {Array<Object>|undefined} returns the (corrected) value if possible, otherwise undefined
 */
const correctDate = function (date, bestGuessConversions) {
  const dp = 'date-parts'

  if (typeof date !== 'object' || date === null) {
    return undefined

  // "{'date-parts': [[2000, 1, 1], ...]}"
  } else if (date[dp] instanceof Array && date[dp].every(part => part instanceof Array)) {
    const range = date[dp].map(dateParts => correctDateParts(dateParts, bestGuessConversions)).filter(Boolean)
    return range.length ? { ...date, 'date-parts': range } : undefined

  // LEGACY support
  // "[{'date-parts': [2000, 1, 1]}, ...]"
  } else if (date instanceof Array && date.every(part => part[dp] instanceof Array)) {
    const range = date.map(dateParts => correctDateParts(dateParts[dp], bestGuessConversions)).filter(Boolean)
    return range.length ? { 'date-parts': range } : undefined

  // No separate date-parts
  } else if ('literal' in date || 'raw' in date) {
    return date
  }
}

/**
 * Correct a field.
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {String} fieldName - field name
 * @param {*} value - value
 * @param {Boolean} bestGuessConversions - make some best guess conversions on type mismatch
 *
 * @return {*|undefined} returns the (corrected) value if possible, otherwise undefined
 */
const correctField = function (fieldName, value, bestGuessConversions) {
  const fieldType = [].concat(fieldTypes[fieldName])

  switch (fieldTypes[fieldName]) {
    /* istanbul ignore next: no field has this */
    case NAME:
      return correctName(value, bestGuessConversions)
    case NAME_LIST:
      return correctNameList(value, bestGuessConversions)
    case DATE:
      return correctDate(value, bestGuessConversions)
  }

  if (/^_/.test(fieldName)) {
    return value
  } else if (bestGuessConversions) {
    if (typeof value === 'string' && fieldType.includes('number') && !isNaN(+value)) {
      return parseFloat(value)
    } else if (typeof value === 'number' && fieldType.includes('string') && !fieldType.includes('number')) {
      return value.toString()
    } else if (Array.isArray(value) && value.length) {
      return correctField(fieldName, value[0], bestGuessConversions)
    }
  }

  if (fieldType.includes(typeof value)) {
    return value
  }
}

/**
 * Make CSL JSON conform to standards so that plugins don't have to typecheck all the time.
 *
 * @access protected
 * @method clean
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {Array<module:@citation-js/core~CSL>} data - Array of CSL
 * @param {Boolean} [bestGuessConversions=true] - make some best guess conversions on type mismatch
 *
 * @return {Array<module:@citation-js/core~CSL>} Array of clean CSL
 */
const parseCsl = function (data, bestGuessConversions = true) {
  return data.map(function (entry) {
    const clean = {}

    for (const field in entry) {
      const correction = correctField(field, entry[field], bestGuessConversions)
      if (correction !== undefined) {
        clean[field] = correction
      }
    }

    return clean
  })
}

export { parseCsl as clean }
