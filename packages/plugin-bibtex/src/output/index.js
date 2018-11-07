/**
 * @module output/bibtex
 */

import {plugins} from '@citation-js/core'
import json from './json'
import {getBibtex} from './text'
import {getBibtxt} from './bibtxt'

const factory = function (formatter) {
  return function (data, {type, format = type || 'text'} = {}) {
    if (format === 'object') {
      return data.map(json)
    } else {
      return plugins.dict.has(format) ? formatter(data, plugins.dict.get(format)) : ''
    }
  }
}

export default {
  bibtex: factory(getBibtex),
  bibtxt: factory(getBibtxt)
}
