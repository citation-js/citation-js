/**
 * @namespace config
 * @memberof module:@citation-js/core.plugins
 */

const configs = {}

/**
 * @access public
 * @method add
 * @memberof module:@citation-js/core.plugins.config
 * @param {module:@citation-js/core.plugins~pluginRef} ref - plugin reference/name
 * @param {Object} config
 */
export function add (ref, config) {
  configs[ref] = config
}

/**
 * @access public
 * @method get
 * @memberof module:@citation-js/core.plugins.config
 * @param {module:@citation-js/core.plugins~pluginRef} ref - plugin reference/name
 * @return {Object} config
 */
export function get (ref) {
  return configs[ref]
}

/**
 * @access public
 * @method has
 * @memberof module:@citation-js/core.plugins.config
 * @param {module:@citation-js/core.plugins~pluginRef} ref - plugin reference/name
 * @return {Boolean}
 */
export function has (ref) {
  return Object.prototype.hasOwnProperty.call(configs, ref)
}

/**
 * @access public
 * @method remove
 * @memberof module:@citation-js/core.plugins.config
 * @param {module:@citation-js/core.plugins~pluginRef} ref - plugin reference/name
 */
export function remove (ref) {
  delete configs[ref]
}

/**
 * @access public
 * @method list
 * @memberof module:@citation-js/core.plugins.config
 * @return {Array<module:@citation-js/core.plugins~pluginRef>} list of available plugin configs
 */
export function list () {
  return Object.keys(configs)
}
