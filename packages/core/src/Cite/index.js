import * as log from './log.js'
import * as options from './options.js'
import * as set from './set.js'
import * as sort from './sort.js'
import * as get from './get.js'
import * as staticMethods from './static.js'

/**
 * Create a `Cite` object with almost any kind of data, and manipulate it with its default methods.
 *
 * @access public
 * @constructor Cite
 * @memberof module:@citation-js/core
 *
 * @param {module:@citation-js/core~InputData} data - Input data
 * @param {module:@citation-js/core~InputOptions} [options={}] - Input options
 */
function Cite (data, options = {}) {
  // Making it Scope-Safe
  if (!(this instanceof Cite)) {
    return new Cite(data, options)
  }

  /**
   * The default options for the output. See [input options](../#cite.in.options)
   *
   * @access protected
   * @memberof module:@citation-js/core.Cite#
   *
   * @var {module:@citation-js/core~InputOptions} _options
   */
  this._options = options

  /**
   * The saved-images-log
   *
   * @access protected
   * @memberof module:@citation-js/core.Cite#
   *
   * @var {Array<Array<String>>} log
   */
  this.log = []

  /**
   * The parsed data
   *
   * @access protected
   * @memberof module:@citation-js/core.Cite#
   *
   * @var {Array<module:@citation-js/core~CSL>} data
   */
  this.data = []

  this.set(data, options)
  this.options(options)

  return this
}

Object.assign(Cite.prototype, log, options, set, sort, get)

Cite.prototype[Symbol.iterator] = function * () {
  yield * this.data
}

Object.assign(Cite, staticMethods)

export default Cite
