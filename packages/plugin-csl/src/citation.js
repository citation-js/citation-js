import { util } from '@citation-js/core'
import prepareEngine from './engines.js'

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
 * @param {String} [options.lang='en-US']
 * @param {String} [options.format='text']
 * @param {module:@citation-js/plugin-csl.output~Entries} [options.entry] - list of ids or cite-items of entries to include in the citation (defaults to all)
 * @param {Array<String>} [options.citationsPre=[]]
 * @param {Array<String>} [options.citationsPost=[]]
 *
 * @return {String} output
 */
export default function citation (data, options = {}) {
  const { template = 'apa', lang = 'en-US', format = 'text' } = options
  const ids = data.map(({ id }) => id)
  const entries = options.entry ? [].concat(options.entry) : ids
  data = util.downgradeCsl(data)

  const citeproc = prepareEngine(data, template, lang, format)
  citeproc.updateItems(ids)

  const { citationsPre = [], citationsPost = [] } = options
  const citation = citeproc.previewCitationCluster({
    citationItems: entries.map(id => typeof id === 'object' ? id : { id }),
    properties: { noteIndex: 0 }
  }, citationsPre, citationsPost, format)

  return citation
}
