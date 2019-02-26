import Cite from './index'

/**
 * @callback Cite~asyncCallback
 * @param {Cite} data - Cite object
 */

/**
 * @access public
 * @memberof Cite
 *
 * @param {Cite~InputData} data - input data
 * @param {Cite~InputOptions} [options={}] - cite options
 * @param {Cite~asyncCallback} [callback] - if not given, function returns promise.
 *
 * @return {Promise<Cite>} if callback is omitted, returns a promise
 */
const async = function (data, options, callback) {
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
