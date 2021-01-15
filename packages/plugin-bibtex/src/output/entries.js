import { format as mapBiblatex, formatBibtex as mapBibtex } from '../mapping'
import { format as formatValue } from './value'

function formatEntryValues ({ type, label, properties }) {
  const output = {}

  for (const property in properties) {
    const value = properties[property]
    output[property] = formatValue(property, value)
  }

  return { type, label, properties: output }
}

export function format (entries) {
  return mapBiblatex(entries).map(formatEntryValues)
}

export function formatBibtex (entries) {
  return mapBibtex(entries).map(formatEntryValues)
}
