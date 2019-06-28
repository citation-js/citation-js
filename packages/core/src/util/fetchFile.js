import request from 'sync-request'
/* global fetch */
import 'isomorphic-fetch'

import logger from '../logger'

/**
 * @access private
 * @param {Object} [opts={}] - Request options
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
 * @access private
 * @param {Object} response
 * @param {Object} opts - request options
 * @return {Object} response
 * @throws If response is invalid
 */
 function checkResponse (response, opts) {
   if (opts.checkResponse === false) {
     return
   }

   const status = response.status || response.statusCode
   let error

   if (status >= 400) {
     error = new Error(`Server responded with status code ${status}`)
   }

   if (error) {
     error.status = status
     error.headers = response.headers
     error.body = response.body
     throw error
   }

   return response
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

  const response = checkResponse(request(reqOpts.method, url, reqOpts), reqOpts)
  return response.body.toString('utf8')
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

  return fetch(url, reqOpts)
    .then(response => checkResponse(response, reqOpts))
    .then(response => response.text())
}

export default fetchFile
