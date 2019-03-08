import request from 'sync-request'
import logger from '../logger'

/**
 * Fetch file
 *
 * @access protected
 * @memberof Cite.util
 *
 * @param {String} url - The input url
 * @param {Object} opts - Request options
 *
 * @return {String} The fetched string
 */
const fetchFile = function (url, opts = {}) {
  const reqOpts = {}
  if (opts.headers) {
    reqOpts.headers = opts.headers
    reqOpts.allowRedirectHeaders = Object.keys(opts.headers)
  }

  logger.http('[core]', 'GET', url, reqOpts)

  return request('GET', url, reqOpts).getBody('utf8')
}

export default fetchFile
