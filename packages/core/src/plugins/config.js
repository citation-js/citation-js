/**
 * @namespace config
 * @memberof Cite.plugins
 */

const configs = {}

/**
 * @access public
 * @method add
 * @memberof Cite.plugins.config
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 * @param {Object} config
 */
export const add = (ref, config) => { configs[ref] = config }
/**
 * @access public
 * @method get
 * @memberof Cite.plugins.config
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 * @return {Object} config
 */
export const get = (ref) => configs[ref]
/**
 * @access public
 * @method has
 * @memberof Cite.plugins.config
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 * @return {Boolean}
 */
export const has = (ref) => configs.hasOwnProperty(ref)
/**
 * @access public
 * @method remove
 * @memberof Cite.plugins.config
 * @param {Cite.plugins~pluginRef} ref - plugin reference/name
 */
export const remove = (ref) => { delete configs[ref] }
/**
 * @access public
 * @method list
 * @memberof Cite.plugins.config
 * @return {Array<Cite.plugins~pluginRef>} list of available plugin configs
 */
export const list = () => Object.keys(configs)
