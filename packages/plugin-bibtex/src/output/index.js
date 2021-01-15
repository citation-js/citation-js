/**
 * @module output/bibtex
 */

import { plugins } from '@citation-js/core'
import { format as mapBiblatex, formatBibtex as mapBibtex } from './entries'
import { format } from './bibtex'
import { format as formatBibtxt } from './bibtxt'

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

export default {
  bibtex: factory(mapBibtex, format),
  biblatex: factory(mapBiblatex, format),
  bibtxt: factory(mapBibtex, formatBibtxt)
}
