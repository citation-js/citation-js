/**
 * @namespace input
 * @memberof module:@citation-js/core.plugins
 */

import * as dataType from './dataType'
import * as graph from './graph'
import * as parser from './parser'
import * as csl from './csl'

/**
 * @namespace util
 * @memberof module:@citation-js/core.plugins.input
 */
export const util = Object.assign({}, dataType, graph, parser, csl)

export * from './register'

export * from './chain'
export * from './type'
export * from './data'
