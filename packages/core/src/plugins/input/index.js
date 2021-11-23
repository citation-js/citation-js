/**
 * @namespace input
 * @memberof module:@citation-js/core.plugins
 */

import * as dataType from './dataType.js'
import * as graph from './graph.js'
import * as parser from './parser.js'
import * as csl from './csl.js'

/**
 * @namespace util
 * @memberof module:@citation-js/core.plugins.input
 */
export const util = Object.assign({}, dataType, graph, parser, csl)

export * from './register'

export * from './chain'
export * from './type'
export * from './data'
