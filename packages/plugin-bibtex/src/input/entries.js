import config from '../config'
import { parse as mapBiblatex } from '../mapping/biblatex'
import { parse as parseValue } from './value'

function parseEntryValues (entry) {
  const output = {}

  if ('language' in entry.properties) {
    output.language = parseValue(entry.properties.language, 'language')
  }

  for (const property in entry.properties) {
    const value = entry.properties[property]
    output[property] = parseValue(value + '', property, output.language)
  }

  return { ...entry, properties: output }
}

export function parseEntry (entry) {
  return mapBiblatex([parseEntryValues(entry)])
}

export function parse (entries) {
  return mapBiblatex(entries.map(parseEntryValues))
}
