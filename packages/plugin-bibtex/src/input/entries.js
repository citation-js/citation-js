import config from '../config.js'
import { parse as mapBiblatex, parseBibtex as mapBibtex } from '../mapping/index.js'
import { parse as parseValue } from './value.js'
import { required } from './constants.js'

function validate (entries, requirements) {
  const problems = []

  for (const { type, label, properties } of entries) {
    if (type in requirements) {
      const missing = []
      for (const field of requirements[type]) {
        if (Array.isArray(field) && !field.some(field => field in properties)) {
          missing.push(field.join('/'))
        } else if (typeof field === 'string' && !(field in properties)) {
          missing.push(field)
        }
      }
      if (missing.length) {
        problems.push([label, `missing fields: ${missing.join(', ')}`])
      }
    } else {
      problems.push([label, `invalid type: "${type}"`])
    }
  }

  if (problems.length) {
    throw new RangeError(['Invalid entries:']
      .concat(problems.map(([label, problem]) => `  - ${label} has ${problem}`))
      .join('\n'))
  }
}

function parseEntryValues (entry) {
  const output = {}

  if ('language' in entry.properties) {
    output.language = parseValue(entry.properties.language, 'language')
  }

  for (const property in entry.properties) {
    const value = entry.properties[property]
    if (value === '') { continue }
    output[property] = parseValue(value + '', property, output.language)
  }

  return { ...entry, properties: output }
}

export function parse (entries) {
  if (config.parse.strict) {
    validate(entries, required.biblatex)
  }

  return mapBiblatex(entries.map(parseEntryValues))
}

export function parseBibtex (entries) {
  if (config.parse.strict) {
    validate(entries, required.bibtex)
  }

  return mapBibtex(entries.map(parseEntryValues))
}
