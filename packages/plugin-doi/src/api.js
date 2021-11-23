import { util } from '@citation-js/core'
import parseDoiJson from './json.js'

/**
 * DOI API options
 *
 * @access private
 * @memberof module:@citation-js/plugin-doi.parsers.api
 */
const apiOptions = {
  checkContentType: true,
  headers: {
    Accept: 'application/vnd.citationstyles.csl+json'
  }
}

/**
 * Fetch DOI API results
 *
 * @access private
 * @method fetchDoiApiAsync
 * @memberof module:@citation-js/plugin-doi.parsers.api
 *
 * @param {String} url - The input url
 *
 * @return {Promise<module:@citation-js/core~CSL>} The fetched JSON
 */
async function fetchDoiApiAsync (url) {
  const result = await util.fetchFileAsync(url, apiOptions)
  return result === '[]' ? {} : JSON.parse(result)
}

/**
 * Get CSL JSON from DOI API URLs.
 *
 * @access protected
 * @method parseAsync
 * @memberof module:@citation-js/plugin-doi.parsers.api
 *
 * @param {String|Array<String>} data - DOIs
 *
 * @return {Promise<Array<module:@citation-js/core~CSL>>} Array of CSL
 */
async function parseDoiApiAsync (data) {
  const doiJsonList = await Promise.all([].concat(data).map(fetchDoiApiAsync))
  return doiJsonList.map(parseDoiJson)
}

/**
 * Fetch DOI API results
 *
 * @access private
 * @method fetchDoiApi
 * @memberof module:@citation-js/plugin-doi.parsers.api
 *
 * @param {String} url - The input url
 *
 * @return {module:@citation-js/core~CSL} The fetched JSON
 */
function fetchDoiApi (url) {
  const result = util.fetchFile(url, apiOptions)
  return result === '[]' ? {} : JSON.parse(result)
}

/**
 * Get CSL JSON from DOI API URLs.
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-doi.parsers.api
 *
 * @param {String|Array<String>} data - DOIs
 *
 * @return {Array<module:@citation-js/core~CSL>} Array of CSL
 */
function parseDoiApi (data) {
  return [].concat(data).map(fetchDoiApi).map(parseDoiJson)
}

export {
  parseDoiApi as parse,
  parseDoiApiAsync as parseAsync
}
