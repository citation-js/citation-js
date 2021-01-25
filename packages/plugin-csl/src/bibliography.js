/**
 * @module output/csl
 */

import prepareEngine from './engines'
import { getPrefixedEntry } from './attr.js'

/**
 * Get a rendered affix
 *
 * @access private
 *
 * @param {CSL} source - source element
 * @param {String|Cite~wrapper} affix
 *
 * @return {String} Rendered affixs
 */
const getAffix = (source, affix) => typeof affix === 'function' ? affix(source) : affix || ''

/**
 * @access protected
 * @method bibliography
 *
 * @param {Array<CSL>} data
 * @param {Object} [options={}]
 * @param {String} [options.template='apa']
 * @param {String} [options.lang='en-US']
 * @param {String} [options.format='text']
 * @param {Booolean} [options.nosort=false]
 * @param {String|Array<String>} [options.entry]
 * @param {Cite~wrapper} [options.prepend]
 * @param {Cite~wrapper} [options.append]
 *
 * @return {String} output
 */
export default function bibliography (data, options = {}) {
  const {
    template = 'apa',
    lang = 'en-US',
    format = 'text',
    nosort = false
  } = options
  const ids = options.entry ? [].concat(options.entry) : data.map(({ id }) => id)

  const citeproc = prepareEngine(data, template, lang, format)
  const sortedIds = citeproc.updateItems(ids, nosort)

  if (options.append || options.prepend) {
    const { append, prepend } = options
    const items = data.reduce((items, entry) => { items[entry.id] = entry; return items }, {})

    citeproc.sys.wrapBibliographyEntry = function (id) {
      const entry = items[id]
      return [getAffix(entry, prepend), getAffix(entry, append)]
    }
  } else {
    citeproc.sys.wrapBibliographyEntry = () => ['', '']
  }

  const bibliography = citeproc.makeBibliography()
  const [{ bibstart, bibend }, bibBody] = bibliography
  const entries = bibBody.map((element, index) => getPrefixedEntry(element, sortedIds[index]))

  return bibstart + entries.join('') + bibend
}
