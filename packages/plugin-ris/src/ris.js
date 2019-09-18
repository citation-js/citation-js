/**
 * @module output/ris
 */

import { util } from '@citation-js/core'
import config from './config'

import { SPECS } from './spec'
import CONVERTERS from './converters'
import DATA_TYPES from './dataTypes'

const LINE_MATCH = /^[A-Z][A-Z0-9] {2}-( |$)/
const LINE_SPLIT = / {2}-(?: |$)/
const TRANSLATORS = new Map()

function prepareTranslator (spec) {
  if (!TRANSLATORS.has(spec)) {
    for (let mapping of spec) {
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

export function parse (text) {
  const entries = []
  let lastEntry
  let lastTag

  for (let line of text.split('\n')) {
    if (!LINE_MATCH.test(line)) {
      if (lastEntry && lastTag) { lastEntry[lastTag] += ' ' + line.trim() }
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

export function parseOld (data) { return prepareTranslator(SPECS.old).convertToTarget(data) }
export function parseNew (data) { return prepareTranslator(SPECS.new).convertToTarget(data) }
export function parseMixed (data) { return prepareTranslator(SPECS.mixed).convertToTarget(data) }

export function format (data, { type, format = type || 'text' } = {}) {
  const entries = data.map(prepareTranslator(SPECS[config.outputSpec]).convertToSource)

  if (format === 'object') {
    return entries
  }

  return entries.map(entry => {
    const tags = []

    for (let tag in entry) {
      if (tag === 'TY') { continue }
      tags.push(...[].concat(entry[tag]).map(value => `${tag}  - ${value.toString().replace(/(.{70})/g, '$1\n')}`))
    }

    // add type (TY) and end (ER) tag
    tags.unshift(`TY  - ${entry.TY}`)
    tags.push('ER  - ')

    return tags.join('\n')
  }).join('\n')
}
