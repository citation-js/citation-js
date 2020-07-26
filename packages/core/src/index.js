/**
 * @module module:@citation-js/core
 */

import Cite from './Cite/'
import * as plugins from './plugins/'
import * as util from './util/'
import logger from './logger'

/**
 * @memberof module:@citation-js/core
 * @var {String} version - version number
 */
import { version } from '../package.json'

import './plugin-common'

export {
  Cite,
  plugins,
  util,
  logger,
  version
}
