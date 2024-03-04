import config from '../config.js'

function formatField (field, value, dict) {
  return dict.listItem.join(`${field} = {${value}},`)
}

function formatEntry (entry, dict) {
  const fields = []

  for (const field in entry.properties) {
    fields.push(formatField(field, entry.properties[field], dict))

    if (entry.annotations && entry.annotations[field]) {
      for (const annotation in entry.annotations[field]) {
        let annotationField = field + config.biber.annotationMarker
        if (annotation !== 'default') {
          annotationField += config.biber.namedAnnotationMarker + annotation
        }
        fields.push(formatField(annotationField, entry.annotations[field][annotation], dict))
      }
    }
  }

  return dict.entry.join(`@${entry.type}{${entry.label},${dict.list.join(fields.join(''))}}`)
}

/**
 * Get a BibTeX string from CSL
 *
 * @access private
 * @method format
 *
 * @param {Array<module:@citation-js/core~CSL>} src - Input CSL
 * @param {module:@citation-js/core.plugins.dict~dict} dict - Dictionary
 *
 * @return {String} BibTeX string
 */
export function format (src, dict) {
  const entries = src.map(entry => formatEntry(entry, dict)).join('')

  return dict.bibliographyContainer.join(entries)
}
