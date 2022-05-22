import Cite from './index.js'

/**
 * @callback module:@citation-js/core.Cite~asyncCallback
 * @param {Cite} data - Cite object
 */

/**
 * @access public
 * @memberof module:@citation-js/core.Cite
 *
 * @param {module:@citation-js/core~InputData} data - input data
 * @param {module:@citation-js/core~InputOptions} [options={}] - cite options
 * @param {module:@citation-js/core.Cite~asyncCallback} [callback] - if not given, function returns promise.
 *
 * @return {Promise<module:@citation-js/core.Cite>} if callback is omitted, returns a promise
 */
function async (data, options, callback) {
  if (typeof options === 'function' && !callback) {
    callback = options
    options = undefined
  }

  const promise = Cite().setAsync(data, options)

  if (typeof callback === 'function') {
    promise.then(callback)
    return undefined
  } else {
    return promise
  }
}

export default async
