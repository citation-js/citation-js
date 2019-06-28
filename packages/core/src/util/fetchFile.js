import request from 'sync-request'
/* global fetch */
import 'isomorphic-fetch'

import logger from '../logger'

/**
 * Parse options
 *
 * @access protected
 *
 * @param {Object} [opts={}] - Request options
 *
 * @return {Object} new options
 */
function parseOpts (opts = {}) {
  const reqOpts = {
    headers: {},
    method: 'GET'
  }

  if (opts.headers) {
    reqOpts.headers = opts.headers
    reqOpts.allowRedirectHeaders = Object.keys(opts.headers)
  }

  if (opts.body) {
    reqOpts.method = 'POST'
    const isJson = typeof opts.body !== 'string'
    reqOpts.body = isJson ? JSON.stringify(opts.body) : opts.body
    reqOpts.headers['content-type'] = reqOpts.headers['content-type'] ||
      isJson ? 'application/json' : 'text/plain'
  }

  return reqOpts
}

/**
 * Fetch file
 *
 * @access protected
 * @memberof Cite.util
 *
 * @param {String} url - The input url
 * @param {Object} [opts] - Request options
 *
 * @return {String} The fetched string
 */
export function fetchFile (url, opts) {
  const reqOpts = parseOpts(opts)

  logger.http('[core]', reqOpts.method, url, reqOpts)

  const response = request(reqOpts.method, url, reqOpts)

  if (response.statusCode >= 400) {
    return response.getBody('utf8')
  } else {
    return response.body.toString('utf8')
  }
}

/**
 * Fetch file (async)
 *
 * @access protected
 * @memberof Cite.util
 *
 * @param {String} url - The input url
 * @param {Object} [opts] - Request options
 *
 * @return {Promise<String>} The fetched string
 */
export async function fetchFileAsync (url, opts) {
  const reqOpts = parseOpts(opts)

  logger.http('[core]', reqOpts.method, url, reqOpts)

  return fetch(url, reqOpts).then(response => response.text())
    .catch(e => { throw e })
}

export default fetchFile
