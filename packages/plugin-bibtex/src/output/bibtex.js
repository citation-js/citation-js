function formatEntry ({ type, label, properties }, dict) {
  const fields = Object.entries(properties)
    .map(([field, value]) => dict.listItem.join(`${field} = {${value}},`))

  return dict.entry.join(`@${type}{${label},${dict.list.join(
    fields.join('')
  )}}`)
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
