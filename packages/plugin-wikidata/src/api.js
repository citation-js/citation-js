import { util } from '@citation-js/core'

const { fetchFile, fetchFileAsync } = util

/**
 * Fetch API responses.
 *
 * @access protected
 * @memberof module:@citation-js/plugin-wikidata.parsers.api
 * @param {String|Array<String>} urls
 * @return {Array<Object>}
 */
export function parse (urls) {
  return [].concat(urls).map(fetchFile)
}

/**
 * Fetch API responses asynchronously.
 *
 * @access protected
 * @memberof module:@citation-js/plugin-wikidata.parsers.api
 * @param {String|Array<String>} urls
 * @return {Array<Object>}
 */
export function parseAsync (urls) {
  return Promise.all([].concat(urls).map(fetchFileAsync))
}
