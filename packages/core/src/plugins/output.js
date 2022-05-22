/**
 * @namespace output
 * @memberof module:@citation-js/core.plugins
 */

import Register from '../util/register.js'

/**
 * @callback module:@citation-js/core.plugins.output~formatter
 * @param {Array<module:@citation-js/core~InputData>} data
 * @return {String} output
 */

/**
 * @typedef module:@citation-js/core.plugins.output~formatterName
 * @type String
 */

/**
 * Validate input arguments
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.output
 *
 * @param {String} name - output format name
 * @param {module:@citation-js/core.plugins.output~formatter} formatter - outputting function
 * @throws {TypeError} Invalid output format name
 * @throws {TypeError} Invalid formatter
 */
function validate (name, formatter) {
  if (typeof name !== 'string') {
    throw new TypeError(`Invalid output format name, expected string, got ${typeof name}`)
  } else if (typeof formatter !== 'function') {
    throw new TypeError(`Invalid formatter, expected function, got ${typeof formatter}`)
  }
}

/**
 * @access public
 * @memberof module:@citation-js/core.plugins.output
 * @constant register
 *
 * @type module:@citation-js/core.util.Register
 */
export const register = new Register()

/**
 * Add output plugin.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.output
 * @method add
 *
 * @param {module:@citation-js/core.plugins.output~formatterName} name - output format name
 * @param {module:@citation-js/core.plugins.output~formatter} formatter - outputting function
 * @throws {TypeError} validation errors
 */
export function add (name, formatter) {
  validate(name, formatter)

  register.set(name, formatter)
}

/**
 * Remove output plugin.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.output
 * @method remove
 *
 * @param {module:@citation-js/core.plugins.output~formatterName} name - output format name
 */
export function remove (name) {
  register.remove(name)
}

/**
 * Check if output plugin exists.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.output
 * @method has
 *
 * @param {module:@citation-js/core.plugins.output~formatterName} name - output format name
 * @return {Boolean} register has plugin
 */
export function has (name) {
  return register.has(name)
}

/**
 * List output plugins.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.output
 * @method list
 *
 * @return {Array<String>} list of plugins
 */
export function list () {
  return register.list()
}

/**
 * Call output plugin
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.output
 * @method format
 *
 * @param {module:@citation-js/core.plugins.output~formatterName} name - output format name
 * @param {Array<module:@citation-js/core~CSL>} data - all entries
 * @param {...*} options - output options
 */
export function format (name, data, ...options) {
  if (!register.has(name)) {
    throw new Error(`Output format "${name}" unavailable`)
  }
  return register.get(name)(data, ...options)
}
