import { parse as parseName } from '@citation-js/name'

const NAME = 1
const NAME_LIST = 2
const DATE = 3
const TYPE = 4

/**
 * Data from https://github.com/citation-style-language/schema/blob/master/schemas/input/csl-data.json
 *
 *   - true if a valid type
 *   - string if another type should be used
 *
 * @access private
 * @constant entryTypes
 * @memberof module:@citation-js/core.plugins.input
 */
const entryTypes = {
  article: true,
  'article-journal': true,
  'article-magazine': true,
  'article-newspaper': true,
  bill: true,
  book: true,
  broadcast: true,
  chapter: true,
  classic: true,
  collection: true,
  dataset: true,
  document: true,
  entry: true,
  'entry-dictionary': true,
  'entry-encyclopedia': true,
  event: true,
  figure: true,
  graphic: true,
  hearing: true,
  interview: true,
  legal_case: true,
  legislation: true,
  manuscript: true,
  map: true,
  motion_picture: true,
  musical_score: true,
  pamphlet: true,
  'paper-conference': true,
  patent: true,
  performance: true,
  periodical: true,
  personal_communication: true,
  post: true,
  'post-weblog': true,
  regulation: true,
  report: true,
  review: true,
  'review-book': true,
  software: true,
  song: true,
  speech: true,
  standard: true,
  thesis: true,
  treaty: true,
  webpage: true,

  // From https://github.com/CrossRef/rest-api-doc/issues/187
  'journal-article': 'article-journal',
  'book-chapter': 'chapter',
  'posted-content': 'manuscript',
  'proceedings-article': 'paper-conference'
}

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
  chair: NAME_LIST,
  'collection-editor': NAME_LIST,
  compiler: NAME_LIST,
  composer: NAME_LIST,
  'container-author': NAME_LIST,
  contributor: NAME_LIST,
  curator: NAME_LIST,
  director: NAME_LIST,
  editor: NAME_LIST,
  'editorial-director': NAME_LIST,
  'executive-producer': NAME_LIST,
  guest: NAME_LIST,
  host: NAME_LIST,
  interviewer: NAME_LIST,
  illustrator: NAME_LIST,
  narrator: NAME_LIST,
  organizer: NAME_LIST,
  'original-author': NAME_LIST,
  performer: NAME_LIST,
  producer: NAME_LIST,
  'reviewed-author': NAME_LIST,
  recipient: NAME_LIST,
  'script-writer': NAME_LIST,
  'series-creator': NAME_LIST,
  translator: NAME_LIST,

  accessed: DATE,
  'available-date': DATE,
  container: DATE,
  'event-date': DATE,
  issued: DATE,
  'original-date': DATE,
  submitted: DATE,

  type: TYPE,

  categories: 'object', // TODO Array<String>
  custom: 'object',

  id: ['string', 'number'],
  language: 'string',
  journalAbbreviation: 'string',
  shortTitle: 'string',
  abstract: 'string',
  annote: 'string',
  archive: 'string',
  archive_collection: 'string',
  archive_location: 'string',
  'archive-place': 'string',
  authority: 'string',
  'call-number': 'string',
  'chapter-number': 'string',
  'citation-number': 'string',
  'citation-key': 'string',
  'citation-label': 'string',
  'collection-number': 'string',
  'collection-title': 'string',
  'container-title': 'string',
  'container-title-short': 'string',
  dimensions: 'string',
  division: 'string',
  DOI: 'string',
  edition: ['string', 'number'],
  event: 'string', // deprecated
  'event-title': 'string',
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
  'part-number': ['string', 'number'],
  'part-title': 'string',
  PMCID: 'string',
  PMID: 'string',
  printing: 'string',
  publisher: 'string',
  'publisher-place': 'string',
  references: 'string',
  'reviewed-title': 'string',
  'reviewed-genre': 'string',
  scale: 'string',
  section: 'string',
  source: 'string',
  status: 'string',
  supplement: ['string', 'number'],
  title: 'string',
  'title-short': 'string',
  URL: 'string',
  version: 'string',
  volume: ['string', 'number'],
  'volume-title': 'string',
  'volume-title-short': 'string',
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
function correctName (name, bestGuessConversions) {
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
function correctNameList (nameList, bestGuessConversions) {
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
function correctDateParts (dateParts, bestGuessConversions) {
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
function correctDate (date, bestGuessConversions) {
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

  // LEGACY support
  // "{'date-parts': [2000, 1, 1]}"
  } else if (date[dp] instanceof Array) {
    const dateParts = correctDateParts(date[dp], bestGuessConversions)
    return dateParts && { 'date-parts': [dateParts] }

  // No separate date-parts
  } else if ('literal' in date || 'raw' in date) {
    return date
  }
}

/**
 * Correct a type field.
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {String|*} type - type
 * @param {Boolean} bestGuessConversions - make some best guess conversions on type mismatch
 *
 * @return {String|undefined} returns the (corrected) value if possible, otherwise undefined
 */
function correctType (type, bestGuessConversions) {
  // Also anything that can be converted to a string. Taking `language` as a field
  // with similar string constraints, as fields like `title` might take HTML into
  // account in the future.
  type = correctField('language', type, bestGuessConversions)

  if (entryTypes[type] === true) {
    return type
  } else if (bestGuessConversions && type in entryTypes) {
    return entryTypes[type]
  } else {
    return undefined
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
function correctField (fieldName, value, bestGuessConversions) {
  const fieldType = [].concat(fieldTypes[fieldName])

  switch (fieldTypes[fieldName]) {
    /* istanbul ignore next: no field has this */
    case NAME:
      return correctName(value, bestGuessConversions)
    case NAME_LIST:
      return correctNameList(value, bestGuessConversions)
    case DATE:
      return correctDate(value, bestGuessConversions)
    case TYPE:
      return correctType(value, bestGuessConversions)
  }

  if (bestGuessConversions) {
    if (typeof value === 'string' && fieldType.includes('number') && !fieldType.includes('string') && !isNaN(+value)) {
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
function parseCsl (data, bestGuessConversions = true) {
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
