import { util } from '@citation-js/core'
import prepareEngine from './engines.js'

/**
 * https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html#cite-items
 *
 * @typedef {Object} module:@citation-js/plugin-csl.output~CiteItem
 * @property {String} id
 */

/**
 * https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html#citations
 *
 * @typedef {Object} module:@citation-js/plugin-csl.output~Citation
 * @property {Array<module:@citation-js/plugin-csl.output~CiteItem>} citationItems
 * @property {Object} properties
 * @property {Number} properties.noteIndex
 */

/**
 * @access private
 * @param {String|module:@citation-js/plugin-csl.output~CiteItem} citeItem
 * @return {module:@citation-js/plugin-csl.output~CiteItem} citeItem
 */
function prepareCiteItem (citeItem) {
  return typeof citeItem === 'object' ? citeItem : { id: citeItem }
}

/**
 * @access private
 * @param {String|Array<String>|Array<module:@citation-js/plugin-csl.output~CiteItem>|module:@citation-js/plugin-csl.output~CiteItem|module:@citation-js/plugin-csl.output~Citation} citation
 * @return {module:@citation-js/plugin-csl.output~Citation} citation
 */
function prepareCitation (citation) {
  if (citation.citationItems) {
    return citation
  }

  return {
    citationItems: [].concat(citation).map(prepareCiteItem),
    properties: { noteIndex: 0 }
  }
}

/**
 * @access private
 * @param {Array<String>|Array<module:@citation-js/plugin-csl.output~CiteItem>|Array<module:@citation-js/plugin-csl.output~Citation>} [context=[]]
 * @return {Array<module:@citation-js/plugin-csl.output~Citation>} citations
 */
function prepareCitations (context) {
  if (!context) {
    return []
  }
  return context.map(prepareCitation)
}

/**
 * Here's an example for `entry`:
 *
 * ```js
 * let cite = new Cite([
 *   { id: 'a', title: 'Item A', issued: { 'date-parts': [[2016]] } },
 *   { id: 'b', title: 'Item B', issued: { 'date-parts': [[2017]] } },
 *   { id: 'c', title: 'Item C', issued: { 'date-parts': [[2018]] } }
 * ])
 *
 * cite.format('citation')
 * // '(“Item A,” 2016; “Item B,” 2017; “Item C,” 2018)'
 *
 * cite.format('citation', { entry: ['a', 'b'] })
 * // '(“Item A,” 2016; “Item B,” 2017)'
 *
 * cite.format('citation', { entry: 'a' })
 * // '(“Item A,” 2016)'
 *
 * cite.format('citation', { entry: [{ id: 'a', label: 'page', locator: 123 }] })
 * // '(“Item A,” 2016, p. 123)'
 * ```
 *
 * @memberof module:@citation-js/plugin-csl.output
 * @implements module:@citation-js/core.plugins.output~formatter
 * @method citation
 *
 * @param {Array<CSL>} data
 * @param {Object} [options={}]
 * @param {String} [options.template='apa']
 * @param {String} [options.lang]
 * @param {String} [options.format='text']
 * @param {module:@citation-js/plugin-csl.output~Entries} [options.entry] - list of ids or cite-items of entries to include in the citation (defaults to all)
 * @param {Array<String>} [options.citationsPre=[]]
 * @param {Array<String>} [options.citationsPost=[]]
 *
 * @return {String} output
 */
export default function citation (data, options = {}) {
  const { template = 'apa', lang, format = 'text' } = options
  const ids = data.map(({ id }) => id)
  const entries = options.entry ? options.entry : ids
  data = util.downgradeCsl(data)

  const citeproc = prepareEngine(data, template, lang, format)

  const before = prepareCitations(options.citationsPre)
  const citation = prepareCitation(entries)
  const after = prepareCitations(options.citationsPost)
  const output = citeproc.rebuildProcessorState([...before, citation, ...after], format, [])

  return output[before.length][2]
}
