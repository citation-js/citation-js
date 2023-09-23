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
 * @access private
 * @param {String} response
 * @return {module:@citation-js/core~CSL}
 */
function processApiResponse (response) {
  /* istanbul ignore next */
  if (response === '[]') {
    return {}
  }

  return parseDoiJson(JSON.parse(response))
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
function parseDoiApiAsync (data) {
  const response = [].concat(data).map(url => util.fetchFileAsync(url, apiOptions).then(processApiResponse))
  return Promise.all(response)
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
  const response = [].concat(data).map(url => util.fetchFile(url, apiOptions)).map(processApiResponse)
  return response
}

export {
  parseDoiApi as parse,
  parseDoiApiAsync as parseAsync
}
