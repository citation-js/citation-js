import { plugins } from '@citation-js/core'
import { format as mapBiblatex, formatBibtex as mapBibtex } from './entries.js'
import { format } from './bibtex.js'
import { format as formatBibtxt } from './bibtxt.js'

const factory = function (mapper, formatter) {
  return function (data, opts = {}) {
    const { type, format = type || 'text' } = opts
    data = mapper(data)

    if (format === 'object') {
      return data
    } else if (plugins.dict.has(format)) {
      return formatter(data, plugins.dict.get(format), opts)
    } else {
      throw new RangeError(`Output dictionary "${format}" not available`)
    }
  }
}

/**
 * @namespace output
 * @type Object<module:@citation-js/core.plugins.output~formatterName,module:@citation-js/core.plugins.output~formatter>
 * @memberof module:@citation-js/plugin-bibtex
 */
export default {
  /**
   * @function
   * @implements module:@citation-js/core.plugins.output~formatter
   * @memberof module:@citation-js/plugin-bibtex.output
   * @param {Array<module:@citation-js/core~CSL>} data
   * @param {Object} [opts]
   * @param {module:@citation-js/core.plugins.dict~dictName|String} [opts.format='text'] - Output dict name or `'object'` for a representation
   * @return {String|Array<Object>}
   */
  bibtex: factory(mapBibtex, format),

  /**
   * @function
   * @implements module:@citation-js/core.plugins.output~formatter
   * @memberof module:@citation-js/plugin-bibtex.output
   * @param {Array<module:@citation-js/core~CSL>} data
   * @param {Object} [opts]
   * @param {module:@citation-js/core.plugins.dict~dictName|String} [opts.format='text'] - Output dict name or `'object'` for a representation
   * @return {String|Array<Object>}
   */
  biblatex: factory(mapBiblatex, format),

  /**
   * @function
   * @implements module:@citation-js/core.plugins.output~formatter
   * @memberof module:@citation-js/plugin-bibtex.output
   * @param {Array<module:@citation-js/core~CSL>} data
   * @param {Object} [opts]
   * @param {module:@citation-js/core.plugins.dict~dictName|String} [opts.format='text'] - Output dict name or `'object'` for a representation
   * @return {String|Array<Object>}
   */
  bibtxt: factory(mapBibtex, formatBibtxt)
}
