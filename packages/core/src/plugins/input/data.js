import { chain, chainAsync } from './chain.js'

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {Array<Array>} array
 * @return {Array} flattened array
 */
const flatten = array => [].concat(...array)

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @typedef {Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parse>} parsers
 */
const parsers = {}

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @typedef {Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parseAsync>} asyncParsers
 */
const asyncParsers = {}

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @typedef {Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parse>} nativeParsers
 */
const nativeParsers = {
  '@csl/object': input => [input],
  '@csl/list+object': input => input,
  '@else/list+object': input => flatten(input.map(chain)),
  '@invalid': () => { throw new Error('This format is not supported or recognized') }
}

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @typedef {Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parseAsync>} nativeAsyncParsers
 */
const nativeAsyncParsers = {
  '@else/list+object': async input => flatten(await Promise.all(input.map(chainAsync)))
}

/**
 * @access public
 * @method data
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input - input data
 * @param {module:@citation-js/core.plugins.input~format} type - input type
 *
 * @return {*} parsed data
 * @return {Null} if no parser available
 */
export const data = (input, type) => {
  if (typeof parsers[type] === 'function') {
    return parsers[type](input)
  } else if (typeof nativeParsers[type] === 'function') {
    return nativeParsers[type](input)
  } else {
    throw new TypeError(`No synchronous parser found for ${type}`)
  }
}

/**
 * @access public
 * @method dataAsync
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input - input data
 * @param {module:@citation-js/core.plugins.input~format} type - input type
 *
 * @return {Promise} parsed data
 * @return {Promise<Null>} if no parser available
 */
export const dataAsync = async (input, type) => {
  if (typeof asyncParsers[type] === 'function') {
    return asyncParsers[type](input)
  } else if (typeof nativeAsyncParsers[type] === 'function') {
    return nativeAsyncParsers[type](input)
  } else if (hasDataParser(type, false)) {
    return data(input, type)
  } else {
    throw new TypeError(`No parser found for ${type}`)
  }
}

/**
 * @access protected
 * @method addDataParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} format
 * @param {module:@citation-js/core.plugins.input~parse|module:@citation-js/core.plugins.input~parseAsync} parser
 * @param {Object} [options={}]
 * @param {Boolean} [options.async=false]
 */
export const addDataParser = (format, { parser, async }) => {
  if (async) {
    asyncParsers[format] = parser
  } else {
    parsers[format] = parser
  }
}

/**
 * @access public
 * @method hasDataParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} type
 * @param {Boolean} [async=false] - check only for async, or only sync
 *
 * @return {Boolean} parser exists
 */
export const hasDataParser = (type, async) => async
  ? asyncParsers[type] || nativeAsyncParsers[type]
  : parsers[type] || nativeParsers[type]

/**
 * @access public
 * @method removeDataParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} type
 * @param {Boolean} [async=false]
 */
export const removeDataParser = (type, async) => { delete (async ? asyncParsers : parsers)[type] }

/**
 * @access public
 * @method listDataParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {Boolean} [async=false]
 */
export const listDataParser = (async) => Object.keys(async ? asyncParsers : parsers)
