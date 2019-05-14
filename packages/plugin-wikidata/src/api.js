/**
 * @module input/wikidata
 */

import { util } from '@citation-js/core'

const { fetchFile, fetchFileAsync } = util

export function parse (urls) {
  return [].concat(urls).map(fetchFile)
}

export function parseAsync (urls) {
  return Promise.all([].concat(urls).map(fetchFileAsync))
}
