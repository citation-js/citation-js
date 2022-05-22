import syncFetch from 'sync-fetch'
import fetchPolyfill from 'fetch-ponyfill'

import logger from '../logger.js'
import pkg from '../../package.json'

const { fetch, Headers } = fetchPolyfill()

// Browser environments have CORS enabled
const corsEnabled = typeof location !== 'undefined' && typeof document !== 'undefined'

// Do not try to set the user agent in browsers
let userAgent = corsEnabled ? '' : `Citation.js/${pkg.version} Node.js/${process.version}`

/**
 * @typedef module:@citation-js/core.util.fetchFile~options
 * @type {Object}
 * @property {Boolean} checkContentType
 * @property {Object} headers
 * @property {String|Object} body
 */

/**
 * @access private
 * @param {Object} headers
 * @return {Object}
 */
function normaliseHeaders (headers) {
  const result = {}

  const entries = headers instanceof Headers || headers instanceof syncFetch.Headers
    ? Array.from(headers)
    : Object.entries(headers)
  for (const [name, header] of entries) {
    result[name.toLowerCase()] = header.toString()
  }

  return result
}

/**
 * @access private
 * @param {module:@citation-js/core.util.fetchFile~options} [opts={}] - Request options
 * @return {Object} new options
 */
function parseOpts (opts = {}) {
  const reqOpts = {
    headers: {
      accept: '*/*'
    },
    method: 'GET',
    checkContentType: opts.checkContentType
  }

  if (userAgent && !corsEnabled) {
    reqOpts.headers['user-agent'] = userAgent
  }

  if (opts.body) {
    reqOpts.method = 'POST'
    const isJson = typeof opts.body !== 'string'
    reqOpts.body = isJson ? JSON.stringify(opts.body) : opts.body
    reqOpts.headers['content-type'] = isJson ? 'application/json' : 'text/plain'
  }

  if (opts.headers) {
    Object.assign(reqOpts.headers, normaliseHeaders(opts.headers))
  }

  return reqOpts
}

/**
 * @access private
 * @param {Object} request - request headers
 * @param {Object} response - response headers
 * @return {Boolean}
 */
function sameType (request, response) {
  // istanbul ignore next: should not happen
  if (!request.accept || request.accept === '*/*' || !response['content-type']) {
    return true
  }

  const [a, b] = response['content-type'].split(';')[0].trim().split('/')
  return request.accept
    .split(',')
    .map(type => type.split(';')[0].trim().split('/'))
    .some(([c, d]) => (c === a || c === '*') && (d === b || d === '*'))
}

/**
 * @access private
 * @param {Object} response
 * @param {Object} opts - request options
 * @return {Object} response
 * @throws If response is invalid
 */
function checkResponse (response, opts) {
  const { status, headers } = response
  let error

  if (status >= 400) {
    error = new Error(`Server responded with status code ${status}`)
  } else if (opts.checkContentType === true && !sameType(opts.headers, normaliseHeaders(headers))) {
    error = new Error(`Server responded with content-type ${headers.get('content-type')}`)
  }

  if (error) {
    error.status = status
    error.headers = headers
    error.body = response.body
    throw error
  }

  return response
}

/**
 * Fetch file
 *
 * @access protected
 * @method fetchFile
 * @memberof module:@citation-js/core.util
 *
 * @param {String} url - The input url
 * @param {module:@citation-js/core.util.fetchFile~options} [opts] - Request options
 *
 * @return {String} The fetched string
 */
export function fetchFile (url, opts) {
  const reqOpts = parseOpts(opts)

  logger.http('[core]', reqOpts.method, url, reqOpts)

  const response = checkResponse(syncFetch(url, reqOpts), reqOpts)
  return response.text()
}

/**
 * Fetch file (async)
 *
 * @access protected
 * @method fetchFileAsync
 * @memberof module:@citation-js/core.util
 *
 * @param {String} url - The input url
 * @param {module:@citation-js/core.util.fetchFile~options} [opts] - Request options
 *
 * @return {Promise<String>} The fetched string
 */
export async function fetchFileAsync (url, opts) {
  const reqOpts = parseOpts(opts)

  logger.http('[core]', reqOpts.method, url, reqOpts)

  return fetch(url, reqOpts)
    .then(response => checkResponse(response, reqOpts))
    .then(response => response.text())
}

/**
 * Fetch file (async)
 *
 * @access protected
 * @method setUserAgent
 * @memberof module:@citation-js/core.util
 *
 * @param {String} url - The input url
 * @param {module:@citation-js/core.util.fetchFile~options} [opts] - Request options
 */
export function setUserAgent (newUserAgent) {
  userAgent = newUserAgent
}

export default fetchFile
