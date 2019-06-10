/**
 * @module output/bibtex
 */

import { plugins } from '@citation-js/core'
import json from './json'
import { getBibtex } from './text'
import { getBibtxt } from './bibtxt'

const factory = function (formatter) {
  return function (data, opts = {}) {
    const { type, format = type || 'text' } = opts

    if (format === 'object') {
      return data.map(json)
    } else if (plugins.dict.has(format)) {
      return formatter(data, plugins.dict.get(format), opts)
    } else {
      // throw new RangeError(`Output dictionary "${format}" not available`)
      return ''
    }
  }
}

export default {
  bibtex: factory(getBibtex),
  bibtxt: factory(getBibtxt)
}
