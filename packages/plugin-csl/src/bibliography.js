import { util } from '@citation-js/core'
import prepareEngine from './engines.js'
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
 * This plugin adds the output format `bibliography`, and accepts the following specific options:
 *
 *   * `prepend` (`String`, `Function`): prepend static or dynamic text to each entry
 *   * `append` (`String`, `Function`): append static or dynamic text to each entry
 *   * `nosort` (`Boolean`, default: `false`): do not sort according to the style-defined rules
 *   * `asEntryArray` (`Boolean`, default: `false`): return an array of entries consisting of an id and the output for that individual entry
 *
 * Here's an example for `prepend` and `append`:
 *
 * ```js
 * let cite = new Cite({ id: 'a', title: 'Item A' })
 *
 * cite.format('bibliography', { append: ' [foobar]' })
 * // 'Item A. (n.d.). [foobar]\n'
 *
 * cite.format('bibliography', { prepend (entry) { return `${entry.id}: ` } })
 * // 'a: Item A. (n.d.).\n'
 * ```
 *
 * And here's another example, possibly more realistic:
 *
 * ```js
 * let cite = new Cite('Q30000000')
 *
 * let date = (new Date()).toLocaleDateString()
 *
 * cite.format('bibliography', {
 *   format: 'html',
 *   template: 'apa',
 *   prepend (entry) {
 *     return `[${entry.id}]: `
 *   },
 *   append: ` [Retrieved on ${date}]`
 * })
 *
 * // `<div class="csl-bib-body">
 * //   <div data-csl-entry-id="Q30000000" class="csl-entry">
 * //     [Q30000000]: Miccadei, S., De Leo, R., Zammarchi, E., Natali, P. G., &#38; Civitareale, D. (2002). The Synergistic Activity of Thyroid Transcription Factor 1 and Pax 8 Relies on the Promoter/Enhancer Interplay. <i>Molecular Endocrinology</i>, <i>16</i>(4), 837–846. https://doi.org/10.1210/MEND.16.4.0808 [Retrieved on 2018-7-10]
 * //   </div>
 * // </div>`
 * ```
 *
 * This prepends `[$ID]: ` to each entry, where `$ID` is the ID of that entry, and appends ` [Retrieved on $DATE]`, where `$DATE` is today (constant for all entries).
 *
 * Here's an example for `asEntryArray`:
 *
 * ```js
 * const cite = new Cite([
 *   { id: 'a', title: 'Item A', issued: { literal: 2021 } },
 *   { id: 'b', title: 'Item B', issued: { literal: 2021 } }
 * ])
 *
 * cite.format('bibliography', { asEntryArray: true })
 * // [
 * //   [
 * //     "a"
 * //     "Item A. (2021).\n"
 * //   ],
 * //   [
 * //     "b"
 * //     "Item B. (2021).\n"
 * //   ]
 * // ]
 * ```
 *
 * @memberof module:@citation-js/plugin-csl.output
 * @implements module:@citation-js/core.plugins.output~formatter
 * @method bibliography
 *
 * @param {Array<CSL>} data
 * @param {Object} [options={}]
 * @param {String} [options.template='apa']
 * @param {String} [options.lang='en-US']
 * @param {String} [options.format='text']
 * @param {Booolean} [options.asEntryArray=false]
 * @param {Booolean} [options.nosort=false]
 * @param {String|Array<String>} [options.entry]
 * @param {Cite~wrapper} [options.prepend]
 * @param {Cite~wrapper} [options.append]
 *
 * @return {String} output
 */
export default function bibliography (data, options = {}) {
  const { template = 'apa', lang = 'en-US', format = 'text', nosort = false } = options
  const ids = options.entry ? [].concat(options.entry) : data.map(({ id }) => id)
  data = util.downgradeCsl(data)

  const citeproc = prepareEngine(data, template, lang, format)
  const sortedIds = citeproc.updateItems(ids, nosort)

  if (options.append || options.prepend) {
    const items = data.reduce((items, entry) => { items[entry.id] = entry; return items }, {})

    citeproc.sys.wrapBibliographyEntry = function (id) {
      const entry = items[id]
      return [
        getAffix(entry, options.prepend),
        getAffix(entry, options.append)
      ]
    }
  } else {
    citeproc.sys.wrapBibliographyEntry = () => ['', '']
  }

  const bibliography = citeproc.makeBibliography()
  const [{ bibstart, bibend }, bibBody] = bibliography
  const entries = bibBody.map((element, index) => getPrefixedEntry(element, sortedIds[index]))

  if (options.asEntryArray) {
    return entries.map((element, index) => [sortedIds[index], element])
  }

  return bibstart + entries.join('') + bibend
}
