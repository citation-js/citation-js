/**
 * @module module:@citation-js/core
 */

import Cite from './Cite/index.js'
import * as plugins from './plugins/index.js'
import * as util from './util/index.js'
import logger from './logger.js'

/**
 * @memberof module:@citation-js/core
 * @var {String} version - version number
 */
import pkg from '../package.json'

import './plugin-common/index.js'

export const version = pkg.version
export {
  Cite,
  plugins,
  util,
  logger
}
