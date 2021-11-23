import { util } from '@citation-js/core'
import config from './config.json'

import { SPECS } from './spec/index.js'
import CONVERTERS from './converters.js'
import DATA_TYPES from './dataTypes.json'

const LINE_MATCH = /^[A-Z][A-Z0-9] {2}-( |$)/
const LINE_SPLIT = / {2}-(?: |$)/
const TRANSLATORS = new Map()

function prepareTranslator (spec) {
  if (!TRANSLATORS.has(spec)) {
    for (const mapping of spec) {
      if (mapping.target in DATA_TYPES) {
        mapping.convert = CONVERTERS[DATA_TYPES[mapping.target]]
      }

      if (mapping.convert && mapping.convert.keepAll === true) {
        continue
      }

      if (Array.isArray(mapping.source)) {
        if (mapping.convert) {
          const { toSource, toTarget } = mapping.convert
          mapping.convert = {
            toTarget (...args) { return toTarget(CONVERTERS.ANY.toTarget(...args)) },
            toSource (...args) { return CONVERTERS.ANY.toSource(toSource(...args)) }
          }
        } else {
          mapping.convert = CONVERTERS.ANY
        }
      }
    }

    TRANSLATORS.set(spec, new util.Translator(spec))
  }

  return TRANSLATORS.get(spec)
}

/**
 * @access private
 * @method parse
 * @memberof module:@citation-js/plugin-ris.formats
 *
 * @param {String} text - RIS file
 * @return {Array<module:@citation-js/core~CSL>}
 */
export function parse (text) {
  const entries = []
  let lastEntry
  let lastTag

  for (let line of text.split(/\r?\n/)) {
    line = line.trim()
    if (!LINE_MATCH.test(line)) {
      if (lastEntry && lastTag) { lastEntry[lastTag] += ' ' + line }
      continue
    }

    const [tag, value] = line.split(LINE_SPLIT)
    switch (tag) {
      case 'ER':
        lastEntry = undefined
        lastTag = undefined
        break
      case 'TY':
        lastEntry = {}
        entries.push(lastEntry)
        // fall through
      default:
        if (Array.isArray(lastEntry[tag])) {
          lastEntry[tag].push(value)
        } else {
          lastEntry[tag] = lastEntry[tag] ? [lastEntry[tag], value] : value
        }
        lastTag = tag
    }
  }

  return entries
}

/**
 * @access private
 * @method parseOld
 * @memberof module:@citation-js/plugin-ris.formats
 *
 * @param {Object} data - RIS record
 * @return {module:@citation-js/core~CSL}
 */
export function parseOld (data) { return prepareTranslator(SPECS.old).convertToTarget(data) }

/**
 * @access private
 * @method parseNew
 * @memberof module:@citation-js/plugin-ris.formats
 *
 * @param {Object} data - RIS record
 * @return {module:@citation-js/core~CSL}
 */
export function parseNew (data) { return prepareTranslator(SPECS.new).convertToTarget(data) }

/**
 * @access private
 * @method parseMixed
 * @memberof module:@citation-js/plugin-ris.formats
 *
 * @param {Object} data - RIS record
 * @return {module:@citation-js/core~CSL}
 */
export function parseMixed (data) { return prepareTranslator(SPECS.mixed).convertToTarget(data) }

/**
 * @access private
 * @method format
 * @memberof module:@citation-js/plugin-ris.output
 * @implements module:@citation-js/core.plugins.output~formatter
 *
 * @param {Array<module:@citation-js/core~CSL>} data
 * @param {Object} [opts]
 * @param {String} [opts.spec='mixed'] - RIS specification (`mixed`, `new` or `old`)
 * @param {module:@citation-js/core.plugins.dict~dictName|String} [opts.format='text'] - Output dict name or `'object'` for a representation
 * @return {String|Array<Object>}
 */
export function format (data, { type, format = type || 'text', spec } = {}) {
  const outputSpec = spec || config.outputSpec
  const entries = data.map(prepareTranslator(SPECS[outputSpec]).convertToSource)

  if (format === 'object') {
    return entries
  }

  return entries.map(entry => {
    const tags = []

    for (const tag in entry) {
      if (tag === 'TY') { continue }
      tags.push(...[].concat(entry[tag]).map(value => `${tag}  - ${value.toString().replace(/(.{70})/g, '$1\n')}`))
    }

    // add type (TY) and end (ER) tag
    tags.unshift(`TY  - ${entry.TY}`)
    tags.push('ER  - ')

    return tags.join('\n')
  }).join('\n')
}
