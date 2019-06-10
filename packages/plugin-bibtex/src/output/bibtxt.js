/**
 * @module output/bibtex
 */

import getBibTeXJSON from './json'
import { plugins } from '@citation-js/core'

/**
 * Get a Bib.TXT string from CSL
 *
 * @access protected
 * @method getBibtxt
 *
 * @param {Array<CSL>} src - Input CSL
 * @param {Cite.get.dict~dict} dict - Dictionary
 * @param {Object} opts
 *
 * @return {String} Bib.TXT string
 */
const getBibtxt = function (src, dict, opts) {
  const entries = src.map(entry => {
    const bib = getBibTeXJSON(entry, opts)
    bib.properties.type = bib.type
    const properties = Object
      .keys(bib.properties)
      .map(prop => dict.listItem.join(`${prop}: ${bib.properties[prop]}`))
      .join('')

    return dict.entry.join(`[${bib.label}]${dict.list.join(properties)}`)
  }).join('\n')

  return dict.bibliographyContainer.join(entries)
}

/* istanbul ignore next: deprecated */
/**
 * Get a BibTeX (HTML) string from CSL
 *
 * @access protected
 * @method getBibtxtWrapper
 * @deprecated use the generalised method: {@link module:output/bibtex~getBibtxt}
 *
 * @param {Array<CSL>} src - Input CSL
 * @param {Boolean} html - Output as HTML string (instead of plain text)
 *
 * @return {String} Bib.TXT (HTML) string
 */
const getBibtxtWrapper = function (src, html) {
  const dict = plugins.dict.get(html ? 'html' : 'text')
  return getBibtxt(src, dict)
}

export { getBibtxt }
export default getBibtxtWrapper
