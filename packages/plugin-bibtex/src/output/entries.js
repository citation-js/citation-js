import { format as mapBiblatex, formatBibtex as mapBibtex } from '../mapping/index.js'
import { format as formatValue, formatAnnotation } from './value.js'

function formatEntryValues ({ type, label, properties }) {
  const output = { type, label, properties: {} }

  for (const property in properties) {
    const value = properties[property]
    const [field, annotation] = property.split('+an:')

    if (annotation) {
      if (!output.annotations) { output.annotations = {} }
      if (!output.annotations[field]) { output.annotations[field] = {} }
      output.annotations[field][annotation] = formatAnnotation(value)
    } else {
      output.properties[property] = formatValue(property, value)
    }
  }

  return output
}

export function format (entries) {
  return mapBiblatex(entries).map(formatEntryValues)
}

export function formatBibtex (entries) {
  return mapBibtex(entries).map(formatEntryValues)
}
